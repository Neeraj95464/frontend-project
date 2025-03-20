import axios from "axios";
import React, { useState, useEffect } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    serialNumber: "",
    purchaseDate: "",
    purchaseFrom: "",
    brand: "",
    model: "",
    assetType: "",
    department: "",
    cost: "",
    site: "",
    location: "",
    // reservationStartDate: "",
    // reservationEndDate: "",
    statusNote: "",
  });

  const [sites, setSites] = useState([]); // Always ensure sites is an array
  const [locations, setLocations] = useState([]); // Always ensure locations is an array
  const [isLoadingSites, setIsLoadingSites] = useState(true);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  // Fetch site and location data from backend
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get("/api/sites"); // Replace with your endpoint
        setSites(Array.isArray(response.data) ? response.data : []); // Ensure response.data is an array
      } catch (error) {
        console.error("Error fetching sites:", error);
        setSites([]); // Fallback to an empty array
      } finally {
        setIsLoadingSites(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get("/api/locations"); // Replace with your endpoint
        setLocations(Array.isArray(response.data) ? response.data : []); // Ensure response.data is an array
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]); // Fallback to an empty array
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchSites();
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Backend integration for form submission
    axios
      .post("/api/assets", formData) // Replace with your backend endpoint
      .then((response) => {
        console.log("Asset Created:", response.data);
        setIsOpen(false); // Close the modal
      })
      .catch((error) => console.error("Error creating asset:", error));
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Button to open the form */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Open Asset Form
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Asset Form</h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Serial Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Serial Number
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              {/* Purchase Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Purchase From */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Purchase From
                </label>
                <input
                  type="text"
                  name="purchaseFrom"
                  value={formData.purchaseFrom}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Site */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Site
                </label>
                <select
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select Site</option>
                  {isLoadingSites ? (
                    <option>Loading...</option>
                  ) : sites.length === 0 ? (
                    <option>No data available</option>
                  ) : (
                    sites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select Location</option>
                  {isLoadingLocations ? (
                    <option>Loading...</option>
                  ) : locations.length === 0 ? (
                    <option>No data available</option>
                  ) : (
                    locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              {/* Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Reservation Start Date */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reservation Start Date
                </label>
                <input
                  type="date"
                  name="reservationStartDate"
                  value={formData.reservationStartDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div> */}
              {/* Reservation End Date */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reservation End Date
                </label>
                <input
                  type="date"
                  name="reservationEndDate"
                  value={formData.reservationEndDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div> */}
              {/* Status Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status Note
                </label>
                <textarea
                  name="statusNote"
                  value={formData.statusNote}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Submit and Cancel Buttons */}
              <div className="md:col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
