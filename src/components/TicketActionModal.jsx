import {
  getTicketById,
  updateTicketStatus,
  updateTicketAssignee,
  updateTicketLocation,
  updateTicketCcEmail,
  getAssignees,
  updateTicketDueDate,
  changeTicketEmployeeIfSame,
  getEmployees,
  searchEmployees,
  updateTicketCategory,
} from "../services/api";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// ✅ Add this line
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const TicketActionModal = ({ open, ticketId, onClose }) => {
  const [ticket, setTicket] = useState(null);
  const [ticketStatus, setTicketStatus] = useState("");
  const [ccEmails, setCcEmails] = useState([]);
  const [location, setLocation] = useState("");
  const [assignee, setAssignee] = useState("");
  const [newCCEmail, setNewCCEmail] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const { register, setValue } = useForm();
  const [category, setCategory] = useState("");
  const [employees, setEmployees] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [matchedEmployees, setMatchedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const ticketLocations = [
    { value: 3, label: "Jubilee Hills" },
    { value: 4, label: "Secundrabad" },
    { value: 5, label: "Somajiguda" },
    { value: 6, label: "Jubilee Hills" },
    { value: 7, label: "Madhapur" },
    { value: 8, label: "Bantia-Skoda" },
    { value: 9, label: "Bhimavaram-Skoda" },
    { value: 10, label: "Bowenpally-Skoda" },
    { value: 11, label: "Corp-Jubilee Hills" },
    { value: 12, label: "Guntur Skoda" },
    { value: 13, label: "Guntur-Skoda" },
    { value: 14, label: "Jubilee Hills-Skoda" },
    { value: 15, label: "Kakinada-Skoda" },
    { value: 16, label: "Kukatpally-Benelli" },
    { value: 17, label: "Nellore-Skoda" },
    { value: 18, label: "Rajahmundry-Isuzu" },
    { value: 19, label: "Rajahmundry-Skoda" },
    { value: 20, label: "Sanath Nagar Skoda" },
    { value: 21, label: "Sanath Nagar-Skoda" },
    { value: 22, label: "Secunderabad-Skoda" },
    { value: 23, label: "Somajiguda-Skoda" },
    { value: 24, label: "Srikakulam-Skoda" },
    { value: 25, label: "Stock yard-Skoda" },
    { value: 26, label: "Vijayawada-Skoda" },
    { value: 27, label: "Vizag-Skoda" },
    { value: 28, label: "Warangal-Skoda" },
    { value: 29, label: "Bowenpally-MB" },
    { value: 30, label: "Corp-Jubilee Hills" },
    { value: 31, label: "Kondapur-MB" },
    { value: 32, label: "Kukatpally-Benelli" },
    { value: 33, label: "Madhapur-MB" },
    { value: 34, label: "Stock Yard-MB" },
    { value: 35, label: "Vijayawada-MB" },
    { value: 36, label: "Corp-Jubilee Hills" },
    { value: 37, label: "Guntur-Benelli" },
    { value: 38, label: "Guntur-Isuzu" },
    { value: 39, label: "Karimnagar-Isuzu" },
    { value: 40, label: "Kukatpally-Benelli" },
    { value: 41, label: "Kukatpally-Isuzu" },
    { value: 42, label: "LB Nagar-Isuzu" },
    { value: 43, label: "Madhapur-Isuzu" },
    { value: 44, label: "Nellore-Benelli" },
    { value: 45, label: "Pune-Benelli" },
    { value: 46, label: "Rajahmundry-Benelli" },
    { value: 47, label: "Rajahmundry-Isuzu" },
    { value: 48, label: "Vijayawada-Benelli" },
    { value: 49, label: "Vijayawada-Isuzu" },
    { value: 50, label: "Vizag-Benelli" },
    { value: 51, label: "Vizag-Isuzu" },
    { value: 52, label: "Vizag-Skoda" },
    { value: 53, label: "Vyttila-Benelli" },
    { value: 54, label: "Corp-Jubilee Hills" },
    { value: 55, label: "Nettoor - Coastal Star" },
    { value: 56, label: "Nettoor-MB" },
    { value: 57, label: "Trikkakara-MB" },
    { value: 58, label: "Trivandrum-MB" },
    { value: 59, label: "TVM-Chakkai-MB" },
    { value: 60, label: "TVM-Kochuvelli-MB" },
    { value: 61, label: "Corp-Jubilee Hills" },
    { value: 62, label: "Gundlapochampally" },
    { value: 63, label: "New Delhi" },
  ];

  const ticketCategories = [
    { label: "Hardware", value: "HARDWARE" },
    { label: "Software", value: "SOFTWARE" },
    { label: "Network", value: "NETWORK" },
    { label: "Other", value: "OTHER" },
    { label: "CCTV", value: "CCTV" },
    { label: "Maintenance", value: "MAINTENANCE" },
    { label: "Focus", value: "FOCUS" },
    // { label: "Admin", value: "ADMIN" },
    // { label: "Logistics", value: "LOGISTICS" },
    // { label: "Desktop", value: "DESKTOP" },
    // { label: "DMS", value: "DMS" },
    { label: "Email", value: "EMAIL" },
    // { label: "Intercom", value: "INTERCOM" },
    // { label: "Projector", value: "PROJECTOR" },
    { label: "New Project", value: "NEW_PROJECT" },
    // { label: "Server", value: "SERVER" },
    // { label: "SFDC", value: "SFDC" },
    // { label: "Stores", value: "STORES" },
    // { label: "iPad/Tab", value: "IPAD_TAB" },
    { label: "UPS", value: "UPS" },
    // { label: "Web Application", value: "WEB_APPLICATION" },
    // { label: "Xentry", value: "XENTRY" },
    { label: "Workshop Diagnostic Tools", value: "WORKSHOP_DIAGNOSTIC_TOOLS" },
    { label: "Printer", value: "PRINTER" },
    // { label: "Hiring", value: "HIRING" },
    // { label: "Payroll", value: "PAYROLL" },
    // { label: "Policy", value: "POLICY" },
    // { label: "Payslip", value: "PAYSLIP" },
  ];

  // useEffect(() => {
  //   const fetchTicket = async () => {
  //     if (ticketId) {
  //       try {
  //         const data = await getTicketById(ticketId);
  //         setTicket(data);
  //         setTicketStatus(data.status);
  //         setCcEmails(data.ccEmails || []);
  //         setLocation(data.location?.id || "");
  //         setAssignee(data.assignee?.employeeId || "");
  //       } catch (error) {
  //         console.error("Error fetching ticket:", error);
  //       }
  //     }
  //   };

  //   fetchTicket();
  // }, [ticketId]);

  // useEffect(() => {
  //   const fetchTicket = async () => {
  //     if (ticketId) {
  //       try {
  //         const data = await getTicketById(ticketId);
  //         setTicket(data);
  //         setTicketStatus(data.status);
  //         setCategory(data.category); // ✅ Use data.category directly
  //         setLocation(data.location?.id || ""); // ✅ Use ID, not name
  //         // ✅ location ID for dropdown
  //         setCcEmails(data.ccEmails || []);
  //         setAssignee(data.assignee?.employeeId || "");
  //       } catch (error) {
  //         console.error("Error fetching ticket:", error);
  //       }
  //     }
  //   };

  //   fetchTicket();
  // }, [ticketId]);

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

  useEffect(() => {
    const fetchTicket = async () => {
      if (ticketId) {
        try {
          const data = await getTicketById(ticketId);
          // console.log("data are ", data);
          setTicket(data);
          setTicketStatus(data.status);
          setCategory(data.category);
          setLocation(data.location || "");
          setCcEmails(data.ccEmails || []);

          if (data.assignee) {
            const found = assignees.find(
              (a) =>
                a.employeeId === data.assignee.employeeId ||
                a.id === data.assignee.id
            );
            setAssignee(found?.id || "");
            setRawAssigneeName(data.assignee.name);
          }

          const matched = employees.find(
            (emp) => emp.name === data.employee?.username
          );
          setMatchedEmployees(matched ? [matched] : []); // convert to array

          // if (data.employee) {
          //   const emp = matchedEmployees.find(
          //     (e) =>
          //       e.employeeId === data.employee.employeeId ||
          //       e.id === data.employee.id
          //   );
          //   setMatchedEmployees(emp?.id || "");
          // }

          if (data.dueDate) {
            const formattedDate = data.dueDate.split("T")[0];
            setDueDate(formattedDate);
          }
        } catch (error) {
          console.error("Error fetching ticket:", error);
        }
      }
    };

    fetchTicket();
  }, [ticketId, assignees]);

  // New effect: Wait for both assignees + rawAssigneeName
  const [rawAssigneeName, setRawAssigneeName] = useState("");

  useEffect(() => {
    if (rawAssigneeName && assignees.length > 0) {
      const matched = assignees.find((user) => user.name === rawAssigneeName);
      setAssignee(matched?.id || "");
    }
  }, [rawAssigneeName, assignees]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setMatchedEmployees([]);
      setSelectedEmployee(null);
      return;
    }

    try {
      const employees = await searchEmployees(query);
      setMatchedEmployees(employees);
    } catch {
      setMatchedEmployees([]);
    }
  };

  const handleChangeEmployeeClick = async () => {
    if (!selectedEmployee || !ticketId) return;
    setIsUpdating(true);
    try {
      await handleChangeEmployee(ticketId, selectedEmployee.employeeId);
      toast.success("Employee updated successfully");
    } catch (error) {
      toast.error("Failed to change employee");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setSearchQuery(`${employee.username} (${employee.employeeId})`);
    setValue("assigneeId", employee.employeeId); // or creatorId, based on context
    setMatchedEmployees([]);
  };

  const handleDueDateChange = async (value) => {
    const fullDateTime = `${value}T00:00:00`; // appending default time
    setDueDate(value); // for input display
    setIsUpdating(true);
    try {
      await updateTicketDueDate(ticketId, fullDateTime); // pass full datetime
      toast.success("Due date updated");
    } catch (error) {
      toast.error("Failed to update due date");
      console.error("Error updating due date:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangeEmployee = async (ticketId, newEmployeeId) => {
    try {
      const updatedTicket = await changeTicketEmployeeIfSame(
        ticketId,
        newEmployeeId
      );
      console.log("Employee updated successfully", updatedTicket);
      return updatedTicket;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await updateTicketStatus(ticketId, newStatus);
      setTicketStatus(newStatus);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssigneeChange = async (assigneeId) => {
    setIsUpdating(true);
    try {
      await updateTicketAssignee(ticketId, assigneeId);
      setAssignee(assigneeId);
      toast.success("Assignee updated");
    } catch (error) {
      toast.error("Failed to update assignee");
      console.error("Error updating assignee:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLocationChange = async (locId) => {
    setIsUpdating(true);
    try {
      console.log("Sending location update:", ticketId, locId);
      await updateTicketLocation(ticketId, locId);
      setLocation(locId);
      toast.success("Location updated successfully");
    } catch (error) {
      toast.error("Failed to update location");
      console.error("Location update error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setIsUpdating(true);
    try {
      console.log("Sending category update:", ticketId, category);
      await updateTicketCategory(ticketId, category);
      setCategory(category);
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
      console.error("Category update error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddCC = async () => {
    const email = newCCEmail.trim();
    if (email && !ccEmails.includes(email)) {
      setIsUpdating(true);
      try {
        const updated = await updateTicketCcEmail(ticketId, email, true);
        setCcEmails(updated);
        setNewCCEmail("");
        toast.success("CC Email added");
      } catch (error) {
        toast.error("Failed to add CC email");
        console.error("Error adding CC email:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemoveCC = async (email) => {
    setIsUpdating(true);
    try {
      const updated = await updateTicketCcEmail(ticketId, email, false);
      setCcEmails(updated);
      toast.success("CC Email removed");
    } catch (error) {
      toast.error("Failed to remove CC email");
      console.error("Error removing CC email:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-800">Manage Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)] space-y-4 text-sm text-gray-700">
          <div>
            <span className="block font-semibold">Ticket ID:</span>
            <span className="text-blue-600 font-medium">{ticket.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                disabled={isUpdating}
                value={ticketStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full border rounded-md px-2 py-1"
              >
                <option value="OPEN">Open</option>
                <option value="WAITING">Waiting</option>
                {/* <option value="RESOLVED">Resolved</option> */}
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <select
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                disabled={isUpdating}
                className="w-full border rounded-md px-2 py-1"
              >
                <option value="" disabled>
                  Select Location
                </option>
                {ticketLocations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={isUpdating}
                className="w-full border rounded-md px-2 py-1"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {ticketCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignee */}
            <div>
              <label className="block mb-1 font-medium">Assignee</label>

              <select
                value={assignee}
                onChange={(e) => handleAssigneeChange(e.target.value)}
                disabled={isUpdating}
                className="w-full border rounded-md px-2 py-1"
              >
                <option value="">Select assignee</option>
                {assignees.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block mb-1 font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => handleDueDateChange(e.target.value)}
                disabled={isUpdating}
                className="w-full border rounded-md px-2 py-1"
              />
            </div>
          </div>

          {/* Search Employee */}
          <div className="mt-2">
            <label className="block font-medium mb-1">Change Employee</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search employee..."
              className="w-full border rounded-md px-2 py-1"
            />

            {/* Matched Employees */}
            {matchedEmployees.length > 0 && (
              <div className="mt-2 border rounded bg-gray-50 shadow-inner p-2">
                <p className="text-green-600 font-semibold text-xs mb-1">
                  Matching Employees:
                </p>
                <ul className="divide-y divide-gray-200">
                  {matchedEmployees.map((emp) => (
                    <li
                      key={emp.id}
                      onClick={() => handleSelectEmployee(emp)}
                      className="py-1 cursor-pointer hover:bg-gray-100 px-2"
                    >
                      {emp.employeeId} - {emp.username}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedEmployee && (
              <div className="mt-2">
                <p className="text-sm text-blue-600">
                  Selected: {selectedEmployee.employeeId} -{" "}
                  {selectedEmployee.username}
                </p>
                <button
                  onClick={handleChangeEmployeeClick}
                  className="mt-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:opacity-50"
                >
                  Change Employee
                </button>
              </div>
            )}
          </div>

          {/* Hidden Assignee ID Input */}
          <input
            type="hidden"
            {...register("assigneeId", { required: true })}
          />

          {/* CC Emails */}
          <div>
            <label className="block font-medium mb-1">CC Emails</label>
            <div className="space-y-1">
              {ccEmails.map((email, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded"
                >
                  <span className="text-sm">{email}</span>
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
                  className="w-full px-2 py-1 border rounded"
                />
                <button
                  onClick={handleAddCC}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t flex justify-end sticky bottom-0 bg-white z-10">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketActionModal;
