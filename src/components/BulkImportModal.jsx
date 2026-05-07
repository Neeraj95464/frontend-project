// src/components/BulkImportModal.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { employeeItemApi } from '../services/api';

const BulkImportModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [importType, setImportType] = useState('ID_CARD');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(fileExtension)) {
      showMessage('Please upload Excel or CSV file only', 'error');
      return;
    }

    setFile(file);
    readExcelFile(file);
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      const transformedData = transformDataByType(jsonData, importType);
      setPreviewData(transformedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const transformDataByType = (data, type) => {
    if (type === 'DRESS') {
      // Group dress items by employee ID
      const employeeMap = new Map();
      
      data.forEach(row => {
        const employeeId = row['Employee ID'] || row['employeeId'] || '';
        const itemName = row['Item Name'] || row['itemName'] || row['Item'] || '';
        const quantity = row['Quantity'] || row['quantity'] || row['Qty'] || 1;
        const size = row['Size'] || row['size'] || '';
        const notes = row['Notes'] || row['notes'] || '';
        
        if (!employeeId || !itemName) return;
        
        if (!employeeMap.has(employeeId)) {
          employeeMap.set(employeeId, {
            employeeId: employeeId,
            notes: notes,
            dressItems: {}
          });
        }
        
        const employee = employeeMap.get(employeeId);
        const key = size ? `${itemName} (${size})` : itemName;
        employee.dressItems[key] = (employee.dressItems[key] || 0) + (parseInt(quantity) || 1);
        
        if (notes && !employee.notes) {
          employee.notes = notes;
        }
      });
      
      return Array.from(employeeMap.values());
    } else {
      return data.map(row => ({
        employeeId: row['Employee ID'] || row['employeeId'] || '',
        notes: row['Notes'] || row['notes'] || ''
      })).filter(item => item.employeeId);
    }
  };

  const handleImport = async () => {
    if (!previewData || previewData.length === 0) {
      showMessage('No data to import', 'error');
      return;
    }

    setUploading(true);
    
    try {
      const payload = {
        importType: importType,
        records: previewData
      };
      
      const result = await employeeItemApi.bulkImport(payload);
      
      if (result.success && result.data) {

        showMessage(
          `Import completed! Total: ${result.data.data.totalRecords}, Success: ${result.data.data.successful}, Failed: ${result.data.data.failed}`,
          result.data.data.failed > 0 ? 'warning' : 'success'
        );
        
        if (result.data.successful > 0 && onSuccess) {
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 2000);
        }
      } else {
        showMessage(result.message || 'Import failed', 'error');
      }
    } catch (error) {
      console.error('Import error:', error);
      showMessage('Failed to import data', 'error');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    let templateData = [];
    
    if (importType === 'ID_CARD') {
      templateData = [
        { 'Employee ID': 'EMP001', 'Notes': 'ID card for new employee' },
        { 'Employee ID': 'EMP002', 'Notes': 'Replacement ID card' }
      ];
    } else if (importType === 'APPOINTMENT_LETTER') {
      templateData = [
        { 'Employee ID': 'EMP001', 'Notes': 'Appointment letter for new hire' },
        { 'Employee ID': 'EMP002', 'Notes': 'Appointment letter with updated terms' }
      ];
    } else {
      templateData = [
        { 'Employee ID': 'EMP001', 'Item Name': 'Shirt', 'Quantity': 2, 'Size': 'M', 'Notes': 'Uniform for IT department' },
        { 'Employee ID': 'EMP001', 'Item Name': 'Pant', 'Quantity': 2, 'Size': '32', 'Notes': 'Uniform for IT department' },
        { 'Employee ID': 'EMP002', 'Item Name': 'T-Shirt', 'Quantity': 3, 'Size': 'L', 'Notes': 'Summer uniform' }
      ];
    }

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, `${importType}_import_template.xlsx`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-6xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Bulk Import Items</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 
            message.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
            <select
              value={importType}
              onChange={(e) => {
                setImportType(e.target.value);
                setPreviewData([]);
                setFile(null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ID_CARD">ID Cards</option>
              <option value="APPOINTMENT_LETTER">Appointment Letters</option>
              <option value="DRESS">Dress/Uniform</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Choose File
            </label>
            {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
            <button onClick={downloadTemplate} className="mt-3 text-blue-600 hover:text-blue-800 text-sm block mx-auto">
              Download Template
            </button>
          </div>

          {previewData.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-900 mb-2">Preview ({previewData.length} employees)</h4>
              <div className="overflow-x-auto border rounded-lg max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Employee ID</th>
                      {importType === 'DRESS' && (
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Dress Items</th>
                      )}
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-sm text-gray-900">{idx + 1}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.employeeId}</td>
                        {importType === 'DRESS' && (
                          <td className="px-4 py-2 text-sm text-gray-600">
                            {Object.entries(item.dressItems).map(([name, qty]) => (
                              <div key={name}>{qty}x {name}</div>
                            ))}
                          </td>
                        )}
                        <td className="px-4 py-2 text-sm text-gray-500">{item.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50" disabled={uploading}>
            Cancel
          </button>
          <button onClick={handleImport} disabled={previewData.length === 0 || uploading} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
            {uploading ? 'Importing...' : 'Start Import'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;