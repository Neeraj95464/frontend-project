import { downloadAttachment } from "../services/api";
import { Download } from "lucide-react";

// Adjust path as needed

const TicketAttachmentButton = ({ ticket }) => {
  const handleDownload = async () => {
    try {
      await downloadAttachment(ticket.id);
    } catch (error) {
      alert("Attachment not found or download failed.");
    }
  };

  if (!ticket.attachmentPath) return null;

  return (
    <button
      onClick={handleDownload}
      className="p-2 rounded-full hover:bg-gray-100 transition"
      title="Download Attachment"
    >
      <Download className="w-4 h-4 text-blue-600" />
    </button>
  );
};

export default TicketAttachmentButton;
