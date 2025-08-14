// import { searchEmployees } from "../services/api";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UserDetailsModal = ({ query, isOpen, onClose }) => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isOpen || !query?.trim()) {
//       setUserData(null);
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await searchEmployees(query);
//         setUserData(Array.isArray(data) && data.length > 0 ? data[0] : null);
//       } catch (err) {
//         setError("Failed to fetch user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [query, isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-100">
//           <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-red-500 text-xl"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : userData ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left Column: User Info */}
//               <div>
//                 <table className="w-full text-sm">
//                   <tbody>
//                     {[
//                       { label: "Username", value: userData?.username },
//                       { label: "Employee ID", value: userData?.employeeId },
//                       { label: "Role", value: userData?.role },
//                       { label: "Phone", value: userData?.phoneNumber },
//                       { label: "Email", value: userData?.email },
//                       { label: "Department", value: userData?.department },
//                       { label: "Note", value: userData?.note },
//                       { label: "Location", value: userData?.location?.name },
//                       { label: "Site", value: userData?.site?.name },
//                     ].map((item, index) => (
//                       <tr key={index} className="border-b last:border-none">
//                         <th className="py-2 pr-4 text-gray-600 text-left w-1/3">
//                           {item.label}
//                         </th>
//                         <td className="py-2 text-gray-800">
//                           {item.value || "N/A"}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Right Column: Assets */}
//               <div>
//                 <h3 className="text-md font-semibold text-gray-700 mb-2">
//                   Assigned Assets
//                 </h3>
//                 {userData?.serialNumbers?.length > 0 ? (
//                   <ul className="space-y-3">
//                     {userData.serialNumbers.map((asset) => (
//                       <li
//                         key={asset.id}
//                         onClick={() => navigate(`/asset/${asset.serialNumber}`)}
//                         className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm cursor-pointer transition"
//                       >
//                         <p className="text-blue-600 font-medium">
//                           {asset.serialNumber}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {asset.model} • {asset.assetType}
//                         </p>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500">No assets assigned.</p>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No user found.</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 border-t bg-gray-50 text-center">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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

  // Fetch user details when the modal opens
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
          // }
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h2 className="text-lg md:text-xl font-semibold">User Details</h2>
          <button onClick={onClose} className="text-2xl hover:text-red-300">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {loadingUser ? (
            <p className="text-center text-gray-500">Loading user details...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : userData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: User Info */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">
                  Personal Info
                </h3>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "Username", value: userData?.username },
                      { label: "Employee ID", value: userData?.employeeId },
                      { label: "Role", value: userData?.role },
                      { label: "Phone", value: userData?.phoneNumber },
                      { label: "Email", value: userData?.email },
                      { label: "Department", value: userData?.department },
                      { label: "Note", value: userData?.note },
                      { label: "Location", value: userData?.location?.name },
                      { label: "Site", value: userData?.site?.name },
                    ].map((item, index) => (
                      <tr key={index} className="border-b last:border-none">
                        <th className="py-2 pr-4 text-gray-500 text-left w-1/3">
                          {item.label}
                        </th>
                        <td className="py-2 text-gray-800">
                          {item.value || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Column: Assigned Assets */}
              <div className="bg-white rounded-lg shadow p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">
                  Assigned Assets
                </h3>

                {assetsLoading ? (
                  <p className="text-gray-500">Loading assigned assets...</p>
                ) : assignedAssets.length > 0 ? (
                  // <ul className="space-y-3 mt-1">
                  //   {assignedAssets.map((asset) => (
                  //     <li
                  //       key={asset.id || asset.assetTag}
                  //       onClick={() => navigate(`/asset/${asset.assetTag}`)}
                  //       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm cursor-pointer"
                  //     >
                  //       <p className="text-blue-600 font-medium">
                  //         {asset.assetTag}
                  //       </p>
                  //       <p className="text-sm text-gray-600">
                  //         {asset.model} • {asset.assetType}
                  //       </p>
                  //     </li>
                  //   ))}
                  // </ul>

                  <ul className="space-y-3 mt-1">
                    {assignedAssets.map((asset) => {
                      const isAdmin = userData?.role === "ADMIN";
                      return (
                        <li
                          key={asset.id || asset.assetTag}
                          onClick={() => {
                            if (isAdmin) {
                              navigate(`/asset/${asset.assetTag}`);
                            }
                          }}
                          className={`p-3 bg-gray-100 rounded-lg shadow-sm 
          ${isAdmin ? "hover:bg-gray-200 cursor-pointer" : "cursor-default"}`}
                        >
                          <p
                            className={`font-medium ${
                              isAdmin ? "text-blue-600" : "text-gray-600"
                            }`}
                          >
                            {asset.assetTag}
                          </p>
                          <p className="text-sm text-gray-600">
                            {asset.model} • {asset.assetType}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500">No assets assigned.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No user found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-100 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsModal;
