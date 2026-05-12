

// import LicenseFormModal from "../components/LicenseFormModal";
// import {
//   fetchFilteredLicenses,
//   exportFilteredLicenses,
//   getVendors,
//   getSites,
//   getLocationsBySite,
// } from "../services/api";
// import React, { useEffect, useState } from "react";
// import { 
//   Plus, 
//   Download, 
//   Filter, 
//   ChevronLeft, 
//   ChevronRight, 
//   Eye,
//   Edit2,
//   Calendar,
//   DollarSign,
//   RefreshCw,
//   MapPin,
//   Building,
//   User,
//   Phone,
//   Tag,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   XCircle,
//   Search
// } from "lucide-react";

// const SoftwareLicensePage = () => {
//   const [licenses, setLicenses] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [selectedLicense, setSelectedLicense] = useState(null);

//   // Vendor search states
//   const [vendorSearchTerm, setVendorSearchTerm] = useState("");
//   const [vendorLoading, setVendorLoading] = useState(false);
//   const [vendorDropdownOpen, setVendorDropdownOpen] = useState(false);

//   const [filters, setFilters] = useState({
//     vendorId: "",
//     siteId: "",
//     locationId: "",
//     softwareCategory: "",
//     status: "",
//     keyword: "",
//     page: 0,
//     size: 10,
//   });

//   const [pagination, setPagination] = useState({
//     page: 0,
//     totalPages: 0,
//     totalElements: 0,
//     last: false,
//   });

//   const softwareCategories = ["ERP", "CRM", "ANTIVIRUS", "ACCOUNTING", "OTHER", "FIREWALL"];
//   const statuses = ["ACTIVE", "EXPIRED", "SUSPENDED", "EXPIRING_SOON"];

//   // ================= LOAD DROPDOWNS =================
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       // Load initial vendors without search
//       const vendorData = await getVendors(0, 50, 'id', 'desc', '', ''); // Load more vendors initially
//       const siteData = await getSites();
//       setVendors(Array.isArray(vendorData.content) ? vendorData.content : []);
//       setSites(Array.isArray(siteData) ? siteData : []);
//     } catch (error) {
//       console.error("Error loading initial data:", error);
//       setVendors([]);
//       setSites([]);
//     }
//   };

//   // Search vendors
//   const searchVendors = async (searchTerm) => {
//     if (searchTerm.length < 2 && searchTerm.length > 0) {
//       return; // Only search when term has 2+ characters or empty
//     }
    
//     setVendorLoading(true);
//     try {
//       const vendorData = await getVendors(0, 50, 'id', 'desc', searchTerm, searchTerm);
//       setVendors(Array.isArray(vendorData.content) ? vendorData.content : []);
//       setVendorDropdownOpen(true);
//     } catch (error) {
//       console.error("Error searching vendors:", error);
//     } finally {
//       setVendorLoading(false);
//     }
//   };

//   // Debounced vendor search
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (vendorSearchTerm !== undefined) {
//         searchVendors(vendorSearchTerm);
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [vendorSearchTerm]);

//   useEffect(() => {
//     if (filters.siteId) {
//       getLocationsBySite(filters.siteId).then(locationsData => {
//         setLocations(Array.isArray(locationsData) ? locationsData : []);
//       }).catch(error => {
//         console.error("Error loading locations:", error);
//         setLocations([]);
//       });
//     } else {
//       setLocations([]);
//     }
//   }, [filters.siteId]);

//   // ================= LOAD LICENSES =================
//   useEffect(() => {
//     loadLicenses();
//   }, [filters]);

//   const loadLicenses = async () => {
//     setLoading(true);
//     try {
//       const res = await fetchFilteredLicenses(filters);
      
//       if (res && res.content) {
//         setLicenses(Array.isArray(res.content) ? res.content : []);
//         setPagination({
//           page: res.number || res.page || 0,
//           totalPages: res.totalPages || 0,
//           totalElements: res.totalElements || 0,
//           last: res.last || false,
//         });
//       } else if (Array.isArray(res)) {
//         setLicenses(res);
//         setPagination({
//           page: 0,
//           totalPages: 1,
//           totalElements: res.length,
//           last: true,
//         });
//       } else {
//         setLicenses([]);
//         setPagination({
//           page: 0,
//           totalPages: 0,
//           totalElements: 0,
//           last: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error loading licenses:", error);
//       setLicenses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//       page: 0,
//     });
//   };

//   const handleVendorSelect = (vendorId) => {
//     setFilters({
//       ...filters,
//       vendorId: vendorId,
//       page: 0,
//     });
//     setVendorSearchTerm("");
//     setVendorDropdownOpen(false);
//   };

//   const handleExport = async () => {
//     try {
//       await exportFilteredLicenses(filters);
//     } catch (error) {
//       console.error("Error exporting licenses:", error);
//     }
//   };

//   const prevPage = () => {
//     if (pagination.page > 0) setFilters({ ...filters, page: filters.page - 1 });
//   };

