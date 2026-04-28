// import React, { useState, useEffect } from 'react';
// import {getAssetTransactions} from '../services/api';

// const AssetTransactionModal = ({ isOpen, onClose, assetTagId, assetSummary }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('history');

//   // Fetch transactions when modal opens or assetTagId changes
//   useEffect(() => {
//     if (isOpen && assetTagId) {
//       fetchTransactions();
//     }
//   }, [isOpen, assetTagId]);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     const result = await getAssetTransactions(assetTagId);
//     if (result.success) {
//         console.log(result.data);
//       setTransactions(result.data || []);
//     } else {
//       console.error('Failed to fetch transactions:', result.message);
//       setTransactions([]);
//     }
//     setLoading(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
//       {/* Modal Container */}
//       <div className="relative min-h-screen flex items-center justify-center p-4">
//         <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
          
//           {/* Modal Header with Asset Info */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">Asset Details</h2>
//                   <p className="text-blue-100 text-sm">Asset Tag: {assetTagId}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-white/80 hover:text-white transition-colors"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Asset Summary Cards */}
//           {assetSummary && (
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-5 bg-gray-50 border-b border-gray-100">
//               <div className="bg-white rounded-lg p-3 shadow-sm">
//                 <p className="text-xs text-gray-400 mb-1">Description</p>
//                 <p className="text-sm font-medium text-gray-700 truncate">{assetSummary.description || '—'}</p>
//               </div>
//               <div className="bg-white rounded-lg p-3 shadow-sm">
//                 <p className="text-xs text-gray-400 mb-1">Brand/Model</p>
//                 <p className="text-sm font-medium text-gray-700">{assetSummary.brand} {assetSummary.model}</p>
//               </div>
//               <div className="bg-white rounded-lg p-3 shadow-sm">
//                 <p className="text-xs text-gray-400 mb-1">Serial No</p>
//                 <p className="text-sm font-medium text-gray-700">{assetSummary.serialNumber || '—'}</p>
//               </div>
//               <div className="bg-white rounded-lg p-3 shadow-sm">
//                 <p className="text-xs text-gray-400 mb-1">Current Status</p>
//                 <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
//                   assetSummary.currentStatus === 'Checked out' ? 'bg-yellow-100 text-yellow-700' :
//                   assetSummary.currentStatus === 'Available' ? 'bg-green-100 text-green-700' :
//                   'bg-gray-100 text-gray-700'
//                 }`}>
//                   {assetSummary.currentStatus || '—'}
//                 </span>
//               </div>
//               <div className="bg-white rounded-lg p-3 shadow-sm">
//                 <p className="text-xs text-gray-400 mb-1">Book Value</p>
//                 <p className="text-sm font-semibold text-blue-600">₹{assetSummary.bookValue?.toLocaleString() || '0'}</p>
//               </div>
//             </div>
//           )}

