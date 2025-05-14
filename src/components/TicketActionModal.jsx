import {
  getTicketById,
  updateTicketStatus,
  updateTicketAssignee,
  updateTicketLocation,
  updateTicketCcEmail,
  getAssignees,
} from "../services/api";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const TicketActionModal = ({ open, ticketId, onClose }) => {
  const [ticket, setTicket] = useState(null);
  const [ticketStatus, setTicketStatus] = useState("");
  const [ccEmails, setCcEmails] = useState([]);
  const [location, setLocation] = useState("");
  const [assignee, setAssignee] = useState("");
  const [newCCEmail, setNewCCEmail] = useState("");
  const [assignees, setAssignees] = useState([]);

  const [locations, setLocations] = useState([
    { id: 1, name: "Office 1" },
    { id: 2, name: "Office 2" },
    { id: 3, name: "Remote" },
  ]);

  useEffect(() => {
    const fetchTicket = async () => {
      if (ticketId) {
        try {
          const data = await getTicketById(ticketId);
          setTicket(data);
          setTicketStatus(data.status);
          setCcEmails(data.ccEmails || []);
          setLocation(data.location?.id || "");
          setAssignee(data.assignee?.employeeId || "");
        } catch (error) {
          console.error("Error fetching ticket:", error);
        }
      }
    };

    fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    getAssignees()
      .then((res) => {
        const formatted = res.data.map((user) => ({
          id: user.employeeId,
          name: user.username,
        }));
        setAssignees(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch assignees", err);
      });
  }, []);

  const handleStatusChange = async (newStatus) => {
    setTicketStatus(newStatus);
    try {
      await updateTicketStatus(ticketId, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAssigneeChange = async (assigneeId) => {
    setAssignee(assigneeId);
    try {
      await updateTicketAssignee(ticketId, assigneeId);
    } catch (error) {
      console.error("Error updating assignee:", error);
    }
  };

  const handleLocationChange = async (locId) => {
    setLocation(locId);
    try {
      await updateTicketLocation(ticketId, locId);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleAddCC = async () => {
    const email = newCCEmail.trim();
    if (email && !ccEmails.includes(email)) {
      try {
        const updated = await updateTicketCcEmail(ticketId, email, true);
        setCcEmails(updated);
        setNewCCEmail("");
      } catch (error) {
        console.error("Error adding CC email:", error);
      }
    }
  };

  const handleRemoveCC = async (email) => {
    try {
      const updated = await updateTicketCcEmail(ticketId, email, false);
      setCcEmails(updated);
    } catch (error) {
      console.error("Error removing CC email:", error);
    }
  };

  // const handleAddCC = async () => {
  //   if (newCCEmail.trim() && !ccEmails.includes(newCCEmail)) {
  //     const updated = [...ccEmails, newCCEmail];
  //     setCcEmails(updated);
  //     setNewCCEmail("");

  //     try {
  //       await updateTicketCCEmails(ticketId, updated);
  //     } catch (error) {
  //       console.error("Error updating CC emails:", error);
  //     }
  //   }
  // };

  // const handleRemoveCC = async (email) => {
  //   const updated = ccEmails.filter((e) => e !== email);
  //   setCcEmails(updated);

  //   try {
  //     await updateTicketCCEmails(ticketId, updated);
  //   } catch (error) {
  //     console.error("Error updating CC emails:", error);
  //   }
  // };

  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Manage Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="mb-4 space-y-1">
          <h3 className="text-lg font-semibold text-gray-700">
            {ticket.title}
          </h3>
          <p className="text-sm text-gray-600">{ticket.description}</p>
          <p className="text-xs text-gray-500 italic">
            Category: {ticket.category}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={ticketStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assignee
            </label>
            <select
              value={assignee}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select assignee</option>
              {assignees.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CC Emails
          </label>
          <div className="space-y-2">
            {ccEmails.map((email, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md"
              >
                <span className="text-sm text-gray-700">{email}</span>
                <button
                  onClick={() => handleRemoveCC(email)}
                  className="text-red-500 text-xs hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex space-x-2 mt-2">
              <input
                type="email"
                value={newCCEmail}
                onChange={(e) => setNewCCEmail(e.target.value)}
                placeholder="Add email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                onClick={handleAddCC}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketActionModal;
