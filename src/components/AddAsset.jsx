import { getSites, getLocationsBySite, addAsset } from "../services/api";
import React, { useState, useEffect } from "react";

// Import API functions

const AssetForm = () => {
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

  const assetTypes = [
    "LAPTOP",
    "DESKTOP",
    "MOBILE",
    "PRINTER",
    "SERVER",
    "NETWORK_DEVICE",
    "SOFTWARE",
    "OTHERS",
  ];

  const departments = [
    "SALES",
    "AFTER_SALES",
    "IT",
    "HR",
    "ACCOUNTS",
    "PARTS",
    "TRAINING",
    "EDP",
    "MIS",
    "MAINTENANCE",
  ];
  // const assetStatuses = ["AVAILABLE", "RESERVED", "ASSIGNED", "DISPOSED"];

  const [locations, setLocations] = useState([]);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    // Fetch available sites
    const fetchSites = async () => {
      const data = await getSites();
      setSites(data);
    };
    fetchSites();
  }, []);

  useEffect(() => {
    // Fetch locations when site changes
    if (formData.site) {
      const fetchLocations = async () => {
        const data = await getLocationsBySite(formData.site);
        setLocations(data);
      };
      fetchLocations();
    }
  }, [formData.site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.site || !formData.location) {
      alert("Please select both Site and Location.");
      return;
    }

    const payload = {
      ...formData,
      site: { id: formData.site },
      location: { id: formData.location },
    };

    try {
      console.log(payload);
      const response = await addAsset(payload);
      if (response.status === 200 || response.status === 201) {
        alert("Asset added successfully!");
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
        setSites([]); // Refresh sites if needed
      }
    } catch (error) {
      alert("Failed to add the asset. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Add New Asset
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter asset name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter asset description"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Serial Number */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Serial Number
          </label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            placeholder="Enter serial number"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Purchase Date */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Purchase Date
          </label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Purchase From */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Purchase From
          </label>
          <input
            type="text"
            name="purchaseFrom"
            value={formData.purchaseFrom}
            onChange={handleChange}
            placeholder="Enter purchase source"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter asset brand"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Model */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Enter asset model"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Asset Type */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Asset Type</label>
          <select
            name="assetType"
            value={formData.assetType}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Asset Type
            </option>
            {assetTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Cost */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Cost</label>
          <input
            type="text"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Enter asset cost"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        {/* <div className="mb-4">
          <label className="block font-medium text-gray-700">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Location
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* Site */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Site</label>
          <select
            name="site"
            value={formData.site ? formData.site.id : ""}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Site
            </option>
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Location</label>
          <select
            name="location"
            value={formData.location ? formData.location.id : ""}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Location
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Note */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Status Note</label>
          <textarea
            name="statusNote"
            value={formData.statusNote}
            onChange={handleChange}
            placeholder="Enter status note"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
