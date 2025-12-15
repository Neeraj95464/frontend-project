// src/pages/MyAssetsPage.jsx

import { useAuth } from "../components/AuthContext";
import { getMyAssets, hasRole } from "../services/api";
import React, { useEffect, useState } from "react";

const MyAssetsPage = () => {
  const { user } = useAuth();

  const [myAssets, setMyAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [assetError, setAssetError] = useState(null);

  useEffect(() => {
    const loadMyAssets = async () => {
      try {
        setLoadingAssets(true);
        setAssetError(null);
        const data = await getMyAssets(); // calls /user/my-asset → List<MyAssetDTO>
        setMyAssets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load my assets", err);
        setAssetError("Failed to load your assigned assets");
      } finally {
        setLoadingAssets(false);
      }
    };

    loadMyAssets();
  }, []);

  return (
    <div className="p-6 lg:ml-64 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-blue-700">
              🎒 My Assets
            </h1>
            <p className="text-sm text-gray-600">
              All assets (devices + CUG SIMs) currently assigned to your
              account.
            </p>
          </div>

          {user && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="text-sm font-medium text-gray-800">
                {user.username} ({user.role})
              </p>
            </div>
          )}
        </div>

        {/* loading / error states */}
        {loadingAssets && (
          <p className="text-sm text-gray-500">Loading your assets...</p>
        )}

        {assetError && (
          <p className="text-sm text-red-500 mb-4">{assetError}</p>
        )}

        {!loadingAssets && !assetError && myAssets.length === 0 && (
          <p className="text-sm text-gray-500">
            No assets are currently assigned to you.
          </p>
        )}

        {/* assets grid */}
        {!loadingAssets && !assetError && myAssets.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myAssets.map((asset, index) => (
              <div
                key={asset.assetTag || index}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* header: type + tag */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {asset.assetType} ({asset.assetTag})
                  </p>
                  {asset.status && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                      {asset.status}
                    </span>
                  )}
                </div>

                {/* main info */}
                {asset.name && (
                  <p className="text-xs text-gray-700">
                    Name: <span className="font-medium">{asset.name}</span>
                  </p>
                )}

                {asset.identifier && (
                  <p className="text-xs text-gray-700">
                    Identifier:{" "}
                    <span className="font-medium">{asset.identifier}</span>
                  </p>
                )}

                {asset.providerOrBrand && (
                  <p className="text-xs text-gray-700">
                    Provider / Brand:{" "}
                    <span className="font-medium">{asset.providerOrBrand}</span>
                  </p>
                )}

                {(asset.locationName || asset.siteName) && (
                  <p className="text-xs text-gray-700 mt-1">
                    {asset.locationName && (
                      <>
                        Location:{" "}
                        <span className="font-medium">
                          {asset.locationName}
                        </span>
                      </>
                    )}
                    {asset.locationName && asset.siteName && " • "}
                    {asset.siteName && (
                      <>
                        Site:{" "}
                        <span className="font-medium">{asset.siteName}</span>
                      </>
                    )}
                  </p>
                )}

                {asset.note && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3">
                    {asset.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssetsPage;
