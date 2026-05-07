

import React, { useState } from 'react';
import { employeeItemApi } from '../services/api';

const AssignItemModal = ({ isOpen, onClose, onSuccess }) => {
  const [assignType, setAssignType] = useState('ID_CARD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    notes: ''
  });
  
  // Dynamic dress items state
  const [dressItems, setDressItems] = useState([
    { id: Date.now(), name: '', quantity: 1, size: '' }
  ]);
  
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      notes: ''
    });
    setDressItems([{ id: Date.now(), name: '', quantity: 1, size: '' }]);
  };

  // Add new dress item row
  const addDressItem = () => {
    setDressItems([...dressItems, { id: Date.now(), name: '', quantity: 1, size: '' }]);
  };

  // Remove dress item row
  const removeDressItem = (id) => {
    if (dressItems.length === 1) {
      showMessage('At least one dress item is required', 'error');
      return;
    }
    setDressItems(dressItems.filter(item => item.id !== id));
  };

  // Update dress item field
  const updateDressItem = (id, field, value) => {
    setDressItems(dressItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleAssign = async () => {
    if (!formData.employeeId) {
      showMessage('Employee ID is required', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let result;
      const payload = {
        employeeId: formData.employeeId,
        notes: formData.notes
      };

      if (assignType === 'DRESS') {
        // Filter out empty items and prepare payload
        const validDressItems = dressItems.filter(item => item.name.trim() !== '');
        
        if (validDressItems.length === 0) {
          showMessage('Please add at least one dress item', 'error');
          setIsSubmitting(false);
          return;
        }
        
        // Convert to the format expected by backend
        const dressItemsPayload = {};
        validDressItems.forEach(item => {
          const itemName = item.name.trim();
          const sizeInfo = item.size ? ` (${item.size})` : '';
          const key = `${itemName}${sizeInfo}`;
          dressItemsPayload[key] = item.quantity;
        });
        
        result = await employeeItemApi.assignDress({
          ...payload,
          dressItems: dressItemsPayload
        });
      } else if (assignType === 'ID_CARD') {
        result = await employeeItemApi.assignIdCard(payload);
      } else {
        result = await employeeItemApi.assignAppointmentLetter(payload);
      }

      if (result.success) {
        showMessage('Item assigned successfully', 'success');
        setTimeout(() => {
          onClose();
          resetForm();
          if (onSuccess) onSuccess();
        }, 1500);
      } else {
        showMessage(result.message, 'error');
      }
    } catch (error) {
      console.error('Error assigning item:', error);
      showMessage('Failed to assign item', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Common dress item suggestions
  const commonDressItems = ['Shirt', 'Pant', 'T-Shirt', 'Trouser', 'Shoe', 'Belt', 'Tie', 'Jacket', 'Sweater', 'Cap', 'Socks', 'Uniform'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Assign New Item</h3>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message Toast */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          {/* Item Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
            <select
              value={assignType}
              onChange={(e) => {
                setAssignType(e.target.value);
                resetForm();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ID_CARD">ID Card</option>
              <option value="APPOINTMENT_LETTER">Appointment Letter</option>
              <option value="DRESS">Dress/Uniform</option>
            </select>
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter employee ID"
              required
            />
          </div>

          {/* Dress Items Section - Dynamic */}
          {assignType === 'DRESS' && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Dress Items *</label>
                <button
                  type="button"
                  onClick={addDressItem}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </button>
              </div>

              {/* Dress Items List */}
              <div className="space-y-3">
                {dressItems.map((item, index) => (
                  <div key={item.id} className="bg-white p-3 rounded-lg border">
                    <div className="grid grid-cols-12 gap-2 items-start">
                      {/* Item Name */}
                      <div className="col-span-5">
                        <label className="block text-xs text-gray-600 mb-1">Item Name *</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateDressItem(item.id, 'name', e.target.value)}
                            placeholder="e.g., Office Shirt"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            list={`dress-suggestions-${item.id}`}
                          />
                          <datalist id={`dress-suggestions-${item.id}`}>
                            {commonDressItems.map(suggestion => (
                              <option key={suggestion} value={suggestion} />
                            ))}
                          </datalist>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-3">
                        <label className="block text-xs text-gray-600 mb-1">Quantity *</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateDressItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>

                      {/* Size (Optional) */}
                      <div className="col-span-3">
                        <label className="block text-xs text-gray-600 mb-1">Size (Optional)</label>
                        <select
                          value={item.size}
                          onChange={(e) => updateDressItem(item.id, 'size', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                          <option value="">Select Size</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                          <option value="XXXL">XXXL</option>
                          <option value="6">Size 6</option>
                          <option value="7">Size 7</option>
                          <option value="8">Size 8</option>
                          <option value="9">Size 9</option>
                          <option value="10">Size 10</option>
                          <option value="11">Size 11</option>
                          <option value="12">Size 12</option>
                        </select>
                      </div>

                      {/* Remove Button */}
                      <div className="col-span-1 flex items-end">
                        <button
                          type="button"
                          onClick={() => removeDressItem(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary of items to be assigned */}
              {dressItems.some(item => item.name.trim() !== '') && (
                <div className="mt-3 p-2 bg-blue-50 rounded-md">
                  <p className="text-xs text-blue-800">
                    <strong>Summary:</strong> {dressItems.filter(item => item.name.trim()).map(item => 
                      `${item.quantity}x ${item.name}${item.size ? ` (${item.size})` : ''}`
                    ).join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional notes..."
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Assigning...
              </>
            ) : (
              'Assign Item'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignItemModal;