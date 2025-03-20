import { Button } from "../components/ui";
import { getAssetCounts, getAllAssets } from "../services/api";
import AssetTable from "./AssetTable";
import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    fetchAssetCounts();
    fetchAssets();
  }, []);

  const fetchAssetCounts = async () => {
    try {
      const data = await getAssetCounts();
      if (data) {
        setCounts(data);
      }
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
        console.warn("API returned unexpected data format for assets.");
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

  return (
    <div className=" lg:ml-40 pt-16 mr-8">
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
            <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto">
        <AssetTable assets={assetsToDisplay} refreshAssets={fetchAssets} />
      </div>

      {/* Load More Button */}
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

      {/* Modal */}
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          refreshAssets={fetchAssets}
        />
      )}
    </div>
  );
};

export default Dashboard;
