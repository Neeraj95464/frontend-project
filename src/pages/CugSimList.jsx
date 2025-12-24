import UserDetailsModal from "../components/UserDetailsModal";
import {
  fetchSimCards,
  fetchSites,
  getLocationsBySite,
  downloadSimExcel,
} from "../services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CugSimList() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const [filters, setFilters] = useState({
    phoneNumber: "",
    provider: "",
    status: "",
    employeeId: "",
    search: "",
    siteId: "",
    locationId: "",
  });

  const [sims, setSims] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

  const loadData = async () => {
    const response = await fetchSimCards(filters, page, size);
    // console.log("response was ", response);
    setSims(response.content);
    setTotalPages(response.totalPages);
    setTotalElements(response.totalElements);
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
      .catch((err) => {
        console.error("Failed to fetch sites", err);
      });
  }, []);

  useEffect(() => {
    if (filters.siteId) {
      getLocationsBySite(filters.siteId)
        .then((locations) => {
          setLocations(locations);
        })
        .catch((err) => {
          console.error("Error fetching locations", err);
        });
    } else {
      setLocations([]);
      setFilters((prev) => ({ ...prev, locationId: "" }));
    }
  }, [filters.siteId]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(0);
      loadData();
    }, 400);
    return () => clearTimeout(delay);
  }, [
    filters.phoneNumber,
    filters.provider,
    filters.status,
    filters.employeeId,
    filters.search,
    filters.siteId,
    filters.locationId,
  ]);

  useEffect(() => {
    loadData();
  }, [page]);

  const handleDownloadExcel = async () => {
    try {
      const res = await downloadSimExcel(filters);

      const blob = new Blob([res.data], {
        type:
          res.headers["content-type"] ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // try to get filename from Content-Disposition, otherwise fallback
      const disposition = res.headers["content-disposition"];
      let filename = "cug_sims.xlsx";
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

  const handleAddSim = () => navigate("/cug-sim/add");

  // const handleFilterChange = (key, value) => {
  //   // setFilters({ ...filters, [key]: value });

  //   setFilters((prev) => ({ ...prev, [key]: value }));
  //   setPage(0); // Reset to first page on filter change
  // };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };

      // ✅ CRITICAL: Reset location when site changes
      if (key === "siteId") {
        newFilters.locationId = ""; // Reset BEFORE API call
        setLocations([]); // Clear locations immediately
      }

      return newFilters;
    });
    setPage(0);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "INACTIVE":
        return "bg-red-100 text-red-700";
      case "SUSPENDED":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </span>
            CUG SIM Inventory
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage all SIM cards</p>
        </div>
        <button
          onClick={handleAddSim}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add SIM
        </button>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* SIM # */}
          <input
            placeholder="SIM #"
            value={filters.phoneNumber}
            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
            className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />

          {/* Provider */}
          <select
            value={filters.provider}
            onChange={(e) => handleFilterChange("provider", e.target.value)}
            className="w-24 sm:w-28 md:w-32 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Provider</option>
            <option value="AIRTEL">Airtel</option>
            <option value="VI">VI</option>
            <option value="JIO">Jio</option>
          </select>

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-28 sm:w-32 md:w-36 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="LOST">Lost</option>
            <option value="DEACTIVATED">Deactivated</option>
            <option value="REPLACED">Replaced</option>
            <option value="DISCARDED">Discarded</option>
          </select>

          {/* Emp ID */}
          <input
            placeholder="Emp ID"
            value={filters.employeeId}
            onChange={(e) => handleFilterChange("employeeId", e.target.value)}
            className="w-20 sm:w-24 md:w-28 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
          />

          {/* Site */}
          <select
            value={filters.siteId || ""}
            onChange={(e) =>
              handleFilterChange("siteId", e.target.value || null)
            }
            className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Site</option>
            {sites.map(({ siteId, name }) => (
              <option key={siteId} value={siteId}>
                {name}
              </option>
            ))}
          </select>

          {/* Location */}
          <select
            value={filters.locationId || ""}
            onChange={(e) =>
              handleFilterChange("locationId", e.target.value || null)
            }
            disabled={!filters.siteId}
            className="w-28 sm:w-32 md:w-40 border border-gray-200 px-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1 min-w-[120px] max-w-[180px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              placeholder="Search"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full border border-gray-200 pl-7 pr-2 py-1 rounded text-[11px] sm:text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Right side: Download + Pagination */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Download Excel (icon button + text) */}
            <button
              type="button"
              onClick={handleDownloadExcel}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs bg-green-600 hover:bg-green-700 text-white rounded shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
                <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
              </svg>
              <span className="hidden sm:inline">Excel</span>
            </button>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ←
                </button>
                <span className="px-2 py-1 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded">
                  {page + 1}/{totalPages} ({totalElements})
                </span>
                <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-2 py-1 text-[11px] sm:text-xs border border-gray-200 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Mobile Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Provider
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Site
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Assigned To
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sims.map((sim) => (
              <tr key={sim.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link
                    to={`/cug-sim/${sim.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {sim.phoneNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {sim.provider}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {sim.siteName || (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {sim.locationName || (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>
                {/* <td className="px-4 py-3 text-sm text-gray-700">
                  {sim.assignedUserName || (
                    <span className="text-gray-400 italic">Unassigned</span>
                  )}
                </td> */}
                {/* <td className="px-4 py-3 text-sm text-gray-700"></td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser(sim.assignedUserId);
                  }}
                  className="hover:underline truncate"
                >
                  {sim.assignedUserName || "Unassigned"}
                </button>
                </td> */}

                <td className="px-4 py-3 text-sm text-blue-600">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(sim.assignedUserId);
                    }}
                    className="hover:underline truncate"
                  >
                    {sim.assignedUserName || "Unassigned"}
                  </button>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      sim.status
                    )}`}
                  >
                    {sim.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/cug-sim/${sim.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sims.length === 0 && (
          <div className="text-center py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-300 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-sm">No SIM cards found</p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {sims.length > 0 ? (
          sims.map((sim) => (
            <Link
              key={sim.id}
              to={`/cug-sim/${sim.id}`}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-600 font-semibold">
                  {sim.phoneNumber}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    sim.status
                  )}`}
                >
                  {sim.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Provider:</span>
                  <span className="text-gray-700">{sim.provider}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Site:</span>
                  <span className="text-gray-700">
                    {sim.siteName || (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-700">
                    {sim.locationName || (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Assigned To:</span>
                  <span className="text-gray-700">
                    {sim.assignedUserName || (
                      <span className="text-gray-400 italic">Unassigned</span>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-300 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-sm">No SIM cards found</p>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserDetailsModal
          query={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
