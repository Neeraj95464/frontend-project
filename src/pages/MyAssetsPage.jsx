// import { useAuth } from "../components/AuthContext";
// import {
//   getMyAssets,
//   reportAssetIssue,
//   resendAcknowledgement,
// } from "../services/api";
// import React, { useEffect, useState } from "react";

// const MyAssetsPage = () => {
//   const { user } = useAuth();
//   const [myAssets, setMyAssets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [reporting, setReporting] = useState(null);
//   const [resending, setResending] = useState(null);

//   useEffect(() => {
//     const loadAssets = async () => {
//       try {
//         setLoading(true);
//         const data = await getMyAssets();
//         // console.log(Array.isArray(data) ? data : []);
//         setMyAssets(Array.isArray(data) ? data : []);
//         // console.log("data are ", Array.isArray(data) ? data : []);
//       } catch (err) {
//         setError("Unable to load your assets.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAssets();
//   }, []);

//   const handleReport = async (asset) => {
//     const reason = window.prompt(
//       `Reporting asset ${asset.assetTag}\nEnter reason:`,
//       "This asset is wrongly mapped.",
//     );

//     if (!reason) return;

//     try {
//       setReporting(asset.assetTag);

//       await reportAssetIssue({
//         assetTag: asset.assetTag,
//         assetType: asset.assetType,
//         description: reason,
//       });

//       alert("Ticket raised successfully.");
//     } catch {
//       alert("Failed to raise ticket.");
//     } finally {
//       setReporting(null);
//     }
//   };



// const handleResend = async (assignmentId, assetType) => {
//   if (!assignmentId) return;

//   try {
//     setResending(assignmentId);

//     await resendAcknowledgement(assignmentId, assetType);

//     alert("Acknowledgement email resent successfully.");
//   } catch {
//     alert("Failed to resend acknowledgement.");
//   } finally {
//     setResending(null);
//   }
// };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "ACCEPTED":
//         return "bg-green-100 text-green-700";
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";
//       case "REJECTED":
//         return "bg-red-100 text-red-700";
//       case "UAP":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     // <div className="p-6 lg:ml-64 pt-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      
//       <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-blue-700">
//               My Assigned Assets
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Devices currently mapped to your profile.
//             </p>
//           </div>

//           {user && (
//             <div className="text-sm text-right bg-gray-50 px-4 py-2 rounded-xl border">
//               <p className="text-gray-500">Logged in as</p>
//               <p className="font-semibold text-gray-800">{user.username}</p>
//             </div>
//           )}
//         </div>

//         {loading && (
//           <p className="text-gray-500 text-sm animate-pulse">
//             Loading assets...
//           </p>
//         )}

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         {!loading && myAssets.length === 0 && (
//           <p className="text-gray-500 text-sm">No assets assigned.</p>
//         )}

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {myAssets.map((asset) => (
//             <div
//               key={asset.assetTag}
//               className="rounded-2xl border border-gray-200 p-6 bg-white 
//                          hover:shadow-xl transition duration-300 flex flex-col justify-between"
//             >
//               <div>
//                 <div className="flex justify-between items-center mb-3">
//                   <h2 className="font-semibold text-lg text-gray-800">
//                     {asset.assetType}
//                   </h2>

//                   {asset.assignmentStatus && (
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
//                         asset.assignmentStatus,
//                       )}`}
//                     >
//                       {asset.assignmentStatus}
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-sm text-gray-600">
//                   Tag: <b>{asset.assetTag}</b>
//                 </p>

//                 {asset.identifier && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     Identifier: {asset.identifier}
//                   </p>
//                 )}

//                 {(asset.locationName || asset.siteName) && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     {asset.locationName} • {asset.siteName}
//                   </p>
//                 )}
//               </div>

//               <div className="mt-5 space-y-2">
//                 {/* Report Button */}
//                 <button
//                   disabled={reporting === asset.assetTag}
//                   onClick={() => handleReport(asset)}
//                   className="w-full text-xs font-semibold py-2 rounded-xl
//                     border border-red-500 text-red-600 hover:bg-red-50
//                     transition disabled:opacity-50"
//                 >
//                   {reporting === asset.assetTag
//                     ? "Reporting..."
//                     : "Report Issue"}
//                 </button>

//                 {/* Resend Button */}
//                 {asset.assignmentStatus === "ACCEPTED" ? (
//                   <button
//                     disabled
//                     className="w-full text-xs font-semibold py-2 rounded-xl
//                       border border-gray-300 text-gray-400 cursor-not-allowed"
//                   >
//                     Acknowledged
//                   </button>
//                 ) : asset.assignmentId ? (
//                   <button
//                     disabled={resending === asset.assignmentId}
//                     // onClick={() => handleResend(asset.assignmentId)}
//                     onClick={() => handleResend(asset.assignmentId, asset.assetType)}
//                     className="w-full text-xs font-semibold py-2 rounded-xl
//                       border border-blue-500 text-blue-600 hover:bg-blue-50
//                       transition disabled:opacity-50"
//                   >
//                     {resending === asset.assignmentId
//                       ? "Resending..."
//                       : "Resend Acknowledgement"}
//                   </button>
//                 ) : null}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAssetsPage;



import { useAuth } from "../components/AuthContext";
import {
  getMyAssets,
  reportAssetIssue,
  resendAcknowledgement,
  employeeItemApi,
} from "../services/api";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MyAssetsPage = () => {
  const { user } = useAuth();
  const [itAssets, setItAssets] = useState([]);
  const [hrAssets, setHrAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reporting, setReporting] = useState(null);
  const [resending, setResending] = useState(null);
  const [activeTab, setActiveTab] = useState("it");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const data = await getMyAssets();
        const assetsArray = Array.isArray(data) ? data : [];
        
        const it = assetsArray.filter(asset => 
          !asset.assetType?.startsWith("HR_ITEM_")
        );
        const hr = assetsArray.filter(asset => 
          asset.assetType?.startsWith("HR_ITEM_")
        );
        
        setItAssets(it);
        setHrAssets(hr);
      } catch (err) {
        setError("Unable to load your assets.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleReport = async (asset) => {
    const reason = window.prompt(
      `Reporting ${asset.assetType}\nAsset: ${asset.assetTag}\nEnter reason:`,
      "This asset is wrongly mapped."
    );

    if (!reason) return;

    try {
      setReporting(asset.assetTag);

      await reportAssetIssue({
        assetTag: asset.assetTag,
        assetType: asset.assetType,
        description: reason,
      });

      alert("Ticket raised successfully.");
    } catch {
      alert("Failed to raise ticket.");
    } finally {
      setReporting(null);
    }
  };

  const handleResend = async (assignmentId, assetType) => {
    if (!assignmentId) return;

    try {
      setResending(assignmentId);

      if (assetType?.startsWith("HR_ITEM_")) {
        await employeeItemApi.resendAcknowledgment(assignmentId);
      } else {
        await resendAcknowledgement(assignmentId, assetType);
      }

      alert("Acknowledgement email resent successfully.");
    } catch {
      alert("Failed to resend acknowledgement.");
    } finally {
      setResending(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACKNOWLEDGED":
      case "ACCEPTED":
        return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" };
      case "PENDING_ACKNOWLEDGEMENT":
      case "PENDING":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" };
      case "REJECTED":
        return { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400" };
    }
  };

  const getStatusDisplayText = (status) => {
    if (status === "PENDING_ACKNOWLEDGEMENT") return "Pending";
    if (status === "ACKNOWLEDGED") return "Accepted";
    return status || "Pending";
  };

  const getAssetTypeDisplay = (assetType) => {
    if (assetType?.startsWith("HR_ITEM_")) {
      return assetType.replace("HR_ITEM_", "").replace("_", " ");
    }
    return assetType;
  };

  const getAssetIcon = (assetType) => {
    if (assetType?.startsWith("HR_ITEM_")) {
      if (assetType.includes("ID_CARD")) return "🪪";
      if (assetType.includes("APPOINTMENT_LETTER")) return "📄";
      if (assetType.includes("DRESS")) return "👔";
      return "📋";
    }
    
    const type = assetType?.toLowerCase() || "";
    if (type.includes("laptop")) return "💻";
    if (type.includes("desktop")) return "🖥️";
    if (type.includes("monitor")) return "🖥️";
    if (type.includes("sim")) return "📱";
    if (type.includes("phone")) return "📱";
    return "🔧";
  };

  const getFilteredAssets = () => {
    const assets = activeTab === "it" ? itAssets : activeTab === "hr" ? hrAssets : [...itAssets, ...hrAssets];
    if (!searchTerm) return assets;
    return assets.filter(asset => 
      asset.assetTag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.identifier?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const AssetCard = ({ asset, index }) => {
    const isHrAsset = asset.assetType?.startsWith("HR_ITEM_");
    const status = getStatusDisplayText(asset.assignmentStatus);
    const statusStyle = getStatusStyle(asset.assignmentStatus);
    const icon = getAssetIcon(asset.assetType);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" />
        
        <div className="relative bg-white rounded-2xl m-px p-5">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {getAssetTypeDisplay(asset.assetType)}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isHrAsset ? "Item ID" : "Asset Tag"}: {asset.assetTag}
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                <span className="text-xs font-semibold">{status}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            {asset.identifier && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span className="text-gray-600">{asset.identifier}</span>
              </div>
            )}
            
            {asset.additionalInfo && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-500 text-xs">{asset.additionalInfo}</span>
              </div>
            )}

            {asset.issueDate && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-500 text-xs">
                  {new Date(asset.issueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => {
                setSelectedAsset(asset);
                setShowDetailsModal(true);
              }}
              className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              View Details
            </button>
            <button
              disabled={reporting === asset.assetTag}
              onClick={() => handleReport(asset)}
              className="flex-1 py-2 rounded-xl text-sm font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
            >
              {reporting === asset.assetTag ? "..." : "Report"}
            </button>
          </div>

          {(asset.assignmentStatus === "PENDING" || asset.assignmentStatus === "PENDING_ACKNOWLEDGEMENT") && asset.assignmentId && (
            <button
              disabled={resending === asset.assignmentId}
              onClick={() => handleResend(asset.assignmentId, asset.assetType)}
              className="w-full mt-2 py-2 rounded-xl text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              {resending === asset.assignmentId ? "Resending..." : "Resend Acknowledgment"}
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  const filteredAssets = getFilteredAssets();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="relative lg:ml-48 p-4 md:p-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">My Assets</h1>
                {/* <p className="text-blue-100 text-sm md:text-base">
                  Manage and track all your assigned devices and items
                </p> */}
              </div>
              {user && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-xs text-blue-100">Logged in as</p>
                  <p className="font-semibold text-sm">{user.username}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold text-gray-800">{itAssets.length + hrAssets.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">IT Assets</p>
                <p className="text-2xl font-bold text-gray-800">{itAssets.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7h14M5 17h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">HR Assets</p>
                <p className="text-2xl font-bold text-gray-800">{hrAssets.length}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Pending Actions</p>
                <p className="text-2xl font-bold text-amber-600">
                  {[...itAssets, ...hrAssets].filter(a => 
                    a.assignmentStatus === "PENDING" || a.assignmentStatus === "PENDING_ACKNOWLEDGEMENT"
                  ).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div> */}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by asset tag, type, or identifier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("it")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "it" 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7h14M5 17h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
            </svg>
            IT Assets ({itAssets.length})
          </button>
          <button
            onClick={() => setActiveTab("hr")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "hr" 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            HR Assets ({hrAssets.length})
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "all" 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            All Assets ({itAssets.length + hrAssets.length})
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-gray-500">Loading your assets...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
            <div className="text-rose-600 mb-2">⚠️ {error}</div>
            <button onClick={() => window.location.reload()} className="text-rose-700 underline text-sm">
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAssets.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No assets found</h3>
            <p className="text-gray-500 text-sm">
              {searchTerm ? "No assets match your search criteria" : "No assets have been assigned to you yet"}
            </p>
          </div>
        )}

        {/* Assets Grid */}
        {!loading && filteredAssets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAssets.map((asset, index) => (
                <AssetCard key={asset.assetTag} asset={asset} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedAsset && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailsModal(false)}>
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Asset Details</h3>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase">Asset Type</label>
                  <p className="font-medium text-gray-800">{getAssetTypeDisplay(selectedAsset.assetType)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">{selectedAsset.assetType?.startsWith("HR_ITEM_") ? "Item ID" : "Asset Tag"}</label>
                  <p className="font-mono text-sm text-gray-800">{selectedAsset.assetTag}</p>
                </div>
                {selectedAsset.identifier && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Identifier</label>
                    <p className="text-gray-800">{selectedAsset.identifier}</p>
                  </div>
                )}
                {selectedAsset.issueDate && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Issue Date</label>
                    <p className="text-gray-800">{new Date(selectedAsset.issueDate).toLocaleDateString()}</p>
                  </div>
                )}
                {selectedAsset.issueBy && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Issued By</label>
                    <p className="text-gray-800">{selectedAsset.issueBy}</p>
                  </div>
                )}
                {selectedAsset.locationName && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Location</label>
                    <p className="text-gray-800">{selectedAsset.locationName}</p>
                  </div>
                )}
                {selectedAsset.notes && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Notes</label>
                    <p className="text-gray-600 text-sm">{selectedAsset.notes}</p>
                  </div>
                )}
                {selectedAsset.additionalInfo && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Additional Info</label>
                    <p className="text-gray-600 text-sm">{selectedAsset.additionalInfo}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs text-gray-500 uppercase">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(selectedAsset.assignmentStatus).bg} ${getStatusStyle(selectedAsset.assignmentStatus).text}`}>
                      {getStatusDisplayText(selectedAsset.assignmentStatus)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssetsPage;
