

// // import UserDetailsModal from "../components/UserDetailsModal";
// // import {
// //   addMessageToTicket,
// //   hasRole,
// //   updateTicketStatus,
// //   getAssignees,
// //   fetchSites,
// //   fetchFilteredTickets,
// //   downloadFilteredTickets,
// //   getLocationsBySite,
// // } from "../services/api";
// // import ITApprovalModal from "../components/ITApprovalHelper";
// // import TicketActionModal from "../components/TicketActionModal";
// // import TicketAttachmentButton from "../components/TicketAttachmentButton";
// // import TicketModal from "../components/TicketFormModal";
// // import { Button, Card } from "../components/ui";
// // import {
// //   format,
// //   formatDistanceToNow,
// //   parseISO,
// //   isBefore,
// //   subDays,
// // } from "date-fns";
// // import dayjs from "dayjs";
// // import { FileText } from "lucide-react";
// // import { MoreVertical, Filter, X, Send, MessageSquare, User, Calendar, Clock, ChevronLeft, ChevronRight, Download } from "lucide-react";
// // import React from "react";
// // import { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";

// // export default function AdminTicketingPortal() {
// //   const [tickets, setTickets] = useState([]);
// //   const [filteredTickets, setFilteredTickets] = useState([]);
// //   const [selectedTicket, setSelectedTicket] = useState(null);
// //   const [selectedTicketId, setSelectedTicketId] = useState(null);
// //   const [showPredefined, setShowPredefined] = useState(false);
// //   const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
// //   const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [assignees, setAssignees] = useState([]);
// //   const navigate = useNavigate();
// //   const [isUpdating, setIsUpdating] = useState(false);
// //   const [userRole, setUserRole] = useState("");
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [searchInput, setSearchInput] = useState("");
// //   const [page, setPage] = useState(0);
// //   const [isSending, setIsSending] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [sites, setSites] = useState([]);
// //   const [locations, setLocations] = React.useState([]);
// //   const [form, setForm] = React.useState({ site: null, location: null });
// //   const [size, setSize] = useState(30);
// //   const [showFilters, setShowFilters] = useState(true);
// //   const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
// //   const [paginationInfo, setPaginationInfo] = useState({
// //     totalElements: 0,
// //     totalPages: 0,
// //     last: false,
// //   });
// //   const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [isChatModalOpen, setIsChatModalOpen] = useState(false);
// //   const messagesEndRef = useRef(null);

// //   // Unified filter state
// //   const [filters, setFilters] = useState({
// //     title: "",
// //     status: "OPEN",
// //     category: null,
// //     employeeId: null,
// //     locationId: null,
// //     siteIdLocationId: null,
// //     search: null,
// //     assigneeId: null,
// //     createdAfter: null,
// //     createdBefore: null,
// //   });

// //   const itCategories = [
// //     "HARDWARE",
// //     "SOFTWARE",
// //     "NETWORK",
// //     "PRINTER",
// //     "UPS",
// //     "CCTV",
// //     "FOCUS",
// //     "EMAIL",
// //     "DMS",
// //     "WORKSHOP_DIAGNOSTIC_TOOLS",
// //     "OTHER",
// //     "MAINTENANCE",
// //     "NEW_PROJECT",
// //     "CUG_SIM",
// //     "ZOHO_SUPPORT",
// //   ];

// //   const hrCategories = [
// //     "PAYROLL",
// //     "RECRUITMENT",
// //     "HR_OPERATIONS",
// //     "GENERAL_HR_QUERIES",
// //   ];

// //   const predefinedMessages = [
// //     "Dear Sir, thank you for your patience.",
// //     "Dear Team, we are currently looking into your issue.",
// //     "Dear User, could you please provide more details?",
// //     "Dear Sir/Madam, this ticket has been resolved.",
// //     "Dear Team, we appreciate your understanding and cooperation.",
// //     "Dear User, our team is diligently investigating this matter.",
// //     "Dear Sir, please let us know if you have any further questions.",
// //     "Dear Team, thank you for bringing this important matter to our attention.",
// //     "Dear User, we will update you as soon as possible.",
// //     "Dear Sir/Madam, your feedback is highly valuable to us.",
// //     "Dear Team, we are committed to resolving your issue promptly.",
// //     "Dear User, thank you for working with us to find a solution.",
// //     "Dear Sir, please rest assured that we are prioritizing your ticket.",
// //     "Dear Team, feel free to reach out for any additional assistance.",
// //     "Dear User, we sincerely apologize for any inconvenience caused.",
// //   ];

// //   const handleSelectPredefined = (msg) => {
// //     setNewMessage(msg);
// //     setShowPredefined(false);
// //   };

// //   // Age filter handler
// //   const handleAgeFilter = (ageRange) => {
// //     const now = new Date();
// //     let createdAfter = null;
// //     let createdBefore = null;

// //     switch (ageRange) {
// //       case "0-7":
// //         createdAfter = subDays(now, 7).toISOString();
// //         createdBefore = now.toISOString();
// //         break;
// //       case "8-15":
// //         createdAfter = subDays(now, 15).toISOString();
// //         createdBefore = subDays(now, 8).toISOString();
// //         break;
// //       case "16-30":
// //         createdAfter = subDays(now, 30).toISOString();
// //         createdBefore = subDays(now, 16).toISOString();
// //         break;
// //       case "31+":
// //         createdAfter = null;
// //         createdBefore = subDays(now, 31).toISOString();
// //         break;
// //       default:
// //         createdAfter = null;
// //         createdBefore = null;
// //     }

// //     setSelectedAgeFilter(ageRange);
// //     setFilters((prev) => ({
// //       ...prev,
// //       createdAfter,
// //       createdBefore,
// //     }));
// //     setPage(0);
// //   };

// //   // Unified fetch function
// //   const fetchTicketsWithFilters = async (customPage = page) => {
// //     setLoading(true);
// //     try {
// //       const params = {
// //         ...filters,
// //         page: customPage,
// //         size,
// //       };

// //       Object.keys(params).forEach(
// //         (key) => params[key] == null && delete params[key],
// //       );

// //       const res = await fetchFilteredTickets(params);

// //       const {
// //         content = [],
// //         page: pageNumber,
// //         size: pageSize,
// //         totalElements,
// //         totalPages,
// //         last,
// //       } = res?.data || {};

// //       setFilteredTickets(content);
// //       setPaginationInfo({ totalElements, totalPages, last });
// //       setPage(pageNumber);
// //       setSize(pageSize);
// //     } catch (error) {
// //       console.error("Error fetching tickets:", error);
// //       toast.error("Failed to fetch tickets");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle filter changes
// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => ({ ...prev, [key]: value }));
// //     setPage(0);
// //   };

// //   useEffect(() => {
// //     fetchTicketsWithFilters(0);
// //   }, [filters]);

// //   const handleCloseTicket = async () => {
// //     setIsUpdating(true);
// //     try {
// //       await updateTicketStatus(selectedTicket.id, "RESOLVED");
// //       toast.success("Status updated");
// //       fetchTicketsWithFilters();
// //       if (selectedTicket) {
// //         const updatedRes = await fetchFilteredTickets({ id: selectedTicket.id });
// //         if (updatedRes?.data?.content?.[0]) {
// //           setSelectedTicket(updatedRes.data.content[0]);
// //         }
// //       }
// //     } catch (error) {
// //       toast.error("Failed to update status");
// //       console.error("Error updating status:", error);
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   const handleOpenApprovalModal = (ticket) => {
// //     setSelectedTicket(ticket);
// //     setIsApprovalModalOpen(true);
// //   };

// //   const handleAddMessage = async () => {
// //     if (!newMessage.trim()) return;

// //     setIsSending(true);
// //     try {
// //       const messageDTO = {
// //         message: newMessage,
// //         sender: "You",
// //         ticketMessageType: messageType,
// //       };

// //       const savedMessage = await addMessageToTicket(
// //         selectedTicket.id,
// //         messageDTO,
// //       );

// //       setNewMessage("");

// //       const updatedMessages = [
// //         ...selectedTicket.messages,
// //         {
// //           sender: savedMessage.sender,
// //           message: savedMessage.message,
// //           ticketMessageType: savedMessage.ticketMessageType,
// //           sentAt: new Date(savedMessage.sentAt || Date.now()),
// //         },
// //       ];

// //       setSelectedTicket((prev) => ({
// //         ...prev,
// //         messages: updatedMessages,
// //         lastUpdated: new Date().toISOString(),
// //       }));

// //       scrollToBottom();
// //     } catch (error) {
// //       console.error("Error adding message: ", error);
// //       toast.error("Failed to send message");
// //     } finally {
// //       setIsSending(false);
// //     }
// //   };

// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //     }, 100);
// //   };

// //   useEffect(() => {
// //     if (selectedTicket && isChatModalOpen) {
// //       scrollToBottom();
// //     }
// //   }, [selectedTicket, isChatModalOpen]);

// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault();
// //     handleFilterChange("search", searchInput.trim());
// //   };

// //   const handleDownloadTickets = async () => {
// //     try {
// //       const params = { ...filters };
// //       delete params.page;
// //       delete params.size;

// //       Object.keys(params).forEach(
// //         (key) => params[key] == null && delete params[key],
// //       );

// //       const response = await downloadFilteredTickets(params);

// //       const blob = new Blob([response.data], {
// //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       });
// //       const url = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.setAttribute(
// //         "download",
// //         `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`,
// //       );
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();
// //       window.URL.revokeObjectURL(url);

// //       toast.success("Tickets downloaded successfully");
// //     } catch (error) {
// //       console.error("Error downloading tickets:", error);
// //       toast.error("Failed to download tickets");
// //     }
// //   };

// //   useEffect(() => {
// //     let role = "user";
// //     if (hasRole("ADMIN") || hasRole("MANAGER")) {
// //       role = "ADMIN";
// //     }
// //     if (hasRole("HR_ADMIN")) {
// //       role = "HR_ADMIN";
// //     }
// //     setUserRole(role);
// //   }, []);

// //   useEffect(() => {
// //     getAssignees()
// //       .then((res) => {
// //         const formatted = res.data.map((user) => ({
// //           employeeId: user.employeeId,
// //           name: user.username,
// //         }));
// //         setAssignees(formatted);
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch assignees", err);
// //       });
// //   }, []);

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
// //     if (filters.siteIdLocationId) {
// //       getLocationsBySite(filters.siteIdLocationId)
// //         .then((locations) => {
// //           setLocations(locations);
// //         })
// //         .catch((err) => {
// //           console.error("Error fetching locations", err);
// //         });
// //     } else {
// //       setLocations([]);
// //     }
// //   }, [filters.siteIdLocationId]);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "OPEN": return "bg-emerald-100 text-emerald-700 border-emerald-200";
// //       case "IN_PROGRESS": return "bg-amber-100 text-amber-700 border-amber-200";
// //       case "RESOLVED": return "bg-blue-100 text-blue-700 border-blue-200";
// //       case "CLOSED": return "bg-gray-100 text-gray-700 border-gray-200";
// //       case "WAITING": return "bg-purple-100 text-purple-700 border-purple-200";
// //       default: return "bg-gray-100 text-gray-700 border-gray-200";
// //     }
// //   };

// //   const openChatModal = (ticket) => {
// //     setSelectedTicket(ticket);
// //     setIsChatModalOpen(true);
// //   };

// //   const closeChatModal = () => {
// //     setIsChatModalOpen(false);
// //     setSelectedTicket(null);
// //   };

// //   const handleTicketUpdate = async () => {
// //     await fetchTicketsWithFilters();
// //     if (selectedTicket) {
// //       const updatedRes = await fetchFilteredTickets({ id: selectedTicket.id });
// //       if (updatedRes?.data?.content?.[0]) {
// //         setSelectedTicket(updatedRes.data.content[0]);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// //       <TicketModal
// //         isOpen={isDialogOpen}
// //         onClose={() => {
// //           setIsDialogOpen(false);
// //           fetchTicketsWithFilters();
// //         }}
// //         className="z-50"
// //       />

// //       <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden m-4">
// //         {/* Modern Header */}
// //         <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
// //           <div className="flex flex-wrap gap-3 items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="bg-white/10 p-2 rounded-xl">
// //                 <MessageSquare className="w-5 h-5 text-white" />
// //               </div>
// //               {/* <h1 className="text-xl font-bold text-white">Ticket Management</h1> */}
              
// //               <button
// //                 onClick={() => setIsDialogOpen(true)}
// //                 className="flex items-center gap-1.5 px-3 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-lg"
// //               >
// //                 <span>+</span>
// //                 <span>Create Ticket</span>
// //               </button>

// //               <div className="flex items-center gap-2 flex-wrap">
// //               <button
// //                 onClick={() => setShowFilters(!showFilters)}
// //                 className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
// //               >
// //                 <Filter className="w-4 h-4" />
// //                 {showFilters ? "Hide Filters" : "Show Filters"}
// //               </button>

              
// //               <button
// //                 onClick={handleDownloadTickets}
// //                 className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-lg"
// //                 disabled={loading}
// //               >
// //                 <Download className="w-4 h-4" />
// //                 <span>Export</span>
// //               </button>

// //               <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
// //                 {paginationInfo.totalElements} Total
// //               </div>

// //               <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
// //                 <button
// //                   onClick={() => {
// //                     const newPage = Math.max(page - 1, 0);
// //                     setPage(newPage);
// //                     fetchTicketsWithFilters(newPage);
// //                   }}
// //                   disabled={page === 0}
// //                   className="px-2 py-1 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
// //                 >
// //                   <ChevronLeft className="w-4 h-4" />
// //                 </button>
// //                 <span className="text-white text-sm px-2">
// //                   {page + 1} / {paginationInfo.totalPages || 1}
// //                 </span>
// //                 <button
// //                   onClick={() => {
// //                     const newPage = page + 1 < paginationInfo.totalPages ? page + 1 : page;
// //                     setPage(newPage);
// //                     fetchTicketsWithFilters(newPage);
// //                   }}
// //                   disabled={paginationInfo.last}
// //                   className="px-2 py-1 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
// //                 >
// //                   <ChevronRight className="w-4 h-4" />
// //                 </button>
// //               </div>

// //               <form onSubmit={handleSearchSubmit} className="relative">
// //                 <input
// //                   type="text"
// //                   placeholder="Search tickets..."
// //                   className="text-sm p-2 pl-8 w-48 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
// //                   value={searchInput}
// //                   onChange={(e) => setSearchInput(e.target.value)}
// //                 />
// //                 <svg
// //                   className="w-4 h-4 text-white/50 absolute left-2 top-1/2 -translate-y-1/2"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
// //                 </svg>
// //               </form>
// //             </div>
// //             </div>

            
// //           </div>
// //         </div>

// //         {/* Filters Section */}
// //         {showFilters && (
// //           <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
// //             <div className="flex flex-wrap items-center gap-2">
// //               <select
// //                 value={filters.status || ""}
// //                 onChange={(e) => handleFilterChange("status", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Status</option>
// //                 <option value="OPEN">Open</option>
// //                 <option value="WAITING">Waiting</option>
// //                 <option value="CLOSED">Closed</option>
// //                 <option value="RESOLVED">Resolved</option>
// //                 <option value="UNASSIGNED">Unassigned</option>
// //               </select>

// //               <select
// //                 value={filters.assigneeId || ""}
// //                 onChange={(e) => handleFilterChange("assigneeId", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Assignees</option>
// //                 {assignees.map(({ employeeId, name }) => (
// //                   <option key={employeeId} value={employeeId}>{name}</option>
// //                 ))}
// //               </select>

// //               <select
// //                 value={filters.siteIdLocationId || ""}
// //                 onChange={(e) => handleFilterChange("siteIdLocationId", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Sites</option>
// //                 {sites.map(({ siteId, name }) => (
// //                   <option key={siteId} value={siteId}>{name}</option>
// //                 ))}
// //               </select>

// //               <select
// //                 value={filters.locationId || ""}
// //                 onChange={(e) => handleFilterChange("locationId", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Locations</option>
// //                 {locations.map((loc) => (
// //                   <option key={loc.id} value={loc.id}>{loc.name}</option>
// //                 ))}
// //               </select>

// //               <select
// //                 value={filters.category || ""}
// //                 onChange={(e) => handleFilterChange("category", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Categories</option>
// //                 {(userRole === "HR_ADMIN" ? hrCategories : itCategories).map((cat) => (
// //                   <option key={cat} value={cat}>{cat}</option>
// //                 ))}
// //               </select>

// //               {["0-7", "8-15", "16-30", "31+"].map((range) => (
// //                 <button
// //                   key={range}
// //                   onClick={() => handleAgeFilter(range)}
// //                   className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
// //                     selectedAgeFilter === range
// //                       ? "bg-blue-600 text-white shadow-md"
// //                       : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
// //                   }`}
// //                 >
// //                   {range}d
// //                 </button>
// //               ))}

// //               {selectedAgeFilter && (
// //                 <button
// //                   onClick={() => {
// //                     setSelectedAgeFilter(null);
// //                     setFilters(prev => ({ ...prev, createdAfter: null, createdBefore: null }));
// //                   }}
// //                   className="text-xs text-red-600 hover:text-red-800 font-medium px-2"
// //                 >
// //                   ✕ Clear
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Table Section */}
// //         <div className="p-0">
// //           {loading ? (
// //             <div className="flex items-center justify-center h-64">
// //               <div className="text-center">
// //                 <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
// //                 <p className="text-gray-600 font-medium">Loading tickets...</p>
// //               </div>
// //             </div>
// //           ) : filteredTickets.length === 0 ? (
// //             <div className="flex flex-col items-center justify-center h-64 text-gray-500">
// //               <MessageSquare className="w-20 h-20 mb-4 text-gray-300" />
// //               <p className="text-lg font-medium">No tickets found</p>
// //               <p className="text-sm mt-1">Try adjusting your filters</p>
// //             </div>
// //           ) : (
// //             <div className="overflow-hidden">
// //               <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
// //                 <table className="min-w-full divide-y divide-gray-200">
// //                   <thead className="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0 z-10">
// //                     <tr>
// //                       {["ID", "Subject", "Status", "Category", "Location", "Assignee", "Employee", "Created", "Due Date", "Actions"].map((header, i) => (
// //                         <th key={i} className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
// //                           {header}
// //                         </th>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-100">
// //                     {filteredTickets.map((ticket) => (
// //                       <tr
// //                         key={ticket.id}
// //                         className="hover:bg-blue-50 transition-colors cursor-pointer group"
// //                         onClick={() => openChatModal(ticket)}
// //                       >
// //                         <td className="px-4 py-3 text-sm font-semibold text-blue-600">
// //                           #{ticket.id}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-800 min-w-[200px] max-w-[300px]">
// //                           <div className="truncate font-medium">{ticket.title}</div>
// //                         </td>
// //                         <td className="px-4 py-3">
// //                           <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
// //                             {ticket.status.replace("_", " ")}
// //                           </span>
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
// //                           {ticket.category}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
// //                           {ticket.locationName || "—"}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm">
// //                           {userRole !== "user" ? (
// //                             <button
// //                               onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.assignee?.employeeId); }}
// //                               className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
// //                             >
// //                               {ticket.assignee?.username || "Unassigned"}
// //                             </button>
// //                           ) : (
// //                             <span className="text-gray-700 whitespace-nowrap">{ticket.assignee?.username || "Unassigned"}</span>
// //                           )}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm">
// //                           {userRole !== "user" ? (
// //                             <button
// //                               onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.employee?.employeeId); }}
// //                               className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
// //                             >
// //                               {ticket.employee?.username || "Unassigned"}
// //                             </button>
// //                           ) : (
// //                             <span className="text-gray-700 whitespace-nowrap">{ticket.employee?.username || "Unassigned"}</span>
// //                           )}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
// //                           <div className="font-medium">{format(parseISO(ticket.createdAt), "d MMM yyyy")}</div>
// //                           <div className="text-xs text-gray-500">{formatDistanceToNow(parseISO(ticket.createdAt), { addSuffix: true })}</div>
// //                         </td>
// //                         <td className="px-4 py-3 text-sm whitespace-nowrap">
// //                           {ticket.dueDate ? (
// //                             <>
// //                               <div className="font-medium">{format(parseISO(ticket.dueDate.split(".")[0]), "d MMM yyyy")}</div>
// //                               <div className={`text-xs font-semibold ${isBefore(parseISO(ticket.dueDate), new Date()) ? "text-red-600" : "text-green-600"}`}>
// //                                 {formatDistanceToNow(parseISO(ticket.dueDate.split(".")[0]), { addSuffix: true })}
// //                               </div>
// //                             </>
// //                           ) : (
// //                             <span className="text-gray-400 italic text-xs">No due date</span>
// //                           )}
// //                         </td>
// //                         <td className="px-4 py-3">
// //                           <button
// //                             className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
// //                             onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); setIsTicketModalOpen(true); }}
// //                           >
// //                             Actions
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </Card>

// //       {/* Chat Modal - Centered */}
// // {isChatModalOpen && selectedTicket && (
// //   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1">
// //     {/* <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col"> */}

// // <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[98vh] overflow-hidden flex flex-col">

// //       {/* Modal Header - Fixed */}
// //       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
// //         <div className="flex items-center gap-3 min-w-0 flex-1">
// //           <div className="bg-white/20 p-2 rounded-xl flex-shrink-0">
// //             <MessageSquare className="w-5 h-5 text-white" />
// //           </div>
// //           <div className="min-w-0 flex-1">
// //             <h2 className="text-lg font-bold text-white truncate">{selectedTicket.title}</h2>
// //             <p className="text-sm text-blue-100">Ticket #{selectedTicket.id} • {selectedTicket.category}</p>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-2 flex-shrink-0">
// //           <button
// //             onClick={() => setIsApprovalModalOpen(true)}
// //             className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
// //             title="IT Approval Policy"
// //           >
// //             <FileText className="w-5 h-5 text-white" />
// //           </button>
// //           <button
// //             onClick={() => { setSelectedTicketId(selectedTicket.id); setIsTicketModalOpen(true); }}
// //             className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
// //             title="Ticket Actions"
// //           >
// //             <MoreVertical className="w-5 h-5 text-white" />
// //           </button>
// //           <TicketAttachmentButton ticket={selectedTicket} />
// //           <button
// //             onClick={closeChatModal}
// //             className="p-2 rounded-lg bg-red-500/80 hover:bg-red-600 transition"
// //           >
// //             <X className="w-5 h-5 text-white" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Scrollable Content Area */}
// //       <div className="flex-1 overflow-y-auto min-h-0">
// //         {/* Ticket Info Bar */}
// //         <div className="bg-gray-50 px-6 py-3 border-b flex flex-wrap gap-4 text-sm flex-shrink-0">
// //           <div className="flex items-center gap-2">
// //             <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(selectedTicket.status)}`}>
// //               {selectedTicket.status}
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-2 text-gray-600">
// //             <User className="w-4 h-4" />
// //             <span>Requester: {selectedTicket.employee?.username || "Unknown"}</span>
// //           </div>
// //           <div className="flex items-center gap-2 text-gray-600">
// //             <User className="w-4 h-4" />
// //             <span>Assignee: {selectedTicket.assignee?.username || "Unassigned"}</span>
// //           </div>
// //           <div className="flex items-center gap-2 text-gray-600">
// //             <Calendar className="w-4 h-4" />
// //             <span>Created: {format(parseISO(selectedTicket.createdAt), "d MMM yyyy")}</span>
// //           </div>
// //           {selectedTicket.dueDate && (
// //             <div className="flex items-center gap-2 text-gray-600">
// //               <Clock className="w-4 h-4" />
// //               <span>Due: {format(parseISO(selectedTicket.dueDate), "d MMM yyyy")}</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Description Section */}
// //         {selectedTicket.description && (
// //           <div className="px-6 py-3 bg-blue-50/50 border-b flex-shrink-0">
// //             <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{selectedTicket.description}</p>
// //           </div>
// //         )}

// //         {/* Messages Area */}
// //         <div className="px-6 py-4">
// //           <div className="space-y-4">
// //             {selectedTicket.messages.filter(msg => {
// //               if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
// //               return userRole !== "user";
// //             }).length === 0 ? (
// //               <div className="text-center py-12 text-gray-400">
// //                 <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
// //                 <p className="text-sm">No messages yet. Start the conversation!</p>
// //               </div>
// //             ) : (
// //               selectedTicket.messages.filter(msg => {
// //                 if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
// //                 return userRole !== "user";
// //               }).map((msg, idx) => (
// //                 <div
// //                   key={idx}
// //                   className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
// //                 >
// //                   <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
// //                     msg.sender === "You"
// //                       ? "bg-blue-600 text-white rounded-br-none"
// //                       : msg.ticketMessageType === "INTERNAL_NOTE"
// //                       ? "bg-amber-100 text-gray-800 border-l-4 border-amber-400 rounded-bl-none"
// //                       : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
// //                   }`}>
// //                     <div className="flex items-center gap-2 mb-1 flex-wrap">
// //                       <span className={`text-xs font-semibold ${msg.sender === "You" ? "text-blue-200" : "text-gray-500"}`}>
// //                         {msg.sender}
// //                       </span>
// //                       {msg.ticketMessageType === "INTERNAL_NOTE" && (
// //                         <span className="text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full">Internal</span>
// //                       )}
// //                       <span className={`text-xs ${msg.sender === "You" ? "text-blue-300" : "text-gray-400"}`}>
// //                         {format(parseISO(msg.sentAt), "d MMM yyyy, h:mm a")}
// //                       </span>
// //                     </div>
// //                     <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //             <div ref={messagesEndRef} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Message Input Area - Fixed at bottom */}
// //       <div className="border-t bg-white p-4 flex-shrink-0">
// //         <div className="relative">
// //           <textarea
// //             className={`w-full p-3 pr-24 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none text-sm transition-all ${
// //               messageType === "INTERNAL_NOTE"
// //                 ? "border-amber-300 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
// //                 : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
// //             }`}
// //             rows="3"
// //             value={newMessage}
// //             onChange={(e) => setNewMessage(e.target.value)}
// //             placeholder={messageType === "INTERNAL_NOTE" ? "Write an internal note (IT Team Only)..." : "Type your message..."}
// //           />
// //           <div className="absolute bottom-3 right-3 flex gap-2">
// //             {userRole !== "user" && (
// //               <>
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPredefined(!showPredefined)}
// //                   className="text-gray-500 hover:text-blue-600 transition p-1"
// //                   title="Quick Replies"
// //                 >
// //                   💬
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => setMessageType(prev => prev === "PUBLIC_RESPONSE" ? "INTERNAL_NOTE" : "PUBLIC_RESPONSE")}
// //                   className={`text-xs px-2 py-1 rounded-lg font-semibold transition ${
// //                     messageType === "INTERNAL_NOTE"
// //                       ? "bg-amber-200 text-amber-800"
// //                       : "bg-blue-200 text-blue-800"
// //                   }`}
// //                 >
// //                   {messageType === "INTERNAL_NOTE" ? "Note" : "Public"}
// //                 </button>
// //               </>
// //             )}
// //             <button
// //               onClick={handleAddMessage}
// //               disabled={isSending || !newMessage.trim()}
// //               className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition disabled:opacity-50"
// //             >
// //               <Send className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //         {showPredefined && (
// //           <div className="mt-2 p-2 bg-gray-50 rounded-xl border max-h-32 overflow-auto">
// //             <div className="flex flex-wrap gap-1">
// //               {predefinedMessages.map((msg, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => handleSelectPredefined(msg)}
// //                   className="text-xs bg-white border rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition truncate max-w-[200px]"
// //                 >
// //                   {msg.substring(0, 30)}...
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //         {userRole !== "user" && (
// //           <div className="flex gap-2 mt-3 relative">
// //             <button
// //               onClick={() => {
// //                 setDropdownOpen(!dropdownOpen);
// //               }}
// //               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition"
// //             >
// //               More Actions ▼
// //             </button>
// //             {dropdownOpen && (
// //               <div className="absolute bottom-full right-0 mb-2 bg-white border rounded-xl shadow-lg overflow-hidden z-20 min-w-[200px]">
// //                 <button
// //                   onClick={async () => {
// //                     setDropdownOpen(false);
// //                     await handleAddMessage();
// //                     await handleCloseTicket();
// //                     toast.success("Message sent and ticket resolved.");
// //                     handleTicketUpdate();
// //                   }}
// //                   className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition"
// //                 >
// //                   ✅ Send & Close Ticket
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   </div>
// // )}

// //       {Boolean(selectedUser) && (
// //         <UserDetailsModal query={selectedUser} isOpen onClose={() => setSelectedUser(null)} />
// //       )}

// //       {isTicketModalOpen && (
// //         <TicketActionModal
// //           ticketId={selectedTicketId}
// //           open={isTicketModalOpen}
// //           onClose={() => {
// //             setIsTicketModalOpen(false);
// //             handleTicketUpdate();
// //           }}
// //         />
// //       )}

// //       {isApprovalModalOpen && (
// //         <ITApprovalModal
// //           ticket={selectedTicket}
// //           open={isApprovalModalOpen}
// //           onClose={() => setIsApprovalModalOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }




// // import UserDetailsModal from "../components/UserDetailsModal";
// // import {
// //   addMessageToTicket,
// //   hasRole,
// //   updateTicketStatus,
// //   getAssignees,
// //   fetchSites,
// //   fetchFilteredTickets,
// //   downloadFilteredTickets,
// //   getLocationsBySite,
// // } from "../services/api";
// // import ITApprovalModal from "../components/ITApprovalHelper";
// // import TicketActionModal from "../components/TicketActionModal";
// // import TicketAttachmentButton from "../components/TicketAttachmentButton";
// // import TicketModal from "../components/TicketFormModal";
// // import { Button, Card } from "../components/ui";
// // import {
// //   format,
// //   formatDistanceToNow,
// //   parseISO,
// //   isBefore,
// //   subDays,
// //   isValid,
// // } from "date-fns";
// // import dayjs from "dayjs";
// // import { FileText } from "lucide-react";
// // import { MoreVertical, Filter, X, Send, MessageSquare, User, Calendar, Clock, ChevronLeft, ChevronRight, Download } from "lucide-react";
// // import React from "react";
// // import { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";

// // export default function AdminTicketingPortal() {
// //   const [tickets, setTickets] = useState([]);
// //   const [filteredTickets, setFilteredTickets] = useState([]);
// //   const [selectedTicket, setSelectedTicket] = useState(null);
// //   const [selectedTicketId, setSelectedTicketId] = useState(null);
// //   const [showPredefined, setShowPredefined] = useState(false);
// //   const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
// //   const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [assignees, setAssignees] = useState([]);
// //   const navigate = useNavigate();
// //   const [isUpdating, setIsUpdating] = useState(false);
// //   const [userRole, setUserRole] = useState("");
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [searchInput, setSearchInput] = useState("");
// //   const [page, setPage] = useState(0);
// //   const [isSending, setIsSending] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [sites, setSites] = useState([]);
// //   const [locations, setLocations] = React.useState([]);
// //   const [form, setForm] = React.useState({ site: null, location: null });
// //   const [size, setSize] = useState(30);
// //   const [showFilters, setShowFilters] = useState(true);
// //   const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
// //   const [paginationInfo, setPaginationInfo] = useState({
// //     totalElements: 0,
// //     totalPages: 0,
// //     last: false,
// //   });
// //   const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [isChatModalOpen, setIsChatModalOpen] = useState(false);
// //   const messagesEndRef = useRef(null);

// //   // ========== HELPER FUNCTIONS FOR DATE HANDLING ==========
  
// //   // Parse any date format from backend
// //   const parseAnyDate = (dateValue) => {
// //     if (!dateValue) return null;
    
// //     // If it's already a Date object
// //     if (dateValue instanceof Date) return dateValue;
    
// //     // If it's a string
// //     if (typeof dateValue === 'string') {
// //       try {
// //         return parseISO(dateValue);
// //       } catch (e) {
// //         const parsed = new Date(dateValue);
// //         return isValid(parsed) ? parsed : null;
// //       }
// //     }
    
// //     // If it's an array (LocalDateTime serialization)
// //     if (Array.isArray(dateValue) && dateValue.length >= 3) {
// //       const [year, month, day, hour = 0, minute = 0, second = 0] = dateValue;
// //       return new Date(year, month - 1, day, hour, minute, second);
// //     }
    
// //     // If it's a number (timestamp)
// //     if (typeof dateValue === 'number') {
// //       return new Date(dateValue);
// //     }
    
// //     return null;
// //   };

// //   // Safe date formatter
// //   const formatDateSafely = (dateValue, formatString = "d MMM yyyy, h:mm a") => {
// //     const dateObj = parseAnyDate(dateValue);
// //     if (!dateObj || !isValid(dateObj)) return "—";
    
// //     try {
// //       return format(dateObj, formatString);
// //     } catch (error) {
// //       console.error("Date formatting error:", error);
// //       return "Invalid date";
// //     }
// //   };

// //   // Safe relative time formatter
// //   const formatRelativeTime = (dateValue) => {
// //     const dateObj = parseAnyDate(dateValue);
// //     if (!dateObj || !isValid(dateObj)) return "—";
    
// //     try {
// //       return formatDistanceToNow(dateObj, { addSuffix: true });
// //     } catch (error) {
// //       console.error("Relative time error:", error);
// //       return "Invalid date";
// //     }
// //   };

// //   // Safe comparison for dates
// //   const isDateBefore = (dateValue, compareDate = new Date()) => {
// //     const dateObj = parseAnyDate(dateValue);
// //     if (!dateObj || !isValid(dateObj)) return false;
// //     return isBefore(dateObj, compareDate);
// //   };

// //   // Unified filter state
// //   const [filters, setFilters] = useState({
// //     title: "",
// //     status: "OPEN",
// //     category: null,
// //     employeeId: null,
// //     locationId: null,
// //     siteIdLocationId: null,
// //     search: null,
// //     assigneeId: null,
// //     createdAfter: null,
// //     createdBefore: null,
// //   });

// //   const itCategories = [
// //     "HARDWARE",
// //     "SOFTWARE",
// //     "NETWORK",
// //     "PRINTER",
// //     "UPS",
// //     "CCTV",
// //     "FOCUS",
// //     "EMAIL",
// //     "DMS",
// //     "WORKSHOP_DIAGNOSTIC_TOOLS",
// //     "OTHER",
// //     "MAINTENANCE",
// //     "NEW_PROJECT",
// //     "CUG_SIM",
// //     "ZOHO_SUPPORT",
// //   ];

// //   const hrCategories = [
// //     "PAYROLL",
// //     "RECRUITMENT",
// //     "HR_OPERATIONS",
// //     "GENERAL_HR_QUERIES",
// //   ];

// //   const predefinedMessages = [
// //     "Dear Sir, thank you for your patience.",
// //     "Dear Team, we are currently looking into your issue.",
// //     "Dear User, could you please provide more details?",
// //     "Dear Sir/Madam, this ticket has been resolved.",
// //     "Dear Team, we appreciate your understanding and cooperation.",
// //     "Dear User, our team is diligently investigating this matter.",
// //     "Dear Sir, please let us know if you have any further questions.",
// //     "Dear Team, thank you for bringing this important matter to our attention.",
// //     "Dear User, we will update you as soon as possible.",
// //     "Dear Sir/Madam, your feedback is highly valuable to us.",
// //     "Dear Team, we are committed to resolving your issue promptly.",
// //     "Dear User, thank you for working with us to find a solution.",
// //     "Dear Sir, please rest assured that we are prioritizing your ticket.",
// //     "Dear Team, feel free to reach out for any additional assistance.",
// //     "Dear User, we sincerely apologize for any inconvenience caused.",
// //   ];

// //   const handleSelectPredefined = (msg) => {
// //     setNewMessage(msg);
// //     setShowPredefined(false);
// //   };

// //   // Age filter handler
// //   const handleAgeFilter = (ageRange) => {
// //     const now = new Date();
// //     let createdAfter = null;
// //     let createdBefore = null;

// //     switch (ageRange) {
// //       case "0-7":
// //         createdAfter = subDays(now, 7).toISOString();
// //         createdBefore = now.toISOString();
// //         break;
// //       case "8-15":
// //         createdAfter = subDays(now, 15).toISOString();
// //         createdBefore = subDays(now, 8).toISOString();
// //         break;
// //       case "16-30":
// //         createdAfter = subDays(now, 30).toISOString();
// //         createdBefore = subDays(now, 16).toISOString();
// //         break;
// //       case "31+":
// //         createdAfter = null;
// //         createdBefore = subDays(now, 31).toISOString();
// //         break;
// //       default:
// //         createdAfter = null;
// //         createdBefore = null;
// //     }

// //     setSelectedAgeFilter(ageRange);
// //     setFilters((prev) => ({
// //       ...prev,
// //       createdAfter,
// //       createdBefore,
// //     }));
// //     setPage(0);
// //   };

// //   // Unified fetch function
// //   const fetchTicketsWithFilters = async (customPage = page) => {
// //     setLoading(true);
// //     try {
// //       const params = {
// //         ...filters,
// //         page: customPage,
// //         size,
// //       };

// //       Object.keys(params).forEach(
// //         (key) => params[key] == null && delete params[key],
// //       );

// //       const res = await fetchFilteredTickets(params);

// //       const {
// //         content = [],
// //         page: pageNumber,
// //         size: pageSize,
// //         totalElements,
// //         totalPages,
// //         last,
// //       } = res?.data || {};

// //       setFilteredTickets(content);
// //       setPaginationInfo({ totalElements, totalPages, last });
// //       setPage(pageNumber);
// //       setSize(pageSize);
// //     } catch (error) {
// //       console.error("Error fetching tickets:", error);
// //       toast.error("Failed to fetch tickets");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle filter changes
// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => ({ ...prev, [key]: value }));
// //     setPage(0);
// //   };

// //   useEffect(() => {
// //     fetchTicketsWithFilters(0);
// //   }, [filters]);

// //   const handleCloseTicket = async () => {
// //     setIsUpdating(true);
// //     try {
// //       await updateTicketStatus(selectedTicket.id, "RESOLVED");
// //       toast.success("Status updated");
// //       fetchTicketsWithFilters();
// //       if (selectedTicket) {
// //         const updatedRes = await fetchFilteredTickets({ id: selectedTicket.id });
// //         if (updatedRes?.data?.content?.[0]) {
// //           setSelectedTicket(updatedRes.data.content[0]);
// //         }
// //       }
// //     } catch (error) {
// //       toast.error("Failed to update status");
// //       console.error("Error updating status:", error);
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   const handleOpenApprovalModal = (ticket) => {
// //     setSelectedTicket(ticket);
// //     setIsApprovalModalOpen(true);
// //   };

// //   // FIXED: Handle adding messages without modifying the sentAt from backend
// //   const handleAddMessage = async () => {
// //     if (!newMessage.trim()) return;

// //     setIsSending(true);
// //     try {
// //       const messageDTO = {
// //         message: newMessage,
// //         sender: "You",
// //         ticketMessageType: messageType,
// //       };

// //       const savedMessage = await addMessageToTicket(selectedTicket.id, messageDTO);

// //       setNewMessage("");

// //       // Use exactly what backend returns - don't modify sentAt
// //       const updatedMessages = [
// //         ...selectedTicket.messages,
// //         {
// //           sender: savedMessage.sender,
// //           message: savedMessage.message,
// //           ticketMessageType: savedMessage.ticketMessageType,
// //           sentAt: savedMessage.sentAt, // Keep as is from backend
// //         },
// //       ];

// //       setSelectedTicket((prev) => ({
// //         ...prev,
// //         messages: updatedMessages,
// //         lastUpdated: new Date().toISOString(),
// //       }));

// //       scrollToBottom();
// //     } catch (error) {
// //       console.error("Error adding message: ", error);
// //       toast.error("Failed to send message");
// //     } finally {
// //       setIsSending(false);
// //     }
// //   };

// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //     }, 100);
// //   };

// //   useEffect(() => {
// //     if (selectedTicket && isChatModalOpen) {
// //       scrollToBottom();
// //     }
// //   }, [selectedTicket, isChatModalOpen]);

// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault();
// //     handleFilterChange("search", searchInput.trim());
// //   };

// //   const handleDownloadTickets = async () => {
// //     try {
// //       const params = { ...filters };
// //       delete params.page;
// //       delete params.size;

// //       Object.keys(params).forEach(
// //         (key) => params[key] == null && delete params[key],
// //       );

// //       const response = await downloadFilteredTickets(params);

// //       const blob = new Blob([response.data], {
// //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       });
// //       const url = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.setAttribute(
// //         "download",
// //         `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`,
// //       );
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();
// //       window.URL.revokeObjectURL(url);

// //       toast.success("Tickets downloaded successfully");
// //     } catch (error) {
// //       console.error("Error downloading tickets:", error);
// //       toast.error("Failed to download tickets");
// //     }
// //   };

// //   useEffect(() => {
// //     let role = "user";
// //     if (hasRole("ADMIN") || hasRole("MANAGER")) {
// //       role = "ADMIN";
// //     }
// //     if (hasRole("HR_ADMIN")) {
// //       role = "HR_ADMIN";
// //     }
// //     setUserRole(role);
// //   }, []);

// //   useEffect(() => {
// //     getAssignees()
// //       .then((res) => {
// //         const formatted = res.data.map((user) => ({
// //           employeeId: user.employeeId,
// //           name: user.username,
// //         }));
// //         setAssignees(formatted);
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch assignees", err);
// //       });
// //   }, []);

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
// //     if (filters.siteIdLocationId) {
// //       getLocationsBySite(filters.siteIdLocationId)
// //         .then((locations) => {
// //           setLocations(locations);
// //         })
// //         .catch((err) => {
// //           console.error("Error fetching locations", err);
// //         });
// //     } else {
// //       setLocations([]);
// //     }
// //   }, [filters.siteIdLocationId]);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "OPEN": return "bg-emerald-100 text-emerald-700 border-emerald-200";
// //       case "IN_PROGRESS": return "bg-amber-100 text-amber-700 border-amber-200";
// //       case "RESOLVED": return "bg-blue-100 text-blue-700 border-blue-200";
// //       case "CLOSED": return "bg-gray-100 text-gray-700 border-gray-200";
// //       case "WAITING": return "bg-purple-100 text-purple-700 border-purple-200";
// //       default: return "bg-gray-100 text-gray-700 border-gray-200";
// //     }
// //   };

// //   const openChatModal = (ticket) => {
// //     setSelectedTicket(ticket);
// //     setIsChatModalOpen(true);
// //   };

// //   const closeChatModal = () => {
// //     setIsChatModalOpen(false);
// //     setSelectedTicket(null);
// //   };

// //   const handleTicketUpdate = async () => {
// //     await fetchTicketsWithFilters();
// //     if (selectedTicket) {
// //       const updatedRes = await fetchFilteredTickets({ id: selectedTicket.id });
// //       if (updatedRes?.data?.content?.[0]) {
// //         setSelectedTicket(updatedRes.data.content[0]);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// //       <TicketModal
// //         isOpen={isDialogOpen}
// //         onClose={() => {
// //           setIsDialogOpen(false);
// //           fetchTicketsWithFilters();
// //         }}
// //         className="z-50"
// //       />

// //       <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden m-4">
// //         {/* Modern Header */}
// //         <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
// //           <div className="flex flex-wrap gap-3 items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="bg-white/10 p-2 rounded-xl">
// //                 <MessageSquare className="w-5 h-5 text-white" />
// //               </div>
              
// //               <button
// //                 onClick={() => setIsDialogOpen(true)}
// //                 className="flex items-center gap-1.5 px-3 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-lg"
// //               >
// //                 <span>+</span>
// //                 <span>Create Ticket</span>
// //               </button>

// //               <div className="flex items-center gap-2 flex-wrap">
// //               <button
// //                 onClick={() => setShowFilters(!showFilters)}
// //                 className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
// //               >
// //                 <Filter className="w-4 h-4" />
// //                 {showFilters ? "Hide Filters" : "Show Filters"}
// //               </button>

              
// //               <button
// //                 onClick={handleDownloadTickets}
// //                 className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-lg"
// //                 disabled={loading}
// //               >
// //                 <Download className="w-4 h-4" />
// //                 <span>Export</span>
// //               </button>

// //               <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
// //                 {paginationInfo.totalElements} Total
// //               </div>

// //               <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
// //                 <button
// //                   onClick={() => {
// //                     const newPage = Math.max(page - 1, 0);
// //                     setPage(newPage);
// //                     fetchTicketsWithFilters(newPage);
// //                   }}
// //                   disabled={page === 0}
// //                   className="px-2 py-1 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
// //                 >
// //                   <ChevronLeft className="w-4 h-4" />
// //                 </button>
// //                 <span className="text-white text-sm px-2">
// //                   {page + 1} / {paginationInfo.totalPages || 1}
// //                 </span>
// //                 <button
// //                   onClick={() => {
// //                     const newPage = page + 1 < paginationInfo.totalPages ? page + 1 : page;
// //                     setPage(newPage);
// //                     fetchTicketsWithFilters(newPage);
// //                   }}
// //                   disabled={paginationInfo.last}
// //                   className="px-2 py-1 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
// //                 >
// //                   <ChevronRight className="w-4 h-4" />
// //                 </button>
// //               </div>

// //               <form onSubmit={handleSearchSubmit} className="relative">
// //                 <input
// //                   type="text"
// //                   placeholder="Search tickets..."
// //                   className="text-sm p-2 pl-8 w-48 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
// //                   value={searchInput}
// //                   onChange={(e) => setSearchInput(e.target.value)}
// //                 />
// //                 <svg
// //                   className="w-4 h-4 text-white/50 absolute left-2 top-1/2 -translate-y-1/2"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
// //                 </svg>
// //               </form>
// //             </div>
// //             </div>

            
// //           </div>
// //         </div>

// //         {/* Filters Section */}
// //         {showFilters && (
// //           <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
// //             <div className="flex flex-wrap items-center gap-2">
// //               <select
// //                 value={filters.status || ""}
// //                 onChange={(e) => handleFilterChange("status", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Status</option>
// //                 <option value="OPEN">Open</option>
// //                 <option value="WAITING">Waiting</option>
// //                 <option value="CLOSED">Closed</option>
// //                 <option value="RESOLVED">Resolved</option>
// //                 <option value="UNASSIGNED">Unassigned</option>
// //               </select>

// //               <select
// //                 value={filters.assigneeId || ""}
// //                 onChange={(e) => handleFilterChange("assigneeId", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Assignees</option>
// //                 {assignees.map(({ employeeId, name }) => (
// //                   <option key={employeeId} value={employeeId}>{name}</option>
// //                 ))}
// //               </select>

// //               <select
// //                 value={filters.siteIdLocationId || ""}
// //                 onChange={(e) => handleFilterChange("siteIdLocationId", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Sites</option>
// //                 {sites.map(({ siteId, name }) => (
// //                   <option key={siteId} value={siteId}>{name}</option>
// //                 ))}
// //               </select>

// //               <select
// //                 value={filters.locationId || ""}
// //                 onChange={(e) => handleFilterChange("locationId", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Locations</option>
// //                 {locations.map((loc) => (
// //                   <option key={loc.id} value={loc.id}>{loc.name}</option>
// //                 ))}
// //               </select>

// //               <select
// //                 value={filters.category || ""}
// //                 onChange={(e) => handleFilterChange("category", e.target.value || null)}
// //                 className="text-xs p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="">All Categories</option>
// //                 {(userRole === "HR_ADMIN" ? hrCategories : itCategories).map((cat) => (
// //                   <option key={cat} value={cat}>{cat}</option>
// //                 ))}
// //               </select>

// //               {["0-7", "8-15", "16-30", "31+"].map((range) => (
// //                 <button
// //                   key={range}
// //                   onClick={() => handleAgeFilter(range)}
// //                   className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
// //                     selectedAgeFilter === range
// //                       ? "bg-blue-600 text-white shadow-md"
// //                       : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
// //                   }`}
// //                 >
// //                   {range}d
// //                 </button>
// //               ))}

// //               {selectedAgeFilter && (
// //                 <button
// //                   onClick={() => {
// //                     setSelectedAgeFilter(null);
// //                     setFilters(prev => ({ ...prev, createdAfter: null, createdBefore: null }));
// //                   }}
// //                   className="text-xs text-red-600 hover:text-red-800 font-medium px-2"
// //                 >
// //                   ✕ Clear
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Table Section */}
// //         <div className="p-0">
// //           {loading ? (
// //             <div className="flex items-center justify-center h-64">
// //               <div className="text-center">
// //                 <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
// //                 <p className="text-gray-600 font-medium">Loading tickets...</p>
// //               </div>
// //             </div>
// //           ) : filteredTickets.length === 0 ? (
// //             <div className="flex flex-col items-center justify-center h-64 text-gray-500">
// //               <MessageSquare className="w-20 h-20 mb-4 text-gray-300" />
// //               <p className="text-lg font-medium">No tickets found</p>
// //               <p className="text-sm mt-1">Try adjusting your filters</p>
// //             </div>
// //           ) : (
// //             <div className="overflow-hidden">
// //               <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
// //                 <table className="min-w-full divide-y divide-gray-200">
// //                   <thead className="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0 z-10">
// //                     <tr>
// //                       {["ID", "Subject", "Status", "Category", "Location", "Assignee", "Employee", "Created", "Due Date", "Actions"].map((header, i) => (
// //                         <th key={i} className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
// //                           {header}
// //                         </th>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-100">
// //                     {filteredTickets.map((ticket) => (
// //                       <tr
// //                         key={ticket.id}
// //                         className="hover:bg-blue-50 transition-colors cursor-pointer group"
// //                         onClick={() => openChatModal(ticket)}
// //                       >
// //                         <td className="px-4 py-3 text-sm font-semibold text-blue-600">
// //                           #{ticket.id}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-800 min-w-[200px] max-w-[300px]">
// //                           <div className="truncate font-medium">{ticket.title}</div>
// //                         </td>
// //                         <td className="px-4 py-3">
// //                           <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
// //                             {ticket.status.replace("_", " ")}
// //                           </span>
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
// //                           {ticket.category}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
// //                           {ticket.locationName || "—"}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm">
// //                           {userRole !== "user" ? (
// //                             <button
// //                               onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.assignee?.employeeId); }}
// //                               className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
// //                             >
// //                               {ticket.assignee?.username || "Unassigned"}
// //                             </button>
// //                           ) : (
// //                             <span className="text-gray-700 whitespace-nowrap">{ticket.assignee?.username || "Unassigned"}</span>
// //                           )}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm">
// //                           {userRole !== "user" ? (
// //                             <button
// //                               onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.employee?.employeeId); }}
// //                               className="text-blue-600 hover:text-blue-800 font-medium hover:underline whitespace-nowrap"
// //                             >
// //                               {ticket.employee?.username || "Unassigned"}
// //                             </button>
// //                           ) : (
// //                             <span className="text-gray-700 whitespace-nowrap">{ticket.employee?.username || "Unassigned"}</span>
// //                           )}
// //                         </td>
// //                         {/* FIXED: Using safe date formatters */}
// //                         <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
// //                           <div className="font-medium">{formatDateSafely(ticket.createdAt, "d MMM yyyy")}</div>
// //                           <div className="text-xs text-gray-500">{formatRelativeTime(ticket.createdAt)}</div>
// //                         </td>
// //                         {/* FIXED: Using safe date formatters for due date */}
// //                         <td className="px-4 py-3 text-sm whitespace-nowrap">
// //                           {ticket.dueDate ? (
// //                             <>
// //                               <div className="font-medium">{formatDateSafely(ticket.dueDate, "d MMM yyyy")}</div>
// //                               <div className={`text-xs font-semibold ${isDateBefore(ticket.dueDate) ? "text-red-600" : "text-green-600"}`}>
// //                                 {formatRelativeTime(ticket.dueDate)}
// //                               </div>
// //                             </>
// //                           ) : (
// //                             <span className="text-gray-400 italic text-xs">No due date</span>
// //                           )}
// //                         </td>
// //                         <td className="px-4 py-3">
// //                           <button
// //                             className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
// //                             onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); setIsTicketModalOpen(true); }}
// //                           >
// //                             Actions
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </Card>

// //       {/* Chat Modal - Centered */}
// //       {isChatModalOpen && selectedTicket && (
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1">
// //           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[98vh] overflow-hidden flex flex-col">
// //             {/* Modal Header - Fixed */}
// //             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
// //               <div className="flex items-center gap-3 min-w-0 flex-1">
// //                 <div className="bg-white/20 p-2 rounded-xl flex-shrink-0">
// //                   <MessageSquare className="w-5 h-5 text-white" />
// //                 </div>
// //                 <div className="min-w-0 flex-1">
// //                   <h2 className="text-lg font-bold text-white truncate">{selectedTicket.title}</h2>
// //                   <p className="text-sm text-blue-100">Ticket #{selectedTicket.id} • {selectedTicket.category}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-2 flex-shrink-0">
// //                 <button
// //                   onClick={() => setIsApprovalModalOpen(true)}
// //                   className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
// //                   title="IT Approval Policy"
// //                 >
// //                   <FileText className="w-5 h-5 text-white" />
// //                 </button>
// //                 <button
// //                   onClick={() => { setSelectedTicketId(selectedTicket.id); setIsTicketModalOpen(true); }}
// //                   className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
// //                   title="Ticket Actions"
// //                 >
// //                   <MoreVertical className="w-5 h-5 text-white" />
// //                 </button>
// //                 <TicketAttachmentButton ticket={selectedTicket} />
// //                 <button
// //                   onClick={closeChatModal}
// //                   className="p-2 rounded-lg bg-red-500/80 hover:bg-red-600 transition"
// //                 >
// //                   <X className="w-5 h-5 text-white" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Scrollable Content Area */}
// //             <div className="flex-1 overflow-y-auto min-h-0">
// //               {/* Ticket Info Bar */}
// //               <div className="bg-gray-50 px-6 py-3 border-b flex flex-wrap gap-4 text-sm flex-shrink-0">
// //                 <div className="flex items-center gap-2">
// //                   <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(selectedTicket.status)}`}>
// //                     {selectedTicket.status}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-gray-600">
// //                   <User className="w-4 h-4" />
// //                   <span>Requester: {selectedTicket.employee?.username || "Unknown"}</span>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-gray-600">
// //                   <User className="w-4 h-4" />
// //                   <span>Assignee: {selectedTicket.assignee?.username || "Unassigned"}</span>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-gray-600">
// //                   <Calendar className="w-4 h-4" />
// //                   <span>Created: {formatDateSafely(selectedTicket.createdAt, "d MMM yyyy")}</span>
// //                 </div>
// //                 {selectedTicket.dueDate && (
// //                   <div className="flex items-center gap-2 text-gray-600">
// //                     <Clock className="w-4 h-4" />
// //                     <span>Due: {formatDateSafely(selectedTicket.dueDate, "d MMM yyyy")}</span>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Description Section */}
// //               {selectedTicket.description && (
// //                 <div className="px-6 py-3 bg-blue-50/50 border-b flex-shrink-0">
// //                   <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{selectedTicket.description}</p>
// //                 </div>
// //               )}

