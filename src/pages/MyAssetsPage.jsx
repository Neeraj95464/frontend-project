// import { useAuth } from "../components/AuthContext";
// import { getMyAssets, reportAssetIssue } from "../services/api";
// import React, { useEffect, useState } from "react";

// const MyAssetsPage = () => {
//   const { user } = useAuth();
//   const [myAssets, setMyAssets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [reporting, setReporting] = useState(null);

//   useEffect(() => {
//     const loadAssets = async () => {
//       try {
//         setLoading(true);
//         const data = await getMyAssets();
//         setMyAssets(Array.isArray(data) ? data : []);
//       } catch {
//         setError("Unable to load your assets.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadAssets();
//   }, []);

//   const handleReport = async (asset) => {
//     const reason = window.prompt(
//       `You are reporting asset ${asset.assetTag}.\n\n` +
//         "Example:\n- This asset is not mine\n- Wrong mapping / duplicate\n- Lost / damaged\n\nPlease enter brief reason:",
//       "This asset is not mine / wrongly mapped to my ID."
//     );
//     if (!reason) return;

//     if (!window.confirm(`Raise ticket for asset ${asset.assetTag}?`)) return;

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

//   return (
//     <div className="p-6 lg:ml-64 pt-20">
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-blue-700">
//               My IT Assets
//             </h1>
//             <p className="text-sm text-gray-500">
//               Devices and SIMs currently mapped to your account.
//             </p>
//             <p className="mt-1 text-xs text-gray-400">
//               All assigned assets are covered under the Mahavir IT Asset Policy.
//               If any asset is not yours, or has an issue, use the report button
//               below.
//             </p>
//           </div>

//           {user && (
//             <div className="text-sm text-right">
//               <p className="text-gray-500">User</p>
//               <p className="font-medium text-gray-800">
//                 {user.username} ({user.role})
//               </p>
//             </div>
//           )}
//         </div>

//         {loading && <p className="text-sm text-gray-500">Loading assets…</p>}
//         {error && <p className="text-sm text-red-600">{error}</p>}

//         {!loading && myAssets.length === 0 && (
//           <p className="text-sm text-gray-500">No assets assigned.</p>
//         )}

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
//           {myAssets.map((asset) => (
//             <div
//               key={asset.assetTag}
//               className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-md transition"
//             >
//               <div className="flex justify-between mb-2">
//                 <p className="font-semibold text-gray-800">
//                   {asset.assetType} ({asset.assetTag})
//                 </p>
//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
//                   {asset.status}
//                 </span>
//               </div>

//               {asset.identifier && (
//                 <p className="text-xs text-gray-600">
//                   Identifier: <b>{asset.identifier}</b>
//                 </p>
//               )}

//               {asset.providerOrBrand && (
//                 <p className="text-xs text-gray-600">
//                   Brand / Provider: <b>{asset.providerOrBrand}</b>
//                 </p>
//               )}

//               {(asset.locationName || asset.siteName) && (
//                 <p className="text-xs text-gray-600 mt-1">
//                   {asset.locationName}{" "}
//                   {asset.locationName && asset.siteName && "•"} {asset.siteName}
//                 </p>
//               )}

//               {asset.note && (
//                 <p className="text-[11px] text-gray-500 mt-1 line-clamp-3">
//                   {asset.note}
//                 </p>
//               )}

//               <button
//                 disabled={reporting === asset.assetTag}
//                 onClick={() => handleReport(asset)}
//                 className="mt-4 w-full text-xs font-semibold py-2 rounded-lg
//                            border border-red-500 text-red-600 hover:bg-red-50
//                            transition disabled:opacity-50"
//               >
//                 {reporting === asset.assetTag
//                   ? "Reporting..."
//                   : "Report: Not My Asset / Issue"}
//               </button>
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
} from "../services/api";
import React, { useEffect, useState } from "react";

const MyAssetsPage = () => {
  const { user } = useAuth();
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reporting, setReporting] = useState(null);
  const [resending, setResending] = useState(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const data = await getMyAssets();
        setMyAssets(Array.isArray(data) ? data : []);
        console.log("data are ", Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Unable to load your assets.");
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleReport = async (asset) => {
    const reason = window.prompt(
      `Reporting asset ${asset.assetTag}\nEnter reason:`,
      "This asset is wrongly mapped.",
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

  const handleResend = async (assignmentId) => {
    if (!assignmentId) return;

    try {
      setResending(assignmentId);

      await resendAcknowledgement(assignmentId);

      alert("Acknowledgement email resent successfully.");
    } catch (err) {
      alert("Failed to resend acknowledgement.");
    } finally {
      setResending(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "UAP":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 lg:ml-64 pt-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              My Assigned Assets
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Devices currently mapped to your profile.
            </p>
          </div>

          {user && (
            <div className="text-sm text-right bg-gray-50 px-4 py-2 rounded-xl border">
              <p className="text-gray-500">Logged in as</p>
              <p className="font-semibold text-gray-800">{user.username}</p>
            </div>
          )}
        </div>

        {loading && (
          <p className="text-gray-500 text-sm animate-pulse">
            Loading assets...
          </p>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && myAssets.length === 0 && (
          <p className="text-gray-500 text-sm">No assets assigned.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myAssets.map((asset) => (
            <div
              key={asset.assetTag}
              className="rounded-2xl border border-gray-200 p-6 bg-white 
                         hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {asset.assetType}
                  </h2>

                  {asset.assignmentStatus && (
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
                        asset.assignmentStatus,
                      )}`}
                    >
                      {asset.assignmentStatus}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600">
                  Tag: <b>{asset.assetTag}</b>
                </p>

                {asset.identifier && (
                  <p className="text-xs text-gray-500 mt-1">
                    Identifier: {asset.identifier}
                  </p>
                )}

                {(asset.locationName || asset.siteName) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {asset.locationName} • {asset.siteName}
                  </p>
                )}
              </div>

              <div className="mt-5 space-y-2">
                {/* Report Button */}
                <button
                  disabled={reporting === asset.assetTag}
                  onClick={() => handleReport(asset)}
                  className="w-full text-xs font-semibold py-2 rounded-xl
                    border border-red-500 text-red-600 hover:bg-red-50
                    transition disabled:opacity-50"
                >
                  {reporting === asset.assetTag
                    ? "Reporting..."
                    : "Report Issue"}
                </button>

                {/* Resend Button */}
                {asset.assignmentStatus === "ACCEPTED" ? (
                  <button
                    disabled
                    className="w-full text-xs font-semibold py-2 rounded-xl
                      border border-gray-300 text-gray-400 cursor-not-allowed"
                  >
                    Acknowledged
                  </button>
                ) : asset.assignmentId ? (
                  <button
                    disabled={resending === asset.assignmentId}
                    onClick={() => handleResend(asset.assignmentId)}
                    className="w-full text-xs font-semibold py-2 rounded-xl
                      border border-blue-500 text-blue-600 hover:bg-blue-50
                      transition disabled:opacity-50"
                  >
                    {resending === asset.assignmentId
                      ? "Resending..."
                      : "Resend Acknowledgement"}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAssetsPage;
