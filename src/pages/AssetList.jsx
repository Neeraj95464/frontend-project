import api, {
  deleteAsset,
  fetchAssets,
  exportAssetsExcel,
  getSites,
  getLocationsBySite,
  getAssetCodes,
} from "../services/api";
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// fetchAssets is your existing API call

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // === Filters ===
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [purchaseStartDate, setPurchaseStartDate] = useState("");
  const [purchaseEndDate, setPurchaseEndDate] = useState("");
  const [createdStartDateTime, setCreatedStartDateTime] = useState("");
  const [createdEndDateTime, setCreatedEndDateTime] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedKeyword(searchKeyword), 400);
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  // Correct initialization
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

  // === Pagination ===
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });

  const pageSize = 10;

  useEffect(() => {
    getSites()
      .then((sitesData) => {
        setSites(sitesData); // directly set
      })
      .catch((err) => {
        console.error("Error loading sites", err);
      });
  }, []);

  // Fetch locations whenever the selected site changes
  useEffect(() => {
    if (selectedSite) {
      getLocationsBySite(selectedSite)
        .then((locationsData) => {
          // locationsData is already the array returned from backend
          setLocations(locationsData);
        })
        .catch((err) => {
          console.error("Error loading locations", err);
          setLocations([]);
        });
    } else {
      setLocations([]);
    }

    // Always reset the selectedLocation when site changes
    setSelectedLocation("");
  }, [selectedSite]);

  // Load assets from backend when filters/page change
  useEffect(() => {
    loadAssets();
  }, [
    selectedStatus,
    selectedType,
    selectedDepartment,
    createdBy,
    selectedSite,
    selectedLocation,
    purchaseStartDate,
    purchaseEndDate,
    createdStartDateTime,
    createdEndDateTime,
    debouncedKeyword,
    currentPage,
  ]);

  const loadAssets = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await fetchAssets({
        status: selectedStatus,
        type: selectedType,
        department: selectedDepartment,
        createdBy,
        siteId: selectedSite,
        locationId: selectedLocation,
        purchaseStart: purchaseStartDate,
        purchaseEnd: purchaseEndDate,
        createdStart: createdStartDateTime,
        createdEnd: createdEndDateTime,
        keyword: debouncedKeyword, // ✅ debounce value
        page: page,
        size: pageSize,
      });

      const {
        content = [],
        page: pageNumber,
        size: pageSizeFromApi,
        totalElements,
        totalPages,
        last,
      } = data || {};

      setAssets(content);
      setPaginationInfo({
        totalPages,
        totalElements,
        last,
        pageNumber,
        size: pageSizeFromApi,
        currentCount: content.length,
      });
      setCurrentPage(pageNumber);
    } catch (err) {
      console.error("Error fetching assets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (assetTag) => {
    if (
      window.confirm("Are you sure you want to delete this asset? ", assetTag)
    ) {
      try {
        await deleteAsset(assetTag);
        loadAssets(); // refresh current page
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  const handlePrintAllTags = async () => {
    try {
      // Wait for all API requests
      const tagList = await Promise.all(
        assets.map((asset) => getAssetCodes(asset.assetTag)),
      );

      navigate("/print/tags", {
        state: { tags: tagList },
      });
    } catch (error) {
      console.error("Error generating print tags", error);
    }
  };

  const handleEdit = (assetTag) => {
    navigate(`/asset/${assetTag}`);
  };

  const handleExport = () => {
    exportAssetsExcel({
      status: selectedStatus,
      type: selectedType,
      department: selectedDepartment,
      createdBy,
      siteId: selectedSite,
      locationId: selectedLocation,
      purchaseStart: purchaseStartDate,
      purchaseEnd: purchaseEndDate,
      createdStart: createdStartDateTime,
      createdEnd: createdEndDateTime,
      keyword: searchKeyword,
    });
  };

  return (
    <div className="pt-16 lg:ml-48">
      <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) => {
            setCurrentPage(0);
            setSelectedStatus(e.target.value);
          }}
          className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition text-sm"
        >
          <option value="">All Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="CHECKED_OUT">Checked Out</option>
          <option value="IN_REPAIR">In Repair</option>
          <option value="LOST">Lost</option>
          <option value="DISPOSED">Disposed</option>
          <option value="DELETED">Deleted</option>
          <option value="PENDING">UAP</option>
        </select>

        {/* Type */}
        <select
          value={selectedType}
          onChange={(e) => {
            setCurrentPage(0);
            setSelectedType(e.target.value);
          }}
          className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
        >
          <option value="">All Types</option>
          <option value="LAPTOP">Laptop</option>
          <option value="DESKTOP">Desktop</option>
          <option value="SERVER">Server</option>
        </select>

        {/* Department */}
        <select
          value={selectedDepartment}
          onChange={(e) => {
            setCurrentPage(0);
            setSelectedDepartment(e.target.value);
          }}
          className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="FINANCE">Finance</option>
        </select>

        {/* Site */}
        <select
          value={selectedSite}
          onChange={(e) => {
            setCurrentPage(0);
            setSelectedSite(e.target.value);
          }}
          className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
        >
          <option value="">All Sites</option>
          {sites?.map((site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          value={selectedLocation}
          onChange={(e) => {
            setCurrentPage(0);
            setSelectedLocation(e.target.value);
          }}
          className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
          disabled={!locations.length}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchKeyword}
          onChange={(e) => {
            setCurrentPage(0);
            setSearchKeyword(e.target.value);
          }}
          className="border px-2 py-1 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-40 sm:w-48 text-sm"
        />

        {/* Download Button */}
        <button
          onClick={() =>
            exportAssetsExcel({
              status: selectedStatus,
              type: selectedType,
              department: selectedDepartment,
              createdBy,
              siteId: selectedSite,
              locationId: selectedLocation,
              purchaseStart: purchaseStartDate,
              purchaseEnd: purchaseEndDate,
              createdStart: createdStartDateTime,
              createdEnd: createdEndDateTime,
              keyword: searchKeyword,
            })
          }
          className="px-3 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 transition text-sm flex items-center gap-1"
        >
          📥 Excel
        </button>

        {/* Pagination */}
        <div className="flex items-center gap-2 text-sm">
          {/* Previous button */}
          <button
            onClick={() => {
              if (currentPage > 0) {
                // only go back if not on first page
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
                loadAssets(newPage); // pass newPage to prevent async state issues
              }
            }}
            disabled={currentPage === 0}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 
               disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>

          <span className="text-sm text-gray-700">
            {paginationInfo.totalElements === 0
              ? "0 of 0   Total: 0"
              : `${currentPage + 1} of ${paginationInfo.totalPages}   Total: ${
                  paginationInfo.totalElements
                }`}
          </span>

          {/* Next button */}
          <button
            onClick={() => {
              if (!paginationInfo.last) {
                // only go forward if not on last page
                const newPage = currentPage + 1;
                setCurrentPage(newPage);
                loadAssets(newPage); // pass newPage here too
              }
            }}
            disabled={paginationInfo.last}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 
               disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
        {/* <button
          onClick={() => navigate("/print/tags")}
          className="px-3 py-1 bg-purple-600 text-white rounded shadow-sm hover:bg-purple-700"
        >
          🖨️ Print Tags
        </button> */}

        <button
          onClick={handlePrintAllTags}
          className="px-3 py-1 bg-purple-600 text-white rounded shadow-sm hover:bg-purple-700"
        >
          🖨️ Print All Tags
        </button>
      </div>

      {/* === Data Table === */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-700 border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white sticky top-0 z-10">
            <tr>
              {[
                "Asset Tag",
                "Status",
                "Name",
                "Brand",
                "Model",
                "Department",
                "Asset Type",
                "Created By",
                "Description",
                "Serial No.",
                "Purchase Date",
                "Location",
                "Assigned User",
                "Status Note",
                "Reservation Start",
                "Reservation End",
                "Actions",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2 border border-gray-300 text-left whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr
                key={asset.assetTag}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2 border border-gray-300">
                  <button
                    onClick={() => handleEdit(asset.assetTag)}
                    className="text-blue-500 hover:underline"
                  >
                    {asset.assetTag}
                  </button>
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      asset.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : asset.status === "Assigned"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="px-2 py-1 border max-w-[200px] truncate">
                  {asset.name}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.brand}
                </td>
                <td className="px-2 py-1 border max-w-[200px] truncate">
                  {asset.model}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.department}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.assetType}
                </td>
                <td className="px-2 py-1 border max-w-[200px] truncate">
                  {asset.createdBy}
                </td>
                <td
                  className="px-2 py-1 border max-w-[200px] truncate"
                  title={asset.description}
                >
                  {asset.description || "-"}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.serialNumber}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.purchaseDate}
                </td>

                <td className="px-2 py-1 border max-w-[200px] truncate">
                  {asset.locationName}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.assignedUserName}
                </td>
                <td
                  className="px-2 py-1 border max-w-[200px] truncate"
                  title={asset.statusNote}
                >
                  {asset.statusNote || "-"}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.reservationStartDate}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {asset.reservationEndDate}
                </td>
                <td className="px-3 py-2 border border-gray-300 text-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(asset.assetTag)}
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(asset.assetTag)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && assets.length === 0 && (
              <tr>
                <td
                  colSpan="17"
                  className="px-4 py-3 text-center text-gray-500 border border-gray-300"
                >
                  No assets found.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td
                  colSpan="17"
                  className="px-4 py-3 text-center text-gray-500 border border-gray-300"
                >
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
