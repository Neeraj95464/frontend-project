import { useAuth } from "../components/AuthContext";
import { getMyAssets, reportAssetIssue } from "../services/api";
import React, { useEffect, useState } from "react";

const MyAssetsPage = () => {
  const { user } = useAuth();
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reporting, setReporting] = useState(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const data = await getMyAssets();
        setMyAssets(Array.isArray(data) ? data : []);
      } catch {
        setError("Unable to load your assets.");
      } finally {
        setLoading(false);
      }
    };
    loadAssets();
  }, []);

  const handleReport = async (asset) => {
    const reason = window.prompt(
      `You are reporting asset ${asset.assetTag}.\n\n` +
        "Example:\n- This asset is not mine\n- Wrong mapping / duplicate\n- Lost / damaged\n\nPlease enter brief reason:",
      "This asset is not mine / wrongly mapped to my ID."
    );
    if (!reason) return;

    if (!window.confirm(`Raise ticket for asset ${asset.assetTag}?`)) return;

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

  return (
    <div className="p-6 lg:ml-64 pt-20">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-blue-700">
              My Assigned Assets
            </h1>
            <p className="text-sm text-gray-500">
              Devices and SIMs currently mapped to your account.
            </p>
            <p className="mt-1 text-xs text-gray-400">
              All assigned assets are covered under the Mahavir IT Asset Policy.
              If any asset is not yours, or has an issue, use the report button
              below.
            </p>
          </div>

          {user && (
            <div className="text-sm text-right">
              <p className="text-gray-500">User</p>
              <p className="font-medium text-gray-800">
                {user.username} ({user.role})
              </p>
            </div>
          )}
        </div>

        {loading && <p className="text-sm text-gray-500">Loading assets…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && myAssets.length === 0 && (
          <p className="text-sm text-gray-500">No assets assigned.</p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {myAssets.map((asset) => (
            <div
              key={asset.assetTag}
              className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-gray-800">
                  {asset.assetType} ({asset.assetTag})
                </p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  {asset.status}
                </span>
              </div>

              {asset.identifier && (
                <p className="text-xs text-gray-600">
                  Identifier: <b>{asset.identifier}</b>
                </p>
              )}

              {asset.providerOrBrand && (
                <p className="text-xs text-gray-600">
                  Brand / Provider: <b>{asset.providerOrBrand}</b>
                </p>
              )}

              {(asset.locationName || asset.siteName) && (
                <p className="text-xs text-gray-600 mt-1">
                  {asset.locationName}{" "}
                  {asset.locationName && asset.siteName && "•"} {asset.siteName}
                </p>
              )}

              {asset.note && (
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-3">
                  {asset.note}
                </p>
              )}

              <button
                disabled={reporting === asset.assetTag}
                onClick={() => handleReport(asset)}
                className="mt-4 w-full text-xs font-semibold py-2 rounded-lg
                           border border-red-500 text-red-600 hover:bg-red-50
                           transition disabled:opacity-50"
              >
                {reporting === asset.assetTag
                  ? "Reporting..."
                  : "Report: Not My Asset / Issue"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAssetsPage;
