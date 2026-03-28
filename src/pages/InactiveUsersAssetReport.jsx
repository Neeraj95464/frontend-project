// import React, { useEffect, useState } from "react";
// import { getInactiveAssignmentsReport } from "../services/api";

// const InactiveUsersAssetReport = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     const res = await getInactiveAssignmentsReport();
//     if (res.success) {
//       setData(res.data);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         Inactive User Assignments Report
//       </h1>

//       <div className="bg-white shadow-lg rounded-2xl p-4 overflow-x-auto">
//         {loading ? (
//           <p className="text-center py-10">Loading...</p>
//         ) : (
//           <table className="w-full text-sm text-left">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="p-3">Emp ID</th>
//                 <th className="p-3">User Name</th>
//                 <th className="p-3">Type</th>
//                 <th className="p-3">Asset Tag</th>
//                 <th className="p-3">Serial No</th>
//                 <th className="p-3">SIM Number</th>
//                 <th className="p-3">Provider</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center p-5">
//                     No Data Found
//                   </td>
//                 </tr>
//               ) : (
//                 data.map((item, index) => (
//                   <tr
//                     key={index}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="p-3">{item.employeeId}</td>
//                     <td className="p-3">{item.username}</td>
//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 rounded text-xs ${
//                           item.type === "ASSET"
//                             ? "bg-blue-100 text-blue-700"
//                             : "bg-green-100 text-green-700"
//                         }`}
//                       >
//                         {item.type}
//                       </span>
//                     </td>

//                     <td className="p-3">{item.assetTag || "-"}</td>
//                     <td className="p-3">{item.assetSerialNumber || "-"}</td>
//                     <td className="p-3">{item.simPhoneNumber || "-"}</td>
//                     <td className="p-3">{item.simProvider || "-"}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InactiveUsersAssetReport;


import React, { useEffect, useState } from "react";
import { getInactiveAssignmentsReport } from "../services/api";
import { 
  UserIcon, 
  ComputerDesktopIcon, 
  DevicePhoneMobileIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const InactiveUsersAssetReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, has-assets, has-sims
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getInactiveAssignmentsReport();
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  const toggleRow = (employeeId) => {
    setExpandedRows(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    let sortedData = [...data];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key === 'totalItems') {
          aVal = (a.assets?.length || 0) + (a.simCards?.length || 0);
          bVal = (b.assets?.length || 0) + (b.simCards?.length || 0);
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortedData;
  };

  const getFilteredData = () => {
    let filteredData = getSortedData();
    
    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter(item => 
        item.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (filterType === 'has-assets') {
      filteredData = filteredData.filter(item => item.assets && item.assets.length > 0);
    } else if (filterType === 'has-sims') {
      filteredData = filteredData.filter(item => item.simCards && item.simCards.length > 0);
    }
    
    return filteredData;
  };

  const exportToCSV = () => {
    const allData = [];
    filteredData.forEach(user => {
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
    a.download = `inactive-user-assignments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredData = getFilteredData();
  const totalUsers = filteredData.length;
  const totalAssets = filteredData.reduce((sum, user) => sum + (user.assets?.length || 0), 0);
  const totalSims = filteredData.reduce((sum, user) => sum + (user.simCards?.length || 0), 0);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="lg:ml-48 bg-gray-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inactive User Assignments Report
          </h1>
          <p className="text-gray-600">
            Assets and SIM cards assigned to inactive users
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <UserIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Assigned Assets</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalAssets}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <ComputerDesktopIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Assigned SIM Cards</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalSims}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
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
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="has-assets">Has Assets</option>
                <option value="has-sims">Has SIM Cards</option>
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
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20">
              <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No data found</p>
              <p className="text-gray-400 text-sm mt-2">No inactive users with assignments</p>
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
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assets
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SIM Cards
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('totalItems')}>
                      Total Items {sortConfig.key === 'totalItems' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((user) => {
                    const isExpanded = expandedRows[user.employeeId];
                    const assetCount = user.assets?.length || 0;
                    const simCount = user.simCards?.length || 0;
                    const totalItems = assetCount + simCount;
                    
                    return (
                      <React.Fragment key={user.employeeId}>
                        <tr className="hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => toggleRow(user.employeeId)}>
                          <td className="px-4 py-3">
                            {totalItems > 0 && (
                              isExpanded ? 
                                <ChevronUpIcon className="w-4 h-4 text-gray-400" /> : 
                                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                            )}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">{user.employeeId}</td>
                          <td className="px-4 py-3 text-gray-700">{user.username}</td>
                          <td className="px-4 py-3 text-center">
                            {assetCount > 0 ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {assetCount} asset{assetCount !== 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {simCount > 0 ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {simCount} SIM{simCount !== 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="font-medium">{totalItems}</span>
                          </td>
                        </tr>
                        
                        {/* Expanded Details */}
                        {isExpanded && totalItems > 0 && (
                          <tr className="bg-gray-50">
                            <td colSpan="6" className="px-4 py-4">
                              <div className="space-y-4">
                                {/* Assets Section */}
                                {assetCount > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                      <ComputerDesktopIcon className="w-4 h-4 text-blue-600" />
                                      Assigned Assets
                                    </h4>
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <table className="w-full text-xs">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th className="px-3 py-2 text-left">Asset Tag</th>
                                            <th className="px-3 py-2 text-left">Serial No</th>
                                            <th className="px-3 py-2 text-left">Model</th>
                                            <th className="px-3 py-2 text-left">Status</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                          {user.assets.map((asset, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                              <td className="px-3 py-2 font-mono text-xs">{asset.assetTag}</td>
                                              <td className="px-3 py-2 font-mono text-xs">{asset.serialNumber}</td>
                                              <td className="px-3 py-2">{asset.model || '-'}</td>
                                              <td className="px-3 py-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                                  ${asset.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                                                    asset.status === 'INACTIVE' ? 'bg-red-100 text-red-700' : 
                                                    'bg-gray-100 text-gray-700'}`}>
                                                  {asset.status || '-'}
                                                </span>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                                
                                {/* SIM Cards Section */}
                                {simCount > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                      <DevicePhoneMobileIcon className="w-4 h-4 text-green-600" />
                                      Assigned SIM Cards
                                    </h4>
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <table className="w-full text-xs">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th className="px-3 py-2 text-left">Phone Number</th>
                                            <th className="px-3 py-2 text-left">Provider</th>
                                            <th className="px-3 py-2 text-left">Status</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                          {user.simCards.map((sim, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                              <td className="px-3 py-2 font-mono text-xs">{sim.phoneNumber}</td>
                                              <td className="px-3 py-2">
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                                  {sim.provider}
                                                </span>
                                              </td>
                                              <td className="px-3 py-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                                  ${sim.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-700' : 
                                                    sim.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                                                    'bg-gray-100 text-gray-700'}`}>
                                                  {sim.status || '-'}
                                                </span>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
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
        
        {/* Footer with summary */}
        {!loading && filteredData.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 text-right">
            Showing {filteredData.length} of {data.length} inactive users
          </div>
        )}
      </div>
    </div>
  );
};

export default InactiveUsersAssetReport;