import ChildAssetForm from "../components/ChildAssetForm";
import ChildAssetsTable from "../components/ChildAssetsTable";
import { fetchChildAssets, downloadChildAssetsExcel } from "../services/api";
import { Card, CardContent } from "@/components/ui";
import { useEffect, useState } from "react";

const ChildAssetsPage = () => {
  const [filters, setFilters] = useState({
    name: "",
    parentAssetTag: "",
    assetStatus: "",
    warranty: "",
    purchaseFrom: "",
    createdBy: "",
    search: "",
  });
  const [childAssets, setChildAssets] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [showChildAssetModal, setShowChildAssetModal] = useState(false); // ✅ Fixed state name
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadData = async (pageToLoad = page) => {
    setLoading(true);
    try {
      const res = await fetchChildAssets({
        ...filters,
        page: pageToLoad,
        size,
      });
      setChildAssets(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setTotalElements(res.data.totalElements || 0);
      setPage(res.data.page ?? pageToLoad);
    } catch (err) {
      console.error("Error loading child assets", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fixed: handleAddChildAsset for standalone mode (no parent tag)
  const handleAddChildAsset = () => {
    setShowChildAssetModal(true);
  };

  const handleCloseModal = () => {
    setShowChildAssetModal(false);
  };

  // ✅ Success handler for form
  const handleChildAssetSuccess = (newChildAsset) => {
    console.log("✅ New child asset created:", newChildAsset);
    setShowChildAssetModal(false);
    loadData(0); // Refresh table
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(0);
      loadData(0);
    }, 400);
    return () => clearTimeout(delay);
  }, [
    filters.name,
    filters.parentAssetTag,
    filters.assetStatus,
    filters.warranty,
    filters.purchaseFrom,
    filters.createdBy,
    filters.search,
  ]);

  useEffect(() => {
    loadData(page);
  }, [page]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await downloadChildAssetsExcel(filters);
      const blob = new Blob([res.data], {
        type:
          res.headers["content-type"] ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const disposition = res.headers["content-disposition"];
      let filename = "child-assets.xlsx";
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

  return (
    <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-4 min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ HEADER: Add Button + Export + Pagination (Right Side Only) */}
      <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        {/* <div className="flex items-center gap-3">
         
          <button
            onClick={handleAddChildAsset}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Child Asset
          </button>
        </div> */}

        {/* ✅ HEADER: All 3 Buttons LEFT + Pagination RIGHT */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            {/* ✅ 1. Add Child Asset Button */}
            <button
              onClick={handleAddChildAsset}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 order-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Child Asset
            </button>

            {/* ✅ 2. Export Excel Button - LEFT SIDE */}
            <button
              onClick={handleDownloadExcel}
              disabled={loading}
              className="px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 font-medium order-2"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 14.5A1.5 1.5 0 014.5 13h2a.5.5 0 010 1h-2a.5.5 0 00-.5.5v1A1.5 1.5 0 005.5 17h9a1.5 1.5 0 001.5-1.5v-1a.5.5 0 00-.5-.5h-2a.5.5 0 010-1h2A1.5 1.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-9A2.5 2.5 0 013 15.5v-1z" />
                <path d="M10 2a.75.75 0 01.75.75v8.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
              </svg>
              Export Excel
            </button>
          </div>

          {/* ✅ 3. Pagination - RIGHT SIDE ONLY */}
          <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            {totalPages > 0 && (
              <>
                <button
                  disabled={page === 0 || loading}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-sm transition-all duration-200 bg-white"
                >
                  ← Prev
                </button>
                <span className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg min-w-[70px] text-center">
                  {totalElements > 0
                    ? `${page * size + 1}-${Math.min(
                        (page + 1) * size,
                        totalElements
                      )} of ${totalElements}`
                    : "0"}
                </span>
                <button
                  disabled={page + 1 >= totalPages || loading}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-sm transition-all duration-200 bg-white"
                >
                  Next →
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SMALL COMPACT FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          <input
            placeholder="Name"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            className="border border-gray-200 px-3 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:shadow-sm"
          />
          <input
            placeholder="Parent Tag"
            value={filters.parentAssetTag}
            onChange={(e) =>
              handleFilterChange("parentAssetTag", e.target.value)
            }
            className="border border-gray-200 px-3 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:shadow-sm font-mono"
          />
          <select
            value={filters.assetStatus}
            onChange={(e) => handleFilterChange("assetStatus", e.target.value)}
            className="border border-gray-200 px-3 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white hover:shadow-sm"
          >
            <option value="">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="CHECKED_OUT">Checked Out</option>
          </select>
          <input
            placeholder="Warranty"
            value={filters.warranty}
            onChange={(e) => handleFilterChange("warranty", e.target.value)}
            className="border border-gray-200 px-3 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:shadow-sm"
          />
          <input
            placeholder="Purchase From"
            value={filters.purchaseFrom}
            onChange={(e) => handleFilterChange("purchaseFrom", e.target.value)}
            className="border border-gray-200 px-3 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:shadow-sm"
          />
          <input
            placeholder="Created By"
            value={filters.createdBy}
            onChange={(e) => handleFilterChange("createdBy", e.target.value)}
            className="border border-gray-200 px-3 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:shadow-sm sm:col-span-2"
          />
          <input
            placeholder="🔍 Search all fields..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="border border-gray-200 px-3 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:shadow-sm col-span-2 sm:col-span-1"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 min-h-0">
        <Card className="h-full border-0 shadow-lg">
          <CardContent className="p-0 h-full">
            <div className="h-full overflow-hidden flex flex-col">
              <div className="flex-1 min-h-0 overflow-auto">
                <ChildAssetsTable childAssets={childAssets} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/50 min-w-[300px] text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Loading child assets...
            </p>
            <p className="text-sm text-gray-600">
              {totalElements} assets found
            </p>
          </div>
        </div>
      )}

      {/* ✅ CHILD ASSET MODAL - Standalone Mode (No parent tag) */}
      {showChildAssetModal && (
        <ChildAssetForm
          // ✅ No assetTag prop = Standalone mode ✅
          onClose={handleCloseModal}
          onSuccess={handleChildAssetSuccess}
        />
      )}
    </div>
  );
};

export default ChildAssetsPage;
