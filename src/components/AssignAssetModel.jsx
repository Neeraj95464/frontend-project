import {
  getAssetByAssetTag,
  getSites,
  getDepartments,
  getLocationsBySite,
  searchEmployees,
  assignAsset,
} from "../services/api";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AssignAssetModal = ({ assetTag, isOpen, onClose }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [matchedEmployees, setMatchedEmployees] = useState([]);
  const navigate = useNavigate();

  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedSite = watch("siteId");
  const selectedLocation = watch("locationId");

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const loadInitialData = async () => {
    try {
      const [asset, sitesData, departmentsData] = await Promise.all([
        getAssetByAssetTag(assetTag),
        getSites(),
        getDepartments(),
      ]);

      setSites(sitesData);
      setDepartments(departmentsData);

      if (asset.siteId) {
        setValue("siteId", asset.siteId);
        fetchLocationData(asset.siteId);
      }
      if (asset.locationId) {
        setValue("locationId", asset.locationId);
      }
      if (asset.department) {
        setValue("department", asset.department);
      }
    } catch (err) {
      setError("Failed to fetch initial data.");
    }
  };

  const fetchLocationData = async (siteId) => {
    try {
      const locationsData = await getLocationsBySite(siteId);
      setLocations(locationsData);
    } catch {
      setError("Failed to load locations.");
    }
  };

  useEffect(() => {
    if (selectedSite) {
      fetchLocationData(selectedSite);
    }
  }, [selectedSite]);

  // const handleSearchChange = async (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   if (!query) {
  //     setMatchedEmployees([]);
  //     setSelectedEmployee(null);
  //     return;
  //   }

  //   try {
  //     const employees = await searchEmployees(query);
  //     setMatchedEmployees(employees);
  //   } catch {
  //     setMatchedEmployees([]);
  //   }
  // };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setMatchedEmployees([]);
      setSelectedEmployee(null);
      setError(""); // ✅ Clear error when input is cleared
      return;
    }

    try {
      const employees = await searchEmployees(query);

      if (employees.length === 0) {
        setError("No employees found.");
      } else {
        setError(""); // ✅ Clear error if employees are found
      }

      setMatchedEmployees(employees);
    } catch {
      setError("Error searching employees.");
      setMatchedEmployees([]);
    }
  };

  const handleSiteChange = (e) => {
    setValue("siteId", e.target.value);
    fetchLocationData(e.target.value);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setSearchQuery(`${employee.username} (${employee.id})`);
    setValue("userId", employee.id);
    setMatchedEmployees([]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    if (!data.userId || !data.siteId || !data.locationId) {
      setError("❌ User, Site, and Location are required.");
      setLoading(false);
      return;
    }

    const payload = {
      checkOutDate: new Date().toISOString(),
      assignedTo: { id: data.userId },
      site: { id: data.siteId },
      location: { id: data.locationId },
      department: data.department || null,
      checkOutNote: data.checkOutNote?.trim() || "",
    };

    try {
      await assignAsset(assetTag, payload);
      alert(`✅ Asset assigned successfully to User ${data.userId}`);
      reset();
      onClose();
    } catch (err) {
      setError(`❌ ${err}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Check Out Asset</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search employee..."
              className="border p-2 w-full rounded"
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 p-2 rounded text-white"
              onClick={() => navigate("/create-user")}
            >
              <Plus size={16} />
            </button>
          </div>

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

          <input type="hidden" {...register("userId", { required: true })} />
          <div>
            <label className="block text-sm font-medium">Site:</label>
            <select
              {...register("siteId", { required: true })}
              className="w-full border p-2 rounded mt-1"
              onChange={handleSiteChange}
              value={selectedSite || ""}
            >
              <option value="">Select Site</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Location:</label>
            <select
              {...register("locationId", { required: true })}
              className="w-full border p-2 rounded mt-1"
              value={selectedLocation || ""}
              onChange={(e) => setValue("locationId", e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <select
            {...register("department", { required: true })}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <textarea
            {...register("checkOutNote", { required: true })}
            className="w-full border p-2 rounded mt-1"
            placeholder="Check-Out Note"
          ></textarea>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Assigning..." : "Check Out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignAssetModal;
