import { getSites, getLocationsBySite, createEmployee } from "../services/api";
import React, { useState, useEffect } from "react";

const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    employeeId: "",
    role: "",
    phoneNumber: "",
    email: "",
    department: "",
    note: "",
    createdBy: "",
    site: null,
    location: null,
  });

  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setSites(await getSites());
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    fetchSites();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      if (user.site && user.site.id) {
        try {
          setLocations(await getLocationsBySite(user.site.id));
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      } else {
        setLocations([]);
      }
    };

    fetchLocations();
  }, [user.site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSiteChange = (e) => {
    const selectedSite = sites.find(
      (site) => site.id === parseInt(e.target.value)
    );
    setUser({ ...user, site: selectedSite, location: null });
  };

  const handleLocationChange = (e) => {
    const selectedLocation = locations.find(
      (location) => location.id === parseInt(e.target.value)
    );
    setUser({ ...user, location: selectedLocation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(user);
      alert("User created successfully!");
      setUser({
        username: "",
        password: "",
        employeeId: "",
        role: "",
        phoneNumber: "",
        email: "",
        department: "",
        note: "",
        createdBy: "",
        site: null,
        location: null,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Create New User
      </h1>
      <form
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={user.employeeId}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={user.department}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              name="note"
              value={user.note}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Created By */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created By
            </label>
            <input
              type="text"
              name="createdBy"
              value={user.createdBy}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Site */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Site
            </label>
            <select
              value={user.site?.id || ""}
              onChange={handleSiteChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Site</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              value={user.location?.id || ""}
              onChange={handleLocationChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={!user.site}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
