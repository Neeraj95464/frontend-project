// // // // // // // pages/UsersPage.jsx

// // // // // // import UsersTable from "../components/UsersTable";
// // // // // // import { fetchUsers, downloadUsersExcel } from "../services/api";
// // // // // // import { Card, CardContent, Button, Input } from "@/components/ui";
// // // // // // import { useEffect, useState } from "react";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // const UsersPage = () => {
// // // // // //   const navigate = useNavigate();

// // // // // //   const [filters, setFilters] = useState({
// // // // // //     employeeId: "",
// // // // // //     username: "",
// // // // // //     role: "",
// // // // // //     department: "",
// // // // // //     siteId: "",
// // // // // //     locationId: "",
// // // // // //     search: "",
// // // // // //   });

// // // // // //   const [users, setUsers] = useState([]);
// // // // // //   const [page, setPage] = useState(0);
// // // // // //   const [size] = useState(10);
// // // // // //   const [paginationInfo, setPaginationInfo] = useState({
// // // // // //     totalElements: 0,
// // // // // //     totalPages: 0,
// // // // // //     last: false,
// // // // // //   });

// // // // // //   useEffect(() => {
// // // // // //     loadUsers(page);
// // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // //   }, [page]);

// // // // // //   const loadUsers = async (pageToLoad = 0) => {
// // // // // //     try {
// // // // // //       const res = await fetchUsers(filters, pageToLoad, size);

// // // // // //       const {
// // // // // //         content = [],
// // // // // //         page: pageNumber,
// // // // // //         size: pageSize,
// // // // // //         totalElements,
// // // // // //         totalPages,
// // // // // //         last,
// // // // // //       } = res || {};

// // // // // //       setUsers(content);
// // // // // //       setPaginationInfo({ totalElements, totalPages, last });
// // // // // //       setPage(pageNumber);
// // // // // //       // size comes from backend but we keep constant `size` state
// // // // // //     } catch (err) {
// // // // // //       console.error("Error loading users:", err);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleFilterChange = (key, value) => {
// // // // // //     setFilters((prev) => ({
// // // // // //       ...prev,
// // // // // //       [key]: value,
// // // // // //     }));
// // // // // //   };

// // // // // //   const applyFilters = () => {
// // // // // //     setPage(0);
// // // // // //     loadUsers(0);
// // // // // //   };

// // // // // //   const clearFilters = () => {
// // // // // //     setFilters({
// // // // // //       employeeId: "",
// // // // // //       username: "",
// // // // // //       role: "",
// // // // // //       department: "",
// // // // // //       siteId: "",
// // // // // //       locationId: "",
// // // // // //       search: "",
// // // // // //     });
// // // // // //     setPage(0);
// // // // // //     loadUsers(0);
// // // // // //   };

// // // // // //   const handleDownloadExcel = async () => {
// // // // // //     try {
// // // // // //       const res = await downloadUsersExcel(filters);

// // // // // //       const blob = new Blob([res.data], {
// // // // // //         type:
// // // // // //           res.headers["content-type"] ||
// // // // // //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // // // //       });

// // // // // //       const url = window.URL.createObjectURL(blob);
// // // // // //       const link = document.createElement("a");
// // // // // //       link.href = url;

// // // // // //       const disposition = res.headers["content-disposition"];
// // // // // //       let filename = "users.xlsx";
// // // // // //       if (disposition && disposition.includes("filename=")) {
// // // // // //         filename = disposition.split("filename=")[1].replace(/"/g, "");
// // // // // //       }
// // // // // //       link.download = filename;

// // // // // //       document.body.appendChild(link);
// // // // // //       link.click();
// // // // // //       link.remove();
// // // // // //       window.URL.revokeObjectURL(url);
// // // // // //     } catch (err) {
// // // // // //       console.error("Excel download failed:", err);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
// // // // // //   const handleSerialClick = (serialNumber) =>
// // // // // //     navigate(`/asset/${serialNumber}`);
// // // // // //   const handleAddEmployee = () => navigate(`/register`);

