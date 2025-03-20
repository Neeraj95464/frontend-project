import { getAllAssets, deleteAsset } from "../services/api";
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAssets = async () => {
      setLoading(true);
      try {
        const data = await getAllAssets();
        setAssets(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    getAssets();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedAssets = assets.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < Math.ceil(assets.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await deleteAsset(id);
        setAssets((prev) => prev.filter((asset) => asset.id !== id));
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  const handleEdit = (assetTag) => {
    navigate(`/asset/${assetTag}`);
  };

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <div className="overflow-x-auto max-h-[70vh]">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-blue-500 text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Asset Tag</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Brand</th>
              <th className="px-4 py-2 border border-gray-300">Model</th>
              <th className="px-4 py-2 border border-gray-300">Department</th>
              <th className="px-4 py-2 border border-gray-300">Asset Type</th>
              <th className="px-4 py-2 border border-gray-300">Created By</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">
                Serial Number
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Purchase Date
              </th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Location ID</th>
              <th className="px-4 py-2 border border-gray-300">
                Assigned User
              </th>
              <th className="px-4 py-2 border border-gray-300">Status Note</th>
              <th className="px-4 py-2 border border-gray-300">
                Reservation Start
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Reservation End
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAssets.map((asset) => (
              <tr key={asset.id} className="border border-gray-200">
                <td className="px-4 py-2 border border-gray-300">
                  {asset.assetTag}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.brand}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.model}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.department}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.assetType}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.createdBy}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.description}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.serialNumber}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.purchaseDate}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      asset.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : asset.status === "Assigned"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.locationId}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.assignedUserName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.statusNote}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.reservationStartDate}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {asset.reservationEndDate}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEdit(asset.assetTag)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(asset.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedAssets.length === 0 && (
              <tr>
                <td
                  colSpan="17"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-gray-500">
          Page {currentPage} of {Math.ceil(assets.length / itemsPerPage)}
        </p>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage >= Math.ceil(assets.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetTable;
