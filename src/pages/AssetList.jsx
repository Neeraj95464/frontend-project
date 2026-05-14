

import api, {
  deleteAsset,
  fetchAssets,
  exportAssetsExcel,
  getSites,
  getLocationsBySite,
  getAssetCodes,
} from "../services/api";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiEdit, FiTrash2, FiRefreshCw, FiDownload, FiPrinter, FiSearch, FiChevronLeft, FiChevronRight, FiSliders, FiX } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import PageContainer from "../components/PageContainer";

const STATUS_COLORS = {
  AVAILABLE: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  CHECKED_OUT: "bg-rose-100 text-rose-700 border border-rose-200",
  IN_REPAIR: "bg-amber-100 text-amber-700 border border-amber-200",
  LOST: "bg-orange-100 text-orange-700 border border-orange-200",
  DISPOSED: "bg-gray-200 text-gray-600 border border-gray-300",
  DELETED: "bg-red-200 text-red-700 border border-red-300",
  UAP: "bg-purple-100 text-purple-700 border border-purple-200",
};

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialMount = useRef(true);
  const advancedPanelRef = useRef(null);

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
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedKeyword(searchKeyword), 400);
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

  // === Pagination ===
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });

  // Close advanced panel on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (advancedPanelRef.current && !advancedPanelRef.current.contains(e.target)) {
        setAdvancedOpen(false);
      }
    };
    if (advancedOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [advancedOpen]);

  // Count active advanced filters for badge
  const activeAdvancedCount = [
    selectedType, selectedDepartment, selectedSite, selectedLocation,
    createdBy, purchaseStartDate, purchaseEndDate, createdStartDateTime, createdEndDateTime
  ].filter(Boolean).length;

  const getFiltersFromURL = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return {
      selectedStatus: params.get("status") || "",
      selectedType: params.get("type") || "",
      selectedDepartment: params.get("department") || "",
      createdBy: params.get("createdBy") || "",
      selectedSite: params.get("siteId") || "",
      selectedLocation: params.get("locationId") || "",
      purchaseStartDate: params.get("purchaseStart") || "",
      purchaseEndDate: params.get("purchaseEnd") || "",
      createdStartDateTime: params.get("createdStart") || "",
      createdEndDateTime: params.get("createdEnd") || "",
      searchKeyword: params.get("keyword") || "",
      currentPage: parseInt(params.get("page")) || 0,
      pageSize: parseInt(params.get("size")) || 20,
    };
  }, [location.search]);

  const loadAssets = useCallback(async (page, filters = null, size = null) => {
    setLoading(true);
    try {
      const data = await fetchAssets({
        status: (filters?.selectedStatus ?? selectedStatus) || undefined,
        type: (filters?.selectedType ?? selectedType) || undefined,
        department: (filters?.selectedDepartment ?? selectedDepartment) || undefined,
        createdBy: (filters?.createdBy ?? createdBy) || undefined,
        siteId: (filters?.selectedSite ?? selectedSite) || undefined,
        locationId: (filters?.selectedLocation ?? selectedLocation) || undefined,
        purchaseStart: (filters?.purchaseStartDate ?? purchaseStartDate) || undefined,
        purchaseEnd: (filters?.purchaseEndDate ?? purchaseEndDate) || undefined,
        createdStart: (filters?.createdStartDateTime ?? createdStartDateTime) || undefined,
        createdEnd: (filters?.createdEndDateTime ?? createdEndDateTime) || undefined,
        keyword: (filters?.searchKeyword ?? debouncedKeyword) || undefined,
        page,
        size: size ?? pageSize,
      });

      const { content = [], page: pageNumber, totalElements, totalPages, last } = data || {};
      setAssets(content);
      setPaginationInfo({ totalPages, totalElements, last, pageNumber, size: size ?? pageSize, currentCount: content.length });
      setCurrentPage(pageNumber);
    } catch (err) {
      console.error("Error fetching assets:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, selectedType, selectedDepartment, createdBy, selectedSite, selectedLocation, purchaseStartDate, purchaseEndDate, createdStartDateTime, createdEndDateTime, debouncedKeyword, pageSize]);

  // Initialize from URL
  useEffect(() => {
    if (isInitialMount.current) {
      const urlFilters = getFiltersFromURL();
      setSelectedStatus(urlFilters.selectedStatus);
      setSelectedType(urlFilters.selectedType);
      setSelectedDepartment(urlFilters.selectedDepartment);
      setCreatedBy(urlFilters.createdBy);
      setSelectedSite(urlFilters.selectedSite);
      setSelectedLocation(urlFilters.selectedLocation);
      setPurchaseStartDate(urlFilters.purchaseStartDate);
      setPurchaseEndDate(urlFilters.purchaseEndDate);
      setCreatedStartDateTime(urlFilters.createdStartDateTime);
      setCreatedEndDateTime(urlFilters.createdEndDateTime);
      setSearchKeyword(urlFilters.searchKeyword);
      setPageSize(urlFilters.pageSize);

      const loadInitialData = async () => {
        setLoading(true);
        try {
          const data = await fetchAssets({
            status: urlFilters.selectedStatus || undefined,
            type: urlFilters.selectedType || undefined,
            department: urlFilters.selectedDepartment || undefined,
            createdBy: urlFilters.createdBy || undefined,
            siteId: urlFilters.selectedSite || undefined,
            locationId: urlFilters.selectedLocation || undefined,
            purchaseStart: urlFilters.purchaseStartDate || undefined,
            purchaseEnd: urlFilters.purchaseEndDate || undefined,
            createdStart: urlFilters.createdStartDateTime || undefined,
            createdEnd: urlFilters.createdEndDateTime || undefined,
            keyword: urlFilters.searchKeyword || undefined,
            page: urlFilters.currentPage,
            size: urlFilters.pageSize,
          });
          const { content = [], page: pageNumber, totalElements, totalPages, last } = data || {};
          setAssets(content);
          setPaginationInfo({ totalPages, totalElements, last, pageNumber, size: urlFilters.pageSize, currentCount: content.length });
          setCurrentPage(pageNumber);
        } catch (err) {
          console.error("Error fetching assets:", err);
        } finally {
          setLoading(false);
          isInitialMount.current = false;
        }
      };
      loadInitialData();
    }
  }, [getFiltersFromURL]);

  useEffect(() => {
    getSites().then(setSites).catch((err) => console.error("Error loading sites", err));
  }, []);

  useEffect(() => {
    if (selectedSite) {
      getLocationsBySite(selectedSite).then(setLocations).catch(() => setLocations([]));
    } else {
      setLocations([]);
    }
  }, [selectedSite]);

  useEffect(() => {
    if (!isInitialMount.current) {
      setCurrentPage(0);
      loadAssets(0);
    }
  }, [selectedStatus, selectedType, selectedDepartment, createdBy, selectedSite, selectedLocation, purchaseStartDate, purchaseEndDate, createdStartDateTime, createdEndDateTime, debouncedKeyword, loadAssets]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < paginationInfo.totalPages && !loading && !isInitialMount.current) {
      setCurrentPage(newPage);
      loadAssets(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
    if (!isInitialMount.current) loadAssets(0, null, newSize);
  };

  // Update URL
  useEffect(() => {
    if (!isInitialMount.current) {
      const timeoutId = setTimeout(() => {
        const params = new URLSearchParams();
        if (selectedStatus) params.set("status", selectedStatus);
        if (selectedType) params.set("type", selectedType);
        if (selectedDepartment) params.set("department", selectedDepartment);
        if (createdBy) params.set("createdBy", createdBy);
        if (selectedSite) params.set("siteId", selectedSite);
        if (selectedLocation) params.set("locationId", selectedLocation);
        if (purchaseStartDate) params.set("purchaseStart", purchaseStartDate);
        if (purchaseEndDate) params.set("purchaseEnd", purchaseEndDate);
        if (createdStartDateTime) params.set("createdStart", createdStartDateTime);
        if (createdEndDateTime) params.set("createdEnd", createdEndDateTime);
        if (searchKeyword) params.set("keyword", searchKeyword);
        if (currentPage > 0) params.set("page", currentPage.toString());
        params.set("size", pageSize.toString());

        const newUrl = `${location.pathname}?${params.toString()}`;
        const currentUrl = `${location.pathname}${location.search}`;
        if (newUrl !== currentUrl) navigate(newUrl, { replace: true });
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedStatus, selectedType, selectedDepartment, createdBy, selectedSite, selectedLocation, purchaseStartDate, purchaseEndDate, createdStartDateTime, createdEndDateTime, searchKeyword, currentPage, pageSize, location.pathname, location.search, navigate]);

  const handleDelete = async (assetTag) => {
    if (window.confirm("Are you sure you want to delete asset: " + assetTag)) {
      try {
        await deleteAsset(assetTag);
        loadAssets(currentPage);
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  const handlePrintAllTags = async () => {
    try {
      const tagList = await Promise.all(assets.map((asset) => getAssetCodes(asset.assetTag)));
      navigate("/print/tags", { state: { tags: tagList } });
    } catch (error) {
      console.error("Error generating print tags", error);
    }
  };

  const handleEdit = (assetTag) => {
    navigate(`/asset/${assetTag}`, { state: { returnUrl: location.pathname + location.search } });
  };

  const handleExport = () => {
    exportAssetsExcel({ status: selectedStatus, type: selectedType, department: selectedDepartment, createdBy, siteId: selectedSite, locationId: selectedLocation, purchaseStart: purchaseStartDate, purchaseEnd: purchaseEndDate, createdStart: createdStartDateTime, createdEnd: createdEndDateTime, keyword: searchKeyword });
  };

  const handleResetFilters = () => {
    setSelectedStatus(""); setSelectedType(""); setSelectedDepartment(""); setCreatedBy("");
    setSelectedSite(""); setSelectedLocation(""); setPurchaseStartDate(""); setPurchaseEndDate("");
    setCreatedStartDateTime(""); setCreatedEndDateTime(""); setSearchKeyword(""); setCurrentPage(0);
    loadAssets(0);
  };

  const handleResetAdvanced = () => {
    setSelectedType(""); setSelectedDepartment(""); setCreatedBy("");
    setSelectedSite(""); setSelectedLocation(""); setPurchaseStartDate(""); setPurchaseEndDate("");
    setCreatedStartDateTime(""); setCreatedEndDateTime("");
  };

  const selectClass = "border border-gray-200 bg-white px-2 py-1.5 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm hover:border-blue-300 cursor-pointer";
  const inputClass = "border border-gray-200 bg-white px-2 py-1.5 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm hover:border-blue-300";

  // Pagination range display
  const from = paginationInfo.totalElements === 0 ? 0 : currentPage * pageSize + 1;
  const to = Math.min((currentPage + 1) * pageSize, paginationInfo.totalElements);

  return (
    <PageContainer title="Assets Management">
      <style>{`
        .asset-table th { white-space: nowrap; }
        .asset-table td { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px; }
        .asset-table td.no-truncate { overflow: visible; max-width: none; }
        .filters-bar { background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%); }
        .btn-action { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; }
        .btn-reset { background: #f1f5f9; color: #64748b; }
        .btn-reset:hover { background: #e2e8f0; color: #475569; }
        .btn-export { background: linear-gradient(135deg, #10b981, #059669); color: white; }
        .btn-export:hover { background: linear-gradient(135deg, #059669, #047857); transform: translateY(-1px); box-shadow: 0 2px 8px rgba(16,185,129,0.3); }
        .btn-print { background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; }
        .btn-print:hover { background: linear-gradient(135deg, #7c3aed, #6d28d9); transform: translateY(-1px); box-shadow: 0 2px 8px rgba(139,92,246,0.3); }
        .btn-advanced { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; background: white; color: #374151; border: 1.5px solid #e2e8f0; position: relative; }
        .btn-advanced:hover { border-color: #3b82f6; color: #2563eb; background: #eff6ff; }
        .btn-advanced.active { border-color: #3b82f6; color: #2563eb; background: #eff6ff; }
        .badge { position: absolute; top: -6px; right: -6px; background: #ef4444; color: white; border-radius: 999px; font-size: 10px; font-weight: 700; min-width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; padding: 0 4px; border: 2px solid white; }
        .page-btn { padding: 5px 10px; border-radius: 7px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-size: 12px; color: #374151; transition: all 0.15s; display: inline-flex; align-items: center; gap: 3px; }
        .page-btn:hover:not(:disabled) { background: #3b82f6; color: white; border-color: #3b82f6; }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .shimmer { background: linear-gradient(90deg, #f0f4ff 25%, #e8eeff 50%, #f0f4ff 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .table-header-cell { background: linear-gradient(135deg, #1d4ed8, #2563eb); }
        .row-hover:hover { background-color: #f8faff !important; }

        /* Advanced panel */
        .advanced-panel { position: absolute; top: calc(100% + 8px); right: 0; z-index: 200; background: white; border: 1.5px solid #dbeafe; border-radius: 14px; box-shadow: 0 8px 32px rgba(37,99,235,0.13), 0 2px 8px rgba(0,0,0,0.07); padding: 18px 20px 16px 20px; min-width: 420px; animation: panelIn 0.18s cubic-bezier(.4,0,.2,1); }
        @keyframes panelIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .advanced-panel-title { font-size: 12px; font-weight: 700; color: #1e40af; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; }
        .advanced-panel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .adv-label { font-size: 10px; font-weight: 600; color: #6b7280; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.04em; }
        .adv-divider { border: none; border-top: 1px solid #e0e7ff; margin: 14px 0 12px; }
        .adv-section-title { font-size: 10px; font-weight: 700; color: #93c5fd; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
        .adv-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 14px; }
      `}</style>

      {/* ===== FILTER BAR ===== */}
      <div className="filters-bar rounded-xl border border-blue-100 p-3 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center">

          {/* Status — stays on top bar */}
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={selectClass} style={{ minWidth: 110 }}>
            <option value="">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="CHECKED_OUT">Checked Out</option>
            <option value="IN_REPAIR">In Repair</option>
            <option value="LOST">Lost</option>
            <option value="DISPOSED">Disposed</option>
            <option value="DELETED">Deleted</option>
            <option value="UAP">UAP</option>
          </select>

          {/* Search — stays on top bar */}
          <div className="relative flex items-center">
            <FiSearch className="absolute left-2 text-gray-400" size={12} />
            <input
              type="text"
              placeholder="Search keyword..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className={inputClass + " pl-6"}
              style={{ minWidth: 160 }}
            />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />

          {/* Advanced Filters button — dropdown trigger */}
          <div className="relative" ref={advancedPanelRef}>
            <button
              className={`btn-advanced${advancedOpen || activeAdvancedCount > 0 ? " active" : ""}`}
              onClick={() => setAdvancedOpen((v) => !v)}
              title="Advanced Filters & Export"
            >
              <FiSliders size={12} />
              Advanced
              {activeAdvancedCount > 0 && <span className="badge">{activeAdvancedCount}</span>}
            </button>

            {advancedOpen && (
              <div className="advanced-panel">
                <div className="advanced-panel-title">
                  <span>Advanced Filters &amp; Export</span>
                  <button onClick={() => setAdvancedOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}>
                    <FiX size={15} />
                  </button>
                </div>

                {/* Filters grid */}
                <div className="advanced-panel-grid">
                  {/* Type */}
                  <div>
                    <div className="adv-label">Asset Type</div>
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className={selectClass} style={{ width: "100%" }}>
                      <option value="">All Types</option>
                      <option value="LAPTOP">Laptop</option>
                      <option value="DESKTOP">Desktop</option>
                      <option value="MOBILE">Mobile</option>
                      <option value="PRINTER">Printer</option>
                      <option value="SERVER">Server</option>
                      <option value="NETWORK_DEVICE">Network Device</option>
                      <option value="SOFTWARE">Software</option>
                      <option value="OTHERS">Others</option>
                      <option value="CCTV">CCTV</option>
                      <option value="COMPUTER">Computer</option>
                      <option value="EQUIPMENT">Equipment</option>
                      <option value="FIREWALL">Firewall</option>
                      <option value="INTANGIBLE">Intangible</option>
                      <option value="ASSETS">Assets</option>
                      <option value="IPAD">iPad</option>
                      <option value="KIOSK">Kiosk</option>
                      <option value="NETWORK">Network</option>
                      <option value="DEVICES">Devices</option>
                      <option value="PROJECTOR">Projector</option>
                      <option value="TAB">Tab</option>
                      <option value="TOUGHBOOK_ODIS">Toughbook ODIS</option>
                      <option value="UPS">UPS</option>
                      <option value="UPS_BATTERIES">UPS Batteries</option>
                      <option value="VEHICLES">Vehicles</option>
                      <option value="XENTRY_DIAGNOSTIC_DEVICE">Xentry Diag.</option>
                      <option value="NVR">NVR</option>
                      <option value="BATTERY">Battery</option>
                      <option value="DVR">DVR</option>
                      <option value="WIFI_CAMERA">WiFi Camera</option>
                      <option value="TV">TV</option>
                      <option value="DIGITAL_ELEMENTS">Digital Elements</option>
                    </select>
                  </div>

                  {/* Department */}
                  <div>
                    <div className="adv-label">Department</div>
                    <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className={selectClass} style={{ width: "100%" }}>
                      <option value="">All Depts</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="FINANCE">Finance</option>
                    </select>
                  </div>

                  {/* Site */}
                  <div>
                    <div className="adv-label">Site</div>
                    <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)} className={selectClass} style={{ width: "100%" }}>
                      <option value="">All Sites</option>
                      {sites?.map((site) => (
                        <option key={site.id} value={site.id}>{site.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <div className="adv-label">Location</div>
                    <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className={selectClass} style={{ width: "100%" }} disabled={!locations.length}>
                      <option value="">All Locations</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Created By */}
                  <div style={{ gridColumn: "span 2" }}>
                    <div className="adv-label">Created By</div>
                    <input
                      type="text"
                      placeholder="Created by..."
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      className={inputClass}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                <hr className="adv-divider" />

                {/* Page size & Export row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Show:</span>
                    {[10, 20, 50, 100].map((n) => (
                      <button
                        key={n}
                        onClick={() => { handlePageSizeChange(n); }}
                        className={`px-2 py-0.5 rounded text-xs border transition-all ${pageSize === n ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleResetAdvanced} className="btn-action btn-reset">
                      <FiRefreshCw size={11} /> Clear
                    </button>
                    <button onClick={() => { handleExport(); setAdvancedOpen(false); }} className="btn-action btn-export">
                      <FiDownload size={11} /> Export
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Global Reset */}
          <button onClick={handleResetFilters} className="btn-action btn-reset">
            <FiRefreshCw size={11} /> Reset All
          </button>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Pagination — stays on top bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium" style={{ whiteSpace: "nowrap" }}>
              {paginationInfo.totalElements > 0 ? (
                <>{from}–{to} of <span className="text-blue-600 font-semibold">{paginationInfo.totalElements}</span></>
              ) : (
                <span className="text-gray-400">0 assets</span>
              )}
            </span>
            <button onClick={() => handlePageChange(0)} disabled={currentPage === 0 || loading} className="page-btn">«</button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0 || loading} className="page-btn">
              <FiChevronLeft size={12} /> Prev
            </button>
            <span className="text-xs text-gray-600 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100 font-medium" style={{ whiteSpace: "nowrap" }}>
              Page <span className="text-blue-700">{currentPage + 1}</span> / {paginationInfo.totalPages || 1}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={paginationInfo.last || loading} className="page-btn">
              Next <FiChevronRight size={12} />
            </button>
            <button onClick={() => handlePageChange(paginationInfo.totalPages - 1)} disabled={paginationInfo.last || loading} className="page-btn">»</button>
          </div>

        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-xs text-gray-700 asset-table" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "#", "Asset Tag", "Status", "Serial No.", "Location", "Assigned User", "Brand", "Model", "Department",
                "Asset Type", "Created By", "Description",
                "Purchase Date", "Actions",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="table-header-cell px-3 py-2.5 text-left text-white font-semibold text-xs tracking-wide"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8faff" }}>
                  {Array.from({ length: 14 }).map((__, j) => (
                    <td key={j} className="px-3 py-2.5 border-b border-gray-100">
                      <div className="shimmer h-3 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="14" className="px-4 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#f0f4ff"/><path d="M12 28l5-5m0 0a7 7 0 1 0 9.9-9.9A7 7 0 0 0 17 23z" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className="text-sm font-medium text-gray-500">No assets found</span>
                    <span className="text-xs text-gray-400">Try adjusting your filters or reset them</span>
                  </div>
                </td>
              </tr>
            ) : (
              assets.map((asset, i) => (
                <tr
                  key={asset.assetTag}
                  className="row-hover"
                  style={{ background: i % 2 === 0 ? "#fff" : "#f9fbff", borderBottom: "1px solid #f0f4ff" }}
                >
                  {/* Serial Number */}
                  <td className="px-3 py-2 no-truncate border-b border-gray-100">
                    <span className="text-gray-400 font-medium tabular-nums" style={{ minWidth: 28, display: "inline-block", textAlign: "right" }}>
                      {currentPage * pageSize + i + 1}
                    </span>
                  </td>
                  <td className="px-3 py-2 no-truncate border-b border-gray-100">
                    <button
                      onClick={() => handleEdit(asset.assetTag)}
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline whitespace-nowrap"
                    >
                      {asset.assetTag}
                    </button>
                  </td>
                  <td className="px-3 py-2 no-truncate border-b border-gray-100">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${STATUS_COLORS[asset.status] || "bg-gray-100 text-gray-600"}`}>
                      {asset.status}
                    </span>
                  </td>
                                    <td className="px-3 py-2 border-b border-gray-100" title={asset.serialNumber}>{asset.serialNumber}</td>
                                    <td className="px-3 py-2 border-b border-gray-100" title={asset.locationName}>{asset.locationName}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.assignedUserName}>
                    {asset.assignedUserName || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.brand}>{asset.brand}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.model}>{asset.model}</td>
                  <td className="px-3 py-2 border-b border-gray-100">{asset.department}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.assetType}>{asset.assetType}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.createdBy}>{asset.createdBy}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.description}>
                    {asset.description || <span className="text-gray-300">—</span>}
                  </td>

                  <td className="px-3 py-2 border-b border-gray-100 whitespace-nowrap">{asset.purchaseDate}</td>
                  
                  <td className="px-3 py-2 border-b border-gray-100 no-truncate">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(asset.assetTag)}
                        title="Edit"
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                      >
                        <FiEdit size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(asset.assetTag)}
                        title="Delete"
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
};

export default AssetList;