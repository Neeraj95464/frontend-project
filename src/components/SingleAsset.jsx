import AssetDetails from "../pages/AssetDetails";
import {
  getAssetByAssetTag,
  getAssetHistory,
  getAssetPhotos,
  uploadAssetPhoto,
  getAssetDocuments,
  uploadAssetDocuments,
  getChildAssetsByParent,
} from "../services/api";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaCamera, FaFileAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SingleAsset = () => {
  const { id } = useParams();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

    if (id) fetchData();
  }, [id]);

  // Fetch on tab change
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

  const handleDocumentChange = (e) =>
    setNewDocuments(Array.from(e.target.files));

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

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <FaSpinner className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }

  // Not Found
  if (!asset) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold text-lg bg-gray-50">
        Asset not found.
      </div>
    );
  }

  return (
    <div className="lg:ml-40 pt-16">
      {/* Asset Details */}
      <AssetDetails asset={asset} assetPhotos={assetPhotos} />

      {/* Tabs */}
      <div className="flex gap-3 mt-6 border-b pb-3 overflow-x-auto">
        {["details", "history", "documents", "photos", "childAssets"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 text-sm rounded-md capitalize whitespace-nowrap transition-all duration-300 ${
                selectedTab === tab
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-6 space-y-6">
        {/* Details */}
        {selectedTab === "details" && (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Name:</strong> {asset.name || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {asset.description || "N/A"}
              </p>
              <p>
                <strong>Asset Tag:</strong> {asset.assetTag || id}
              </p>
              <p>
                <strong>Status:</strong> {asset.status}
              </p>
            </div>
          </div>
        )}

        {/* History */}
        {selectedTab === "history" && (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              Asset History
            </h2>
            {assetHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      {["Field", "Old", "New", "Modified By", "Timestamp"].map(
                        (head) => (
                          <th key={head} className="p-2 border">
                            {head}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {assetHistory.map((h, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="p-2 border">{h.changedAttribute}</td>
                        <td className="p-2 border">{h.oldValue}</td>
                        <td className="p-2 border font-semibold text-blue-700">
                          {h.newValue}
                        </td>
                        <td className="p-2 border">{h.modifiedBy}</td>
                        <td className="p-2 border">
                          {new Date(h.modifiedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No history available.</p>
            )}
          </div>
        )}

        {/* Documents */}
        {selectedTab === "documents" && (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              Asset Documents
            </h2>
            {assetDocuments.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2 text-sm">
                {assetDocuments.map((doc, index) => (
                  <li
                    key={index}
                    className="flex flex-wrap items-center space-x-2"
                  >
                    <FaFileAlt className="text-gray-500" />
                    <a
                      href={doc.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {doc.documentUrl.split("/").pop()}
                    </a>
                    <span className="text-gray-500 ml-2 text-xs">
                      — Added by {doc.addedBy} on{" "}
                      {new Date(doc.addedAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No documents uploaded yet.</p>
            )}

            {/* Upload Section */}
            <div className="mt-6 space-y-2">
              <input
                type="file"
                multiple
                onChange={handleDocumentChange}
                className="block w-full border border-gray-300 rounded p-2"
              />
              {newDocuments.length > 0 && (
                <button
                  onClick={handleUploadDocuments}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Child Assets */}
        {selectedTab === "childAssets" && (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              Child Assets
            </h2>
            {childAssets.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {childAssets.map((child, index) => (
                  <div
                    key={index}
                    className="border rounded-xl shadow-sm p-4 bg-gray-50 hover:shadow-md transition"
                  >
                    <h3 className="text-md font-bold text-blue-600 mb-2">
                      {child.name}
                    </h3>
                    <p>
                      <span className="font-semibold">Warranty:</span>{" "}
                      {child.warranty}
                    </p>
                    <p>
                      <span className="font-semibold">Purchase From:</span>{" "}
                      {child.purchaseFrom}
                    </p>
                    <p>
                      <span className="font-semibold">Note:</span>{" "}
                      {child.childAssetNote}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No child assets available.</p>
            )}
          </div>
        )}

        {/* Photos */}
        {selectedTab === "photos" && (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              Asset Photos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {assetPhotos.length > 0 ? (
                assetPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1} of ${asset.name}`}
                    className="rounded-lg object-cover w-full h-32 border shadow-sm hover:shadow-md transition"
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full">
                  No photos uploaded yet.
                </p>
              )}
            </div>

            {/* Upload Photo */}
            <div className="mt-6">
              <label
                htmlFor="photoUpload"
                className="flex items-center space-x-2 cursor-pointer w-fit text-blue-600 hover:underline"
              >
                <FaCamera />
                <span>Choose Photo</span>
              </label>
              <input
                id="photoUpload"
                type="file"
                onChange={handlePhotoChange}
                className="hidden"
              />
              {newPhoto && (
                <div className="flex items-center mt-4 space-x-4">
                  <img
                    src={URL.createObjectURL(newPhoto)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border shadow"
                  />
                  <button
                    onClick={handleUploadPhoto}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleAsset;
