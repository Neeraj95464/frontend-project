// // import {
// //   getSimDetails,
// //   assignSim,
// //   unassignSim,
// //   fetchSimHistory,
// // } from "../services/api";
// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // export default function CugSimDetails() {
// //   const { id } = useParams();
// //   const [sim, setSim] = useState(null);
// //   const [history, setHistory] = useState([]);
// //   const [employeeId, setEmployeeId] = useState("");

// //   const loadDetails = async () => {
// //     const data = await getSimDetails(id);
// //     setSim(data);
// //     const historyData = await fetchSimHistory(id);
// //     setHistory(historyData);
// //   };

// //   useEffect(() => {
// //     loadDetails();
// //   }, []);

// //   const handleAssign = async () => {
// //     await assignSim(id, employeeId);
// //     setEmployeeId("");
// //     loadDetails();
// //   };

// //   const handleUnassign = async () => {
// //     await unassignSim(id);
// //     loadDetails();
// //   };

// //   if (!sim) return <p className="p-6">Loading...</p>;

// //   return (
// //     <div className="lg:ml-40 pt-16">
// //       <h1 className="text-2xl font-semibold mb-6">
// //         SIM Details – {sim.phoneNumber}
// //       </h1>

// //       {/* -------------------- BASIC INFO -------------------- */}
// //       <div className="bg-white p-4 rounded shadow mb-6">
// //         <p>
// //           <strong>Provider:</strong> {sim.provider}
// //         </p>
// //         <p>
// //           <strong>Status:</strong> {sim.status}
// //         </p>
// //         <p>
// //           <strong>Assigned To:</strong> {sim.assignedUserName || "Unassigned"}
// //         </p>
// //         <p>
// //           <strong>Issued Date:</strong> {sim.issuedDate || "---"}
// //         </p>
// //         <p>
// //           <strong>Created At:</strong> {sim.createdAt}
// //         </p>
// //       </div>

// //       {/* -------------------- ACTIONS -------------------- */}
// //       <div className="bg-white p-4 rounded shadow mb-6 flex gap-4">
// //         {/* ASSIGN */}
// //         <div>
// //           <input
// //             placeholder="Enter User ID"
// //             value={employeeId}
// //             className="border p-2 rounded mr-2"
// //             onChange={(e) => setEmployeeId(e.target.value)}
// //           />
// //           <button
// //             className="bg-green-600 text-white p-2 rounded"
// //             onClick={handleAssign}
// //           >
// //             Assign
// //           </button>
// //         </div>

// //         {/* UNASSIGN */}
// //         <button
// //           className="bg-red-600 text-white p-2 rounded"
// //           onClick={handleUnassign}
// //         >
// //           Unassign
// //         </button>
// //       </div>

// //       {/* -------------------- HISTORY TABLE -------------------- */}
// //       <div className="bg-white p-4 rounded shadow">
// //         <h2 className="text-xl font-semibold mb-4">SIM History</h2>

// //         <table className="w-full text-left">
// //           <thead>
// //             <tr className="border-b">
// //               <th className="p-2">Action</th>
// //               <th className="p-2">Old Value</th>
// //               <th className="p-2">New Value</th>
// //               <th className="p-2">Date</th>
// //               <th className="p-2">Modified By</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {history.map((h, i) => (
// //               <tr key={i} className="border-b">
// //                 <td className="p-2">{h.changedAttribute}</td>
// //                 <td className="p-2">{h.oldValue}</td>
// //                 <td className="p-2">{h.newValue}</td>
// //                 <td className="p-2">{h.modifiedAt}</td>
// //                 <td className="p-2">{h.modifiedBy}</td>
// //               </tr>
// //             ))}

// //             {history.length === 0 && (
// //               <tr>
// //                 <td colSpan="5" className="text-center p-3">
// //                   No history found.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// import {
//   getSimDetails,
//   assignSim,
//   unassignSim,
//   fetchSimHistory,
// } from "../services/api";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function CugSimDetails() {
//   const { id } = useParams();
//   const [sim, setSim] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [loading, setLoading] = useState(true);

//   const loadDetails = async () => {
//     try {
//       setLoading(true);
//       const data = await getSimDetails(id);
//       setSim(data);
//       const historyData = await fetchSimHistory(id);
//       setHistory(historyData);
//       console.log("history data are ", historyData);
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
//     try {
//       await assignSim(id, employeeId);
//       toast.success("SIM assigned successfully!");
//       setEmployeeId("");
//       loadDetails();
//     } catch (error) {
//       toast.error("Failed to assign SIM");
//     }
//   };

//   const handleUnassign = async () => {
//     try {
//       await unassignSim(id);
//       toast.success("SIM unassigned successfully!");
//       loadDetails();
//     } catch (error) {
//       toast.error("Failed to unassign SIM");
//     }
//   };

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

//   return (
//     <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
//           <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//               />
//             </svg>
//           </span>
//           SIM Details
//         </h1>
//         <p className="text-gray-500 mt-2 text-sm sm:text-base">
//           Manage SIM card information and assignments
//         </p>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Left Column - SIM Info & Actions */}
//         <div className="xl:col-span-1 space-y-6">
//           {/* SIM Info Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//               <h2 className="text-lg font-semibold text-white">
//                 SIM Information
//               </h2>
//               <p className="text-blue-100 text-2xl font-bold mt-1">
//                 {sim.phoneNumber}
//               </p>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-500 text-sm">Provider</span>
//                 <span className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   {sim.provider}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-500 text-sm">Status</span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     sim.status === "ACTIVE" || sim.status === "ASSIGNED"
//                       ? "bg-green-100 text-green-700"
//                       : sim.status === "INACTIVE"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {sim.status}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-500 text-sm">Assigned To</span>
//                 <span
//                   className={`font-medium text-sm ${
//                     sim.assignedUserName
//                       ? "text-gray-800"
//                       : "text-gray-400 italic"
//                   }`}
//                 >
//                   {sim.assignedUserName || "Unassigned"}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-500 text-sm">Issued Date</span>
//                 <span className="font-medium text-gray-800 text-sm">
//                   {sim.issuedDate || "---"}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-3">
//                 <span className="text-gray-500 text-sm">Created At</span>
//                 <span className="font-medium text-gray-800 text-sm">
//                   {sim.createdAt}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Actions Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
//             <div className="px-6 py-4 border-b border-gray-100">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Quick Actions
//               </h2>
//             </div>
//             <div className="p-6 space-y-4">
//               {/* Assign Section */}
//               <div className="space-y-3">
//                 <label className="text-sm font-medium text-gray-700">
//                   Assign to User
//                 </label>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <input
//                     type="text"
//                     placeholder="Enter User ID"
//                     value={employeeId}
//                     className="flex-1 border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
//                     onChange={(e) => setEmployeeId(e.target.value)}
//                   />
//                   <button
//                     className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
//                     onClick={handleAssign}
//                   >
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
//                         d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
//                       />
//                     </svg>
//                     Assign
//                   </button>
//                 </div>
//               </div>

//               {/* Divider */}
//               <div className="relative py-2">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200"></div>
//                 </div>
//                 <div className="relative flex justify-center">
//                   <span className="bg-white px-3 text-sm text-gray-400">
//                     or
//                   </span>
//                 </div>
//               </div>

//               {/* Unassign Button */}
//               <button
//                 className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
//                 onClick={handleUnassign}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
//                   />
//                 </svg>
//                 Unassign SIM
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - History Table */}
//         <div className="xl:col-span-2">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
//             <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 Activity History
//               </h2>
//               <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                 {history.length} {history.length === 1 ? "record" : "records"}
//               </span>
//             </div>

//             {/* Desktop Table */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Action
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Old Value
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       New Value
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Modified By
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {history.map((h, i) => (
//                     <tr
//                       key={i}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4">
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           {h.changedAttribute}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         {h.oldValue || "---"}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-800 font-medium">
//                         {h.newValue || "---"}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         {h.modifiedAt}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-800">
//                         {h.modifiedBy}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {history.length === 0 && (
//                 <div className="text-center py-12">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-12 w-12 text-gray-300 mx-auto mb-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                     />
//                   </svg>
//                   <p className="text-gray-500">No history found</p>
//                   <p className="text-gray-400 text-sm mt-1">
//                     Activity will appear here once changes are made
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden p-4 space-y-4">
//               {history.map((h, i) => (
//                 <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {h.eventType}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       {h.performedAt}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div>
//                       <p className="text-gray-400 text-xs">Old Value</p>
//                       <p className="text-gray-600">{h.oldValue || "---"}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-400 text-xs">New Value</p>
//                       <p className="text-gray-800 font-medium">
//                         {h.newValue || "---"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
//                     Modified by:{" "}
//                     <span className="font-medium text-gray-700">
//                       {h.modifiedBy}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//               {history.length === 0 && (
//                 <div className="text-center py-8">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-10 w-10 text-gray-300 mx-auto mb-3"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                     />
//                   </svg>
//                   <p className="text-gray-500 text-sm">No history found</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  getSimDetails,
  assignSim,
  unassignSim,
  fetchSimHistory,
} from "../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CugSimDetails() {
  const { id } = useParams();
  const [sim, setSim] = useState(null);
  const [history, setHistory] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDetails = async () => {
    try {
      setLoading(true);
      const data = await getSimDetails(id);
      setSim(data);
      const historyData = await fetchSimHistory(id);
      setHistory(historyData);
    } catch (error) {
      toast.error("Failed to load SIM details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  const handleAssign = async () => {
    if (!employeeId.trim()) {
      toast.warning("Please enter a User ID");
      return;
    }
    try {
      await assignSim(id, employeeId);
      toast.success("SIM assigned successfully!");
      setEmployeeId("");
      loadDetails();
    } catch (error) {
      toast.error("Failed to assign SIM");
    }
  };

  const handleUnassign = async () => {
    try {
      await unassignSim(id);
      toast.success("SIM unassigned successfully!");
      loadDetails();
    } catch (error) {
      toast.error("Failed to unassign SIM");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getEventBadgeColor = (eventType) => {
    switch (eventType) {
      case "ASSIGNED":
        return "bg-green-100 text-green-800";
      case "UNASSIGNED":
        return "bg-red-100 text-red-800";
      case "CREATED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!sim) return null;

  return (
    <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
      {/* Header Section */}
      {/* <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </span>
          SIM Details
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Manage SIM card information and assignments
        </p>
      </div> */}

      {/* Full Width SIM Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              SIM Information
            </h2>
            <p className="text-blue-100 text-2xl sm:text-3xl font-bold mt-1">
              {sim.phoneNumber}
            </p>
          </div>
          <span
            className={`self-start sm:self-center px-4 py-2 rounded-full text-sm font-semibold ${
              sim.status === "ACTIVE" || sim.status === "ASSIGNED"
                ? "bg-green-500 text-white"
                : sim.status === "INACTIVE"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            {sim.status}
          </span>
        </div>

        {/* SIM Details Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Provider</p>
              <p className="font-semibold text-gray-800 text-lg">
                {sim.provider || "---"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Assigned To</p>
              <p
                className={`font-semibold text-lg ${
                  sim.assignedUserName
                    ? "text-gray-800"
                    : "text-gray-400 italic"
                }`}
              >
                {sim.assignedUserName || "Unassigned"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Issued Date</p>
              <p className="font-semibold text-gray-800 text-lg">
                {formatDate(sim.assignedAt)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Created At</p>
              <p className="font-semibold text-gray-800 text-lg">
                {formatDate(sim.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Assign Section */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <input
                type="text"
                placeholder="Enter User ID to assign"
                value={employeeId}
                className="flex-1 border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              <button
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                onClick={handleAssign}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Assign SIM
              </button>
            </div>

            {/* Unassign Button - Only show if user is assigned */}
            {sim.assignedUserName && (
              <>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <button
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  onClick={handleUnassign}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                    />
                  </svg>
                  Unassign SIM
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Activity History
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {history.length} {history.length === 1 ? "record" : "records"}
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Event Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Performed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((h) => (
                <tr
                  key={h.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventBadgeColor(
                        h.eventType
                      )}`}
                    >
                      {h.eventType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {h.details}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {h.performedBy || "System"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(h.performedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {history.length === 0 && (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-500">No history found</p>
              <p className="text-gray-400 text-sm mt-1">
                Activity will appear here once changes are made
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {history.length > 0 ? (
            history.map((h) => (
              <div key={h.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventBadgeColor(
                      h.eventType
                    )}`}
                  >
                    {h.eventType}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(h.performedAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-800">{h.details}</p>
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                  Performed by:{" "}
                  <span className="font-medium text-gray-700">
                    {h.performedBy || "System"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-300 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-500 text-sm">No history found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
