import { deleteAsset } from "../services/api";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const AssetTable = ({ assets = [], refreshAssets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const validAssets = Array.isArray(assets) ? assets : [];
  const totalPages = Math.ceil(validAssets.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await deleteAsset(id);
        refreshAssets();
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  const paginatedAssets = validAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Add a wrapper with a fixed height for the table */}
      <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white sticky top-0 z-10 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-200">
                Asset Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-200">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-200">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-200">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-200">
                Purchase Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-200">
                Warranty Expiry
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAssets.map((asset) => (
              <tr key={asset.assetId} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                  {asset.name} - {asset.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                  {asset.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                  {asset.serialNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
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
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                  {asset.purchaseDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                  {asset.warrantyExpiry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(asset.assetId)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedAssets.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500 border-t border-gray-200"
                >
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-start p-4">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetTable;
