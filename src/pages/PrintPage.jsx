// // // // // // import api from "../services/api";
// // // // // // import React, { useState, useEffect } from "react";

// // // // // // const PrintPage = () => {
// // // // // //   const [tagInput, setTagInput] = useState("");
// // // // // //   const [tags, setTags] = useState([]);
// // // // // //   const [imageMap, setImageMap] = useState({}); // <--- store blob URLs

// // // // // //   const fetchTags = async () => {
// // // // // //     try {
// // // // // //       const url =
// // // // // //         tagInput.trim() === ""
// // // // // //           ? "/tags/assets/print"
// // // // // //           : `/tags/assets/print/${tagInput}`;

// // // // // //       const res = await api.get(url);
// // // // // //       const data = Array.isArray(res.data) ? res.data : [res.data];

// // // // // //       setTags(data);

// // // // // //       // Fetch blobs for each tag
// // // // // //       data.forEach((t) => loadImages(t));
// // // // // //     } catch (err) {
// // // // // //       console.error("Error loading tags:", err);
// // // // // //     }
// // // // // //   };

// // // // // //   // Fetch QR + Barcode with Authorization header
// // // // // //   const loadImages = async (item) => {
// // // // // //     try {
// // // // // //       const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
// // // // // //       const barcodeRes = await api.get(item.barcodeUrl, {
// // // // // //         responseType: "blob",
// // // // // //       });

// // // // // //       setImageMap((prev) => ({
// // // // // //         ...prev,
// // // // // //         [item.assetTag]: {
// // // // // //           qr: URL.createObjectURL(qrRes.data),
// // // // // //           barcode: URL.createObjectURL(barcodeRes.data),
// // // // // //         },
// // // // // //       }));
// // // // // //     } catch (err) {
// // // // // //       console.error("Image fetch error:", err);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     const delay = setTimeout(fetchTags, 400);
// // // // // //     return () => clearTimeout(delay);
// // // // // //   }, [tagInput]);

// // // // // //   return (
// // // // // //     <div className="pt-16 lg:ml-48">
// // // // // //       <h1 className="text-xl font-bold mb-4">Print Asset Tags</h1>

// // // // // //       <input
// // // // // //         type="text"
// // // // // //         placeholder="Enter Asset Tag (optional)"
// // // // // //         value={tagInput}
// // // // // //         onChange={(e) => setTagInput(e.target.value)}
// // // // // //         className="border p-2 w-64 rounded mb-4"
// // // // // //       />

// // // // // //       <button
// // // // // //         onClick={() => window.print()}
// // // // // //         className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
// // // // // //       >
// // // // // //         Print
// // // // // //       </button>

// // // // // //       <div className="grid grid-cols-3 gap-4 mt-6">
// // // // // //         {tags.map((item, index) => (
// // // // // //           <div key={index} className="border p-3 rounded shadow text-center">
// // // // // //             <h2 className="font-bold text-lg mb-2">{item.assetTag}</h2>

// // // // // //             {/* QR */}
// // // // // //             {imageMap[item.assetTag] ? (
// // // // // //               <img
// // // // // //                 src={imageMap[item.assetTag].qr}
// // // // // //                 alt="QR Code"
// // // // // //                 className="w-32 h-32 mx-auto"
// // // // // //               />
// // // // // //             ) : (
// // // // // //               <p>Loading QR...</p>
// // // // // //             )}

// // // // // //             {/* Barcode */}
// // // // // //             {imageMap[item.assetTag] ? (
// // // // // //               <img
// // // // // //                 src={imageMap[item.assetTag].barcode}
// // // // // //                 alt="Barcode"
// // // // // //                 className="w-40 h-16 mx-auto mt-2"
// // // // // //               />
// // // // // //             ) : (
// // // // // //               <p>Loading Barcode...</p>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PrintPage;

// // // // // import api from "../services/api";
// // // // // import React, { useState, useEffect } from "react";

// // // // // const PrintPage = () => {
// // // // //   const [tagInput, setTagInput] = useState("");
// // // // //   const [tags, setTags] = useState([]);
// // // // //   const [imageMap, setImageMap] = useState({});

// // // // //   const fetchTags = async () => {
// // // // //     try {
// // // // //       const url =
// // // // //         tagInput.trim() === ""
// // // // //           ? "/tags/assets/print"
// // // // //           : `/tags/assets/print/${tagInput}`;

// // // // //       const res = await api.get(url);
// // // // //       const data = Array.isArray(res.data) ? res.data : [res.data];

// // // // //       setTags(data);
// // // // //       data.forEach((item) => loadImages(item));
// // // // //     } catch (err) {
// // // // //       console.error("Error loading tags:", err);
// // // // //     }
// // // // //   };

// // // // //   const loadImages = async (item) => {
// // // // //     try {
// // // // //       const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
// // // // //       const barcodeRes = await api.get(item.barcodeUrl, {
// // // // //         responseType: "blob",
// // // // //       });

// // // // //       setImageMap((prev) => ({
// // // // //         ...prev,
// // // // //         [item.assetTag]: {
// // // // //           qr: URL.createObjectURL(qrRes.data),
// // // // //           barcode: URL.createObjectURL(barcodeRes.data),
// // // // //         },
// // // // //       }));
// // // // //     } catch (err) {
// // // // //       console.error("Image fetch error:", err);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     const delay = setTimeout(fetchTags, 400);
// // // // //     return () => clearTimeout(delay);
// // // // //   }, [tagInput]);

