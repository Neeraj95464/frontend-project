import AssignAssetModal from "../components/AssignAssetModel";
import ChildAssetForm from "../components/ChildAssetForm";
import ReserveAssetModal from "../components/ReserveAssetModal";
import UserDetailsModal from "../components/UserDetailsModal";
import {
  disposeAsset,
  markAssetAsLost,
  resetAssetStatus,
  markAssetAsInRepair,
  getAssetPhotos,
  getEmployees,
  searchEmployees,
} from "../services/api";
import CheckInModal from "./CheckInModal";
import { generatePolicyPdf } from "./generatePolicyPdf";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AssetDetails = ({ asset, assetPhotos }) => {
  const [showActions, setShowActions] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [checkInAsset, setCheckInAsset] = useState(null);
  const [openChildAssetModal, setOpenChildAssetModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const actionRef = useRef(null);
  const navigate = useNavigate();
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [selectedAssetReserve, setSelectedAssetReserve] = useState(null);
  const [childAssetParentTag, setChildAssetParentTag] = useState(null);

  // ===== Policy & Induction Text =====
  const policyText = `
  Company Asset Usage Policy

  1. The asset must be used strictly for official purposes only.
  2. The user is responsible for the safety and proper handling of the asset.
  3. Any damage, theft, or loss must be reported immediately to the IT department.
  4. Unauthorized installations or modifications are not permitted.
  5. Assets must not be shared or lent to others without approval.

  Terms & Conditions:
  - The company reserves the right to recall the asset at any time.
  - All data stored must comply with the company's data protection policy.
  - Upon termination/resignation, the asset must be returned in working condition.
  - Any violations may result in disciplinary action.
  `;

  const inductionText = `
  Induction & Guidelines for Asset Usage

  1. Familiarize yourself with the software pre-installed on the asset.
  2. Never share your login credentials or company data.
  3. Keep the system updated and secure with antivirus tools provided.
  4. Do not attempt unauthorized repairs or servicing.
  5. Contact IT support for technical help or queries related to the asset.

  IT Helpdesk Team
  Email: it-support@yourcompany.com
  Ext: 1234
  `;

  const handleReserveStatusChange = (assetTag) => {
    setSelectedAssetReserve(assetTag);
    setShowReserveModal(true);
  };

  const handleAddChildAsset = (assetTag) => {
    setChildAssetParentTag(assetTag);
    setOpenChildAssetModal(true);
  };

  const handleCloseModal = () => setOpenChildAssetModal(false);

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
      if (!statusNote) return alert("❌ Status note is required.");
      const response = await resetAssetStatus(assetTag, statusNote);
      toast.success(response);
    } catch (error) {
      toast.error(error.message || "Failed to reset status.");
    }
  };

  const handleCheckInSubmit = async (formData) => {
    const result = await checkInAsset(formData);
    alert(result.message);
    if (result.success) setCheckInAsset(null);
  };

  const handleDisposeStatusChange = async (assetTag) => {
    const statusNote = prompt("Enter a disposal note:") || "";
    if (!statusNote) return alert("❌ Disposal note is required!");
    const result = await disposeAsset(assetTag, statusNote);
    toast.success(result.message);
  };

  const handleLostStatusChange = async (assetTag) => {
    const statusNote = prompt("Enter a note for lost asset:") || "";
    if (!statusNote) return alert("❌ Status note is required!");
    const result = await markAssetAsLost(assetTag, statusNote);
    toast.success(result.message);
  };

  const handleInRepairStatusChange = async (assetTag) => {
    try {
      const note = prompt("Enter a repair note:")?.trim();
      if (!note) return alert("❌ Repair note is required!");
      let confirmRepair = false;
      if (asset?.status === "IN_REPAIR") {
        confirmRepair = window.confirm(
          "This asset is already in repair. Mark as repaired?"
        );
        if (!confirmRepair) return;
      }
      const result = await markAssetAsInRepair(
        assetTag,
        note,
        1,
        confirmRepair
      );
      toast.success(result.message || "Asset status updated!");
    } catch (error) {
      toast.error(error.message || "Failed to update asset status.");
    }
  };

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
    { key: "model", label: "Model" },
  ];
  const AssetStatusAndNote = [
    { key: "status", label: "Status" },
    { key: "statusNote", label: "Status Note" },
    { key: "reservationEndDate", label: "Reservation" },
    { key: "createdBy", label: "CreatedBy" },
    { key: "createdAt", label: "CreatedAt" },
  ];

  return (
    <div className=" relative bg-gray-50  rounded-xl">
      {/* Top Action Bar */}
      <div className="flex flex-wrap justify-end mb-6 gap-3">
        {[
          {
            label: "Print Asset",
            color: "bg-gray-600",
            onClick: () => window.print(),
          },
          {
            label: "Generate Policy PDF",
            color: "bg-blue-600",
            onClick: async () => {
              const photos = await getAssetPhotos(asset.assetTag);
              // const employeeDetails = await searchEmployees(
              //   asset.assignedUserEmpId
              // );
              const employees = asset?.assignedUserEmpId
                ? await searchEmployees(asset.assignedUserEmpId)
                : [];

              const employeeDetails =
                employees.length > 0 ? employees[0] : null;

              console.log("Asset Details are ", employeeDetails);
              // , policyText, inductionText
              await generatePolicyPdf(asset, photos, employeeDetails);
            },
          },
          {
            label: "Edit Asset",
            color: "bg-green-600",
            onClick: () => navigate(`/assets/edit/${asset.assetTag}`),
          },
          {
            label: "Add Child Asset",
            color: "bg-green-600",
            onClick: () => handleAddChildAsset(asset.assetTag),
          },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`${btn.color} text-white px-4 py-2 rounded-md hover:opacity-90 shadow`}
          >
            {btn.label}
          </button>
        ))}

        {/* Actions Dropdown */}
        <div className="relative" ref={actionRef}>
          <button
            onClick={() => setShowActions(!showActions)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:opacity-90 shadow"
          >
            Actions
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden divide-y divide-gray-100 z-10">
              <button
                onClick={() => setSelectedAsset(asset.assetTag)}
                className="px-4 py-2 w-full text-left hover:bg-blue-50"
              >
                CheckOut
              </button>
              <button
                onClick={() => setCheckInAsset(asset.assetTag)}
                className="px-4 py-2 w-full text-left hover:bg-blue-50"
              >
                Checkin
              </button>
              <button
                onClick={() => handleInRepairStatusChange(asset.assetTag)}
                className="px-4 py-2 w-full text-left hover:bg-blue-50"
              >
                In Repair
              </button>
              <button
                onClick={() => handleDisposeStatusChange(asset.assetTag)}
                className="px-4 py-2 w-full text-left hover:bg-blue-50"
              >
                Dispose
              </button>
              <button
                onClick={() => handleLostStatusChange(asset.assetTag)}
                className="px-4 py-2 w-full text-left hover:bg-blue-50"
              >
                Lost/Missing
              </button>
              <button
                onClick={() => handleReserveStatusChange(asset.assetTag)}
                className="px-4 py-2 w-full text-left hover:bg-blue-50"
              >
                Reserve
              </button>
              <button
                onClick={() => handleResetStatusChange(asset.assetTag)}
                className="px-4 py-2 w-full text-left hover:bg-blue-50"
              >
                Reset Status
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 bg-white p-5 rounded-lg shadow text-gray-700 leading-relaxed">
        {asset.description || "No description available"}
      </div>

      {/* Photo + Tables */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Asset Photo */}
        <div className="w-full lg:w-1/4 flex justify-center">
          <div className="w-56 h-56 bg-gray-100 rounded-lg overflow-hidden shadow relative">
            {assetPhotos.length > 0 ? (
              <img
                src={assetPhotos[assetPhotos.length - 1]}
                alt="Asset"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-400">
                No Photo
              </div>
            )}
          </div>
        </div>

        {/* Three Info Tables */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[AssetFields, fields, AssetStatusAndNote].map((table, tIndex) => (
            <div
              key={tIndex}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <table className="w-full text-sm">
                <tbody>
                  {table.map(({ key, label }, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <th className="px-3 py-2 bg-blue-50 text-gray-900 font-medium text-left">
                        {label}
                      </th>
                      {/* <td className="px-3 py-2 text-gray-700">
                        {key === "assignedUserName" ? (
                          <button
                            onClick={() =>
                              asset[key] && setSelectedUser(asset[key])
                            }
                            className="text-blue-600 hover:underline"
                          >
                            {asset[key] || "Not Available"}
                          </button>
                        ) : (
                          asset[key] || "Not Available"
                        )}
                      </td> */}

                      <td className="px-3 py-2 text-gray-700">
                        {key === "assignedUserName" ? (
                          asset[key] ? (
                            <button
                              onClick={() =>
                                asset.assignedUserEmpId &&
                                setSelectedUser(asset.assignedUserEmpId)
                              }
                              className="text-blue-600 hover:underline"
                            >
                              {asset[key]}
                            </button>
                          ) : (
                            "Not Available"
                          )
                        ) : (
                          asset[key] || "Not Available"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedAsset && (
        <AssignAssetModal
          assetTag={selectedAsset}
          isOpen={true}
          onClose={() => setSelectedAsset(null)}
        />
      )}
      {checkInAsset && (
        <CheckInModal
          assetTag={checkInAsset}
          isOpen={!!checkInAsset}
          onClose={() => setCheckInAsset(null)}
          onCheckIn={handleCheckInSubmit}
        />
      )}
      {openChildAssetModal && (
        <ChildAssetForm
          assetTag={childAssetParentTag}
          onClose={handleCloseModal}
        />
      )}
      {selectedUser && (
        <UserDetailsModal
          query={selectedUser}
          isOpen={true}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {showReserveModal && (
        <ReserveAssetModal
          assetTag={selectedAssetReserve}
          isOpen={true}
          onClose={() => setShowReserveModal(false)}
        />
      )}
    </div>
  );
};

export default AssetDetails;
