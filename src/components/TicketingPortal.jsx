import UserDetailsModal from "../components/UserDetailsModal";
import {
  getTickets,
  addMessageToTicket,
  hasRole,
  updateTicketStatus,
  searchTickets,
} from "../services/api";
import TicketActionModal from "./TicketActionModal";
import TicketAttachmentButton from "./TicketAttachmentButton";
import TicketModal from "./TicketFormModal";
import { Button, Card } from "./ui";
import { format, formatDistanceToNow, parseISO, isBefore } from "date-fns";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");

  const navigate = useNavigate();
  const [showPredefined, setShowPredefined] = useState(false);
  const [userRole, setUserRole] = useState(""); // Track user role
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20); // Default size from backend
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    fetchTickets(status);
  };

  const fetchTickets = async (status = "OPEN", customPage = page) => {
    try {
      const res = await getTickets({ page: customPage, size, status });

      const {
        content = [],
        page: pageNumber,
        size: pageSize,
        totalElements,
        totalPages,
        last,
      } = res || {};

      setFilteredTickets(content);
      setPaginationInfo({ totalElements, totalPages, last });
      setPage(pageNumber); // Sync page from backend
      setSize(pageSize);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const predefinedMessages = [
    "Thank you for your patience.",
    "We are looking into your issue.",
    "Can you please provide more details?",
    "This ticket has been resolved.",
  ];

  const handlePredefinedSelect = (e) => {
    setNewMessage(e.target.value); // fills textarea
  };

  const handleSelectPredefined = (msg) => {
    setNewMessage(msg);
    setShowPredefined(false);
  };

  const handleAddMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      const messageDTO = {
        message: newMessage,
        sender: "You", // or your logged-in user's username
        ticketMessageType: messageType, // e.g., "PUBLIC_RESPONSE" or "INTERNAL_NOTE"
      };

      console.log("message dto is ", messageDTO);

      const savedMessage = await addMessageToTicket(
        selectedTicket.id,
        messageDTO
      );

      setNewMessage("");

      setSelectedTicket((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            sender: savedMessage.sender,
            message: savedMessage.message,
            ticketMessageType: savedMessage.ticketMessageType,
            sentAt: new Date(savedMessage.sentAt || Date.now()),
          },
        ],
      }));
    } catch (error) {
      console.error("Error adding message: ", error);
    } finally {
      setIsSending(false);
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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const query = searchInput.trim();
    if (query === "") {
      setFilteredTickets(tickets);
      return;
    }

    try {
      setLoading(true);
      const res = await searchTickets({ query });

      const {
        content = [],
        page: pageNumber,
        size: pageSize,
        totalElements,
        totalPages,
        last,
      } = res || {};

      // Log content to ensure it's coming through
      console.log("Fetched content:", content);

      setFilteredTickets(content);
      setPaginationInfo({
        totalElements,
        totalPages,
        last,
      });
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const role = hasRole("ADMIN") ? "admin" : "user";
    setUserRole(role);
  }, []);

  return (
    <div className="lg:ml-40 pt-16">
      <div>
        <TicketModal
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            fetchTickets();
          }}
          className="z-50"
        />
        <Card>
          {/* Top action buttons container */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center mb-4 overflow-x-auto">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-green-600 whitespace-nowrap"
            >
              + Create Ticket
            </Button>

            {/* <Button
              onClick={() => navigate("/user-assets")}
              className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
            >
              My Assets
            </Button> */}

            {userRole === "ADMIN" && (
              <button
                className="px-4 py-2 rounded-lg shadow-md bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
                onClick={() => navigate("/ticket/admin")}
              >
                Admin Tickets
              </button>
            )}

            <div className="min-w-[150px]">
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

            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 px-3 py-2 border rounded-md shadow-sm bg-white focus-within:ring-2 focus-within:ring-green-500"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search Tickets..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-transparent focus:outline-none text-sm text-gray-800 w-full placeholder-gray-500"
              />
            </form>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newPage = Math.max(page - 1, 0);
                  setPage(newPage);
                  fetchTickets(selectedStatus, newPage);
                }}
                disabled={page === 0}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;
              </button>
              <span className="text-sm text-gray-700 whitespace-nowrap">
                <strong>{page + 1}</strong> of{" "}
                <strong>{paginationInfo.totalPages}</strong> Total:{" "}
                <strong>{paginationInfo.totalElements}</strong>
              </span>
              <button
                onClick={() => {
                  const newPage =
                    page + 1 < paginationInfo.totalPages ? page + 1 : page;
                  setPage(newPage);
                  fetchTickets(selectedStatus, newPage);
                }}
                disabled={paginationInfo.last}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Table Container */}
          {filteredTickets.length === 0 ? (
            <p className="text-gray-500">No tickets available.</p>
          ) : (
            <div className="overflow-x-auto border rounded-lg shadow-sm">
              <div className="min-w-[1600px]">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="sticky top-0 bg-gray-100 text-xs font-semibold uppercase text-gray-600 z-10">
                    <tr>
                      {[
                        "ID",
                        "Description",
                        "Status",
                        "Category",
                        "Location",
                        "Assignee",
                        "Employee",
                        // "Asset Tag",
                        "Created At",
                        "Responsed At",
                        "Due Date",
                        "Updated At",
                        "Closed At",
                        ...(userRole !== "user" ? ["Actions"] : []),
                      ].map((header, i) => (
                        <th key={i} className="px-3 py-2 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <td className="px-3 py-2">{ticket.id}</td>
                        <td className="px-3 py-2 min-w-[200px] max-w-[300px] truncate">
                          {ticket.description}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-white text-xs ${
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
                        <td className="px-3 py-2 max-w-[120px] truncate">
                          {ticket.category}
                        </td>
                        <td className="px-3 py-2 max-w-[120px] truncate">
                          {ticket.locationName}
                        </td>
                        <td className="px-3 py-2 text-blue-600">
                          {userRole !== "user" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(ticket.assignee);
                              }}
                              className="hover:underline truncate"
                            >
                              {ticket.assignee || "Unassigned"}
                            </button>
                          ) : (
                            <span className="text-gray-800 truncate">
                              {ticket.assignee || "Unassigned"}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-blue-600">
                          {userRole !== "user" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(ticket.employee);
                              }}
                              className="hover:underline truncate"
                            >
                              {ticket.employee || "Unassigned"}
                            </button>
                          ) : (
                            <span className="text-gray-800 truncate">
                              {ticket.employee || "Unassigned"}
                            </span>
                          )}
                        </td>
                        {/* <td className="px-3 py-2">
                          {userRole !== "user" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/asset/${ticket.assetTag}`);
                              }}
                              className="text-blue-600 hover:underline truncate"
                            >
                              {ticket.assetTag || "No Asset"}
                            </button>
                          ) : (
                            <span className="text-gray-800 truncate">
                              {ticket.assetTag || "No Asset"}
                            </span>
                          )}
                        </td> */}

                        {/* <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.createdAt}
                        </td> */}

                        <td className="px-3 py-2 whitespace-nowrap">
                          {format(parseISO(ticket.createdAt), "d/M/yyyy")} (
                          {formatDistanceToNow(parseISO(ticket.createdAt), {
                            addSuffix: true,
                          })}
                          )
                        </td>

                        {/* <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.firstRespondedAt}
                        </td> */}

                        <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.firstRespondedAt ? (
                            <>
                              {format(
                                parseISO(ticket.firstRespondedAt.split(".")[0]),
                                "d/M/yyyy"
                              )}{" "}
                              (
                              {formatDistanceToNow(
                                parseISO(ticket.firstRespondedAt.split(".")[0]),
                                {
                                  addSuffix: true,
                                }
                              )}
                              )
                            </>
                          ) : (
                            <span className="text-gray-400 italic">N/A</span>
                          )}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.dueDate ? (
                            <>
                              {format(
                                parseISO(ticket.dueDate.split(".")[0]),
                                "d/M/yyyy"
                              )}{" "}
                              (
                              <span
                                className={
                                  isBefore(parseISO(ticket.dueDate), new Date())
                                    ? "text-red-600 font-medium"
                                    : "text-green-600"
                                }
                              >
                                {formatDistanceToNow(
                                  parseISO(ticket.dueDate.split(".")[0]),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                                {isBefore(
                                  parseISO(ticket.dueDate),
                                  new Date()
                                ) && " – due date crossed"}
                              </span>
                              )
                            </>
                          ) : (
                            <span className="text-gray-400 italic">
                              No due date
                            </span>
                          )}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.lastUpdated ? (
                            <>
                              {format(
                                parseISO(ticket.lastUpdated.split(".")[0]),
                                "d/M/yyyy"
                              )}{" "}
                              (
                              <span className="text-blue-600">
                                {formatDistanceToNow(
                                  parseISO(ticket.lastUpdated.split(".")[0]),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                              )
                            </>
                          ) : (
                            <span className="text-gray-400 italic">
                              No updates
                            </span>
                          )}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.closedAt ? (
                            <>
                              {format(
                                parseISO(ticket.closedAt.split(".")[0]),
                                "d/M/yyyy"
                              )}{" "}
                              (
                              <span className="text-green-600">
                                {formatDistanceToNow(
                                  parseISO(ticket.closedAt.split(".")[0]),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                              )
                            </>
                          ) : (
                            <span className="text-gray-400 italic">
                              Not Closed
                            </span>
                          )}
                        </td>

                        {userRole !== "user" && (
                          <td className="px-3 py-2">
                            <button
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
            </div>
          )}
        </Card>
      </div>

      {/* Right Section - Message Panel */}
      {selectedTicket && (
        <div className="fixed top-[64px] right-0 w-full md:w-[320px] h-[calc(100%-64px)] bg-white border-l shadow-xl p-4 overflow-y-auto z-40 transition-all duration-300 ease-in-out">
          {/* Header with title and action icon */}
          <div className="flex items-start justify-between mb-4 border-b pb-2">
            <div className="flex-1 pr-2">
              <h2 className="text-sm font-semibold text-gray-800">
                {selectedTicket.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1 ">
                {selectedTicket.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Action Icon */}
              {/* {userRole !== "user" ? (<button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Ticket actions"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTicketId(selectedTicket.id);
                  setIsTicketModalOpen(true);
                }}
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>)} */}

              {userRole !== "user" && (
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  title="Ticket actions"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTicketId(selectedTicket.id);
                    setIsTicketModalOpen(true);
                  }}
                >
                  <MoreVertical className="w-5 h-5 text-gray-800" />
                </button>
              )}

              <TicketAttachmentButton ticket={selectedTicket} />

              {/* Close Button */}
              <button
                className="text-lg text-gray-500 hover:text-gray-700 transition"
                onClick={() => setSelectedTicket(null)}
              >
                &times;
              </button>
            </div>
          </div>
          {/* Messages */}
          {/* <div className="flex flex-col gap-2 mb-4 max-h-[320px] overflow-y-auto pr-1">
            {selectedTicket.messages.length === 0 ? (
              <p className="text-center text-gray-400 text-xs">
                No messages yet.
              </p>
            ) : (
              selectedTicket.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-blue-600 text-xs font-semibold truncate">
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(msg.sentAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{msg.message}</p>
                </div>
              ))
            )}
          </div> */}

          {/* <div className="flex flex-col gap-2 mb-4 max-h-[320px] overflow-y-auto pr-1">
            {selectedTicket.messages.filter((msg) => {
              // Show all PUBLIC_RESPONSE messages
              if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
              // Show INTERNAL_NOTE only if user is not a USER
              return userRole !== "user";
            }).length === 0 ? (
              <p className="text-center text-gray-400 text-xs">
                No messages yet.
              </p>
            ) : (
              selectedTicket.messages
                .filter((msg) => {
                  if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
                  return userRole !== "user";
                })
                .map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-600 text-xs font-semibold truncate">
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(msg.sentAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{msg.message}</p>
                  </div>
                ))
            )}
          </div> */}

          <div className="flex flex-col gap-2 mb-4 max-h-[320px] overflow-y-auto pr-1">
            {selectedTicket.messages.filter((msg) => {
              if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
              return userRole !== "user";
            }).length === 0 ? (
              <p className="text-center text-gray-400 text-xs">
                No messages yet.
              </p>
            ) : (
              selectedTicket.messages
                .filter((msg) => {
                  if (msg.ticketMessageType === "PUBLIC_RESPONSE") return true;
                  return userRole !== "user";
                })
                .map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 px-3 py-2 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-600 text-xs font-semibold truncate">
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        {msg.ticketMessageType === "INTERNAL_NOTE" && (
                          <span
                            title="Internal Note"
                            className="text-yellow-600"
                          >
                            🛡️
                          </span>
                        )}
                        {new Date(msg.sentAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{msg.message}</p>
                  </div>
                ))
            )}
          </div>

          {/* New Message Input */}
          {/* <div className="mt-auto">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows="3"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
            />
            <div className="flex items-center gap-2 mt-2"> */}
          {/* <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all"
                onClick={handleAddMessage}
              >
                Send
              </button> */}
          {/* <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddMessage}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
          </div> */}
          {/* <div className="mt-auto">
            <select
              onChange={handlePredefinedSelect}
              className="w-full p-2 border border-gray-300 rounded-md mb-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select a predefined message...
              </option>
              {predefinedMessages.map((msg, idx) => (
                <option key={idx} value={msg}>
                  {msg}
                </option>
              ))}
            </select>

            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows="3"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
            />

            <div className="flex items-center gap-2 mt-2">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddMessage}
                disabled={isSending || !newMessage.trim()}
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
          </div> */}
          {/* // from here upcomment */}
          {/* <div className="mt-auto">
            <div className="relative">
              <textarea
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                rows="3"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write your message..."
              /> */}

          {/* Icon inside the textarea (bottom right) */}
          {/* <button
                type="button"
                onClick={() => setShowPredefined((prev) => !prev)}
                className="absolute bottom-2 right-2 text-gray-500 hover:text-blue-600"
                title="Select predefined message"
              >
                💬
              </button> */}

          {/* Message picker inline popover (above icon inside box) */}
          {/* {showPredefined && (
                <div className="absolute right-0 top-full mt-1 z-10 w-64 bg-white shadow-lg border rounded-md">
                  {predefinedMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectPredefined(msg)}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {msg}
                    </div>
                  ))}
                </div>
              )}
            </div> */}

          {/* <div className="flex items-center gap-2 mt-2">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddMessage}
                disabled={isSending || !newMessage.trim()}
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div> */}
          {/* </div> */}

          <div className="mt-auto">
            <div className="relative">
              <textarea
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                rows="3"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={
                  messageType === "INTERNAL_NOTE"
                    ? "Write an internal note (IT Team Only)..."
                    : "Write your message..."
                }
              />

              {userRole !== "user" && (
                <>
                  {/* Predefined message button */}
                  <button
                    type="button"
                    onClick={() => setShowPredefined((prev) => !prev)}
                    className="absolute bottom-2 right-20 text-gray-500 hover:text-blue-600"
                    title="Select predefined message"
                  >
                    💬
                  </button>

                  {/* Message type toggle icon */}
                  <button
                    type="button"
                    onClick={() =>
                      setMessageType((prev) =>
                        prev === "PUBLIC_RESPONSE"
                          ? "INTERNAL_NOTE"
                          : "PUBLIC_RESPONSE"
                      )
                    }
                    className={`absolute bottom-2 right-0 text-sm px-1.5 py-0.5 rounded-md ${
                      messageType === "INTERNAL_NOTE"
                        ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                    title="Toggle Message Type"
                  >
                    {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "🌐 Public"}
                  </button>
                </>
              )}

              {/* Predefined messages popover */}
              {showPredefined && (
                <div className="absolute right-10 top-full mt-1 z-10 w-64 bg-white shadow-lg border rounded-md">
                  {predefinedMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectPredefined(msg)}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {msg}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddMessage}
                disabled={isSending || !newMessage.trim()}
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
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