// // // // //   return (
// // // // //     <div className="pt-16 lg:ml-48 p-4">
// // // // //       <div className="flex items-center gap-4 mb-6">
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Asset Tag (optional)"
// // // // //           value={tagInput}
// // // // //           onChange={(e) => setTagInput(e.target.value)}
// // // // //           className="border p-2 rounded w-60 text-sm"
// // // // //         />

// // // // //         <button
// // // // //           onClick={() => window.print()}
// // // // //           className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
// // // // //         >
// // // // //           Print
// // // // //         </button>
// // // // //       </div>

// // // // //       <div className="grid grid-cols-3 gap-4">
// // // // //         {tags.map((item) => (
// // // // //           <div
// // // // //             key={item.assetTag}
// // // // //             className="border p-2 rounded shadow-sm text-center"
// // // // //           >
// // // // //             <p className="font-semibold text-sm mb-2">{item.assetTag}</p>

// // // // //             {imageMap[item.assetTag] ? (
// // // // //               <>
// // // // //                 <img
// // // // //                   src={imageMap[item.assetTag].qr}
// // // // //                   alt="QR"
// // // // //                   className="w-24 h-24 mx-auto"
// // // // //                 />
// // // // //                 <img
// // // // //                   src={imageMap[item.assetTag].barcode}
// // // // //                   alt="Barcode"
// // // // //                   className="w-32 h-12 mx-auto mt-1"
// // // // //                 />
// // // // //               </>
// // // // //             ) : (
// // // // //               <p className="text-xs text-gray-500">Loading...</p>
// // // // //             )}
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PrintPage;

// // // // import api from "../services/api";
// // // // import React, { useState, useEffect } from "react";

// // // // const PrintPage = () => {
// // // //   const [tagInput, setTagInput] = useState("");
// // // //   const [tags, setTags] = useState([]);
// // // //   const [imageMap, setImageMap] = useState({});

// // // //   const fetchTags = async () => {
// // // //     try {
// // // //       const url =
// // // //         tagInput.trim() === ""
// // // //           ? "/tags/assets/print"
// // // //           : `/tags/assets/print/${tagInput}`;

// // // //       const res = await api.get(url);
// // // //       const data = Array.isArray(res.data) ? res.data : [res.data];

// // // //       setTags(data);
// // // //       data.forEach((item) => loadImages(item));
// // // //     } catch (err) {
// // // //       console.error("Error loading tags:", err);
// // // //     }
// // // //   };

// // // //   const loadImages = async (item) => {
// // // //     try {
// // // //       const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
// // // //       const barcodeRes = await api.get(item.barcodeUrl, {
// // // //         responseType: "blob",
// // // //       });

// // // //       setImageMap((prev) => ({
// // // //         ...prev,
// // // //         [item.assetTag]: {
// // // //           qr: URL.createObjectURL(qrRes.data),
// // // //           barcode: URL.createObjectURL(barcodeRes.data),
// // // //         },
// // // //       }));
// // // //     } catch (err) {
// // // //       console.error("Image load error:", err);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     const delay = setTimeout(fetchTags, 400);
// // // //     return () => clearTimeout(delay);
// // // //   }, [tagInput]);

// // // //   return (
// // // //     <div className="pt-16 lg:ml-48 p-4 print:p-0">
// // // //       {/* Search + Print */}
// // // //       <div className="flex items-center gap-3 mb-6">
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Asset Tag (optional)"
// // // //           value={tagInput}
// // // //           onChange={(e) => setTagInput(e.target.value)}
// // // //           className="border p-2 rounded w-52 text-sm"
// // // //         />

// // // //         <button
// // // //           onClick={() => window.print()}
// // // //           className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
// // // //         >
// // // //           Print
// // // //         </button>
// // // //       </div>

// // // //       {/* Labels Grid */}
// // // //       <div className="grid grid-cols-4 gap-3 print:grid-cols-5">
// // // //         {tags.map((item) => (
// // // //           <div
// // // //             key={item.assetTag}
// // // //             className="border rounded-md p-2 shadow-sm text-center text-xs leading-tight"
// // // //             style={{ width: "140px" }} // Perfect sticker width
// // // //           >
// // // //             {/* Branding */}
// // // //             <p className="font-bold text-[10px] mb-1 tracking-wide">
// // // //               MAHAVIR GROUP
// // // //             </p>

// // // //             {/* Asset Tag */}
// // // //             <p className="font-semibold text-[11px] mb-1">{item.assetTag}</p>

// // // //             {/* QR + Barcode */}
// // // //             {imageMap[item.assetTag] ? (
// // // //               <>
// // // //                 <img
// // // //                   src={imageMap[item.assetTag].qr}
// // // //                   alt="QR"
// // // //                   className="w-16 h-16 mx-auto"
// // // //                 />
// // // //                 <img
// // // //                   src={imageMap[item.assetTag].barcode}
// // // //                   alt="Barcode"
// // // //                   className="w-24 h-10 mx-auto mt-1"
// // // //                 />
// // // //               </>
// // // //             ) : (
// // // //               <p className="text-gray-500 text-[10px]">Loading...</p>
// // // //             )}
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PrintPage;

// // // import api from "../services/api";
// // // import React, { useState, useEffect } from "react";

// // // const PrintPage = () => {
// // //   const [tagInput, setTagInput] = useState("");
// // //   const [tags, setTags] = useState([]);
// // //   const [imageMap, setImageMap] = useState({});

// // //   const LOGO_URL =
// // //     "https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220";

