import {
  createTicket,
  getCurrentUser,
  searchLocations,
  searchEmployees,
  getUserAssets,
  getAssetByAssetTag,
  assignAsset,
} from "../services/api";
import { useState, useEffect } from "react";

const TicketModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("HARDWARE");
  const [employee, setEmployee] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [location, setLocation] = useState("");
  const [locationName, setlocationName] = useState("");
  const [asset, setAsset] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(""); // Tracks the actual asset selected

  const [assets, setAssets] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedEmployees, setMatchedEmployees] = useState([]);
  const [error, setError] = useState("");
  const [assetSearchQuery, setAssetSearchQuery] = useState("");
  const [matchedAssets, setMatchedAssets] = useState([]);
  const [assetError, setAssetError] = useState("");
  const [searchLocationQuery, setSearchLocationQuery] = useState("");
  const [matchedLocations, setMatchedLocations] = useState([]);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setEmployee(userData.employeeId);
        setEmployeeName(userData.username);
        setSearchQuery(userData.username);
        setUserRole(userData.role);
        await fetchUserAssets(userData.employeeId);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setAssets([]);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (employee) fetchUserAssets(employee);
  }, [employee]);

  const fetchUserAssets = async (empId) => {
    try {
      const assignedAssets = await getUserAssets(empId);

      if (assignedAssets.length > 0) {
        const defaultAsset = assignedAssets[0]; // First assigned asset

        setAsset(defaultAsset.assetTag);
        setSelectedAsset(defaultAsset.assetTag);
        setlocationName(defaultAsset.locationName); // For display purposes
        setSearchLocationQuery(defaultAsset.locationName); // Set search query for UI

        // Fetch location ID by searching with location name
        try {
          const locations = await searchLocations(defaultAsset.locationName); // Pass actual name
          if (locations.length > 0) {
            setLocation(locations[0].id); // Set ID correctly
          }
          setMatchedLocations(locations);
          setLocationError(locations.length === 0 ? "No locations found." : "");
        } catch {
          setLocationError("Error searching locations.");
          setMatchedLocations([]);
        }
      }

      setAssets(assignedAssets || []);
    } catch (error) {
      console.error("Error fetching assigned assets: ", error);
      setAssets([]);
    }
  };

  const handleLocationSearchChange = async (e) => {
    const query = e.target.value.trim(); // Trim spaces
    setSearchLocationQuery(query);

    if (!query) {
      setMatchedLocations([]);
      return;
    }

    try {
      const locations = await searchLocations(query);
      setMatchedLocations(locations);
      //   console.log("locations are ", locations);
      setLocationError(locations.length === 0 ? "No locations found." : "");
    } catch {
      setLocationError("Error searching locations.");
      setMatchedLocations([]);
    }
  };

  const selectLocation = (selectedLocation) => {
    // console.log("Your selected location ID is:", selectedLocation.id);
    setLocation(selectedLocation.id); // Ensure we store the ID
    setlocationName(selectedLocation.name); // Keep the display name
    setSearchLocationQuery(selectedLocation.name);
    setMatchedLocations([]);
    setLocationError("");
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setMatchedEmployees([]);
      return;
    }

    try {
      const employees = await searchEmployees(query);
      setMatchedEmployees(employees);
      setError(employees.length === 0 ? "No employees found." : "");
    } catch {
      setError("Error searching employees.");
      setMatchedEmployees([]);
    }
  };

  const selectEmployee = (selectedEmployee) => {
    setEmployee(selectedEmployee.employeeId);
    setEmployeeName(selectedEmployee.username);
    setSearchQuery(selectedEmployee.username);
    setMatchedEmployees([]);
    setError("");
  };

  const handleAssetSearchChange = async (e) => {
    const query = e.target.value;
    setAssetSearchQuery(query);

    if (!query) {
      setMatchedAssets([]);
      return;
    }

    try {
      const assets = await getAssetByAssetTag(query);
      setMatchedAssets(assets);
      setAssetError(assets.length === 0 ? "No assets found." : "");
    } catch {
      setAssetError("Error searching assets.");
      setMatchedAssets([]);
    }
  };

  const selectAsset = (selectedAsset) => {
    setAsset(selectedAsset.assetTag);
    setSelectedAsset(selectedAsset.assetTag);
    setAssetSearchQuery(`${selectedAsset.name} (${selectedAsset.assetTag})`);
    setMatchedAssets([]);
    setAssetError("");
  };

  const handleDropdownChange = (e) => {
    setAsset(e.target.value);
    setSelectedAsset(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting ticket with location ID:", location); // Debugging log

    try {
      await createTicket({
        title,
        description,
        category,
        employee,
        assetTag: selectedAsset,
        location, // Make sure location is an ID
      });

      alert("Ticket created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating ticket: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <label className="block mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <label className="block mb-2">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="HARDWARE">Hardware</option>
            <option value="NETWORK">Network</option>
            <option value="SOFTWARE">Software</option>
            <option value="OTHER">Other</option>
          </select>

          <label className="block mb-2">Employee:</label>
          {userRole === "USER" ? (
            <input
              type="text"
              value={employeeName}
              disabled
              className="w-full p-2 border rounded mb-4 bg-gray-100 cursor-not-allowed"
            />
          ) : (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Employee..."
                className="w-full p-2 border rounded mb-2"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {matchedEmployees.length > 0 && (
                <ul className="border rounded bg-white shadow max-h-40 overflow-auto">
                  {matchedEmployees.map((emp) => (
                    <li
                      key={emp.employeeId}
                      onClick={() => selectEmployee(emp)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {emp.username}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          <label className="block mb-2">Asset:</label>
          {userRole === "ADMIN" && (
            <>
              <input
                type="text"
                value={assetSearchQuery}
                onChange={handleAssetSearchChange}
                placeholder="Search Asset..."
                className="w-full p-2 border rounded mb-2"
              />
              {assetError && (
                <p className="text-red-500 text-sm">{assetError}</p>
              )}
              {matchedAssets.length > 0 && (
                <ul className="border rounded bg-white shadow max-h-40 overflow-auto">
                  {matchedAssets.map((a) => (
                    <li
                      key={a.assetTag}
                      onClick={() => selectAsset(a)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {a.name} ({a.assetTag})
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          <select
            value={selectedAsset}
            onChange={handleDropdownChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select an asset</option>
            {assets.map((a) => (
              <option key={a.id} value={a.assetTag}>
                {a.name} ({a.assetTag})
              </option>
            ))}
          </select>

          <label className="block mb-2">Location:</label>
          <input
            type="text"
            value={searchLocationQuery}
            onChange={handleLocationSearchChange}
            placeholder="Search Location..."
            className="w-full p-2 border rounded mb-2"
          />
          {locationError && (
            <p className="text-red-500 text-sm">{locationError}</p>
          )}

          {/* Dropdown for Matched Locations */}
          {matchedLocations.length > 0 && (
            <ul className="border rounded bg-white shadow max-h-40 overflow-auto">
              {matchedLocations.map((loc) => (
                <li
                  key={loc.id}
                  onClick={() => selectLocation(loc)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {loc.name} ({loc.address})
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
