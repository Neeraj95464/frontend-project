// import UserDetailsModal from "../components/UserDetailsModal";
// import {
//   addMessageToTicket,
//   hasRole,
//   updateTicketStatus,
//   getAssignees,
//   fetchSites,
//   fetchFilteredTickets,
//   downloadFilteredTickets,
//   getLocationsBySite,
// } from "../services/api";
// import TicketActionModal from "./TicketActionModal";
// import TicketAttachmentButton from "./TicketAttachmentButton";
// import TicketModal from "./TicketFormModal";
// import { Button, Card } from "./ui";
// import { format, formatDistanceToNow, parseISO, isBefore } from "date-fns";
// import dayjs from "dayjs";
// import { MoreVertical, Filter, X } from "lucide-react";
// import React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function AdminTicketingPortal() {
//   const [tickets, setTickets] = useState([]);
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [showPredefined, setShowPredefined] = useState(false);
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
//   const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [assignees, setAssignees] = useState([]);
//   const navigate = useNavigate();
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [userRole, setUserRole] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [searchInput, setSearchInput] = useState("");
//   const [page, setPage] = useState(0);
//   const [isSending, setIsSending] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = React.useState([]);
//   const [form, setForm] = React.useState({ site: null, location: null });
//   const [size, setSize] = useState(30);
//   const [showFilters, setShowFilters] = useState(true);
//   const [paginationInfo, setPaginationInfo] = useState({
//     totalElements: 0,
//     totalPages: 0,
//     last: false,
//   });
//   const [loading, setLoading] = useState(false);

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     title: "",
//     status: "OPEN",
//     category: null,
//     employeeId: null,
//     locationId: null,
//     siteIdLocationId: null,
//     search: null,
//     assigneeId: null,
//     createdAfter: null,
//     createdBefore: null,
//   });

//   const itCategories = [
//     "HARDWARE",
//     "SOFTWARE",
//     "NETWORK",
//     "PRINTER",
//     "UPS",
//     "CCTV",
//     "FOCUS",
//     "EMAIL",
//     "DMS",
//     "WORKSHOP_DIAGNOSTIC_TOOLS",
//     "OTHER",
//     "MAINTENANCE",
//     "NEW_PROJECT",
//   ];

//   const hrCategories = [
//     "PAYROLL",
//     "RECRUITMENT",
//     "HR_OPERATIONS",
//     "GENERAL_HR_QUERIES",
//   ];

//   // const predefinedMessages = [
//   //   "Thank you for your patience.",
//   //   "We are looking into your issue.",
//   //   "Can you please provide more details?",
//   //   "This ticket has been resolved.",
//   // ];

//   const predefinedMessages = [
//     "Dear Sir, thank you for your patience.",
//     "Dear Team, we are currently looking into your issue.",
//     "Dear User, could you please provide more details?",
//     "Dear Sir/Madam, this ticket has been resolved.",
//     "Dear Team, we appreciate your understanding and cooperation.",
//     "Dear User, our team is diligently investigating this matter.",
//     "Dear Sir, please let us know if you have any further questions.",
//     "Dear Team, thank you for bringing this important matter to our attention.",
//     "Dear User, we will update you as soon as possible.",
//     "Dear Sir/Madam, your feedback is highly valuable to us.",
//     "Dear Team, we are committed to resolving your issue promptly.",
//     "Dear User, thank you for working with us to find a solution.",
//     "Dear Sir, please rest assured that we are prioritizing your ticket.",
//     "Dear Team, feel free to reach out for any additional assistance.",
//     "Dear User, we sincerely apologize for any inconvenience caused.",
//   ];

//   const handleSelectPredefined = (msg) => {
//     setNewMessage(msg);
//     setShowPredefined(false);
//   };

//   // Unified fetch function
//   const fetchTicketsWithFilters = async (customPage = page) => {
//     setLoading(true);
//     try {
//       const params = {
//         ...filters,
//         page: customPage,
//         size,
//       };

//       // Remove null/undefined values
//       Object.keys(params).forEach(
//         (key) => params[key] == null && delete params[key]
//       );

//       const res = await fetchFilteredTickets(params);

//       const {
//         content = [],
//         page: pageNumber,
//         size: pageSize,
//         totalElements,
//         totalPages,
//         last,
//       } = res?.data || {};

//       setFilteredTickets(content);
//       setPaginationInfo({ totalElements, totalPages, last });
//       setPage(pageNumber);
//       setSize(pageSize);
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//       toast.error("Failed to fetch tickets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//     setPage(0); // Reset to first page on filter change
//   };

//   // Apply filters - triggered by filter changes
//   useEffect(() => {
//     fetchTicketsWithFilters(0);
//   }, [filters]);

//   const handleCloseTicket = async () => {
//     setIsUpdating(true);
//     try {
//       await updateTicketStatus(selectedTicket.id, "CLOSED");
//       toast.success("Status updated");
//       fetchTicketsWithFilters(); // Refresh tickets
//     } catch (error) {
//       toast.error("Failed to update status");
//       console.error("Error updating status:", error);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleAddMessage = async () => {
//     if (!newMessage.trim()) return;

//     setIsSending(true);
//     try {
//       const messageDTO = {
//         message: newMessage,
//         sender: "You",
//         ticketMessageType: messageType,
//       };

//       const savedMessage = await addMessageToTicket(
//         selectedTicket.id,
//         messageDTO
//       );

//       setNewMessage("");

//       setSelectedTicket((prev) => ({
//         ...prev,
//         messages: [
//           ...prev.messages,
//           {
//             sender: savedMessage.sender,
//             message: savedMessage.message,
//             ticketMessageType: savedMessage.ticketMessageType,
//             sentAt: new Date(savedMessage.sentAt || Date.now()),
//           },
//         ],
//       }));
//     } catch (error) {
//       console.error("Error adding message: ", error);
//       toast.error("Failed to send message");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     handleFilterChange("search", searchInput.trim());
//   };

//   const handleDownloadTickets = async () => {
//     try {
//       const params = { ...filters };
//       // Remove pagination params for download
//       delete params.page;
//       delete params.size;

//       // Remove null/undefined values
//       Object.keys(params).forEach(
//         (key) => params[key] == null && delete params[key]
//       );

//       const response = await downloadFilteredTickets(params);

//       // Create blob and download
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success("Tickets downloaded successfully");
//     } catch (error) {
//       console.error("Error downloading tickets:", error);
//       toast.error("Failed to download tickets");
//     }
//   };

//   useEffect(() => {
//     let role = "user";
//     if (hasRole("ADMIN")) {
//       role = "ADMIN";
//     }
//     if (hasRole("HR_ADMIN")) {
//       role = "HR_ADMIN";
//     }
//     setUserRole(role);
//   }, []);

//   useEffect(() => {
//     getAssignees()
//       .then((res) => {
//         const formatted = res.data.map((user) => ({
//           employeeId: user.employeeId,
//           name: user.username,
//         }));
//         setAssignees(formatted);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch assignees", err);
//       });
//   }, []);

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
//     if (filters.siteIdLocationId) {
//       getLocationsBySite(filters.siteIdLocationId)
//         .then((locations) => {
//           setLocations(locations);
//         })
//         .catch((err) => {
//           console.error("Error fetching locations", err);
//         });
//     } else {
//       setLocations([]);
//     }
//   }, [filters.siteIdLocationId]);

//   return (
//     <div className="lg:ml-40 pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="px-4 py-6">
//         <TicketModal
//           isOpen={isDialogOpen}
//           onClose={() => {
//             setIsDialogOpen(false);
//             fetchTicketsWithFilters();
//           }}
//           className="z-50"
//         />

//         <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
//           {/* Header Section */}
//           {/* <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-4"> */}

//           <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-white">
//                   Ticket Management
//                 </h1>
//                 <p className="text-green-100 text-sm mt-1">
//                   Manage and track all support tickets
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 {/* <Button
//                   onClick={() => setIsDialogOpen(true)}
//                   className="px-4 py-2 rounded-lg shadow-lg bg-white text-green-600 hover:bg-green-50 font-semibold transition-all duration-200 transform hover:scale-105"
//                 >
//                   <span className="text-lg mr-2 text-black">+</span> New Ticket
//                 </Button> */}

//                 <Button
//                   onClick={() => setIsDialogOpen(true)}
//                   className="px-4 py-2 rounded-lg shadow-lg bg-white text-green-600 hover:bg-green-50 font-semibold transition-all duration-200 transform hover:scale-105"
//                 >
//                   <span className="text-lg mr-2 text-black">+</span>
//                   <span className="text-black">New Ticket</span>
//                 </Button>

//                 {/* {(userRole === "ADMIN" || userRole === "HR_ADMIN") && (
//                   <button
//                     className="px-4 py-2 rounded-lg shadow-lg bg-white text-green-600 hover:bg-green-50 font-semibold transition-all duration-200 transform hover:scale-105"
//                     onClick={() => navigate("/ticket/admin")}
//                   >
//                     Admin Portal
//                   </button>
//                 )} */}
//               </div>
//             </div>
//           </div>

//           {/* Filters Section */}
//           <div className="border-b border-gray-200 bg-gray-50">
//             <div className="px-6 py-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors"
//               >
//                 <Filter className="w-5 h-5" />
//                 {showFilters ? "Hide Filters" : "Show Filters"}
//               </button>
//             </div>

//             {showFilters && (
//               <div className="px-6 pb-6">
//                 {/* Row 1: Dropdowns */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Status
//                     </label>
//                     <select
//                       value={filters.status || ""}
//                       onChange={(e) =>
//                         handleFilterChange("status", e.target.value || null)
//                       }
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     >
//                       <option value="">All Status</option>
//                       <option value="OPEN">Open</option>
//                       <option value="WAITING">Waiting</option>
//                       <option value="CLOSED">Closed</option>
//                       <option value="UNASSIGNED">Unassigned</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Assignee
//                     </label>
//                     <select
//                       value={filters.assigneeId || ""}
//                       onChange={(e) =>
//                         handleFilterChange("assigneeId", e.target.value || null)
//                       }
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     >
//                       <option value="">All Assignees</option>
//                       {assignees.map(({ employeeId, name }) => (
//                         <option key={employeeId} value={employeeId}>
//                           {name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Site
//                     </label>
//                     <select
//                       value={filters.siteIdLocationId || ""}
//                       onChange={(e) =>
//                         handleFilterChange(
//                           "siteIdLocationId",
//                           e.target.value || null
//                         )
//                       }
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     >
//                       <option value="">All Sites</option>
//                       {sites.map(({ siteId, name }) => (
//                         <option key={siteId} value={siteId}>
//                           {name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Location
//                     </label>
//                     <select
//                       value={filters.locationId || ""}
//                       onChange={(e) =>
//                         handleFilterChange("locationId", e.target.value || null)
//                       }
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     >
//                       <option value="">All Locations</option>
//                       {locations.map((loc) => (
//                         <option key={loc.id} value={loc.id}>
//                           {loc.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Category
//                     </label>
//                     <select
//                       value={filters.category || ""}
//                       onChange={(e) =>
//                         handleFilterChange("category", e.target.value || null)
//                       }
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     >
//                       <option value="">All Categories</option>
//                       {(userRole === "HR_ADMIN"
//                         ? hrCategories
//                         : itCategories
//                       ).map((cat) => (
//                         <option key={cat} value={cat}>
//                           {cat}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Row 2: Date filters, Search, and Actions */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
//                   {/* <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Created After
//                     </label>
//                     <input
//                       type="date"
//                       value={filters.createdAfter || ""}
//                       onChange={(e) => {
//                         const val = e.target.value
//                           ? new Date(e.target.value).toISOString()
//                           : null;
//                         handleFilterChange("createdAfter", val);
//                       }}
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     />
//                   </div> */}

//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Created After
//                     </label>
//                     <input
//                       type="date"
//                       value={
//                         filters.createdAfter
//                           ? filters.createdAfter.substring(0, 10)
//                           : ""
//                       }
//                       onChange={(e) => {
//                         const val = e.target.value
//                           ? new Date(e.target.value).toISOString()
//                           : null;
//                         handleFilterChange("createdAfter", val);
//                       }}
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     />
//                   </div>

//                   {/* <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Created Before
//                     </label>
//                     <input
//                       type="date"
//                       value={filters.createdBefore || ""}
//                       onChange={(e) => {
//                         const val = e.target.value
//                           ? new Date(e.target.value).toISOString()
//                           : null;
//                         handleFilterChange("createdBefore", val);
//                       }}
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     />
//                   </div> */}

//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Created Before
//                     </label>
//                     <input
//                       type="date"
//                       value={
//                         filters.createdBefore
//                           ? filters.createdBefore.substring(0, 10)
//                           : ""
//                       }
//                       onChange={(e) => {
//                         const val = e.target.value
//                           ? new Date(e.target.value).toISOString()
//                           : null;
//                         handleFilterChange("createdBefore", val);
//                       }}
//                       className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                     />
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5">
//                       Search
//                     </label>
//                     <form onSubmit={handleSearchSubmit} className="relative">
//                       <input
//                         type="text"
//                         placeholder="Search tickets..."
//                         className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                       />
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2}
//                         stroke="currentColor"
//                         className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
//                         />
//                       </svg>
//                     </form>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Button
//                       onClick={handleDownloadTickets}
//                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all"
//                       disabled={loading}
//                     >
//                       📥 Download
//                     </Button>
//                   </div>

//                   <div className="flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
//                     <button
//                       onClick={() => {
//                         const newPage = Math.max(page - 1, 0);
//                         setPage(newPage);
//                         fetchTicketsWithFilters(newPage);
//                       }}
//                       disabled={page === 0}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//                     >
//                       ←
//                     </button>

//                     <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
//                       {page + 1} / {paginationInfo.totalPages}
//                     </span>

//                     <button
//                       onClick={() => {
//                         const newPage =
//                           page + 1 < paginationInfo.totalPages
//                             ? page + 1
//                             : page;
//                         setPage(newPage);
//                         fetchTicketsWithFilters(newPage);
//                       }}
//                       disabled={paginationInfo.last}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//                     >
//                       →
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mt-3 text-sm text-gray-600">
//                   <span className="font-medium">Total Results:</span>{" "}
//                   {paginationInfo.totalElements}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Table Section */}
//           <div className="p-6">
//             {loading ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                   <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//                   <p className="text-gray-600 font-medium">
//                     Loading tickets...
//                   </p>
//                 </div>
//               </div>
//             ) : filteredTickets.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//                 <svg
//                   className="w-20 h-20 mb-4 text-gray-300"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//                   />
//                 </svg>
//                 <p className="text-lg font-medium">No tickets found</p>
//                 <p className="text-sm mt-1">Try adjusting your filters</p>
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
//                 <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0 z-10">
//                       <tr>
//                         {[
//                           "ID",
//                           "Subject",
//                           "Status",
//                           "Category",
//                           "Location",
//                           "Assignee",
//                           "Employee",
//                           "Created At",
//                           "Responded At",
//                           "Due Date",
//                           "Updated At",
//                           "Closed At",
//                           ...(userRole !== "user" ? ["Actions"] : []),
//                         ].map((header, i) => (
//                           <th
//                             key={i}
//                             className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap"
//                           >
//                             {header}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-100">
//                       {filteredTickets.map((ticket) => (
//                         <tr
//                           key={ticket.id}
//                           className="hover:bg-green-50 transition-colors cursor-pointer"
//                           onClick={() => setSelectedTicket(ticket)}
//                           onDoubleClick={() => {
//                             setIsTicketModalOpen(true);
//                             setSelectedTicketId(ticket.id);
//                           }}
//                         >
//                           <td className="px-4 py-3 text-sm font-semibold text-green-600">
//                             #{ticket.id}
//                           </td>

//                           <td className="px-4 py-3 text-sm text-gray-800 min-w-[200px] max-w-[300px]">
//                             <div className="truncate font-medium">
//                               {ticket.title}
//                             </div>
//                           </td>

//                           <td className="px-4 py-3">
//                             <span
//                               className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//                                 ticket.status === "OPEN"
//                                   ? "bg-green-100 text-green-700"
//                                   : ticket.status === "IN_PROGRESS"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : ticket.status === "RESOLVED"
//                                   ? "bg-blue-100 text-blue-700"
//                                   : "bg-red-100 text-red-700"
//                               }`}
//                             >
//                               {ticket.status.replace("_", " ")}
//                             </span>
//                           </td>

//                           <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
//                             {ticket.category}
//                           </td>

//                           <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
//                             {ticket.locationName}
//                           </td>

//                           <td className="px-4 py-3 text-sm">
//                             {userRole !== "user" ? (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setSelectedUser(ticket.assignee?.employeeId);
//                                 }}
//                                 className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
//                               >
//                                 {ticket.assignee?.username || "Unassigned"}
//                               </button>
//                             ) : (
//                               <span className="text-gray-700">
//                                 {ticket.assignee?.username || "Unassigned"}
//                               </span>
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-sm">
//                             {userRole !== "user" ? (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setSelectedUser(ticket.employee?.employeeId);
//                                 }}
//                                 className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
//                               >
//                                 {ticket.employee?.username || "Unassigned"}
//                               </button>
//                             ) : (
//                               <span className="text-gray-700">
//                                 {ticket.employee?.username || "Unassigned"}
//                               </span>
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                             <div className="font-medium">
//                               {format(parseISO(ticket.createdAt), "d/M/yyyy")}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {formatDistanceToNow(parseISO(ticket.createdAt), {
//                                 addSuffix: true,
//                               })}
//                             </div>
//                           </td>

//                           <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                             {ticket.firstRespondedAt ? (
//                               <>
//                                 <div className="font-medium">
//                                   {format(
//                                     parseISO(
//                                       ticket.firstRespondedAt.split(".")[0]
//                                     ),
//                                     "d/M/yyyy"
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {formatDistanceToNow(
//                                     parseISO(
//                                       ticket.firstRespondedAt.split(".")[0]
//                                     ),
//                                     {
//                                       addSuffix: true,
//                                     }
//                                   )}
//                                 </div>
//                               </>
//                             ) : (
//                               <span className="text-gray-400 italic text-xs">
//                                 Not responded
//                               </span>
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-sm whitespace-nowrap">
//                             {ticket.dueDate ? (
//                               <>
//                                 <div className="font-medium text-gray-700">
//                                   {format(
//                                     parseISO(ticket.dueDate.split(".")[0]),
//                                     "d/M/yyyy"
//                                   )}
//                                 </div>
//                                 <div
//                                   className={`text-xs font-semibold ${
//                                     isBefore(
//                                       parseISO(ticket.dueDate),
//                                       new Date()
//                                     )
//                                       ? "text-red-600"
//                                       : "text-green-600"
//                                   }`}
//                                 >
//                                   {formatDistanceToNow(
//                                     parseISO(ticket.dueDate.split(".")[0]),
//                                     { addSuffix: true }
//                                   )}
//                                   {isBefore(
//                                     parseISO(ticket.dueDate),
//                                     new Date()
//                                   ) && " – Overdue!"}
//                                 </div>
//                               </>
//                             ) : (
//                               <span className="text-gray-400 italic text-xs">
//                                 No due date
//                               </span>
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                             {ticket.lastUpdated ? (
//                               <>
//                                 <div className="font-medium">
//                                   {format(
//                                     parseISO(ticket.lastUpdated.split(".")[0]),
//                                     "d/M/yyyy"
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-blue-600">
//                                   {formatDistanceToNow(
//                                     parseISO(ticket.lastUpdated.split(".")[0]),
//                                     { addSuffix: true }
//                                   )}
//                                 </div>
//                               </>
//                             ) : (
//                               <span className="text-gray-400 italic text-xs">
//                                 No updates
//                               </span>
//                             )}
//                           </td>

//                           <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                             {ticket.closedAt ? (
//                               <>
//                                 <div className="font-medium">
//                                   {format(
//                                     parseISO(ticket.closedAt.split(".")[0]),
//                                     "d/M/yyyy"
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-green-600">
//                                   {formatDistanceToNow(
//                                     parseISO(ticket.closedAt.split(".")[0]),
//                                     { addSuffix: true }
//                                   )}
//                                 </div>
//                               </>
//                             ) : (
//                               <span className="text-gray-400 italic text-xs">
//                                 Not closed
//                               </span>
//                             )}
//                           </td>

//                           {userRole !== "user" && (
//                             <td className="px-4 py-3">
//                               <button
//                                 className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setSelectedTicketId(ticket.id);
//                                   setIsTicketModalOpen(true);
//                                 }}
//                               >
//                                 Actions
//                               </button>
//                             </td>
//                           )}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* Ticket Detail Sidebar */}
//       {selectedTicket && (
//         <div
//           className={`fixed top-[64px] right-0 h-[calc(100%-64px)] bg-white border-l-2 border-green-500 shadow-2xl overflow-y-auto z-40 transition-all duration-300 ease-in-out ${
//             isMaximized ? "w-full md:w-full" : "w-full md:w-[400px]"
//           }`}
//         >
//           <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-500 px-4 py-3 shadow-lg z-10">
//             <div className="flex items-start justify-between">
//               <div className="flex-1 pr-2">
//                 <h2 className="text-lg font-bold text-white">
//                   {selectedTicket.title}
//                 </h2>
//                 <p className="text-sm text-green-100 mt-1 line-clamp-2">
//                   {selectedTicket.description}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
//                   title={isMaximized ? "Minimize" : "Maximize"}
//                   onClick={() => setIsMaximized((prev) => !prev)}
//                 >
//                   {isMaximized ? (
//                     <svg
//                       className="w-5 h-5 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2.5"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 12h14M5 18h14"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       className="w-5 h-5 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2.5"
//                       viewBox="0 0 24 24"
//                     >
//                       <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
//                     </svg>
//                   )}
//                 </button>

//                 <button
//                   className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
//                   title="Ticket actions"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedTicketId(selectedTicket.id);
//                     setIsTicketModalOpen(true);
//                   }}
//                 >
//                   <MoreVertical className="w-5 h-5 text-white" />
//                 </button>

//                 <TicketAttachmentButton ticket={selectedTicket} />

//                 <button
//                   onClick={() => setSelectedTicket(null)}
//                   aria-label="Close"
//                   className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200 transform hover:scale-110"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-4">
//             {/* Messages Section */}
//             <div className="mb-4">
//               <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
//                 <span className="w-1 h-4 bg-green-600 rounded"></span>
//                 Conversation
//               </h3>
//               <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
//                 {selectedTicket.messages.filter((msg) => {
//                   if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
//                   return userRole !== "user";
//                 }).length === 0 ? (
//                   <div className="text-center py-8 text-gray-400">
//                     <svg
//                       className="w-12 h-12 mx-auto mb-2 opacity-50"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                       />
//                     </svg>
//                     <p className="text-sm">
//                       No messages yet. Start the conversation!
//                     </p>
//                   </div>
//                 ) : (
//                   selectedTicket.messages
//                     .filter((msg) => {
//                       if (msg.ticketMessageType === "PUBLIC_RESPONSE")
//                         return true;
//                       return userRole !== "user";
//                     })
//                     .map((msg, idx) => (
//                       <div
//                         key={idx}
//                         className={`rounded-xl p-3 shadow-sm ${
//                           msg.ticketMessageType === "INTERNAL_NOTE"
//                             ? "bg-yellow-50 border-l-4 border-yellow-400"
//                             : "bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500"
//                         }`}
//                       >
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
//                             {msg.ticketMessageType === "INTERNAL_NOTE" && (
//                               <span
//                                 title="Internal Note"
//                                 className="text-yellow-600"
//                               >
//                                 🛡️
//                               </span>
//                             )}
//                             {msg.sender}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {new Date(msg.sentAt).toLocaleString()}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                           {msg.message}
//                         </p>
//                       </div>
//                     ))
//                 )}
//               </div>
//             </div>

//             {/* Message Input Section */}
//             <div className="mt-6 pt-4 border-t-2 border-gray-200">
//               <div className="relative">
//                 <textarea
//                   className={`w-full p-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 resize text-sm transition-all ${
//                     messageType === "INTERNAL_NOTE"
//                       ? "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
//                       : "border-green-300 focus:ring-green-500 focus:border-green-500 bg-white"
//                   }`}
//                   rows="4"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder={
//                     messageType === "INTERNAL_NOTE"
//                       ? "Write an internal note (IT Team Only)..."
//                       : "Write your message..."
//                   }
//                 />

//                 {userRole !== "user" && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={() => setShowPredefined((prev) => !prev)}
//                       className="absolute bottom-3 right-24 text-gray-500 hover:text-green-600 transition-colors p-1"
//                       title="Select predefined message"
//                     >
//                       💬
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setMessageType((prev) =>
//                           prev === "PUBLIC_RESPONSE"
//                             ? "INTERNAL_NOTE"
//                             : "PUBLIC_RESPONSE"
//                         )
//                       }
//                       className={`absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
//                         messageType === "INTERNAL_NOTE"
//                           ? "bg-yellow-200 text-yellow-800 border-2 border-yellow-400"
//                           : "bg-green-200 text-green-800 border-2 border-green-400"
//                       }`}
//                       title="Toggle Message Type"
//                     >
//                       {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}
//                     </button>
//                   </>
//                 )}

//                 {/* {showPredefined && (
//                   <div className="absolute right-12 bottom-full mb-2 z-20 w-72 bg-white shadow-2xl border-2 border-gray-200 rounded-xl overflow-hidden">
//                     <div className="bg-gradient-to-r from-green-600 to-green-500 px-3 py-2">
//                       <h4 className="text-sm font-semibold text-white">
//                         Quick Replies
//                       </h4>
//                     </div>
//                     {predefinedMessages.map((msg, idx) => (
//                       <div
//                         key={idx}
//                         onClick={() => handleSelectPredefined(msg)}
//                         className="px-3 py-2.5 hover:bg-green-50 cursor-pointer border-b last:border-b-0 text-sm text-gray-700 transition-colors"
//                       >
//                         {msg}
//                       </div>
//                     ))}
//                   </div>
//                 )} */}

//                 {showPredefined && (
//                   <div className="absolute right-12 bottom-full mb-2 z-20 w-72 bg-white shadow-2xl border-2 border-gray-200 rounded-xl overflow-hidden">
//                     <div className="bg-gradient-to-r from-green-600 to-green-500 px-3 py-2">
//                       <h4 className="text-sm font-semibold text-white">
//                         Quick Replies
//                       </h4>
//                     </div>
//                     <div className="max-h-48 overflow-auto">
//                       {predefinedMessages.map((msg, idx) => (
//                         <div
//                           key={idx}
//                           onClick={() => handleSelectPredefined(msg)}
//                           className="px-3 py-2.5 hover:bg-green-50 cursor-pointer border-b last:border-b-0 text-sm text-gray-700 transition-colors"
//                         >
//                           {msg}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center gap-2 mt-3">
//                 <Button
//                   className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//                   onClick={handleAddMessage}
//                   disabled={isSending || !newMessage.trim()}
//                 >
//                   {isSending ? (
//                     <span className="flex items-center gap-2">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </Button>

//                 {userRole !== "user" && (
//                   <div className="relative">
//                     <button
//                       className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-3 rounded-xl shadow-lg font-semibold transition-all disabled:opacity-50"
//                       onClick={() => setDropdownOpen((prev) => !prev)}
//                       disabled={isSending || !newMessage.trim()}
//                     >
//                       ▼
//                     </button>

//                     {dropdownOpen && (
//                       <ul className="absolute right-0 bottom-full mb-2 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden">
//                         <li>
//                           <button
//                             className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors text-sm font-medium text-gray-700"
//                             onClick={async () => {
//                               setDropdownOpen(false);
//                               try {
//                                 await handleAddMessage();
//                                 await handleCloseTicket();
//                                 toast.success(
//                                   "Message sent and ticket closed."
//                                 );
//                               } catch (err) {
//                                 toast.error("Failed to send and close.");
//                                 console.error(err);
//                               }
//                             }}
//                             disabled={isSending || !newMessage.trim()}
//                           >
//                             ✅ Send & Close Ticket
//                           </button>
//                         </li>
//                       </ul>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {Boolean(selectedUser) && (
//         <UserDetailsModal
//           query={selectedUser}
//           isOpen
//           onClose={() => setSelectedUser(null)}
//         />
//       )}
//       {isTicketModalOpen && (
//         <TicketActionModal
//           ticketId={selectedTicketId}
//           open={isTicketModalOpen}
//           onClose={() => setIsTicketModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

import UserDetailsModal from "../components/UserDetailsModal";
import {
  addMessageToTicket,
  hasRole,
  updateTicketStatus,
  getAssignees,
  fetchSites,
  fetchFilteredTickets,
  downloadFilteredTickets,
  getLocationsBySite,
} from "../services/api";
import TicketActionModal from "./TicketActionModal";
import TicketAttachmentButton from "./TicketAttachmentButton";
import TicketModal from "./TicketFormModal";
import { Button, Card } from "./ui";
import {
  format,
  formatDistanceToNow,
  parseISO,
  isBefore,
  subDays,
} from "date-fns";
import dayjs from "dayjs";
import { MoreVertical, Filter, X } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminTicketingPortal() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showPredefined, setShowPredefined] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [assignees, setAssignees] = useState([]);
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = React.useState([]);
  const [form, setForm] = React.useState({ site: null, location: null });
  const [size, setSize] = useState(30);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });
  const [loading, setLoading] = useState(false);

  // Unified filter state
  const [filters, setFilters] = useState({
    title: "",
    status: "OPEN",
    category: null,
    employeeId: null,
    locationId: null,
    siteIdLocationId: null,
    search: null,
    assigneeId: null,
    createdAfter: null,
    createdBefore: null,
  });

  const itCategories = [
    "HARDWARE",
    "SOFTWARE",
    "NETWORK",
    "PRINTER",
    "UPS",
    "CCTV",
    "FOCUS",
    "EMAIL",
    "DMS",
    "WORKSHOP_DIAGNOSTIC_TOOLS",
    "OTHER",
    "MAINTENANCE",
    "NEW_PROJECT",
  ];

  const hrCategories = [
    "PAYROLL",
    "RECRUITMENT",
    "HR_OPERATIONS",
    "GENERAL_HR_QUERIES",
  ];

  const predefinedMessages = [
    "Dear Sir, thank you for your patience.",
    "Dear Team, we are currently looking into your issue.",
    "Dear User, could you please provide more details?",
    "Dear Sir/Madam, this ticket has been resolved.",
    "Dear Team, we appreciate your understanding and cooperation.",
    "Dear User, our team is diligently investigating this matter.",
    "Dear Sir, please let us know if you have any further questions.",
    "Dear Team, thank you for bringing this important matter to our attention.",
    "Dear User, we will update you as soon as possible.",
    "Dear Sir/Madam, your feedback is highly valuable to us.",
    "Dear Team, we are committed to resolving your issue promptly.",
    "Dear User, thank you for working with us to find a solution.",
    "Dear Sir, please rest assured that we are prioritizing your ticket.",
    "Dear Team, feel free to reach out for any additional assistance.",
    "Dear User, we sincerely apologize for any inconvenience caused.",
  ];

  const handleSelectPredefined = (msg) => {
    setNewMessage(msg);
    setShowPredefined(false);
  };

  // Age filter handler
  const handleAgeFilter = (ageRange) => {
    const now = new Date();
    let createdAfter = null;
    let createdBefore = null;

    switch (ageRange) {
      case "0-7":
        createdAfter = subDays(now, 7).toISOString();
        createdBefore = now.toISOString();
        break;
      case "8-15":
        createdAfter = subDays(now, 15).toISOString();
        createdBefore = subDays(now, 8).toISOString();
        break;
      case "16-30":
        createdAfter = subDays(now, 30).toISOString();
        createdBefore = subDays(now, 16).toISOString();
        break;
      case "31+":
        createdAfter = null;
        createdBefore = subDays(now, 31).toISOString();
        break;
      default:
        createdAfter = null;
        createdBefore = null;
    }

    setSelectedAgeFilter(ageRange);
    setFilters((prev) => ({
      ...prev,
      createdAfter,
      createdBefore,
    }));
    setPage(0);
  };

  // Unified fetch function
  const fetchTicketsWithFilters = async (customPage = page) => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: customPage,
        size,
      };

      // Remove null/undefined values
      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key]
      );

      const res = await fetchFilteredTickets(params);

      const {
        content = [],
        page: pageNumber,
        size: pageSize,
        totalElements,
        totalPages,
        last,
      } = res?.data || {};

      setFilteredTickets(content);
      setPaginationInfo({ totalElements, totalPages, last });
      setPage(pageNumber);
      setSize(pageSize);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0); // Reset to first page on filter change
  };

  // Apply filters - triggered by filter changes
  useEffect(() => {
    fetchTicketsWithFilters(0);
  }, [filters]);

  const handleCloseTicket = async () => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(selectedTicket.id, "CLOSED");
      toast.success("Status updated");
      fetchTicketsWithFilters(); // Refresh tickets
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      const messageDTO = {
        message: newMessage,
        sender: "You",
        ticketMessageType: messageType,
      };

      const savedMessage = await addMessageToTicket(
        selectedTicket.id,
        messageDTO
      );

      setNewMessage("");

      setSelectedTicket((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            sender: savedMessage.sender,
            message: savedMessage.message,
            ticketMessageType: savedMessage.ticketMessageType,
            sentAt: new Date(savedMessage.sentAt || Date.now()),
          },
        ],
      }));
    } catch (error) {
      console.error("Error adding message: ", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleFilterChange("search", searchInput.trim());
  };

  const handleDownloadTickets = async () => {
    try {
      const params = { ...filters };
      // Remove pagination params for download
      delete params.page;
      delete params.size;

      // Remove null/undefined values
      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key]
      );

      const response = await downloadFilteredTickets(params);

      // Create blob and download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Tickets downloaded successfully");
    } catch (error) {
      console.error("Error downloading tickets:", error);
      toast.error("Failed to download tickets");
    }
  };

  useEffect(() => {
    let role = "user";
    if (hasRole("ADMIN")) {
      role = "ADMIN";
    }
    if (hasRole("HR_ADMIN")) {
      role = "HR_ADMIN";
    }
    setUserRole(role);
  }, []);

  useEffect(() => {
    getAssignees()
      .then((res) => {
        const formatted = res.data.map((user) => ({
          employeeId: user.employeeId,
          name: user.username,
        }));
        setAssignees(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch assignees", err);
      });
  }, []);

  useEffect(() => {
    fetchSites()
      .then((res) => {
        const formatted = res.data.map((site) => ({
          siteId: site.id,
          name: site.name,
        }));
        setSites(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch sites", err);
      });
  }, []);

  useEffect(() => {
    if (filters.siteIdLocationId) {
      getLocationsBySite(filters.siteIdLocationId)
        .then((locations) => {
          setLocations(locations);
        })
        .catch((err) => {
          console.error("Error fetching locations", err);
        });
    } else {
      setLocations([]);
    }
  }, [filters.siteIdLocationId]);

  return (
    <div className="lg:ml-40 pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 py-6">
        <TicketModal
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            fetchTicketsWithFilters();
          }}
          className="z-50"
        />

        <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 w-1/2 ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Ticket Management
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                  Manage and track all support tickets
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="px-4 py-2 rounded-lg shadow-lg bg-white text-blue-600 hover:bg-blue-50 font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <span className="text-lg mr-2 text-black">+</span>
                  <span className="text-black">New Ticket</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          {/* <div className="border-b border-gray-200 bg-gray-50"> */}
          <div className="border-b border-gray-200 bg-gray-50 w-1/2">
            <div className="px-6 py-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <Filter className="w-5 h-5" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {showFilters && (
              <div className="px-6 pb-6">
                {/* Row 1: Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Status
                    </label>
                    <select
                      value={filters.status || ""}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value || null)
                      }
                      className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                    >
                      <option value="">All Status</option>
                      <option value="OPEN">Open</option>
                      <option value="WAITING">Waiting</option>
                      <option value="CLOSED">Closed</option>
                      <option value="UNASSIGNED">Unassigned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Assignee
                    </label>
                    <select
                      value={filters.assigneeId || ""}
                      onChange={(e) =>
                        handleFilterChange("assigneeId", e.target.value || null)
                      }
                      className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                    >
                      <option value="">All Assignees</option>
                      {assignees.map(({ employeeId, name }) => (
                        <option key={employeeId} value={employeeId}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Site
                    </label>
                    <select
                      value={filters.siteIdLocationId || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "siteIdLocationId",
                          e.target.value || null
                        )
                      }
                      className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                    >
                      <option value="">All Sites</option>
                      {sites.map(({ siteId, name }) => (
                        <option key={siteId} value={siteId}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Location
                    </label>
                    <select
                      value={filters.locationId || ""}
                      onChange={(e) =>
                        handleFilterChange("locationId", e.target.value || null)
                      }
                      className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                    >
                      <option value="">All Locations</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Category
                    </label>
                    <select
                      value={filters.category || ""}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value || null)
                      }
                      className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                    >
                      <option value="">All Categories</option>
                      {(userRole === "HR_ADMIN"
                        ? hrCategories
                        : itCategories
                      ).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Age Filter Buttons */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    Ticket Age
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={() => handleAgeFilter("0-7")}
                      className={`px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                        selectedAgeFilter === "0-7"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                      }`}
                    >
                      0-7 Days
                    </button>
                    <button
                      onClick={() => handleAgeFilter("8-15")}
                      className={`px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                        selectedAgeFilter === "8-15"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                      }`}
                    >
                      8-15 Days
                    </button>
                    <button
                      onClick={() => handleAgeFilter("16-30")}
                      className={`px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                        selectedAgeFilter === "16-30"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                      }`}
                    >
                      16-30 Days
                    </button>
                    <button
                      onClick={() => handleAgeFilter("31+")}
                      className={`px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                        selectedAgeFilter === "31+"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                      }`}
                    >
                      31+ Days
                    </button>
                  </div>
                  {selectedAgeFilter && (
                    <button
                      onClick={() => {
                        setSelectedAgeFilter(null);
                        setFilters((prev) => ({
                          ...prev,
                          createdAfter: null,
                          createdBefore: null,
                        }));
                      }}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ✕ Clear Age Filter
                    </button>
                  )}
                </div>

                {/* Row 3: Search and Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Search
                    </label>
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                        />
                      </svg>
                    </form>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleDownloadTickets}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all"
                      disabled={loading}
                    >
                      📥 Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
                    <button
                      onClick={() => {
                        const newPage = Math.max(page - 1, 0);
                        setPage(newPage);
                        fetchTicketsWithFilters(newPage);
                      }}
                      disabled={page === 0}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                    >
                      ←
                    </button>

                    <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
                      {page + 1} / {paginationInfo.totalPages}
                    </span>

                    <button
                      onClick={() => {
                        const newPage =
                          page + 1 < paginationInfo.totalPages
                            ? page + 1
                            : page;
                        setPage(newPage);
                        fetchTicketsWithFilters(newPage);
                      }}
                      disabled={paginationInfo.last}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Total Results:</span>{" "}
                  {paginationInfo.totalElements}
                </div>
              </div>
            )}
          </div>

          {/* Table Section */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Loading tickets...
                  </p>
                </div>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg
                  className="w-20 h-20 mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-lg font-medium">No tickets found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0 z-10">
                      <tr>
                        {[
                          "ID",
                          "Subject",
                          "Status",
                          "Category",
                          "Location",
                          "Assignee",
                          "Employee",
                          "Created At",
                          "Responded At",
                          "Due Date",
                          "Updated At",
                          "Closed At",
                          ...(userRole !== "user" ? ["Actions"] : []),
                        ].map((header, i) => (
                          <th
                            key={i}
                            className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredTickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedTicket(ticket)}
                          onDoubleClick={() => {
                            setIsTicketModalOpen(true);
                            setSelectedTicketId(ticket.id);
                          }}
                        >
                          <td className="px-4 py-3 text-sm font-semibold text-blue-600">
                            #{ticket.id}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-800 min-w-[200px] max-w-[300px]">
                            <div className="truncate font-medium">
                              {ticket.title}
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                ticket.status === "OPEN"
                                  ? "bg-green-100 text-green-700"
                                  : ticket.status === "IN_PROGRESS"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : ticket.status === "RESOLVED"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {ticket.status.replace("_", " ")}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                            {ticket.category}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                            {ticket.locationName}
                          </td>

                          <td className="px-4 py-3 text-sm">
                            {userRole !== "user" ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUser(ticket.assignee?.employeeId);
                                }}
                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                              >
                                {ticket.assignee?.username || "Unassigned"}
                              </button>
                            ) : (
                              <span className="text-gray-700">
                                {ticket.assignee?.username || "Unassigned"}
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 text-sm">
                            {userRole !== "user" ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUser(ticket.employee?.employeeId);
                                }}
                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                              >
                                {ticket.employee?.username || "Unassigned"}
                              </button>
                            ) : (
                              <span className="text-gray-700">
                                {ticket.employee?.username || "Unassigned"}
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            <div className="font-medium">
                              {format(parseISO(ticket.createdAt), "d/M/yyyy")}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDistanceToNow(parseISO(ticket.createdAt), {
                                addSuffix: true,
                              })}
                            </div>
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {ticket.firstRespondedAt ? (
                              <>
                                <div className="font-medium">
                                  {format(
                                    parseISO(
                                      ticket.firstRespondedAt.split(".")[0]
                                    ),
                                    "d/M/yyyy"
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatDistanceToNow(
                                    parseISO(
                                      ticket.firstRespondedAt.split(".")[0]
                                    ),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-xs">
                                Not responded
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 text-sm whitespace-nowrap">
                            {ticket.dueDate ? (
                              <>
                                <div className="font-medium text-gray-700">
                                  {format(
                                    parseISO(ticket.dueDate.split(".")[0]),
                                    "d/M/yyyy"
                                  )}
                                </div>
                                <div
                                  className={`text-xs font-semibold ${
                                    isBefore(
                                      parseISO(ticket.dueDate),
                                      new Date()
                                    )
                                      ? "text-red-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {formatDistanceToNow(
                                    parseISO(ticket.dueDate.split(".")[0]),
                                    { addSuffix: true }
                                  )}
                                  {isBefore(
                                    parseISO(ticket.dueDate),
                                    new Date()
                                  ) && " – Overdue!"}
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-xs">
                                No due date
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {ticket.lastUpdated ? (
                              <>
                                <div className="font-medium">
                                  {format(
                                    parseISO(ticket.lastUpdated.split(".")[0]),
                                    "d/M/yyyy"
                                  )}
                                </div>
                                <div className="text-xs text-blue-600">
                                  {formatDistanceToNow(
                                    parseISO(ticket.lastUpdated.split(".")[0]),
                                    { addSuffix: true }
                                  )}
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-xs">
                                No updates
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {ticket.closedAt ? (
                              <>
                                <div className="font-medium">
                                  {format(
                                    parseISO(ticket.closedAt.split(".")[0]),
                                    "d/M/yyyy"
                                  )}
                                </div>
                                <div className="text-xs text-green-600">
                                  {formatDistanceToNow(
                                    parseISO(ticket.closedAt.split(".")[0]),
                                    { addSuffix: true }
                                  )}
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-xs">
                                Not closed
                              </span>
                            )}
                          </td>

                          {userRole !== "user" && (
                            <td className="px-4 py-3">
                              <button
                                className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTicketId(ticket.id);
                                  setIsTicketModalOpen(true);
                                }}
                              >
                                Actions
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Ticket Detail Sidebar */}
      {selectedTicket && (
        <div
          className={`fixed top-[64px] right-0 h-[calc(100%-64px)] bg-white border-l-2 border-blue-500 shadow-2xl overflow-y-auto z-40 transition-all duration-300 ease-in-out ${
            isMaximized ? "w-full md:w-full" : "w-full md:w-[400px]"
          }`}
        >
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 shadow-lg z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-2">
                <h2 className="text-lg font-bold text-white">
                  {selectedTicket.title}
                </h2>
                <p className="text-sm text-blue-100 mt-1 line-clamp-2">
                  {selectedTicket.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
                  title={isMaximized ? "Minimize" : "Maximize"}
                  onClick={() => setIsMaximized((prev) => !prev)}
                >
                  {isMaximized ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M5 18h14"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
                    </svg>
                  )}
                </button>

                <button
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
                  title="Ticket actions"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTicketId(selectedTicket.id);
                    setIsTicketModalOpen(true);
                  }}
                >
                  <MoreVertical className="w-5 h-5 text-white" />
                </button>

                <TicketAttachmentButton ticket={selectedTicket} />

                <button
                  onClick={() => setSelectedTicket(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200 transform hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* Messages Section */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded"></span>
                Conversation
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {selectedTicket.messages.filter((msg) => {
                  if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
                  return userRole !== "user";
                }).length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <svg
                      className="w-12 h-12 mx-auto mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="text-sm">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                ) : (
                  selectedTicket.messages
                    .filter((msg) => {
                      if (msg.ticketMessageType === "PUBLIC_RESPONSE")
                        return true;
                      return userRole !== "user";
                    })
                    .map((msg, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xl p-3 shadow-sm ${
                          msg.ticketMessageType === "INTERNAL_NOTE"
                            ? "bg-yellow-50 border-l-4 border-yellow-400"
                            : "bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                            {msg.ticketMessageType === "INTERNAL_NOTE" && (
                              <span
                                title="Internal Note"
                                className="text-yellow-600"
                              >
                                🛡️
                              </span>
                            )}
                            {msg.sender}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(msg.sentAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Message Input Section */}
            <div className="mt-6 pt-4 border-t-2 border-gray-200">
              <div className="relative">
                <textarea
                  className={`w-full p-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 resize text-sm transition-all ${
                    messageType === "INTERNAL_NOTE"
                      ? "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                      : "border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  }`}
                  rows="4"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={
                    messageType === "INTERNAL_NOTE"
                      ? "Write an internal note (IT Team Only)..."
                      : "Write your message..."
                  }
                />

                {userRole !== "user" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowPredefined((prev) => !prev)}
                      className="absolute bottom-3 right-24 text-gray-500 hover:text-blue-600 transition-colors p-1"
                      title="Select predefined message"
                    >
                      💬
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setMessageType((prev) =>
                          prev === "PUBLIC_RESPONSE"
                            ? "INTERNAL_NOTE"
                            : "PUBLIC_RESPONSE"
                        )
                      }
                      className={`absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        messageType === "INTERNAL_NOTE"
                          ? "bg-yellow-200 text-yellow-800 border-2 border-yellow-400"
                          : "bg-blue-200 text-blue-800 border-2 border-blue-400"
                      }`}
                      title="Toggle Message Type"
                    >
                      {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}
                    </button>
                  </>
                )}

                {showPredefined && (
                  <div className="absolute right-12 bottom-full mb-2 z-20 w-72 bg-white shadow-2xl border-2 border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2">
                      <h4 className="text-sm font-semibold text-white">
                        Quick Replies
                      </h4>
                    </div>
                    <div className="max-h-48 overflow-auto">
                      {predefinedMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectPredefined(msg)}
                          className="px-3 py-2.5 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 text-sm text-gray-700 transition-colors"
                        >
                          {msg}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  onClick={handleAddMessage}
                  disabled={isSending || !newMessage.trim()}
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {userRole !== "user" && (
                  <div className="relative">
                    <button
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-3 rounded-xl shadow-lg font-semibold transition-all disabled:opacity-50"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      disabled={isSending || !newMessage.trim()}
                    >
                      ▼
                    </button>

                    {dropdownOpen && (
                      <ul className="absolute right-0 bottom-full mb-2 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden">
                        <li>
                          <button
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700"
                            onClick={async () => {
                              setDropdownOpen(false);
                              try {
                                await handleAddMessage();
                                await handleCloseTicket();
                                toast.success(
                                  "Message sent and ticket closed."
                                );
                              } catch (err) {
                                toast.error("Failed to send and close.");
                                console.error(err);
                              }
                            }}
                            disabled={isSending || !newMessage.trim()}
                          >
                            ✅ Send & Close Ticket
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {Boolean(selectedUser) && (
        <UserDetailsModal
          query={selectedUser}
          isOpen
          onClose={() => setSelectedUser(null)}
        />
      )}
      {isTicketModalOpen && (
        <TicketActionModal
          ticketId={selectedTicketId}
          open={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
        />
      )}
    </div>
  );
}
