// import SimAcknowledgementPDF from "./SimAcknowledgementPDF";
// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// export default function SimAcknowledgementDownload({
//   simData,
//   employeeData,
//   companyName,
// }) {
//   const componentRef = useRef();

//   const handlePrint = useReactToPrint({
//     contentRef: componentRef,
//     documentTitle: `SIM_Acknowledgement_${simData?.phoneNumber || "CUG"}`,
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 15mm;
//       }
//       @media print {
//         body {
//           -webkit-print-color-adjust: exact;
//           print-color-adjust: exact;
//         }
//       }
//     `,
//   });

//   return (
//     <>
//       {/* Hidden component for printing */}
//       <div style={{ display: "none" }}>
//         <SimAcknowledgementPDF
//           ref={componentRef}
//           simData={simData}
//           employeeData={employeeData}
//           companyName={companyName}
//         />
//       </div>

//       {/* Download Button */}
//       <button
//         onClick={handlePrint}
//         className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//           />
//         </svg>
//         Download Acknowledgement
//       </button>
//     </>
//   );
// }

import SimAcknowledgementPDF from "./SimAcknowledgementPDF";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

export default function SimAcknowledgementDownload({
  simData,
  employeeData,
  companyName,
}) {
  const componentRef = useRef();

  const handleDownloadPDF = () => {
    const element = componentRef.current;

    const opt = {
      margin: [15, 15, 15, 15], // [top, left, bottom, right] in mm
      filename: `SIM_Acknowledgement_${simData?.phoneNumber || "CUG"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      {/* Hidden component for PDF generation */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <SimAcknowledgementPDF
          ref={componentRef}
          simData={simData}
          employeeData={employeeData}
          companyName={companyName}
        />
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Download Acknowledgement
      </button>
    </>
  );
}
