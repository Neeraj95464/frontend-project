// src/pages/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';

const EmployeeDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const response = await fetch('/api/employee-items/my-items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ACCEPTED':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Accepted</span>;
      case 'PENDING_ACKNOWLEDGEMENT':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Items</h1>
          <p className="text-gray-600 mt-2">View all items assigned to you</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No items assigned</h3>
            <p className="mt-1 text-sm text-gray-500">No items have been assigned to you yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.itemType}</h3>
                          {item.dressItemsDescription && (
                            <p className="text-sm text-gray-500 mt-1">{item.dressItemsDescription}</p>
                          )}
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <span>Assigned: {new Date(item.assignedDate).toLocaleDateString()}</span>
                        {item.assignedBy && <span className="ml-4">By: {item.assignedBy}</span>}
                      </div>
                      {item.notes && (
                        <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;