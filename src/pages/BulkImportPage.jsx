

// import {
//   importAssets,
//   importTickets,
//   importSimExcel,
//   userAudit,
// } from "../services/api";
// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// const BulkImportPage = () => {
//   const [selectedType, setSelectedType] = useState("assets");
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loadingType, setLoadingType] = useState(null);
//   const [error, setError] = useState("");

//   // ---- Excel generator ----
//   const downloadExcel = (rows, fileName) => {
//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
//     XLSX.writeFile(workbook, fileName);
//   };

//   // ================================
//   // ✅ HR USER AUDIT TEMPLATE
//   // ================================
//   const handleDownloadUserAuditTemplate = () => {
//     const sampleRows = [
//       {
//         employeeId: "EMP001",
//         username: "Ravi Kumar",
//         Designation: "enter designation",
//         personalEmail: "ravi@gmail.com",
//         phone: "9876543210",
//         aadhar: "123412341234",
//         pan: "ABCDE1234F",
//         status: "ACTIVE",
//         siteName: "MADPL",
//         LocationName:"Skoda-Jubilee hills"
//       },
//       {
//         employeeId: "EMP002",
//         username: "Suresh Reddy",
//         designaiton: "Accounts Manager",
//         personalEmail: "suresh@gmail.com",
//         phone: "9123456789",
//         aadhar: "567856785678",
//         pan: "PQRSX5678Z",
//         status: "INACTIVE",
//         siteName: "MADPL",
//         LocationName:"Skoda-Jubilee hills"
//       },
//     ];

//     downloadExcel(sampleRows, "user_audit_template.xlsx");
//   };

//   // ---- Existing Templates (unchanged) ----

//   const handleDownloadAssetsTemplate = () => {
//     const sampleRows = [
//       {
//         name: "Dell Laptop",
//         description: "Developer machine",
//         serialNumber: "DL-001",
//         purchaseDate: "2024-01-15",
//         purchaseFrom: "Dell India",
//         brand: "Dell",
//         model: "Latitude",
//         assetType: "LAPTOP",
//         department: "IT",
//         cost: 75000,
//         status: "AVAILABLE",
//         statusNote: "New",
//         siteName: "MADPL",
//         locationName: "Jubilee Hills-Skoda",
//       },
//     ];
//     downloadExcel(sampleRows, "assets_import_template.xlsx");
//   };

//   const handleDownloadTicketsTemplate = () => {
//     const sampleRows = [
//       {
//         title: "Email not working",
//         description: "User issue",
//         category: "EMAIL",
//         status: "OPEN",
//         ticket_department: "IT",
//         due_date: "2025-12-31T10:00:00",
//         assetTag: "TAG-001",
//         employeeId: "EMP001",
//       },
//     ];
//     downloadExcel(sampleRows, "tickets_import_template.xlsx");
//   };

//   const handleDownloadSimCardsTemplate = () => {
//     const sampleRows = [
//       {
//         phoneNumber: "9876543210",
//         iccid: "89860012345678901234",
//         imsi: "404123456789012",
//         provider: "AIRTEL",
//         status: "AVAILABLE",
//         activatedAt: "2024-01-15",
//         purchaseDate: "2023-12-01",
//         purchaseFrom: "Airtel",
//         cost: 59900,
//         note: "Corporate",
//         siteName: "MADPL",
//         locationName: "Jubilee Hills-Skoda",
//         assignedUserId: "",
//       },
//     ];
//     downloadExcel(sampleRows, "simcards_import_template.xlsx");
//   };

//   // ---- Template Switch ----
//   const handleDownloadTemplate = () => {
//     switch (selectedType) {
//       case "assets":
//         handleDownloadAssetsTemplate();
//         break;
//       case "tickets":
//         handleDownloadTicketsTemplate();
//         break;
//       case "simcards":
//         handleDownloadSimCardsTemplate();
//         break;
//       case "userAudit":
//         handleDownloadUserAuditTemplate();
//         break;
//       default:
//         break;
//     }
//   };

//   // ---- Import Handler ----
//   const handleImport = async () => {
//     if (!file) {
//       setError("Please select an Excel file.");
//       return;
//     }

//     setError("");
//     setLoadingType(selectedType);
//     setResult(null);

//     try {
//       let res;

//       switch (selectedType) {
//         case "assets":
//           res = await importAssets(file);
//           break;
//         case "tickets":
//           res = await importTickets(file);
//           break;
//         case "simcards":
//           res = await importSimExcel(file);
//           break;
//         case "userAudit":
//           res = await userAudit(file);
//           break;
//         default:
//           throw new Error("Invalid type");
//       }

