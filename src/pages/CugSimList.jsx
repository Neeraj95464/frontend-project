// // import UserDetailsModal from "../components/UserDetailsModal";
// // import {
// //   fetchSimCards,
// //   fetchSites,
// //   getLocationsBySite,
// //   downloadSimExcel,
// // } from "../services/api";
// // import { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function CugSimList() {
// //   const navigate = useNavigate();
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   const [filters, setFilters] = useState({
// //     phoneNumber: "",
// //     provider: "",
// //     status: "",
// //     employeeId: "",
// //     search: "",
// //     siteId: "",
// //     locationId: "",
// //   });

// //   const [sims, setSims] = useState([]);
// //   const [page, setPage] = useState(0);
// //   const [size] = useState(10);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [totalElements, setTotalElements] = useState(0);
// //   const [sites, setSites] = useState([]);
// //   const [locations, setLocations] = useState([]);

// //   const loadData = async () => {
// //     const response = await fetchSimCards(filters, page, size);
// //     // console.log("response was ", response);
// //     setSims(response.content);
// //     setTotalPages(response.totalPages);
// //     setTotalElements(response.totalElements);
// //   };

// //   useEffect(() => {
// //     fetchSites()
// //       .then((res) => {
// //         const formatted = res.data.map((site) => ({
// //           siteId: site.id,
// //           name: site.name,
// //         }));
// //         setSites(formatted);
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch sites", err);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     if (filters.siteId) {
// //       getLocationsBySite(filters.siteId)
// //         .then((locations) => {
// //           setLocations(locations);
// //         })
// //         .catch((err) => {
// //           console.error("Error fetching locations", err);
// //         });
// //     } else {
// //       setLocations([]);
// //       setFilters((prev) => ({ ...prev, locationId: "" }));
// //     }
// //   }, [filters.siteId]);

// //   useEffect(() => {
// //     const delay = setTimeout(() => {
// //       setPage(0);
// //       loadData();
// //     }, 400);
// //     return () => clearTimeout(delay);
// //   }, [
// //     filters.phoneNumber,
// //     filters.provider,
// //     filters.status,
// //     filters.employeeId,
// //     filters.search,
// //     filters.siteId,
// //     filters.locationId,
// //   ]);

// //   useEffect(() => {
// //     loadData();
// //   }, [page]);

// //   const handleDownloadExcel = async () => {
// //     try {
// //       const res = await downloadSimExcel(filters);

// //       const blob = new Blob([res.data], {
// //         type:
// //           res.headers["content-type"] ||
// //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       });

// //       const url = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;

// //       // try to get filename from Content-Disposition, otherwise fallback
// //       const disposition = res.headers["content-disposition"];
// //       let filename = "cug_sims.xlsx";
// //       if (disposition && disposition.includes("filename=")) {
// //         filename = disposition.split("filename=")[1].replace(/"/g, "");
// //       }
// //       link.download = filename;

// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();
// //       window.URL.revokeObjectURL(url);
// //     } catch (err) {
// //       console.error("Failed to download Excel", err);
// //     }
// //   };

// //   const handleAddSim = () => navigate("/cug-sim/add");

// //   // const handleFilterChange = (key, value) => {
// //   //   // setFilters({ ...filters, [key]: value });

// //   //   setFilters((prev) => ({ ...prev, [key]: value }));
// //   //   setPage(0); // Reset to first page on filter change
// //   // };

// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => {
// //       const newFilters = { ...prev, [key]: value };

// //       // ✅ CRITICAL: Reset location when site changes
// //       if (key === "siteId") {
// //         newFilters.locationId = ""; // Reset BEFORE API call
// //         setLocations([]); // Clear locations immediately
// //       }

// //       return newFilters;
// //     });
// //     setPage(0);
// //   };

// //   const getStatusBadge = (status) => {
// //     switch (status) {
// //       case "ACTIVE":
// //         return "bg-green-100 text-green-700";
// //       case "INACTIVE":
// //         return "bg-red-100 text-red-700";
// //       case "SUSPENDED":
// //         return "bg-yellow-100 text-yellow-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   return (
    
// //     // <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
// //       <div className="lg:ml-48 bg-gray-50 min-h-screen">
// //     {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //         <div>
// //           <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
// //             <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-5 w-5"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
// //                 />
// //               </svg>
// //             </span>
// //             CUG SIM Inventory
// //           </h1>
// //           <p className="text-gray-500 text-sm mt-1">Manage all SIM cards</p>
// //         </div>
// //         <button
// //           onClick={handleAddSim}
// //           className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2 text-sm"
// //         >
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             className="h-4 w-4"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //             stroke="currentColor"
// //           >
// //             <path
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               strokeWidth={2}
// //               d="M12 4v16m8-8H4"
// //             />
// //           </svg>
// //           Add SIM
// //         </button>
// //       </div>

// //       <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mb-4">
// //         <div className="flex flex-wrap items-center gap-2">
// //           {/* SIM # */}
// //           <input
// //             placeholder="SIM #"
// //             value={filters.phoneNumber}
// //             onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
// //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// //           />

// //           {/* Provider */}
// //           <select
// //             value={filters.provider}
// //             onChange={(e) => handleFilterChange("provider", e.target.value)}
// //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
// //           >
// //             <option value="">Provider</option>
// //             <option value="AIRTEL">Airtel</option>
// //             <option value="VI">VI</option>
// //             <option value="JIO">Jio</option>
// //           </select>

// //           {/* Status */}
// //           <select
// //             value={filters.status}
// //             onChange={(e) => handleFilterChange("status", e.target.value)}
// //             className="w-28 sm:w-32 md:w-36 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
// //           >
// //             <option value="">Status</option>
// //             <option value="AVAILABLE">Available</option>
// //             <option value="ASSIGNED">Assigned</option>
// //             <option value="SUSPENDED">Suspended</option>
// //             <option value="LOST">Lost</option>
// //             <option value="DEACTIVATED">Deactivated</option>
// //             <option value="REPLACED">Replaced</option>
// //             <option value="UAP">UAP</option>
// //           </select>

// //           {/* Emp ID */}
// //           <input
// //             placeholder="Emp ID"
// //             value={filters.employeeId}
// //             onChange={(e) => handleFilterChange("employeeId", e.target.value)}
// //             className="w-20 sm:w-24 md:w-28 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// //           />

// //           {/* Site */}
// //           <select
// //             value={filters.siteId || ""}
// //             onChange={(e) =>
// //               handleFilterChange("siteId", e.target.value || null)
// //             }
// //             className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
// //           >
// //             <option value="">Site</option>
// //             {sites.map(({ siteId, name }) => (
// //               <option key={siteId} value={siteId}>
// //                 {name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Location */}
// //           <select
// //             value={filters.locationId || ""}
// //             onChange={(e) =>
// //               handleFilterChange("locationId", e.target.value || null)
// //             }
// //             disabled={!filters.siteId}
// //             className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
// //           >
// //             <option value="">Location</option>
// //             {locations.map((loc) => (
// //               <option key={loc.id} value={loc.id}>
// //                 {loc.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Search */}
// //           <div className="relative flex-1 min-w-[120px] max-w-[180px]">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //               />
// //             </svg>
// //             <input
// //               placeholder="Search"
// //               value={filters.search}
// //               onChange={(e) => handleFilterChange("search", e.target.value)}
// //               className="w-full border border-gray-200 pl-7 pr-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// //             />
// //           </div>

// //           {/* Right side: Download + Pagination */}
// //           <div className="flex items-center gap-2 ml-auto">
// //             {/* Download Excel (icon button + text) */}
// //             <button
// //               type="button"
// //               onClick={handleDownloadExcel}
// //               className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm"
// //             >
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-3.5 w-3.5"
// //                 viewBox="0 0 20 20"
// //                 fill="currentColor"
// //               >
// //                 <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
// //                 <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
// //               </svg>
// //               <span className="hidden sm:inline">Excel</span>
// //             </button>

// //             {/* Pagination */}
// //             {totalPages > 0 && (
// //               <div className="flex items-center gap-1">
// //                 <button
// //                   disabled={page === 0}
// //                   onClick={() => setPage(page - 1)}
// //                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
// //                 >
// //                   ←
// //                 </button>
// //                 <span className="px-2 py-1 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
// //                   {page + 1}/{totalPages} ({totalElements})
// //                 </span>
// //                 <button
// //                   disabled={page + 1 >= totalPages}
// //                   onClick={() => setPage(page + 1)}
// //                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
// //                 >
// //                   →
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Desktop Table */}
// //       <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
// //         <table className="w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Mobile Number
// //               </th>
// //               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Provider
// //               </th>
// //               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Site
// //               </th>
// //               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Location
// //               </th>
// //               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Assigned To
// //               </th>
// //               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Status
// //               </th>
// //               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Actions
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-100">
// //             {sims.map((sim) => (
// //               <tr key={sim.id} className="hover:bg-gray-50 transition-colors">
// //                 <td className="px-4 py-3">
// //                   <Link
// //                     to={`/cug-sim/${sim.id}`}
// //                     className="text-blue-600 hover:text-blue-800 font-medium text-sm"
// //                   >
// //                     {sim.phoneNumber}
// //                   </Link>
// //                 </td>
// //                 <td className="px-4 py-3 text-sm text-gray-700">
// //                   {sim.provider}
// //                 </td>
// //                 <td className="px-4 py-3 text-sm text-gray-700">
// //                   {sim.siteName || (
// //                     <span className="text-gray-400 italic">N/A</span>
// //                   )}
// //                 </td>
// //                 <td className="px-4 py-3 text-sm text-gray-700">
// //                   {sim.locationName || (
// //                     <span className="text-gray-400 italic">N/A</span>
// //                   )}
// //                 </td>
// //                 {/* <td className="px-4 py-3 text-sm text-gray-700">
// //                   {sim.assignedUserName || (
// //                     <span className="text-gray-400 italic">Unassigned</span>
// //                   )}
// //                 </td> */}
// //                 {/* <td className="px-4 py-3 text-sm text-gray-700"></td>
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     setSelectedUser(sim.assignedUserId);
// //                   }}
// //                   className="hover:underline truncate"
// //                 >
// //                   {sim.assignedUserName || "Unassigned"}
// //                 </button>
// //                 </td> */}

// //                 <td className="px-4 py-3 text-sm text-blue-600">
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       setSelectedUser(sim.assignedUserId);
// //                     }}
// //                     className="hover:underline truncate"
// //                   >
// //                     {sim.assignedUserName || "Unassigned"}
// //                   </button>
// //                 </td>

// //                 <td className="px-4 py-3">
// //                   <span
// //                     className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
// //                       sim.status
// //                     )}`}
// //                   >
// //                     {sim.status}
// //                   </span>
// //                 </td>
// //                 <td className="px-4 py-3">
// //                   <Link
// //                     to={`/cug-sim/${sim.id}`}
// //                     className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
// //                   >
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="h-4 w-4"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// //                       />
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// //                       />
// //                     </svg>
// //                     View
// //                   </Link>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //         {sims.length === 0 && (
// //           <div className="text-center py-10">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-10 w-10 text-gray-300 mx-auto mb-3"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={1.5}
// //                 d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
// //               />
// //             </svg>
// //             <p className="text-gray-500 text-sm">No SIM cards found</p>
// //           </div>
// //         )}
// //       </div>

// //       {/* Mobile Cards */}
// //       <div className="md:hidden space-y-3">
// //         {sims.length > 0 ? (
// //           sims.map((sim) => (
// //             <Link
// //               key={sim.id}
// //               to={`/cug-sim/${sim.id}`}
// //               className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
// //             >
// //               <div className="flex items-center justify-between mb-3">
// //                 <span className="text-blue-600 font-semibold">
// //                   {sim.phoneNumber}
// //                 </span>
// //                 <span
// //                   className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
// //                     sim.status
// //                   )}`}
// //                 >
// //                   {sim.status}
// //                 </span>
// //               </div>
// //               <div className="space-y-2 text-sm">
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-gray-500">Provider:</span>
// //                   <span className="text-gray-700">{sim.provider}</span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-gray-500">Site:</span>
// //                   <span className="text-gray-700">
// //                     {sim.siteName || (
// //                       <span className="text-gray-400 italic">N/A</span>
// //                     )}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-gray-500">Location:</span>
// //                   <span className="text-gray-700">
// //                     {sim.locationName || (
// //                       <span className="text-gray-400 italic">N/A</span>
// //                     )}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-gray-500">Assigned To:</span>
// //                   <span className="text-gray-700">
// //                     {sim.assignedUserName || (
// //                       <span className="text-gray-400 italic">Unassigned</span>
// //                     )}
// //                   </span>
// //                 </div>
// //               </div>
// //             </Link>
// //           ))
// //         ) : (
// //           <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-10 w-10 text-gray-300 mx-auto mb-3"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={1.5}
// //                 d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
// //               />
// //             </svg>
// //             <p className="text-gray-500 text-sm">No SIM cards found</p>
// //           </div>
// //         )}
// //       </div>

// //       {selectedUser && (
// //         <UserDetailsModal
// //           query={selectedUser}
// //           isOpen={!!selectedUser}
// //           onClose={() => setSelectedUser(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // }


// import UserDetailsModal from "../components/UserDetailsModal";
// import {
//   fetchSimCards,
//   fetchSites,
//   getLocationsBySite,
//   downloadSimExcel,
// } from "../services/api";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function CugSimList() {
//   const navigate = useNavigate();
//   const [selectedUser, setSelectedUser] = useState(null);

//   const [filters, setFilters] = useState({
//     phoneNumber: "",
//     provider: "",
//     status: "",
//     employeeId: "",
//     search: "",
//     siteId: "",
//     locationId: "",
//     includeHistorical: false,  // ✅ NEW: Add this field
//   });

//   const [sims, setSims] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);

//   const loadData = async () => {
//     const response = await fetchSimCards(filters, page, size);
//     // console.log("response was ", response);
//     setSims(response.content);
//     setTotalPages(response.totalPages);
//     setTotalElements(response.totalElements);
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
//       .catch((err) => {
//         console.error("Failed to fetch sites", err);
//       });
//   }, []);

//   useEffect(() => {
//     if (filters.siteId) {
//       getLocationsBySite(filters.siteId)
//         .then((locations) => {
//           setLocations(locations);
//         })
//         .catch((err) => {
//           console.error("Error fetching locations", err);
//         });
//     } else {
//       setLocations([]);
//       setFilters((prev) => ({ ...prev, locationId: "" }));
//     }
//   }, [filters.siteId]);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       setPage(0);
//       loadData();
//     }, 400);
//     return () => clearTimeout(delay);
//   }, [
//     filters.phoneNumber,
//     filters.provider,
//     filters.status,
//     filters.employeeId,
//     filters.search,
//     filters.siteId,
//     filters.locationId,
//     filters.includeHistorical,  // ✅ NEW: Add this to dependency array
//   ]);

//   useEffect(() => {
//     loadData();
//   }, [page]);

//   const handleDownloadExcel = async () => {
//     try {
//       const res = await downloadSimExcel(filters);

//       const blob = new Blob([res.data], {
//         type:
//           res.headers["content-type"] ||
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;

//       // try to get filename from Content-Disposition, otherwise fallback
//       const disposition = res.headers["content-disposition"];
//       let filename = "cug_sims.xlsx";
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

//   const handleAddSim = () => navigate("/cug-sim/add");

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => {
//       const newFilters = { ...prev, [key]: value };

//       // ✅ CRITICAL: Reset location when site changes
//       if (key === "siteId") {
//         newFilters.locationId = ""; // Reset BEFORE API call
//         setLocations([]); // Clear locations immediately
//       }

//       return newFilters;
//     });
//     setPage(0);
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "ACTIVE":
//         return "bg-green-100 text-green-700";
//       case "INACTIVE":
//         return "bg-red-100 text-red-700";
//       case "SUSPENDED":
//         return "bg-yellow-100 text-yellow-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//                 />
//               </svg>
//             </span>
//             CUG SIM Inventory
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">Manage all SIM cards</p>
//         </div>
//         <button
//           onClick={handleAddSim}
//           className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2 text-sm"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4"
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
//           Add SIM
//         </button>
//       </div>

//       <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mb-4">
//         <div className="flex flex-wrap items-center gap-2">
//           {/* SIM # */}
//           <input
//             placeholder="SIM #"
//             value={filters.phoneNumber}
//             onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
//             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />

//           {/* Provider */}
//           <select
//             value={filters.provider}
//             onChange={(e) => handleFilterChange("provider", e.target.value)}
//             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//           >
//             <option value="">Provider</option>
//             <option value="AIRTEL">Airtel</option>
//             <option value="VI">VI</option>
//             <option value="JIO">Jio</option>
//           </select>

//           {/* Status */}
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="w-28 sm:w-32 md:w-36 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//           >
//             <option value="">Status</option>
//             <option value="AVAILABLE">Available</option>
//             <option value="ASSIGNED">Assigned</option>
//             <option value="SUSPENDED">Suspended</option>
//             <option value="LOST">Lost</option>
//             <option value="DEACTIVATED">Deactivated</option>
//             <option value="REPLACED">Replaced</option>
//             <option value="UAP">UAP</option>
//           </select>

//           {/* Emp ID */}
//           <input
//             placeholder="Emp ID"
//             value={filters.employeeId}
//             onChange={(e) => handleFilterChange("employeeId", e.target.value)}
//             className="w-20 sm:w-24 md:w-28 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />

//           {/* Site */}
//           <select
//             value={filters.siteId || ""}
//             onChange={(e) =>
//               handleFilterChange("siteId", e.target.value || null)
//             }
//             className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//           >
//             <option value="">Site</option>
//             {sites.map(({ siteId, name }) => (
//               <option key={siteId} value={siteId}>
//                 {name}
//               </option>
//             ))}
//           </select>

//           {/* Location */}
//           <select
//             value={filters.locationId || ""}
//             onChange={(e) =>
//               handleFilterChange("locationId", e.target.value || null)
//             }
//             disabled={!filters.siteId}
//             className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
//           >
//             <option value="">Location</option>
//             {locations.map((loc) => (
//               <option key={loc.id} value={loc.id}>
//                 {loc.name}
//               </option>
//             ))}
//           </select>

//           {/* Search */}
//           <div className="relative flex-1 min-w-[120px] max-w-[180px]">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//             <input
//               placeholder="Search"
//               value={filters.search}
//               onChange={(e) => handleFilterChange("search", e.target.value)}
//               className="w-full border border-gray-200 pl-7 pr-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>

//           {/* ✅ NEW: Include Historical Checkbox */}
//           <label className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] sm:text-xs bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 transition">
//             <input
//               type="checkbox"
//               checked={filters.includeHistorical}
//               onChange={(e) => handleFilterChange("includeHistorical", e.target.checked)}
//               className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
//             />
//             <span className="text-blue-700 font-medium whitespace-nowrap">
//               Include History
//             </span>
//           </label>

//           {/* Right side: Download + Pagination */}
//           <div className="flex items-center gap-2 ml-auto">
//             {/* Download Excel (icon button + text) */}
//             <button
//               type="button"
//               onClick={handleDownloadExcel}
//               className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-3.5 w-3.5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
//                 <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
//               </svg>
//               <span className="hidden sm:inline">Excel</span>
//             </button>

//             {/* Pagination */}
//             {totalPages > 0 && (
//               <div className="flex items-center gap-1">
//                 <button
//                   disabled={page === 0}
//                   onClick={() => setPage(page - 1)}
//                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   ←
//                 </button>
//                 <span className="px-2 py-1 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
//                   {page + 1}/{totalPages} ({totalElements})
//                 </span>
//                 <button
//                   disabled={page + 1 >= totalPages}
//                   onClick={() => setPage(page + 1)}
//                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   →
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Info message when history is enabled */}
//       {filters.includeHistorical && filters.employeeId && (
//         <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
//           <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span className="text-xs text-amber-800">
//             Historical mode ON: Showing all SIM cards ever assigned to employee <strong>{filters.employeeId}</strong> (including past assignments)
//           </span>
//         </div>
//       )}

//       {/* Desktop Table */}
//       <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Mobile Number
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Provider
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Site
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Location
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Assigned To
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {sims.map((sim) => (
//               <tr key={sim.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-4 py-3">
//                   <Link
//                     to={`/cug-sim/${sim.id}`}
//                     className="text-blue-600 hover:text-blue-800 font-medium text-sm"
//                   >
//                     {sim.phoneNumber}
//                   </Link>
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   {sim.provider}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   {sim.siteName || (
//                     <span className="text-gray-400 italic">N/A</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   {sim.locationName || (
//                     <span className="text-gray-400 italic">N/A</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-blue-600">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedUser(sim.assignedUserId);
//                     }}
//                     className="hover:underline truncate"
//                   >
//                     {sim.assignedUserName || "Unassigned"}
//                   </button>
//                 </td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
//                       sim.status
//                     )}`}
//                   >
//                     {sim.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">
//                   <Link
//                     to={`/cug-sim/${sim.id}`}
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {sims.length === 0 && (
//           <div className="text-center py-10">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-gray-300 mx-auto mb-3"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//               />
//             </svg>
//             <p className="text-gray-500 text-sm">No SIM cards found</p>
//           </div>
//         )}
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-3">
//         {sims.length > 0 ? (
//           sims.map((sim) => (
//             <Link
//               key={sim.id}
//               to={`/cug-sim/${sim.id}`}
//               className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-blue-600 font-semibold">
//                   {sim.phoneNumber}
//                 </span>
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
//                     sim.status
//                   )}`}
//                 >
//                   {sim.status}
//                 </span>
//               </div>
//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Provider:</span>
//                   <span className="text-gray-700">{sim.provider}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Site:</span>
//                   <span className="text-gray-700">
//                     {sim.siteName || (
//                       <span className="text-gray-400 italic">N/A</span>
//                     )}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Location:</span>
//                   <span className="text-gray-700">
//                     {sim.locationName || (
//                       <span className="text-gray-400 italic">N/A</span>
//                     )}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Assigned To:</span>
//                   <span className="text-gray-700">
//                     {sim.assignedUserName || (
//                       <span className="text-gray-400 italic">Unassigned</span>
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-gray-300 mx-auto mb-3"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//               />
//             </svg>
//             <p className="text-gray-500 text-sm">No SIM cards found</p>
//           </div>
//         )}
//       </div>

//       {selectedUser && (
//         <UserDetailsModal
//           query={selectedUser}
//           isOpen={!!selectedUser}
//           onClose={() => setSelectedUser(null)}
//         />
//       )}
//     </div>
//   );
// }

import UserDetailsModal from "../components/UserDetailsModal";
import {
  fetchSimCards,
  fetchSites,
  getLocationsBySite,
  downloadSimExcel,
} from "../services/api";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZES = [10, 20, 50, 100];

const STATUS_BADGE = {
  AVAILABLE:   "bg-emerald-100 text-emerald-700 border border-emerald-200",
  ASSIGNED:    "bg-blue-100 text-blue-700 border border-blue-200",
  SUSPENDED:   "bg-amber-100 text-amber-700 border border-amber-200",
  LOST:        "bg-red-100 text-red-700 border border-red-200",
  DEACTIVATED: "bg-gray-100 text-gray-600 border border-gray-200",
  REPLACED:    "bg-orange-100 text-orange-700 border border-orange-200",
  DISCARDED:   "bg-red-200 text-red-800 border border-red-300",
  UAP:         "bg-violet-100 text-violet-700 border border-violet-200",
};

// Persist filter/page state so back-navigation restores the exact list
const SIM_STATE_KEY = "cugSimListState";
function loadPersistedState() {
  try {
    const raw = sessionStorage.getItem(SIM_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveState(state) {
  try { sessionStorage.setItem(SIM_STATE_KEY, JSON.stringify(state)); } catch {}
}

export default function CugSimList() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const advancedRef = useRef(null);

  // ── Restore persisted state on mount ─────────────────────────────────────
  const persisted = loadPersistedState();

  const [filters, setFilters] = useState(persisted?.filters ?? {
    phoneNumber: "",
    provider: "",
    status: "",
    employeeId: "",
    search: "",
    siteId: "",
    locationId: "",
    includeHistorical: false,
  });
  const [page, setPage]           = useState(persisted?.page ?? 0);
  const [size, setSize]           = useState(persisted?.size ?? 10);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sims, setSims]           = useState([]);
  const [totalPages, setTotalPages]     = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sites, setSites]         = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading]     = useState(false);

  // Count active advanced filters
  const advancedFilterCount = [
    filters.provider, filters.status, filters.siteId,
    filters.locationId, filters.search,
  ].filter(Boolean).length;

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer shadow-sm";

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

  // ── Close advanced on outside click ──────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (advancedRef.current && !advancedRef.current.contains(e.target))
        setShowAdvanced(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Data loading ──────────────────────────────────────────────────────────
  const loadData = async (p = page, s = size, f = filters) => {
    setLoading(true);
    try {
      const response = await fetchSimCards(f, p, s);
      setSims(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      // persist so detail page can navigate prev/next and back restores list
      saveState({ filters: f, page: p, size: s, ids: response.content.map((x) => x.id) });
    } catch (err) {
      console.error("Failed to load SIMs", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter changes → reset to page 0
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(0);
      loadData(0, size, filters);
    }, 350);
    return () => clearTimeout(delay);
  }, [
    filters.phoneNumber, filters.provider, filters.status,
    filters.employeeId, filters.search, filters.siteId,
    filters.locationId, filters.includeHistorical,
  ]);

  // Page / size changes (without filter change)
  const goToPage = (p) => { setPage(p); loadData(p, size, filters); };
  const changeSize = (s) => { setSize(s); setPage(0); loadData(0, s, filters); };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "siteId") { next.locationId = ""; setLocations([]); }
      return next;
    });
  };

  const clearAdvanced = () => {
    setFilters((p) => ({ ...p, provider: "", status: "", siteId: "", locationId: "", search: "" }));
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await downloadSimExcel(filters);
      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const disposition = res.headers["content-disposition"];
      let filename = "cug_sims.xlsx";
      if (disposition?.includes("filename=")) filename = disposition.split("filename=")[1].replace(/"/g, "");
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
        .sim-table td, .sim-table th { white-space: nowrap; }
        .sim-table td { font-size: 11px; }
        .sim-row:hover { background: #f0f7ff !important; }
        .sim-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .sim-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .sim-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .sim-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#e8eeff 50%,#f1f5f9 75%); background-size:200% 100%; animation:sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ═══ TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5">

          {/* SIM # search */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              placeholder="SIM number..."
              value={filters.phoneNumber}
              onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-32 sm:w-40 transition"
            />
          </div>

          {/* Employee ID */}
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
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-24 sm:w-32 transition"
            />
          </div>

          {/* Include History toggle */}
          <label className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer transition select-none ${
            filters.includeHistorical
              ? "bg-amber-100 text-amber-700 border-amber-300"
              : "bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-amber-600"
          }`}>
            <input
              type="checkbox"
              checked={filters.includeHistorical}
              onChange={(e) => handleFilterChange("includeHistorical", e.target.checked)}
              className="w-3 h-3 accent-amber-500"
            />
            <span>History</span>
          </label>

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
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[300px] sm:w-[480px]">
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
                  {/* Provider */}
                  <select value={filters.provider} onChange={(e) => handleFilterChange("provider", e.target.value)} className={sel + " min-w-[90px]"}>
                    <option value="">Provider</option>
                    <option value="AIRTEL">Airtel</option>
                    <option value="VI">VI</option>
                    <option value="JIO">Jio</option>
                  </select>

                  {/* Status */}
                  <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)} className={sel + " min-w-[110px]"}>
                    <option value="">All Status</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="SUSPENDED">Suspended</option>
                    <option value="LOST">Lost</option>
                    <option value="DEACTIVATED">Deactivated</option>
                    <option value="REPLACED">Replaced</option>
                    <option value="UAP">UAP</option>
                  </select>

                  {/* Site */}
                  <select value={filters.siteId || ""} onChange={(e) => handleFilterChange("siteId", e.target.value || "")} className={sel + " min-w-[100px]"}>
                    <option value="">All Sites</option>
                    {sites.map(({ siteId, name }) => <option key={siteId} value={siteId}>{name}</option>)}
                  </select>

                  {/* Location */}
                  {locations.length > 0 && (
                    <select value={filters.locationId || ""} onChange={(e) => handleFilterChange("locationId", e.target.value || "")} className={sel + " min-w-[110px]"}>
                      <option value="">All Locations</option>
                      {locations.map((loc) => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                    </select>
                  )}

                  {/* Add SIM */}
          <button
            onClick={() => navigate("/cug-sim/add")}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md font-semibold transition shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>Add SIM</span>
          </button>

          {/* Download Excel */}
          <button
            onClick={handleDownloadExcel}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
              <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
            </svg>
            <span className="hidden sm:inline">Export</span>
          </button>

                  {/* General search */}
                  <div className="relative flex items-center flex-1 min-w-[140px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                      className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="General search..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                      className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-full transition"
                    />
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
            <span className="hidden sm:inline"> SIMs</span>
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

        {/* Historical mode banner */}
        {filters.includeHistorical && filters.employeeId && (
          <div className="px-3 py-1 bg-amber-50 border-t border-amber-200 flex items-center gap-1.5">
            <svg className="w-3 h-3 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] text-amber-800">
              History mode: showing all SIMs ever assigned to <strong>{filters.employeeId}</strong>
            </span>
          </div>
        )}
      </div>

      {/* ═══ TABLE ═══ */}
      <div className="flex-1 overflow-hidden">
        {/* Shimmer */}
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full sim-table" style={{ minWidth: 700 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Mobile Number","Provider","Site","Location","Assigned To","Status","Actions"].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="px-2.5 py-2">
                        <div className="shimmer h-2.5 rounded" style={{ width: `${45 + Math.random() * 45}%` }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty */}
        {!loading && sims.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-400">No SIM cards found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Try changing your filters.</p>
          </div>
        )}

        {/* Table */}
        {!loading && sims.length > 0 && (
          <div className="overflow-x-auto sim-scrollbar">
            <table className="w-full sim-table" style={{ minWidth: 700, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {["Mobile Number","Provider","Site","Location","Assigned To","Status","Actions"].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sims.map((sim, ri) => (
                  <tr
                    key={sim.id}
                    className="sim-row border-b border-gray-50 transition-colors"
                    style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
                  >
                    <td className="px-2.5 py-1.5">
                      <Link
                        to={`/cug-sim/${sim.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-[11px] hover:underline font-mono"
                      >
                        {sim.phoneNumber}
                      </Link>
                    </td>
                    <td className="px-2.5 py-1.5 text-gray-700">{sim.provider || <span className="text-gray-300">—</span>}</td>
                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[120px]">
                      <span className="truncate block">{sim.siteName || <span className="text-gray-300">—</span>}</span>
                    </td>
                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[120px]">
                      <span className="truncate block">{sim.locationName || <span className="text-gray-300">—</span>}</span>
                    </td>
                    <td className="px-2.5 py-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedUser(sim.assignedUserId); }}
                        className={`text-[11px] hover:underline truncate ${sim.assignedUserName ? "text-blue-600 hover:text-blue-800" : "text-gray-400 italic cursor-default"}`}
                      >
                        {sim.assignedUserName || "Unassigned"}
                      </button>
                    </td>
                    <td className="px-2.5 py-1.5">
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${STATUS_BADGE[sim.status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                        {sim.status}
                      </span>
                    </td>
                    <td className="px-2.5 py-1.5">
                      <Link
                        to={`/cug-sim/${sim.id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserDetailsModal query={selectedUser} isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}