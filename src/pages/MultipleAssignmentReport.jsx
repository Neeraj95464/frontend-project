// import React, { useEffect, useState } from "react";
// import { getMultipleAssignmentsReport } from "../services/api";

// const MultipleAssignmentReport = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     setLoading(true);
//     const res = await getMultipleAssignmentsReport();
//     if (res.success) {
//       setData(res.data);
//     }
//     setLoading(false);
//   };

//   const toggleRow = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         Multiple Assignment Report
//       </h1>

//       <div className="bg-white rounded-2xl shadow-lg p-4 overflow-x-auto">
//         {loading ? (
//           <p className="text-center py-10">Loading...</p>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="p-3">Emp ID</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Assets</th>
//                 <th className="p-3">SIMs</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center p-5">
//                     No Violations Found ✅
//                   </td>
//                 </tr>
//               ) : (
//                 data.map((user, index) => (
//                   <React.Fragment key={index}>
//                     <tr className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3">{user.employeeId}</td>
//                       <td className="p-3">{user.username}</td>

//                       <td className="p-3">
//                         <span
//                           className={`px-2 py-1 rounded text-xs ${
//                             user.assetCount > 1
//                               ? "bg-red-100 text-red-700"
//                               : "bg-green-100 text-green-700"
//                           }`}
//                         >
//                           {user.assetCount}
//                         </span>
//                       </td>

//                       <td className="p-3">
//                         <span
//                           className={`px-2 py-1 rounded text-xs ${
//                             user.simCount > 1
//                               ? "bg-red-100 text-red-700"
//                               : "bg-green-100 text-green-700"
//                           }`}
//                         >
//                           {user.simCount}
//                         </span>
//                       </td>

//                       <td className="p-3">
//                         <button
//                           onClick={() => toggleRow(index)}
//                           className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
//                         >
//                           {expandedRow === index ? "Hide" : "View"}
//                         </button>
//                       </td>
//                     </tr>

//                     {/* 🔽 Expandable Section */}
//                     {expandedRow === index && (
//                       <tr className="bg-gray-50">
//                         <td colSpan="5" className="p-4">
//                           <div className="grid grid-cols-2 gap-6">

//                             {/* 🔹 Assets */}
//                             <div>
//                               <h3 className="font-semibold text-gray-700 mb-2">
//                                 Assets
//                               </h3>
//                               {user.assets.length === 0 ? (
//                                 <p className="text-sm text-gray-400">
//                                   No Assets
//                                 </p>
//                               ) : (
//                                 <ul className="space-y-2">
//                                   {user.assets.map((asset, i) => (
//                                     <li
//                                       key={i}
//                                       className="p-2 bg-white border rounded shadow-sm"
//                                     >
//                                       <p><b>Tag:</b> {asset.assetTag}</p>
//                                       <p><b>Serial:</b> {asset.serialNumber}</p>
//                                       <p><b>Model:</b> {asset.model}</p>
//                                       <p><b>Status:</b> {asset.status}</p>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </div>

//                             {/* 🔹 SIM Cards */}
//                             <div>
//                               <h3 className="font-semibold text-gray-700 mb-2">
//                                 SIM Cards
//                               </h3>
//                               {user.simCards.length === 0 ? (
//                                 <p className="text-sm text-gray-400">
//                                   No SIMs
//                                 </p>
//                               ) : (
//                                 <ul className="space-y-2">
//                                   {user.simCards.map((sim, i) => (
//                                     <li
//                                       key={i}
//                                       className="p-2 bg-white border rounded shadow-sm"
//                                     >
//                                       <p><b>Number:</b> {sim.phoneNumber}</p>
//                                       <p><b>Provider:</b> {sim.provider}</p>
//                                       <p><b>Status:</b> {sim.status}</p>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </div>

//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultipleAssignmentReport;



