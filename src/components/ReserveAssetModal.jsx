import {
  getSites,
  getLocationsBySite,
  searchEmployees,
  reserveAsset,
} from "../services/api";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Import API functions

const ReserveAssetModal = ({ assetTag, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    statusNote: "",
    reservationStartDate: "",
    reservationEndDate: "",
    reservedForUserId: "",
    reserveForSiteId: "",
    reserveForLocationId: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [matchedEmployees, setMatchedEmployees] = useState([]);
  const { register, reset, setValue, watch } = useForm();
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reservationType, setReservationType] = useState("");

  useEffect(() => {
    if (isOpen) {
      getSites()
        .then((data) => setSites(data))
        .catch(() => setError("Failed to load sites"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.reserveForSiteId) {
      getLocationsBySite(formData.reserveForSiteId)
        .then((data) => setLocations(data))
        .catch(() => setError("Failed to load locations"));
    } else {
      setLocations([]);
    }
  }, [formData.reserveForSiteId]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setMatchedEmployees([]);
      setSelectedEmployee(null);
      return;
    }

    try {
      const employees = await searchEmployees(query);
      setMatchedEmployees(employees);
    } catch {
      setMatchedEmployees([]);
    }
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setSearchQuery(`${employee.username} (${employee.id})`);
    setFormData((prev) => ({ ...prev, reservedForUserId: employee.id }));
    setMatchedEmployees([]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReservationTypeChange = (e) => {
    const selectedType = e.target.value;
    setReservationType(selectedType);
    setFormData({
      ...formData,
      reservedForUserId: selectedType === "user" ? "" : "",
      reserveForSiteId: selectedType === "location" ? "" : "",
      reserveForLocationId: selectedType === "location" ? "" : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await reserveAsset(assetTag, formData);
      alert(`✅ Success: ${data.message}`);
      onClose();
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Reserve Asset</h2>

        <form onSubmit={handleSubmit}>
          {/* Status Note */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status Note
            </label>
            <input
              type="text"
              name="statusNote"
              value={formData.statusNote}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter reason for reservation"
            />
          </div>

          {/* Start & End Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="reservationStartDate"
              value={formData.reservationStartDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="reservationEndDate"
              value={formData.reservationEndDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Reservation Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Reservation Type
            </label>
            <div className="mt-1 flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="reservationType"
                  value="user"
                  checked={reservationType === "user"}
                  onChange={handleReservationTypeChange}
                  className="mr-2"
                />
                User
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="reservationType"
                  value="location"
                  checked={reservationType === "location"}
                  onChange={handleReservationTypeChange}
                  className="mr-2"
                />
                Location
              </label>
            </div>
          </div>

          {/* User Dropdown (if User reservation) */}
          {reservationType === "user" && (
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search employee..."
                className="border p-2 w-full rounded"
              />

              {/* Matching Employees List */}
              {matchedEmployees.length > 0 && (
                <div className="mt-2 p-2 border border-gray-300 rounded bg-white shadow-md">
                  <p className="text-sm text-green-600 font-semibold">
                    Matching Employees:
                  </p>
                  <ul className="list-none">
                    {matchedEmployees.map((employee) => (
                      <li
                        key={employee.id}
                        onClick={() => handleSelectEmployee(employee)}
                        className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        {employee.id} - {employee.username}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Selected Employee Display */}
              {selectedEmployee && (
                <p className="text-sm text-blue-600 mt-2">
                  Selected Employee: {selectedEmployee.id} -{" "}
                  {selectedEmployee.username}
                </p>
              )}

              <input
                type="hidden"
                {...register("userId", { required: true })}
              />
            </div>
          )}

          {/* Site & Location Dropdowns (if Location reservation) */}
          {reservationType === "location" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Site
                </label>
                <select
                  name="reserveForSiteId"
                  value={formData.reserveForSiteId}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="">Select Site</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Location
                </label>
                <select
                  name="reserveForLocationId"
                  value={formData.reserveForLocationId}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Reserving..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReserveAssetModal;
