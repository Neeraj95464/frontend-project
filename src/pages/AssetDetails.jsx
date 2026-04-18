

// import AssignAssetModal from "../components/AssignAssetModel";
// import CheckInModal from "../components/CheckInModal";
// import ChildAssetForm from "../components/ChildAssetForm";
// import ReserveAssetModal from "../components/ReserveAssetModal";
// import UserDetailsModal from "../components/UserDetailsModal";
// import { generatePolicyPdf } from "../components/generatePolicyPdf";
// import {
//   disposeAsset,
//   markAssetAsLost,
//   resetAssetStatus,
//   markAssetAsInRepair,
//   getAssetPhotos,
//   getEmployees,
//   searchEmployees,
// } from "../services/api";
// import { useState, useRef, useEffect,useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const AssetDetails = ({ asset, assetPhotos }) => {
//   const [showActions, setShowActions] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [checkInAsset, setCheckInAsset] = useState(null);
//   const [openChildAssetModal, setOpenChildAssetModal] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const actionRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showReserveModal, setShowReserveModal] = useState(false);
//   const [selectedAssetReserve, setSelectedAssetReserve] = useState(null);
//   const [childAssetParentTag, setChildAssetParentTag] = useState(null);

//   // Get the return URL from location state (preserves filters)
//   const returnUrl = location.state?.returnUrl || "/assets";

//   // ===== Policy & Induction Text =====
//   const policyText = `
//   Company Asset Usage Policy

//   1. The asset must be used strictly for official purposes only.
//   2. The user is responsible for the safety and proper handling of the asset.
//   3. Any damage, theft, or loss must be reported immediately to the IT department.
//   4. Unauthorized installations or modifications are not permitted.
//   5. Assets must not be shared or lent to others without approval.

//   Terms & Conditions:
//   - The company reserves the right to recall the asset at any time.
//   - All data stored must comply with the company's data protection policy.
//   - Upon termination/resignation, the asset must be returned in working condition.
//   - Any violations may result in disciplinary action.
//   `;

//   const inductionText = `
//   Induction & Guidelines for Asset Usage

//   1. Familiarize yourself with the software pre-installed on the asset.
//   2. Never share your login credentials or company data.
//   3. Keep the system updated and secure with antivirus tools provided.
//   4. Do not attempt unauthorized repairs or servicing.
//   5. Contact IT support for technical help or queries related to the asset.

//   IT Helpdesk Team
//   Email: it-support@yourcompany.com
//   Ext: 1234
//   `;

//   // Function to navigate back with preserved state
//   // const handleGoBack = () => {
//   //   // Navigate back to the return URL (which includes filters)
//   //   navigate(returnUrl);
//   // };

//   const handleReserveStatusChange = (assetTag) => {
//     setSelectedAssetReserve(assetTag);
//     setShowReserveModal(true);
//   };

//   // In AssetDetails.jsx, add useCallback for handleGoBack
// const handleGoBack = useCallback(() => {
//   navigate(returnUrl);
// }, [navigate, returnUrl]);

//   const handleAddChildAsset = (assetTag) => {
//     setChildAssetParentTag(assetTag);
//     setOpenChildAssetModal(true);
//   };

//   const handleCloseModal = () => setOpenChildAssetModal(false);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (actionRef.current && !actionRef.current.contains(event.target)) {
//         setShowActions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleResetStatusChange = async (assetTag) => {
//     try {
//       const statusNote = prompt("Enter a status note:")?.trim();
//       if (!statusNote) return alert("❌ Status note is required.");
//       const response = await resetAssetStatus(assetTag, statusNote);
//       toast.success(response);
//     } catch (error) {
//       toast.error(error.message || "Failed to reset status.");
//     }
//   };

//   const handleCheckInSubmit = async (formData) => {
//     const result = await checkInAsset(formData);
//     alert(result.message);
//     if (result.success) setCheckInAsset(null);
//   };

//   const handleDisposeStatusChange = async (assetTag) => {
//     const statusNote = prompt("Enter a disposal note:") || "";
//     if (!statusNote) return alert("❌ Disposal note is required!");
//     const result = await disposeAsset(assetTag, statusNote);
//     toast.success(result.message);
//   };

//   const handleLostStatusChange = async (assetTag) => {
//     const statusNote = prompt("Enter a note for lost asset:") || "";
//     if (!statusNote) return alert("❌ Status note is required!");
//     const result = await markAssetAsLost(assetTag, statusNote);
//     toast.success(result.message);
//   };

//   const handleInRepairStatusChange = async (assetTag) => {
//     try {
//       const note = prompt("Enter a repair note:")?.trim();
//       if (!note) return alert("❌ Repair note is required!");
//       let confirmRepair = false;
//       if (asset?.status === "IN_REPAIR") {
//         confirmRepair = window.confirm(
//           "This asset is already in repair. Mark as repaired?",
//         );
//         if (!confirmRepair) return;
//       }
//       const result = await markAssetAsInRepair(
//         assetTag,
//         note,
//         1,
//         confirmRepair,
//       );
//       toast.success(result.message || "Asset status updated!");
//     } catch (error) {
//       toast.error(error.message || "Failed to update asset status.");
//     }
//   };

//   const fields = [
//     { key: "department", label: "Department" },
//     { key: "siteName", label: "Site" },
//     { key: "locationName", label: "Location" },
//     { key: "assignedUserName", label: "User Name" },
//   ];
//   const AssetFields = [
//     // { key: "name", label: "Asset Name" },
//     { key: "assetTag", label: "Asset Tag" },
//     { key: "serialNumber", label: "Serial Number" },
//     { key: "brand", label: "Brand" },
//     { key: "assetType", label: "Asset type" },
//     { key: "model", label: "Model" },
//   ];
//   const AssetStatusAndNote = [
//     { key: "status", label: "Status" },
//     { key: "statusNote", label: "Status Note" },
//     { key: "reservationEndDate", label: "Reservation" },
//     { key: "createdBy", label: "CreatedBy" },
//     { key: "createdAt", label: "CreatedAt" },
//   ];

//   return (
//     <div className="relative bg-gray-50 rounded-xl">
//       {/* Back Button */}
//       <div className="mb-4">
//         <button
//           onClick={handleGoBack}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           ← Back to Asset List
//         </button>
//       </div>

//       {/* Top Action Bar */}
//       <div className="flex flex-wrap justify-end mb-6 gap-3">
//         {[
//           {
//             label: "Print Asset",
//             color: "bg-gray-600",
//             onClick: () => window.print(),
//           },
//           {
//             label: "Generate Policy PDF",
//             color: "bg-blue-600",
//             onClick: async () => {
//               const photos = await getAssetPhotos(asset.assetTag);
//               // const employeeDetails = await searchEmployees(
//               //   asset.assignedUserEmpId
//               // );
//               const employees = asset?.assignedUserEmpId
//                 ? await searchEmployees(asset.assignedUserEmpId)
//                 : [];

//               const employeeDetails =
//                 employees.length > 0 ? employees[0] : null;

//               console.log("Asset Details are ", employeeDetails);
//               // , policyText, inductionText
//               await generatePolicyPdf(asset, photos, employeeDetails);
//             },
//           },
//           {
//             label: "Edit Asset",
//             color: "bg-green-600",
//             onClick: () => navigate(`/assets/edit/${asset.assetTag}`, {
//               state: { returnUrl: location.pathname + location.search }
//             }),
//           },
//           {
//             label: "Add Child Asset",
//             color: "bg-green-600",
//             onClick: () => handleAddChildAsset(asset.assetTag),
//           },
//         ].map((btn, i) => (
//           <button
//             key={i}
//             onClick={btn.onClick}
//             className={`${btn.color} text-white px-4 py-2 rounded-md hover:opacity-90 shadow`}
//           >
//             {btn.label}
//           </button>
//         ))}

//         {/* Actions Dropdown */}
//         <div className="relative" ref={actionRef}>
//           <button
//             onClick={() => setShowActions(!showActions)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:opacity-90 shadow"
//           >
//             Actions
//           </button>
//           {showActions && (
//             <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden divide-y divide-gray-100 z-10">
//               <button
//                 onClick={() => setSelectedAsset(asset.assetTag)}
//                 className="px-4 py-2 w-full text-left hover:bg-blue-50"
//               >
//                 CheckOut
//               </button>
//               <button
//                 onClick={() => setCheckInAsset(asset.assetTag)}
//                 className="px-4 py-2 w-full text-left hover:bg-blue-50"
//               >
//                 Checkin
//               </button>
//               <button
//                 onClick={() => handleInRepairStatusChange(asset.assetTag)}
//                 className="px-4 py-2 w-full text-left hover:bg-blue-50"
//               >
//                 In Repair
//               </button>
//               <button
//                 onClick={() => handleDisposeStatusChange(asset.assetTag)}
//                 className="px-4 py-2 w-full text-left hover:bg-blue-50"
//               >
//                 Dispose
//               </button>
//               <button
//                 onClick={() => handleLostStatusChange(asset.assetTag)}
//                 className="px-4 py-2 w-full text-left hover:bg-blue-50"
//               >
//                 Lost/Missing
//               </button>
//               <button
//                 onClick={() => handleReserveStatusChange(asset.assetTag)}
//                 className="px-4 py-2 w-full text-left hover:bg-blue-50"
//               >
//                 Reserve
//               </button>
//               <button
//                 onClick={() => handleResetStatusChange(asset.assetTag)}
//                 className="px-4 py-2 w-full text-left hover:bg-blue-50"
//               >
//                 Reset Status
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mb-6 bg-white p-5 rounded-lg shadow text-gray-700 leading-relaxed">
//         {asset.description || "No description available"}
//       </div>

//       {/* Photo + Tables */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Asset Photo */}
//         <div className="w-full lg:w-1/4 flex justify-center">
//           <div className="w-56 h-56 bg-gray-100 rounded-lg overflow-hidden shadow relative">
//             {assetPhotos.length > 0 ? (
//               <img
//                 src={assetPhotos[assetPhotos.length - 1]}
//                 alt="Asset"
//                 className="w-full h-full object-cover hover:scale-105 transition-transform"
//               />
//             ) : (
//               <div className="flex justify-center items-center h-full text-gray-400">
//                 No Photo
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Three Info Tables */}
//         <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[AssetFields, fields, AssetStatusAndNote].map((table, tIndex) => (
//             <div
//               key={tIndex}
//               className="bg-white rounded-lg shadow overflow-hidden"
//             >
//               <table className="w-full text-sm">
//                 <tbody>
//                   {table.map(({ key, label }, index) => (
//                     <tr key={index} className="border-b hover:bg-gray-50">
//                       <th className="px-3 py-2 bg-blue-50 text-gray-900 font-medium text-left">
//                         {label}
//                       </th>
//                       <td className="px-3 py-2 text-gray-700">
//                         {key === "assignedUserName" ? (
//                           asset[key] ? (
//                             <button
//                               onClick={() =>
//                                 asset.assignedUserEmpId &&
//                                 setSelectedUser(asset.assignedUserEmpId)
//                               }
//                               className="text-blue-600 hover:underline"
//                             >
//                               {asset[key]}
//                             </button>
//                           ) : (
//                             "Not Available"
//                           )
//                         ) : (
//                           asset[key] || "Not Available"
//                         )}
//                        </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modals */}
//       {selectedAsset && (
//         <AssignAssetModal
//           assetTag={selectedAsset}
//           isOpen={true}
//           onClose={() => setSelectedAsset(null)}
//         />
//       )}
//       {checkInAsset && (
//         <CheckInModal
//           assetTag={checkInAsset}
//           isOpen={!!checkInAsset}
//           onClose={() => setCheckInAsset(null)}
//           onCheckIn={handleCheckInSubmit}
//         />
//       )}
//       {openChildAssetModal && (
//         <ChildAssetForm
//           assetTag={childAssetParentTag}
//           onClose={handleCloseModal}
//         />
//       )}
//       {selectedUser && (
//         <UserDetailsModal
//           query={selectedUser}
//           isOpen={true}
//           onClose={() => setSelectedUser(null)}
//         />
//       )}
//       {showReserveModal && (
//         <ReserveAssetModal
//           assetTag={selectedAssetReserve}
//           isOpen={true}
//           onClose={() => setShowReserveModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AssetDetails;



