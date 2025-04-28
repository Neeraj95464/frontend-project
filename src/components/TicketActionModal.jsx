import {
  getTicketById,
  updateTicketStatus,
  updateTicketAssignee,
  updateTicketLocation,
  updateTicketCCEmails,
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

  const [locations, setLocations] = useState([
    { id: 1, name: "Office 1" },
    { id: 2, name: "Office 2" },
    { id: 3, name: "Remote" },
  ]);

  const [assignees, setAssignees] = useState([
    { id: "MV4748", name: "Neeraj Kumar" },
    { id: "MV00", name: "Test User" },
    { id: "user3", name: "Priya Shah" },
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
          setAssignee(data.assignee?.id || "");
        } catch (error) {
          console.error("Error fetching ticket:", error);
        }
      }
    };

    fetchTicket();
  }, [ticketId]);

  // Field-specific handlers

  const handleStatusChange = async (newStatus) => {
    setTicketStatus(newStatus);
    try {
      await updateTicketStatus(ticketId, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // const handleAssigneeChange = async (assigneeId) => {
  //   setAssignee(assigneeId);
  //   try {
  //     await updateTicketAssignee(ticketId, assigneeId);
  //   } catch (error) {
  //     console.error("Error updating assignee:", error);
  //   }
  // };

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
    if (newCCEmail.trim() && !ccEmails.includes(newCCEmail)) {
      const updated = [...ccEmails, newCCEmail];
      setCcEmails(updated);
      setNewCCEmail("");

      try {
        await updateTicketCCEmails(ticketId, updated);
      } catch (error) {
        console.error("Error updating CC emails:", error);
      }
    }
  };

  const handleRemoveCC = async (email) => {
    const updated = ccEmails.filter((e) => e !== email);
    setCcEmails(updated);

    try {
      await updateTicketCCEmails(ticketId, updated);
    } catch (error) {
      console.error("Error updating CC emails:", error);
    }
  };

  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Ticket
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Ticket Overview */}
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-gray-700">{ticket.title}</h3>
          <p className="text-sm text-gray-600">{ticket.description}</p>
          <p className="text-sm text-gray-500 italic">
            Category: {ticket.category}
          </p>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={ticketStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assignee
            </label>
            <select
              value={assignee}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">Select assignee</option>
              {assignees.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
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

        {/* CC Emails */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CC Emails
          </label>
          <div className="space-y-2 mt-2">
            {ccEmails.map((email, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
              >
                <span className="text-sm">{email}</span>
                <button
                  onClick={() => handleRemoveCC(email)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="email"
                value={newCCEmail}
                onChange={(e) => setNewCCEmail(e.target.value)}
                placeholder="Add email"
                className="p-2 border rounded-md w-full"
              />
              <button
                onClick={handleAddCC}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketActionModal;
