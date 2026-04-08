// pages/VendorBulkImport.jsx
import React, { useState } from 'react';
import { importBulkVendors } from '../services/api';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Loader,
  TrendingUp,
  Users,
  AlertTriangle
} from 'lucide-react';

const VendorBulkImport = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        selectedFile.name.endsWith('.xlsx'))) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    } else {
      setError('Please select a valid Excel file (.xlsx)');
      setFile(null);
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        droppedFile.name.endsWith('.xlsx'))) {
      setFile(droppedFile);
      setError(null);
      setResult(null);
    } else {
      setError('Please select a valid Excel file (.xlsx)');
      setFile(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);
    
    const response = await importBulkVendors(file);
    
    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.message || 'Failed to import vendors');
    }
    
    setUploading(false);
  };

  // Download demo template
  const downloadDemoTemplate = () => {
    // Create sample data
    const sampleData = [
      ['Name', 'Email', 'Phone', 'Company', 'Address', 'Website', 'Contact Person', 'GST Number', 'Industry Type', 'Status', 'Bank Name', 'Bank Number', 'Bank IFSC', 'PAN Number', 'Description'],
      ['ABC Corp', 'contact@abccorp.com', '9876543210', 'ABC Technologies', 'Mumbai, India', 'www.abccorp.com', 'John Doe', '27AAACA1234A1Z', 'IT', 'ACTIVE', 'HDFC Bank', '1234567890', 'HDFC0001234', 'AAACA1234A', 'IT services vendor'],
      ['XYZ Solutions', 'info@xyzsolutions.com', '9876543211', 'XYZ Pvt Ltd', 'Delhi, India', 'www.xyzsolutions.com', 'Jane Smith', '27AAACA1234A2Z', 'Manufacturing', 'ACTIVE', 'ICICI Bank', '1234567891', 'ICIC0001234', 'AAACA1235A', 'Manufacturing vendor'],
      ['PQR Enterprises', 'contact@pqr.com', '9876543212', 'PQR Group', 'Bangalore, India', 'www.pqr.com', 'Mike Johnson', '27AAACA1234A3Z', 'Services', 'INACTIVE', 'SBI Bank', '1234567892', 'SBIN0001234', 'AAACA1236A', 'Service provider']
    ];

    // Convert to CSV format
    const csvContent = sampleData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vendor_import_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download Excel template
  const downloadExcelTemplate = () => {
    // Create a simple XLSX file using SheetJS (if available)
    // For simplicity, we'll provide CSV format which Excel can open
    downloadDemoTemplate();
  };

  // Reset form
  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setUploading(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="lg:ml-48 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <FileSpreadsheet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bulk Vendor Import</h1>
          <p className="text-lg text-gray-600">Upload multiple vendors at once using Excel/CSV file</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload File
                </h2>
              </div>
              
              <div className="p-6">
                {/* Drag and Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : file 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".xlsx,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {file ? (
                    <div className="space-y-3">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <p className="text-green-600 font-medium">File selected successfully!</p>
                      <p className="text-gray-700 font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700 text-sm underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Drag & drop your Excel file here</p>
                      <p className="text-gray-400 text-sm">or</p>
                      <label
                        htmlFor="fileUpload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                      >
                        Browse Files
                      </label>
                      <p className="text-gray-400 text-xs">Supported format: .xlsx, .csv</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                      !file || uploading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload & Import
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* Demo Download */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Need a template?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Download our demo template file with sample data and correct format
                        </p>
                        <button
                          onClick={downloadExcelTemplate}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download Demo Template (CSV)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 text-sm text-gray-500">
                  <h4 className="font-semibold text-gray-700 mb-2">Instructions:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>File must be in .xlsx or .csv format</li>
                    <li>First row should contain column headers</li>
                    <li>Required fields: Name, Email, Phone, Company, Status</li>
                    <li>Status must be: ACTIVE, BLOCKED, or INACTIVE</li>
                    <li>Maximum file size: 10MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">Upload Failed</h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-8 h-8 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-800">{result.totalRecords}</span>
                    </div>
                    <p className="text-sm text-gray-600">Total Records</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <span className="text-2xl font-bold text-gray-800">{result.successCount}</span>
                    </div>
                    <p className="text-sm text-gray-600">Successful</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <XCircle className="w-8 h-8 text-red-500" />
                      <span className="text-2xl font-bold text-gray-800">{result.failureCount}</span>
                    </div>
                    <p className="text-sm text-gray-600">Failed</p>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Import Success Rate</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Success Rate
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {result.totalRecords > 0 
                            ? ((result.successCount / result.totalRecords) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${result.totalRecords > 0 ? (result.successCount / result.totalRecords) * 100 : 0}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-500"
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{result.message}</p>
                </div>

                {/* Failed Records Table */}
                {result.failedVendors && result.failedVendors.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Failed Records ({result.failedVendors.length})
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Row No.
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Vendor Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Error Message
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {result.failedVendors.map((failed, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {failed.rowNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {failed.vendorName}
                              </td>
                              <td className="px-6 py-4 text-sm text-red-600">
                                {failed.errorMessage}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {result.successCount > 0 && (
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-green-800">Import Successful!</h3>
                        <p className="text-green-700 mt-1">
                          Successfully imported {result.successCount} vendors. 
                          {result.failureCount > 0 && ` ${result.failureCount} records failed.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!result && !error && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Import Results Yet</h3>
                <p className="text-gray-500">
                  Upload an Excel file to see import results here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorBulkImport;