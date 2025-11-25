// import UserDetailsModal from "../components/UserDetailsModal";
// import { addMessageToTicket, updateTicketStatus } from "../services/api";
// import TicketActionModal from "./TicketActionModal";
// import TicketAttachmentButton from "./TicketAttachmentButton";
// import { Button } from "./ui";
// import { format, formatDistanceToNow, parseISO, isBefore } from "date-fns";
// import { MoreVertical, X } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function TicketTable({ tickets, loading, userRole, onRefresh }) {
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [showPredefined, setShowPredefined] = useState(false);
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
//   const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isSending, setIsSending] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

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

//   const handleCloseTicket = async () => {
//     setIsUpdating(true);
//     try {
//       await updateTicketStatus(selectedTicket.id, "CLOSED");
//       toast.success("Status updated");
//       onRefresh(); // Refresh tickets from parent
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

//   return (
//     <>
//       {/* Table Section */}
//       <div className="p-6">
//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//               <p className="text-gray-600 font-medium">Loading tickets...</p>
//             </div>
//           </div>
//         ) : tickets.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//             <svg
//               className="w-20 h-20 mb-4 text-gray-300"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//               />
//             </svg>
//             <p className="text-lg font-medium">No tickets found</p>
//             <p className="text-sm mt-1">Try adjusting your filters</p>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
//             <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0 z-10">
//                   <tr>
//                     {[
//                       "ID",
//                       "Subject",
//                       "Status",
//                       "Category",
//                       "Location",
//                       "Assignee",
//                       "Employee",
//                       "Created At",
//                       "Responded At",
//                       "Due Date",
//                       "Updated At",
//                       "Closed At",
//                       ...(userRole !== "user" ? ["Actions"] : []),
//                     ].map((header, i) => (
//                       <th
//                         key={i}
//                         className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap"
//                       >
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {tickets.map((ticket) => (
//                     <tr
//                       key={ticket.id}
//                       className="hover:bg-blue-50 transition-colors cursor-pointer"
//                       onClick={() => setSelectedTicket(ticket)}
//                       onDoubleClick={() => {
//                         setIsTicketModalOpen(true);
//                         setSelectedTicketId(ticket.id);
//                       }}
//                     >
//                       <td className="px-4 py-3 text-sm font-semibold text-blue-600">
//                         #{ticket.id}
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-800 min-w-[200px] max-w-[300px]">
//                         <div className="truncate font-medium">
//                           {ticket.title}
//                         </div>
//                       </td>

//                       <td className="px-4 py-3">
//                         <span
//                           className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//                             ticket.status === "OPEN"
//                               ? "bg-green-100 text-green-700"
//                               : ticket.status === "IN_PROGRESS"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : ticket.status === "RESOLVED"
//                               ? "bg-blue-100 text-blue-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {ticket.status.replace("_", " ")}
//                         </span>
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
//                         {ticket.category}
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
//                         {ticket.locationName}
//                       </td>

//                       <td className="px-4 py-3 text-sm">
//                         {userRole !== "user" ? (
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedUser(ticket.assignee?.employeeId);
//                             }}
//                             className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
//                           >
//                             {ticket.assignee?.username || "Unassigned"}
//                           </button>
//                         ) : (
//                           <span className="text-gray-700">
//                             {ticket.assignee?.username || "Unassigned"}
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-4 py-3 text-sm">
//                         {userRole !== "user" ? (
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedUser(ticket.employee?.employeeId);
//                             }}
//                             className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
//                           >
//                             {ticket.employee?.username || "Unassigned"}
//                           </button>
//                         ) : (
//                           <span className="text-gray-700">
//                             {ticket.employee?.username || "Unassigned"}
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                         <div className="font-medium">
//                           {format(parseISO(ticket.createdAt), "d/M/yyyy")}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {formatDistanceToNow(parseISO(ticket.createdAt), {
//                             addSuffix: true,
//                           })}
//                         </div>
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                         {ticket.firstRespondedAt ? (
//                           <>
//                             <div className="font-medium">
//                               {format(
//                                 parseISO(ticket.firstRespondedAt.split(".")[0]),
//                                 "d/M/yyyy"
//                               )}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {formatDistanceToNow(
//                                 parseISO(ticket.firstRespondedAt.split(".")[0]),
//                                 {
//                                   addSuffix: true,
//                                 }
//                               )}
//                             </div>
//                           </>
//                         ) : (
//                           <span className="text-gray-400 italic text-xs">
//                             Not responded
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-4 py-3 text-sm whitespace-nowrap">
//                         {ticket.dueDate ? (
//                           <>
//                             <div className="font-medium text-gray-700">
//                               {format(
//                                 parseISO(ticket.dueDate.split(".")[0]),
//                                 "d/M/yyyy"
//                               )}
//                             </div>
//                             <div
//                               className={`text-xs font-semibold ${
//                                 isBefore(parseISO(ticket.dueDate), new Date())
//                                   ? "text-red-600"
//                                   : "text-green-600"
//                               }`}
//                             >
//                               {formatDistanceToNow(
//                                 parseISO(ticket.dueDate.split(".")[0]),
//                                 { addSuffix: true }
//                               )}
//                               {isBefore(parseISO(ticket.dueDate), new Date()) &&
//                                 " – Overdue!"}
//                             </div>
//                           </>
//                         ) : (
//                           <span className="text-gray-400 italic text-xs">
//                             No due date
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                         {ticket.lastUpdated ? (
//                           <>
//                             <div className="font-medium">
//                               {format(
//                                 parseISO(ticket.lastUpdated.split(".")[0]),
//                                 "d/M/yyyy"
//                               )}
//                             </div>
//                             <div className="text-xs text-blue-600">
//                               {formatDistanceToNow(
//                                 parseISO(ticket.lastUpdated.split(".")[0]),
//                                 { addSuffix: true }
//                               )}
//                             </div>
//                           </>
//                         ) : (
//                           <span className="text-gray-400 italic text-xs">
//                             No updates
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
//                         {ticket.closedAt ? (
//                           <>
//                             <div className="font-medium">
//                               {format(
//                                 parseISO(ticket.closedAt.split(".")[0]),
//                                 "d/M/yyyy"
//                               )}
//                             </div>
//                             <div className="text-xs text-green-600">
//                               {formatDistanceToNow(
//                                 parseISO(ticket.closedAt.split(".")[0]),
//                                 { addSuffix: true }
//                               )}
//                             </div>
//                           </>
//                         ) : (
//                           <span className="text-gray-400 italic text-xs">
//                             Not closed
//                           </span>
//                         )}
//                       </td>

//                       {userRole !== "user" && (
//                         <td className="px-4 py-3">
//                           <button
//                             className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedTicketId(ticket.id);
//                               setIsTicketModalOpen(true);
//                             }}
//                           >
//                             Actions
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Ticket Detail Sidebar */}
//       {selectedTicket && (
//         <div
//           className={`fixed top-[64px] right-0 h-[calc(100%-64px)] bg-white border-l-2 border-blue-500 shadow-2xl overflow-y-auto z-40 transition-all duration-300 ease-in-out ${
//             isMaximized ? "w-full md:w-full" : "w-full md:w-[400px]"
//           }`}
//         >
//           <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 shadow-lg z-10">
//             <div className="flex items-start justify-between">
//               <div className="flex-1 pr-2">
//                 <h2 className="text-lg font-bold text-white">
//                   {selectedTicket.title}
//                 </h2>
//                 <p className="text-sm text-blue-100 mt-1 line-clamp-2">
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
//                 <span className="w-1 h-4 bg-blue-600 rounded"></span>
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

//             {/* Message Input Section */}
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
//                             : "PUBLIC_RESPONSE"
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

//       {/* Modals */}
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
//     </>
//   );
// }

import UserDetailsModal from "../components/UserDetailsModal";
import { addMessageToTicket, updateTicketStatus } from "../services/api";
import TicketActionModal from "./TicketActionModal";
import TicketAttachmentButton from "./TicketAttachmentButton";
import { Button } from "./ui";
import { format, formatDistanceToNow, parseISO, isBefore } from "date-fns";
import { MoreVertical, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TicketTable({ tickets, loading, userRole, onRefresh }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showPredefined, setShowPredefined] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleCloseTicket = async () => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(selectedTicket.id, "CLOSED");
      toast.success("Status updated");
      onRefresh(); // Refresh tickets from parent
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

  return (
    <>
      {/* Table Section */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading tickets...</p>
            </div>
          </div>
        ) : tickets.length === 0 ? (
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
            <div className="overflow-x-auto">
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
                  {tickets.map((ticket) => (
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
                                parseISO(ticket.firstRespondedAt.split(".")[0]),
                                "d/M/yyyy"
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDistanceToNow(
                                parseISO(ticket.firstRespondedAt.split(".")[0]),
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
                                isBefore(parseISO(ticket.dueDate), new Date())
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {formatDistanceToNow(
                                parseISO(ticket.dueDate.split(".")[0]),
                                { addSuffix: true }
                              )}
                              {isBefore(parseISO(ticket.dueDate), new Date()) &&
                                " – Overdue!"}
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

      {/* Modals */}
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
    </>
  );
}