// // // // // //   return (
// // // // // //     <div className="lg:ml-40 pt-16 pr-8">
// // // // // //       <Card>
// // // // // //         <CardContent className="text-sm">
// // // // // //           {/* Header: Title + pagination + search / add / export */}
// // // // // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
// // // // // //             {/* Left: Title + pagination */}
// // // // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
// // // // // //               <h2 className="text-xl font-semibold">User List</h2>
// // // // // //               <div className="mt-2 sm:mt-0 flex items-center gap-2">
// // // // // //                 <button
// // // // // //                   onClick={() => {
// // // // // //                     const newPage = Math.max(page - 1, 0);
// // // // // //                     setPage(newPage);
// // // // // //                     loadUsers(newPage);
// // // // // //                   }}
// // // // // //                   disabled={page === 0}
// // // // // //                   className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
// // // // // //                 >
// // // // // //                   &lt;
// // // // // //                 </button>
// // // // // //                 <span className="text-xs text-gray-700">
// // // // // //                   <strong>{page + 1}</strong> of{" "}
// // // // // //                   <strong>{paginationInfo.totalPages}</strong> Total:{" "}
// // // // // //                   <strong>{paginationInfo.totalElements}</strong>
// // // // // //                 </span>
// // // // // //                 <button
// // // // // //                   onClick={() => {
// // // // // //                     const newPage =
// // // // // //                       page + 1 < paginationInfo.totalPages ? page + 1 : page;
// // // // // //                     setPage(newPage);
// // // // // //                     loadUsers(newPage);
// // // // // //                   }}
// // // // // //                   disabled={paginationInfo.last}
// // // // // //                   className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
// // // // // //                 >
// // // // // //                   &gt;
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Right: Search / Add / Excel */}
// // // // // //             <div className="flex flex-wrap gap-2 justify-end">
// // // // // //               <Input
// // // // // //                 type="text"
// // // // // //                 placeholder="Quick search..."
// // // // // //                 value={filters.search}
// // // // // //                 onChange={(e) => handleFilterChange("search", e.target.value)}
// // // // // //                 className="w-40 sm:w-52 text-xs"
// // // // // //               />
// // // // // //               <Button
// // // // // //                 onClick={applyFilters}
// // // // // //                 className="bg-green-600 text-xs px-3"
// // // // // //               >
// // // // // //                 Search
// // // // // //               </Button>
// // // // // //               <Button
// // // // // //                 onClick={clearFilters}
// // // // // //                 variant="outline"
// // // // // //                 className="text-xs px-3"
// // // // // //               >
// // // // // //                 Clear
// // // // // //               </Button>
// // // // // //               <Button
// // // // // //                 onClick={handleDownloadExcel}
// // // // // //                 className="bg-emerald-600 text-xs px-3 flex items-center gap-1"
// // // // // //               >
// // // // // //                 <svg
// // // // // //                   xmlns="http://www.w3.org/2000/svg"
// // // // // //                   className="h-3.5 w-3.5"
// // // // // //                   viewBox="0 0 20 20"
// // // // // //                   fill="currentColor"
// // // // // //                 >
// // // // // //                   <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
// // // // // //                   <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
// // // // // //                 </svg>
// // // // // //                 Excel
// // // // // //               </Button>
// // // // // //               <Button
// // // // // //                 onClick={handleAddEmployee}
// // // // // //                 className="bg-blue-600 text-xs px-3"
// // // // // //               >
// // // // // //                 Add Employee
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Filters row (optional detailed filters) */}
// // // // // //           <div className="bg-white p-2 mb-3 rounded border border-gray-100">
// // // // // //             <div className="flex flex-wrap gap-2 items-center">
// // // // // //               <Input
// // // // // //                 placeholder="EMP ID"
// // // // // //                 value={filters.employeeId}
// // // // // //                 onChange={(e) =>
// // // // // //                   handleFilterChange("employeeId", e.target.value)
// // // // // //                 }
// // // // // //                 className="w-24 text-xs"
// // // // // //               />
// // // // // //               <Input
// // // // // //                 placeholder="Username"
// // // // // //                 value={filters.username}
// // // // // //                 onChange={(e) => handleFilterChange("username", e.target.value)}
// // // // // //                 className="w-28 text-xs"
// // // // // //               />
// // // // // //               <Input
// // // // // //                 placeholder="Role"
// // // // // //                 value={filters.role}
// // // // // //                 onChange={(e) => handleFilterChange("role", e.target.value)}
// // // // // //                 className="w-24 text-xs"
// // // // // //               />
// // // // // //               <Input
// // // // // //                 placeholder="Department"
// // // // // //                 value={filters.department}
// // // // // //                 onChange={(e) =>
// // // // // //                   handleFilterChange("department", e.target.value)
// // // // // //                 }
// // // // // //                 className="w-28 text-xs"
// // // // // //               />
// // // // // //               {/* If you have site/location dropdowns, add them similarly here */}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Table */}
// // // // // //           <UsersTable
// // // // // //             users={users}
// // // // // //             onEdit={handleEdit}
// // // // // //             onSerialClick={handleSerialClick}
// // // // // //           />
// // // // // //         </CardContent>
// // // // // //       </Card>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default UsersPage;

// // // // // // pages/UsersPage.jsx

// // // // // import UsersTable from "../components/UsersTable";
// // // // // import { fetchUsers, downloadUsersExcel } from "../services/api";
// // // // // import { Card, CardContent, Button, Input } from "@/components/ui";
// // // // // import { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const UsersPage = () => {
// // // // //   const navigate = useNavigate();

// // // // //   const [filters, setFilters] = useState({
// // // // //     employeeId: "",
// // // // //     username: "",
// // // // //     role: "",
// // // // //     department: "",
// // // // //     siteId: "",
// // // // //     locationId: "",
// // // // //     search: "",
// // // // //   });

// // // // //   const [users, setUsers] = useState([]);
// // // // //   const [page, setPage] = useState(0);
// // // // //   const [size] = useState(10);
// // // // //   const [paginationInfo, setPaginationInfo] = useState({
// // // // //     totalElements: 0,
// // // // //     totalPages: 0,
// // // // //     last: false,
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     loadUsers(page);
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [page]);

// // // // //   const loadUsers = async (pageToLoad = 0) => {
// // // // //     try {
// // // // //       const res = await fetchUsers(filters, pageToLoad, size);

// // // // //       const {
// // // // //         content = [],
// // // // //         page: pageNumber,
// // // // //         size: pageSize,
// // // // //         totalElements,
// // // // //         totalPages,
// // // // //         last,
// // // // //       } = res || {};

// // // // //       setUsers(content);
// // // // //       setPaginationInfo({ totalElements, totalPages, last });
// // // // //       setPage(pageNumber);
// // // // //       // size comes from backend but we keep constant `size` state
// // // // //     } catch (err) {
// // // // //       console.error("Error loading users:", err);
// // // // //     }
// // // // //   };

// // // // //   const handleFilterChange = (key, value) => {
// // // // //     setFilters((prev) => ({
// // // // //       ...prev,
// // // // //       [key]: value,
// // // // //     }));
// // // // //   };

// // // // //   const applyFilters = () => {
// // // // //     setPage(0);
// // // // //     loadUsers(0);
// // // // //   };

// // // // //   const clearFilters = () => {
// // // // //     setFilters({
// // // // //       employeeId: "",
// // // // //       username: "",
// // // // //       role: "",
// // // // //       department: "",
// // // // //       siteId: "",
// // // // //       locationId: "",
// // // // //       search: "",
// // // // //     });
// // // // //     setPage(0);
// // // // //     loadUsers(0);
// // // // //   };

// // // // //   const handleDownloadExcel = async () => {
// // // // //     try {
// // // // //       const res = await downloadUsersExcel(filters);

// // // // //       const blob = new Blob([res.data], {
// // // // //         type:
// // // // //           res.headers["content-type"] ||
// // // // //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // // //       });

// // // // //       const url = window.URL.createObjectURL(blob);
// // // // //       const link = document.createElement("a");
// // // // //       link.href = url;

// // // // //       const disposition = res.headers["content-disposition"];
// // // // //       let filename = "users.xlsx";
// // // // //       if (disposition && disposition.includes("filename=")) {
// // // // //         filename = disposition.split("filename=")[1].replace(/"/g, "");
// // // // //       }
// // // // //       link.download = filename;

// // // // //       document.body.appendChild(link);
// // // // //       link.click();
// // // // //       link.remove();
// // // // //       window.URL.revokeObjectURL(url);
// // // // //     } catch (err) {
// // // // //       console.error("Excel download failed:", err);
// // // // //     }
// // // // //   };

// // // // //   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
// // // // //   const handleSerialClick = (serialNumber) =>
// // // // //     navigate(`/asset/${serialNumber}`);
// // // // //   const handleAddEmployee = () => navigate(`/register`);

