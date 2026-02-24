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

//   const [filters, setFilters] = useState({
//     active: "",
//     vendorId: "",
//     siteId: "",
//     locationId: "",
//     softwareCategory: "",
//     status: "",
//     startDateFrom: "",
//     startDateTo: "",
//     endDateFrom: "",
//     endDateTo: "",
//     createdBy: "",
//     keyword: "",
//     page: 0,
//     size: 10,
//   });

//   const [pagination, setPagination] = useState({
//     page: 0,
//     totalPages: 0,
//     last: false,
//   });

//   const softwareCategories = ["ERP", "CRM", "ANTIVIRUS", "ACCOUNTING", "OTHER"];
//   const [editData, setEditData] = useState(null);
//   const statuses = ["ACTIVE", "EXPIRED", "SUSPENDED", "EXPIRING_SOON"];

//   // ================================
//   // LOAD DROPDOWNS
//   // ================================
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       const vendorData = await getVendors();
//       const siteData = await getSites();
//       setVendors(vendorData);
//       setSites(siteData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Load locations when site changes
//   useEffect(() => {
//     if (filters.siteId) {
//       getLocationsBySite(filters.siteId).then(setLocations);
//     }
//   }, [filters.siteId]);

//   // ================================
//   // LOAD LICENSES
//   // ================================
//   useEffect(() => {
//     loadLicenses();
//   }, [filters]);

//   const loadLicenses = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchFilteredLicenses(filters);

//       setLicenses(res.content);
//       setPagination({
//         page: res.page,
//         totalPages: res.totalPages,
//         last: res.last,
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================================
//   // HANDLERS
//   // ================================
//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//       page: 0,
//     });
//   };

//   const handleExport = async () => {
//     const data = await exportFilteredLicenses(filters);
//     console.log(data);
//   };

//   const prevPage = () => {
//     if (pagination.page > 0) setFilters({ ...filters, page: filters.page - 1 });
//   };

//   const nextPage = () => {
//     if (!pagination.last) setFilters({ ...filters, page: filters.page + 1 });
//   };

//   // ================================
//   // UI
//   // ================================
//   return (
//     <div className="p-6 lg:ml-64 pt-20 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-xl shadow-md p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold text-gray-700">
//             Software Licenses
//           </h2>

//           <button
//             onClick={() => setModalOpen(true)}
//             className="bg-blue-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             + New License
//           </button>
//         </div>

//         {/* ================= FILTERS ================= */}
//         <div className="grid grid-cols-5 gap-3 mb-6 text-sm">
//           <select
//             name="vendorId"
//             onChange={handleChange}
//             className="border rounded p-2"
//           >
//             <option value="">Vendor</option>
//             {vendors.map((v) => (
//               <option key={v.id} value={v.id}>
//                 {v.name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="siteId"
//             onChange={handleChange}
//             className="border rounded p-2"
//           >
//             <option value="">Site</option>
//             {sites.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="locationId"
//             onChange={handleChange}
//             className="border rounded p-2"
//           >
//             <option value="">Location</option>
//             {locations.map((l) => (
//               <option key={l.id} value={l.id}>
//                 {l.name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="softwareCategory"
//             onChange={handleChange}
//             className="border rounded p-2"
//           >
//             <option value="">Category</option>
//             {softwareCategories.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>

//           <select
//             name="status"
//             onChange={handleChange}
//             className="border rounded p-2"
//           >
//             <option value="">Status</option>
//             {statuses.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>

//           <input
//             type="date"
//             name="startDateFrom"
//             onChange={handleChange}
//             className="border rounded p-2"
//           />
//           <input
//             type="date"
//             name="startDateTo"
//             onChange={handleChange}
//             className="border rounded p-2"
//           />
//           <input
//             type="date"
//             name="endDateFrom"
//             onChange={handleChange}
//             className="border rounded p-2"
//           />
//           <input
//             type="date"
//             name="endDateTo"
//             onChange={handleChange}
//             className="border rounded p-2"
//           />

//           <input
//             name="createdBy"
//             placeholder="Created By"
//             onChange={handleChange}
//             className="border rounded p-2"
//           />

//           <input
//             name="keyword"
//             placeholder="Search..."
//             onChange={handleChange}
//             className="border rounded p-2 col-span-2"
//           />

//           <button
//             onClick={handleExport}
//             className="bg-gray-800 text-white rounded p-2 text-sm"
//           >
//             Export
//           </button>
//         </div>

