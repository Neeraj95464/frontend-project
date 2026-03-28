

// import LicenseFormModal from "../components/LicenseFormModal";
// import {
//   fetchFilteredLicenses,
//   exportFilteredLicenses,
//   getVendors,
//   getSites,
//   getLocationsBySite,
// } from "../services/api";
// import React, { useEffect, useState } from "react";

// const SoftwareLicensePage = () => {
//   const [licenses, setLicenses] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [editData, setEditData] = useState(null);

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

//   const softwareCategories = ["ERP", "CRM", "ANTIVIRUS", "ACCOUNTING", "OTHER"];
//   const statuses = ["ACTIVE", "EXPIRED", "SUSPENDED", "EXPIRING_SOON"];

//   // ================= LOAD DROPDOWNS =================
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     const vendorData = await getVendors();
//     const siteData = await getSites();
//     setVendors(vendorData);
//     setSites(siteData);
//   };

//   useEffect(() => {
//     if (filters.siteId) {
//       getLocationsBySite(filters.siteId).then(setLocations);
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
//       console.log("res ",res.content);
//       setLicenses(res.content);
//       setPagination({
//         page: res.page,
//         totalPages: res.totalPages,
//         totalElements: res.totalElements,
//         last: res.last,
//       });
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

//   const handleExport = async () => {
//     await exportFilteredLicenses(filters);
//   };

//   const prevPage = () => {
//     if (pagination.page > 0) setFilters({ ...filters, page: filters.page - 1 });
//   };

//   const nextPage = () => {
//     if (!pagination.last) setFilters({ ...filters, page: filters.page + 1 });
//   };

//   // ================= UI =================
//   return (
//     // <div className="lg:ml-40 pt-16 py-0">
//     <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       {/* <div className="bg-white rounded-xl shadow-sm border"> */}

//       <div className="bg-white shadow-lg rounded-lg p-8 border border-blue-100">
//         {/* ================= TOP BAR ================= */}
//         <div className="border-b bg-gray-50 px-3 py-3 flex items-center gap-3 flex-wrap">
//           {/* Filter Toggle */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="px-6 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-md border"
//           >
//             {showFilters ? "Hide Filters" : "Filters"}
//           </button>

//           {/* Create */}
//           <button
//             onClick={() => setModalOpen(true)}
//             className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md"
//           >
//             + New License
//           </button>

//           {/* Pagination */}
//           <div className="flex items-center gap-2 bg-white border rounded px-2 py-1 text-xs">
//             <button
//               onClick={prevPage}
//               disabled={pagination.page === 0}
//               className="px-2 py-0.5 bg-blue-600 text-white rounded disabled:opacity-40"
//             >
//               ←
//             </button>

//             <span>
//               {pagination.page + 1}/{pagination.totalPages || 1}
//             </span>

//             <button
//               onClick={nextPage}
//               disabled={pagination.last}
//               className="px-2 py-0.5 bg-blue-600 text-white rounded disabled:opacity-40"
//             >
//               →
//             </button>
//           </div>

//           {/* Total */}
//           <div className="text-xs text-gray-600">
//             Total: {pagination.totalElements}
//           </div>

//           {/* Export */}
//           <button
//             onClick={handleExport}
//             className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//           >
//             📥 Export
//           </button>
//         </div>

//         {/* ================= FILTERS ================= */}
//         {showFilters && (
//           <div className="px-6 py-4 border-b bg-white flex flex-wrap gap-2 text-xs">
//             <select
//               name="vendorId"
//               onChange={handleChange}
//               className="p-1.5 border rounded min-w-[120px]"
//             >
//               <option value="">Vendor</option>
//               {vendors.map((v) => (
//                 <option key={v.id} value={v.id}>
//                   {v.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="siteId"
//               onChange={handleChange}
//               className="p-1.5 border rounded min-w-[120px]"
//             >
//               <option value="">Site</option>
//               {sites.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="locationId"
//               onChange={handleChange}
//               className="p-1.5 border rounded min-w-[120px]"
//             >
//               <option value="">Location</option>
//               {locations.map((l) => (
//                 <option key={l.id} value={l.id}>
//                   {l.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="softwareCategory"
//               onChange={handleChange}
//               className="p-1.5 border rounded min-w-[120px]"
//             >
//               <option value="">Category</option>
//               {softwareCategories.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="status"
//               onChange={handleChange}
//               className="p-1.5 border rounded min-w-[120px]"
//             >
//               <option value="">Status</option>
//               {statuses.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>