// // //   const fetchTags = async () => {
// // //     try {
// // //       const url =
// // //         tagInput.trim() === ""
// // //           ? "/tags/assets/print"
// // //           : `/tags/assets/print/${tagInput}`;

// // //       const res = await api.get(url);
// // //       const data = Array.isArray(res.data) ? res.data : [res.data];
// // //       setTags(data);

// // //       data.forEach((item) => loadImages(item));
// // //     } catch (err) {
// // //       console.error("Error loading tags:", err);
// // //     }
// // //   };

// // //   const loadImages = async (item) => {
// // //     try {
// // //       const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
// // //       const barcodeRes = await api.get(item.barcodeUrl, {
// // //         responseType: "blob",
// // //       });

// // //       setImageMap((prev) => ({
// // //         ...prev,
// // //         [item.assetTag]: {
// // //           qr: URL.createObjectURL(qrRes.data),
// // //           barcode: URL.createObjectURL(barcodeRes.data),
// // //         },
// // //       }));
// // //     } catch (err) {
// // //       console.error("Image loading error:", err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const delay = setTimeout(fetchTags, 400);
// // //     return () => clearTimeout(delay);
// // //   }, [tagInput]);

// // //   return (
// // //     <div className="pt-16 lg:ml-48 p-4 print:p-0">
// // //       {/* Search */}
// // //       <div className="flex items-center gap-3 mb-6">
// // //         <input
// // //           type="text"
// // //           placeholder="Asset Tag (optional)"
// // //           value={tagInput}
// // //           onChange={(e) => setTagInput(e.target.value)}
// // //           className="border p-2 rounded w-52 text-sm"
// // //         />

// // //         <button
// // //           onClick={() => window.print()}
// // //           className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
// // //         >
// // //           Print
// // //         </button>
// // //       </div>

// // //       {/* Horizontal Labels */}
// // //       <div className="grid grid-cols-1 gap-3 print:grid-cols-1">
// // //         {tags.map((item) => (
// // //           <div
// // //             key={item.assetTag}
// // //             className="border rounded-md shadow-sm p-2 flex items-center gap-3 bg-white"
// // //             style={{ width: "380px", height: "110px" }} // PERFECT HORIZONTAL STICKER SIZE
// // //           >
// // //             {/* LOGO */}
// // //             <img
// // //               src={LOGO_URL}
// // //               alt="Logo"
// // //               className="w-12 h-12 object-contain"
// // //             />

// // //             {/* QR */}
// // //             {imageMap[item.assetTag] ? (
// // //               <img
// // //                 src={imageMap[item.assetTag].qr}
// // //                 alt="QR"
// // //                 className="w-16 h-16"
// // //               />
// // //             ) : (
// // //               <p className="text-[10px] text-gray-400">Loading QR...</p>
// // //             )}

// // //             {/* BARCODE + TEXT */}
// // //             <div className="flex flex-col items-center justify-center flex-1">
// // //               <p className="font-bold text-xs mb-1 tracking-wide">
// // //                 MAHAVIR GROUP
// // //               </p>

// // //               <p className="text-xs font-semibold mb-1">{item.assetTag}</p>

// // //               {imageMap[item.assetTag] ? (
// // //                 <img
// // //                   src={imageMap[item.assetTag].barcode}
// // //                   alt="Barcode"
// // //                   className="w-32 h-10"
// // //                 />
// // //               ) : (
// // //                 <p className="text-[10px] text-gray-400">Loading barcode...</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PrintPage;

// // import api from "../services/api";
// // import React, { useState, useEffect } from "react";

// // const PrintPage = () => {
// //   const [tagInput, setTagInput] = useState("");
// //   const [tags, setTags] = useState([]);
// //   const [imageMap, setImageMap] = useState({});

// //   const LOGO_URL =
// //     "https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220";

// //   const fetchTags = async () => {
// //     try {
// //       const url =
// //         tagInput.trim() === ""
// //           ? "/tags/assets/print"
// //           : `/tags/assets/print/${tagInput}`;

// //       const res = await api.get(url);
// //       const data = Array.isArray(res.data) ? res.data : [res.data];
// //       setTags(data);

// //       data.forEach((item) => loadImages(item));
// //     } catch (err) {
// //       console.error("Error loading tags:", err);
// //     }
// //   };

// //   const loadImages = async (item) => {
// //     try {
// //       // QR (COMMENTED OUT — still fetched if needed later)
// //       // const qrRes = await api.get(item.qrUrl, { responseType: "blob" });

// //       const barcodeRes = await api.get(item.barcodeUrl, {
// //         responseType: "blob",
// //       });

// //       setImageMap((prev) => ({
// //         ...prev,
// //         [item.assetTag]: {
// //           // qr: URL.createObjectURL(qrRes.data),  // COMMENTED OUT
// //           barcode: URL.createObjectURL(barcodeRes.data),
// //         },
// //       }));
// //     } catch (err) {
// //       console.error("Image loading error:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     const delay = setTimeout(fetchTags, 400);
// //     return () => clearTimeout(delay);
// //   }, [tagInput]);

// //   return (
// //     <div className="pt-16 lg:ml-48 p-4 print:p-0">
// //       {/* Search */}
// //       <div className="flex items-center gap-3 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Asset Tag (optional)"
// //           value={tagInput}
// //           onChange={(e) => setTagInput(e.target.value)}
// //           className="border p-2 rounded w-52 text-sm"
// //         />

