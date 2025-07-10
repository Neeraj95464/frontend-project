import UserDetailsModal from "../components/UserDetailsModal";
import {
  getAllTickets,
  addMessageToTicket,
  hasRole,
  searchTickets,
  getTickets,
  updateTicketStatus,
  getAssignees,
  getSites,
  getTicketsBySite,
  fetchSites,
} from "../services/api";
import TicketActionModal from "./TicketActionModal";
import TicketAttachmentButton from "./TicketAttachmentButton";
import TicketModal from "./TicketFormModal";
import { Button, Card } from "./ui";
import { format, formatDistanceToNow, parseISO, isBefore } from "date-fns";
import dayjs from "dayjs";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
// Icon from lucide-react
import { FiMenu, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// make sure to `npm install dayjs`

export default function AdminTicketingPortal() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("OPEN");
  const [selectedAssignee, setSelectedAssignee] = useState("ALL");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showPredefined, setShowPredefined] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [assignees, setAssignees] = useState([]);
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
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  //   const [selectedSite, setSelectedSite] = useState("ALL");
  // const [tickets, setTickets] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null); // default: last 30 days
  const [selectedRangeForLocation, setSelectedRangeRangeForLocation] =
    useState("50");
  // const [tickets, setTickets] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [size, setSize] = useState(30); // Default size from backend
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });
  const [loading, setLoading] = useState(false);

  // const handleStatusChange = (e) => {
  //   const status = e.target.value;
  //   setSelectedStatus(status);
  //   fetchTickets(status);
  // };

  // const handleSiteChange = (e) => {
  //   setSelectedSite(e.target.value);
  // };

  const handleSiteChange = async (e) => {
    const chosenSite = e.target.value;
    setSelectedSite(chosenSite);

    if (chosenSite === "ALL") {
      setFilteredTickets([]); // or setTickets([])
      return;
    }

    const end = dayjs().endOf("day").toISOString();
    let start;

    if (selectedRange === "7") {
      start = dayjs().subtract(7, "day").startOf("day").toISOString();
    } else if (selectedRange === "15") {
      start = dayjs().subtract(15, "day").startOf("day").toISOString();
    } else if (selectedRange === "30") {
      start = dayjs().subtract(30, "day").startOf("day").toISOString();
    } else {
      start = dayjs("2000-01-01").toISOString(); // more than 30
    }

    try {
      const res = await getTicketsBySite(chosenSite, start, end, page, size); // ✅ include pagination args
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
      setPage(pageNumber);
      setSize(pageSize);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleDateRange = async (range) => {
    setSelectedRange(range);

    const today = dayjs().endOf("day");
    let start, end;

    if (range === "7") {
      start = dayjs().subtract(7, "day").startOf("day").toISOString();
      end = today.toISOString();
    } else if (range === "15") {
      start = dayjs().subtract(15, "day").startOf("day").toISOString();
      end = dayjs().subtract(8, "day").endOf("day").toISOString();
    } else if (range === "30") {
      start = dayjs().subtract(30, "day").startOf("day").toISOString();
      end = dayjs().subtract(16, "day").endOf("day").toISOString();
    } else {
      start = dayjs("2000-01-01").toISOString();
      end = dayjs().subtract(31, "day").endOf("day").toISOString();
    }

    try {
      let res;
      if (selectedSite && selectedSite !== "ALL") {
        res = await getTicketsBySite(selectedSite, start, end, page, size);
      } else {
        res = await getTicketsBySite(null, start, end, page, size);
      }

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
      setPage(pageNumber);
      setSize(pageSize);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    fetchTickets(status);
  };

  useEffect(() => {
    fetchSites()
      .then((res) => {
        const formatted = res.data.map((site) => ({
          siteId: site.id,
          name: site.name,
        }));
        setSites(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch assignees", err);
      });
  }, []);

  // useEffect(() => {
  //   const fetchSites = async () => {
  //     try {
  //       const data = await getSites();
  //       console.log("sites data got fetched is ", data);
  //       setSites(data);
  //     } catch (err) {
  //       console.error("Failed to load sites", err);
  //     }
  //   };
  //   fetchSites();
  // }, []);

  const handleAssigneeChange = (e) => {
    const assignee = e.target.value;
    // console.log("assignee is ", assignee);
    setSelectedAssignee(assignee);
    fetchTicketsAssignee(selectedStatus, page, assignee); // ✅ Correct
  };

  // const handleSiteChange = (e) => {
  //   const choosenSite = e.target.value;
  //   // console.log("site choosen is ", choosenSite);
  //   setSelectedSite(choosenSite);
  //   const res = getTicketsBySite(choosenSite); // ✅ Correct
  //   console.log("res from site is ", res);
  // };

  const predefinedMessages = [
    "Thank you for your patience.",
    "We are looking into your issue.",
    "Can you please provide more details?",
    "This ticket has been resolved.",
  ];

  const handleSelectPredefined = (msg) => {
    setNewMessage(msg);
    setShowPredefined(false);
  };

  const fetchTicketsAssignee = async (
    status = "OPEN",
    customPage = page,
    employeeId = "ALL" // New optional param
  ) => {
    // console.log("Calling assignee method with employeeId:", employeeId);

    try {
      const res = await getTickets({
        page: customPage,
        size,
        status,
        employeeId, // Pass employeeId to API call
      });

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

  const handleCloseTicket = async () => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(selectedTicket.id, "CLOSED");
      setTicketStatus("CLOSED");
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
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

      // console.log("message dto is ", messageDTO);

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

  useEffect(() => {
    fetchTickets();
    const role = hasRole("ADMIN") ? "admin" : "user";
    setUserRole(role);
  }, []);

  useEffect(() => {
    getAssignees()
      .then((res) => {
        const formatted = res.data.map((user) => ({
          employeeId: user.employeeId,
          name: user.username,
        }));
        setAssignees(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch assignees", err);
      });
  }, []);

  return (
    <div className="lg:ml-40 pt-16">
      {/* Left Section - Ticket List */}
      <div
      // className={`w-full lg:w-2/3 p-1 transition-all ${
      //   selectedTicket ? "lg:w-1/2" : "lg:w-2/3"
      // }`}
      >
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
          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center mb-2 overflow-x-auto">
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
              {/* <label className="block text-sm font-medium text-gray-700">
                Filter by Status:
              </label> */}
              {/* <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
                <option value="UNASSIGNED">Unassigned</option>
              </select> */}

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="w-full sm:w-1/2 p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="OPEN">Open</option>
                  <option value="WAITING">Waiting</option>
                  {/* <option value="RESOLVED">Resolved</option> */}
                  <option value="CLOSED">Closed</option>
                  <option value="UNASSIGNED">Unassigned</option>
                  <option value="ALL">All</option>
                </select>

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

            <div className="space-y-4">
              {/* Site Dropdown */}
              {/* <select
                value={selectedSite}
                onChange={handleSiteChange}
                className="w-full sm:w-1/2 p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
              >
                <option value="ALL">Select Site</option>
                {sites.map(({ siteId, name }) => (
                  <option key={siteId} value={siteId}>
                    {name}
                  </option>
                ))}
              </select> */}

              {/* Date Filter Buttons */}
              {/* <div className="flex gap-3 flex-wrap">
                {[
                  { label: "0-7 Days", value: "7" },
                  { label: "8-15 Days", value: "15" },
                  { label: "16-30 Days", value: "30" },
                  { label: "> 30 Days", value: "more" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleDateRange(value)}
                    className={`px-1 py-0.5 text-xs rounded-md border transition ${
                      selectedRange === value
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border-blue-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div> */}

              {/* Site Filter */}
              <select
                value={selectedSite}
                onChange={handleSiteChange}
                className="text-xs px-2 py-1 border rounded w-auto"
              >
                <option value="ALL">Select Site</option>
                {sites.map(({ siteId, name }) => (
                  <option key={siteId} value={siteId}>
                    {name}
                  </option>
                ))}
              </select>

              {/* Date Range Buttons */}
              <div className="flex gap-1">
                {[
                  { label: "0-7", value: "7" },
                  { label: "8-15", value: "15" },
                  { label: "16-30", value: "30" },
                  { label: ">30", value: "more" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleDateRange(value)}
                    className={`text-xs px-2 py-1 rounded border ${
                      selectedRange === value
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border-blue-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
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
                      // <tr
                      //   key={ticket.id}
                      //   className="hover:bg-gray-50 transition cursor-pointer"
                      //   onClick={() => setSelectedTicket(ticket)}
                      // >

                      <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => setSelectedTicket(ticket)}
                        onDoubleClick={() => {
                          setIsTicketModalOpen(true); // 👈 Open the modal
                          setSelectedTicketId(ticket.id); // 👈 Pass the ticket ID
                        }}
                      >
                        <td className="px-3 py-2">{ticket.id}</td>

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
      {/* Right Section - Message Panel this will work as turncate line-clamp-2 */}

      {/* {selectedTicket && (
        <div className="fixed top-[64px] right-0 w-full md:w-[320px] h-[calc(100%-64px)] bg-white border-l shadow-xl p-4 overflow-y-auto z-40 transition-all duration-300 ease-in-out">
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

              <TicketAttachmentButton ticket={selectedTicket} />

              <button
                className="text-lg text-gray-500 hover:text-gray-700 transition"
                onClick={() => setSelectedTicket(null)}
              >
                &times;
              </button>
            </div>
          </div>

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

          <div className="mt-auto">
            <div className="relative">
              <textarea
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize text-sm"
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
                  <button
                    type="button"
                    onClick={() => setShowPredefined((prev) => !prev)}
                    className="absolute bottom-2 right-20 text-gray-500 hover:text-blue-600"
                    title="Select predefined message"
                  >
                    💬
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMessageType((prev) =>
                        prev === "PUBLIC_RESPONSE"
                          ? "INTERNAL_NOTE"
                          : "PUBLIC_RESPONSE"
                      )
                    }
                    className={`absolute bottom-2 right-3 text-sm px-1.5 py-0.5 rounded-md ${
                      messageType === "INTERNAL_NOTE"
                        ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                    title="Toggle Message Type"
                  >
                    {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}
                  </button>
                </>
              )}

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

              {userRole !== "user" && (
                <>
                  <div className="relative">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md shadow-md"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      disabled={isSending || !newMessage.trim()}
                    >
                      ▼
                    </button>

                    {dropdownOpen && (
                      <ul className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-md z-10">
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={async () => {
                              setDropdownOpen(false);
                              try {
                                await handleAddMessage();
                                await handleCloseTicket();
                                toast.success(
                                  "Message sent and ticket closed."
                                );
                              } catch (err) {
                                toast.error("Failed to send and close.");
                                console.error(err);
                              }
                            }}
                            disabled={isSending || !newMessage.trim()}
                          >
                            Send and Close
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )} */}

      {selectedTicket && (
        // <div className="fixed top-[64px] right-0 w-full md:w-[320px] h-[calc(100%-64px)] bg-white border-l shadow-xl p-4 overflow-y-auto z-40 transition-all duration-300 ease-in-out">

        <div
          className={`fixed top-[64px] right-0 h-[calc(100%-64px)] bg-white border-l shadow-xl p-4 overflow-y-auto z-40 transition-all duration-300 ease-in-out ${
            isMaximized ? "w-full md:w-full" : "w-full md:w-[320px]"
          }`}
        >
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
              {/* Maximize/Minimize Button */}
              {/* <button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title={isMaximized ? "Minimize" : "Maximize"}
                onClick={() => setIsMaximized((prev) => !prev)}
              >
                {isMaximized ? (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4z" />
                  </svg>
                )}
              </button> */}

              <button
                className="w-10 h-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md transition-all duration-200 flex items-center justify-center"
                title={isMaximized ? "Minimize" : "Maximize"}
                onClick={() => setIsMaximized((prev) => !prev)}
              >
                {isMaximized ? (
                  // Minimize Icon (Two horizontal lines)
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M5 18h14" />
                  </svg>
                ) : (
                  // Maximize Icon (Square outline)
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
                  </svg>
                )}
              </button>

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

              <TicketAttachmentButton ticket={selectedTicket} />

              {/* Close Button */}
              {/* <button
                className="text-lg text-gray-500 hover:text-gray-700 transition"
                onClick={() => setSelectedTicket(null)}
              >
                &times;
              </button> */}

              <button
                onClick={() => setSelectedTicket(null)}
                aria-label="Close"
                className="text-white bg-red-600 hover:bg-red-700 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                &times;
              </button>
            </div>
          </div>

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

          <div className="mt-auto">
            <div className="relative">
              <textarea
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize text-sm"
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
                    className={`absolute bottom-2 right-3 text-sm px-1.5 py-0.5 rounded-md ${
                      messageType === "INTERNAL_NOTE"
                        ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                    title="Toggle Message Type"
                  >
                    {messageType === "INTERNAL_NOTE" ? "🛡 Note" : "Public"}
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

              {userRole !== "user" && (
                <>
                  {/* Dropdown toggle button */}
                  <div className="relative">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md shadow-md"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      disabled={isSending || !newMessage.trim()}
                    >
                      ▼
                    </button>

                    {dropdownOpen && (
                      <ul className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-md z-10">
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={async () => {
                              setDropdownOpen(false);
                              try {
                                await handleAddMessage();
                                await handleCloseTicket();
                                toast.success(
                                  "Message sent and ticket closed."
                                );
                              } catch (err) {
                                toast.error("Failed to send and close.");
                                console.error(err);
                              }
                            }}
                            disabled={isSending || !newMessage.trim()}
                          >
                            Send and Close
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* {selectedUser && (
        <UserDetailsModal
          query={selectedUser} // ✅ Pass as `query`, not `username`
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )} */}

      {Boolean(selectedUser) && (
        <UserDetailsModal
          query={selectedUser}
          isOpen
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
