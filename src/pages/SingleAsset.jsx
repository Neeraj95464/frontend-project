

import AssetDetails from "./AssetDetails";
import AssetTransactionModal from "../components/AssetTransactionModal"; // ADD THIS IMPORT
import {
  getAssetByAssetTag,
  getAssetHistory,
  getAssetPhotos,
  uploadAssetPhoto,
  getAssetDocuments,
  uploadAssetDocuments,
  getChildAssetsByParent,
  fetchAssets,
} from "../services/api";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaSpinner, FaCamera, FaFileAlt } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const SingleAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ADD THESE STATE DECLARATIONS
  const [selectedAssetTag, setSelectedAssetTag] = useState(null);
  const [selectedAssetSummary, setSelectedAssetSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navigation state
  const [allAssets, setAllAssets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [totalAssets, setTotalAssets] = useState(0);

  const [selectedTab, setSelectedTab] = useState("details");

  const [assetPhotos, setAssetPhotos] = useState([]);
  const [assetHistory, setAssetHistory] = useState([]);
  const [assetDocuments, setAssetDocuments] = useState([]);

  const [historyFetched, setHistoryFetched] = useState(false);
  const [docFetched, setDocFetched] = useState(false);

  const [newPhoto, setNewPhoto] = useState(null);
  const [newDocuments, setNewDocuments] = useState([]);

  const [childAssets, setChildAssets] = useState([]);
  const [childrenFetched, setChildrenFetched] = useState(false);

  // ── FIX 1: Read filters from the returnUrl stored in location.state
  const getFilterParams = useCallback(() => {
    const returnUrl = location.state?.returnUrl || "";
    const searchString = returnUrl.includes("?")
      ? returnUrl.split("?")[1]
      : "";

    const params = new URLSearchParams(searchString);
    const filters = {};
    if (params.get("status")) filters.status = params.get("status");
    if (params.get("type")) filters.type = params.get("type");
    if (params.get("department")) filters.department = params.get("department");
    if (params.get("createdBy")) filters.createdBy = params.get("createdBy");
    if (params.get("siteId")) filters.siteId = params.get("siteId");
    if (params.get("locationId")) filters.locationId = params.get("locationId");
    if (params.get("purchaseStart")) filters.purchaseStart = params.get("purchaseStart");
    if (params.get("purchaseEnd")) filters.purchaseEnd = params.get("purchaseEnd");
    if (params.get("createdStart")) filters.createdStart = params.get("createdStart");
    if (params.get("createdEnd")) filters.createdEnd = params.get("createdEnd");
    if (params.get("keyword")) filters.keyword = params.get("keyword");
    return filters;
  }, [location.state]);

  // ── FIX 2: Refs so navigation handlers never read stale state
  const allAssetsRef = useRef([]);
  const currentIndexRef = useRef(-1);

  useEffect(() => { allAssetsRef.current = allAssets; }, [allAssets]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  // Fetch the full asset list for navigation context
  const fetchAllAssetsForNavigation = useCallback(async (currentId) => {
    try {
      const filters = getFilterParams();
      const data = await fetchAssets({ ...filters, page: 0, size: 1000 });
      const assetsList = data?.content || [];

      setAllAssets(assetsList);
      allAssetsRef.current = assetsList;
      setTotalAssets(data?.totalElements || assetsList.length);

      const index = assetsList.findIndex((a) => a.assetTag === currentId);
      setCurrentIndex(index);
      currentIndexRef.current = index;
    } catch (error) {
      console.error("Error fetching assets for navigation:", error);
    }
  }, [getFilterParams]);

  // ADD THIS FUNCTION - Handle asset click to open transaction modal
  const handleAssetClick = useCallback((assetTagId, assetSummary) => {
    setSelectedAssetTag(assetTagId);
    setSelectedAssetSummary(assetSummary);
    setIsModalOpen(true);
  }, []);

  // Initial data fetch — reruns whenever the route :id changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHistoryFetched(false);
      setDocFetched(false);
      setChildrenFetched(false);
      setAssetHistory([]);
      setAssetDocuments([]);
      setChildAssets([]);
      setSelectedTab("details");
      try {
        const [assetData, photoData, docData] = await Promise.all([
          getAssetByAssetTag(id),
          getAssetPhotos(id),
          getAssetDocuments(id),
        ]);
        setAsset(assetData);
        setAssetPhotos(photoData || []);
        setAssetDocuments(docData || []);
      } catch (error) {
        console.error("Error fetching asset:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
      fetchAllAssetsForNavigation(id);
    }
  }, [id, fetchAllAssetsForNavigation]);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    const assets = allAssetsRef.current;
    const idx = currentIndexRef.current;
    if (!assets.length || idx <= 0) return;
    const prevAsset = assets[idx - 1];
    if (!prevAsset?.assetTag) return;
    navigate(`/asset/${prevAsset.assetTag}`, {
      state: { returnUrl: location.state?.returnUrl || "/assets" },
    });
  }, [navigate, location.state]);

  const handleNext = useCallback(() => {
    const assets = allAssetsRef.current;
    const idx = currentIndexRef.current;
    if (!assets.length || idx < 0 || idx >= assets.length - 1) return;
    const nextAsset = assets[idx + 1];
    if (!nextAsset?.assetTag) return;
    navigate(`/asset/${nextAsset.assetTag}`, {
      state: { returnUrl: location.state?.returnUrl || "/assets" },
    });
  }, [navigate, location.state]);

  // Tab data fetchers
  const fetchAssetHistory = async () => {
    if (!historyFetched) {
      try {
        const res = await getAssetHistory(id);
        setAssetHistory(res);
        setHistoryFetched(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchChildAssets = async () => {
    if (!childrenFetched) {
      try {
        const res = await getChildAssetsByParent(id);
        setChildAssets(res);
        setChildrenFetched(true);
      } catch (err) {
        console.error("Error fetching child assets", err);
      }
    }
  };

  const fetchAssetDocuments = async () => {
    if (!docFetched) {
      try {
        const res = await getAssetDocuments(id);
        setAssetDocuments(res);
        setDocFetched(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "history") fetchAssetHistory();
    if (tab === "documents") fetchAssetDocuments();
    if (tab === "childAssets") fetchChildAssets();
  };

  const handleDocumentChange = (e) => setNewDocuments(Array.from(e.target.files));
  const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

  const handleUploadDocuments = async () => {
    if (newDocuments.length === 0) return;
    try {
      setUploading(true);
      const formData = new FormData();
      newDocuments.forEach((file) => formData.append("files", file));
      await uploadAssetDocuments(id, formData);
      const docs = await getAssetDocuments(id);
      setAssetDocuments(docs);
      setNewDocuments([]);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadPhoto = async () => {
    if (!newPhoto) return;
    try {
      setUploading(true);
      await uploadAssetPhoto(id, newPhoto);
      const photos = await getAssetPhotos(id);
      setAssetPhotos(photos);
      setNewPhoto(null);
    } catch (err) {
      console.error("Photo upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="lg:ml-48 flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <FaSpinner className="text-3xl text-blue-500 animate-spin" />
          <p className="text-xs text-slate-400">Loading asset...</p>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="lg:ml-48 flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-600">Asset not found</p>
          <p className="text-xs text-slate-400 mt-1">The requested asset could not be located.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "details", label: "Details", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { key: "history", label: "History", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { key: "documents", label: "Documents", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { key: "photos", label: "Photos", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { key: "childAssets", label: "Child Assets", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
  ];

  return (
    <div className="lg:ml-48 bg-gray-50 min-h-screen p-4 lg:p-6">
      <AssetDetails
        asset={asset}
        assetPhotos={assetPhotos}
        onNext={handleNext}
        onPrev={handlePrevious}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex !== -1 && currentIndex < allAssets.length - 1}
        currentIndex={currentIndex + 1}
        totalAssets={totalAssets}
      />

      {/* Tabs */}
      <div className="flex gap-1 mt-6 bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto relative z-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
              selectedTab === tab.key
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {selectedTab === "details" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Description", value: asset.description },
                { label: "Purchase Date", value: asset.purchaseDate },
                { label: "Purchase From", value: asset.purchaseFrom },
                { label: "Cost", value: asset.cost },
                { label: "Model", value: asset.model },
                { label: "Asset Type", value: asset.assetType },
                { label: "Department", value: asset.department },
                { label: "Created By", value: asset.createdBy },
                { label: "Asset Tag", value: asset.assetTag || id },
                { label: "Status", value: asset.status },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                  <p className="text-xs font-medium text-slate-700">{value || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "history" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-sm font-semibold text-slate-700">Asset History</h2>
            </div>

            {/* FIXED: This was incorrectly placed - moved inside history tab */}
            {assetHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {["Field", "Old Value", "New Value", "Modified By", "Timestamp"].map((head) => (
                        <th key={head} className="px-4 py-2.5 text-left text-slate-500 font-medium">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {assetHistory.map((h, index) => (
                      <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-2.5 text-slate-600 font-medium">{h.changedAttribute}</td>
                        <td className="px-4 py-2.5 text-slate-400">{h.oldValue || "—"}</td>
                        <td className="px-4 py-2.5 text-blue-600 font-semibold">{h.newValue}</td>
                        <td className="px-4 py-2.5 text-slate-600">{h.modifiedBy}</td>
                        <td className="px-4 py-2.5 text-slate-400">{new Date(h.modifiedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs">No history available</p>
              </div>
            )}
          </div>
        )}

        {/* ADD THIS - Button to open transaction modal in history tab */}
        {selectedTab === "history" && asset && (
          <div className="mt-4">
            <button
              onClick={() => handleAssetClick(asset.assetTag || id, {
                description: asset.description,
                brand: asset.brand,
                model: asset.model,
                serialNo: asset.serialNo,
                currentStatus: asset.status,
                bookValue: asset.bookValue,
                cost: asset.cost,
                department: asset.department,
                location: asset.location,
                assignedTo: asset.assignedTo,
                assetType: asset.assetType,
              })}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Asset Tiger History
            </button>
          </div>
        )}

        {selectedTab === "documents" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Documents content - keep as is */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-sm font-semibold text-slate-700">Asset Documents</h2>
            </div>
            <div className="p-5">
              {assetDocuments.length > 0 ? (
                <ul className="space-y-2 mb-5">
                  {assetDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaFileAlt className="text-blue-500 text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline block truncate">
                          {doc.documentUrl.split("/").pop()}
                        </a>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Added by {doc.addedBy} · {new Date(doc.addedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-slate-300 mb-4">
                  <FaFileAlt className="text-3xl mb-2" />
                  <p className="text-xs">No documents uploaded yet</p>
                </div>
              )}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <p className="text-xs font-medium text-slate-500">Upload Documents</p>
                <input type="file" multiple onChange={handleDocumentChange}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 border border-slate-200 rounded-lg p-1.5 cursor-pointer" />
                {newDocuments.length > 0 && (
                  <button onClick={handleUploadDocuments} disabled={uploading}
                    className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all font-medium">
                    {uploading ? "Uploading..." : `Upload ${newDocuments.length} file${newDocuments.length > 1 ? "s" : ""}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "childAssets" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Child Assets content - keep as is */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <h2 className="text-sm font-semibold text-slate-700">Child Assets</h2>
              {childAssets.length > 0 && (
                <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">{childAssets.length}</span>
              )}
            </div>
            <div className="p-5">
              {childAssets.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {childAssets.map((child, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-blue-200 hover:shadow-sm transition-all">
                      <h3 className="text-xs font-semibold text-blue-600 mb-2.5">{child.name}</h3>
                      <div className="space-y-1.5">
                        {[
                          { label: "Warranty", value: child.warranty },
                          { label: "Purchase From", value: child.purchaseFrom },
                          { label: "Note", value: child.childAssetNote },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex gap-2">
                            <span className="text-xs text-slate-400 w-24 flex-shrink-0">{label}</span>
                            <span className="text-xs text-slate-600 font-medium">{value || "—"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-slate-300">
                  <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <p className="text-xs">No child assets available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === "photos" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Photos content - keep as is */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-sm font-semibold text-slate-700">Asset Photos</h2>
              {assetPhotos.length > 0 && (
                <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">{assetPhotos.length}</span>
              )}
            </div>
            <div className="p-5">
              {assetPhotos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
                  {assetPhotos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                      <img src={photo} alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-slate-300 mb-4">
                  <FaCamera className="text-3xl mb-2" />
                  <p className="text-xs">No photos uploaded yet</p>
                </div>
              )}
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Upload Photo</p>
                <label htmlFor="photoUpload"
                  className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all">
                  <FaCamera className="text-xs" />
                  Choose Photo
                </label>
                <input id="photoUpload" type="file" onChange={handlePhotoChange} className="hidden" />
                {newPhoto && (
                  <div className="flex items-center gap-4 mt-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={URL.createObjectURL(newPhoto)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <button onClick={handleUploadPhoto} disabled={uploading}
                      className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all font-medium">
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Asset Transaction Modal - MOVED HERE (outside the main return but inside component) */}
      <AssetTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAssetTag(null);
          setSelectedAssetSummary(null);
        }}
        assetTagId={selectedAssetTag}
        assetSummary={selectedAssetSummary}
      />
    </div>
  );
};

export default SingleAsset;