//       setResult(res);
//     } catch (e) {
//       setError(e.response?.data || e.message);
//     } finally {
//       setLoadingType(null);
//     }
//   };

//   // ---- Labels ----
//   const getTypeLabel = () => {
//     switch (selectedType) {
//       case "assets":
//         return "Assets";
//       case "tickets":
//         return "Tickets";
//       case "simcards":
//         return "SIM Cards";
//       case "userAudit":
//         return "User Audit (HR Sync)";
//       default:
//         return "";
//     }
//   };

//   const getButtonColor = () => {
//     switch (selectedType) {
//       case "assets":
//         return "bg-blue-600 hover:bg-blue-500";
//       case "tickets":
//         return "bg-green-600 hover:bg-green-500";
//       case "simcards":
//         return "bg-purple-600 hover:bg-purple-500";
//       case "userAudit":
//         return "bg-red-600 hover:bg-red-500";
//       default:
//         return "bg-blue-600";
//     }
//   };

//   const getDescription = () => {
//     switch (selectedType) {
//       case "userAudit":
//         return "Upload HR Excel to sync users. It will create, update, and deactivate users automatically.";
//       default:
//         return "Use template, fill data and upload.";
//     }
//   };

//   return (
//     <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       <div className="max-w-3xl w-full mx-4 bg-white shadow-lg rounded-xl p-8">
//         <h1 className="text-2xl font-bold mb-6">Bulk Import Center</h1>

//         {error && (
//           <div className="mb-4 text-red-600 text-sm">{error}</div>
//         )}

//         {/* Selector */}
//         <select
//           value={selectedType}
//           onChange={(e) => {
//             setSelectedType(e.target.value);
//             setResult(null);
//             setFile(null);
//           }}
//           className="mb-4 w-full border p-2 rounded"
//         >
//           <option value="assets">Assets</option>
//           <option value="tickets">Tickets</option>
//           <option value="simcards">SIM Cards</option>
//           <option value="userAudit">User Audit (HR Sync)</option>
//         </select>

//         {/* Card */}
//         <div className="p-4 border rounded bg-gray-50">
//           <h2 className="font-semibold mb-2">{getTypeLabel()}</h2>
//           <p className="text-xs mb-3">{getDescription()}</p>

//           <button
//             onClick={handleDownloadTemplate}
//             className="mb-3 bg-black text-white px-3 py-2 rounded text-xs"
//           >
//             Download Template
//           </button>

//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="block mb-3"
//           />

//           <button
//             onClick={handleImport}
//             disabled={loadingType === selectedType}
//             className={`px-4 py-2 text-white rounded ${getButtonColor()}`}
//           >
//             {loadingType === selectedType ? "Processing..." : "Import"}
//           </button>

//           {/* ============================= */}
//           {/* ✅ RESULT DISPLAY */}
//           {/* ============================= */}
//           {result && selectedType === "userAudit" && (
//             <div className="mt-4 text-sm bg-white p-3 rounded border">
//               <p><b>Created:</b> {result.created}</p>
//               <p><b>Updated:</b> {result.updated}</p>
//               <p><b>Inactivated:</b> {result.inactivated}</p>
//               <p><b>Errors Found :</b> {result.errors}</p>

//               {result.logFileName && (
//                 <p className="mt-2 text-blue-600">
//                   Log File: {result.logFileName}
//                 </p>
//               )}
//             </div>
//           )}

//           {result && selectedType !== "userAudit" && (
//             <div className="mt-4 text-sm">
//               <p>Success: {result.success}</p>
//               <p>Failed: {result.failure}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkImportPage;


// import {
//   importAssets,
//   importTickets,
//   importSimExcel,
//   userAudit,
// } from "../services/api";
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { AlertCircle, CheckCircle, Download, Upload, FileText, Users, AlertTriangle, XCircle } from "lucide-react";

// const BulkImportPage = () => {
//   const [selectedType, setSelectedType] = useState("assets");
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loadingType, setLoadingType] = useState(null);
//   const [error, setError] = useState("");
//   const [expandedErrors, setExpandedErrors] = useState(false);

//   // ---- Excel generator ----
//   const downloadExcel = (rows, fileName) => {
//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
//     XLSX.writeFile(workbook, fileName);
//   };

//   // ================================
//   // ✅ HR USER AUDIT TEMPLATE
//   // ================================
//   const handleDownloadUserAuditTemplate = () => {
//     const sampleRows = [
//       {
//         employeeId: "EMP001",
//         username: "Ravi Kumar",
//         designation: "Software Engineer",
//         personalEmail: "ravi.kumar@example.com",
//         phone: "9876543210",
//         aadhar: "123412341234",
//         pan: "ABCDE1234F",
//         status: "ACTIVE",
//         siteName: "MADPL",
//         locationName: "Skoda-Jubilee Hills"
//       },
//       {
//         employeeId: "EMP002",
//         username: "Suresh Reddy",
//         designation: "Accounts Manager",
//         personalEmail: "suresh.reddy@example.com",
//         phone: "9123456789",
//         aadhar: "567856785678",
//         pan: "PQRSX5678Z",
//         status: "INACTIVE",
//         siteName: "MADPL",
//         locationName: "Skoda-Jubilee Hills"
//       },
//       {
//         employeeId: "EMP003",
//         username: "Priya Sharma",
//         designation: "HR Executive",
//         personalEmail: "priya.sharma@example.com",
//         phone: "9988776655",
//         aadhar: "987698769876",
//         pan: "XYZAB1234C",
//         status: "ACTIVE",
//         siteName: "AADPL",
//         locationName: "MB-Bowenpally"
//       },
//     ];

//     downloadExcel(sampleRows, "user_audit_template.xlsx");
//   };

//   // ---- Existing Templates ----
//   const handleDownloadAssetsTemplate = () => {
//     const sampleRows = [
//       {
//         name: "Dell Laptop",
//         description: "Developer machine",
//         serialNumber: "DL-001",
//         purchaseDate: "2024-01-15",
//         purchaseFrom: "Dell India",
//         brand: "Dell",
//         model: "Latitude",
//         assetType: "LAPTOP",
//         department: "IT",
//         cost: 75000,
//         status: "AVAILABLE",
//         statusNote: "New",
//         siteName: "MADPL",
//         locationName: "Jubilee Hills-Skoda",
//       },
//     ];
//     downloadExcel(sampleRows, "assets_import_template.xlsx");
//   };

//   const handleDownloadTicketsTemplate = () => {
//     const sampleRows = [
//       {
//         title: "Email not working",
//         description: "User issue",
//         category: "EMAIL",
//         status: "OPEN",
//         ticket_department: "IT",
//         due_date: "2025-12-31T10:00:00",
//         assetTag: "TAG-001",
//         employeeId: "EMP001",
//       },
//     ];
//     downloadExcel(sampleRows, "tickets_import_template.xlsx");
//   };

//   const handleDownloadSimCardsTemplate = () => {
//     const sampleRows = [
//       {
//         phoneNumber: "9876543210",
//         iccid: "89860012345678901234",
//         imsi: "404123456789012",
//         provider: "AIRTEL",
//         status: "AVAILABLE",
//         activatedAt: "2024-01-15",
//         purchaseDate: "2023-12-01",
//         purchaseFrom: "Airtel",
//         cost: 59900,
//         note: "Corporate",
//         siteName: "MADPL",
//         locationName: "Jubilee Hills-Skoda",
//         assignedUserId: "",
//       },
//     ];
//     downloadExcel(sampleRows, "simcards_import_template.xlsx");
//   };

//   // ---- Template Switch ----
//   const handleDownloadTemplate = () => {
//     switch (selectedType) {
//       case "assets":
//         handleDownloadAssetsTemplate();
//         break;
//       case "tickets":
//         handleDownloadTicketsTemplate();
//         break;
//       case "simcards":
//         handleDownloadSimCardsTemplate();
//         break;
//       case "userAudit":
//         handleDownloadUserAuditTemplate();
//         break;
//       default:
//         break;
//     }
//   };

//   // ---- Import Handler ----
//   const handleImport = async () => {
//     if (!file) {
//       setError("Please select an Excel file.");
//       return;
//     }

//     setError("");
//     setLoadingType(selectedType);
//     setResult(null);
//     setExpandedErrors(false);

//     try {
//       let res;

//       switch (selectedType) {
//         case "assets":
//           res = await importAssets(file);
//           break;
//         case "tickets":
//           res = await importTickets(file);
//           break;
//         case "simcards":
//           res = await importSimExcel(file);
//           break;
//         case "userAudit":
//           res = await userAudit(file);
//           break;
//         default:
//           throw new Error("Invalid type");
//       }

//       setResult(res.data || res);
//     } catch (e) {
//       setError(e.response?.data?.message || e.message || "Import failed");
//     } finally {
//       setLoadingType(null);
//     }
//   };