// // // // //   return (
// // // // //     <div className="lg:ml-40 pt-16 pr-8">
// // // // //       <Card>
// // // // //         <CardContent className="text-sm">
// // // // //           {/* Header: Title + pagination + search / add / export */}
// // // // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
// // // // //             {/* Left: Title + pagination */}
// // // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
// // // // //               <h2 className="text-xl font-semibold">User List</h2>
// // // // //               <div className="mt-2 sm:mt-0 flex items-center gap-2">
// // // // //                 <button
// // // // //                   onClick={() => {
// // // // //                     const newPage = Math.max(page - 1, 0);
// // // // //                     setPage(newPage);
// // // // //                     loadUsers(newPage);
// // // // //                   }}
// // // // //                   disabled={page === 0}
// // // // //                   className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
// // // // //                 >
// // // // //                   &lt;
// // // // //                 </button>
// // // // //                 <span className="text-xs text-gray-700">
// // // // //                   <strong>{page + 1}</strong> of{" "}
// // // // //                   <strong>{paginationInfo.totalPages}</strong> Total:{" "}
// // // // //                   <strong>{paginationInfo.totalElements}</strong>
// // // // //                 </span>
// // // // //                 <button
// // // // //                   onClick={() => {
// // // // //                     const newPage =
// // // // //                       page + 1 < paginationInfo.totalPages ? page + 1 : page;
// // // // //                     setPage(newPage);
// // // // //                     loadUsers(newPage);
// // // // //                   }}
// // // // //                   disabled={paginationInfo.last}
// // // // //                   className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
// // // // //                 >
// // // // //                   &gt;
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Right: Search / Add / Excel */}
// // // // //             <div className="flex flex-wrap gap-2 justify-end">
// // // // //               <Input
// // // // //                 type="text"
// // // // //                 placeholder="Quick search..."
// // // // //                 value={filters.search}
// // // // //                 onChange={(e) => handleFilterChange("search", e.target.value)}
// // // // //                 className="w-40 sm:w-52 text-xs"
// // // // //               />
// // // // //               <Button
// // // // //                 onClick={applyFilters}
// // // // //                 className="bg-green-600 text-xs px-3"
// // // // //               >
// // // // //                 Search
// // // // //               </Button>
// // // // //               <Button
// // // // //                 onClick={clearFilters}
// // // // //                 variant="outline"
// // // // //                 className="text-xs px-3"
// // // // //               >
// // // // //                 Clear
// // // // //               </Button>
// // // // //               <Button
// // // // //                 onClick={handleDownloadExcel}
// // // // //                 className="bg-emerald-600 text-xs px-3 flex items-center gap-1"
// // // // //               >
// // // // //                 <svg
// // // // //                   xmlns="http://www.w3.org/2000/svg"
// // // // //                   className="h-3.5 w-3.5"
// // // // //                   viewBox="0 0 20 20"
// // // // //                   fill="currentColor"
// // // // //                 >
// // // // //                   <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
// // // // //                   <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
// // // // //                 </svg>
// // // // //                 Excel
// // // // //               </Button>
// // // // //               <Button
// // // // //                 onClick={handleAddEmployee}
// // // // //                 className="bg-blue-600 text-xs px-3"
// // // // //               >
// // // // //                 Add Employee
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Filters row (optional detailed filters) */}
// // // // //           <div className="bg-white p-2 mb-3 rounded border border-gray-100">
// // // // //             <div className="flex flex-wrap gap-2 items-center">
// // // // //               <Input
// // // // //                 placeholder="EMP ID"
// // // // //                 value={filters.employeeId}
// // // // //                 onChange={(e) =>
// // // // //                   handleFilterChange("employeeId", e.target.value)
// // // // //                 }
// // // // //                 className="w-24 text-xs"
// // // // //               />
// // // // //               <Input
// // // // //                 placeholder="Username"
// // // // //                 value={filters.username}
// // // // //                 onChange={(e) => handleFilterChange("username", e.target.value)}
// // // // //                 className="w-28 text-xs"
// // // // //               />
// // // // //               <Input
// // // // //                 placeholder="Role"
// // // // //                 value={filters.role}
// // // // //                 onChange={(e) => handleFilterChange("role", e.target.value)}
// // // // //                 className="w-24 text-xs"
// // // // //               />
// // // // //               <Input
// // // // //                 placeholder="Department"
// // // // //                 value={filters.department}
// // // // //                 onChange={(e) =>
// // // // //                   handleFilterChange("department", e.target.value)
// // // // //                 }
// // // // //                 className="w-28 text-xs"
// // // // //               />
// // // // //               {/* If you have site/location dropdowns, add them similarly here */}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Table */}
// // // // //           <UsersTable
// // // // //             users={users}
// // // // //             onEdit={handleEdit}
// // // // //             onSerialClick={handleSerialClick}
// // // // //           />
// // // // //         </CardContent>
// // // // //       </Card>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default UsersPage;

// // // // // pages/UsersPage.jsx

// // // // import UsersTable from "../components/UsersTable";
// // // // import {
// // // //   fetchUsers,
// // // //   downloadUsersExcel,
// // // //   fetchSites,
// // // //   getLocationsBySite,
// // // // } from "../services/api";
// // // // import { Card, CardContent, Button, Input } from "@/components/ui";
// // // // import { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";

// // // // const UsersPage = () => {
// // // //   const navigate = useNavigate();

// // // //   const [filters, setFilters] = useState({
// // // //     employeeId: "",
// // // //     username: "",
// // // //     role: "",
// // // //     department: "",
// // // //     siteId: "",
// // // //     locationId: "",
// // // //     search: "",
// // // //   });

// // // //   const [users, setUsers] = useState([]);
// // // //   const [page, setPage] = useState(0);
// // // //   const [size] = useState(10);
// // // //   const [paginationInfo, setPaginationInfo] = useState({
// // // //     totalElements: 0,
// // // //     totalPages: 0,
// // // //     last: false,
// // // //   });

// // // //   // dropdown data
// // // //   const [sites, setSites] = useState([]);
// // // //   const [locations, setLocations] = useState([]);

// // // //   // load sites on mount
// // // //   useEffect(() => {
// // // //     const loadSites = async () => {
// // // //       try {
// // // //         const res = await fetchSites(); // same pattern you use in SIM list
// // // //         const formatted = res.data.map((site) => ({
// // // //           id: site.id,
// // // //           name: site.name,
// // // //         }));
// // // //         setSites(formatted);
// // // //       } catch (e) {
// // // //         console.error("Failed to fetch sites", e);
// // // //       }
// // // //     };
// // // //     loadSites();
// // // //   }, []);

