// // import { useAuth } from "../components/AuthContext";
// // import { Button } from "../components/ui";
// // import { getAssetCounts, getAllAssets, getMyAssets } from "../services/api";
// // import AssetCategoryChart from "./AssetCategoryChart";
// // import AssetTable from "./AssetTable";
// // import Modal from "./Modal";
// // import TicketDashboardChart from "./TicketDashboardChart";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Dashboard = () => {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();

// //   const [assets, setAssets] = useState([]);
// //   const [counts, setCounts] = useState({
// //     total: 0,
// //     available: 0,
// //     assigned: 0,
// //     inRepair: 0,
// //     disposed: 0,
// //     lost: 0,
// //     reserved: 0,
// //   });

// //   const [activeTab, setActiveTab] = useState("TICKETS");
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const pageSize = 10;

// //   const assetsToDisplay = assets.slice(
// //     (currentPage - 1) * pageSize,
// //     currentPage * pageSize
// //   );

// //   useEffect(() => {
// //     if (user?.role === "ADMIN") {
// //       fetchAssetCounts();
// //       fetchAssets();
// //     }
// //   }, [user]);

// //   const fetchAssetCounts = async () => {
// //     try {
// //       const res = await getAssetCounts();
// //       if (res) setCounts(res);
// //     } catch (err) {
// //       console.error("Asset counts fetch fail:", err);
// //     }
// //   };

// //   const fetchAssets = async () => {
// //     try {
// //       const res = await getAllAssets();
// //       if (Array.isArray(res)) {
// //         setAssets(res);
// //       } else {
// //         console.warn("Invalid assets structure");
// //         setAssets([]);
// //       }
// //     } catch (err) {
// //       console.error("Asset fetch error:", err);
// //     }
// //   };

// //   const handleStatusClick = (status) => {
// //     navigate(status === "ALL" ? "/assets" : `/assets/${status}`);
// //   };

// //   const loadMoreAssets = () => {
// //     setCurrentPage((prev) => prev + 1);
// //   };

// //   const metrics = [
// //     {
// //       label: "Total Assets",
// //       value: counts.total,
// //       status: "ALL",
// //       color: "text-gray-900",
// //     },
// //     {
// //       label: "Available",
// //       value: counts.available,
// //       status: "AVAILABLE",
// //       color: "text-green-600",
// //     },
// //     {
// //       label: "Assigned",
// //       value: counts.assigned,
// //       status: "CHECKED_OUT",
// //       color: "text-red-500",
// //     },
// //     {
// //       label: "In Repair",
// //       value: counts.inRepair,
// //       status: "IN_REPAIR",
// //       color: "text-yellow-600",
// //     },
// //     {
// //       label: "Disposed",
// //       value: counts.disposed,
// //       status: "DISPOSED",
// //       color: "text-orange-500",
// //     },
// //     {
// //       label: "Lost",
// //       value: counts.lost,
// //       status: "LOST",
// //       color: "text-pink-500",
// //     },
// //     {
// //       label: "Reserved",
// //       value: counts.reserved,
// //       status: "RESERVED",
// //       color: "text-blue-700",
// //     },
// //   ];

// //   // USER DASHBOARD VIEW
// //   if (user?.role === "USER") {
// //     // return (
// //     //   <div className="p-6 lg:ml-64 pt-20">
// //     //     <div className="bg-white shadow-lg rounded-lg p-8 border border-blue-100">
// //     //       <h1 className="text-3xl font-semibold text-blue-700 flex items-center gap-2">
// //     //         👋 Hello, {user.username}
// //     //       </h1>

// //     //       <p className="mt-2 text-gray-600 text-sm">
// //     //         Welcome to your dashboard! You're logged in with a{" "}
// //     //         <span className="font-medium text-blue-500">Standard User</span>{" "}
// //     //         role.
// //     //       </p>

// //     //       <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
// //     //         <p className="text-sm text-blue-700">
// //     //           🔒 Some advanced features are not available for your current
// //     //           access level. If you need additional tools or permissions, please{" "}
// //     //           <a
// //     //             href="/contact-admin"
// //     //             className="underline font-medium text-blue-600 hover:text-blue-800"
// //     //           >
// //     //             contact your administrator
// //     //           </a>
// //     //           .
// //     //         </p>
// //     //       </div>

// //     //       <div className="mt-8 bg-gray-50 p-4 rounded flex items-center justify-between">
// //     //         <div>
// //     //           <p className="text-sm text-gray-500 italic">
// //     //             "Great tools unlock great potential. Stay curious 👨‍💻"
// //     //           </p>
// //     //           <p className="text-xs text-gray-400 mt-1">— IT Management Team</p>
// //     //         </div>
// //     //         <img
// //     //           src="/assets/dashboard-tip.svg"
// //     //           alt="Dashboard tip"
// //     //           className="w-16 h-16 hidden md:block"
// //     //         />
// //     //       </div>
// //     //     </div>
// //     //   </div>
// //     // );

// //     type AssetDTO = {
// //       id: number | string,
// //       assetTag: string,
// //       name: string,
// //       serialNumber?: string,
// //       status?: string,
// //     };

// //     const [myAssets, setMyAssets] = useState < AssetDTO > [];
// //     const [loadingAssets, setLoadingAssets] = useState(false);
// //     const [assetError, setAssetError] = (useState < string) | (null > null);

// //     useEffect(() => {
// //       const loadMyAssets = async () => {
// //         try {
// //           setLoadingAssets(true);
// //           setAssetError(null);
// //           const data = await getMyAssets();
// //           setMyAssets(data || []);
// //         } catch (err) {
// //           console.error("Failed to load my assets", err);
// //           setAssetError("Failed to load your assigned assets");
// //         } finally {
// //           setLoadingAssets(false);
// //         }
// //       };

// //       loadMyAssets();
// //     }, []);

// //     return (
// //       <div className="p-6 lg:ml-64 pt-20">
// //         <div className="bg-white shadow-lg rounded-lg p-8 border border-blue-100">
// //           <h1 className="text-3xl font-semibold text-blue-700 flex items-center gap-2">
// //             👋 Hello, {user.username}
// //           </h1>

// //           <p className="mt-2 text-gray-600 text-sm">
// //             Welcome to your dashboard! You're logged in with a{" "}
// //             <span className="font-medium text-blue-500">Standard User</span>{" "}
// //             role.
// //           </p>

// //           {/* info box */}
// //           <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
// //             <p className="text-sm text-blue-700">
// //               🔒 Some advanced features are not available for your current
// //               access level. If you need additional tools or permissions, please{" "}
// //               <a
// //                 href="/contact-admin"
// //                 className="underline font-medium text-blue-600 hover:text-blue-800"
// //               >
// //                 contact your administrator
// //               </a>
// //               .
// //             </p>
// //           </div>

// //           {/* motivational box */}
// //           <div className="mt-8 bg-gray-50 p-4 rounded flex items-center justify-between">
// //             <div>
// //               <p className="text-sm text-gray-500 italic">
// //                 "Great tools unlock great potential. Stay curious 👨‍💻"
// //               </p>
// //               <p className="text-xs text-gray-400 mt-1">— IT Management Team</p>
// //             </div>
// //             <img
// //               src="/assets/dashboard-tip.svg"
// //               alt="Dashboard tip"
// //               className="w-16 h-16 hidden md:block"
// //             />
// //           </div>

// //           {/* my assets section */}
// //           <div className="mt-8">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-3">
// //               🎒 Your Assigned Assets
// //             </h2>

// //             {loadingAssets && (
// //               <p className="text-sm text-gray-500">Loading your assets...</p>
// //             )}

// //             {assetError && <p className="text-sm text-red-500">{assetError}</p>}

// //             {!loadingAssets && !assetError && myAssets.length === 0 && (
// //               <p className="text-sm text-gray-500">
// //                 No assets are currently assigned to you.
// //               </p>
// //             )}

// //             {!loadingAssets && !assetError && myAssets.length > 0 && (
// //               <div className="mt-2 grid gap-3 md:grid-cols-2">
// //                 {myAssets.map((asset) => (
// //                   <div
// //                     key={asset.id}
// //                     className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
// //                   >
// //                     <p className="text-sm font-semibold text-gray-800">
// //                       {asset.name} ({asset.assetTag})
// //                     </p>
// //                     {asset.serialNumber && (
// //                       <p className="text-xs text-gray-500">
// //                         S/N: {asset.serialNumber}
// //                       </p>
// //                     )}
// //                     {asset.status && (
// //                       <p className="text-xs mt-1">
// //                         Status:{" "}
// //                         <span className="font-medium text-green-600">
// //                           {asset.status}
// //                         </span>
// //                       </p>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // HR_ADMIN DASHBOARD VIEW (Ticket Chart Only)
// //   if (user?.role === "HR_ADMIN") {
// //     return (
// //       // <div className="lg:ml-64 pt-20 px-4">
// //       <div className="lg:ml-40 pt-16">
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <h2 className="text-2xl font-semibold mb-4 text-blue-700">
// //             🎫 Ticket Overview
// //           </h2>
// //           <TicketDashboardChart />
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ADMIN DASHBOARD VIEW
// //   return (
// //     <div className="lg:ml-40 pt-16">
// //       <div className="flex flex-col md:flex-row gap-4 mb-6">
// //         <Button onClick={() => setActiveTab("ASSETS")}>
// //           View Asset Charts
// //         </Button>
// //         <Button onClick={() => setActiveTab("TICKETS")}>
// //           View Ticket Charts
// //         </Button>
// //       </div>

// //       {activeTab === "ASSETS" && (
// //         <>
// //           {/* Asset Metrics */}
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
// //             {metrics.map(({ label, value, status, color }, i) => (
// //               <div
// //                 key={i}
// //                 onClick={() => handleStatusClick(status)}
// //                 className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center"
// //               >
// //                 <div className="text-sm md:text-base font-medium text-gray-600">
// //                   {label}
// //                 </div>
// //                 <div className={`text-2xl font-bold ${color}`}>{value}</div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Asset Chart */}
// //           <div className="bg-white p-6 rounded-lg shadow mb-6">
// //             <h3 className="text-lg font-semibold mb-4 text-blue-700">
// //               📊 Asset Category Chart
// //             </h3>
// //             <AssetCategoryChart />
// //           </div>

// //           {/* Asset Table */}
// //           <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
// //             <AssetTable assets={assetsToDisplay} refreshAssets={fetchAssets} />
// //             {assets.length > currentPage * pageSize && (
// //               <div className="text-center mt-4">
// //                 <Button onClick={loadMoreAssets}>Load More</Button>
// //               </div>
// //             )}
// //           </div>

// //           {/* Modal */}
// //           {showModal && (
// //             <Modal
// //               closeModal={() => setShowModal(false)}
// //               refreshAssets={fetchAssets}
// //             />
// //           )}
// //         </>
// //       )}

// //       {activeTab === "TICKETS" && (
// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h3 className="text-lg font-semibold mb-4 text-blue-700">
// //             🎫 Ticket Overview
// //           </h3>
// //           <TicketDashboardChart />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // src/pages/Dashboard.jsx

// import { useAuth } from "../components/AuthContext";
// import { Button } from "../components/ui";
// import { getAssetCounts, getAllAssets, getMyAssets } from "../services/api";
// import AssetCategoryChart from "./AssetCategoryChart";
// import AssetTable from "./AssetTable";
// import Modal from "./Modal";
// import TicketDashboardChart from "./TicketDashboardChart";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // ADMIN assets state
//   const [assets, setAssets] = useState([]);
//   const [counts, setCounts] = useState({
//     total: 0,
//     available: 0,
//     assigned: 0,
//     inRepair: 0,
//     disposed: 0,
//     lost: 0,
//     reserved: 0,
//   });

//   const [activeTab, setActiveTab] = useState("TICKETS");
//   const [showModal, setShowModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   const assetsToDisplay = assets.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // USER assets state
//   const [myAssets, setMyAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(false);
//   const [assetError, setAssetError] = useState(null);

//   // ADMIN: load counts + assets
//   useEffect(() => {
//     if (user && user.role === "ADMIN") {
//       fetchAssetCounts();
//       fetchAssets();
//     }
//   }, [user]);

//   // USER: load own assets
//   useEffect(() => {
//     if (!user || user.role !== "USER") return;

//     const loadMyAssets = async () => {
//       try {
//         setLoadingAssets(true);
//         setAssetError(null);
//         const data = await getMyAssets();
//         setMyAssets(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to load my assets", err);
//         setAssetError("Failed to load your assigned assets");
//       } finally {
//         setLoadingAssets(false);
//       }
//     };

//     loadMyAssets();
//   }, [user]);

//   const fetchAssetCounts = async () => {
//     try {
//       const res = await getAssetCounts();
//       if (res) setCounts(res);
//     } catch (err) {
//       console.error("Asset counts fetch fail:", err);
//     }
//   };

//   const fetchAssets = async () => {
//     try {
//       const res = await getAllAssets();
//       if (Array.isArray(res)) {
//         setAssets(res);
//       } else {
//         console.warn("Invalid assets structure");
//         setAssets([]);
//       }
//     } catch (err) {
//       console.error("Asset fetch error:", err);
//     }
//   };

//   const handleStatusClick = (status) => {
//     navigate(status === "ALL" ? "/assets" : `/assets/${status}`);
//   };

//   const loadMoreAssets = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   const metrics = [
//     {
//       label: "Total Assets",
//       value: counts.total,
//       status: "ALL",
//       color: "text-gray-900",
//     },
//     {
//       label: "Available",
//       value: counts.available,
//       status: "AVAILABLE",
//       color: "text-green-600",
//     },
//     {
//       label: "Assigned",
//       value: counts.assigned,
//       status: "CHECKED_OUT",
//       color: "text-red-500",
//     },
//     {
//       label: "In Repair",
//       value: counts.inRepair,
//       status: "IN_REPAIR",
//       color: "text-yellow-600",
//     },
//     {
//       label: "Disposed",
//       value: counts.disposed,
//       status: "DISPOSED",
//       color: "text-orange-500",
//     },
//     {
//       label: "Lost",
//       value: counts.lost,
//       status: "LOST",
//       color: "text-pink-500",
//     },
//     {
//       label: "Reserved",
//       value: counts.reserved,
//       status: "RESERVED",
//       color: "text-blue-700",
//     },
//   ];

//   // USER DASHBOARD VIEW
//   if (user && user.role === "USER") {
//     return (
//       <div className="p-6 lg:ml-64 pt-20">
//         <div className="bg-white shadow-lg rounded-lg p-8 border border-blue-100">
//           <h1 className="text-3xl font-semibold text-blue-700 flex items-center gap-2">
//             👋 Hello, {user.username}
//           </h1>

//           <p className="mt-2 text-gray-600 text-sm">
//             Welcome to your dashboard! You're logged in with a{" "}
//             <span className="font-medium text-blue-500">Standard User</span>{" "}
//             role.
//           </p>

//           {/* info box */}
//           <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
//             <p className="text-sm text-blue-700">
//               🔒 Some advanced features are not available for your current
//               access level. If you need additional tools or permissions, please{" "}
//               <a
//                 href="/contact-admin"
//                 className="underline font-medium text-blue-600 hover:text-blue-800"
//               >
//                 contact your administrator
//               </a>
//               .
//             </p>
//           </div>

//           {/* motivational box */}
//           <div className="mt-8 bg-gray-50 p-4 rounded flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 italic">
//                 "Great tools unlock great potential. Stay curious 👨‍💻"
//               </p>
//               <p className="text-xs text-gray-400 mt-1">— IT Management Team</p>
//             </div>
//             <img
//               src="/assets/dashboard-tip.svg"
//               alt="Dashboard tip"
//               className="w-16 h-16 hidden md:block"
//             />
//           </div>

//           {/* my assets section */}
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-3">
//               🎒 Your Assigned Assets
//             </h2>

//             {loadingAssets && (
//               <p className="text-sm text-gray-500">Loading your assets...</p>
//             )}

//             {assetError && <p className="text-sm text-red-500">{assetError}</p>}

//             {!loadingAssets && !assetError && myAssets.length === 0 && (
//               <p className="text-sm text-gray-500">
//                 No assets are currently assigned to you.
//               </p>
//             )}

//             {!loadingAssets && !assetError && myAssets.length > 0 && (
//               <div className="mt-2 grid gap-3 md:grid-cols-2">
//                 {myAssets.map((asset) => (
//                   <div
//                     key={asset.id}
//                     className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
//                   >
//                     <p className="text-sm font-semibold text-gray-800">
//                       {asset.name} ({asset.assetTag})
//                     </p>
//                     {asset.serialNumber && (
//                       <p className="text-xs text-gray-500">
//                         S/N: {asset.serialNumber}
//                       </p>
//                     )}
//                     {asset.status && (
//                       <p className="text-xs mt-1">
//                         Status:{" "}
//                         <span className="font-medium text-green-600">
//                           {asset.status}
//                         </span>
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // HR_ADMIN DASHBOARD VIEW
//   if (user && user.role === "HR_ADMIN") {
//     return (
//       <div className="lg:ml-40 pt-16">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold mb-4 text-blue-700">
//             🎫 Ticket Overview
//           </h2>
//           <TicketDashboardChart />
//         </div>
//       </div>
//     );
//   }

//   // ADMIN DASHBOARD VIEW
//   return (
//     <div className="lg:ml-40 pt-16">
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <Button onClick={() => setActiveTab("ASSETS")}>
//           View Asset Charts
//         </Button>
//         <Button onClick={() => setActiveTab("TICKETS")}>
//           View Ticket Charts
//         </Button>
//       </div>

//       {activeTab === "ASSETS" && (
//         <>
//           {/* Asset Metrics */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
//             {metrics.map(({ label, value, status, color }, i) => (
//               <div
//                 key={i}
//                 onClick={() => handleStatusClick(status)}
//                 className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center"
//               >
//                 <div className="text-sm md:text-base font-medium text-gray-600">
//                   {label}
//                 </div>
//                 <div className={`text-2xl font-bold ${color}`}>{value}</div>
//               </div>
//             ))}
//           </div>

//           {/* Asset Chart */}
//           <div className="bg-white p-6 rounded-lg shadow mb-6">
//             <h3 className="text-lg font-semibold mb-4 text-blue-700">
//               📊 Asset Category Chart
//             </h3>
//             <AssetCategoryChart />
//           </div>

//           {/* Asset Table */}
//           <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
//             <AssetTable assets={assetsToDisplay} refreshAssets={fetchAssets} />
//             {assets.length > currentPage * pageSize && (
//               <div className="text-center mt-4">
//                 <Button onClick={loadMoreAssets}>Load More</Button>
//               </div>
//             )}
//           </div>

//           {/* Modal */}
//           {showModal && (
//             <Modal
//               closeModal={() => setShowModal(false)}
//               refreshAssets={fetchAssets}
//             />
//           )}
//         </>
//       )}

//       {activeTab === "TICKETS" && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4 text-blue-700">
//             🎫 Ticket Overview
//           </h3>
//           <TicketDashboardChart />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.jsx

import { useAuth } from "../components/AuthContext";
import { Button } from "../components/ui";
import {
  getAssetCounts,
  getAllAssets,
  getMyAssets, // must call /user/my-asset and return List<MyAssetDTO>
} from "../services/api";
import AssetCategoryChart from "./AssetCategoryChart";
import AssetTable from "./AssetTable";
import Modal from "./Modal";
import TicketDashboardChart from "./TicketDashboardChart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ADMIN assets state
  const [assets, setAssets] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    available: 0,
    assigned: 0,
    inRepair: 0,
    disposed: 0,
    lost: 0,
    reserved: 0,
  });

  const [activeTab, setActiveTab] = useState("TICKETS");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const assetsToDisplay = assets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // USER "My Assets" state (MyAssetDTO list)
  const [myAssets, setMyAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [assetError, setAssetError] = useState(null);

  // ADMIN: load counts + assets
  useEffect(() => {
    if (user && user.role === "ADMIN") {
      fetchAssetCounts();
      fetchAssets();
    }
  }, [user]);

  // USER: load own MyAssetDTO list
  useEffect(() => {
    if (!user || user.role !== "USER") return;

    const loadMyAssets = async () => {
      try {
        setLoadingAssets(true);
        setAssetError(null);
        const data = await getMyAssets();
        // backend returns List<MyAssetDTO>
        setMyAssets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load my assets", err);
        setAssetError("Failed to load your assigned assets");
      } finally {
        setLoadingAssets(false);
      }
    };

    loadMyAssets();
  }, [user]);

  const fetchAssetCounts = async () => {
    try {
      const res = await getAssetCounts();
      if (res) setCounts(res);
    } catch (err) {
      console.error("Asset counts fetch fail:", err);
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await getAllAssets();
      if (Array.isArray(res)) {
        setAssets(res);
      } else {
        console.warn("Invalid assets structure");
        setAssets([]);
      }
    } catch (err) {
      console.error("Asset fetch error:", err);
    }
  };

  const handleStatusClick = (status) => {
    navigate(status === "ALL" ? "/assets" : `/assets/${status}`);
  };

  const loadMoreAssets = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const metrics = [
    {
      label: "Total Assets",
      value: counts.total,
      status: "ALL",
      color: "text-gray-900",
    },
    {
      label: "Available",
      value: counts.available,
      status: "AVAILABLE",
      color: "text-green-600",
    },
    {
      label: "Assigned",
      value: counts.assigned,
      status: "CHECKED_OUT",
      color: "text-red-500",
    },
    {
      label: "In Repair",
      value: counts.inRepair,
      status: "IN_REPAIR",
      color: "text-yellow-600",
    },
    {
      label: "Disposed",
      value: counts.disposed,
      status: "DISPOSED",
      color: "text-orange-500",
    },
    {
      label: "Lost",
      value: counts.lost,
      status: "LOST",
      color: "text-pink-500",
    },
    {
      label: "Reserved",
      value: counts.reserved,
      status: "RESERVED",
      color: "text-blue-700",
    },
  ];

  // USER DASHBOARD VIEW (uses MyAssetDTO)
  if (user && user.role === "USER") {
    return (
      <div className="p-6 lg:ml-64 pt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-blue-100">
          <h1 className="text-3xl font-semibold text-blue-700 flex items-center gap-2">
            👋 Hello, {user.username}
          </h1>

          <p className="mt-2 text-gray-600 text-sm">
            Welcome to your dashboard! You're logged in with a{" "}
            <span className="font-medium text-blue-500">Standard User</span>{" "}
            role.
          </p>

          {/* info box */}
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-sm text-blue-700">
              🔒 Some advanced features are not available for your current
              access level. If you need additional tools or permissions, please{" "}
              <a
                href="/contact-admin"
                className="underline font-medium text-blue-600 hover:text-blue-800"
              >
                contact your administrator
              </a>
              .
            </p>
          </div>

          {/* motivational box */}
          <div className="mt-8 bg-gray-50 p-4 rounded flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 italic">
                "Great tools unlock great potential. Stay curious 👨‍💻"
              </p>
              <p className="text-xs text-gray-400 mt-1">— IT Management Team</p>
            </div>
            <img
              src="/assets/dashboard-tip.svg"
              alt="Dashboard tip"
              className="w-16 h-16 hidden md:block"
            />
          </div>

          {/* my assets section (from MyAssetDTO) */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🎒 Your Assigned Assets
            </h2>

            {loadingAssets && (
              <p className="text-sm text-gray-500">Loading your assets...</p>
            )}

            {assetError && <p className="text-sm text-red-500">{assetError}</p>}

            {!loadingAssets && !assetError && myAssets.length === 0 && (
              <p className="text-sm text-gray-500">
                No assets are currently assigned to you.
              </p>
            )}

            {!loadingAssets && !assetError && myAssets.length > 0 && (
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {myAssets.map((asset, index) => (
                  <div
                    key={asset.assetTag || index}
                    className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
                  >
                    {/* title: type + tag */}
                    <p className="text-sm font-semibold text-gray-800">
                      {asset.assetType} ({asset.assetTag})
                    </p>

                    {/* main name */}
                    {asset.name && (
                      <p className="text-xs text-gray-600 mt-1">
                        Name: {asset.name}
                      </p>
                    )}

                    {/* identifier: serial number or phone number */}
                    {asset.identifier && (
                      <p className="text-xs text-gray-600">
                        Identifier: {asset.identifier}
                      </p>
                    )}

                    {/* provider / brand */}
                    {asset.providerOrBrand && (
                      <p className="text-xs text-gray-600">
                        Provider / Brand: {asset.providerOrBrand}
                      </p>
                    )}

                    {/* location & site */}
                    {(asset.locationName || asset.siteName) && (
                      <p className="text-xs text-gray-600 mt-1">
                        {asset.locationName &&
                          `Location: ${asset.locationName}`}
                        {asset.locationName && asset.siteName && " • "}
                        {asset.siteName && `Site: ${asset.siteName}`}
                      </p>
                    )}

                    {/* status */}
                    {asset.status && (
                      <p className="text-xs mt-1">
                        Status:{" "}
                        <span className="font-medium text-green-600">
                          {asset.status}
                        </span>
                      </p>
                    )}

                    {/* note */}
                    {asset.note && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {asset.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // HR_ADMIN DASHBOARD VIEW (Ticket Chart Only)
  if (user && user.role === "HR_ADMIN") {
    return (
      <div className="lg:ml-40 pt-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            🎫 Ticket Overview
          </h2>
          <TicketDashboardChart />
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD VIEW
  return (
    <div className="lg:ml-40 pt-16">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Button onClick={() => setActiveTab("ASSETS")}>
          View Asset Charts
        </Button>
        <Button onClick={() => setActiveTab("TICKETS")}>
          View Ticket Charts
        </Button>
      </div>

      {activeTab === "ASSETS" && (
        <>
          {/* Asset Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {metrics.map(({ label, value, status, color }, i) => (
              <div
                key={i}
                onClick={() => handleStatusClick(status)}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center"
              >
                <div className="text-sm md:text-base font-medium text-gray-600">
                  {label}
                </div>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Asset Chart */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              📊 Asset Category Chart
            </h3>
            <AssetCategoryChart />
          </div>

          {/* Asset Table */}
          <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
            <AssetTable assets={assetsToDisplay} refreshAssets={fetchAssets} />
            {assets.length > currentPage * pageSize && (
              <div className="text-center mt-4">
                <Button onClick={loadMoreAssets}>Load More</Button>
              </div>
            )}
          </div>

          {/* Modal */}
          {showModal && (
            <Modal
              closeModal={() => setShowModal(false)}
              refreshAssets={fetchAssets}
            />
          )}
        </>
      )}

      {activeTab === "TICKETS" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">
            🎫 Ticket Overview
          </h3>
          <TicketDashboardChart />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
