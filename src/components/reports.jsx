// import { getTicketsWithFeedback, getAssignees } from "../services/api";
// import DownloadButtonExcelTicket from "./DownloadButtonExcelTicket";
// import { useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// const TicketWithFeedbackTable = () => {
//    const { user } = useAuth();
//   const [tickets, setTickets] = useState([]);
//   const [assignees, setAssignees] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size] = useState(20);
//   const [selectedAssignee, setSelectedAssignee] = useState("");
//   const [paginationInfo, setPaginationInfo] = useState({
//     totalPages: 0,
//     totalElements: 0,
//     last: false,
//   });

//   useEffect(() => {
//     fetchAssignees();
//   }, []);

//   useEffect(() => {
//     fetchTickets();
//   }, [page, selectedAssignee]);

//   const fetchAssignees = async () => {
//     try {
//       const res = await getAssignees();
//       const formatted = res.data.map((user) => ({
//         employeeId: user.employeeId,
//         name: user.username,
//       }));
//       setAssignees(formatted);
//     } catch (err) {
//       console.error("Error fetching assignees:", err);
//     }
//   };

//   const fetchTickets = async () => {
//     try {
//       const res = await getTicketsWithFeedback(selectedAssignee, page, size);
//       const { content, totalPages, totalElements, last } = res;
//       setTickets(content);
//       setPaginationInfo({ totalPages, totalElements, last });
//     } catch (err) {
//       console.error("Error fetching tickets with feedback:", err);
//     }
//   };

//   return (

//     // <div className="lg:ml-40 pt-16 ">
//     <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       {/* Download Button */}
//       {/* <div className="flex justify-end mb-4">
//         <p>Download This month tickets in excel </p>
//         <DownloadButtonExcelTicket />
//       </div> */}

//       {/* Filter Section */}
//       <div className="flex flex-wrap gap-4 items-center mb-6 justify-between">
        

//         {(user?.role === "ADMIN" || user?.role === "HR_ADMIN" || user?.role === "MANAGER") && (
//   <div className="flex flex-col">
//     <label className="text-sm text-gray-600 mb-1">
//       Filter by Executive:
//     </label>

//     <select
//       value={selectedAssignee}
//       onChange={(e) => {
//         setSelectedAssignee(e.target.value);
//         setPage(0);
//       }}
//       className="p-2 border border-gray-300 rounded-md shadow-sm w-64 focus:ring focus:ring-green-400"
//     >
//       <option value="">All Executives</option>

//       {assignees.map(({ employeeId, name }) => (
//         <option key={employeeId} value={employeeId}>
//           {name}
//         </option>
//       ))}
//     </select>
//   </div>
// )}

//         {/* Pagination */}
//         <div className="mt-6 flex items-center justify-center gap-3">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//             disabled={page === 0}
//             className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//           >
//             &lt;
//           </button>
//           <span className="text-sm text-gray-700">
//             Page <strong>{page + 1}</strong> of{" "}
//             <strong>{paginationInfo.totalPages}</strong> | Total:{" "}
//             <strong>{paginationInfo.totalElements}</strong>
//           </span>
//           <button
//             onClick={() => !paginationInfo.last && setPage((prev) => prev + 1)}
//             disabled={paginationInfo.last}
//             className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//           >
//             &gt;
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-md shadow-lg">
//         <table className="min-w-full border text-sm bg-white">
//           <thead className="bg-green-100">
//             <tr>
//               <th className="p-2 border">Ticket ID</th>
//               <th className="p-2 border">Title</th>
//               <th className="p-2 border">Description</th>
//               <th className="p-2 border">Category</th>
//               <th className="p-2 border">Created By</th>
//               <th className="p-2 border">Assignee</th>
//               <th className="p-2 border">Created At</th>
//               <th className="p-2 border">Rating</th>
//               <th className="p-2 border">Feedback</th>
//               <th className="p-2 border">Submitted At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.length > 0 ? (
//               tickets.map((ticket) => (
//                 <tr key={ticket.ticketId} className="hover:bg-green-50">
//                   <td className="p-2 border text-center">{ticket.ticketId}</td>
//                   <td className="p-2 border">{ticket.title}</td>
//                   <td className="p-2 border">{ticket.description}</td>
//                   <td className="p-2 border text-center">{ticket.category}</td>
//                   <td className="p-2 border">{ticket.createdBy}</td>
//                   <td className="p-2 border">{ticket.assigneeName}</td>
//                   <td className="p-2 border text-xs text-gray-600">
//                     {ticket.createdAt &&
//                       new Date(ticket.createdAt).toLocaleString()}
//                   </td>
//                   <td className="p-2 border text-center">{ticket.rating}</td>
//                   <td className="p-2 border">{ticket.feedbackMessage}</td>
//                   <td className="p-2 border text-xs text-gray-600">
//                     {ticket.submittedAt &&
//                       new Date(ticket.submittedAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="12" className="p-4 text-center text-gray-500">
//                   No tickets found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex items-center justify-center gap-3">
//         <button
//           onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//           disabled={page === 0}
//           className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//         >
//           &lt;
//         </button>
//         <span className="text-sm text-gray-700">
//           Page <strong>{page + 1}</strong> of{" "}
//           <strong>{paginationInfo.totalPages}</strong> | Total:{" "}
//           <strong>{paginationInfo.totalElements}</strong>
//         </span>
//         <button
//           onClick={() => !paginationInfo.last && setPage((prev) => prev + 1)}
//           disabled={paginationInfo.last}
//           className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TicketWithFeedbackTable;



// import { getTicketsWithFeedback, getAssignees } from "../services/api";
// import DownloadButtonExcelTicket from "./DownloadButtonExcelTicket";
// import { useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// const TicketWithFeedbackTable = () => {
//   const { user } = useAuth();
//   const [tickets, setTickets] = useState([]);
//   const [assignees, setAssignees] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(20);
//   const [selectedAssignee, setSelectedAssignee] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedRating, setSelectedRating] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
//   const [paginationInfo, setPaginationInfo] = useState({
//     totalPages: 0,
//     totalElements: 0,
//     last: false,
//   });

//   // Get unique categories from tickets
//   const categories = [...new Set(tickets.map(ticket => ticket.category).filter(Boolean))];
//   const ratings = [1, 2, 3, 4, 5];
//   const pageSizeOptions = [10, 20, 50, 100];

//   // Check if user has admin access
//   const hasAdminAccess = user?.role === "ADMIN" || user?.role === "HR_ADMIN" || user?.role === "MANAGER";

//   useEffect(() => {
//     fetchAssignees();
//   }, []);

//   useEffect(() => {
//     fetchTickets();
//   }, [page, size, selectedAssignee, selectedCategory, selectedRating]);

//   const fetchAssignees = async () => {
//     if (!hasAdminAccess) return;
//     try {
//       const res = await getAssignees();
//       const formatted = res.data.map((user) => ({
//         employeeId: user.employeeId,
//         name: user.username,
//       }));
//       setAssignees(formatted);
//     } catch (err) {
//       console.error("Error fetching assignees:", err);
//     }
//   };

//   const fetchTickets = async () => {
//     try {
//       const res = await getTicketsWithFeedback(selectedAssignee, page, size);
//       let filteredTickets = res.content || [];
      
//       if (selectedCategory) {
//         filteredTickets = filteredTickets.filter(
//           ticket => ticket.category === selectedCategory
//         );
//       }
      
//       if (selectedRating) {
//         filteredTickets = filteredTickets.filter(
//           ticket => ticket.rating === parseInt(selectedRating)
//         );
//       }
      
//       if (searchTerm) {
//         filteredTickets = filteredTickets.filter(
//           ticket =>
//             ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             ticket.ticketId?.toString().includes(searchTerm) ||
//             ticket.createdBy?.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }
      
//       setTickets(filteredTickets);
//       setPaginationInfo({
//         totalPages: res.totalPages || 0,
//         totalElements: res.totalElements || filteredTickets.length,
//         last: res.last || false,
//       });
//     } catch (err) {
//       console.error("Error fetching tickets with feedback:", err);
//     }
//   };

//   // Truncate description only
//   const truncateText = (text, maxLength = 70) => {
//     if (!text) return "—";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSelectedCategory("");
//     setSelectedRating("");
//     setSearchTerm("");
//     setPage(0);
//   };

//   const handlePageSizeChange = (newSize) => {
//     setSize(newSize);
//     setPage(0);
//   };

//   return (
//     <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-3 md:p-4">
      
//       {/* Executive Filter & Pagination Controls - Always Visible */}
//       <div className="bg-white rounded-lg shadow-md p-3 mb-4 border border-gray-200">
//         <div className="flex flex-wrap justify-between items-center gap-3">
//           {/* Left Side - Executive Filter (Admin Only) */}
//           <div className="flex items-center gap-3">
//             {hasAdminAccess && (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700">Executive:</span>
//                 <select
//                   value={selectedAssignee}
//                   onChange={(e) => {
//                     setSelectedAssignee(e.target.value);
//                     setPage(0);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 bg-white"
//                 >
//                   <option value="">All Executives</option>
//                   {assignees.map(({ employeeId, name }) => (
//                     <option key={employeeId} value={employeeId}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Right Side - Pagination Controls */}
//           <div className="flex items-center gap-3">
//             {/* Page Size Selector */}
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-gray-500">Show:</span>
//               <div className="flex gap-1">
//                 {pageSizeOptions.map(option => (
//                   <button
//                     key={option}
//                     onClick={() => handlePageSizeChange(option)}
//                     className={`px-2.5 py-0.5 text-sm rounded transition-colors ${
//                       size === option
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Pagination Buttons */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//                 disabled={page === 0}
//                 className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 ← Prev
//               </button>
              
//               <span className="text-sm text-gray-600">
//                 Page {page + 1} of {paginationInfo.totalPages || 1}
//               </span>
              
//               <button
//                 onClick={() => !paginationInfo.last && setPage((prev) => prev + 1)}
//                 disabled={paginationInfo.last}
//                 className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Next →
//               </button>
//             </div>

//       {/* Advanced Filters Toggle Button */}
//       <div className="mb-3">
//         <button
//           onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
//         >
//           <svg className={`w-4 h-4 transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//           {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
//           {(selectedCategory || selectedRating || searchTerm) && (
//             <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500 text-white rounded-full">
//               {[selectedCategory, selectedRating, searchTerm].filter(Boolean).length}
//             </span>
//           )}
//         </button>
//       </div>

//           </div>
//         </div>
//       </div>



//       {/* Advanced Filters Section (Collapsible) */}
//       {showAdvancedFilters && (
//         <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
//           <div className="flex flex-wrap gap-3 items-end">
//             {/* Search */}
//             <div className="flex-1 min-w-[180px]">
//               <label className="block text-xs font-medium text-gray-600 mb-1">Search</label>
//               <input
//                 type="text"
//                 placeholder="Search by ID, title, or creator..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setPage(0);
//                 }}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
//               />
//             </div>

//             {/* Category Filter */}
//             <div className="flex-1 min-w-[150px]">
//               <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => {
//                   setSelectedCategory(e.target.value);
//                   setPage(0);
//                 }}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 bg-white"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Rating Filter */}
//             <div className="flex-1 min-w-[150px]">
//               <label className="block text-xs font-medium text-gray-600 mb-1">Rating</label>
//               <select
//                 value={selectedRating}
//                 onChange={(e) => {
//                   setSelectedRating(e.target.value);
//                   setPage(0);
//                 }}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 bg-white"
//               >
//                 <option value="">All Ratings</option>
//                 {ratings.map((rating) => (
//                   <option key={rating} value={rating}>
//                     {"★".repeat(rating)}{"☆".repeat(5 - rating)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Clear Filters Button */}
//             {(selectedCategory || selectedRating || searchTerm) && (
//               <div>
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                 >
//                   Clear All Filters ✕
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Table Container with Fixed Header and Horizontal Scroll */}
//       <div className="rounded-lg shadow-lg bg-white overflow-hidden">
//         <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
//           <div style={{ minWidth: '1200px' }}>
//             <table className="w-full bg-white">
//               <thead className="sticky top-0 z-10">
//                 <tr className="bg-gradient-to-r from-green-500 to-green-600 text-white">
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider w-20">ID</th>
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider min-w-[150px]">Title</th>
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider min-w-[200px]">Description</th>
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider w-24">Category</th>
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider min-w-[120px]">Created By</th>
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider min-w-[120px]">Assignee</th>
//                   <th className="p-3 text-center text-xs font-semibold uppercase tracking-wider w-28">Rating</th>
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider min-w-[200px]">Feedback</th>
//                   <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider w-28">Submitted</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {tickets.length > 0 ? (
//                   tickets.map((ticket) => (
//                     <tr key={ticket.ticketId} className="hover:bg-green-50 transition-colors duration-150">
//                       <td className="p-3 text-xs font-mono font-medium text-gray-900">
//                         #{ticket.ticketId}
//                       </td>
//                       <td className="p-3 text-sm text-gray-800 break-words">
//                         {ticket.title || "—"}
//                       </td>
//                       <td className="p-3 text-sm text-gray-600">
//                         <div className="break-words" title={ticket.description}>
//                           {truncateText(ticket.description, 65)}
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
//                           {ticket.category || "—"}
//                         </span>
//                       </td>
//                       <td className="p-3 text-sm text-gray-700">
//                         {ticket.createdBy || "—"}
//                       </td>
//                       <td className="p-3">
//                         {ticket.assigneeName ? (
//                           <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">
//                             {ticket.assigneeName}
//                           </span>
//                         ) : "—"}
//                       </td>
//                       <td className="p-3 text-center">
//                         {ticket.rating ? (
//                           <span className="inline-flex items-center gap-0.5 text-amber-500 whitespace-nowrap">
//                             {"★".repeat(ticket.rating)}
//                             {"☆".repeat(5 - ticket.rating)}
//                           </span>
//                         ) : "—"}
//                       </td>
//                       <td className="p-3 text-sm text-gray-700 break-words">
//                         {ticket.feedbackMessage || "—"}
//                       </td>
//                       <td className="p-3 text-xs text-gray-500 whitespace-nowrap">
//                         {ticket.submittedAt ? new Date(ticket.submittedAt).toLocaleDateString() : "—"}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="p-12 text-center">
//                       <div className="flex flex-col items-center justify-center text-gray-400">
//                         <svg className="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                         <p className="text-lg font-medium">No tickets found</p>
//                         <p className="text-sm">Try adjusting your filters</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Pagination (Optional, for convenience) */}
//       {tickets.length > 0 && (
//         <div className="mt-4 flex justify-center items-center gap-3 bg-white rounded-lg shadow-md p-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//               disabled={page === 0}
//               className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               ← Prev
//             </button>
            
//             <span className="text-sm text-gray-600">
//               Page {page + 1} of {paginationInfo.totalPages || 1}
//             </span>
            
//             <button
//               onClick={() => !paginationInfo.last && setPage((prev) => prev + 1)}
//               disabled={paginationInfo.last}
//               className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketWithFeedbackTable;


import { getTicketsWithFeedback, getAssignees } from "../services/api";
import DownloadButtonExcelTicket from "./DownloadButtonExcelTicket";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZES = [10, 20, 50, 100];

const STAR = ({ filled }) => (
  <span className={filled ? "text-amber-400" : "text-gray-200"}>★</span>
);

const RatingStars = ({ rating }) => {
  if (!rating) return <span className="text-gray-300 text-[11px]">—</span>;
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((n) => <STAR key={n} filled={n <= rating} />)}
    </span>
  );
};

