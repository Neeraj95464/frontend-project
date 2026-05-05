


// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { unmatchedAssetService } from "../services/api";
// import {
//   SlidersHorizontal, X, ChevronLeft, ChevronRight,
//   RefreshCw, Eye, Pencil, CheckCircle2, AlertTriangle,
//   XCircle, Layers, Activity, AlertOctagon, CheckSquare,
//   Square, Trash2, Info,
// } from "lucide-react";
// import { toast } from "react-toastify";

// // ─── Constants ────────────────────────────────────────────────────────────────
// const PAGE_SIZES = [10, 20, 50, 100];

// const STATUS_BADGE = {
//   resolved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
//   inactive: "bg-red-100 text-red-700 border border-red-200",
//   pending:  "bg-amber-100 text-amber-700 border border-amber-200",
// };

// const RESOLUTION_BADGE = {
//   MARKED_INACTIVE:  "bg-gray-100 text-gray-600 border border-gray-200",
//   CREATED_NEW_ASSET:"bg-blue-100 text-blue-700 border border-blue-200",
//   IGNORED:          "bg-violet-100 text-violet-700 border border-violet-200",
// };

// const RESOLUTION_LABELS = {
//   MARKED_INACTIVE:  "Marked Inactive",
//   CREATED_NEW_ASSET:"Created Asset",
//   IGNORED:          "Ignored",
// };

// function getStatusKey(asset) {
//   if (!asset.isActive)   return "inactive";
//   if (asset.isResolved)  return "resolved";
//   return "pending";
// }

// function StatusBadge({ asset }) {
//   const key = getStatusKey(asset);
//   const cfg = {
//     resolved: { icon: <CheckCircle2 className="w-2.5 h-2.5" />, label: "Resolved" },
//     inactive: { icon: <XCircle      className="w-2.5 h-2.5" />, label: "Inactive" },
//     pending:  { icon: <AlertTriangle className="w-2.5 h-2.5" />, label: "Pending" },
//   }[key];
//   return (
//     <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_BADGE[key]}`}>
//       {cfg.icon}{cfg.label}
//     </span>
//   );
// }

// function ResolutionBadge({ action }) {
//   if (!action) return null;
//   return (
//     <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium mt-0.5 ${RESOLUTION_BADGE[action] || "bg-gray-100 text-gray-600"}`}>
//       {RESOLUTION_LABELS[action] || action}
//     </span>
//   );
// }

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// function StatCard({ title, value, icon: Icon, accent, sub }) {
//   return (
//     <div className={`bg-white rounded-xl border shadow-sm px-3 py-2.5 flex items-center gap-3 border-l-4 ${accent}`}>
//       <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accent.replace("border-l-4 border-", "bg-").replace("border-", "bg-").split(" ")[0]}-50`}>
//         <Icon className="w-4 h-4 opacity-70" />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{title}</p>
//         <p className="text-lg font-bold text-gray-800 leading-none">{(value || 0).toLocaleString()}</p>
//         {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
//       </div>
//     </div>
//   );
// }

// // ─── Modal Shell ──────────────────────────────────────────────────────────────
// function Modal({ open, onClose, title, subtitle, children, footer, size = "md" }) {
//   useEffect(() => {
//     const h = (e) => e.key === "Escape" && onClose();
//     if (open) document.addEventListener("keydown", h);
//     return () => document.removeEventListener("keydown", h);
//   }, [open, onClose]);

//   if (!open) return null;
//   const widths = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-3xl" };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
//       <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${widths[size]} flex flex-col max-h-[90vh] modal-appear`}>
//         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
//           <div>
//             <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
//             {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
//           </div>
//           <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500">
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//         <div className="overflow-y-auto flex-1 px-4 py-3 tp-scrollbar">{children}</div>
//         {footer && (
//           <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0 bg-gray-50 rounded-b-2xl">
//             {footer}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function UnmatchedAssetsReport() {
//   const advancedRef = useRef(null);

//   // Data
//   const [assets, setAssets]           = useState([]);
//   const [loading, setLoading]         = useState(false);
//   const [generating, setGenerating]   = useState(false);
//   const [stats, setStats]             = useState({ totalUnmatchedAssets: 0, activeUnmatchedAssets: 0, unresolvedUnmatchedAssets: 0 });

//   // Pagination
//   const [page, setPage]               = useState(0);
//   const [size, setSize]               = useState(20);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages]   = useState(0);

//   // Filters
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterActive, setFilterActive] = useState("all");
//   const [sortBy, setSortBy]           = useState("assetTag");
//   const [sortDirection, setSortDirection] = useState("ASC");
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   // Selection
//   const [selectedRows, setSelectedRows] = useState([]);

//   // Dialogs
//   const [resolveAsset, setResolveAsset]   = useState(null);
//   const [detailAsset, setDetailAsset]     = useState(null);
//   const [bulkOpen, setBulkOpen]           = useState(false);

//   // Resolve form
//   const [reason, setReason]           = useState("");
//   const [additionalNotes, setAdditionalNotes] = useState("");
//   const [isActive, setIsActive]       = useState(true);
//   const [resolutionAction, setResolutionAction] = useState("MARKED_INACTIVE");

//   // Bulk form
//   const [bulkReason, setBulkReason]   = useState("");
//   const [bulkIsActive, setBulkIsActive] = useState(true);

//   const advancedFilterCount = [filterActive !== "all" ? filterActive : null].filter(Boolean).length;

//   // ── Close advanced on outside click ────────────────────────────────────────
//   useEffect(() => {
//     const h = (e) => {
//       if (advancedRef.current && !advancedRef.current.contains(e.target))
//         setShowAdvanced(false);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   // ── Fetch ───────────────────────────────────────────────────────────────────
//   const fetchAssets = useCallback(async (p = page, s = size) => {
//     setLoading(true);
//     try {
//       let onlyActive   = null;
//       let onlyUnresolved = null;
//       if (filterActive === "active")     onlyActive = true;
//       if (filterActive === "unresolved") onlyUnresolved = true;

//       let result;
//       if (searchQuery.trim()) {
//         result = await unmatchedAssetService.searchUnmatchedAssets(searchQuery.trim(), p, s);
//       } else {
//         result = await unmatchedAssetService.getUnmatchedAssets(p, s, sortBy, sortDirection, onlyActive, onlyUnresolved);
//       }

//       if (result.success) {
//         setAssets(result.data.content || []);
//         setTotalElements(result.data.totalElements || 0);
//         setTotalPages(result.data.totalPages || 0);
//       } else {
//         toast.error(result.message);
//       }
//     } catch {
//       toast.error("Error fetching assets");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, size, sortBy, sortDirection, filterActive, searchQuery]);

