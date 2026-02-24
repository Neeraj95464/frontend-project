import {
  getSites,
  getLocationsBySite,
  addAsset,
  getEnums,
} from "../services/api";
import React, { useState, useEffect } from "react";

const AssetForm = () => {
  const [departments, setDepartments] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [sites, setSites] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addedAssetName, setAddedAssetName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    serialNumber: "",
    purchaseDate: "",
    purchaseFrom: "",
    status: "AVAILABLE",
    brand: "",
    model: "",
    assetType: "",
    department: "",
    cost: "",
    location: null,
    site: null,
    statusNote: "",
  });

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const data = await getEnums();
        setAssetTypes(data.assetTypes || []);
        setDepartments(data.departments || []);
      } catch (e) {
        console.error("Failed to load enums", e);
      }
    };
    fetchEnums();
  }, []);

  useEffect(() => {
    const fetchSites = async () => {
      setSites(await getSites());
    };
    fetchSites();
  }, []);

  useEffect(() => {
    if (formData.site) {
      const fetchLocations = async () => {
        setLocations(await getLocationsBySite(formData.site));
      };
      fetchLocations();
    } else {
      setLocations([]);
    }
  }, [formData.site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      serialNumber: "",
      purchaseDate: "",
      purchaseFrom: "",
      status: "AVAILABLE",
      brand: "",
      model: "",
      assetType: "",
      department: "",
      cost: "",
      location: null,
      site: null,
      statusNote: "",
    });
    setLocations([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.site || !formData.location) {
      alert("Please select both Site and Location.");
      return;
    }
    setIsSubmitting(true);
    const payload = {
      ...formData,
      site: { id: formData.site },
      location: { id: formData.location },
    };
    try {
      const response = await addAsset(payload);
      if (response.status === 200 || response.status === 201) {
        setAddedAssetName(formData.name);
        setShowSuccess(true);
        resetForm();
      }
    } catch (error) {
      alert("Failed to add the asset. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Input = ({ label, ...props }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
        {props.required && <span className="text-red-400">*</span>}
      </label>
      <input
        {...props}
        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
      />
    </div>
  );

  const Select = ({ label, options, placeholder, ...props }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
        {props.required && <span className="text-red-400">*</span>}
      </label>
      <select
        {...props}
        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all appearance-none cursor-pointer"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt, i) => (
          <option key={opt.id || i} value={opt.id || opt}>
            {opt.name || opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Toast */}
        {showSuccess && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-emerald-800">Asset Added!</p>
                <p className="text-sm text-emerald-600">
                  "{addedAssetName}" saved successfully
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-emerald-500 hover:text-emerald-700"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Add New Asset</h1>
                <p className="text-indigo-200 text-sm">
                  Register asset to inventory
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Asset Name "
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter Asset Name Here"
              />
              <Input
                label="Serial Number "
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                placeholder="Asset Serial Number"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                placeholder="Brief description..."
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Input
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Dell"
              />
              <Input
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="XPS 15"
              />
              <Select
                label="Asset Type "
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                required
                placeholder="Select"
                options={assetTypes}
              />
              <Select
                label="Department "
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="Select"
                options={departments}
              />
            </div>

            {/* Purchase & Cost */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Input
                label="Purchase Date"
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
              <Input
                label="Purchase From"
                name="purchaseFrom"
                value={formData.purchaseFrom}
                onChange={handleChange}
                placeholder="Amazon"
              />
              <Input
                label="Cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="1299.99"
              />
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Select"
                options={[
                  { id: "AVAILABLE", name: "Available" },
                  { id: "IN_USE", name: "In Use" },
                  { id: "MAINTENANCE", name: "Maintenance" },
                  { id: "RETIRED", name: "Retired" },
                ]}
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Site "
                name="site"
                value={formData.site || ""}
                onChange={handleChange}
                required
                placeholder="Select Site"
                options={sites}
              />
              <Select
                label="Location "
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                required
                placeholder={
                  formData.site ? "Select Location" : "Select site first"
                }
                options={locations}
                disabled={!formData.site}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Status Note
              </label>
              <textarea
                name="statusNote"
                value={formData.statusNote}
                onChange={handleChange}
                rows={2}
                placeholder="Additional notes..."
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Asset
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetForm;