// // // //   // load locations when site changes
// // // //   useEffect(() => {
// // // //     const loadLocations = async () => {
// // // //       if (!filters.siteId) {
// // // //         setLocations([]);
// // // //         return;
// // // //       }
// // // //       try {
// // // //         const res = await getLocationsBySite(filters.siteId);
// // // //         setLocations(res || []);
// // // //       } catch (e) {
// // // //         console.error("Failed to fetch locations", e);
// // // //       }
// // // //     };
// // // //     loadLocations();
// // // //   }, [filters.siteId]);

// // // //   // load users when page changes
// // // //   useEffect(() => {
// // // //     loadUsers(page);
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [page]);

// // // //   const loadUsers = async (pageToLoad = 0) => {
// // // //     try {
// // // //       const res = await fetchUsers(filters, pageToLoad, size);

// // // //       const {
// // // //         content = [],
// // // //         page: pageNumber,
// // // //         size: pageSize,
// // // //         totalElements,
// // // //         totalPages,
// // // //         last,
// // // //       } = res || {};

// // // //       setUsers(content);
// // // //       setPaginationInfo({ totalElements, totalPages, last });
// // // //       setPage(pageNumber);
// // // //       // pageSize from backend not strictly needed here
// // // //     } catch (err) {
// // // //       console.error("Error loading users:", err);
// // // //     }
// // // //   };

// // // //   const handleFilterChange = (key, value) => {
// // // //     setFilters((prev) => {
// // // //       const newFilters = { ...prev, [key]: value };

// // // //       // reset location if site changes
// // // //       if (key === "siteId") {
// // // //         newFilters.locationId = "";
// // // //         setLocations([]);
// // // //       }

// // // //       return newFilters;
// // // //     });
// // // //   };

// // // //   const applyFilters = () => {
// // // //     setPage(0);
// // // //     loadUsers(0);
// // // //   };

// // // //   const clearFilters = () => {
// // // //     setFilters({
// // // //       employeeId: "",
// // // //       username: "",
// // // //       role: "",
// // // //       department: "",
// // // //       siteId: "",
// // // //       locationId: "",
// // // //       search: "",
// // // //     });
// // // //     setLocations([]);
// // // //     setPage(0);
// // // //     loadUsers(0);
// // // //   };

// // // //   const handleDownloadExcel = async () => {
// // // //     try {
// // // //       const res = await downloadUsersExcel(filters);

// // // //       const blob = new Blob([res.data], {
// // // //         type:
// // // //           res.headers["content-type"] ||
// // // //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // //       });

// // // //       const url = window.URL.createObjectURL(blob);
// // // //       const link = document.createElement("a");
// // // //       link.href = url;

// // // //       const disposition = res.headers["content-disposition"];
// // // //       let filename = "users.xlsx";
// // // //       if (disposition && disposition.includes("filename=")) {
// // // //         filename = disposition.split("filename=")[1].replace(/"/g, "");
// // // //       }
// // // //       link.download = filename;

// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       link.remove();
// // // //       window.URL.revokeObjectURL(url);
// // // //     } catch (err) {
// // // //       console.error("Excel download failed:", err);
// // // //     }
// // // //   };

// // // //   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
// // // //   const handleSerialClick = (serialNumber) =>
// // // //     navigate(`/asset/${serialNumber}`);
// // // //   const handleAddEmployee = () => navigate(`/register`);

// // // //   return (
// // // //     <div className="lg:ml-40 pt-16 pr-8">
// // // //       <Card>
// // // //         <CardContent className="text-sm">
// // // //           {/* Header: title + pagination + quick search / add / export */}
// // // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
// // // //             {/* Left: title + pagination */}
// // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
// // // //               <h2 className="text-xl font-semibold">User List</h2>
// // // //               <div className="mt-2 sm:mt-0 flex items-center gap-2">
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     const newPage = Math.max(page - 1, 0);
// // // //                     setPage(newPage);
// // // //                     loadUsers(newPage);
// // // //                   }}
// // // //                   disabled={page === 0}
// // // //                   className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
// // // //                 >
// // // //                   &lt;
// // // //                 </button>
// // // //                 <span className="text-xs text-gray-700">
// // // //                   <strong>{page + 1}</strong> of{" "}
// // // //                   <strong>{paginationInfo.totalPages}</strong> Total:{" "}
// // // //                   <strong>{paginationInfo.totalElements}</strong>
// // // //                 </span>
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     const newPage =
// // // //                       page + 1 < paginationInfo.totalPages ? page + 1 : page;
// // // //                     setPage(newPage);
// // // //                     loadUsers(newPage);
// // // //                   }}
// // // //                   disabled={paginationInfo.last}
// // // //                   className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
// // // //                 >
// // // //                   &gt;
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* Right: quick search / clear / excel / add */}
// // // //             <div className="flex flex-wrap gap-2 justify-end">
// // // //               <Input
// // // //                 type="text"
// // // //                 placeholder="Quick search..."
// // // //                 value={filters.search}
// // // //                 onChange={(e) => handleFilterChange("search", e.target.value)}
// // // //                 className="w-40 sm:w-52 text-xs"
// // // //               />
// // // //               <Button
// // // //                 onClick={applyFilters}
// // // //                 className="bg-green-600 text-xs px-3"
// // // //               >
// // // //                 Search
// // // //               </Button>
// // // //               <Button
// // // //                 onClick={clearFilters}
// // // //                 variant="outline"
// // // //                 className="text-xs px-3"
// // // //               >
// // // //                 Clear
// // // //               </Button>
// // // //               <Button
// // // //                 onClick={handleDownloadExcel}
// // // //                 className="bg-emerald-600 text-xs px-3 flex items-center gap-1"
// // // //               >
// // // //                 <svg
// // // //                   xmlns="http://www.w3.org/2000/svg"
// // // //                   className="h-3.5 w-3.5"
// // // //                   viewBox="0 0 20 20"
// // // //                   fill="currentColor"
// // // //                 >
// // // //                   <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
// // // //                   <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
// // // //                 </svg>
// // // //                 Excel
// // // //               </Button>
// // // //               <Button
// // // //                 onClick={handleAddEmployee}
// // // //                 className="bg-blue-600 text-xs px-3"
// // // //               >
// // // //                 Add Employee
// // // //               </Button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Filter row – single line with all filters */}
// // // //           <div className="bg-white p-2 mb-3 rounded border border-gray-100">
// // // //             <div className="flex flex-wrap gap-2 items-center">
// // // //               <Input
// // // //                 placeholder="EMP ID"
// // // //                 value={filters.employeeId}
// // // //                 onChange={(e) =>
// // // //                   handleFilterChange("employeeId", e.target.value)
// // // //                 }
// // // //                 className="w-24 text-xs"
// // // //               />
// // // //               <Input
// // // //                 placeholder="Username"
// // // //                 value={filters.username}
// // // //                 onChange={(e) => handleFilterChange("username", e.target.value)}
// // // //                 className="w-28 text-xs"
// // // //               />
// // // //               <Input
// // // //                 placeholder="Role"
// // // //                 value={filters.role}
// // // //                 onChange={(e) => handleFilterChange("role", e.target.value)}
// // // //                 className="w-24 text-xs"
// // // //               />
// // // //               {/* Department: if you have fixed enum values, you can make this a select */}
// // // //               <Input
// // // //                 placeholder="Department"
// // // //                 value={filters.department}
// // // //                 onChange={(e) =>
// // // //                   handleFilterChange("department", e.target.value)
// // // //                 }
// // // //                 className="w-28 text-xs"
// // // //               />
// // // //               {/* Site dropdown */}
// // // //               <select
// // // //                 value={filters.siteId || ""}
// // // //                 onChange={(e) =>
// // // //                   handleFilterChange("siteId", e.target.value || "")
// // // //                 }
// // // //                 className="w-32 text-xs border border-gray-200 rounded px-2 py-1 bg-white"
// // // //               >
// // // //                 <option value="">Site</option>
// // // //                 {sites.map((site) => (
// // // //                   <option key={site.id} value={site.id}>
// // // //                     {site.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //               {/* Location dropdown */}
// // // //               <select
// // // //                 value={filters.locationId || ""}
// // // //                 onChange={(e) =>
// // // //                   handleFilterChange("locationId", e.target.value || "")
// // // //                 }
// // // //                 disabled={!filters.siteId}
// // // //                 className="w-32 text-xs border border-gray-200 rounded px-2 py-1 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
// // // //               >
// // // //                 <option value="">Location</option>
// // // //                 {locations.map((loc) => (
// // // //                   <option key={loc.id} value={loc.id}>
// // // //                     {loc.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
// // // //           </div>