// //         <button
// //           onClick={() => window.print()}
// //           className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
// //         >
// //           Print
// //         </button>
// //       </div>

// //       {/* Horizontal Sticker Layout */}
// //       <div className="grid grid-cols-1 gap-3 print:grid-cols-1">
// //         {tags.map((item) => (
// //           <div
// //             key={item.assetTag}
// //             className="border rounded-md shadow-sm p-2 flex items-center gap-4 bg-white"
// //             style={{
// //               width: "360px",
// //               height: "110px",
// //             }}
// //           >
// //             {/* Logo */}
// //             <img
// //               src={LOGO_URL}
// //               alt="Logo"
// //               className="w-14 h-14 object-contain"
// //             />

// //             {/* QR (COMMENTED OUT) */}
// //             {/*
// //             {imageMap[item.assetTag]?.qr && (
// //               <img
// //                 src={imageMap[item.assetTag].qr}
// //                 alt="QR"
// //                 className="w-16 h-16"
// //               />
// //             )}
// //             */}

// //             {/* Barcode + Tag */}
// //             <div className="flex flex-col items-center justify-center flex-1">
// //               {imageMap[item.assetTag] ? (
// //                 <img
// //                   src={imageMap[item.assetTag].barcode}
// //                   alt="Barcode"
// //                   className="w-32 h-10"
// //                 />
// //               ) : (
// //                 <p className="text-[10px] text-gray-400">Loading barcode...</p>
// //               )}

// //               {/* Asset Tag below barcode */}
// //               <p className="text-xs font-bold mt-2 tracking-wide">
// //                 {item.assetTag}
// //               </p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PrintPage;

// // import api from "../services/api";
// // import React, { useState, useEffect } from "react";

// // const PrintPage = () => {
// //   const [tagInput, setTagInput] = useState("");
// //   const [tags, setTags] = useState([]);
// //   const [imageMap, setImageMap] = useState({});
// //   const [mode, setMode] = useState("barcode"); // "barcode" | "qr"

// //   const LOGO_URL =
// //     "https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220";

// //   const fetchTags = async () => {
// //     try {
// //       const url =
// //         tagInput.trim() === ""
// //           ? "/tags/assets/print"
// //           : `/tags/assets/print/${tagInput}`;

// //       const res = await api.get(url);
// //       const data = Array.isArray(res.data) ? res.data : [res.data];

// //       setTags(data);
// //       data.forEach((item) => loadImages(item));
// //     } catch (err) {
// //       console.error("Error loading tags:", err);
// //     }
// //   };

// //   const loadImages = async (item) => {
// //     try {
// //       let qrBlob = null;
// //       let barcodeBlob = null;

// //       if (mode === "qr") {
// //         const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
// //         qrBlob = URL.createObjectURL(qrRes.data);
// //       }

// //       if (mode === "barcode") {
// //         const barcodeRes = await api.get(item.barcodeUrl, {
// //           responseType: "blob",
// //         });
// //         barcodeBlob = URL.createObjectURL(barcodeRes.data);
// //       }

// //       setImageMap((prev) => ({
// //         ...prev,
// //         [item.assetTag]: {
// //           qr: qrBlob,
// //           barcode: barcodeBlob,
// //         },
// //       }));
// //     } catch (err) {
// //       console.error("Image loading error:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     const delay = setTimeout(fetchTags, 400);
// //     return () => clearTimeout(delay);
// //   }, [tagInput, mode]); // reload when mode changes

// //   return (
// //     <div className="pt-16 lg:ml-48 p-4">
// //       {/* Search + Print */}
// //       <div className="flex items-center gap-3 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Asset Tag (optional)"
// //           value={tagInput}
// //           onChange={(e) => setTagInput(e.target.value)}
// //           className="border p-2 rounded w-52 text-sm"
// //         />

// //         <button
// //           onClick={() => window.print()}
// //           className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
// //         >
// //           Print
// //         </button>
// //       </div>

// //       {/* Mode Buttons */}
// //       <div className="flex gap-3 mb-6">
// //         <button
// //           onClick={() => setMode("barcode")}
// //           className={`px-4 py-2 rounded text-sm ${
// //             mode === "barcode" ? "bg-black text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           Generate Barcode Tag
// //         </button>

// //         <button
// //           onClick={() => setMode("qr")}
// //           className={`px-4 py-2 rounded text-sm ${
// //             mode === "qr" ? "bg-black text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           Generate QR Code Tag
// //         </button>
// //       </div>

// //       {/* Tag Layout */}
// //       <div className="grid grid-cols-1 gap-3 print:grid-cols-1">
// //         {tags.map((item) => (
// //           <div
// //             key={item.assetTag}
// //             className="border rounded-md shadow-sm p-2 flex items-center gap-4 bg-white"
// //             style={{ width: "360px", height: "110px" }}
// //           >
// //             <img src={LOGO_URL} className="w-14 h-14" alt="Logo" />

// //             <div className="flex flex-col items-center justify-center flex-1">
// //               {/* QR MODE */}
// //               {mode === "qr" && imageMap[item.assetTag]?.qr && (
// //                 <img
// //                   src={imageMap[item.assetTag].qr}
// //                   alt="QR"
// //                   className="w-24 h-24"
// //                 />
// //               )}

// //               {/* BARCODE MODE */}
// //               {mode === "barcode" && imageMap[item.assetTag]?.barcode && (
// //                 <img
// //                   src={imageMap[item.assetTag].barcode}
// //                   alt="Barcode"
// //                   className="w-32 h-10"
// //                 />
// //               )}

// //               {/* Asset Tag */}
// //               <p className="text-xs font-bold mt-2 tracking-wide">
// //                 {item.assetTag}
// //               </p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PrintPage;

// import api from "../services/api";
// import { Printer, Tag, QrCode, Barcode } from "lucide-react";
// import React, { useState, useEffect } from "react";

// const PrintPage = () => {
//   const [tagInput, setTagInput] = useState("");
//   const [tags, setTags] = useState([]);
//   const [imageMap, setImageMap] = useState({});
//   const [mode, setMode] = useState("barcode");
//   const [loading, setLoading] = useState(false);

//   const LOGO_URL =
//     "https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220";

//   const fetchTags = async () => {
//     setLoading(true);
//     try {
//       const url =
//         tagInput.trim() === ""
//           ? "/tags/assets/print"
//           : `/tags/assets/print/${tagInput}`;

//       const res = await api.get(url);
//       const data = Array.isArray(res.data) ? res.data : [res.data];

//       setTags(data);
//       setImageMap({}); // Clear previous images
//       data.forEach((item) => loadImages(item));
//     } catch (err) {
//       console.error("Error loading tags:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadImages = async (item) => {
//     try {
//       const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
//       const qrBlob = URL.createObjectURL(qrRes.data);

//       const barcodeRes = await api.get(item.barcodeUrl, {
//         responseType: "blob",
//       });
//       const barcodeBlob = URL.createObjectURL(barcodeRes.data);

//       setImageMap((prev) => ({
//         ...prev,
//         [item.assetTag]: {
//           qr: qrBlob,
//           barcode: barcodeBlob,
//         },
//       }));
//     } catch (err) {
//       console.error("Image loading error:", err);
//     }
//   };

//   useEffect(() => {
//     const delay = setTimeout(fetchTags, 400);
//     return () => clearTimeout(delay);
//   }, [tagInput, mode]);

//   return (
//     <>
//       {/* Screen View */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-20 lg:ml-48 p-6 print:hidden">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
//                   <Tag className="w-8 h-8 text-blue-600" />
//                   Asset Tag Generator
//                 </h1>
//                 <p className="text-slate-600">
//                   Create and print professional asset tags
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-slate-500 mb-1">Property of</p>
//                 <p className="text-lg font-bold text-slate-800">
//                   Mahavir Group
//                 </p>
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="flex flex-wrap items-center gap-4">
//               <div className="flex-1 min-w-64">
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Search Asset Tag
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter asset tag to filter..."
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   className="w-full border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl text-sm transition-all outline-none"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setMode("barcode")}
//                   className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
//                     mode === "barcode"
//                       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   <Barcode className="w-4 h-4" />
//                   Barcode
//                 </button>

//                 <button
//                   onClick={() => setMode("qr")}
//                   className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
//                     mode === "qr"
//                       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   <QrCode className="w-4 h-4" />
//                   QR Code
//                 </button>

//                 <button
//                   onClick={() => window.print()}
//                   className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-200"
//                 >
//                   <Printer className="w-4 h-4" />
//                   Print All
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tags Preview */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
//             <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//               Preview ({tags.length} {tags.length === 1 ? "tag" : "tags"})
//             </h2>

//             {loading ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//               </div>
//             ) : tags.length === 0 ? (
//               <div className="text-center py-12">
//                 <Tag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                 <p className="text-slate-500">No asset tags found</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {tags.map((item) => (
//                   <div
//                     key={item.assetTag}
//                     className="border-2 border-slate-200 rounded-xl shadow-md hover:shadow-xl transition-all p-4 bg-gradient-to-br from-white to-slate-50"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={LOGO_URL}
//                         className="w-16 h-16 rounded-lg"
//                         alt="Logo"
//                       />

//                       <div className="flex flex-col items-center justify-center flex-1">
//                         {mode === "qr" && imageMap[item.assetTag]?.qr && (
//                           <img
//                             src={imageMap[item.assetTag].qr}
//                             alt="QR"
//                             className="w-24 h-24 rounded"
//                           />
//                         )}

//                         {mode === "barcode" &&
//                           imageMap[item.assetTag]?.barcode && (
//                             <img
//                               src={imageMap[item.assetTag].barcode}
//                               alt="Barcode"
//                               className="w-32 h-12"
//                             />
//                           )}

//                         {!imageMap[item.assetTag] && (
//                           <div className="w-24 h-24 flex items-center justify-center">
//                             <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
//                           </div>
//                         )}

//                         <p className="text-sm font-bold mt-3 tracking-wide text-slate-800">
//                           {item.assetTag}
//                         </p>
//                         <p className="text-xs text-slate-500 mt-1">
//                           Mahavir Group
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Print View - 0.75" x 1.5" labels */}
//       <style>{`
//         @media print {
//           @page {
//             size: 0.75in 1.5in;
//             margin: 0;
//           }

//           body {
//             margin: 0;
//             padding: 0;
//           }

//           .print-tag {
//             width: 0.75in;
//             height: 1.5in;
//             page-break-after: always;
//             page-break-inside: avoid;
//             margin: 0;
//             padding: 0.05in;
//             box-sizing: border-box;
//           }
//         }
//       `}</style>

//       <div className="hidden print:block">
//         {tags.map((item) => (
//           <div key={item.assetTag} className="print-tag">
//             <div className="flex flex-col items-center justify-between h-full">
//               <img
//                 src={LOGO_URL}
//                 style={{ width: "0.35in", height: "0.35in" }}
//                 alt="Logo"
//               />