//             <input
//               name="keyword"
//               placeholder="Search..."
//               onChange={handleChange}
//               className="p-1.5 border rounded min-w-[180px]"
//             />
//           </div>
//         )}

//         {/* ================= TABLE ================= */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-xs">
//             <thead className="bg-gray-100 text-gray-600">
//               <tr>
//                 <th className="p-2 text-left">Title</th>
//                 <th className="p-2 text-left">Vendor</th>
//                 {/* <th className="p-2 text-left">Site</th> */}
//                 <th className="p-2 text-left">Location</th>
//                 <th className="p-2 text-left">Cost</th>
//                 <th className="p-2 text-left">Renewal Frequency</th>
//                 <th className="p-2 text-left">Contact Person</th>
//                 <th className="p-2 text-left">Contact Number</th>
//                 <th className="p-2 text-left">Category</th>
//                 <th className="p-2 text-left">Status</th>
//                 <th className="p-2 text-left">Start Date</th>
//                 <th className="p-2 text-left">End Date</th>
//                 <th className="p-2 text-left">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" className="p-6 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : licenses.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="p-6 text-center">
//                     No Records
//                   </td>
//                 </tr>
//               ) : (
//                 licenses.map((item) => (
//                   <tr key={item.id} className="border-t hover:bg-gray-50">
//                     <td className="p-2">{item.title}</td>

//                     <td className="p-2">{item.vendorName}</td>
//                     {/* <td className="p-2">{item.siteName}</td> */}
//                     <td className="p-2">{item.locationName}</td>
//                     <td className="p-2">{item.cost}</td>
//                     <td className="p-2">{item.renewalFrequency}</td>
//                     <td className="p-2">{item.contactPerson}</td>
//                     <td className="p-2">{item.phone}</td>
//                     <td className="p-2">{item.softwareCategory}</td>

//                     <td className="p-2">
//                       <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px]">
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="p-2">{item.startDate}</td>
//                     <td className="p-2">{item.endDate}</td>
//                     <td className="p-2">
//                       <button
//                         onClick={() => {
//                           setModalOpen(true);
//                           setEditData(item);
//                         }}
//                         className="px-2 py-0.5 bg-yellow-400 text-xs rounded"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <LicenseFormModal
//         isOpen={modalOpen}
//         onClose={() => {
//           setModalOpen(false);
//           setEditData(null);
//         }}
//         onSuccess={loadLicenses}
//         editData={editData}
//       />
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
import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Download, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  Edit2,
  Calendar,
  DollarSign,
  RefreshCw,
  MapPin,
  Building,
  User,
  Phone,
  Tag,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