//   const fetchStats = useCallback(async () => {
//     const result = await unmatchedAssetService.getUnmatchedStats();
//     if (result.success) setStats(result.data);
//   }, []);

//   useEffect(() => { fetchAssets(); }, [fetchAssets]);
//   useEffect(() => { fetchStats(); }, [fetchStats]);

//   // Debounced search
//   useEffect(() => {
//     const t = setTimeout(() => { setPage(0); fetchAssets(0, size); }, 400);
//     return () => clearTimeout(t);
//   }, [searchQuery]); // eslint-disable-line

//   // ── Handlers ────────────────────────────────────────────────────────────────
//   const goToPage = (p) => { setPage(p); fetchAssets(p, size); };
//   const changeSize = (s) => { setSize(s); setPage(0); fetchAssets(0, s); };

//   const handleSort = (col) => {
//     const dir = sortBy === col && sortDirection === "ASC" ? "DESC" : "ASC";
//     setSortBy(col);
//     setSortDirection(dir);
//     setPage(0);
//   };

//   const handleGenerateReport = async () => {
//     setGenerating(true);
//     const result = await unmatchedAssetService.generateUnmatchedReport();
//     if (result.success) {
//       toast.success(result.message);
//       fetchAssets(0, size);
//       fetchStats();
//       setPage(0);
//     } else {
//       toast.error(result.message);
//     }
//     setGenerating(false);
//   };

//   const openResolveDialog = (asset) => {
//     setResolveAsset(asset);
//     setReason(asset.reasonNotMatched || "");
//     setAdditionalNotes(asset.additionalNotes || "");
//     setIsActive(asset.isActive !== undefined ? asset.isActive : true);
//     setResolutionAction(asset.resolutionAction || "MARKED_INACTIVE");
//   };

//   const resetResolveForm = () => {
//     setResolveAsset(null);
//     setReason(""); setAdditionalNotes("");
//     setIsActive(true); setResolutionAction("MARKED_INACTIVE");
//   };

//   const handleResolve = async () => {
//     if (!resolveAsset) return;
//     const result = await unmatchedAssetService.resolveUnmatchedAsset(resolveAsset.id, {
//       reasonNotMatched: reason, additionalNotes, isActive, resolutionAction, newAssetId: null,
//     });
//     if (result.success) {
//       toast.success(result.message);
//       resetResolveForm();
//       fetchAssets(page, size); fetchStats();
//     } else {
//       toast.error(result.message);
//     }
//   };

//   const handleBulkResolve = async () => {
//     const result = await unmatchedAssetService.bulkResolveUnmatchedAssets(selectedRows, bulkReason, bulkIsActive);
//     if (result.success) {
//       toast.success(result.message);
//       setSelectedRows([]); setBulkOpen(false); setBulkReason(""); setBulkIsActive(true);
//       fetchAssets(page, size); fetchStats();
//     } else {
//       toast.error(result.message);
//     }
//   };

//   const toggleRow = (id) =>
//     setSelectedRows((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
//   const toggleAll = () =>
//     setSelectedRows(selectedRows.length === assets.length ? [] : assets.map((a) => a.id));

//   const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer shadow-sm";
//   const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition";
//   const btnPrimary = "flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50";
//   const btnSecondary = "flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium transition";

//   return (
//     <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
//       <style>{`
//         .ua-table td, .ua-table th { white-space: nowrap; }
//         .ua-table td { font-size: 11px; }
//         .ua-row:hover { background: #f5f3ff !important; }
//         .ua-row.selected { background: #ede9fe !important; }
//         .tp-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
//         .tp-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .tp-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
//         .tp-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//         .shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#eef0ff 50%,#f1f5f9 75%); background-size:200% 100%; animation:sh 1.4s infinite; }
//         @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//         .adv-panel { animation: fadeSlide 0.15s ease; }
//         @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
//         .modal-appear { animation: modalIn 0.18s ease; }
//         @keyframes modalIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
//         .sort-btn:hover { color: #4f46e5; }
//       `}</style>

//       {/* ═══ STICKY TOOLBAR ═══ */}
//       <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
//         {/* Stats row */}
//         <div className="grid grid-cols-3 gap-2 px-3 pt-2 pb-1.5">
//           <StatCard
//             title="Total Unmatched"
//             value={stats.totalUnmatchedAssets}
//             icon={Layers}
//             accent="border-l-4 border-blue-500"
//             sub="All time"
//           />
//           <StatCard
//             title="Active Unmatched"
//             value={stats.activeUnmatchedAssets}
//             icon={Activity}
//             accent="border-l-4 border-emerald-500"
//             sub="Needs attention"
//           />
//           <StatCard
//             title="Unresolved"
//             value={stats.unresolvedUnmatchedAssets}
//             icon={AlertOctagon}
//             accent="border-l-4 border-amber-500"
//             sub="Pending review"
//           />
//         </div>

//         {/* Controls row */}
//         <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5 border-t border-gray-100">

//           {/* Search */}
//           <div className="relative flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
//               className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
//             </svg>
//             <input
//               type="text"
//               placeholder="Search tag, description, serial..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 outline-none shadow-sm w-44 sm:w-56 transition"
//             />
//             {searchQuery && (
//               <button onClick={() => setSearchQuery("")} className="absolute right-1.5 text-gray-400 hover:text-gray-600">
//                 <X className="w-3 h-3" />
//               </button>
//             )}
//           </div>

//           <div className="h-5 w-px bg-gray-200 hidden sm:block" />

//           {/* Generate report */}
//           {/* <button
//             onClick={handleGenerateReport}
//             disabled={generating || loading}
//             className="flex items-center gap-1 px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition shadow-sm disabled:opacity-50"
//           >
//             <RefreshCw className={`w-3 h-3 ${generating ? "animate-spin" : ""}`} />
//             <span className="hidden sm:inline">Generate Report</span>
//             <span className="sm:hidden">Generate</span>
//           </button> */}

//           {/* Advanced filters */}
//           <div className="relative" ref={advancedRef}>
//             <button
//               onClick={() => setShowAdvanced((p) => !p)}
//               className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
//                 showAdvanced || advancedFilterCount > 0
//                   ? "bg-indigo-600 text-white border-indigo-600"
//                   : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:text-indigo-600"
//               }`}
//             >
//               <SlidersHorizontal className="w-3 h-3" />
//               <span className="hidden sm:inline">Advanced</span>
//               {advancedFilterCount > 0 && (
//                 <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"}`}>
//                   {advancedFilterCount}
//                 </span>
//               )}
//             </button>