// // // //           {/* Table */}
// // // //           <UsersTable
// // // //             users={users}
// // // //             onEdit={handleEdit}
// // // //             onSerialClick={handleSerialClick}
// // // //           />
// // // //         </CardContent>
// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UsersPage;

// // // // pages/UsersPage.jsx

// // // import UsersTable from "../components/UsersTable";
// // // import {
// // //   fetchUsers,
// // //   downloadUsersExcel,
// // //   fetchSites,
// // //   getLocationsBySite,
// // // } from "../services/api";
// // // import { Card, CardContent } from "@/components/ui";
// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const UsersPage = () => {
// // //   const navigate = useNavigate();

// // //   const [filters, setFilters] = useState({
// // //     employeeId: "",
// // //     username: "",
// // //     role: "",
// // //     department: "",
// // //     siteId: "",
// // //     locationId: "",
// // //     search: "",
// // //   });

// // //   const [users, setUsers] = useState([]);
// // //   const [page, setPage] = useState(0);
// // //   const [size] = useState(10);
// // //   const [totalPages, setTotalPages] = useState(0);
// // //   const [totalElements, setTotalElements] = useState(0);
// // //   const [sites, setSites] = useState([]);
// // //   const [locations, setLocations] = useState([]);

// // //   const loadData = async (pageToLoad = page) => {
// // //     try {
// // //       const res = await fetchUsers(filters, pageToLoad, size);
// // //       setUsers(res.content || []);
// // //       setTotalPages(res.totalPages || 0);
// // //       setTotalElements(res.totalElements || 0);
// // //       setPage(res.page ?? pageToLoad);
// // //     } catch (err) {
// // //       console.error("Error loading users", err);
// // //     }
// // //   };

// // //   // load sites once
// // //   useEffect(() => {
// // //     fetchSites()
// // //       .then((res) => {
// // //         const formatted = res.data.map((site) => ({
// // //           siteId: site.id,
// // //           name: site.name,
// // //         }));
// // //         setSites(formatted);
// // //       })
// // //       .catch((err) => console.error("Failed to fetch sites", err));
// // //   }, []);

// // //   // load locations when site changes
// // //   useEffect(() => {
// // //     if (filters.siteId) {
// // //       getLocationsBySite(filters.siteId)
// // //         .then((locs) => setLocations(locs))
// // //         .catch((err) => console.error("Failed to fetch locations", err));
// // //     } else {
// // //       setLocations([]);
// // //       setFilters((prev) => ({ ...prev, locationId: "" }));
// // //     }
// // //   }, [filters.siteId]);

// // //   // debounce filter changes (no button)
// // //   useEffect(() => {
// // //     const delay = setTimeout(() => {
// // //       setPage(0);
// // //       loadData(0);
// // //     }, 400);
// // //     return () => clearTimeout(delay);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [
// // //     filters.employeeId,
// // //     filters.username,
// // //     filters.role,
// // //     filters.department,
// // //     filters.search,
// // //     filters.siteId,
// // //     filters.locationId,
// // //   ]);

// // //   // reload when page changes
// // //   useEffect(() => {
// // //     loadData(page);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [page]);

// // //   const handleFilterChange = (key, value) => {
// // //     setFilters((prev) => {
// // //       const newFilters = { ...prev, [key]: value };

// // //       if (key === "siteId") {
// // //         newFilters.locationId = "";
// // //         setLocations([]);
// // //       }

// // //       return newFilters;
// // //     });
// // //     setPage(0);
// // //   };

// // //   const handleDownloadExcel = async () => {
// // //     try {
// // //       const res = await downloadUsersExcel(filters);

// // //       const blob = new Blob([res.data], {
// // //         type:
// // //           res.headers["content-type"] ||
// // //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //       });

// // //       const url = window.URL.createObjectURL(blob);
// // //       const link = document.createElement("a");
// // //       link.href = url;

// // //       const disposition = res.headers["content-disposition"];
// // //       let filename = "users.xlsx";
// // //       if (disposition && disposition.includes("filename=")) {
// // //         filename = disposition.split("filename=")[1].replace(/"/g, "");
// // //       }
// // //       link.download = filename;

// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.remove();
// // //       window.URL.revokeObjectURL(url);
// // //     } catch (err) {
// // //       console.error("Failed to download Excel", err);
// // //     }
// // //   };

// // //   const handleAddEmployee = () => navigate("/register");
// // //   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
// // //   const handleSerialClick = (serialNumber) =>
// // //     navigate(`/asset/${serialNumber}`);

