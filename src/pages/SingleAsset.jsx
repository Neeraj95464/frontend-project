// // // // // // import AssetDetails from "./AssetDetails";
// // // // // // import {
// // // // // //   getAssetByAssetTag,
// // // // // //   getAssetHistory,
// // // // // //   getAssetPhotos,
// // // // // //   uploadAssetPhoto,
// // // // // //   getAssetDocuments,
// // // // // //   uploadAssetDocuments,
// // // // // //   getChildAssetsByParent,
// // // // // // } from "../services/api";
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { FaSpinner, FaCamera, FaFileAlt } from "react-icons/fa";
// // // // // // import { useParams } from "react-router-dom";

// // // // // // const SingleAsset = () => {
// // // // // //   const { id } = useParams();

// // // // // //   const [asset, setAsset] = useState(null);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [uploading, setUploading] = useState(false);

// // // // // //   const [selectedTab, setSelectedTab] = useState("details");

// // // // // //   const [assetPhotos, setAssetPhotos] = useState([]);
// // // // // //   const [assetHistory, setAssetHistory] = useState([]);
// // // // // //   const [assetDocuments, setAssetDocuments] = useState([]);

// // // // // //   const [historyFetched, setHistoryFetched] = useState(false);
// // // // // //   const [docFetched, setDocFetched] = useState(false);

// // // // // //   const [newPhoto, setNewPhoto] = useState(null);
// // // // // //   const [newDocuments, setNewDocuments] = useState([]);

// // // // // //   const [childAssets, setChildAssets] = useState([]);
// // // // // //   const [childrenFetched, setChildrenFetched] = useState(false);

// // // // // //   // Initial Data Fetch
// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       setLoading(true);
// // // // // //       try {
// // // // // //         const [assetData, photoData, docData] = await Promise.all([
// // // // // //           getAssetByAssetTag(id),
// // // // // //           getAssetPhotos(id),
// // // // // //           getAssetDocuments(id),
// // // // // //         ]);
// // // // // //         setAsset(assetData);
// // // // // //         setAssetPhotos(photoData || []);
// // // // // //         setAssetDocuments(docData || []);
// // // // // //       } catch (error) {
// // // // // //         console.error("Error fetching asset:", error);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     if (id) fetchData();
// // // // // //   }, [id]);

// // // // // //   // Fetch on tab change
// // // // // //   const fetchAssetHistory = async () => {
// // // // // //     if (!historyFetched) {
// // // // // //       try {
// // // // // //         const res = await getAssetHistory(id);
// // // // // //         setAssetHistory(res);
// // // // // //         setHistoryFetched(true);
// // // // // //       } catch (err) {
// // // // // //         console.error(err);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchChildAssets = async () => {
// // // // // //     if (!childrenFetched) {
// // // // // //       try {
// // // // // //         const res = await getChildAssetsByParent(id);
// // // // // //         setChildAssets(res);
// // // // // //         setChildrenFetched(true);
// // // // // //       } catch (err) {
// // // // // //         console.error("Error fetching child assets", err);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchAssetDocuments = async () => {
// // // // // //     if (!docFetched) {
// // // // // //       try {
// // // // // //         const res = await getAssetDocuments(id);
// // // // // //         setAssetDocuments(res);
// // // // // //         setDocFetched(true);
// // // // // //       } catch (err) {
// // // // // //         console.error(err);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleTabChange = (tab) => {
// // // // // //     setSelectedTab(tab);
// // // // // //     if (tab === "history") fetchAssetHistory();
// // // // // //     if (tab === "documents") fetchAssetDocuments();
// // // // // //     if (tab === "childAssets") fetchChildAssets();
// // // // // //   };

// // // // // //   const handleDocumentChange = (e) =>
// // // // // //     setNewDocuments(Array.from(e.target.files));

// // // // // //   const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

// // // // // //   const handleUploadDocuments = async () => {
// // // // // //     if (newDocuments.length === 0) return;
// // // // // //     try {
// // // // // //       setUploading(true);
// // // // // //       const formData = new FormData();
// // // // // //       newDocuments.forEach((file) => formData.append("files", file));
// // // // // //       await uploadAssetDocuments(id, formData);
// // // // // //       const docs = await getAssetDocuments(id);
// // // // // //       setAssetDocuments(docs);
// // // // // //       setNewDocuments([]);
// // // // // //     } catch (err) {
// // // // // //       console.error("Upload failed:", err);
// // // // // //     } finally {
// // // // // //       setUploading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleUploadPhoto = async () => {
// // // // // //     if (!newPhoto) return;
// // // // // //     try {
// // // // // //       setUploading(true);
// // // // // //       await uploadAssetPhoto(id, newPhoto);
// // // // // //       const photos = await getAssetPhotos(id);
// // // // // //       setAssetPhotos(photos);
// // // // // //       setNewPhoto(null);
// // // // // //     } catch (err) {
// // // // // //       console.error("Photo upload failed:", err);
// // // // // //     } finally {
// // // // // //       setUploading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Loading UI
// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="flex justify-center items-center h-screen bg-gray-50">
// // // // // //         <FaSpinner className="text-4xl text-blue-500 animate-spin" />
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   // Not Found
// // // // // //   if (!asset) {
// // // // // //     return (
// // // // // //       <div className="text-center py-10 text-red-500 font-semibold text-lg bg-gray-50">
// // // // // //         Asset not found.
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     // <div className="lg:ml-40 pt-16">
// // // // // //     <div className="lg:ml-48 bg-gray-50 min-h-screen">
// // // // // //       {/* Asset Details */}
// // // // // //       <AssetDetails asset={asset} assetPhotos={assetPhotos} />

// // // // // //       {/* Tabs */}
// // // // // //       <div className="flex gap-3 mt-6 border-b pb-3 overflow-x-auto">
// // // // // //         {["details", "history", "documents", "photos", "childAssets"].map(
// // // // // //           (tab) => (
// // // // // //             <button
// // // // // //               key={tab}
// // // // // //               onClick={() => handleTabChange(tab)}
// // // // // //               className={`px-4 py-2 text-sm rounded-md capitalize whitespace-nowrap transition-all duration-300 ${
// // // // // //                 selectedTab === tab
// // // // // //                   ? "bg-blue-600 text-white shadow-lg"
// // // // // //                   : "bg-gray-100 text-gray-700 hover:bg-blue-100"
// // // // // //               }`}
// // // // // //             >
// // // // // //               {tab}
// // // // // //             </button>
// // // // // //           )
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Tab Content */}
// // // // // //       <div className="mt-6 space-y-6">
// // // // // //         {/* Details */}
// // // // // //         {selectedTab === "details" && (
// // // // // //           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
// // // // // //             <h2 className="text-xl font-semibold text-gray-700 mb-4">
// // // // // //               Basic Information
// // // // // //             </h2>
// // // // // //             <div className="grid md:grid-cols-2 gap-4 text-sm">
// // // // // //               <p>
// // // // // //                 <strong>Name:</strong> {asset.name || "N/A"}
// // // // // //               </p>
// // // // // //               <p>
// // // // // //                 <strong>Description:</strong> {asset.description || "N/A"}
// // // // // //               </p>
// // // // // //               <p>
// // // // // //                 <strong>Asset Tag:</strong> {asset.assetTag || id}
// // // // // //               </p>
// // // // // //               <p>
// // // // // //                 <strong>Status:</strong> {asset.status}
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* History */}
// // // // // //         {selectedTab === "history" && (
// // // // // //           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
// // // // // //             <h2 className="text-lg font-semibold mb-4 text-blue-700">
// // // // // //               Asset History
// // // // // //             </h2>
// // // // // //             {assetHistory.length > 0 ? (
// // // // // //               <div className="overflow-x-auto">
// // // // // //                 <table className="w-full text-sm text-left border border-gray-200">
// // // // // //                   <thead className="bg-blue-50">
// // // // // //                     <tr>
// // // // // //                       {["Field", "Old", "New", "Modified By", "Timestamp"].map(
// // // // // //                         (head) => (
// // // // // //                           <th key={head} className="p-2 border">
// // // // // //                             {head}
// // // // // //                           </th>
// // // // // //                         )
// // // // // //                       )}
// // // // // //                     </tr>
// // // // // //                   </thead>
// // // // // //                   <tbody>
// // // // // //                     {assetHistory.map((h, index) => (
// // // // // //                       <tr
// // // // // //                         key={index}
// // // // // //                         className="border-t hover:bg-gray-50 transition"
// // // // // //                       >
// // // // // //                         <td className="p-2 border">{h.changedAttribute}</td>
// // // // // //                         <td className="p-2 border">{h.oldValue}</td>
// // // // // //                         <td className="p-2 border font-semibold text-blue-700">
// // // // // //                           {h.newValue}
// // // // // //                         </td>
// // // // // //                         <td className="p-2 border">{h.modifiedBy}</td>
// // // // // //                         <td className="p-2 border">
// // // // // //                           {new Date(h.modifiedAt).toLocaleString()}
// // // // // //                         </td>
// // // // // //                       </tr>
// // // // // //                     ))}
// // // // // //                   </tbody>
// // // // // //                 </table>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <p className="text-gray-500">No history available.</p>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Documents */}
// // // // // //         {selectedTab === "documents" && (
// // // // // //           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
// // // // // //             <h2 className="text-lg font-semibold text-blue-700 mb-4">
// // // // // //               Asset Documents
// // // // // //             </h2>
// // // // // //             {assetDocuments.length > 0 ? (
// // // // // //               <ul className="list-disc pl-6 space-y-2 text-sm">
// // // // // //                 {assetDocuments.map((doc, index) => (
// // // // // //                   <li
// // // // // //                     key={index}
// // // // // //                     className="flex flex-wrap items-center space-x-2"
// // // // // //                   >
// // // // // //                     <FaFileAlt className="text-gray-500" />
// // // // // //                     <a
// // // // // //                       href={doc.documentUrl}
// // // // // //                       target="_blank"
// // // // // //                       rel="noopener noreferrer"
// // // // // //                       className="text-blue-600 underline break-all"
// // // // // //                     >
// // // // // //                       {doc.documentUrl.split("/").pop()}
// // // // // //                     </a>
// // // // // //                     <span className="text-gray-500 ml-2 text-xs">
// // // // // //                       — Added by {doc.addedBy} on{" "}
// // // // // //                       {new Date(doc.addedAt).toLocaleDateString()}
// // // // // //                     </span>
// // // // // //                   </li>
// // // // // //                 ))}
// // // // // //               </ul>
// // // // // //             ) : (
// // // // // //               <p className="text-gray-500">No documents uploaded yet.</p>
// // // // // //             )}

// // // // // //             {/* Upload Section */}
// // // // // //             <div className="mt-6 space-y-2">
// // // // // //               <input
// // // // // //                 type="file"
// // // // // //                 multiple
// // // // // //                 onChange={handleDocumentChange}
// // // // // //                 className="block w-full border border-gray-300 rounded p-2"
// // // // // //               />
// // // // // //               {newDocuments.length > 0 && (
// // // // // //                 <button
// // // // // //                   onClick={handleUploadDocuments}
// // // // // //                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // // // //                   disabled={uploading}
// // // // // //                 >
// // // // // //                   {uploading ? "Uploading..." : "Upload"}
// // // // // //                 </button>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Child Assets */}
// // // // // //         {selectedTab === "childAssets" && (
// // // // // //           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
// // // // // //             <h2 className="text-lg font-semibold mb-4 text-blue-700">
// // // // // //               Child Assets
// // // // // //             </h2>
// // // // // //             {childAssets.length > 0 ? (
// // // // // //               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
// // // // // //                 {childAssets.map((child, index) => (
// // // // // //                   <div
// // // // // //                     key={index}
// // // // // //                     className="border rounded-xl shadow-sm p-4 bg-gray-50 hover:shadow-md transition"
// // // // // //                   >
// // // // // //                     <h3 className="text-md font-bold text-blue-600 mb-2">
// // // // // //                       {child.name}
// // // // // //                     </h3>
// // // // // //                     <p>
// // // // // //                       <span className="font-semibold">Warranty:</span>{" "}
// // // // // //                       {child.warranty}
// // // // // //                     </p>
// // // // // //                     <p>
// // // // // //                       <span className="font-semibold">Purchase From:</span>{" "}
// // // // // //                       {child.purchaseFrom}
// // // // // //                     </p>
// // // // // //                     <p>
// // // // // //                       <span className="font-semibold">Note:</span>{" "}
// // // // // //                       {child.childAssetNote}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <p className="text-gray-500">No child assets available.</p>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Photos */}
// // // // // //         {selectedTab === "photos" && (
// // // // // //           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
// // // // // //             <h2 className="text-lg font-semibold text-blue-700 mb-4">
// // // // // //               Asset Photos
// // // // // //             </h2>
// // // // // //             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
// // // // // //               {assetPhotos.length > 0 ? (
// // // // // //                 assetPhotos.map((photo, index) => (
// // // // // //                   <img
// // // // // //                     key={index}
// // // // // //                     src={photo}
// // // // // //                     alt={`Photo ${index + 1} of ${asset.name}`}
// // // // // //                     className="rounded-lg object-cover w-full h-32 border shadow-sm hover:shadow-md transition"
// // // // // //                   />
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <p className="text-gray-500 col-span-full">
// // // // // //                   No photos uploaded yet.
// // // // // //                 </p>
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* Upload Photo */}
// // // // // //             <div className="mt-6">
// // // // // //               <label
// // // // // //                 htmlFor="photoUpload"
// // // // // //                 className="flex items-center space-x-2 cursor-pointer w-fit text-blue-600 hover:underline"
// // // // // //               >
// // // // // //                 <FaCamera />
// // // // // //                 <span>Choose Photo</span>
// // // // // //               </label>
// // // // // //               <input
// // // // // //                 id="photoUpload"
// // // // // //                 type="file"
// // // // // //                 onChange={handlePhotoChange}
// // // // // //                 className="hidden"
// // // // // //               />
// // // // // //               {newPhoto && (
// // // // // //                 <div className="flex items-center mt-4 space-x-4">
// // // // // //                   <img
// // // // // //                     src={URL.createObjectURL(newPhoto)}
// // // // // //                     alt="Preview"
// // // // // //                     className="w-20 h-20 object-cover rounded-lg border shadow"
// // // // // //                   />
// // // // // //                   <button
// // // // // //                     onClick={handleUploadPhoto}
// // // // // //                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // // // //                     disabled={uploading}
// // // // // //                   >
// // // // // //                     {uploading ? "Uploading..." : "Upload"}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default SingleAsset;



// // // // // import AssetDetails from "./AssetDetails";
// // // // // import {
// // // // //   getAssetByAssetTag,
// // // // //   getAssetHistory,
// // // // //   getAssetPhotos,
// // // // //   uploadAssetPhoto,
// // // // //   getAssetDocuments,
// // // // //   uploadAssetDocuments,
// // // // //   getChildAssetsByParent,
// // // // //   getAllAssets,
// // // // // } from "../services/api";
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { FaSpinner, FaCamera, FaFileAlt, FaChevronRight, FaChevronLeft, FaDownload } from "react-icons/fa";
// // // // // import { useParams } from "react-router-dom";

// // // // // const SingleAsset = () => {
// // // // //   const { id } = useParams();

// // // // //   const [asset, setAsset] = useState(null);
// // // // //   const [allAssets, setAllAssets] = useState([]);
// // // // //   const [currentIndex, setCurrentIndex] = useState(-1);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [uploading, setUploading] = useState(false);

// // // // //   const [selectedTab, setSelectedTab] = useState("details");

// // // // //   const [assetPhotos, setAssetPhotos] = useState([]);
// // // // //   const [assetHistory, setAssetHistory] = useState([]);
// // // // //   const [assetDocuments, setAssetDocuments] = useState([]);

// // // // //   const [historyFetched, setHistoryFetched] = useState(false);
// // // // //   const [docFetched, setDocFetched] = useState(false);

// // // // //   const [newPhoto, setNewPhoto] = useState(null);
// // // // //   const [newDocuments, setNewDocuments] = useState([]);

// // // // //   const [childAssets, setChildAssets] = useState([]);
// // // // //   const [childrenFetched, setChildrenFetched] = useState(false);

// // // // //   // Fetch all assets for navigation
// // // // //   useEffect(() => {
// // // // //     const fetchAllAssets = async () => {
// // // // //       try {
// // // // //         const assets = await getAllAssets();
// // // // //         setAllAssets(assets);
// // // // //         const index = assets.findIndex(a => a.assetTag === id);
// // // // //         setCurrentIndex(index);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching all assets:", error);
// // // // //       }
// // // // //     };
// // // // //     fetchAllAssets();
// // // // //   }, [id]);

// // // // //   // Initial Data Fetch
// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         const [assetData, photoData, docData] = await Promise.all([
// // // // //           getAssetByAssetTag(id),
// // // // //           getAssetPhotos(id),
// // // // //           getAssetDocuments(id),
// // // // //         ]);
// // // // //         setAsset(assetData);
// // // // //         setAssetPhotos(photoData || []);
// // // // //         setAssetDocuments(docData || []);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching asset:", error);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     if (id) fetchData();
// // // // //   }, [id]);

// // // // //   // Navigation handlers
// // // // //   const handlePrevious = () => {
// // // // //     if (currentIndex > 0) {
// // // // //       const prevAsset = allAssets[currentIndex - 1];
// // // // //       window.location.href = `/assets/${prevAsset.assetTag}`;
// // // // //     }
// // // // //   };

// // // // //   const handleNext = () => {
// // // // //     if (currentIndex < allAssets.length - 1) {
// // // // //       const nextAsset = allAssets[currentIndex + 1];
// // // // //       window.location.href = `/assets/${nextAsset.assetTag}`;
// // // // //     }
// // // // //   };

// // // // //   // Fetch on tab change
// // // // //   const fetchAssetHistory = async () => {
// // // // //     if (!historyFetched) {
// // // // //       try {
// // // // //         const res = await getAssetHistory(id);
// // // // //         setAssetHistory(res);
// // // // //         setHistoryFetched(true);
// // // // //       } catch (err) {
// // // // //         console.error(err);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const fetchChildAssets = async () => {
// // // // //     if (!childrenFetched) {
// // // // //       try {
// // // // //         const res = await getChildAssetsByParent(id);
// // // // //         setChildAssets(res);
// // // // //         setChildrenFetched(true);
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching child assets", err);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const fetchAssetDocuments = async () => {
// // // // //     if (!docFetched) {
// // // // //       try {
// // // // //         const res = await getAssetDocuments(id);
// // // // //         setAssetDocuments(res);
// // // // //         setDocFetched(true);
// // // // //       } catch (err) {
// // // // //         console.error(err);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleTabChange = (tab) => {
// // // // //     setSelectedTab(tab);
// // // // //     if (tab === "history") fetchAssetHistory();
// // // // //     if (tab === "documents") fetchAssetDocuments();
// // // // //     if (tab === "childAssets") fetchChildAssets();
// // // // //   };

// // // // //   const handleDocumentChange = (e) =>
// // // // //     setNewDocuments(Array.from(e.target.files));

// // // // //   const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

// // // // //   const handleUploadDocuments = async () => {
// // // // //     if (newDocuments.length === 0) return;
// // // // //     try {
// // // // //       setUploading(true);
// // // // //       const formData = new FormData();
// // // // //       newDocuments.forEach((file) => formData.append("files", file));
// // // // //       await uploadAssetDocuments(id, formData);
// // // // //       const docs = await getAssetDocuments(id);
// // // // //       setAssetDocuments(docs);
// // // // //       setNewDocuments([]);
// // // // //       toast.success("Documents uploaded successfully!");
// // // // //     } catch (err) {
// // // // //       console.error("Upload failed:", err);
// // // // //       toast.error("Upload failed");
// // // // //     } finally {
// // // // //       setUploading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleUploadPhoto = async () => {
// // // // //     if (!newPhoto) return;
// // // // //     try {
// // // // //       setUploading(true);
// // // // //       await uploadAssetPhoto(id, newPhoto);
// // // // //       const photos = await getAssetPhotos(id);
// // // // //       setAssetPhotos(photos);
// // // // //       setNewPhoto(null);
// // // // //       toast.success("Photo uploaded successfully!");
// // // // //     } catch (err) {
// // // // //       console.error("Photo upload failed:", err);
// // // // //       toast.error("Photo upload failed");
// // // // //     } finally {
// // // // //       setUploading(false);
// // // // //     }
// // // // //   };

// // // // //   // Loading UI
// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // // //         <div className="text-center">
// // // // //           <FaSpinner className="text-5xl text-blue-500 animate-spin mx-auto mb-4" />
// // // // //           <p className="text-gray-600">Loading asset details...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // Not Found
// // // // //   if (!asset) {
// // // // //     return (
// // // // //       <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// // // // //         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
// // // // //           <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // //           </svg>
// // // // //           <h2 className="text-2xl font-bold text-gray-800 mb-2">Asset Not Found</h2>
// // // // //           <p className="text-gray-600">The asset you're looking for doesn't exist or has been removed.</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     // <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

// // // // //     <div className="lg:ml-48 bg-gray-50 min-h-screen">
// // // // //       <div className="container mx-auto px-4 py-6 lg:px-8">
// // // // //         {/* Asset Details Component */}
// // // // //         <AssetDetails 
// // // // //           asset={asset} 
// // // // //           assetPhotos={assetPhotos} 
// // // // //           onPrevious={handlePrevious}
// // // // //           onNext={handleNext}
// // // // //           hasPrevious={currentIndex > 0}
// // // // //           hasNext={currentIndex < allAssets.length - 1 && currentIndex !== -1}
// // // // //         />

// // // // //         {/* Modern Tabs */}
// // // // //         <div className="mt-8">
// // // // //           <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2">
// // // // //             {["details", "history", "documents", "photos", "childAssets"].map((tab) => (
// // // // //               <button
// // // // //                 key={tab}
// // // // //                 onClick={() => handleTabChange(tab)}
// // // // //                 className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 capitalize ${
// // // // //                   selectedTab === tab
// // // // //                     ? "bg-blue-600 text-white shadow-lg"
// // // // //                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// // // // //                 }`}
// // // // //               >
// // // // //                 {tab === "childAssets" ? "Child Assets" : tab}
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* Tab Content */}
// // // // //           <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg p-6">
// // // // //             {/* Details Tab */}
// // // // //             {selectedTab === "details" && (
// // // // //               <div className="animate-fadeIn">
// // // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // // //                   Basic Information
// // // // //                 </h2>
// // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // //                   <div className="space-y-3">
// // // // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // // // //                       <span className="w-32 font-semibold text-gray-600">Name:</span>
// // // // //                       <span className="text-gray-800">{asset.name || "N/A"}</span>
// // // // //                     </div>
// // // // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // // // //                       <span className="w-32 font-semibold text-gray-600">Asset Tag:</span>
// // // // //                       <span className="text-gray-800 font-mono">{asset.assetTag || id}</span>
// // // // //                     </div>
// // // // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // // // //                       <span className="w-32 font-semibold text-gray-600">Status:</span>
// // // // //                       <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
// // // // //                         asset.status === "AVAILABLE" ? "bg-green-100 text-green-700" :
// // // // //                         asset.status === "ASSIGNED" ? "bg-blue-100 text-blue-700" :
// // // // //                         asset.status === "IN_REPAIR" ? "bg-yellow-100 text-yellow-700" :
// // // // //                         "bg-gray-100 text-gray-700"
// // // // //                       }`}>
// // // // //                         {asset.status}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="space-y-3">
// // // // //                     <div className="flex items-start py-2 border-b border-gray-100">
// // // // //                       <span className="w-32 font-semibold text-gray-600">Description:</span>
// // // // //                       <span className="text-gray-800 flex-1">{asset.description || "N/A"}</span>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* History Tab */}
// // // // //             {selectedTab === "history" && (
// // // // //               <div className="animate-fadeIn">
// // // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // // //                   Asset History Timeline
// // // // //                 </h2>
// // // // //                 {assetHistory.length > 0 ? (
// // // // //                   <div className="overflow-x-auto">
// // // // //                     <table className="w-full text-sm">
// // // // //                       <thead>
// // // // //                         <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
// // // // //                           {["Field", "Old Value", "New Value", "Modified By", "Timestamp"].map((head) => (
// // // // //                             <th key={head} className="p-3 text-left font-semibold text-gray-700">
// // // // //                               {head}
// // // // //                             </th>
// // // // //                           ))}
// // // // //                         </tr>
// // // // //                       </thead>
// // // // //                       <tbody>
// // // // //                         {assetHistory.map((h, index) => (
// // // // //                           <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// // // // //                             <td className="p-3 text-gray-600">{h.changedAttribute}</td>
// // // // //                             <td className="p-3 text-gray-500">{h.oldValue || "-"}</td>
// // // // //                             <td className="p-3 font-medium text-blue-600">{h.newValue}</td>
// // // // //                             <td className="p-3 text-gray-600">{h.modifiedBy}</td>
// // // // //                             <td className="p-3 text-gray-500">{new Date(h.modifiedAt).toLocaleString()}</td>
// // // // //                           </tr>
// // // // //                         ))}
// // // // //                       </tbody>
// // // // //                     </table>
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="text-center py-12 text-gray-500">
// // // // //                     No history records found for this asset.
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Documents Tab */}
// // // // //             {selectedTab === "documents" && (
// // // // //               <div className="animate-fadeIn">
// // // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // // //                   Asset Documents
// // // // //                 </h2>
// // // // //                 {assetDocuments.length > 0 ? (
// // // // //                   <div className="space-y-3 mb-6">
// // // // //                     {assetDocuments.map((doc, index) => (
// // // // //                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// // // // //                         <div className="flex items-center gap-3">
// // // // //                           <FaFileAlt className="text-blue-500" />
// // // // //                           <span className="text-gray-700">
// // // // //                             {doc.documentUrl.split("/").pop()}
// // // // //                           </span>
// // // // //                           <span className="text-xs text-gray-400">
// // // // //                             Added by {doc.addedBy} on {new Date(doc.addedAt).toLocaleDateString()}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                         <a
// // // // //                           href={doc.documentUrl}
// // // // //                           target="_blank"
// // // // //                           rel="noopener noreferrer"
// // // // //                           className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
// // // // //                         >
// // // // //                           <FaDownload size={14} /> Download
// // // // //                         </a>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="text-center py-8 text-gray-500 mb-4">
// // // // //                     No documents uploaded yet.
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Upload Section */}
// // // // //                 <div className="mt-6 pt-6 border-t border-gray-200">
// // // // //                   <h3 className="font-semibold text-gray-700 mb-3">Upload New Documents</h3>
// // // // //                   <div className="flex flex-wrap gap-3 items-center">
// // // // //                     <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
// // // // //                       Choose Files
// // // // //                       <input
// // // // //                         type="file"
// // // // //                         multiple
// // // // //                         onChange={handleDocumentChange}
// // // // //                         className="hidden"
// // // // //                       />
// // // // //                     </label>
// // // // //                     {newDocuments.length > 0 && (
// // // // //                       <>
// // // // //                         <span className="text-sm text-gray-600">{newDocuments.length} file(s) selected</span>
// // // // //                         <button
// // // // //                           onClick={handleUploadDocuments}
// // // // //                           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
// // // // //                           disabled={uploading}
// // // // //                         >
// // // // //                           {uploading ? "Uploading..." : "Upload Documents"}
// // // // //                         </button>
// // // // //                       </>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Child Assets Tab */}
// // // // //             {selectedTab === "childAssets" && (
// // // // //               <div className="animate-fadeIn">
// // // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // // //                   Child Assets
// // // // //                 </h2>
// // // // //                 {childAssets.length > 0 ? (
// // // // //                   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
// // // // //                     {childAssets.map((child, index) => (
// // // // //                       <div
// // // // //                         key={index}
// // // // //                         className="border rounded-xl shadow-sm p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
// // // // //                       >
// // // // //                         <h3 className="text-lg font-bold text-blue-600 mb-3">{child.name}</h3>
// // // // //                         <div className="space-y-2 text-sm">
// // // // //                           <p><span className="font-semibold text-gray-600">Warranty:</span> <span className="text-gray-700">{child.warranty || "N/A"}</span></p>
// // // // //                           <p><span className="font-semibold text-gray-600">Purchase From:</span> <span className="text-gray-700">{child.purchaseFrom || "N/A"}</span></p>
// // // // //                           <p><span className="font-semibold text-gray-600">Note:</span> <span className="text-gray-700">{child.childAssetNote || "N/A"}</span></p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="text-center py-12 text-gray-500">
// // // // //                     No child assets associated with this asset.
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Photos Tab */}
// // // // //             {selectedTab === "photos" && (
// // // // //               <div className="animate-fadeIn">
// // // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // // //                   Asset Gallery
// // // // //                 </h2>
// // // // //                 {assetPhotos.length > 0 ? (
// // // // //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
// // // // //                     {assetPhotos.map((photo, index) => (
// // // // //                       <div key={index} className="group relative overflow-hidden rounded-lg shadow-md">
// // // // //                         <img
// // // // //                           src={photo}
// // // // //                           alt={`Photo ${index + 1} of ${asset.name}`}
// // // // //                           className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
// // // // //                         />
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="text-center py-8 text-gray-500 mb-4">
// // // // //                     No photos uploaded yet.
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Upload Photo */}
// // // // //                 <div className="mt-6 pt-6 border-t border-gray-200">
// // // // //                   <h3 className="font-semibold text-gray-700 mb-3">Upload New Photo</h3>
// // // // //                   <div className="flex flex-wrap gap-3 items-center">
// // // // //                     <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2">
// // // // //                       <FaCamera />
// // // // //                       Choose Photo
// // // // //                       <input
// // // // //                         id="photoUpload"
// // // // //                         type="file"
// // // // //                         onChange={handlePhotoChange}
// // // // //                         className="hidden"
// // // // //                       />
// // // // //                     </label>
// // // // //                     {newPhoto && (
// // // // //                       <>
// // // // //                         <img
// // // // //                           src={URL.createObjectURL(newPhoto)}
// // // // //                           alt="Preview"
// // // // //                           className="w-16 h-16 object-cover rounded-lg border shadow"
// // // // //                         />
// // // // //                         <button
// // // // //                           onClick={handleUploadPhoto}
// // // // //                           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
// // // // //                           disabled={uploading}
// // // // //                         >
// // // // //                           {uploading ? "Uploading..." : "Upload Photo"}
// // // // //                         </button>
// // // // //                       </>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Animation styles */}
// // // // //       <style jsx>{`
// // // // //         @keyframes fadeIn {
// // // // //           from { opacity: 0; transform: translateY(10px); }
// // // // //           to { opacity: 1; transform: translateY(0); }
// // // // //         }
// // // // //         .animate-fadeIn {
// // // // //           animation: fadeIn 0.3s ease-out;
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SingleAsset;


// // // // import AssetDetails from "./AssetDetails";
// // // // import {
// // // //   getAssetByAssetTag,
// // // //   getAssetHistory,
// // // //   getAssetPhotos,
// // // //   uploadAssetPhoto,
// // // //   getAssetDocuments,
// // // //   uploadAssetDocuments,
// // // //   getChildAssetsByParent,
// // // //   getAllAssets,
// // // // } from "../services/api";
// // // // import React, { useEffect, useState } from "react";
// // // // import { FaSpinner, FaCamera, FaFileAlt, FaDownload } from "react-icons/fa";
// // // // import { useParams } from "react-router-dom";
// // // // import { toast } from "react-toastify";

// // // // const SingleAsset = () => {
// // // //   const { id } = useParams();

// // // //   const [asset, setAsset] = useState(null);
// // // //   const [allAssets, setAllAssets] = useState([]);
// // // //   const [currentIndex, setCurrentIndex] = useState(-1);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [uploading, setUploading] = useState(false);

// // // //   const [selectedTab, setSelectedTab] = useState("details");

// // // //   const [assetPhotos, setAssetPhotos] = useState([]);
// // // //   const [assetHistory, setAssetHistory] = useState([]);
// // // //   const [assetDocuments, setAssetDocuments] = useState([]);

// // // //   const [historyFetched, setHistoryFetched] = useState(false);
// // // //   const [docFetched, setDocFetched] = useState(false);

// // // //   const [newPhoto, setNewPhoto] = useState(null);
// // // //   const [newDocuments, setNewDocuments] = useState([]);

// // // //   const [childAssets, setChildAssets] = useState([]);
// // // //   const [childrenFetched, setChildrenFetched] = useState(false);

// // // //   // Fetch all assets for navigation
// // // //   useEffect(() => {
// // // //     const fetchAllAssets = async () => {
// // // //       try {
// // // //         const assets = await getAllAssets();
// // // //         setAllAssets(assets);
// // // //         const index = assets.findIndex(a => a.assetTag === id);
// // // //         setCurrentIndex(index);
// // // //       } catch (error) {
// // // //         console.error("Error fetching all assets:", error);
// // // //       }
// // // //     };
// // // //     fetchAllAssets();
// // // //   }, [id]);

// // // //   // Initial Data Fetch
// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const [assetData, photoData, docData] = await Promise.all([
// // // //           getAssetByAssetTag(id),
// // // //           getAssetPhotos(id),
// // // //           getAssetDocuments(id),
// // // //         ]);
// // // //         setAsset(assetData);
// // // //         setAssetPhotos(photoData || []);
// // // //         setAssetDocuments(docData || []);
// // // //       } catch (error) {
// // // //         console.error("Error fetching asset:", error);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     if (id) fetchData();
// // // //   }, [id]);

// // // //   // Navigation handlers
// // // //   const handlePrevious = () => {
// // // //     if (currentIndex > 0) {
// // // //       const prevAsset = allAssets[currentIndex - 1];
// // // //       window.location.href = `/assets/${prevAsset.assetTag}`;
// // // //     }
// // // //   };

// // // //   const handleNext = () => {
// // // //     if (currentIndex < allAssets.length - 1) {
// // // //       const nextAsset = allAssets[currentIndex + 1];
// // // //       window.location.href = `/assets/${nextAsset.assetTag}`;
// // // //     }
// // // //   };

// // // //   // Fetch on tab change
// // // //   const fetchAssetHistory = async () => {
// // // //     if (!historyFetched) {
// // // //       try {
// // // //         const res = await getAssetHistory(id);
// // // //         setAssetHistory(res);
// // // //         setHistoryFetched(true);
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //       }
// // // //     }
// // // //   };

// // // //   const fetchChildAssets = async () => {
// // // //     if (!childrenFetched) {
// // // //       try {
// // // //         const res = await getChildAssetsByParent(id);
// // // //         setChildAssets(res);
// // // //         setChildrenFetched(true);
// // // //       } catch (err) {
// // // //         console.error("Error fetching child assets", err);
// // // //       }
// // // //     }
// // // //   };

// // // //   const fetchAssetDocuments = async () => {
// // // //     if (!docFetched) {
// // // //       try {
// // // //         const res = await getAssetDocuments(id);
// // // //         setAssetDocuments(res);
// // // //         setDocFetched(true);
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleTabChange = (tab) => {
// // // //     setSelectedTab(tab);
// // // //     if (tab === "history") fetchAssetHistory();
// // // //     if (tab === "documents") fetchAssetDocuments();
// // // //     if (tab === "childAssets") fetchChildAssets();
// // // //   };

// // // //   const handleDocumentChange = (e) =>
// // // //     setNewDocuments(Array.from(e.target.files));

// // // //   const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

// // // //   const handleUploadDocuments = async () => {
// // // //     if (newDocuments.length === 0) return;
// // // //     try {
// // // //       setUploading(true);
// // // //       const formData = new FormData();
// // // //       newDocuments.forEach((file) => formData.append("files", file));
// // // //       await uploadAssetDocuments(id, formData);
// // // //       const docs = await getAssetDocuments(id);
// // // //       setAssetDocuments(docs);
// // // //       setNewDocuments([]);
// // // //       toast.success("Documents uploaded successfully!");
// // // //     } catch (err) {
// // // //       console.error("Upload failed:", err);
// // // //       toast.error("Upload failed");
// // // //     } finally {
// // // //       setUploading(false);
// // // //     }
// // // //   };

// // // //   const handleUploadPhoto = async () => {
// // // //     if (!newPhoto) return;
// // // //     try {
// // // //       setUploading(true);
// // // //       await uploadAssetPhoto(id, newPhoto);
// // // //       const photos = await getAssetPhotos(id);
// // // //       setAssetPhotos(photos);
// // // //       setNewPhoto(null);
// // // //       toast.success("Photo uploaded successfully!");
// // // //     } catch (err) {
// // // //       console.error("Photo upload failed:", err);
// // // //       toast.error("Photo upload failed");
// // // //     } finally {
// // // //       setUploading(false);
// // // //     }
// // // //   };

// // // //   // Loading UI
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="text-center">
// // // //           <FaSpinner className="text-5xl text-blue-500 animate-spin mx-auto mb-4" />
// // // //           <p className="text-gray-600">Loading asset details...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Not Found
// // // //   if (!asset) {
// // // //     return (
// // // //       <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// // // //         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
// // // //           <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //           </svg>
// // // //           <h2 className="text-2xl font-bold text-gray-800 mb-2">Asset Not Found</h2>
// // // //           <p className="text-gray-600">The asset you're looking for doesn't exist or has been removed.</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     // <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

// // // //     <div className="lg:ml-48 bg-gray-50 min-h-screen">
// // // //       <div className="px-4 py-6 lg:px-8">
// // // //         {/* Asset Details Component */}
// // // //         <AssetDetails 
// // // //           asset={asset} 
// // // //           assetPhotos={assetPhotos} 
// // // //           onPrevious={handlePrevious}
// // // //           onNext={handleNext}
// // // //           hasPrevious={currentIndex > 0}
// // // //           hasNext={currentIndex < allAssets.length - 1 && currentIndex !== -1}
// // // //         />

// // // //         {/* Modern Tabs */}
// // // //         <div className="mt-8">
// // // //           <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2">
// // // //             {["details", "history", "documents", "photos", "childAssets"].map((tab) => (
// // // //               <button
// // // //                 key={tab}
// // // //                 onClick={() => handleTabChange(tab)}
// // // //                 className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 capitalize ${
// // // //                   selectedTab === tab
// // // //                     ? "bg-blue-600 text-white shadow-lg"
// // // //                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// // // //                 }`}
// // // //               >
// // // //                 {tab === "childAssets" ? "Child Assets" : tab}
// // // //               </button>
// // // //             ))}
// // // //           </div>

// // // //           {/* Tab Content */}
// // // //           <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg p-6">
// // // //             {/* Details Tab */}
// // // //             {selectedTab === "details" && (
// // // //               <div className="animate-fadeIn">
// // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // //                   Basic Information
// // // //                 </h2>
// // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // //                   <div className="space-y-3">
// // // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // // //                       <span className="w-32 font-semibold text-gray-600">Name:</span>
// // // //                       <span className="text-gray-800">{asset.name || "N/A"}</span>
// // // //                     </div>
// // // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // // //                       <span className="w-32 font-semibold text-gray-600">Asset Tag:</span>
// // // //                       <span className="text-gray-800 font-mono">{asset.assetTag || id}</span>
// // // //                     </div>
// // // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // // //                       <span className="w-32 font-semibold text-gray-600">Status:</span>
// // // //                       <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
// // // //                         asset.status === "AVAILABLE" ? "bg-green-100 text-green-700" :
// // // //                         asset.status === "ASSIGNED" ? "bg-blue-100 text-blue-700" :
// // // //                         asset.status === "IN_REPAIR" ? "bg-yellow-100 text-yellow-700" :
// // // //                         "bg-gray-100 text-gray-700"
// // // //                       }`}>
// // // //                         {asset.status}
// // // //                       </span>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="space-y-3">
// // // //                     <div className="flex items-start py-2 border-b border-gray-100">
// // // //                       <span className="w-32 font-semibold text-gray-600">Description:</span>
// // // //                       <span className="text-gray-800 flex-1">{asset.description || "N/A"}</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* History Tab */}
// // // //             {selectedTab === "history" && (
// // // //               <div className="animate-fadeIn">
// // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // //                   Asset History Timeline
// // // //                 </h2>
// // // //                 {assetHistory.length > 0 ? (
// // // //                   <div className="overflow-x-auto">
// // // //                     <table className="w-full text-sm">
// // // //                       <thead>
// // // //                         <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
// // // //                           {["Field", "Old Value", "New Value", "Modified By", "Timestamp"].map((head) => (
// // // //                             <th key={head} className="p-3 text-left font-semibold text-gray-700">
// // // //                               {head}
// // // //                             </th>
// // // //                           ))}
// // // //                         </tr>
// // // //                       </thead>
// // // //                       <tbody>
// // // //                         {assetHistory.map((h, index) => (
// // // //                           <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// // // //                             <td className="p-3 text-gray-600">{h.changedAttribute}</td>
// // // //                             <td className="p-3 text-gray-500">{h.oldValue || "-"}</td>
// // // //                             <td className="p-3 font-medium text-blue-600">{h.newValue}</td>
// // // //                             <td className="p-3 text-gray-600">{h.modifiedBy}</td>
// // // //                             <td className="p-3 text-gray-500">{new Date(h.modifiedAt).toLocaleString()}</td>
// // // //                           </tr>
// // // //                         ))}
// // // //                       </tbody>
// // // //                     </table>
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="text-center py-12 text-gray-500">
// // // //                     No history records found for this asset.
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}

// // // //             {/* Documents Tab */}
// // // //             {selectedTab === "documents" && (
// // // //               <div className="animate-fadeIn">
// // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // //                   Asset Documents
// // // //                 </h2>
// // // //                 {assetDocuments.length > 0 ? (
// // // //                   <div className="space-y-3 mb-6">
// // // //                     {assetDocuments.map((doc, index) => (
// // // //                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// // // //                         <div className="flex items-center gap-3">
// // // //                           <FaFileAlt className="text-blue-500" />
// // // //                           <span className="text-gray-700">
// // // //                             {doc.documentUrl.split("/").pop()}
// // // //                           </span>
// // // //                           <span className="text-xs text-gray-400">
// // // //                             Added by {doc.addedBy} on {new Date(doc.addedAt).toLocaleDateString()}
// // // //                           </span>
// // // //                         </div>
// // // //                         <a
// // // //                           href={doc.documentUrl}
// // // //                           target="_blank"
// // // //                           rel="noopener noreferrer"
// // // //                           className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
// // // //                         >
// // // //                           <FaDownload size={14} /> Download
// // // //                         </a>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="text-center py-8 text-gray-500 mb-4">
// // // //                     No documents uploaded yet.
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Upload Section */}
// // // //                 <div className="mt-6 pt-6 border-t border-gray-200">
// // // //                   <h3 className="font-semibold text-gray-700 mb-3">Upload New Documents</h3>
// // // //                   <div className="flex flex-wrap gap-3 items-center">
// // // //                     <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
// // // //                       Choose Files
// // // //                       <input
// // // //                         type="file"
// // // //                         multiple
// // // //                         onChange={handleDocumentChange}
// // // //                         className="hidden"
// // // //                       />
// // // //                     </label>
// // // //                     {newDocuments.length > 0 && (
// // // //                       <>
// // // //                         <span className="text-sm text-gray-600">{newDocuments.length} file(s) selected</span>
// // // //                         <button
// // // //                           onClick={handleUploadDocuments}
// // // //                           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
// // // //                           disabled={uploading}
// // // //                         >
// // // //                           {uploading ? "Uploading..." : "Upload Documents"}
// // // //                         </button>
// // // //                       </>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Child Assets Tab */}
// // // //             {selectedTab === "childAssets" && (
// // // //               <div className="animate-fadeIn">
// // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // //                   Child Assets
// // // //                 </h2>
// // // //                 {childAssets.length > 0 ? (
// // // //                   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
// // // //                     {childAssets.map((child, index) => (
// // // //                       <div
// // // //                         key={index}
// // // //                         className="border rounded-xl shadow-sm p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
// // // //                       >
// // // //                         <h3 className="text-lg font-bold text-blue-600 mb-3">{child.name}</h3>
// // // //                         <div className="space-y-2 text-sm">
// // // //                           <p><span className="font-semibold text-gray-600">Warranty:</span> <span className="text-gray-700">{child.warranty || "N/A"}</span></p>
// // // //                           <p><span className="font-semibold text-gray-600">Purchase From:</span> <span className="text-gray-700">{child.purchaseFrom || "N/A"}</span></p>
// // // //                           <p><span className="font-semibold text-gray-600">Note:</span> <span className="text-gray-700">{child.childAssetNote || "N/A"}</span></p>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="text-center py-12 text-gray-500">
// // // //                     No child assets associated with this asset.
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}

// // // //             {/* Photos Tab */}
// // // //             {selectedTab === "photos" && (
// // // //               <div className="animate-fadeIn">
// // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // // //                   Asset Gallery
// // // //                 </h2>
// // // //                 {assetPhotos.length > 0 ? (
// // // //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
// // // //                     {assetPhotos.map((photo, index) => (
// // // //                       <div key={index} className="group relative overflow-hidden rounded-lg shadow-md">
// // // //                         <img
// // // //                           src={photo}
// // // //                           alt={`Photo ${index + 1} of ${asset.name}`}
// // // //                           className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
// // // //                         />
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="text-center py-8 text-gray-500 mb-4">
// // // //                     No photos uploaded yet.
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Upload Photo */}
// // // //                 <div className="mt-6 pt-6 border-t border-gray-200">
// // // //                   <h3 className="font-semibold text-gray-700 mb-3">Upload New Photo</h3>
// // // //                   <div className="flex flex-wrap gap-3 items-center">
// // // //                     <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2">
// // // //                       <FaCamera />
// // // //                       Choose Photo
// // // //                       <input
// // // //                         id="photoUpload"
// // // //                         type="file"
// // // //                         onChange={handlePhotoChange}
// // // //                         className="hidden"
// // // //                       />
// // // //                     </label>
// // // //                     {newPhoto && (
// // // //                       <>
// // // //                         <img
// // // //                           src={URL.createObjectURL(newPhoto)}
// // // //                           alt="Preview"
// // // //                           className="w-16 h-16 object-cover rounded-lg border shadow"
// // // //                         />
// // // //                         <button
// // // //                           onClick={handleUploadPhoto}
// // // //                           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
// // // //                           disabled={uploading}
// // // //                         >
// // // //                           {uploading ? "Uploading..." : "Upload Photo"}
// // // //                         </button>
// // // //                       </>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Animation styles */}
// // // //       <style jsx>{`
// // // //         @keyframes fadeIn {
// // // //           from { opacity: 0; transform: translateY(10px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }
// // // //         .animate-fadeIn {
// // // //           animation: fadeIn 0.3s ease-out;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SingleAsset;


// // // import AssetDetails from "./AssetDetails";
// // // import {
// // //   getAssetByAssetTag,
// // //   getAssetHistory,
// // //   getAssetPhotos,
// // //   uploadAssetPhoto,
// // //   getAssetDocuments,
// // //   uploadAssetDocuments,
// // //   getChildAssetsByParent,
// // //   getAllAssets,
// // // } from "../services/api";
// // // import React, { useEffect, useState } from "react";
// // // import { FaSpinner, FaCamera, FaFileAlt, FaDownload } from "react-icons/fa";
// // // import { useParams } from "react-router-dom";
// // // import { toast } from "react-toastify";

// // // const SingleAsset = () => {
// // //   const { id } = useParams();

// // //   const [asset, setAsset] = useState(null);
// // //   const [allAssets, setAllAssets] = useState([]);
// // //   const [currentIndex, setCurrentIndex] = useState(-1);
// // //   const [loading, setLoading] = useState(false);
// // //   const [uploading, setUploading] = useState(false);

// // //   const [selectedTab, setSelectedTab] = useState("details");

// // //   const [assetPhotos, setAssetPhotos] = useState([]);
// // //   const [assetHistory, setAssetHistory] = useState([]);
// // //   const [assetDocuments, setAssetDocuments] = useState([]);

// // //   const [historyFetched, setHistoryFetched] = useState(false);
// // //   const [docFetched, setDocFetched] = useState(false);

// // //   const [newPhoto, setNewPhoto] = useState(null);
// // //   const [newDocuments, setNewDocuments] = useState([]);

// // //   const [childAssets, setChildAssets] = useState([]);
// // //   const [childrenFetched, setChildrenFetched] = useState(false);

// // //   // Fetch all assets for navigation
// // //   useEffect(() => {
// // //     const fetchAllAssets = async () => {
// // //       try {
// // //         const assets = await getAllAssets();
// // //         setAllAssets(assets);
// // //         const index = assets.findIndex(a => a.assetTag === id);
// // //         setCurrentIndex(index);
// // //       } catch (error) {
// // //         console.error("Error fetching all assets:", error);
// // //       }
// // //     };
// // //     fetchAllAssets();
// // //   }, [id]);

// // //   // Initial Data Fetch
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const [assetData, photoData, docData] = await Promise.all([
// // //           getAssetByAssetTag(id),
// // //           getAssetPhotos(id),
// // //           getAssetDocuments(id),
// // //         ]);
// // //         setAsset(assetData);
// // //         setAssetPhotos(photoData || []);
// // //         setAssetDocuments(docData || []);
// // //       } catch (error) {
// // //         console.error("Error fetching asset:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (id) fetchData();
// // //   }, [id]);

// // //   // Navigation handlers
// // //   const handlePrevious = () => {
// // //     if (currentIndex > 0) {
// // //       const prevAsset = allAssets[currentIndex - 1];
// // //       window.location.href = `/assets/${prevAsset.assetTag}`;
// // //     }
// // //   };

// // //   const handleNext = () => {
// // //     if (currentIndex < allAssets.length - 1) {
// // //       const nextAsset = allAssets[currentIndex + 1];
// // //       window.location.href = `/assets/${nextAsset.assetTag}`;
// // //     }
// // //   };

// // //   // Fetch on tab change
// // //   const fetchAssetHistory = async () => {
// // //     if (!historyFetched) {
// // //       try {
// // //         const res = await getAssetHistory(id);
// // //         setAssetHistory(res);
// // //         setHistoryFetched(true);
// // //       } catch (err) {
// // //         console.error(err);
// // //       }
// // //     }
// // //   };

// // //   const fetchChildAssets = async () => {
// // //     if (!childrenFetched) {
// // //       try {
// // //         const res = await getChildAssetsByParent(id);
// // //         setChildAssets(res);
// // //         setChildrenFetched(true);
// // //       } catch (err) {
// // //         console.error("Error fetching child assets", err);
// // //       }
// // //     }
// // //   };

// // //   const fetchAssetDocuments = async () => {
// // //     if (!docFetched) {
// // //       try {
// // //         const res = await getAssetDocuments(id);
// // //         setAssetDocuments(res);
// // //         setDocFetched(true);
// // //       } catch (err) {
// // //         console.error(err);
// // //       }
// // //     }
// // //   };

// // //   const handleTabChange = (tab) => {
// // //     setSelectedTab(tab);
// // //     if (tab === "history") fetchAssetHistory();
// // //     if (tab === "documents") fetchAssetDocuments();
// // //     if (tab === "childAssets") fetchChildAssets();
// // //   };

// // //   const handleDocumentChange = (e) =>
// // //     setNewDocuments(Array.from(e.target.files));

// // //   const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

// // //   const handleUploadDocuments = async () => {
// // //     if (newDocuments.length === 0) return;
// // //     try {
// // //       setUploading(true);
// // //       const formData = new FormData();
// // //       newDocuments.forEach((file) => formData.append("files", file));
// // //       await uploadAssetDocuments(id, formData);
// // //       const docs = await getAssetDocuments(id);
// // //       setAssetDocuments(docs);
// // //       setNewDocuments([]);
// // //       toast.success("Documents uploaded successfully!");
// // //     } catch (err) {
// // //       console.error("Upload failed:", err);
// // //       toast.error("Upload failed");
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const handleUploadPhoto = async () => {
// // //     if (!newPhoto) return;
// // //     try {
// // //       setUploading(true);
// // //       await uploadAssetPhoto(id, newPhoto);
// // //       const photos = await getAssetPhotos(id);
// // //       setAssetPhotos(photos);
// // //       setNewPhoto(null);
// // //       toast.success("Photo uploaded successfully!");
// // //     } catch (err) {
// // //       console.error("Photo upload failed:", err);
// // //       toast.error("Photo upload failed");
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   // Loading UI
// // //   if (loading) {
// // //     return (
// // //       <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex justify-center items-center">
// // //         <div className="text-center">
// // //           <FaSpinner className="text-5xl text-blue-500 animate-spin mx-auto mb-4" />
// // //           <p className="text-gray-600">Loading asset details...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Not Found
// // //   if (!asset) {
// // //     return (
// // //       <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// // //         <div className="text-center py-20">
// // //           <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
// // //             <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //             </svg>
// // //             <h2 className="text-2xl font-bold text-gray-800 mb-2">Asset Not Found</h2>
// // //             <p className="text-gray-600">The asset you're looking for doesn't exist or has been removed.</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// // //       <div className="p-6">
// // //         {/* Asset Details Component */}
// // //         <AssetDetails 
// // //           asset={asset} 
// // //           assetPhotos={assetPhotos} 
// // //           onPrevious={handlePrevious}
// // //           onNext={handleNext}
// // //           hasPrevious={currentIndex > 0}
// // //           hasNext={currentIndex < allAssets.length - 1 && currentIndex !== -1}
// // //         />

// // //         {/* Modern Tabs */}
// // //         <div className="mt-8">
// // //           <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2">
// // //             {["details", "history", "documents", "photos", "childAssets"].map((tab) => (
// // //               <button
// // //                 key={tab}
// // //                 onClick={() => handleTabChange(tab)}
// // //                 className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 capitalize ${
// // //                   selectedTab === tab
// // //                     ? "bg-blue-600 text-white shadow-lg"
// // //                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// // //                 }`}
// // //               >
// // //                 {tab === "childAssets" ? "Child Assets" : tab}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* Tab Content */}
// // //           <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg p-6">
// // //             {/* Details Tab */}
// // //             {selectedTab === "details" && (
// // //               <div>
// // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // //                   Basic Information
// // //                 </h2>
// // //                 <div className="grid md:grid-cols-2 gap-6">
// // //                   <div className="space-y-3">
// // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // //                       <span className="w-32 font-semibold text-gray-600">Name:</span>
// // //                       <span className="text-gray-800">{asset.name || "N/A"}</span>
// // //                     </div>
// // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // //                       <span className="w-32 font-semibold text-gray-600">Asset Tag:</span>
// // //                       <span className="text-gray-800 font-mono">{asset.assetTag || id}</span>
// // //                     </div>
// // //                     <div className="flex items-center py-2 border-b border-gray-100">
// // //                       <span className="w-32 font-semibold text-gray-600">Status:</span>
// // //                       <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
// // //                         asset.status === "AVAILABLE" ? "bg-green-100 text-green-700" :
// // //                         asset.status === "ASSIGNED" ? "bg-blue-100 text-blue-700" :
// // //                         asset.status === "IN_REPAIR" ? "bg-yellow-100 text-yellow-700" :
// // //                         "bg-gray-100 text-gray-700"
// // //                       }`}>
// // //                         {asset.status}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                   <div className="space-y-3">
// // //                     <div className="flex items-start py-2 border-b border-gray-100">
// // //                       <span className="w-32 font-semibold text-gray-600">Description:</span>
// // //                       <span className="text-gray-800 flex-1">{asset.description || "N/A"}</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* History Tab */}
// // //             {selectedTab === "history" && (
// // //               <div>
// // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // //                   Asset History Timeline
// // //                 </h2>
// // //                 {assetHistory.length > 0 ? (
// // //                   <div className="overflow-x-auto">
// // //                     <table className="w-full text-sm">
// // //                       <thead>
// // //                         <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
// // //                           {["Field", "Old Value", "New Value", "Modified By", "Timestamp"].map((head) => (
// // //                             <th key={head} className="p-3 text-left font-semibold text-gray-700">
// // //                               {head}
// // //                             </th>
// // //                           ))}
// // //                         </tr>
// // //                       </thead>
// // //                       <tbody>
// // //                         {assetHistory.map((h, index) => (
// // //                           <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// // //                             <td className="p-3 text-gray-600">{h.changedAttribute}</td>
// // //                             <td className="p-3 text-gray-500">{h.oldValue || "-"}</td>
// // //                             <td className="p-3 font-medium text-blue-600">{h.newValue}</td>
// // //                             <td className="p-3 text-gray-600">{h.modifiedBy}</td>
// // //                             <td className="p-3 text-gray-500">{new Date(h.modifiedAt).toLocaleString()}</td>
// // //                           </tr>
// // //                         ))}
// // //                       </tbody>
// // //                     </table>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-12 text-gray-500">
// // //                     No history records found for this asset.
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}

// // //             {/* Documents Tab */}
// // //             {selectedTab === "documents" && (
// // //               <div>
// // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // //                   Asset Documents
// // //                 </h2>
// // //                 {assetDocuments.length > 0 ? (
// // //                   <div className="space-y-3 mb-6">
// // //                     {assetDocuments.map((doc, index) => (
// // //                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// // //                         <div className="flex items-center gap-3">
// // //                           <FaFileAlt className="text-blue-500" />
// // //                           <span className="text-gray-700">
// // //                             {doc.documentUrl.split("/").pop()}
// // //                           </span>
// // //                           <span className="text-xs text-gray-400">
// // //                             Added by {doc.addedBy} on {new Date(doc.addedAt).toLocaleDateString()}
// // //                           </span>
// // //                         </div>
// // //                         <a
// // //                           href={doc.documentUrl}
// // //                           target="_blank"
// // //                           rel="noopener noreferrer"
// // //                           className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
// // //                         >
// // //                           <FaDownload size={14} /> Download
// // //                         </a>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-8 text-gray-500 mb-4">
// // //                     No documents uploaded yet.
// // //                   </div>
// // //                 )}

// // //                 {/* Upload Section */}
// // //                 <div className="mt-6 pt-6 border-t border-gray-200">
// // //                   <h3 className="font-semibold text-gray-700 mb-3">Upload New Documents</h3>
// // //                   <div className="flex flex-wrap gap-3 items-center">
// // //                     <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
// // //                       Choose Files
// // //                       <input
// // //                         type="file"
// // //                         multiple
// // //                         onChange={handleDocumentChange}
// // //                         className="hidden"
// // //                       />
// // //                     </label>
// // //                     {newDocuments.length > 0 && (
// // //                       <>
// // //                         <span className="text-sm text-gray-600">{newDocuments.length} file(s) selected</span>
// // //                         <button
// // //                           onClick={handleUploadDocuments}
// // //                           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
// // //                           disabled={uploading}
// // //                         >
// // //                           {uploading ? "Uploading..." : "Upload Documents"}
// // //                         </button>
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Child Assets Tab */}
// // //             {selectedTab === "childAssets" && (
// // //               <div>
// // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // //                   Child Assets
// // //                 </h2>
// // //                 {childAssets.length > 0 ? (
// // //                   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
// // //                     {childAssets.map((child, index) => (
// // //                       <div
// // //                         key={index}
// // //                         className="border rounded-xl shadow-sm p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
// // //                       >
// // //                         <h3 className="text-lg font-bold text-blue-600 mb-3">{child.name}</h3>
// // //                         <div className="space-y-2 text-sm">
// // //                           <p><span className="font-semibold text-gray-600">Warranty:</span> <span className="text-gray-700">{child.warranty || "N/A"}</span></p>
// // //                           <p><span className="font-semibold text-gray-600">Purchase From:</span> <span className="text-gray-700">{child.purchaseFrom || "N/A"}</span></p>
// // //                           <p><span className="font-semibold text-gray-600">Note:</span> <span className="text-gray-700">{child.childAssetNote || "N/A"}</span></p>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-12 text-gray-500">
// // //                     No child assets associated with this asset.
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}

// // //             {/* Photos Tab */}
// // //             {selectedTab === "photos" && (
// // //               <div>
// // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
// // //                   <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
// // //                   Asset Gallery
// // //                 </h2>
// // //                 {assetPhotos.length > 0 ? (
// // //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
// // //                     {assetPhotos.map((photo, index) => (
// // //                       <div key={index} className="group relative overflow-hidden rounded-lg shadow-md">
// // //                         <img
// // //                           src={photo}
// // //                           alt={`Photo ${index + 1} of ${asset.name}`}
// // //                           className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
// // //                         />
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-8 text-gray-500 mb-4">
// // //                     No photos uploaded yet.
// // //                   </div>
// // //                 )}

// // //                 {/* Upload Photo */}
// // //                 <div className="mt-6 pt-6 border-t border-gray-200">
// // //                   <h3 className="font-semibold text-gray-700 mb-3">Upload New Photo</h3>
// // //                   <div className="flex flex-wrap gap-3 items-center">
// // //                     <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2">
// // //                       <FaCamera />
// // //                       Choose Photo
// // //                       <input
// // //                         id="photoUpload"
// // //                         type="file"
// // //                         onChange={handlePhotoChange}
// // //                         className="hidden"
// // //                       />
// // //                     </label>
// // //                     {newPhoto && (
// // //                       <>
// // //                         <img
// // //                           src={URL.createObjectURL(newPhoto)}
// // //                           alt="Preview"
// // //                           className="w-16 h-16 object-cover rounded-lg border shadow"
// // //                         />
// // //                         <button
// // //                           onClick={handleUploadPhoto}
// // //                           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
// // //                           disabled={uploading}
// // //                         >
// // //                           {uploading ? "Uploading..." : "Upload Photo"}
// // //                         </button>
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SingleAsset;


// // import AssetDetails from "./AssetDetails";
// // import {
// //   getAssetByAssetTag,
// //   getAssetHistory,
// //   getAssetPhotos,
// //   uploadAssetPhoto,
// //   getAssetDocuments,
// //   uploadAssetDocuments,
// //   getChildAssetsByParent,
// // } from "../services/api";
// // import React, { useEffect, useState } from "react";
// // import { FaSpinner, FaCamera, FaFileAlt } from "react-icons/fa";
// // import { useParams, useNavigate } from "react-router-dom";

// // const SingleAsset = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [asset, setAsset] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [uploading, setUploading] = useState(false);

// //   const [selectedTab, setSelectedTab] = useState("details");

// //   const [assetPhotos, setAssetPhotos] = useState([]);
// //   const [assetHistory, setAssetHistory] = useState([]);
// //   const [assetDocuments, setAssetDocuments] = useState([]);

// //   const [historyFetched, setHistoryFetched] = useState(false);
// //   const [docFetched, setDocFetched] = useState(false);

// //   const [newPhoto, setNewPhoto] = useState(null);
// //   const [newDocuments, setNewDocuments] = useState([]);

// //   const [childAssets, setChildAssets] = useState([]);
// //   const [childrenFetched, setChildrenFetched] = useState(false);

// //   // NOTE: For next/prev navigation, pass asset list from parent or use router state.
// //   // These are placeholder handlers — wire to your actual asset list as needed.
// //   const handleNext = () => { /* navigate to next asset */ };
// //   const handlePrev = () => { /* navigate to prev asset */ };

// //   // Initial Data Fetch
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const [assetData, photoData, docData] = await Promise.all([
// //           getAssetByAssetTag(id),
// //           getAssetPhotos(id),
// //           getAssetDocuments(id),
// //         ]);
// //         setAsset(assetData);
// //         setAssetPhotos(photoData || []);
// //         setAssetDocuments(docData || []);
// //       } catch (error) {
// //         console.error("Error fetching asset:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     if (id) fetchData();
// //   }, [id]);

// //   const fetchAssetHistory = async () => {
// //     if (!historyFetched) {
// //       try {
// //         const res = await getAssetHistory(id);
// //         setAssetHistory(res);
// //         setHistoryFetched(true);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     }
// //   };

// //   const fetchChildAssets = async () => {
// //     if (!childrenFetched) {
// //       try {
// //         const res = await getChildAssetsByParent(id);
// //         setChildAssets(res);
// //         setChildrenFetched(true);
// //       } catch (err) {
// //         console.error("Error fetching child assets", err);
// //       }
// //     }
// //   };

// //   const fetchAssetDocuments = async () => {
// //     if (!docFetched) {
// //       try {
// //         const res = await getAssetDocuments(id);
// //         setAssetDocuments(res);
// //         setDocFetched(true);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     }
// //   };

// //   const handleTabChange = (tab) => {
// //     setSelectedTab(tab);
// //     if (tab === "history") fetchAssetHistory();
// //     if (tab === "documents") fetchAssetDocuments();
// //     if (tab === "childAssets") fetchChildAssets();
// //   };

// //   const handleDocumentChange = (e) => setNewDocuments(Array.from(e.target.files));
// //   const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

// //   const handleUploadDocuments = async () => {
// //     if (newDocuments.length === 0) return;
// //     try {
// //       setUploading(true);
// //       const formData = new FormData();
// //       newDocuments.forEach((file) => formData.append("files", file));
// //       await uploadAssetDocuments(id, formData);
// //       const docs = await getAssetDocuments(id);
// //       setAssetDocuments(docs);
// //       setNewDocuments([]);
// //     } catch (err) {
// //       console.error("Upload failed:", err);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const handleUploadPhoto = async () => {
// //     if (!newPhoto) return;
// //     try {
// //       setUploading(true);
// //       await uploadAssetPhoto(id, newPhoto);
// //       const photos = await getAssetPhotos(id);
// //       setAssetPhotos(photos);
// //       setNewPhoto(null);
// //     } catch (err) {
// //       console.error("Photo upload failed:", err);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="lg:ml-64 flex justify-center items-center h-screen bg-gray-50">
// //         <div className="flex flex-col items-center gap-3">
// //           <FaSpinner className="text-3xl text-blue-500 animate-spin" />
// //           <p className="text-xs text-slate-400">Loading asset...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!asset) {
// //     return (
// //       <div className="lg:ml-64 flex justify-center items-center h-screen bg-gray-50">
// //         <div className="text-center">
// //           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
// //             <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //           </div>
// //           <p className="text-sm font-semibold text-slate-600">Asset not found</p>
// //           <p className="text-xs text-slate-400 mt-1">The requested asset could not be located.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const tabs = [
// //     { key: "details", label: "Details", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
// //     { key: "history", label: "History", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
// //     { key: "documents", label: "Documents", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
// //     { key: "photos", label: "Photos", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
// //     { key: "childAssets", label: "Child Assets", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
// //   ];

// //   return (
// //     // ── KEY FIX: lg:ml-64 matches typical sidebar width (adjust to match your sidebar) ──
// //     // <div className="lg:ml-64 bg-gray-50 min-h-screen p-4 lg:p-6">
// //     <div className="lg:ml-48 bg-gray-50 min-h-screen">
// //       {/* Asset Details (header, nav, tables) */}
// //       <AssetDetails
// //         asset={asset}
// //         assetPhotos={assetPhotos}
// //         onNext={handleNext}
// //         onPrev={handlePrev}
// //         hasPrev={false}
// //         hasNext={false}
// //       />

// //       {/* ── Tabs ── */}
// //       <div className="flex gap-1 mt-6 bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto">
// //         {tabs.map((tab) => (
// //           <button
// //             key={tab.key}
// //             onClick={() => handleTabChange(tab.key)}
// //             className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
// //               selectedTab === tab.key
// //                 ? "bg-blue-600 text-white shadow-sm"
// //                 : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
// //             }`}
// //           >
// //             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
// //             </svg>
// //             {tab.label}
// //           </button>
// //         ))}
// //       </div>

// //       {/* ── Tab Content ── */}
// //       <div className="mt-4">
// //         {/* Details */}
// //         {selectedTab === "details" && (
// //           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
// //             <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
// //               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //               Basic Information
// //             </h2>
// //             <div className="grid sm:grid-cols-2 gap-3">
// //               {[
// //                 { label: "Name", value: asset.name },
// //                 { label: "Description", value: asset.description },
// //                 { label: "Asset Tag", value: asset.assetTag || id },
// //                 { label: "Status", value: asset.status },
// //               ].map(({ label, value }) => (
// //                 <div key={label} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
// //                   <p className="text-xs text-slate-400 mb-0.5">{label}</p>
// //                   <p className="text-xs font-medium text-slate-700">{value || "N/A"}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* History */}
// //         {selectedTab === "history" && (
// //           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
// //             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
// //               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //               <h2 className="text-sm font-semibold text-slate-700">Asset History</h2>
// //             </div>
// //             {assetHistory.length > 0 ? (
// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-xs">
// //                   <thead>
// //                     <tr className="bg-slate-50 border-b border-slate-100">
// //                       {["Field", "Old Value", "New Value", "Modified By", "Timestamp"].map((head) => (
// //                         <th key={head} className="px-4 py-2.5 text-left text-slate-500 font-medium">{head}</th>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {assetHistory.map((h, index) => (
// //                       <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
// //                         <td className="px-4 py-2.5 text-slate-600 font-medium">{h.changedAttribute}</td>
// //                         <td className="px-4 py-2.5 text-slate-400">{h.oldValue || "—"}</td>
// //                         <td className="px-4 py-2.5 text-blue-600 font-semibold">{h.newValue}</td>
// //                         <td className="px-4 py-2.5 text-slate-600">{h.modifiedBy}</td>
// //                         <td className="px-4 py-2.5 text-slate-400">{new Date(h.modifiedAt).toLocaleString()}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             ) : (
// //               <div className="flex flex-col items-center justify-center py-12 text-slate-300">
// //                 <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //                 <p className="text-xs">No history available</p>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Documents */}
// //         {selectedTab === "documents" && (
// //           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
// //             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
// //               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //               </svg>
// //               <h2 className="text-sm font-semibold text-slate-700">Asset Documents</h2>
// //             </div>
// //             <div className="p-5">
// //               {assetDocuments.length > 0 ? (
// //                 <ul className="space-y-2 mb-5">
// //                   {assetDocuments.map((doc, index) => (
// //                     <li key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
// //                       <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
// //                         <FaFileAlt className="text-blue-500 text-xs" />
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <a
// //                           href={doc.documentUrl}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline block truncate"
// //                         >
// //                           {doc.documentUrl.split("/").pop()}
// //                         </a>
// //                         <p className="text-xs text-slate-400 mt-0.5">
// //                           Added by {doc.addedBy} · {new Date(doc.addedAt).toLocaleDateString()}
// //                         </p>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <div className="flex flex-col items-center justify-center py-8 text-slate-300 mb-4">
// //                   <FaFileAlt className="text-3xl mb-2" />
// //                   <p className="text-xs">No documents uploaded yet</p>
// //                 </div>
// //               )}
// //               {/* Upload */}
// //               <div className="border-t border-slate-100 pt-4 space-y-2">
// //                 <p className="text-xs font-medium text-slate-500">Upload Documents</p>
// //                 <input
// //                   type="file"
// //                   multiple
// //                   onChange={handleDocumentChange}
// //                   className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 border border-slate-200 rounded-lg p-1.5 cursor-pointer"
// //                 />
// //                 {newDocuments.length > 0 && (
// //                   <button
// //                     onClick={handleUploadDocuments}
// //                     disabled={uploading}
// //                     className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all font-medium"
// //                   >
// //                     {uploading ? "Uploading..." : `Upload ${newDocuments.length} file${newDocuments.length > 1 ? "s" : ""}`}
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Child Assets */}
// //         {selectedTab === "childAssets" && (
// //           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
// //             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
// //               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
// //               </svg>
// //               <h2 className="text-sm font-semibold text-slate-700">Child Assets</h2>
// //               {childAssets.length > 0 && (
// //                 <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
// //                   {childAssets.length}
// //                 </span>
// //               )}
// //             </div>
// //             <div className="p-5">
// //               {childAssets.length > 0 ? (
// //                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
// //                   {childAssets.map((child, index) => (
// //                     <div key={index} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-blue-200 hover:shadow-sm transition-all">
// //                       <h3 className="text-xs font-semibold text-blue-600 mb-2.5">{child.name}</h3>
// //                       <div className="space-y-1.5">
// //                         {[
// //                           { label: "Warranty", value: child.warranty },
// //                           { label: "Purchase From", value: child.purchaseFrom },
// //                           { label: "Note", value: child.childAssetNote },
// //                         ].map(({ label, value }) => (
// //                           <div key={label} className="flex gap-2">
// //                             <span className="text-xs text-slate-400 w-24 flex-shrink-0">{label}</span>
// //                             <span className="text-xs text-slate-600 font-medium">{value || "—"}</span>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center justify-center py-10 text-slate-300">
// //                   <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
// //                   </svg>
// //                   <p className="text-xs">No child assets available</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Photos */}
// //         {selectedTab === "photos" && (
// //           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
// //             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
// //               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //               </svg>
// //               <h2 className="text-sm font-semibold text-slate-700">Asset Photos</h2>
// //               {assetPhotos.length > 0 && (
// //                 <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
// //                   {assetPhotos.length}
// //                 </span>
// //               )}
// //             </div>
// //             <div className="p-5">
// //               {assetPhotos.length > 0 ? (
// //                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
// //                   {assetPhotos.map((photo, index) => (
// //                     <div key={index} className="aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
// //                       <img
// //                         src={photo}
// //                         alt={`Photo ${index + 1} of ${asset.name}`}
// //                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center justify-center py-8 text-slate-300 mb-4">
// //                   <FaCamera className="text-3xl mb-2" />
// //                   <p className="text-xs">No photos uploaded yet</p>
// //                 </div>
// //               )}

// //               {/* Upload Photo */}
// //               <div className="border-t border-slate-100 pt-4">
// //                 <p className="text-xs font-medium text-slate-500 mb-2">Upload Photo</p>
// //                 <label
// //                   htmlFor="photoUpload"
// //                   className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all"
// //                 >
// //                   <FaCamera className="text-xs" />
// //                   Choose Photo
// //                 </label>
// //                 <input id="photoUpload" type="file" onChange={handlePhotoChange} className="hidden" />
// //                 {newPhoto && (
// //                   <div className="flex items-center gap-4 mt-3">
// //                     <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
// //                       <img
// //                         src={URL.createObjectURL(newPhoto)}
// //                         alt="Preview"
// //                         className="w-full h-full object-cover"
// //                       />
// //                     </div>
// //                     <button
// //                       onClick={handleUploadPhoto}
// //                       disabled={uploading}
// //                       className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all font-medium"
// //                     >
// //                       {uploading ? "Uploading..." : "Upload Photo"}
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SingleAsset;


// import AssetDetails from "./AssetDetails";
// import {
//   getAssetByAssetTag,
//   getAssetHistory,
//   getAssetPhotos,
//   uploadAssetPhoto,
//   getAssetDocuments,
//   uploadAssetDocuments,
//   getChildAssetsByParent,
//   fetchAssets,
// } from "../services/api";
// import React, { useEffect, useState } from "react";
// import { FaSpinner, FaCamera, FaFileAlt } from "react-icons/fa";
// import { useParams, useNavigate, useLocation } from "react-router-dom";

// const SingleAsset = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [asset, setAsset] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
  
//   // State for navigation
//   const [allAssets, setAllAssets] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(-1);
//   const [totalAssets, setTotalAssets] = useState(0);

//   const [selectedTab, setSelectedTab] = useState("details");

//   const [assetPhotos, setAssetPhotos] = useState([]);
//   const [assetHistory, setAssetHistory] = useState([]);
//   const [assetDocuments, setAssetDocuments] = useState([]);

//   const [historyFetched, setHistoryFetched] = useState(false);
//   const [docFetched, setDocFetched] = useState(false);

//   const [newPhoto, setNewPhoto] = useState(null);
//   const [newDocuments, setNewDocuments] = useState([]);

//   const [childAssets, setChildAssets] = useState([]);
//   const [childrenFetched, setChildrenFetched] = useState(false);

//   // Get filter params from URL to maintain filter context
//   const getFilterParams = () => {
//     const params = new URLSearchParams(location.search);
//     return {
//       status: params.get("status") || undefined,
//       type: params.get("type") || undefined,
//       department: params.get("department") || undefined,
//       createdBy: params.get("createdBy") || undefined,
//       siteId: params.get("siteId") || undefined,
//       locationId: params.get("locationId") || undefined,
//       purchaseStart: params.get("purchaseStart") || undefined,
//       purchaseEnd: params.get("purchaseEnd") || undefined,
//       createdStart: params.get("createdStart") || undefined,
//       createdEnd: params.get("createdEnd") || undefined,
//       keyword: params.get("keyword") || undefined,
//     };
//   };

//   // Fetch all assets for navigation (maintaining filters)
//   const fetchAllAssetsForNavigation = async () => {
//     try {
//       const filters = getFilterParams();
//       const data = await fetchAssets({
//         ...filters,
//         page: 0,
//         size: 1000, // Fetch enough assets for navigation
//       });
      
//       const assetsList = data.content || [];
//       setAllAssets(assetsList);
//       setTotalAssets(data.totalElements || 0);
      
//       // Find current index
//       const index = assetsList.findIndex(a => a.assetTag === id);
//       setCurrentIndex(index);
//     } catch (error) {
//       console.error("Error fetching assets for navigation:", error);
//     }
//   };

//   // Initial Data Fetch
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [assetData, photoData, docData] = await Promise.all([
//           getAssetByAssetTag(id),
//           getAssetPhotos(id),
//           getAssetDocuments(id),
//         ]);
//         setAsset(assetData);
//         setAssetPhotos(photoData || []);
//         setAssetDocuments(docData || []);
//       } catch (error) {
//         console.error("Error fetching asset:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchData();
//       fetchAllAssetsForNavigation();
//     }
//   }, [id]);

//   // Navigation handlers
//   // const handlePrevious = () => {
//   //   if (currentIndex > 0) {
//   //     const prevAsset = allAssets[currentIndex - 1];
//   //     // Preserve filter params when navigating
//   //     const filterParams = getFilterParams();
//   //     const queryString = new URLSearchParams(filterParams).toString();
//   //     const newUrl = `/asset/${prevAsset.assetTag}${queryString ? `?${queryString}` : ''}`;
//   //     navigate(newUrl);
//   //   }
//   // };

//   // const handleNext = () => {
//   //   if (currentIndex < allAssets.length - 1) {
//   //     const nextAsset = allAssets[currentIndex + 1];
//   //     // Preserve filter params when navigating
//   //     const filterParams = getFilterParams();
//   //     const queryString = new URLSearchParams(filterParams).toString();
//   //     const newUrl = `/asset/${nextAsset.assetTag}${queryString ? `?${queryString}` : ''}`;
//   //     navigate(newUrl);
//   //   }
//   // };

//   // Helper to build URL with filters
// const buildAssetUrl = (assetTag) => {
//   const filterParams = getFilterParams?.() || {};
//   const queryString = new URLSearchParams(filterParams).toString();

//   return `/asset/${assetTag}${queryString ? `?${queryString}` : ""}`;
// };

// // Previous Asset
// const handlePrevious = () => {
//   if (!allAssets || currentIndex <= 0) return;

//   const prevAsset = allAssets[currentIndex - 1];
//   if (!prevAsset?.assetTag) return;

//   navigate(buildAssetUrl(prevAsset.assetTag));
// };

// // Next Asset
// const handleNext = () => {
//   if (!allAssets || currentIndex >= allAssets.length - 1) return;

//   const nextAsset = allAssets[currentIndex + 1];
//   if (!nextAsset?.assetTag) return;

//   navigate(buildAssetUrl(nextAsset.assetTag));
// };

//   const fetchAssetHistory = async () => {
//     if (!historyFetched) {
//       try {
//         const res = await getAssetHistory(id);
//         setAssetHistory(res);
//         setHistoryFetched(true);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const fetchChildAssets = async () => {
//     if (!childrenFetched) {
//       try {
//         const res = await getChildAssetsByParent(id);
//         setChildAssets(res);
//         setChildrenFetched(true);
//       } catch (err) {
//         console.error("Error fetching child assets", err);
//       }
//     }
//   };

//   const fetchAssetDocuments = async () => {
//     if (!docFetched) {
//       try {
//         const res = await getAssetDocuments(id);
//         setAssetDocuments(res);
//         setDocFetched(true);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     if (tab === "history") fetchAssetHistory();
//     if (tab === "documents") fetchAssetDocuments();
//     if (tab === "childAssets") fetchChildAssets();
//   };

//   const handleDocumentChange = (e) => setNewDocuments(Array.from(e.target.files));
//   const handlePhotoChange = (e) => setNewPhoto(e.target.files[0]);

//   const handleUploadDocuments = async () => {
//     if (newDocuments.length === 0) return;
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       newDocuments.forEach((file) => formData.append("files", file));
//       await uploadAssetDocuments(id, formData);
//       const docs = await getAssetDocuments(id);
//       setAssetDocuments(docs);
//       setNewDocuments([]);
//     } catch (err) {
//       console.error("Upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleUploadPhoto = async () => {
//     if (!newPhoto) return;
//     try {
//       setUploading(true);
//       await uploadAssetPhoto(id, newPhoto);
//       const photos = await getAssetPhotos(id);
//       setAssetPhotos(photos);
//       setNewPhoto(null);
//     } catch (err) {
//       console.error("Photo upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="lg:ml-48 flex justify-center items-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center gap-3">
//           <FaSpinner className="text-3xl text-blue-500 animate-spin" />
//           <p className="text-xs text-slate-400">Loading asset...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!asset) {
//     return (
//       <div className="lg:ml-48 flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
//             <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <p className="text-sm font-semibold text-slate-600">Asset not found</p>
//           <p className="text-xs text-slate-400 mt-1">The requested asset could not be located.</p>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//     { key: "details", label: "Details", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
//     { key: "history", label: "History", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
//     { key: "documents", label: "Documents", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
//     { key: "photos", label: "Photos", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
//     { key: "childAssets", label: "Child Assets", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
//   ];

//   return (
//     <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       {/* Asset Details with navigation props */}
//       <AssetDetails
//         asset={asset}
//         assetPhotos={assetPhotos}
//         onNext={handleNext}
//         onPrev={handlePrevious}
//         hasPrev={currentIndex > 0}
//         hasNext={currentIndex < allAssets.length - 1 && currentIndex !== -1}
//         currentIndex={currentIndex + 1}
//         totalAssets={totalAssets}
//       />

//       {/* Tabs */}
//       <div className="flex gap-1 mt-6 bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => handleTabChange(tab.key)}
//             className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
//               selectedTab === tab.key
//                 ? "bg-blue-600 text-white shadow-sm"
//                 : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
//             }`}
//           >
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
//             </svg>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="mt-4">
//         {/* Details */}
//         {selectedTab === "details" && (
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
//             <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
//               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Basic Information
//             </h2>
//             <div className="grid sm:grid-cols-2 gap-3">
//               {[
//                 { label: "Name", value: asset.name },
//                 { label: "Description", value: asset.description },
//                 { label: "Asset Tag", value: asset.assetTag || id },
//                 { label: "Status", value: asset.status },
//               ].map(({ label, value }) => (
//                 <div key={label} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
//                   <p className="text-xs text-slate-400 mb-0.5">{label}</p>
//                   <p className="text-xs font-medium text-slate-700">{value || "N/A"}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* History */}
//         {selectedTab === "history" && (
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
//               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h2 className="text-sm font-semibold text-slate-700">Asset History</h2>
//             </div>
//             {assetHistory.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-xs">
//                   <thead>
//                     <tr className="bg-slate-50 border-b border-slate-100">
//                       {["Field", "Old Value", "New Value", "Modified By", "Timestamp"].map((head) => (
//                         <th key={head} className="px-4 py-2.5 text-left text-slate-500 font-medium">{head}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {assetHistory.map((h, index) => (
//                       <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
//                         <td className="px-4 py-2.5 text-slate-600 font-medium">{h.changedAttribute}</td>
//                         <td className="px-4 py-2.5 text-slate-400">{h.oldValue || "—"}</td>
//                         <td className="px-4 py-2.5 text-blue-600 font-semibold">{h.newValue}</td>
//                         <td className="px-4 py-2.5 text-slate-600">{h.modifiedBy}</td>
//                         <td className="px-4 py-2.5 text-slate-400">{new Date(h.modifiedAt).toLocaleString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-12 text-slate-300">
//                 <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <p className="text-xs">No history available</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Documents */}
//         {selectedTab === "documents" && (
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
//               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h2 className="text-sm font-semibold text-slate-700">Asset Documents</h2>
//             </div>
//             <div className="p-5">
//               {assetDocuments.length > 0 ? (
//                 <ul className="space-y-2 mb-5">
//                   {assetDocuments.map((doc, index) => (
//                     <li key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
//                       <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <FaFileAlt className="text-blue-500 text-xs" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <a
//                           href={doc.documentUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline block truncate"
//                         >
//                           {doc.documentUrl.split("/").pop()}
//                         </a>
//                         <p className="text-xs text-slate-400 mt-0.5">
//                           Added by {doc.addedBy} · {new Date(doc.addedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-8 text-slate-300 mb-4">
//                   <FaFileAlt className="text-3xl mb-2" />
//                   <p className="text-xs">No documents uploaded yet</p>
//                 </div>
//               )}
//               {/* Upload */}
//               <div className="border-t border-slate-100 pt-4 space-y-2">
//                 <p className="text-xs font-medium text-slate-500">Upload Documents</p>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleDocumentChange}
//                   className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 border border-slate-200 rounded-lg p-1.5 cursor-pointer"
//                 />
//                 {newDocuments.length > 0 && (
//                   <button
//                     onClick={handleUploadDocuments}
//                     disabled={uploading}
//                     className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all font-medium"
//                   >
//                     {uploading ? "Uploading..." : `Upload ${newDocuments.length} file${newDocuments.length > 1 ? "s" : ""}`}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Child Assets */}
//         {selectedTab === "childAssets" && (
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
//               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
//               </svg>
//               <h2 className="text-sm font-semibold text-slate-700">Child Assets</h2>
//               {childAssets.length > 0 && (
//                 <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
//                   {childAssets.length}
//                 </span>
//               )}
//             </div>
//             <div className="p-5">
//               {childAssets.length > 0 ? (
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {childAssets.map((child, index) => (
//                     <div key={index} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-blue-200 hover:shadow-sm transition-all">
//                       <h3 className="text-xs font-semibold text-blue-600 mb-2.5">{child.name}</h3>
//                       <div className="space-y-1.5">
//                         {[
//                           { label: "Warranty", value: child.warranty },
//                           { label: "Purchase From", value: child.purchaseFrom },
//                           { label: "Note", value: child.childAssetNote },
//                         ].map(({ label, value }) => (
//                           <div key={label} className="flex gap-2">
//                             <span className="text-xs text-slate-400 w-24 flex-shrink-0">{label}</span>
//                             <span className="text-xs text-slate-600 font-medium">{value || "—"}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-10 text-slate-300">
//                   <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
//                   </svg>
//                   <p className="text-xs">No child assets available</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Photos */}
//         {selectedTab === "photos" && (
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
//               <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               <h2 className="text-sm font-semibold text-slate-700">Asset Photos</h2>
//               {assetPhotos.length > 0 && (
//                 <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
//                   {assetPhotos.length}
//                 </span>
//               )}
//             </div>
//             <div className="p-5">
//               {assetPhotos.length > 0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
//                   {assetPhotos.map((photo, index) => (
//                     <div key={index} className="aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
//                       <img
//                         src={photo}
//                         alt={`Photo ${index + 1} of ${asset.name}`}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-8 text-slate-300 mb-4">
//                   <FaCamera className="text-3xl mb-2" />
//                   <p className="text-xs">No photos uploaded yet</p>
//                 </div>
//               )}

//               {/* Upload Photo */}
//               <div className="border-t border-slate-100 pt-4">
//                 <p className="text-xs font-medium text-slate-500 mb-2">Upload Photo</p>
//                 <label
//                   htmlFor="photoUpload"
//                   className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all"
//                 >
//                   <FaCamera className="text-xs" />
//                   Choose Photo
//                 </label>
//                 <input id="photoUpload" type="file" onChange={handlePhotoChange} className="hidden" />
//                 {newPhoto && (
//                   <div className="flex items-center gap-4 mt-3">
//                     <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
//                       <img
//                         src={URL.createObjectURL(newPhoto)}
//                         alt="Preview"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <button
//                       onClick={handleUploadPhoto}
//                       disabled={uploading}
//                       className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all font-medium"
//                     >
//                       {uploading ? "Uploading..." : "Upload Photo"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleAsset;


import AssetDetails from "./AssetDetails";
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
  // (AssetList stores the full URL including filters as returnUrl in state when navigating)
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

      // ── FIX 3: Pass currentId as argument — never rely on closed-over 'id'
      const index = assetsList.findIndex((a) => a.assetTag === currentId);
      setCurrentIndex(index);
      currentIndexRef.current = index;
    } catch (error) {
      console.error("Error fetching assets for navigation:", error);
    }
  }, [getFilterParams]);

  // Initial data fetch — reruns whenever the route :id changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Reset all tab data so stale content isn't shown for the new asset
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

  // ── FIX 4: Navigation reads from refs, not state — no stale closure
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
      <div className="flex gap-1 mt-6 bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto">
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

        {selectedTab === "documents" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                      <img src={photo} alt={`Photo ${index + 1} of ${asset.name}`}
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
    </div>
  );
};

export default SingleAsset;