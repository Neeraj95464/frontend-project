import AssignAssetModal from "../components/AssignAssetModel";
import ReserveAssetModal from "../components/ReserveAssetModal";
import UserDetailsModal from "../components/UserDetailsModal";
import {
  disposeAsset,
  markAssetAsLost,
  resetAssetStatus,
  markAssetAsInRepair,
} from "../services/api";
import CheckInModal from "./CheckInModal";
// Import User Modal
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AssetDetails = ({ asset, assetPhotos }) => {
  const [showActions, setShowActions] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [checkInAsset, setCheckInAsset] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for modal
  const actionRef = useRef(null);
  const [statusNote, setStatusNote] = useState("");
  const navigate = useNavigate();
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [selectedAssetReserve, setSelectedAssetReserve] = useState(null);

  const handleReserveStatusChange = (assetTag) => {
    setSelectedAssetReserve(assetTag);
    setShowReserveModal(true);
  };

  // console.log("Asset Data:", asset);
  // console.log("Asset Keys:", Object.keys(asset));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetStatusChange = async (assetTag) => {
    try {
      const statusNote = prompt("Enter a status note:")?.trim();
      if (!statusNote) {
        alert("❌ Reset canceled: Status note is required.");
        return;
      }

      // Call API
      const response = await resetAssetStatus(assetTag, statusNote);

      // Show success message
      alert(`✅ ${response}`);
    } catch (error) {
      alert(`❌ Error resetting asset status: ${error.message || error}`);
    }
  };

  const handleCheckInSubmit = async (formData) => {
    const result = await checkInAsset(formData);
    alert(result.message);
    if (result.success) setCheckInAsset(null);
  };

  const handleDisposeStatusChange = async (assetTag) => {
    const statusNote = prompt("Enter a disposal note:") || "";
    if (!statusNote) {
      alert("❌ Disposal note is required!");
      return;
    }

    const result = await disposeAsset(assetTag, statusNote);
    alert(result.message);
  };

  const handleLostStatusChange = async (assetTag) => {
    const statusNote = prompt("Enter a note for lost asset:") || "";
    if (!statusNote) {
      alert("❌ A status note is required to mark an asset as lost.");
      return;
    }

    const result = await markAssetAsLost(assetTag, statusNote);
    alert(result.message);
  };

  const handleInRepairStatusChange = async (assetTag) => {
    try {
      const note = prompt("Enter a repair note:")?.trim();
      if (!note) {
        alert("❌ Repair note is required!");
        return;
      }

      let confirmRepair = false;
      if (asset?.status === "IN_REPAIR") {
        confirmRepair = window.confirm(
          "This asset is already in repair. Do you want to mark it as repaired?"
        );
        if (!confirmRepair) return;
      }

      const result = await markAssetAsInRepair(
        assetTag,
        note,
        1,
        confirmRepair
      );
      toast.success(result.message || "Asset status updated successfully!");
    } catch (error) {
      console.error("Error updating asset status:", error);
      toast.error(error.message || "Failed to update asset status.");
    }
  };

  const description = [{ key: "description", label: "description" }];
  const fields = [
    { key: "department", label: "Department" },
    { key: "siteName", label: "Site" },
    { key: "locationName", label: "Location" },
    { key: "assignedUserName", label: "User Name" },
  ];
  const AssetFields = [
    { key: "name", label: "Asset Name" },
    { key: "assetTag", label: "Asset Tag" },
    { key: "serialNumber", label: "Serial Number" },
    { key: "brand", label: "Brand" },
    { key: "assetType", label: "Asset type" },
  ];
  const AssetStatusAndNote = [
    { key: "status", label: "Status" },
    { key: "statusNote", label: "Status Note" },
    { key: "reservationEndDate", label: "Reservation" },
    { key: "createdBy", label: "CreatedBy" },
    { key: "createdAt", label: "CreatedAt" },
  ];

  return (
    <div className="p-6 relative">
      {/* Top Buttons */}
      <div className="flex justify-end mb-4 gap-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-all"
        >
          Print Asset
        </button>

        <button
          type="button"
          onClick={() => navigate(`/assets/edit/${asset.assetTag}`)}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
        >
          Edit Asset
        </button>

        {/* Actions Dropdown */}
        <div className="relative" ref={actionRef}>
          <button
            type="button"
            onClick={() => setShowActions(!showActions)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
          >
            Actions
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-10">
              <button
                type="button"
                onClick={() => setSelectedAsset(asset.assetTag)}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                CheckOut
              </button>
              <button
                type="button"
                onClick={() => setCheckInAsset(asset.assetTag)}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Checkin
              </button>
              <button
                type="button"
                onClick={() => handleInRepairStatusChange(asset.assetTag)} // ✅ Pass function inside an arrow function
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                In Repair
              </button>

              <button
                type="button"
                onClick={() => handleDisposeStatusChange(asset.assetTag)}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Dispose
              </button>

              <button
                type="button"
                onClick={() => handleLostStatusChange(asset.assetTag)}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Lost/Missing
              </button>
              <button
                type="button"
                onClick={() => handleReserveStatusChange(asset.assetTag)}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Reserve
              </button>
              <button
                type="button"
                onClick={() => handleResetStatusChange(asset.assetTag)}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Reset Status
              </button>
              {/* Reserve Modal */}
              {showReserveModal && (
                <ReserveAssetModal
                  assetTag={selectedAssetReserve}
                  isOpen={showReserveModal}
                  onClose={() => setShowReserveModal(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full">
        {/* Description - Full Width */}
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm sm:text-base leading-relaxed">
          {asset.description || "No description available"}
        </div>

        {/* Main Row Layout (Photo + 3 Tables) */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Asset Photo */}
          <div className="w-full lg:w-1/4 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gray-100 rounded-lg overflow-hidden shadow relative">
              {assetPhotos.length > 0 ? (
                <img
                  src={assetPhotos[assetPhotos.length - 1]}
                  alt="Asset"
                  className="w-full h-full object-cover aspect-square"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.png"; // Replace with a real placeholder image
                  }}
                />
              ) : (
                <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                  No Photo Available
                </div>
              )}
            </div>
          </div>

          {/* Tables Container (3 Tables in a Row) */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Asset Details Table */}
            <div className="bg-gray-50 rounded-lg p-4 shadow w-full">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <tbody>
                  {AssetFields.map(({ key, label }, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <th className="px-3 py-2 text-gray-800 bg-gray-200 w-32 sm:w-40 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                        {label}:
                      </th>
                      <td className="px-3 py-2 text-gray-700 text-xs sm:text-sm break-words">
                        {key === "assignedUserName" ? (
                          <button
                            onClick={() => {
                              if (asset[key]) {
                                setSelectedUser(asset[key]);
                              } else {
                                console.warn(
                                  "⚠️ No user assigned to this asset."
                                );
                                toast.warn("No user assigned to this asset.");
                              }
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            {asset[key] || "Not Available"}
                          </button>
                        ) : (
                          asset[key] || "Not Available"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Asset Location Table */}
            <div className="bg-gray-50 rounded-lg p-4 shadow w-full">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <tbody>
                  {fields.map(({ key, label }, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <th className="px-3 py-2 text-gray-800 bg-gray-200 w-32 sm:w-40 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                        {label}:
                      </th>
                      <td className="px-3 py-2 text-gray-700 text-xs sm:text-sm break-words">
                        {key === "assignedUserName" ? (
                          <button
                            onClick={() => setSelectedUser(asset[key])}
                            className="text-blue-600 hover:underline"
                          >
                            {asset[key] || "Not Available"}
                          </button>
                        ) : (
                          asset[key] || "Not Available"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Asset Status & Notes Table */}
            <div className="bg-gray-50 rounded-lg p-4 shadow w-full">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <tbody>
                  {AssetStatusAndNote.map(({ key, label }, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <th className="px-3 py-2 text-gray-800 bg-gray-200 w-32 sm:w-40 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                        {label}:
                      </th>
                      <td className="px-3 py-2 text-gray-700 text-xs sm:text-sm break-words">
                        {asset[key] || "Not Available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Assign Asset Modal */}
      <div className="relative top-5 mt-6">
        {selectedAsset && (
          <AssignAssetModal
            assetTag={selectedAsset}
            isOpen={selectedAsset !== null}
            onClose={() => setSelectedAsset(null)}
          />
        )}

        {/* Check-In Modal */}
        {checkInAsset && (
          <CheckInModal
            assetTag={checkInAsset}
            isOpen={!!checkInAsset}
            onClose={() => setCheckInAsset(null)}
            onCheckIn={handleCheckInSubmit}
          />
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <UserDetailsModal
            query={selectedUser} // ✅ Pass as `query`, not `username`
            isOpen={!!selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>{" "}
    </div>
  );
};

export default AssetDetails;