//   const nextPage = () => {
//     if (!pagination.last) setFilters({ ...filters, page: filters.page + 1 });
//   };

//   const handleViewDetails = (license) => {
//     setSelectedLicense(license);
//     setViewModalOpen(true);
//   };

//   const getStatusBadge = (status) => {
//     switch(status) {
//       case 'ACTIVE':
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit"><CheckCircle size={12} /> Active</span>;
//       case 'EXPIRED':
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1 w-fit"><XCircle size={12} /> Expired</span>;
//       case 'SUSPENDED':
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 flex items-center gap-1 w-fit"><AlertCircle size={12} /> Suspended</span>;
//       case 'EXPIRING_SOON':
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit"><Clock size={12} /> Expiring Soon</span>;
//       default:
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">{status}</span>;
//     }
//   };

//   const getCategoryIcon = (category) => {
//     switch(category) {
//       case 'ERP': return '💼';
//       case 'CRM': return '🤝';
//       case 'ANTIVIRUS': return '🛡️';
//       case 'ACCOUNTING': return '💰';
//       case 'FIREWALL': return '🔥';
//       default: return '📦';
//     }
//   };

//   // Calculate stats from the current page's licenses
//   const expiringSoonCount = licenses.filter(l => l.status === 'EXPIRING_SOON').length;
//   const activeCount = licenses.filter(l => l.status === 'ACTIVE').length;
//   const totalCost = licenses.reduce((sum, l) => sum + (l.cost || 0), 0);

//   // Get selected vendor name
//   const getSelectedVendorName = () => {
//     if (!filters.vendorId) return "All Vendors";
//     const vendor = vendors.find(v => v.id == filters.vendorId);
//     return vendor ? vendor.name : "All Vendors";
//   };

//   return (
//     <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Contracts and Licenses Management
//             </h1>
//           </div>

//           <button
//             onClick={() => {
//               setEditData(null);
//               setModalOpen(true);
//             }}
//             className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
//           >
//             <Plus size={20} />
//             New License
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
//           <p className="text-gray-500 text-sm">Total Licenses</p>
//           <p className="text-2xl font-bold text-gray-800">{pagination.totalElements}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
//           <p className="text-gray-500 text-sm">Active Licenses</p>
//           <p className="text-2xl font-bold text-green-600">{activeCount}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
//           <p className="text-gray-500 text-sm">Expiring Soon</p>
//           <p className="text-2xl font-bold text-yellow-600">{expiringSoonCount}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
//           <p className="text-gray-500 text-sm">Total Investment</p>
//           <p className="text-2xl font-bold text-purple-600">₹{totalCost.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Main Card */}
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//         {/* Top Bar */}
//         <div className="border-b bg-gray-50 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="px-4 py-2 text-sm bg-white hover:bg-gray-100 rounded-lg border border-gray-300 flex items-center gap-2 transition"
//             >
//               <Filter size={16} />
//               {showFilters ? "Hide Filters" : "Show Filters"}
//             </button>

//             <button
//               onClick={handleExport}
//               className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition shadow-sm"
//             >
//               <Download size={16} />
//               Export
//             </button>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-1.5 text-sm">
//               <button
//                 onClick={prevPage}
//                 disabled={pagination.page === 0}
//                 className="p-1 hover:bg-gray-100 rounded disabled:opacity-40 transition"
//               >
//                 <ChevronLeft size={16} />
//               </button>
//               <span className="font-medium">
//                 Page {pagination.page + 1} of {pagination.totalPages || 1}
//               </span>
//               <button
//                 onClick={nextPage}
//                 disabled={pagination.last}
//                 className="p-1 hover:bg-gray-100 rounded disabled:opacity-40 transition"
//               >
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//             <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
//               Total: {pagination.totalElements} records
//             </div>
//           </div>
//         </div>

//         {/* Filters Panel */}
//         {showFilters && (
//           <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap gap-3 items-start">
//             {/* Vendor Filter with Search */}
//             <div className="relative">
//               <div className="relative">
//                 <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search vendor by company..."
//                   value={vendorSearchTerm}
//                   onChange={(e) => setVendorSearchTerm(e.target.value)}
//                   onFocus={() => setVendorDropdownOpen(true)}
//                   className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//                 />
//                 {vendorLoading && (
//                   <RefreshCw size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
//                 )}
//               </div>
              
//               {/* Vendor Dropdown */}
//               {vendorDropdownOpen && (
//                 <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
//                   <div 
//                     className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100"
//                     onClick={() => handleVendorSelect("")}
//                   >
//                     <span className={!filters.vendorId ? "font-semibold text-blue-600" : ""}>
//                       All Vendors
//                     </span>
//                   </div>
//                   {vendors.length === 0 && vendorSearchTerm && (
//                     <div className="px-3 py-2 text-sm text-gray-500 text-center">
//                       No vendors found
//                     </div>
//                   )}
//                   {vendors.map((vendor) => (
//                     <div
//                       key={vendor.id}
//                       className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
//                       onClick={() => handleVendorSelect(vendor.id)}
//                     >
//                       <div className={filters.vendorId == vendor.id ? "font-semibold text-blue-600" : ""}>
//                         {vendor.name}
//                       </div>
//                       {vendor.company && (
//                         <div className="text-xs text-gray-500">{vendor.company}</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
              
