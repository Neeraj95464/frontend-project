// // import { uploadOnboardingExcel } from "../services/api";
// // import { generateDemoTemplate } from "../services/excelGenerator";
// // import React, { useState } from "react";

// // export default function EmployeeOnboardingPage() {
// //   const [file, setFile] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [error, setError] = useState("");
// //   const [downloadingDemo, setDownloadingDemo] = useState(false);

// //   // SVG Icons (no external dependency)
// //   const CheckCircleIcon = () => (
// //     <svg
// //       className="w-6 h-6"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M5 13l4 4L19 7"
// //       />
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //       />
// //     </svg>
// //   );

// //   const XCircleIcon = () => (
// //     <svg
// //       className="w-6 h-6"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
// //       />
// //     </svg>
// //   );

// //   const DownloadIcon = () => (
// //     <svg
// //       className="w-6 h-6"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M12 10l-5.5 5.5m0 0L7.5 18M7.5 18l-5.5-5.5m5.5 5.5h11m0 0l-5.5-5.5m5.5 5.5l5.5-5.5"
// //       />
// //     </svg>
// //   );

// //   const ClipboardIcon = () => (
// //     <svg
// //       className="w-5 h-5"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
// //       />
// //     </svg>
// //   );

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //     setError("");
// //     setResult(null);
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       setError("Please select an Excel file to upload.");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError("");
// //       setResult(null);

// //       const response = await uploadOnboardingExcel(file);
// //       setResult(response);
// //     } catch (err) {
// //       setError(
// //         err?.message ||
// //           "Failed to process the onboarding file. Please check the file format."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const downloadDemoTemplate = async () => {
// //     try {
// //       setDownloadingDemo(true);
// //       const excelBlob = generateDemoTemplate();

// //       const url = window.URL.createObjectURL(excelBlob);
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.setAttribute("download", "employee-onboarding-template.xlsx");
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       window.URL.revokeObjectURL(url);
// //     } catch (err) {
// //       setError("Failed to generate demo template.");
// //     } finally {
// //       setDownloadingDemo(false);
// //     }
// //   };

// //   return (
// //     // <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">

// //     <div className="lg:ml-40 pt-16">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Hero Header */}
// //         <div className="text-center mb-12 lg:mb-16">
// //           <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full text-emerald-800 text-sm font-semibold mb-6 shadow-md">
// //             <ClipboardIcon />
// //             <span className="ml-2">Bulk Employee Onboarding Automation</span>
// //           </div>
// //           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
// //             Upload Excel → Auto Onboard
// //           </h1>
// //           <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
// //             Create users + generate asset tickets in seconds. No manual work
// //             required.
// //           </p>
// //         </div>

// //         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
// //           {/* Upload Panel */}
// //           <div className="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50 hover:shadow-3xl transition-all duration-500">
// //             <div className="text-center mb-10">
// //               <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
// //                 <svg
// //                   className="w-12 h-12 text-white"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={1.5}
// //                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //                   />
// //                 </svg>
// //               </div>
// //               <h2 className="text-3xl font-bold text-gray-900 mb-3">
// //                 Upload Excel
// //               </h2>
// //               <p className="text-lg text-gray-600">
// //                 Drag & drop or click to select
// //               </p>
// //             </div>

// //             {/* File Drop Zone */}
// //             <div className="border-4 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer relative overflow-hidden group-hover:shadow-xl">
// //               <input
// //                 type="file"
// //                 accept=".xlsx,.xls"
// //                 onChange={handleFileChange}
// //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //               />
// //               <div>
// //                 {file ? (
// //                   <div className="space-y-3">
// //                     <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                       <CheckCircleIcon />
// //                     </div>
// //                     <div className="text-sm">
// //                       <p className="font-semibold text-gray-900 truncate max-w-full">
// //                         {file.name}
// //                       </p>
// //                       <p className="text-xs text-gray-500">
// //                         Size: {(file.size / 1024 / 1024).toFixed(2)} MB
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <svg
// //                       className="w-20 h-20 mx-auto text-gray-400 mb-6"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={1}
// //                         d="M12 16l4-4m0 0l-4-4m4 4H7"
// //                       />
// //                     </svg>
// //                     <p className="text-2xl font-bold text-gray-900 mb-2">
// //                       Choose Excel file
// //                     </p>
// //                     <p className="text-gray-500">
// //                       Supports .xlsx, .xls (max 10MB)
// //                     </p>
// //                   </>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="mt-10 space-y-4">
// //               <button
// //                 onClick={downloadDemoTemplate}
// //                 disabled={downloadingDemo}
// //                 className="w-full flex items-center justify-center px-6 py-4 border-2 border-dashed border-emerald-300 bg-emerald-50 text-emerald-700 rounded-2xl hover:bg-emerald-100 hover:border-emerald-400 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
// //               >
// //                 <DownloadIcon />
// //                 <span className="ml-3">
// //                   {downloadingDemo
// //                     ? "Generating..."
// //                     : "📊 Download Demo Template"}
// //                 </span>
// //               </button>

// //               <button
// //                 onClick={handleUpload}
// //                 disabled={loading || !file}
// //                 className="w-full px-8 py-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xl rounded-3xl hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <svg
// //                       className="animate-spin -ml-1 mr-4 h-7 w-7 text-white"
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <circle
// //                         className="opacity-25"
// //                         cx="12"
// //                         cy="12"
// //                         r="10"
// //                         stroke="currentColor"
// //                         strokeWidth="4"
// //                       ></circle>
// //                       <path
// //                         className="opacity-75"
// //                         fill="currentColor"
// //                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                       ></path>
// //                     </svg>
// //                     Processing {result?.totalEmployees || 0}/
// //                     {result?.totalEmployees || 0} rows...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <CheckCircleIcon />
// //                     <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">
// //                       🚀 Process Onboarding Now
// //                     </span>
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             {error && (
// //               <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl backdrop-blur-sm">
// //                 <div className="flex items-start space-x-3">
// //                   <XCircleIcon />
// //                   <div>
// //                     <p className="font-semibold text-red-900 mb-1">{error}</p>
// //                     <button
// //                       onClick={() => setError("")}
// //                       className="text-red-700 hover:text-red-900 text-sm underline hover:no-underline"
// //                     >
// //                       Clear error
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Excel Template Preview */}
// //           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50">
// //             <div className="text-center mb-10">
// //               <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
// //                 <svg
// //                   className="w-10 h-10 text-white"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={1.5}
// //                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
// //                   />
// //                 </svg>
// //               </div>
// //               <h2 className="text-3xl font-bold text-gray-900 mb-3">
// //                 Excel Format
// //               </h2>
// //               <p className="text-lg text-gray-600">Follow this exact format</p>
// //             </div>

// //             <div className="overflow-hidden rounded-2xl border-4 border-gray-200 shadow-inner">
// //               <table className="w-full text-xs bg-white">
// //                 <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
// //                   <tr>
// //                     {[
// //                       "A",
// //                       "B",
// //                       "C",
// //                       "D",
// //                       "E",
// //                       "F",
// //                       "G",
// //                       "H",
// //                       "I",
// //                       "J",
// //                       "K",
// //                       "L",
// //                       "M",
// //                       "N",
// //                     ].map((col, i) => (
// //                       <th
// //                         key={i}
// //                         className="border-r border-gray-700 p-3 font-bold uppercase tracking-wider"
// //                       >
// //                         {col}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-100">
// //                   <tr className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 font-bold text-blue-900">
// //                     <td className="border p-2 bg-blue-100">employeeId</td>
// //                     <td className="border p-2 bg-blue-100">username</td>
// //                     <td className="border p-2 bg-blue-100">profEmail</td>
// //                     <td className="border p-2 bg-blue-100">personalEmail</td>
// //                     <td className="border p-2 bg-blue-100">phone</td>
// //                     <td className="border p-2 bg-blue-100">department</td>
// //                     <td className="border p-2 bg-blue-100">site</td>
// //                     <td className="border p-2 bg-blue-100">location</td>
// //                     <td className="border p-2 bg-blue-100">aadhar</td>
// //                     <td className="border p-2 bg-blue-100">pan</td>
// //                     <td className="border p-2 bg-blue-100">note</td>
// //                     <td className="border p-2 bg-yellow-100 font-bold">
// //                       CUG/SIM
// //                     </td>
// //                     <td className="border p-2 bg-green-100 font-bold">
// //                       Laptop
// //                     </td>
// //                     <td className="border p-2 bg-purple-100 font-bold">
// //                       Email
// //                     </td>
// //                   </tr>
// //                   <tr className="hover:bg-gray-50 group">
// //                     <td className="border p-2 font-mono bg-gray-50">EMP001</td>
// //                     <td className="border p-2 font-mono">john.doe</td>
// //                     <td className="border p-2 font-mono">john@comp.com</td>
// //                     <td className="border p-2 font-mono">john@gmail.com</td>
// //                     <td className="border p-2 font-mono">9876543210</td>
// //                     <td className="border p-2">IT</td>
// //                     <td className="border p-2">HQ</td>
// //                     <td className="border p-2">Floor1</td>
// //                     <td className="border p-2">1234...</td>
// //                     <td className="border p-2">ABCDE1234F</td>
// //                     <td className="border p-2 italic text-gray-600">
// //                       Optional note
// //                     </td>
// //                     <td className="border p-2 text-center bg-yellow-100 font-bold text-yellow-800">
// //                       YES
// //                     </td>
// //                     <td className="border p-2 text-center bg-green-100 font-bold text-green-800">
// //                       YES
// //                     </td>
// //                     <td className="border p-2 text-center bg-purple-100 font-bold text-purple-800">
// //                       NO
// //                     </td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="mt-6 p-4 bg-gray-50 rounded-2xl border-l-4 border-emerald-400">
// //               <p className="text-sm text-emerald-800 font-medium mb-2">
// //                 <CheckCircleIcon />
// //                 <span className="ml-2">
// //                   Use{" "}
// //                   <code className="bg-emerald-100 px-2 py-1 rounded font-mono text-xs">
// //                     "YES", "Y", "TRUE", "1"
// //                   </code>{" "}
// //                   for requirements
// //                 </span>
// //               </p>
// //               <p className="text-xs text-gray-600">
// //                 Required: A, B, C columns. Download template for exact
// //                 formatting.
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Results Dashboard - SHORTENED for brevity, same as previous */}
// //         {result && (
// //           <div className="space-y-8">
// //             {/* Summary Cards */}
// //             <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50">
// //               <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
// //                 <div className="flex items-center p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-2 border-emerald-200/50 rounded-2xl min-w-[200px]">
// //                   <CheckCircleIcon />
// //                   <div className="ml-4">
// //                     <div className="text-3xl font-black text-emerald-700">
// //                       {result.successfulOnboardings}
// //                     </div>
// //                     <div className="text-emerald-800 font-semibold">
// //                       Successful
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10 border-2 border-red-200/50 rounded-2xl min-w-[200px]">
// //                   <XCircleIcon />
// //                   <div className="ml-4">
// //                     <div className="text-3xl font-black text-red-700">
// //                       {result.failedOnboardings}
// //                     </div>
// //                     <div className="text-red-800 font-semibold">Failed</div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-2 border-blue-200/50 rounded-2xl min-w-[200px]">
// //                   <div className="text-3xl font-black text-blue-700 mr-4">
// //                     {result.totalEmployees}
// //                   </div>
// //                   <div>
// //                     <div className="text-blue-800 font-semibold">
// //                       Total Rows
// //                     </div>
// //                     <div className="text-sm text-blue-700">
// //                       {(
// //                         (result.successfulOnboardings / result.totalEmployees) *
// //                         100
// //                       ).toFixed(1)}
// //                       % Success
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //               {/* Results tables continue same as previous... */}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { uploadOnboardingExcel } from "../services/api";
// import { generateDemoTemplate } from "../services/excelGenerator";
// import React, { useState } from "react";

// export default function EmployeeOnboardingPage() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [downloadingDemo, setDownloadingDemo] = useState(false);

//   // Compact SVG Icons
//   const CheckIcon = () => (
//     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//       <path
//         fillRule="evenodd"
//         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );

//   const XIcon = () => (
//     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//       <path
//         fillRule="evenodd"
//         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setError("");
//     setResult(null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select an Excel file.");
//       return;
//     }
//     try {
//       setLoading(true);
//       setError("");
//       const data = await uploadOnboardingExcel(file);
//       setResult(data);
//     } catch (err) {
//       setError(err?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadDemoTemplate = () => {
//     try {
//       setDownloadingDemo(true);
//       const excelBlob = generateDemoTemplate();
//       const url = window.URL.createObjectURL(excelBlob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "employee-onboarding-template.xlsx";
//       link.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       setError("Demo download failed");
//     } finally {
//       setDownloadingDemo(false);
//     }
//   };

//   return (
//     <div className="lg:ml-40 pt-16 p-4 max-w-6xl mx-auto">
//       <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//           👥 Employee Onboarding
//         </h1>

//         {/* Upload Section */}
//         <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-gray-50 transition-all">
//           <input
//             type="file"
//             accept=".xlsx,.xls"
//             onChange={handleFileChange}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           />
//           {file ? (
//             <div className="text-sm">
//               <CheckIcon />
//               <span className="ml-2 font-medium">{file.name}</span>
//               <br />
//               <span className="text-xs text-gray-500">
//                 ({(file.size / 1024 / 1024).toFixed(1)}MB)
//               </span>
//             </div>
//           ) : (
//             <div>
//               <div className="w-12 h-12 mx-auto mb-3 text-gray-400">
//                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1}
//                     d="M12 16l4-4m0 0l-4-4m4 4H7"
//                   />
//                 </svg>
//               </div>
//               <p className="font-medium text-gray-700">
//                 Click to select Excel file
//               </p>
//               <p className="text-sm text-gray-500">.xlsx or .xls</p>
//             </div>
//           )}
//         </div>

