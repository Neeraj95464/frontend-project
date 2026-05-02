

import { searchEmployees, getAssetsByUser } from "../services/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetailsModal = ({ query, isOpen, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || !query?.trim()) {
      setUserData(null);
      setAssignedAssets([]);
      return;
    }

    const fetchUser = async () => {
      setLoadingUser(true);
      setError(null);
      try {
        const data = await searchEmployees(query);
        const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
        setUserData(user);

        setAssetsLoading(true);
        try {
          const assets = await getAssetsByUser(query);
          setAssignedAssets(assets || []);
        } catch (err) {
          console.error("Failed to fetch assets", err);
          setAssignedAssets([]);
        } finally {
          setAssetsLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[96vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0">
          <h2 className="text-sm sm:text-base font-semibold text-white">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-red-200 w-7 h-7 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Body - Split Layout */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {loadingUser ? (
            <div className="flex items-center justify-center w-full py-16">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs text-gray-500">Loading...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center w-full py-16">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          ) : userData ? (
            <>
              {/* LEFT SIDE - User Details */}
              <div className="w-full lg:w-2/5 border-r border-gray-200 overflow-y-auto bg-gray-50">
                <div className="p-3 sm:p-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                    <h3 className="text-xs font-bold text-blue-700 mb-3 pb-2 border-b">
                      PERSONAL INFORMATION
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Username</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.username || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Employee ID</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.employeeId || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Role</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.role || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.phoneNumber || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.department || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.location?.name || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Site</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {userData?.site?.name || "N/A"}
                          </p>
                        </div>
                      </div>

                      {userData?.note && (
                        <div className="flex items-start gap-2 pt-2 border-t">
                          <svg
                            className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500">Note</p>
                            <p className="text-xs font-semibold text-gray-900">
                              {userData.note}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Assigned Assets */}
              <div className="w-full lg:w-3/5 overflow-y-auto bg-white">
                <div className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b">
                    <h3 className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      ASSIGNED ASSETS
                    </h3>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                      {assignedAssets.length}
                    </span>
                  </div>

                  {assetsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-xs text-gray-500">
                          Loading assets...
                        </p>
                      </div>
                    </div>
                  ) : assignedAssets.length > 0 ? (
                    <div className="space-y-2.5">
                      {assignedAssets.map((asset, index) => {
                        const isAdmin = userData?.role === "ADMIN";
                        return (
                          <motion.div
                            key={asset.assetTag || index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              if (isAdmin) {
                                navigate(`/asset/${asset.assetTag}`);
                              }
                            }}
                            className={`relative border rounded-lg p-2.5 transition-all ${
                              isAdmin
                                ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 hover:border-blue-500 hover:shadow-md cursor-pointer"
                                : "bg-gray-50 border-gray-300 cursor-default"
                            }`}
                          >
                            {/* Top Row: Type Badge + Asset Tag */}
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-xs font-bold flex-shrink-0 ${
                                    asset.assetType === "CUG_SIM"
                                      ? "bg-green-500 text-white"
                                      : "bg-blue-500 text-white"
                                  }`}
                                >
                                  {asset.assetType === "CUG_SIM" ? "SIM" : "HW"}
                                </span>
                                <h4 className="text-xs font-bold text-gray-900 truncate">
                                  {asset.assetTag}
                                </h4>
                              </div>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${
                                  asset.status === "ASSIGNED"
                                    ? "bg-green-500 text-white"
                                    : asset.status === "CHECKED_OUT"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-gray-500 text-white"
                                }`}
                              >
                                {asset.status}
                              </span>
                            </div>

                            {/* Asset Name */}
                            <p className="text-xs font-semibold text-gray-800 mb-1 truncate">
                              {asset.name}
                            </p>

                            {/* Identifier */}
                            <p className="text-xs text-gray-600 font-mono mb-1.5 truncate bg-gray-100 px-1.5 py-0.5 rounded">
                              {asset.identifier}
                            </p>

                            {/* Provider/Brand */}
                            {asset.providerOrBrand && (
                              <p className="text-xs text-gray-500 mb-1.5">
                                {asset.providerOrBrand}
                              </p>
                            )}

                            {/* Location & Site Tags */}
                            <div className="flex flex-wrap gap-1 mb-1.5">
                              {asset.locationName && (
                                <span className="inline-flex items-center gap-0.5 bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full text-xs">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                  </svg>
                                  <span className="text-xs">
                                    {asset.locationName}
                                  </span>
                                </span>
                              )}
                              {asset.siteName && (
                                <span className="inline-flex items-center gap-0.5 bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full text-xs">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                  <span className="text-xs">
                                    {asset.siteName}
                                  </span>
                                </span>
                              )}
                            </div>

                            {/* Note */}
                            {asset.note && (
                              <div className="mt-1.5 p-1.5 bg-amber-50 border border-amber-200 rounded">
                                <p className="text-xs text-amber-900 line-clamp-2">
                                  <span className="font-semibold">Note:</span>{" "}
                                  {asset.note}
                                </p>
                              </div>
                            )}

                            {/* Admin Click Indicator */}
                            {isAdmin && (
                              <div className="absolute bottom-1.5 right-1.5">
                                <svg
                                  className="w-3 h-3 text-blue-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-900 mb-1">
                        No Assets Assigned
                      </p>
                      <p className="text-xs text-gray-500">
                        This user has no hardware or SIM cards.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full py-16">
              <p className="text-xs text-gray-500">No user found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-100 border-t flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsModal;