//               <div className="flex flex-col items-center justify-center flex-1">
//                 {mode === "qr" && imageMap[item.assetTag]?.qr && (
//                   <img
//                     src={imageMap[item.assetTag].qr}
//                     alt="QR"
//                     style={{ width: "0.6in", height: "0.6in" }}
//                   />
//                 )}

//                 {mode === "barcode" && imageMap[item.assetTag]?.barcode && (
//                   <img
//                     src={imageMap[item.assetTag].barcode}
//                     alt="Barcode"
//                     style={{ width: "0.65in", height: "0.25in" }}
//                   />
//                 )}
//               </div>

//               <div
//                 className="text-center"
//                 style={{ fontSize: "6pt", lineHeight: "1" }}
//               >
//                 <p style={{ fontWeight: "bold", marginBottom: "1pt" }}>
//                   {item.assetTag}
//                 </p>
//                 <p style={{ fontSize: "5pt" }}>Mahavir Group</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default PrintPage;

// import api from "../services/api";
// import { Printer, Tag, QrCode, Barcode } from "lucide-react";
// import React, { useState, useEffect } from "react";

// const PrintPage = () => {
//   const [tagInput, setTagInput] = useState("");
//   const [tags, setTags] = useState([]);
//   const [imageMap, setImageMap] = useState({});
//   const [mode, setMode] = useState("barcode");
//   const [loading, setLoading] = useState(false);

//   const LOGO_URL =
//     "https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220";

//   const fetchTags = async () => {
//     setLoading(true);
//     try {
//       const url =
//         tagInput.trim() === ""
//           ? "/tags/assets/print"
//           : `/tags/assets/print/${tagInput}`;

//       const res = await api.get(url);
//       const data = Array.isArray(res.data) ? res.data : [res.data];

//       setTags(data);
//       setImageMap({}); // Clear previous images
//       data.forEach((item) => loadImages(item));
//     } catch (err) {
//       console.error("Error loading tags:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadImages = async (item) => {
//     try {
//       const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
//       const qrBlob = URL.createObjectURL(qrRes.data);

//       const barcodeRes = await api.get(item.barcodeUrl, {
//         responseType: "blob",
//       });
//       const barcodeBlob = URL.createObjectURL(barcodeRes.data);

//       setImageMap((prev) => ({
//         ...prev,
//         [item.assetTag]: {
//           qr: qrBlob,
//           barcode: barcodeBlob,
//         },
//       }));
//     } catch (err) {
//       console.error("Image loading error:", err);
//     }
//   };

//   useEffect(() => {
//     const delay = setTimeout(fetchTags, 400);
//     return () => clearTimeout(delay);
//   }, [tagInput, mode]);

//   return (
//     <>
//       {/* Screen View */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-20 lg:ml-48 p-6 print:hidden">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
//                   <Tag className="w-8 h-8 text-blue-600" />
//                   Asset Tag Generator
//                 </h1>
//                 <p className="text-slate-600">
//                   Create and print professional asset tags
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-slate-500 mb-1">Property of</p>
//                 <p className="text-lg font-bold text-slate-800">
//                   Mahavir Group
//                 </p>
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="flex flex-wrap items-center gap-4">
//               <div className="flex-1 min-w-64">
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Search Asset Tag
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter asset tag to filter..."
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   className="w-full border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl text-sm transition-all outline-none"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setMode("barcode")}
//                   className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
//                     mode === "barcode"
//                       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   <Barcode className="w-4 h-4" />
//                   Barcode
//                 </button>

//                 <button
//                   onClick={() => setMode("qr")}
//                   className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
//                     mode === "qr"
//                       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   <QrCode className="w-4 h-4" />
//                   QR Code
//                 </button>

//                 <button
//                   onClick={() => window.print()}
//                   className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-200"
//                 >
//                   <Printer className="w-4 h-4" />
//                   Print All
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tags Preview */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
//             <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//               Preview ({tags.length} {tags.length === 1 ? "tag" : "tags"})
//             </h2>

//             {loading ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//               </div>
//             ) : tags.length === 0 ? (
//               <div className="text-center py-12">
//                 <Tag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                 <p className="text-slate-500">No asset tags found</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {tags.map((item) => (
//                   <div
//                     key={item.assetTag}
//                     className="border-2 border-slate-200 rounded-xl shadow-md hover:shadow-xl transition-all p-4 bg-gradient-to-br from-white to-slate-50"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={LOGO_URL}
//                         className="w-16 h-16 rounded-lg"
//                         alt="Logo"
//                       />

//                       <div className="flex flex-col items-center justify-center flex-1">
//                         {mode === "qr" && imageMap[item.assetTag]?.qr && (
//                           <img
//                             src={imageMap[item.assetTag].qr}
//                             alt="QR"
//                             className="w-24 h-24 rounded"
//                           />
//                         )}

//                         {mode === "barcode" &&
//                           imageMap[item.assetTag]?.barcode && (
//                             <img
//                               src={imageMap[item.assetTag].barcode}
//                               alt="Barcode"
//                               className="w-32 h-12"
//                             />
//                           )}

//                         {!imageMap[item.assetTag] && (
//                           <div className="w-24 h-24 flex items-center justify-center">
//                             <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
//                           </div>
//                         )}

