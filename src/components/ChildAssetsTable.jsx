// components/ChildAssetsTable.jsx
import React from "react";

const ChildAssetsTable = ({ childAssets }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Parent Asset Tag
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Warranty
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Purchase From
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Created By
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider w-24">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {childAssets.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                No child assets found
              </td>
            </tr>
          ) : (
            childAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {asset.assetTag}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                  {asset.name || "-"}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600 hover:text-blue-800 cursor-pointer max-w-xs truncate"
                  title={asset.parentAssetTag || "No parent"}
                  onClick={() =>
                    window.open(`/asset/${asset.parentAssetTag}`, "_blank")
                  }
                >
                  {asset.parentAssetTag || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                      asset.assetStatus === "AVAILABLE"
                        ? "bg-green-100 text-green-800"
                        : asset.assetStatus === "ASSIGNED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {asset.assetStatus || "-"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                  {asset.warranty || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                  {asset.purchaseFrom || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {asset.createdBy || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.createdAt
                    ? new Date(asset.createdAt).toLocaleString()
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                  <button className="text-indigo-600 hover:text-indigo-900 text-xs px-2 py-0.5 rounded hover:bg-indigo-50">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 text-xs px-2 py-0.5 rounded hover:bg-red-50">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChildAssetsTable;
