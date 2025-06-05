// import { searchEmployees } from "../services/api";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const UserDetailsModal = ({ query, isOpen, onClose }) => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // console.log("Modal Open:", isOpen, "| Query:", query); // ✅ Debugging logs

//     if (!isOpen || !query?.trim()) {
//       console.log("Skipping API call: Modal closed or query is empty.");
//       setUserData(null);
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // console.log("Fetching data for query:", query);
//         const data = await searchEmployees(query);

//         // console.log("API Response:", data);
//         setUserData(Array.isArray(data) && data.length > 0 ? data[0] : null);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to fetch user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [query, isOpen]); // ✅ Depend only on `query` and `isOpen`

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl relative"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           User Details
//         </h2>

//         {loading ? (
//           <div className="text-center text-gray-500">Loading...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : userData ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="w-full">
//               <table className="w-full text-left border-collapse">
//                 <tbody>
//                   {[
//                     { label: "Username", value: userData?.username },
//                     { label: "Employee ID", value: userData?.employeeId },
//                     { label: "Role", value: userData?.role },
//                     { label: "Phone Number", value: userData?.phoneNumber },
//                     { label: "Email", value: userData?.email },
//                     { label: "Department", value: userData?.department },
//                     { label: "Note", value: userData?.note },
//                     { label: "Location", value: userData?.location?.name },
//                     { label: "Site", value: userData?.site?.name },
//                   ].map((item, index) => (
//                     <tr key={index} className="border-b border-gray-300">
//                       <th className="px-4 py-3 text-gray-800 bg-gray-100 w-1/3">
//                         {item.label}:
//                       </th>
//                       <td className="px-4 py-3 text-gray-600">
//                         {item.value || "Not Available"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {userData?.serialNumbers?.length > 0 && (
//               <div className="w-full">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                   Assigned Assets
//                 </h3>
//                 <ul className="space-y-2">
//                   {userData.serialNumbers.map((asset) => (
//                     <li
//                       key={asset.id}
//                       className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-all"
//                       onClick={() => navigate(`/asset/${asset.serialNumber}`)}
//                     >
//                       <span className="text-blue-600 font-medium">
//                         {asset.serialNumber}
//                       </span>{" "}
//                       - {asset.model} ({asset.assetType})
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No user found.</div>
//         )}

//         <div className="text-center mt-4">
//           <button
//             onClick={onClose}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default UserDetailsModal;

import { searchEmployees } from "../services/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetailsModal = ({ query, isOpen, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || !query?.trim()) {
      setUserData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchEmployees(query);
        setUserData(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : userData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: User Info */}
              <div>
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
                        <th className="py-2 pr-4 text-gray-600 text-left w-1/3">
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

              {/* Right Column: Assets */}
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Assigned Assets
                </h3>
                {userData?.serialNumbers?.length > 0 ? (
                  <ul className="space-y-3">
                    {userData.serialNumbers.map((asset) => (
                      <li
                        key={asset.id}
                        onClick={() => navigate(`/asset/${asset.serialNumber}`)}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm cursor-pointer transition"
                      >
                        <p className="text-blue-600 font-medium">
                          {asset.serialNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          {asset.model} • {asset.assetType}
                        </p>
                      </li>
                    ))}
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
        <div className="px-6 py-4 border-t bg-gray-50 text-center">
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