//                         <p className="text-sm font-bold mt-3 tracking-wide text-slate-800">
//                           {item.assetTag}
//                         </p>
//                         <p className="text-xs text-slate-500 mt-1">
//                           Mahavir Group
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Print View - 0.75" x 1.5" labels */}
//       <style>{`
//         @media print {
//           * {
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//             color-adjust: exact !important;
//           }

//           @page {
//             size: 1.5in 0.75in;
//             margin: 0;
//           }

//           html, body {
//             margin: 0 !important;
//             padding: 0 !important;
//             width: 1.5in !important;
//             height: 0.75in !important;
//           }

//           .print-container {
//             display: block !important;
//           }

//           .print-tag {
//             width: 1.5in !important;
//             height: 0.75in !important;
//             page-break-after: always;
//             page-break-inside: avoid;
//             margin: 0 !important;
//             padding: 0.04in !important;
//             box-sizing: border-box !important;
//             display: flex !important;
//             background: white !important;
//             position: relative;
//           }

//           .print-tag:last-child {
//             page-break-after: auto;
//           }
//         }
//       `}</style>

//       <div className="hidden print:block print-container">
//         {tags.map((item, index) => (
//           <div key={item.assetTag} className="print-tag">
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.08in",
//                 width: "100%",
//                 height: "100%",
//               }}
//             >
//               <img
//                 src={LOGO_URL}
//                 style={{
//                   width: "0.4in",
//                   height: "0.4in",
//                   objectFit: "contain",
//                   flexShrink: 0,
//                 }}
//                 alt="Logo"
//               />

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flex: 1,
//                   gap: "0.02in",
//                 }}
//               >
//                 {mode === "qr" && imageMap[item.assetTag]?.qr && (
//                   <img
//                     src={imageMap[item.assetTag].qr}
//                     alt="QR"
//                     style={{
//                       width: "0.5in",
//                       height: "0.5in",
//                       objectFit: "contain",
//                     }}
//                   />
//                 )}

//                 {mode === "barcode" && imageMap[item.assetTag]?.barcode && (
//                   <img
//                     src={imageMap[item.assetTag].barcode}
//                     alt="Barcode"
//                     style={{
//                       width: "0.8in",
//                       height: "0.3in",
//                       objectFit: "contain",
//                     }}
//                   />
//                 )}

//                 <div
//                   style={{
//                     textAlign: "center",
//                     marginTop: "0.02in",
//                   }}
//                 >
//                   <p
//                     style={{
//                       fontWeight: "bold",
//                       margin: 0,
//                       padding: 0,
//                       fontSize: "7pt",
//                       lineHeight: "1",
//                       fontFamily: "Arial, sans-serif",
//                     }}
//                   >
//                     {item.assetTag}
//                   </p>
//                   <p
//                     style={{
//                       margin: 0,
//                       padding: 0,
//                       fontSize: "5pt",
//                       lineHeight: "1.2",
//                       fontFamily: "Arial, sans-serif",
//                       marginTop: "1pt",
//                     }}
//                   >
//                     Mahavir Group
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default PrintPage;

import api from "../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Printer, Tag, QrCode, Barcode, Download } from "lucide-react";
import React, { useState, useEffect } from "react";

