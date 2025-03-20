import {
  getAssetByAssetTag,
  getAssetHistory,
  getAssetPhotos,
  uploadAssetPhoto,
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
  const [uploading, setUploading] = useState(false);

  // Fetch asset details and photos
  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([getAssetByAssetTag(id), getAssetPhotos(id)]) // Fetch asset & photos
        .then(([assetData, photoData]) => {
          console.log("Asset Data:", assetData); // ✅ Debug asset data
          console.log("Photo Data:", photoData); // ✅ Debug photo URLs

          setAsset(assetData);
          setAssetPhotos(photoData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setAsset(null);
          setAssetPhotos([]);
          setLoading(false);
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

  // Handle tab change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "history") fetchAssetHistory();
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
          <AssetDetails asset={asset} assetPhotos={assetPhotos} />

          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 border-b pb-4">
            {["details", "history", "events", "repair", "photos"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-2 px-4 rounded-lg font-medium transition shadow-md hover:bg-blue-500 hover:text-white ${
                  selectedTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
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

          {selectedTab === "events" && (
            <p className="text-gray-700">No events available.</p>
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
