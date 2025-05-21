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
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("TICKETS");
  const [counts, setCounts] = useState({
    total: 0,
    available: 0,
    assigned: 0,
    inRepair: 0,
    disposed: 0,
    lost: 0,
    reserved: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (user.role === "ADMIN" || user.role === "MANAGER")) {
      fetchAssetCounts();
      fetchAssets();
    }
  }, [user]);

  const fetchAssetCounts = async () => {
    try {
      const data = await getAssetCounts();
      if (data) setCounts(data);
    } catch (error) {
      console.error("Error fetching asset counts:", error);
    }
  };

  const fetchAssets = async () => {
    try {
      const data = await getAllAssets();
      if (Array.isArray(data)) {
        setAssets(data);
      } else {
        setAssets([]);
        console.warn("Unexpected asset data format.");
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
      setAssets([]);
    }
  };

  const handleStatusClick = (status) => {
    if (status === "ALL") {
      navigate("/assets");
    } else {
      navigate(`/assets/${status}`);
    }
  };

  const metrics = [
    {
      label: "Total Assets",
      value: counts.total,
      color: "text-gray-900",
      status: "ALL",
    },
    {
      label: "Available",
      value: counts.available,
      color: "text-green-500",
      status: "AVAILABLE",
    },
    {
      label: "Assigned",
      value: counts.assigned,
      color: "text-red-500",
      status: "CHECKED_OUT",
    },
    {
      label: "In Repair",
      value: counts.inRepair,
      color: "text-yellow-500",
      status: "IN_REPAIR",
    },
    {
      label: "Disposed",
      value: counts.disposed,
      color: "text-yellow-500",
      status: "DISPOSED",
    },
    {
      label: "Lost",
      value: counts.lost,
      color: "text-yellow-500",
      status: "LOST",
    },
    {
      label: "Reserved",
      value: counts.reserved,
      color: "text-blue-500",
      status: "RESERVED",
    },
  ];

  const assetsToDisplay = assets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const loadMoreAssets = () => setCurrentPage((prev) => prev + 1);

  if (user?.role === "USER") {
    return (
      <div className="p-6 lg:ml-40 pt-16">
        <h1 className="text-2xl font-bold text-blue-600">
          Hi {user.username}, welcome to your dashboard!
        </h1>
        <p className="mt-4 text-gray-600">
          You have limited access. Please contact admin for more options.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <div className="mb-6 flex gap-4">
        <Button onClick={() => setActiveTab("ASSETS")}>Asset Charts</Button>
        <Button onClick={() => setActiveTab("TICKETS")}>Ticket Charts</Button>
      </div>

      {activeTab === "ASSETS" && (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {metrics.map(({ label, value, color, status }, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
                onClick={() => handleStatusClick(status)}
              >
                <h3 className="text-sm sm:text-lg font-medium text-gray-700">
                  {label}
                </h3>
                <p className={`text-2xl sm:text-3xl font-bold ${color}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Asset Overview</h2>
            <AssetCategoryChart />
          </div>

          <div className="overflow-x-auto">
            <AssetTable assets={assetsToDisplay} refreshAssets={fetchAssets} />
          </div>

          {assets.length > currentPage * pageSize && (
            <div className="text-center mt-6">
              <Button
                onClick={loadMoreAssets}
                className="hover:scale-105 transition-transform"
              >
                Load More Assets
              </Button>
            </div>
          )}

          {showModal && (
            <Modal
              closeModal={() => setShowModal(false)}
              refreshAssets={fetchAssets}
            />
          )}
        </>
      )}

      {activeTab === "TICKETS" && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Ticket Overview</h2>
          <TicketDashboardChart />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
