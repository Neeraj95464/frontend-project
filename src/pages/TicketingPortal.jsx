

// import UserDetailsModal from "../components/UserDetailsModal";
// import {
//   getTickets,
//   addMessageToTicket,
//   hasRole,
//   updateTicketStatus,
//   searchTickets,
//   getAssignees,
//   fetchSites,
//   downloadUserTickets,
//   getLocationsBySite,
// } from "../services/api";
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
//   differenceInDays,
// } from "date-fns";
// import dayjs from "dayjs";
// import {
//   MoreVertical, Filter, X, Maximize2, Minimize2,
//   Send, ChevronDown, SlidersHorizontal, ChevronLeft, ChevronRight,
// } from "lucide-react";
// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function getTicketIdColor(ticket) {
//   if (!ticket) return "text-gray-700 bg-gray-100";
//   const now = new Date();
//   if (ticket.dueDate) {
//     const due = parseISO(ticket.dueDate);
//     const daysUntilDue = differenceInDays(due, now);
//     if (isBefore(due, now)) return "text-white bg-red-600 font-bold";
//     if (daysUntilDue <= 2) return "text-white bg-orange-500 font-bold";
//   }
//   if (ticket.createdAt) {
//     const created = parseISO(ticket.createdAt);
//     const hoursOld = (now - created) / 3600000;
//     if (hoursOld <= 24) return "text-white bg-emerald-600 font-bold";
//   }
//   return "text-gray-700 bg-gray-100";
// }

// const STATUS_BADGE = {
//   OPEN: "bg-emerald-100 text-emerald-700 border border-emerald-200",
//   WAITING: "bg-amber-100 text-amber-700 border border-amber-200",
//   RESOLVED: "bg-blue-100 text-blue-700 border border-blue-200",
//   CLOSED: "bg-gray-100 text-gray-600 border border-gray-200",
//   UNASSIGNED: "bg-rose-100 text-rose-700 border border-rose-200",
// };

// const PAGE_SIZES = [10, 20, 50, 100];

// export default function TicketingPortal() {
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = React.useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
//   const [ticketStatus, setTicketStatus] = useState("");
//   const navigate = useNavigate();
//   const [showPredefined, setShowPredefined] = useState(false);
//   const [userRole, setUserRole] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
//   const messagesEndRef = useRef(null);
//   const advancedRef = useRef(null);

//   const [searchInput, setSearchInput] = useState("");
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(10);
//   const [paginationInfo, setPaginationInfo] = useState({ totalElements: 0, totalPages: 0, last: false });
//   const [loading, setLoading] = useState(false);
//   const [isSending, setIsSending] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [filters, setFilters] = useState({
//     title: "",
//     status: "OPEN",
//     feedbackReceived: null,
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
//     "DMS","WORKSHOP_DIAGNOSTIC_TOOLS","OTHER","MAINTENANCE","NEW_PROJECT",
//     "CUG_SIM","ZOHO_SUPPORT",
//   ];
//   const hrCategories = ["PAYROLL","RECRUITMENT","HR_OPERATIONS","GENERAL_HR_QUERIES"];
//   const predefinedMessages = [
//     "Thank you for your patience. we are still actively working on your issue",
//     "Dear team, We are looking into your issue.",
//     "Dear team, Could you please provide more details?",
//     "Dear team, As solution has been provided will move to close the ticket.",
//   ];

//   // Close advanced dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (advancedRef.current && !advancedRef.current.contains(e.target)) {
//         setShowAdvanced(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     if (selectedTicket && messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [selectedTicket?.messages]);

//   const handleDownloadTickets = async () => {
//     try {
//       const params = { ...filters };
//       delete params.page; delete params.size;
//       Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
//       const response = await downloadUserTickets(params);
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//       toast.success("Tickets downloaded successfully");
//     } catch (error) {
//       toast.error("Failed to download tickets");
//     }
//   };

//   useEffect(() => {
//     fetchSites()
//       .then((res) => setSites(res.data.map((s) => ({ siteId: s.id, name: s.name }))))
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (filters.siteIdLocationId) {
//       getLocationsBySite(filters.siteIdLocationId).then(setLocations).catch(console.error);
//     } else {
//       setLocations([]);
//     }
//   }, [filters.siteIdLocationId]);

//   const handleCloseTicket = async () => {
//     setIsUpdating(true);
//     try {
//       await updateTicketStatus(selectedTicket.id, "RESOLVED");
//       toast.success("Status updated");
//       setSelectedTicket((p) => ({ ...p, status: "RESOLVED" }));
//       refreshTicketList();
//     } catch { toast.error("Failed to update status"); }
//     finally { setIsUpdating(false); }
//   };

//   const handleStatusChange = async (ticketId, newStatus) => {
//     setIsUpdating(true);
//     try {
//       await updateTicketStatus(ticketId, newStatus);
//       toast.success("Status updated");
//       refreshTicketList();
//     } catch { toast.error("Failed to update status"); }
//     finally { setIsUpdating(false); }
//   };

//   const handleAddMessage = async () => {
//     if (!newMessage.trim()) return;
//     setIsSending(true);
//     try {
//       const messageDTO = { message: newMessage, sender: "You", ticketMessageType: messageType };
//       const saved = await addMessageToTicket(selectedTicket.id, messageDTO);
//       setNewMessage("");
//       setSelectedTicket((p) => ({
//         ...p,
//         messages: [...p.messages, {
//           sender: saved.sender, message: saved.message,
//           ticketMessageType: saved.ticketMessageType,
//           sentAt: new Date(saved.sentAt || Date.now()),
//         }],
//       }));
//       refreshTicketList();
//     } catch { console.error("Error adding message"); }
//     finally { setIsSending(false); }
//   };

//   const refreshTicketList = async () => { await fetchTicketsWithFilters(page); };

//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();
//     const query = searchInput.trim();
//     if (!query) { setFilteredTickets(tickets); return; }
//     try {
//       setLoading(true);
//       const res = await searchTickets({ query });
//       const { content = [], totalElements, totalPages, last } = res || {};
//       setFilteredTickets(content);
//       setPaginationInfo({ totalElements, totalPages, last });
//     } catch { console.error("Search error"); }
//     finally { setLoading(false); }
//   };

//   const fetchTicketsWithFilters = async (customPage = page, customSize = size) => {
//     setLoading(true);
//     try {
//       const params = { ...filters, page: customPage, size: customSize, employeeId: "ALL" };
//       Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
//       const res = await getTickets(params);
//       const { content = [], page: pn, size: ps, totalElements, totalPages, last } = res || {};
//       setFilteredTickets(content);
//       setPaginationInfo({ totalElements, totalPages, last });
//       setPage(pn);
//       setSize(ps);
//     } catch { toast.error("Failed to fetch tickets"); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchTicketsWithFilters(0); }, [filters]);

//   const handleTicketActionModalClose = () => {
//     setIsTicketModalOpen(false);
//     setSelectedTicketId(null);
//     refreshTicketList();
//   };

//   const handleCreateTicketModalClose = () => {
//     setIsDialogOpen(false);
//     refreshTicketList();
//   };

//   const handleAgeFilter = (ageRange) => {
//     const now = new Date();
//     let createdAfter = null, createdBefore = null;
//     if (ageRange === "0-7") { createdAfter = subDays(now, 7).toISOString(); createdBefore = now.toISOString(); }
//     else if (ageRange === "8-15") { createdAfter = subDays(now, 15).toISOString(); createdBefore = subDays(now, 8).toISOString(); }
//     else if (ageRange === "16-30") { createdAfter = subDays(now, 30).toISOString(); createdBefore = subDays(now, 16).toISOString(); }
//     else if (ageRange === "31+") { createdBefore = subDays(now, 31).toISOString(); }
//     setSelectedAgeFilter(ageRange);
//     setFilters((p) => ({ ...p, createdAfter, createdBefore }));
//     setPage(0);
//   };

//   const handleCloseChatPanel = () => {
//     setSelectedTicket(null);
//     setIsMaximized(false);
//     refreshTicketList();
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters((p) => ({ ...p, [key]: value }));
//     setPage(0);
//   };

//   const handlePageSizeChange = (newSize) => {
//     setSize(newSize);
//     fetchTicketsWithFilters(0, newSize);
//   };

//   useEffect(() => {
//     let role = "user";
//     if (hasRole("ADMIN") || hasRole("HR_ADMIN") || hasRole("EXECUTIVE") || hasRole("MANAGER")) role = "admin";
//     setUserRole(role);
//   }, []);

//   // Count active advanced filters
//   const advancedFilterCount = [
//     filters.feedbackReceived, filters.category, filters.siteIdLocationId,
//     filters.locationId, filters.assigneeId, filters.createdAfter, selectedAgeFilter,
//   ].filter(Boolean).length;

//   const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer shadow-sm";

//   return (
//     <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
//       <style>{`
//         .tp-table td, .tp-table th { white-space: nowrap; }
//         .tp-table td { font-size: 11px; }
//         .tp-row:hover { background: #f0f7ff !important; }
//         .tp-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
//         .tp-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .tp-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
//         .tp-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//         .shimmer { background: linear-gradient(90deg, #f1f5f9 25%, #e8eeff 50%, #f1f5f9 75%); background-size: 200% 100%; animation: sh 1.4s infinite; }
//         @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//         .adv-panel { animation: fadeSlide 0.15s ease; }
//         @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
//         .chat-panel { animation: slideIn 0.2s ease; }
//         @keyframes slideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
//       `}</style>

//       <TicketModal isOpen={isDialogOpen} onClose={handleCreateTicketModalClose} className="z-50" />

//       {/* ═══ TOOLBAR ═══ */}
//       <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
//         <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5">

//           {/* Status filter — always visible */}
//           <select
//             value={filters.status || ""}
//             onChange={(e) => handleFilterChange("status", e.target.value || null)}
//             className={sel + " min-w-[88px] font-medium"}
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

//           {/* Divider */}
//           <div className="h-5 w-px bg-gray-200 hidden sm:block" />

//           {/* Create */}
//           <button
//             onClick={() => setIsDialogOpen(true)}
//             className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-md font-semibold transition shadow-sm"
//           >
//             <span className="text-sm leading-none">+</span>
//             <span>Create</span>
//           </button>

//           {/* Advanced filter toggle */}
//           <div className="relative" ref={advancedRef}>
//             <button
//               onClick={() => setShowAdvanced((p) => !p)}
//               className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
//                 showAdvanced || advancedFilterCount > 0
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
//               }`}
//             >
//               <SlidersHorizontal className="w-3 h-3" />
//               <span className="hidden sm:inline">Advanced</span>
//               {advancedFilterCount > 0 && (
//                 <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
//                   {advancedFilterCount}
//                 </span>
//               )}
//             </button>

//             {/* Advanced dropdown panel */}
//             {showAdvanced && (
//               <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[320px] sm:w-[480px] md:w-[640px]">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
//                   <div className="flex items-center gap-2">
//                     {advancedFilterCount > 0 && (
//                       <button
//                         onClick={() => {
//                           setFilters((p) => ({
//                             ...p, feedbackReceived: null, category: null,
//                             siteIdLocationId: null, locationId: null,
//                             assigneeId: null, createdAfter: null, createdBefore: null,
//                           }));
//                           setSelectedAgeFilter(null);
//                         }}
//                         className="text-[10px] text-red-500 hover:text-red-700 font-medium"
//                       >
//                         Clear all
//                       </button>
//                     )}
//                     <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>

//                   <button
//             onClick={handleDownloadTickets}
//             disabled={loading}
//             className="flex items-center gap-1 px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium disabled:opacity-50 transition shadow-sm"
//           >
//             <span>↓</span>
//             <span className="hidden sm:inline">Export</span>
//           </button>
//                 </div>

//                 <div className="flex flex-wrap gap-1.5">
//                   {/* Feedback (conditional) */}
//                   {(filters.status === "CLOSED" || filters.status === "RESOLVED") && (
//                     <select
//                       value={filters.feedbackReceived ?? ""}
//                       onChange={(e) => handleFilterChange("feedbackReceived", e.target.value === "" ? null : e.target.value === "true")}
//                       className={sel + " min-w-[110px]"}
//                     >
//                       <option value="">All Feedback</option>
//                       <option value="true">Received</option>
//                       <option value="false">Not Received</option>
//                     </select>
//                   )}

//                   {/* Site */}
//                   <select
//                     value={filters.siteIdLocationId || ""}
//                     onChange={(e) => handleFilterChange("siteIdLocationId", e.target.value || null)}
//                     className={sel + " min-w-[100px]"}
//                   >
//                     <option value="">All Sites</option>
//                     {sites.map(({ siteId, name }) => <option key={siteId} value={siteId}>{name}</option>)}
//                   </select>

//                   {/* Location */}
//                   {locations.length > 0 && (
//                     <select
//                       value={filters.locationId || ""}
//                       onChange={(e) => handleFilterChange("locationId", e.target.value || null)}
//                       className={sel + " min-w-[110px]"}
//                     >
//                       <option value="">All Locations</option>
//                       {locations.map((loc) => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
//                     </select>
//                   )}

//                   {/* Category */}
//                   <select
//                     value={filters.category || ""}
//                     onChange={(e) => handleFilterChange("category", e.target.value || null)}
//                     className={sel + " min-w-[110px]"}
//                   >
//                     <option value="">All Categories</option>
//                     {(userRole === "HR_ADMIN" ? hrCategories : itCategories).map((c) => (
//                       <option key={c} value={c}>{c}</option>
//                     ))}
//                   </select>

//                   {/* Divider */}
//                   <div className="h-px w-full bg-gray-100 my-0.5" />

//                   {/* Age filter pills */}
//                   <div className="flex items-center gap-1 flex-wrap">
//                     <span className="text-[10px] text-gray-400 font-medium">Age:</span>
//                     {[{k:"0-7",l:"0–7d"},{k:"8-15",l:"8–15d"},{k:"16-30",l:"16–30d"},{k:"31+",l:"31+d"}].map(({ k, l }) => (
//                       <button
//                         key={k}
//                         onClick={() => handleAgeFilter(k)}
//                         className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
//                           selectedAgeFilter === k
//                             ? "bg-blue-600 text-white border-blue-600"
//                             : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
//                         }`}
//                       >
//                         {l}
//                       </button>
//                     ))}
//                     {selectedAgeFilter && (
//                       <button
//                         onClick={() => { setSelectedAgeFilter(null); setFilters((p) => ({ ...p, createdAfter: null, createdBefore: null })); }}
//                         className="text-[10px] text-red-400 hover:text-red-600 font-medium"
//                       >✕</button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Color legend */}
//                 <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
//                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-600 inline-block" />New (&lt;24h)</span>
//                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-500 inline-block" />Due soon (≤2d)</span>
//                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-600 inline-block" />Overdue</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Divider */}
//           <div className="h-5 w-px bg-gray-200 hidden sm:block" />

//           {/* Pagination */}
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => { const np = Math.max(page - 1, 0); setPage(np); fetchTicketsWithFilters(np); }}
//               disabled={page === 0 || loading}
//               className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
//             >
//               <ChevronLeft className="w-3 h-3" />
//             </button>
//             <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
//               <span className="text-blue-700">{page + 1}</span>
//               <span className="text-gray-400"> / </span>
//               {paginationInfo.totalPages || 1}
//             </span>
//             <button
//               onClick={() => { const np = page + 1 < paginationInfo.totalPages ? page + 1 : page; setPage(np); fetchTicketsWithFilters(np); }}
//               disabled={paginationInfo.last || loading}
//               className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
//             >
//               <ChevronRight className="w-3 h-3" />
//             </button>
//           </div>

//           {/* Total count */}
//           <span className="text-xs text-gray-500 whitespace-nowrap">
//             <span className="font-semibold text-gray-700">{paginationInfo.totalElements}</span>
//             <span className="hidden sm:inline"> tickets</span>
//           </span>

//           {/* Page size */}
//           <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
//             <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
//             {PAGE_SIZES.map((n) => (
//               <button
//                 key={n}
//                 onClick={() => handlePageSizeChange(n)}
//                 className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
//                   size === n
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
//                 }`}
//               >
//                 {n}
//               </button>
//             ))}
//           </div>

//           {/* Download */}
          
//         </div>
//       </div>

//       {/* ═══ TABLE ═══ */}
//       <div className="flex-1 overflow-hidden">
//         {loading && (
//           <div className="overflow-x-auto">
//             <table className="w-full tp-table" style={{ minWidth: 1100 }}>
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   {["ID","Subject","Status","Category","Location","Assignee","Employee","Created","Responded","Due","Updated","Closed",...(userRole!=="user"?["Actions"]:[])]
//                     .map((h, i) => (
//                       <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
//                     ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.from({ length: size > 10 ? 8 : 5 }).map((_, i) => (
//                   <tr key={i} className="border-b border-gray-50">
//                     {Array.from({ length: 13 }).map((__, j) => (
//                       <td key={j} className="px-2.5 py-2">
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
//             <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                 d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//             <p className="text-sm text-gray-400">No tickets found.</p>
//             <p className="text-xs text-gray-300 mt-0.5">Try changing your filters.</p>
//           </div>
//         )}

//         {!loading && filteredTickets.length > 0 && (
//           <div className="overflow-x-auto tp-scrollbar">
//             <table className="w-full tp-table" style={{ minWidth: 1100, borderCollapse: "collapse" }}>
//               <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
//                 <tr>
//                   {[
//                     "ID","Subject","Status","Category","Location",
//                     "Assignee","Employee","Created","Responded","Due",
//                     "Updated","Closed",
//                     ...(userRole !== "user" ? ["Actions"] : []),
//                   ].map((h, i) => (
//                     <th key={i} className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0">
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTickets.map((ticket, ri) => {
//                   const idCls = getTicketIdColor(ticket);
//                   return (
//                     <tr
//                       key={ticket.id}
//                       className="tp-row border-b border-gray-50 cursor-pointer transition-colors"
//                       style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
//                       onClick={() => setSelectedTicket(ticket)}
//                       onDoubleClick={() => {
//                         if (userRole === "admin") { setIsTicketModalOpen(true); setSelectedTicketId(ticket.id); }
//                       }}
//                     >
//                       <td className="px-2.5 py-1.5">
//                         <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${idCls}`}>#{ticket.id}</span>
//                       </td>
//                       <td className="px-2.5 py-1.5 max-w-[180px]">
//                         <span className="truncate block font-medium text-gray-800" title={ticket.title}>{ticket.title}</span>
//                       </td>
//                       <td className="px-2.5 py-1.5">
//                         <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${STATUS_BADGE[ticket.status] || "bg-gray-100 text-gray-600"}`}>
//                           {ticket.status?.replace("_", " ")}
//                         </span>
//                       </td>
//                       <td className="px-2.5 py-1.5 max-w-[100px]">
//                         <span className="truncate block text-gray-600">{ticket.category}</span>
//                       </td>
//                       <td className="px-2.5 py-1.5 max-w-[100px]">
//                         <span className="truncate block text-gray-600">{ticket.locationName}</span>
//                       </td>
//                       <td className="px-2.5 py-1.5">
//                         {userRole !== "user" ? (
//                           <button
//                             onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.assignee?.employeeId); }}
//                             className="text-blue-600 hover:underline truncate text-[11px]"
//                           >
//                             {ticket.assignee?.username || <span className="text-gray-300 not-italic">—</span>}
//                           </button>
//                         ) : (
//                           <span className="text-gray-700">{ticket.assignee?.username || "—"}</span>
//                         )}
//                       </td>
//                       <td className="px-2.5 py-1.5">
//                         {userRole !== "user" ? (
//                           <button
//                             onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.employee?.employeeId); }}
//                             className="text-blue-600 hover:underline truncate text-[11px]"
//                           >
//                             {ticket.employee?.username || <span className="text-gray-300">—</span>}
//                           </button>
//                         ) : (
//                           <span className="text-gray-700">{ticket.employee?.username || "—"}</span>
//                         )}
//                       </td>
//                       <td className="px-2.5 py-1.5 text-gray-600">
//                         {format(parseISO(ticket.createdAt), "d/M/yy")}
//                         <span className="text-gray-400 text-[10px] ml-1">
//                           ({formatDistanceToNow(parseISO(ticket.createdAt), { addSuffix: true })})
//                         </span>
//                       </td>
//                       <td className="px-2.5 py-1.5">
//                         {ticket.firstRespondedAt
//                           ? <span className="text-gray-600">{format(parseISO(ticket.firstRespondedAt.split(".")[0]), "d/M/yy")}</span>
//                           : <span className="text-gray-300">—</span>}
//                       </td>
//                       <td className="px-2.5 py-1.5">
//                         {ticket.dueDate
//                           ? <span className={isBefore(parseISO(ticket.dueDate), new Date()) ? "text-red-600 font-semibold" : "text-emerald-600"}>
//                               {format(parseISO(ticket.dueDate.split(".")[0]), "d/M/yy")}
//                               {isBefore(parseISO(ticket.dueDate), new Date()) && " ⚠"}
//                             </span>
//                           : <span className="text-gray-300">—</span>}
//                       </td>
//                       <td className="px-2.5 py-1.5">
//                         {ticket.lastUpdated
//                           ? <span className="text-blue-600">{format(parseISO(ticket.lastUpdated.split(".")[0]), "d/M/yy")}</span>
//                           : <span className="text-gray-300">—</span>}
//                       </td>
//                       <td className="px-2.5 py-1.5">
//                         {ticket.closedAt
//                           ? <span className="text-emerald-600">{format(parseISO(ticket.closedAt.split(".")[0]), "d/M/yy")}</span>
//                           : <span className="text-gray-300">—</span>}
//                       </td>
//                       {userRole !== "user" && (
//                         <td className="px-2.5 py-1.5">
//                           <button
//                             className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold hover:underline"
//                             onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); setIsTicketModalOpen(true); }}
//                           >
//                             Actions
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* ═══ CHAT PANEL ═══ */}
//       {selectedTicket && (
//         <>
//           <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[2px]" onClick={handleCloseChatPanel} />
//           <div
//             className={`chat-panel fixed z-50 bg-white shadow-2xl flex flex-col transition-all duration-200
//               ${isMaximized
//                 ? "inset-0 rounded-none"
//                 : "bottom-0 right-0 left-0 sm:left-auto sm:top-[52px] sm:bottom-0 sm:w-[360px] rounded-t-xl sm:rounded-none sm:rounded-l-xl"
//               }`}
//             style={!isMaximized ? { maxHeight: "calc(100vh - 52px)" } : {}}
//           >
//             {/* Panel header */}
//             <div className="flex-shrink-0 px-3 py-2.5 border-b border-gray-100 bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-1.5 flex-1 min-w-0">
//                   <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono flex-shrink-0 ${getTicketIdColor(selectedTicket)}`}>
//                     #{selectedTicket?.id}
//                   </span>
//                   <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${STATUS_BADGE[selectedTicket.status] || "bg-gray-100"}`}>
//                     {selectedTicket.status?.replace("_", " ")}
//                   </span>
//                   <h2 className="text-xs font-semibold text-gray-800 truncate ml-0.5" title={selectedTicket.title}>
//                     {selectedTicket.title}
//                   </h2>
//                 </div>

//                 <div className="flex items-center gap-1 flex-shrink-0 ml-2">
//                   {userRole === "user" && selectedTicket?.status === "RESOLVED" && (
//                     <button
//                       disabled={isUpdating}
//                       onClick={() => handleStatusChange(selectedTicket?.id, "REOPENED")}
//                       className="text-[10px] px-2 py-0.5 rounded font-semibold bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition"
//                     >
//                       {isUpdating ? "..." : "Reopen"}
//                     </button>
//                   )}
//                   {userRole !== "user" && (
//                     <button
//                       onClick={(e) => { e.stopPropagation(); setSelectedTicketId(selectedTicket.id); setIsTicketModalOpen(true); }}
//                       className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
//                       title="Ticket actions"
//                     >
//                       <MoreVertical className="w-3.5 h-3.5 text-gray-600" />
//                     </button>
//                   )}
//                   <div className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
//                     <TicketAttachmentButton ticket={selectedTicket} />
//                   </div>
//                   <button
//                     onClick={() => setIsMaximized((p) => !p)}
//                     className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
//                   >
//                     {isMaximized ? <Minimize2 className="w-3.5 h-3.5 text-gray-600" /> : <Maximize2 className="w-3.5 h-3.5 text-gray-600" />}
//                   </button>
//                   <button
//                     onClick={handleCloseChatPanel}
//                     className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
//                   >
//                     <X className="w-3.5 h-3.5 text-white" />
//                   </button>
//                 </div>
//               </div>

//               {selectedTicket.description && (
//                 <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed whitespace-pre-wrap max-h-20 overflow-y-auto tp-scrollbar border-t border-gray-100 pt-1.5">
//                   {selectedTicket.description}
//                 </p>
//               )}
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 min-h-0 tp-scrollbar">
//               {selectedTicket.messages.filter((msg) =>
//                 msg.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user"
//               ).length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-300 py-8">
//                   <svg className="w-7 h-7 mb-1.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                       d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                   </svg>
//                   <p className="text-xs">No messages yet.</p>
//                 </div>
//               ) : (
//                 selectedTicket.messages
//                   .filter((msg) => msg.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user")
//                   .map((msg, idx) => (
//                     <div
//                       key={idx}
//                       className={`rounded-lg px-2.5 py-2 text-xs ${
//                         msg.ticketMessageType === "INTERNAL_NOTE"
//                           ? "bg-amber-50 border border-amber-200"
//                           : "bg-gray-50 border border-gray-100"
//                       }`}
//                     >
//                       <div className="flex justify-between items-center mb-0.5">
//                         <span className="font-semibold text-blue-600 text-[11px]">{msg.sender}</span>
//                         <span className="text-[10px] text-gray-400 flex items-center gap-1">
//                           {msg.ticketMessageType === "INTERNAL_NOTE" && <span className="text-amber-600">🛡</span>}
//                           {new Date(msg.sentAt).toLocaleString()}
//                         </span>
//                       </div>
//                       <p className="text-gray-700 text-[11px] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
//                     </div>
//                   ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Compose */}
//             <div className="flex-shrink-0 px-3 py-2 border-t border-gray-100 bg-gray-50">
//               <div className="relative">
//                 <textarea
//                   className={`w-full text-xs p-2 pr-20 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
//                     messageType === "INTERNAL_NOTE"
//                       ? "bg-amber-50 border-amber-300 placeholder-amber-400"
//                       : "bg-white border-gray-200 placeholder-gray-400"
//                   }`}
//                   rows={3}
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder={messageType === "INTERNAL_NOTE" ? "Internal note (IT Team only)..." : "Write a message..."}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleAddMessage(); }
//                   }}
//                 />
//                 {userRole !== "user" && (
//                   <div className="absolute bottom-2 right-2 flex items-center gap-1">
//                     <button type="button" onClick={() => setShowPredefined((p) => !p)} className="text-gray-400 hover:text-blue-600 transition text-sm" title="Predefined messages">
//                       💬
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setMessageType((p) => p === "PUBLIC_RESPONSE" ? "INTERNAL_NOTE" : "PUBLIC_RESPONSE")}
//                       className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border transition ${
//                         messageType === "INTERNAL_NOTE"
//                           ? "bg-amber-100 text-amber-700 border-amber-300"
//                           : "bg-emerald-100 text-emerald-700 border-emerald-300"
//                       }`}
//                     >
//                       {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}
//                     </button>
//                   </div>
//                 )}

//                 {showPredefined && (
//                   <div className="absolute right-0 bottom-full mb-1 z-10 w-72 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">
//                     <div className="px-2.5 py-1.5 bg-gray-50 border-b text-[10px] font-semibold text-gray-500 uppercase">Quick Replies</div>
//                     {predefinedMessages.map((msg, idx) => (
//                       <button
//                         key={idx}
//                         className="w-full text-left px-3 py-2 text-[11px] hover:bg-blue-50 border-b border-gray-50 last:border-0 transition text-gray-700"
//                         onClick={() => { setNewMessage(msg); setShowPredefined(false); }}
//                       >
//                         {msg}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center gap-1.5 mt-1.5">
//                 <button
//                   className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={handleAddMessage}
//                   disabled={isSending || !newMessage.trim()}
//                 >
//                   <Send className="w-3 h-3" />
//                   {isSending ? "Sending..." : "Send"}
//                 </button>

//                 {userRole !== "user" && (
//                   <div className="relative">
//                     <button
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded-lg shadow-sm transition disabled:opacity-50"
//                       onClick={() => setDropdownOpen((p) => !p)}
//                       disabled={isSending || !newMessage.trim()}
//                     >
//                       <ChevronDown className="w-3 h-3" />
//                     </button>
//                     {dropdownOpen && (
//                       <div className="absolute right-0 bottom-full mb-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
//                         <button
//                           className="w-full text-left px-3 py-2 text-[11px] hover:bg-gray-50 transition text-gray-700 font-medium"
//                           onClick={async () => {
//                             setDropdownOpen(false);
//                             try { await handleAddMessage(); await handleCloseTicket(); }
//                             catch { toast.error("Failed to send and resolve."); }
//                           }}
//                         >
//                           Send &amp; Resolve
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <p className="text-[10px] text-gray-400 mt-1">Ctrl+Enter to send quickly</p>
//             </div>
//           </div>
//         </>
//       )}

//       {selectedUser && (
//         <UserDetailsModal query={selectedUser} isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} />
//       )}
//       {isTicketModalOpen && (
//         <TicketActionModal ticketId={selectedTicketId} open={isTicketModalOpen} onClose={handleTicketActionModalClose} />
//       )}
//     </div>
//   );
// }



import UserDetailsModal from "../components/UserDetailsModal";
import {
  getTickets,
  addMessageToTicket,
  hasRole,
  updateTicketStatus,
  searchTickets,
  getAssignees,
  fetchSites,
  downloadUserTickets,
  getLocationsBySite,
} from "../services/api";
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
  differenceInDays,
} from "date-fns";
import dayjs from "dayjs";
import {
  MoreVertical, Filter, X, Maximize2, Minimize2,
  Send, ChevronDown, SlidersHorizontal, ChevronLeft, ChevronRight,
} from "lucide-react";
import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function getTicketIdColor(ticket) {
  if (!ticket) return "text-gray-700 bg-gray-100";
  const now = new Date();
  if (ticket.dueDate) {
    const due = parseISO(ticket.dueDate);
    const daysUntilDue = differenceInDays(due, now);
    if (isBefore(due, now)) return "text-white bg-red-600 font-bold";
    if (daysUntilDue <= 2) return "text-white bg-orange-500 font-bold";
  }
  if (ticket.createdAt) {
    const created = parseISO(ticket.createdAt);
    const hoursOld = (now - created) / 3600000;
    if (hoursOld <= 24) return "text-white bg-emerald-600 font-bold";
  }
  return "text-gray-700 bg-gray-100";
}

const STATUS_BADGE = {
  OPEN: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  WAITING: "bg-amber-100 text-amber-700 border border-amber-200",
  RESOLVED: "bg-blue-100 text-blue-700 border border-blue-200",
  CLOSED: "bg-gray-100 text-gray-600 border border-gray-200",
  UNASSIGNED: "bg-rose-100 text-rose-700 border border-rose-200",
};

const PAGE_SIZES = [10, 20, 50, 100];

