// import {
//   getAssetByAssetTag,
//   getAssetHistory,
//   getAssetPhotos,
//   uploadAssetPhoto,
//   getAssetDocuments,
//   uploadAssetDocuments,
// } from "../services/api";
// import AssetDetails from "./AssetDetails";
// import React, { useEffect, useState } from "react";
// import { FaSpinner, FaCamera, FaPlus } from "react-icons/fa";
// import { useParams } from "react-router-dom";

// const SingleAsset = () => {
//   const { id } = useParams();
//   const [asset, setAsset] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("details");
//   const [assetPhotos, setAssetPhotos] = useState([]);
//   const [assetHistory, setAssetHistory] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(false);
//   const [historyFetched, setHistoryFetched] = useState(false);
//   const [newPhoto, setNewPhoto] = useState(null);

//   const [docFetched, setDocFetched] = useState(false);
//   const [newDocument, setNewDocument] = useState(null);
//   const [assetDocuments, setAssetDocuments] = useState([]);
//   const [docLoading, setDocLoading] = useState(false);
//   const [newDocuments, setNewDocuments] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   // Fetch asset details and photos
//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       setDocLoading(true);

//       Promise.all([
//         getAssetByAssetTag(id),
//         getAssetPhotos(id),
//         getAssetDocuments(id),
//       ]) // Fetch asset, photos & documents
//         .then(([assetData, photoData, docData]) => {
//           setAsset(assetData);
//           setAssetPhotos(photoData);
//           setAssetDocuments(docData);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//           setAsset(null);
//           setAssetPhotos([]);
//           setAssetDocuments([]);
//         })
//         .finally(() => {
//           setLoading(false);
//           setDocLoading(false);
//         });
//     }
//   }, [id]);

//   // Fetch asset history when "History" tab is clicked
//   const fetchAssetHistory = () => {
//     if (!historyFetched) {
//       setHistoryLoading(true);
//       getAssetHistory(id)
//         .then((data) => {
//           setAssetHistory(data);
//           setHistoryLoading(false);
//           setHistoryFetched(true);
//         })
//         .catch(() => setHistoryLoading(false));
//     }
//   };
//   const handleDocumentChange = (event) => {
//     setNewDocuments(event.target.files);
//   };

//   const fetchAssetDocuments = async () => {
//     if (!docFetched) {
//       setDocLoading(true);
//       try {
//         const docs = await getAssetDocuments(id);
//         setAssetDocuments(docs);
//         setDocFetched(true);
//       } catch (error) {
//         console.error("Error fetching documents:", error);
//       } finally {
//         setDocLoading(false);
//       }
//     }
//   };

//   // Handle document upload
//   const handleUploadDocuments = async () => {
//     if (newDocuments.length === 0) return;

//     try {
//       setUploading(true);

//       const formData = new FormData();
//       for (let i = 0; i < newDocuments.length; i++) {
//         formData.append("files", newDocuments[i]);
//       }

//       await uploadAssetDocuments(id, formData); // API call

//       // Refresh document list after upload
//       const updatedDocs = await getAssetDocuments(id);
//       setAssetDocuments(updatedDocs);
//       setNewDocuments([]);
//     } catch (error) {
//       console.error("Error uploading documents:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Handle tab change
//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     if (tab === "history") fetchAssetHistory();
//     if (tab === "document") fetchAssetDocuments();
//   };
//   // Handle file selection
//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setNewPhoto(file);
//     }
//   };
//   // Handle file upload
//   const handleUploadPhoto = async () => {
//     if (!newPhoto) return;

//     try {
//       setUploading(true);
//       await uploadAssetPhoto(id, newPhoto);

//       // Refresh photo list after upload
//       const updatedPhotos = await getAssetPhotos(id);
//       setAssetPhotos(updatedPhotos);
//       setNewPhoto(null);
//     } catch (error) {
//       console.error("Error uploading photo:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="lg:ml-40 pt-16 mr-8">
//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <FaSpinner className="animate-spin text-blue-600 text-4xl" />
//         </div>
//       ) : asset ? (
//         <>
//           {/* Asset Details */}
//           {/* <AssetDetails asset={someData[0]} /> */}
//           {/* <AssetDetails asset={asset[0]} assetPhotos={assetPhotos} /> */}

//           <AssetDetails asset={asset} assetPhotos={assetPhotos} />

//           {/* Tab Navigation */}
//           <div className="flex justify-center space-x-4 border-b pb-4">
//             {["details", "history", "document", "repair", "photos"].map(
//               (tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => handleTabChange(tab)}
//                   className={`py-2 px-4 rounded-lg font-medium transition shadow-md hover:bg-blue-500 hover:text-white ${
//                     selectedTab === tab
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               )
//             )}
//           </div>

//           {/* Tab Content */}
//           {selectedTab === "details" && (
//             <div>
//               <h2 className="text-lg font-semibold">Details</h2>
//               <p>
//                 <strong>Name:</strong> {asset.name}
//               </p>
//               <p>
//                 <strong>Description:</strong> {asset.description}
//               </p>
//             </div>
//           )}

//           {selectedTab === "history" && (
//             <div className="p-6 rounded-xl bg-gray-100">
//               {historyLoading ? (
//                 <p className="text-gray-600">Loading history...</p>
//               ) : assetHistory.length > 0 ? (
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="border p-2">Field Changed</th>
//                       <th className="border p-2">Old Value</th>
//                       <th className="border p-2">New Value</th>
//                       <th className="border p-2">Modified By</th>
//                       <th className="border p-2">Timestamp</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {assetHistory.map((entry, index) => (
//                       <tr key={index} className="text-gray-700">
//                         <td className="border p-2">{entry.changedAttribute}</td>
//                         <td className="border p-2">{entry.oldValue}</td>
//                         <td className="border p-2 font-semibold">
//                           {entry.newValue}
//                         </td>
//                         <td className="border p-2">{entry.modifiedBy}</td>
//                         <td className="border p-2">
//                           {new Date(entry.modifiedAt).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p className="text-gray-600">No history available.</p>
//               )}
//             </div>
//           )}

//           {selectedTab === "document" && (
//             <div className="p-6 rounded-xl bg-gray-100">
//               <h2 className="text-lg font-semibold">Asset Documents</h2>

//               {/* Loading State */}
//               {docLoading ? (
//                 <p className="text-gray-600">Loading documents...</p>
//               ) : assetDocuments.length > 0 ? (
//                 <table className="w-full border-collapse border border-gray-300 mt-4">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="border p-2">Document Name</th>
//                       <th className="border p-2">Added By</th>
//                       <th className="border p-2">Added At</th>
//                       <th className="border p-2">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {assetDocuments.map((doc, index) => (
//                       <tr key={index} className="text-gray-700">
//                         <td className="border p-2">
//                           {doc.documentUrl.split("/").pop()}
//                         </td>
//                         <td className="border p-2">{doc.addedBy}</td>
//                         <td className="border p-2">
//                           {new Date(doc.addedAt).toLocaleString()}
//                         </td>
//                         <td className="border p-2">
//                           <a
//                             href={doc.documentUrl} // ✅ Use full API URL
//                             download // ✅ Forces proper download
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                           >
//                             Download
//                           </a>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p className="text-gray-600">No documents available.</p>
//               )}

//               {/* Document Upload Section */}
//               <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-md font-semibold mb-2">
//                   Upload New Documents
//                 </h3>

//                 <input
//                   type="file"
//                   multiple
//                   accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
//                   onChange={handleDocumentChange}
//                   className="border p-2 w-full rounded-lg"
//                 />

//                 {newDocuments.length > 0 && (
//                   <div className="flex items-center justify-between mt-4">
//                     <p className="text-gray-700">
//                       {newDocuments.length} files selected
//                     </p>