const PrintPage = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [mode, setMode] = useState("barcode");
  const [loading, setLoading] = useState(false);

  const LOGO_URL =
    "https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220";

  const fetchTags = async () => {
    setLoading(true);
    try {
      const url =
        tagInput.trim() === ""
          ? "/tags/assets/print"
          : `/tags/assets/print/${tagInput}`;

      const res = await api.get(url);
      const data = Array.isArray(res.data) ? res.data : [res.data];

      setTags(data);
      setImageMap({}); // Clear previous images
      data.forEach((item) => loadImages(item));
    } catch (err) {
      console.error("Error loading tags:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadImages = async (item) => {
    try {
      const qrRes = await api.get(item.qrUrl, { responseType: "blob" });
      const qrBlob = URL.createObjectURL(qrRes.data);

      const barcodeRes = await api.get(item.barcodeUrl, {
        responseType: "blob",
      });
      const barcodeBlob = URL.createObjectURL(barcodeRes.data);

      setImageMap((prev) => ({
        ...prev,
        [item.assetTag]: {
          qr: qrBlob,
          barcode: barcodeBlob,
        },
      }));
    } catch (err) {
      console.error("Image loading error:", err);
    }
  };

  const generatePDF = async () => {
    if (tags.length === 0) {
      alert("No tags to print!");
      return;
    }

    // Create PDF with custom page size (1.5" x 0.75")
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [1.5, 0.75],
    });

    const printElements = document.querySelectorAll(".pdf-tag");

    for (let i = 0; i < printElements.length; i++) {
      const element = printElements[i];

      try {
        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");

        if (i > 0) {
          pdf.addPage([1.5, 0.75], "landscape");
        }

        pdf.addImage(imgData, "PNG", 0, 0, 1.5, 0.75);
      } catch (error) {
        console.error("Error generating PDF for tag:", error);
      }
    }

    pdf.save(`Asset_Tags_${mode}_${new Date().getTime()}.pdf`);
  };

  useEffect(() => {
    const delay = setTimeout(fetchTags, 400);
    return () => clearTimeout(delay);
  }, [tagInput, mode]);

  return (
    <>
      {/* Screen View */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-20 lg:ml-48 p-6 print:hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                  <Tag className="w-8 h-8 text-blue-600" />
                  Asset Tag Generator
                </h1>
                <p className="text-slate-600">
                  Create and print professional asset tags
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Property of</p>
                <p className="text-lg font-bold text-slate-800">
                  Mahavir Group
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search Asset Tag
                </label>
                <input
                  type="text"
                  placeholder="Enter asset tag to filter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl text-sm transition-all outline-none"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setMode("barcode")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                    mode === "barcode"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Barcode className="w-4 h-4" />
                  Barcode
                </button>

                <button
                  onClick={() => setMode("qr")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                    mode === "qr"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  QR Code
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-200"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>

                <button
                  onClick={generatePDF}
                  disabled={loading || tags.length === 0}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Tags Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Preview ({tags.length} {tags.length === 1 ? "tag" : "tags"})
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : tags.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No asset tags found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tags.map((item) => (
                  <div
                    key={item.assetTag}
                    className="border-2 border-slate-200 rounded-xl shadow-md hover:shadow-xl transition-all p-4 bg-gradient-to-br from-white to-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={LOGO_URL}
                        className="w-16 h-16 rounded-lg"
                        alt="Logo"
                        crossOrigin="anonymous"
                      />

                      <div className="flex flex-col items-center justify-center flex-1">
                        {mode === "qr" && imageMap[item.assetTag]?.qr && (
                          <img
                            src={imageMap[item.assetTag].qr}
                            alt="QR"
                            className="w-24 h-24 rounded"
                            crossOrigin="anonymous"
                          />
                        )}

                        {mode === "barcode" &&
                          imageMap[item.assetTag]?.barcode && (
                            <img
                              src={imageMap[item.assetTag].barcode}
                              alt="Barcode"
                              className="w-32 h-12"
                              crossOrigin="anonymous"
                            />
                          )}

                        {!imageMap[item.assetTag] && (
                          <div className="w-24 h-24 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                          </div>
                        )}

                        <p className="text-sm font-bold mt-3 tracking-wide text-slate-800">
                          {item.assetTag}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Mahavir Group
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print View - 0.75" x 1.5" labels */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          @page {
            size: 1.5in 0.75in;
            margin: 0;
          }
          
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 1.5in !important;
            height: 0.75in !important;
          }
          
          .print-container {
            display: block !important;
          }
          
          .print-tag {
            width: 1.5in !important;
            height: 0.75in !important;
            page-break-after: always;
            page-break-inside: avoid;
            margin: 0 !important;
            padding: 0.04in !important;
            box-sizing: border-box !important;
            display: flex !important;
            background: white !important;
            position: relative;
          }
          
          .print-tag:last-child {
            page-break-after: auto;
          }
        }

        .pdf-tag {
          width: 1.5in;
          height: 0.75in;
          padding: 0.04in;
          box-sizing: border-box;
          display: flex;
          background: white;
          position: absolute;
          left: -9999px;
        }
      `}</style>

      {/* Hidden container for browser print */}
      <div className="hidden print:block print-container">
        {tags.map((item) => (
          <div key={item.assetTag} className="print-tag">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.08in",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={LOGO_URL}
                style={{
                  width: "0.4in",
                  height: "0.4in",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
                alt="Logo"
                crossOrigin="anonymous"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  gap: "0.02in",
                }}
              >
                {mode === "qr" && imageMap[item.assetTag]?.qr && (
                  <img
                    src={imageMap[item.assetTag].qr}
                    alt="QR"
                    style={{
                      width: "0.5in",
                      height: "0.5in",
                      objectFit: "contain",
                    }}
                    crossOrigin="anonymous"
                  />
                )}

                {mode === "barcode" && imageMap[item.assetTag]?.barcode && (
                  <img
                    src={imageMap[item.assetTag].barcode}
                    alt="Barcode"
                    style={{
                      width: "0.8in",
                      height: "0.3in",
                      objectFit: "contain",
                    }}
                    crossOrigin="anonymous"
                  />
                )}

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "0.02in",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                      padding: 0,
                      fontSize: "7pt",
                      lineHeight: "1",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {item.assetTag}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "5pt",
                      lineHeight: "1.2",
                      fontFamily: "Arial, sans-serif",
                      marginTop: "1pt",
                    }}
                  >
                    Mahavir Group
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden container for PDF generation */}
      <div style={{ position: "absolute", left: "-9999px" }}>
        {tags.map((item) => (
          <div key={`pdf-${item.assetTag}`} className="pdf-tag">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.08in",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={LOGO_URL}
                style={{
                  width: "0.4in",
                  height: "0.4in",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
                alt="Logo"
                crossOrigin="anonymous"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  gap: "0.02in",
                }}
              >
                {mode === "qr" && imageMap[item.assetTag]?.qr && (
                  <img
                    src={imageMap[item.assetTag].qr}
                    alt="QR"
                    style={{
                      width: "0.5in",
                      height: "0.5in",
                      objectFit: "contain",
                    }}
                    crossOrigin="anonymous"
                  />
                )}

                {mode === "barcode" && imageMap[item.assetTag]?.barcode && (
                  <img
                    src={imageMap[item.assetTag].barcode}
                    alt="Barcode"
                    style={{
                      width: "0.8in",
                      height: "0.3in",
                      objectFit: "contain",
                    }}
                    crossOrigin="anonymous"
                  />
                )}

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "0.02in",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                      padding: 0,
                      fontSize: "7pt",
                      lineHeight: "1",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {item.assetTag}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "5pt",
                      lineHeight: "1.2",
                      fontFamily: "Arial, sans-serif",
                      marginTop: "1pt",
                    }}
                  >
                    Mahavir Group
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PrintPage;
