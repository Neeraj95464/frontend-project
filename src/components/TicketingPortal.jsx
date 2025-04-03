import UserDetailsModal from "../components/UserDetailsModal";
import {
  getTickets,
  addMessageToTicket,
  hasRole,
  updateTicketStatus,
} from "../services/api";
import TicketModal from "./TicketFormModal";
import { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Adjust path as needed

export default function TicketingPortal() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("OPEN");

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
  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    fetchTickets(status);
  };

  const closeUserModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (!searchInput) {
      setFilteredTickets(tickets);
    }
  }, [tickets]);

  useEffect(() => {
    fetchTickets();
    setUserRole(hasRole("ROLE_ADMIN") ? "admin" : "user"); // Get role from storage
    console.log(userRole);
  }, []);

  const Button = ({ children, className = "", ...props }) => (
    <button
      className={`px-4 py-2 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  const Card = ({ children, className = "", onClick }) => (
    <div
      className={`bg-white rounded-xl shadow-lg border p-6 ${className} cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );

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

      // Refresh messages in selected ticket
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

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
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
      // Revert status if API call fails
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
    console.log("Search Query:", query);

    if (query.trim() === "") {
      console.log("Resetting tickets...");
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.id.toString().includes(query)
      );

      console.log("Filtered Tickets:", filtered);
      setFilteredTickets(filtered);
    }
  };

  const handleEdit = (assetTag) => {
    navigate(`/asset/${assetTag}`);
  };

  //   handleEmployeeClick

  return (
    <div className=" lg:ml-40 pt-16 mr-8">
      {/* Left Section - Ticket List */}
      <div
        className={`w-full lg:w-2/3 p-6 transition-all ${
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

        {userRole === "admin" && (
          <button
            className="px-4 py-2 rounded-lg shadow-md bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-blue-400 mb-4"
            onClick={() => navigate("/ticket/admin")}
          >
            Admin Tickets
          </button>
        )}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center bg-gray-700 text-gray-300 rounded-lg overflow-hidden border border-gray-600"
        >
          <FiSearch className="mx-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Tickets..."
            className="w-full p-2 border rounded mb-4"
            value={searchInput}
            onChange={handleSearch} // ✅ No need for form submission
          />
        </form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <TicketModal
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            fetchTickets();
          }}
        />

        {/* Ticket List */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <p className="text-gray-500">No tickets available.</p>
            ) : (
              filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className="p-4 bg-white shadow-md border rounded-lg hover:shadow-lg transition"
                >
                  {/* Ticket Title */}
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {ticket.title}
                  </h3>

                  {/* Ticket Description */}
                  <p className="text-gray-700 mb-3">{ticket.description}</p>

                  {/* Ticket Details - Two-Column Layout */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Category:</strong> {ticket.category}
                    </p>
                    <p>
                      <strong>Ticket ID:</strong> {ticket.id}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {userRole === "user" ? (
                        <span
                          className={`px-2 py-1 rounded-md text-white ${
                            ticket.status === "OPEN"
                              ? "bg-green-500"
                              : ticket.status === "IN_PROGRESS"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      ) : (
                        <select
                          value={ticket.status}
                          onChange={(e) =>
                            handleStatusUpdate(ticket.id, e.target.value)
                          }
                          className={`px-2 py-1 rounded-md text-white ${
                            ticket.status === "OPEN"
                              ? "bg-green-500"
                              : ticket.status === "IN_PROGRESS"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          <option value="OPEN" className="text-black bg-white">
                            OPEN
                          </option>
                          <option
                            value="IN_PROGRESS"
                            className="text-black bg-white"
                          >
                            IN PROGRESS
                          </option>
                          <option
                            value="RESOLVED"
                            className="text-black bg-white"
                          >
                            RESOLVED
                          </option>
                          <option
                            value="CLOSED"
                            className="text-black bg-white"
                          >
                            CLOSED
                          </option>
                        </select>
                      )}
                    </p>

                    <p>
                      <strong>Asset Tag:</strong>{" "}
                      {userRole === "user" ? (
                        ticket.assetTag || (
                          <span className="text-gray-400">Unassigned</span>
                        )
                      ) : (
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleEdit(ticket.assetTag)}
                        >
                          {ticket.assetTag || "Unassigned"}
                        </button>
                      )}
                    </p>
                    <p>
                      <strong>Location ID:</strong> {ticket.location || "N/A"}
                    </p>
                    <p>
                      <strong>User :</strong>{" "}
                      {userRole === "user" ? (
                        ticket.employee || (
                          <span className="text-gray-400">Unassigned</span>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            if (ticket.employee) {
                              setSelectedUser(ticket.employee);
                            } else {
                              console.warn(
                                "⚠️ No user assigned to this asset."
                              );
                              toast.warn("No user assigned to this asset.");
                            }
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          {ticket.employee || "Not Available"}
                        </button>
                      )}
                    </p>
                    <p>
                      <strong>Assignee :</strong>{" "}
                      {userRole === "user" ? (
                        ticket.assignee || (
                          <span className="text-gray-400">Unassigned</span>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            if (ticket.assignee) {
                              setSelectedUser(ticket.assignee);
                            } else {
                              console.warn(
                                "⚠️ No user assigned to this asset."
                              );
                              toast.warn("No user assigned to this asset.");
                            }
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          {ticket.assignee || "Not Available"}
                        </button>
                      )}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Ticket Messages Count */}
                  {ticket.messages?.length > 0 && (
                    <p className="mt-3 text-xs text-gray-500">
                      {ticket.messages.length} message(s) in conversation
                    </p>
                  )}
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Right Section - Message Panel */}
      {selectedTicket && (
        <div className="w-full lg:w-1/3 p-6 bg-gray-100 shadow-lg transition-all fixed right-0 top-0 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            Messages for {selectedTicket.title}
          </h2>

          <div className="space-y-2">
            {selectedTicket.messages.length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              selectedTicket.messages.map((msg, index) => (
                <div
                  key={index}
                  className="border p-2 rounded-lg bg-white shadow-md"
                >
                  <p>
                    <strong>{msg.sender}:</strong> {msg.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(msg.sentAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add New Message */}
          <div className="mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type a message..."
            />
            <Button onClick={handleAddMessage} className="mt-2 w-full">
              Send Message
            </Button>
          </div>

          {/* Close Button */}
          <Button
            onClick={() => setSelectedTicket(null)}
            className="mt-4 bg-red-600 w-full"
          >
            Close
          </Button>
        </div>
      )}

      {selectedUser && (
        <UserDetailsModal
          query={selectedUser} // ✅ Pass as `query`, not `username`
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
