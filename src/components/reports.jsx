import DownloadTicketsIcon from "../components/DownloadButtonExcelTicket";

const Reports = () => {
  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Ticket Report</h1>
        <DownloadTicketsIcon />
      </div>

      {/* Placeholder for actual report content */}
      <div className="bg-white p-4 rounded shadow">
        <p>No report data yet. Download to get the latest Excel file.</p>
      </div>
    </div>
  );
};

export default Reports;