//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={downloadDemoTemplate}
//             disabled={downloadingDemo}
//             className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center"
//           >
//             <span className="w-4 h-4 mr-2">📥</span>
//             Demo Template
//           </button>
//           <button
//             onClick={handleUpload}
//             disabled={loading || !file}
//             className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium flex items-center justify-center"
//           >
//             {loading ? "⏳ Processing..." : "🚀 Process Now"}
//           </button>
//         </div>

//         {error && (
//           <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <XIcon className="w-4 h-4 inline mr-2" />
//             <span className="text-red-800 text-sm">{error}</span>
//           </div>
//         )}
//       </div>

//       {/* Results */}
//       {result && (
//         <div className="space-y-4">
//           {/* Summary */}
//           <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-3 gap-4 text-center">
//             <div>
//               <div className="text-2xl font-bold text-green-600">
//                 {result.successfulOnboardings}
//               </div>
//               <div className="text-sm text-gray-600">Success</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-red-600">
//                 {result.failedOnboardings}
//               </div>
//               <div className="text-sm text-gray-600">Failed</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800">
//                 {result.totalEmployees}
//               </div>
//               <div className="text-sm text-gray-600">Total</div>
//             </div>
//           </div>

//           {/* Success Rows */}
//           {result.results?.filter((r) => r.status === "SUCCESS").length > 0 && (
//             <div className="bg-green-50 p-4 rounded-lg">
//               <h3 className="font-bold text-green-800 mb-2">
//                 ✅ Success (
//                 {result.results.filter((r) => r.status === "SUCCESS").length})
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm bg-white rounded border">
//                   <thead className="bg-green-100">
//                     <tr>
//                       <th className="p-3 text-left">Row</th>
//                       <th className="p-3 text-left">Employee</th>
//                       <th className="p-3 text-left">User ID</th>
//                       <th className="p-3 text-left">Tickets</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {result.results
//                       .filter((r) => r.status === "SUCCESS")
//                       .map((row, i) => (
//                         <tr key={i} className="border-t hover:bg-green-50">
//                           <td className="p-3 font-mono">{row.rowNumber}</td>
//                           <td className="p-3 font-medium">{row.employeeId}</td>
//                           <td className="p-3 font-mono">{row.createdUserId}</td>
//                           <td className="p-3">
//                             {row.createdTickets?.map((t, j) => (
//                               <span
//                                 key={j}
//                                 className="inline-block bg-white px-2 py-1 rounded text-xs border ml-1"
//                               >
//                                 {t}
//                               </span>
//                             ))}
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Failed Rows - SHOWS EXACT ERROR MESSAGES */}
//           {result.results?.filter((r) => r.status === "FAILED").length > 0 && (
//             <div className="bg-red-50 p-4 rounded-lg">
//               <h3 className="font-bold text-red-800 mb-2">
//                 ❌ Failed (
//                 {result.results.filter((r) => r.status === "FAILED").length})
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm bg-white rounded border">
//                   <thead className="bg-red-100">
//                     <tr>
//                       <th className="p-3 text-left">Row</th>
//                       <th className="p-3 text-left">Employee ID</th>
//                       <th className="p-3 text-left">Error Reason</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {result.results
//                       .filter((r) => r.status === "FAILED")
//                       .map((row, i) => (
//                         <tr key={i} className="border-t hover:bg-red-50">
//                           <td className="p-3 font-bold bg-red-100">
//                             {row.rowNumber}
//                           </td>
//                           <td className="p-3 font-mono">
//                             {row.employeeId || "N/A"}
//                           </td>
//                           <td className="p-3 text-red-800 max-w-md break-words">
//                             {row.message || "Unknown error"}
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Excel Template - Compact */}
//       <div className="mt-8 bg-gray-100 p-4 rounded-lg">
//         <h3 className="font-bold mb-3">📋 Excel Format (Columns A-N)</h3>
//         <div className="overflow-x-auto text-xs">
//           <table className="bg-white border">
//             <thead>
//               <tr className="bg-blue-600 text-white">
//                 <th className="p-2">A</th>
//                 <th className="p-2">B</th>
//                 <th className="p-2">C</th>
//                 <th className="p-2">D</th>
//                 <th className="p-2">E</th>
//                 <th className="p-2">F</th>
//                 <th className="p-2">G</th>
//                 <th className="p-2">H</th>
//                 <th className="p-2">I</th>
//                 <th className="p-2">J</th>
//                 <th className="p-2">K</th>
//                 <th className="p-2 bg-yellow-200">L</th>
//                 <th className="p-2 bg-green-200">M</th>
//                 <th className="p-2 bg-purple-200">N</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="font-semibold">
//                 <td className="p-2 border">employeeId</td>
//                 <td className="p-2 border">username</td>
//                 <td className="p-2 border">profEmail</td>
//                 <td className="p-2 border">personalEmail</td>
//                 <td className="p-2 border">phone</td>
//                 <td className="p-2 border">department</td>
//                 <td className="p-2 border">site</td>
//                 <td className="p-2 border">location</td>
//                 <td className="p-2 border">aadhar</td>
//                 <td className="p-2 border">pan</td>
//                 <td className="p-2 border">note</td>
//                 <td className="p-2 border text-center">CUG/SIM</td>
//                 <td className="p-2 border text-center">Laptop</td>
//                 <td className="p-2 border text-center">Email</td>
//               </tr>
//               <tr>
//                 <td className="p-2 border font-mono">EMP001</td>
//                 <td className="p-2 border">john.doe</td>
//                 <td className="p-2 border">john@comp</td>
//                 <td className="p-2 border">-</td>
//                 <td className="p-2 border">98765...</td>
//                 <td className="p-2 border">IT</td>
//                 <td className="p-2 border">HQ</td>
//                 <td className="p-2 border">Floor1</td>
//                 <td className="p-2 border">-</td>
//                 <td className="p-2 border">-</td>
//                 <td className="p-2 border">-</td>
//                 <td className="p-2 border bg-yellow-100 font-bold">YES</td>
//                 <td className="p-2 border bg-green-100 font-bold">YES</td>
//                 <td className="p-2 border bg-purple-100 font-bold">NO</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <p className="text-xs mt-2 text-gray-600">
//           Use "YES/Y/1" for requirements
//         </p>
//       </div>
//     </div>
//   );
// }