//             {showAdvanced && (
//               <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[280px]">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
//                   <div className="flex items-center gap-2">
//                     {advancedFilterCount > 0 && (
//                       <button onClick={() => setFilterActive("all")} className="text-[10px] text-red-500 hover:text-red-700 font-medium">Clear all</button>
//                     )}
//                     <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div>
//                     <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Status Filter</label>
//                     <div className="flex gap-1 flex-wrap">
//                       {[
//                         { v: "all",        l: "All" },
//                         { v: "active",     l: "Active Only" },
//                         { v: "unresolved", l: "Unresolved" },
//                       ].map(({ v, l }) => (
//                         <button
//                           key={v}
//                           onClick={() => { setFilterActive(v); setPage(0); }}
//                           className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
//                             filterActive === v
//                               ? "bg-indigo-600 text-white border-indigo-600"
//                               : "bg-white text-gray-600 border-gray-300 hover:bg-indigo-50"
//                           }`}
//                         >
//                           {l}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Sort By</label>
//                     <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(0); }} className={sel + " w-full"}>
//                       <option value="assetTag">Asset Tag</option>
//                       <option value="reportedAt">Reported Date</option>
//                       <option value="assignedTo">Assignee</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Bulk resolve — shown when rows selected */}
//           {selectedRows.length > 0 && (
//             <button
//               onClick={() => setBulkOpen(true)}
//               className="flex items-center gap-1 px-2 py-1 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-md font-semibold transition shadow-sm"
//             >
//               <Trash2 className="w-3 h-3" />
//               <span>Bulk Resolve ({selectedRows.length})</span>
//             </button>
//           )}

//           <div className="h-5 w-px bg-gray-200 hidden sm:block" />

//           {/* Pagination */}
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => goToPage(Math.max(page - 1, 0))}
//               disabled={page === 0 || loading}
//               className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:border-indigo-400 disabled:opacity-40 transition"
//             >
//               <ChevronLeft className="w-3 h-3" />
//             </button>
//             <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
//               <span className="text-indigo-700">{page + 1}</span>
//               <span className="text-gray-400"> / </span>
//               {totalPages || 1}
//             </span>
//             <button
//               onClick={() => goToPage(page + 1 < totalPages ? page + 1 : page)}
//               disabled={page + 1 >= totalPages || loading}
//               className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:border-indigo-400 disabled:opacity-40 transition"
//             >
//               <ChevronRight className="w-3 h-3" />
//             </button>
//           </div>

//           <span className="text-xs text-gray-500 whitespace-nowrap">
//             <span className="font-semibold text-gray-700">{totalElements}</span>
//             <span className="hidden sm:inline"> assets</span>
//           </span>

