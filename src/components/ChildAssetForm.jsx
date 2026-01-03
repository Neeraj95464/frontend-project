// import { createChildAsset } from "../services/api";
// import React, { useState } from "react";

// // Adjust the import path as needed

// const ChildAssetForm = ({ assetTag, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     warranty: "",
//     purchaseFrom: "",
//     childAssetNote: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const { name, warranty, purchaseFrom, childAssetNote } = formData;

//     if (!name || !warranty || !purchaseFrom || !childAssetNote) {
//       setError("All fields are required.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await createChildAsset(assetTag, formData);

//       // Reset form
//       setFormData({
//         name: "",
//         warranty: "",
//         purchaseFrom: "",
//         childAssetNote: "",
//       });

//       if (onClose) onClose();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to create child asset. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
//       <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-800">Add Child Asset</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800 transition"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Asset Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter asset name"
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="warranty"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Warranty
//             </label>
//             <input
//               id="warranty"
//               type="text"
//               value={formData.warranty}
//               onChange={handleChange}
//               placeholder="e.g. 12 months"
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="purchaseFrom"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Purchase From
//             </label>
//             <input
//               id="purchaseFrom"
//               type="text"
//               value={formData.purchaseFrom}
//               onChange={handleChange}
//               placeholder="Vendor or source"
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="purchaseFrom"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Child Asset Note
//             </label>

//             <input
//               id="childAssetNote"
//               type="text"
//               value={formData.childAssetNote}
//               onChange={handleChange}
//               placeholder="Child Asset Note"
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`px-6 py-2 text-sm font-semibold rounded-md text-white ${
//                 loading
//                   ? "bg-blue-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               } transition`}
//             >
//               {loading ? "Saving..." : "Save Asset"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChildAssetForm;

import { createChildAsset } from "../services/api";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ChildAssetForm = ({ assetTag: propAssetTag, onClose, onSuccess }) => {
  // ✅ State management for asset tag
  const [assetTag, setAssetTag] = useState(propAssetTag || "");
  const [isAssetTagEditable, setIsAssetTagEditable] = useState(!propAssetTag);
  const [formData, setFormData] = useState({
    name: "",
    warranty: "",
    purchaseFrom: "",
    childAssetNote: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto-disable editing if parent tag provided
  useEffect(() => {
    if (propAssetTag) {
      setAssetTag(propAssetTag);
      setIsAssetTagEditable(false);
    } else {
      setIsAssetTagEditable(true);
    }
  }, [propAssetTag]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "assetTag") {
      setAssetTag(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, warranty, purchaseFrom, childAssetNote } = formData;

    // ✅ Validate required fields
    if (
      !name?.trim() ||
      !warranty?.trim() ||
      !purchaseFrom?.trim() ||
      !childAssetNote?.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    // ✅ Validate asset tag if provided
    if (!assetTag?.trim()) {
      setError("Parent asset tag is required when creating child asset.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Prepare complete DTO
      const childAssetData = {
        name: name.trim(),
        warranty: warranty.trim(),
        purchaseFrom: purchaseFrom.trim(),
        childAssetNote: childAssetNote.trim(),
        parentAssetTag: assetTag.trim(), // ✅ Always required for submission
      };

      // console.log("📤 Submitting:", childAssetData);

      const response = await createChildAsset(childAssetData);
      // console.log("✅ Success:", response);
      toast.info("Child Asset Added Successfully");

      // Reset form
      setFormData({
        name: "",
        warranty: "",
        purchaseFrom: "",
        childAssetNote: "",
      });
      setAssetTag("");

      // Success callbacks
      if (onSuccess) onSuccess(response);
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to create child asset.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-gray-100 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Add Child Asset
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Mode:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isAssetTagEditable
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {isAssetTagEditable ? "Standalone Mode" : "Linked Child Mode"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-2 -m-2 hover:bg-gray-100 rounded-xl transition-all duration-200 shrink-0"
            aria-label="Close"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-800 font-medium text-sm leading-relaxed">
                {error}
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✅ Parent Asset Tag Field - Smart Behavior */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between">
              Parent Asset Tag <span className="text-red-500">*</span>
              {isAssetTagEditable && (
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                  Required
                </span>
              )}
            </label>
            <div className="relative">
              <input
                id="assetTag"
                type="text"
                value={assetTag}
                onChange={handleChange}
                placeholder="Enter parent asset tag (e.g. MGIT---)"
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-mono tracking-wide ${
                  isAssetTagEditable
                    ? "border-gray-300 bg-white shadow-sm hover:shadow-md"
                    : "border-gray-300 bg-gray-50 cursor-not-allowed border-dashed shadow-sm"
                }`}
                disabled={!isAssetTagEditable}
                required
              />
              {assetTag && !isAssetTagEditable && (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <p
              className={`mt-2 text-xs ${
                isAssetTagEditable
                  ? "text-gray-600"
                  : "text-green-600 font-medium"
              }`}
            >
              {isAssetTagEditable
                ? "Enter the parent asset tag this child belongs to (standalone assets also supported)"
                : `This child asset will be linked to parent: ${assetTag}`}
            </p>
          </div>

          {/* Core Asset Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Asset Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Mouse, USB Cable"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="warranty"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Warranty <span className="text-red-500">*</span>
              </label>
              <input
                id="warranty"
                type="text"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="e.g. 12 months, 2 years"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="purchaseFrom"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Purchase From <span className="text-red-500">*</span>
              </label>
              <input
                id="purchaseFrom"
                type="text"
                value={formData.purchaseFrom}
                onChange={handleChange}
                placeholder="e.g. Amazon, Local Vendor"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="childAssetNote"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Notes <span className="text-red-500">*</span>
              </label>
              <input
                id="childAssetNote"
                type="text"
                value={formData.childAssetNote}
                onChange={handleChange}
                placeholder="Additional details"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2 order-2 sm:order-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 text-sm font-semibold rounded-xl text-white transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg order-1 sm:order-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Create Child Asset</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildAssetForm;