//   // ---- Labels ----
//   const getTypeLabel = () => {
//     switch (selectedType) {
//       case "assets":
//         return "Assets";
//       case "tickets":
//         return "Tickets";
//       case "simcards":
//         return "SIM Cards";
//       case "userAudit":
//         return "User Audit (HR Sync)";
//       default:
//         return "";
//     }
//   };

//   const getButtonColor = () => {
//     switch (selectedType) {
//       case "assets":
//         return "bg-blue-600 hover:bg-blue-700";
//       case "tickets":
//         return "bg-green-600 hover:bg-green-700";
//       case "simcards":
//         return "bg-purple-600 hover:bg-purple-700";
//       case "userAudit":
//         return "bg-red-600 hover:bg-red-700";
//       default:
//         return "bg-blue-600";
//     }
//   };

//   const getIcon = () => {
//     switch (selectedType) {
//       case "assets":
//         return <FileText className="w-5 h-5" />;
//       case "tickets":
//         return <AlertCircle className="w-5 h-5" />;
//       case "simcards":
//         return <Upload className="w-5 h-5" />;
//       case "userAudit":
//         return <Users className="w-5 h-5" />;
//       default:
//         return <FileText className="w-5 h-5" />;
//     }
//   };

//   const getDescription = () => {
//     switch (selectedType) {
//       case "userAudit":
//         return "Upload HR Excel file to sync users. The system will automatically create new users, update existing ones, and deactivate users marked as INACTIVE.";
//       default:
//         return "Download the template, fill in your data, and upload to bulk import.";
//     }
//   };

//   // Format error details for display
//   const formatErrorDetails = (details) => {
//     if (!details || details.length === 0) return null;
//     return (
//       <ul className="mt-2 space-y-1 list-disc list-inside">
//         {details.map((detail, idx) => (
//           <li key={idx} className="text-sm text-red-700">{detail}</li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
//             <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//               {getIcon()}
//               Bulk Import Center
//             </h1>
//             <p className="text-indigo-100 text-sm mt-1">
//               Import data in bulk using Excel templates
//             </p>
//           </div>
          
