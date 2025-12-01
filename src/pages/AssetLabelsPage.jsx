import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const AssetLabelsPage = ({ assets }) => {
  const printRef = (useRef < HTMLDivElement) | (null > null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div>
      <button
        onClick={handlePrint}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Print Labels
      </button>

      <div ref={printRef} className="mt-4 print:bg-white">
        <div className="grid grid-cols-3 gap-2">
          {assets.map((a) => (
            <AssetLabel key={a.id} asset={a} />
          ))}
        </div>
      </div>
    </div>
  );
};