const TicketWithFeedbackTable = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    last: false,
  });

  const categories = [...new Set(tickets.map((t) => t.category).filter(Boolean))];
  const hasAdminAccess = user?.role === "ADMIN" || user?.role === "HR_ADMIN" || user?.role === "MANAGER";

  const advancedFilterCount = [selectedCategory, selectedRating, searchTerm].filter(Boolean).length;

  useEffect(() => {
    if (hasAdminAccess) fetchAssignees();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [page, size, selectedAssignee, selectedCategory, selectedRating]);

  const fetchAssignees = async () => {
    try {
      const res = await getAssignees();
      setAssignees(res.data.map((u) => ({ employeeId: u.employeeId, name: u.username })));
    } catch (err) {
      console.error("Error fetching assignees:", err);
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await getTicketsWithFeedback(selectedAssignee, page, size);
      let filtered = res.content || [];

      if (selectedCategory) filtered = filtered.filter((t) => t.category === selectedCategory);
      if (selectedRating)   filtered = filtered.filter((t) => t.rating === parseInt(selectedRating));
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.title?.toLowerCase().includes(q) ||
            t.ticketId?.toString().includes(q) ||
            t.createdBy?.toLowerCase().includes(q)
        );
      }

      setTickets(filtered);
      setPaginationInfo({
        totalPages: res.totalPages || 0,
        totalElements: res.totalElements || filtered.length,
        last: res.last || false,
      });
    } catch (err) {
      console.error("Error fetching tickets with feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedRating("");
    setSearchTerm("");
    setPage(0);
  };

  const handlePageSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0);
  };

  const sel =
    "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition cursor-pointer shadow-sm";

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .fb-table td, .fb-table th { white-space: nowrap; }
        .fb-table td { font-size: 11px; }
        .fb-row:hover { background: #f0fff8 !important; }
        .fb-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .fb-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .fb-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .fb-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg, #f1f5f9 25%, #e8fff4 50%, #f1f5f9 75%); background-size: 200% 100%; animation: sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ═══ TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5">

          {/* Executive filter (admin only) */}
          {hasAdminAccess && (
            <select
              value={selectedAssignee}
              onChange={(e) => { setSelectedAssignee(e.target.value); setPage(0); }}
              className={sel + " min-w-[120px] font-medium"}
            >
              <option value="">All Executives</option>
              {assignees.map(({ employeeId, name }) => (
                <option key={employeeId} value={employeeId}>{name}</option>
              ))}
            </select>
          )}

          {/* Divider */}
          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Advanced filters toggle */}
          <div className="relative">
            <button
              onClick={() => setShowAdvanced((p) => !p)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
                showAdvanced || advancedFilterCount > 0
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Advanced</span>
              {advancedFilterCount > 0 && (
                <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-emerald-600" : "bg-emerald-600 text-white"}`}>
                  {advancedFilterCount}
                </span>
              )}
            </button>

            {showAdvanced && (
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[320px] sm:w-[520px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
                  <div className="flex items-center gap-2">
                    {advancedFilterCount > 0 && (
                      <button onClick={clearFilters} className="text-[10px] text-red-500 hover:text-red-700 font-medium">
                        Clear all
                      </button>
                    )}
                    <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {/* Search */}
                  <div className="relative flex items-center flex-1 min-w-[160px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                      className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by ID, title, creator..."
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                      className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-emerald-500 outline-none shadow-sm w-full transition"
                    />
                  </div>

                  {/* Category */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); setPage(0); }}
                    className={sel + " min-w-[120px]"}
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>

                  {/* Rating */}
                  <select
                    value={selectedRating}
                    onChange={(e) => { setSelectedRating(e.target.value); setPage(0); }}
                    className={sel + " min-w-[110px]"}
                  >
                    <option value="">All Ratings</option>
                    {[1,2,3,4,5].map((r) => (
                      <option key={r} value={r}>{"★".repeat(r)}{"☆".repeat(5-r)}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>


          {/* Divider */}
          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0 || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-emerald-50 hover:border-emerald-400 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
              <span className="text-emerald-700">{page + 1}</span>
              <span className="text-gray-400"> / </span>
              {paginationInfo.totalPages || 1}
            </span>
            <button
              onClick={() => !paginationInfo.last && setPage((p) => p + 1)}
              disabled={paginationInfo.last || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-emerald-50 hover:border-emerald-400 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Total count */}
          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{paginationInfo.totalElements}</span>
            <span className="hidden sm:inline"> tickets</span>
          </span>

          {/* Page size — pushed to right */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => handlePageSizeChange(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  size === n ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
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
        {/* Shimmer skeleton */}
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full fb-table" style={{ minWidth: 1000 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["ID","Title","Description","Category","Created By","Assignee","Rating","Feedback","Submitted"].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 9 }).map((__, j) => (
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

        {/* Empty state */}
        {!loading && tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm text-gray-400">No feedback tickets found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Try changing your filters.</p>
          </div>
        )}

        {/* Table */}
        {!loading && tickets.length > 0 && (
          <div className="overflow-x-auto fb-scrollbar">
            <table className="w-full fb-table" style={{ minWidth: 1050, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {[
                    { label: "ID",         cls: "w-14" },
                    { label: "Title",      cls: "min-w-[140px]" },
                    { label: "Description",cls: "min-w-[160px]" },
                    { label: "Category",   cls: "w-24" },
                    { label: "Created By", cls: "min-w-[100px]" },
                    { label: "Assignee",   cls: "min-w-[100px]" },
                    { label: "Rating",     cls: "w-24 text-center" },
                    { label: "Feedback",   cls: "min-w-[180px]" },
                    { label: "Submitted",  cls: "w-24" },
                  ].map(({ label, cls }, i) => (
                    <th
                      key={i}
                      className={`px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${cls}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, ri) => (
                  <tr
                    key={ticket.ticketId}
                    className="fb-row border-b border-gray-50 transition-colors"
                    style={{ background: ri % 2 === 0 ? "#fff" : "#f9fffe" }}
                  >
                    {/* ID */}
                    <td className="px-2.5 py-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-700">
                        #{ticket.ticketId}
                      </span>
                    </td>

                    {/* Title */}
                    {/* <td className="px-2.5 py-1.5 font-medium text-gray-800">
                      {ticket.title || "—"}
                    </td> */}

<td className="px-2.5 py-1.5 font-medium text-gray-800">
  <div className="whitespace-normal break-words">
    {ticket.title || "—"}
  </div>
</td>

                    {/* Description */}
                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[200px]">
                      <span className="block truncate" title={ticket.description}>
                        {ticket.description || "—"}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-2.5 py-1.5">
                      {ticket.category
                        ? <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200 whitespace-nowrap">{ticket.category}</span>
                        : <span className="text-gray-300">—</span>}
                    </td>

                    {/* Created By */}
                    <td className="px-2.5 py-1.5 text-gray-700">
                      {ticket.createdBy || <span className="text-gray-300">—</span>}
                    </td>

                    {/* Assignee */}
                    <td className="px-2.5 py-1.5">
                      {ticket.assigneeName
                        ? <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-700 border border-violet-200 whitespace-nowrap">{ticket.assigneeName}</span>
                        : <span className="text-gray-300">—</span>}
                    </td>

                    {/* Rating */}
                    <td className="px-2.5 py-1.5 text-center">
                      <RatingStars rating={ticket.rating} />
                    </td>

                    {/* Feedback */}
                    <td className="px-2.5 py-1.5 text-gray-700 max-w-[220px]">
                      <span className="block truncate" title={ticket.feedbackMessage}>
                        {ticket.feedbackMessage || <span className="text-gray-300">—</span>}
                      </span>
                    </td>

                    {/* Submitted */}
                    <td className="px-2.5 py-1.5 text-gray-500 whitespace-nowrap">
                      {ticket.submittedAt
                        ? new Date(ticket.submittedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                        : <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketWithFeedbackTable;