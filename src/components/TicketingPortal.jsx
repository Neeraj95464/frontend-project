import UserDetailsModal from "../components/UserDetailsModal";
import {
  getTickets,
  addMessageToTicket,
  hasRole,
  updateTicketStatus,
  searchTickets,
  getAssignees,
  fetchSites,
  downloadUserTickets,
  getLocationsBySite,
} from "../services/api";
import TicketActionModal from "./TicketActionModal";
import TicketAttachmentButton from "./TicketAttachmentButton";
import TicketModal from "./TicketFormModal";
import { Button, Card } from "./ui";
import {
  format,
  formatDistanceToNow,
  parseISO,
  isBefore,
  subDays,
} from "date-fns";
import dayjs from "dayjs";
import { MoreVertical, Filter, X } from "lucide-react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TicketingPortal() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("OPEN");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = React.useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState("PUBLIC_RESPONSE");
  const [ticketStatus, setTicketStatus] = useState("");
  const navigate = useNavigate();
  const [showPredefined, setShowPredefined] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedAgeFilter, setSelectedAgeFilter] = useState(null);
  const [textareaRows, setTextareaRows] = useState(3);
  const textareaRef = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    status: "OPEN",
    category: null,
    employeeId: null,
    locationId: null,
    siteIdLocationId: null,
    search: null,
    assigneeId: null,
    createdAfter: null,
    createdBefore: null,
  });

  const itCategories = [
    "HARDWARE",
    "SOFTWARE",
    "NETWORK",
    "PRINTER",
    "UPS",
    "CCTV",
    "FOCUS",
    "EMAIL",
    "DMS",
    "WORKSHOP_DIAGNOSTIC_TOOLS",
    "OTHER",
    "MAINTENANCE",
    "NEW_PROJECT",
    "CUG_SIM",
    "ZOHO_SUPPORT",
  ];

  const hrCategories = [
    "PAYROLL",
    "RECRUITMENT",
    "HR_OPERATIONS",
    "GENERAL_HR_QUERIES",
  ];

  const handleDownloadTickets = async () => {
    try {
      const params = { ...filters };
      // Remove pagination params for download
      delete params.page;
      delete params.size;

      // Remove null/undefined values
      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key],
      );

      const response = await downloadUserTickets(params);

      // Create blob and download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `tickets_${dayjs().format("YYYY-MM-DD")}.xlsx`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Tickets downloaded successfully");
    } catch (error) {
      console.error("Error downloading tickets:", error);
      toast.error("Failed to download tickets");
    }
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
        console.error("Failed to fetch sites", err);
      });
  }, []);

  useEffect(() => {
    if (filters.siteIdLocationId) {
      getLocationsBySite(filters.siteIdLocationId)
        .then((locations) => {
          setLocations(locations);
        })
        .catch((err) => {
          console.error("Error fetching locations", err);
        });
    } else {
      setLocations([]);
    }
  }, [filters.siteIdLocationId]);

  const predefinedMessages = [
    "Thank you for your patience. we are still actively working on your issue",
    "Dear team, We are looking into your issue.",
    "Dear team, Could you please provide more details?",
    "Dear team, As solution has been provided will move to close the ticket.",
  ];

  const handlePredefinedSelect = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSelectPredefined = (msg) => {
    setNewMessage(msg);
    setShowPredefined(false);
  };

  const handleCloseTicket = async () => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(selectedTicket.id, "CLOSED");
      setTicketStatus("CLOSED");
      toast.success("Status updated");

      // Update the selected ticket status locally
      setSelectedTicket((prev) => ({
        ...prev,
        status: "CLOSED",
      }));

      // Refresh the ticket list after closing
      refreshTicketList();
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
        sender: "You",
        ticketMessageType: messageType,
      };

      const savedMessage = await addMessageToTicket(
        selectedTicket.id,
        messageDTO,
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

      // Refresh ticket list after sending message (updates lastUpdated timestamp)
      refreshTicketList();
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
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      );

      // Refresh ticket list after status update
      refreshTicketList();
    } catch (error) {
      console.error("Failed to update status", error);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: oldStatus } : ticket,
        ),
      );
    }
  };

  const refreshTicketList = async () => {
    await fetchTicketsWithFilters(page);
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

  const fetchTicketsWithFilters = async (customPage = page) => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: customPage,
        size,
        employeeId: "ALL", // ✅ Always include
      };

      // Remove null/undefined values
      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key],
      );

      // console.log("🔍 API params:", params); // DEBUG

      const res = await getTickets(params); // ✅ FIXED: filterTickets

      // console.log("📦 Full response:", res); // DEBUG

      // ✅ FIXED: Direct destructuring from res (not res.content)
      const {
        content = [],
        page: pageNumber,
        size: pageSize,
        totalElements,
        totalPages,
        last,
      } = res || {};

      // console.log("✅ Extracted content length:", content.length); // DEBUG

      // ✅ FIXED: All state updates work now
      setFilteredTickets(content);
      setPaginationInfo({ totalElements, totalPages, last });
      setPage(pageNumber);
      setSize(pageSize);
    } catch (error) {
      console.error("❌ Error fetching tickets:", error);
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketsWithFilters(0);
  }, [filters]);

  // Handle closing the TicketActionModal and refresh list
  const handleTicketActionModalClose = () => {
    setIsTicketModalOpen(false);
    setSelectedTicketId(null);
    // Refresh ticket list when action modal closes
    refreshTicketList();
  };

  // Handle closing the Create Ticket Modal and refresh list
  const handleCreateTicketModalClose = () => {
    setIsDialogOpen(false);
    // Refresh ticket list when create ticket modal closes
    refreshTicketList();
  };

  const handleAgeFilter = (ageRange) => {
    const now = new Date();
    let createdAfter = null;
    let createdBefore = null;

    switch (ageRange) {
      case "0-7":
        createdAfter = subDays(now, 7).toISOString();
        createdBefore = now.toISOString();
        break;
      case "8-15":
        createdAfter = subDays(now, 15).toISOString();
        createdBefore = subDays(now, 8).toISOString();
        break;
      case "16-30":
        createdAfter = subDays(now, 30).toISOString();
        createdBefore = subDays(now, 16).toISOString();
        break;
      case "31+":
        createdAfter = null;
        createdBefore = subDays(now, 31).toISOString();
        break;
      default:
        createdAfter = null;
        createdBefore = null;
    }

    setSelectedAgeFilter(ageRange);
    setFilters((prev) => ({
      ...prev,
      createdAfter,
      createdBefore,
    }));
    setPage(0);
  };

  // Handle closing the chat panel
  const handleCloseChatPanel = () => {
    setSelectedTicket(null);
    // Refresh ticket list when chat panel closes
    refreshTicketList();
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0); // Reset to first page on filter change
  };

  useEffect(() => {
    // fetchTickets();

    let role = "user";
    if (hasRole("ADMIN") || hasRole("HR_ADMIN") || hasRole("EXECUTIVE")) {
      role = "admin";
    }

    setUserRole(role);
  }, []);

  return (
    <div className="lg:ml-40 pt-16 py-0">
      <div>
        <TicketModal
          isOpen={isDialogOpen}
          onClose={handleCreateTicketModalClose}
          className="z-50"
        />
        <Card className="py-0">
          <div className="border-b border-gray-200 bg-gray-50 py-0">
            <div className="flex gap-3 px-6 items-center py-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all font-medium border border-gray-200"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide" : "Filters"}
              </button>

              <Button
                onClick={() => setIsDialogOpen(true)}
                className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 h-auto whitespace-nowrap rounded-lg"
                size="sm"
              >
                + Create
              </Button>

              {/* Pagination */}
              <div className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm">
                <button
                  onClick={() => {
                    const newPage = Math.max(page - 1, 0);
                    setPage(newPage);
                    fetchTicketsWithFilters(newPage);
                  }}
                  disabled={page === 0}
                  className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                >
                  ←
                </button>

                <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
                  {page + 1}/{paginationInfo.totalPages}
                </span>

                <button
                  onClick={() => {
                    const newPage =
                      page + 1 < paginationInfo.totalPages ? page + 1 : page;
                    setPage(newPage);
                    fetchTicketsWithFilters(newPage);
                  }}
                  disabled={paginationInfo.last}
                  className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                >
                  →
                </button>
              </div>

              {/* Total Results */}
              <div className="flex-shrink-0 text-xs text-gray-600 font-medium whitespace-nowrap px-2">
                Total: {paginationInfo.totalElements}
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownloadTickets}
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-semibold shadow-sm transition-all"
                disabled={loading}
              >
                <span>📥</span>
                <span>Download</span>
              </Button>
            </div>

            {showFilters && (
              <div className="px-6 pb-4">
                {/* Main Filter Row */}
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
                  {/* Status Filter */}
                  <div className="flex-shrink-0">
                    <select
                      value={filters.status || ""}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value || null)
                      }
                      className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[100px]"
                    >
                      <option value="">All Status</option>
                      <option value="OPEN">Open</option>
                      <option value="WAITING">Waiting</option>
                      <option value="CLOSED">Closed</option>
                      <option value="UNASSIGNED">Unassigned</option>
                    </select>
                  </div>

                  {/* Site Filter */}
                  <div className="flex-shrink-0">
                    <select
                      value={filters.siteIdLocationId || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "siteIdLocationId",
                          e.target.value || null,
                        )
                      }
                      className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[100px]"
                    >
                      <option value="">All Sites</option>
                      {sites.map(({ siteId, name }) => (
                        <option key={siteId} value={siteId}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="flex-shrink-0">
                    <select
                      value={filters.locationId || ""}
                      onChange={(e) =>
                        handleFilterChange("locationId", e.target.value || null)
                      }
                      className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[120px]"
                    >
                      <option value="">All Locations</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="flex-shrink-0">
                    <select
                      value={filters.category || ""}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value || null)
                      }
                      className="text-xs p-1.5 pr-6 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-[120px]"
                    >
                      <option value="">All Categories</option>
                      {(userRole === "HR_ADMIN"
                        ? hrCategories
                        : itCategories
                      ).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Age Filter Buttons */}
                  <button
                    onClick={() => handleAgeFilter("0-7")}
                    className={`flex-shrink-0 px-2.5 py-1.5 text-xs rounded-md font-semibold transition-all ${
                      selectedAgeFilter === "0-7"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    0-7d
                  </button>
                  <button
                    onClick={() => handleAgeFilter("8-15")}
                    className={`flex-shrink-0 px-2.5 py-1.5 text-xs rounded-md font-semibold transition-all ${
                      selectedAgeFilter === "8-15"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    8-15d
                  </button>
                  <button
                    onClick={() => handleAgeFilter("16-30")}
                    className={`flex-shrink-0 px-2.5 py-1.5 text-xs rounded-md font-semibold transition-all ${
                      selectedAgeFilter === "16-30"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    16-30d
                  </button>
                  <button
                    onClick={() => handleAgeFilter("31+")}
                    className={`flex-shrink-0 px-2.5 py-1.5 text-xs rounded-md font-semibold transition-all ${
                      selectedAgeFilter === "31+"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    31+d
                  </button>

                  {/* Clear Age Filter */}
                  {selectedAgeFilter && (
                    <button
                      onClick={() => {
                        setSelectedAgeFilter(null);
                        setFilters((prev) => ({
                          ...prev,
                          createdAfter: null,
                          createdBefore: null,
                        }));
                      }}
                      className="flex-shrink-0 text-xs text-red-600 hover:text-red-800 font-medium px-2"
                    >
                      ✕
                    </button>
                  )}

                  {/* Divider */}
                  <div className="w-px h-8 bg-gray-300 flex-shrink-0 mx-1"></div>

                  {/* Search Input */}
                  <div className="flex-shrink-0 min-w-[180px]">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full text-xs p-1.5 pl-7 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                        />
                      </svg>
                    </form>
                  </div>
                </div>
              </div>
            )}
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
                        "Subject",
                        "Status",
                        "Category",
                        "Location",
                        "Assignee",
                        "Employee",
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
                        onDoubleClick={() => {
                          // Check role before opening modal
                          if (userRole === "admin") {
                            setIsTicketModalOpen(true);
                            setSelectedTicketId(ticket.id);
                          }
                          // Optional: Show toast/notification for non-admin users
                          else {
                            // toast.error("Admin access required to view ticket details");
                            console.log(
                              "Admin role required to open ticket modal",
                            );
                          }
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
                                : ticket.status === "WAITING"
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

                        <td className="px-3 py-2 whitespace-nowrap">
                          {format(parseISO(ticket.createdAt), "d/M/yyyy")} (
                          {formatDistanceToNow(parseISO(ticket.createdAt), {
                            addSuffix: true,
                          })}
                          )
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {ticket.firstRespondedAt ? (
                            <>
                              {format(
                                parseISO(ticket.firstRespondedAt.split(".")[0]),
                                "d/M/yyyy",
                              )}{" "}
                              (
                              {formatDistanceToNow(
                                parseISO(ticket.firstRespondedAt.split(".")[0]),
                                {
                                  addSuffix: true,
                                },
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
                                "d/M/yyyy",
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
                                  },
                                )}
                                {isBefore(
                                  parseISO(ticket.dueDate),
                                  new Date(),
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
                                "d/M/yyyy",
                              )}{" "}
                              (
                              <span className="text-blue-600">
                                {formatDistanceToNow(
                                  parseISO(ticket.lastUpdated.split(".")[0]),
                                  {
                                    addSuffix: true,
                                  },
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
                                "d/M/yyyy",
                              )}{" "}
                              (
                              <span className="text-green-600">
                                {formatDistanceToNow(
                                  parseISO(ticket.closedAt.split(".")[0]),
                                  {
                                    addSuffix: true,
                                  },
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
        <div
          className={`fixed top-[64px] right-0 h-[calc(100%-64px)] bg-white border-l shadow-xl p-4 overflow-y-auto z-40 transition-all duration-300 ease-in-out ${
            isMaximized ? "w-full md:w-full" : "w-full md:w-[320px]"
          }`}
        >
          <div className="mb-4 border-b pb-2">
            {/* Top Row - Ticket No + Actions */}
            <div className="flex justify-between items-center w-full mb-3">
              <div className="text-base font-bold text-green-600 bg-green-100 px-3 py-1 rounded-lg shadow-sm">
                #{selectedTicket?.id || "—"}
              </div>
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Maximize / Minimize */}
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm transition-all duration-200 hover:scale-105"
                  title={isMaximized ? "Minimize" : "Maximize"}
                  onClick={() => setIsMaximized((prev) => !prev)}
                >
                  {isMaximized ? (
                    <svg
                      className="w-5 h-5 text-gray-700"
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
                    <svg
                      className="w-5 h-5 text-gray-700"
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

                {/* Ticket Actions */}
                {userRole !== "user" && (
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm transition-all duration-200 hover:scale-105"
                    title="Ticket actions"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTicketId(selectedTicket.id);
                      setIsTicketModalOpen(true);
                    }}
                  >
                    <MoreVertical className="w-5 h-5 text-gray-700" />
                  </button>
                )}

                {/* Attachments */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm transition-all duration-200 hover:scale-105">
                  <TicketAttachmentButton ticket={selectedTicket} />
                </div>

                {/* Close Button */}
                <button
                  onClick={handleCloseChatPanel}
                  aria-label="Close"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-200 hover:scale-105"
                >
                  <span className="text-white text-lg font-bold">&times;</span>
                </button>
              </div>
            </div>

            {/* Bottom Row - Title + Description */}
            <div className="w-full">
              <h2 className="text-sm font-semibold text-gray-800">
                {selectedTicket.title}
              </h2>
              {/* <p className="text-xs text-gray-500 mt-1">
                {selectedTicket.description}
              </p> */}

              <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">
                {selectedTicket.description}
              </p>
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
                    {/* <p className="text-gray-700 text-sm">{msg.message}</p> */}

                    <p className="text-gray-700 text-sm whitespace-pre-wrap">
                      {msg.message}
                    </p>
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
                          : "PUBLIC_RESPONSE",
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
              {/* Main Send button */}
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddMessage}
                disabled={isSending || !newMessage.trim()}
              >
                {isSending ? "Sending..." : "Send"}
              </button>

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
                                  "Message sent and ticket closed.",
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

      {selectedUser && (
        <UserDetailsModal
          query={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {isTicketModalOpen && (
        <TicketActionModal
          ticketId={selectedTicketId}
          open={isTicketModalOpen}
          onClose={handleTicketActionModalClose}
        />
      )}
    </div>
  );
}