//           {/* Tab Navigation */}
//           <div className="flex border-b border-gray-200 px-5 pt-2">
//             <button
//               onClick={() => setSelectedTab('history')}
//               className={`px-4 py-2.5 text-sm font-medium transition-all relative ${
//                 selectedTab === 'history'
//                   ? 'text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Asset History
//               </div>
//             </button>
//             <button
//               onClick={() => setSelectedTab('details')}
//               className={`px-4 py-2.5 text-sm font-medium transition-all relative ${
//                 selectedTab === 'details'
//                   ? 'text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Asset Details
//               </div>
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
//             {loading ? (
//               <div className="flex items-center justify-center py-16">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <span className="ml-3 text-gray-500">Loading transactions...</span>
//               </div>
//             ) : (
//               <>
//                 {/* History Tab */}
//                 {selectedTab === 'history' && (
//                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden m-5">
//                     <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
//                       <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <h2 className="text-sm font-semibold text-slate-700">Transaction History</h2>
//                       <span className="ml-auto text-xs text-gray-400">{transactions.length} records</span>
//                     </div>
//                     {transactions.length > 0 ? (
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-xs">
//                           <thead>
//                             <tr className="bg-slate-50 border-b border-slate-100">
//                               <th className="px-4 py-2.5 text-left text-slate-500 font-medium">Event</th>
//                               {/* <th className="px-4 py-2.5 text-left text-slate-500 font-medium">Status</th> */}
//                               <th className="px-4 py-2.5 text-left text-slate-500 font-medium">Changed From</th>
//                               <th className="px-4 py-2.5 text-left text-slate-500 font-medium">Changed To</th>
//                               <th className="px-4 py-2.5 text-left text-slate-500 font-medium">Assigned To</th>
//                               <th className="px-4 py-2.5 text-left text-slate-500 font-medium">Action By</th>
//                               <th className="px-4 py-2.5 text-left text-slate-500 font-medium">Event Date</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {transactions.map((transaction, index) => (
//                               <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
//                                 <td className="px-4 py-2.5">
//                                   <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
//                                     transaction.event === 'Check out' ? 'bg-blue-100 text-blue-700' :
//                                     transaction.event === 'Check in' ? 'bg-green-100 text-green-700' :
//                                     transaction.event === 'Warranty' ? 'bg-purple-100 text-purple-700' :
//                                     transaction.event === 'Repair' ? 'bg-red-100 text-red-700' :
//                                     'bg-gray-100 text-gray-700'
//                                   }`}>
//                                     {transaction.event || '—'}
//                                   </span>
//                                 </td>
//                                 {/* <td className="px-4 py-2.5">
//                                   <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
//                                     transaction.newStatus === 'Checked out' ? 'bg-yellow-100 text-yellow-700' :
//                                     transaction.newStatus === 'Available' ? 'bg-green-100 text-green-700' :
//                                     'bg-gray-100 text-gray-700'
//                                   }`}>
//                                     {transaction.newStatus || '—'}
//                                   </span>
//                                 </td> */}
//                                 <td className="px-4 py-2.5 text-slate-600 max-w-[150px] truncate">{transaction.changedFrom || '—'}</td>
//                                 <td className="px-4 py-2.5 text-blue-600 font-semibold max-w-[150px] truncate">{transaction.changedTo || '—'}</td>
//                                                                 <td className="px-4 py-2.5 text-blue-600 font-semibold max-w-[150px] truncate">{transaction.assignedTo || '—'}</td>
//                                 <td className="px-4 py-2.5 text-slate-600">{transaction.actionBy || '—'}</td>
//                                 <td className="px-4 py-2.5 text-slate-400">{transaction.eventDate || '—'}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center justify-center py-12 text-slate-300">
//                         <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <p className="text-xs">No transaction history available</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Details Tab */}
//                 {selectedTab === 'details' && transactions.length > 0 && (
//                   <div className="p-5 space-y-4">
//                     {/* Latest Transaction Details */}
//                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//                       <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-gray-50 to-white">
//                         <h3 className="text-sm font-semibold text-slate-700">Current Asset Information</h3>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
//                         <div className="space-y-3">
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Asset Tag</div>
//                             <div className="flex-1 text-sm font-mono text-gray-700">{transactions[0]?.assetTagId || '—'}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Description</div>
//                             <div className="flex-1 text-sm text-gray-700">{transactions[0]?.description || '—'}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Brand / Model</div>
//                             <div className="flex-1 text-sm text-gray-700">{transactions[0]?.brand} {transactions[0]?.model}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Serial No</div>
//                             <div className="flex-1 text-sm text-gray-700">{transactions[0]?.serialNumber || '—'}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Department</div>
//                             <div className="flex-1 text-sm text-gray-700">{transactions[0]?.department || '—'}</div>
//                           </div>
//                         </div>
//                         <div className="space-y-3">
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Location</div>
//                             <div className="flex-1 text-sm text-gray-700">{transactions[0]?.location || '—'}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Assigned To</div>
//                             <div className="flex-1 text-sm text-gray-700">{transactions[0]?.assignedTo || '—'}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Cost</div>
//                             <div className="flex-1 text-sm font-semibold text-green-600">₹{transactions[0]?.cost?.toLocaleString() || '0'}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Book Value</div>
//                             <div className="flex-1 text-sm font-semibold text-blue-600">₹{transactions[0]?.bookValue?.toLocaleString() || '0'}</div>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <div className="w-24 text-xs text-gray-400">Asset Type</div>
//                             <div className="flex-1 text-sm text-gray-700">{transactions[0]?.assetType || '—'}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Notes Section */}
//                     {transactions[0]?.notes && (
//                       <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
//                         <div className="flex items-start gap-2">
//                           <svg className="w-4 h-4 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="text-xs font-medium text-yellow-800 mb-1">Notes</p>
//                             <p className="text-sm text-yellow-700">{transactions[0]?.notes}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Modal Footer */}
//           <div className="border-t border-gray-200 px-5 py-3 flex justify-end gap-2">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
//             >
//               Close
//             </button>
//             <button
//               onClick={fetchTransactions}
//               className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetTransactionModal;