//           {/* Page size */}
//           <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
//             <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
//             {PAGE_SIZES.map((n) => (
//               <button
//                 key={n}
//                 onClick={() => changeSize(n)}
//                 className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
//                   size === n ? "bg-indigo-600 text-white" : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
//                 }`}
//               >
//                 {n}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ═══ TABLE ═══ */}
//       <div className="flex-1 overflow-hidden">
//         {/* Shimmer */}
//         {loading && (
//           <div className="overflow-x-auto">
//             <table className="w-full ua-table" style={{ minWidth: 900 }}>
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   {["","Asset Tag","Description","Serial","Assigned To","Location","Dept","Status","Actions"].map((h, i) => (
//                     <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <tr key={i} className="border-b border-gray-50">
//                     {Array.from({ length: 9 }).map((__, j) => (
//                       <td key={j} className="px-2.5 py-2">
//                         <div className="shimmer h-2.5 rounded" style={{ width: `${40 + Math.random() * 50}%` }} />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Empty */}
//         {!loading && assets.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-300">
//             <AlertTriangle className="w-10 h-10 mb-3 opacity-40" />
//             <p className="text-sm text-gray-400">No unmatched assets found.</p>
//             <p className="text-xs text-gray-300 mt-0.5">Click "Generate Report" to scan for unmatched assets.</p>
//           </div>
//         )}

//         {/* Table */}
//         {!loading && assets.length > 0 && (
//           <div className="overflow-x-auto tp-scrollbar">
//             <table className="w-full ua-table" style={{ minWidth: 900, borderCollapse: "collapse" }}>
//               <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
//                 <tr>
//                   {/* Checkbox */}
//                   <th className="px-2.5 py-2 w-8">
//                     <button
//                       onClick={toggleAll}
//                       className="flex items-center justify-center text-gray-400 hover:text-indigo-600 transition"
//                       title={selectedRows.length === assets.length ? "Deselect all" : "Select all"}
//                     >
//                       {selectedRows.length === assets.length && assets.length > 0
//                         ? <CheckSquare className="w-3.5 h-3.5" />
//                         : <Square className="w-3.5 h-3.5" />}
//                     </button>
//                   </th>
//                   {[
//                     { label: "Asset Tag",  col: "assetTag" },
//                     { label: "Description",col: null },
//                     { label: "Serial #",   col: null },
//                     { label: "Assigned To",col: "assignedTo" },
//                     { label: "Location",   col: null },
//                     { label: "Department", col: null },
//                     { label: "Reported",   col: "reportedAt" },
//                     { label: "Status",     col: null },
//                     { label: "Actions",    col: null },
//                   ].map(({ label, col }, i) => (
//                     <th
//                       key={i}
//                       onClick={col ? () => handleSort(col) : undefined}
//                       className={`px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${col ? "cursor-pointer sort-btn select-none" : ""}`}
//                     >
//                       {label}
//                       {col && sortBy === col && (
//                         <span className="ml-1 text-indigo-500">{sortDirection === "ASC" ? "↑" : "↓"}</span>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {assets.map((asset, ri) => {
//                   const isSelected = selectedRows.includes(asset.id);
//                   return (
//                     <tr
//                       key={asset.id}
//                       className={`ua-row border-b border-gray-50 transition-colors ${isSelected ? "selected" : ""}`}
//                       style={{ background: isSelected ? undefined : ri % 2 === 0 ? "#fff" : "#fafbff" }}
//                     >
//                       {/* Checkbox */}
//                       <td className="px-2.5 py-1.5">
//                         <button onClick={() => toggleRow(asset.id)} className="text-gray-400 hover:text-indigo-600 transition flex">
//                           {isSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
//                         </button>
//                       </td>

//                       {/* Asset Tag */}
//                       <td className="px-2.5 py-1.5">
//                         <span className="font-bold text-gray-800 font-mono text-[11px]">{asset.assetTag}</span>
//                         <br />
//                         <span className="text-[9px] text-gray-400">ID: {asset.id}</span>
//                       </td>

//                       {/* Description */}
//                       <td className="px-2.5 py-1.5 max-w-[160px]">
//                         <span className="block truncate text-gray-600" title={asset.assetDescription}>{asset.assetDescription || <span className="text-gray-300">—</span>}</span>
//                       </td>

//                       {/* Serial */}
//                       <td className="px-2.5 py-1.5 text-gray-600 font-mono">{asset.serialNumber || <span className="text-gray-300">—</span>}</td>

//                       {/* Assigned To */}
//                       <td className="px-2.5 py-1.5 text-gray-700">{asset.assignedTo || <span className="text-gray-300 italic text-[10px]">Unassigned</span>}</td>

//                       {/* Location */}
//                       <td className="px-2.5 py-1.5 text-gray-600 max-w-[100px]">
//                         <span className="block truncate" title={asset.location}>{asset.location || <span className="text-gray-300">—</span>}</span>
//                       </td>

//                       {/* Department */}
//                       <td className="px-2.5 py-1.5 text-gray-600 max-w-[90px]">
//                         <span className="block truncate" title={asset.department}>{asset.department || <span className="text-gray-300">—</span>}</span>
//                       </td>

//                       {/* Reported At */}
//                       <td className="px-2.5 py-1.5 text-gray-500 whitespace-nowrap">
//                         {asset.reportedAt
//                           ? new Date(asset.reportedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
//                           : <span className="text-gray-300">—</span>}
//                       </td>

//                       {/* Status */}
//                       <td className="px-2.5 py-1.5">
//                         <div className="flex flex-col gap-0.5">
//                           <StatusBadge asset={asset} />
//                           {asset.resolutionAction && <ResolutionBadge action={asset.resolutionAction} />}
//                         </div>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-2.5 py-1.5">
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => setDetailAsset(asset)}
//                             title="View Details"
//                             className="w-6 h-6 flex items-center justify-center rounded hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition"
//                           >
//                             <Eye className="w-3.5 h-3.5" />
//                           </button>
//                           <button
//                             onClick={() => openResolveDialog(asset)}
//                             disabled={asset.isResolved}
//                             title={asset.isResolved ? "Already Resolved" : "Resolve"}
//                             className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
//                           >
//                             <Pencil className="w-3.5 h-3.5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* ═══ RESOLVE DIALOG ═══ */}
//       <Modal
//         open={!!resolveAsset}
//         onClose={resetResolveForm}
//         title="Resolve Unmatched Asset"
//         subtitle={resolveAsset?.assetTag}
//         size="md"
//         footer={
//           <>
//             <button onClick={resetResolveForm} className={btnSecondary}>Cancel</button>
//             <button
//               onClick={handleResolve}
//               disabled={!reason.trim()}
//               className={btnPrimary + " disabled:opacity-50"}
//             >
//               <CheckCircle2 className="w-3.5 h-3.5" />
//               Resolve Asset
//             </button>
//           </>
//         }
//       >
//         <div className="space-y-3">
//           <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
//             <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
//             <p className="text-[11px] text-blue-700">Provide information about why this asset is not found in the main asset database.</p>
//           </div>

//           <div>
//             <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Reason for not matching *</label>
//             <textarea
//               rows={3}
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               placeholder="e.g., Asset was disposed, transferred to another system, duplicate entry..."
//               className={inputCls + " resize-none"}
//             />
//           </div>

//           <div>
//             <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Additional Notes</label>
//             <textarea
//               rows={2}
//               value={additionalNotes}
//               onChange={(e) => setAdditionalNotes(e.target.value)}
//               placeholder="Any additional information..."
//               className={inputCls + " resize-none"}
//             />
//           </div>

//           <div>
//             <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Resolution Action</label>
//             <select value={resolutionAction} onChange={(e) => setResolutionAction(e.target.value)} className={sel + " w-full"}>
//               <option value="MARKED_INACTIVE">Mark as Inactive (Hide from reports)</option>
//               <option value="CREATED_NEW_ASSET">Created New Asset (Added to system)</option>
//               <option value="IGNORED">Ignore (Not a valid asset)</option>
//             </select>
//           </div>

//           <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
//             <div>
//               <p className="text-xs font-medium text-gray-700">Keep Asset Active in System</p>
//               <p className="text-[10px] text-gray-500 mt-0.5">
//                 {isActive ? "Asset will remain active for future reference" : "Asset will be hidden from active reports"}
//               </p>
//             </div>
//             <button
//               onClick={() => setIsActive((p) => !p)}
//               className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${isActive ? "bg-indigo-600" : "bg-gray-200"}`}
//             >
//               <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition ${isActive ? "translate-x-4" : "translate-x-0.5"}`} />
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* ═══ BULK RESOLVE DIALOG ═══ */}
//       <Modal
//         open={bulkOpen}
//         onClose={() => setBulkOpen(false)}
//         title="Bulk Resolve Assets"
//         subtitle={`${selectedRows.length} assets selected`}
//         size="sm"
//         footer={
//           <>
//             <button onClick={() => setBulkOpen(false)} className={btnSecondary}>Cancel</button>
//             <button
//               onClick={handleBulkResolve}
//               disabled={!bulkReason.trim()}
//               className={`flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50`}
//             >
//               <Trash2 className="w-3.5 h-3.5" />
//               Resolve {selectedRows.length} Assets
//             </button>
//           </>
//         }
//       >
//         <div className="space-y-3">
//           <div>
//             <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Common Reason *</label>
//             <textarea
//               rows={3}
//               value={bulkReason}
//               onChange={(e) => setBulkReason(e.target.value)}
//               placeholder="Provide a common reason for all selected assets..."
//               className={inputCls + " resize-none"}
//             />
//           </div>
//           <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
//             <p className="text-xs font-medium text-gray-700">Keep these assets active</p>
//             <button
//               onClick={() => setBulkIsActive((p) => !p)}
//               className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${bulkIsActive ? "bg-indigo-600" : "bg-gray-200"}`}
//             >
//               <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition ${bulkIsActive ? "translate-x-4" : "translate-x-0.5"}`} />
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* ═══ DETAILS DIALOG ═══ */}
//       <Modal
//         open={!!detailAsset}
//         onClose={() => setDetailAsset(null)}
//         title="Asset Details"
//         subtitle={detailAsset?.assetTag}
//         size="md"
//         footer={
//           <>
//             <button onClick={() => setDetailAsset(null)} className={btnSecondary}>Close</button>
//             {detailAsset && !detailAsset.isResolved && (
//               <button
//                 onClick={() => { setDetailAsset(null); openResolveDialog(detailAsset); }}
//                 className={btnPrimary}
//               >
//                 <Pencil className="w-3.5 h-3.5" />
//                 Resolve Asset
//               </button>
//             )}
//           </>
//         }
//       >
//         {detailAsset && (
//           <div className="space-y-3">
//             {/* Core info grid */}
//             <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
//               {[
//                 { label: "Asset Tag",    value: detailAsset.assetTag,          bold: true },
//                 { label: "Serial Number",value: detailAsset.serialNumber },
//                 { label: "Assigned To",  value: detailAsset.assignedTo },
//                 { label: "Department",   value: detailAsset.department },
//                 { label: "Location",     value: detailAsset.location },
//                 { label: "Reported By",  value: detailAsset.reportedBy },
//               ].map(({ label, value, bold }) => (
//                 <div key={label}>
//                   <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
//                   <p className={`text-xs mt-0.5 ${bold ? "font-bold text-gray-800 font-mono" : "text-gray-700"}`}>
//                     {value || <span className="text-gray-300 italic">—</span>}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Description full */}
//             {detailAsset.assetDescription && (
//               <div>
//                 <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Description</p>
//                 <p className="text-xs text-gray-700 mt-0.5">{detailAsset.assetDescription}</p>
//               </div>
//             )}

//             {/* Status + timestamps */}
//             <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 grid grid-cols-2 gap-2">
//               <div>
//                 <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Status</p>
//                 <StatusBadge asset={detailAsset} />
//               </div>
//               <div>
//                 <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Reported At</p>
//                 <p className="text-xs text-gray-700 mt-0.5">
//                   {detailAsset.reportedAt ? new Date(detailAsset.reportedAt).toLocaleString() : "—"}
//                 </p>
//               </div>
//             </div>

//             {/* Resolution info */}
//             <div className="border-t border-gray-100 pt-2.5">
//               <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Resolution Information</p>
//               <div className="space-y-2">
//                 <div>
//                   <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Reason</p>
//                   <p className="text-xs text-gray-700 mt-0.5">{detailAsset.reasonNotMatched || <span className="italic text-gray-400">Not yet resolved</span>}</p>
//                 </div>
//                 {detailAsset.additionalNotes && (
//                   <div>
//                     <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Additional Notes</p>
//                     <p className="text-xs text-gray-700 mt-0.5">{detailAsset.additionalNotes}</p>
//                   </div>
//                 )}
//                 {detailAsset.resolvedBy && (
//                   <div className="grid grid-cols-2 gap-2">
//                     <div>
//                       <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Resolved By</p>
//                       <p className="text-xs text-gray-700 mt-0.5">{detailAsset.resolvedBy}</p>
//                     </div>
//                     <div>
//                       <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Resolved At</p>
//                       <p className="text-xs text-gray-700 mt-0.5">{detailAsset.resolvedAt ? new Date(detailAsset.resolvedAt).toLocaleString() : "—"}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback, useRef } from "react";
import { unmatchedAssetService } from "../services/api";
import {
  SlidersHorizontal, X, ChevronLeft, ChevronRight,
  RefreshCw, Eye, Pencil, CheckCircle2, AlertTriangle,
  XCircle, Layers, Activity, AlertOctagon, CheckSquare,
  Square, Trash2, Info,
} from "lucide-react";
import { toast } from "react-toastify";

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZES = [10, 20, 50, 100];

const STATUS_BADGE = {
  resolved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  inactive: "bg-red-100 text-red-700 border border-red-200",
  pending:  "bg-amber-100 text-amber-700 border border-amber-200",
};

const RESOLUTION_BADGE = {
  MARKED_INACTIVE:  "bg-gray-100 text-gray-600 border border-gray-200",
  CREATED_NEW_ASSET:"bg-blue-100 text-blue-700 border border-blue-200",
  IGNORED:          "bg-violet-100 text-violet-700 border border-violet-200",
};

const RESOLUTION_LABELS = {
  MARKED_INACTIVE:  "Marked Inactive",
  CREATED_NEW_ASSET:"Created Asset",
  IGNORED:          "Ignored",
};

function getStatusKey(asset) {
  if (!asset.isActive)   return "inactive";
  if (asset.isResolved)  return "resolved";
  return "pending";
}

function StatusBadge({ asset }) {
  const key = getStatusKey(asset);
  const cfg = {
    resolved: { icon: <CheckCircle2 className="w-2.5 h-2.5" />, label: "Resolved" },
    inactive: { icon: <XCircle      className="w-2.5 h-2.5" />, label: "Inactive" },
    pending:  { icon: <AlertTriangle className="w-2.5 h-2.5" />, label: "Pending" },
  }[key];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_BADGE[key]}`}>
      {cfg.icon}{cfg.label}
    </span>
  );
}

function ResolutionBadge({ action }) {
  if (!action) return null;
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium mt-0.5 ${RESOLUTION_BADGE[action] || "bg-gray-100 text-gray-600"}`}>
      {RESOLUTION_LABELS[action] || action}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent, sub }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm px-3 py-2.5 flex items-center gap-3 border-l-4 ${accent}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accent.replace("border-l-4 border-", "bg-").replace("border-", "bg-").split(" ")[0]}-50`}>
        <Icon className="w-4 h-4 opacity-70" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{title}</p>
        <p className="text-lg font-bold text-gray-800 leading-none">{(value || 0).toLocaleString()}</p>
        {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Modal Shell ──────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, subtitle, children, footer, size = "md" }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-3xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${widths[size]} flex flex-col max-h-[90vh] modal-appear`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
            {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-4 py-3 tp-scrollbar">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0 bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UnmatchedAssetsReport() {
  const advancedRef = useRef(null);

  // Data
  const [assets, setAssets]           = useState([]);
  const [loading, setLoading]         = useState(false);
  const [generating, setGenerating]   = useState(false);
  const [stats, setStats]             = useState({ totalUnmatchedAssets: 0, activeUnmatchedAssets: 0, unresolvedUnmatchedAssets: 0 });

  // Pagination
  const [page, setPage]               = useState(0);
  const [size, setSize]               = useState(20);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages]   = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterAssignedTo, setFilterAssignedTo] = useState("");
  const [sortBy, setSortBy]           = useState("assetTag");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Selection
  const [selectedRows, setSelectedRows] = useState([]);

  // Dialogs
  const [resolveAsset, setResolveAsset]   = useState(null);
  const [detailAsset, setDetailAsset]     = useState(null);
  const [bulkOpen, setBulkOpen]           = useState(false);

  // Resolve form
  const [reason, setReason]           = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isActive, setIsActive]       = useState(true);
  const [resolutionAction, setResolutionAction] = useState("MARKED_INACTIVE");

  // Bulk form
  const [bulkReason, setBulkReason]   = useState("");
  const [bulkIsActive, setBulkIsActive] = useState(true);

  const advancedFilterCount = [
    filterActive !== "all" ? filterActive : null,
    filterLocation || null,
    filterAssignedTo || null,
  ].filter(Boolean).length;

  // ── Close advanced on outside click ────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (advancedRef.current && !advancedRef.current.contains(e.target))
        setShowAdvanced(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchAssets = useCallback(async (p = page, s = size) => {
    setLoading(true);
    try {
      let onlyActive   = null;
      let onlyUnresolved = null;
      if (filterActive === "active")     onlyActive = true;
      if (filterActive === "unresolved") onlyUnresolved = true;

      let result;
      if (searchQuery.trim()) {
        result = await unmatchedAssetService.searchUnmatchedAssets(searchQuery.trim(), p, s);
      } else {
        result = await unmatchedAssetService.getUnmatchedAssets(p, s, sortBy, sortDirection, onlyActive, onlyUnresolved);
      }

      if (result.success) {
        let content = result.data.content || [];

        // Client-side filter by location
        if (filterLocation.trim()) {
          const loc = filterLocation.trim().toLowerCase();
          content = content.filter((a) => a.location?.toLowerCase().includes(loc));
        }

        // Client-side filter by assigned to
        if (filterAssignedTo.trim()) {
          const asgn = filterAssignedTo.trim().toLowerCase();
          content = content.filter((a) => a.assignedTo?.toLowerCase().includes(asgn));
        }

        setAssets(content);
        setTotalElements(filterLocation.trim() || filterAssignedTo.trim() ? content.length : result.data.totalElements || 0);
        setTotalPages(filterLocation.trim() || filterAssignedTo.trim() ? 1 : result.data.totalPages || 0);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Error fetching assets");
    } finally {
      setLoading(false);
    }
  }, [page, size, sortBy, sortDirection, filterActive, searchQuery, filterLocation, filterAssignedTo]);

  const fetchStats = useCallback(async () => {
    const result = await unmatchedAssetService.getUnmatchedStats();
    if (result.success) setStats(result.data);
  }, []);

  useEffect(() => { fetchAssets(); }, [fetchAssets]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  // Debounced search + filter inputs
  useEffect(() => {
    const t = setTimeout(() => { setPage(0); fetchAssets(0, size); }, 400);
    return () => clearTimeout(t);
  }, [searchQuery, filterLocation, filterAssignedTo]); // eslint-disable-line

  // ── Handlers ────────────────────────────────────────────────────────────────
  const goToPage = (p) => { setPage(p); fetchAssets(p, size); };
  const changeSize = (s) => { setSize(s); setPage(0); fetchAssets(0, s); };

  const handleSort = (col) => {
    const dir = sortBy === col && sortDirection === "ASC" ? "DESC" : "ASC";
    setSortBy(col);
    setSortDirection(dir);
    setPage(0);
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    const result = await unmatchedAssetService.generateUnmatchedReport();
    if (result.success) {
      toast.success(result.message);
      fetchAssets(0, size);
      fetchStats();
      setPage(0);
    } else {
      toast.error(result.message);
    }
    setGenerating(false);
  };

  const openResolveDialog = (asset) => {
    setResolveAsset(asset);
    setReason(asset.reasonNotMatched || "");
    setAdditionalNotes(asset.additionalNotes || "");
    setIsActive(asset.isActive !== undefined ? asset.isActive : true);
    setResolutionAction(asset.resolutionAction || "MARKED_INACTIVE");
  };

  const resetResolveForm = () => {
    setResolveAsset(null);
    setReason(""); setAdditionalNotes("");
    setIsActive(true); setResolutionAction("MARKED_INACTIVE");
  };

  const handleResolve = async () => {
    if (!resolveAsset) return;
    const result = await unmatchedAssetService.resolveUnmatchedAsset(resolveAsset.id, {
      reasonNotMatched: reason, additionalNotes, isActive, resolutionAction, newAssetId: null,
    });
    if (result.success) {
      toast.success(result.message);
      resetResolveForm();
      fetchAssets(page, size); fetchStats();
    } else {
      toast.error(result.message);
    }
  };

  const handleBulkResolve = async () => {
    const result = await unmatchedAssetService.bulkResolveUnmatchedAssets(selectedRows, bulkReason, bulkIsActive);
    if (result.success) {
      toast.success(result.message);
      setSelectedRows([]); setBulkOpen(false); setBulkReason(""); setBulkIsActive(true);
      fetchAssets(page, size); fetchStats();
    } else {
      toast.error(result.message);
    }
  };

  const toggleRow = (id) =>
    setSelectedRows((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleAll = () =>
    setSelectedRows(selectedRows.length === assets.length ? [] : assets.map((a) => a.id));

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer shadow-sm";
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition";
  const btnPrimary = "flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50";
  const btnSecondary = "flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium transition";

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .ua-table td, .ua-table th { white-space: nowrap; }
        .ua-table td { font-size: 11px; }
        .ua-row:hover { background: #f5f3ff !important; }
        .ua-row.selected { background: #ede9fe !important; }
        .tp-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .tp-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .tp-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .tp-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#eef0ff 50%,#f1f5f9 75%); background-size:200% 100%; animation:sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .modal-appear { animation: modalIn 0.18s ease; }
        @keyframes modalIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        .sort-btn:hover { color: #4f46e5; }
      `}</style>

      {/* ═══ STICKY TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 px-3 pt-2 pb-1.5">
          <StatCard
            title="Total Unmatched"
            value={stats.totalUnmatchedAssets}
            icon={Layers}
            accent="border-l-4 border-blue-500"
            sub="All time"
          />
          <StatCard
            title="Active Unmatched"
            value={stats.activeUnmatchedAssets}
            icon={Activity}
            accent="border-l-4 border-emerald-500"
            sub="Needs attention"
          />
          <StatCard
            title="Unresolved"
            value={stats.unresolvedUnmatchedAssets}
            icon={AlertOctagon}
            accent="border-l-4 border-amber-500"
            sub="Pending review"
          />
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5 border-t border-gray-100">

          {/* Search */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              placeholder="Search tag, description, serial..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 outline-none shadow-sm w-44 sm:w-56 transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-1.5 text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Generate report */}
          {/* <button
            onClick={handleGenerateReport}
            disabled={generating || loading}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${generating ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Generate Report</span>
            <span className="sm:hidden">Generate</span>
          </button> */}

          {/* Advanced filters */}
          <div className="relative" ref={advancedRef}>
            <button
              onClick={() => setShowAdvanced((p) => !p)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
                showAdvanced || advancedFilterCount > 0
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:text-indigo-600"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Advanced</span>
              {advancedFilterCount > 0 && (
                <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"}`}>
                  {advancedFilterCount}
                </span>
              )}
            </button>

            {showAdvanced && (
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[300px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
                  <div className="flex items-center gap-2">
                    {advancedFilterCount > 0 && (
                      <button
                        onClick={() => {
                          setFilterActive("all");
                          setFilterLocation("");
                          setFilterAssignedTo("");
                          setPage(0);
                        }}
                        className="text-[10px] text-red-500 hover:text-red-700 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                    <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {/* Status pills */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Status</label>
                    <div className="flex gap-1 flex-wrap">
                      {[
                        { v: "all",        l: "All" },
                        { v: "active",     l: "Active Only" },
                        { v: "unresolved", l: "Unresolved" },
                      ].map(({ v, l }) => (
                        <button
                          key={v}
                          onClick={() => { setFilterActive(v); setPage(0); }}
                          className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
                            filterActive === v
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-600 border-gray-300 hover:bg-indigo-50"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location filter */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Location</label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                        className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Filter by location..."
                        value={filterLocation}
                        onChange={(e) => { setFilterLocation(e.target.value); }}
                        className="w-full text-xs pl-6 pr-6 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 outline-none shadow-sm transition"
                      />
                      {filterLocation && (
                        <button onClick={() => setFilterLocation("")} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Assigned To filter */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Assigned To</label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                        className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Filter by assignee..."
                        value={filterAssignedTo}
                        onChange={(e) => { setFilterAssignedTo(e.target.value); }}
                        className="w-full text-xs pl-6 pr-6 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 outline-none shadow-sm transition"
                      />
                      {filterAssignedTo && (
                        <button onClick={() => setFilterAssignedTo("")} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Sort By</label>
                    <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(0); }} className={sel + " w-full"}>
                      <option value="assetTag">Asset Tag</option>
                      <option value="reportedAt">Reported Date</option>
                      <option value="assignedTo">Assignee</option>
                    </select>
                  </div>

                  {/* Active filter indicator chips */}
                  {(filterLocation || filterAssignedTo) && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-gray-100">
                      {filterLocation && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded text-[10px] text-indigo-700 font-medium">
                          📍 {filterLocation}
                          <button onClick={() => setFilterLocation("")} className="hover:text-indigo-900"><X className="w-2.5 h-2.5" /></button>
                        </span>
                      )}
                      {filterAssignedTo && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded text-[10px] text-indigo-700 font-medium">
                          👤 {filterAssignedTo}
                          <button onClick={() => setFilterAssignedTo("")} className="hover:text-indigo-900"><X className="w-2.5 h-2.5" /></button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bulk resolve — shown when rows selected */}
          {selectedRows.length > 0 && (
            <button
              onClick={() => setBulkOpen(true)}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-md font-semibold transition shadow-sm"
            >
              <Trash2 className="w-3 h-3" />
              <span>Bulk Resolve ({selectedRows.length})</span>
            </button>
          )}

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(Math.max(page - 1, 0))}
              disabled={page === 0 || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:border-indigo-400 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
              <span className="text-indigo-700">{page + 1}</span>
              <span className="text-gray-400"> / </span>
              {totalPages || 1}
            </span>
            <button
              onClick={() => goToPage(page + 1 < totalPages ? page + 1 : page)}
              disabled={page + 1 >= totalPages || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:border-indigo-400 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{totalElements}</span>
            <span className="hidden sm:inline"> assets</span>
          </span>

          {/* Page size */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => changeSize(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  size === n ? "bg-indigo-600 text-white" : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
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
        {/* Shimmer */}
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full ua-table" style={{ minWidth: 900 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["","Asset Tag","Description","Serial","Assigned To","Location","Dept","Status","Actions"].map((h, i) => (
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

        {/* Empty */}
        {!loading && assets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <AlertTriangle className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm text-gray-400">No unmatched assets found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Click "Generate Report" to scan for unmatched assets.</p>
          </div>
        )}

        {/* Table */}
        {!loading && assets.length > 0 && (
          <div className="overflow-x-auto tp-scrollbar">
            <table className="w-full ua-table" style={{ minWidth: 900, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  {/* Checkbox */}
                  <th className="px-2.5 py-2 w-8">
                    <button
                      onClick={toggleAll}
                      className="flex items-center justify-center text-gray-400 hover:text-indigo-600 transition"
                      title={selectedRows.length === assets.length ? "Deselect all" : "Select all"}
                    >
                      {selectedRows.length === assets.length && assets.length > 0
                        ? <CheckSquare className="w-3.5 h-3.5" />
                        : <Square className="w-3.5 h-3.5" />}
                    </button>
                  </th>
                  {[
                    { label: "Asset Tag",  col: "assetTag" },
                    { label: "Description",col: null },
                    { label: "Serial #",   col: null },
                    { label: "Assigned To",col: "assignedTo" },
                    { label: "Location",   col: null },
                    { label: "Department", col: null },
                    { label: "Reported",   col: "reportedAt" },
                    { label: "Status",     col: null },
                    { label: "Actions",    col: null },
                  ].map(({ label, col }, i) => (
                    <th
                      key={i}
                      onClick={col ? () => handleSort(col) : undefined}
                      className={`px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 last:border-r-0 ${col ? "cursor-pointer sort-btn select-none" : ""}`}
                    >
                      {label}
                      {col && sortBy === col && (
                        <span className="ml-1 text-indigo-500">{sortDirection === "ASC" ? "↑" : "↓"}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, ri) => {
                  const isSelected = selectedRows.includes(asset.id);
                  return (
                    <tr
                      key={asset.id}
                      className={`ua-row border-b border-gray-50 transition-colors ${isSelected ? "selected" : ""}`}
                      style={{ background: isSelected ? undefined : ri % 2 === 0 ? "#fff" : "#fafbff" }}
                    >
                      {/* Checkbox */}
                      <td className="px-2.5 py-1.5">
                        <button onClick={() => toggleRow(asset.id)} className="text-gray-400 hover:text-indigo-600 transition flex">
                          {isSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        </button>
                      </td>

                      {/* Asset Tag */}
                      <td className="px-2.5 py-1.5">
                        <span className="font-bold text-gray-800 font-mono text-[11px]">{asset.assetTag}</span>
                        <br />
                        <span className="text-[9px] text-gray-400">ID: {asset.id}</span>
                      </td>

                      {/* Description */}
                      <td className="px-2.5 py-1.5 max-w-[160px]">
                        <span className="block truncate text-gray-600" title={asset.assetDescription}>{asset.assetDescription || <span className="text-gray-300">—</span>}</span>
                      </td>

                      {/* Serial */}
                      <td className="px-2.5 py-1.5 text-gray-600 font-mono">{asset.serialNumber || <span className="text-gray-300">—</span>}</td>

                      {/* Assigned To */}
                      <td className="px-2.5 py-1.5 text-gray-700">{asset.assignedTo || <span className="text-gray-300 italic text-[10px]">Unassigned</span>}</td>

                      {/* Location */}
                      <td className="px-2.5 py-1.5 text-gray-600 max-w-[100px]">
                        <span className="block truncate" title={asset.location}>{asset.location || <span className="text-gray-300">—</span>}</span>
                      </td>

                      {/* Department */}
                      <td className="px-2.5 py-1.5 text-gray-600 max-w-[90px]">
                        <span className="block truncate" title={asset.department}>{asset.department || <span className="text-gray-300">—</span>}</span>
                      </td>

                      {/* Reported At */}
                      <td className="px-2.5 py-1.5 text-gray-500 whitespace-nowrap">
                        {asset.reportedAt
                          ? new Date(asset.reportedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                          : <span className="text-gray-300">—</span>}
                      </td>

                      {/* Status */}
                      <td className="px-2.5 py-1.5">
                        <div className="flex flex-col gap-0.5">
                          <StatusBadge asset={asset} />
                          {asset.resolutionAction && <ResolutionBadge action={asset.resolutionAction} />}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-2.5 py-1.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setDetailAsset(asset)}
                            title="View Details"
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openResolveDialog(asset)}
                            disabled={asset.isResolved}
                            title={asset.isResolved ? "Already Resolved" : "Resolve"}
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══ RESOLVE DIALOG ═══ */}
      <Modal
        open={!!resolveAsset}
        onClose={resetResolveForm}
        title="Resolve Unmatched Asset"
        subtitle={resolveAsset?.assetTag}
        size="md"
        footer={
          <>
            <button onClick={resetResolveForm} className={btnSecondary}>Cancel</button>
            <button
              onClick={handleResolve}
              disabled={!reason.trim()}
              className={btnPrimary + " disabled:opacity-50"}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Resolve Asset
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-blue-700">Provide information about why this asset is not found in the main asset database.</p>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Reason for not matching *</label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Asset was disposed, transferred to another system, duplicate entry..."
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Additional Notes</label>
            <textarea
              rows={2}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any additional information..."
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Resolution Action</label>
            <select value={resolutionAction} onChange={(e) => setResolutionAction(e.target.value)} className={sel + " w-full"}>
              <option value="MARKED_INACTIVE">Mark as Inactive (Hide from reports)</option>
              <option value="CREATED_NEW_ASSET">Created New Asset (Added to system)</option>
              <option value="IGNORED">Ignore (Not a valid asset)</option>
            </select>
          </div>

          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <div>
              <p className="text-xs font-medium text-gray-700">Keep Asset Active in System</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {isActive ? "Asset will remain active for future reference" : "Asset will be hidden from active reports"}
              </p>
            </div>
            <button
              onClick={() => setIsActive((p) => !p)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${isActive ? "bg-indigo-600" : "bg-gray-200"}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition ${isActive ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
      </Modal>

      {/* ═══ BULK RESOLVE DIALOG ═══ */}
      <Modal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        title="Bulk Resolve Assets"
        subtitle={`${selectedRows.length} assets selected`}
        size="sm"
        footer={
          <>
            <button onClick={() => setBulkOpen(false)} className={btnSecondary}>Cancel</button>
            <button
              onClick={handleBulkResolve}
              disabled={!bulkReason.trim()}
              className={`flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Resolve {selectedRows.length} Assets
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Common Reason *</label>
            <textarea
              rows={3}
              value={bulkReason}
              onChange={(e) => setBulkReason(e.target.value)}
              placeholder="Provide a common reason for all selected assets..."
              className={inputCls + " resize-none"}
            />
          </div>
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <p className="text-xs font-medium text-gray-700">Keep these assets active</p>
            <button
              onClick={() => setBulkIsActive((p) => !p)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${bulkIsActive ? "bg-indigo-600" : "bg-gray-200"}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition ${bulkIsActive ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
      </Modal>

      {/* ═══ DETAILS DIALOG ═══ */}
      <Modal
        open={!!detailAsset}
        onClose={() => setDetailAsset(null)}
        title="Asset Details"
        subtitle={detailAsset?.assetTag}
        size="md"
        footer={
          <>
            <button onClick={() => setDetailAsset(null)} className={btnSecondary}>Close</button>
            {detailAsset && !detailAsset.isResolved && (
              <button
                onClick={() => { setDetailAsset(null); openResolveDialog(detailAsset); }}
                className={btnPrimary}
              >
                <Pencil className="w-3.5 h-3.5" />
                Resolve Asset
              </button>
            )}
          </>
        }
      >
        {detailAsset && (
          <div className="space-y-3">
            {/* Core info grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                { label: "Asset Tag",    value: detailAsset.assetTag,          bold: true },
                { label: "Serial Number",value: detailAsset.serialNumber },
                { label: "Assigned To",  value: detailAsset.assignedTo },
                { label: "Department",   value: detailAsset.department },
                { label: "Location",     value: detailAsset.location },
                { label: "Reported By",  value: detailAsset.reportedBy },
              ].map(({ label, value, bold }) => (
                <div key={label}>
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className={`text-xs mt-0.5 ${bold ? "font-bold text-gray-800 font-mono" : "text-gray-700"}`}>
                    {value || <span className="text-gray-300 italic">—</span>}
                  </p>
                </div>
              ))}
            </div>

            {/* Description full */}
            {detailAsset.assetDescription && (
              <div>
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Description</p>
                <p className="text-xs text-gray-700 mt-0.5">{detailAsset.assetDescription}</p>
              </div>
            )}

            {/* Status + timestamps */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Status</p>
                <StatusBadge asset={detailAsset} />
              </div>
              <div>
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Reported At</p>
                <p className="text-xs text-gray-700 mt-0.5">
                  {detailAsset.reportedAt ? new Date(detailAsset.reportedAt).toLocaleString() : "—"}
                </p>
              </div>
            </div>

            {/* Resolution info */}
            <div className="border-t border-gray-100 pt-2.5">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Resolution Information</p>
              <div className="space-y-2">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Reason</p>
                  <p className="text-xs text-gray-700 mt-0.5">{detailAsset.reasonNotMatched || <span className="italic text-gray-400">Not yet resolved</span>}</p>
                </div>
                {detailAsset.additionalNotes && (
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Additional Notes</p>
                    <p className="text-xs text-gray-700 mt-0.5">{detailAsset.additionalNotes}</p>
                  </div>
                )}
                {detailAsset.resolvedBy && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Resolved By</p>
                      <p className="text-xs text-gray-700 mt-0.5">{detailAsset.resolvedBy}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Resolved At</p>
                      <p className="text-xs text-gray-700 mt-0.5">{detailAsset.resolvedAt ? new Date(detailAsset.resolvedAt).toLocaleString() : "—"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}