// import {
//   Copy,
//   Check,
//   Info,
//   FileText,
//   Clock,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react";
// import React, { useState } from "react";

// export default function ITApprovalHelper() {
//   const [copied, setCopied] = useState(false);
//   const [activeTab, setActiveTab] = useState("guide");

//   const [formData, setFormData] = useState({
//     ticketNumber: "",
//     dateCreated: new Date().toISOString().split("T")[0],
//     assetId: "",
//     warrantyDate: "",
//     issueDescription: "",
//     technicalResolution: "",
//     managerialResolution: "",
//     vendor1: "",
//     vendor2: "",
//     vendor3: "",
//     negotiationDetails: "",
//     approverName: "",
//     approverTitle: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const generateEmailContent = () => {
//     return `Subject: IT Approval Request - Ticket #${
//       formData.ticketNumber || "[TICKET_NUMBER]"
//     }

// Dear Arvind Shriram (Head-IT),

// I am submitting the following IT approval request for your review and final management approval:

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TICKET DETAILS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 📋 Ticket Number: ${formData.ticketNumber || "[REQUIRED]"}
// 📅 Date Created: ${formData.dateCreated || "[REQUIRED]"}
// 🏷️ Asset ID: ${formData.assetId || "N/A"}
// ⚠️ Warranty/Renewal Date: ${formData.warrantyDate || "N/A"}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ISSUE & RESOLUTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 🔧 Issue Description (System Admin/IT Executive Perspective):
// ${formData.issueDescription || "[REQUIRED - Describe the technical issue]"}

// 💡 Technical Resolution Recommended:
// ${
//   formData.technicalResolution ||
//   "[REQUIRED - Technical solution from IT perspective]"
// }

// ✅ Managerial Resolution & Authorization:
// ${
//   formData.managerialResolution ||
//   "[REQUIRED - Manager validation and approval]"
// }

// ${
//   formData.vendor1
//     ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VENDOR QUOTATIONS (For Purchases)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Vendor 1: ${formData.vendor1}
// Vendor 2: ${formData.vendor2}
// Vendor 3: ${formData.vendor3}