//               {/* Selected Vendor Display */}
//               {filters.vendorId && (
//                 <div className="mt-1 text-xs text-gray-500">
//                   Selected: {getSelectedVendorName()}
//                   <button
//                     onClick={() => handleVendorSelect("")}
//                     className="ml-2 text-red-500 hover:text-red-700"
//                   >
//                     (Clear)
//                   </button>
//                 </div>
//               )}
//             </div>

//             <select
//               name="siteId"
//               value={filters.siteId}
//               onChange={handleChange}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//             >
//               <option value="">All Sites</option>
//               {sites.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="locationId"
//               value={filters.locationId}
//               onChange={handleChange}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//             >
//               <option value="">All Locations</option>
//               {locations.map((l) => (
//                 <option key={l.id} value={l.id}>
//                   {l.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="softwareCategory"
//               value={filters.softwareCategory}
//               onChange={handleChange}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//             >
//               <option value="">All Categories</option>
//               {softwareCategories.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="status"
//               value={filters.status}
//               onChange={handleChange}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//             >
//               <option value="">All Statuses</option>
//               {statuses.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>

//             <input
//               name="keyword"
//               placeholder="Search by title, vendor, contact..."
//               value={filters.keyword}
//               onChange={handleChange}
//               className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>
//         )}

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-100 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">License Details</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Vendor</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Location</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Financial</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Contact</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Dates</th>
//                 <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" className="px-4 py-12 text-center">
//                     <div className="flex justify-center items-center gap-2">
//                       <RefreshCw size={24} className="animate-spin text-blue-500" />
//                       <span className="text-gray-500">Loading licenses...</span>
//                     </div>
//                    </td>
//                  </tr>
//               ) : licenses.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="px-4 py-12 text-center">
//                     <div className="text-gray-400">
//                       <AlertCircle size={48} className="mx-auto mb-2" />
//                       <p>No licenses found</p>
//                       <p className="text-sm">Click "New License" to add one</p>
//                     </div>
//                    </td>
//                  </tr>
//               ) : (
//                 licenses.map((item) => (
//                   <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                     {/* License Details */}
//                     <td className="px-4 py-3">
//                       <div className="space-y-1">
//                         <div className="font-semibold text-gray-800">{item.title}</div>
//                         {item.contractNo && (
//                           <div className="text-xs text-gray-500">Contract: {item.contractNo}</div>
//                         )}
//                         {item.totalLicenses && (
//                           <div className="text-xs text-gray-500">Licenses: {item.totalLicenses}</div>
//                         )}
//                       </div>
//                     </td>

//                     {/* Vendor */}
//                     <td className="px-4 py-3">
//                       <div className="text-sm text-gray-700">{item.vendorName}</div>
//                     </td>

//                     {/* Location */}
//                     <td className="px-4 py-3">
//                       <div className="space-y-1">
//                         <div className="text-sm text-gray-700">{item.locationName}</div>
//                         <div className="text-xs text-gray-400">{item.siteName}</div>
//                       </div>
//                     </td>

//                     {/* Financial */}
//                     <td className="px-4 py-3">
//                       <div className="space-y-1">
//                         <div className="text-sm font-semibold text-gray-800">₹{item.cost?.toLocaleString()}</div>
//                         <div className="flex items-center gap-1 text-xs text-gray-500">
//                           <RefreshCw size={10} />
//                           {item.renewalFrequency}
//                         </div>
//                       </div>
//                     </td>

//                     {/* Contact */}
//                     <td className="px-4 py-3">
//                       <div className="space-y-1">
//                         <div className="text-sm text-gray-700">{item.contactPerson || 'N/A'}</div>
//                         <div className="text-xs text-gray-500">{item.phone || 'N/A'}</div>
//                       </div>
//                     </td>

//                     {/* Category */}
//                     <td className="px-4 py-3">
//                       <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
//                         <span>{getCategoryIcon(item.softwareCategory)}</span>
//                         {item.softwareCategory}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="px-4 py-3">
//                       {getStatusBadge(item.status)}
//                     </td>