//           <div className="p-6">
//             {/* Type Selector */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Import Type
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {[
//                   { value: "assets", label: "Assets", color: "blue" },
//                   { value: "tickets", label: "Tickets", color: "green" },
//                   { value: "simcards", label: "SIM Cards", color: "purple" },
//                   { value: "userAudit", label: "User Audit", color: "red" },
//                 ].map((type) => (
//                   <button
//                     key={type.value}
//                     onClick={() => {
//                       setSelectedType(type.value);
//                       setResult(null);
//                       setFile(null);
//                       setError("");
//                     }}
//                     className={`p-3 rounded-lg border-2 transition-all ${
//                       selectedType === type.value
//                         ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700`
//                         : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
//                     }`}
//                   >
//                     <div className="font-medium">{type.label}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Error Alert */}
//             {error && (
//               <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <div className="flex items-start gap-2">
//                   <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-red-800">Import Failed</p>
//                     <p className="text-sm text-red-700 mt-1">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Import Card */}
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
//               <div className="text-center mb-4">
//                 <h2 className="font-semibold text-lg text-gray-800 mb-2">
//                   {getTypeLabel()} Import
//                 </h2>
//                 <p className="text-sm text-gray-600">{getDescription()}</p>
//               </div>

//               <div className="space-y-4">
//                 <button
//                   onClick={handleDownloadTemplate}
//                   className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//                 >
//                   <Download className="w-4 h-4" />
//                   Download {getTypeLabel()} Template
//                 </button>

//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept=".xlsx, .xls"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     className="hidden"
//                     id="file-upload"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 bg-white px-4 py-3 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors"
//                   >
//                     <Upload className="w-4 h-4 text-gray-500" />
//                     <span className="text-gray-700">
//                       {file ? file.name : "Choose Excel File"}
//                     </span>
//                   </label>
//                 </div>

//                 <button
//                   onClick={handleImport}
//                   disabled={loadingType === selectedType || !file}
//                   className={`w-full flex items-center justify-center gap-2 text-white px-4 py-3 rounded-lg transition-all ${
//                     loadingType === selectedType || !file
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : getButtonColor()
//                   }`}
//                 >
//                   {loadingType === selectedType ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-4 h-4" />
//                       Import {getTypeLabel()}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* ============================= */}
//             {/* ✅ USER AUDIT RESULT DISPLAY */}
//             {/* ============================= */}
//             {result && selectedType === "userAudit" && (
//               <div className="mt-6 space-y-4">
//                 {/* Summary Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-green-600 font-medium">Created</p>
//                         <p className="text-2xl font-bold text-green-700">{result.created || 0}</p>
//                       </div>
//                       <CheckCircle className="w-8 h-8 text-green-500" />
//                     </div>
//                   </div>
                  
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-blue-600 font-medium">Updated</p>
//                         <p className="text-2xl font-bold text-blue-700">{result.updated || 0}</p>
//                       </div>
//                       <AlertCircle className="w-8 h-8 text-blue-500" />
//                     </div>
//                   </div>
                  
//                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-yellow-600 font-medium">Inactivated</p>
//                         <p className="text-2xl font-bold text-yellow-700">{result.inactivated || 0}</p>
//                       </div>
//                       <AlertTriangle className="w-8 h-8 text-yellow-500" />
//                     </div>
//                   </div>
                  
//                   <div className={`${result.errors && result.errors.length > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4`}>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className={`text-sm font-medium ${result.errors && result.errors.length > 0 ? 'text-red-600' : 'text-gray-600'}`}>
//                           Errors
//                         </p>
//                         <p className={`text-2xl font-bold ${result.errors && result.errors.length > 0 ? 'text-red-700' : 'text-gray-700'}`}>
//                           {result.errors ? result.errors.length : 0}
//                         </p>
//                       </div>
//                       <XCircle className={`w-8 h-8 ${result.errors && result.errors.length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Log File Info */}
//                 {result.logFileName && (
//                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                     <div className="flex items-center gap-2">
//                       <FileText className="w-4 h-4 text-gray-500" />
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">Log File:</span> {result.logFileName}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Error Details */}
//                 {result.errors && result.errors.length > 0 && (
//                   <div className="bg-white border border-red-200 rounded-lg overflow-hidden">
//                     <button
//                       onClick={() => setExpandedErrors(!expandedErrors)}
//                       className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-between"
//                     >
//                       <div className="flex items-center gap-2">
//                         <AlertTriangle className="w-4 h-4 text-red-600" />
//                         <span className="font-medium text-red-700">
//                           {result.errors.length} Error{result.errors.length !== 1 ? 's' : ''} Found
//                         </span>
//                       </div>
//                       <span className="text-red-600 text-sm">
//                         {expandedErrors ? '▼' : '▶'}
//                       </span>
//                     </button>
                    
//                     {expandedErrors && (
//                       <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
//                         {result.errors.map((error, idx) => (
//                           <div key={idx} className="border-l-4 border-red-400 bg-red-50 p-3 rounded-r-lg">
//                             <div className="flex items-start justify-between mb-1">
//                               <div>
//                                 <span className="font-medium text-red-800">
//                                   Row {error.rowNumber}
//                                 </span>
//                                 {error.employeeId && (
//                                   <span className="text-sm text-red-600 ml-2">
//                                     (Emp ID: {error.employeeId})
//                                   </span>
//                                 )}
//                               </div>
//                               <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded-full">
//                                 {error.errorType}
//                               </span>
//                             </div>
//                             <p className="text-sm text-red-700 mt-1 font-medium">
//                               {error.errorMessage}
//                             </p>
//                             {error.details && error.details.length > 0 && (
//                               <ul className="mt-2 space-y-1">
//                                 {error.details.map((detail, detailIdx) => (
//                                   <li key={detailIdx} className="text-xs text-red-600 flex items-start gap-1">
//                                     <span className="text-red-400">•</span>
//                                     {detail}
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Success Message */}
//                 {result.created > 0 || result.updated > 0 || result.inactivated > 0 ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-start gap-2">
//                       <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
//                       <div>
//                         <p className="text-sm font-medium text-green-800">Import Completed Successfully</p>
//                         <p className="text-xs text-green-700 mt-1">
//                           {result.created > 0 && `${result.created} user(s) created. `}
//                           {result.updated > 0 && `${result.updated} user(s) updated. `}
//                           {result.inactivated > 0 && `${result.inactivated} user(s) inactivated. `}
//                           {result.errors && result.errors.length > 0 && `${result.errors.length} error(s) encountered.`}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : result.errors && result.errors.length > 0 ? (
//                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                     <div className="flex items-start gap-2">
//                       <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
//                       <div>
//                         <p className="text-sm font-medium text-yellow-800">Import Completed with Errors</p>
//                         <p className="text-xs text-yellow-700 mt-1">
//                           No users were created or updated. Please check the errors above and try again.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* Other Import Results */}
//             {result && selectedType !== "userAudit" && (
//               <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-600">Success</p>
//                     <p className="text-2xl font-bold text-green-600">{result.success || 0}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm text-gray-600">Failed</p>
//                     <p className="text-2xl font-bold text-red-600">{result.failure || 0}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkImportPage;




import {
  importAssets,
  importTickets,
  importSimExcel,
  userAudit,
} from "../services/api";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { AlertCircle, CheckCircle, Download, Upload, FileText, Users, AlertTriangle, XCircle } from "lucide-react";

const BulkImportPage = () => {
  const [selectedType, setSelectedType] = useState("assets");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loadingType, setLoadingType] = useState(null);
  const [error, setError] = useState("");
  const [expandedErrors, setExpandedErrors] = useState(false);

  // ---- Excel generator ----
  const downloadExcel = (rows, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, fileName);
  };

  // ================================
  // ✅ HR USER AUDIT TEMPLATE
  // ================================
  const handleDownloadUserAuditTemplate = () => {
    const sampleRows = [
      {
        employeeId: "EMP001",
        username: "Ravi Kumar",
        designation: "Software Engineer",
        personalEmail: "ravi.kumar@example.com",
        phone: "9876543210",
        aadhar: "123412341234",
        pan: "ABCDE1234F",
        status: "ACTIVE",
        siteName: "MADPL",
        locationName: "Skoda-Jubilee Hills"
      },
      {
        employeeId: "EMP002",
        username: "Suresh Reddy",
        designation: "Accounts Manager",
        personalEmail: "suresh.reddy@example.com",
        phone: "9123456789",
        aadhar: "567856785678",
        pan: "PQRSX5678Z",
        status: "INACTIVE",
        siteName: "MADPL",
        locationName: "Skoda-Jubilee Hills"
      },
      {
        employeeId: "EMP003",
        username: "Priya Sharma",
        designation: "HR Executive",
        personalEmail: "priya.sharma@example.com",
        phone: "9988776655",
        aadhar: "987698769876",
        pan: "XYZAB1234C",
        status: "ACTIVE",
        siteName: "AADPL",
        locationName: "MB-Bowenpally"
      },
    ];

    downloadExcel(sampleRows, "user_audit_template.xlsx");
  };

  // ---- Existing Templates ----
  const handleDownloadAssetsTemplate = () => {
    const sampleRows = [
      {
        name: "Dell Laptop",
        description: "Developer machine",
        serialNumber: "DL-001",
        purchaseDate: "2024-01-15",
        purchaseFrom: "Dell India",
        brand: "Dell",
        model: "Latitude",
        assetType: "LAPTOP",
        department: "IT",
        cost: 75000,
        status: "AVAILABLE",
        statusNote: "New",
        siteName: "MADPL",
        locationName: "Jubilee Hills-Skoda",
      },
    ];
    downloadExcel(sampleRows, "assets_import_template.xlsx");
  };

  const handleDownloadTicketsTemplate = () => {
    const sampleRows = [
      {
        title: "Email not working",
        description: "User issue",
        category: "EMAIL",
        status: "OPEN",
        ticket_department: "IT",
        due_date: "2025-12-31T10:00:00",
        assetTag: "TAG-001",
        employeeId: "EMP001",
      },
    ];
    downloadExcel(sampleRows, "tickets_import_template.xlsx");
  };

  const handleDownloadSimCardsTemplate = () => {
    const sampleRows = [
      {
        phoneNumber: "9876543210",
        iccid: "89860012345678901234",
        imsi: "404123456789012",
        provider: "AIRTEL",
        status: "AVAILABLE",
        activatedAt: "2024-01-15",
        purchaseDate: "2023-12-01",
        purchaseFrom: "Airtel",
        cost: 59900,
        note: "Corporate",
        siteName: "MADPL",
        locationName: "Jubilee Hills-Skoda",
        assignedUserId: "",
      },
    ];
    downloadExcel(sampleRows, "simcards_import_template.xlsx");
  };

  // ---- Template Switch ----
  const handleDownloadTemplate = () => {
    switch (selectedType) {
      case "assets":
        handleDownloadAssetsTemplate();
        break;
      case "tickets":
        handleDownloadTicketsTemplate();
        break;
      case "simcards":
        handleDownloadSimCardsTemplate();
        break;
      case "userAudit":
        handleDownloadUserAuditTemplate();
        break;
      default:
        break;
    }
  };

  // ---- Import Handler ----
  const handleImport = async () => {
    if (!file) {
      setError("Please select an Excel file.");
      return;
    }

    setError("");
    setLoadingType(selectedType);
    setResult(null);
    setExpandedErrors(false);

    try {
      let res;

      switch (selectedType) {
        case "assets":
          res = await importAssets(file);
          break;
        case "tickets":
          res = await importTickets(file);
          break;
        case "simcards":
          res = await importSimExcel(file);
          break;
        case "userAudit":
          res = await userAudit(file);
          break;
        default:
          throw new Error("Invalid type");
      }

      // Handle response data properly
      const responseData = res.data || res;
      setResult(responseData);
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Import failed");
    } finally {
      setLoadingType(null);
    }
  };

  // ---- Labels ----
  const getTypeLabel = () => {
    switch (selectedType) {
      case "assets":
        return "Assets";
      case "tickets":
        return "Tickets";
      case "simcards":
        return "SIM Cards";
      case "userAudit":
        return "User Audit (HR Sync)";
      default:
        return "";
    }
  };

  const getButtonColor = () => {
    switch (selectedType) {
      case "assets":
        return "bg-blue-600 hover:bg-blue-700";
      case "tickets":
        return "bg-green-600 hover:bg-green-700";
      case "simcards":
        return "bg-purple-600 hover:bg-purple-700";
      case "userAudit":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-blue-600";
    }
  };

  const getIcon = () => {
    switch (selectedType) {
      case "assets":
        return <FileText className="w-5 h-5" />;
      case "tickets":
        return <AlertCircle className="w-5 h-5" />;
      case "simcards":
        return <Upload className="w-5 h-5" />;
      case "userAudit":
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getDescription = () => {
    switch (selectedType) {
      case "userAudit":
        return "Upload HR Excel file to sync users. The system will automatically create new users, update existing ones, and deactivate users marked as INACTIVE.";
      default:
        return "Download the template, fill in your data, and upload to bulk import.";
    }
  };

  // Parse error message to extract readable information
  const parseErrorMessage = (message) => {
    if (message.includes("No enum constant")) {
      const match = message.match(/AssetType\.(.+?)(?:\s|$)/);
      if (match) {
        return `Invalid asset type: "${match[1]}". Please use a valid asset type from the template.`;
      }
      return message;
    }
    if (message.includes("not found in site")) {
      return message;
    }
    return message;
  };

  // Get error type category
  const getErrorType = (message) => {
    if (message.includes("No enum constant")) return "Invalid Value";
    if (message.includes("not found in site")) return "Location/Site Error";
    return "Validation Error";
  };

  return (
    <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              {getIcon()}
              Bulk Import Center
            </h1>
            <p className="text-indigo-100 text-sm mt-1">
              Import data in bulk using Excel templates
            </p>
          </div>
          
          <div className="p-6">
            {/* Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Import Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "assets", label: "Assets", color: "blue" },
                  { value: "tickets", label: "Tickets", color: "green" },
                  { value: "simcards", label: "SIM Cards", color: "purple" },
                  { value: "userAudit", label: "User Audit", color: "red" },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setSelectedType(type.value);
                      setResult(null);
                      setFile(null);
                      setError("");
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedType === type.value
                        ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700`
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">Import Failed</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Import Card */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
              <div className="text-center mb-4">
                <h2 className="font-semibold text-lg text-gray-800 mb-2">
                  {getTypeLabel()} Import
                </h2>
                <p className="text-sm text-gray-600">{getDescription()}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleDownloadTemplate}
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download {getTypeLabel()} Template
                </button>

                <div className="relative">
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 bg-white px-4 py-3 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">
                      {file ? file.name : "Choose Excel File"}
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleImport}
                  disabled={loadingType === selectedType || !file}
                  className={`w-full flex items-center justify-center gap-2 text-white px-4 py-3 rounded-lg transition-all ${
                    loadingType === selectedType || !file
                      ? "bg-gray-400 cursor-not-allowed"
                      : getButtonColor()
                  }`}
                >
                  {loadingType === selectedType ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Import {getTypeLabel()}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ============================= */}
            {/* ✅ ASSET/TICKET/SIM IMPORT RESULT DISPLAY */}
            {/* ============================= */}
            {result && selectedType !== "userAudit" && (
              <div className="mt-6 space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Successful</p>
                        <p className="text-2xl font-bold text-green-700">{result.successCount || result.success || 0}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-red-600 font-medium">Failed</p>
                        <p className="text-2xl font-bold text-red-700">{result.failureCount || result.failure || 0}</p>
                      </div>
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Total Processed</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {(result.successCount || result.success || 0) + (result.failureCount || result.failure || 0)}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Error Details */}
                {result.errors && result.errors.length > 0 && (
                  <div className="bg-white border border-red-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedErrors(!expandedErrors)}
                      className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-700">
                          {result.errors.length} Error{result.errors.length !== 1 ? 's' : ''} Found
                        </span>
                      </div>
                      <span className="text-red-600 text-sm">
                        {expandedErrors ? '▼' : '▶'}
                      </span>
                    </button>
                    
                    {expandedErrors && (
                      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                        {result.errors.map((error, idx) => (
                          <div key={idx} className="border-l-4 border-red-400 bg-red-50 p-3 rounded-r-lg">
                            <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
                              <div>
                                <span className="font-medium text-red-800">
                                  Row {error.rowNumber}
                                </span>
                              </div>
                              <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded-full">
                                {getErrorType(error.message)}
                              </span>
                            </div>
                            <p className="text-sm text-red-700 mt-1">
                              {parseErrorMessage(error.message)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Success Message */}
                {(result.successCount > 0 || result.success > 0) && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Import Completed</p>
                        <p className="text-xs text-green-700 mt-1">
                          Successfully imported {result.successCount || result.success} record(s).
                          {result.failureCount > 0 && ` ${result.failureCount} record(s) failed.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* All Failed Message */}
                {(result.successCount === 0 || result.success === 0) && result.failureCount > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Import Failed</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          No records were imported. Please check the errors above and correct your Excel file.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================= */}
            {/* ✅ USER AUDIT RESULT DISPLAY */}
            {/* ============================= */}
            {result && selectedType === "userAudit" && (
              <div className="mt-6 space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Created</p>
                        <p className="text-2xl font-bold text-green-700">{result.created || 0}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Updated</p>
                        <p className="text-2xl font-bold text-blue-700">{result.updated || 0}</p>
                      </div>
                      <AlertCircle className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-600 font-medium">Inactivated</p>
                        <p className="text-2xl font-bold text-yellow-700">{result.inactivated || 0}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-yellow-500" />
                    </div>
                  </div>
                  
                  <div className={`${result.errors && result.errors.length > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${result.errors && result.errors.length > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          Errors
                        </p>
                        <p className={`text-2xl font-bold ${result.errors && result.errors.length > 0 ? 'text-red-700' : 'text-gray-700'}`}>
                          {result.errors ? result.errors.length : 0}
                        </p>
                      </div>
                      <XCircle className={`w-8 h-8 ${result.errors && result.errors.length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </div>

                {/* Log File Info */}
                {result.logFileName && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Log File:</span> {result.logFileName}
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Details for User Audit */}
                {result.errors && result.errors.length > 0 && (
                  <div className="bg-white border border-red-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedErrors(!expandedErrors)}
                      className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-700">
                          {result.errors.length} Error{result.errors.length !== 1 ? 's' : ''} Found
                        </span>
                      </div>
                      <span className="text-red-600 text-sm">
                        {expandedErrors ? '▼' : '▶'}
                      </span>
                    </button>
                    
                    {expandedErrors && (
                      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                        {result.errors.map((error, idx) => (
                          <div key={idx} className="border-l-4 border-red-400 bg-red-50 p-3 rounded-r-lg">
                            <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
                              <div>
                                <span className="font-medium text-red-800">
                                  Row {error.rowNumber}
                                </span>
                                {error.employeeId && (
                                  <span className="text-sm text-red-600 ml-2">
                                    (Emp ID: {error.employeeId})
                                  </span>
                                )}
                              </div>
                              <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded-full">
                                {error.errorType || "Validation Error"}
                              </span>
                            </div>
                            <p className="text-sm text-red-700 mt-1 font-medium">
                              {error.errorMessage || error.message}
                            </p>
                            {error.details && error.details.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {error.details.map((detail, detailIdx) => (
                                  <li key={detailIdx} className="text-xs text-red-600 flex items-start gap-1">
                                    <span className="text-red-400">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Success Message for User Audit */}
                {(result.created > 0 || result.updated > 0 || result.inactivated > 0) && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Import Completed Successfully</p>
                        <p className="text-xs text-green-700 mt-1">
                          {result.created > 0 && `${result.created} user(s) created. `}
                          {result.updated > 0 && `${result.updated} user(s) updated. `}
                          {result.inactivated > 0 && `${result.inactivated} user(s) inactivated. `}
                          {result.errors && result.errors.length > 0 && `${result.errors.length} error(s) encountered.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* All Failed for User Audit */}
                {result.created === 0 && result.updated === 0 && result.inactivated === 0 && result.errors && result.errors.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Import Completed with Errors</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          No users were created or updated. Please check the errors above and try again.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImportPage;

