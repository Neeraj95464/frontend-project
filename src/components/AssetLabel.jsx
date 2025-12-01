const AssetLabel = ({ asset }) => (
  <div className="border w-[60mm] h-[30mm] p-1 flex flex-col justify-between">
    <div className="text-[8pt] font-semibold text-center">Mahavir Group IT</div>
    <div className="flex flex-row gap-1">
      <div className="flex-1 flex flex-col items-center">
        <img
          src={`/api/assets/${asset.id}/barcode`}
          alt="barcode"
          className="w-full"
        />
        <div className="text-[7pt] tracking-widest">{asset.assetTag}</div>
      </div>
      <div className="w-[22mm] h-[22mm]">
        <img
          src={`/api/assets/${asset.id}/qr`}
          alt="qr"
          className="w-full h-full"
        />
      </div>
    </div>
    <div className="text-[7pt] truncate">
      {asset.name} · {asset.department}
    </div>
  </div>
);
