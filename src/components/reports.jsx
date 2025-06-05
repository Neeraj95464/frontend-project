import UserDetailsModal from "../components/UserDetailsModal";
import {
  getAllTickets,
  addMessageToTicket,
  hasRole,
  searchTickets,
  getTickets,
  updateTicketStatus,
} from "../services/api";
import DownloadTicketsIcon from "./DownloadButtonExcelTicket";
import { Button, Card } from "./ui";
import { format, formatDistanceToNow, parseISO, isBefore } from "date-fns";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
// Icon from lucide-react
import { FiMenu, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Reports = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("OPEN");
  const [selectedAssignee, setSelectedAssignee] = useState("ALL");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showPredefined, setShowPredefined] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [userRole, setUserRole] = useState(""); // Track user role
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [size, setSize] = useState(30); // Default size from backend
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
    const role = hasRole("ADMIN") ? "admin" : "user";
    setUserRole(role);
  }, []);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    fetchTickets(status);
  };

  const handleAssigneeChange = (e) => {
    const assignee = e.target.value;
    setSelectedAssignee(assignee);
    fetchTicketsAssignee(selectedStatus, page, assignee); // ✅ Correct
  };

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
      // console.log("Fetched content:", content);

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

  const assignees = [
    { employeeId: "mv4135", name: "Narendra" },
    { employeeId: "mv4748", name: "Neeraj" },
    { employeeId: "mv4933", name: "Husain" },
    { employeeId: "mv4422", name: "Guna shekhar" },
    { employeeId: "mv4949", name: "Gagan Mohan" },
    { employeeId: "mv4445", name: "Vikash" },
    { employeeId: "aw2114", name: "V Sharath" },
    { employeeId: "ar0293", name: "Pruthvi" },
    { employeeId: "aw1562", name: "Ratheesh Ravi" },
    { employeeId: "aw1136", name: "Sandeep Chandra" },
    { employeeId: "jb1742", name: "Subhash Kumar" },
    { employeeId: "mv4890", name: "Venkata Sai" },
    { employeeId: "aw2304", name: "Mohammed Azhar Ali" },
    { employeeId: "AW1562", name: "Ratheesh Ravi" },
    { employeeId: "MV5041", name: "K Rupa Lavanya" },
  ];

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Ticket Report</h1>
        <DownloadTicketsIcon />
      </div>

      {/* Placeholder for actual report content */}
      <div className="bg-white p-4 rounded shadow">
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
            {/* <Button
                      className="mb-4 bg-green-600 hover:bg-green-700"
                      onClick={() => navigate("/user-assets")}
                    >
                      My Assets
                    </Button> */}

            {userRole === "ADMIN" && (
              <button
                className="px-4 py-2 rounded-lg shadow-md bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-blue-400 mb-4"
                onClick={() => navigate("/ticket/admin")}
              >
                Admin Tickets
              </button>
            )}

            <div className="mb-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="w-full sm:w-1/2 p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="OPEN">Open</option>
                  <option value="WAITING">Waiting</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                  <option value="UNASSIGNED">Unassigned</option>
                  <option value="ALL">All</option>
                </select>

                {/* Assignee Filter */}
                {/* <select
                          value={selectedAssignee}
                          onChange={handleAssigneeChange}
                          className="w-full sm:w-1/2 p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        >
                          <option value="ALL">All Assignees</option>
                          <option value="john.doe">John Doe</option>
                          <option value="neeraj.kumar">Neeraj Kumar</option>
                          <option value="jane.smith">Jane Smith</option>
                        
                        </select> */}

                <select
                  value={selectedAssignee}
                  onChange={handleAssigneeChange}
                  className="w-full sm:w-1/2 p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="ALL">All Assignees</option>
                  {assignees.map(({ employeeId, name }) => (
                    <option key={employeeId} value={employeeId}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
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
              <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="sticky top-0 bg-gray-100 text-xs font-semibold uppercase text-gray-600">
                    <tr>
                      {[
                        "ID",
                        "Subject",
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
                        {/* <td className="px-3 py-2 max-w-[150px] truncate">
                                  {ticket.title}
                                </td> */}

                        <td className="px-3 py-2 min-w-[200px] max-w-[300px] truncate">
                          {ticket.title}
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
                                setSelectedUser(ticket.assignee?.employeeId);
                              }}
                              className="hover:underline truncate"
                            >
                              {ticket.assignee?.username || "Unassigned"}
                            </button>
                          ) : (
                            <span className="text-gray-800 truncate">
                              {ticket.assignee?.username || "Unassigned"}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-blue-600">
                          {userRole !== "user" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // setSelectedUser(ticket.employee);
                                setSelectedUser(ticket.employee?.employeeId);
                              }}
                              className="hover:underline truncate"
                            >
                              {ticket.employee?.username || "Unassigned"}
                            </button>
                          ) : (
                            <span className="text-gray-800 truncate">
                              {ticket.employee?.username || "Unassigned"}
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
    </div>
  );
};

export default Reports;