// // //   return (
// // //     <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
// // //       {/* Header */}
// // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// // //         <div>
// // //           <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
// // //             <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-5 w-5"
// // //                 fill="none"
// // //                 viewBox="0 0 24 24"
// // //                 stroke="currentColor"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M5.5 5.5A3.5 3.5 0 019 2h6a3.5 3.5 0 013.5 3.5V8A4.5 4.5 0 0114 12.5H10A4.5 4.5 0 015.5 8V5.5zM10 13h4a5 5 0 015 5v1.5A2.5 2.5 0 0116.5 22h-9A2.5 2.5 0 015 19.5V18a5 5 0 015-5z"
// // //                 />
// // //               </svg>
// // //             </span>
// // //             Users
// // //           </h1>
// // //           <p className="text-gray-500 text-sm mt-1">Manage all employees</p>
// // //         </div>
// // //         <button
// // //           onClick={handleAddEmployee}
// // //           className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2 text-sm"
// // //         >
// // //           <svg
// // //             xmlns="http://www.w3.org/2000/svg"
// // //             className="h-4 w-4"
// // //             fill="none"
// // //             viewBox="0 0 24 24"
// // //             stroke="currentColor"
// // //           >
// // //             <path
// // //               strokeLinecap="round"
// // //               strokeLinejoin="round"
// // //               strokeWidth={2}
// // //               d="M12 4v16m8-8H4"
// // //             />
// // //           </svg>
// // //           Add Employee
// // //         </button>
// // //       </div>

// // //       {/* Filter bar (single line, like SIM) */}
// // //       <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mb-4">
// // //         <div className="flex flex-wrap items-center gap-2">
// // //           {/* EMP ID */}
// // //           <input
// // //             placeholder="EMP ID"
// // //             value={filters.employeeId}
// // //             onChange={(e) => handleFilterChange("employeeId", e.target.value)}
// // //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// // //           />

// // //           {/* Username */}
// // //           <input
// // //             placeholder="Username"
// // //             value={filters.username}
// // //             onChange={(e) => handleFilterChange("username", e.target.value)}
// // //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// // //           />

// // //           {/* Role */}
// // //           <input
// // //             placeholder="Role"
// // //             value={filters.role}
// // //             onChange={(e) => handleFilterChange("role", e.target.value)}
// // //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// // //           />

// // //           {/* Department */}
// // //           <input
// // //             placeholder="Department"
// // //             value={filters.department}
// // //             onChange={(e) => handleFilterChange("department", e.target.value)}
// // //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// // //           />

// // //           {/* Site */}
// // //           <select
// // //             value={filters.siteId || ""}
// // //             onChange={(e) =>
// // //               handleFilterChange("siteId", e.target.value || null)
// // //             }
// // //             className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
// // //           >
// // //             <option value="">Site</option>
// // //             {sites.map(({ siteId, name }) => (
// // //               <option key={siteId} value={siteId}>
// // //                 {name}
// // //               </option>
// // //             ))}
// // //           </select>

// // //           {/* Location */}
// // //           <select
// // //             value={filters.locationId || ""}
// // //             onChange={(e) =>
// // //               handleFilterChange("locationId", e.target.value || null)
// // //             }
// // //             disabled={!filters.siteId}
// // //             className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
// // //           >
// // //             <option value="">Location</option>
// // //             {locations.map((loc) => (
// // //               <option key={loc.id} value={loc.id}>
// // //                 {loc.name}
// // //               </option>
// // //             ))}
// // //           </select>

// // //           {/* Search */}
// // //           <div className="relative flex-1 min-w-[120px] max-w-[180px]">
// // //             <svg
// // //               xmlns="http://www.w3.org/2000/svg"
// // //               className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
// // //               fill="none"
// // //               viewBox="0 0 24 24"
// // //               stroke="currentColor"
// // //             >
// // //               <path
// // //                 strokeLinecap="round"
// // //                 strokeLinejoin="round"
// // //                 strokeWidth={2}
// // //                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// // //               />
// // //             </svg>
// // //             <input
// // //               placeholder="Search"
// // //               value={filters.search}
// // //               onChange={(e) => handleFilterChange("search", e.target.value)}
// // //               className="w-full border border-gray-200 pl-7 pr-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// // //             />
// // //           </div>

// // //           {/* Right side: Excel + pagination */}
// // //           <div className="flex items-center gap-2 ml-auto">
// // //             {/* Excel */}
// // //             <button
// // //               type="button"
// // //               onClick={handleDownloadExcel}
// // //               className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm"
// // //             >
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-3.5 w-3.5"
// // //                 viewBox="0 0 20 20"
// // //                 fill="currentColor"
// // //               >
// // //                 <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
// // //                 <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
// // //               </svg>
// // //               <span className="hidden sm:inline">Excel</span>
// // //             </button>

// // //             {/* Pagination */}
// // //             {totalPages > 0 && (
// // //               <div className="flex items-center gap-1">
// // //                 <button
// // //                   disabled={page === 0}
// // //                   onClick={() => setPage((p) => p - 1)}
// // //                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
// // //                 >
// // //                   ←
// // //                 </button>
// // //                 <span className="px-2 py-1 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
// // //                   {page + 1}/{totalPages} ({totalElements})
// // //                 </span>
// // //                 <button
// // //                   disabled={page + 1 >= totalPages}
// // //                   onClick={() => setPage((p) => p + 1)}
// // //                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
// // //                 >
// // //                   →
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Table */}
// // //       <Card>
// // //         <CardContent className="text-sm">
// // //           <UsersTable
// // //             users={users}
// // //             onEdit={handleEdit}
// // //             onSerialClick={handleSerialClick}
// // //           />
// // //         </CardContent>
// // //       </Card>
// // //     </div>
// // //   );
// // // };

// // // export default UsersPage;

// // // pages/UsersPage.jsx

// // import UsersTable from "../components/UsersTable";
// // import {
// //   fetchUsers,
// //   downloadUsersExcel,
// //   fetchSites,
// //   getLocationsBySite,
// // } from "../services/api";
// // import { Card, CardContent } from "@/components/ui";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const UsersPage = () => {
// //   const navigate = useNavigate();

// //   const [filters, setFilters] = useState({
// //     employeeId: "",
// //     username: "",
// //     role: "",
// //     department: "",
// //     siteId: "",
// //     locationId: "",
// //   });

// //   const [users, setUsers] = useState([]);
// //   const [page, setPage] = useState(0);
// //   const [size] = useState(10);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [totalElements, setTotalElements] = useState(0);
// //   const [sites, setSites] = useState([]);
// //   const [locations, setLocations] = useState([]);

