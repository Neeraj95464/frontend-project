// import SimAcknowledgementDownload from "../components/SimAcknowledgementDownload";
// import UserDetailsModal from "../components/UserDetailsModal";
// import {
//   getSimDetails,
//   assignSim,
//   unassignSim,
//   fetchSimHistory,
//   updateSimStatus,
//   updateSimInfo,
//   uploadSimAttachment,
//   deleteSimAttachment,
//   downloadSimAttachment,
//   fetchSimAttachments,
//   fetchSites,
//   getLocationsBySite,
// } from "../services/api";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function CugSimDetails() {
//   const { id } = useParams();
//   const [sim, setSim] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [assignNote, setAssignNote] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editFormData, setEditFormData] = useState({});
//   const [uploading, setUploading] = useState(false);
//   const [uploadNote, setUploadNote] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [sites, setSites] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [attachments, setAttachments] = useState([]);
//   // Add these useEffects for edit modal
//   const [editLocations, setEditLocations] = useState([]);
//   const [statusNote, setStatusNote] = useState("");
// const [selectedStatus, setSelectedStatus] = useState("");



//   // Fetch sites for edit modal (reuse your existing sites)
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
//     if (editFormData.siteName) {
//       // Find siteId from siteName for API call
//       const selectedSite = sites.find(
//         (site) => site.name === editFormData.siteName,
//       );
//       if (selectedSite) {
//         getLocationsBySite(selectedSite.siteId)
//           .then((locations) => {
//             setEditLocations(locations);
//           })
//           .catch((err) => {
//             console.error("Error fetching locations", err);
//           });
//       }
//     } else {
//       setEditLocations([]);
//       setEditFormData((prev) => ({ ...prev, locationName: "" }));
//     }
//   }, [editFormData.siteName]);

//   useEffect(() => {
//     loadAttachments();
//   }, [id]);

//   const loadAttachments = async () => {
//     try {
//       const res = await fetchSimAttachments(id);
//       // console.log(res.data);
//       setAttachments(res);
//     } catch (err) {
//       console.error("Error fetching attachments:", err);
//     }
//   };

//   const handleDownloadAttachment = async (id, fileName) => {
//     try {
//       await downloadSimAttachment(id, fileName);
//     } catch (err) {
//       console.error("Download failed:", err);
//     }
//   };

//   const handleDeleteAttachment = (id) => {
//     // optional future delete logic
//     console.log("Delete:", id);
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     return new Date(date).toLocaleDateString();
//   };

//   const loadDetails = async () => {
//     try {
//       setLoading(true);
//       const data = await getSimDetails(id);
//       // console.log("data are ", data);
//       setSim(data);
//       setEditFormData(data);
//       const historyData = await fetchSimHistory(id);
//       setHistory(historyData);
//     } catch (error) {
//       toast.error("Failed to load SIM details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDetails();
//   }, [id]);

//   const handleAssign = async () => {
//     if (!employeeId.trim()) {
//       toast.warning("Please enter a User ID");
//       return;
//     }
//     if (!assignNote.trim()) {
//       toast.warning("Please enter a note for assignment");
//       return;
//     }
//     try {
//       await assignSim(id, { employeeId, note: assignNote });
//       toast.success("SIM assigned successfully!");
//       setEmployeeId("");
//       setAssignNote("");
//       loadDetails();
//     } catch (error) {
//       toast.error("Failed to assign SIM");
//     }
//   };

//   // const handleUnassign = async () => {
//   //   try {
//   //     await unassignSim(id);
//   //     toast.success("SIM unassigned successfully!");
//   //     loadDetails();
//   //   } catch (error) {
//   //     toast.error("Failed to unassign SIM");
//   //   }
//   // };

//   const handleUnassign = async () => {
//     const note = prompt("Please enter the reason for unassigning this SIM:");

//     // ❌ If user clicks Cancel or leaves empty
//     if (!note || note.trim() === "") {
//       toast.error("Unassign note is mandatory");
//       return;
//     }

//     try {
//       await unassignSim(id, note.trim());
//       toast.success("SIM unassigned successfully!");
//       loadDetails();
//     } catch (error) {
//       toast.error("Failed to unassign SIM");
//     }
//   };

//   // const handleStatusUpdate = async (newStatus) => {
//   //   try {
//   //     await updateSimStatus(id, newStatus);
//   //     toast.success(`Status updated to ${newStatus}`);
//   //     loadDetails();
//   //   } catch (error) {
//   //     toast.error("Failed to update status");
//   //   }
//   // };

//   const handleStatusUpdate = async () => {
//   if (!selectedStatus) {
//     toast.error("Please select status");
//     return;
//   }

//   if (!statusNote.trim()) {
//     toast.error("Please enter status note");
//     return;
//   }

//   try {
//     await updateSimStatus(id, selectedStatus, statusNote);

//     toast.success(`Status updated to ${selectedStatus}`);
//     setStatusNote("");
//     setSelectedStatus("");
//     loadDetails();
//   } catch (error) {
//     toast.error("Failed to update status");
//   }
// };

// const simStatusOptions = [
//   "SUSPENDED",
//   "RESERVED",
//   "LOST",
//   "DEACTIVATED",
//   "UNRESERVED",
//   "DISCARDED"
// ];

//   const handleUpdateSimInfo = async () => {
//     try {
//       // console.log("update request are ", editFormData);
//       await updateSimInfo(id, editFormData);
//       toast.success("SIM information updated successfully!");
//       setIsEditModalOpen(false);
//       loadDetails();
//     } catch (error) {
//       toast.error("Failed to update SIM information");
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       toast.warning("Please select a file");
//       return;
//     }
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       formData.append("note", uploadNote);
//       await uploadSimAttachment(id, formData);
//       toast.success("File uploaded successfully!");
//       setSelectedFile(null);
//       setUploadNote("");
//       loadDetails();
//     } catch (error) {
//       toast.error("Failed to upload file");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const formatDateOnly = (dateString) => {
//     if (!dateString) return "---";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", { dateStyle: "medium" });
//   };

//   const getEventBadgeColor = (eventType) => {
//     switch (eventType) {
//       case "ASSIGNED":
//         return "bg-green-100 text-green-800";
//       case "UNASSIGNED":
//         return "bg-red-100 text-red-800";
//       case "CREATED":
//         return "bg-blue-100 text-blue-800";
//       case "STATUS_CHANGED":
//         return "bg-purple-100 text-purple-800";
//       case "UPDATED":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const ClickableDetailItem = ({ label, children, ...props }) => (
//     <DetailItem label={label} {...props}>
//       {children}
//     </DetailItem>
//   );

//   const getStatusBadgeColor = (status) => {
//     switch (status) {
//       case "AVAILABLE":
//         return "bg-green-500 text-white";
//       case "ASSIGNED":
//         return "bg-blue-500 text-white";
//       case "SUSPENDED":
//         return "bg-yellow-500 text-white";
//       case "LOST":
//         return "bg-red-600 text-white";
//       case "DEACTIVATED":
//         return "bg-gray-500 text-white";
//       case "REPLACED":
//         return "bg-orange-500 text-white";
//       case "DISCARDED":
//         return "bg-red-800 text-white";
//       default:
//         return "bg-gray-500 text-white";
//     }
//   };

//   const simStatuses = [
//     "AVAILABLE",
//     "ASSIGNED",
//     "SUSPENDED",
//     "LOST",
//     "DEACTIVATED",
//     "REPLACED",
//     "DISCARDED",
//   ];

//   if (loading) {
//     return (
//       <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-center min-h-[50vh]">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!sim) return null;

//   // Prepare employee data for acknowledgement
//   const employeeData = {
//     employeeId: sim.assignedUser?.employeeId || sim.assignedUserId,
//     fullName: sim.assignedUserName,
//     designation: sim.assigneeDesignation,
//     location: sim.locationName,
//   };

//   return (
//     // <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
//     <div className="lg:ml-48 bg-gray-50 min-h-screen"> 
//     {/* SIM Details Card */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <div className="bg-white/20 p-2 rounded-lg">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-white"
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
//             </div>
//             <div>
//               <h1 className="text-white text-xl sm:text-2xl font-bold">
//                 {sim.phoneNumber}
//               </h1>
//               <p className="text-blue-100 text-xs">{sim.simTag}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
//                 sim.status,
//               )}`}
//             >
//               {sim.status}
//             </span>
//             {/* {sim.status === "ASSIGNED" && sim.assignedUserName && (
//               <SimAcknowledgementDownload
//                 simData={sim}
//                 employeeData={employeeData}
//                 companyName="MAHAVIR GROUP"
//               />
//             )} */}

// {(sim.status === "ASSIGNED" || sim.status === "UAP") && sim.assignedUserName && (
//   <SimAcknowledgementDownload
//     simData={sim}
//     employeeData={employeeData}
//     companyName="MAHAVIR GROUP"
//   />
// )}
//             <button
//               onClick={() => setIsEditModalOpen(true)}
//               className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-lg transition-all"
//               title="Edit SIM Info"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

       

//         <div className="p-4 sm:p-5">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-x-4 gap-y-3">
//             <DetailItem label="Provider" value={sim.provider} />
//             <DetailItem label="ICCID" value={sim.iccid} />
//             <DetailItem label="IMSI" value={sim.imsi} />

//             {/* Clickable Assigned To - styled like DetailItem */}
//             <div className="flex flex-col">
//               <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                 Assigned To
//               </span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedUser(sim.assignedUserId);
//                 }}
//                 className="hover:underline truncate text-left bg-transparent border-none p-0 w-full text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
//                 title={sim.assignedUserName || "Unassigned"}
//               >
//                 {sim.assignedUserName || "Unassigned"}
//               </button>
//             </div>

//             <DetailItem
//               label="Assigned At"
//               value={formatDate(sim.assignedAt)}
//             />
//             <DetailItem
//               label="Activated"
//               value={formatDateOnly(sim.activatedAt)}
//             />
//             <DetailItem
//               label="Purchase Date"
//               value={formatDateOnly(sim.purchaseDate)}
//             />
//             <DetailItem label="Purchase From" value={sim.purchaseFrom} />
//             <DetailItem label="Cost" value={sim.cost ? `₹${sim.cost}` : null} />
//             <DetailItem label="Location" value={sim.locationName} />
//             <DetailItem label="Site" value={sim.siteName} />
//             <DetailItem label="Created By" value={sim.createdBy} />
//             <DetailItem label="Created At" value={formatDate(sim.createdAt)} />
//             <DetailItem
//               label="Ack Uploaded"
//               value={sim.assignmentUploaded ? "Yes" : "No"}
//               valueClass={
//                 sim.assignmentUploaded ? "text-green-600" : "text-red-500"
//               }
//             />
//           </div>

//           {/* Note */}
//           {sim.note && (
//             <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <p className="text-sm text-gray-700">{sim.note}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Rest of your existing code for Actions, Attachments, History sections... */}
//       {/* Quick Actions & Status Update */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
       

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//   <div className="px-6 py-4 border-b border-gray-100">
//     <h2 className="text-lg font-semibold text-gray-800">Assignments & Unassignments</h2>
//   </div>

//   <div className="p-6 space-y-4">

//     {/* USER ID */}
//     <div>
//       <label className="text-sm font-medium text-gray-700 mb-1 block">
//         User ID *
//       </label>
//       <input
//         type="text"
//         placeholder="Enter User ID"
//         value={employeeId}
//         className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//         onChange={(e) => setEmployeeId(e.target.value)}
//       />
//     </div>

//     {/* ASSIGN NOTE */}
//     <div>
//       <label className="text-sm font-medium text-gray-700 mb-1 block">
//         Assignment Note *
//       </label>
//       <textarea
//         placeholder="Enter assignment note"
//         value={assignNote}
//         rows={2}
//         className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
//         onChange={(e) => setAssignNote(e.target.value)}
//       />
//     </div>

//     {/* ASSIGN BUTTONS */}
//     <div className="flex gap-3">
//       <button
//         className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
//         onClick={handleAssign}
//       >
//         Assign
//       </button>

//       {sim.assignedUserName && (
//         <button
//           className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
//           onClick={handleUnassign}
//         >
//           Unassign
//         </button>
//       )}

      
//     </div>



//   </div>

  
// </div>

//     {/* -------- STATUS UPDATE SECTION -------- */}

//     <div className="border-t pt-4 mt-4 space-y-4">
//       <h3 className="text-md font-semibold text-gray-800">
//         Update SIM Other Status
//       </h3>

//       {/* STATUS DROPDOWN */}
//       <div>
//         <label className="text-sm font-medium text-gray-700 mb-1 block">
//           Select Status
//         </label>

//         <select
//           value={selectedStatus}
//           onChange={(e) => setSelectedStatus(e.target.value)}
//           className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//         >
//           <option value="">Select Status</option>

//           {simStatusOptions.map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}

//         </select>
//       </div>

//       {/* STATUS NOTE */}
//       <div>
//         <label className="text-sm font-medium text-gray-700 mb-1 block">
//           Status Note *
//         </label>

//         <textarea
//           rows={2}
//           placeholder="Enter status update note"
//           value={statusNote}
//           className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
//           onChange={(e) => setStatusNote(e.target.value)}
//         />
//       </div>

//       {/* UPDATE BUTTON */}
//       <button
//         className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all"
//         onClick={handleStatusUpdate}
//       >
//         Update Status
//       </button>

//     </div>
//         {/* Status Update Card */}
//         {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Update Status
//             </h2>
//           </div>
//           <div className="p-6">
//             <p className="text-sm text-gray-500 mb-4">
//               Current Status:{" "}
//               <span
//                 className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
//                   sim.status,
//                 )}`}
//               >
//                 {sim.status}
//               </span>
//             </p>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {simStatuses
//                 .filter((s) => s !== sim.status)
//                 .map((status) => (
//                   <button
//                     key={status}
//                     onClick={() => handleStatusUpdate(status)}
//                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md ${getStatusButtonColor(
//                       status,
//                     )}`}
//                   >
//                     {status}
//                   </button>
//                 ))}
//             </div>
//           </div>
//         </div> */}
//       </div>

//       {/* Attachments Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-blue-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//               />
//             </svg>
//             Attachments
//           </h2>
//           <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//             {sim.attachments?.length || 0} files
//           </span>
//         </div>

