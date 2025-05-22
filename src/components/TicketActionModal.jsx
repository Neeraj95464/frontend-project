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
  const [employees, setEmployees] = useState([]);
  const [newEmployeeId, setNewEmployeeId] = useState("");
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const employeeOptions = employees.map((emp) => ({
    value: emp.id,
    label: emp.name,
  }));
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedEmployees, setMatchedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [locations, setLocations] = useState([
    { id: 1, name: "Office 1" },
    { id: 2, name: "Office 2" },
    { id: 3, name: "Remote" },
  ]);

  // useEffect(() => {
  //   getEmployees()
  //     .then((res) => {
  //       const formatted = res.data.map((user) => ({
  //         id: user.employeeId,
  //         name: user.username,
  //       }));
  //       setEmployees(formatted); // for changing employee too
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch assignees", err);
  //     });
  // }, []);

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
    setSearchQuery(`${employee.username} (${employee.id})`);
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
      await updateTicketLocation(ticketId, locId);
      setLocation(locId);
      toast.success("Location updated");
    } catch (error) {
      toast.error("Failed to update location");
      console.error("Error updating location:", error);
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
      {/* <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl animate-fadeIn"> */}

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-fadeIn">
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
            Ticket ID = {ticket.id}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              disabled={isUpdating}
              value={ticketStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-50"
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
              disabled={isUpdating}
              value={assignee}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-50"
            >
              <option value="">Select assignee</option>
              {assignees.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Change Employee
            </label>

            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search employee..."
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Matching Employees Dropdown */}
            {matchedEmployees.length > 0 && (
              <div className="mt-2 p-2 border border-gray-300 rounded bg-white shadow-md">
                <p className="text-sm text-green-600 font-semibold">
                  Matching Employees:
                </p>
                <ul className="list-none">
                  {matchedEmployees.map((employee) => (
                    <li
                      key={employee.id}
                      onClick={() => handleSelectEmployee(employee)}
                      className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                    >
                      {employee.employeeId} - {employee.username}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display Selected Employee */}
            {/* {selectedEmployee && (
              <p className="text-sm text-blue-600 mt-2">
                Selected: {selectedEmployee.id} - {selectedEmployee.username}
              </p>
            )} */}
            {selectedEmployee && (
              <>
                <p className="text-sm text-blue-600 mt-2">
                  Selected: {selectedEmployee.employeeId} -{" "}
                  {selectedEmployee.username}
                </p>
                <button
                  onClick={() => handleChangeEmployeeClick()}
                  disabled={isUpdating}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                >
                  Change Employee
                </button>
              </>
            )}

            {/* Hidden input for selected user ID */}
            <input
              type="hidden"
              {...register("assigneeId", { required: true })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => handleDueDateChange(e.target.value)}
                disabled={isUpdating}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-50"
              />
            </div>
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
                  disabled={isUpdating}
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
                disabled={isUpdating}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50"
              />
              <button
                onClick={handleAddCC}
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
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
