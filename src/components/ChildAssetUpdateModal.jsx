import {
  getChildAssetByTag,
  updateChildAsset,
  getChildAssetHistory,
} from "../services/api";
import React, { useEffect, useState } from "react";

// <<--- Correct import

const ChildAssetUpdateModal = ({ isOpen, childAssetTag, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [assetData, setAssetData] = useState(null);
  const [history, setHistory] = useState([]);

  const [form, setForm] = useState({
    name: "",
    assetTag: "",
    warranty: "",
    purchaseFrom: "",
    childAssetNote: "",
    createdBy: "",
    assetStatus: "",
    parentAssetTag: "",
  });

  // -------------------------
  // Load asset + history when opened
  // -------------------------
  useEffect(() => {
    if (!isOpen || !childAssetTag) return;
    loadAssetData();
    loadAssetHistory();
  }, [isOpen, childAssetTag]);

  const loadAssetData = async () => {
    try {
      setLoading(true);

      const data = await getChildAssetByTag(childAssetTag);
      setAssetData(data);

      setForm({
        name: data.name || "",
        assetTag: data.assetTag || "",
        warranty: data.warranty || "",
        purchaseFrom: data.purchaseFrom || "",
        childAssetNote: data.childAssetNote || "",
        createdBy: data.createdBy || "",
        assetStatus: data.assetStatus || "",
        parentAssetTag: data.parentAssetTag || "",
      });
    } catch (err) {
      console.error("Failed to load asset", err);
    } finally {
      setLoading(false);
    }
  };

  const loadAssetHistory = async () => {
    try {
      const data = await getChildAssetHistory(childAssetTag);

      console.log("history data are ", data);
      // ensure history is ALWAYS an array
      if (Array.isArray(data)) {
        setHistory(data);
      } else if (data?.data && Array.isArray(data.data)) {
        setHistory(data.data); // in case wrapped inside ApiResponse
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Failed to load history", err);
      setHistory([]);
    }
  };

  // -------------------------
  // Update Handler
  // -------------------------
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateChildAsset(childAssetTag, form);

      alert("Child Asset updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Update Child Asset – {childAssetTag}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading...</p>
        ) : (
          <>
            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <InputField label="Asset Tag" value={form.assetTag} disabled />

              <InputField
                label="Warranty"
                value={form.warranty}
                onChange={(v) => setForm({ ...form, warranty: v })}
              />
              <InputField
                label="Purchase From"
                value={form.purchaseFrom}
                onChange={(v) => setForm({ ...form, purchaseFrom: v })}
              />

              <InputField label="Created By" value={form.createdBy} disabled />

              <InputField
                label="Parent Asset Tag"
                value={form.parentAssetTag}
                onChange={(v) => setForm({ ...form, parentAssetTag: v })}
              />

              {/* Status dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Status
                </label>
                <select
                  value={form.assetStatus}
                  onChange={(e) =>
                    setForm({ ...form, assetStatus: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select...</option>
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="REPAIR">REPAIR</option>
                  <option value="SCRAPPED">SCRAPPED</option>
                </select>
              </div>

              {/* Notes */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child Asset Note
                </label>
                <textarea
                  rows={3}
                  value={form.childAssetNote}
                  onChange={(e) =>
                    setForm({ ...form, childAssetNote: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
            </div>

            {/* Update Button */}
            <div className="mt-6 text-right">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>

            {/* HISTORY SECTION */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Asset History</h3>

              {history.length === 0 ? (
                <p className="text-gray-500">No history found.</p>
              ) : (
                <ul className="bg-gray-50 p-3 rounded border space-y-2">
                  {history.map((entry, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      <b>{entry.changedAttribute}</b>: "{entry.oldValue}" ➝ "
                      {entry.newValue}"
                      <br />
                      <span className="text-xs text-gray-500">
                        By {entry.modifiedBy} on{" "}
                        {new Date(entry.modifiedAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChildAssetUpdateModal;

// ---------------------------------
// Reusable InputField
// ---------------------------------
const InputField = ({ label, value, onChange, disabled = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={`w-full p-2 border rounded ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);
