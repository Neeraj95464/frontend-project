import {
  getAllAssignments,
  assignLocation,
  searchEmployees,
} from "../services/api";
import { useEffect, useState } from "react";

export default function LocationAssignmentTable() {
  const [assignments, setAssignments] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [searchInputs, setSearchInputs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAssignments();
        // console.log("Assignment data:", res.data);
        setAssignments(res.data || []);
      } catch (error) {
        console.error("Failed to load assignments:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = async (index, type, value) => {
    setSearchInputs((prev) => ({
      ...prev,
      [`${index}-${type}`]: value,
    }));

    if (value.trim().length < 2) {
      setSearchResults((prev) => ({
        ...prev,
        [`${index}-${type}`]: [],
      }));
      return;
    }

    const results = await searchEmployees(value);
    setSearchResults((prev) => ({
      ...prev,
      [`${index}-${type}`]: results,
    }));
  };

  const handleEmployeeSelect = (index, type, employeeId) => {
    const updated = [...assignments];
    if (type === "executive") {
      updated[index].executiveEmployeeId = employeeId;
    } else {
      updated[index].managerEmployeeId = employeeId;
    }
    setAssignments(updated);

    // Clear search results and input
    setSearchResults((prev) => ({ ...prev, [`${index}-${type}`]: [] }));
    setSearchInputs((prev) => ({ ...prev, [`${index}-${type}`]: "" }));
  };

  const handleSave = async (assignment) => {
    try {
      await assignLocation({
        locationId: assignment.locationId,
        ticketDepartment: assignment.ticketDepartment,
        executiveEmployeeId: assignment.executiveEmployeeId,
        managerEmployeeId: assignment.managerEmployeeId,
      });
      alert("Assignment saved!");
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save assignment.");
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Location Assignments</h2>
      <table className="min-w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Location</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">IT Executive</th>
            <th className="border p-2">Manager</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={index} className="border-b">
              <td className="border p-2">{a.locationName}</td>
              <td className="border p-2">
                {a.ticketDepartment || "Not Assigned"}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder={a.executiveEmployeeId || "Search Executive"}
                  className="border w-full p-1"
                  value={searchInputs[`${index}-executive`] || ""}
                  onChange={(e) =>
                    handleSearchChange(index, "executive", e.target.value)
                  }
                />
                {searchResults[`${index}-executive`] && (
                  <ul className="bg-white border max-h-40 overflow-auto">
                    {searchResults[`${index}-executive`].map((emp) => (
                      <li
                        key={emp.employeeId}
                        className="p-1 hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          handleEmployeeSelect(
                            index,
                            "executive",
                            emp.employeeId
                          )
                        }
                      >
                        {emp.username} ({emp.employeeId})
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder={a.managerEmployeeId || "Search Manager"}
                  className="border w-full p-1"
                  value={searchInputs[`${index}-manager`] || ""}
                  onChange={(e) =>
                    handleSearchChange(index, "manager", e.target.value)
                  }
                />
                {searchResults[`${index}-manager`] && (
                  <ul className="bg-white border max-h-40 overflow-auto">
                    {searchResults[`${index}-manager`].map((emp) => (
                      <li
                        key={emp.employeeId}
                        className="p-1 hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          handleEmployeeSelect(index, "manager", emp.employeeId)
                        }
                      >
                        {emp.employeeId} ({emp.username})
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="border p-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => handleSave(a)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