// // // import AssignAssetModal from "../components/AssignAssetModel";
// // // import CheckInModal from "../components/CheckInModal";
// // // import ChildAssetForm from "../components/ChildAssetForm";
// // // import ReserveAssetModal from "../components/ReserveAssetModal";
// // // import UserDetailsModal from "../components/UserDetailsModal";
// // // import { generatePolicyPdf } from "../components/generatePolicyPdf";
// // // import {
// // //   disposeAsset,
// // //   markAssetAsLost,
// // //   resetAssetStatus,
// // //   markAssetAsInRepair,
// // //   getAssetPhotos,
// // //   getEmployees,
// // //   searchEmployees,
// // // } from "../services/api";
// // // import { useState, useRef, useEffect, useCallback } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import { toast } from "react-toastify";

// // // const AssetDetails = ({ asset, assetPhotos, onPrevious, onNext, hasPrevious, hasNext }) => {
// // //   const [showActions, setShowActions] = useState(false);
// // //   const [selectedAsset, setSelectedAsset] = useState(null);
// // //   const [checkInAsset, setCheckInAsset] = useState(null);
// // //   const [openChildAssetModal, setOpenChildAssetModal] = useState(null);
// // //   const [selectedUser, setSelectedUser] = useState(null);
// // //   const actionRef = useRef(null);
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [showReserveModal, setShowReserveModal] = useState(false);
// // //   const [selectedAssetReserve, setSelectedAssetReserve] = useState(null);
// // //   const [childAssetParentTag, setChildAssetParentTag] = useState(null);

// // //   // Get the return URL from location state (preserves filters)
// // //   const returnUrl = location.state?.returnUrl || "/assets";

// // //   // ===== Policy & Induction Text =====
// // //   const policyText = `
// // //   Company Asset Usage Policy

// // //   1. The asset must be used strictly for official purposes only.
// // //   2. The user is responsible for the safety and proper handling of the asset.
// // //   3. Any damage, theft, or loss must be reported immediately to the IT department.
// // //   4. Unauthorized installations or modifications are not permitted.
// // //   5. Assets must not be shared or lent to others without approval.

// // //   Terms & Conditions:
// // //   - The company reserves the right to recall the asset at any time.
// // //   - All data stored must comply with the company's data protection policy.
// // //   - Upon termination/resignation, the asset must be returned in working condition.
// // //   - Any violations may result in disciplinary action.
// // //   `;

// // //   const inductionText = `
// // //   Induction & Guidelines for Asset Usage

// // //   1. Familiarize yourself with the software pre-installed on the asset.
// // //   2. Never share your login credentials or company data.
// // //   3. Keep the system updated and secure with antivirus tools provided.
// // //   4. Do not attempt unauthorized repairs or servicing.
// // //   5. Contact IT support for technical help or queries related to the asset.

// // //   IT Helpdesk Team
// // //   Email: it-support@yourcompany.com
// // //   Ext: 1234
// // //   `;

// // //   const handleGoBack = useCallback(() => {
// // //     navigate(returnUrl);
// // //   }, [navigate, returnUrl]);

// // //   const handleReserveStatusChange = (assetTag) => {
// // //     setSelectedAssetReserve(assetTag);
// // //     setShowReserveModal(true);
// // //   };

// // //   const handleAddChildAsset = (assetTag) => {
// // //     setChildAssetParentTag(assetTag);
// // //     setOpenChildAssetModal(true);
// // //   };

// // //   const handleCloseModal = () => setOpenChildAssetModal(false);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (actionRef.current && !actionRef.current.contains(event.target)) {
// // //         setShowActions(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const handleResetStatusChange = async (assetTag) => {
// // //     try {
// // //       const statusNote = prompt("Enter a status note:")?.trim();
// // //       if (!statusNote) return alert("❌ Status note is required.");
// // //       const response = await resetAssetStatus(assetTag, statusNote);
// // //       toast.success(response);
// // //     } catch (error) {
// // //       toast.error(error.message || "Failed to reset status.");
// // //     }
// // //   };

// // //   const handleCheckInSubmit = async (formData) => {
// // //     const result = await checkInAsset(formData);
// // //     alert(result.message);
// // //     if (result.success) setCheckInAsset(null);
// // //   };

// // //   const handleDisposeStatusChange = async (assetTag) => {
// // //     const statusNote = prompt("Enter a disposal note:") || "";
// // //     if (!statusNote) return alert("❌ Disposal note is required!");
// // //     const result = await disposeAsset(assetTag, statusNote);
// // //     toast.success(result.message);
// // //   };

// // //   const handleLostStatusChange = async (assetTag) => {
// // //     const statusNote = prompt("Enter a note for lost asset:") || "";
// // //     if (!statusNote) return alert("❌ Status note is required!");
// // //     const result = await markAssetAsLost(assetTag, statusNote);
// // //     toast.success(result.message);
// // //   };

// // //   const handleInRepairStatusChange = async (assetTag) => {
// // //     try {
// // //       const note = prompt("Enter a repair note:")?.trim();
// // //       if (!note) return alert("❌ Repair note is required!");
// // //       let confirmRepair = false;
// // //       if (asset?.status === "IN_REPAIR") {
// // //         confirmRepair = window.confirm(
// // //           "This asset is already in repair. Mark as repaired?",
// // //         );
// // //         if (!confirmRepair) return;
// // //       }
// // //       const result = await markAssetAsInRepair(
// // //         assetTag,
// // //         note,
// // //         1,
// // //         confirmRepair,
// // //       );
// // //       toast.success(result.message || "Asset status updated!");
// // //     } catch (error) {
// // //       toast.error(error.message || "Failed to update asset status.");
// // //     }
// // //   };

// // //   const fields = [
// // //     { key: "department", label: "Department" },
// // //     { key: "siteName", label: "Site" },
// // //     { key: "locationName", label: "Location" },
// // //     { key: "assignedUserName", label: "User Name" },
// // //   ];
// // //   const AssetFields = [
// // //     { key: "assetTag", label: "Asset Tag" },
// // //     { key: "serialNumber", label: "Serial Number" },
// // //     { key: "brand", label: "Brand" },
// // //     { key: "assetType", label: "Asset type" },
// // //     { key: "model", label: "Model" },
// // //   ];
// // //   const AssetStatusAndNote = [
// // //     { key: "status", label: "Status" },
// // //     { key: "statusNote", label: "Status Note" },
// // //     { key: "reservationEndDate", label: "Reservation" },
// // //     { key: "createdBy", label: "CreatedBy" },
// // //     { key: "createdAt", label: "CreatedAt" },
// // //   ];

// // //   return (
// // //     <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-xl">
// // //       {/* Navigation Bar */}
// // //       <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             onClick={handleGoBack}
// // //             className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 font-medium"
// // //           >
// // //             ← Back to Asset List
// // //           </button>
          
// // //           <div className="h-8 w-px bg-gray-300"></div>
          
// // //           <div className="flex items-center gap-2">
// // //             <button
// // //               onClick={onPrevious}
// // //               disabled={!hasPrevious}
// // //               className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
// // //                 hasPrevious
// // //                   ? "bg-gray-800 text-white hover:bg-gray-900 shadow-md"
// // //                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
// // //               }`}
// // //             >
// // //               ← Previous
// // //             </button>
// // //             <button
// // //               onClick={onNext}
// // //               disabled={!hasNext}
// // //               className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
// // //                 hasNext
// // //                   ? "bg-gray-800 text-white hover:bg-gray-900 shadow-md"
// // //                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
// // //               }`}
// // //             >
// // //               Next →
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Top Action Buttons */}
// // //         <div className="flex flex-wrap gap-3">
// // //           {[
// // //             {
// // //               label: "Print Asset",
// // //               color: "bg-gray-600 hover:bg-gray-700",
// // //               onClick: () => window.print(),
// // //             },
// // //             {
// // //               label: "Generate Policy PDF",
// // //               color: "bg-blue-600 hover:bg-blue-700",
// // //               onClick: async () => {
// // //                 const photos = await getAssetPhotos(asset.assetTag);
// // //                 const employees = asset?.assignedUserEmpId
// // //                   ? await searchEmployees(asset.assignedUserEmpId)
// // //                   : [];
// // //                 const employeeDetails = employees.length > 0 ? employees[0] : null;
// // //                 await generatePolicyPdf(asset, photos, employeeDetails);
// // //               },
// // //             },
// // //             {
// // //               label: "Edit Asset",
// // //               color: "bg-green-600 hover:bg-green-700",
// // //               onClick: () => navigate(`/assets/edit/${asset.assetTag}`, {
// // //                 state: { returnUrl: location.pathname + location.search }
// // //               }),
// // //             },
// // //             {
// // //               label: "Add Child Asset",
// // //               color: "bg-purple-600 hover:bg-purple-700",
// // //               onClick: () => handleAddChildAsset(asset.assetTag),
// // //             },
// // //           ].map((btn, i) => (
// // //             <button
// // //               key={i}
// // //               onClick={btn.onClick}
// // //               className={`${btn.color} text-white px-5 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium`}
// // //             >
// // //               {btn.label}
// // //             </button>
// // //           ))}

// // //           {/* Actions Dropdown */}
// // //           <div className="relative" ref={actionRef}>
// // //             <button
// // //               onClick={() => setShowActions(!showActions)}
// // //               className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium flex items-center gap-2"
// // //             >
// // //               Actions ▼
// // //             </button>
// // //             {showActions && (
// // //               <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-20 border border-gray-100">
// // //                 <div className="py-1">
// // //                   <button
// // //                     onClick={() => setSelectedAsset(asset.assetTag)}
// // //                     className="px-4 py-2.5 w-full text-left hover:bg-blue-50 transition-colors text-gray-700"
// // //                   >
// // //                     CheckOut
// // //                   </button>
// // //                   <button
// // //                     onClick={() => setCheckInAsset(asset.assetTag)}
// // //                     className="px-4 py-2.5 w-full text-left hover:bg-blue-50 transition-colors text-gray-700"
// // //                   >
// // //                     Checkin
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleInRepairStatusChange(asset.assetTag)}
// // //                     className="px-4 py-2.5 w-full text-left hover:bg-blue-50 transition-colors text-gray-700"
// // //                   >
// // //                     In Repair
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleDisposeStatusChange(asset.assetTag)}
// // //                     className="px-4 py-2.5 w-full text-left hover:bg-blue-50 transition-colors text-gray-700"
// // //                   >
// // //                     Dispose
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleLostStatusChange(asset.assetTag)}
// // //                     className="px-4 py-2.5 w-full text-left hover:bg-blue-50 transition-colors text-gray-700"
// // //                   >
// // //                     Lost/Missing
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleReserveStatusChange(asset.assetTag)}
// // //                     className="px-4 py-2.5 w-full text-left hover:bg-blue-50 transition-colors text-gray-700"
// // //                   >
// // //                     Reserve
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleResetStatusChange(asset.assetTag)}
// // //                     className="px-4 py-2.5 w-full text-left hover:bg-blue-50 transition-colors text-gray-700"
// // //                   >
// // //                     Reset Status
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Description Card */}
// // //       <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
// // //         <p className="text-gray-700 leading-relaxed text-base">
// // //           {asset.description || "No description available"}
// // //         </p>
// // //       </div>

// // //       {/* Photo + Tables */}
// // //       <div className="flex flex-col lg:flex-row gap-6">
// // //         {/* Asset Photo */}
// // //         <div className="w-full lg:w-1/4 flex justify-center">
// // //           <div className="w-56 h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg relative group">
// // //             {assetPhotos.length > 0 ? (
// // //               <img
// // //                 src={assetPhotos[assetPhotos.length - 1]}
// // //                 alt="Asset"
// // //                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
// // //               />
// // //             ) : (
// // //               <div className="flex justify-center items-center h-full text-gray-400 flex-col gap-2">
// // //                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
// // //                 </svg>
// // //                 <span>No Photo</span>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Three Info Tables */}
// // //         <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
// // //           {[AssetFields, fields, AssetStatusAndNote].map((table, tIndex) => (
// // //             <div
// // //               key={tIndex}
// // //               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
// // //             >
// // //               <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2">
// // //                 <h3 className="text-white font-semibold text-sm">
// // //                   {tIndex === 0 ? "Asset Information" : tIndex === 1 ? "Assignment Details" : "Status & Tracking"}
// // //                 </h3>
// // //               </div>
// // //               <table className="w-full text-sm">
// // //                 <tbody>
// // //                   {table.map(({ key, label }, index) => (
// // //                     <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// // //                       <th className="px-4 py-3 bg-gray-50 text-gray-700 font-semibold text-left w-2/5">
// // //                         {label}
// // //                       </th>
// // //                       <td className="px-4 py-3 text-gray-600">
// // //                         {key === "assignedUserName" ? (
// // //                           asset[key] ? (
// // //                             <button
// // //                               onClick={() =>
// // //                                 asset.assignedUserEmpId &&
// // //                                 setSelectedUser(asset.assignedUserEmpId)
// // //                               }
// // //                               className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
// // //                             >
// // //                               {asset[key]}
// // //                             </button>
// // //                           ) : (
// // //                             <span className="text-gray-400">Not Available</span>
// // //                           )
// // //                         ) : key === "status" ? (
// // //                           <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
// // //                             asset[key] === "AVAILABLE" ? "bg-green-100 text-green-700" :
// // //                             asset[key] === "ASSIGNED" ? "bg-blue-100 text-blue-700" :
// // //                             asset[key] === "IN_REPAIR" ? "bg-yellow-100 text-yellow-700" :
// // //                             asset[key] === "DISPOSED" ? "bg-red-100 text-red-700" :
// // //                             asset[key] === "LOST" ? "bg-gray-100 text-gray-700" :
// // //                             "bg-gray-100 text-gray-700"
// // //                           }`}>
// // //                             {asset[key] || "Not Available"}
// // //                           </span>
// // //                         ) : (
// // //                           asset[key] || <span className="text-gray-400">Not Available</span>
// // //                         )}
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Modals */}
// // //       {selectedAsset && (
// // //         <AssignAssetModal
// // //           assetTag={selectedAsset}
// // //           isOpen={true}
// // //           onClose={() => setSelectedAsset(null)}
// // //         />
// // //       )}
// // //       {checkInAsset && (
// // //         <CheckInModal
// // //           assetTag={checkInAsset}
// // //           isOpen={!!checkInAsset}
// // //           onClose={() => setCheckInAsset(null)}
// // //           onCheckIn={handleCheckInSubmit}
// // //         />
// // //       )}
// // //       {openChildAssetModal && (
// // //         <ChildAssetForm
// // //           assetTag={childAssetParentTag}
// // //           onClose={handleCloseModal}
// // //         />
// // //       )}
// // //       {selectedUser && (
// // //         <UserDetailsModal
// // //           query={selectedUser}
// // //           isOpen={true}
// // //           onClose={() => setSelectedUser(null)}
// // //         />
// // //       )}
// // //       {showReserveModal && (
// // //         <ReserveAssetModal
// // //           assetTag={selectedAssetReserve}
// // //           isOpen={true}
// // //           onClose={() => setShowReserveModal(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AssetDetails;



// // import AssignAssetModal from "../components/AssignAssetModel";
// // import CheckInModal from "../components/CheckInModal";
// // import ChildAssetForm from "../components/ChildAssetForm";
// // import ReserveAssetModal from "../components/ReserveAssetModal";
// // import UserDetailsModal from "../components/UserDetailsModal";
// // import { generatePolicyPdf } from "../components/generatePolicyPdf";
// // import {
// //   disposeAsset,
// //   markAssetAsLost,
// //   resetAssetStatus,
// //   markAssetAsInRepair,
// //   getAssetPhotos,
// //   searchEmployees,
// // } from "../services/api";
// // import { useState, useRef, useEffect, useCallback } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { toast } from "react-toastify";

// // const AssetDetails = ({ asset, assetPhotos }) => {
// //   const [showActions, setShowActions] = useState(false);
// //   const [selectedAsset, setSelectedAsset] = useState(null);
// //   const [checkInAsset, setCheckInAsset] = useState(null);
// //   const [openChildAssetModal, setOpenChildAssetModal] = useState(null);
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   const actionRef = useRef(null);
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [showReserveModal, setShowReserveModal] = useState(false);
// //   const [selectedAssetReserve, setSelectedAssetReserve] = useState(null);
// //   const [childAssetParentTag, setChildAssetParentTag] = useState(null);

// //   const returnUrl = location.state?.returnUrl || "/assets";

// //   const handleGoBack = useCallback(() => {
// //     navigate(returnUrl);
// //   }, [navigate, returnUrl]);

// //   const handleNext = () => {
// //     console.log("Next asset"); // hook your logic
// //   };

