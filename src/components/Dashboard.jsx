// import { useAuth } from "../components/AuthContext";
// import { Button } from "../components/ui";
// import { getAssetCounts, getAllAssets } from "../services/api";
// import AssetCategoryChart from "./AssetCategoryChart";
// import AssetTable from "./AssetTable";
// import Modal from "./Modal";
// import TicketDashboardChart from "./TicketDashboardChart";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [assets, setAssets] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("TICKETS");
//   const [counts, setCounts] = useState({
//     total: 0,
//     available: 0,
//     assigned: 0,
//     inRepair: 0,
//     disposed: 0,
//     lost: 0,
//     reserved: 0,
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user && (user.role === "ADMIN" || user.role === "MANAGER")) {
//       fetchAssetCounts();
//       fetchAssets();
//     }
//   }, [user]);

//   const fetchAssetCounts = async () => {
//     try {
//       const data = await getAssetCounts();
//       if (data) setCounts(data);
//     } catch (error) {
//       console.error("Error fetching asset counts:", error);
//     }
//   };

//   const fetchAssets = async () => {
//     try {
//       const data = await getAllAssets();
//       if (Array.isArray(data)) {
//         setAssets(data);
//       } else {
//         setAssets([]);
//         console.warn("Unexpected asset data format.");
//       }
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//       setAssets([]);
//     }
//   };

//   const handleStatusClick = (status) => {
//     if (status === "ALL") {
//       navigate("/assets");
//     } else {
//       navigate(`/assets/${status}`);
//     }
//   };

//   const metrics = [
//     {
//       label: "Total Assets",
//       value: counts.total,
//       color: "text-gray-900",
//       status: "ALL",
//     },
//     {
//       label: "Available",
//       value: counts.available,
//       color: "text-green-500",
//       status: "AVAILABLE",
//     },
//     {
//       label: "Assigned",
//       value: counts.assigned,
//       color: "text-red-500",
//       status: "CHECKED_OUT",
//     },
//     {
//       label: "In Repair",
//       value: counts.inRepair,
//       color: "text-yellow-500",
//       status: "IN_REPAIR",
//     },
//     {
//       label: "Disposed",
//       value: counts.disposed,
//       color: "text-yellow-500",
//       status: "DISPOSED",
//     },
//     {
//       label: "Lost",
//       value: counts.lost,
//       color: "text-yellow-500",
//       status: "LOST",
//     },
//     {
//       label: "Reserved",
//       value: counts.reserved,
//       color: "text-blue-500",
//       status: "RESERVED",
//     },
//   ];

//   const assetsToDisplay = assets.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );
//   const loadMoreAssets = () => setCurrentPage((prev) => prev + 1);

//   // if (user?.role === "USER") {
//   //   return (
//   //     <div className="p-6 lg:ml-40 pt-16">
//   //       <h1 className="text-2xl font-bold text-blue-600">
//   //         Hi {user.username}, welcome to your dashboard!
//   //       </h1>
//   //       <p className="mt-4 text-gray-600">
//   //         You have limited access. Please contact admin for more options.
//   //       </p>
//   //     </div>
//   //   );
//   // }

//   if (user?.role === "USER") {
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
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="lg:ml-40 pt-16 mr-8">
//       <div className="mb-6 flex gap-4">
//         <Button onClick={() => setActiveTab("ASSETS")}>Asset Charts</Button>
//         <Button onClick={() => setActiveTab("TICKETS")}>Ticket Charts</Button>
//       </div>

//       {activeTab === "ASSETS" && (
//         <>
//           {/* Metrics Grid */}
//           <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
//             {metrics.map(({ label, value, color, status }, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
//                 onClick={() => handleStatusClick(status)}
//               >
//                 <h3 className="text-sm sm:text-lg font-medium text-gray-700">
//                   {label}
//                 </h3>
//                 <p className={`text-2xl sm:text-3xl font-bold ${color}`}>
//                   {value}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Asset Overview</h2>
//             <AssetCategoryChart />
//           </div>

//           <div className="overflow-x-auto">
//             <AssetTable assets={assetsToDisplay} refreshAssets={fetchAssets} />
//           </div>

//           {assets.length > currentPage * pageSize && (
//             <div className="text-center mt-6">
//               <Button
//                 onClick={loadMoreAssets}
//                 className="hover:scale-105 transition-transform"
//               >
//                 Load More Assets
//               </Button>
//             </div>
//           )}

//           {showModal && (
//             <Modal
//               closeModal={() => setShowModal(false)}
//               refreshAssets={fetchAssets}
//             />
//           )}
//         </>
//       )}

//       {activeTab === "TICKETS" && (
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Ticket Overview</h2>
//           <TicketDashboardChart />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import { useAuth } from "../components/AuthContext";
import { Button } from "../components/ui";
import { getAssetCounts, getAllAssets } from "../services/api";
import AssetCategoryChart from "./AssetCategoryChart";
import AssetTable from "./AssetTable";
import Modal from "./Modal";
import TicketDashboardChart from "./TicketDashboardChart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchAssetCounts();
      fetchAssets();
    }
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

  // USER DASHBOARD VIEW
  if (user?.role === "USER") {
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
        </div>
      </div>
    );
  }

  // HR_ADMIN DASHBOARD VIEW (Ticket Chart Only)
  if (user?.role === "HR_ADMIN") {
    return (
      // <div className="lg:ml-64 pt-20 px-4">
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
