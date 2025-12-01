import { fetchAssets } from "../services/api";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function PrintAssetTags() {
  const [assets, setAssets] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    fetchAssets({ page: 0, size: 9999 }) // load ALL assets
      .then((res) => setAssets(res.content || []))
      .catch(console.error);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="p-10">
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Print All Asset Tags
      </button>

      <div
        ref={printRef}
        className="mt-4 grid grid-cols-3 gap-3 print:grid-cols-3"
      >
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="border p-2 w-[60mm] h-[30mm] flex flex-col justify-between"
          >
            <div className="text-[9pt] text-center font-bold">
              Mahavir Group IT
            </div>

            <div>
              <img
                src={`/api/assets/${asset.id}/barcode`}
                alt="barcode"
                className="w-full"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-[8pt]">{asset.assetTag}</div>
              <img
                src={`/api/assets/${asset.id}/qr`}
                className="w-[22mm] h-[22mm]"
                alt="qr"
              />
            </div>

            <div className="text-[7pt] truncate">{asset.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
