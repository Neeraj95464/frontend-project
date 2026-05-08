// import UsersTable from "../components/UsersTable";
// import {
//   fetchUsers,
//   downloadUsersExcel,
//   fetchSites,
//   getLocationsBySite,
// } from "../services/api";
// import { Card, CardContent } from "@/components/ui";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UsersPage = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     employeeId: "",
//     username: "",
//     role: "",
//     department: "",
//     siteId: "",
//     locationId: "",
//     search: "",
//   });
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const loadData = async (pageToLoad = page) => {
//     try {
//       const res = await fetchUsers(filters, pageToLoad, size);
//       setUsers(res.content || []);
//       setTotalPages(res.totalPages || 0);
//       setTotalElements(res.totalElements || 0);
//       setPage(res.page ?? pageToLoad);
//     } catch (err) {
//       console.error("Error loading users", err);
//     }
//   };
//   useEffect(() => {
//     fetchSites()
//       .then((res) => {
//         const formatted = res.data.map((site) => ({
//           siteId: site.id,
//           name: site.name,
//         }));
//         setSites(formatted);
//       })
//       .catch((err) => console.error("Failed to fetch sites", err));
//   }, []);
//   useEffect(() => {
//     if (filters.siteId) {
//       getLocationsBySite(filters.siteId)
//         .then((locs) => setLocations(locs))
//         .catch((err) => console.error("Failed to fetch locations", err));
//     } else {
//       setLocations([]);
//       setFilters((prev) => ({ ...prev, locationId: "" }));
//     }
//   }, [filters.siteId]);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       setPage(0);
//       loadData(0);
//     }, 400);
//     return () => clearTimeout(delay);
//   }, [
//     filters.search,
//     filters.employeeId,
//     filters.username,
//     filters.role,
//     filters.department,
//     filters.siteId,
//     filters.locationId,
//   ]);

//   useEffect(() => {
//     loadData(page);
//   }, [page]);
//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => {
//       const newFilters = { ...prev, [key]: value };
//       if (key === "siteId") {
//         newFilters.locationId = "";
//         setLocations([]);
//       }
//       return newFilters;
//     });
//     setPage(0);
//   };
//   const handleDownloadExcel = async () => {
//     try {
//       const res = await downloadUsersExcel(filters);
//       const blob = new Blob([res.data], {
//         type:
//           res.headers["content-type"] ||
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       const disposition = res.headers["content-disposition"];
//       let filename = "users.xlsx";
//       if (disposition && disposition.includes("filename=")) {
//         filename = disposition.split("filename=")[1].replace(/"/g, "");
//       }
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Failed to download Excel", err);
//     }
//   };
//   const handleAddEmployee = () => navigate("/register");
//   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
//   const handleSerialClick = (serialNumber) =>
//     navigate(`/asset/${serialNumber}`);
//   return (
//     // <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-4 min-h-screen bg-gray-50 flex flex-col">
//      <div className="lg:ml-48 bg-gray-50 min-h-screen">
//      <div className="flex items-center gap-2 mb-2">
//         <button
//           onClick={handleAddEmployee}
//           className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded font-medium text-xs shadow-md flex items-center gap-1"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-3 w-3"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//           Add Employee
//         </button>
//         <button
//           type="button"
//           onClick={handleDownloadExcel}
//           className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm flex items-center gap-1"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-3 w-3"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
//             <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
//           </svg>
//           Excel
//         </button>
//         {totalPages > 0 && (
//           <div className="flex items-center gap-1">
//             <button
//               disabled={page === 0}
//               onClick={() => setPage((p) => p - 1)}
//               className="px-1.5 py-1 text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               ←
//             </button>
//             <span className="px-1.5 py-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
//               {page + 1}/{totalPages} ({totalElements})
//             </span>
//             <button
//               disabled={page + 1 >= totalPages}
//               onClick={() => setPage((p) => p + 1)}
//               className="px-1.5 py-1 text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               →
//             </button>
//           </div>
//         )}
//       </div>
    

//       <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-2">
//         <div className="flex flex-wrap items-center gap-2">
//           <input
//             placeholder="EMP ID"
//             value={filters.employeeId}
//             onChange={(e) => handleFilterChange("employeeId", e.target.value)}
//             className="w-28 border border-gray-200 px-3 py-1.5 rounded text-sm
//         focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />

//           <input
//             placeholder="Username"
//             value={filters.username}
//             onChange={(e) => handleFilterChange("username", e.target.value)}
//             className="w-32 border border-gray-200 px-3 py-1.5 rounded text-sm
//         focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />

//           <input
//             placeholder="Role"
//             value={filters.role}
//             onChange={(e) => handleFilterChange("role", e.target.value)}
//             className="w-28 border border-gray-200 px-3 py-1.5 rounded text-sm
//         focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />

//           <input
//             placeholder="Department"
//             value={filters.department}
//             onChange={(e) => handleFilterChange("department", e.target.value)}
//             className="w-36 border border-gray-200 px-3 py-1.5 rounded text-sm
//         focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />

//           <select
//             value={filters.siteId || ""}
//             onChange={(e) =>
//               handleFilterChange("siteId", e.target.value || null)
//             }
//             className="w-32 border border-gray-200 px-3 py-1.5 rounded text-sm
//         focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//           >
//             <option value="">Site</option>
//             {sites.map(({ siteId, name }) => (
//               <option key={siteId} value={siteId}>
//                 {name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={filters.locationId || ""}
//             onChange={(e) =>
//               handleFilterChange("locationId", e.target.value || null)
//             }
//             disabled={!filters.siteId}
//             className="w-36 border border-gray-200 px-3 py-1.5 rounded text-sm
//         focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none
//         bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
//           >
//             <option value="">Location</option>
//             {locations.map((loc) => (
//               <option key={loc.id} value={loc.id}>
//                 {loc.name}
//               </option>
//             ))}
//           </select>

//           {/* 🔍 Global Search */}
//           <input
//             placeholder="Search..."
//             value={filters.search}
//             onChange={(e) => handleFilterChange("search", e.target.value)}
//             className="w-40 border border-gray-200 px-3 py-1.5 rounded text-sm
//         focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//         </div>
//       </div>

//       <div className="flex-1 min-h-0">
//         <Card className="h-full flex flex-col">
//           <CardContent className="p-0 h-full flex flex-col">
//             <div className="flex-1 min-h-0 overflow-auto">
//               <UsersTable
//                 users={users}
//                 onEdit={handleEdit}
//                 onSerialClick={handleSerialClick}
//               />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };
// export default UsersPage;



import UsersTable from "../components/UsersTable";
import UserDetailsModal from "../components/UserDetailsModal";
import {
  fetchUsers,
  downloadUsersExcel,
  fetchSites,
  getLocationsBySite,
} from "../services/api";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZES = [10, 20, 50, 100];

const UsersPage = () => {
  const navigate = useNavigate();
  const advancedRef = useRef(null);

  const [filters, setFilters] = useState({
    employeeId: "",
    username: "",
    role: "",
    department: "",
    siteId: "",
    locationId: "",
    search: "",
    createdAfter: "",
    createdBefore: "",
    isActive: null,  // null = all, true = active, false = inactive
  });

  const [users, setUsers]             = useState([]);
  const [page, setPage]               = useState(0);
  const [size, setSize]               = useState(10);
  const [totalPages, setTotalPages]   = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sites, setSites]             = useState([]);
  const [locations, setLocations]     = useState([]);
  const [loading, setLoading]         = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const advancedFilterCount = [
    filters.role, filters.department, filters.siteId,
    filters.locationId, filters.createdAfter, filters.createdBefore,
    filters.isActive !== null ? "isActive" : null,
  ].filter(Boolean).length;

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer shadow-sm";

  // ── Outside click closes advanced panel ──────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (advancedRef.current && !advancedRef.current.contains(e.target))
        setShowAdvanced(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Sites ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchSites()
      .then((res) => setSites(res.data.map((s) => ({ siteId: s.id, name: s.name }))))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (filters.siteId) {
      getLocationsBySite(filters.siteId).then(setLocations).catch(console.error);
    } else {
      setLocations([]);
    }
  }, [filters.siteId]);

  // ── Load data ─────────────────────────────────────────────────────────────
  const loadData = async (p = page, s = size) => {
    setLoading(true);
    try {
      const params = { ...filters, page: p, size: s };
      // strip empty strings and null values
      Object.keys(params).forEach((k) => {
        if (params[k] === "" || params[k] === null) delete params[k];
      });
      const res = await fetchUsers(params, p, s);
      setUsers(res.content || []);
      setTotalPages(res.totalPages || 0);
      setTotalElements(res.totalElements || 0);
      setPage(res.page ?? p);
    } catch (err) {
      console.error("Error loading users", err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced filter change
  useEffect(() => {
    const t = setTimeout(() => { setPage(0); loadData(0, size); }, 400);
    return () => clearTimeout(t);
  }, [
    filters.search, filters.employeeId, filters.username,
    filters.role, filters.department, filters.siteId,
    filters.locationId, filters.createdAfter, filters.createdBefore,
    filters.isActive,
  ]); // eslint-disable-line

  // Page / size changes
  const goToPage = (p) => { setPage(p); loadData(p, size); };
  const changeSize = (s) => { setSize(s); setPage(0); loadData(0, s); };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "siteId") { next.locationId = ""; setLocations([]); }
      return next;
    });
    setPage(0);
  };

  const clearAdvanced = () => {
    setFilters((p) => ({
      ...p, role: "", department: "", siteId: "", locationId: "",
      createdAfter: "", createdBefore: "", isActive: null,
    }));
    setLocations([]);
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await downloadUsersExcel(filters);
      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const disposition = res.headers["content-disposition"];
      let filename = "users.xlsx";
      if (disposition?.includes("filename="))
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download Excel", err);
    }
  };

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .usr-table td, .usr-table th { white-space: nowrap; }
        .usr-table td { font-size: 11px; }
        .usr-row:hover { background: #f0f7ff !important; }
        .tp-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .tp-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .tp-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .tp-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#e8eeff 50%,#f1f5f9 75%); background-size:200% 100%; animation:sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ═══ STICKY TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5">

          {/* Emp ID search */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <input
              type="text"
              placeholder="Emp ID..."
              value={filters.employeeId}
              onChange={(e) => handleFilterChange("employeeId", e.target.value)}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-28 sm:w-32 transition"
            />
            {filters.employeeId && (
              <button onClick={() => handleFilterChange("employeeId", "")} className="absolute right-1.5 text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Username search */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-32 sm:w-40 transition"
            />
            {filters.search && (
              <button onClick={() => handleFilterChange("search", "")} className="absolute right-1.5 text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Advanced filters */}
          <div className="relative" ref={advancedRef}>
            <button
              onClick={() => setShowAdvanced((p) => !p)}
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
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[300px] sm:w-[520px]">
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
                  {/* Username */}
                  <div className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                      className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Username..."
                      value={filters.username}
                      onChange={(e) => handleFilterChange("username", e.target.value)}
                      className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-32 transition"
                    />
                  </div>

                  {/* Role */}
                  <input
                    type="text"
                    placeholder="Role..."
                    value={filters.role}
                    onChange={(e) => handleFilterChange("role", e.target.value)}
                    className={sel + " min-w-[90px]"}
                  />

                  {/* Department */}
                  <input
                    type="text"
                    placeholder="Department..."
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    className={sel + " min-w-[110px]"}
                  />

                  {/* Site */}
                  <select
                    value={filters.siteId || ""}
                    onChange={(e) => handleFilterChange("siteId", e.target.value || "")}
                    className={sel + " min-w-[100px]"}
                  >
                    <option value="">All Sites</option>
                    {sites.map(({ siteId, name }) => <option key={siteId} value={siteId}>{name}</option>)}
                  </select>

                  {/* Location */}
                  {locations.length > 0 && (
                    <select
                      value={filters.locationId || ""}
                      onChange={(e) => handleFilterChange("locationId", e.target.value || "")}
                      className={sel + " min-w-[110px]"}
                    >
                      <option value="">All Locations</option>
                      {locations.map((loc) => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                    </select>
                  )}

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Date range */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-medium">Created:</span>
                    <input
                      type="datetime-local"
                      value={filters.createdAfter}
                      onChange={(e) => handleFilterChange("createdAfter", e.target.value)}
                      className={sel}
                    />
                    <span className="text-[10px] text-gray-400">to</span>
                    <input
                      type="datetime-local"
                      value={filters.createdBefore}
                      onChange={(e) => handleFilterChange("createdBefore", e.target.value)}
                      className={sel}
                    />
                    {(filters.createdAfter || filters.createdBefore) && (
                      <button
                        onClick={() => setFilters((p) => ({ ...p, createdAfter: "", createdBefore: "" }))}
                        className="text-[10px] text-red-400 hover:text-red-600 font-medium"
                      >✕</button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Active / Inactive status pills */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-medium">Status:</span>
                    {[
                      { v: null,  l: "All" },
                      { v: true,  l: "Active" },
                      { v: false, l: "Inactive" },
                    ].map(({ v, l }) => (
                      <button
                        key={String(v)}
                        onClick={() => { handleFilterChange("isActive", v); }}
                        className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
                          filters.isActive === v
                            ? v === false
                              ? "bg-red-500 text-white border-red-500"
                              : v === true
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Actions — Add Employee + Export */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <button
                      onClick={() => { setShowAdvanced(false); navigate("/register"); }}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition shadow-sm"
                    >
                      <span className="text-sm leading-none">+</span>
                      <span>Add Employee</span>
                    </button>
                    <button
                      onClick={() => { setShowAdvanced(false); handleDownloadExcel(); }}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
                        <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
                      </svg>
                      <span>Export Excel</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(Math.max(page - 1, 0))}
              disabled={page === 0 || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
              <span className="text-blue-700">{page + 1}</span>
              <span className="text-gray-400"> / </span>
              {totalPages || 1}
            </span>
            <button
              onClick={() => goToPage(page + 1 < totalPages ? page + 1 : page)}
              disabled={page + 1 >= totalPages || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Total */}
          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{totalElements}</span>
            <span className="hidden sm:inline"> users</span>
          </span>

          {/* Page size — pushed right */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => changeSize(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  size === n ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
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
            <table className="w-full usr-table" style={{ minWidth: 1100 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["EMP ID","Username","Designation","Role","Status","Dept","Email","Phone","Site","Location","Note","Assets","Action"].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 13 }).map((__, j) => (
                      <td key={j} className="px-2.5 py-2">
                        <div className="shimmer h-2.5 rounded" style={{ width: `${40 + Math.random() * 50}%` }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty */}
        {!loading && users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-gray-400">No users found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Try changing your filters.</p>
          </div>
        )}

        {/* Table */}
        {!loading && users.length > 0 && (
          <div className="overflow-x-auto tp-scrollbar">
            <table className="w-full usr-table" style={{ minWidth: 1100, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {[
                    { label: "EMP ID",       cls: "w-24" },
                    { label: "Username",     cls: "min-w-[120px]" },
                    { label: "Designation",  cls: "min-w-[110px]" },
                    { label: "Role",         cls: "w-24" },
                    { label: "Status",       cls: "w-20" },
                    { label: "Department",   cls: "min-w-[100px]" },
                    { label: "Email",        cls: "min-w-[160px]" },
                    { label: "Personal Email",cls: "min-w-[160px]" },
                    { label: "Phone",        cls: "w-28" },
                    { label: "Aadhar",       cls: "w-28" },
                    { label: "PAN",          cls: "w-24" },
                    { label: "Site",         cls: "min-w-[90px]" },
                    { label: "Location",     cls: "min-w-[100px]" },
                    { label: "Note",         cls: "min-w-[120px]" },
                    { label: "Created By",   cls: "min-w-[100px]" },
                    { label: "Updated By",   cls: "min-w-[100px]" },
                    { label: "Assets",       cls: "min-w-[120px]" },
                    { label: "Action",       cls: "w-16" },
                  ].map(({ label, cls }, i) => (
                    <th key={i} className={`px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${cls}`}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, ri) => (
                  <tr
                    key={user.id}
                    className="usr-row border-b border-gray-50 transition-colors"
                    style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
                  >
                    {/* EMP ID — clickable → UserDetailsModal */}
                    <td className="px-2.5 py-1.5">
                      <button
                        onClick={() => setSelectedUser(user.employeeId)}
                        className="text-blue-600 hover:underline font-mono text-[11px] font-semibold"
                      >
                        {user.employeeId}
                      </button>
                    </td>

                    {/* Username — clickable → UserDetailsModal */}
                    <td className="px-2.5 py-1.5">
                      <button
                        onClick={() => setSelectedUser(user.employeeId)}
                        className="text-blue-600 hover:underline font-medium text-[11px] truncate max-w-[120px] block text-left"
                      >
                        {user.username}
                      </button>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[120px]">
                      <span className="truncate block">{user.designation || <span className="text-gray-300">—</span>}</span>
                    </td>

                    <td className="px-2.5 py-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200 whitespace-nowrap">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-2.5 py-1.5">
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                        user.active
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}>
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[110px]">
                      <span className="truncate block">{user.department || <span className="text-gray-300">—</span>}</span>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[180px]">
                      <span className="truncate block" title={user.email}>{user.email || <span className="text-gray-300">—</span>}</span>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[180px]">
                      <span className="truncate block" title={user.personalEmail}>{user.personalEmail || <span className="text-gray-300">—</span>}</span>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-600 font-mono">{user.phoneNumber || <span className="text-gray-300">—</span>}</td>

                    <td className="px-2.5 py-1.5 text-gray-600 font-mono">{user.aadharNumber || <span className="text-gray-300">—</span>}</td>

                    <td className="px-2.5 py-1.5 text-gray-600 font-mono">{user.panNumber || <span className="text-gray-300">—</span>}</td>

                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[100px]">
                      <span className="truncate block">{user.siteName || <span className="text-gray-300">—</span>}</span>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[110px]">
                      <span className="truncate block">{user.locationName || <span className="text-gray-300">—</span>}</span>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[130px]">
                      <span className="truncate block" title={user.note}>{user.note || <span className="text-gray-300">—</span>}</span>
                    </td>

                    <td className="px-2.5 py-1.5 text-gray-500">{user.createdBy || <span className="text-gray-300">—</span>}</td>

                    <td className="px-2.5 py-1.5 text-gray-500">{user.lastUpdatedBy || <span className="text-gray-300">—</span>}</td>

                    {/* Assets */}
                    <td className="px-2.5 py-1.5">
                      <div className="flex flex-wrap gap-1">
                        {user.serialNumbers?.length > 0
                          ? user.serialNumbers.map((asset, idx) => (
                              <button
                                key={idx}
                                onClick={() => navigate(`/asset/${asset.serialNumber}`)}
                                className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded hover:bg-blue-100 hover:underline font-mono transition"
                              >
                                {asset.serialNumber}
                              </button>
                            ))
                          : <span className="text-gray-300 text-[10px]">—</span>}
                      </div>
                    </td>

                    {/* Edit action */}
                    <td className="px-2.5 py-1.5">
                      <button
                        onClick={() => navigate(`/edit-user/${user.id}`)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
                        title="Edit user"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* UserDetailsModal — same as TicketingPortal */}
      {selectedUser && (
        <UserDetailsModal
          query={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UsersPage;