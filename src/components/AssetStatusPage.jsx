import { getAssetsByStatus } from "../services/api";
import AssetTable from "./AssetTable";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AssetStatusPage = () => {
  const { status } = useParams(); // Get status from URL
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssetsByStatus();
  }, [status]);

  const fetchAssetsByStatus = async () => {
    const data = await getAssetsByStatus(status);
    setAssets(Array.isArray(data) ? data : []);
  };

  return (
    <div className="ml-40 pt-16 mr-8">
      <h2 className="text-2xl font-bold mb-4">
        Assets - {status.replace("_", " ")}
      </h2>
      <AssetTable assets={assets} refreshAssets={fetchAssetsByStatus} />
    </div>
  );
};

export default AssetStatusPage;