//                     {/* Dates */}
//                     <td className="px-4 py-3">
//                       <div className="space-y-1 text-xs">
//                         <div className="flex items-center gap-1">
//                           <Calendar size={10} className="text-gray-400" />
//                           <span>Start: {item.startDate}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar size={10} className="text-gray-400" />
//                           <span>End: {item.endDate}</span>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-4 py-3 text-center">
//                       <div className="flex justify-center gap-2">
//                         <button
//                           onClick={() => handleViewDetails(item)}
//                           className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition transform hover:scale-105"
//                           title="View Details"
//                         >
//                           <Eye size={16} />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditData(item);
//                             setModalOpen(true);
//                           }}
//                           className="p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition transform hover:scale-105"
//                           title="Edit License"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* License Form Modal */}
//       <LicenseFormModal
//         isOpen={modalOpen}
//         onClose={() => {
//           setModalOpen(false);
//           setEditData(null);
//         }}
//         onSuccess={loadLicenses}
//         editData={editData}
//       />

//       {viewModalOpen && selectedLicense && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-gray-800">License Details</h2>
//               <button
//                 onClick={() => setViewModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 transition"
//               >
//                 <XCircle size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Basic Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <Tag size={20} />
//                   Basic Information
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                   <div>
//                     <p className="text-xs text-gray-500">License Title</p>
//                     <p className="font-medium text-gray-800">{selectedLicense.title}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Contract Number</p>
//                     <p className="text-gray-800">{selectedLicense.contractNo || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Vendor</p>
//                     <p className="text-gray-800">{selectedLicense.vendorName}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Software Category</p>
//                     <p className="text-gray-800">{selectedLicense.softwareCategory}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Total Licenses</p>
//                     <p className="text-gray-800">{selectedLicense.totalLicenses || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Status</p>
//                     {getStatusBadge(selectedLicense.status)}
//                   </div>
//                 </div>
//               </div>

//               {/* Location Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <MapPin size={20} />
//                   Location Details
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                   <div>
//                     <p className="text-xs text-gray-500">Site</p>
//                     <p className="text-gray-800">{selectedLicense.siteName}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Location</p>
//                     <p className="text-gray-800">{selectedLicense.locationName}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Financial Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <DollarSign size={20} />
//                   Financial Details
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                   <div>
//                     <p className="text-xs text-gray-500">Cost</p>
//                     <p className="text-xl font-bold text-gray-800">₹{selectedLicense.cost?.toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Renewal Frequency</p>
//                     <p className="text-gray-800">{selectedLicense.renewalFrequency}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <User size={20} />
//                   Contact Details
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                   <div>
//                     <p className="text-xs text-gray-500">Contact Person</p>
//                     <p className="text-gray-800">{selectedLicense.contactPerson || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Phone Number</p>
//                     <p className="text-gray-800">{selectedLicense.phone || 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Dates */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <Calendar size={20} />
//                   Timeline
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                   <div>
//                     <p className="text-xs text-gray-500">Start Date</p>
//                     <p className="text-gray-800">{selectedLicense.startDate}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">End Date</p>
//                     <p className="text-gray-800">{selectedLicense.endDate}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Notes & Description */}
//               {selectedLicense.description && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-700 mb-3">Notes</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <p className="text-gray-700">{selectedLicense.description}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Additional Info */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Information</h3>
//                 <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                   {selectedLicense.hyperlink && selectedLicense.hyperlink !== "NA" && (
//                     <div className="col-span-2">
//                       <p className="text-xs text-gray-500">Hyperlink</p>
//                       <a href={selectedLicense.hyperlink} target="_blank" rel="noopener noreferrer" 
//                          className="text-blue-600 hover:underline">
//                         {selectedLicense.hyperlink}
//                       </a>
//                     </div>
//                   )}
//                   <div>
//                     <p className="text-xs text-gray-500">Active</p>
//                     <p className="text-gray-800">{selectedLicense.active ? 'Yes' : 'No'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Timestamps */}
//               {(selectedLicense.createdDate || selectedLicense.lastModifiedDate) && (
//                 <div className="text-xs text-gray-400 border-t pt-3">
//                   {selectedLicense.createdDate && <p>Created: {new Date(selectedLicense.createdDate).toLocaleString()}</p>}
//                   {selectedLicense.lastModifiedDate && <p>Last Modified: {new Date(selectedLicense.lastModifiedDate).toLocaleString()}</p>}
//                 </div>
//               )}
//             </div>

//             <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
//               <button
//                 onClick={() => setViewModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   setViewModalOpen(false);
//                   setEditData(selectedLicense);
//                   setModalOpen(true);
//                 }}
//                 className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
//               >
//                 Edit License
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


      
//     </div>
//   );
// };

// export default SoftwareLicensePage;



import LicenseFormModal from "../components/LicenseFormModal";
import {
  fetchFilteredLicenses,
  exportFilteredLicenses,
  getVendors,
  getSites,
  getLocationsBySite,
} from "../services/api";
import React, { useEffect, useState, useRef } from "react";
import {
  Plus, Download, ChevronLeft, ChevronRight,
  Eye, Edit2, Calendar, RefreshCw, AlertCircle,
  CheckCircle, Clock, XCircle, Search, X,
  SlidersHorizontal, FileText, ShieldCheck, TrendingUp,
} from "lucide-react";

const PAGE_SIZES = [10, 20, 50, 100];