import React, { useState, useEffect } from 'react';
import { getAssetTransactions } from '../services/api';

const AssetTransactionModal = ({ isOpen, onClose, assetTagId, assetSummary }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('history');
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    if (isOpen && assetTagId) {
      fetchTransactions();
    }
  }, [isOpen, assetTagId]);

  const fetchTransactions = async () => {
    setLoading(true);
    const result = await getAssetTransactions(assetTagId);
    if (result.success) {
      console.log(result.data);
      setTransactions(result.data || []);
    } else {
      console.error('Failed to fetch transactions:', result.message);
      setTransactions([]);
    }
    setLoading(false);
  };

  const toggleRowExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Asset Details</h2>
                  <p className="text-blue-100 text-sm">Asset Tag: {assetTagId}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Asset Summary Cards */}
          {assetSummary && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-5 bg-gray-50 border-b border-gray-100">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-sm font-medium text-gray-700 truncate">{assetSummary.description || '—'}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">Brand/Model</p>
                <p className="text-sm font-medium text-gray-700">{assetSummary.brand} {assetSummary.model}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">Serial No</p>
                <p className="text-sm font-medium text-gray-700">{assetSummary.serialNumber || '—'}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">Current Status</p>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  assetSummary.currentStatus === 'Checked out' ? 'bg-yellow-100 text-yellow-700' :
                  assetSummary.currentStatus === 'Available' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {assetSummary.currentStatus || '—'}
                </span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">Book Value</p>
                <p className="text-sm font-semibold text-blue-600">₹{assetSummary.bookValue?.toLocaleString() || '0'}</p>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 px-5 pt-2">
            <button
              onClick={() => setSelectedTab('history')}
              className={`px-4 py-2.5 text-sm font-medium transition-all relative ${
                selectedTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Transaction History
              </div>
            </button>
            <button
              onClick={() => setSelectedTab('details')}
              className={`px-4 py-2.5 text-sm font-medium transition-all relative ${
                selectedTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Asset Details
              </div>
            </button>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-500">Loading transactions...</span>
              </div>
            ) : (
              <>
                {/* History Tab */}
                {selectedTab === 'history' && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden m-5">
                    <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h2 className="text-sm font-semibold text-slate-700">Transaction History</h2>
                      <span className="ml-auto text-xs text-gray-400">{transactions.length} records</span>
                    </div>
                    {transactions.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="px-4 py-2.5 text-left">Event</th>
                              <th className="px-4 py-2.5 text-left">Changed From/To</th>
                              <th className="px-4 py-2.5 text-left">Assigned To</th>
                              <th className="px-4 py-2.5 text-left">Contact</th>
                              <th className="px-4 py-2.5 text-left">Action By</th>
                              <th className="px-4 py-2.5 text-left">Event Date</th>
                              <th className="px-4 py-2.5 text-left">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((transaction, index) => (
                              <React.Fragment key={index}>
                                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                  <td className="px-4 py-2.5">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                                      transaction.event === 'Check out' ? 'bg-blue-100 text-blue-700' :
                                      transaction.event === 'Check in' ? 'bg-green-100 text-green-700' :
                                      transaction.event === 'Warranty' ? 'bg-purple-100 text-purple-700' :
                                      transaction.event === 'Repair' ? 'bg-red-100 text-red-700' :
                                      transaction.event === 'Asset edit' ? 'bg-orange-100 text-orange-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {transaction.event || '—'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5">
                                    {transaction.changedFrom && transaction.changedTo ? (
                                      <span className="text-slate-600">{transaction.changedFrom} → <span className="text-blue-600 font-medium">{transaction.changedTo}</span></span>
                                    ) : (
                                      <span className="text-gray-400">—</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5">
                                    {transaction.assignmentAssignedTo || transaction.assignedTo ? (
                                      <div>
                                        <div className="font-medium text-gray-800">{transaction.assignmentAssignedTo || transaction.assignedTo}</div>
                                        <div className="text-xs text-gray-400">{transaction.assignmentEmployeeId}</div>
                                      </div>
                                    ) : (
                                      <span className="text-gray-400">—</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5">
                                    {transaction.assignmentEmail ? (
                                      <div className="text-xs space-y-0.5">
                                        <div className="text-gray-600">{transaction.assignmentEmail}</div>
                                        <div className="text-gray-500">{transaction.assignmentPhone}</div>
                                        <div className="text-gray-400 text-[10px]">{transaction.assignmentTitle}</div>
                                      </div>
                                    ) : (
                                      <span className="text-gray-400">—</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5 text-gray-600">{transaction.actionBy || transaction.assignmentCheckOutActionBy || transaction.assignmentCheckInActionBy || '—'}</td>
                                  <td className="px-4 py-2.5 text-gray-400">{transaction.eventDate || '—'}</td>
                                  <td className="px-4 py-2.5">
                                    {(transaction.assignmentCheckOutNotes || transaction.assignmentCheckInNotes || transaction.notes) && (
                                      <button
                                        onClick={() => toggleRowExpand(index)}
                                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedRow === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                        </svg>
                                        {expandedRow === index ? 'Hide' : 'View'} Notes
                                      </button>
                                    )}
                                  </td>
                                </tr>
                                {/* Expandable Notes Row */}
                                {expandedRow === index && (
                                  <tr className="bg-yellow-50/30">
                                    <td colSpan="7" className="px-4 py-3">
                                      <div className="space-y-2">
                                        {transaction.assignmentCheckOutNotes && (
                                          <div>
                                            <p className="text-xs font-medium text-blue-600 mb-1">Check-out Notes:</p>
                                            <p className="text-xs text-gray-700 bg-white p-2 rounded border border-blue-100">{transaction.assignmentCheckOutNotes}</p>
                                          </div>
                                        )}
                                        {transaction.assignmentCheckInNotes && (
                                          <div>
                                            <p className="text-xs font-medium text-green-600 mb-1">Check-in Notes:</p>
                                            <p className="text-xs text-gray-700 bg-white p-2 rounded border border-green-100">{transaction.assignmentCheckInNotes}</p>
                                          </div>
                                        )}
                                        {transaction.notes && (
                                          <div>
                                            <p className="text-xs font-medium text-yellow-600 mb-1">General Notes:</p>
                                            <p className="text-xs text-gray-700 bg-white p-2 rounded border border-yellow-100">{transaction.notes}</p>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                        <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs">No transaction history available</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Details Tab - Keep your existing details tab code */}
                {selectedTab === 'details' && transactions.length > 0 && (
                  <div className="p-5 space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-gray-50 to-white">
                        <h3 className="text-sm font-semibold text-slate-700">Current Asset Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Asset Tag</div>
                            <div className="flex-1 text-sm font-mono text-gray-700">{transactions[0]?.assetTagId || '—'}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Description</div>
                            <div className="flex-1 text-sm text-gray-700">{transactions[0]?.description || '—'}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Brand / Model</div>
                            <div className="flex-1 text-sm text-gray-700">{transactions[0]?.brand} {transactions[0]?.model}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Serial No</div>
                            <div className="flex-1 text-sm text-gray-700">{transactions[0]?.serialNumber || '—'}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Department</div>
                            <div className="flex-1 text-sm text-gray-700">{transactions[0]?.department || '—'}</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Location</div>
                            <div className="flex-1 text-sm text-gray-700">{transactions[0]?.location || '—'}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Assigned To</div>
                            <div className="flex-1 text-sm text-gray-700">{transactions[0]?.assignedTo || '—'}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Cost</div>
                            <div className="flex-1 text-sm font-semibold text-green-600">₹{Number(transactions[0]?.cost)?.toLocaleString() || '0'}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Book Value</div>
                            <div className="flex-1 text-sm font-semibold text-blue-600">₹{transactions[0]?.bookValue?.toLocaleString() || '0'}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-24 text-xs text-gray-400">Asset Type</div>
                            <div className="flex-1 text-sm text-gray-700">{transactions[0]?.assetType || '—'}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {transactions[0]?.notes && (
                      <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-xs font-medium text-yellow-800 mb-1">Notes</p>
                            <p className="text-sm text-yellow-700">{transactions[0]?.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-200 px-5 py-3 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
              Close
            </button>
            <button onClick={fetchTransactions} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTransactionModal;