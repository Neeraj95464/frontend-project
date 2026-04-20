// // // // import api, {
// // // //   deleteAsset,
// // // //   fetchAssets,
// // // //   exportAssetsExcel,
// // // //   getSites,
// // // //   getLocationsBySite,
// // // //   getAssetCodes,
// // // // } from "../services/api";
// // // // import React, { useState, useEffect } from "react";
// // // // import { FiEdit, FiTrash2 } from "react-icons/fi";
// // // // import { useNavigate } from "react-router-dom";

// // // // // fetchAssets is your existing API call

// // // // const AssetList = () => {
// // // //   const [assets, setAssets] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   // === Filters ===
// // // //   const [selectedStatus, setSelectedStatus] = useState("");
// // // //   const [selectedType, setSelectedType] = useState("");
// // // //   const [selectedDepartment, setSelectedDepartment] = useState("");
// // // //   const [createdBy, setCreatedBy] = useState("");
// // // //   const [selectedSite, setSelectedSite] = useState("");
// // // //   const [selectedLocation, setSelectedLocation] = useState("");
// // // //   const [purchaseStartDate, setPurchaseStartDate] = useState("");
// // // //   const [purchaseEndDate, setPurchaseEndDate] = useState("");
// // // //   const [createdStartDateTime, setCreatedStartDateTime] = useState("");
// // // //   const [createdEndDateTime, setCreatedEndDateTime] = useState("");
// // // //   const [searchKeyword, setSearchKeyword] = useState("");
// // // //   const [debouncedKeyword, setDebouncedKeyword] = useState("");
// // // //   useEffect(() => {
// // // //     const handler = setTimeout(() => setDebouncedKeyword(searchKeyword), 400);
// // // //     return () => clearTimeout(handler);
// // // //   }, [searchKeyword]);

// // // //   // Correct initialization
// // // //   const [sites, setSites] = useState([]);
// // // //   const [locations, setLocations] = useState([]);

// // // //   // === Pagination ===
// // // //   const [currentPage, setCurrentPage] = useState(0);
// // // //   const [paginationInfo, setPaginationInfo] = useState({
// // // //     totalElements: 0,
// // // //     totalPages: 0,
// // // //     last: false,
// // // //   });

// // // //   const pageSize = 10;

// // // //   useEffect(() => {
// // // //     getSites()
// // // //       .then((sitesData) => {
// // // //         setSites(sitesData); // directly set
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error("Error loading sites", err);
// // // //       });
// // // //   }, []);

// // // //   // Fetch locations whenever the selected site changes
// // // //   useEffect(() => {
// // // //     if (selectedSite) {
// // // //       getLocationsBySite(selectedSite)
// // // //         .then((locationsData) => {
// // // //           // locationsData is already the array returned from backend
// // // //           setLocations(locationsData);
// // // //         })
// // // //         .catch((err) => {
// // // //           console.error("Error loading locations", err);
// // // //           setLocations([]);
// // // //         });
// // // //     } else {
// // // //       setLocations([]);
// // // //     }

// // // //     // Always reset the selectedLocation when site changes
// // // //     setSelectedLocation("");
// // // //   }, [selectedSite]);

// // // //   // Load assets from backend when filters/page change
// // // //   useEffect(() => {
// // // //     loadAssets();
// // // //   }, [
// // // //     selectedStatus,
// // // //     selectedType,
// // // //     selectedDepartment,
// // // //     createdBy,
// // // //     selectedSite,
// // // //     selectedLocation,
// // // //     purchaseStartDate,
// // // //     purchaseEndDate,
// // // //     createdStartDateTime,
// // // //     createdEndDateTime,
// // // //     debouncedKeyword,
// // // //     currentPage,
// // // //   ]);

// // // //   const loadAssets = async (page = currentPage) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const data = await fetchAssets({
// // // //         status: selectedStatus,
// // // //         type: selectedType,
// // // //         department: selectedDepartment,
// // // //         createdBy,
// // // //         siteId: selectedSite,
// // // //         locationId: selectedLocation,
// // // //         purchaseStart: purchaseStartDate,
// // // //         purchaseEnd: purchaseEndDate,
// // // //         createdStart: createdStartDateTime,
// // // //         createdEnd: createdEndDateTime,
// // // //         keyword: debouncedKeyword, // ✅ debounce value
// // // //         page: page,
// // // //         size: pageSize,
// // // //       });

// // // //       const {
// // // //         content = [],
// // // //         page: pageNumber,
// // // //         size: pageSizeFromApi,
// // // //         totalElements,
// // // //         totalPages,
// // // //         last,
// // // //       } = data || {};

// // // //       setAssets(content);
// // // //       setPaginationInfo({
// // // //         totalPages,
// // // //         totalElements,
// // // //         last,
// // // //         pageNumber,
// // // //         size: pageSizeFromApi,
// // // //         currentCount: content.length,
// // // //       });
// // // //       setCurrentPage(pageNumber);
// // // //     } catch (err) {
// // // //       console.error("Error fetching assets:", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (assetTag) => {
// // // //     if (
// // // //       window.confirm("Are you sure you want to delete this asset? ", assetTag)
// // // //     ) {
// // // //       try {
// // // //         await deleteAsset(assetTag);
// // // //         loadAssets(); // refresh current page
// // // //       } catch (error) {
// // // //         console.error("Error deleting asset:", error);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handlePrintAllTags = async () => {
// // // //     try {
// // // //       // Wait for all API requests
// // // //       const tagList = await Promise.all(
// // // //         assets.map((asset) => getAssetCodes(asset.assetTag)),
// // // //       );

// // // //       navigate("/print/tags", {
// // // //         state: { tags: tagList },
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Error generating print tags", error);
// // // //     }
// // // //   };

// // // //   const handleEdit = (assetTag) => {
// // // //     navigate(`/asset/${assetTag}`);
// // // //   };

// // // //   const handleExport = () => {
// // // //     exportAssetsExcel({
// // // //       status: selectedStatus,
// // // //       type: selectedType,
// // // //       department: selectedDepartment,
// // // //       createdBy,
// // // //       siteId: selectedSite,
// // // //       locationId: selectedLocation,
// // // //       purchaseStart: purchaseStartDate,
// // // //       purchaseEnd: purchaseEndDate,
// // // //       createdStart: createdStartDateTime,
// // // //       createdEnd: createdEndDateTime,
// // // //       keyword: searchKeyword,
// // // //     });
// // // //   };

// // // //   return (
// // // //     // <div className="pt-16 lg:ml-48">
// // // //     <div className="lg:ml-48 bg-gray-50 min-h-screen">
// // // //       <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
// // // //         {/* Status */}
// // // //         <select
// // // //           value={selectedStatus}
// // // //           onChange={(e) => {
// // // //             setCurrentPage(0);
// // // //             setSelectedStatus(e.target.value);
// // // //           }}
// // // //           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition text-sm"
// // // //         >
// // // //           <option value="">All Status</option>
// // // //           <option value="AVAILABLE">Available</option>
// // // //           <option value="CHECKED_OUT">Checked Out</option>
// // // //           <option value="IN_REPAIR">In Repair</option>
// // // //           <option value="LOST">Lost</option>
// // // //           <option value="DISPOSED">Disposed</option>
// // // //           <option value="DELETED">Deleted</option>
// // // //           <option value="UAP">UAP</option>
// // // //         </select>

// // // //         {/* Type */}
// // // //         <select
// // // //           value={selectedType}
// // // //           onChange={(e) => {
// // // //             setCurrentPage(0);
// // // //             setSelectedType(e.target.value);
// // // //           }}
// // // //           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
// // // //         >
// // // //           {/* <option value="">All Types</option>
// // // //           <option value="LAPTOP">Laptop</option>
// // // //           <option value="DESKTOP">Desktop</option>
// // // //           <option value="SERVER">Server</option> */}

// // // //           <option value="">All Types</option>
// // // // <option value="LAPTOP">Laptop</option>
// // // // <option value="DESKTOP">Desktop</option>
// // // // <option value="MOBILE">Mobile</option>
// // // // <option value="PRINTER">Printer</option>
// // // // <option value="SERVER">Server</option>
// // // // <option value="NETWORK_DEVICE">Network Device</option>
// // // // <option value="SOFTWARE">Software</option>
// // // // <option value="OTHERS">Others</option>
// // // // <option value="CCTV">CCTV</option>
// // // // <option value="COMPUTER">Computer</option>
// // // // <option value="EQUIPMENT">Equipment</option>
// // // // <option value="FIREWALL">Firewall</option>
// // // // <option value="INTANGIBLE">Intangible</option>
// // // // <option value="ASSETS">Assets</option>
// // // // <option value="IPAD">iPad</option>
// // // // <option value="KIOSK">Kiosk</option>
// // // // <option value="NETWORK">Network</option>
// // // // <option value="DEVICES">Devices</option>
// // // // <option value="PROJECTOR">Projector</option>
// // // // <option value="TAB">Tab</option>
// // // // <option value="TOUGHBOOK_ODIS">Toughbook ODIS</option>
// // // // <option value="UPS">UPS</option>
// // // // <option value="UPS_BATTERIES">UPS Batteries</option>
// // // // <option value="VEHICLES">Vehicles</option>
// // // // <option value="XENTRY_DIAGNOSTIC_DEVICE">Xentry Diagnostic Device</option>
// // // // <option value="NVR">NVR</option>
// // // // <option value="BATTERY">Battery</option>
// // // // <option value="DVR">DVR</option>
// // // // <option value="WIFI_CAMERA">WiFi Camera</option>
// // // // <option value="TV">TV</option>
// // // // <option value="DIGITAL_ELEMENTS">Digital Elements</option>
// // // //         </select>

// // // //         {/* Department */}
// // // //         <select
// // // //           value={selectedDepartment}
// // // //           onChange={(e) => {
// // // //             setCurrentPage(0);
// // // //             setSelectedDepartment(e.target.value);
// // // //           }}
// // // //           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
// // // //         >
// // // //           <option value="">All Departments</option>
// // // //           <option value="IT">IT</option>
// // // //           <option value="HR">HR</option>
// // // //           <option value="FINANCE">Finance</option>
// // // //         </select>

// // // //         {/* Site */}
// // // //         <select
// // // //           value={selectedSite}
// // // //           onChange={(e) => {
// // // //             setCurrentPage(0);
// // // //             setSelectedSite(e.target.value);
// // // //           }}
// // // //           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
// // // //         >
// // // //           <option value="">All Sites</option>
// // // //           {sites?.map((site) => (
// // // //             <option key={site.id} value={site.id}>
// // // //               {site.name}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         {/* Location */}
// // // //         <select
// // // //           value={selectedLocation}
// // // //           onChange={(e) => {
// // // //             setCurrentPage(0);
// // // //             setSelectedLocation(e.target.value);
// // // //           }}
// // // //           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
// // // //           disabled={!locations.length}
// // // //         >
// // // //           <option value="">All Locations</option>
// // // //           {locations.map((location) => (
// // // //             <option key={location.id} value={location.id}>
// // // //               {location.name}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         {/* Search */}
// // // //         <input
// // // //           type="text"
// // // //           placeholder="🔍 Search..."
// // // //           value={searchKeyword}
// // // //           onChange={(e) => {
// // // //             setCurrentPage(0);
// // // //             setSearchKeyword(e.target.value);
// // // //           }}
// // // //           className="border px-2 py-1 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-40 sm:w-48 text-sm"
// // // //         />

// // // //         {/* Download Button */}
// // // //         <button
// // // //           onClick={() =>
// // // //             exportAssetsExcel({
// // // //               status: selectedStatus,
// // // //               type: selectedType,
// // // //               department: selectedDepartment,
// // // //               createdBy,
// // // //               siteId: selectedSite,
// // // //               locationId: selectedLocation,
// // // //               purchaseStart: purchaseStartDate,
// // // //               purchaseEnd: purchaseEndDate,
// // // //               createdStart: createdStartDateTime,
// // // //               createdEnd: createdEndDateTime,
// // // //               keyword: searchKeyword,
// // // //             })
// // // //           }
// // // //           className="px-3 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 transition text-sm flex items-center gap-1"
// // // //         >
// // // //           📥 Excel
// // // //         </button>

// // // //         {/* Pagination */}
// // // //         <div className="flex items-center gap-2 text-sm">
// // // //           {/* Previous button */}
// // // //           <button
// // // //             onClick={() => {
// // // //               if (currentPage > 0) {
// // // //                 // only go back if not on first page
// // // //                 const newPage = currentPage - 1;
// // // //                 setCurrentPage(newPage);
// // // //                 loadAssets(newPage); // pass newPage to prevent async state issues
// // // //               }
// // // //             }}
// // // //             disabled={currentPage === 0}
// // // //             className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 
// // // //                disabled:opacity-50 disabled:cursor-not-allowed"
// // // //           >
// // // //             &lt;
// // // //           </button>

// // // //           <span className="text-sm text-gray-700">
// // // //             {paginationInfo.totalElements === 0
// // // //               ? "0 of 0   Total: 0"
// // // //               : `${currentPage + 1} of ${paginationInfo.totalPages}   Total: ${
// // // //                   paginationInfo.totalElements
// // // //                 }`}
// // // //           </span>

// // // //           {/* Next button */}
// // // //           <button
// // // //             onClick={() => {
// // // //               if (!paginationInfo.last) {
// // // //                 // only go forward if not on last page
// // // //                 const newPage = currentPage + 1;
// // // //                 setCurrentPage(newPage);
// // // //                 loadAssets(newPage); // pass newPage here too
// // // //               }
// // // //             }}
// // // //             disabled={paginationInfo.last}
// // // //             className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 
// // // //                disabled:opacity-50 disabled:cursor-not-allowed"
// // // //           >
// // // //             &gt;
// // // //           </button>
// // // //         </div>
// // // //         {/* <button
// // // //           onClick={() => navigate("/print/tags")}
// // // //           className="px-3 py-1 bg-purple-600 text-white rounded shadow-sm hover:bg-purple-700"
// // // //         >
// // // //           🖨️ Print Tags
// // // //         </button> */}

// // // //         <button
// // // //           onClick={handlePrintAllTags}
// // // //           className="px-3 py-1 bg-purple-600 text-white rounded shadow-sm hover:bg-purple-700"
// // // //         >
// // // //           🖨️ Print All Tags
// // // //         </button>
// // // //       </div>

// // // //       {/* === Data Table === */}
// // // //       <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
// // // //         <table className="min-w-full text-sm text-gray-700 border border-gray-300">
// // // //           <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white sticky top-0 z-10">
// // // //             <tr>
// // // //               {[
// // // //                 "Asset Tag",
// // // //                 "Status",
// // // //                 // "Name",
// // // //                 "Brand",
// // // //                 "Model",
// // // //                 "Department",
// // // //                 "Asset Type",
// // // //                 "Created By",
// // // //                 "Description",
// // // //                 "Serial No.",
// // // //                 "Purchase Date",
// // // //                 "Location",
// // // //                 "Assigned User",
// // // //                 "Status Note",
// // // //                 "Reservation Start",
// // // //                 "Reservation End",
// // // //                 "Actions",
// // // //               ].map((header, idx) => (
// // // //                 <th
// // // //                   key={idx}
// // // //                   className="px-3 py-2 border border-gray-300 text-left whitespace-nowrap"
// // // //                 >
// // // //                   {header}
// // // //                 </th>
// // // //               ))}
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody className="divide-y divide-gray-200">
// // // //             {assets.map((asset) => (
// // // //               <tr
// // // //                 key={asset.assetTag}
// // // //                 className="hover:bg-gray-50 transition-colors"
// // // //               >
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   <button
// // // //                     onClick={() => handleEdit(asset.assetTag)}
// // // //                     className="text-blue-500 hover:underline"
// // // //                   >
// // // //                     {asset.assetTag}
// // // //                   </button>
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   <span
// // // //                     className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // //                       asset.status === "Available"
// // // //                         ? "bg-green-100 text-green-700"
// // // //                         : asset.status === "Assigned"
// // // //                         ? "bg-red-100 text-red-700"
// // // //                         : "bg-gray-100 text-gray-700"
// // // //                     }`}
// // // //                   >
// // // //                     {asset.status}
// // // //                   </span>
// // // //                 </td>
// // // //                 {/* <td className="px-2 py-1 border max-w-[200px] truncate">
// // // //                   {asset.name}
// // // //                 </td> */}
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.brand}
// // // //                 </td>
// // // //                 <td className="px-2 py-1 border max-w-[200px] truncate">
// // // //                   {asset.model}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.department}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.assetType}
// // // //                 </td>
// // // //                 <td className="px-2 py-1 border max-w-[200px] truncate">
// // // //                   {asset.createdBy}
// // // //                 </td>
// // // //                 <td
// // // //                   className="px-2 py-1 border max-w-[200px] truncate"
// // // //                   title={asset.description}
// // // //                 >
// // // //                   {asset.description || "-"}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.serialNumber}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.purchaseDate}
// // // //                 </td>

// // // //                 <td className="px-2 py-1 border max-w-[200px] truncate">
// // // //                   {asset.locationName}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.assignedUserName}
// // // //                 </td>
// // // //                 <td
// // // //                   className="px-2 py-1 border max-w-[200px] truncate"
// // // //                   title={asset.statusNote}
// // // //                 >
// // // //                   {asset.statusNote || "-"}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.reservationStartDate}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300">
// // // //                   {asset.reservationEndDate}
// // // //                 </td>
// // // //                 <td className="px-3 py-2 border border-gray-300 text-center space-x-2">
// // // //                   <button
// // // //                     className="text-blue-500 hover:text-blue-700"
// // // //                     onClick={() => handleEdit(asset.assetTag)}
// // // //                   >
// // // //                     <FiEdit size={16} />
// // // //                   </button>
// // // //                   <button
// // // //                     className="text-red-500 hover:text-red-700"
// // // //                     onClick={() => handleDelete(asset.assetTag)}
// // // //                   >
// // // //                     <FiTrash2 size={16} />
// // // //                   </button>
// // // //                 </td>
// // // //               </tr>
// // // //             ))}

// // // //             {!loading && assets.length === 0 && (
// // // //               <tr>
// // // //                 <td
// // // //                   colSpan="17"
// // // //                   className="px-4 py-3 text-center text-gray-500 border border-gray-300"
// // // //                 >
// // // //                   No assets found.
// // // //                 </td>
// // // //               </tr>
// // // //             )}
// // // //             {loading && (
// // // //               <tr>
// // // //                 <td
// // // //                   colSpan="17"
// // // //                   className="px-4 py-3 text-center text-gray-500 border border-gray-300"
// // // //                 >
// // // //                   Loading...
// // // //                 </td>
// // // //               </tr>
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AssetList;







// import api, {
//   deleteAsset,
//   fetchAssets,
//   exportAssetsExcel,
//   getSites,
//   getLocationsBySite,
//   getAssetCodes,
// } from "../services/api";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { FiEdit, FiTrash2 } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Use ref to track if we're initializing from URL
//   const isInitialMount = useRef(true);
//   const isUpdatingFromURL = useRef(false);

//   // === Filters ===
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [createdBy, setCreatedBy] = useState("");
//   const [selectedSite, setSelectedSite] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [purchaseStartDate, setPurchaseStartDate] = useState("");
//   const [purchaseEndDate, setPurchaseEndDate] = useState("");
//   const [createdStartDateTime, setCreatedStartDateTime] = useState("");
//   const [createdEndDateTime, setCreatedEndDateTime] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [debouncedKeyword, setDebouncedKeyword] = useState("");
  
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedKeyword(searchKeyword), 400);
//     return () => clearTimeout(handler);
//   }, [searchKeyword]);

//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);

//   // === Pagination ===
//   const [currentPage, setCurrentPage] = useState(0);
//   const [paginationInfo, setPaginationInfo] = useState({
//     totalElements: 0,
//     totalPages: 0,
//     last: false,
//   });

//   const pageSize = 10;

//   // Function to read filters from URL
//   const getFiltersFromURL = useCallback(() => {
//     const params = new URLSearchParams(location.search);
    
//     return {
//       selectedStatus: params.get("status") || "",
//       selectedType: params.get("type") || "",
//       selectedDepartment: params.get("department") || "",
//       createdBy: params.get("createdBy") || "",
//       selectedSite: params.get("siteId") || "",
//       selectedLocation: params.get("locationId") || "",
//       purchaseStartDate: params.get("purchaseStart") || "",
//       purchaseEndDate: params.get("purchaseEnd") || "",
//       createdStartDateTime: params.get("createdStart") || "",
//       createdEndDateTime: params.get("createdEnd") || "",
//       searchKeyword: params.get("keyword") || "",
//       currentPage: parseInt(params.get("page")) || 0,
//     };
//   }, [location.search]);

//   // Load assets function
//   const loadAssets = useCallback(async (page, filters) => {
//     setLoading(true);
//     try {
//       const data = await fetchAssets({
//         status: filters?.selectedStatus || selectedStatus || undefined,
//         type: filters?.selectedType || selectedType || undefined,
//         department: filters?.selectedDepartment || selectedDepartment || undefined,
//         createdBy: filters?.createdBy || createdBy || undefined,
//         siteId: filters?.selectedSite || selectedSite || undefined,
//         locationId: filters?.selectedLocation || selectedLocation || undefined,
//         purchaseStart: filters?.purchaseStartDate || purchaseStartDate || undefined,
//         purchaseEnd: filters?.purchaseEndDate || purchaseEndDate || undefined,
//         createdStart: filters?.createdStartDateTime || createdStartDateTime || undefined,
//         createdEnd: filters?.createdEndDateTime || createdEndDateTime || undefined,
//         keyword: filters?.searchKeyword || debouncedKeyword || undefined,
//         page: page,
//         size: pageSize,
//       });

//       const {
//         content = [],
//         page: pageNumber,
//         totalElements,
//         totalPages,
//         last,
//       } = data || {};

//       setAssets(content);
//       setPaginationInfo({
//         totalPages,
//         totalElements,
//         last,
//         pageNumber,
//         size: pageSize,
//         currentCount: content.length,
//       });
      
//       setCurrentPage(pageNumber);
//     } catch (err) {
//       console.error("Error fetching assets:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     selectedStatus,
//     selectedType,
//     selectedDepartment,
//     createdBy,
//     selectedSite,
//     selectedLocation,
//     purchaseStartDate,
//     purchaseEndDate,
//     createdStartDateTime,
//     createdEndDateTime,
//     debouncedKeyword,
//     pageSize
//   ]);

//   // Initialize from URL and load data - THIS IS THE KEY FIX
//   useEffect(() => {
//     if (isInitialMount.current) {
//       const urlFilters = getFiltersFromURL();
      
//       // Set all filters from URL
//       setSelectedStatus(urlFilters.selectedStatus);
//       setSelectedType(urlFilters.selectedType);
//       setSelectedDepartment(urlFilters.selectedDepartment);
//       setCreatedBy(urlFilters.createdBy);
//       setSelectedSite(urlFilters.selectedSite);
//       setSelectedLocation(urlFilters.selectedLocation);
//       setPurchaseStartDate(urlFilters.purchaseStartDate);
//       setPurchaseEndDate(urlFilters.purchaseEndDate);
//       setCreatedStartDateTime(urlFilters.createdStartDateTime);
//       setCreatedEndDateTime(urlFilters.createdEndDateTime);
//       setSearchKeyword(urlFilters.searchKeyword);
      
//       // Load data with URL filters and page
//       const pageToLoad = urlFilters.currentPage;
//       setCurrentPage(pageToLoad);
      
//       // Load assets with the URL filters
//       const loadInitialData = async () => {
//         setLoading(true);
//         try {
//           const data = await fetchAssets({
//             status: urlFilters.selectedStatus || undefined,
//             type: urlFilters.selectedType || undefined,
//             department: urlFilters.selectedDepartment || undefined,
//             createdBy: urlFilters.createdBy || undefined,
//             siteId: urlFilters.selectedSite || undefined,
//             locationId: urlFilters.selectedLocation || undefined,
//             purchaseStart: urlFilters.purchaseStartDate || undefined,
//             purchaseEnd: urlFilters.purchaseEndDate || undefined,
//             createdStart: urlFilters.createdStartDateTime || undefined,
//             createdEnd: urlFilters.createdEndDateTime || undefined,
//             keyword: urlFilters.searchKeyword || undefined,
//             page: pageToLoad,
//             size: pageSize,
//           });

//           const {
//             content = [],
//             page: pageNumber,
//             totalElements,
//             totalPages,
//             last,
//           } = data || {};

//           setAssets(content);
//           setPaginationInfo({
//             totalPages,
//             totalElements,
//             last,
//             pageNumber,
//             size: pageSize,
//             currentCount: content.length,
//           });
//           setCurrentPage(pageNumber);
//         } catch (err) {
//           console.error("Error fetching assets:", err);
//         } finally {
//           setLoading(false);
//           isInitialMount.current = false;
//         }
//       };
      
//       loadInitialData();
//     }
//   }, [getFiltersFromURL, pageSize]);

//   // Load sites on mount
//   useEffect(() => {
//     getSites()
//       .then((sitesData) => {
//         setSites(sitesData);
//       })
//       .catch((err) => {
//         console.error("Error loading sites", err);
//       });
//   }, []);

//   // Fetch locations whenever the selected site changes
//   useEffect(() => {
//     if (selectedSite) {
//       getLocationsBySite(selectedSite)
//         .then((locationsData) => {
//           setLocations(locationsData);
//         })
//         .catch((err) => {
//           console.error("Error loading locations", err);
//           setLocations([]);
//         });
//     } else {
//       setLocations([]);
//     }
//   }, [selectedSite]);

//   // Load assets when filters change (after initial mount)
//   useEffect(() => {
//     if (!isInitialMount.current) {
//       // Reset to page 0 when filters change
//       setCurrentPage(0);
//       loadAssets(0);
//     }
//   }, [
//     selectedStatus,
//     selectedType,
//     selectedDepartment,
//     createdBy,
//     selectedSite,
//     selectedLocation,
//     purchaseStartDate,
//     purchaseEndDate,
//     createdStartDateTime,
//     createdEndDateTime,
//     debouncedKeyword,
//     loadAssets
//   ]);

//   // Handle page changes separately
//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < paginationInfo.totalPages && !loading && !isInitialMount.current) {
//       setCurrentPage(newPage);
//       loadAssets(newPage);
//     }
//   };

//   // Update URL when filters or page changes (after initial mount)
//   useEffect(() => {
//     if (!isInitialMount.current) {
//       const timeoutId = setTimeout(() => {
//         const params = new URLSearchParams();
        
//         if (selectedStatus) params.set("status", selectedStatus);
//         if (selectedType) params.set("type", selectedType);
//         if (selectedDepartment) params.set("department", selectedDepartment);
//         if (createdBy) params.set("createdBy", createdBy);
//         if (selectedSite) params.set("siteId", selectedSite);
//         if (selectedLocation) params.set("locationId", selectedLocation);
//         if (purchaseStartDate) params.set("purchaseStart", purchaseStartDate);
//         if (purchaseEndDate) params.set("purchaseEnd", purchaseEndDate);
//         if (createdStartDateTime) params.set("createdStart", createdStartDateTime);
//         if (createdEndDateTime) params.set("createdEnd", createdEndDateTime);
//         if (searchKeyword) params.set("keyword", searchKeyword);
//         if (currentPage > 0) params.set("page", currentPage.toString());
        
//         const newUrl = `${location.pathname}?${params.toString()}`;
//         const currentUrl = `${location.pathname}${location.search}`;
        
//         if (newUrl !== currentUrl) {
//           navigate(newUrl, { replace: true });
//         }
//       }, 300);
      
//       return () => clearTimeout(timeoutId);
//     }
//   }, [
//     selectedStatus,
//     selectedType,
//     selectedDepartment,
//     createdBy,
//     selectedSite,
//     selectedLocation,
//     purchaseStartDate,
//     purchaseEndDate,
//     createdStartDateTime,
//     createdEndDateTime,
//     searchKeyword,
//     currentPage,
//     location.pathname,
//     location.search,
//     navigate
//   ]);

//   const handleDelete = async (assetTag) => {
//     if (window.confirm("Are you sure you want to delete this asset? " + assetTag)) {
//       try {
//         await deleteAsset(assetTag);
//         // Reload current page after deletion
//         loadAssets(currentPage);
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//       }
//     }
//   };

//   const handlePrintAllTags = async () => {
//     try {
//       const tagList = await Promise.all(
//         assets.map((asset) => getAssetCodes(asset.assetTag))
//       );
//       navigate("/print/tags", {
//         state: { tags: tagList },
//       });
//     } catch (error) {
//       console.error("Error generating print tags", error);
//     }
//   };

//   const handleEdit = (assetTag) => {
//     navigate(`/asset/${assetTag}`, {
//       state: { returnUrl: location.pathname + location.search }
//     });
//   };

//   const handleExport = () => {
//     exportAssetsExcel({
//       status: selectedStatus,
//       type: selectedType,
//       department: selectedDepartment,
//       createdBy,
//       siteId: selectedSite,
//       locationId: selectedLocation,
//       purchaseStart: purchaseStartDate,
//       purchaseEnd: purchaseEndDate,
//       createdStart: createdStartDateTime,
//       createdEnd: createdEndDateTime,
//       keyword: searchKeyword,
//     });
//   };

//   // Reset all filters
//   const handleResetFilters = () => {
//     setSelectedStatus("");
//     setSelectedType("");
//     setSelectedDepartment("");
//     setCreatedBy("");
//     setSelectedSite("");
//     setSelectedLocation("");
//     setPurchaseStartDate("");
//     setPurchaseEndDate("");
//     setCreatedStartDateTime("");
//     setCreatedEndDateTime("");
//     setSearchKeyword("");
//     setCurrentPage(0);
//     loadAssets(0);
//   };

//   return (
//     <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
//         {/* Status */}
//         <select
//           value={selectedStatus}
//           onChange={(e) => {
//             setSelectedStatus(e.target.value);
//           }}
//           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition text-sm"
//         >
//           <option value="">All Status</option>
//           <option value="AVAILABLE">Available</option>
//           <option value="CHECKED_OUT">Checked Out</option>
//           <option value="IN_REPAIR">In Repair</option>
//           <option value="LOST">Lost</option>
//           <option value="DISPOSED">Disposed</option>
//           <option value="DELETED">Deleted</option>
//           <option value="UAP">UAP</option>
//         </select>

//         {/* Type */}
//         <select
//           value={selectedType}
//           onChange={(e) => {
//             setSelectedType(e.target.value);
//           }}
//           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
//         >
//           <option value="">All Types</option>
//           <option value="LAPTOP">Laptop</option>
//           <option value="DESKTOP">Desktop</option>
//           <option value="MOBILE">Mobile</option>
//           <option value="PRINTER">Printer</option>
//           <option value="SERVER">Server</option>
//           <option value="NETWORK_DEVICE">Network Device</option>
//           <option value="SOFTWARE">Software</option>
//           <option value="OTHERS">Others</option>
//           <option value="CCTV">CCTV</option>
//           <option value="COMPUTER">Computer</option>
//           <option value="EQUIPMENT">Equipment</option>
//           <option value="FIREWALL">Firewall</option>
//           <option value="INTANGIBLE">Intangible</option>
//           <option value="ASSETS">Assets</option>
//           <option value="IPAD">iPad</option>
//           <option value="KIOSK">Kiosk</option>
//           <option value="NETWORK">Network</option>
//           <option value="DEVICES">Devices</option>
//           <option value="PROJECTOR">Projector</option>
//           <option value="TAB">Tab</option>
//           <option value="TOUGHBOOK_ODIS">Toughbook ODIS</option>
//           <option value="UPS">UPS</option>
//           <option value="UPS_BATTERIES">UPS Batteries</option>
//           <option value="VEHICLES">Vehicles</option>
//           <option value="XENTRY_DIAGNOSTIC_DEVICE">Xentry Diagnostic Device</option>
//           <option value="NVR">NVR</option>
//           <option value="BATTERY">Battery</option>
//           <option value="DVR">DVR</option>
//           <option value="WIFI_CAMERA">WiFi Camera</option>
//           <option value="TV">TV</option>
//           <option value="DIGITAL_ELEMENTS">Digital Elements</option>
//         </select>

//         {/* Department */}
//         <select
//           value={selectedDepartment}
//           onChange={(e) => {
//             setSelectedDepartment(e.target.value);
//           }}
//           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
//         >
//           <option value="">All Departments</option>
//           <option value="IT">IT</option>
//           <option value="HR">HR</option>
//           <option value="FINANCE">Finance</option>
//         </select>

//         {/* Site */}
//         <select
//           value={selectedSite}
//           onChange={(e) => {
//             setSelectedSite(e.target.value);
//           }}
//           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
//         >
//           <option value="">All Sites</option>
//           {sites?.map((site) => (
//             <option key={site.id} value={site.id}>
//               {site.name}
//             </option>
//           ))}
//         </select>

//         {/* Location */}
//         <select
//           value={selectedLocation}
//           onChange={(e) => {
//             setSelectedLocation(e.target.value);
//           }}
//           className="border px-2 py-1 rounded shadow-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
//           disabled={!locations.length}
//         >
//           <option value="">All Locations</option>
//           {locations.map((location) => (
//             <option key={location.id} value={location.id}>
//               {location.name}
//             </option>
//           ))}
//         </select>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="🔍 Search..."
//           value={searchKeyword}
//           onChange={(e) => {
//             setSearchKeyword(e.target.value);
//           }}
//           className="border px-2 py-1 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-40 sm:w-48 text-sm"
//         />

//         {/* Reset Filters Button */}
//         <button
//           onClick={handleResetFilters}
//           className="px-3 py-1 bg-gray-500 text-white rounded shadow-sm hover:bg-gray-600 transition text-sm"
//         >
//           🔄 Reset Filters
//         </button>

//         {/* Download Button */}
//         <button
//           onClick={handleExport}
//           className="px-3 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 transition text-sm flex items-center gap-1"
//         >
//           📥 Excel
//         </button>

//         {/* Pagination */}
//         <div className="flex items-center gap-2 text-sm">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 0 || loading}
//             className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 
//                disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             &lt;
//           </button>

//           <span className="text-sm text-gray-700">
//             {paginationInfo.totalElements === 0
//               ? "0 of 0   Total: 0"
//               : `${currentPage + 1} of ${paginationInfo.totalPages}   Total: ${
//                   paginationInfo.totalElements
//                 }`}
//           </span>

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={paginationInfo.last || loading}
//             className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 
//                disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             &gt;
//           </button>
//         </div>

//         <button
//           onClick={handlePrintAllTags}
//           className="px-3 py-1 bg-purple-600 text-white rounded shadow-sm hover:bg-purple-700"
//         >
//           🖨️ Print All Tags
//         </button>
//       </div>

//       {/* === Data Table === */}
//       <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
//         <table className="min-w-full text-sm text-gray-700 border border-gray-300">
//           <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white sticky top-0 z-10">
//             <tr>
//               {[
//                 "Asset Tag",
//                 "Status",
//                 "Brand",
//                 "Model",
//                 "Department",
//                 "Asset Type",
//                 "Created By",
//                 "Description",
//                 "Serial No.",
//                 "Purchase Date",
//                 "Location",
//                 "Assigned User",
//                 "Status Note",
//                 "Reservation Start",
//                 "Reservation End",
//                 "Actions",
//               ].map((header, idx) => (
//                 <th
//                   key={idx}
//                   className="px-3 py-2 border border-gray-300 text-left whitespace-nowrap"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {assets.map((asset) => (
//               <tr
//                 key={asset.assetTag}
//                 className="hover:bg-gray-50 transition-colors"
//               >
//                 <td className="px-3 py-2 border border-gray-300">
//                   <button
//                     onClick={() => handleEdit(asset.assetTag)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     {asset.assetTag}
//                   </button>
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       asset.status === "Available"
//                         ? "bg-green-100 text-green-700"
//                         : asset.status === "Assigned"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {asset.status}
//                   </span>
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.brand}
//                 </td>
//                 <td className="px-2 py-1 border max-w-[200px] truncate">
//                   {asset.model}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.department}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.assetType}
//                 </td>
//                 <td className="px-2 py-1 border max-w-[200px] truncate">
//                   {asset.createdBy}
//                 </td>
//                 <td
//                   className="px-2 py-1 border max-w-[200px] truncate"
//                   title={asset.description}
//                 >
//                   {asset.description || "-"}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.serialNumber}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.purchaseDate}
//                 </td>
//                 <td className="px-2 py-1 border max-w-[200px] truncate">
//                   {asset.locationName}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.assignedUserName}
//                 </td>
//                 <td
//                   className="px-2 py-1 border max-w-[200px] truncate"
//                   title={asset.statusNote}
//                 >
//                   {asset.statusNote || "-"}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.reservationStartDate}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300">
//                   {asset.reservationEndDate}
//                 </td>
//                 <td className="px-3 py-2 border border-gray-300 text-center space-x-2">
//                   <button
//                     className="text-blue-500 hover:text-blue-700"
//                     onClick={() => handleEdit(asset.assetTag)}
//                   >
//                     <FiEdit size={16} />
//                   </button>
//                   <button
//                     className="text-red-500 hover:text-red-700"
//                     onClick={() => handleDelete(asset.assetTag)}
//                   >
//                     <FiTrash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {!loading && assets.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="16"
//                   className="px-4 py-3 text-center text-gray-500 border border-gray-300"
//                 >
//                   No assets found.
//                 </td>
//               </tr>
//             )}
//             {loading && (
//               <tr>
//                 <td
//                   colSpan="16"
//                   className="px-4 py-3 text-center text-gray-500 border border-gray-300"
//                 >
//                   Loading...
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssetList;


// import api, {
//   deleteAsset,
//   fetchAssets,
//   exportAssetsExcel,
//   getSites,
//   getLocationsBySite,
//   getAssetCodes,
// } from "../services/api";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { FiEdit, FiTrash2 } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";
// import PageContainer from "../components/PageContainer";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Use ref to track if we're initializing from URL
//   const isInitialMount = useRef(true);

//   // === Filters ===
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [createdBy, setCreatedBy] = useState("");
//   const [selectedSite, setSelectedSite] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [purchaseStartDate, setPurchaseStartDate] = useState("");
//   const [purchaseEndDate, setPurchaseEndDate] = useState("");
//   const [createdStartDateTime, setCreatedStartDateTime] = useState("");
//   const [createdEndDateTime, setCreatedEndDateTime] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [debouncedKeyword, setDebouncedKeyword] = useState("");
  
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedKeyword(searchKeyword), 400);
//     return () => clearTimeout(handler);
//   }, [searchKeyword]);

//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);

//   // === Pagination ===
//   const [currentPage, setCurrentPage] = useState(0);
//   const [paginationInfo, setPaginationInfo] = useState({
//     totalElements: 0,
//     totalPages: 0,
//     last: false,
//   });

//   const pageSize = 10;

//   // Function to read filters from URL
//   const getFiltersFromURL = useCallback(() => {
//     const params = new URLSearchParams(location.search);
    
//     return {
//       selectedStatus: params.get("status") || "",
//       selectedType: params.get("type") || "",
//       selectedDepartment: params.get("department") || "",
//       createdBy: params.get("createdBy") || "",
//       selectedSite: params.get("siteId") || "",
//       selectedLocation: params.get("locationId") || "",
//       purchaseStartDate: params.get("purchaseStart") || "",
//       purchaseEndDate: params.get("purchaseEnd") || "",
//       createdStartDateTime: params.get("createdStart") || "",
//       createdEndDateTime: params.get("createdEnd") || "",
//       searchKeyword: params.get("keyword") || "",
//       currentPage: parseInt(params.get("page")) || 0,
//     };
//   }, [location.search]);

//   // Load assets function
//   const loadAssets = useCallback(async (page, filters = null) => {
//     setLoading(true);
//     try {
//       const data = await fetchAssets({
//         status: filters?.selectedStatus || selectedStatus || undefined,
//         type: filters?.selectedType || selectedType || undefined,
//         department: filters?.selectedDepartment || selectedDepartment || undefined,
//         createdBy: filters?.createdBy || createdBy || undefined,
//         siteId: filters?.selectedSite || selectedSite || undefined,
//         locationId: filters?.selectedLocation || selectedLocation || undefined,
//         purchaseStart: filters?.purchaseStartDate || purchaseStartDate || undefined,
//         purchaseEnd: filters?.purchaseEndDate || purchaseEndDate || undefined,
//         createdStart: filters?.createdStartDateTime || createdStartDateTime || undefined,
//         createdEnd: filters?.createdEndDateTime || createdEndDateTime || undefined,
//         keyword: filters?.searchKeyword || debouncedKeyword || undefined,
//         page: page,
//         size: pageSize,
//       });

//       const {
//         content = [],
//         page: pageNumber,
//         totalElements,
//         totalPages,
//         last,
//       } = data || {};

//       setAssets(content);
//       setPaginationInfo({
//         totalPages,
//         totalElements,
//         last,
//         pageNumber,
//         size: pageSize,
//         currentCount: content.length,
//       });
      
//       setCurrentPage(pageNumber);
//     } catch (err) {
//       console.error("Error fetching assets:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     selectedStatus,
//     selectedType,
//     selectedDepartment,
//     createdBy,
//     selectedSite,
//     selectedLocation,
//     purchaseStartDate,
//     purchaseEndDate,
//     createdStartDateTime,
//     createdEndDateTime,
//     debouncedKeyword,
//     pageSize
//   ]);

//   // Initialize from URL and load data
//   useEffect(() => {
//     if (isInitialMount.current) {
//       const urlFilters = getFiltersFromURL();
      
//       // Set all filters from URL
//       setSelectedStatus(urlFilters.selectedStatus);
//       setSelectedType(urlFilters.selectedType);
//       setSelectedDepartment(urlFilters.selectedDepartment);
//       setCreatedBy(urlFilters.createdBy);
//       setSelectedSite(urlFilters.selectedSite);
//       setSelectedLocation(urlFilters.selectedLocation);
//       setPurchaseStartDate(urlFilters.purchaseStartDate);
//       setPurchaseEndDate(urlFilters.purchaseEndDate);
//       setCreatedStartDateTime(urlFilters.createdStartDateTime);
//       setCreatedEndDateTime(urlFilters.createdEndDateTime);
//       setSearchKeyword(urlFilters.searchKeyword);
      
//       // Load data with URL filters and page
//       const pageToLoad = urlFilters.currentPage;
//       setCurrentPage(pageToLoad);
      
//       // Load assets with the URL filters
//       const loadInitialData = async () => {
//         setLoading(true);
//         try {
//           const data = await fetchAssets({
//             status: urlFilters.selectedStatus || undefined,
//             type: urlFilters.selectedType || undefined,
//             department: urlFilters.selectedDepartment || undefined,
//             createdBy: urlFilters.createdBy || undefined,
//             siteId: urlFilters.selectedSite || undefined,
//             locationId: urlFilters.selectedLocation || undefined,
//             purchaseStart: urlFilters.purchaseStartDate || undefined,
//             purchaseEnd: urlFilters.purchaseEndDate || undefined,
//             createdStart: urlFilters.createdStartDateTime || undefined,
//             createdEnd: urlFilters.createdEndDateTime || undefined,
//             keyword: urlFilters.searchKeyword || undefined,
//             page: pageToLoad,
//             size: pageSize,
//           });

//           const {
//             content = [],
//             page: pageNumber,
//             totalElements,
//             totalPages,
//             last,
//           } = data || {};

//           setAssets(content);
//           setPaginationInfo({
//             totalPages,
//             totalElements,
//             last,
//             pageNumber,
//             size: pageSize,
//             currentCount: content.length,
//           });
//           setCurrentPage(pageNumber);
//         } catch (err) {
//           console.error("Error fetching assets:", err);
//         } finally {
//           setLoading(false);
//           isInitialMount.current = false;
//         }
//       };
      
//       loadInitialData();
//     }
//   }, [getFiltersFromURL, pageSize]);

//   // Load sites on mount
//   useEffect(() => {
//     getSites()
//       .then((sitesData) => {
//         setSites(sitesData);
//       })
//       .catch((err) => {
//         console.error("Error loading sites", err);
//       });
//   }, []);

//   // Fetch locations whenever the selected site changes
//   useEffect(() => {
//     if (selectedSite) {
//       getLocationsBySite(selectedSite)
//         .then((locationsData) => {
//           setLocations(locationsData);
//         })
//         .catch((err) => {
//           console.error("Error loading locations", err);
//           setLocations([]);
//         });
//     } else {
//       setLocations([]);
//     }
//   }, [selectedSite]);

//   // Load assets when filters change (after initial mount)
//   useEffect(() => {
//     if (!isInitialMount.current) {
//       setCurrentPage(0);
//       loadAssets(0);
//     }
//   }, [
//     selectedStatus,
//     selectedType,
//     selectedDepartment,
//     createdBy,
//     selectedSite,
//     selectedLocation,
//     purchaseStartDate,
//     purchaseEndDate,
//     createdStartDateTime,
//     createdEndDateTime,
//     debouncedKeyword,
//     loadAssets
//   ]);

//   // Handle page changes separately
//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < paginationInfo.totalPages && !loading && !isInitialMount.current) {
//       setCurrentPage(newPage);
//       loadAssets(newPage);
//     }
//   };

//   // Update URL when filters or page changes (after initial mount)
//   useEffect(() => {
//     if (!isInitialMount.current) {
//       const timeoutId = setTimeout(() => {
//         const params = new URLSearchParams();
        
//         if (selectedStatus) params.set("status", selectedStatus);
//         if (selectedType) params.set("type", selectedType);
//         if (selectedDepartment) params.set("department", selectedDepartment);
//         if (createdBy) params.set("createdBy", createdBy);
//         if (selectedSite) params.set("siteId", selectedSite);
//         if (selectedLocation) params.set("locationId", selectedLocation);
//         if (purchaseStartDate) params.set("purchaseStart", purchaseStartDate);
//         if (purchaseEndDate) params.set("purchaseEnd", purchaseEndDate);
//         if (createdStartDateTime) params.set("createdStart", createdStartDateTime);
//         if (createdEndDateTime) params.set("createdEnd", createdEndDateTime);
//         if (searchKeyword) params.set("keyword", searchKeyword);
//         if (currentPage > 0) params.set("page", currentPage.toString());
        
//         const newUrl = `${location.pathname}?${params.toString()}`;
//         const currentUrl = `${location.pathname}${location.search}`;
        
//         if (newUrl !== currentUrl) {
//           navigate(newUrl, { replace: true });
//         }
//       }, 300);
      
//       return () => clearTimeout(timeoutId);
//     }
//   }, [
//     selectedStatus,
//     selectedType,
//     selectedDepartment,
//     createdBy,
//     selectedSite,
//     selectedLocation,
//     purchaseStartDate,
//     purchaseEndDate,
//     createdStartDateTime,
//     createdEndDateTime,
//     searchKeyword,
//     currentPage,
//     location.pathname,
//     location.search,
//     navigate
//   ]);

//   const handleDelete = async (assetTag) => {
//     if (window.confirm("Are you sure you want to delete this asset? " + assetTag)) {
//       try {
//         await deleteAsset(assetTag);
//         loadAssets(currentPage);
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//       }
//     }
//   };

//   const handlePrintAllTags = async () => {
//     try {
//       const tagList = await Promise.all(
//         assets.map((asset) => getAssetCodes(asset.assetTag))
//       );
//       navigate("/print/tags", {
//         state: { tags: tagList },
//       });
//     } catch (error) {
//       console.error("Error generating print tags", error);
//     }
//   };

//   const handleEdit = (assetTag) => {
//     navigate(`/asset/${assetTag}`, {
//       state: { returnUrl: location.pathname + location.search }
//     });
//   };

//   const handleExport = () => {
//     exportAssetsExcel({
//       status: selectedStatus,
//       type: selectedType,
//       department: selectedDepartment,
//       createdBy,
//       siteId: selectedSite,
//       locationId: selectedLocation,
//       purchaseStart: purchaseStartDate,
//       purchaseEnd: purchaseEndDate,
//       createdStart: createdStartDateTime,
//       createdEnd: createdEndDateTime,
//       keyword: searchKeyword,
//     });
//   };

//   // Reset all filters
//   const handleResetFilters = () => {
//     setSelectedStatus("");
//     setSelectedType("");
//     setSelectedDepartment("");
//     setCreatedBy("");
//     setSelectedSite("");
//     setSelectedLocation("");
//     setPurchaseStartDate("");
//     setPurchaseEndDate("");
//     setCreatedStartDateTime("");
//     setCreatedEndDateTime("");
//     setSearchKeyword("");
//     setCurrentPage(0);
//     loadAssets(0);
//   };

//   return (
//     <PageContainer title="Assets Management">
//       {/* Filters Section */}
//       <div className="mb-4 space-y-3">
//         {/* First row of filters */}
//         <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
//           <select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="col-span-1 border px-2 py-2 rounded text-sm"
//           >
//             <option value="">All Status</option>
//             <option value="AVAILABLE">Available</option>
//             <option value="CHECKED_OUT">Checked Out</option>
//             <option value="IN_REPAIR">In Repair</option>
//             <option value="LOST">Lost</option>
//             <option value="DISPOSED">Disposed</option>
//             <option value="DELETED">Deleted</option>
//             <option value="UAP">UAP</option>
//           </select>

//           <select
//             value={selectedType}
//             onChange={(e) => setSelectedType(e.target.value)}
//             className="col-span-1 border px-2 py-2 rounded text-sm"
//           >
//             <option value="">All Types</option>
//             <option value="LAPTOP">Laptop</option>
//             <option value="DESKTOP">Desktop</option>
//             <option value="MOBILE">Mobile</option>
//             <option value="PRINTER">Printer</option>
//             <option value="SERVER">Server</option>
//             <option value="NETWORK_DEVICE">Network Device</option>
//             <option value="SOFTWARE">Software</option>
//             <option value="OTHERS">Others</option>
//             <option value="CCTV">CCTV</option>
//             <option value="COMPUTER">Computer</option>
//             <option value="EQUIPMENT">Equipment</option>
//             <option value="FIREWALL">Firewall</option>
//             <option value="INTANGIBLE">Intangible</option>
//             <option value="ASSETS">Assets</option>
//             <option value="IPAD">iPad</option>
//             <option value="KIOSK">Kiosk</option>
//             <option value="NETWORK">Network</option>
//             <option value="DEVICES">Devices</option>
//             <option value="PROJECTOR">Projector</option>
//             <option value="TAB">Tab</option>
//             <option value="TOUGHBOOK_ODIS">Toughbook ODIS</option>
//             <option value="UPS">UPS</option>
//             <option value="UPS_BATTERIES">UPS Batteries</option>
//             <option value="VEHICLES">Vehicles</option>
//             <option value="XENTRY_DIAGNOSTIC_DEVICE">Xentry Diagnostic Device</option>
//             <option value="NVR">NVR</option>
//             <option value="BATTERY">Battery</option>
//             <option value="DVR">DVR</option>
//             <option value="WIFI_CAMERA">WiFi Camera</option>
//             <option value="TV">TV</option>
//             <option value="DIGITAL_ELEMENTS">Digital Elements</option>
//           </select>

//           <select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//             className="col-span-1 border px-2 py-2 rounded text-sm"
//           >
//             <option value="">All Departments</option>
//             <option value="IT">IT</option>
//             <option value="HR">HR</option>
//             <option value="FINANCE">Finance</option>
//           </select>

//           <select
//             value={selectedSite}
//             onChange={(e) => setSelectedSite(e.target.value)}
//             className="col-span-1 border px-2 py-2 rounded text-sm"
//           >
//             <option value="">All Sites</option>
//             {sites?.map((site) => (
//               <option key={site.id} value={site.id}>
//                 {site.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Second row */}
//         <div className="flex flex-wrap gap-2">
//           <select
//             value={selectedLocation}
//             onChange={(e) => setSelectedLocation(e.target.value)}
//             className="flex-1 sm:flex-none border px-2 py-2 rounded text-sm"
//             disabled={!locations.length}
//           >
//             <option value="">All Locations</option>
//             {locations.map((location) => (
//               <option key={location.id} value={location.id}>
//                 {location.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             placeholder="🔍 Search by keyword..."
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//             className="flex-1 sm:w-64 border px-3 py-2 rounded text-sm"
//           />

//           <button
//             onClick={handleResetFilters}
//             className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
//           >
//             🔄 Reset
//           </button>

//           <button
//             onClick={handleExport}
//             className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
//           >
//             📥 Export Excel
//           </button>

//           <button
//             onClick={handlePrintAllTags}
//             className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
//           >
//             🖨️ Print Tags
//           </button>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 0 || loading}
//               className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm"
//             >
//               ← Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage + 1} of {paginationInfo.totalPages || 1}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={paginationInfo.last || loading}
//               className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm"
//             >
//               Next →
//             </button>
//           </div>
//           <div className="text-sm text-gray-600">
//             Total: {paginationInfo.totalElements} items
//           </div>
//         </div>
//       </div>

