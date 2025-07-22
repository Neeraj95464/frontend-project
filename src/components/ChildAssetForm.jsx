import { createChildAsset } from "../services/api";
import React, { useState } from "react";

// Adjust the import path as needed

const ChildAssetForm = ({ assetTag, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    warranty: "",
    purchaseFrom: "",
    childAssetNote: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, warranty, purchaseFrom, childAssetNote } = formData;

    if (!name || !warranty || !purchaseFrom || !childAssetNote) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    console.log("asset tag is ", assetTag);
    try {
      const response = await createChildAsset(assetTag, formData);
      console.log("Child asset created:", response);

      // Optional: show success toast/toast notification

      // Reset form
      setFormData({
        name: "",
        warranty: "",
        purchaseFrom: "",
        childAssetNote: "",
      });

      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create child asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Add Child Asset</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Asset Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter asset name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="warranty"
              className="block text-sm font-medium text-gray-700"
            >
              Warranty
            </label>
            <input
              id="warranty"
              type="text"
              value={formData.warranty}
              onChange={handleChange}
              placeholder="e.g. 12 months"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="purchaseFrom"
              className="block text-sm font-medium text-gray-700"
            >
              Purchase From
            </label>
            <input
              id="purchaseFrom"
              type="text"
              value={formData.purchaseFrom}
              onChange={handleChange}
              placeholder="Vendor or source"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="purchaseFrom"
              className="block text-sm font-medium text-gray-700"
            >
              Child Asset Note
            </label>

            <input
              id="childAssetNote"
              type="text"
              value={formData.childAssetNote}
              onChange={handleChange}
              placeholder="Child Asset Note"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-sm font-semibold rounded-md text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              {loading ? "Saving..." : "Save Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildAssetForm;