// //   const loadData = async (pageToLoad = page) => {
// //     try {
// //       const res = await fetchUsers(filters, pageToLoad, size);
// //       setUsers(res.content || []);
// //       setTotalPages(res.totalPages || 0);
// //       setTotalElements(res.totalElements || 0);
// //       setPage(res.page ?? pageToLoad);
// //     } catch (err) {
// //       console.error("Error loading users", err);
// //     }
// //   };

// //   // load sites once
// //   useEffect(() => {
// //     fetchSites()
// //       .then((res) => {
// //         const formatted = res.data.map((site) => ({
// //           siteId: site.id,
// //           name: site.name,
// //         }));
// //         setSites(formatted);
// //       })
// //       .catch((err) => console.error("Failed to fetch sites", err));
// //   }, []);

// //   // load locations when site changes
// //   useEffect(() => {
// //     if (filters.siteId) {
// //       getLocationsBySite(filters.siteId)
// //         .then((locs) => setLocations(locs))
// //         .catch((err) => console.error("Failed to fetch locations", err));
// //     } else {
// //       setLocations([]);
// //       setFilters((prev) => ({ ...prev, locationId: "" }));
// //     }
// //   }, [filters.siteId]);

// //   // debounce filter changes (no buttons)
// //   useEffect(() => {
// //     const delay = setTimeout(() => {
// //       setPage(0);
// //       loadData(0);
// //     }, 400);
// //     return () => clearTimeout(delay);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [
// //     filters.employeeId,
// //     filters.username,
// //     filters.role,
// //     filters.department,
// //     filters.siteId,
// //     filters.locationId,
// //   ]);

// //   // reload when page changes
// //   useEffect(() => {
// //     loadData(page);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page]);

// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => {
// //       const newFilters = { ...prev, [key]: value };

// //       if (key === "siteId") {
// //         newFilters.locationId = "";
// //         setLocations([]);
// //       }

// //       return newFilters;
// //     });
// //     setPage(0);
// //   };

// //   const handleDownloadExcel = async () => {
// //     try {
// //       const res = await downloadUsersExcel(filters);

// //       const blob = new Blob([res.data], {
// //         type:
// //           res.headers["content-type"] ||
// //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       });

// //       const url = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;

// //       const disposition = res.headers["content-disposition"];
// //       let filename = "users.xlsx";
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

// //   const handleAddEmployee = () => navigate("/register");
// //   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
// //   const handleSerialClick = (serialNumber) =>
// //     navigate(`/asset/${serialNumber}`);

// //   return (
// //     <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-4 min-h-screen bg-gray-50 flex flex-col">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
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
// //                   d="M5.5 5.5A3.5 3.5 0 019 2h6a3.5 3.5 0 013.5 3.5V8A4.5 4.5 0 0114 12.5H10A4.5 4.5 0 015.5 8V5.5zM10 13h4a5 5 0 015 5v1.5A2.5 2.5 0 0116.5 22h-9A2.5 2.5 0 015 19.5V18a5 5 0 015-5z"
// //                 />
// //               </svg>
// //             </span>
// //             Users
// //           </h1>
// //           <p className="text-gray-500 text-sm mt-1">Manage all employees</p>
// //         </div>
// //         <button
// //           onClick={handleAddEmployee}
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
// //           Add Employee
// //         </button>
// //       </div>

// //       {/* Filter bar: one line, no search box */}
// //       <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mb-3">
// //         <div className="flex flex-wrap items-center gap-2">
// //           {/* EMP ID */}
// //           <input
// //             placeholder="EMP ID"
// //             value={filters.employeeId}
// //             onChange={(e) => handleFilterChange("employeeId", e.target.value)}
// //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// //           />

// //           {/* Username */}
// //           <input
// //             placeholder="Username"
// //             value={filters.username}
// //             onChange={(e) => handleFilterChange("username", e.target.value)}
// //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// //           />

// //           {/* Role */}
// //           <input
// //             placeholder="Role"
// //             value={filters.role}
// //             onChange={(e) => handleFilterChange("role", e.target.value)}
// //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
// //           />

// //           {/* Department */}
// //           <input
// //             placeholder="Department"
// //             value={filters.department}
// //             onChange={(e) => handleFilterChange("department", e.target.value)}
// //             className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
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

