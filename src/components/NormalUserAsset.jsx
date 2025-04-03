import { getUserAssets } from "../services/api";
import { useState, useEffect } from "react";

const NormalUserAsset = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getUserAssets();
        if (data.length > 0) {
          setAssets(data); // ✅ Store all assets
        } else {
          setError("No assets assigned.");
        }
      } catch (err) {
        setError("Failed to load asset details");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Assigned Assets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {asset.name}
            </h2>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <DetailItem label="Asset Tag" value={asset.assetTag} />
              <DetailItem label="Brand" value={asset.brand} />
              <DetailItem label="Model" value={asset.model} />
              <DetailItem label="Department" value={asset.department} />
              <DetailItem label="Type" value={asset.assetType} />
              <DetailItem label="Status" value={asset.status} />
              <DetailItem
                label="Assigned To"
                value={asset.assignedUserName || "Unassigned"}
              />
              <DetailItem
                label="Created At"
                value={formatDate(asset.createdAt)}
              />
              <DetailItem label="Serial Number" value={asset.serialNumber} />
              <DetailItem
                label="Purchase Date"
                value={formatDate(asset.purchaseDate)}
              />
              <DetailItem label="Location" value={asset.locationName} />
              <DetailItem label="Site Name" value={asset.siteName} />
              <DetailItem
                label="Status Note"
                value={asset.statusNote || "N/A"}
              />
              <DetailItem
                label="Reservation Start"
                value={formatDate(asset.reservationStartDate)}
              />
              <DetailItem
                label="Reservation End"
                value={formatDate(asset.reservationEndDate)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Reusable component for displaying label-value pairs
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500">{label}:</span>
    <span className="text-gray-900 font-medium">{value || "N/A"}</span>
  </div>
);

// ✅ Helper function to format dates properly
const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : "N/A";
};

export default NormalUserAsset;
