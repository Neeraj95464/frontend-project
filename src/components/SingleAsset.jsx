import {
  getAssetByAssetTag,
  getAssetHistory,
  getAssetPhotos,
  uploadAssetPhoto,
  getAssetDocuments,
  uploadAssetDocuments,
} from "../services/api";
import AssetDetails from "./AssetDetails";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaCamera, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SingleAsset = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("details");
  const [assetPhotos, setAssetPhotos] = useState([]);
  const [assetHistory, setAssetHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyFetched, setHistoryFetched] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const [docFetched, setDocFetched] = useState(false);
  const [newDocument, setNewDocument] = useState(null);
  const [assetDocuments, setAssetDocuments] = useState([]);
  const [docLoading, setDocLoading] = useState(false);
  const [newDocuments, setNewDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch asset details and photos
  useEffect(() => {
    if (id) {
      setLoading(true);
      setDocLoading(true);

      Promise.all([
        getAssetByAssetTag(id),
        getAssetPhotos(id),
        getAssetDocuments(id),
      ]) // Fetch asset, photos & documents
        .then(([assetData, photoData, docData]) => {
          setAsset(assetData);
          setAssetPhotos(photoData);
          setAssetDocuments(docData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setAsset(null);
          setAssetPhotos([]);
          setAssetDocuments([]);
        })
        .finally(() => {
          setLoading(false);
          setDocLoading(false);
        });
    }
  }, [id]);

  // Fetch asset history when "History" tab is clicked
  const fetchAssetHistory = () => {
    if (!historyFetched) {
      setHistoryLoading(true);
      getAssetHistory(id)
        .then((data) => {
          setAssetHistory(data);
          setHistoryLoading(false);
          setHistoryFetched(true);
        })
        .catch(() => setHistoryLoading(false));
    }
  };
  const handleDocumentChange = (event) => {
    setNewDocuments(event.target.files);
  };

  const fetchAssetDocuments = async () => {
    if (!docFetched) {
      setDocLoading(true);
      try {
        const docs = await getAssetDocuments(id);
        setAssetDocuments(docs);
        setDocFetched(true);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setDocLoading(false);
      }
    }
  };

  // Handle document upload
  const handleUploadDocuments = async () => {
    if (newDocuments.length === 0) return;

    try {
      setUploading(true);

      const formData = new FormData();
      for (let i = 0; i < newDocuments.length; i++) {
        formData.append("files", newDocuments[i]);
      }

      await uploadAssetDocuments(id, formData); // API call

      // Refresh document list after upload
      const updatedDocs = await getAssetDocuments(id);
      setAssetDocuments(updatedDocs);
      setNewDocuments([]);
    } catch (error) {
      console.error("Error uploading documents:", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "history") fetchAssetHistory();
    if (tab === "document") fetchAssetDocuments();
  };
  // Handle file selection
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
    }
  };
  // Handle file upload
  const handleUploadPhoto = async () => {
    if (!newPhoto) return;

    try {
      setUploading(true);
      await uploadAssetPhoto(id, newPhoto);

      // Refresh photo list after upload
      const updatedPhotos = await getAssetPhotos(id);
      setAssetPhotos(updatedPhotos);
      setNewPhoto(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        </div>
      ) : asset ? (
        <>
          {/* Asset Details */}
          {/* <AssetDetails asset={someData[0]} /> */}
          {/* <AssetDetails asset={asset[0]} assetPhotos={assetPhotos} /> */}

          <AssetDetails asset={asset} assetPhotos={assetPhotos} />

          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 border-b pb-4">
            {["details", "history", "document", "repair", "photos"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`py-2 px-4 rounded-lg font-medium transition shadow-md hover:bg-blue-500 hover:text-white ${
                    selectedTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Tab Content */}
          {selectedTab === "details" && (
            <div>
              <h2 className="text-lg font-semibold">Details</h2>
              <p>
                <strong>Name:</strong> {asset.name}
              </p>
              <p>
                <strong>Description:</strong> {asset.description}
              </p>
            </div>
          )}

          {selectedTab === "history" && (
            <div className="p-6 rounded-xl bg-gray-100">
              {historyLoading ? (
                <p className="text-gray-600">Loading history...</p>
              ) : assetHistory.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Field Changed</th>
                      <th className="border p-2">Old Value</th>
                      <th className="border p-2">New Value</th>
                      <th className="border p-2">Modified By</th>
                      <th className="border p-2">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetHistory.map((entry, index) => (
                      <tr key={index} className="text-gray-700">
                        <td className="border p-2">{entry.changedAttribute}</td>
                        <td className="border p-2">{entry.oldValue}</td>
                        <td className="border p-2 font-semibold">
                          {entry.newValue}
                        </td>
                        <td className="border p-2">{entry.modifiedBy}</td>
                        <td className="border p-2">
                          {new Date(entry.modifiedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600">No history available.</p>
              )}
            </div>
          )}

          {selectedTab === "document" && (
            <div className="p-6 rounded-xl bg-gray-100">
              <h2 className="text-lg font-semibold">Asset Documents</h2>

              {/* Loading State */}
              {docLoading ? (
                <p className="text-gray-600">Loading documents...</p>
              ) : assetDocuments.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Document Name</th>
                      <th className="border p-2">Added By</th>
                      <th className="border p-2">Added At</th>
                      <th className="border p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetDocuments.map((doc, index) => (
                      <tr key={index} className="text-gray-700">
                        <td className="border p-2">
                          {doc.documentUrl.split("/").pop()}
                        </td>
                        <td className="border p-2">{doc.addedBy}</td>
                        <td className="border p-2">
                          {new Date(doc.addedAt).toLocaleString()}
                        </td>
                        <td className="border p-2">
                          <a
                            href={doc.documentUrl} // ✅ Use full API URL
                            download // ✅ Forces proper download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600">No documents available.</p>
              )}

              {/* Document Upload Section */}
              <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-md font-semibold mb-2">
                  Upload New Documents
                </h3>

                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  onChange={handleDocumentChange}
                  className="border p-2 w-full rounded-lg"
                />

                {newDocuments.length > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-gray-700">
                      {newDocuments.length} files selected
                    </p>

                    <button
                      onClick={handleUploadDocuments}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        <FaPlus className="mr-2" />
                      )}
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedTab === "repair" && (
            <p className="text-gray-700">No repairs recorded.</p>
          )}

          {/* Photos Tab */}
          {selectedTab === "photos" && (
            <div>
              <h2 className="text-lg font-semibold">Asset Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {assetPhotos.length > 0 ? (
                  assetPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Asset ${index}`}
                      width={200}
                    />
                  ))
                ) : (
                  <p className="text-gray-600">No photos available.</p>
                )}
              </div>

              {/* Photo Upload Section */}
              <div className="mt-6 flex flex-col space-y-4">
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex items-center text-blue-600 space-x-2"
                >
                  <FaCamera size={20} /> <span>Select Photo</span>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  onChange={handlePhotoChange}
                />

                {newPhoto && (
                  <div className="flex items-center space-x-4">
                    <img
                      src={URL.createObjectURL(newPhoto)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />
                    <button
                      onClick={handleUploadPhoto}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      {uploading ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        <FaPlus className="mr-2" />
                      )}
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-semibold text-red-500">Asset not found.</p>
        </div>
      )}
    </div>
  );
};

export default SingleAsset;