//                     <button
//                       onClick={handleUploadDocuments}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//                       disabled={uploading}
//                     >
//                       {uploading ? (
//                         <FaSpinner className="animate-spin mr-2" />
//                       ) : (
//                         <FaPlus className="mr-2" />
//                       )}
//                       Upload
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {selectedTab === "repair" && (
//             <p className="text-gray-700">No repairs recorded.</p>
//           )}

//           {/* Photos Tab */}
//           {selectedTab === "photos" && (
//             <div>
//               <h2 className="text-lg font-semibold">Asset Photos</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
//                 {assetPhotos.length > 0 ? (
//                   assetPhotos.map((photo, index) => (
//                     <img
//                       key={index}
//                       src={photo}
//                       alt={`Asset ${index}`}
//                       width={200}
//                     />
//                   ))
//                 ) : (
//                   <p className="text-gray-600">No photos available.</p>
//                 )}
//               </div>

//               {/* Photo Upload Section */}
//               <div className="mt-6 flex flex-col space-y-4">
//                 <label
//                   htmlFor="photo-upload"
//                   className="cursor-pointer flex items-center text-blue-600 space-x-2"
//                 >
//                   <FaCamera size={20} /> <span>Select Photo</span>
//                 </label>
//                 <input
//                   id="photo-upload"
//                   type="file"
//                   className="hidden"
//                   onChange={handlePhotoChange}
//                 />

//                 {newPhoto && (
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={URL.createObjectURL(newPhoto)}
//                       alt="Preview"
//                       className="w-24 h-24 object-cover rounded-lg shadow"
//                     />
//                     <button
//                       onClick={handleUploadPhoto}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//                     >
//                       {uploading ? (
//                         <FaSpinner className="animate-spin mr-2" />
//                       ) : (
//                         <FaPlus className="mr-2" />
//                       )}
//                       Upload
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="flex justify-center items-center min-h-screen">
//           <p className="text-lg font-semibold text-red-500">Asset not found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleAsset;

import {
  getAssetByAssetTag,
  getAssetHistory,
  getAssetPhotos,
  uploadAssetPhoto,
  getAssetDocuments,
  uploadAssetDocuments,
  getChildAssetsByParent,
} from "../services/api";
import AssetDetails from "./AssetDetails";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaCamera, FaPlus, FaFileAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SingleAsset = () => {
  const { id } = useParams();

  // State setup
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

  // Initial asset fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [assetData, photoData, docData] = await Promise.all([
          getAssetByAssetTag(id),
          getAssetPhotos(id),
          getAssetDocuments(id),
        ]);
        console.log("Asset data are ", assetData);
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

  // const fetchChildAssets = async () => {
  //   if (!childrenFetched) {
  //     try {
  //       const res = await getChildAssetsByParent(id); // API call
  //       console.log("Child assets response:", res.data);
  //       setChildAssets(res.data); // or res.data if using Axios
  //       setChildrenFetched(true);
  //     } catch (err) {
  //       console.error("Error fetching child assets", err);
  //     }
  //   }
  // };

  const fetchChildAssets = async () => {
    if (!childrenFetched) {
      try {
        const res = await getChildAssetsByParent(id);
        // console.log("Fetched child assets:", res); // ✅ should log array of objects
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="text-3xl text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold text-lg">
        Asset not found.
      </div>
    );
  }

  return (
    // <div className="lg:ml-64 px-4 md:px-12 pt-16 pb-10">
    <div className="lg:ml-40 pt-16 mr-8">
      {/* Asset Details Component */}
      <AssetDetails asset={asset} assetPhotos={assetPhotos} />

      {/* Tab Navigation */}
      <div className="flex gap-3 mt-6 border-b pb-3 overflow-x-auto">
        {["details", "history", "documents", "photos", "childAssets"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 text-sm rounded-md capitalize whitespace-nowrap ${
                selectedTab === tab
                  ? "bg-blue-600 text-white shadow"
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
        {selectedTab === "details" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Basic Information
            </h2>
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
        )}

        {selectedTab === "history" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              Asset History
            </h2>
            {assetHistory.length > 0 ? (
              <table className="w-full text-sm text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Field</th>
                    <th className="p-2 border">Old</th>
                    <th className="p-2 border">New</th>
                    <th className="p-2 border">Modified By</th>
                    <th className="p-2 border">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {assetHistory.map((h, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2 border">{h.changedAttribute}</td>
                      <td className="p-2 border">{h.oldValue}</td>
                      <td className="p-2 border font-semibold">{h.newValue}</td>
                      <td className="p-2 border">{h.modifiedBy}</td>
                      <td className="p-2 border">
                        {new Date(h.modifiedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No history available.</p>
            )}
          </div>
        )}

        {selectedTab === "documents" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-700">
                Asset Documents
              </h2>
            </div>

            {assetDocuments.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2 text-sm">
                {assetDocuments.map((doc, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaFileAlt className="text-gray-500" />
                    <a
                      href={doc.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
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

            {/* Upload */}
            <div className="mt-6">
              <label className="font-medium text-gray-700">
                Upload Documents
              </label>
              <input
                type="file"
                multiple
                onChange={handleDocumentChange}
                className="mt-2 block w-full border border-gray-300 rounded p-2"
              />
              {newDocuments.length > 0 && (
                <button
                  onClick={handleUploadDocuments}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* {selectedTab === "childAssets" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              Child Assets
            </h2>

            {childAssets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {childAssets.map((child, index) => (
                  <div
                    key={child.id}
                    className="border rounded-xl p-4 shadow hover:shadow-md transition"
                  >
                    <h3 className="text-md font-bold text-gray-800 mb-2">
                      Child {index + 1}: {child.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Warranty:</strong> {child.warranty || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Purchase From:</strong>{" "}
                      {child.purchaseFrom || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong>{" "}
                      {child.childAssetNote || "No notes"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No child assets found.</p>
            )}
          </div>
        )} */}

        {selectedTab === "childAssets" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              Child Assets
            </h2>
            {childAssets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {childAssets.map((child, index) => (
                  <div
                    key={index}
                    className="border rounded-xl shadow-md p-4 bg-gray-50"
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

        {selectedTab === "photos" && (
          <div className="bg-white p-6 rounded-lg shadow">
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
                    className="rounded-lg object-cover w-full h-32 border"
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full">
                  No photos uploaded yet.
                </p>
              )}
            </div>

            {/* Upload */}
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