const STATUS_BADGE = {
  ACTIVE:        "bg-emerald-100 text-emerald-700 border border-emerald-200",
  EXPIRED:       "bg-red-100 text-red-700 border border-red-200",
  SUSPENDED:     "bg-orange-100 text-orange-700 border border-orange-200",
  EXPIRING_SOON: "bg-amber-100 text-amber-700 border border-amber-200",
};
const STATUS_ICON = {
  ACTIVE:        <CheckCircle className="w-2.5 h-2.5" />,
  EXPIRED:       <XCircle     className="w-2.5 h-2.5" />,
  SUSPENDED:     <AlertCircle className="w-2.5 h-2.5" />,
  EXPIRING_SOON: <Clock       className="w-2.5 h-2.5" />,
};
const STATUS_LABEL = {
  ACTIVE: "Active", EXPIRED: "Expired", SUSPENDED: "Suspended", EXPIRING_SOON: "Expiring Soon",
};

const CATEGORY_ICON = {
  ERP: "💼", CRM: "🤝", ANTIVIRUS: "🛡️", ACCOUNTING: "💰", FIREWALL: "🔥", OTHER: "📦",
};
const SOFTWARE_CATEGORIES = ["ERP","CRM","ANTIVIRUS","ACCOUNTING","OTHER","FIREWALL"];
const STATUSES = ["ACTIVE","EXPIRED","SUSPENDED","EXPIRING_SOON"];

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${STATUS_BADGE[status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
      {STATUS_ICON[status]}{STATUS_LABEL[status] || status}
    </span>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm px-3 py-2.5 flex items-center gap-3 ${accent}`}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide leading-none">{title}</p>
        <p className="text-lg font-bold text-gray-800 leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ─── Detail modal ─────────────────────────────────────────────────────────────
function DetailModal({ license, onClose, onEdit }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!license) return null;

  function Row({ label, value, mono, bold }) {
    return (
      <div>
        <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className={`text-xs mt-0.5 ${mono ? "font-mono" : ""} ${bold ? "font-bold text-gray-800" : "text-gray-700"}`}>
          {value || <span className="text-gray-300 italic">—</span>}
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] modal-appear">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">License Details</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{license.title}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-4 py-3 lc-scrollbar space-y-3">
          {/* Basic */}
          <section>
            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">Basic Information</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-gray-50 border border-gray-100 rounded-lg p-3">
              <Row label="Title"            value={license.title}            bold />
              <Row label="Contract No"      value={license.contractNo} />
              <Row label="Vendor"           value={license.vendorName} />
              <Row label="Category"         value={license.softwareCategory} />
              <Row label="Total Licenses"   value={license.totalLicenses} />
              <div>
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Status</p>
                <div className="mt-1"><StatusBadge status={license.status} /></div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <p className="text-[9px] font-bold text-violet-600 uppercase tracking-wider mb-1.5">Location</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-violet-50/30 border border-violet-100 rounded-lg p-3">
              <Row label="Site"     value={license.siteName} />
              <Row label="Location" value={license.locationName} />
            </div>
          </section>

          {/* Financial */}
          <section>
            <p className="text-[9px] font-bold text-amber-600 uppercase tracking-wider mb-1.5">Financial Details</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-amber-50/30 border border-amber-100 rounded-lg p-3">
              <div>
                <p className="text-[9px] font-semibold text-amber-400 uppercase tracking-wide">Cost</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">₹{license.cost?.toLocaleString() || "—"}</p>
              </div>
              <Row label="Renewal Frequency" value={license.renewalFrequency} />
            </div>
          </section>

          {/* Contact */}
          <section>
            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">Contact</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-emerald-50/30 border border-emerald-100 rounded-lg p-3">
              <Row label="Contact Person" value={license.contactPerson} />
              <Row label="Phone"          value={license.phone} />
            </div>
          </section>

          {/* Dates */}
          <section>
            <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider mb-1.5">Timeline</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-indigo-50/30 border border-indigo-100 rounded-lg p-3">
              <Row label="Start Date" value={license.startDate} />
              <Row label="End Date"   value={license.endDate} />
            </div>
          </section>

          {/* Hyperlink */}
          {license.hyperlink && license.hyperlink !== "NA" && (
            <div>
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Hyperlink</p>
              <a href={license.hyperlink} target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline break-all">{license.hyperlink}</a>
            </div>
          )}

          {/* Description */}
          {license.description && (
            <section>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Notes</p>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{license.description}</p>
              </div>
            </section>
          )}

          {/* Timestamps */}
          {(license.createdDate || license.lastModifiedDate) && (
            <div className="flex justify-between text-[10px] text-gray-400 border-t border-gray-100 pt-2">
              {license.createdDate && <span>Created: {new Date(license.createdDate).toLocaleString()}</span>}
              {license.lastModifiedDate && <span>Modified: {new Date(license.lastModifiedDate).toLocaleString()}</span>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0 bg-gray-50 rounded-b-2xl">
          <button onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium transition">
            Close
          </button>
          <button onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition">
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const SoftwareLicensePage = () => {
  const advancedRef   = useRef(null);
  const vendorRef     = useRef(null);

  const [licenses, setLicenses]         = useState([]);
  const [vendors, setVendors]           = useState([]);
  const [sites, setSites]               = useState([]);
  const [locations, setLocations]       = useState([]);
  const [loading, setLoading]           = useState(false);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editData, setEditData]         = useState(null);
  const [viewLicense, setViewLicense]   = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Vendor search
  const [vendorSearch, setVendorSearch]           = useState("");
  const [vendorDropOpen, setVendorDropOpen]       = useState(false);
  const [vendorLoading, setVendorLoading]         = useState(false);

  const [filters, setFilters] = useState({
    vendorId: "", siteId: "", locationId: "",
    softwareCategory: "", status: "", keyword: "",
    page: 0, size: 10,
  });
  const [pagination, setPagination] = useState({
    page: 0, totalPages: 0, totalElements: 0, last: false,
  });

  // Computed stats
  const activeCount       = licenses.filter(l => l.status === "ACTIVE").length;
  const expiringSoonCount = licenses.filter(l => l.status === "EXPIRING_SOON").length;
  const totalCost         = licenses.reduce((s, l) => s + (l.cost || 0), 0);

  const advancedFilterCount = [
    filters.vendorId, filters.siteId, filters.locationId,
    filters.softwareCategory, filters.status,
  ].filter(Boolean).length;

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer shadow-sm";

  // ── Outside click handlers ─────────────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (advancedRef.current && !advancedRef.current.contains(e.target)) setShowAdvanced(false);
      if (vendorRef.current  && !vendorRef.current.contains(e.target))   setVendorDropOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Initial data ───────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        const [vd, sd] = await Promise.all([
          getVendors(0, 100, "id", "desc", "", ""),
          getSites(),
        ]);
        setVendors(Array.isArray(vd.content) ? vd.content : []);
        setSites(Array.isArray(sd) ? sd : []);
      } catch (err) { console.error(err); }
    };
    init();
  }, []);

  // ── Debounced vendor search ────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(async () => {
      if (vendorSearch.length === 1) return;
      setVendorLoading(true);
      try {
        const vd = await getVendors(0, 100, "id", "desc", vendorSearch, vendorSearch);
        setVendors(Array.isArray(vd.content) ? vd.content : []);
        setVendorDropOpen(true);
      } catch (err) { console.error(err); }
      finally { setVendorLoading(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [vendorSearch]);

  // ── Location load ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (filters.siteId) {
      getLocationsBySite(filters.siteId)
        .then(d => setLocations(Array.isArray(d) ? d : []))
        .catch(() => setLocations([]));
    } else {
      setLocations([]);
    }
  }, [filters.siteId]);

  // ── Load licenses ──────────────────────────────────────────────────────────
  const loadLicenses = async (f = filters) => {
    setLoading(true);
    try {
      const res = await fetchFilteredLicenses(f);
      if (res?.content) {
        setLicenses(Array.isArray(res.content) ? res.content : []);
        setPagination({
          page: res.number ?? res.page ?? 0,
          totalPages: res.totalPages || 0,
          totalElements: res.totalElements || 0,
          last: res.last || false,
        });
      } else if (Array.isArray(res)) {
        setLicenses(res);
        setPagination({ page: 0, totalPages: 1, totalElements: res.length, last: true });
      } else {
        setLicenses([]);
        setPagination({ page: 0, totalPages: 0, totalElements: 0, last: true });
      }
    } catch (err) {
      console.error(err); setLicenses([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadLicenses(); }, [filters]); // eslint-disable-line

  const setFilter = (key, value) => setFilters(p => ({ ...p, [key]: value, page: 0 }));

  const prevPage = () => { if (pagination.page > 0) setFilters(p => ({ ...p, page: p.page - 1 })); };
  const nextPage = () => { if (!pagination.last) setFilters(p => ({ ...p, page: p.page + 1 })); };
  const changeSize = (s) => setFilters(p => ({ ...p, size: s, page: 0 }));

  const clearAdvanced = () => setFilters(p => ({
    ...p, vendorId: "", siteId: "", locationId: "",
    softwareCategory: "", status: "", page: 0,
  }));

  const handleVendorSelect = (id) => {
    setFilter("vendorId", id);
    setVendorSearch(""); setVendorDropOpen(false);
  };

  const selectedVendorName = filters.vendorId
    ? (vendors.find(v => v.id == filters.vendorId)?.name || "Selected")
    : null;

  const handleExport = async () => {
    try { await exportFilteredLicenses(filters); }
    catch (err) { console.error(err); }
  };

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .lc-table td, .lc-table th { white-space: nowrap; }
        .lc-table td { font-size: 11px; }
        .lc-row:hover { background: #f0f7ff !important; }
        .lc-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .lc-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .lc-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .lc-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#e8eeff 50%,#f1f5f9 75%); background-size:200% 100%; animation:sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .modal-appear { animation: modalIn 0.18s ease; }
        @keyframes modalIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* ═══ STICKY TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-3 pt-2 pb-1.5">
          <StatCard title="Total Licenses"  value={pagination.totalElements} icon={FileText}    accent="border-l-4 border-blue-500" />
          <StatCard title="Active"          value={activeCount}              icon={ShieldCheck}  accent="border-l-4 border-emerald-500" />
          <StatCard title="Expiring Soon"   value={expiringSoonCount}        icon={Clock}        accent="border-l-4 border-amber-500" />
          <StatCard title="Total Investment"value={`₹${totalCost.toLocaleString()}`} icon={TrendingUp} accent="border-l-4 border-violet-500" />
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5 border-t border-gray-100">

          {/* Keyword search */}
          <div className="relative flex items-center">
            <Search className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search licenses..."
              value={filters.keyword}
              onChange={(e) => setFilter("keyword", e.target.value)}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-36 sm:w-48 transition"
            />
            {filters.keyword && (
              <button onClick={() => setFilter("keyword", "")} className="absolute right-1.5 text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Status quick filter */}
          <select value={filters.status} onChange={(e) => setFilter("status", e.target.value)}
            className={sel + " min-w-[100px] font-medium"}>
            <option value="">All Status</option>
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s] || s}</option>)}
          </select>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Add license */}
          <button
            onClick={() => { setEditData(null); setModalOpen(true); }}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>New License</span>
          </button>

          {/* Export */}
          <button onClick={handleExport}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition shadow-sm">
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Advanced filters */}
          <div className="relative" ref={advancedRef}>
            <button
              onClick={() => setShowAdvanced(p => !p)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
                showAdvanced || advancedFilterCount > 0
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Advanced</span>
              {advancedFilterCount > 0 && (
                <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                  {advancedFilterCount}
                </span>
              )}
            </button>

            {showAdvanced && (
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[300px] sm:w-[540px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
                  <div className="flex items-center gap-2">
                    {advancedFilterCount > 0 && (
                      <button onClick={clearAdvanced} className="text-[10px] text-red-500 hover:text-red-700 font-medium">Clear all</button>
                    )}
                    <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {/* Vendor search */}
                  <div className="relative w-full" ref={vendorRef}>
                    <div className="relative">
                      <Search className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      {vendorLoading && <RefreshCw className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 animate-spin" />}
                      <input
                        type="text"
                        placeholder="Search vendor by company..."
                        value={vendorSearch}
                        onChange={(e) => setVendorSearch(e.target.value)}
                        onFocus={() => setVendorDropOpen(true)}
                        className="text-xs px-2 py-1 pl-6 pr-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-full transition"
                      />
                    </div>
                    {/* Selected vendor chip */}
                    {selectedVendorName && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 border border-blue-200 rounded text-[10px] text-blue-700 font-medium">
                          🏢 {selectedVendorName}
                          <button onClick={() => handleVendorSelect("")} className="hover:text-blue-900"><X className="w-2.5 h-2.5" /></button>
                        </span>
                      </div>
                    )}
                    {/* Dropdown */}
                    {vendorDropOpen && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto lc-scrollbar">
                        <div
                          onClick={() => handleVendorSelect("")}
                          className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs border-b border-gray-100"
                        >
                          <span className={!filters.vendorId ? "font-semibold text-blue-600" : "text-gray-600"}>All Vendors</span>
                        </div>
                        {vendors.length === 0 && vendorSearch && (
                          <div className="px-3 py-2 text-xs text-gray-400 text-center">No vendors found</div>
                        )}
                        {vendors.map(v => (
                          <div key={v.id} onClick={() => handleVendorSelect(v.id)}
                            className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs border-b border-gray-100 last:border-0">
                            <div className={filters.vendorId == v.id ? "font-semibold text-blue-600" : "text-gray-700"}>{v.name}</div>
                            {v.company && <div className="text-[10px] text-gray-400">{v.company}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Site */}
                  <select name="siteId" value={filters.siteId}
                    onChange={(e) => setFilter("siteId", e.target.value)}
                    className={sel + " min-w-[110px]"}>
                    <option value="">All Sites</option>
                    {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>

                  {/* Location */}
                  {locations.length > 0 && (
                    <select name="locationId" value={filters.locationId}
                      onChange={(e) => setFilter("locationId", e.target.value)}
                      className={sel + " min-w-[120px]"}>
                      <option value="">All Locations</option>
                      {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                  )}

                  {/* Category */}
                  <select name="softwareCategory" value={filters.softwareCategory}
                    onChange={(e) => setFilter("softwareCategory", e.target.value)}
                    className={sel + " min-w-[110px]"}>
                    <option value="">All Categories</option>
                    {SOFTWARE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button onClick={prevPage} disabled={pagination.page === 0 || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition">
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
              <span className="text-blue-700">{pagination.page + 1}</span>
              <span className="text-gray-400"> / </span>
              {pagination.totalPages || 1}
            </span>
            <button onClick={nextPage} disabled={pagination.last || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition">
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Total */}
          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{pagination.totalElements}</span>
            <span className="hidden sm:inline"> licenses</span>
          </span>

          {/* Page size — right */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map(n => (
              <button key={n} onClick={() => changeSize(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  filters.size === n ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TABLE ═══ */}
      <div className="flex-1 overflow-hidden">
        {/* Shimmer */}
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full lc-table" style={{ minWidth: 900 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["License Details","Vendor","Location","Financial","Contact","Category","Status","Dates","Actions"].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 9 }).map((__, j) => (
                      <td key={j} className="px-2.5 py-2.5">
                        <div className="shimmer h-2.5 rounded mb-1.5" style={{ width: `${45 + Math.random() * 45}%` }} />
                        <div className="shimmer h-2 rounded" style={{ width: `${25 + Math.random() * 35}%` }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty */}
        {!loading && licenses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <FileText className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-sm text-gray-400">No licenses found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Click "New License" to add one.</p>
          </div>
        )}

        {/* Table */}
        {!loading && licenses.length > 0 && (
          <div className="overflow-x-auto lc-scrollbar">
            <table className="w-full lc-table" style={{ minWidth: 900, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {[
                    { label: "License Details", cls: "min-w-[160px]" },
                    { label: "Vendor",          cls: "min-w-[100px]" },
                    { label: "Location",        cls: "min-w-[100px]" },
                    { label: "Financial",       cls: "min-w-[110px]" },
                    { label: "Contact",         cls: "min-w-[110px]" },
                    // { label: "Category",        cls: "w-28" },
                    { label: "Status",          cls: "w-28" },
                    { label: "Dates",           cls: "w-32" },
                    { label: "Actions",         cls: "w-16" },
                  ].map(({ label, cls }, i) => (
                    <th key={i} className={`px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${cls}`}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {licenses.map((item, ri) => (
                  <tr key={item.id}
                    className="lc-row border-b border-gray-50 transition-colors align-top"
                    style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}>

                    {/* License Details */}
                    <td className="px-2.5 py-1.5">
                      <div className="font-semibold text-gray-800 text-[11px]">{item.title}</div>
                      {item.contractNo && <div className="text-[10px] text-gray-400 mt-0.5">Contract: {item.contractNo}</div>}
                      {item.totalLicenses && <div className="text-[10px] text-gray-400">Qty: {item.totalLicenses}</div>}
                    </td>

                    {/* Vendor */}
                    <td className="px-2.5 py-1.5 text-gray-700">
                      {item.vendorName || <span className="text-gray-300">—</span>}
                    </td>

                    {/* Location */}
                    <td className="px-2.5 py-1.5">
                      <div className="text-[11px] text-gray-700">{item.locationName || <span className="text-gray-300">—</span>}</div>
                      <div className="text-[10px] text-gray-400">{item.siteName || ""}</div>
                    </td>

                    {/* Financial */}
                    <td className="px-2.5 py-1.5">
                      <div className="text-[11px] font-semibold text-gray-800">₹{item.cost?.toLocaleString() || "—"}</div>
                      {item.renewalFrequency && (
                        <div className="text-[10px] text-gray-400 flex items-center gap-0.5 mt-0.5">
                          <RefreshCw className="w-2.5 h-2.5" />{item.renewalFrequency}
                        </div>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-2.5 py-1.5">
                      <div className="text-[11px] text-gray-700">{item.contactPerson || <span className="text-gray-300">—</span>}</div>
                      <div className="text-[10px] text-gray-400">{item.phone || ""}</div>
                    </td>

                    {/* Category */}
                    {/* <td className="px-2.5 py-1.5">
                      {item.softwareCategory && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-semibold whitespace-nowrap">
                          <span>{CATEGORY_ICON[item.softwareCategory] || "📦"}</span>
                          {item.softwareCategory}
                        </span>
                      )}
                    </td> */}

                    {/* Status */}
                    <td className="px-2.5 py-1.5">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* Dates */}
                    <td className="px-2.5 py-1.5">
                      <div className="text-[10px] text-gray-600 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-gray-400" /> {item.startDate || "—"}
                      </div>
                      <div className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-2.5 h-2.5 text-gray-400" /> {item.endDate || "—"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-2.5 py-1.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewLicense(item)} title="View Details"
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { setEditData(item); setModalOpen(true); }} title="Edit"
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form modal */}
      <LicenseFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSuccess={loadLicenses}
        editData={editData}
      />

      {/* Detail modal */}
      <DetailModal
        license={viewLicense}
        onClose={() => setViewLicense(null)}
        onEdit={() => { setViewLicense(null); setEditData(viewLicense); setModalOpen(true); }}
      />
    </div>
  );
};

export default SoftwareLicensePage;