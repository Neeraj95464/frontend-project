// // // import { searchEmployees, getAssetsByUser } from "../services/api";
// // // import { motion } from "framer-motion";
// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const UserDetailsModal = ({ query, isOpen, onClose }) => {
// // //   const [userData, setUserData] = useState(null);
// // //   const [loadingUser, setLoadingUser] = useState(false);
// // //   const [assetsLoading, setAssetsLoading] = useState(false);
// // //   const [assignedAssets, setAssignedAssets] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   const navigate = useNavigate();

// // //   // Fetch user details when the modal opens
// // //   useEffect(() => {
// // //     if (!isOpen || !query?.trim()) {
// // //       setUserData(null);
// // //       setAssignedAssets([]);
// // //       return;
// // //     }

// // //     const fetchUser = async () => {
// // //       setLoadingUser(true);
// // //       setError(null);
// // //       try {
// // //         const data = await searchEmployees(query);
// // //         const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
// // //         setUserData(user);

// // //         setAssetsLoading(true);
// // //         try {
// // //           const assets = await getAssetsByUser(query);
// // //           setAssignedAssets(assets || []);
// // //           console.log("user assets are ", assets);
// // //         } catch (err) {
// // //           console.error("Failed to fetch assets", err);
// // //           setAssignedAssets([]);
// // //         } finally {
// // //           setAssetsLoading(false);
// // //           // }
// // //         }
// // //       } catch (err) {
// // //         setError("Failed to fetch user data");
// // //       } finally {
// // //         setLoadingUser(false);
// // //       }
// // //     };

// // //     fetchUser();
// // //   }, [query, isOpen]);

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
// // //       <motion.div
// // //         initial={{ opacity: 0, scale: 0.95 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         exit={{ opacity: 0, scale: 0.95 }}
// // //         className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
// // //       >
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
// // //           <h2 className="text-lg md:text-xl font-semibold">User Details</h2>
// // //           <button onClick={onClose} className="text-2xl hover:text-red-300">
// // //             &times;
// // //           </button>
// // //         </div>

// // //         {/* Body */}
// // //         <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
// // //           {loadingUser ? (
// // //             <p className="text-center text-gray-500">Loading user details...</p>
// // //           ) : error ? (
// // //             <p className="text-center text-red-500">{error}</p>
// // //           ) : userData ? (
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {/* Left Column: User Info */}
// // //               <div className="bg-white rounded-lg shadow p-4">
// // //                 <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">
// // //                   Personal Info
// // //                 </h3>
// // //                 <table className="w-full text-sm">
// // //                   <tbody>
// // //                     {[
// // //                       { label: "Username", value: userData?.username },
// // //                       { label: "Employee ID", value: userData?.employeeId },
// // //                       { label: "Role", value: userData?.role },
// // //                       { label: "Phone", value: userData?.phoneNumber },
// // //                       { label: "Email", value: userData?.email },
// // //                       { label: "Department", value: userData?.department },
// // //                       { label: "Note", value: userData?.note },
// // //                       { label: "Location", value: userData?.location?.name },
// // //                       { label: "Site", value: userData?.site?.name },
// // //                     ].map((item, index) => (
// // //                       <tr key={index} className="border-b last:border-none">
// // //                         <th className="py-2 pr-4 text-gray-500 text-left w-1/3">
// // //                           {item.label}
// // //                         </th>
// // //                         <td className="py-2 text-gray-800">
// // //                           {item.value || "N/A"}
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>

// // //               {/* Right Column: Assigned Assets */}
// // //               <div className="bg-white rounded-lg shadow p-4 flex flex-col">
// // //                 <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">
// // //                   Assigned Assets
// // //                 </h3>

// // //                 {assetsLoading ? (
// // //                   <p className="text-gray-500">Loading assigned assets...</p>
// // //                 ) : assignedAssets.length > 0 ? (
// // //                   <ul className="space-y-3 mt-1">
// // //                     {assignedAssets.map((asset) => {
// // //                       const isAdmin = userData?.role === "ADMIN";
// // //                       return (
// // //                         <li
// // //                           key={asset.id || asset.assetTag}
// // //                           onClick={() => {
// // //                             if (isAdmin) {
// // //                               navigate(`/asset/${asset.assetTag}`);
// // //                             }
// // //                           }}
// // //                           className={`p-3 bg-gray-100 rounded-lg shadow-sm
// // //           ${isAdmin ? "hover:bg-gray-200 cursor-pointer" : "cursor-default"}`}
// // //                         >
// // //                           <p
// // //                             className={`font-medium ${
// // //                               isAdmin ? "text-blue-600" : "text-gray-600"
// // //                             }`}
// // //                           >
// // //                             {asset.assetTag}
// // //                           </p>
// // //                           <p className="text-sm text-gray-600">
// // //                             {asset.model} • {asset.assetType}
// // //                           </p>
// // //                         </li>
// // //                       );
// // //                     })}
// // //                   </ul>
// // //                 ) : (
// // //                   <p className="text-gray-500">No assets assigned.</p>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <p className="text-center text-gray-500">No user found.</p>
// // //           )}
// // //         </div>

// // //         {/* Footer */}
// // //         <div className="px-6 py-4 border-t bg-gray-100 flex justify-center">
// // //           <button
// // //             onClick={onClose}
// // //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// // //           >
// // //             Close
// // //           </button>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default UserDetailsModal;

// // // import { searchEmployees, getAssetsByUser } from "../services/api";
// // // import { motion } from "framer-motion";
// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const UserDetailsModal = ({ query, isOpen, onClose }) => {
// // //   const [userData, setUserData] = useState(null);
// // //   const [loadingUser, setLoadingUser] = useState(false);
// // //   const [assetsLoading, setAssetsLoading] = useState(false);
// // //   const [assignedAssets, setAssignedAssets] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   const navigate = useNavigate();

// // //   // Fetch user details when the modal opens
// // //   useEffect(() => {
// // //     if (!isOpen || !query?.trim()) {
// // //       setUserData(null);
// // //       setAssignedAssets([]);
// // //       return;
// // //     }

// // //     const fetchUser = async () => {
// // //       setLoadingUser(true);
// // //       setError(null);
// // //       try {
// // //         const data = await searchEmployees(query);
// // //         const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
// // //         setUserData(user);

// // //         setAssetsLoading(true);
// // //         try {
// // //           const assets = await getAssetsByUser(query);
// // //           setAssignedAssets(assets || []);
// // //           console.log("user assets are ", assets);
// // //         } catch (err) {
// // //           console.error("Failed to fetch assets", err);
// // //           setAssignedAssets([]);
// // //         } finally {
// // //           setAssetsLoading(false);
// // //         }
// // //       } catch (err) {
// // //         setError("Failed to fetch user data");
// // //       } finally {
// // //         setLoadingUser(false);
// // //       }
// // //     };

// // //     fetchUser();
// // //   }, [query, isOpen]);

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
// // //       <motion.div
// // //         initial={{ opacity: 0, scale: 0.95 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         exit={{ opacity: 0, scale: 0.95 }}
// // //         className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
// // //       >
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
// // //           <h2 className="text-lg md:text-xl font-semibold">User Details</h2>
// // //           <button onClick={onClose} className="text-2xl hover:text-red-300">
// // //             &times;
// // //           </button>
// // //         </div>

// // //         {/* Body */}
// // //         <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
// // //           {loadingUser ? (
// // //             <p className="text-center text-gray-500">Loading user details...</p>
// // //           ) : error ? (
// // //             <p className="text-center text-red-500">{error}</p>
// // //           ) : userData ? (
// // //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //               {/* Left Column: User Info */}
// // //               <div className="bg-white rounded-lg shadow p-4">
// // //                 <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">
// // //                   Personal Info
// // //                 </h3>
// // //                 <table className="w-full text-sm">
// // //                   <tbody>
// // //                     {[
// // //                       { label: "Username", value: userData?.username },
// // //                       { label: "Employee ID", value: userData?.employeeId },
// // //                       { label: "Role", value: userData?.role },
// // //                       { label: "Phone", value: userData?.phoneNumber },
// // //                       { label: "Email", value: userData?.email },
// // //                       { label: "Department", value: userData?.department },
// // //                       { label: "Note", value: userData?.note },
// // //                       { label: "Location", value: userData?.location?.name },
// // //                       { label: "Site", value: userData?.site?.name },
// // //                     ].map((item, index) => (
// // //                       <tr key={index} className="border-b last:border-none">
// // //                         <th className="py-2 pr-4 text-gray-500 text-left w-1/3">
// // //                           {item.label}
// // //                         </th>
// // //                         <td className="py-2 text-gray-800">
// // //                           {item.value || "N/A"}
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>

// // //               {/* Right Column: Assigned Assets */}
// // //               <div className="bg-white rounded-lg shadow p-4 flex flex-col">
// // //                 <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">
// // //                   Assigned Assets ({assignedAssets.length})
// // //                 </h3>

// // //                 {assetsLoading ? (
// // //                   <p className="text-gray-500 text-center py-8">
// // //                     Loading assigned assets...
// // //                   </p>
// // //                 ) : assignedAssets.length > 0 ? (
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 max-h-96 overflow-y-auto">
// // //                     {assignedAssets.map((asset, index) => {
// // //                       const isAdmin = userData?.role === "ADMIN";
// // //                       return (
// // //                         <div
// // //                           key={asset.assetTag || index}
// // //                           onClick={() => {
// // //                             if (isAdmin) {
// // //                               // Navigate to asset detail page using assetTag
// // //                               navigate(`/asset/${asset.assetTag}`);
// // //                             }
// // //                           }}
// // //                           className={`p-4 bg-gradient-to-br rounded-xl shadow-sm border
// // //                             ${
// // //                               isAdmin
// // //                                 ? "from-blue-50 to-indigo-50 border-blue-200 hover:shadow-md hover:scale-[1.02] cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
// // //                                 : "from-gray-50 to-gray-100 border-gray-200 cursor-default"
// // //                             }`}
// // //                         >
// // //                           {/* Asset Tag - Primary identifier */}
// // //                           <div className="font-bold text-lg mb-1 truncate">
// // //                             <span
// // //                               className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mr-2 ${
// // //                                 asset.assetType === "CUG_SIM"
// // //                                   ? "bg-green-100 text-green-800"
// // //                                   : "bg-blue-100 text-blue-800"
// // //                               }`}
// // //                             >
// // //                               {asset.assetType}
// // //                             </span>
// // //                             {asset.assetTag}
// // //                           </div>

// // //                           {/* Asset Details */}
// // //                           <div className="space-y-1 text-sm">
// // //                             <p className="text-gray-900 font-medium truncate">
// // //                               {asset.name}
// // //                             </p>
// // //                             <p className="text-gray-600 truncate">
// // //                               <span className="font-mono">
// // //                                 {asset.identifier}
// // //                               </span>
// // //                             </p>
// // //                             {asset.providerOrBrand && (
// // //                               <p className="text-gray-500 truncate">
// // //                                 {asset.providerOrBrand}
// // //                               </p>
// // //                             )}
// // //                           </div>

// // //                           {/* Location & Status */}
// // //                           <div className="mt-2 flex flex-wrap gap-2 text-xs">
// // //                             {asset.locationName && (
// // //                               <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
// // //                                 {asset.locationName}
// // //                               </span>
// // //                             )}
// // //                             {asset.siteName && (
// // //                               <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
// // //                                 {asset.siteName}
// // //                               </span>
// // //                             )}
// // //                             <span
// // //                               className={`px-2 py-1 rounded-full font-medium ${
// // //                                 asset.status === "ASSIGNED"
// // //                                   ? "bg-green-100 text-green-800"
// // //                                   : asset.status === "CHECKED_OUT"
// // //                                   ? "bg-yellow-100 text-yellow-800"
// // //                                   : "bg-gray-100 text-gray-800"
// // //                               }`}
// // //                             >
// // //                               {asset.status}
// // //                             </span>
// // //                           </div>

// // //                           {asset.note && (
// // //                             <p className="mt-2 text-xs text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded">
// // //                               {asset.note}
// // //                             </p>
// // //                           )}
// // //                         </div>
// // //                       );
// // //                     })}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-12 text-gray-500">
// // //                     <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
// // //                       <svg
// // //                         className="w-8 h-8 text-gray-400"
// // //                         fill="none"
// // //                         stroke="currentColor"
// // //                         viewBox="0 0 24 24"
// // //                       >
// // //                         <path
// // //                           strokeLinecap="round"
// // //                           strokeLinejoin="round"
// // //                           strokeWidth={2}
// // //                           d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
// // //                         />
// // //                       </svg>
// // //                     </div>
// // //                     <p className="text-lg font-medium text-gray-900 mb-1">
// // //                       No assets assigned
// // //                     </p>
// // //                     <p className="text-sm">
// // //                       This user has no hardware or SIM cards assigned.
// // //                     </p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <p className="text-center text-gray-500">No user found.</p>
// // //           )}
// // //         </div>

// // //         {/* Footer */}
// // //         <div className="px-6 py-4 border-t bg-gray-100 flex justify-center">
// // //           <button
// // //             onClick={onClose}
// // //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// // //           >
// // //             Close
// // //           </button>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default UserDetailsModal;

// // // import { searchEmployees, getAssetsByUser } from "../services/api";
// // // import { motion } from "framer-motion";
// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const UserDetailsModal = ({ query, isOpen, onClose }) => {
// // //   const [userData, setUserData] = useState(null);
// // //   const [loadingUser, setLoadingUser] = useState(false);
// // //   const [assetsLoading, setAssetsLoading] = useState(false);
// // //   const [assignedAssets, setAssignedAssets] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     if (!isOpen || !query?.trim()) {
// // //       setUserData(null);
// // //       setAssignedAssets([]);
// // //       return;
// // //     }

// // //     const fetchUser = async () => {
// // //       setLoadingUser(true);
// // //       setError(null);
// // //       try {
// // //         const data = await searchEmployees(query);
// // //         const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
// // //         setUserData(user);

// // //         setAssetsLoading(true);
// // //         try {
// // //           const assets = await getAssetsByUser(query);
// // //           setAssignedAssets(assets || []);
// // //           console.log("user assets are ", assets);
// // //         } catch (err) {
// // //           console.error("Failed to fetch assets", err);
// // //           setAssignedAssets([]);
// // //         } finally {
// // //           setAssetsLoading(false);
// // //         }
// // //       } catch (err) {
// // //         setError("Failed to fetch user data");
// // //       } finally {
// // //         setLoadingUser(false);
// // //       }
// // //     };

// // //     fetchUser();
// // //   }, [query, isOpen]);

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 50, scale: 0.95 }}
// // //         animate={{ opacity: 1, y: 0, scale: 1 }}
// // //         exit={{ opacity: 0, y: 50, scale: 0.95 }}
// // //         transition={{ type: "spring", stiffness: 300, damping: 30 }}
// // //         className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
// // //       >
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
// // //           <div className="relative z-10">
// // //             <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
// // //               User Profile
// // //             </h2>
// // //             <p className="text-blue-100 mt-1">
// // //               {userData?.employeeId || "Loading..."}
// // //             </p>
// // //           </div>
// // //           <motion.button
// // //             whileHover={{ scale: 1.1 }}
// // //             whileTap={{ scale: 0.95 }}
// // //             onClick={onClose}
// // //             className="text-3xl hover:text-white/80 transition-all duration-200"
// // //           >
// // //             ×
// // //           </motion.button>
// // //           <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 -skew-x-12"></div>
// // //         </div>

// // //         {/* Body */}
// // //         <div className="flex-1 overflow-hidden p-0">
// // //           <div className="flex h-full">
// // //             {/* Left Column: User Info */}
// // //             <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex flex-col">
// // //               <div className="flex-1">
// // //                 <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3 flex items-center gap-3">
// // //                   <div className="w-8 h-8 bg-blue-100 rounded-2xl flex items-center justify-center">
// // //                     <svg
// // //                       className="w-4 h-4 text-blue-600"
// // //                       fill="none"
// // //                       stroke="currentColor"
// // //                       viewBox="0 0 24 24"
// // //                     >
// // //                       <path
// // //                         strokeLinecap="round"
// // //                         strokeLinejoin="round"
// // //                         strokeWidth={2}
// // //                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// // //                       />
// // //                     </svg>
// // //                   </div>
// // //                   Personal Information
// // //                 </h3>

// // //                 <div className="space-y-4">
// // //                   {[
// // //                     {
// // //                       label: "Username",
// // //                       value: userData?.username,
// // //                       icon: "👤",
// // //                     },
// // //                     {
// // //                       label: "Employee ID",
// // //                       value: userData?.employeeId,
// // //                       icon: "🆔",
// // //                     },
// // //                     { label: "Role", value: userData?.role, icon: "⭐" },
// // //                     {
// // //                       label: "Phone",
// // //                       value: userData?.phoneNumber,
// // //                       icon: "📱",
// // //                     },
// // //                     { label: "Email", value: userData?.email, icon: "✉️" },
// // //                     {
// // //                       label: "Department",
// // //                       value: userData?.department,
// // //                       icon: "🏢",
// // //                     },
// // //                     {
// // //                       label: "Location",
// // //                       value: userData?.location?.name,
// // //                       icon: "📍",
// // //                     },
// // //                     { label: "Site", value: userData?.site?.name, icon: "🏭" },
// // //                   ].map((item, index) => (
// // //                     <motion.div
// // //                       key={index}
// // //                       initial={{ opacity: 0, x: -20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       transition={{ delay: index * 0.05 }}
// // //                       className="group flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 hover:shadow-lg hover:bg-white/80 transition-all duration-300"
// // //                     >
// // //                       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 mr-4 group-hover:scale-110 transition-transform">
// // //                         {item.icon}
// // //                       </div>
// // //                       <div className="flex-1 min-w-0">
// // //                         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
// // //                           {item.label}
// // //                         </p>
// // //                         <p className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600">
// // //                           {item.value || "N/A"}
// // //                         </p>
// // //                       </div>
// // //                     </motion.div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Right Column: Horizontal Assets */}
// // //             <div className="w-full lg:w-1/2 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8">
// // //               <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-emerald-200 pb-3 flex items-center gap-3">
// // //                 <div className="w-8 h-8 bg-emerald-100 rounded-2xl flex items-center justify-center">
// // //                   <svg
// // //                     className="w-4 h-4 text-emerald-600"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth={2}
// // //                       d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
// // //                     />
// // //                   </svg>
// // //                 </div>
// // //                 Assigned Assets ({assignedAssets.length})
// // //               </h3>

// // //               <div className="flex-1 flex flex-col">
// // //                 {assetsLoading ? (
// // //                   <div className="flex-1 flex items-center justify-center py-12">
// // //                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
// // //                   </div>
// // //                 ) : assignedAssets.length > 0 ? (
// // //                   <div className="flex-1 overflow-hidden">
// // //                     <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x snap-mandatory h-full">
// // //                       {assignedAssets.map((asset, index) => {
// // //                         const isAdmin = userData?.role === "ADMIN";
// // //                         return (
// // //                           <motion.div
// // //                             key={asset.assetTag || index}
// // //                             initial={{ opacity: 0, scale: 0.9, x: 50 }}
// // //                             animate={{ opacity: 1, scale: 1, x: 0 }}
// // //                             transition={{ delay: index * 0.1 }}
// // //                             whileHover={{ scale: 1.05, y: -5 }}
// // //                             onClick={() => {
// // //                               if (isAdmin) {
// // //                                 navigate(`/asset/${asset.assetTag}`);
// // //                               }
// // //                             }}
// // //                             className={`flex-shrink-0 w-72 h-48 bg-gradient-to-br rounded-2xl shadow-xl border-2 p-6 cursor-default transition-all duration-300 snap-center ${
// // //                               isAdmin
// // //                                 ? "border-emerald-300 bg-gradient-to-br from-emerald-100 via-white to-emerald-50 hover:shadow-2xl hover:border-emerald-400 cursor-pointer active:scale-[0.98]"
// // //                                 : "border-gray-200 bg-gradient-to-br from-gray-100 via-white to-gray-50"
// // //                             }`}
// // //                           >
// // //                             {/* Asset Header */}
// // //                             <div className="flex items-center justify-between mb-3">
// // //                               <span
// // //                                 className={`px-3 py-1 rounded-full text-xs font-bold ${
// // //                                   asset.assetType === "CUG_SIM"
// // //                                     ? "bg-emerald-200 text-emerald-800"
// // //                                     : "bg-blue-200 text-blue-800"
// // //                                 }`}
// // //                               >
// // //                                 {asset.assetType}
// // //                               </span>
// // //                               <span
// // //                                 className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //                                   asset.status === "ASSIGNED"
// // //                                     ? "bg-green-200 text-green-800"
// // //                                     : "bg-yellow-200 text-yellow-800"
// // //                                 }`}
// // //                               >
// // //                                 {asset.status}
// // //                               </span>
// // //                             </div>

// // //                             {/* Asset Tag */}
// // //                             <h4 className="text-xl font-black text-gray-900 mb-2 truncate bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
// // //                               {asset.assetTag}
// // //                             </h4>

// // //                             {/* Name & Identifier */}
// // //                             <p className="text-sm font-semibold text-gray-700 mb-1 truncate">
// // //                               {asset.name}
// // //                             </p>
// // //                             <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded mb-3 truncate">
// // //                               {asset.identifier}
// // //                             </p>

// // //                             {/* Location & Site */}
// // //                             <div className="flex flex-wrap gap-1 mb-3">
// // //                               {asset.locationName && (
// // //                                 <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
// // //                                   {asset.locationName}
// // //                                 </span>
// // //                               )}
// // //                               {asset.siteName && (
// // //                                 <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
// // //                                   {asset.siteName}
// // //                                 </span>
// // //                               )}
// // //                             </div>

// // //                             {/* Provider */}
// // //                             {asset.providerOrBrand && (
// // //                               <p className="text-xs text-gray-600 font-medium italic truncate">
// // //                                 {asset.providerOrBrand}
// // //                               </p>
// // //                             )}
// // //                           </motion.div>
// // //                         );
// // //                       })}
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
// // //                     <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
// // //                       <svg
// // //                         className="w-12 h-12 text-gray-400"
// // //                         fill="none"
// // //                         stroke="currentColor"
// // //                         viewBox="0 0 24 24"
// // //                       >
// // //                         <path
// // //                           strokeLinecap="round"
// // //                           strokeLinejoin="round"
// // //                           strokeWidth={1.5}
// // //                           d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
// // //                         />
// // //                       </svg>
// // //                     </div>
// // //                     <h4 className="text-xl font-bold text-gray-700 mb-2">
// // //                       No Assets Assigned
// // //                     </h4>
// // //                     <p className="text-gray-500 max-w-sm">
// // //                       This user currently has no hardware devices or SIM cards
// // //                       assigned to them.
// // //                     </p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Footer */}
// // //         <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-white/50">
// // //           <motion.button
// // //             whileHover={{ scale: 1.05 }}
// // //             whileTap={{ scale: 0.98 }}
// // //             onClick={onClose}
// // //             className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 border border-blue-500/30"
// // //           >
// // //             Close Profile
// // //           </motion.button>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default UserDetailsModal;

// // import { searchEmployees, getAssetsByUser } from "../services/api";
// // import { motion } from "framer-motion";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const UserDetailsModal = ({ query, isOpen, onClose }) => {
// //   const [userData, setUserData] = useState(null);
// //   const [loadingUser, setLoadingUser] = useState(false);
// //   const [assetsLoading, setAssetsLoading] = useState(false);
// //   const [assignedAssets, setAssignedAssets] = useState([]);
// //   const [error, setError] = useState(null);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!isOpen || !query?.trim()) {
// //       setUserData(null);
// //       setAssignedAssets([]);
// //       return;
// //     }

// //     const fetchUser = async () => {
// //       setLoadingUser(true);
// //       setError(null);
// //       try {
// //         const data = await searchEmployees(query);
// //         const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
// //         setUserData(user);

// //         setAssetsLoading(true);
// //         try {
// //           const assets = await getAssetsByUser(query);
// //           setAssignedAssets(assets || []);
// //         } catch (err) {
// //           console.error("Failed to fetch assets", err);
// //           setAssignedAssets([]);
// //         } finally {
// //           setAssetsLoading(false);
// //         }
// //       } catch (err) {
// //         setError("Failed to fetch user data");
// //       } finally {
// //         setLoadingUser(false);
// //       }
// //     };

// //     fetchUser();
// //   }, [query, isOpen]);

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.95, y: 20 }}
// //         animate={{ opacity: 1, scale: 1, y: 0 }}
// //         exit={{ opacity: 0, scale: 0.95, y: 20 }}
// //         transition={{ duration: 0.2 }}
// //         className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
// //       >
// //         {/* Header */}
// //         <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
// //           <div className="flex items-center gap-3">
// //             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
// //               <svg
// //                 className="w-4 h-4 sm:w-5 sm:h-5 text-white"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// //                 />
// //               </svg>
// //             </div>
// //             <h2 className="text-base sm:text-lg font-semibold text-white">
// //               User Profile
// //             </h2>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors text-white text-xl sm:text-2xl font-light"
// //           >
// //             ×
// //           </button>
// //         </div>

// //         {/* Body - Scrollable */}
// //         <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
// //           {loadingUser ? (
// //             <div className="flex items-center justify-center py-16 sm:py-20">
// //               <div className="text-center">
// //                 <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
// //                 <p className="text-xs sm:text-sm text-gray-500">
// //                   Loading user details...
// //                 </p>
// //               </div>
// //             </div>
// //           ) : error ? (
// //             <div className="flex items-center justify-center py-16 sm:py-20">
// //               <div className="text-center">
// //                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
// //                   <svg
// //                     className="w-6 h-6 sm:w-7 sm:h-7 text-red-600"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M6 18L18 6M6 6l12 12"
// //                     />
// //                   </svg>
// //                 </div>
// //                 <p className="text-xs sm:text-sm text-red-600">{error}</p>
// //               </div>
// //             </div>
// //           ) : userData ? (
// //             <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
// //               {/* User Info Card */}
// //               <motion.div
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.1 }}
// //                 className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
// //               >
// //                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-blue-100">
// //                   <h3 className="text-sm sm:text-base font-semibold text-blue-900 flex items-center gap-2">
// //                     <svg
// //                       className="w-4 h-4"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// //                       />
// //                     </svg>
// //                     Personal Information
// //                   </h3>
// //                 </div>
// //                 <div className="p-4">
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
// //                     {[
// //                       {
// //                         label: "Username",
// //                         value: userData?.username,
// //                         icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
// //                       },
// //                       {
// //                         label: "Employee ID",
// //                         value: userData?.employeeId,
// //                         icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
// //                       },
// //                       {
// //                         label: "Role",
// //                         value: userData?.role,
// //                         icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
// //                       },
// //                       {
// //                         label: "Phone",
// //                         value: userData?.phoneNumber,
// //                         icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
// //                       },
// //                       {
// //                         label: "Email",
// //                         value: userData?.email,
// //                         icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
// //                       },
// //                       {
// //                         label: "Department",
// //                         value: userData?.department,
// //                         icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
// //                       },
// //                       {
// //                         label: "Location",
// //                         value: userData?.location?.name,
// //                         icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
// //                       },
// //                       {
// //                         label: "Site",
// //                         value: userData?.site?.name,
// //                         icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
// //                       },
// //                       {
// //                         label: "Note",
// //                         value: userData?.note,
// //                         icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
// //                         fullWidth: true,
// //                       },
// //                     ].map((item, index) => (
// //                       <div
// //                         key={index}
// //                         className={`bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow ${
// //                           item.fullWidth ? "sm:col-span-2 lg:col-span-3" : ""
// //                         }`}
// //                       >
// //                         <div className="flex items-start gap-2">
// //                           <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
// //                             <svg
// //                               className="w-3.5 h-3.5 text-blue-600"
// //                               fill="none"
// //                               stroke="currentColor"
// //                               viewBox="0 0 24 24"
// //                             >
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d={item.icon}
// //                               />
// //                             </svg>
// //                           </div>
// //                           <div className="flex-1 min-w-0">
// //                             <p className="text-xs text-gray-500 font-medium mb-0.5">
// //                               {item.label}
// //                             </p>
// //                             <p className="text-xs sm:text-sm text-gray-900 font-medium truncate">
// //                               {item.value || (
// //                                 <span className="text-gray-400">
// //                                   Not specified
// //                                 </span>
// //                               )}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               {/* Assigned Assets Card */}
// //               <motion.div
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.2 }}
// //                 className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
// //               >
// //                 <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-indigo-100">
// //                   <div className="flex items-center justify-between">
// //                     <h3 className="text-sm sm:text-base font-semibold text-indigo-900 flex items-center gap-2">
// //                       <svg
// //                         className="w-4 h-4"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
// //                         />
// //                       </svg>
// //                       Assigned Assets
// //                     </h3>
// //                     <span className="px-2.5 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
// //                       {assignedAssets.length}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="p-4">
// //                   {assetsLoading ? (
// //                     <div className="flex items-center justify-center py-12">
// //                       <div className="text-center">
// //                         <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
// //                         <p className="text-xs text-gray-500">
// //                           Loading assets...
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ) : assignedAssets.length > 0 ? (
// //                     <div className="space-y-3">
// //                       {assignedAssets.map((asset, index) => {
// //                         const isAdmin = userData?.role === "ADMIN";
// //                         return (
// //                           <motion.div
// //                             key={asset.assetTag || index}
// //                             initial={{ opacity: 0, x: -10 }}
// //                             animate={{ opacity: 1, x: 0 }}
// //                             transition={{ delay: index * 0.05 }}
// //                             onClick={() => {
// //                               if (isAdmin) {
// //                                 navigate(`/asset/${asset.assetTag}`);
// //                               }
// //                             }}
// //                             className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
// //                               isAdmin
// //                                 ? "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200 hover:border-blue-400 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
// //                                 : "bg-gradient-to-br from-gray-50 to-white border-gray-200 cursor-default"
// //                             }`}
// //                           >
// //                             {/* Asset Type Badge */}
// //                             <div className="absolute top-2 right-2">
// //                               <span
// //                                 className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
// //                                   asset.assetType === "CUG_SIM"
// //                                     ? "bg-green-500 text-white"
// //                                     : "bg-blue-500 text-white"
// //                                 }`}
// //                               >
// //                                 {asset.assetType === "CUG_SIM" ? "SIM" : "HW"}
// //                               </span>
// //                             </div>

// //                             <div className="pr-16">
// //                               {/* Asset Tag */}
// //                               <div className="flex items-center gap-2 mb-2">
// //                                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
// //                                   <svg
// //                                     className="w-4 h-4 text-blue-600"
// //                                     fill="none"
// //                                     stroke="currentColor"
// //                                     viewBox="0 0 24 24"
// //                                   >
// //                                     <path
// //                                       strokeLinecap="round"
// //                                       strokeLinejoin="round"
// //                                       strokeWidth={2}
// //                                       d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
// //                                     />
// //                                   </svg>
// //                                 </div>
// //                                 <h4 className="text-sm sm:text-base font-bold text-gray-900 truncate">
// //                                   {asset.assetTag}
// //                                 </h4>
// //                               </div>

// //                               {/* Asset Name */}
// //                               <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 truncate">
// //                                 {asset.name}
// //                               </p>

// //                               {/* Identifier */}
// //                               <p className="text-xs text-gray-600 font-mono mb-2 truncate bg-gray-100 px-2 py-1 rounded">
// //                                 {asset.identifier}
// //                               </p>

// //                               {/* Provider/Brand */}
// //                               {asset.providerOrBrand && (
// //                                 <p className="text-xs text-gray-500 mb-2">
// //                                   {asset.providerOrBrand}
// //                                 </p>
// //                               )}

// //                               {/* Tags Row */}
// //                               <div className="flex flex-wrap gap-1.5 mb-2">
// //                                 {asset.locationName && (
// //                                   <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
// //                                     <svg
// //                                       className="w-3 h-3"
// //                                       fill="none"
// //                                       stroke="currentColor"
// //                                       viewBox="0 0 24 24"
// //                                     >
// //                                       <path
// //                                         strokeLinecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth={2}
// //                                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
// //                                       />
// //                                     </svg>
// //                                     {asset.locationName}
// //                                   </span>
// //                                 )}
// //                                 {asset.siteName && (
// //                                   <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
// //                                     <svg
// //                                       className="w-3 h-3"
// //                                       fill="none"
// //                                       stroke="currentColor"
// //                                       viewBox="0 0 24 24"
// //                                     >
// //                                       <path
// //                                         strokeLinecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth={2}
// //                                         d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
// //                                       />
// //                                     </svg>
// //                                     {asset.siteName}
// //                                   </span>
// //                                 )}
// //                                 <span
// //                                   className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
// //                                     asset.status === "ASSIGNED"
// //                                       ? "bg-green-500 text-white"
// //                                       : asset.status === "CHECKED_OUT"
// //                                       ? "bg-yellow-500 text-white"
// //                                       : "bg-gray-500 text-white"
// //                                   }`}
// //                                 >
// //                                   <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
// //                                   {asset.status}
// //                                 </span>
// //                               </div>

// //                               {/* Note */}
// //                               {asset.note && (
// //                                 <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
// //                                   <p className="text-xs text-amber-900 line-clamp-2">
// //                                     <span className="font-semibold">Note:</span>{" "}
// //                                     {asset.note}
// //                                   </p>
// //                                 </div>
// //                               )}
// //                             </div>

// //                             {/* Admin indicator */}
// //                             {isAdmin && (
// //                               <div className="absolute bottom-2 right-2">
// //                                 <svg
// //                                   className="w-4 h-4 text-blue-400"
// //                                   fill="none"
// //                                   stroke="currentColor"
// //                                   viewBox="0 0 24 24"
// //                                 >
// //                                   <path
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                     strokeWidth={2}
// //                                     d="M9 5l7 7-7 7"
// //                                   />
// //                                 </svg>
// //                               </div>
// //                             )}
// //                           </motion.div>
// //                         );
// //                       })}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
// //                         <svg
// //                           className="w-8 h-8 text-gray-400"
// //                           fill="none"
// //                           stroke="currentColor"
// //                           viewBox="0 0 24 24"
// //                         >
// //                           <path
// //                             strokeLinecap="round"
// //                             strokeLinejoin="round"
// //                             strokeWidth={2}
// //                             d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
// //                           />
// //                         </svg>
// //                       </div>
// //                       <p className="text-sm font-semibold text-gray-900 mb-1">
// //                         No Assets Assigned
// //                       </p>
// //                       <p className="text-xs text-gray-500">
// //                         This user currently has no hardware or SIM cards
// //                         assigned.
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </motion.div>
// //             </div>
// //           ) : (
// //             <div className="flex items-center justify-center py-20">
// //               <div className="text-center">
// //                 <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
// //                   <svg
// //                     className="w-8 h-8 text-gray-400"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// //                     />
// //                   </svg>
// //                 </div>
// //                 <p className="text-sm text-gray-500">No user found</p>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Footer */}
// //         <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
// //           <button
// //             onClick={onClose}
// //             className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default UserDetailsModal;
// import { searchEmployees, getAssetsByUser } from "../services/api";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UserDetailsModal = ({
//   query,
//   isOpen,
//   onClose,
//   searchEmployees,
//   getAssetsByUser,
// }) => {
//   const [userData, setUserData] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(false);
//   const [assetsLoading, setAssetsLoading] = useState(false);
//   const [assignedAssets, setAssignedAssets] = useState([]);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isOpen || !query?.trim()) {
//       setUserData(null);
//       setAssignedAssets([]);
//       return;
//     }

//     const fetchUser = async () => {
//       setLoadingUser(true);
//       setError(null);
//       try {
//         const data = await searchEmployees(query);
//         const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
//         setUserData(user);

//         setAssetsLoading(true);
//         try {
//           const assets = await getAssetsByUser(query);
//           setAssignedAssets(assets || []);
//         } catch (err) {
//           console.error("Failed to fetch assets", err);
//           setAssignedAssets([]);
//         } finally {
//           setAssetsLoading(false);
//         }
//       } catch (err) {
//         setError("Failed to fetch user data");
//       } finally {
//         setLoadingUser(false);
//       }
//     };

//     fetchUser();
//   }, [query, isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.95, y: 20 }}
//         transition={{ duration: 0.2 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
//               <svg
//                 className="w-4 h-4 sm:w-5 sm:h-5 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-base sm:text-lg font-semibold text-white">
//               User Profile
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors text-white text-xl sm:text-2xl font-light"
//           >
//             ×
//           </button>
//         </div>

//         {/* Body - Scrollable */}
//         <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
//           {loadingUser ? (
//             <div className="flex items-center justify-center py-16 sm:py-20">
//               <div className="text-center">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
//                 <p className="text-xs sm:text-sm text-gray-500">
//                   Loading user details...
//                 </p>
//               </div>
//             </div>
//           ) : error ? (
//             <div className="flex items-center justify-center py-16 sm:py-20">
//               <div className="text-center">
//                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <svg
//                     className="w-6 h-6 sm:w-7 sm:h-7 text-red-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-xs sm:text-sm text-red-600">{error}</p>
//               </div>
//             </div>
//           ) : userData ? (
//             <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
//               {/* User Info Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
//               >
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-blue-100">
//                   <h3 className="text-sm sm:text-base font-semibold text-blue-900 flex items-center gap-2">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     Personal Information
//                   </h3>
//                 </div>
//                 <div className="p-4">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                     {[
//                       {
//                         label: "Username",
//                         value: userData?.username,
//                         icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
//                       },
//                       {
//                         label: "Employee ID",
//                         value: userData?.employeeId,
//                         icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
//                       },
//                       {
//                         label: "Role",
//                         value: userData?.role,
//                         icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
//                       },
//                       {
//                         label: "Phone",
//                         value: userData?.phoneNumber,
//                         icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
//                       },
//                       {
//                         label: "Email",
//                         value: userData?.email,
//                         icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//                       },
//                       {
//                         label: "Department",
//                         value: userData?.department,
//                         icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
//                       },
//                       {
//                         label: "Location",
//                         value: userData?.location?.name,
//                         icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
//                       },
//                       {
//                         label: "Site",
//                         value: userData?.site?.name,
//                         icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
//                       },
//                       {
//                         label: "Note",
//                         value: userData?.note,
//                         icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
//                         fullWidth: true,
//                       },
//                     ].map((item, index) => (
//                       <div
//                         key={index}
//                         className={`bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow ${
//                           item.fullWidth ? "sm:col-span-2 lg:col-span-3" : ""
//                         }`}
//                       >
//                         <div className="flex items-start gap-2">
//                           <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                             <svg
//                               className="w-3.5 h-3.5 text-blue-600"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d={item.icon}
//                               />
//                             </svg>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs text-gray-500 font-medium mb-0.5">
//                               {item.label}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-900 font-medium truncate">
//                               {item.value || (
//                                 <span className="text-gray-400">
//                                   Not specified
//                                 </span>
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Assigned Assets Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
//               >
//                 <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-indigo-100">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-sm sm:text-base font-semibold text-indigo-900 flex items-center gap-2">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                         />
//                       </svg>
//                       Assigned Assets
//                     </h3>
//                     <span className="px-2.5 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
//                       {assignedAssets.length}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   {assetsLoading ? (
//                     <div className="flex items-center justify-center py-12">
//                       <div className="text-center">
//                         <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//                         <p className="text-xs text-gray-500">
//                           Loading assets...
//                         </p>
//                       </div>
//                     </div>
//                   ) : assignedAssets.length > 0 ? (
//                     <div className="space-y-3">
//                       {assignedAssets.map((asset, index) => {
//                         const isAdmin = userData?.role === "ADMIN";
//                         return (
//                           <motion.div
//                             key={asset.assetTag || index}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.05 }}
//                             onClick={() => {
//                               if (isAdmin) {
//                                 navigate(`/asset/${asset.assetTag}`);
//                               }
//                             }}
//                             className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
//                               isAdmin
//                                 ? "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200 hover:border-blue-400 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
//                                 : "bg-gradient-to-br from-gray-50 to-white border-gray-200 cursor-default"
//                             }`}
//                           >
//                             {/* Asset Type Badge */}
//                             <div className="absolute top-2 right-2">
//                               <span
//                                 className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
//                                   asset.assetType === "CUG_SIM"
//                                     ? "bg-green-500 text-white"
//                                     : "bg-blue-500 text-white"
//                                 }`}
//                               >
//                                 {asset.assetType === "CUG_SIM" ? "SIM" : "HW"}
//                               </span>
//                             </div>

//                             <div className="pr-16">
//                               {/* Asset Tag */}
//                               <div className="flex items-center gap-2 mb-2">
//                                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                                   <svg
//                                     className="w-4 h-4 text-blue-600"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       strokeWidth={2}
//                                       d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
//                                     />
//                                   </svg>
//                                 </div>
//                                 <h4 className="text-sm sm:text-base font-bold text-gray-900 truncate">
//                                   {asset.assetTag}
//                                 </h4>
//                               </div>

//                               {/* Asset Name */}
//                               <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 truncate">
//                                 {asset.name}
//                               </p>

//                               {/* Identifier */}
//                               <p className="text-xs text-gray-600 font-mono mb-2 truncate bg-gray-100 px-2 py-1 rounded">
//                                 {asset.identifier}
//                               </p>

//                               {/* Provider/Brand */}
//                               {asset.providerOrBrand && (
//                                 <p className="text-xs text-gray-500 mb-2">
//                                   {asset.providerOrBrand}
//                                 </p>
//                               )}

//                               {/* Tags Row */}
//                               <div className="flex flex-wrap gap-1.5 mb-2">
//                                 {asset.locationName && (
//                                   <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                                     <svg
//                                       className="w-3 h-3"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       viewBox="0 0 24 24"
//                                     >
//                                       <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                                       />
//                                     </svg>
//                                     {asset.locationName}
//                                   </span>
//                                 )}
//                                 {asset.siteName && (
//                                   <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                                     <svg
//                                       className="w-3 h-3"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       viewBox="0 0 24 24"
//                                     >
//                                       <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                                       />
//                                     </svg>
//                                     {asset.siteName}
//                                   </span>
//                                 )}
//                                 <span
//                                   className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
//                                     asset.status === "ASSIGNED"
//                                       ? "bg-green-500 text-white"
//                                       : asset.status === "CHECKED_OUT"
//                                       ? "bg-yellow-500 text-white"
//                                       : "bg-gray-500 text-white"
//                                   }`}
//                                 >
//                                   <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
//                                   {asset.status}
//                                 </span>
//                               </div>

//                               {/* Note */}
//                               {asset.note && (
//                                 <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
//                                   <p className="text-xs text-amber-900 line-clamp-2">
//                                     <span className="font-semibold">Note:</span>{" "}
//                                     {asset.note}
//                                   </p>
//                                 </div>
//                               )}
//                             </div>

//                             {/* Admin indicator */}
//                             {isAdmin && (
//                               <div className="absolute bottom-2 right-2">
//                                 <svg
//                                   className="w-4 h-4 text-blue-400"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M9 5l7 7-7 7"
//                                   />
//                                 </svg>
//                               </div>
//                             )}
//                           </motion.div>
//                         );
//                       })}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
//                         <svg
//                           className="w-8 h-8 text-gray-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//                           />
//                         </svg>
//                       </div>
//                       <p className="text-sm font-semibold text-gray-900 mb-1">
//                         No Assets Assigned
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         This user currently has no hardware or SIM cards
//                         assigned.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center py-20">
//               <div className="text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                   <svg
//                     className="w-8 h-8 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-sm text-gray-500">No user found</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default UserDetailsModal;

import { searchEmployees, getAssetsByUser } from "../services/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetailsModal = ({ query, isOpen, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || !query?.trim()) {
      setUserData(null);
      setAssignedAssets([]);
      return;
    }

    const fetchUser = async () => {
      setLoadingUser(true);
      setError(null);
      try {
        const data = await searchEmployees(query);
        const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
        setUserData(user);

        setAssetsLoading(true);
        try {
          const assets = await getAssetsByUser(query);
          setAssignedAssets(assets || []);
        } catch (err) {
          console.error("Failed to fetch assets", err);
          setAssignedAssets([]);
        } finally {
          setAssetsLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[96vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0">
          <h2 className="text-sm sm:text-base font-semibold text-white">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-red-200 w-7 h-7 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Body - Split Layout */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {loadingUser ? (
            <div className="flex items-center justify-center w-full py-16">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs text-gray-500">Loading...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center w-full py-16">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          ) : userData ? (
            <>
              {/* LEFT SIDE - User Details */}
              <div className="w-full lg:w-2/5 border-r border-gray-200 overflow-y-auto bg-gray-50">
                <div className="p-3 sm:p-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                    <h3 className="text-xs font-bold text-blue-700 mb-3 pb-2 border-b">
                      PERSONAL INFORMATION
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Username</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.username || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Employee ID</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.employeeId || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Role</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.role || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.phoneNumber || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.department || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.location?.name || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Site</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.site?.name || "N/A"}
                          </p>
                        </div>
                      </div>

                      {userData?.note && (
                        <div className="flex items-start gap-2 pt-2 border-t">
                          <svg
                            className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500">Note</p>
                            <p className="text-xs font-semibold text-gray-900">
                              {userData.note}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Assigned Assets */}
              <div className="w-full lg:w-3/5 overflow-y-auto bg-white">
                <div className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b">
                    <h3 className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      ASSIGNED ASSETS
                    </h3>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                      {assignedAssets.length}
                    </span>
                  </div>

                  {assetsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-xs text-gray-500">
                          Loading assets...
                        </p>
                      </div>
                    </div>
                  ) : assignedAssets.length > 0 ? (
                    <div className="space-y-2.5">
                      {assignedAssets.map((asset, index) => {
                        const isAdmin = userData?.role === "ADMIN";
                        return (
                          <motion.div
                            key={asset.assetTag || index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              if (isAdmin) {
                                navigate(`/asset/${asset.assetTag}`);
                              }
                            }}
                            className={`relative border rounded-lg p-2.5 transition-all ${
                              isAdmin
                                ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 hover:border-blue-500 hover:shadow-md cursor-pointer"
                                : "bg-gray-50 border-gray-300 cursor-default"
                            }`}
                          >
                            {/* Top Row: Type Badge + Asset Tag */}
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-xs font-bold flex-shrink-0 ${
                                    asset.assetType === "CUG_SIM"
                                      ? "bg-green-500 text-white"
                                      : "bg-blue-500 text-white"
                                  }`}
                                >
                                  {asset.assetType === "CUG_SIM" ? "SIM" : "HW"}
                                </span>
                                <h4 className="text-xs font-bold text-gray-900 truncate">
                                  {asset.assetTag}
                                </h4>
                              </div>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${
                                  asset.status === "ASSIGNED"
                                    ? "bg-green-500 text-white"
                                    : asset.status === "CHECKED_OUT"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-gray-500 text-white"
                                }`}
                              >
                                {asset.status}
                              </span>
                            </div>

                            {/* Asset Name */}
                            <p className="text-xs font-semibold text-gray-800 mb-1 truncate">
                              {asset.name}
                            </p>

                            {/* Identifier */}
                            <p className="text-xs text-gray-600 font-mono mb-1.5 truncate bg-gray-100 px-1.5 py-0.5 rounded">
                              {asset.identifier}
                            </p>

                            {/* Provider/Brand */}
                            {asset.providerOrBrand && (
                              <p className="text-xs text-gray-500 mb-1.5">
                                {asset.providerOrBrand}
                              </p>
                            )}

                            {/* Location & Site Tags */}
                            <div className="flex flex-wrap gap-1 mb-1.5">
                              {asset.locationName && (
                                <span className="inline-flex items-center gap-0.5 bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full text-xs">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                  </svg>
                                  <span className="text-xs">
                                    {asset.locationName}
                                  </span>
                                </span>
                              )}
                              {asset.siteName && (
                                <span className="inline-flex items-center gap-0.5 bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full text-xs">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                  <span className="text-xs">
                                    {asset.siteName}
                                  </span>
                                </span>
                              )}
                            </div>

                            {/* Note */}
                            {asset.note && (
                              <div className="mt-1.5 p-1.5 bg-amber-50 border border-amber-200 rounded">
                                <p className="text-xs text-amber-900 line-clamp-2">
                                  <span className="font-semibold">Note:</span>{" "}
                                  {asset.note}
                                </p>
                              </div>
                            )}

                            {/* Admin Click Indicator */}
                            {isAdmin && (
                              <div className="absolute bottom-1.5 right-1.5">
                                <svg
                                  className="w-3 h-3 text-blue-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
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
                      </div>
                      <p className="text-xs font-semibold text-gray-900 mb-1">
                        No Assets Assigned
                      </p>
                      <p className="text-xs text-gray-500">
                        This user has no hardware or SIM cards.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full py-16">
              <p className="text-xs text-gray-500">No user found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-100 border-t flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsModal;
