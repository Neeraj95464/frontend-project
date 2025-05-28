// src/components/DownloadTicketsIcon.jsx

// ✅ Ensure Lucide is installed
import { downloadThisMonthTickets } from "../services/api";
import { Download } from "lucide-react";
import React from "react";

const DownloadButtonExcelTicket = () => {
  const handleDownload = () => {
    downloadThisMonthTickets();
  };

  return (
    <button
      onClick={handleDownload}
      title="Download This Month's Tickets"
      className="p-2 text-blue-600 hover:text-blue-800"
    >
      <Download size={18} />
    </button>
  );
};

export default DownloadButtonExcelTicket;
