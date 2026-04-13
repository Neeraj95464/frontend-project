import UsersTable from "../components/UsersTable";
import {
  fetchUsers,
  downloadUsersExcel,
  fetchSites,
  getLocationsBySite,
} from "../services/api";
import { Card, CardContent } from "@/components/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Agents = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    employeeId: "",
    username: "",
    role: "ADMIN", // ✅ Default role set to ADMIN
    department: "",
    siteId: "",
    locationId: "",
    search: "",
  });

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

  const loadData = async (pageToLoad = page) => {
    try {
      const res = await fetchUsers(filters, pageToLoad, size);
      setUsers(res.content || []);
      setTotalPages(res.totalPages || 0);
      setTotalElements(res.totalElements || 0);
      setPage(res.page ?? pageToLoad);
    } catch (err) {
      console.error("Error loading users", err);
    }
  };

  useEffect(() => {
    fetchSites()
      .then((res) => {
        const formatted = res.data.map((site) => ({
          siteId: site.id,
          name: site.name,
        }));
        setSites(formatted);
      })
      .catch((err) => console.error("Failed to fetch sites", err));
  }, []);

  useEffect(() => {
    if (filters.siteId) {
      getLocationsBySite(filters.siteId)
        .then((locs) => setLocations(locs))
        .catch((err) => console.error("Failed to fetch locations", err));
    } else {
      setLocations([]);
      setFilters((prev) => ({ ...prev, locationId: "" }));
    }
  }, [filters.siteId]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(0);
      loadData(0);
    }, 400);
    return () => clearTimeout(delay);
  }, [
    filters.search,
    filters.employeeId,
    filters.username,
    filters.role,
    filters.department,
    filters.siteId,
    filters.locationId,
  ]);

  useEffect(() => {
    loadData(page);
  }, [page]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (key === "siteId") {
        newFilters.locationId = "";
        setLocations([]);
      }
      return newFilters;
    });
    setPage(0);
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await downloadUsersExcel(filters);
      const blob = new Blob([res.data], {
        type:
          res.headers["content-type"] ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const disposition = res.headers["content-disposition"];
      let filename = "users.xlsx";

      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      }

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download Excel", err);
    }
  };

  const handleAddEmployee = () => navigate("/register");
  const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
  const handleSerialClick = (serialNumber) =>
    navigate(`/asset/${serialNumber}`);

  return (
    <div className="lg:ml-48 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={handleAddEmployee}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded font-medium text-xs shadow-md flex items-center gap-1"
        >
          Add Employee
        </button>

        <button
          type="button"
          onClick={handleDownloadExcel}
          className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm flex items-center gap-1"
        >
          Excel
        </button>

        {totalPages > 0 && (
          <div className="flex items-center gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-1.5 py-1 text-xs border rounded disabled:opacity-40"
            >
              ←
            </button>

            <span className="px-1.5 py-1 text-xs">
              {page + 1}/{totalPages} ({totalElements})
            </span>

            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-1.5 py-1 text-xs border rounded disabled:opacity-40"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-lg shadow-sm border mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            placeholder="EMP ID"
            value={filters.employeeId}
            onChange={(e) => handleFilterChange("employeeId", e.target.value)}
            className="w-28 border px-3 py-1.5 rounded text-sm"
          />

          <input
            placeholder="Username"
            value={filters.username}
            onChange={(e) => handleFilterChange("username", e.target.value)}
            className="w-32 border px-3 py-1.5 rounded text-sm"
          />

          {/* ✅ ROLE DROPDOWN */}
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
            className="w-32 border px-3 py-1.5 rounded text-sm bg-white"
          >
            <option value="EXECUTIVE">EXECUTIVE</option>
            <option value="ADMIN">ADMIN</option>
            <option value="HR_ADMIN">HR_ADMIN</option>
            <option value="MANAGER">MANAGER</option>
          </select>

          <input
            placeholder="Department"
            value={filters.department}
            onChange={(e) =>
              handleFilterChange("department", e.target.value)
            }
            className="w-36 border px-3 py-1.5 rounded text-sm"
          />

          <select
            value={filters.siteId || ""}
            onChange={(e) =>
              handleFilterChange("siteId", e.target.value || null)
            }
            className="w-32 border px-3 py-1.5 rounded text-sm bg-white"
          >
            <option value="">Site</option>
            {sites.map(({ siteId, name }) => (
              <option key={siteId} value={siteId}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={filters.locationId || ""}
            onChange={(e) =>
              handleFilterChange("locationId", e.target.value || null)
            }
            disabled={!filters.siteId}
            className="w-36 border px-3 py-1.5 rounded text-sm bg-white"
          >
            <option value="">Location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-40 border px-3 py-1.5 rounded text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0">
        <Card className="h-full flex flex-col">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-1 overflow-auto">
              <UsersTable
                users={users}
                onEdit={handleEdit}
                onSerialClick={handleSerialClick}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agents;