import React, { useEffect, useState, useMemo } from "react";
import { getMultipleAssignmentsReport } from "../services/api";
import { 
  UserIcon, 
  ComputerDesktopIcon, 
  DevicePhoneMobileIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const MultipleAssignmentReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterViolation, setFilterViolation] = useState("all"); // all, asset-violation, sim-violation, both-violation
  const [sortConfig, setSortConfig] = useState({ key: 'totalViolations', direction: 'desc' });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    const res = await getMultipleAssignmentsReport();
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getViolationType = (user) => {
    const assetViolation = user.assetCount > 1;
    const simViolation = user.simCount > 1;
    
    if (assetViolation && simViolation) return 'both';
    if (assetViolation) return 'asset';
    if (simViolation) return 'sim';
    return 'none';
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by violation type
    if (filterViolation !== 'all') {
      filtered = filtered.filter(user => {
        const violationType = getViolationType(user);
        if (filterViolation === 'asset-violation') return violationType === 'asset' || violationType === 'both';
        if (filterViolation === 'sim-violation') return violationType === 'sim' || violationType === 'both';
        if (filterViolation === 'both-violation') return violationType === 'both';
        return true;
      });
    }
    
    // Sort data
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal, bVal;
        switch(sortConfig.key) {
          case 'employeeId':
            aVal = a.employeeId;
            bVal = b.employeeId;
            break;
          case 'username':
            aVal = a.username;
            bVal = b.username;
            break;
          case 'assetCount':
            aVal = a.assetCount;
            bVal = b.assetCount;
            break;
          case 'simCount':
            aVal = a.simCount;
            bVal = b.simCount;
            break;
          case 'totalViolations':
            aVal = (a.assetCount > 1 ? a.assetCount - 1 : 0) + (a.simCount > 1 ? a.simCount - 1 : 0);
            bVal = (b.assetCount > 1 ? b.assetCount - 1 : 0) + (b.simCount > 1 ? b.simCount - 1 : 0);
            break;
          default:
            return 0;
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }, [data, searchTerm, filterViolation, sortConfig]);

  const exportToCSV = () => {
    const allData = [];
    filteredAndSortedData.forEach(user => {
      // Add assets
      user.assets?.forEach(asset => {
        allData.push({
          'Employee ID': user.employeeId,
          'User Name': user.username,
          'Type': 'ASSET',
          'Asset Tag': asset.assetTag,
          'Serial No': asset.serialNumber,
          'Model': asset.model || '-',
          'Status': asset.status || '-',
          'SIM Number': '-',
          'Provider': '-',
          'SIM Status': '-'
        });
      });
      
      // Add SIM cards
      user.simCards?.forEach(sim => {
        allData.push({
          'Employee ID': user.employeeId,
          'User Name': user.username,
          'Type': 'SIM',
          'Asset Tag': '-',
          'Serial No': '-',
          'Model': '-',
          'Status': '-',
          'SIM Number': sim.phoneNumber,
          'Provider': sim.provider,
          'SIM Status': sim.status
        });
      });
    });
    
    const headers = Object.keys(allData[0] || {});
    const csvRows = [
      headers.join(','),
      ...allData.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ];
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `multiple-assignments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Statistics
  const totalUsers = filteredAndSortedData.length;
  const usersWithMultipleAssets = filteredAndSortedData.filter(u => u.assetCount > 1).length;
  const usersWithMultipleSims = filteredAndSortedData.filter(u => u.simCount > 1).length;
  const usersWithBoth = filteredAndSortedData.filter(u => u.assetCount > 1 && u.simCount > 1).length;
  const totalViolations = filteredAndSortedData.reduce((sum, u) => {
    return sum + (u.assetCount > 1 ? u.assetCount - 1 : 0) + (u.simCount > 1 ? u.simCount - 1 : 0);
  }, 0);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

    <div className="lg:ml-48 bg-gray-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Multiple Assignment Report
            </h1>
            <button
              onClick={fetchReport}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          <p className="text-gray-600">
            Users with multiple assets or SIM cards assigned (more than 1)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Users with Violations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
                <p className="text-xs text-gray-400 mt-1">out of {data.length} total</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Multiple Assets</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{usersWithMultipleAssets}</p>
                {/* <p className="text-xs text-gray-400 mt-1">users with > 1 asset</p> */}

                <p className="text-xs text-gray-400 mt-1">
  users with &gt; 1 asset
</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <ComputerDesktopIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Multiple SIMs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{usersWithMultipleSims}</p>
                {/* <p className="text-xs text-gray-400 mt-1">users with >1 SIM</p> */}

                <p className="text-xs text-gray-400 mt-1">
  users with &gt; 1 asset
</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Both Violations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{usersWithBoth}</p>
                <p className="text-xs text-gray-400 mt-1">has both {" > "} 1 asset & SIM</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <InformationCircleIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Employee ID or Name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterViolation}
                onChange={(e) => setFilterViolation(e.target.value)}
              >
                <option value="all">All Violations</option>
                <option value="asset-violation">Multiple Assets Only</option>
                <option value="sim-violation">Multiple SIMs Only</option>
                <option value="both-violation">Both Violations</option>
              </select>
            </div>
            
            <button
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Export to CSV
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredAndSortedData.length === 0 ? (
            <div className="text-center py-20">
              <CheckCircleIcon className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No violations found!</p>
              <p className="text-gray-400 text-sm mt-2">All users have proper assignment limits</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="w-10 px-4 py-3"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('employeeId')}>
                      Emp ID {sortConfig.key === 'employeeId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('username')}>
                      User Name {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('assetCount')}>
                      Assets {sortConfig.key === 'assetCount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('simCount')}>
                      SIMs {sortConfig.key === 'simCount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('totalViolations')}>
                      Violations {sortConfig.key === 'totalViolations' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedData.map((user, index) => {
                    const violationType = getViolationType(user);
                    const assetViolation = user.assetCount > 1;
                    const simViolation = user.simCount > 1;
                    const totalViolationCount = (assetViolation ? user.assetCount - 1 : 0) + (simViolation ? user.simCount - 1 : 0);
                    
                    return (
                      <React.Fragment key={user.employeeId}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            {(user.assets?.length > 0 || user.simCards?.length > 0) && (
                              <button
                                onClick={() => toggleRow(index)}
                                className="focus:outline-none"
                              >
                                {expandedRow === index ? 
                                  <ChevronUpIcon className="w-4 h-4 text-gray-400" /> : 
                                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                                }
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">{user.employeeId}</td>
                          <td className="px-4 py-3 text-gray-700">{user.username}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                assetViolation 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {user.assetCount}
                              </span>
                              {assetViolation && (
                                <span className="text-xs text-red-500">(Excess: {user.assetCount - 1})</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                simViolation 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {user.simCount}
                              </span>
                              {simViolation && (
                                <span className="text-xs text-red-500">(Excess: {user.simCount - 1})</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                              {totalViolationCount} violation{totalViolationCount !== 1 ? 's' : ''}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {(user.assets?.length > 0 || user.simCards?.length > 0) && (
                              <button
                                onClick={() => toggleRow(index)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
                              >
                                {expandedRow === index ? 'Hide Details' : 'View Details'}
                              </button>
                            )}
                          </td>
                        </tr>
                        
                        {/* Expanded Details Section */}
                        {expandedRow === index && (
                          <tr className="bg-gray-50">
                            <td colSpan="7" className="px-4 py-4">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                
                                {/* Assets Section */}
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                      <ComputerDesktopIcon className="w-4 h-4 text-blue-600" />
                                      Assigned Assets ({user.assetCount})
                                      {assetViolation && (
                                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                          Multiple Assignment
                                        </span>
                                      )}
                                    </h3>
                                  </div>
                                  
                                  {user.assets?.length === 0 ? (
                                    <div className="p-8 text-center text-gray-400">
                                      <ComputerDesktopIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                      <p className="text-sm">No assets assigned</p>
                                    </div>
                                  ) : (
                                    <div className="divide-y divide-gray-100">
                                      {user.assets.map((asset, idx) => (
                                        <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                              <p className="text-xs text-gray-500 mb-1">Asset Tag</p>
                                              <p className="font-mono font-medium text-gray-900">{asset.assetTag}</p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-gray-500 mb-1">Serial Number</p>
                                              <p className="font-mono text-gray-700">{asset.serialNumber}</p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-gray-500 mb-1">Model</p>
                                              <p className="text-gray-700">{asset.model || '-'}</p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-gray-500 mb-1">Status</p>
                                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                                                ${asset.status === 'ACTIVE' || asset.status === 'CHECKED_OUT' ? 'bg-green-100 text-green-700' : 
                                                  asset.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                                                  'bg-gray-100 text-gray-700'}`}>
                                                {asset.status || '-'}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                
                                {/* SIM Cards Section */}
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                  <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                      <DevicePhoneMobileIcon className="w-4 h-4 text-green-600" />
                                      Assigned SIM Cards ({user.simCount})
                                      {simViolation && (
                                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                          Multiple Assignment
                                        </span>
                                      )}
                                    </h3>
                                  </div>
                                  
                                  {user.simCards?.length === 0 ? (
                                    <div className="p-8 text-center text-gray-400">
                                      <DevicePhoneMobileIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                      <p className="text-sm">No SIM cards assigned</p>
                                    </div>
                                  ) : (
                                    <div className="divide-y divide-gray-100">
                                      {user.simCards.map((sim, idx) => (
                                        <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                              <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                                              <p className="font-mono font-medium text-gray-900">{sim.phoneNumber}</p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-gray-500 mb-1">Provider</p>
                                              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                                {sim.provider}
                                              </span>
                                            </div>
                                            <div className="col-span-2">
                                              <p className="text-xs text-gray-500 mb-1">Status</p>
                                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                                                ${sim.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-700' : 
                                                  sim.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                                                  'bg-gray-100 text-gray-700'}`}>
                                                {sim.status || '-'}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {!loading && filteredAndSortedData.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <div>
              Showing {filteredAndSortedData.length} of {data.length} users with violations
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></div>
                <span>Violation</span>
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div>
                <span>Within limit</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleAssignmentReport;