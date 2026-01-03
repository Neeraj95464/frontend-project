// // // import {
// // //   Copy,
// // //   Check,
// // //   Info,
// // //   FileText,
// // //   Clock,
// // //   AlertCircle,
// // //   CheckCircle,
// // //   X,
// // // } from "lucide-react";
// // // import React, { useState, useEffect } from "react";

// // // export default function ITApprovalModal({ ticket, open, onClose }) {
// // //   const [copied, setCopied] = useState(false);
// // //   const [activeTab, setActiveTab] = useState("guide");

// // //   const [formData, setFormData] = useState({
// // //     ticketNumber: "",
// // //     dateCreated: "",
// // //     assetId: "",
// // //     warrantyDate: "",
// // //     issueDescription: "",
// // //     technicalResolution: "",
// // //     managerialResolution: "",
// // //     vendor1: "",
// // //     vendor2: "",
// // //     vendor3: "",
// // //     negotiationDetails: "",
// // //     approverName: "",
// // //     approverTitle: "",
// // //   });

// // //   // Auto-fill form when ticket data is received
// // //   useEffect(() => {
// // //     if (ticket) {
// // //       setFormData((prev) => ({
// // //         ...prev,
// // //         ticketNumber: ticket.id ? `TKT-${ticket.id}` : "",
// // //         dateCreated: ticket.createdAt
// // //           ? new Date(ticket.createdAt).toISOString().split("T")[0]
// // //           : new Date().toISOString().split("T")[0],
// // //         assetId: ticket.asset?.assetTag || ticket.asset?.id || "",
// // //         warrantyDate: ticket.asset?.warrantyExpiry
// // //           ? new Date(ticket.asset.warrantyExpiry).toISOString().split("T")[0]
// // //           : "",
// // //         issueDescription: ticket.description || ticket.title || "",
// // //       }));
// // //     }
// // //   }, [ticket]);

// // //   const handleChange = (e) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value,
// // //     });
// // //   };

// // //   const generateEmailContent = () => {
// // //     return `Subject: Approval Request - Ticket #${
// // //       formData.ticketNumber || "[TICKET_NUMBER]"
// // //     }

// // // Dear Sir,

// // // I am submitting the following IT approval request for your review and final management approval:

// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // // TICKET DETAILS
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // // 📋 Ticket Number: ${formData.ticketNumber || "[REQUIRED]"}
// // // 📅 Date Created: ${formData.dateCreated || "[REQUIRED]"}
// // // 🏷️ Asset ID: ${formData.assetId || "N/A"}
// // // ⚠️ Warranty/Renewal Date: ${formData.warrantyDate || "N/A"}

// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // // ISSUE & RESOLUTION
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // // 🔧 Issue Description (System Admin/IT Executive Perspective):
// // // ${formData.issueDescription || "[REQUIRED - Describe the technical issue]"}

// // // 💡 Technical Resolution Recommended:
// // // ${
// // //   formData.technicalResolution ||
// // //   "[REQUIRED - Technical solution from IT perspective]"
// // // }

// // // ✅ Managerial Resolution & Authorization:
// // // ${
// // //   formData.managerialResolution ||
// // //   "[REQUIRED - Manager validation and approval]"
// // // }

// // // ${
// // //   formData.vendor1
// // //     ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // // VENDOR QUOTATIONS (For Purchases)
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // // Vendor 1: ${formData.vendor1}
// // // Vendor 2: ${formData.vendor2}
// // // Vendor 3: ${formData.vendor3}

// // // Negotiation Details:
// // // ${formData.negotiationDetails}
// // // `
// // //     : ""
// // // }
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // // HIGHER-LEVEL APPROVAL OBTAINED
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // // Approved By: ${
// // //       formData.approverName ||
// // //       "[REQUIRED - Location CEO/Head or Department Head]"
// // //     }
// // // Title: ${
// // //       formData.approverTitle ||
// // //       "[REQUIRED - e.g., Location CEO, Department Head]"
// // //     }

// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // // This request has been reviewed and authorized at the managerial level. I confirm all required information is accurate and complete.

// // // Awaiting your review and final management approval.

// // // Best regards,
// // // [Your Name]
// // // [Your Title]`;
// // //   };

// // //   const copyToClipboard = () => {
// // //     navigator.clipboard.writeText(generateEmailContent());
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 2000);
// // //   };

// // //   if (!open) return null;

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
// // //       <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl">
// // //         {/* Close Button */}
// // //         <button
// // //           onClick={onClose}
// // //           className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
// // //         >
// // //           <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
// // //         </button>

// // //         <div className="p-6 md:p-8">
// // //           {/* Header */}
// // //           <div className="text-center mb-8">
// // //             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
// // //               <FileText className="w-8 h-8 text-white" />
// // //             </div>
// // //             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
// // //               IT Approval Request Helper
// // //             </h1>
// // //             <p className="text-purple-200">
// // //               Streamline your approval process with ease
// // //             </p>
// // //           </div>

// // //           {/* Tab Navigation */}
// // //           <div className="flex gap-4 mb-6">
// // //             <button
// // //               onClick={() => setActiveTab("guide")}
// // //               className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
// // //                 activeTab === "guide"
// // //                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
// // //                   : "bg-white/10 text-purple-200 hover:bg-white/20"
// // //               }`}
// // //             >
// // //               <Info className="w-5 h-5 inline mr-2" />
// // //               Quick Guide
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveTab("form")}
// // //               className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
// // //                 activeTab === "form"
// // //                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
// // //                   : "bg-white/10 text-purple-200 hover:bg-white/20"
// // //               }`}
// // //             >
// // //               <FileText className="w-5 h-5 inline mr-2" />
// // //               Generate Request
// // //             </button>
// // //           </div>

// // //           {/* Content */}
// // //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
// // //             {activeTab === "guide" && (
// // //               <div className="space-y-6">
// // //                 <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6">
// // //                   <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
// // //                     <Info className="w-6 h-6 mr-2" />
// // //                     How This Works (Simple Guide for Managers)
// // //                   </h2>
// // //                   <p className="text-purple-100 text-lg leading-relaxed">
// // //                     This tool helps you create properly formatted IT approval
// // //                     requests. Just fill in the details, and we'll generate a
// // //                     professional email that includes everything Head-IT needs to
// // //                     process your request quickly.
// // //                   </p>
// // //                 </div>

// // //                 <div className="grid md:grid-cols-2 gap-6">
// // //                   <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
// // //                     <div className="flex items-start">
// // //                       <div className="bg-green-500/20 p-3 rounded-lg mr-4">
// // //                         <CheckCircle className="w-6 h-6 text-green-300" />
// // //                       </div>
// // //                       <div>
// // //                         <h3 className="text-xl font-semibold text-white mb-2">
// // //                           Before You Submit
// // //                         </h3>
// // //                         <ul className="text-purple-200 space-y-2">
// // //                           <li>
// // //                             ✓ Get your Location CEO/Department Head approval
// // //                             first
// // //                           </li>
// // //                           <li>✓ For purchases: collect 3 vendor quotes</li>
// // //                           <li>✓ Document 3 rounds of price negotiations</li>
// // //                           <li>✓ Have your ticket number ready</li>
// // //                           <li>
// // //                             ✓ Have your User details with user location ready
// // //                           </li>
// // //                         </ul>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
// // //                     <div className="flex items-start">
// // //                       <div className="bg-yellow-500/20 p-3 rounded-lg mr-4">
// // //                         <Clock className="w-6 h-6 text-yellow-300" />
// // //                       </div>
// // //                       <div>
// // //                         <h3 className="text-xl font-semibold text-white mb-2">
// // //                           Resolution Timeline
// // //                         </h3>
// // //                         <ul className="text-purple-200 space-y-2">
// // //                           <li>⚡ Minor issues: 7 days</li>
// // //                           <li>🔧 Major issues: 15 days</li>
// // //                           <li>📊 Projects: As per approved plan</li>
// // //                         </ul>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-xl p-6">
// // //                   <div className="flex items-start">
// // //                     <AlertCircle className="w-6 h-6 text-orange-300 mr-3 mt-1 flex-shrink-0" />
// // //                     <div>
// // //                       <h3 className="text-xl font-semibold text-white mb-2">
// // //                         Important Reminders
// // //                       </h3>
// // //                       <ul className="text-orange-100 space-y-2">
// // //                         <li>
// // //                           • All requests must go through Head-IT for final
// // //                           management approval
// // //                         </li>
// // //                         <li>• Incomplete submissions will be rejected</li>
// // //                         <li>
// // //                           • You are accountable for accuracy and completeness
// // //                         </li>
// // //                         <li>
// // //                           • The old approval system is back in effect (recent
// // //                           workflow changes revoked)
// // //                         </li>
// // //                       </ul>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="text-center pt-4">
// // //                   <button
// // //                     onClick={() => setActiveTab("form")}
// // //                     className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
// // //                   >
// // //                     Ready? Generate Your Request →
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {activeTab === "form" && (
// // //               <div className="space-y-6">
// // //                 <h2 className="text-2xl font-bold text-white mb-6">
// // //                   Fill in Your Request Details
// // //                 </h2>

// // //                 {/* Auto-filled info badge */}
// // //                 {ticket && (
// // //                   <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 flex items-center">
// // //                     <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
// // //                     <span className="text-green-100">
// // //                       Ticket information auto-filled. Review and complete
// // //                       remaining fields.
// // //                     </span>
// // //                   </div>
// // //                 )}

// // //                 <div className="grid md:grid-cols-2 gap-6">
// // //                   <div>
// // //                     <label className="block text-purple-200 font-semibold mb-2">
// // //                       Ticket Number *
// // //                     </label>
// // //                     <input
// // //                       type="text"
// // //                       name="ticketNumber"
// // //                       value={formData.ticketNumber}
// // //                       onChange={handleChange}
// // //                       placeholder="e.g., TKT-2024-001"
// // //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-purple-200 font-semibold mb-2">
// // //                       Date Created *
// // //                     </label>
// // //                     <input
// // //                       type="date"
// // //                       name="dateCreated"
// // //                       value={formData.dateCreated}
// // //                       onChange={handleChange}
// // //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-purple-200 font-semibold mb-2">
// // //                       Asset ID (if applicable)
// // //                     </label>
// // //                     <input
// // //                       type="text"
// // //                       name="assetId"
// // //                       value={formData.assetId}
// // //                       onChange={handleChange}
// // //                       placeholder="e.g., ASSET-2024-123"
// // //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="block text-purple-200 font-semibold mb-2">
// // //                       Warranty/Renewal Date
// // //                     </label>
// // //                     <input
// // //                       type="date"
// // //                       name="warrantyDate"
// // //                       value={formData.warrantyDate}
// // //                       onChange={handleChange}
// // //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-purple-200 font-semibold mb-2">
// // //                     Issue Description (IT Executive tone) *
// // //                   </label>
// // //                   <textarea
// // //                     name="issueDescription"
// // //                     value={formData.issueDescription}
// // //                     onChange={handleChange}
// // //                     rows="3"
// // //                     placeholder="Describe the technical issue from system admin/IT executive perspective..."
// // //                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-purple-200 font-semibold mb-2">
// // //                     Technical Resolution Recommended *
// // //                   </label>
// // //                   <textarea
// // //                     name="technicalResolution"
// // //                     value={formData.technicalResolution}
// // //                     onChange={handleChange}
// // //                     rows="3"
// // //                     placeholder="Technical/system perspective solution..."
// // //                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-purple-200 font-semibold mb-2">
// // //                     Managerial Resolution & Authorization *
// // //                   </label>
// // //                   <textarea
// // //                     name="managerialResolution"
// // //                     value={formData.managerialResolution}
// // //                     onChange={handleChange}
// // //                     rows="3"
// // //                     placeholder="Your managerial validation and approval of the recommended resolution..."
// // //                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// // //                   />
// // //                 </div>

// // //                 <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 space-y-4">
// // //                   <h3 className="text-xl font-semibold text-white mb-4">
// // //                     For Purchase Requests Only
// // //                   </h3>

// // //                   <div className="grid md:grid-cols-3 gap-4">
// // //                     <input
// // //                       type="text"
// // //                       name="vendor1"
// // //                       value={formData.vendor1}
// // //                       onChange={handleChange}
// // //                       placeholder="Vendor 1 Quote"
// // //                       className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// // //                     />
// // //                     <input
// // //                       type="text"
// // //                       name="vendor2"
// // //                       value={formData.vendor2}
// // //                       onChange={handleChange}
// // //                       placeholder="Vendor 2 Quote"
// // //                       className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// // //                     />
// // //                     <input
// // //                       type="text"
// // //                       name="vendor3"
// // //                       value={formData.vendor3}
// // //                       onChange={handleChange}
// // //                       placeholder="Vendor 3 Quote"
// // //                       className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// // //                     />
// // //                   </div>

// // //                   <textarea
// // //                     name="negotiationDetails"
// // //                     value={formData.negotiationDetails}
// // //                     onChange={handleChange}
// // //                     rows="2"
// // //                     placeholder="Details of 3 negotiation rounds conducted..."
// // //                     className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// // //                   />
// // //                 </div>

// // //                 <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 space-y-4">
// // //                   <h3 className="text-xl font-semibold text-white mb-4">
// // //                     Higher-Level Approval Obtained *
// // //                   </h3>

// // //                   <div className="grid md:grid-cols-2 gap-4">
// // //                     <input
// // //                       type="text"
// // //                       name="approverName"
// // //                       value={formData.approverName}
// // //                       onChange={handleChange}
// // //                       placeholder="Approver Name"
// // //                       className="px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
// // //                     />
// // //                     <input
// // //                       type="text"
// // //                       name="approverTitle"
// // //                       value={formData.approverTitle}
// // //                       onChange={handleChange}
// // //                       placeholder="Approver Title (Location CEO/Department Head)"
// // //                       className="px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div className="bg-white/5 border border-white/20 rounded-xl p-6">
// // //                   <div className="flex justify-between items-center mb-4">
// // //                     <h3 className="text-xl font-semibold text-white">
// // //                       Generated Email
// // //                     </h3>
// // //                     <button
// // //                       onClick={copyToClipboard}
// // //                       className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
// // //                     >
// // //                       {copied ? (
// // //                         <Check className="w-5 h-5" />
// // //                       ) : (
// // //                         <Copy className="w-5 h-5" />
// // //                       )}
// // //                       {copied ? "Copied!" : "Copy Email"}
// // //                     </button>
// // //                   </div>
// // //                   <pre className="bg-black/30 p-4 rounded-lg text-green-300 text-sm overflow-x-auto whitespace-pre-wrap font-mono border border-green-500/30">
// // //                     {generateEmailContent()}
// // //                   </pre>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           <div className="text-center mt-6 text-purple-300 text-sm">
// // //             <p>
// // //               Effective Date: 26th November 2025 | Issued By: Arvind Shriram,
// // //               Head-IT
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import {
// //   Copy,
// //   Check,
// //   Info,
// //   FileText,
// //   Clock,
// //   AlertCircle,
// //   CheckCircle,
// //   X,
// //   Plus,
// //   Trash2,
// // } from "lucide-react";
// // import React, { useState, useEffect } from "react";

// // export default function ITApprovalModal({ ticket, open, onClose }) {
// //   const [copied, setCopied] = useState(false);
// //   const [activeTab, setActiveTab] = useState("guide");

// //   const [formData, setFormData] = useState({
// //     ticketNumber: "",
// //     dateCreated: "",
// //     assetId: "",
// //     warrantyDate: "",
// //     issueDescription: "",
// //     technicalResolution: "",
// //     managerialResolution: "",
// //     vendor1: "",
// //     vendor2: "",
// //     vendor3: "",
// //     items: [],
// //     negotiationDetails: "",
// //     approverName: "",
// //     approverTitle: "",
// //   });

// //   // Auto-fill form when ticket data is received
// //   useEffect(() => {
// //     if (ticket) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         ticketNumber: ticket.id ? `TKT-${ticket.id}` : "",
// //         dateCreated: ticket.createdAt
// //           ? new Date(ticket.createdAt).toISOString().split("T")[0]
// //           : new Date().toISOString().split("T")[0],
// //         assetId: ticket.asset?.assetTag || ticket.asset?.id || "",
// //         warrantyDate: ticket.asset?.warrantyExpiry
// //           ? new Date(ticket.asset.warrantyExpiry).toISOString().split("T")[0]
// //           : "",
// //         issueDescription: ticket.description || ticket.title || "",
// //       }));
// //     }
// //   }, [ticket]);

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const addItem = () => {
// //     setFormData({
// //       ...formData,
// //       items: [
// //         ...formData.items,
// //         {
// //           description: "",
// //           quantity: "1",
// //           vendor1UnitPrice: "",
// //           vendor2UnitPrice: "",
// //           vendor3UnitPrice: "",
// //         },
// //       ],
// //     });
// //   };

// //   const removeItem = (index) => {
// //     const newItems = formData.items.filter((_, i) => i !== index);
// //     setFormData({ ...formData, items: newItems });
// //   };

// //   const updateItem = (index, field, value) => {
// //     const newItems = [...formData.items];
// //     newItems[index][field] = value;
// //     setFormData({ ...formData, items: newItems });
// //   };

// //   //   const generateVendorTable = () => {
// //   //     if (!formData.items || formData.items.length === 0) {
// //   //       return `Vendor 1: ${formData.vendor1 || "Not specified"}
// //   // Vendor 2: ${formData.vendor2 || "Not specified"}
// //   // Vendor 3: ${formData.vendor3 || "Not specified"}`;
// //   //     }

// //   //     const v1Name = (formData.vendor1 || "Vendor 1").substring(0, 18).padEnd(18);
// //   //     const v2Name = (formData.vendor2 || "Vendor 2").substring(0, 18).padEnd(18);
// //   //     const v3Name = (formData.vendor3 || "Vendor 3").substring(0, 26).padEnd(26);

// //   //     let table = `
// //   // ┌────┬─────────────────────────────────┬──────┬────────────────────────────────────────────────────────────────────────┐
// //   // │ Sr │ Item Description                │ Qty  │ Vendor Quotations (Price Inc. GST)                                     │
// //   // │    │                                 │      ├────────────────────┬────────────────────┬────────────────────────────┤
// //   // │    │                                 │      │ ${v1Name} │ ${v2Name} │ ${v3Name} │
// //   // ├────┼─────────────────────────────────┼──────┼────────────────────┼────────────────────┼────────────────────────────┤`;

// //   //     let grandTotalV1 = 0;
// //   //     let grandTotalV2 = 0;
// //   //     let grandTotalV3 = 0;

// //   //     formData.items.forEach((item, index) => {
// //   //       const unitPrice1 = parseFloat(item.vendor1UnitPrice) || 0;
// //   //       const unitPrice2 = parseFloat(item.vendor2UnitPrice) || 0;
// //   //       const unitPrice3 = parseFloat(item.vendor3UnitPrice) || 0;
// //   //       const qty = parseInt(item.quantity) || 1;

// //   //       const total1 = unitPrice1 * qty;
// //   //       const total2 = unitPrice2 * qty;
// //   //       const total3 = unitPrice3 * qty;

// //   //       grandTotalV1 += total1;
// //   //       grandTotalV2 += total2;
// //   //       grandTotalV3 += total3;

// //   //       const desc = (item.description || "N/A").substring(0, 31).padEnd(31);
// //   //       const srNo = String(index + 1).padEnd(2);
// //   //       const qtyStr = String(qty).padEnd(4);

// //   //       // Format vendor pricing
// //   //       const formatVendorPrice = (unitPrice, total, width) => {
// //   //         if (unitPrice === 0) return "N/A".padEnd(width);
// //   //         const line1 = `₹${unitPrice.toFixed(2)} × ${qty}`;
// //   //         const line2 = `Total: ₹${total.toFixed(2)}`;
// //   //         return line1.padEnd(width);
// //   //       };

// //   //       const v1Price = formatVendorPrice(unitPrice1, total1, 18);
// //   //       const v2Price = formatVendorPrice(unitPrice2, total2, 18);
// //   //       const v3Price = formatVendorPrice(unitPrice3, total3, 26);

// //   //       table += `
// //   // │ ${srNo} │ ${desc} │ ${qtyStr} │ ${v1Price} │ ${v2Price} │ ${v3Price} │`;

// //   //       if (index < formData.items.length - 1) {
// //   //         table += `
// //   // ├────┼─────────────────────────────────┼──────┼────────────────────┼────────────────────┼────────────────────────────┤`;
// //   //       }
// //   //     });

// //   //     // Add grand total row
// //   //     table += `
// //   // ├────┴─────────────────────────────────┴──────┼────────────────────┼────────────────────┼────────────────────────────┤
// //   // │ GRAND TOTAL                                  │ ₹${grandTotalV1
// //   //       .toFixed(2)
// //   //       .padEnd(17)} │ ₹${grandTotalV2.toFixed(2).padEnd(17)} │ ₹${grandTotalV3
// //   //       .toFixed(2)
// //   //       .padEnd(25)} │
// //   // └──────────────────────────────────────────────┴────────────────────┴────────────────────┴────────────────────────────┘`;

// //   //     return table;
// //   //   };

// //   const generateVendorTable = () => {
// //     if (!formData.items || formData.items.length === 0) {
// //       return `Vendor 1: ${formData.vendor1 || "Not specified"}
// // Vendor 2: ${formData.vendor2 || "Not specified"}
// // Vendor 3: ${formData.vendor3 || "Not specified"}`;
// //     }

// //     const v1Name = (formData.vendor1 || "Vendor 1")
// //       .substring(0, 20)
// //       .padEnd(20, " ");
// //     const v2Name = (formData.vendor2 || "Vendor 2")
// //       .substring(0, 20)
// //       .padEnd(20, " ");
// //     const v3Name = (formData.vendor3 || "Vendor 3")
// //       .substring(0, 28)
// //       .padEnd(28, " ");

// //     let table = `┌────┬──────────────────────────────────────┬──────┬──────────────────────┬──────────────────────┬──────────────────────────────┐
// // │ Sr │ Item Description                     │ Qty  │ ${v1Name}│ ${v2Name}│ ${v3Name}│
// // ├────┼──────────────────────────────────────┼──────┼──────────────────────┼──────────────────────┼──────────────────────────────┤`;

// //     let grandTotalV1 = 0;
// //     let grandTotalV2 = 0;
// //     let grandTotalV3 = 0;

// //     formData.items.forEach((item, index) => {
// //       const unitPrice1 = parseFloat(item.vendor1UnitPrice) || 0;
// //       const unitPrice2 = parseFloat(item.vendor2UnitPrice) || 0;
// //       const unitPrice3 = parseFloat(item.vendor3UnitPrice) || 0;
// //       const qty = parseInt(item.quantity) || 1;

// //       const total1 = unitPrice1 * qty;
// //       const total2 = unitPrice2 * qty;
// //       const total3 = unitPrice3 * qty;

// //       grandTotalV1 += total1;
// //       grandTotalV2 += total2;
// //       grandTotalV3 += total3;

// //       const desc = (item.description || "N/A").substring(0, 34).padEnd(34, " ");
// //       const srNo = String(index + 1)
// //         .padStart(2, " ")
// //         .padEnd(4, " ");
// //       const qtyStr = String(qty).padStart(4, " ").padEnd(6, " ");

// //       // Single-line price format with fixed width (no multi-line breaks)
// //       const formatPrice = (unitPrice, total, width) => {
// //         if (unitPrice === 0 || !unitPrice) return "N/A".padEnd(width, " ");
// //         return `₹${unitPrice.toFixed(0)}*${qty}=₹${total.toFixed(0)}`
// //           .substring(0, width)
// //           .padEnd(width, " ");
// //       };

// //       const v1Price = formatPrice(unitPrice1, total1, 22);
// //       const v2Price = formatPrice(unitPrice2, total2, 22);
// //       const v3Price = formatPrice(unitPrice3, total3, 30);

// //       table += `\n│ ${srNo}│ ${desc}│ ${qtyStr}│ ${v1Price}│ ${v2Price}│ ${v3Price}│`;

// //       if (index < formData.items.length - 1) {
// //         table += `\n├────┼──────────────────────────────────────┼──────┼──────────────────────┼──────────────────────┼──────────────────────────────┤`;
// //       }
// //     });

// //     // Fixed grand total row with exact padding
// //     const gtV1 = `₹${grandTotalV1.toFixed(0)}`.padEnd(22, " ");
// //     const gtV2 = `₹${grandTotalV2.toFixed(0)}`.padEnd(22, " ");
// //     const gtV3 = `₹${grandTotalV3.toFixed(0)}`.padEnd(30, " ");

// //     table += `\n├────┴──────────────────────────────────────┴──────┼──────────────────────┼──────────────────────┼──────────────────────────────┤
// // │ GRAND TOTAL                                      │ ${gtV1}│ ${gtV2}│ ${gtV3}│
// // └──────────────────────────────────────────────────┴──────────────────────┴──────────────────────┴──────────────────────────────┘`;

// //     return table;
// //   };

// //   const generateEmailContent = () => {
// //     return `Subject: Approval Request - Ticket #${
// //       formData.ticketNumber || "[TICKET_NUMBER]"
// //     }

// // Dear Sir,

// // I am submitting the following IT approval request for your review and final management approval:

// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // TICKET DETAILS
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // 📋 Ticket Number: ${formData.ticketNumber || "[REQUIRED]"}
// // 📅 Date Created: ${formData.dateCreated || "[REQUIRED]"}
// // 🏷️ Asset ID: ${formData.assetId || "N/A"}
// // ⚠️ Warranty/Renewal Date: ${formData.warrantyDate || "N/A"}

// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // ISSUE & RESOLUTION
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // 🔧 Issue Description (System Admin/IT Executive Perspective):
// // ${formData.issueDescription || "[REQUIRED - Describe the technical issue]"}

// // 💡 Technical Resolution Recommended:
// // ${
// //   formData.technicalResolution ||
// //   "[REQUIRED - Technical solution from IT perspective]"
// // }

// // ✅ Managerial Resolution & Authorization:
// // ${
// //   formData.managerialResolution ||
// //   "[REQUIRED - Manager validation and approval]"
// // }

// // ${
// //   formData.vendor1 || formData.items.length > 0
// //     ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // VENDOR QUOTATIONS (For Purchases)
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // ${generateVendorTable()}

// // Negotiation Details:
// // ${formData.negotiationDetails || "[REQUIRED - Details of 3 negotiation rounds]"}
// // `
// //     : ""
// // }
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // HIGHER-LEVEL APPROVAL OBTAINED
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // Approved By: ${
// //       formData.approverName ||
// //       "[REQUIRED - Location CEO/Head or Department Head]"
// //     }
// // Title: ${
// //       formData.approverTitle ||
// //       "[REQUIRED - e.g., Location CEO, Department Head]"
// //     }

// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // This request has been reviewed and authorized at the managerial level. I confirm all required information is accurate and complete.

// // Awaiting your review and final management approval.

// // Best regards,
// // [Your Name]
// // [Your Title]`;
// //   };

// //   const copyToClipboard = () => {
// //     navigator.clipboard.writeText(generateEmailContent());
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   if (!open) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
// //       <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl">
// //         {/* Close Button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
// //         >
// //           <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
// //         </button>

// //         <div className="p-6 md:p-8">
// //           {/* Header */}
// //           <div className="text-center mb-8">
// //             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
// //               <FileText className="w-8 h-8 text-white" />
// //             </div>
// //             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
// //               IT Approval Request Helper
// //             </h1>
// //             <p className="text-purple-200">
// //               Streamline your approval process with ease
// //             </p>
// //           </div>

// //           {/* Tab Navigation */}
// //           <div className="flex gap-4 mb-6">
// //             <button
// //               onClick={() => setActiveTab("guide")}
// //               className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
// //                 activeTab === "guide"
// //                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
// //                   : "bg-white/10 text-purple-200 hover:bg-white/20"
// //               }`}
// //             >
// //               <Info className="w-5 h-5 inline mr-2" />
// //               Quick Guide
// //             </button>
// //             <button
// //               onClick={() => setActiveTab("form")}
// //               className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
// //                 activeTab === "form"
// //                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
// //                   : "bg-white/10 text-purple-200 hover:bg-white/20"
// //               }`}
// //             >
// //               <FileText className="w-5 h-5 inline mr-2" />
// //               Generate Request
// //             </button>
// //           </div>

// //           {/* Content */}
// //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
// //             {activeTab === "guide" && (
// //               <div className="space-y-6">
// //                 <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6">
// //                   <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
// //                     <Info className="w-6 h-6 mr-2" />
// //                     How This Works (Simple Guide for Managers)
// //                   </h2>
// //                   <p className="text-purple-100 text-lg leading-relaxed">
// //                     This tool helps you create properly formatted IT approval
// //                     requests. Just fill in the details, and we'll generate a
// //                     professional email that includes everything Head-IT needs to
// //                     process your request quickly.
// //                   </p>
// //                 </div>

// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
// //                     <div className="flex items-start">
// //                       <div className="bg-green-500/20 p-3 rounded-lg mr-4">
// //                         <CheckCircle className="w-6 h-6 text-green-300" />
// //                       </div>
// //                       <div>
// //                         <h3 className="text-xl font-semibold text-white mb-2">
// //                           Before You Submit
// //                         </h3>
// //                         <ul className="text-purple-200 space-y-2">
// //                           <li>
// //                             ✓ Get your Location CEO/Department Head approval
// //                             first
// //                           </li>
// //                           <li>✓ For purchases: collect 3 vendor quotes</li>
// //                           <li>✓ Document 3 rounds of price negotiations</li>
// //                           <li>✓ Have your ticket number ready</li>
// //                           <li>
// //                             ✓ Have your User details with user location ready
// //                           </li>
// //                         </ul>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
// //                     <div className="flex items-start">
// //                       <div className="bg-yellow-500/20 p-3 rounded-lg mr-4">
// //                         <Clock className="w-6 h-6 text-yellow-300" />
// //                       </div>
// //                       <div>
// //                         <h3 className="text-xl font-semibold text-white mb-2">
// //                           Resolution Timeline
// //                         </h3>
// //                         <ul className="text-purple-200 space-y-2">
// //                           <li>⚡ Minor issues: 7 days</li>
// //                           <li>🔧 Major issues: 15 days</li>
// //                           <li>📊 Projects: As per approved plan</li>
// //                         </ul>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-xl p-6">
// //                   <div className="flex items-start">
// //                     <AlertCircle className="w-6 h-6 text-orange-300 mr-3 mt-1 flex-shrink-0" />
// //                     <div>
// //                       <h3 className="text-xl font-semibold text-white mb-2">
// //                         Important Reminders
// //                       </h3>
// //                       <ul className="text-orange-100 space-y-2">
// //                         <li>
// //                           • All requests must go through Head-IT for final
// //                           management approval
// //                         </li>
// //                         <li>• Incomplete submissions will be rejected</li>
// //                         <li>
// //                           • You are accountable for accuracy and completeness
// //                         </li>
// //                         <li>
// //                           • The old approval system is back in effect (recent
// //                           workflow changes revoked)
// //                         </li>
// //                       </ul>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="text-center pt-4">
// //                   <button
// //                     onClick={() => setActiveTab("form")}
// //                     className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
// //                   >
// //                     Ready? Generate Your Request →
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === "form" && (
// //               <div className="space-y-6">
// //                 <h2 className="text-2xl font-bold text-white mb-6">
// //                   Fill in Your Request Details
// //                 </h2>

// //                 {/* Auto-filled info badge */}
// //                 {ticket && (
// //                   <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 flex items-center">
// //                     <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
// //                     <span className="text-green-100">
// //                       Ticket information auto-filled. Review and complete
// //                       remaining fields.
// //                     </span>
// //                   </div>
// //                 )}

// //                 {/* Basic Ticket Details */}
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <div>
// //                     <label className="block text-purple-200 font-semibold mb-2">
// //                       Ticket Number *
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="ticketNumber"
// //                       value={formData.ticketNumber}
// //                       onChange={handleChange}
// //                       placeholder="e.g., TKT-2024-001"
// //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-purple-200 font-semibold mb-2">
// //                       Date Created *
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="dateCreated"
// //                       value={formData.dateCreated}
// //                       onChange={handleChange}
// //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-purple-200 font-semibold mb-2">
// //                       Asset ID (if applicable)
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="assetId"
// //                       value={formData.assetId}
// //                       onChange={handleChange}
// //                       placeholder="e.g., ASSET-2024-123"
// //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-purple-200 font-semibold mb-2">
// //                       Warranty/Renewal Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="warrantyDate"
// //                       value={formData.warrantyDate}
// //                       onChange={handleChange}
// //                       className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Issue & Resolution */}
// //                 <div>
// //                   <label className="block text-purple-200 font-semibold mb-2">
// //                     Issue Description (IT Executive tone) *
// //                   </label>
// //                   <textarea
// //                     name="issueDescription"
// //                     value={formData.issueDescription}
// //                     onChange={handleChange}
// //                     rows="3"
// //                     placeholder="Describe the technical issue from system admin/IT executive perspective..."
// //                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-purple-200 font-semibold mb-2">
// //                     Technical Resolution Recommended *
// //                   </label>
// //                   <textarea
// //                     name="technicalResolution"
// //                     value={formData.technicalResolution}
// //                     onChange={handleChange}
// //                     rows="3"
// //                     placeholder="Technical/system perspective solution..."
// //                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-purple-200 font-semibold mb-2">
// //                     Managerial Resolution & Authorization *
// //                   </label>
// //                   <textarea
// //                     name="managerialResolution"
// //                     value={formData.managerialResolution}
// //                     onChange={handleChange}
// //                     rows="3"
// //                     placeholder="Your managerial validation and approval of the recommended resolution..."
// //                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
// //                   />
// //                 </div>

// //                 {/* Purchase Request Section */}
// //                 <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 space-y-4">
// //                   <h3 className="text-xl font-semibold text-white mb-4">
// //                     For Purchase Requests Only
// //                   </h3>

// //                   {/* Vendor Names */}
// //                   <div>
// //                     <label className="block text-blue-200 font-semibold mb-3">
// //                       Vendor Details
// //                     </label>
// //                     <div className="grid md:grid-cols-3 gap-4">
// //                       <input
// //                         type="text"
// //                         name="vendor1"
// //                         value={formData.vendor1}
// //                         onChange={handleChange}
// //                         placeholder="Vendor 1 Name/Company"
// //                         className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                       />
// //                       <input
// //                         type="text"
// //                         name="vendor2"
// //                         value={formData.vendor2}
// //                         onChange={handleChange}
// //                         placeholder="Vendor 2 Name/Company"
// //                         className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                       />
// //                       <input
// //                         type="text"
// //                         name="vendor3"
// //                         value={formData.vendor3}
// //                         onChange={handleChange}
// //                         placeholder="Vendor 3 Name/Company"
// //                         className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Items & Quotations */}
// //                   <div className="space-y-4 mt-6">
// //                     <div className="flex justify-between items-center">
// //                       <h4 className="text-lg font-semibold text-white">
// //                         Items & Quotations
// //                       </h4>
// //                       <button
// //                         type="button"
// //                         onClick={addItem}
// //                         className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
// //                       >
// //                         <Plus className="w-4 h-4" />
// //                         Add Item
// //                       </button>
// //                     </div>

// //                     {formData.items.length === 0 && (
// //                       <div className="text-center py-8 text-blue-200">
// //                         <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
// //                         <p>No items added yet. Click "Add Item" to start.</p>
// //                       </div>
// //                     )}

// //                     {formData.items.map((item, index) => (
// //                       <div
// //                         key={index}
// //                         className="bg-white/5 border border-blue-300/20 rounded-lg p-4 space-y-3 hover:border-blue-400/40 transition-all"
// //                       >
// //                         <div className="flex justify-between items-center mb-2">
// //                           <span className="text-blue-200 font-semibold flex items-center gap-2">
// //                             <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
// //                               {index + 1}
// //                             </span>
// //                             Item #{index + 1}
// //                           </span>
// //                           <button
// //                             type="button"
// //                             onClick={() => removeItem(index)}
// //                             className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg transition-all"
// //                           >
// //                             <Trash2 className="w-5 h-5" />
// //                           </button>
// //                         </div>

// //                         <div className="grid md:grid-cols-2 gap-3">
// //                           <div className="md:col-span-1">
// //                             <label className="block text-blue-200 text-sm mb-1">
// //                               Item Description *
// //                             </label>
// //                             <input
// //                               type="text"
// //                               value={item.description}
// //                               onChange={(e) =>
// //                                 updateItem(index, "description", e.target.value)
// //                               }
// //                               placeholder="e.g., Dell Laptop i5 8GB RAM"
// //                               className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                             />
// //                           </div>
// //                           <div>
// //                             <label className="block text-blue-200 text-sm mb-1">
// //                               Quantity *
// //                             </label>
// //                             <input
// //                               type="number"
// //                               value={item.quantity}
// //                               onChange={(e) =>
// //                                 updateItem(index, "quantity", e.target.value)
// //                               }
// //                               placeholder="1"
// //                               min="1"
// //                               className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                             />
// //                           </div>
// //                         </div>

// //                         <div className="grid md:grid-cols-3 gap-3">
// //                           <div>
// //                             <label className="block text-blue-200 text-sm mb-1">
// //                               {formData.vendor1 || "Vendor 1"} - Unit Price
// //                               (Inc. GST)
// //                             </label>
// //                             <input
// //                               type="number"
// //                               value={item.vendor1UnitPrice}
// //                               onChange={(e) =>
// //                                 updateItem(
// //                                   index,
// //                                   "vendor1UnitPrice",
// //                                   e.target.value
// //                                 )
// //                               }
// //                               placeholder="₹ 0.00"
// //                               step="0.01"
// //                               className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                             />
// //                             {item.vendor1UnitPrice && item.quantity && (
// //                               <p className="text-green-300 text-xs mt-1 font-semibold">
// //                                 Total: ₹
// //                                 {(
// //                                   parseFloat(item.vendor1UnitPrice) *
// //                                   parseInt(item.quantity || 1)
// //                                 ).toFixed(2)}
// //                               </p>
// //                             )}
// //                           </div>
// //                           <div>
// //                             <label className="block text-blue-200 text-sm mb-1">
// //                               {formData.vendor2 || "Vendor 2"} - Unit Price
// //                               (Inc. GST)
// //                             </label>
// //                             <input
// //                               type="number"
// //                               value={item.vendor2UnitPrice}
// //                               onChange={(e) =>
// //                                 updateItem(
// //                                   index,
// //                                   "vendor2UnitPrice",
// //                                   e.target.value
// //                                 )
// //                               }
// //                               placeholder="₹ 0.00"
// //                               step="0.01"
// //                               className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                             />
// //                             {item.vendor2UnitPrice && item.quantity && (
// //                               <p className="text-green-300 text-xs mt-1 font-semibold">
// //                                 Total: ₹
// //                                 {(
// //                                   parseFloat(item.vendor2UnitPrice) *
// //                                   parseInt(item.quantity || 1)
// //                                 ).toFixed(2)}
// //                               </p>
// //                             )}
// //                           </div>
// //                           <div>
// //                             <label className="block text-blue-200 text-sm mb-1">
// //                               {formData.vendor3 || "Vendor 3"} - Unit Price
// //                               (Inc. GST)
// //                             </label>
// //                             <input
// //                               type="number"
// //                               value={item.vendor3UnitPrice}
// //                               onChange={(e) =>
// //                                 updateItem(
// //                                   index,
// //                                   "vendor3UnitPrice",
// //                                   e.target.value
// //                                 )
// //                               }
// //                               placeholder="₹ 0.00"
// //                               step="0.01"
// //                               className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                             />
// //                             {item.vendor3UnitPrice && item.quantity && (
// //                               <p className="text-green-300 text-xs mt-1 font-semibold">
// //                                 Total: ₹
// //                                 {(
// //                                   parseFloat(item.vendor3UnitPrice) *
// //                                   parseInt(item.quantity || 1)
// //                                 ).toFixed(2)}
// //                               </p>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   {/* Negotiation Details */}
// //                   <div>
// //                     <label className="block text-blue-200 font-semibold mb-2">
// //                       Negotiation Details *
// //                     </label>
// //                     <textarea
// //                       name="negotiationDetails"
// //                       value={formData.negotiationDetails}
// //                       onChange={handleChange}
// //                       rows="3"
// //                       placeholder="Details of 3 negotiation rounds conducted with vendors (e.g., Round 1: Initial quotes received, Round 2: Negotiated 10% discount, Round 3: Final prices confirmed with payment terms...)"
// //                       className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Higher-Level Approval */}
// //                 <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 space-y-4">
// //                   <h3 className="text-xl font-semibold text-white mb-4">
// //                     Higher-Level Approval Obtained *
// //                   </h3>

// //                   <div className="grid md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-green-200 font-semibold mb-2">
// //                         Approver Name *
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="approverName"
// //                         value={formData.approverName}
// //                         onChange={handleChange}
// //                         placeholder="e.g., John Doe"
// //                         className="w-full px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-green-200 font-semibold mb-2">
// //                         Approver Title *
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="approverTitle"
// //                         value={formData.approverTitle}
// //                         onChange={handleChange}
// //                         placeholder="e.g., Location CEO / Department Head"
// //                         className="w-full px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Generated Email Preview */}
// //                 <div className="bg-white/5 border border-white/20 rounded-xl p-6">
// //                   <div className="flex justify-between items-center mb-4">
// //                     <h3 className="text-xl font-semibold text-white">
// //                       Generated Email
// //                     </h3>
// //                     <button
// //                       onClick={copyToClipboard}
// //                       className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
// //                     >
// //                       {copied ? (
// //                         <>
// //                           <Check className="w-5 h-5" />
// //                           Copied!
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Copy className="w-5 h-5" />
// //                           Copy Email
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                   <pre className="bg-black/30 p-4 rounded-lg text-green-300 text-sm overflow-x-auto whitespace-pre-wrap font-mono border border-green-500/30 max-h-96 overflow-y-auto">
// //                     {generateEmailContent()}
// //                   </pre>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="text-center mt-6 text-purple-300 text-sm">
// //             <p>
// //               Effective Date: 26th November 2025 | Issued By: Arvind Shriram,
// //               Head-IT
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import {
//   Copy,
//   Check,
//   Info,
//   FileText,
//   Clock,
//   AlertCircle,
//   CheckCircle,
//   X,
//   Plus,
//   Trash2,
// } from "lucide-react";
// import React, { useState, useEffect } from "react";

// export default function ITApprovalModal({ ticket, open, onClose }) {
//   const [copied, setCopied] = useState(false);
//   const [activeTab, setActiveTab] = useState("guide");
//   const [formData, setFormData] = useState({
//     ticketNumber: "",
//     dateCreated: "",
//     assetId: "",
//     warrantyDate: "",
//     issueDescription: "",
//     technicalResolution: "",
//     managerialResolution: "",
//     vendor1: "",
//     vendor2: "",
//     vendor3: "",
//     items: [],
//     negotiationDetails: "",
//     approverName: "",
//     approverTitle: "",
//   });

//   // Auto-fill form when ticket data is received
//   useEffect(() => {
//     if (ticket) {
//       setFormData((prev) => ({
//         ...prev,
//         ticketNumber: ticket.id ? `TKT-${ticket.id}` : "",
//         dateCreated: ticket.createdAt
//           ? new Date(ticket.createdAt).toISOString().split("T")[0]
//           : new Date().toISOString().split("T")[0],
//         assetId: ticket.asset?.assetTag || ticket.asset?.id || "",
//         warrantyDate: ticket.asset?.warrantyExpiry
//           ? new Date(ticket.asset.warrantyExpiry).toISOString().split("T")[0]
//           : "",
//         issueDescription: ticket.description || ticket.title || "",
//       }));
//     }
//   }, [ticket]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const addItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       items: [
//         ...prev.items,
//         {
//           description: "",
//           quantity: 1,
//           vendor1UnitPrice: "",
//           vendor2UnitPrice: "",
//           vendor3UnitPrice: "",
//         },
//       ],
//     }));
//   };

//   const removeItem = (index) => {
//     const newItems = formData.items.filter((_, i) => i !== index);
//     setFormData({ ...formData, items: newItems });
//   };

//   const updateItem = (index, field, value) => {
//     const newItems = [...formData.items];
//     newItems[index][field] = value;
//     setFormData({ ...formData, items: newItems });
//   };

//   // ✅ FIXED: Perfect ASCII table for email copy-paste
//   const generateVendorTable = () => {
//     if (!formData.items || formData.items.length === 0) {
//       return `Vendor 1: ${formData.vendor1 || "Not specified"}
// Vendor 2: ${formData.vendor2 || "Not specified"}
// Vendor 3: ${formData.vendor3 || "Not specified"}`;
//     }

//     const v1Name = (formData.vendor1 || "Vendor 1")
//       .substring(0, 18)
//       .padEnd(18, " ");
//     const v2Name = (formData.vendor2 || "Vendor 2")
//       .substring(0, 18)
//       .padEnd(18, " ");
//     const v3Name = (formData.vendor3 || "Vendor 3")
//       .substring(0, 26)
//       .padEnd(26, " ");

//     let table = `┌────┬─────────────────────────────────┬──────┬────────────────────┬────────────────────┬────────────────────────────┐\n`;
//     table += `│ Sr │ Item Description                │ Qty  │ ${v1Name}│ ${v2Name}│ ${v3Name}│\n`;
//     table += `├────┼─────────────────────────────────┼──────┼────────────────────┼────────────────────┼────────────────────────────┤\n`;

//     let grandTotalV1 = 0;
//     let grandTotalV2 = 0;
//     let grandTotalV3 = 0;

//     formData.items.forEach((item, index) => {
//       const unitPrice1 = parseFloat(item.vendor1UnitPrice) || 0;
//       const unitPrice2 = parseFloat(item.vendor2UnitPrice) || 0;
//       const unitPrice3 = parseFloat(item.vendor3UnitPrice) || 0;
//       const qty = parseInt(item.quantity) || 1;

//       const total1 = unitPrice1 * qty;
//       const total2 = unitPrice2 * qty;
//       const total3 = unitPrice3 * qty;

//       grandTotalV1 += total1;
//       grandTotalV2 += total2;
//       grandTotalV3 += total3;

//       const desc = (item.description || "N/A").substring(0, 31).padEnd(31, " ");
//       const srNo = String(index + 1)
//         .padStart(2, "0")
//         .padEnd(4, " ");
//       const qtyStr = String(qty).padEnd(6, " ");

//       // ✅ SINGLE LINE FORMAT - Critical for email alignment
//       const formatPrice = (unitPrice, total, width) => {
//         if (unitPrice === 0 || !unitPrice) return "N/A".padEnd(width, " ");
//         const priceStr = `₹${Math.round(unitPrice)}x${qty}=₹${Math.round(
//           total
//         )}`;
//         return priceStr.substring(0, width).padEnd(width, " ");
//       };

//       const v1Price = formatPrice(unitPrice1, total1, 20);
//       const v2Price = formatPrice(unitPrice2, total2, 20);
//       const v3Price = formatPrice(unitPrice3, total3, 28);

//       table += `│ ${srNo}│ ${desc}│ ${qtyStr}│ ${v1Price}│ ${v2Price}│ ${v3Price}│\n`;

//       if (index < formData.items.length - 1) {
//         table += `├────┼─────────────────────────────────┼──────┼────────────────────┼────────────────────┼────────────────────────────┤\n`;
//       }
//     });

//     // ✅ PERFECTLY ALIGNED GRAND TOTAL
//     const gtV1 = `₹${Math.round(grandTotalV1)}`.padEnd(20, " ");
//     const gtV2 = `₹${Math.round(grandTotalV2)}`.padEnd(20, " ");
//     const gtV3 = `₹${Math.round(grandTotalV3)}`.padEnd(28, " ");

//     table += `├────┴─────────────────────────────────┴──────┼────────────────────┼────────────────────┼────────────────────────────┤\n`;
//     table += `│ GRAND TOTAL                          │ ${gtV1}│ ${gtV2}│ ${gtV3}│\n`;
//     table += `└──────────────────────────────────────┴────────────────────┴────────────────────┴────────────────────────────┘`;

//     return table;
//   };

//   const generateEmailContent = () => {
//     return `Subject: Approval Request - Ticket ${
//       formData.ticketNumber
//     } (TICKET#${formData.ticketNumber})

// Dear Sir,

// I am submitting the following IT approval request for your review and final management approval.

// TICKET DETAILS
// Ticket Number: ${formData.ticketNumber} [REQUIRED]
// Date Created: ${formData.dateCreated} [REQUIRED]
// Asset ID: ${formData.assetId} [N/A]
// Warranty/Renewal Date: ${formData.warrantyDate} [N/A]

// ISSUE & RESOLUTION
// Issue Description (System Admin/IT Executive Perspective): ${
//       formData.issueDescription
//     }
// [REQUIRED] - Describe the technical issue

// Technical Resolution Recommended: ${formData.technicalResolution}
// [REQUIRED] - Technical solution from IT perspective

// Managerial Resolution Authorization: ${formData.managerialResolution}
// [REQUIRED] - Manager validation and approval

// ${
//   formData.vendor1 || formData.items.length > 0
//     ? `VENDOR QUOTATIONS (For Purchases)

// ${generateVendorTable()}

// Negotiation Details: ${formData.negotiationDetails}
// [REQUIRED] - Details of 3 negotiation rounds`
//     : ""
// }

// HIGHER-LEVEL APPROVAL OBTAINED
// Approved By: ${formData.approverName}
// [REQUIRED] - Location CEO/Head or Department Head
// Title: ${formData.approverTitle}
// [REQUIRED] - e.g., Location CEO, Department Head

// This request has been reviewed and authorized at the managerial level. I confirm all required information is accurate and complete.

// Awaiting your review and final management approval.

// Best regards,
// Your Name
// Your Title`;
//   };

//   const copyToClipboard = async () => {
//     await navigator.clipboard.writeText(generateEmailContent());
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//       <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
//         >
//           <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
//         </button>

//         <div className="p-6 md:p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
//               <FileText className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//               IT Approval Request Helper
//             </h1>
//             <p className="text-purple-200">
//               Streamline your approval process with ease
//             </p>
//           </div>

//           {/* Tab Navigation */}
//           <div className="flex gap-4 mb-6">
//             <button
//               onClick={() => setActiveTab("guide")}
//               className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === "guide"
//                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                   : "bg-white/10 text-purple-200 hover:bg-white/20"
//               }`}
//             >
//               <Info className="w-5 h-5 inline mr-2" /> Quick Guide
//             </button>
//             <button
//               onClick={() => setActiveTab("form")}
//               className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === "form"
//                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                   : "bg-white/10 text-purple-200 hover:bg-white/20"
//               }`}
//             >
//               <FileText className="w-5 h-5 inline mr-2" /> Generate Request
//             </button>
//           </div>

//           {/* Content */}
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
//             {activeTab === "guide" && (
//               // Guide content here (unchanged from your original)
//               <div className="space-y-6">{/* Your guide JSX */}</div>
//             )}

//             {activeTab === "form" && (
//               <div className="space-y-6">
//                 {/* Your existing form fields JSX here - unchanged */}

//                 {/* Generated Email Preview */}
//                 <div className="bg-white/5 border border-white/20 rounded-xl p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-xl font-semibold text-white">
//                       Generated Email
//                     </h3>
//                     <button
//                       onClick={copyToClipboard}
//                       className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                     >
//                       {copied ? (
//                         <Check className="w-5 h-5" />
//                       ) : (
//                         <Copy className="w-5 h-5" />
//                       )}
//                       {copied ? "Copied!" : "Copy Email"}
//                     </button>
//                   </div>
//                   <pre className="bg-black/30 p-4 rounded-lg text-green-300 text-sm overflow-x-auto whitespace-pre-wrap font-mono border border-green-500/30 max-h-96 overflow-y-auto">
//                     {generateEmailContent()}
//                   </pre>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  Copy,
  Check,
  Info,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useState, useEffect } from "react";

export default function ITApprovalModal({ ticket, open, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("guide");
  const [formData, setFormData] = useState({
    ticketNumber: "",
    dateCreated: "",
    assetId: "",
    warrantyDate: "",
    issueDescription: "",
    technicalResolution: "",
    managerialResolution: "",
    vendor1: "",
    vendor2: "",
    vendor3: "",
    items: [],
    negotiationDetails: "",
    approverName: "",
    approverTitle: "",
  });

  // Auto-fill form when ticket data is received
  useEffect(() => {
    if (ticket) {
      setFormData((prev) => ({
        ...prev,
        ticketNumber: ticket.id ? `TKT-${ticket.id}` : "",
        dateCreated: ticket.createdAt
          ? new Date(ticket.createdAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        assetId: ticket.asset?.assetTag || ticket.asset?.id || "",
        warrantyDate: ticket.asset?.warrantyExpiry
          ? new Date(ticket.asset.warrantyExpiry).toISOString().split("T")[0]
          : "",
        issueDescription: ticket.description || ticket.title || "",
      }));
    }
  }, [ticket]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          quantity: 1,
          vendor1UnitPrice: "",
          vendor2UnitPrice: "",
          vendor3UnitPrice: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  // ✅ PERFECTLY FIXED VENDOR TABLE - Copy-paste ready for email
  const generateVendorTable = () => {
    if (!formData.items || formData.items.length === 0) {
      return `Vendor 1: ${formData.vendor1 || "Not specified"}
Vendor 2: ${formData.vendor2 || "Not specified"}
Vendor 3: ${formData.vendor3 || "Not specified"}`;
    }

    const v1Name = (formData.vendor1 || "Vendor 1")
      .substring(0, 18)
      .padEnd(18, " ");
    const v2Name = (formData.vendor2 || "Vendor 2")
      .substring(0, 18)
      .padEnd(18, " ");
    const v3Name = (formData.vendor3 || "Vendor 3")
      .substring(0, 26)
      .padEnd(26, " ");

    let table = `┌────┬─────────────────────────────────┬──────┬────────────────────┬────────────────────┬────────────────────────────┐\n`;
    table += `│ Sr │ Item Description                │ Qty  │ ${v1Name}│ ${v2Name}│ ${v3Name}│\n`;
    table += `├────┼─────────────────────────────────┼──────┼────────────────────┼────────────────────┼────────────────────────────┤\n`;

    let grandTotalV1 = 0;
    let grandTotalV2 = 0;
    let grandTotalV3 = 0;

    formData.items.forEach((item, index) => {
      const unitPrice1 = parseFloat(item.vendor1UnitPrice) || 0;
      const unitPrice2 = parseFloat(item.vendor2UnitPrice) || 0;
      const unitPrice3 = parseFloat(item.vendor3UnitPrice) || 0;
      const qty = parseInt(item.quantity) || 1;

      const total1 = unitPrice1 * qty;
      const total2 = unitPrice2 * qty;
      const total3 = unitPrice3 * qty;

      grandTotalV1 += total1;
      grandTotalV2 += total2;
      grandTotalV3 += total3;

      const desc = (item.description || "N/A").substring(0, 31).padEnd(31, " ");
      const srNo = String(index + 1)
        .padStart(2, " ")
        .padEnd(4, " ");
      const qtyStr = String(qty).padEnd(6, " ");

      // ✅ SINGLE LINE - No multi-line breaks for perfect email alignment
      const formatPrice = (unitPrice, total, width) => {
        if (unitPrice === 0 || !unitPrice) return "N/A".padEnd(width, " ");
        return `₹${Math.round(unitPrice)}x${qty}=₹${Math.round(total)}`
          .substring(0, width)
          .padEnd(width, " ");
      };

      const v1Price = formatPrice(unitPrice1, total1, 20);
      const v2Price = formatPrice(unitPrice2, total2, 20);
      const v3Price = formatPrice(unitPrice3, total3, 28);

      table += `│ ${srNo}│ ${desc}│ ${qtyStr}│ ${v1Price}│ ${v2Price}│ ${v3Price}│\n`;

      if (index < formData.items.length - 1) {
        table += `├────┼─────────────────────────────────┼──────┼────────────────────┼────────────────────┼────────────────────────────┤\n`;
      }
    });

    const gtV1 = `₹${Math.round(grandTotalV1)}`.padEnd(20, " ");
    const gtV2 = `₹${Math.round(grandTotalV2)}`.padEnd(20, " ");
    const gtV3 = `₹${Math.round(grandTotalV3)}`.padEnd(28, " ");

    table += `├────┴─────────────────────────────────┴──────┼────────────────────┼────────────────────┼────────────────────────────┤\n`;
    table += `│ GRAND TOTAL                          │ ${gtV1}│ ${gtV2}│ ${gtV3}│\n`;
    table += `└──────────────────────────────────────┴────────────────────┴────────────────────┴────────────────────────────┘`;

    return table;
  };

  const generateEmailContent = () => {
    return `Subject: Approval Request - Ticket ${
      formData.ticketNumber
    } (TICKET#${formData.ticketNumber})

Dear Sir,

I am submitting the following IT approval request for your review and final management approval.

TICKET DETAILS
Ticket Number: ${formData.ticketNumber} [REQUIRED]
Date Created: ${formData.dateCreated} [REQUIRED]
Asset ID: ${formData.assetId} [N/A]
Warranty/Renewal Date: ${formData.warrantyDate} [N/A]
Empoyee Name/ID/Location/designation: --------------------

ISSUE & RESOLUTION
Issue Description (System Admin/IT Executive Perspective): ${
      formData.issueDescription
    }
[REQUIRED] - Describe the technical issue

Technical Resolution Recommended: ${formData.technicalResolution}
[REQUIRED] - Technical solution from IT perspective

Managerial Resolution Authorization: ${formData.managerialResolution}
[REQUIRED] - Manager validation and approval

${
  formData.vendor1 || formData.items.length > 0
    ? `VENDOR QUOTATIONS (For Purchases)

${generateVendorTable()}

Negotiation Details: ${formData.negotiationDetails}
[REQUIRED] - Details of 3 negotiation rounds`
    : ""
}

HIGHER-LEVEL APPROVAL OBTAINED
Approved By: ${formData.approverName}
[REQUIRED] - Location CEO/Head or Department Head
Title: ${formData.approverTitle}
[REQUIRED] - e.g., Location CEO, Department Head

This request has been reviewed and authorized at the managerial level. I confirm all required information is accurate and complete.

Awaiting your review and final management approval.

Best regards,
Your Name
Your Title`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generateEmailContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              IT Approval Request Helper
            </h1>
            <p className="text-purple-200">
              Streamline your approval process with ease
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("guide")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "guide"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-purple-200 hover:bg-white/20"
              }`}
            >
              <Info className="w-5 h-5 inline mr-2" /> Quick Guide
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "form"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-purple-200 hover:bg-white/20"
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" /> Generate Request
            </button>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
            {activeTab === "guide" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2" /> How This Works - Simple
                    Guide for Managers
                  </h2>
                  <p className="text-purple-100 text-lg leading-relaxed">
                    This tool helps you create properly formatted IT approval
                    requests. Just fill in the details, and we'll generate a
                    professional email that includes everything Head-IT needs to
                    process your request quickly.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
                    <div className="flex items-start">
                      <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                        <CheckCircle className="w-6 h-6 text-green-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Before You Submit
                        </h3>
                        <ul className="text-purple-200 space-y-2">
                          <li>
                            • Get your Location CEO/Department Head approval
                            first
                          </li>
                          <li>• For purchases: collect 3 vendor quotes</li>
                          <li>• Document 3 rounds of price negotiations</li>
                          <li>• Have your ticket number ready</li>
                          <li>
                            • Have your User details with user location ready
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
                    <div className="flex items-start">
                      <div className="bg-yellow-500/20 p-3 rounded-lg mr-4">
                        <Clock className="w-6 h-6 text-yellow-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Resolution Timeline
                        </h3>
                        <ul className="text-purple-200 space-y-2">
                          <li>• Minor issues: 7 days</li>
                          <li>• Major issues: 15 days</li>
                          <li>• Projects: As per approved plan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-orange-300 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Important Reminders
                      </h3>
                      <ul className="text-orange-100 space-y-2">
                        <li>
                          • All requests must go through Head-IT for final
                          management approval
                        </li>
                        <li>• Incomplete submissions will be rejected</li>
                        <li>
                          • You are accountable for accuracy and completeness
                        </li>
                        <li>
                          • The old approval system is back in effect (recent
                          workflow changes revoked)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => setActiveTab("form")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Ready? Generate Your Request
                  </button>
                </div>
              </div>
            )}

            {activeTab === "form" && (
              <div className="space-y-6">
                {ticket && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                    <span className="text-green-100">
                      Ticket information auto-filled. Review and complete
                      remaining fields.
                    </span>
                  </div>
                )}

                {/* Basic Ticket Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">
                      Ticket Number
                    </label>
                    <input
                      type="text"
                      name="ticketNumber"
                      value={formData.ticketNumber}
                      onChange={handleChange}
                      placeholder="e.g., TKT-2024-001"
                      className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">
                      Date Created
                    </label>
                    <input
                      type="date"
                      name="dateCreated"
                      value={formData.dateCreated}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">
                      Asset ID (if applicable)
                    </label>
                    <input
                      type="text"
                      name="assetId"
                      value={formData.assetId}
                      onChange={handleChange}
                      placeholder="e.g., ASSET-2024-123"
                      className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">
                      Warranty/Renewal Date
                    </label>
                    <input
                      type="date"
                      name="warrantyDate"
                      value={formData.warrantyDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                    />
                  </div>
                </div>

                {/* Issue Resolution */}
                <div>
                  <label className="block text-purple-200 font-semibold mb-2">
                    Issue Description (IT Executive tone)
                  </label>
                  <textarea
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe the technical issue from system admin/IT executive perspective..."
                    className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-semibold mb-2">
                    Technical Resolution Recommended
                  </label>
                  <textarea
                    name="technicalResolution"
                    value={formData.technicalResolution}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Technical/system perspective solution..."
                    className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-semibold mb-2">
                    Managerial Resolution Authorization
                  </label>
                  <textarea
                    name="managerialResolution"
                    value={formData.managerialResolution}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Your managerial validation and approval of the recommended resolution..."
                    className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>

                {/* Purchase Request Section */}
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    For Purchase Requests Only
                  </h3>

                  {/* Vendor Names */}
                  <div>
                    <label className="block text-blue-200 font-semibold mb-3">
                      Vendor Details
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="vendor1"
                        value={formData.vendor1}
                        onChange={handleChange}
                        placeholder="Vendor 1 Name/Company"
                        className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                      />
                      <input
                        type="text"
                        name="vendor2"
                        value={formData.vendor2}
                        onChange={handleChange}
                        placeholder="Vendor 2 Name/Company"
                        className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                      />
                      <input
                        type="text"
                        name="vendor3"
                        value={formData.vendor3}
                        onChange={handleChange}
                        placeholder="Vendor 3 Name/Company"
                        className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Items Quotations */}
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-white">
                        Items Quotations
                      </h4>
                      <button
                        type="button"
                        onClick={addItem}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" /> Add Item
                      </button>
                    </div>

                    {formData.items.length === 0 ? (
                      <div className="text-center py-8 text-blue-200">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No items added yet. Click "Add Item" to start.</p>
                      </div>
                    ) : (
                      formData.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white/5 border border-blue-300/20 rounded-lg p-4 space-y-3 hover:border-blue-400/40 transition-all"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200 font-semibold flex items-center gap-2">
                              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                                {index + 1}
                              </span>
                              Item {index + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="md:col-span-1">
                              <label className="block text-blue-200 text-sm mb-1">
                                Item Description
                              </label>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) =>
                                  updateItem(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., Dell Laptop i5 8GB RAM"
                                className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-blue-200 text-sm mb-1">
                                Quantity
                              </label>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(index, "quantity", e.target.value)
                                }
                                placeholder="1"
                                min="1"
                                className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-blue-200 text-sm mb-1">
                                {formData.vendor1 || "Vendor 1"} - Unit Price
                                (Inc. GST)
                              </label>
                              <input
                                type="number"
                                value={item.vendor1UnitPrice}
                                onChange={(e) =>
                                  updateItem(
                                    index,
                                    "vendor1UnitPrice",
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                                step="0.01"
                                className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                              />
                              {item.vendor1UnitPrice && item.quantity && (
                                <p className="text-green-300 text-xs mt-1 font-semibold">
                                  Total: ₹
                                  {(
                                    parseFloat(item.vendor1UnitPrice) *
                                      parseInt(item.quantity) || 0
                                  ).toFixed(2)}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-blue-200 text-sm mb-1">
                                {formData.vendor2 || "Vendor 2"} - Unit Price
                                (Inc. GST)
                              </label>
                              <input
                                type="number"
                                value={item.vendor2UnitPrice}
                                onChange={(e) =>
                                  updateItem(
                                    index,
                                    "vendor2UnitPrice",
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                                step="0.01"
                                className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                              />
                              {item.vendor2UnitPrice && item.quantity && (
                                <p className="text-green-300 text-xs mt-1 font-semibold">
                                  Total: ₹
                                  {(
                                    parseFloat(item.vendor2UnitPrice) *
                                      parseInt(item.quantity) || 0
                                  ).toFixed(2)}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-blue-200 text-sm mb-1">
                                {formData.vendor3 || "Vendor 3"} - Unit Price
                                (Inc. GST)
                              </label>
                              <input
                                type="number"
                                value={item.vendor3UnitPrice}
                                onChange={(e) =>
                                  updateItem(
                                    index,
                                    "vendor3UnitPrice",
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                                step="0.01"
                                className="w-full px-3 py-2 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                              />
                              {item.vendor3UnitPrice && item.quantity && (
                                <p className="text-green-300 text-xs mt-1 font-semibold">
                                  Total: ₹
                                  {(
                                    parseFloat(item.vendor3UnitPrice) *
                                      parseInt(item.quantity) || 0
                                  ).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-200 font-semibold mb-2">
                      Negotiation Details
                    </label>
                    <textarea
                      name="negotiationDetails"
                      value={formData.negotiationDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Details of 3 negotiation rounds conducted with vendors e.g., Round 1: Initial quotes received, Round 2: Negotiated 10% discount, Round 3: Final prices confirmed with payment terms..."
                      className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                    />
                  </div>
                </div>

                {/* Higher-Level Approval */}
                <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Higher-Level Approval Obtained
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-200 font-semibold mb-2">
                        Approver Name
                      </label>
                      <input
                        type="text"
                        name="approverName"
                        value={formData.approverName}
                        onChange={handleChange}
                        placeholder="e.g., John Doe"
                        className="w-full px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-green-200 font-semibold mb-2">
                        Approver Title
                      </label>
                      <input
                        type="text"
                        name="approverTitle"
                        value={formData.approverTitle}
                        onChange={handleChange}
                        placeholder="e.g., Location CEO / Department Head"
                        className="w-full px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Generated Email Preview */}
                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Generated Email
                    </h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                      {copied ? "Copied!" : "Copy Email"}
                    </button>
                  </div>
                  <pre className="bg-black/30 p-4 rounded-lg text-green-300 text-sm overflow-x-auto whitespace-pre-wrap font-mono border border-green-500/30 max-h-96 overflow-y-auto">
                    {generateEmailContent()}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-purple-300 text-sm p-4 border-t border-white/10">
          <p>
            Effective Date: 26th November 2025 | Issued By: Arvind Shriram,
            Head-IT
          </p>
        </div>
      </div>
    </div>
  );
}
