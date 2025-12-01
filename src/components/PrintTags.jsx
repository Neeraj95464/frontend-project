// import React, { useRef } from "react";
// import ReactToPrint from "react-to-print";

// const PrintTags = ({ tags = [] }) => {
//   const printRef = useRef();

//   console.log("PrintTags received:", tags);

//   return (
//     <div className="p-4">
//       <ReactToPrint
//         trigger={() => (
//           <button className="bg-blue-600 text-white px-4 py-2 rounded">
//             Print All Asset Tags
//           </button>
//         )}
//         content={() => printRef.current}
//       />

//       <div ref={printRef} className="mt-6 grid grid-cols-3 gap-4">
//         {tags.map((tag) => (
//           <div
//             key={tag.assetTag}
//             className="border p-4 rounded shadow text-center"
//           >
//             <h3 className="font-semibold text-sm mb-2">Mahavir Group IT</h3>

//             <img src={tag.barcodeUrl} className="h-16 mx-auto" />
//             <img src={tag.qrUrl} className="h-16 mx-auto mt-2" />

//             <p className="mt-2 font-bold">{tag.assetTag}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PrintTags;

import React from "react";

const PrintTags = ({ tags = [] }) => {
  console.log("PrintTags received:", tags);

  return (
    <div>
      <h2>Testing PrintTags Component</h2>

      {/* Check if data exists */}
      <p>Total tags: {tags.length}</p>

      {/* Try simple map */}
      <ul>
        {tags.map((t, index) => (
          <li key={index}>{t.assetTag}</li>
        ))}
      </ul>
    </div>
  );
};

export default PrintTags;