// //           {/* Right: Excel + pagination */}
// //           <div className="flex items-center gap-2 ml-auto">
// //             {/* Excel */}
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
// //                   onClick={() => setPage((p) => p - 1)}
// //                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
// //                 >
// //                   ←
// //                 </button>
// //                 <span className="px-2 py-1 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
// //                   {page + 1}/{totalPages} ({totalElements})
// //                 </span>
// //                 <button
// //                   disabled={page + 1 >= totalPages}
// //                   onClick={() => setPage((p) => p + 1)}
// //                   className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
// //                 >
// //                   →
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Content area: fixed height scroll */}
// //       <div className="flex-1 min-h-0">
// //         <Card className="h-full flex flex-col">
// //           <CardContent className="p-0 h-full flex flex-col">
// //             <div className="flex-1 min-h-0 overflow-auto">
// //               <UsersTable
// //                 users={users}
// //                 onEdit={handleEdit}
// //                 onSerialClick={handleSerialClick}
// //               />
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UsersPage;

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
//     <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-4 min-h-screen bg-gray-50 flex flex-col">
//       <div className="flex items-center justify-between gap-2 mb-2">
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
//         <div className="flex items-center gap-1">
//           <button
//             type="button"
//             onClick={handleDownloadExcel}
//             className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm flex items-center gap-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-3 w-3"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
//               <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
//             </svg>
//             Excel
//           </button>
//           {totalPages > 0 && (
//             <div className="flex items-center gap-1">
//               <button
//                 disabled={page === 0}
//                 onClick={() => setPage((p) => p - 1)}
//                 className="px-1.5 py-1 text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 ←
//               </button>
//               <span className="px-1.5 py-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
//                 {page + 1}/{totalPages} ({totalElements})
//               </span>
//               <button
//                 disabled={page + 1 >= totalPages}
//                 onClick={() => setPage((p) => p + 1)}
//                 className="px-1.5 py-1 text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 →
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-100 mb-2">
//         <div className="flex flex-wrap items-center gap-1">
//           <input
//             placeholder="EMP ID"
//             value={filters.employeeId}
//             onChange={(e) => handleFilterChange("employeeId", e.target.value)}
//             className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           <input
//             placeholder="Username"
//             value={filters.username}
//             onChange={(e) => handleFilterChange("username", e.target.value)}
//             className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           <input
//             placeholder="Role"
//             value={filters.role}
//             onChange={(e) => handleFilterChange("role", e.target.value)}
//             className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           <input
//             placeholder="Department"
//             value={filters.department}
//             onChange={(e) => handleFilterChange("department", e.target.value)}
//             className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           <select
//             value={filters.siteId || ""}
//             onChange={(e) =>
//               handleFilterChange("siteId", e.target.value || null)
//             }
//             className="w-24 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
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
//             className="w-24 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
//           >
//             <option value="">Location</option>
//             {locations.map((loc) => (
//               <option key={loc.id} value={loc.id}>
//                 {loc.name}
//               </option>
//             ))}
//           </select>
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
import {
  fetchUsers,
  downloadUsersExcel,
  fetchSites,
  getLocationsBySite,
} from "../services/api";
import { Card, CardContent } from "@/components/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    employeeId: "",
    username: "",
    role: "",
    department: "",
    siteId: "",
    locationId: "",
    search: "",
  });
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const loadData = async (pageToLoad = page) => {
    try {
      const res = await fetchUsers(filters, pageToLoad, size);
      setUsers(res.content || []);
      setTotalPages(res.totalPages || 0);
      setTotalElements(res.totalElements || 0);
      setPage(res.page ?? pageToLoad);
    } catch (err) {
      console.error("Error loading users", err);
    }
  };
  useEffect(() => {
    fetchSites()
      .then((res) => {
        const formatted = res.data.map((site) => ({
          siteId: site.id,
          name: site.name,
        }));
        setSites(formatted);
      })
      .catch((err) => console.error("Failed to fetch sites", err));
  }, []);
  useEffect(() => {
    if (filters.siteId) {
      getLocationsBySite(filters.siteId)
        .then((locs) => setLocations(locs))
        .catch((err) => console.error("Failed to fetch locations", err));
    } else {
      setLocations([]);
      setFilters((prev) => ({ ...prev, locationId: "" }));
    }
  }, [filters.siteId]);
  //   useEffect(() => {
  //     const delay = setTimeout(() => {
  //       setPage(0);
  //       loadData(0);
  //     }, 400);
  //     return () => clearTimeout(delay);
  //   }, [
  //     filters.employeeId,
  //     filters.username,
  //     filters.role,
  //     filters.department,
  //     filters.siteId,
  //     filters.locationId,
  //   ]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(0);
      loadData(0);
    }, 400);
    return () => clearTimeout(delay);
  }, [
    filters.search,
    filters.employeeId,
    filters.username,
    filters.role,
    filters.department,
    filters.siteId,
    filters.locationId,
  ]);

  useEffect(() => {
    loadData(page);
  }, [page]);
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (key === "siteId") {
        newFilters.locationId = "";
        setLocations([]);
      }
      return newFilters;
    });
    setPage(0);
  };
  const handleDownloadExcel = async () => {
    try {
      const res = await downloadUsersExcel(filters);
      const blob = new Blob([res.data], {
        type:
          res.headers["content-type"] ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const disposition = res.headers["content-disposition"];
      let filename = "users.xlsx";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      }
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download Excel", err);
    }
  };
  const handleAddEmployee = () => navigate("/register");
  const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
  const handleSerialClick = (serialNumber) =>
    navigate(`/asset/${serialNumber}`);
  return (
    <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-4 min-h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={handleAddEmployee}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded font-medium text-xs shadow-md flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Employee
        </button>
        <button
          type="button"
          onClick={handleDownloadExcel}
          className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
            <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
          </svg>
          Excel
        </button>
        {totalPages > 0 && (
          <div className="flex items-center gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-1.5 py-1 text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ←
            </button>
            <span className="px-1.5 py-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
              {page + 1}/{totalPages} ({totalElements})
            </span>
            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-1.5 py-1 text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              →
            </button>
          </div>
        )}
      </div>
      {/* <div className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-100 mb-2">
        <div className="flex flex-wrap items-center gap-1">
          <input
            placeholder="EMP ID"
            value={filters.employeeId}
            onChange={(e) => handleFilterChange("employeeId", e.target.value)}
            className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <input
            placeholder="Username"
            value={filters.username}
            onChange={(e) => handleFilterChange("username", e.target.value)}
            className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <input
            placeholder="Role"
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
            className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <input
            placeholder="Department"
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            className="w-20 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <select
            value={filters.siteId || ""}
            onChange={(e) =>
              handleFilterChange("siteId", e.target.value || null)
            }
            className="w-24 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Site</option>
            {sites.map(({ siteId, name }) => (
              <option key={siteId} value={siteId}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={filters.locationId || ""}
            onChange={(e) =>
              handleFilterChange("locationId", e.target.value || null)
            }
            disabled={!filters.siteId}
            className="w-24 border border-gray-200 px-1.5 py-0.5 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            placeholder="EMP ID"
            value={filters.employeeId}
            onChange={(e) => handleFilterChange("employeeId", e.target.value)}
            className="w-28 border border-gray-200 px-3 py-1.5 rounded text-sm
        focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />

          <input
            placeholder="Username"
            value={filters.username}
            onChange={(e) => handleFilterChange("username", e.target.value)}
            className="w-32 border border-gray-200 px-3 py-1.5 rounded text-sm
        focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />

          <input
            placeholder="Role"
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
            className="w-28 border border-gray-200 px-3 py-1.5 rounded text-sm
        focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />

          <input
            placeholder="Department"
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            className="w-36 border border-gray-200 px-3 py-1.5 rounded text-sm
        focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />

          <select
            value={filters.siteId || ""}
            onChange={(e) =>
              handleFilterChange("siteId", e.target.value || null)
            }
            className="w-32 border border-gray-200 px-3 py-1.5 rounded text-sm
        focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Site</option>
            {sites.map(({ siteId, name }) => (
              <option key={siteId} value={siteId}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={filters.locationId || ""}
            onChange={(e) =>
              handleFilterChange("locationId", e.target.value || null)
            }
            disabled={!filters.siteId}
            className="w-36 border border-gray-200 px-3 py-1.5 rounded text-sm
        focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none
        bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          {/* 🔍 Global Search */}
          <input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-40 border border-gray-200 px-3 py-1.5 rounded text-sm
        focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Card className="h-full flex flex-col">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-1 min-h-0 overflow-auto">
              <UsersTable
                users={users}
                onEdit={handleEdit}
                onSerialClick={handleSerialClick}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default UsersPage;