//         <div className="p-6 border-b border-gray-100 bg-gray-50">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select File
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setSelectedFile(e.target.files[0])}
//                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Note (Optional)
//               </label>
//               <input
//                 type="text"
//                 placeholder="Add a note for this file"
//                 value={uploadNote}
//                 onChange={(e) => setUploadNote(e.target.value)}
//                 className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
//               />
//             </div>
//             <div className="flex items-end">
//               <button
//                 onClick={handleFileUpload}
//                 disabled={uploading || !selectedFile}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {uploading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                     Uploading...
//                   </>
//                 ) : (
//                   <>
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
//                         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//                       />
//                     </svg>
//                     Upload
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           {attachments && attachments.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {attachments.map((attachment) => (
//                 <div
//                   key={attachment.id}
//                   className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3 flex-1 min-w-0">
//                       <div className="bg-blue-100 p-2 rounded-lg">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5 text-blue-600"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                           />
//                         </svg>
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm font-medium text-gray-800 truncate">
//                           {attachment.fileName}
//                         </p>

//                         <p className="text-xs text-gray-500">
//                           {formatDate(attachment.uploadedAt)}
//                         </p>

//                         {attachment.note && (
//                           <p className="text-xs text-gray-400 mt-1 truncate">
//                             {attachment.note}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={() =>
//                         handleDownloadAttachment(
//                           attachment.id,
//                           attachment.fileName,
//                         )
//                       }
//                       className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         />
//                       </svg>
//                       Download
//                     </button>

//                     <button
//                       onClick={() => handleDeleteAttachment(attachment.id)}
//                       className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12 text-gray-300 mx-auto mb-3"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                 />
//               </svg>
//               <p className="text-gray-500">No attachments yet</p>
//               <p className="text-gray-400 text-sm mt-1">
//                 Upload files using the form above
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* </div> */}

//       {/* History Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//           <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-blue-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             Activity History
//           </h2>
//           <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//             {history.length} {history.length === 1 ? "record" : "records"}
//           </span>
//         </div>

//         {/* Desktop Table */}
//         <div className="hidden md:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                   Event Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                   Details
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                   Performed By
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                   Date & Time
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {history.map((h) => (
//                 <tr key={h.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventBadgeColor(
//                         h.eventType,
//                       )}`}
//                     >
//                       {h.eventType}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {h.details}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {h.performedBy || "System"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {formatDate(h.performedAt)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {history.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No history found</p>
//             </div>
//           )}
//         </div>

//         {/* Mobile Cards */}
//         <div className="md:hidden p-4 space-y-4">
//           {history.length > 0 ? (
//             history.map((h) => (
//               <div key={h.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span
//                     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventBadgeColor(
//                       h.eventType,
//                     )}`}
//                   >
//                     {h.eventType}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {formatDate(h.performedAt)}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-800">{h.details}</p>
//                 <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
//                   Performed by:{" "}
//                   <span className="font-medium text-gray-700">
//                     {h.performedBy || "System"}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-gray-500 text-sm">No history found</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Edit SIM Information
//               </h2>
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <EditField
//                   label="Phone Number"
//                   value={editFormData.phoneNumber}
//                   onChange={(v) =>
//                     setEditFormData({ ...editFormData, phoneNumber: v })
//                   }
//                 />
//                 <EditField
//                   label="ICCID"
//                   value={editFormData.iccid}
//                   onChange={(v) =>
//                     setEditFormData({ ...editFormData, iccid: v })
//                   }
//                 />
//                 <EditField
//                   label="IMSI"
//                   value={editFormData.imsi}
//                   onChange={(v) =>
//                     setEditFormData({ ...editFormData, imsi: v })
//                   }
//                 />
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-1 block">
//                     Provider
//                   </label>
//                   <select
//                     value={editFormData.provider || ""}
//                     onChange={(e) =>
//                       setEditFormData({
//                         ...editFormData,
//                         provider: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   >
//                     <option value="">Select Provider</option>
//                     <option value="AIRTEL">Airtel</option>
//                     <option value="VI">Vi</option>
//                     <option value="JIO">Jio</option>
//                     <option value="BSNL">BSNL</option>
//                   </select>
//                 </div>

//                 {/* ✅ NEW: Site & Location Fields */}
//                 {/* <div>
//                   <label className="text-sm font-medium text-gray-700 mb-1 block">
//                     Site
//                   </label>
//                   <select
//                     value={editFormData.siteId || ""}
//                     onChange={(e) =>
//                       setEditFormData({
//                         ...editFormData,
//                         siteId: e.target.value || null,
//                         locationId: "", // Reset location when site changes
//                       })
//                     }
//                     className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   >
//                     <option value="">Select Site</option>
//                     {sites.map(({ siteId, name }) => (
//                       <option key={siteId} value={siteId}>
//                         {name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-1 block">
//                     Location
//                   </label>
//                   <select
//                     value={editFormData.locationId || ""}
//                     onChange={(e) =>
//                       setEditFormData({
//                         ...editFormData,
//                         locationId: e.target.value || null,
//                       })
//                     }
//                     disabled={!editFormData.siteId}
//                     className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
//                   >
//                     <option value="">Select Location</option>
//                     {editLocations.map((loc) => (
//                       <option key={loc.id} value={loc.id}>
//                         {loc.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div> */}

//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-1 block">
//                     Site
//                   </label>
//                   <select
//                     value={editFormData.siteName || ""}
//                     onChange={(e) => {
//                       const selectedSiteName = e.target.value;
//                       setEditFormData({
//                         ...editFormData,
//                         siteName: selectedSiteName || null,
//                         locationName: "", // Reset location when site changes
//                       });
//                     }}
//                     className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   >
//                     <option value="">Select Site</option>
//                     {sites.map(({ siteId, name }) => (
//                       <option key={siteId} value={name}>
//                         {name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-1 block">
//                     Location
//                   </label>
//                   <select
//                     value={editFormData.locationName || ""}
//                     onChange={(e) =>
//                       setEditFormData({
//                         ...editFormData,
//                         locationName: e.target.value || null,
//                       })
//                     }
//                     disabled={!editFormData.siteName}
//                     className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
//                   >
//                     <option value="">Select Location</option>
//                     {editLocations.map((loc) => (
//                       <option key={loc.id} value={loc.name}>
//                         {loc.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <EditField
//                   label="Purchase From"
//                   value={editFormData.purchaseFrom}
//                   onChange={(v) =>
//                     setEditFormData({ ...editFormData, purchaseFrom: v })
//                   }
//                 />
//                 <EditField
//                   label="Cost"
//                   value={editFormData.cost}
//                   onChange={(v) =>
//                     setEditFormData({ ...editFormData, cost: v })
//                   }
//                   type="number"
//                 />
//                 <EditField
//                   label="Purchase Date"
//                   value={editFormData.purchaseDate?.split("T")[0]}
//                   onChange={(v) =>
//                     setEditFormData({ ...editFormData, purchaseDate: v })
//                   }
//                   type="date"
//                 />
//                 <EditField
//                   label="Activated At"
//                   value={editFormData.activatedAt?.split("T")[0]}
//                   onChange={(v) =>
//                     setEditFormData({ ...editFormData, activatedAt: v })
//                   }
//                   type="date"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1 block">
//                   Note
//                 </label>
//                 <textarea
//                   value={editFormData.note || ""}
//                   onChange={(e) =>
//                     setEditFormData({ ...editFormData, note: e.target.value })
//                   }
//                   rows={3}
//                   className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//                   placeholder="Add a note..."
//                 />
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdateSimInfo}
//                 className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

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

// // Helper Components
// function InfoCard({ label, value, highlight }) {
//   return (
//     <div className="bg-gray-50 rounded-lg p-4">
//       <p className="text-gray-500 text-sm mb-1">{label}</p>
//       <p
//         className={`font-semibold text-lg ${
//           highlight ? "text-gray-400 italic" : "text-gray-800"
//         }`}
//       >
//         {value || "---"}
//       </p>
//     </div>
//   );
// }

// function EditField({ label, value, onChange, type = "text" }) {
//   return (
//     <div>
//       <label className="text-sm font-medium text-gray-700 mb-1 block">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//       />
//     </div>
//   );
// }

// function getStatusButtonColor(status) {
//   switch (status) {
//     case "AVAILABLE":
//       return "bg-green-100 text-green-700 hover:bg-green-200";
//     case "ASSIGNED":
//       return "bg-blue-100 text-blue-700 hover:bg-blue-200";
//     case "SUSPENDED":
//       return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
//     case "LOST":
//       return "bg-red-100 text-red-700 hover:bg-red-200";
//     case "DEACTIVATED":
//       return "bg-gray-100 text-gray-700 hover:bg-gray-200";
//     case "REPLACED":
//       return "bg-orange-100 text-orange-700 hover:bg-orange-200";
//     case "DISCARDED":
//       return "bg-red-100 text-red-800 hover:bg-red-200";
//     default:
//       return "bg-gray-100 text-gray-700 hover:bg-gray-200";
//   }
// }

// function DetailItem({ label, value, placeholder = "---", valueClass = "" }) {
//   const displayValue = value || placeholder;
//   const isPlaceholder = !value;

//   return (
//     <div className="min-w-0">
//       <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide mb-0.5 truncate">
//         {label}
//       </p>
//       <p
//         className={`text-sm font-medium truncate ${
//           isPlaceholder ? "text-gray-300 italic" : valueClass || "text-gray-800"
//         }`}
//         title={displayValue}
//       >
//         {displayValue}
//       </p>
//     </div>
//   );
// }



import SimAcknowledgementDownload from "../components/SimAcknowledgementDownload";
import UserDetailsModal from "../components/UserDetailsModal";
import {
  getSimDetails,
  assignSim,
  unassignSim,
  fetchSimHistory,
  updateSimStatus,
  updateSimInfo,
  uploadSimAttachment,
  deleteSimAttachment,
  downloadSimAttachment,
  fetchSimAttachments,
  fetchSites,
  getLocationsBySite,
} from "../services/api";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

// ── Read persisted list state so we can do prev/next ──────────────────────
const SIM_STATE_KEY = "cugSimListState";
function loadListState() {
  try {
    const raw = sessionStorage.getItem(SIM_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

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

const EVENT_BADGE = {
  ASSIGNED:       "bg-emerald-100 text-emerald-800 border border-emerald-200",
  UNASSIGNED:     "bg-red-100 text-red-800 border border-red-200",
  CREATED:        "bg-blue-100 text-blue-800 border border-blue-200",
  STATUS_CHANGED: "bg-violet-100 text-violet-800 border border-violet-200",
  UPDATED:        "bg-amber-100 text-amber-800 border border-amber-200",
};

function DetailItem({ label, value, placeholder = "—", valueClass = "" }) {
  const isPlaceholder = !value;
  return (
    <div className="min-w-0">
      <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide mb-0.5 truncate font-medium">{label}</p>
      <p className={`text-[11px] font-semibold truncate ${isPlaceholder ? "text-gray-300 italic font-normal" : valueClass || "text-gray-800"}`} title={value || placeholder}>
        {value || placeholder}
      </p>
    </div>
  );
}

function EditField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-700 mb-1 block">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </div>
  );
}

const simStatusOptions = ["SUSPENDED","RESERVED","LOST","DEACTIVATED","UNRESERVED","DISCARDED"];

export default function CugSimDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listState = loadListState();
  const listIds   = listState?.ids || [];
  const currentIdx = listIds.indexOf(parseInt(id, 10));
  const prevId = currentIdx > 0             ? listIds[currentIdx - 1] : null;
  const nextId = currentIdx < listIds.length - 1 ? listIds[currentIdx + 1] : null;

  const [sim, setSim]               = useState(null);
  const [history, setHistory]       = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // Assignment
  const [employeeId, setEmployeeId] = useState("");
  const [assignNote, setAssignNote] = useState("");

  // Status update
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusNote, setStatusNote]         = useState("");

  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData]       = useState({});
  const [sites, setSites]                     = useState([]);
  const [editLocations, setEditLocations]     = useState([]);

  // Attachment upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadNote, setUploadNote]     = useState("");
  const [uploading, setUploading]       = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-GB", { day:"2-digit", month:"2-digit", year:"2-digit" }) : "—";
  const formatDateMed = (d) => d ? new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—";

  useEffect(() => {
    fetchSites()
      .then((res) => setSites(res.data.map((s) => ({ siteId: s.id, name: s.name }))))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (editFormData.siteName) {
      const s = sites.find((x) => x.name === editFormData.siteName);
      if (s) getLocationsBySite(s.siteId).then(setEditLocations).catch(console.error);
    } else {
      setEditLocations([]);
      setEditFormData((p) => ({ ...p, locationName: "" }));
    }
  }, [editFormData.siteName]);

  const loadDetails = async () => {
    try {
      setLoading(true);
      const data = await getSimDetails(id);
      setSim(data);
      setEditFormData(data);
      const h = await fetchSimHistory(id);
      setHistory(h);
    } catch { toast.error("Failed to load SIM details"); }
    finally { setLoading(false); }
  };

  const loadAttachments = async () => {
    try {
      const res = await fetchSimAttachments(id);
      setAttachments(res);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadDetails(); loadAttachments(); }, [id]);

  const handleAssign = async () => {
    if (!employeeId.trim()) { toast.warning("Please enter a User ID"); return; }
    if (!assignNote.trim()) { toast.warning("Please enter an assignment note"); return; }
    try {
      await assignSim(id, { employeeId, note: assignNote });
      toast.success("SIM assigned successfully!");
      setEmployeeId(""); setAssignNote("");
      loadDetails();
    } catch { toast.error("Failed to assign SIM"); }
  };

  const handleUnassign = async () => {
    const note = prompt("Enter reason for unassigning this SIM:");
    if (!note?.trim()) { toast.error("Unassign note is mandatory"); return; }
    try {
      await unassignSim(id, note.trim());
      toast.success("SIM unassigned successfully!");
      loadDetails();
    } catch { toast.error("Failed to unassign SIM"); }
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus) { toast.error("Please select a status"); return; }
    if (!statusNote.trim()) { toast.error("Please enter a status note"); return; }
    setIsUpdating(true);
    try {
      await updateSimStatus(id, selectedStatus, statusNote);
      toast.success(`Status updated to ${selectedStatus}`);
      setStatusNote(""); setSelectedStatus("");
      loadDetails();
    } catch { toast.error("Failed to update status"); }
    finally { setIsUpdating(false); }
  };

  const handleUpdateSimInfo = async () => {
    try {
      await updateSimInfo(id, editFormData);
      toast.success("SIM information updated successfully!");
      setIsEditModalOpen(false);
      loadDetails();
    } catch { toast.error("Failed to update SIM information"); }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) { toast.warning("Please select a file"); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("note", uploadNote);
      await uploadSimAttachment(id, formData);
      toast.success("File uploaded successfully!");
      setSelectedFile(null); setUploadNote("");
      loadAttachments();
    } catch { toast.error("Failed to upload file"); }
    finally { setUploading(false); }
  };

  const handleDownloadAttachment = async (attId, fileName) => {
    try { await downloadSimAttachment(attId, fileName); }
    catch (err) { console.error("Download failed", err); }
  };

  if (loading) {
    return (
      <div className="lg:ml-48 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }
  if (!sim) return null;

  const employeeData = {
    employeeId: sim.assignedUser?.employeeId || sim.assignedUserId,
    fullName: sim.assignedUserName,
    designation: sim.assigneeDesignation,
    location: sim.locationName,
  };

  const sel = "w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none transition";

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen font-sans">
      <style>{`
        .sim-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .sim-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .sim-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

      {/* ═══ TOP NAV BAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-3 py-1.5 flex items-center gap-2">
        {/* Back */}
        <button
          onClick={() => navigate("/cug-sim")}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back</span>
        </button>

        <div className="h-5 w-px bg-gray-200" />

        {/* Prev / Next from preserved list */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => prevId && navigate(`/cug-sim/${prevId}`)}
            disabled={!prevId}
            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-30 transition"
            title="Previous SIM"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          {listIds.length > 0 && (
            <span className="text-[10px] text-gray-400 px-1">
              {currentIdx + 1} / {listIds.length}
            </span>
          )}
          <button
            onClick={() => nextId && navigate(`/cug-sim/${nextId}`)}
            disabled={!nextId}
            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-30 transition"
            title="Next SIM"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="h-5 w-px bg-gray-200" />

        {/* SIM identity */}
        {/* <span className="text-xs font-mono font-semibold text-gray-700">{sim.phoneNumber}</span> */}
        
<span className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 
                 text-xl sm:text-2xl md:text-3xl font-bold font-mono 
                 text-blue-700 tracking-wider shadow-sm">
  {sim.phoneNumber}
</span>
        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_BADGE[sim.status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
          {sim.status}
        </span>
        {sim.simTag && <span className="text-[10px] text-gray-400 hidden sm:block">{sim.simTag}</span>}

        <div className="ml-auto flex items-center gap-2.5">
          {(sim.status === "ASSIGNED" || sim.status === "UAP") && sim.assignedUserName && (
            <SimAcknowledgementDownload simData={sim} employeeData={employeeData} companyName="MAHAVIR GROUP" />
          )}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>

      <div className="p-3 space-y-3">

        {/* ═══ DETAILS CARD ═══ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">SIM Details</span>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-4 gap-y-3">
              <DetailItem label="Provider"    value={sim.provider} />
              <DetailItem label="ICCID"       value={sim.iccid} />
              <DetailItem label="IMSI"        value={sim.imsi} />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide mb-0.5 font-medium">Assigned To</p>
                <button
                  onClick={() => setSelectedUser(sim.assignedUserId)}
                  className={`text-[11px] font-semibold truncate block w-full text-left ${sim.assignedUserName ? "text-blue-600 hover:underline" : "text-gray-300 italic font-normal cursor-default"}`}
                  title={sim.assignedUserName}
                >
                  {sim.assignedUserName || "Unassigned"}
                </button>
              </div>
              <DetailItem label="Assigned At"    value={formatDate(sim.assignedAt)} />
              <DetailItem label="Activated"      value={formatDateMed(sim.activatedAt)} />
              <DetailItem label="Purchase Date"  value={formatDateMed(sim.purchaseDate)} />
              <DetailItem label="Purchase From"  value={sim.purchaseFrom} />
              <DetailItem label="Cost"           value={sim.cost ? `₹${sim.cost}` : null} />
              <DetailItem label="Location"       value={sim.locationName} />
              <DetailItem label="Site"           value={sim.siteName} />
              <DetailItem label="Created By"     value={sim.createdBy} />
              <DetailItem label="Created At"     value={formatDate(sim.createdAt)} />
              <DetailItem label="Ack Uploaded"   value={sim.assignmentUploaded ? "Yes" : "No"}
                valueClass={sim.assignmentUploaded ? "text-emerald-600" : "text-red-500"} />
            </div>
            {sim.note && (
              <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-gray-700">{sim.note}</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══ ACTIONS GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* Assignment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Assign / Unassign</span>
            </div>
            <div className="p-3 space-y-2.5">
              <div>
                <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-1 block">User ID *</label>
                <input type="text" placeholder="Enter User ID" value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className={sel} />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-1 block">Assignment Note *</label>
                <textarea placeholder="Enter assignment note" value={assignNote} rows={2}
                  onChange={(e) => setAssignNote(e.target.value)}
                  className={sel + " resize-none"} />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAssign}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                  Assign
                </button>
                {sim.assignedUserName && (
                  <button onClick={handleUnassign}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                    Unassign
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Update Status</span>
            </div>
            <div className="p-3 space-y-2.5">
              <div>
                <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-1 block">Select Status</label>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={sel + " bg-white"}>
                  <option value="">Select Status</option>
                  {simStatusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-1 block">Status Note *</label>
                <textarea placeholder="Enter status update note" value={statusNote} rows={2}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className={sel + " resize-none"} />
              </div>
              <button onClick={handleStatusUpdate} disabled={isUpdating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition disabled:opacity-50">
                {isUpdating ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>

        {/* ═══ ATTACHMENTS ═══ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Attachments</span>
            <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">{attachments.length} files</span>
          </div>

          {/* Upload */}
          <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-2 items-end">
              <div className="flex-1">
                <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-1 block">Select File</label>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-1 block">Note (optional)</label>
                <input type="text" placeholder="Note for this file" value={uploadNote}
                  onChange={(e) => setUploadNote(e.target.value)}
                  className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button onClick={handleFileUpload} disabled={uploading || !selectedFile}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition disabled:opacity-50 whitespace-nowrap">
                {uploading ? (
                  <><div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />Uploading...</>
                ) : (
                  <><svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>Upload</>
                )}
              </button>
            </div>
          </div>

          <div className="p-3">
            {attachments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {attachments.map((att) => (
                  <div key={att.id} className="bg-gray-50 rounded-lg px-2.5 py-2 border border-gray-200 hover:shadow-sm transition">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-100 p-1.5 rounded flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium text-gray-800 truncate">{att.fileName}</p>
                        <p className="text-[10px] text-gray-400">{formatDate(att.uploadedAt)}</p>
                        {att.note && <p className="text-[10px] text-gray-400 truncate">{att.note}</p>}
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => handleDownloadAttachment(att.id, att.fileName)}
                        className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-semibold transition flex items-center justify-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <p className="text-xs text-gray-400">No attachments yet</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══ HISTORY ═══ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Activity History</span>
            <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">{history.length} records</span>
          </div>

          {history.length > 0 ? (
            <div className="overflow-x-auto sim-scrollbar">
              <table className="w-full" style={{ minWidth: 600, borderCollapse: "collapse" }}>
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {["Event","Details","Performed By","Date"].map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, ri) => (
                    <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}>
                      <td className="px-3 py-1.5">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${EVENT_BADGE[h.eventType] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                          {h.eventType}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-[11px] text-gray-800 max-w-[220px]">
                        <span className="block truncate" title={h.details}>{h.details}</span>
                      </td>
                      <td className="px-3 py-1.5 text-[11px] text-gray-600 whitespace-nowrap">{h.performedBy || "System"}</td>
                      <td className="px-3 py-1.5 text-[11px] text-gray-500 whitespace-nowrap">{formatDate(h.performedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-gray-400">No history found</p>
            </div>
          )}
        </div>
      </div>

      {/* ═══ EDIT MODAL ═══ */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto sim-scrollbar">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-semibold text-gray-800">Edit SIM Information</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditField label="Phone Number" value={editFormData.phoneNumber} onChange={(v) => setEditFormData({ ...editFormData, phoneNumber: v })} />
                <EditField label="ICCID" value={editFormData.iccid} onChange={(v) => setEditFormData({ ...editFormData, iccid: v })} />
                <EditField label="IMSI" value={editFormData.imsi} onChange={(v) => setEditFormData({ ...editFormData, imsi: v })} />
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Provider</label>
                  <select value={editFormData.provider || ""} onChange={(e) => setEditFormData({ ...editFormData, provider: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="">Select Provider</option>
                    <option value="AIRTEL">Airtel</option>
                    <option value="VI">Vi</option>
                    <option value="JIO">Jio</option>
                    <option value="BSNL">BSNL</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Site</label>
                  <select value={editFormData.siteName || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, siteName: e.target.value || null, locationName: "" })}
                    className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="">Select Site</option>
                    {sites.map(({ siteId, name }) => <option key={siteId} value={name}>{name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Location</label>
                  <select value={editFormData.locationName || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, locationName: e.target.value || null })}
                    disabled={!editFormData.siteName}
                    className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed">
                    <option value="">Select Location</option>
                    {editLocations.map((loc) => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
                  </select>
                </div>
                <EditField label="Purchase From" value={editFormData.purchaseFrom} onChange={(v) => setEditFormData({ ...editFormData, purchaseFrom: v })} />
                <EditField label="Cost" value={editFormData.cost} onChange={(v) => setEditFormData({ ...editFormData, cost: v })} type="number" />
                <EditField label="Purchase Date" value={editFormData.purchaseDate?.split("T")[0]} onChange={(v) => setEditFormData({ ...editFormData, purchaseDate: v })} type="date" />
                <EditField label="Activated At" value={editFormData.activatedAt?.split("T")[0]} onChange={(v) => setEditFormData({ ...editFormData, activatedAt: v })} type="date" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Note</label>
                <textarea value={editFormData.note || ""} onChange={(e) => setEditFormData({ ...editFormData, note: e.target.value })}
                  rows={3} placeholder="Add a note..."
                  className="w-full border border-gray-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 flex justify-end gap-2 sticky bottom-0 bg-white">
              <button onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium transition">
                Cancel
              </button>
              <button onClick={handleUpdateSimInfo}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <UserDetailsModal query={selectedUser} isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}