// //               {/* Messages Area */}
// //               <div className="px-6 py-4">
// //                 <div className="space-y-4">
// //                   {selectedTicket.messages.filter(msg => {
// //                     if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
// //                     return userRole !== "user";
// //                   }).length === 0 ? (
// //                     <div className="text-center py-12 text-gray-400">
// //                       <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
// //                       <p className="text-sm">No messages yet. Start the conversation!</p>
// //                     </div>
// //                   ) : (
// //                     selectedTicket.messages.filter(msg => {
// //                       if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
// //                       return userRole !== "user";
// //                     }).map((msg, idx) => (
// //                       <div
// //                         key={idx}
// //                         className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
// //                       >
// //                         <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
// //                           msg.sender === "You"
// //                             ? "bg-blue-600 text-white rounded-br-none"
// //                             : msg.ticketMessageType === "INTERNAL_NOTE"
// //                             ? "bg-amber-100 text-gray-800 border-l-4 border-amber-400 rounded-bl-none"
// //                             : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
// //                         }`}>
// //                           <div className="flex items-center gap-2 mb-1 flex-wrap">
// //                             <span className={`text-xs font-semibold ${msg.sender === "You" ? "text-blue-200" : "text-gray-500"}`}>
// //                               {msg.sender}
// //                             </span>
// //                             {msg.ticketMessageType === "INTERNAL_NOTE" && (
// //                               <span className="text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full">Internal</span>
// //                             )}
// //                             {/* FIXED: Using safe date formatter for message timestamp */}
// //                             <span className={`text-xs ${msg.sender === "You" ? "text-blue-300" : "text-gray-400"}`}>
// //                               {formatDateSafely(msg.sentAt)}
// //                             </span>
// //                           </div>
// //                           <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
// //                         </div>
// //                       </div>
// //                     ))
// //                   )}
// //                   <div ref={messagesEndRef} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Message Input Area - Fixed at bottom */}
// //             <div className="border-t bg-white p-4 flex-shrink-0">
// //               <div className="relative">
// //                 <textarea
// //                   className={`w-full p-3 pr-24 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none text-sm transition-all ${
// //                     messageType === "INTERNAL_NOTE"
// //                       ? "border-amber-300 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
// //                       : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
// //                   }`}
// //                   rows="3"
// //                   value={newMessage}
// //                   onChange={(e) => setNewMessage(e.target.value)}
// //                   placeholder={messageType === "INTERNAL_NOTE" ? "Write an internal note (IT Team Only)..." : "Type your message..."}
// //                 />
// //                 <div className="absolute bottom-3 right-3 flex gap-2">
// //                   {userRole !== "user" && (
// //                     <>
// //                       <button
// //                         type="button"
// //                         onClick={() => setShowPredefined(!showPredefined)}
// //                         className="text-gray-500 hover:text-blue-600 transition p-1"
// //                         title="Quick Replies"
// //                       >
// //                         💬
// //                       </button>
// //                       <button
// //                         type="button"
// //                         onClick={() => setMessageType(prev => prev === "PUBLIC_RESPONSE" ? "INTERNAL_NOTE" : "PUBLIC_RESPONSE")}
// //                         className={`text-xs px-2 py-1 rounded-lg font-semibold transition ${
// //                           messageType === "INTERNAL_NOTE"
// //                             ? "bg-amber-200 text-amber-800"
// //                             : "bg-blue-200 text-blue-800"
// //                         }`}
// //                       >
// //                         {messageType === "INTERNAL_NOTE" ? "Note" : "Public"}
// //                       </button>
// //                     </>
// //                   )}
// //                   <button
// //                     onClick={handleAddMessage}
// //                     disabled={isSending || !newMessage.trim()}
// //                     className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition disabled:opacity-50"
// //                   >
// //                     <Send className="w-5 h-5" />
// //                   </button>
// //                 </div>
// //               </div>
// //               {showPredefined && (
// //                 <div className="mt-2 p-2 bg-gray-50 rounded-xl border max-h-32 overflow-auto">
// //                   <div className="flex flex-wrap gap-1">
// //                     {predefinedMessages.map((msg, idx) => (
// //                       <button
// //                         key={idx}
// //                         onClick={() => handleSelectPredefined(msg)}
// //                         className="text-xs bg-white border rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition truncate max-w-[200px]"
// //                       >
// //                         {msg.substring(0, 30)}...
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //               {userRole !== "user" && (
// //                 <div className="flex gap-2 mt-3 relative">
// //                   <button
// //                     onClick={() => {
// //                       setDropdownOpen(!dropdownOpen);
// //                     }}
// //                     className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition"
// //                   >
// //                     More Actions ▼
// //                   </button>
// //                   {dropdownOpen && (
// //                     <div className="absolute bottom-full right-0 mb-2 bg-white border rounded-xl shadow-lg overflow-hidden z-20 min-w-[200px]">
// //                       <button
// //                         onClick={async () => {
// //                           setDropdownOpen(false);
// //                           await handleAddMessage();
// //                           await handleCloseTicket();
// //                           toast.success("Message sent and ticket resolved.");
// //                           handleTicketUpdate();
// //                         }}
// //                         className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition"
// //                       >
// //                         ✅ Send & Close Ticket
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {Boolean(selectedUser) && (
// //         <UserDetailsModal query={selectedUser} isOpen onClose={() => setSelectedUser(null)} />
// //       )}

// //       {isTicketModalOpen && (
// //         <TicketActionModal
// //           ticketId={selectedTicketId}
// //           open={isTicketModalOpen}
// //           onClose={() => {
// //             setIsTicketModalOpen(false);
// //             handleTicketUpdate();
// //           }}
// //         />
// //       )}

// //       {isApprovalModalOpen && (
// //         <ITApprovalModal
// //           ticket={selectedTicket}
// //           open={isApprovalModalOpen}
// //           onClose={() => setIsApprovalModalOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

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
// import ITApprovalModal from "../components/ITApprovalHelper";
// import TicketActionModal from "../components/TicketActionModal";
// import TicketAttachmentButton from "../components/TicketAttachmentButton";
// import TicketModal from "../components/TicketFormModal";
// import { Button, Card } from "../components/ui";
// import {
//   format,
//   formatDistanceToNow,
//   parseISO,
//   isBefore,
//   subDays,
//   isValid,
//   differenceInDays,
// } from "date-fns";
// import dayjs from "dayjs";
// import { FileText } from "lucide-react";
// import {
//   MoreVertical, X, Send, MessageSquare, User, Calendar, Clock,
//   ChevronLeft, ChevronRight, Download, SlidersHorizontal,
// } from "lucide-react";
// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// // ─── Date helpers ────────────────────────────────────────────────────────────
// const parseAnyDate = (v) => {
//   if (!v) return null;
//   if (v instanceof Date) return v;
//   if (typeof v === "string") { try { return parseISO(v); } catch { return new Date(v); } }
//   if (Array.isArray(v) && v.length >= 3) {
//     const [y, mo, d, h = 0, mi = 0, s = 0] = v;
//     return new Date(y, mo - 1, d, h, mi, s);
//   }
//   if (typeof v === "number") return new Date(v);
//   return null;
// };
// const fmt = (v, f = "d MMM yyyy, h:mm a") => {
//   const d = parseAnyDate(v);
//   if (!d || !isValid(d)) return "—";
//   try { return format(d, f); } catch { return "—"; }
// };
// const rel = (v) => {
//   const d = parseAnyDate(v);
//   if (!d || !isValid(d)) return "—";
//   try { return formatDistanceToNow(d, { addSuffix: true }); } catch { return "—"; }
// };
// const isBef = (v, cmp = new Date()) => {
//   const d = parseAnyDate(v);
//   return d && isValid(d) ? isBefore(d, cmp) : false;
// };

// // ─── Ticket ID colour (same logic as TicketingPortal) ───────────────────────
// function ticketIdCls(ticket) {
//   if (!ticket) return "bg-gray-100 text-gray-700";
//   const now = new Date();
//   if (ticket.dueDate) {
//     const due = parseAnyDate(ticket.dueDate);
//     if (due && isValid(due)) {
//       if (isBefore(due, now)) return "bg-red-600 text-white font-bold";
//       if (differenceInDays(due, now) <= 2) return "bg-orange-500 text-white font-bold";
//     }
//   }
//   if (ticket.createdAt) {
//     const cr = parseAnyDate(ticket.createdAt);
//     if (cr && isValid(cr) && (now - cr) / 3_600_000 <= 24)
//       return "bg-emerald-600 text-white font-bold";
//   }
//   return "bg-gray-100 text-gray-700";
// }

// const STATUS_CLS = {
//   OPEN: "bg-emerald-100 text-emerald-700 border-emerald-200",
//   IN_PROGRESS: "bg-amber-100 text-amber-700 border-amber-200",
//   WAITING: "bg-purple-100 text-purple-700 border-purple-200",
//   RESOLVED: "bg-blue-100 text-blue-700 border-blue-200",
//   CLOSED: "bg-gray-100 text-gray-600 border-gray-200",
//   UNASSIGNED: "bg-rose-100 text-rose-700 border-rose-200",
// };
// const statusCls = (s) => STATUS_CLS[s] || "bg-gray-100 text-gray-600 border-gray-200";

// const PAGE_SIZES = [10, 20, 50, 100];

// export default function AdminTicketingPortal() {
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [showPredefined, setShowPredefined] = useState(false);
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
//   const [locations, setLocations] = useState([]);
//   const [size, setSize] = useState(20);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
//   const [paginationInfo, setPaginationInfo] = useState({ totalElements: 0, totalPages: 0, last: false });
//   const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isChatModalOpen, setIsChatModalOpen] = useState(false);
//   const messagesEndRef = useRef(null);
//   const advRef = useRef(null);

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
//     "HARDWARE","SOFTWARE","NETWORK","PRINTER","UPS","CCTV","FOCUS","EMAIL",
//     "DMS","WORKSHOP_DIAGNOSTIC_TOOLS","OTHER","MAINTENANCE","NEW_PROJECT","CUG_SIM","ZOHO_SUPPORT",
//   ];
//   const hrCategories = ["PAYROLL","RECRUITMENT","HR_OPERATIONS","GENERAL_HR_QUERIES"];
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

//   // Close advanced on outside click
//   useEffect(() => {
//     const h = (e) => { if (advRef.current && !advRef.current.contains(e.target)) setShowAdvanced(false); };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   useEffect(() => {
//     if (selectedTicket && isChatModalOpen) scrollToBottom();
//   }, [selectedTicket?.messages, isChatModalOpen]);

//   const scrollToBottom = () => setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

//   // ─── Data fetching ────────────────────────────────────────────────────────
//   const fetchTicketsWithFilters = async (customPage = page, customSize = size) => {
//     setLoading(true);
//     try {
//       const params = { ...filters, page: customPage, size: customSize };
//       Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
//       const res = await fetchFilteredTickets(params);
//       const { content = [], page: pn, size: ps, totalElements, totalPages, last } = res?.data || {};
//       setFilteredTickets(content);
//       setPaginationInfo({ totalElements, totalPages, last });
//       setPage(pn);
//       setSize(ps);
//     } catch {
//       toast.error("Failed to fetch tickets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (key, value) => { setFilters((p) => ({ ...p, [key]: value })); setPage(0); };

//   useEffect(() => { fetchTicketsWithFilters(0); }, [filters]);

//   const handlePageSizeChange = (n) => { setSize(n); fetchTicketsWithFilters(0, n); };

//   const handleAgeFilter = (r) => {
//     const now = new Date();
//     const map = {
//       "0-7":   { createdAfter: subDays(now, 7).toISOString(),  createdBefore: now.toISOString() },
//       "8-15":  { createdAfter: subDays(now, 15).toISOString(), createdBefore: subDays(now, 8).toISOString() },
//       "16-30": { createdAfter: subDays(now, 30).toISOString(), createdBefore: subDays(now, 16).toISOString() },
//       "31+":   { createdAfter: null, createdBefore: subDays(now, 31).toISOString() },
//     };
//     setSelectedAgeFilter(r);
//     setFilters((p) => ({ ...p, ...(map[r] || { createdAfter: null, createdBefore: null }) }));
//     setPage(0);
//   };

//   const handleDownloadTickets = async () => {
//     try {
//       const params = { ...filters };
//       delete params.page; delete params.size;
//       Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
//       const response = await downloadFilteredTickets(params);
//       const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`);
//       document.body.appendChild(link); link.click(); link.remove();
//       window.URL.revokeObjectURL(url);
//       toast.success("Downloaded successfully");
//     } catch {
//       toast.error("Failed to download tickets");
//     }
//   };

//   const handleCloseTicket = async (ticketId) => {
//     // Capture ID immediately — don't rely on selectedTicket in closure
//     const resolveId = ticketId ?? selectedTicket?.id;
//     if (!resolveId) return;
//     setIsUpdating(true);
//     try {
//       await updateTicketStatus(resolveId, "RESOLVED");
//       toast.success("Status updated");
//       fetchTicketsWithFilters();
//       const updatedRes = await fetchFilteredTickets({ id: resolveId });
//       const updated = updatedRes?.data?.content?.find((t) => t.id === resolveId);
//       if (updated) setSelectedTicket(updated);
//     } catch { toast.error("Failed to update status"); }
//     finally { setIsUpdating(false); }
//   };

//   const handleAddMessage = async () => {
//     if (!newMessage.trim()) return;
//     setIsSending(true);
//     try {
//       const saved = await addMessageToTicket(selectedTicket.id, {
//         message: newMessage, sender: "You", ticketMessageType: messageType,
//       });
//       setNewMessage("");
//       setSelectedTicket((p) => ({
//         ...p,
//         messages: [...p.messages, { sender: saved.sender, message: saved.message, ticketMessageType: saved.ticketMessageType, sentAt: saved.sentAt }],
//         lastUpdated: new Date().toISOString(),
//       }));
//       scrollToBottom();
//     } catch { toast.error("Failed to send message"); }
//     finally { setIsSending(false); }
//   };

//   const handleSearchSubmit = (e) => { e.preventDefault(); handleFilterChange("search", searchInput.trim()); };

//   const handleTicketUpdate = async (ticketIdOverride) => {
//     await fetchTicketsWithFilters();
//     // Always use the explicitly passed ID to avoid stale closure
//     const idToRefresh = ticketIdOverride ?? selectedTicket?.id;
//     if (idToRefresh) {
//       try {
//         const r = await fetchFilteredTickets({ id: idToRefresh });
//         const updated = r?.data?.content?.find((t) => t.id === idToRefresh);
//         if (updated) setSelectedTicket(updated);
//       } catch { /* ignore */ }
//     }
//   };

//   const openChatModal = (t) => { setSelectedTicket(t); setIsChatModalOpen(true); };
//   const closeChatModal = () => { setIsChatModalOpen(false); setSelectedTicket(null); };

//   useEffect(() => {
//     let role = "user";
//     if (hasRole("ADMIN") || hasRole("MANAGER")) role = "ADMIN";
//     if (hasRole("HR_ADMIN")) role = "HR_ADMIN";
//     setUserRole(role);
//   }, []);

//   useEffect(() => {
//     getAssignees().then((r) => setAssignees(r.data.map((u) => ({ employeeId: u.employeeId, name: u.username })))).catch(console.error);
//     fetchSites().then((r) => setSites(r.data.map((s) => ({ siteId: s.id, name: s.name })))).catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (filters.siteIdLocationId) getLocationsBySite(filters.siteIdLocationId).then(setLocations).catch(console.error);
//     else setLocations([]);
//   }, [filters.siteIdLocationId]);

//   const advCount = [
//     filters.assigneeId, filters.siteIdLocationId, filters.locationId,
//     filters.category, filters.createdAfter, selectedAgeFilter,
//   ].filter(Boolean).length;

//   const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none transition shadow-sm cursor-pointer";

//   return (
//     <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
//       <style>{`
//         .at-table td,.at-table th{white-space:nowrap}
//         .at-table td{font-size:11px}
//         .at-row:hover{background:#eff6ff!important}
//         .at-scroll::-webkit-scrollbar{width:4px;height:4px}
//         .at-scroll::-webkit-scrollbar-track{background:transparent}
//         .at-scroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
//         .shimmer{background:linear-gradient(90deg,#f1f5f9 25%,#e8eeff 50%,#f1f5f9 75%);background-size:200% 100%;animation:sh 1.4s infinite}
//         @keyframes sh{0%{background-position:200% 0}100%{background-position:-200% 0}}
//         .adv-drop{animation:fadeSlide .15s ease}
//         @keyframes fadeSlide{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
//         .chat-enter{animation:chatIn .2s ease}
//         @keyframes chatIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
//         .msg-bubble-user{border-bottom-right-radius:4px!important}
//         .msg-bubble-other{border-bottom-left-radius:4px!important}
//       `}</style>

//       <TicketModal isOpen={isDialogOpen} onClose={() => { setIsDialogOpen(false); fetchTicketsWithFilters(); }} className="z-50" />

//       {/* ═══ TOOLBAR ═══ */}
//       <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
//         <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5">

//           {/* Status — always visible */}
//           <select
//             value={filters.status || ""}
//             onChange={(e) => handleFilterChange("status", e.target.value || null)}
//             className={sel + " min-w-[90px] font-medium"}
//           >
//             <option value="">All Status</option>
//             <option value="OPEN">Open</option>
//             <option value="WAITING">Waiting</option>
//             <option value="RESOLVED">Resolved</option>
//             <option value="CLOSED">Closed</option>
//             <option value="UNASSIGNED">Unassigned</option>
//           </select>

//           {/* Search — always visible */}
//           <form onSubmit={handleSearchSubmit} className="relative flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
//               className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
//             </svg>
//             <input
//               type="text"
//               placeholder="Search tickets..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-36 sm:w-44 transition"
//             />
//           </form>

//           <div className="h-5 w-px bg-gray-200 hidden sm:block" />

//           {/* Create */}
//           <button
//             onClick={() => setIsDialogOpen(true)}
//             className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold transition shadow-sm"
//           >
//             <span className="text-sm leading-none">+</span>
//             <span>Create</span>
//           </button>

//           {/* Advanced */}
//           <div className="relative" ref={advRef}>
//             <button
//               onClick={() => setShowAdvanced((p) => !p)}
//               className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
//                 showAdvanced || advCount > 0
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
//               }`}
//             >
//               <SlidersHorizontal className="w-3 h-3" />
//               <span className="hidden sm:inline">Advanced</span>
//               {advCount > 0 && (
//                 <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
//                   {advCount}
//                 </span>
//               )}
//             </button>

//             {showAdvanced && (
//               <div className="adv-drop absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[300px] sm:w-[480px] md:w-[620px]">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
//                   <div className="flex items-center gap-2">
//                     {advCount > 0 && (
//                       <button
//                         onClick={() => {
//                           setFilters((p) => ({
//                             ...p, assigneeId: null, siteIdLocationId: null, locationId: null,
//                             category: null, createdAfter: null, createdBefore: null,
//                           }));
//                           setSelectedAgeFilter(null);
//                         }}
//                         className="text-[10px] text-red-500 hover:text-red-700 font-medium"
//                       >Clear all</button>
//                     )}
//                     <button onClick={() => setShowAdvanced(false)}><X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" /></button>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-1.5">
//                   {/* Assignee */}
//                   <select value={filters.assigneeId || ""} onChange={(e) => handleFilterChange("assigneeId", e.target.value || null)} className={sel + " min-w-[110px]"}>
//                     <option value="">All Assignees</option>
//                     {assignees.map(({ employeeId, name }) => <option key={employeeId} value={employeeId}>{name}</option>)}
//                   </select>

//                   {/* Site */}
//                   <select value={filters.siteIdLocationId || ""} onChange={(e) => handleFilterChange("siteIdLocationId", e.target.value || null)} className={sel + " min-w-[100px]"}>
//                     <option value="">All Sites</option>
//                     {sites.map(({ siteId, name }) => <option key={siteId} value={siteId}>{name}</option>)}
//                   </select>

//                   {/* Location */}
//                   {locations.length > 0 && (
//                     <select value={filters.locationId || ""} onChange={(e) => handleFilterChange("locationId", e.target.value || null)} className={sel + " min-w-[100px]"}>
//                       <option value="">All Locations</option>
//                       {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
//                     </select>
//                   )}

//                   {/* Category */}
//                   <select value={filters.category || ""} onChange={(e) => handleFilterChange("category", e.target.value || null)} className={sel + " min-w-[110px]"}>
//                     <option value="">All Categories</option>
//                     {(userRole === "HR_ADMIN" ? hrCategories : itCategories).map((c) => <option key={c} value={c}>{c}</option>)}
//                   </select>

//                   <div className="h-px w-full bg-gray-100 my-0.5" />

//                   {/* Age pills */}
//                   <div className="flex items-center gap-1 flex-wrap">
//                     <span className="text-[10px] text-gray-400 font-medium">Age:</span>
//                     {[{k:"0-7",l:"0–7d"},{k:"8-15",l:"8–15d"},{k:"16-30",l:"16–30d"},{k:"31+",l:"31+d"}].map(({ k, l }) => (
//                       <button key={k} onClick={() => handleAgeFilter(k)}
//                         className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
//                           selectedAgeFilter === k ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
//                         }`}>{l}</button>
//                     ))}
//                     {selectedAgeFilter && (
//                       <button onClick={() => { setSelectedAgeFilter(null); setFilters((p) => ({ ...p, createdAfter: null, createdBefore: null })); }}
//                         className="text-[10px] text-red-400 hover:text-red-600 font-medium">✕</button>
//                     )}
//                   </div>

//                   <div className="h-px w-full bg-gray-100 my-0.5" />

//                   {/* Export inside advanced */}
//                   <button
//                     onClick={handleDownloadTickets}
//                     disabled={loading}
//                     className="flex items-center gap-1 px-2.5 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium disabled:opacity-50 transition shadow-sm"
//                   >
//                     <Download className="w-3 h-3" />
//                     Export Excel
//                   </button>
//                 </div>

//                 {/* Legend */}
//                 <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
//                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-600 inline-block" />New (&lt;24h)</span>
//                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-500 inline-block" />Due soon (≤2d)</span>
//                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-600 inline-block" />Overdue</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="h-5 w-px bg-gray-200 hidden sm:block" />

//           {/* Pagination */}
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => { const np = Math.max(page - 1, 0); setPage(np); fetchTicketsWithFilters(np); }}
//               disabled={page === 0 || loading}
//               className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
//             ><ChevronLeft className="w-3 h-3" /></button>
//             <span className="text-xs font-medium text-gray-600 px-1 whitespace-nowrap">
//               <span className="text-blue-700">{page + 1}</span>
//               <span className="text-gray-400"> / </span>
//               {paginationInfo.totalPages || 1}
//             </span>
//             <button
//               onClick={() => { const np = page + 1 < paginationInfo.totalPages ? page + 1 : page; setPage(np); fetchTicketsWithFilters(np); }}
//               disabled={paginationInfo.last || loading}
//               className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
//             ><ChevronRight className="w-3 h-3" /></button>
//           </div>

//           <span className="text-xs text-gray-500 whitespace-nowrap">
//             <span className="font-semibold text-gray-700">{paginationInfo.totalElements}</span>
//             <span className="hidden sm:inline"> tickets</span>
//           </span>

//           {/* Page size */}
//           <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
//             <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
//             {PAGE_SIZES.map((n) => (
//               <button key={n} onClick={() => handlePageSizeChange(n)}
//                 className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
//                   size === n ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
//                 }`}>{n}</button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ═══ TABLE ═══ */}
//       <div className="flex-1 overflow-hidden">
//         {loading && (
//           <div className="overflow-x-auto">
//             <table className="w-full at-table" style={{ minWidth: 900 }}>
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   {["ID","Subject","Status","Category","Location","Assignee","Employee","Created","Due Date","Actions"]
//                     .map((h, i) => <th key={i} className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <tr key={i} className="border-b border-gray-50">
//                     {Array.from({ length: 10 }).map((__, j) => (
//                       <td key={j} className="px-2.5 py-2.5">
//                         <div className="shimmer h-2.5 rounded" style={{ width: `${50 + Math.random() * 40}%` }} />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {!loading && filteredTickets.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-16 text-gray-300">
//             <MessageSquare className="w-10 h-10 mb-2 opacity-30" />
//             <p className="text-sm text-gray-400">No tickets found.</p>
//             <p className="text-xs text-gray-300 mt-0.5">Try adjusting your filters.</p>
//           </div>
//         )}

//         {!loading && filteredTickets.length > 0 && (
//           <div className="overflow-x-auto at-scroll">
//             <table className="w-full at-table" style={{ minWidth: 900, borderCollapse: "collapse" }}>
//               <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
//                 <tr>
//                   {["ID","Subject","Status","Category","Location","Assignee","Employee","Created","Due Date","Actions"]
//                     .map((h, i) => (
//                       <th key={i} className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0">{h}</th>
//                     ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTickets.map((ticket, ri) => (
//                   <tr
//                     key={ticket.id}
//                     className="at-row border-b border-gray-50 cursor-pointer transition-colors"
//                     style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
//                     onClick={() => openChatModal(ticket)}
//                   >
//                     <td className="px-2.5 py-1.5">
//                       <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${ticketIdCls(ticket)}`}>
//                         #{ticket.id}
//                       </span>
//                     </td>
//                     <td className="px-2.5 py-1.5 max-w-[180px]">
//                       <span className="truncate block font-medium text-gray-800" title={ticket.title}>{ticket.title}</span>
//                     </td>
//                     <td className="px-2.5 py-1.5">
//                       <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${statusCls(ticket.status)}`}>
//                         {ticket.status?.replace("_", " ")}
//                       </span>
//                     </td>
//                     <td className="px-2.5 py-1.5 max-w-[100px]">
//                       <span className="truncate block text-gray-600">{ticket.category}</span>
//                     </td>
//                     <td className="px-2.5 py-1.5 max-w-[100px]">
//                       <span className="truncate block text-gray-600">{ticket.locationName || "—"}</span>
//                     </td>
//                     <td className="px-2.5 py-1.5">
//                       <button onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.assignee?.employeeId); }}
//                         className="text-blue-600 hover:underline text-[11px] truncate">
//                         {ticket.assignee?.username || <span className="text-gray-300">—</span>}
//                       </button>
//                     </td>
//                     <td className="px-2.5 py-1.5">
//                       <button onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.employee?.employeeId); }}
//                         className="text-blue-600 hover:underline text-[11px] truncate">
//                         {ticket.employee?.username || <span className="text-gray-300">—</span>}
//                       </button>
//                     </td>
//                     <td className="px-2.5 py-1.5 text-gray-600 whitespace-nowrap">
//                       {fmt(ticket.createdAt, "d/M/yy")}
//                       <span className="text-gray-400 text-[10px] ml-1">({rel(ticket.createdAt)})</span>
//                     </td>
//                     <td className="px-2.5 py-1.5 whitespace-nowrap">
//                       {ticket.dueDate ? (
//                         <span className={isBef(ticket.dueDate) ? "text-red-600 font-semibold" : "text-emerald-600"}>
//                           {fmt(ticket.dueDate, "d/M/yy")}
//                           {isBef(ticket.dueDate) && " ⚠"}
//                         </span>
//                       ) : <span className="text-gray-300">—</span>}
//                     </td>
//                     <td className="px-2.5 py-1.5">
//                       <button
//                         className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold hover:underline"
//                         onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); setIsTicketModalOpen(true); }}
//                       >Actions</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* ═══ CHAT MODAL ═══ */}
//       {isChatModalOpen && selectedTicket && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-2 sm:p-4">
//           <div className="chat-enter bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden"
//             style={{ height: "min(95vh, 700px)" }}>

//             {/* Modal header */}
//             <div className="flex-shrink-0 bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 min-w-0 flex-1">
//                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono flex-shrink-0 ${ticketIdCls(selectedTicket)}`}>
//                     #{selectedTicket.id}
//                   </span>
//                   <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold border flex-shrink-0 ${statusCls(selectedTicket.status)}`}>
//                     {selectedTicket.status?.replace("_", " ")}
//                   </span>
//                   <h2 className="text-sm font-semibold text-white truncate ml-1" title={selectedTicket.title}>
//                     {selectedTicket.title}
//                   </h2>
//                 </div>
//                 <div className="flex items-center gap-1 flex-shrink-0 ml-2">
//                   <button onClick={() => setIsApprovalModalOpen(true)}
//                     className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition" title="IT Approval">
//                     <FileText className="w-3.5 h-3.5 text-white" />
//                   </button>
//                   <button onClick={() => { setSelectedTicketId(selectedTicket.id); setIsTicketModalOpen(true); }}
//                     className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition" title="Actions">
//                     <MoreVertical className="w-3.5 h-3.5 text-white" />
//                   </button>
//                   <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
//                     <TicketAttachmentButton ticket={selectedTicket} />
//                   </div>
//                   <button onClick={closeChatModal}
//                     className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition">
//                     <X className="w-3.5 h-3.5 text-white" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex-shrink-0 bg-gray-50 border-b border-gray-100 px-4 py-2 flex flex-wrap gap-3 text-[11px] text-gray-600">
//               <span className="flex items-center gap-1"><User className="w-3 h-3" />Requester: <span className="font-medium">{selectedTicket.employee?.username || "—"}</span></span>
//               <span className="flex items-center gap-1"><User className="w-3 h-3" />Assignee: <span className="font-medium">{selectedTicket.assignee?.username || "Unassigned"}</span></span>
//               <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Created: <span className="font-medium">{fmt(selectedTicket.createdAt, "d MMM yyyy")}</span></span>
//               {selectedTicket.dueDate && (
//                 <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Due: <span className={`font-medium ${isBef(selectedTicket.dueDate) ? "text-red-600" : "text-emerald-600"}`}>{fmt(selectedTicket.dueDate, "d MMM yyyy")}</span></span>
//               )}
//               <span className="text-gray-400">{selectedTicket.category}</span>
//               {selectedTicket.locationName && <span className="text-gray-400">{selectedTicket.locationName}</span>}
//             </div>

//             {/* Description */}
//             {selectedTicket.description && (
//               <div className="flex-shrink-0 px-4 py-2.5 border-b border-gray-100 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 at-scroll" style={{ maxHeight: "130px", overflowY: "auto" }}>
//                 <p className="text-[11px] text-gray-600 leading-[1.6]" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word" }}>
//                   {selectedTicket.description}
//                 </p>
//               </div>
//             )}

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 min-h-0 at-scroll bg-white">
//               {selectedTicket.messages.filter((m) => m.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user").length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-300 py-8">
//                   <MessageSquare className="w-8 h-8 mb-2 opacity-30" />
//                   <p className="text-xs">No messages yet. Start the conversation!</p>
//                 </div>
//               ) : (
//                 selectedTicket.messages
//                   .filter((m) => m.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user")
//                   .map((msg, idx) => {
//                     const isYou = msg.sender === "You";
//                     const isNote = msg.ticketMessageType === "INTERNAL_NOTE";
//                     return (
//                       <div key={idx} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
//                         <div className={`max-w-[72%] rounded-2xl px-3 py-2 shadow-sm text-xs ${
//                           isYou
//                             ? "bg-blue-600 text-white msg-bubble-user"
//                             : isNote
//                             ? "bg-amber-50 border border-amber-200 text-gray-800 msg-bubble-other"
//                             : "bg-gray-50 border border-gray-100 text-gray-800 msg-bubble-other"
//                         }`}>
//                           <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
//                             <span className={`font-semibold text-[10px] ${isYou ? "text-blue-200" : "text-gray-500"}`}>{msg.sender}</span>
//                             {isNote && <span className="text-[9px] bg-amber-200 text-amber-800 px-1 rounded-full">Internal</span>}
//                             <span className={`text-[10px] ${isYou ? "text-blue-300" : "text-gray-400"}`}>{fmt(msg.sentAt)}</span>
//                           </div>
//                           <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.message}</p>
//                         </div>
//                       </div>
//                     );
//                   })
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Compose */}
//             <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50 px-3 py-2">
//               <div className="relative">
//                 <textarea
//                   className={`w-full text-xs p-2.5 pr-24 border-2 rounded-xl resize-none focus:outline-none focus:ring-2 transition ${
//                     messageType === "INTERNAL_NOTE"
//                       ? "border-amber-300 focus:ring-amber-400 bg-amber-50 placeholder-amber-400"
//                       : "border-gray-200 focus:ring-blue-500 bg-white placeholder-gray-400"
//                   }`}
//                   rows={3}
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder={messageType === "INTERNAL_NOTE" ? "Internal note (IT Team only)..." : "Type your message..."}
//                   onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleAddMessage(); } }}
//                 />
//                 {userRole !== "user" && (
//                   <div className="absolute bottom-2.5 right-2 flex items-center gap-1">
//                     <button type="button" onClick={() => setShowPredefined((p) => !p)}
//                       className="text-gray-400 hover:text-blue-600 transition text-sm" title="Quick replies">💬</button>
//                     <button type="button"
//                       onClick={() => setMessageType((p) => p === "PUBLIC_RESPONSE" ? "INTERNAL_NOTE" : "PUBLIC_RESPONSE")}
//                       className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border transition ${
//                         messageType === "INTERNAL_NOTE"
//                           ? "bg-amber-100 text-amber-700 border-amber-300"
//                           : "bg-emerald-100 text-emerald-700 border-emerald-300"
//                       }`}>{messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}</button>
//                   </div>
//                 )}

//                 {showPredefined && (
//                   <div className="absolute right-0 bottom-full mb-1 z-10 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden w-72">
//                     <div className="px-2.5 py-1.5 bg-gray-50 border-b text-[10px] font-semibold text-gray-500 uppercase">Quick Replies</div>
//                     <div className="max-h-48 overflow-y-auto at-scroll">
//                       {predefinedMessages.map((msg, idx) => (
//                         <button key={idx} onClick={() => { setNewMessage(msg); setShowPredefined(false); }}
//                           className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-blue-50 border-b border-gray-50 last:border-0 transition text-gray-700">
//                           {msg}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center gap-1.5 mt-1.5">
//                 <button
//                   className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={handleAddMessage}
//                   disabled={isSending || !newMessage.trim()}
//                 >
//                   <Send className="w-3 h-3" />
//                   {isSending ? "Sending..." : "Send"}
//                 </button>

//                 {userRole !== "user" && (
//                   <div className="relative">
//                     <button
//                       onClick={() => setDropdownOpen((p) => !p)}
//                       disabled={isSending || !newMessage.trim()}
//                       className="px-2.5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-semibold transition disabled:opacity-50"
//                     >More ▼</button>
//                     {dropdownOpen && (
//                       <div className="absolute right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden min-w-[160px]">
//                         <button
//                           className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition text-gray-700 font-medium"
//                           onClick={async () => {
//                             setDropdownOpen(false);
//                             // Capture ticket ID NOW before any async — avoids stale closure
//                             const currentTicketId = selectedTicket?.id;
//                             try {
//                               await handleAddMessage();
//                               await handleCloseTicket(currentTicketId);
//                               toast.success("Message sent and ticket resolved.");
//                               handleTicketUpdate(currentTicketId);
//                             }
//                             catch { toast.error("Failed."); }
//                           }}
//                         >✅ Send &amp; Resolve</button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <p className="text-[10px] text-gray-400 mt-1">Ctrl+Enter to send quickly</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {Boolean(selectedUser) && <UserDetailsModal query={selectedUser} isOpen onClose={() => setSelectedUser(null)} />}
//       {isTicketModalOpen && (
//         <TicketActionModal
//           ticketId={selectedTicketId}
//           open={isTicketModalOpen}
//           onClose={() => {
//             const closedId = selectedTicketId; // capture before state clears
//             setIsTicketModalOpen(false);
//             handleTicketUpdate(closedId);
//           }}
//         />
//       )}
//       {isApprovalModalOpen && (
//         <ITApprovalModal ticket={selectedTicket} open={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)} />
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
import ITApprovalModal from "../components/ITApprovalHelper";
import TicketActionModal from "../components/TicketActionModal";
import TicketAttachmentButton from "../components/TicketAttachmentButton";
import TicketModal from "../components/TicketFormModal";
import { Button, Card } from "../components/ui";
import {
  format,
  formatDistanceToNow,
  parseISO,
  isBefore,
  subDays,
  isValid,
  differenceInDays,
} from "date-fns";
import dayjs from "dayjs";
import { FileText } from "lucide-react";
import {
  MoreVertical, X, Send, MessageSquare, User, Calendar, Clock,
  ChevronLeft, ChevronRight, Download, SlidersHorizontal,
} from "lucide-react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ─── Date helpers ────────────────────────────────────────────────────────────
const parseAnyDate = (v) => {
  if (!v) return null;
  if (v instanceof Date) return v;
  if (typeof v === "string") { try { return parseISO(v); } catch { return new Date(v); } }
  if (Array.isArray(v) && v.length >= 3) {
    const [y, mo, d, h = 0, mi = 0, s = 0] = v;
    return new Date(y, mo - 1, d, h, mi, s);
  }
  if (typeof v === "number") return new Date(v);
  return null;
};
const fmt = (v, f = "d MMM yyyy, h:mm a") => {
  const d = parseAnyDate(v);
  if (!d || !isValid(d)) return "—";
  try { return format(d, f); } catch { return "—"; }
};
const rel = (v) => {
  const d = parseAnyDate(v);
  if (!d || !isValid(d)) return "—";
  try { return formatDistanceToNow(d, { addSuffix: true }); } catch { return "—"; }
};
const isBef = (v, cmp = new Date()) => {
  const d = parseAnyDate(v);
  return d && isValid(d) ? isBefore(d, cmp) : false;
};

// ─── Ticket ID colour (same logic as TicketingPortal) ───────────────────────
function ticketIdCls(ticket) {
  if (!ticket) return "bg-gray-100 text-gray-700";
  const now = new Date();
  if (ticket.dueDate) {
    const due = parseAnyDate(ticket.dueDate);
    if (due && isValid(due)) {
      if (isBefore(due, now)) return "bg-red-600 text-white font-bold";
      if (differenceInDays(due, now) <= 2) return "bg-orange-500 text-white font-bold";
    }
  }
  if (ticket.createdAt) {
    const cr = parseAnyDate(ticket.createdAt);
    if (cr && isValid(cr) && (now - cr) / 3_600_000 <= 24)
      return "bg-emerald-600 text-white font-bold";
  }
  return "bg-gray-100 text-gray-700";
}

const STATUS_CLS = {
  OPEN: "bg-emerald-100 text-emerald-700 border-emerald-200",
  IN_PROGRESS: "bg-amber-100 text-amber-700 border-amber-200",
  WAITING: "bg-purple-100 text-purple-700 border-purple-200",
  RESOLVED: "bg-blue-100 text-blue-700 border-blue-200",
  CLOSED: "bg-gray-100 text-gray-600 border-gray-200",
  UNASSIGNED: "bg-rose-100 text-rose-700 border-rose-200",
};
const statusCls = (s) => STATUS_CLS[s] || "bg-gray-100 text-gray-600 border-gray-200";

const PAGE_SIZES = [10, 20, 50, 100];

export default function AdminTicketingPortal() {
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
  const [locations, setLocations] = useState([]);
  const [size, setSize] = useState(20);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({ totalElements: 0, totalPages: 0, last: false });
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const advRef = useRef(null);

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
    "HARDWARE","SOFTWARE","NETWORK","PRINTER","UPS","CCTV","FOCUS","EMAIL",
    "DMS","WORKSHOP_DIAGNOSTIC_TOOLS","OTHER","MAINTENANCE","NEW_PROJECT","CUG_SIM","ZOHO_SUPPORT",
  ];
  const hrCategories = ["PAYROLL","RECRUITMENT","HR_OPERATIONS","GENERAL_HR_QUERIES"];
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

  // Close advanced on outside click
  useEffect(() => {
    const h = (e) => { if (advRef.current && !advRef.current.contains(e.target)) setShowAdvanced(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    if (selectedTicket && isChatModalOpen) scrollToBottom();
  }, [selectedTicket?.messages, isChatModalOpen]);

  const scrollToBottom = () => setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

  // ─── Data fetching ────────────────────────────────────────────────────────
  const fetchTicketsWithFilters = async (customPage = page, customSize = size) => {
    setLoading(true);
    try {
      const params = { ...filters, page: customPage, size: customSize };
      Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
      const res = await fetchFilteredTickets(params);
      const { content = [], page: pn, size: ps, totalElements, totalPages, last } = res?.data || {};
      setFilteredTickets(content);
      setPaginationInfo({ totalElements, totalPages, last });
      setPage(pn);
      setSize(ps);
    } catch {
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => { setFilters((p) => ({ ...p, [key]: value })); setPage(0); };

  useEffect(() => { fetchTicketsWithFilters(0); }, [filters]);

  const handlePageSizeChange = (n) => { setSize(n); fetchTicketsWithFilters(0, n); };

  const handleAgeFilter = (r) => {
    const now = new Date();
    const map = {
      "0-7":   { createdAfter: subDays(now, 7).toISOString(),  createdBefore: now.toISOString() },
      "8-15":  { createdAfter: subDays(now, 15).toISOString(), createdBefore: subDays(now, 8).toISOString() },
      "16-30": { createdAfter: subDays(now, 30).toISOString(), createdBefore: subDays(now, 16).toISOString() },
      "31+":   { createdAfter: null, createdBefore: subDays(now, 31).toISOString() },
    };
    setSelectedAgeFilter(r);
    setFilters((p) => ({ ...p, ...(map[r] || { createdAfter: null, createdBefore: null }) }));
    setPage(0);
  };

  const handleDownloadTickets = async () => {
    try {
      const params = { ...filters };
      delete params.page; delete params.size;
      Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
      const response = await downloadFilteredTickets(params);
      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`);
      document.body.appendChild(link); link.click(); link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded successfully");
    } catch {
      toast.error("Failed to download tickets");
    }
  };

  const handleCloseTicket = async (ticketId) => {
    // Capture ID immediately — don't rely on selectedTicket in closure
    const resolveId = ticketId ?? selectedTicket?.id;
    if (!resolveId) return;
    setIsUpdating(true);
    try {
      await updateTicketStatus(resolveId, "RESOLVED");
      toast.success("Status updated");
      fetchTicketsWithFilters();
      const updatedRes = await fetchFilteredTickets({ id: resolveId });
      const updated = updatedRes?.data?.content?.find((t) => t.id === resolveId);
      if (updated) setSelectedTicket(updated);
    } catch { toast.error("Failed to update status"); }
    finally { setIsUpdating(false); }
  };

  const handleAddMessage = async () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    try {
      const saved = await addMessageToTicket(selectedTicket.id, {
        message: newMessage, sender: "You", ticketMessageType: messageType,
      });
      setNewMessage("");
      setSelectedTicket((p) => ({
        ...p,
        messages: [...p.messages, { sender: saved.sender, message: saved.message, ticketMessageType: saved.ticketMessageType, sentAt: saved.sentAt }],
        lastUpdated: new Date().toISOString(),
      }));
      scrollToBottom();
    } catch { toast.error("Failed to send message"); }
    finally { setIsSending(false); }
  };

  const handleSearchSubmit = (e) => { e.preventDefault(); handleFilterChange("search", searchInput.trim()); };

  const handleTicketUpdate = async (ticketIdOverride) => {
    await fetchTicketsWithFilters();
    // Always use the explicitly passed ID to avoid stale closure
    const idToRefresh = ticketIdOverride ?? selectedTicket?.id;
    if (idToRefresh) {
      try {
        const r = await fetchFilteredTickets({ id: idToRefresh });
        const updated = r?.data?.content?.find((t) => t.id === idToRefresh);
        if (updated) setSelectedTicket(updated);
      } catch { /* ignore */ }
    }
  };

  const openChatModal = (t) => { setSelectedTicket(t); setIsChatModalOpen(true); };
  const closeChatModal = () => { setIsChatModalOpen(false); setSelectedTicket(null); };

  useEffect(() => {
    let role = "user";
    if (hasRole("ADMIN") || hasRole("MANAGER")) role = "ADMIN";
    if (hasRole("HR_ADMIN")) role = "HR_ADMIN";
    setUserRole(role);
  }, []);

  useEffect(() => {
    getAssignees().then((r) => setAssignees(r.data.map((u) => ({ employeeId: u.employeeId, name: u.username })))).catch(console.error);
    fetchSites().then((r) => setSites(r.data.map((s) => ({ siteId: s.id, name: s.name })))).catch(console.error);
  }, []);

  useEffect(() => {
    if (filters.siteIdLocationId) getLocationsBySite(filters.siteIdLocationId).then(setLocations).catch(console.error);
    else setLocations([]);
  }, [filters.siteIdLocationId]);

  const advCount = [
    filters.assigneeId, filters.siteIdLocationId, filters.locationId,
    filters.category, filters.createdAfter, selectedAgeFilter,
  ].filter(Boolean).length;

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none transition shadow-sm cursor-pointer";

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .at-table td,.at-table th{white-space:nowrap}
        .at-table td{font-size:11px}
        .at-row:hover{background:#eff6ff!important}
        .at-scroll::-webkit-scrollbar{width:4px;height:4px}
        .at-scroll::-webkit-scrollbar-track{background:transparent}
        .at-scroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
        .shimmer{background:linear-gradient(90deg,#f1f5f9 25%,#e8eeff 50%,#f1f5f9 75%);background-size:200% 100%;animation:sh 1.4s infinite}
        @keyframes sh{0%{background-position:200% 0}100%{background-position:-200% 0}}
        .adv-drop{animation:fadeSlide .15s ease}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
        .chat-enter{animation:chatIn .2s ease}
        @keyframes chatIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
        .msg-bubble-user{border-bottom-right-radius:4px!important}
        .msg-bubble-other{border-bottom-left-radius:4px!important}
      `}</style>

      <TicketModal isOpen={isDialogOpen} onClose={() => { setIsDialogOpen(false); fetchTicketsWithFilters(); }} className="z-50" />

      {/* ═══ TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5">

          {/* Status — always visible */}
          <select
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value || null)}
            className={sel + " min-w-[90px] font-medium"}
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="WAITING">Waiting</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
            <option value="UNASSIGNED">Unassigned</option>
          </select>

          {/* Search — always visible */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-36 sm:w-44 transition"
            />
          </form>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Create */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold transition shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>Create</span>
          </button>

          {/* Advanced */}
          <div className="relative" ref={advRef}>
            <button
              onClick={() => setShowAdvanced((p) => !p)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
                showAdvanced || advCount > 0
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Advanced</span>
              {advCount > 0 && (
                <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                  {advCount}
                </span>
              )}
            </button>

            {showAdvanced && (
              <div className="adv-drop absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[300px] sm:w-[480px] md:w-[620px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
                  <div className="flex items-center gap-2">
                    {advCount > 0 && (
                      <button
                        onClick={() => {
                          setFilters((p) => ({
                            ...p, assigneeId: null, siteIdLocationId: null, locationId: null,
                            category: null, createdAfter: null, createdBefore: null,
                          }));
                          setSelectedAgeFilter(null);
                        }}
                        className="text-[10px] text-red-500 hover:text-red-700 font-medium"
                      >Clear all</button>
                    )}
                    <button onClick={() => setShowAdvanced(false)}><X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" /></button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {/* Assignee */}
                  <select value={filters.assigneeId || ""} onChange={(e) => handleFilterChange("assigneeId", e.target.value || null)} className={sel + " min-w-[110px]"}>
                    <option value="">All Assignees</option>
                    {assignees.map(({ employeeId, name }) => <option key={employeeId} value={employeeId}>{name}</option>)}
                  </select>

                  {/* Site */}
                  <select value={filters.siteIdLocationId || ""} onChange={(e) => handleFilterChange("siteIdLocationId", e.target.value || null)} className={sel + " min-w-[100px]"}>
                    <option value="">All Sites</option>
                    {sites.map(({ siteId, name }) => <option key={siteId} value={siteId}>{name}</option>)}
                  </select>

                  {/* Location */}
                  {locations.length > 0 && (
                    <select value={filters.locationId || ""} onChange={(e) => handleFilterChange("locationId", e.target.value || null)} className={sel + " min-w-[100px]"}>
                      <option value="">All Locations</option>
                      {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                  )}

                  {/* Category */}
                  <select value={filters.category || ""} onChange={(e) => handleFilterChange("category", e.target.value || null)} className={sel + " min-w-[110px]"}>
                    <option value="">All Categories</option>
                    {(userRole === "HR_ADMIN" ? hrCategories : itCategories).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>

                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Age pills */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-medium">Age:</span>
                    {[{k:"0-7",l:"0–7d"},{k:"8-15",l:"8–15d"},{k:"16-30",l:"16–30d"},{k:"31+",l:"31+d"}].map(({ k, l }) => (
                      <button key={k} onClick={() => handleAgeFilter(k)}
                        className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
                          selectedAgeFilter === k ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
                        }`}>{l}</button>
                    ))}
                    {selectedAgeFilter && (
                      <button onClick={() => { setSelectedAgeFilter(null); setFilters((p) => ({ ...p, createdAfter: null, createdBefore: null })); }}
                        className="text-[10px] text-red-400 hover:text-red-600 font-medium">✕</button>
                    )}
                  </div>

                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Export inside advanced */}
                  <button
                    onClick={handleDownloadTickets}
                    disabled={loading}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium disabled:opacity-50 transition shadow-sm"
                  >
                    <Download className="w-3 h-3" />
                    Export Excel
                  </button>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-600 inline-block" />New (&lt;24h)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-500 inline-block" />Due soon (≤2d)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-600 inline-block" />Overdue</span>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => { const np = Math.max(page - 1, 0); setPage(np); fetchTicketsWithFilters(np); }}
              disabled={page === 0 || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            ><ChevronLeft className="w-3 h-3" /></button>
            <span className="text-xs font-medium text-gray-600 px-1 whitespace-nowrap">
              <span className="text-blue-700">{page + 1}</span>
              <span className="text-gray-400"> / </span>
              {paginationInfo.totalPages || 1}
            </span>
            <button
              onClick={() => { const np = page + 1 < paginationInfo.totalPages ? page + 1 : page; setPage(np); fetchTicketsWithFilters(np); }}
              disabled={paginationInfo.last || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            ><ChevronRight className="w-3 h-3" /></button>
          </div>

          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{paginationInfo.totalElements}</span>
            <span className="hidden sm:inline"> tickets</span>
          </span>

          {/* Page size */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map((n) => (
              <button key={n} onClick={() => handlePageSizeChange(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  size === n ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TABLE ═══ */}
      <div className="flex-1 overflow-hidden">
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full at-table" style={{ minWidth: 900 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["ID","Subject","Status","Category","Location","Assignee","Employee","Created","Due Date","Actions"]
                    .map((h, i) => <th key={i} className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 10 }).map((__, j) => (
                      <td key={j} className="px-2.5 py-2.5">
                        <div className="shimmer h-2.5 rounded" style={{ width: `${50 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <MessageSquare className="w-10 h-10 mb-2 opacity-30" />
            <p className="text-sm text-gray-400">No tickets found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Try adjusting your filters.</p>
          </div>
        )}

        {!loading && filteredTickets.length > 0 && (
          <div className="overflow-x-auto at-scroll">
            <table className="w-full at-table" style={{ minWidth: 900, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {["ID","Subject","Status","Category","Location","Assignee","Employee","Created","Due Date","Actions"]
                    .map((h, i) => (
                      <th key={i} className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0">{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket, ri) => (
                  <tr
                    key={ticket.id}
                    className="at-row border-b border-gray-50 cursor-pointer transition-colors"
                    style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
                    onClick={() => openChatModal(ticket)}
                  >
                    <td className="px-2.5 py-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${ticketIdCls(ticket)}`}>
                        #{ticket.id}
                      </span>
                    </td>
                    <td className="px-2.5 py-1.5 max-w-[180px]">
                      <span className="truncate block font-medium text-gray-800" title={ticket.title}>{ticket.title}</span>
                    </td>
                    <td className="px-2.5 py-1.5">
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${statusCls(ticket.status)}`}>
                        {ticket.status?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-2.5 py-1.5 max-w-[100px]">
                      <span className="truncate block text-gray-600">{ticket.category}</span>
                    </td>
                    <td className="px-2.5 py-1.5 max-w-[100px]">
                      <span className="truncate block text-gray-600">{ticket.locationName || "—"}</span>
                    </td>
                    <td className="px-2.5 py-1.5">
                      <button onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.assignee?.employeeId); }}
                        className="text-blue-600 hover:underline text-[11px] truncate">
                        {ticket.assignee?.username || <span className="text-gray-300">—</span>}
                      </button>
                    </td>
                    <td className="px-2.5 py-1.5">
                      <button onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.employee?.employeeId); }}
                        className="text-blue-600 hover:underline text-[11px] truncate">
                        {ticket.employee?.username || <span className="text-gray-300">—</span>}
                      </button>
                    </td>
                    <td className="px-2.5 py-1.5 text-gray-600 whitespace-nowrap">
                      {fmt(ticket.createdAt, "d/M/yy")}
                      <span className="text-gray-400 text-[10px] ml-1">({rel(ticket.createdAt)})</span>
                    </td>
                    <td className="px-2.5 py-1.5 whitespace-nowrap">
                      {ticket.dueDate ? (
                        <span className={isBef(ticket.dueDate) ? "text-red-600 font-semibold" : "text-emerald-600"}>
                          {fmt(ticket.dueDate, "d/M/yy")}
                          {isBef(ticket.dueDate) && " ⚠"}
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-2.5 py-1.5">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold hover:underline"
                        onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); setIsTicketModalOpen(true); }}
                      >Actions</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══ CHAT MODAL ═══ */}
      {isChatModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="chat-enter bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden"
            style={{ height: "min(95vh, 700px)" }}>

            {/* Modal header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono flex-shrink-0 ${ticketIdCls(selectedTicket)}`}>
                    #{selectedTicket.id}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold border flex-shrink-0 ${statusCls(selectedTicket.status)}`}>
                    {selectedTicket.status?.replace("_", " ")}
                  </span>
                  <h2 className="text-sm font-semibold text-white truncate ml-1" title={selectedTicket.title}>
                    {selectedTicket.title}
                  </h2>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <button onClick={() => setIsApprovalModalOpen(true)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition" title="IT Approval">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </button>
                  <button onClick={() => { setSelectedTicketId(selectedTicket.id); setIsTicketModalOpen(true); }}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition" title="Actions">
                    <MoreVertical className="w-3.5 h-3.5 text-white" />
                  </button>
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                    <TicketAttachmentButton ticket={selectedTicket} />
                  </div>
                  <button onClick={closeChatModal}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition">
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div className="flex-shrink-0 bg-gray-50 border-b border-gray-100 px-4 py-2 flex flex-wrap gap-3 text-[11px] text-gray-600">
              <span className="flex items-center gap-1"><User className="w-3 h-3" />Requester: <span className="font-medium">{selectedTicket.employee?.username || "—"}</span></span>
              <span className="flex items-center gap-1"><User className="w-3 h-3" />Assignee: <span className="font-medium">{selectedTicket.assignee?.username || "Unassigned"}</span></span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Created: <span className="font-medium">{fmt(selectedTicket.createdAt, "d MMM yyyy")}</span></span>
              {selectedTicket.dueDate && (
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Due: <span className={`font-medium ${isBef(selectedTicket.dueDate) ? "text-red-600" : "text-emerald-600"}`}>{fmt(selectedTicket.dueDate, "d MMM yyyy")}</span></span>
              )}
              <span className="text-gray-400">{selectedTicket.category}</span>
              {selectedTicket.locationName && <span className="text-gray-400">{selectedTicket.locationName}</span>}
            </div>

            {/* Single scroll area: description on top, then messages */}
            <div className="flex-1 overflow-y-auto min-h-0 at-scroll bg-white">

              {/* Description block — full height, no inner scroll */}
              {selectedTicket.description && (
                <div className="px-4 pt-3 pb-3 border-b border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">Description</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-[1.65]" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {selectedTicket.description}
                  </p>
                </div>
              )}

              {/* Messages */}
              <div className="px-4 py-3 space-y-2">
              {selectedTicket.messages.filter((m) => m.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-300">
                  <MessageSquare className="w-8 h-8 mb-2 opacity-30" />
                  <p className="text-xs">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                selectedTicket.messages
                  .filter((m) => m.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user")
                  .map((msg, idx) => {
                    const isYou = msg.sender === "You";
                    const isNote = msg.ticketMessageType === "INTERNAL_NOTE";
                    return (
                      <div key={idx} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[72%] rounded-2xl px-3 py-2 shadow-sm text-xs ${
                          isYou
                            ? "bg-blue-600 text-white msg-bubble-user"
                            : isNote
                            ? "bg-amber-50 border border-amber-200 text-gray-800 msg-bubble-other"
                            : "bg-gray-50 border border-gray-100 text-gray-800 msg-bubble-other"
                        }`}>
                          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <span className={`font-semibold text-[10px] ${isYou ? "text-blue-200" : "text-gray-500"}`}>{msg.sender}</span>
                            {isNote && <span className="text-[9px] bg-amber-200 text-amber-800 px-1 rounded-full">Internal</span>}
                            <span className={`text-[10px] ${isYou ? "text-blue-300" : "text-gray-400"}`}>{fmt(msg.sentAt)}</span>
                          </div>
                          <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.message}</p>
                        </div>
                      </div>
                    );
                  })
              )}
              <div ref={messagesEndRef} />
              </div>{/* end messages inner */}
            </div>{/* end single scroll area */}

            {/* Compose */}
            <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50 px-3 py-2">
              <div className="relative">
                <textarea
                  className={`w-full text-xs p-2.5 pr-24 border-2 rounded-xl resize-none focus:outline-none focus:ring-2 transition ${
                    messageType === "INTERNAL_NOTE"
                      ? "border-amber-300 focus:ring-amber-400 bg-amber-50 placeholder-amber-400"
                      : "border-gray-200 focus:ring-blue-500 bg-white placeholder-gray-400"
                  }`}
                  rows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={messageType === "INTERNAL_NOTE" ? "Internal note (IT Team only)..." : "Type your message..."}
                  onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleAddMessage(); } }}
                />
                {userRole !== "user" && (
                  <div className="absolute bottom-2.5 right-2 flex items-center gap-1">
                    <button type="button" onClick={() => setShowPredefined((p) => !p)}
                      className="text-gray-400 hover:text-blue-600 transition text-sm" title="Quick replies">💬</button>
                    <button type="button"
                      onClick={() => setMessageType((p) => p === "PUBLIC_RESPONSE" ? "INTERNAL_NOTE" : "PUBLIC_RESPONSE")}
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border transition ${
                        messageType === "INTERNAL_NOTE"
                          ? "bg-amber-100 text-amber-700 border-amber-300"
                          : "bg-emerald-100 text-emerald-700 border-emerald-300"
                      }`}>{messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}</button>
                  </div>
                )}

                {showPredefined && (
                  <div className="absolute right-0 bottom-full mb-1 z-10 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden w-72">
                    <div className="px-2.5 py-1.5 bg-gray-50 border-b text-[10px] font-semibold text-gray-500 uppercase">Quick Replies</div>
                    <div className="max-h-48 overflow-y-auto at-scroll">
                      {predefinedMessages.map((msg, idx) => (
                        <button key={idx} onClick={() => { setNewMessage(msg); setShowPredefined(false); }}
                          className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-blue-50 border-b border-gray-50 last:border-0 transition text-gray-700">
                          {msg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 mt-1.5">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddMessage}
                  disabled={isSending || !newMessage.trim()}
                >
                  <Send className="w-3 h-3" />
                  {isSending ? "Sending..." : "Send"}
                </button>

                {userRole !== "user" && (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen((p) => !p)}
                      disabled={isSending || !newMessage.trim()}
                      className="px-2.5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-semibold transition disabled:opacity-50"
                    >More ▼</button>
                    {dropdownOpen && (
                      <div className="absolute right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden min-w-[160px]">
                        <button
                          className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition text-gray-700 font-medium"
                          onClick={async () => {
                            setDropdownOpen(false);
                            // Capture ticket ID NOW before any async — avoids stale closure
                            const currentTicketId = selectedTicket?.id;
                            try {
                              await handleAddMessage();
                              await handleCloseTicket(currentTicketId);
                              toast.success("Message sent and ticket resolved.");
                              handleTicketUpdate(currentTicketId);
                            }
                            catch { toast.error("Failed."); }
                          }}
                        >✅ Send &amp; Resolve</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Ctrl+Enter to send quickly</p>
            </div>
          </div>
        </div>
      )}

      {Boolean(selectedUser) && <UserDetailsModal query={selectedUser} isOpen onClose={() => setSelectedUser(null)} />}
      {isTicketModalOpen && (
        <TicketActionModal
          ticketId={selectedTicketId}
          open={isTicketModalOpen}
          onClose={() => {
            const closedId = selectedTicketId; // capture before state clears
            setIsTicketModalOpen(false);
            handleTicketUpdate(closedId);
          }}
        />
      )}
      {isApprovalModalOpen && (
        <ITApprovalModal ticket={selectedTicket} open={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)} />
      )}
    </div>
  );
}