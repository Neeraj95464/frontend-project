import { getTicketsWithFeedback, getAssignees } from "../services/api";
import DownloadButtonExcelTicket from "./DownloadButtonExcelTicket";
import { useEffect, useState } from "react";

const TicketWithFeedbackTable = () => {
  const [tickets, setTickets] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    last: false,
  });

  useEffect(() => {
    fetchAssignees();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [page, selectedAssignee]);

  const fetchAssignees = async () => {
    try {
      const res = await getAssignees();
      const formatted = res.data.map((user) => ({
        employeeId: user.employeeId,
        name: user.username,
      }));
      setAssignees(formatted);
    } catch (err) {
      console.error("Error fetching assignees:", err);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await getTicketsWithFeedback(selectedAssignee, page, size);
      const { content, totalPages, totalElements, last } = res;
      setTickets(content);
      setPaginationInfo({ totalPages, totalElements, last });
    } catch (err) {
      console.error("Error fetching tickets with feedback:", err);
    }
  };

  return (
    <div className="lg:ml-40 pt-16 ">
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <p>Download This month tickets in excel </p>
        <DownloadButtonExcelTicket />
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 items-center mb-6 justify-between">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Filter by Executive:
          </label>
          <select
            value={selectedAssignee}
            onChange={(e) => {
              setSelectedAssignee(e.target.value);
              setPage(0);
            }}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-64 focus:ring focus:ring-green-400"
          >
            <option value="">All Executives</option>
            {assignees.map(({ employeeId, name }) => (
              <option key={employeeId} value={employeeId}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="text-sm text-gray-700">
            Page <strong>{page + 1}</strong> of{" "}
            <strong>{paginationInfo.totalPages}</strong> | Total:{" "}
            <strong>{paginationInfo.totalElements}</strong>
          </span>
          <button
            onClick={() => !paginationInfo.last && setPage((prev) => prev + 1)}
            disabled={paginationInfo.last}
            className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-lg">
        <table className="min-w-full border text-sm bg-white">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">Ticket ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Created By</th>
              <th className="p-2 border">Assignee</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.ticketId} className="hover:bg-green-50">
                  <td className="p-2 border text-center">{ticket.ticketId}</td>
                  <td className="p-2 border">{ticket.title}</td>
                  <td className="p-2 border">{ticket.description}</td>
                  <td className="p-2 border text-center">{ticket.category}</td>
                  <td className="p-2 border">{ticket.createdBy}</td>
                  <td className="p-2 border">{ticket.assigneeName}</td>
                  <td className="p-2 border text-xs text-gray-600">
                    {ticket.createdAt &&
                      new Date(ticket.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 border text-center">{ticket.rating}</td>
                  <td className="p-2 border">{ticket.feedbackMessage}</td>
                  <td className="p-2 border text-xs text-gray-600">
                    {ticket.submittedAt &&
                      new Date(ticket.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="p-4 text-center text-gray-500">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &lt;
        </button>
        <span className="text-sm text-gray-700">
          Page <strong>{page + 1}</strong> of{" "}
          <strong>{paginationInfo.totalPages}</strong> | Total:{" "}
          <strong>{paginationInfo.totalElements}</strong>
        </span>
        <button
          onClick={() => !paginationInfo.last && setPage((prev) => prev + 1)}
          disabled={paginationInfo.last}
          className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TicketWithFeedbackTable;