const SoftwareLicensePage = () => {
  const [licenses, setLicenses] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);

  const [filters, setFilters] = useState({
    vendorId: "",
    siteId: "",
    locationId: "",
    softwareCategory: "",
    status: "",
    keyword: "",
    page: 0,
    size: 10,
  });

  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
    totalElements: 0,
    last: false,
  });

  const softwareCategories = ["ERP", "CRM", "ANTIVIRUS", "ACCOUNTING", "OTHER", "FIREWALL"];
  const statuses = ["ACTIVE", "EXPIRED", "SUSPENDED", "EXPIRING_SOON"];

  // ================= LOAD DROPDOWNS =================
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const vendorData = await getVendors();
    const siteData = await getSites();
    setVendors(vendorData);
    setSites(siteData);
  };

  useEffect(() => {
    if (filters.siteId) {
      getLocationsBySite(filters.siteId).then(setLocations);
    } else {
      setLocations([]);
    }
  }, [filters.siteId]);

  // ================= LOAD LICENSES =================
  useEffect(() => {
    loadLicenses();
  }, [filters]);

  const loadLicenses = async () => {
    setLoading(true);
    try {
      const res = await fetchFilteredLicenses(filters);
      console.log("res ", res.content);
      setLicenses(res.content);
      setPagination({
        page: res.page,
        totalPages: res.totalPages,
        totalElements: res.totalElements,
        last: res.last,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 0,
    });
  };

  const handleExport = async () => {
    await exportFilteredLicenses(filters);
  };

  const prevPage = () => {
    if (pagination.page > 0) setFilters({ ...filters, page: filters.page - 1 });
  };

  const nextPage = () => {
    if (!pagination.last) setFilters({ ...filters, page: filters.page + 1 });
  };

  const handleViewDetails = (license) => {
    setSelectedLicense(license);
    setViewModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ACTIVE':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit"><CheckCircle size={12} /> Active</span>;
      case 'EXPIRED':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1 w-fit"><XCircle size={12} /> Expired</span>;
      case 'SUSPENDED':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 flex items-center gap-1 w-fit"><AlertCircle size={12} /> Suspended</span>;
      case 'EXPIRING_SOON':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit"><Clock size={12} /> Expiring Soon</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">{status}</span>;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'ERP': return '💼';
      case 'CRM': return '🤝';
      case 'ANTIVIRUS': return '🛡️';
      case 'ACCOUNTING': return '💰';
      case 'FIREWALL': return '🔥';
      default: return '📦';
    }
  };

  const getRenewalFrequencyIcon = (frequency) => {
    switch(frequency) {
      case 'YEARLY': return '📅';
      case 'MONTHLY': return '📆';
      case 'QUARTERLY': return '📊';
      default: return '🔄';
    }
  };

  // Calculate expiring soon count
  const expiringSoonCount = licenses.filter(l => l.status === 'EXPIRING_SOON').length;
  const activeCount = licenses.filter(l => l.status === 'ACTIVE').length;
  const totalCost = licenses.reduce((sum, l) => sum + (l.cost || 0), 0);

  return (
    <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contracts and Licenses Management
            </h1>
            {/* <p className="text-gray-500 mt-2 text-sm">
              Manage and track all software licenses, contracts, and renewals
            </p> */}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            New License
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Total Licenses</p>
          <p className="text-2xl font-bold text-gray-800">{pagination.totalElements}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Active Licenses</p>
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">Expiring Soon</p>
          <p className="text-2xl font-bold text-yellow-600">{expiringSoonCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm">Total Investment</p>
          <p className="text-2xl font-bold text-purple-600">₹{totalCost.toLocaleString()}</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Top Bar */}
        <div className="border-b bg-gray-50 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 text-sm bg-white hover:bg-gray-100 rounded-lg border border-gray-300 flex items-center gap-2 transition"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            <button
              onClick={handleExport}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition shadow-sm"
            >
              <Download size={16} />
              Export
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-1.5 text-sm">
              <button
                onClick={prevPage}
                disabled={pagination.page === 0}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-40 transition"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="font-medium">
                Page {pagination.page + 1} of {pagination.totalPages || 1}
              </span>
              <button
                onClick={nextPage}
                disabled={pagination.last}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-40 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
              Total: {pagination.totalElements} records
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap gap-3">
            <select
              name="vendorId"
              value={filters.vendorId}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Vendors</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            <select
              name="siteId"
              value={filters.siteId}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Sites</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              name="locationId"
              value={filters.locationId}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Locations</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>

            <select
              name="softwareCategory"
              value={filters.softwareCategory}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Categories</option>
              {softwareCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input
              name="keyword"
              placeholder="Search by title, vendor, contact..."
              value={filters.keyword}
              onChange={handleChange}
              className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">License Details</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Vendor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Financial</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Dates</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <RefreshCw size={24} className="animate-spin text-blue-500" />
                      <span className="text-gray-500">Loading licenses...</span>
                    </div>
                  </td>
                </tr>
              ) : licenses.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center">
                    <div className="text-gray-400">
                      <AlertCircle size={48} className="mx-auto mb-2" />
                      <p>No licenses found</p>
                      <p className="text-sm">Click "New License" to add one</p>
                    </div>
                  </td>
                </tr>
              ) : (
                licenses.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    {/* License Details */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-800">{item.title}</div>
                        {item.contractNo && (
                          <div className="text-xs text-gray-500">Contract: {item.contractNo}</div>
                        )}
                        {item.totalLicenses && (
                          <div className="text-xs text-gray-500">Licenses: {item.totalLicenses}</div>
                        )}
                      </div>
                    </td>

                    {/* Vendor */}
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700">{item.vendorName}</div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">{item.locationName}</div>
                        <div className="text-xs text-gray-400">{item.siteName}</div>
                      </div>
                    </td>

                    {/* Financial */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-gray-800">₹{item.cost?.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <RefreshCw size={10} />
                          {item.renewalFrequency}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">{item.contactPerson || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{item.phone || 'N/A'}</div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                        <span>{getCategoryIcon(item.softwareCategory)}</span>
                        {item.softwareCategory}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Dates */}
                    <td className="px-4 py-3">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} className="text-gray-400" />
                          <span>Start: {item.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={10} className="text-gray-400" />
                          <span>End: {item.endDate}</span>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition transform hover:scale-105"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setModalOpen(true);
                            setEditData(item);
                          }}
                          className="p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition transform hover:scale-105"
                          title="Edit License"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* License Form Modal */}
      <LicenseFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSuccess={loadLicenses}
        editData={editData}
      />

      {/* View Details Modal */}
      {viewModalOpen && selectedLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">License Details</h2>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Tag size={20} />
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">License Title</p>
                    <p className="font-medium text-gray-800">{selectedLicense.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contract Number</p>
                    <p className="text-gray-800">{selectedLicense.contractNo || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Vendor</p>
                    <p className="text-gray-800">{selectedLicense.vendorName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Software Category</p>
                    <p className="text-gray-800">{selectedLicense.softwareCategory}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Licenses</p>
                    <p className="text-gray-800">{selectedLicense.totalLicenses || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    {getStatusBadge(selectedLicense.status)}
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin size={20} />
                  Location Details
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Site</p>
                    <p className="text-gray-800">{selectedLicense.siteName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-gray-800">{selectedLicense.locationName}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <DollarSign size={20} />
                  Financial Details
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Cost</p>
                    <p className="text-xl font-bold text-gray-800">₹{selectedLicense.cost?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Renewal Frequency</p>
                    <p className="text-gray-800">{selectedLicense.renewalFrequency}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <User size={20} />
                  Contact Details
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Contact Person</p>
                    <p className="text-gray-800">{selectedLicense.contactPerson || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-gray-800">{selectedLicense.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar size={20} />
                  Timeline
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-gray-800">{selectedLicense.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">End Date</p>
                    <p className="text-gray-800">{selectedLicense.endDate}</p>
                  </div>
                </div>
              </div>

              {/* Notes & Description */}
              {selectedLicense.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedLicense.description}</p>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {selectedLicense.hyperlink && selectedLicense.hyperlink !== "NA" && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Hyperlink</p>
                      <a href={selectedLicense.hyperlink} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        {selectedLicense.hyperlink}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Active</p>
                    <p className="text-gray-800">{selectedLicense.active ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              {(selectedLicense.createdDate || selectedLicense.lastModifiedDate) && (
                <div className="text-xs text-gray-400 border-t pt-3">
                  {selectedLicense.createdDate && <p>Created: {new Date(selectedLicense.createdDate).toLocaleString()}</p>}
                  {selectedLicense.lastModifiedDate && <p>Last Modified: {new Date(selectedLicense.lastModifiedDate).toLocaleString()}</p>}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setViewModalOpen(false);
                  setModalOpen(true);
                  setEditData(selectedLicense);
                }}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
              >
                Edit License
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareLicensePage;