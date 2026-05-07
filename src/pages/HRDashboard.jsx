

import React, { useState, useEffect, useCallback, useRef } from "react";
import { format } from "date-fns";
import { employeeItemApi } from "../services/api";
import AssignItemModal from "../components/AssignItemModal";
import BulkImportModal from '../components/BulkImportModal';

import {
  SlidersHorizontal, X, ChevronLeft, ChevronRight,
  RefreshCw, Send, Package, Clock, CheckCircle2,
  Shirt, AlertTriangle,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZES = [10, 20, 50, 100];

const STATUS_BADGE = {
  ACKNOWLEDGED:           "bg-emerald-100 text-emerald-700 border border-emerald-200",
  PENDING_ACKNOWLEDGEMENT:"bg-amber-100 text-amber-700 border border-amber-200",
  PENDING_PICKUP:         "bg-blue-100 text-blue-700 border border-blue-200",
  PARTIALLY_PICKED_UP:    "bg-violet-100 text-violet-700 border border-violet-200",
  PICKED_UP:              "bg-indigo-100 text-indigo-700 border border-indigo-200",
  RETURNED:               "bg-gray-100 text-gray-600 border border-gray-200",
  REJECTED:               "bg-red-100 text-red-700 border border-red-200",
};

const STATUS_LABELS = {
  ACKNOWLEDGED:           "Acknowledged",
  PENDING_ACKNOWLEDGEMENT:"Pending",
  PENDING_PICKUP:         "Pending Pickup",
  PARTIALLY_PICKED_UP:    "Partial Pickup",
  PICKED_UP:              "Picked Up",
  RETURNED:               "Returned",
  REJECTED:               "Rejected",
};

const ITEM_TYPE_BADGE = {
  ID_CARD:            "bg-sky-100 text-sky-700 border border-sky-200",
  APPOINTMENT_LETTER: "bg-teal-100 text-teal-700 border border-teal-200",
  DRESS:              "bg-pink-100 text-pink-700 border border-pink-200",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent, sub }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm px-3 py-2.5 flex items-center gap-3 ${accent}`}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide leading-none">{title}</p>
        <p className="text-lg font-bold text-gray-800 leading-tight mt-0.5">{(value || 0).toLocaleString()}</p>
        {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HRDashboard() {
  const advancedRef = useRef(null);

  const [activeStatus, setActiveStatus] = useState("ALL");
  const [items, setItems]               = useState([]);
  const [loading, setLoading]           = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [stats, setStats] = useState({
    totalItems: 0, pendingAcceptance: 0, acknowledged: 0, dressItems: 0,
  });

  const [filters, setFilters] = useState({
    itemType: "", employeeId: "", keyword: "",
    assignedDateStart: "", assignedDateEnd: "", isActive: true,
  });

  const [pagination, setPagination] = useState({
    page: 0, size: 10, totalElements: 0, totalPages: 0,
  });

  // ── Advanced filter count badge ──────────────────────────────────────────
  const advancedFilterCount = [
    filters.itemType, filters.employeeId, filters.keyword,
    filters.assignedDateStart, filters.assignedDateEnd,
    !filters.isActive ? "inactive" : null,
  ].filter(Boolean).length;

  // ── Close advanced on outside click ─────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (advancedRef.current && !advancedRef.current.contains(e.target))
        setShowAdvanced(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Build params ─────────────────────────────────────────────────────────
  const buildFilterParams = useCallback(() => {
    const params = {};
    if (activeStatus !== "ALL") params.status = activeStatus;
    if (filters.itemType)       params.itemType = filters.itemType;
    if (filters.employeeId)     params.employeeId = filters.employeeId;
    if (filters.keyword)        params.keyword = filters.keyword;
    if (filters.assignedDateStart) params.assignedDateStart = filters.assignedDateStart;
    if (filters.assignedDateEnd)   params.assignedDateEnd   = filters.assignedDateEnd;
    if (filters.isActive !== undefined) params.isActive = filters.isActive;
    params.page = pagination.page;
    params.size = pagination.size;
    return params;
  }, [activeStatus, filters, pagination.page, pagination.size]);

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const result = await employeeItemApi.filterEmployeeItems(buildFilterParams());
      if (result.success && result.data) {
        const d = result.data;
        if (d.content && Array.isArray(d.content)) {
          setItems(d.content);
          setPagination((p) => ({
            ...p,
            page: d.page ?? d.pageNumber ?? p.page,
            size: d.size ?? d.pageSize ?? p.size,
            totalElements: d.totalElements || 0,
            totalPages: d.totalPages || 0,
          }));
        } else if (Array.isArray(d)) {
          setItems(d);
        } else {
          setItems([]);
        }
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [buildFilterParams]);

  const fetchStats = useCallback(async () => {
    try {
      const result = await employeeItemApi.getDashboardStats();
      if (result.success && result.data) {
        const s = result.data.data || result.data;
        setStats({
          totalItems:       s.totalItems || 0,
          pendingAcceptance:s.pendingAcceptance || 0,
          acknowledged:     s.acknowledged || s.accepted || 0,
          dressItems:       s.dressItems || 0,
        });
      }
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setPagination((p) => ({ ...p, page: 0 }));
  };

  const resetFilters = () => {
    setFilters({ itemType: "", employeeId: "", keyword: "", assignedDateStart: "", assignedDateEnd: "", isActive: true });
    setActiveStatus("ALL");
    setPagination((p) => ({ ...p, page: 0 }));
  };

  const handleStatusChange = (s) => { setActiveStatus(s); setPagination((p) => ({ ...p, page: 0 })); };
  const handlePageChange = (p) => setPagination((prev) => ({ ...prev, page: p }));
  const changeSize = (s) => setPagination((p) => ({ ...p, size: s, page: 0 }));

  const handleResend = async (id) => {
    try {
      const result = await employeeItemApi.resendAcknowledgment(id);
      if (result.success) fetchItems();
    } catch (err) { console.error(err); }
  };

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer shadow-sm";

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .hr-table td, .hr-table th { white-space: nowrap; }
        .hr-table td { font-size: 11px; }
        .hr-row:hover { background: #f0f7ff !important; }
        .tp-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .tp-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .tp-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .tp-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#e8eeff 50%,#f1f5f9 75%); background-size:200% 100%; animation:sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ═══ STICKY TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-3 pt-2 pb-1.5">
          <StatCard title="Total Items"       value={stats.totalItems}        icon={Package}      accent="border-l-4 border-blue-500" />
          <StatCard title="Pending"           value={stats.pendingAcceptance} icon={Clock}        accent="border-l-4 border-amber-500" sub="Needs action" />
          <StatCard title="Acknowledged"      value={stats.acknowledged}      icon={CheckCircle2} accent="border-l-4 border-emerald-500" />
          <StatCard title="Dress Items"       value={stats.dressItems}        icon={Shirt}        accent="border-l-4 border-pink-500" />
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5 border-t border-gray-100">

          {/* Status filter */}
          <select
            value={activeStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={sel + " min-w-[90px] font-medium"}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING_ACKNOWLEDGEMENT">Pending</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="PENDING_PICKUP">Pending Pickup</option>
            <option value="PICKED_UP">Picked Up</option>
            <option value="RETURNED">Returned</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Employee ID quick search */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID..."
              value={filters.employeeId}
              onChange={handleFilterChange}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-28 sm:w-36 transition"
            />
            {filters.employeeId && (
              <button
                onClick={() => { setFilters((p) => ({ ...p, employeeId: "" })); setPagination((p) => ({ ...p, page: 0 })); }}
                className="absolute right-1.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Assign Item */}
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md font-semibold transition shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>Assign Item</span>
          </button>



          {/* Advanced filters */}
          <div className="relative" ref={advancedRef}>
            <button
              onClick={() => setShowAdvanced((p) => !p)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
                showAdvanced || advancedFilterCount > 0
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Advanced</span>
              {advancedFilterCount > 0 && (
                <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                  {advancedFilterCount}
                </span>
              )}
            </button>

            {showAdvanced && (
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[300px] sm:w-[480px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
                  <div className="flex items-center gap-2">
                    {advancedFilterCount > 0 && (
                      <button onClick={resetFilters} className="text-[10px] text-red-500 hover:text-red-700 font-medium">
                        Clear all
                      </button>
                    )}
                    <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {/* Item Type */}
                  <select
                    name="itemType"
                    value={filters.itemType}
                    onChange={handleFilterChange}
                    className={sel + " min-w-[120px]"}
                  >
                    <option value="">All Types</option>
                    <option value="ID_CARD">ID Card</option>
                    <option value="APPOINTMENT_LETTER">Appointment Letter</option>
                    <option value="DRESS">Dress</option>
                  </select>

                  {/* Keyword search */}
                  <div className="relative flex items-center flex-1 min-w-[140px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                      className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                    <input
                      type="text"
                      name="keyword"
                      placeholder="Search notes..."
                      value={filters.keyword}
                      onChange={handleFilterChange}
                      className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-full transition"
                    />
                    {filters.keyword && (
                      <button
                        onClick={() => { setFilters((p) => ({ ...p, keyword: "" })); setPagination((p) => ({ ...p, page: 0 })); }}
                        className="absolute right-1.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Date range */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-medium">Date:</span>
                    <input
                      type="date"
                      name="assignedDateStart"
                      value={filters.assignedDateStart}
                      onChange={handleFilterChange}
                      className={sel}
                    />
                    <span className="text-[10px] text-gray-400">to</span>
                    <input
                      type="date"
                      name="assignedDateEnd"
                      value={filters.assignedDateEnd}
                      onChange={handleFilterChange}
                      className={sel}
                    />
                    {(filters.assignedDateStart || filters.assignedDateEnd) && (
                      <button
                        onClick={() => setFilters((p) => ({ ...p, assignedDateStart: "", assignedDateEnd: "" }))}
                        className="text-[10px] text-red-400 hover:text-red-600 font-medium"
                      >✕</button>
                    )}

                              <button
  onClick={() => setShowBulkImportModal(true)}
  className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md font-semibold transition shadow-sm"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
  Bulk Import
</button>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-100 my-0.5" />

                  {/* Active only toggle */}
                  <label className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium cursor-pointer transition select-none ${
                    filters.isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                  }`}>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={filters.isActive}
                      onChange={handleFilterChange}
                      className="w-3 h-3 accent-emerald-600"
                    />
                    <span>Active Only</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Pagination controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(Math.max(pagination.page - 1, 0))}
              disabled={pagination.page === 0 || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
              <span className="text-blue-700">{pagination.page + 1}</span>
              <span className="text-gray-400"> / </span>
              {pagination.totalPages || 1}
            </span>
            <button
              onClick={() => pagination.page + 1 < pagination.totalPages && handlePageChange(pagination.page + 1)}
              disabled={pagination.page + 1 >= pagination.totalPages || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Total count */}
          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{pagination.totalElements}</span>
            <span className="hidden sm:inline"> items</span>
          </span>

          {/* Page size — pushed right */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => changeSize(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  pagination.size === n
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TABLE ═══ */}
      <div className="flex-1 overflow-hidden">

        {/* Shimmer skeleton */}
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full hr-table" style={{ minWidth: 900 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["ID","Employee","Emp ID","Type","Details","Status","Assigned Date","Assigned By","Actions"].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 9 }).map((__, j) => (
                      <td key={j} className="px-2.5 py-2">
                        <div className="shimmer h-2.5 rounded" style={{ width: `${40 + Math.random() * 50}%` }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {!loading && (!Array.isArray(items) || items.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm text-gray-400">No items found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Try changing your filters.</p>
          </div>
        )}

        {/* Data table */}
        {!loading && Array.isArray(items) && items.length > 0 && (
          <div className="overflow-x-auto tp-scrollbar">
            <table className="w-full hr-table" style={{ minWidth: 900, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {[
                    { label: "ID",           cls: "w-10" },
                    { label: "Employee",     cls: "min-w-[120px]" },
                    { label: "Emp ID",       cls: "w-24" },
                    { label: "Type",         cls: "w-32" },
                    { label: "Details",      cls: "min-w-[140px]" },
                    { label: "Status",       cls: "w-32" },
                    { label: "Assigned Date",cls: "w-32" },
                    { label: "Assigned By",  cls: "min-w-[100px]" },
                    { label: "Actions",      cls: "w-16" },
                  ].map(({ label, cls }, i) => (
                    <th key={i} className={`px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${cls}`}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, ri) => (
                  <tr
                    key={item.id}
                    className="hr-row border-b border-gray-50 transition-colors"
                    style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
                  >
                    {/* ID */}
                    <td className="px-2.5 py-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-700">{item.id}</span>
                    </td>

                    {/* Employee name */}
                    <td className="px-2.5 py-1.5 font-medium text-gray-800">
                      {item.assignedUserName || item.user?.username || <span className="text-gray-300">—</span>}
                    </td>

                    {/* Employee ID */}
                    <td className="px-2.5 py-1.5 text-gray-500 font-mono">
                      {item.assignedUserEmployeeId || item.user?.employeeId || <span className="text-gray-300">—</span>}
                    </td>

                    {/* Item type */}
                    <td className="px-2.5 py-1.5">
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${ITEM_TYPE_BADGE[item.itemType] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                        {item.itemType?.replace("_", " ") || "—"}
                      </span>
                    </td>

                    {/* Details */}
                    <td className="px-2.5 py-1.5 text-gray-600 max-w-[160px]">
                      <span className="block truncate" title={item.dressItemsDescription}>
                        {item.dressItemsDescription || <span className="text-gray-300">—</span>}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-2.5 py-1.5">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${STATUS_BADGE[item.status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                        {STATUS_LABELS[item.status] || item.status}
                      </span>
                    </td>

                    {/* Assigned date */}
                    <td className="px-2.5 py-1.5 text-gray-500 whitespace-nowrap">
                      {item.assignedDate
                        ? format(new Date(item.assignedDate), "dd/MM/yy HH:mm")
                        : <span className="text-gray-300">—</span>}
                    </td>

                    {/* Assigned by */}
                    <td className="px-2.5 py-1.5 text-gray-600">
                      {item.assignedBy || <span className="text-gray-300">—</span>}
                    </td>

                    {/* Actions */}
                    <td className="px-2.5 py-1.5">
                      {item.status === "PENDING_ACKNOWLEDGEMENT" && (
                        <button
                          onClick={() => handleResend(item.id)}
                          title="Resend Acknowledgment"
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Modal */}
      <AssignItemModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onSuccess={() => { fetchItems(); fetchStats(); }}
      />

<BulkImportModal
  isOpen={showBulkImportModal}
  onClose={() => setShowBulkImportModal(false)}
  onSuccess={() => {
    fetchItems();
    fetchStats();
  }}
/>
    </div>
  );
}