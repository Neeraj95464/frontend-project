import UserDetailsModal from "../components/UserDetailsModal";
import {
  getTickets,
  addMessageToTicket,
  hasRole,
  updateTicketStatus,
} from "../services/api";
import TicketActionModal from "./TicketActionModal";
import TicketModal from "./TicketFormModal";
import { Button, Card } from "./ui";
import { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function TicketingPortal() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("OPEN");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(""); // Track user role
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const openUserModal = (username) => {
    setSelectedUsername(username);
    setIsModalOpen(true);
  };

  const closeUserModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    fetchTickets(status);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchTickets = async (status = "OPEN") => {
    try {
      const data = await getTickets(status);
      setTickets(data);
      setFilteredTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleAddMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await addMessageToTicket(selectedTicket.id, newMessage);
      setNewMessage("");
      setSelectedTicket((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { sender: "You", message: newMessage, sentAt: new Date() },
        ],
      }));
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  const handleStatusUpdate = async (ticketId, newStatus) => {
    const oldStatus = tickets.find((ticket) => ticket.id === ticketId)?.status;
    try {
      await updateTicketStatus(ticketId, newStatus);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: oldStatus } : ticket
        )
      );
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchInput(query);

    if (query.trim() === "") {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.id.toString().includes(query)
      );
      setFilteredTickets(filtered);
    }
  };

  useEffect(() => {
    fetchTickets();
    const role = hasRole("ADMIN") ? "admin" : "user";
    setUserRole(role);
  }, []);

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      {/* Left Section - Ticket List */}
      <div
        className={`w-full lg:w-2/3 p-1 transition-all ${
          selectedTicket ? "lg:w-1/2" : "lg:w-2/3"
        }`}
      >
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="mb-4 bg-green-600"
        >
          + Create Ticket
        </Button>
        <Button
          className="mb-4 bg-green-600 hover:bg-green-700"
          onClick={() => navigate("/user-assets")}
        >
          My Assets
        </Button>

        {userRole === "ADMIN" && (
          <button
            className="px-4 py-2 rounded-lg shadow-md bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-blue-400 mb-4"
            onClick={() => navigate("/ticket/admin")}
          >
            Admin Tickets
          </button>
        )}

        <TicketModal
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            fetchTickets();
          }}
          className="z-50"
        />

        <Card>
          <div className="grid grid-cols-3 gap-3">
            <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>

            <div className="mb-4">
              {/* <label className="block text-sm font-medium text-gray-700">
                Filter by Status:
              </label> */}
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
                <option value="UNASSIGNED">Unassigned</option>
              </select>
            </div>

            <form className="hidden sm:flex items-center bg-gray-700 text-gray-300 rounded-lg overflow-hidden border border-gray-600">
              <input
                type="text"
                placeholder="Search Tickets..."
                className="w-full p-3 border rounded mb-1"
                value={searchInput}
                onChange={handleSearch}
              />
            </form>
          </div>

          {filteredTickets.length === 0 ? (
            <p className="text-gray-500">No tickets available.</p>
          ) : (
            <div className="h-[500px] overflow-y-auto overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Assignee
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Employee
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Asset Tag
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Created At
                    </th>
                    {userRole !== "user" && (
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {ticket.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {ticket.title}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-white text-xs ${
                            ticket.status === "OPEN"
                              ? "bg-green-500"
                              : ticket.status === "IN_PROGRESS"
                              ? "bg-yellow-500"
                              : ticket.status === "RESOLVED"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {ticket.category}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {ticket.locationName}
                      </td>
                      <td className="px-4 py-2 text-sm text-blue-600">
                        {userRole !== "user" ? (
                          <button
                            type="button"
                            className="hover:underline cursor-pointer text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(ticket.assignee);
                            }}
                          >
                            {ticket.assignee || "Unassigned"}
                          </button>
                        ) : (
                          <span className="text-gray-800">
                            {ticket.assignee || "Unassigned"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-blue-600">
                        {userRole !== "user" ? (
                          <button
                            type="button"
                            className="hover:underline cursor-pointer text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(ticket.employee);
                            }}
                          >
                            {ticket.employee || "Unassigned"}
                          </button>
                        ) : (
                          <span className="text-gray-800">
                            {ticket.employee || "Unassigned"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {userRole !== "user" ? (
                          <button
                            type="button"
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/asset/${ticket.assetTag}`);
                            }}
                          >
                            {ticket.assetTag || "No Asset"}
                          </button>
                        ) : (
                          <span className="text-gray-800">
                            {ticket.assetTag || "No Asset"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      {userRole !== "user" && (
                        <td className="px-4 py-2 text-sm space-x-2">
                          <button
                            type="button"
                            className="text-indigo-600 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTicketId(ticket.id);
                              setIsTicketModalOpen(true);
                            }}
                          >
                            Actions
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Right Section - Message Panel */}
      {selectedTicket && (
        <div className="fixed top-[64px] right-0 w-full lg:w-1/3 h-[calc(100%-64px)] bg-white border-l shadow-2xl p-4 overflow-y-auto z-40 transition-all">
          {/* Header with title */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {selectedTicket.title}
            </h2>
            <p className="text-xs text-gray-500">
              {selectedTicket.description}
            </p>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 mb-4 overflow-y-auto max-h-[300px] pr-1">
            {selectedTicket.messages.length === 0 ? (
              <p className="text-center text-gray-400 text-xs">
                No messages yet.
              </p>
            ) : (
              selectedTicket.messages.map((msg, idx) => (
                <div key={idx} className="bg-gray-100 p-2 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-blue-600 text-xs font-semibold truncate">
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(msg.sentAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs">{msg.message}</p>
                </div>
              ))
            )}
          </div>

          {/* New Message */}
          <div className="mt-auto">
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none text-xs"
              rows="3"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
            />
            <div className="flex items-center gap-2 mt-2">
              {/* Send Button (80%) */}
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition-all"
                onClick={handleAddMessage}
              >
                Send
              </button>
              {/* Close Button (20%) */}
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 text-lg rounded-md transition-all"
                onClick={() => setSelectedTicket(null)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <UserDetailsModal
          query={selectedUser} // ✅ Pass as `query`, not `username`
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {isTicketModalOpen && (
        <TicketActionModal
          ticketId={selectedTicketId}
          open={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
        />
      )}
    </div>
  );
}