import { uploadOnboardingExcel } from "../services/api";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function EmployeeOnboardingPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [downloadingDemo, setDownloadingDemo] = useState(false);

  const CheckIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  const UploadIcon = () => (
    <svg
      className="w-12 h-12"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setResult(null);
  };

  //   const handleUpload = async () => {
  //     if (!file) {
  //       setError("Please select an Excel file.");
  //       return;
  //     }

  //     // Simulate API call - replace with your actual API
  //     setLoading(true);
  //     setTimeout(() => {
  //       setResult({
  //         totalEmployees: 5,
  //         successfulOnboardings: 4,
  //         failedOnboardings: 1,
  //         results: [
  //           {
  //             rowNumber: 2,
  //             employeeId: "EMP001",
  //             status: "SUCCESS",
  //             createdUserId: "USR_001",
  //             createdTickets: ["TKT_CUG_001", "TKT_LAPTOP_001"],
  //           },
  //           {
  //             rowNumber: 3,
  //             employeeId: "EMP002",
  //             status: "SUCCESS",
  //             createdUserId: "USR_002",
  //             createdTickets: ["TKT_EMAIL_002"],
  //           },
  //           {
  //             rowNumber: 4,
  //             employeeId: "EMP003",
  //             status: "FAILED",
  //             message: "Duplicate username found in the system",
  //           },
  //           {
  //             rowNumber: 5,
  //             employeeId: "EMP004",
  //             status: "SUCCESS",
  //             createdUserId: "USR_004",
  //             createdTickets: ["TKT_LAPTOP_004", "TKT_EMAIL_004"],
  //           },
  //           {
  //             rowNumber: 6,
  //             employeeId: "EMP005",
  //             status: "SUCCESS",
  //             createdUserId: "USR_005",
  //             createdTickets: ["TKT_CUG_005"],
  //           },
  //         ],
  //       });
  //       setLoading(false);
  //     }, 2000);
  //   };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an Excel file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      // ✅ REAL API CALL - Your actual service
      const response = await uploadOnboardingExcel(file);
      setResult(response);
    } catch (err) {
      // ✅ Handle real API errors
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Upload failed. Please check file format and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const generateDemoTemplate = () => {
    try {
      setDownloadingDemo(true);

      const headers = [
        "employeeId",
        "username",
        "professionalEmail",
        "personalEmail",
        "phoneNumber",
        "department",
        "siteName",
        "locationName",
        "aadharNumber",
        "panNumber",
        "note",
        "cugRequired",
        "isLaptopOrDesktopRequired",
        "designation",
        "replacementEmployee",
        "emailProvisionRequired",
      ];

      const demoData = [
        [
          "EMP001",
          "john.doe",
          "john.doe@company.com",
          "john.personal@gmail.com",
          "9876543210",
          "IT",
          "Head Office",
          "Building A - Floor 3",
          "123456789012",
          "ABCDE1234F",
          "New hire - Software Developer",
          "YES",
          "YES",
          "Senior Developer",
          "",
          "YES",
        ],
        [
          "EMP002",
          "jane.smith",
          "jane.smith@company.com",
          "jane.personal@gmail.com",
          "9876543211",
          "HR",
          "Head Office",
          "Building B - Floor 2",
          "234567890123",
          "BCDEF2345G",
          "HR Manager position",
          "NO",
          "YES",
          "HR Manager",
          "EMP_OLD_001",
          "YES",
        ],
        [
          "EMP003",
          "mike.wilson",
          "mike.wilson@company.com",
          "",
          "9876543212",
          "Finance",
          "Branch Office",
          "Building C - Floor 1",
          "",
          "CDEFG3456H",
          "",
          "YES",
          "NO",
          "Accountant",
          "",
          "NO",
        ],
        [
          "EMP004",
          "sarah.brown",
          "sarah.brown@company.com",
          "sarah@outlook.com",
          "9876543213",
          "Marketing",
          "Head Office",
          "Building A - Floor 2",
          "345678901234",
          "DEFGH4567I",
          "Marketing Executive - Digital Team",
          "YES",
          "YES",
          "Marketing Executive",
          "",
          "YES",
        ],
        [
          "EMP005",
          "david.jones",
          "david.jones@company.com",
          "",
          "9876543214",
          "Operations",
          "Warehouse",
          "Warehouse - Ground Floor",
          "456789012345",
          "",
          "Operations supervisor",
          "NO",
          "NO",
          "Operations Supervisor",
          "",
          "NO",
        ],
      ];

      const ws = XLSX.utils.aoa_to_sheet([headers, ...demoData]);

      // Set column widths
      ws["!cols"] = [
        { wch: 12 },
        { wch: 15 },
        { wch: 25 },
        { wch: 25 },
        { wch: 15 },
        { wch: 12 },
        { wch: 15 },
        { wch: 22 },
        { wch: 15 },
        { wch: 12 },
        { wch: 30 },
        { wch: 12 },
        { wch: 25 },
        { wch: 20 },
        { wch: 20 },
        { wch: 22 },
      ];

      // Style header row
      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "2563EB" } },
        alignment: { horizontal: "center", vertical: "center" },
      };

      headers.forEach((_, idx) => {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: idx });
        if (!ws[cellRef]) ws[cellRef] = { t: "s", v: headers[idx] };
        ws[cellRef].s = headerStyle;
      });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Onboarding Template");

      XLSX.writeFile(wb, "employee-onboarding-template.xlsx");
    } catch (err) {
      setError("Failed to generate demo template");
    } finally {
      setDownloadingDemo(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">

    <div className="lg:ml-40 pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Bulk Employee Onboarding System
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Automated Employee Onboarding
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload Excel file to create users and generate asset tickets
            automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Upload Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Upload Excel
                </h2>
                <p className="text-sm text-gray-500">
                  Drag & drop or click to browse
                </p>
              </div>
            </div>

            {/* File Drop Zone */}
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {file ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mx-auto mb-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                    <UploadIcon />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-1">
                    Choose Excel file
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports .xlsx, .xls (max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <button
                onClick={generateDemoTemplate}
                disabled={downloadingDemo}
                className="w-full py-3 px-4 border-2 border-dashed border-blue-300 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 hover:border-blue-400 font-semibold transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {downloadingDemo ? "Generating..." : "Download Demo Template"}
              </button>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Process Onboarding Now
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XIcon />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Template Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Required Format
                </h2>
                <p className="text-sm text-gray-500">16 columns (A-P)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Required Columns
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      A
                    </span>
                    <span className="font-mono text-gray-700">employeeId</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      B
                    </span>
                    <span className="font-mono text-gray-700">username</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      C
                    </span>
                    <span className="font-mono text-gray-700">
                      professionalEmail
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      D
                    </span>
                    <span className="font-mono text-gray-700">
                      personalEmail
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      E
                    </span>
                    <span className="font-mono text-gray-700">phoneNumber</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      F
                    </span>
                    <span className="font-mono text-gray-700">department</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Asset Requirements (use YES/NO/1/0)
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      L
                    </span>
                    <span className="font-mono text-gray-700">cugRequired</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      M
                    </span>
                    <span className="font-mono text-gray-700">
                      laptopRequired
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">
                      P
                    </span>
                    <span className="font-mono text-gray-700">
                      emailRequired
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  📝 Example Row
                </h3>
                <div className="text-xs font-mono bg-white p-3 rounded border overflow-x-auto">
                  <div className="text-gray-600">
                    EMP001 | john.doe | john@company.com | ... | YES | YES | NO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium mb-1">
                      Successful
                    </p>
                    <p className="text-4xl font-bold">
                      {result.successfulOnboardings}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <CheckIcon />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium mb-1">
                      Failed
                    </p>
                    <p className="text-4xl font-bold">
                      {result.failedOnboardings}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <XIcon />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium mb-1">
                      Total Rows
                    </p>
                    <p className="text-4xl font-bold">
                      {result.totalEmployees}
                    </p>
                    <p className="text-xs text-blue-100 mt-1">
                      {(
                        (result.successfulOnboardings / result.totalEmployees) *
                        100
                      ).toFixed(1)}
                      % success rate
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    📊
                  </div>
                </div>
              </div>
            </div>

            {/* Success Table */}
            {result.results?.filter((r) => r.status === "SUCCESS").length >
              0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Successfully Onboarded (
                  {result.results.filter((r) => r.status === "SUCCESS").length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
                      <tr>
                        <th className="p-3 text-left font-semibold text-gray-700">
                          Row
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700">
                          Employee ID
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700">
                          User NAME
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700">
                          Generated Tickets
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.results
                        .filter((r) => r.status === "SUCCESS")
                        .map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-green-50 transition-colors"
                          >
                            <td className="p-3 font-mono text-gray-600">
                              {row.rowNumber}
                            </td>
                            <td className="p-3 font-semibold text-gray-800">
                              {row.employeeId}
                            </td>
                            <td className="p-3">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                {row.createdUserId}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-2">
                                {row.createdTickets?.map((t, j) => (
                                  <span
                                    key={j}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono border border-gray-200"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Failed Table */}
            {result.results?.filter((r) => r.status === "FAILED").length >
              0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Failed Onboarding (
                  {result.results.filter((r) => r.status === "FAILED").length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-red-50 to-pink-50 border-b-2 border-red-200">
                      <tr>
                        <th className="p-3 text-left font-semibold text-gray-700">
                          Row
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700">
                          Employee ID
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700">
                          Error Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.results
                        .filter((r) => r.status === "FAILED")
                        .map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-red-50 transition-colors"
                          >
                            <td className="p-3">
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded font-mono text-xs font-bold">
                                {row.rowNumber}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-gray-700">
                              {row.employeeId || "N/A"}
                            </td>
                            <td className="p-3 text-red-700 font-medium">
                              {row.message || "Unknown error"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