//         {/* ================= TABLE ================= */}
//         <div className="overflow-x-auto border rounded-lg">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-600">
//               <tr>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Vendor</th>
//                 <th className="p-3 text-left">Site</th>
//                 <th className="p-3 text-left">Location</th>
//                 <th className="p-3 text-left">Cost</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">End Date</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="text-center p-6">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : licenses.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-center p-6">
//                     No Records
//                   </td>
//                 </tr>
//               ) : (
//                 licenses.map((item) => (
//                   <tr key={item.id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{item.title}</td>
//                     <td className="p-3">{item.vendorName}</td>
//                     <td className="p-3">{item.siteName}</td>
//                     <td className="p-3">{item.locationName}</td>
//                     <td className="p-3">{item.cost}</td>
//                     <td className="p-3">{item.softwareCategory}</td>
//                     <td className="p-3">
//                       <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="p-3">{item.endDate}</td>
//                     <td className="p-3">
//                       <button
//                         onClick={() => {
//                           setModalOpen(true);
//                           setEditData(item);
//                         }}
//                         className="bg-yellow-400 px-3 py-1 rounded text-xs"
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

//         {/* ================= PAGINATION ================= */}
//         <div className="flex justify-between items-center mt-4 text-sm">
//           <button
//             onClick={prevPage}
//             disabled={pagination.page === 0}
//             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
//           >
//             Prev
//           </button>

//           <span>
//             Page {pagination.page + 1} of {pagination.totalPages}
//           </span>

//           <button
//             onClick={nextPage}
//             disabled={pagination.last}
//             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
//           >
//             Next
//           </button>
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

const SoftwareLicensePage = () => {
  const [licenses, setLicenses] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [editData, setEditData] = useState(null);

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

  const softwareCategories = ["ERP", "CRM", "ANTIVIRUS", "ACCOUNTING", "OTHER"];
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

  // ================= UI =================
  return (
    <div className="lg:ml-40 pt-16 py-0">
      {/* <div className="bg-white rounded-xl shadow-sm border"> */}

      <div className="bg-white shadow-lg rounded-lg p-8 border border-blue-100">
        {/* ================= TOP BAR ================= */}
        <div className="border-b bg-gray-50 px-3 py-3 flex items-center gap-3 flex-wrap">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-md border"
          >
            {showFilters ? "Hide Filters" : "Filters"}
          </button>

          {/* Create */}
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            + New License
          </button>

          {/* Pagination */}
          <div className="flex items-center gap-2 bg-white border rounded px-2 py-1 text-xs">
            <button
              onClick={prevPage}
              disabled={pagination.page === 0}
              className="px-2 py-0.5 bg-blue-600 text-white rounded disabled:opacity-40"
            >
              ←
            </button>

            <span>
              {pagination.page + 1}/{pagination.totalPages || 1}
            </span>

            <button
              onClick={nextPage}
              disabled={pagination.last}
              className="px-2 py-0.5 bg-blue-600 text-white rounded disabled:opacity-40"
            >
              →
            </button>
          </div>

          {/* Total */}
          <div className="text-xs text-gray-600">
            Total: {pagination.totalElements}
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            📥 Export
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        {showFilters && (
          <div className="px-6 py-4 border-b bg-white flex flex-wrap gap-2 text-xs">
            <select
              name="vendorId"
              onChange={handleChange}
              className="p-1.5 border rounded min-w-[120px]"
            >
              <option value="">Vendor</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            <select
              name="siteId"
              onChange={handleChange}
              className="p-1.5 border rounded min-w-[120px]"
            >
              <option value="">Site</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              name="locationId"
              onChange={handleChange}
              className="p-1.5 border rounded min-w-[120px]"
            >
              <option value="">Location</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>

            <select
              name="softwareCategory"
              onChange={handleChange}
              className="p-1.5 border rounded min-w-[120px]"
            >
              <option value="">Category</option>
              {softwareCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="status"
              onChange={handleChange}
              className="p-1.5 border rounded min-w-[120px]"
            >
              <option value="">Status</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input
              name="keyword"
              placeholder="Search..."
              onChange={handleChange}
              className="p-1.5 border rounded min-w-[180px]"
            />
          </div>
        )}

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Vendor</th>
                {/* <th className="p-2 text-left">Site</th> */}
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Cost</th>
                <th className="p-2 text-left">Renewal Frequency</th>
                <th className="p-2 text-left">Contact Person</th>
                <th className="p-2 text-left">Contact Number</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Start Date</th>
                <th className="p-2 text-left">End Date</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : licenses.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-6 text-center">
                    No Records
                  </td>
                </tr>
              ) : (
                licenses.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{item.title}</td>

                    <td className="p-2">{item.vendorName}</td>
                    {/* <td className="p-2">{item.siteName}</td> */}
                    <td className="p-2">{item.locationName}</td>
                    <td className="p-2">{item.cost}</td>
                    <td className="p-2">{item.renewalFrequency}</td>
                    <td className="p-2">{item.contactPerson}</td>
                    <td className="p-2">{item.phone}</td>
                    <td className="p-2">{item.softwareCategory}</td>

                    <td className="p-2">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px]">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">{item.startDate}</td>
                    <td className="p-2">{item.endDate}</td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          setModalOpen(true);
                          setEditData(item);
                        }}
                        className="px-2 py-0.5 bg-yellow-400 text-xs rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <LicenseFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSuccess={loadLicenses}
        editData={editData}
      />
    </div>
  );
};

export default SoftwareLicensePage;
