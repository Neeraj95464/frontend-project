import UserDetailsModal from "../components/UserDetailsModal";
import {
  getAllTickets,
  addMessageToTicket,
  hasRole,
  searchTickets,
} from "../services/api";
import TicketActionModal from "./TicketActionModal";
import TicketModal from "./TicketFormModal";
import { Button, Card } from "./ui";
import { format, formatDistanceToNow, parseISO, isBefore } from "date-fns";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
// Icon from lucide-react
import { FiMenu, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminTicketingPortal() {
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
  const [page, setPage] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const [size, setSize] = useState(20); // Default size from backend
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    fetchTickets(status);
  };

  // const fetchTickets = async (status = "OPEN", customPage = page) => {
  //   try {
  //     const res = await getAllTickets({ customPage, size, status });

  //     const {
  //       content = [],
  //       page: pageNumber,
  //       size: pageSize,
  //       totalElements,
  //       totalPages,
  //       last,
  //     } = res?.data || {};
  //     console.log("your ticket response is ", res?.data || []);
  //     setFilteredTickets(content);

  //     setPaginationInfo({
  //       totalElements,
  //       totalPages,
  //       last,
  //     });

  //     setPage(pageNumber); // Sync page in case backend adjusts it
  //     setSize(pageSize);
  //   } catch (error) {
  //     console.error("Error fetching tickets:", error);
  //   }
  // };

  const fetchTickets = async (status = "OPEN", customPage = page) => {
    try {
      const res = await getAllTickets({ page: customPage, size, status });

      const {
        content = [],
        page: pageNumber,
        size: pageSize,
        totalElements,
        totalPages,
        last,
      } = res?.data || {};

      setFilteredTickets(content);
      setPaginationInfo({ totalElements, totalPages, last });
      setPage(pageNumber); // Sync page from backend
      setSize(pageSize);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleAddMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
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
    } finally {
      setIsSending(false); // Re-enable the button
    }
  };

  // Handle search form submission
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
      {/* Left Section - Ticket List */}
      <div
      // className={`w-full lg:w-2/3 p-1 transition-all ${
      //   selectedTicket ? "lg:w-1/2" : "lg:w-2/3"
      // }`}
      >
        {/* <Button
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
        )} */}

        <TicketModal
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            fetchTickets();
          }}
          className="z-50"
        />

        <Card>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 items-center mb-4"> */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center mb-4 overflow-x-auto">
            {/* <h2 className="text-xl font-semibold mb-4">Your Tickets</h2> */}

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

            <div className="mb-4">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full flex items-center gap-2 rounded-md px-3 py-2 border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Search Tickets..."
                  className="bg-transparent focus:outline-none text-sm text-gray-800 w-full placeholder-gray-500"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  aria-label="Search Tickets"
                />
              </form>
            </div>

            {/* flex items-center justify-center   */}
            <div className="mb-4 gap-2 flex items-center">
              <button
                onClick={() => {
                  const newPage = Math.max(page - 1, 0);
                  setPage(newPage);
                  fetchTickets(selectedStatus, newPage); // Call your function after updating page
                }}
                disabled={page === 0}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &lt;
              </button>

              <span className="text-sm text-gray-700">
                <strong>{page + 1}</strong> of{" "}
                <strong>{paginationInfo.totalPages}</strong> Total:{" "}
                <strong>{paginationInfo.totalElements}</strong>
              </span>

              <button
                onClick={() => {
                  const newPage =
                    page + 1 < paginationInfo.totalPages ? page + 1 : page;
                  setPage(newPage);
                  fetchTickets(selectedStatus, newPage); // Call your function after updating page
                }}
                disabled={paginationInfo.last}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>

          {filteredTickets.length === 0 ? (
            <p className="text-gray-500">No tickets available.</p>
          ) : (
            <div className="h-[500px] overflow-y-auto overflow-x-auto border rounded-lg">
              {/* <table className="min-w-full divide-y divide-gray-200">
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
              </table> */}

              <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="sticky top-0 bg-gray-100 text-xs font-semibold uppercase text-gray-600">
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
                        <td className="px-3 py-2 max-w-[150px] truncate">
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
                        {/* <td className="px-3 py-2 text-gray-600">
                          {new Date(ticket.createdAt).toLocaleDateString()}
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

                        {/* <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.closedAt}
                        </td> */}

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
      {/* Right Section - Message Panel this will work as turncate line-clamp-2 */}
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
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Ticket actions"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTicketId(selectedTicket.id);
                  setIsTicketModalOpen(true);
                }}
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
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
          <div className="flex flex-col gap-2 mb-4 max-h-[320px] overflow-y-auto pr-1">
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
          </div>

          {/* New Message Input */}
          <div className="mt-auto">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows="3"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
            />
            <div className="flex items-center gap-2 mt-2">
              {/* <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all"
                onClick={handleAddMessage}
              >
                Send
              </Button> */}

              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddMessage}
                disabled={isSending}
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