// Negotiation Details:
// ${formData.negotiationDetails}
// `
//     : ""
// }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HIGHER-LEVEL APPROVAL OBTAINED
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Approved By: ${
//       formData.approverName ||
//       "[REQUIRED - Location CEO/Head or Department Head]"
//     }
// Title: ${
//       formData.approverTitle ||
//       "[REQUIRED - e.g., Location CEO, Department Head]"
//     }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// This request has been reviewed and authorized at the managerial level. I confirm all required information is accurate and complete.

// Awaiting your review and final management approval.

// Best regards,
// [Your Name]
// [Your Title]`;
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(generateEmailContent());
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
//             <FileText className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-2">
//             IT Approval Request Helper
//           </h1>
//           <p className="text-purple-200">
//             Streamline your approval process with ease
//           </p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={() => setActiveTab("guide")}
//             className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
//               activeTab === "guide"
//                 ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                 : "bg-white/10 text-purple-200 hover:bg-white/20"
//             }`}
//           >
//             <Info className="w-5 h-5 inline mr-2" />
//             Quick Guide
//           </button>
//           <button
//             onClick={() => setActiveTab("form")}
//             className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
//               activeTab === "form"
//                 ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                 : "bg-white/10 text-purple-200 hover:bg-white/20"
//             }`}
//           >
//             <FileText className="w-5 h-5 inline mr-2" />
//             Generate Request
//           </button>
//         </div>

//         {/* Content */}
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
//           {activeTab === "guide" && (
//             <div className="space-y-6">
//               <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6">
//                 <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
//                   <Info className="w-6 h-6 mr-2" />
//                   How This Works (Simple Guide for Managers)
//                 </h2>
//                 <p className="text-purple-100 text-lg leading-relaxed">
//                   This tool helps you create properly formatted IT approval
//                   requests. Just fill in the details, and we'll generate a
//                   professional email that includes everything Head-IT needs to
//                   process your request quickly.
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
//                   <div className="flex items-start">
//                     <div className="bg-green-500/20 p-3 rounded-lg mr-4">
//                       <CheckCircle className="w-6 h-6 text-green-300" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-white mb-2">
//                         Before You Submit
//                       </h3>
//                       <ul className="text-purple-200 space-y-2">
//                         <li>
//                           ✓ Get your Location CEO/Department Head approval first
//                         </li>
//                         <li>✓ For purchases: collect 3 vendor quotes</li>
//                         <li>✓ Document 3 rounds of price negotiations</li>
//                         <li>✓ Have your ticket number ready</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white/5 rounded-xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all">
//                   <div className="flex items-start">
//                     <div className="bg-yellow-500/20 p-3 rounded-lg mr-4">
//                       <Clock className="w-6 h-6 text-yellow-300" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-white mb-2">
//                         Resolution Timeline
//                       </h3>
//                       <ul className="text-purple-200 space-y-2">
//                         <li>⚡ Minor issues: 7 days</li>
//                         <li>🔧 Major issues: 15 days</li>
//                         <li>📊 Projects: As per approved plan</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-xl p-6">
//                 <div className="flex items-start">
//                   <AlertCircle className="w-6 h-6 text-orange-300 mr-3 mt-1 flex-shrink-0" />
//                   <div>
//                     <h3 className="text-xl font-semibold text-white mb-2">
//                       Important Reminders
//                     </h3>
//                     <ul className="text-orange-100 space-y-2">
//                       <li>
//                         • All requests must go through Head-IT for final
//                         management approval
//                       </li>
//                       <li>• Incomplete submissions will be rejected</li>
//                       <li>
//                         • You are accountable for accuracy and completeness
//                       </li>
//                       <li>
//                         • The old approval system is back in effect (recent
//                         workflow changes revoked)
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-center pt-4">
//                 <button
//                   onClick={() => setActiveTab("form")}
//                   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                 >
//                   Ready? Generate Your Request →
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeTab === "form" && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-white mb-6">
//                 Fill in Your Request Details
//               </h2>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-purple-200 font-semibold mb-2">
//                     Ticket Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="ticketNumber"
//                     value={formData.ticketNumber}
//                     onChange={handleChange}
//                     placeholder="e.g., TKT-2024-001"
//                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-purple-200 font-semibold mb-2">
//                     Date Created *
//                   </label>
//                   <input
//                     type="date"
//                     name="dateCreated"
//                     value={formData.dateCreated}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-purple-200 font-semibold mb-2">
//                     Asset ID (if applicable)
//                   </label>
//                   <input
//                     type="text"
//                     name="assetId"
//                     value={formData.assetId}
//                     onChange={handleChange}
//                     placeholder="e.g., ASSET-2024-123"
//                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-purple-200 font-semibold mb-2">
//                     Warranty/Renewal Date
//                   </label>
//                   <input
//                     type="date"
//                     name="warrantyDate"
//                     value={formData.warrantyDate}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-purple-200 font-semibold mb-2">
//                   Issue Description (IT Executive tone) *
//                 </label>
//                 <textarea
//                   name="issueDescription"
//                   value={formData.issueDescription}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Describe the technical issue from system admin/IT executive perspective..."
//                   className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-purple-200 font-semibold mb-2">
//                   Technical Resolution Recommended *
//                 </label>
//                 <textarea
//                   name="technicalResolution"
//                   value={formData.technicalResolution}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Technical/system perspective solution..."
//                   className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-purple-200 font-semibold mb-2">
//                   Managerial Resolution & Authorization *
//                 </label>
//                 <textarea
//                   name="managerialResolution"
//                   value={formData.managerialResolution}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Your managerial validation and approval of the recommended resolution..."
//                   className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
//                 />
//               </div>

//               <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 space-y-4">
//                 <h3 className="text-xl font-semibold text-white mb-4">
//                   For Purchase Requests Only
//                 </h3>

//                 <div className="grid md:grid-cols-3 gap-4">
//                   <input
//                     type="text"
//                     name="vendor1"
//                     value={formData.vendor1}
//                     onChange={handleChange}
//                     placeholder="Vendor 1 Quote"
//                     className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
//                   />
//                   <input
//                     type="text"
//                     name="vendor2"
//                     value={formData.vendor2}
//                     onChange={handleChange}
//                     placeholder="Vendor 2 Quote"
//                     className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
//                   />
//                   <input
//                     type="text"
//                     name="vendor3"
//                     value={formData.vendor3}
//                     onChange={handleChange}
//                     placeholder="Vendor 3 Quote"
//                     className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
//                   />
//                 </div>

//                 <textarea
//                   name="negotiationDetails"
//                   value={formData.negotiationDetails}
//                   onChange={handleChange}
//                   rows="2"
//                   placeholder="Details of 3 negotiation rounds conducted..."
//                   className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
//                 />
//               </div>

//               <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 space-y-4">
//                 <h3 className="text-xl font-semibold text-white mb-4">
//                   Higher-Level Approval Obtained *
//                 </h3>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="approverName"
//                     value={formData.approverName}
//                     onChange={handleChange}
//                     placeholder="Approver Name"
//                     className="px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
//                   />
//                   <input
//                     type="text"
//                     name="approverTitle"
//                     value={formData.approverTitle}
//                     onChange={handleChange}
//                     placeholder="Approver Title (Location CEO/Department Head)"
//                     className="px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
//                   />
//                 </div>
//               </div>

//               <div className="bg-white/5 border border-white/20 rounded-xl p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-semibold text-white">
//                     Generated Email
//                   </h3>
//                   <button
//                     onClick={copyToClipboard}
//                     className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                   >
//                     {copied ? (
//                       <Check className="w-5 h-5" />
//                     ) : (
//                       <Copy className="w-5 h-5" />
//                     )}
//                     {copied ? "Copied!" : "Copy Email"}
//                   </button>
//                 </div>
//                 <pre className="bg-black/30 p-4 rounded-lg text-green-300 text-sm overflow-x-auto whitespace-pre-wrap font-mono border border-green-500/30">
//                   {generateEmailContent()}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="text-center mt-8 text-purple-300 text-sm">
//           <p>
//             Effective Date: 26th November 2025 | Issued By: Arvind Shriram,
//             Head-IT
//           </p>
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateEmailContent = () => {
    return `Subject: IT Approval Request - Ticket #${
      formData.ticketNumber || "[TICKET_NUMBER]"
    }

Dear Arvind Shriram (Head-IT),

I am submitting the following IT approval request for your review and final management approval:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TICKET DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Ticket Number: ${formData.ticketNumber || "[REQUIRED]"}
📅 Date Created: ${formData.dateCreated || "[REQUIRED]"}
🏷️ Asset ID: ${formData.assetId || "N/A"}
⚠️ Warranty/Renewal Date: ${formData.warrantyDate || "N/A"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ISSUE & RESOLUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 Issue Description (System Admin/IT Executive Perspective):
${formData.issueDescription || "[REQUIRED - Describe the technical issue]"}

💡 Technical Resolution Recommended:
${
  formData.technicalResolution ||
  "[REQUIRED - Technical solution from IT perspective]"
}

✅ Managerial Resolution & Authorization:
${
  formData.managerialResolution ||
  "[REQUIRED - Manager validation and approval]"
}

${
  formData.vendor1
    ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VENDOR QUOTATIONS (For Purchases)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vendor 1: ${formData.vendor1}
Vendor 2: ${formData.vendor2}
Vendor 3: ${formData.vendor3}

Negotiation Details:
${formData.negotiationDetails}
`
    : ""
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HIGHER-LEVEL APPROVAL OBTAINED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Approved By: ${
      formData.approverName ||
      "[REQUIRED - Location CEO/Head or Department Head]"
    }
Title: ${
      formData.approverTitle ||
      "[REQUIRED - e.g., Location CEO, Department Head]"
    }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This request has been reviewed and authorized at the managerial level. I confirm all required information is accurate and complete.

Awaiting your review and final management approval.

Best regards,
[Your Name]
[Your Title]`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmailContent());
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
              <Info className="w-5 h-5 inline mr-2" />
              Quick Guide
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "form"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-purple-200 hover:bg-white/20"
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Generate Request
            </button>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
            {activeTab === "guide" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2" />
                    How This Works (Simple Guide for Managers)
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
                            ✓ Get your Location CEO/Department Head approval
                            first
                          </li>
                          <li>✓ For purchases: collect 3 vendor quotes</li>
                          <li>✓ Document 3 rounds of price negotiations</li>
                          <li>✓ Have your ticket number ready</li>
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
                          <li>⚡ Minor issues: 7 days</li>
                          <li>🔧 Major issues: 15 days</li>
                          <li>📊 Projects: As per approved plan</li>
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
                    Ready? Generate Your Request →
                  </button>
                </div>
              </div>
            )}

            {activeTab === "form" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Fill in Your Request Details
                </h2>

                {/* Auto-filled info badge */}
                {ticket && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                    <span className="text-green-100">
                      Ticket information auto-filled. Review and complete
                      remaining fields.
                    </span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">
                      Ticket Number *
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
                      Date Created *
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

                <div>
                  <label className="block text-purple-200 font-semibold mb-2">
                    Issue Description (IT Executive tone) *
                  </label>
                  <textarea
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe the technical issue from system admin/IT executive perspective..."
                    className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 font-semibold mb-2">
                    Technical Resolution Recommended *
                  </label>
                  <textarea
                    name="technicalResolution"
                    value={formData.technicalResolution}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Technical/system perspective solution..."
                    className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 font-semibold mb-2">
                    Managerial Resolution & Authorization *
                  </label>
                  <textarea
                    name="managerialResolution"
                    value={formData.managerialResolution}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Your managerial validation and approval of the recommended resolution..."
                    className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    For Purchase Requests Only
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="vendor1"
                      value={formData.vendor1}
                      onChange={handleChange}
                      placeholder="Vendor 1 Quote"
                      className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                    />
                    <input
                      type="text"
                      name="vendor2"
                      value={formData.vendor2}
                      onChange={handleChange}
                      placeholder="Vendor 2 Quote"
                      className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                    />
                    <input
                      type="text"
                      name="vendor3"
                      value={formData.vendor3}
                      onChange={handleChange}
                      placeholder="Vendor 3 Quote"
                      className="px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                    />
                  </div>

                  <textarea
                    name="negotiationDetails"
                    value={formData.negotiationDetails}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Details of 3 negotiation rounds conducted..."
                    className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                  />
                </div>

                <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Higher-Level Approval Obtained *
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="approverName"
                      value={formData.approverName}
                      onChange={handleChange}
                      placeholder="Approver Name"
                      className="px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
                    />
                    <input
                      type="text"
                      name="approverTitle"
                      value={formData.approverTitle}
                      onChange={handleChange}
                      placeholder="Approver Title (Location CEO/Department Head)"
                      className="px-4 py-3 bg-white/10 border border-green-300/30 rounded-lg text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
                    />
                  </div>
                </div>

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
                  <pre className="bg-black/30 p-4 rounded-lg text-green-300 text-sm overflow-x-auto whitespace-pre-wrap font-mono border border-green-500/30">
                    {generateEmailContent()}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-6 text-purple-300 text-sm">
            <p>
              Effective Date: 26th November 2025 | Issued By: Arvind Shriram,
              Head-IT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