// //   const handlePrevious = () => {
// //     console.log("Previous asset"); // hook your logic
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (actionRef.current && !actionRef.current.contains(event.target)) {
// //         setShowActions(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleReserveStatusChange = (assetTag) => {
// //     setSelectedAssetReserve(assetTag);
// //     setShowReserveModal(true);
// //   };

// //   const handleAddChildAsset = (assetTag) => {
// //     setChildAssetParentTag(assetTag);
// //     setOpenChildAssetModal(true);
// //   };

// //   const handleResetStatusChange = async (assetTag) => {
// //     const note = prompt("Enter note:");
// //     if (!note) return;
// //     const res = await resetAssetStatus(assetTag, note);
// //     toast.success(res);
// //   };

// //   const handleDisposeStatusChange = async (assetTag) => {
// //     const note = prompt("Enter note:");
// //     if (!note) return;
// //     const res = await disposeAsset(assetTag, note);
// //     toast.success(res.message);
// //   };

// //   const handleLostStatusChange = async (assetTag) => {
// //     const note = prompt("Enter note:");
// //     if (!note) return;
// //     const res = await markAssetAsLost(assetTag, note);
// //     toast.success(res.message);
// //   };

// //   const handleInRepairStatusChange = async (assetTag) => {
// //     const note = prompt("Enter note:");
// //     if (!note) return;
// //     const res = await markAssetAsInRepair(assetTag, note, 1, false);
// //     toast.success(res.message);
// //   };

// //   const fields = [
// //     { key: "department", label: "Department" },
// //     { key: "siteName", label: "Site" },
// //     { key: "locationName", label: "Location" },
// //     { key: "assignedUserName", label: "User Name" },
// //   ];

// //   const AssetFields = [
// //     { key: "assetTag", label: "Asset Tag" },
// //     { key: "serialNumber", label: "Serial Number" },
// //     { key: "brand", label: "Brand" },
// //     { key: "assetType", label: "Type" },
// //     { key: "model", label: "Model" },
// //   ];

// //   const AssetStatusAndNote = [
// //     { key: "status", label: "Status" },
// //     { key: "statusNote", label: "Note" },
// //     { key: "createdBy", label: "Created By" },
// //   ];

// //   return (
// //     <div className="bg-gray-50 p-4 rounded-xl">

// //       {/* TOP BAR */}
// //       <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
// //         <div className="flex gap-2">
// //           <button onClick={handleGoBack} className="btn">
// //             ← Back
// //           </button>
// //           <button onClick={handlePrevious} className="btn">
// //             ← Prev
// //           </button>
// //           <button onClick={handleNext} className="btn">
// //             Next →
// //           </button>
// //         </div>

// //         <div className="flex flex-wrap gap-2">
// //           <button className="btn-dark" onClick={() => window.print()}>
// //             Print
// //           </button>

// //           <button
// //             className="btn-blue"
// //             onClick={async () => {
// //               const photos = await getAssetPhotos(asset.assetTag);
// //               const employees = asset?.assignedUserEmpId
// //                 ? await searchEmployees(asset.assignedUserEmpId)
// //                 : [];
// //               const emp = employees[0] || null;
// //               await generatePolicyPdf(asset, photos, emp);
// //             }}
// //           >
// //             PDF
// //           </button>

// //           <button
// //             className="btn-green"
// //             onClick={() =>
// //               navigate(`/assets/edit/${asset.assetTag}`, {
// //                 state: { returnUrl: location.pathname },
// //               })
// //             }
// //           >
// //             Edit
// //           </button>

// //           <button
// //             className="btn-green"
// //             onClick={() => handleAddChildAsset(asset.assetTag)}
// //           >
// //             + Child
// //           </button>

// //           {/* Dropdown */}
// //           <div className="relative" ref={actionRef}>
// //             <button
// //               onClick={() => setShowActions(!showActions)}
// //               className="btn-blue"
// //             >
// //               Actions
// //             </button>

// //             {showActions && (
// //               <div className="dropdown">
// //                 <button onClick={() => setSelectedAsset(asset.assetTag)}>Checkout</button>
// //                 <button onClick={() => setCheckInAsset(asset.assetTag)}>Checkin</button>
// //                 <button onClick={() => handleInRepairStatusChange(asset.assetTag)}>Repair</button>
// //                 <button onClick={() => handleDisposeStatusChange(asset.assetTag)}>Dispose</button>
// //                 <button onClick={() => handleLostStatusChange(asset.assetTag)}>Lost</button>
// //                 <button onClick={() => handleReserveStatusChange(asset.assetTag)}>Reserve</button>
// //                 <button onClick={() => handleResetStatusChange(asset.assetTag)}>Reset</button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* DESCRIPTION */}
// //       <div className="card">
// //         {asset.description || "No description"}
// //       </div>

// //       {/* DETAILS */}
// //       <div className="grid md:grid-cols-4 gap-4 mt-4">
// //         <div className="card flex items-center justify-center">
// //           {assetPhotos.length ? (
// //             <img
// //               src={assetPhotos[assetPhotos.length - 1]}
// //               className="h-40 object-cover rounded"
// //             />
// //           ) : (
// //             "No Image"
// //           )}
// //         </div>

// //         {[AssetFields, fields, AssetStatusAndNote].map((group, i) => (
// //           <div key={i} className="card space-y-2">
// //             {group.map((f, idx) => (
// //               <div key={idx} className="flex justify-between text-sm">
// //                 <span className="text-gray-500">{f.label}</span>
// //                 <span className="font-medium">
// //                   {asset[f.key] || "N/A"}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         ))}
// //       </div>

// //       {/* MODALS */}
// //       {selectedAsset && <AssignAssetModal assetTag={selectedAsset} isOpen />}
// //       {checkInAsset && <CheckInModal assetTag={checkInAsset} isOpen />}
// //       {openChildAssetModal && <ChildAssetForm assetTag={childAssetParentTag} />}
// //       {selectedUser && <UserDetailsModal query={selectedUser} isOpen />}
// //       {showReserveModal && <ReserveAssetModal assetTag={selectedAssetReserve} isOpen />}
// //     </div>
// //   );
// // };

// // export default AssetDetails;

import AssignAssetModal from "../components/AssignAssetModel";
import CheckInModal from "../components/CheckInModal";
import ChildAssetForm from "../components/ChildAssetForm";
import ReserveAssetModal from "../components/ReserveAssetModal";
import UserDetailsModal from "../components/UserDetailsModal";
import { generatePolicyPdf } from "../components/generatePolicyPdf";
import {
  disposeAsset,
  markAssetAsLost,
  resetAssetStatus,
  markAssetAsInRepair,
  getAssetPhotos,
  getEmployees,
  searchEmployees,
} from "../services/api";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AssetDetails = ({ asset, assetPhotos, onNext, onPrev, hasPrev, hasNext }) => {
  const [showActions, setShowActions] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [checkInAsset, setCheckInAsset] = useState(null);
  const [openChildAssetModal, setOpenChildAssetModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const actionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [selectedAssetReserve, setSelectedAssetReserve] = useState(null);
  const [childAssetParentTag, setChildAssetParentTag] = useState(null);

  const returnUrl = location.state?.returnUrl || "/assets";

  const handleGoBack = useCallback(() => {
    navigate(returnUrl);
  }, [navigate, returnUrl]);

  const handleReserveStatusChange = (assetTag) => {
    setSelectedAssetReserve(assetTag);
    setShowReserveModal(true);
  };

  const handleAddChildAsset = (assetTag) => {
    setChildAssetParentTag(assetTag);
    setOpenChildAssetModal(true);
  };

  const handleCloseModal = () => setOpenChildAssetModal(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetStatusChange = async (assetTag) => {
    try {
      const statusNote = prompt("Enter a status note:")?.trim();
      if (!statusNote) return alert("❌ Status note is required.");
      const response = await resetAssetStatus(assetTag, statusNote);
      toast.success(response);
    } catch (error) {
      toast.error(error.message || "Failed to reset status.");
    }
  };

  const handleCheckInSubmit = async (formData) => {
    const result = await checkInAsset(formData);
    alert(result.message);
    if (result.success) setCheckInAsset(null);
  };

  const handleDisposeStatusChange = async (assetTag) => {
    const statusNote = prompt("Enter a disposal note:") || "";
    if (!statusNote) return alert("❌ Disposal note is required!");
    const result = await disposeAsset(assetTag, statusNote);
    toast.success(result.message);
  };

  const handleLostStatusChange = async (assetTag) => {
    const statusNote = prompt("Enter a note for lost asset:") || "";
    if (!statusNote) return alert("❌ Status note is required!");
    const result = await markAssetAsLost(assetTag, statusNote);
    toast.success(result.message);
  };

  const handleInRepairStatusChange = async (assetTag) => {
    try {
      const note = prompt("Enter a repair note:")?.trim();
      if (!note) return alert("❌ Repair note is required!");
      let confirmRepair = false;
      if (asset?.status === "IN_REPAIR") {
        confirmRepair = window.confirm("This asset is already in repair. Mark as repaired?");
        if (!confirmRepair) return;
      }
      const result = await markAssetAsInRepair(assetTag, note, 1, confirmRepair);
      toast.success(result.message || "Asset status updated!");
    } catch (error) {
      toast.error(error.message || "Failed to update asset status.");
    }
  };

  const fields = [
    { key: "department", label: "Department" },
    { key: "siteName", label: "Site" },
    { key: "locationName", label: "Location" },
    { key: "assignedUserName", label: "User Name" },
  ];
  const AssetFields = [
    { key: "assetTag", label: "Asset Tag" },
    { key: "serialNumber", label: "Serial Number" },
    { key: "brand", label: "Brand" },
    { key: "assetType", label: "Asset Type" },
    { key: "model", label: "Model" },
  ];
  const AssetStatusAndNote = [
    { key: "status", label: "Status" },
    { key: "statusNote", label: "Status Note" },
    { key: "reservationEndDate", label: "Reservation" },
    { key: "createdBy", label: "Created By" },
    { key: "createdAt", label: "Created At" },
  ];

  const statusColor = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "AVAILABLE") return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    if (s === "CHECKED_OUT" || s === "ASSIGNED") return "bg-blue-100 text-blue-700 border border-blue-200";
    if (s === "IN_REPAIR") return "bg-amber-100 text-amber-700 border border-amber-200";
    if (s === "DISPOSED") return "bg-red-100 text-red-700 border border-red-200";
    if (s === "LOST") return "bg-red-100 text-red-700 border border-red-200";
    if (s === "RESERVED") return "bg-purple-100 text-purple-700 border border-purple-200";
    return "bg-gray-100 text-gray-600 border border-gray-200";
  };

  return (
    <div className="relative">
      {/* ── Top Navigation Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        {/* Left: Back + Prev/Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Assets
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Prev
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
            >
              Next
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>

          <button
            onClick={async () => {
              const photos = await getAssetPhotos(asset.assetTag);
              const employees = asset?.assignedUserEmpId ? await searchEmployees(asset.assignedUserEmpId) : [];
              const employeeDetails = employees.length > 0 ? employees[0] : null;
              await generatePolicyPdf(asset, photos, employeeDetails);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Policy PDF
          </button>

          <button
            onClick={() => navigate(`/assets/edit/${asset.assetTag}`, { state: { returnUrl: location.pathname + location.search } })}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>

          <button
            onClick={() => handleAddChildAsset(asset.assetTag)}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-500 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Child
          </button>

          {/* Actions Dropdown */}
          <div className="relative" ref={actionRef}>
            <button
              onClick={() => setShowActions(!showActions)}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              Actions
              <svg className={`w-3.5 h-3.5 transition-transform ${showActions ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showActions && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20">
                {[
                  { label: "Check Out", icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1", action: () => setSelectedAsset(asset.assetTag) },
                  { label: "Check In", icon: "M7 16l-4-4m0 0l4-4m-4 4h18m-6 4v1a3 3 0 003 3h4a3 3 0 003-3V7a3 3 0 00-3-3h-4a3 3 0 00-3 3v1", action: () => setCheckInAsset(asset.assetTag) },
                  { label: "In Repair", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", action: () => handleInRepairStatusChange(asset.assetTag) },
                  { label: "Dispose", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", action: () => handleDisposeStatusChange(asset.assetTag) },
                  { label: "Lost / Missing", icon: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", action: () => handleLostStatusChange(asset.assetTag) },
                  { label: "Reserve", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", action: () => handleReserveStatusChange(asset.assetTag) },
                  { label: "Reset Status", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", action: () => handleResetStatusChange(asset.assetTag) },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { item.action(); setShowActions(false); }}
                    className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Asset Header Card ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-5 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Photo */}
          <div className="lg:w-40 flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200">
              {assetPhotos.length > 0 ? (
                <img
                  src={assetPhotos[assetPhotos.length - 1]}
                  alt="Asset"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">No Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Asset Name + Description + Status */}
          <div className="flex-1 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                {/* <h1 className="text-base font-semibold text-slate-800">{asset.name || "Unnamed Asset"}</h1> */}
                <p className="text-base font-semibold text-slate-800">{asset.assetTag}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(asset.status)}`}>
                {asset.status || "Unknown"}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {asset.description || "No description available for this asset."}
            </p>
          </div>
        </div>
      </div>

      {/* ── Three Info Tables ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Asset Info", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", fields: AssetFields },
          { title: "Assignment", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", fields },
          { title: "Status & Notes", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", fields: AssetStatusAndNote },
        ].map((table, tIndex) => (
          <div key={tIndex} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={table.icon} />
              </svg>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{table.title}</span>
            </div>
            <table className="w-full text-xs">
              <tbody>
                {table.fields.map(({ key, label }, index) => (
                  <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <th className="px-4 py-2 text-slate-400 font-medium text-left w-2/5 whitespace-nowrap">{label}</th>
                    <td className="px-4 py-2 text-slate-700 font-medium">
                      {key === "assignedUserName" ? (
                        asset[key] ? (
                          <button
                            onClick={() => asset.assignedUserEmpId && setSelectedUser(asset.assignedUserEmpId)}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                          >
                            {asset[key]}
                          </button>
                        ) : (
                          <span className="text-slate-300 font-normal">—</span>
                        )
                      ) : (
                        asset[key] ? (
                          key === "status" ? (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(asset[key])}`}>
                              {asset[key]}
                            </span>
                          ) : asset[key]
                        ) : (
                          <span className="text-slate-300 font-normal">—</span>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedAsset && (
        <AssignAssetModal assetTag={selectedAsset} isOpen={true} onClose={() => setSelectedAsset(null)} />
      )}
      {checkInAsset && (
        <CheckInModal assetTag={checkInAsset} isOpen={!!checkInAsset} onClose={() => setCheckInAsset(null)} onCheckIn={handleCheckInSubmit} />
      )}
      {openChildAssetModal && (
        <ChildAssetForm assetTag={childAssetParentTag} onClose={handleCloseModal} />
      )}
      {selectedUser && (
        <UserDetailsModal query={selectedUser} isOpen={true} onClose={() => setSelectedUser(null)} />
      )}
      {showReserveModal && (
        <ReserveAssetModal assetTag={selectedAssetReserve} isOpen={true} onClose={() => setShowReserveModal(false)} />
      )}
    </div>
  );
};

export default AssetDetails;