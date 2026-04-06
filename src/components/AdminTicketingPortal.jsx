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
// import ITApprovalModal from "./ITApprovalHelper";
// import TicketActionModal from "./TicketActionModal";
// import TicketAttachmentButton from "./TicketAttachmentButton";
// import TicketModal from "./TicketFormModal";
// import { Button, Card } from "./ui";
// import {
//   format,
//   formatDistanceToNow,
//   parseISO,
//   isBefore,
//   subDays,
// } from "date-fns";
// import dayjs from "dayjs";
// import { FileText } from "lucide-react";
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
//   const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
//   const [paginationInfo, setPaginationInfo] = useState({
//     totalElements: 0,
//     totalPages: 0,
//     last: false,
//   });
//   const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
//   // const [selectedTicket, setSelectedTicket] = useState(null);
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
//     "CUG_SIM",
//     "ZOHO_SUPPORT",
//   ];

//   const hrCategories = [
//     "PAYROLL",
//     "RECRUITMENT",
//     "HR_OPERATIONS",
//     "GENERAL_HR_QUERIES",
//   ];

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

//   // Age filter handler
//   const handleAgeFilter = (ageRange) => {
//     const now = new Date();
//     let createdAfter = null;
//     let createdBefore = null;

//     switch (ageRange) {
//       case "0-7":
//         createdAfter = subDays(now, 7).toISOString();
//         createdBefore = now.toISOString();
//         break;
//       case "8-15":
//         createdAfter = subDays(now, 15).toISOString();
//         createdBefore = subDays(now, 8).toISOString();
//         break;
//       case "16-30":
//         createdAfter = subDays(now, 30).toISOString();
//         createdBefore = subDays(now, 16).toISOString();
//         break;
//       case "31+":
//         createdAfter = null;
//         createdBefore = subDays(now, 31).toISOString();
//         break;
//       default:
//         createdAfter = null;
//         createdBefore = null;
//     }

//     setSelectedAgeFilter(ageRange);
//     setFilters((prev) => ({
//       ...prev,
//       createdAfter,
//       createdBefore,
//     }));
//     setPage(0);
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
//         (key) => params[key] == null && delete params[key],
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
//       await updateTicketStatus(selectedTicket.id, "RESOLVED");
//       toast.success("Status updated");
//       fetchTicketsWithFilters(); // Refresh tickets
//     } catch (error) {
//       toast.error("Failed to update status");
//       console.error("Error updating status:", error);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleOpenApprovalModal = (ticket) => {
//     setSelectedTicket(ticket);
//     setIsApprovalModalOpen(true);
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
//         messageDTO,
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
//         (key) => params[key] == null && delete params[key],
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
//         `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`,
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
//   // console.log("tickets are ", tickets);

//   return (
//     // <div className="lg:ml-40 pt-16 min-h-screen py-0 bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       {/* <div className="px-4 py-0"> */}
//         <TicketModal
//           isOpen={isDialogOpen}
//           onClose={() => {
//             setIsDialogOpen(false);
//             fetchTicketsWithFilters();
//           }}
//           className="z-50"
//         />

//         <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden py-0">
//           {/* Header Section */}
//           {/* <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4"> */}

//           {/* Header Section */}
//           <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
//             <div className="flex gap-3 px-6 py-3 items-center justify-between">
//               {/* Action Buttons */}
//               <div className="flex items-center gap-2">
//                 {/* Filter Toggle */}
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-all font-medium border border-gray-200 shadow-sm"
//                 >
//                   <Filter className="w-4 h-4" />
//                   {showFilters ? "Hide" : "Filters"}
//                 </button>

//                 {/* Create Ticket */}
//                 <Button
//                   onClick={() => setIsDialogOpen(true)}
//                   className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-sm transition-all"
//                 >
//                   + Create
//                 </Button>

//                 {/* Download */}
//                 {/* <Button
//                   onClick={handleDownloadTickets}
//                   className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-sm transition-all"
//                   disabled={loading}
//                 >
//                   📥
//                 </Button> */}

//                 <Button
//                   onClick={handleDownloadTickets}
//                   className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-sm transition-all"
//                   disabled={loading}
//                 >
//                   <span>📥</span>
//                   <span>Download</span>
//                 </Button>

//                 {/* Pagination */}
//                 <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm">
//                   <button
//                     onClick={() => {
//                       const newPage = Math.max(page - 1, 0);
//                       setPage(newPage);
//                       fetchTicketsWithFilters(newPage);
//                     }}
//                     disabled={page === 0}
//                     className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//                   >
//                     ←
//                   </button>

//                   <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
//                     {page + 1}/{paginationInfo.totalPages}
//                   </span>

//                   <button
//                     onClick={() => {
//                       const newPage =
//                         page + 1 < paginationInfo.totalPages ? page + 1 : page;
//                       setPage(newPage);
//                       fetchTicketsWithFilters(newPage);
//                     }}
//                     disabled={paginationInfo.last}
//                     className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//                   >
//                     →
//                   </button>
//                 </div>

//                 {/* Total */}
//                 <div className="text-xs text-white font-medium whitespace-nowrap px-2">
//                   Total: {paginationInfo.totalElements}
//                 </div>

//                 {/* Divider */}
//                 <div className="w-px h-7 bg-gray-300 mx-1"></div>

//                 {/* Search */}
//                 <form
//                   onSubmit={handleSearchSubmit}
//                   className="relative min-w-[180px]"
//                 >
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     className="w-full text-xs p-1.5 pl-7 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                   />

//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
//                     />
//                   </svg>
//                 </form>
//               </div>
//             </div>
//           </div>

//           {/* Filters Section */}
//           <div className="border-b border-gray-200 bg-gray-50">
//             {showFilters && (
//               <div className="px-6 py-3">
//                 {/* Main Filter Row */}
//                 <div className="flex items-center gap-2 overflow-x-auto pb-1">
//                   {/* Status Filter */}
//                   <select
//                     value={filters.status || ""}
//                     onChange={(e) =>
//                       handleFilterChange("status", e.target.value || null)
//                     }
//                     className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[100px]"
//                   >
//                     <option value="">All Status</option>
//                     <option value="OPEN">Open</option>
//                     <option value="WAITING">Waiting</option>
//                     <option value="CLOSED">Closed</option>
//                     <option value="RESOLVED">Resolved</option>
//                     <option value="UNASSIGNED">Unassigned</option>
//                   </select>

//                   {/* Assignee */}
//                   <select
//                     value={filters.assigneeId || ""}
//                     onChange={(e) =>
//                       handleFilterChange("assigneeId", e.target.value || null)
//                     }
//                     className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[120px]"
//                   >
//                     <option value="">All Assignees</option>
//                     {assignees.map(({ employeeId, name }) => (
//                       <option key={employeeId} value={employeeId}>
//                         {name}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Site */}
//                   <select
//                     value={filters.siteIdLocationId || ""}
//                     onChange={(e) =>
//                       handleFilterChange(
//                         "siteIdLocationId",
//                         e.target.value || null,
//                       )
//                     }
//                     className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[100px]"
//                   >
//                     <option value="">All Sites</option>
//                     {sites.map(({ siteId, name }) => (
//                       <option key={siteId} value={siteId}>
//                         {name}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Location */}
//                   <select
//                     value={filters.locationId || ""}
//                     onChange={(e) =>
//                       handleFilterChange("locationId", e.target.value || null)
//                     }
//                     className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[120px]"
//                   >
//                     <option value="">All Locations</option>
//                     {locations.map((loc) => (
//                       <option key={loc.id} value={loc.id}>
//                         {loc.name}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Category */}
//                   <select
//                     value={filters.category || ""}
//                     onChange={(e) =>
//                       handleFilterChange("category", e.target.value || null)
//                     }
//                     className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[120px]"
//                   >
//                     <option value="">All Categories</option>
//                     {(userRole === "HR_ADMIN"
//                       ? hrCategories
//                       : itCategories
//                     ).map((cat) => (
//                       <option key={cat} value={cat}>
//                         {cat}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Age Filters */}
//                   {["0-7", "8-15", "16-30", "31+"].map((range) => (
//                     <button
//                       key={range}
//                       onClick={() => handleAgeFilter(range)}
//                       className={`px-2.5 py-1.5 text-xs rounded-md font-semibold transition-all ${
//                         selectedAgeFilter === range
//                           ? "bg-blue-600 text-white shadow-md"
//                           : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
//                       }`}
//                     >
//                       {range}d
//                     </button>
//                   ))}

//                   {/* Clear Age */}
//                   {selectedAgeFilter && (
//                     <button
//                       onClick={() => {
//                         setSelectedAgeFilter(null);
//                         setFilters((prev) => ({
//                           ...prev,
//                           createdAfter: null,
//                           createdBefore: null,
//                         }));
//                       }}
//                       className="text-xs text-red-600 hover:text-red-800 font-medium px-2"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Table Section */}
//           <div className="p-0">
//             {loading ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                   <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
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
//                           className="hover:bg-blue-50 transition-colors cursor-pointer"
//                           onClick={() => setSelectedTicket(ticket)}
//                           onDoubleClick={() => {
//                             setIsTicketModalOpen(true);
//                             setSelectedTicketId(ticket.id);
//                           }}
//                         >
//                           <td className="px-4 py-3 text-sm font-semibold text-blue-600">
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

//                           {/* <td className="px-4 py-3 text-sm">
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
//                           </td> */}

//                           <td className="px-4 py-3 text-sm">
//                             {userRole !== "user" ? (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setSelectedUser(ticket.assignee?.employeeId);
//                                 }}
//                                 className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
//                               >
//                                 {ticket.assignee?.username || "Unassigned"}
//                               </button>
//                             ) : (
//                               <span className="text-gray-700 whitespace-nowrap">
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
//                                 className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
//                               >
//                                 {ticket.employee?.username || "Unassigned"}
//                               </button>
//                             ) : (
//                               <span className="text-gray-700 whitespace-nowrap">
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
//                                       ticket.firstRespondedAt.split(".")[0],
//                                     ),
//                                     "d/M/yyyy",
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {formatDistanceToNow(
//                                     parseISO(
//                                       ticket.firstRespondedAt.split(".")[0],
//                                     ),
//                                     {
//                                       addSuffix: true,
//                                     },
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
//                                     "d/M/yyyy",
//                                   )}
//                                 </div>
//                                 <div
//                                   className={`text-xs font-semibold ${
//                                     isBefore(
//                                       parseISO(ticket.dueDate),
//                                       new Date(),
//                                     )
//                                       ? "text-red-600"
//                                       : "text-green-600"
//                                   }`}
//                                 >
//                                   {formatDistanceToNow(
//                                     parseISO(ticket.dueDate.split(".")[0]),
//                                     { addSuffix: true },
//                                   )}
//                                   {isBefore(
//                                     parseISO(ticket.dueDate),
//                                     new Date(),
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
//                                     "d/M/yyyy",
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-blue-600">
//                                   {formatDistanceToNow(
//                                     parseISO(ticket.lastUpdated.split(".")[0]),
//                                     { addSuffix: true },
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
//                                     "d/M/yyyy",
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-green-600">
//                                   {formatDistanceToNow(
//                                     parseISO(ticket.closedAt.split(".")[0]),
//                                     { addSuffix: true },
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
//       {/* </div> */}
//       {selectedTicket && (
//         <div
//           className={`fixed top-[64px] right-0 h-[calc(100%-64px)] bg-white border-l-2 border-blue-500 shadow-2xl overflow-y-auto z-40 transition-all duration-300 ease-in-out ${
//             isMaximized ? "w-full md:w-full" : "w-full md:w-[400px]"
//           }`}
//         >
//           <div className=" bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 shadow-lg z-10">
//             <div className="flex items-start justify-between">
//               <div className="text-base font-bold text-green-600 bg-green-100 px-3 py-1 rounded-lg shadow-sm">
//                 #{selectedTicket?.id || "—"}
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
//                   title="IT Approval Policy"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setIsApprovalModalOpen(true);
//                   }}
//                 >
//                   <FileText className="w-5 h-5 text-white" />
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
//             <div className="flex-1 pr-2">
//               <h2 className="text-lg font-bold text-white">
//                 {selectedTicket.title}
//               </h2>
//               <p className="text-sm text-blue-100 mt-1 whitespace-pre-wrap break-words">
//                 {selectedTicket.description}
//               </p>
//             </div>
//           </div>

//           <div className="p-4">
//             {/* Messages Section */}
//             <div className="mb-4">
//               <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
//                 <span className="w-1 h-4 bg-blue-600 rounded"></span>
//                 Conversation
//               </h3>
//               <div className="space-y-3 pr-2">
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
//                             : "bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500"
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
//             <div className="mt-6 pt-4 border-t-2 border-gray-200">
//               <div className="relative">
//                 <textarea
//                   className={`w-full p-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 resize text-sm transition-all ${
//                     messageType === "INTERNAL_NOTE"
//                       ? "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
//                       : "border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
//                       className="absolute bottom-3 right-24 text-gray-500 hover:text-blue-600 transition-colors p-1"
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
//                             : "PUBLIC_RESPONSE",
//                         )
//                       }
//                       className={`absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
//                         messageType === "INTERNAL_NOTE"
//                           ? "bg-yellow-200 text-yellow-800 border-2 border-yellow-400"
//                           : "bg-blue-200 text-blue-800 border-2 border-blue-400"
//                       }`}
//                       title="Toggle Message Type"
//                     >
//                       {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}
//                     </button>
//                   </>
//                 )}

//                 {showPredefined && (
//                   <div className="absolute right-12 bottom-full mb-2 z-20 w-72 bg-white shadow-2xl border-2 border-gray-200 rounded-xl overflow-hidden">
//                     <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2">
//                       <h4 className="text-sm font-semibold text-white">
//                         Quick Replies
//                       </h4>
//                     </div>
//                     <div className="max-h-48 overflow-auto">
//                       {predefinedMessages.map((msg, idx) => (
//                         <div
//                           key={idx}
//                           onClick={() => handleSelectPredefined(msg)}
//                           className="px-3 py-2.5 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 text-sm text-gray-700 transition-colors"
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
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
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
//                             className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700"
//                             onClick={async () => {
//                               setDropdownOpen(false);
//                               try {
//                                 await handleAddMessage();
//                                 await handleCloseTicket();
//                                 toast.success(
//                                   "Message sent and ticket resolved.",
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
//       // In your JSX
//       {isApprovalModalOpen && (
//         <ITApprovalModal
//           ticket={selectedTicket}
//           open={isApprovalModalOpen}
//           onClose={() => setIsApprovalModalOpen(false)}
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
import ITApprovalModal from "./ITApprovalHelper";
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
import { FileText } from "lucide-react";
import { MoreVertical, Filter, X, Send, MessageSquare, User, Calendar, Clock, ChevronLeft, ChevronRight, Download } from "lucide-react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminTicketingPortal() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showPredefined, setShowPredefined] = useState(false);
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
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

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
    "CUG_SIM",
    "ZOHO_SUPPORT",
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

      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key],
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
    setPage(0);
  };

  useEffect(() => {
    fetchTicketsWithFilters(0);
  }, [filters]);

  const handleCloseTicket = async () => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(selectedTicket.id, "RESOLVED");
      toast.success("Status updated");
      fetchTicketsWithFilters();
      if (selectedTicket) {
        const updatedRes = await fetchFilteredTickets({ id: selectedTicket.id });
        if (updatedRes?.data?.content?.[0]) {
          setSelectedTicket(updatedRes.data.content[0]);
        }
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenApprovalModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsApprovalModalOpen(true);
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
        messageDTO,
      );

      setNewMessage("");

      const updatedMessages = [
        ...selectedTicket.messages,
        {
          sender: savedMessage.sender,
          message: savedMessage.message,
          ticketMessageType: savedMessage.ticketMessageType,
          sentAt: new Date(savedMessage.sentAt || Date.now()),
        },
      ];

      setSelectedTicket((prev) => ({
        ...prev,
        messages: updatedMessages,
        lastUpdated: new Date().toISOString(),
      }));

      scrollToBottom();
    } catch (error) {
      console.error("Error adding message: ", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (selectedTicket && isChatModalOpen) {
      scrollToBottom();
    }
  }, [selectedTicket, isChatModalOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleFilterChange("search", searchInput.trim());
  };

  const handleDownloadTickets = async () => {
    try {
      const params = { ...filters };
      delete params.page;
      delete params.size;

      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key],
      );

      const response = await downloadFilteredTickets(params);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "IN_PROGRESS": return "bg-amber-100 text-amber-700 border-amber-200";
      case "RESOLVED": return "bg-blue-100 text-blue-700 border-blue-200";
      case "CLOSED": return "bg-gray-100 text-gray-700 border-gray-200";
      case "WAITING": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const openChatModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedTicket(null);
  };

  const handleTicketUpdate = async () => {
    await fetchTicketsWithFilters();
    if (selectedTicket) {
      const updatedRes = await fetchFilteredTickets({ id: selectedTicket.id });
      if (updatedRes?.data?.content?.[0]) {
        setSelectedTicket(updatedRes.data.content[0]);
      }
    }
  };

  return (
    <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <TicketModal
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          fetchTicketsWithFilters();
        }}
        className="z-50"
      />

      <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden m-4">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              {/* <h1 className="text-xl font-bold text-white">Ticket Management</h1> */}
              
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-lg"
              >
                <span>+</span>
                <span>Create Ticket</span>
              </button>

              <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              
              <button
                onClick={handleDownloadTickets}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-lg"
                disabled={loading}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>

              <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                {paginationInfo.totalElements} Total
              </div>

              <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => {
                    const newPage = Math.max(page - 1, 0);
                    setPage(newPage);
                    fetchTicketsWithFilters(newPage);
                  }}
                  disabled={page === 0}
                  className="px-2 py-1 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-white text-sm px-2">
                  {page + 1} / {paginationInfo.totalPages || 1}
                </span>
                <button
                  onClick={() => {
                    const newPage = page + 1 < paginationInfo.totalPages ? page + 1 : page;
                    setPage(newPage);
                    fetchTicketsWithFilters(newPage);
                  }}
                  disabled={paginationInfo.last}
                  className="px-2 py-1 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="text-sm p-2 pl-8 w-48 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <svg
                  className="w-4 h-4 text-white/50 absolute left-2 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </form>
            </div>
            </div>

            
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filters.status || ""}
                onChange={(e) => handleFilterChange("status", e.target.value || null)}
                className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="OPEN">Open</option>
                <option value="WAITING">Waiting</option>
                <option value="CLOSED">Closed</option>
                <option value="RESOLVED">Resolved</option>
                <option value="UNASSIGNED">Unassigned</option>
              </select>

              <select
                value={filters.assigneeId || ""}
                onChange={(e) => handleFilterChange("assigneeId", e.target.value || null)}
                className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Assignees</option>
                {assignees.map(({ employeeId, name }) => (
                  <option key={employeeId} value={employeeId}>{name}</option>
                ))}
              </select>

              <select
                value={filters.siteIdLocationId || ""}
                onChange={(e) => handleFilterChange("siteIdLocationId", e.target.value || null)}
                className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sites</option>
                {sites.map(({ siteId, name }) => (
                  <option key={siteId} value={siteId}>{name}</option>
                ))}
              </select>

              <select
                value={filters.locationId || ""}
                onChange={(e) => handleFilterChange("locationId", e.target.value || null)}
                className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>

              <select
                value={filters.category || ""}
                onChange={(e) => handleFilterChange("category", e.target.value || null)}
                className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {(userRole === "HR_ADMIN" ? hrCategories : itCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {["0-7", "8-15", "16-30", "31+"].map((range) => (
                <button
                  key={range}
                  onClick={() => handleAgeFilter(range)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                    selectedAgeFilter === range
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {range}d
                </button>
              ))}

              {selectedAgeFilter && (
                <button
                  onClick={() => {
                    setSelectedAgeFilter(null);
                    setFilters(prev => ({ ...prev, createdAfter: null, createdBefore: null }));
                  }}
                  className="text-xs text-red-600 hover:text-red-800 font-medium px-2"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">Loading tickets...</p>
              </div>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <MessageSquare className="w-20 h-20 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No tickets found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0 z-10">
                    <tr>
                      {["ID", "Subject", "Status", "Category", "Location", "Assignee", "Employee", "Created", "Due Date", "Actions"].map((header, i) => (
                        <th key={i} className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-blue-50 transition-colors cursor-pointer group"
                        onClick={() => openChatModal(ticket)}
                      >
                        <td className="px-4 py-3 text-sm font-semibold text-blue-600">
                          #{ticket.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 min-w-[200px] max-w-[300px]">
                          <div className="truncate font-medium">{ticket.title}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                          {ticket.category}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                          {ticket.locationName || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {userRole !== "user" ? (
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.assignee?.employeeId); }}
                              className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
                            >
                              {ticket.assignee?.username || "Unassigned"}
                            </button>
                          ) : (
                            <span className="text-gray-700 whitespace-nowrap">{ticket.assignee?.username || "Unassigned"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {userRole !== "user" ? (
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.employee?.employeeId); }}
                              className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
                            >
                              {ticket.employee?.username || "Unassigned"}
                            </button>
                          ) : (
                            <span className="text-gray-700 whitespace-nowrap">{ticket.employee?.username || "Unassigned"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                          <div className="font-medium">{format(parseISO(ticket.createdAt), "d MMM yyyy")}</div>
                          <div className="text-xs text-gray-500">{formatDistanceToNow(parseISO(ticket.createdAt), { addSuffix: true })}</div>
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          {ticket.dueDate ? (
                            <>
                              <div className="font-medium">{format(parseISO(ticket.dueDate.split(".")[0]), "d MMM yyyy")}</div>
                              <div className={`text-xs font-semibold ${isBefore(parseISO(ticket.dueDate), new Date()) ? "text-red-600" : "text-green-600"}`}>
                                {formatDistanceToNow(parseISO(ticket.dueDate.split(".")[0]), { addSuffix: true })}
                              </div>
                            </>
                          ) : (
                            <span className="text-gray-400 italic text-xs">No due date</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
                            onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); setIsTicketModalOpen(true); }}
                          >
                            Actions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Chat Modal - Centered */}
{isChatModalOpen && selectedTicket && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1">
    {/* <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col"> */}

<div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[98vh] overflow-hidden flex flex-col">

      {/* Modal Header - Fixed */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="bg-white/20 p-2 rounded-xl flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-white truncate">{selectedTicket.title}</h2>
            <p className="text-sm text-blue-100">Ticket #{selectedTicket.id} • {selectedTicket.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsApprovalModalOpen(true)}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
            title="IT Approval Policy"
          >
            <FileText className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => { setSelectedTicketId(selectedTicket.id); setIsTicketModalOpen(true); }}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
            title="Ticket Actions"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
          <TicketAttachmentButton ticket={selectedTicket} />
          <button
            onClick={closeChatModal}
            className="p-2 rounded-lg bg-red-500/80 hover:bg-red-600 transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Ticket Info Bar */}
        <div className="bg-gray-50 px-6 py-3 border-b flex flex-wrap gap-4 text-sm flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(selectedTicket.status)}`}>
              {selectedTicket.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span>Requester: {selectedTicket.employee?.username || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span>Assignee: {selectedTicket.assignee?.username || "Unassigned"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Created: {format(parseISO(selectedTicket.createdAt), "d MMM yyyy")}</span>
          </div>
          {selectedTicket.dueDate && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Due: {format(parseISO(selectedTicket.dueDate), "d MMM yyyy")}</span>
            </div>
          )}
        </div>

        {/* Description Section */}
        {selectedTicket.description && (
          <div className="px-6 py-3 bg-blue-50/50 border-b flex-shrink-0">
            <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{selectedTicket.description}</p>
          </div>
        )}

        {/* Messages Area */}
        <div className="px-6 py-4">
          <div className="space-y-4">
            {selectedTicket.messages.filter(msg => {
              if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
              return userRole !== "user";
            }).length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              selectedTicket.messages.filter(msg => {
                if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
                return userRole !== "user";
              }).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
                    msg.sender === "You"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : msg.ticketMessageType === "INTERNAL_NOTE"
                      ? "bg-amber-100 text-gray-800 border-l-4 border-amber-400 rounded-bl-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-semibold ${msg.sender === "You" ? "text-blue-200" : "text-gray-500"}`}>
                        {msg.sender}
                      </span>
                      {msg.ticketMessageType === "INTERNAL_NOTE" && (
                        <span className="text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full">Internal</span>
                      )}
                      <span className={`text-xs ${msg.sender === "You" ? "text-blue-300" : "text-gray-400"}`}>
                        {format(parseISO(msg.sentAt), "d MMM yyyy, h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input Area - Fixed at bottom */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        <div className="relative">
          <textarea
            className={`w-full p-3 pr-24 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none text-sm transition-all ${
              messageType === "INTERNAL_NOTE"
                ? "border-amber-300 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            rows="3"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={messageType === "INTERNAL_NOTE" ? "Write an internal note (IT Team Only)..." : "Type your message..."}
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            {userRole !== "user" && (
              <>
                <button
                  type="button"
                  onClick={() => setShowPredefined(!showPredefined)}
                  className="text-gray-500 hover:text-blue-600 transition p-1"
                  title="Quick Replies"
                >
                  💬
                </button>
                <button
                  type="button"
                  onClick={() => setMessageType(prev => prev === "PUBLIC_RESPONSE" ? "INTERNAL_NOTE" : "PUBLIC_RESPONSE")}
                  className={`text-xs px-2 py-1 rounded-lg font-semibold transition ${
                    messageType === "INTERNAL_NOTE"
                      ? "bg-amber-200 text-amber-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {messageType === "INTERNAL_NOTE" ? "Note" : "Public"}
                </button>
              </>
            )}
            <button
              onClick={handleAddMessage}
              disabled={isSending || !newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        {showPredefined && (
          <div className="mt-2 p-2 bg-gray-50 rounded-xl border max-h-32 overflow-auto">
            <div className="flex flex-wrap gap-1">
              {predefinedMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPredefined(msg)}
                  className="text-xs bg-white border rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition truncate max-w-[200px]"
                >
                  {msg.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        )}
        {userRole !== "user" && (
          <div className="flex gap-2 mt-3 relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition"
            >
              More Actions ▼
            </button>
            {dropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-white border rounded-xl shadow-lg overflow-hidden z-20 min-w-[200px]">
                <button
                  onClick={async () => {
                    setDropdownOpen(false);
                    await handleAddMessage();
                    await handleCloseTicket();
                    toast.success("Message sent and ticket resolved.");
                    handleTicketUpdate();
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition"
                >
                  ✅ Send & Close Ticket
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
)}

      {Boolean(selectedUser) && (
        <UserDetailsModal query={selectedUser} isOpen onClose={() => setSelectedUser(null)} />
      )}

      {isTicketModalOpen && (
        <TicketActionModal
          ticketId={selectedTicketId}
          open={isTicketModalOpen}
          onClose={() => {
            setIsTicketModalOpen(false);
            handleTicketUpdate();
          }}
        />
      )}

      {isApprovalModalOpen && (
        <ITApprovalModal
          ticket={selectedTicket}
          open={isApprovalModalOpen}
          onClose={() => setIsApprovalModalOpen(false)}
        />
      )}
    </div>
  );
}