export default function TicketingPortal() {
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = React.useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
  const [ticketStatus, setTicketStatus] = useState("");
  const navigate = useNavigate();
  const [showPredefined, setShowPredefined] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
  const messagesEndRef = useRef(null);
  const advancedRef = useRef(null);

  // ── Track whether a mutation happened so we only refresh when needed ──────
  // chatPanelDirty: set true when a message is sent or status changes in the chat panel
  const chatPanelDirty = useRef(false);
  // actionModalDirty: set true when TicketActionModal signals a change via its onClose
  const actionModalDirty = useRef(false);

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [paginationInfo, setPaginationInfo] = useState({ totalElements: 0, totalPages: 0, last: false });
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    status: "OPEN",
    feedbackReceived: null,
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
    "DMS","WORKSHOP_DIAGNOSTIC_TOOLS","OTHER","MAINTENANCE","NEW_PROJECT",
    "CUG_SIM","ZOHO_SUPPORT",
  ];
  const hrCategories = ["PAYROLL","RECRUITMENT","HR_OPERATIONS","GENERAL_HR_QUERIES"];
  const predefinedMessages = [
    "Thank you for your patience. we are still actively working on your issue",
    "Dear team, We are looking into your issue.",
    "Dear team, Could you please provide more details?",
    "Dear team, As solution has been provided will move to close the ticket.",
  ];

  // Close advanced dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (advancedRef.current && !advancedRef.current.contains(e.target)) {
        setShowAdvanced(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (selectedTicket && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTicket?.messages]);

  const handleDownloadTickets = async () => {
    try {
      const params = { ...filters };
      delete params.page; delete params.size;
      Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
      const response = await downloadUserTickets(params);
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Tickets downloaded successfully");
    } catch (error) {
      toast.error("Failed to download tickets");
    }
  };

  useEffect(() => {
    fetchSites()
      .then((res) => setSites(res.data.map((s) => ({ siteId: s.id, name: s.name }))))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (filters.siteIdLocationId) {
      getLocationsBySite(filters.siteIdLocationId).then(setLocations).catch(console.error);
    } else {
      setLocations([]);
    }
  }, [filters.siteIdLocationId]);

  // ── Mutations: mark dirty so close handlers know to refresh ───────────────

  const handleCloseTicket = async () => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(selectedTicket.id, "RESOLVED");
      toast.success("Status updated");
      setSelectedTicket((p) => ({ ...p, status: "RESOLVED" }));
      chatPanelDirty.current = true; // mark dirty – list will refresh on panel close
    } catch { toast.error("Failed to update status"); }
    finally { setIsUpdating(false); }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(ticketId, newStatus);
      toast.success("Status updated");
      chatPanelDirty.current = true; // mark dirty
    } catch { toast.error("Failed to update status"); }
    finally { setIsUpdating(false); }
  };

  const handleAddMessage = async () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    try {
      const messageDTO = { message: newMessage, sender: "You", ticketMessageType: messageType };
      const saved = await addMessageToTicket(selectedTicket.id, messageDTO);
      setNewMessage("");
      setSelectedTicket((p) => ({
        ...p,
        messages: [...p.messages, {
          sender: saved.sender, message: saved.message,
          ticketMessageType: saved.ticketMessageType,
          sentAt: new Date(saved.sentAt || Date.now()),
        }],
      }));
      chatPanelDirty.current = true; // mark dirty – list will refresh on panel close
    } catch { console.error("Error adding message"); }
    finally { setIsSending(false); }
  };

  const fetchTicketsWithFilters = useCallback(async (customPage = page, customSize = size) => {
    setLoading(true);
    try {
      const params = { ...filters, page: customPage, size: customSize, employeeId: "ALL" };
      Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
      const res = await getTickets(params);
      const { content = [], page: pn, size: ps, totalElements, totalPages, last } = res || {};
      setFilteredTickets(content);
      setPaginationInfo({ totalElements, totalPages, last });
      setPage(pn);
      setSize(ps);
    } catch { toast.error("Failed to fetch tickets"); }
    finally { setLoading(false); }
  }, [filters, page, size]);

  const refreshTicketList = useCallback(async () => {
    await fetchTicketsWithFilters(page);
  }, [fetchTicketsWithFilters, page]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) { setFilteredTickets(tickets); return; }
    try {
      setLoading(true);
      const res = await searchTickets({ query });
      const { content = [], totalElements, totalPages, last } = res || {};
      setFilteredTickets(content);
      setPaginationInfo({ totalElements, totalPages, last });
    } catch { console.error("Search error"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTicketsWithFilters(0); }, [filters]); // eslint-disable-line

  // ── Close handlers: only refresh when something actually changed ──────────

  /**
   * TicketActionModal calls onClose(changed?: boolean).
   * We accept that flag; if the modal doesn't pass it we fall back to our ref.
   */
  const handleTicketActionModalClose = (changed = false) => {
    const shouldRefresh = changed || actionModalDirty.current;
    setIsTicketModalOpen(false);
    setSelectedTicketId(null);
    actionModalDirty.current = false;
    if (shouldRefresh) refreshTicketList();
  };

  /**
   * TicketModal (create) always results in a new ticket → always refresh.
   */
  const handleCreateTicketModalClose = () => {
    setIsDialogOpen(false);
    refreshTicketList();
  };

  /**
   * Chat panel close: only refresh when the panel was dirtied.
   */
  const handleCloseChatPanel = () => {
    const shouldRefresh = chatPanelDirty.current;
    setSelectedTicket(null);
    setIsMaximized(false);
    chatPanelDirty.current = false;
    if (shouldRefresh) refreshTicketList();
  };

  // ── Misc handlers (unchanged logic, no extra refreshes) ───────────────────

  const handleAgeFilter = (ageRange) => {
    const now = new Date();
    let createdAfter = null, createdBefore = null;
    if (ageRange === "0-7") { createdAfter = subDays(now, 7).toISOString(); createdBefore = now.toISOString(); }
    else if (ageRange === "8-15") { createdAfter = subDays(now, 15).toISOString(); createdBefore = subDays(now, 8).toISOString(); }
    else if (ageRange === "16-30") { createdAfter = subDays(now, 30).toISOString(); createdBefore = subDays(now, 16).toISOString(); }
    else if (ageRange === "31+") { createdBefore = subDays(now, 31).toISOString(); }
    setSelectedAgeFilter(ageRange);
    setFilters((p) => ({ ...p, createdAfter, createdBefore }));
    setPage(0);
  };

  const handleFilterChange = (key, value) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setPage(0);
  };

  const handlePageSizeChange = (newSize) => {
    setSize(newSize);
    fetchTicketsWithFilters(0, newSize);
  };

  useEffect(() => {
    let role = "user";
    if (hasRole("ADMIN") || hasRole("HR_ADMIN") || hasRole("EXECUTIVE") || hasRole("MANAGER")) role = "admin";
    setUserRole(role);
  }, []);

  // Count active advanced filters
  const advancedFilterCount = [
    filters.feedbackReceived, filters.category, filters.siteIdLocationId,
    filters.locationId, filters.assigneeId, filters.createdAfter, selectedAgeFilter,
  ].filter(Boolean).length;

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer shadow-sm";

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .tp-table td, .tp-table th { white-space: nowrap; }
        .tp-table td { font-size: 11px; }
        .tp-row:hover { background: #f0f7ff !important; }
        .tp-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .tp-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .tp-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .tp-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg, #f1f5f9 25%, #e8eeff 50%, #f1f5f9 75%); background-size: 200% 100%; animation: sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .chat-panel { animation: slideIn 0.2s ease; }
        @keyframes slideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <TicketModal isOpen={isDialogOpen} onClose={handleCreateTicketModalClose} className="z-50" />

      {/* ═══ TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5">

          {/* Status filter */}
          <select
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value || null)}
            className={sel + " min-w-[88px] font-medium"}
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="WAITING">Waiting</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
            <option value="UNASSIGNED">Unassigned</option>
          </select>

          {/* Search */}
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
            className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-md font-semibold transition shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>Create</span>
          </button>

          {/* Advanced filter toggle */}
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
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[320px] sm:w-[480px] md:w-[640px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
                  <div className="flex items-center gap-2">
                    {advancedFilterCount > 0 && (
                      <button
                        onClick={() => {
                          setFilters((p) => ({
                            ...p, feedbackReceived: null, category: null,
                            siteIdLocationId: null, locationId: null,
                            assigneeId: null, createdAfter: null, createdBefore: null,
                          }));
                          setSelectedAgeFilter(null);
                        }}
                        className="text-[10px] text-red-500 hover:text-red-700 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                    <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleDownloadTickets}
                    disabled={loading}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium disabled:opacity-50 transition shadow-sm"
                  >
                    <span>↓</span>
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(filters.status === "CLOSED" || filters.status === "RESOLVED") && (
                    <select
                      value={filters.feedbackReceived ?? ""}
                      onChange={(e) => handleFilterChange("feedbackReceived", e.target.value === "" ? null : e.target.value === "true")}
                      className={sel + " min-w-[110px]"}
                    >
                      <option value="">All Feedback</option>
                      <option value="true">Received</option>
                      <option value="false">Not Received</option>
                    </select>
                  )}

                  <select
                    value={filters.siteIdLocationId || ""}
                    onChange={(e) => handleFilterChange("siteIdLocationId", e.target.value || null)}
                    className={sel + " min-w-[100px]"}
                  >
                    <option value="">All Sites</option>
                    {sites.map(({ siteId, name }) => <option key={siteId} value={siteId}>{name}</option>)}
                  </select>

                  {locations.length > 0 && (
                    <select
                      value={filters.locationId || ""}
                      onChange={(e) => handleFilterChange("locationId", e.target.value || null)}
                      className={sel + " min-w-[110px]"}
                    >
                      <option value="">All Locations</option>
                      {locations.map((loc) => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                    </select>
                  )}

                  <select
                    value={filters.category || ""}
                    onChange={(e) => handleFilterChange("category", e.target.value || null)}
                    className={sel + " min-w-[110px]"}
                  >
                    <option value="">All Categories</option>
                    {(userRole === "HR_ADMIN" ? hrCategories : itCategories).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-medium">Age:</span>
                    {[{k:"0-7",l:"0–7d"},{k:"8-15",l:"8–15d"},{k:"16-30",l:"16–30d"},{k:"31+",l:"31+d"}].map(({ k, l }) => (
                      <button
                        key={k}
                        onClick={() => handleAgeFilter(k)}
                        className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
                          selectedAgeFilter === k
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                    {selectedAgeFilter && (
                      <button
                        onClick={() => { setSelectedAgeFilter(null); setFilters((p) => ({ ...p, createdAfter: null, createdBefore: null })); }}
                        className="text-[10px] text-red-400 hover:text-red-600 font-medium"
                      >✕</button>
                    )}
                  </div>
                </div>

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
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
              <span className="text-blue-700">{page + 1}</span>
              <span className="text-gray-400"> / </span>
              {paginationInfo.totalPages || 1}
            </span>
            <button
              onClick={() => { const np = page + 1 < paginationInfo.totalPages ? page + 1 : page; setPage(np); fetchTicketsWithFilters(np); }}
              disabled={paginationInfo.last || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{paginationInfo.totalElements}</span>
            <span className="hidden sm:inline"> tickets</span>
          </span>

          {/* Page size */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => handlePageSizeChange(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  size === n
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
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
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full tp-table" style={{ minWidth: 1100 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["ID","Subject","Status","Category","Location","Assignee","Employee","Created","Responded","Due","Updated","Closed",...(userRole!=="user"?["Actions"]:[])]
                    .map((h, i) => (
                      <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: size > 10 ? 8 : 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 13 }).map((__, j) => (
                      <td key={j} className="px-2.5 py-2">
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
            <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm text-gray-400">No tickets found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Try changing your filters.</p>
          </div>
        )}

        {!loading && filteredTickets.length > 0 && (
          <div className="overflow-x-auto tp-scrollbar">
            <table className="w-full tp-table" style={{ minWidth: 1100, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {[
                    "ID","Subject","Status","Category","Location",
                    "Assignee","Employee","Created","Responded","Due",
                    "Updated","Closed",
                    ...(userRole !== "user" ? ["Actions"] : []),
                  ].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket, ri) => {
                  const idCls = getTicketIdColor(ticket);
                  return (
                    <tr
                      key={ticket.id}
                      className="tp-row border-b border-gray-50 cursor-pointer transition-colors"
                      style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
                      onClick={() => setSelectedTicket(ticket)}
                      onDoubleClick={() => {
                        if (userRole === "admin") { setIsTicketModalOpen(true); setSelectedTicketId(ticket.id); }
                      }}
                    >
                      <td className="px-2.5 py-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${idCls}`}>#{ticket.id}</span>
                      </td>
                      <td className="px-2.5 py-1.5 max-w-[180px]">
                        <span className="truncate block font-medium text-gray-800" title={ticket.title}>{ticket.title}</span>
                      </td>
                      <td className="px-2.5 py-1.5">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${STATUS_BADGE[ticket.status] || "bg-gray-100 text-gray-600"}`}>
                          {ticket.status?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-2.5 py-1.5 max-w-[100px]">
                        <span className="truncate block text-gray-600">{ticket.category}</span>
                      </td>
                      <td className="px-2.5 py-1.5 max-w-[100px]">
                        <span className="truncate block text-gray-600">{ticket.locationName}</span>
                      </td>
                      <td className="px-2.5 py-1.5">
                        {userRole !== "user" ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.assignee?.employeeId); }}
                            className="text-blue-600 hover:underline truncate text-[11px]"
                          >
                            {ticket.assignee?.username || <span className="text-gray-300 not-italic">—</span>}
                          </button>
                        ) : (
                          <span className="text-gray-700">{ticket.assignee?.username || "—"}</span>
                        )}
                      </td>
                      <td className="px-2.5 py-1.5">
                        {userRole !== "user" ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedUser(ticket.employee?.employeeId); }}
                            className="text-blue-600 hover:underline truncate text-[11px]"
                          >
                            {ticket.employee?.username || <span className="text-gray-300">—</span>}
                          </button>
                        ) : (
                          <span className="text-gray-700">{ticket.employee?.username || "—"}</span>
                        )}
                      </td>
                      <td className="px-2.5 py-1.5 text-gray-600">
                        {format(parseISO(ticket.createdAt), "d/M/yy")}
                        <span className="text-gray-400 text-[10px] ml-1">
                          ({formatDistanceToNow(parseISO(ticket.createdAt), { addSuffix: true })})
                        </span>
                      </td>
                      <td className="px-2.5 py-1.5">
                        {ticket.firstRespondedAt
                          ? <span className="text-gray-600">{format(parseISO(ticket.firstRespondedAt.split(".")[0]), "d/M/yy")}</span>
                          : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-2.5 py-1.5">
                        {ticket.dueDate
                          ? <span className={isBefore(parseISO(ticket.dueDate), new Date()) ? "text-red-600 font-semibold" : "text-emerald-600"}>
                              {format(parseISO(ticket.dueDate.split(".")[0]), "d/M/yy")}
                              {isBefore(parseISO(ticket.dueDate), new Date()) && " ⚠"}
                            </span>
                          : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-2.5 py-1.5">
                        {ticket.lastUpdated
                          ? <span className="text-blue-600">{format(parseISO(ticket.lastUpdated.split(".")[0]), "d/M/yy")}</span>
                          : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-2.5 py-1.5">
                        {ticket.closedAt
                          ? <span className="text-emerald-600">{format(parseISO(ticket.closedAt.split(".")[0]), "d/M/yy")}</span>
                          : <span className="text-gray-300">—</span>}
                      </td>
                      {userRole !== "user" && (
                        <td className="px-2.5 py-1.5">
                          <button
                            className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold hover:underline"
                            onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); setIsTicketModalOpen(true); }}
                          >
                            Actions
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══ CHAT PANEL ═══ */}
      {selectedTicket && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[2px]" onClick={handleCloseChatPanel} />
          <div
            className={`chat-panel fixed z-50 bg-white shadow-2xl flex flex-col transition-all duration-200
              ${isMaximized
                ? "inset-0 rounded-none"
                : "bottom-0 right-0 left-0 sm:left-auto sm:top-[52px] sm:bottom-0 sm:w-[360px] rounded-t-xl sm:rounded-none sm:rounded-l-xl"
              }`}
            style={!isMaximized ? { maxHeight: "calc(100vh - 52px)" } : {}}
          >
            {/* Panel header — title + actions only, NO description here */}
            <div className="flex-shrink-0 px-3 py-2.5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono flex-shrink-0 ${getTicketIdColor(selectedTicket)}`}>
                    #{selectedTicket?.id}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${STATUS_BADGE[selectedTicket.status] || "bg-gray-100"}`}>
                    {selectedTicket.status?.replace("_", " ")}
                  </span>
                  <h2 className="text-xs font-semibold text-gray-800 truncate ml-0.5" title={selectedTicket.title}>
                    {selectedTicket.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {userRole === "user" && selectedTicket?.status === "RESOLVED" && (
                    <button
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(selectedTicket?.id, "REOPENED")}
                      className="text-[10px] px-2 py-0.5 rounded font-semibold bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition"
                    >
                      {isUpdating ? "..." : "Reopen"}
                    </button>
                  )}
                  {userRole !== "user" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedTicketId(selectedTicket.id); setIsTicketModalOpen(true); }}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                      title="Ticket actions"
                    >
                      <MoreVertical className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  )}
                  <div className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                    <TicketAttachmentButton ticket={selectedTicket} />
                  </div>
                  <button
                    onClick={() => setIsMaximized((p) => !p)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                  >
                    {isMaximized ? <Minimize2 className="w-3.5 h-3.5 text-gray-600" /> : <Maximize2 className="w-3.5 h-3.5 text-gray-600" />}
                  </button>
                  <button
                    onClick={handleCloseChatPanel}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/*
              ── UNIFIED SCROLL AREA ──────────────────────────────────────────
              Description + messages share ONE scrollable container.
              No nested scrollbars; the whole column scrolls together.
            */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 min-h-0 tp-scrollbar">

              {/* Description block — inline, part of the flow */}
              {selectedTicket.description && (
                <div className="rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-2 mb-1">
                  <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wide mb-0.5">Description</p>
                  <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedTicket.description}
                  </p>
                </div>
              )}

              {/* Divider between description and messages */}
              {selectedTicket.description && selectedTicket.messages?.length > 0 && (
                <div className="flex items-center gap-2 py-0.5">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[10px] text-gray-300 font-medium">Messages</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
              )}

              {/* Messages */}
              {selectedTicket.messages.filter((msg) =>
                msg.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user"
              ).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-300">
                  <svg className="w-7 h-7 mb-1.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-xs">No messages yet.</p>
                </div>
              ) : (
                selectedTicket.messages
                  .filter((msg) => msg.ticketMessageType === "PUBLIC_RESPONSE" || userRole !== "user")
                  .map((msg, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg px-2.5 py-2 text-xs ${
                        msg.ticketMessageType === "INTERNAL_NOTE"
                          ? "bg-amber-50 border border-amber-200"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-semibold text-blue-600 text-[11px]">{msg.sender}</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          {msg.ticketMessageType === "INTERNAL_NOTE" && <span className="text-amber-600">🛡</span>}
                          {new Date(msg.sentAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-[11px] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Compose */}
            <div className="flex-shrink-0 px-3 py-2 border-t border-gray-100 bg-gray-50">
              <div className="relative">
                <textarea
                  className={`w-full text-xs p-2 pr-20 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    messageType === "INTERNAL_NOTE"
                      ? "bg-amber-50 border-amber-300 placeholder-amber-400"
                      : "bg-white border-gray-200 placeholder-gray-400"
                  }`}
                  rows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={messageType === "INTERNAL_NOTE" ? "Internal note (IT Team only)..." : "Write a message..."}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleAddMessage(); }
                  }}
                />
                {userRole !== "user" && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    <button type="button" onClick={() => setShowPredefined((p) => !p)} className="text-gray-400 hover:text-blue-600 transition text-sm" title="Predefined messages">
                      💬
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageType((p) => p === "PUBLIC_RESPONSE" ? "INTERNAL_NOTE" : "PUBLIC_RESPONSE")}
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border transition ${
                        messageType === "INTERNAL_NOTE"
                          ? "bg-amber-100 text-amber-700 border-amber-300"
                          : "bg-emerald-100 text-emerald-700 border-emerald-300"
                      }`}
                    >
                      {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}
                    </button>
                  </div>
                )}

                {showPredefined && (
                  <div className="absolute right-0 bottom-full mb-1 z-10 w-72 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-2.5 py-1.5 bg-gray-50 border-b text-[10px] font-semibold text-gray-500 uppercase">Quick Replies</div>
                    {predefinedMessages.map((msg, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-3 py-2 text-[11px] hover:bg-blue-50 border-b border-gray-50 last:border-0 transition text-gray-700"
                        onClick={() => { setNewMessage(msg); setShowPredefined(false); }}
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 mt-1.5">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddMessage}
                  disabled={isSending || !newMessage.trim()}
                >
                  <Send className="w-3 h-3" />
                  {isSending ? "Sending..." : "Send"}
                </button>

                {userRole !== "user" && (
                  <div className="relative">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded-lg shadow-sm transition disabled:opacity-50"
                      onClick={() => setDropdownOpen((p) => !p)}
                      disabled={isSending || !newMessage.trim()}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 bottom-full mb-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        <button
                          className="w-full text-left px-3 py-2 text-[11px] hover:bg-gray-50 transition text-gray-700 font-medium"
                          onClick={async () => {
                            setDropdownOpen(false);
                            try { await handleAddMessage(); await handleCloseTicket(); }
                            catch { toast.error("Failed to send and resolve."); }
                          }}
                        >
                          Send &amp; Resolve
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Ctrl+Enter to send quickly</p>
            </div>
          </div>
        </>
      )}

      {selectedUser && (
        <UserDetailsModal query={selectedUser} isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} />
      )}
      {isTicketModalOpen && (
        <TicketActionModal
          ticketId={selectedTicketId}
          open={isTicketModalOpen}
          onClose={handleTicketActionModalClose}
        />
      )}
    </div>
  );
}