//       {/* Responsive Table with Horizontal Scroll */}
//       <div className="overflow-x-auto -mx-2 sm:mx-0 rounded-lg border border-gray-200">
//         <div className="min-w-[800px] md:min-w-full">
//           <table className="w-full text-sm text-gray-700">
//             <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
//               <tr>
//                 {[
//                   "Asset Tag", "Status", "Brand", "Model", "Department",
//                   "Asset Type", "Created By", "Description", "Serial No.",
//                   "Purchase Date", "Location", "Assigned User", "Actions",
//                 ].map((header, idx) => (
//                   <th key={idx} className="px-3 py-2 border border-blue-400 text-left whitespace-nowrap">
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {assets.map((asset) => (
//                 <tr key={asset.assetTag} className="hover:bg-gray-50">
//                   <td className="px-3 py-2 border border-gray-200">
//                     <button
//                       onClick={() => handleEdit(asset.assetTag)}
//                       className="text-blue-600 hover:underline font-medium"
//                     >
//                       {asset.assetTag}
//                     </button>
//                   </td>
//                   <td className="px-3 py-2 border border-gray-200">
//                     <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
//                       asset.status === "AVAILABLE" ? "bg-green-100 text-green-700" :
//                       asset.status === "CHECKED_OUT" ? "bg-red-100 text-red-700" :
//                       "bg-gray-100 text-gray-700"
//                     }`}>
//                       {asset.status}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.brand}</td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.model}</td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.department}</td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.assetType}</td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.createdBy}</td>
//                   <td className="px-3 py-2 border border-gray-200 max-w-[150px] truncate" title={asset.description}>
//                     {asset.description || "-"}
//                   </td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.serialNumber}</td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.purchaseDate}</td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.locationName}</td>
//                   <td className="px-3 py-2 border border-gray-200">{asset.assignedUserName || "-"}</td>
//                   <td className="px-3 py-2 border border-gray-200 whitespace-nowrap">
//                     <button
//                       onClick={() => handleEdit(asset.assetTag)}
//                       className="text-blue-600 hover:text-blue-800 mr-3"
//                       title="Edit"
//                     >
//                       <FiEdit size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(asset.assetTag)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete"
//                     >
//                       <FiTrash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
              
//               {!loading && assets.length === 0 && (
//                 <tr>
//                   <td colSpan="13" className="px-4 py-8 text-center text-gray-500">
//                     No assets found. Try adjusting your filters.
//                   </td>
//                 </tr>
//               )}
              
//               {loading && (
//                 <tr>
//                   <td colSpan="13" className="px-4 py-8 text-center text-gray-500">
//                     <div className="loading-shimmer h-8 rounded"></div>
//                     Loading assets...
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </PageContainer>
//   );
// };

// export default AssetList;



import api, {
  deleteAsset,
  fetchAssets,
  exportAssetsExcel,
  getSites,
  getLocationsBySite,
  getAssetCodes,
} from "../services/api";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiEdit, FiTrash2, FiRefreshCw, FiDownload, FiPrinter, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialMount = useRef(true);

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
      // const data = await fetchAssets({
      //   status: filters?.selectedStatus ?? selectedStatus || undefined,
      //   type: filters?.selectedType ?? selectedType || undefined,
      //   department: filters?.selectedDepartment ?? selectedDepartment || undefined,
      //   // createdBy: filters?.createdBy ?? createdBy || undefined,
      //   createdBy: (filters?.createdBy ?? createdBy) || undefined,
      //   siteId: filters?.selectedSite ?? selectedSite || undefined,
      //   locationId: filters?.selectedLocation ?? selectedLocation || undefined,
      //   purchaseStart: filters?.purchaseStartDate ?? purchaseStartDate || undefined,
      //   purchaseEnd: filters?.purchaseEndDate ?? purchaseEndDate || undefined,
      //   createdStart: filters?.createdStartDateTime ?? createdStartDateTime || undefined,
      //   createdEnd: filters?.createdEndDateTime ?? createdEndDateTime || undefined,
      //   keyword: filters?.searchKeyword ?? debouncedKeyword || undefined,
      //   page,
      //   size: size ?? pageSize,
      // });

      const data = await fetchAssets({
      // ✅ All mixed operators are now grouped with parentheses
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
      size: size ?? pageSize, // This line was fine because it doesn't use ||
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
        .page-btn { padding: 5px 10px; border-radius: 7px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-size: 12px; color: #374151; transition: all 0.15s; display: inline-flex; align-items: center; gap: 3px; }
        .page-btn:hover:not(:disabled) { background: #3b82f6; color: white; border-color: #3b82f6; }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .shimmer { background: linear-gradient(90deg, #f0f4ff 25%, #e8eeff 50%, #f0f4ff 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .table-header-cell { background: linear-gradient(135deg, #1d4ed8, #2563eb); }
        .row-hover:hover { background-color: #f8faff !important; }
      `}</style>

      {/* ===== FILTER BAR ===== */}
      <div className="filters-bar rounded-xl border border-blue-100 p-3 mb-4 shadow-sm">
        {/* All filters in one scrollable row for desktop */}
        <div className="flex flex-wrap gap-2 items-center">

          {/* Status */}
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

          {/* Type */}
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className={selectClass} style={{ minWidth: 110 }}>
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

          {/* Department */}
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className={selectClass} style={{ minWidth: 110 }}>
            <option value="">All Depts</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="FINANCE">Finance</option>
          </select>

          {/* Site */}
          <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)} className={selectClass} style={{ minWidth: 110 }}>
            <option value="">All Sites</option>
            {sites?.map((site) => (
              <option key={site.id} value={site.id}>{site.name}</option>
            ))}
          </select>

          {/* Location */}
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className={selectClass} style={{ minWidth: 110 }} disabled={!locations.length}>
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>

          {/* Purchase Date Range */}
          {/* <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 font-medium">Purchase:</span>
            <input type="date" value={purchaseStartDate} onChange={(e) => setPurchaseStartDate(e.target.value)} className={inputClass} style={{ maxWidth: 125 }} title="Purchase From" />
            <span className="text-gray-300 text-xs">–</span>
            <input type="date" value={purchaseEndDate} onChange={(e) => setPurchaseEndDate(e.target.value)} className={inputClass} style={{ maxWidth: 125 }} title="Purchase To" />
          </div> */}

          {/* Created Date Range */}
          {/* <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 font-medium">Created:</span>
            <input type="datetime-local" value={createdStartDateTime} onChange={(e) => setCreatedStartDateTime(e.target.value)} className={inputClass} style={{ maxWidth: 145 }} title="Created From" />
            <span className="text-gray-300 text-xs">–</span>
            <input type="datetime-local" value={createdEndDateTime} onChange={(e) => setCreatedEndDateTime(e.target.value)} className={inputClass} style={{ maxWidth: 145 }} title="Created To" />
          </div> */}

          {/* Search */}
          <div className="relative flex items-center">
            <FiSearch className="absolute left-2 text-gray-400" size={12} />
            <input
              type="text"
              placeholder="Search keyword..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className={inputClass + " pl-6"}
              style={{ minWidth: 150 }}
            />
          </div>

          {/* Created By */}
          <input
            type="text"
            placeholder="Created by..."
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className={inputClass}
            style={{ minWidth: 110 }}
          />

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />

          {/* Action Buttons */}
          <button onClick={handleResetFilters} className="btn-action btn-reset">
            <FiRefreshCw size={11} /> Reset
          </button>
          <button onClick={handleExport} className="btn-action btn-export">
            <FiDownload size={11} /> Export
          </button>
          {/* <button onClick={handlePrintAllTags} className="btn-action btn-print">
            <FiPrinter size={11} /> Print Tags
          </button> */}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Left: total + page size */}
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="font-medium text-gray-800">
            {paginationInfo.totalElements > 0 ? (
              <>{from}–{to} of <span className="text-blue-600 font-semibold">{paginationInfo.totalElements}</span> assets</>
            ) : (
              <span>0 assets</span>
            )}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400">Show:</span>
            {[10, 20, 50, 100].map((n) => (
              <button
                key={n}
                onClick={() => handlePageSizeChange(n)}
                className={`px-2 py-0.5 rounded text-xs border transition-all ${pageSize === n ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Right: page navigation */}
        <div className="flex items-center gap-2">
          <button onClick={() => handlePageChange(0)} disabled={currentPage === 0 || loading} className="page-btn">«</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0 || loading} className="page-btn">
            <FiChevronLeft size={12} /> Prev
          </button>
          <span className="text-xs text-gray-600 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100 font-medium">
            Page <span className="text-blue-700">{currentPage + 1}</span> / {paginationInfo.totalPages || 1}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={paginationInfo.last || loading} className="page-btn">
            Next <FiChevronRight size={12} />
          </button>
          <button onClick={() => handlePageChange(paginationInfo.totalPages - 1)} disabled={paginationInfo.last || loading} className="page-btn">»</button>
        </div>
      </div>
        </div>
      </div>

      {/* ===== PAGINATION & COUNT BAR ===== */}
      

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-xs text-gray-700 asset-table" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Asset Tag", "Status", "Brand", "Model", "Department",
                "Asset Type", "Created By", "Description", "Serial No.",
                "Purchase Date", "Location", "Assigned User", "Actions",
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
                  {Array.from({ length: 13 }).map((__, j) => (
                    <td key={j} className="px-3 py-2.5 border-b border-gray-100">
                      <div className="shimmer h-3 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="13" className="px-4 py-12 text-center text-gray-400">
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
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.brand}>{asset.brand}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.model}>{asset.model}</td>
                  <td className="px-3 py-2 border-b border-gray-100">{asset.department}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.assetType}>{asset.assetType}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.createdBy}>{asset.createdBy}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.description}>
                    {asset.description || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.serialNumber}>{asset.serialNumber}</td>
                  <td className="px-3 py-2 border-b border-gray-100 whitespace-nowrap">{asset.purchaseDate}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.locationName}>{asset.locationName}</td>
                  <td className="px-3 py-2 border-b border-gray-100" title={asset.assignedUserName}>
                    {asset.assignedUserName || <span className="text-gray-300">—</span>}
                  </td>
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

      {/* Bottom pagination (mirrors top) */}
      {/* {assets.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <span className="text-xs text-gray-500">
            Showing {from}–{to} of {paginationInfo.totalElements} assets
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => handlePageChange(0)} disabled={currentPage === 0 || loading} className="page-btn">«</button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0 || loading} className="page-btn">
              <FiChevronLeft size={12} /> Prev
            </button>
            <span className="text-xs text-gray-600 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100 font-medium">
              Page <span className="text-blue-700">{currentPage + 1}</span> / {paginationInfo.totalPages || 1}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={paginationInfo.last || loading} className="page-btn">
              Next <FiChevronRight size={12} />
            </button>
            <button onClick={() => handlePageChange(paginationInfo.totalPages - 1)} disabled={paginationInfo.last || loading} className="page-btn">»</button>
          </div>
        </div>
      )} */}
    </PageContainer>
  );
};

export default AssetList;


