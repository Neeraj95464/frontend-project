import {
  fetchTicketStatusCounts,
  fetchTicketsPerDay,
  fetchTicketCategoryCounts,
  fetchAssigneeTicketCounts,
  fetchResolutionStats,
  fetchTopTicketReporters,
  fetchStatusOverTime,
  getAssigneeResolutionStats,
} from "../services/api";
import React, { useState, useEffect } from "react";
// path to your api.js
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A569BD",
  "#5DADE2",
];

const Dashboard = () => {
  const [statusData, setStatusData] = useState([]);
  const [createdPerDay, setCreatedPerDay] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [assigneeData, setAssigneeData] = useState([]);
  const [resolutionStats, setResolutionStats] = useState(null);
  const [reportersData, setReportersData] = useState([]);
  const [statusOverTime, setStatusOverTime] = useState([]);
  // Inside your component (near other useState hooks)
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [assigneeResolutionStats, setAssigneeResolutionStats] = useState(null);

  const assigneeIdMap = {
    "Neeraj Kumar": "MV4748",
    "John Doe": "EMP002",
    "Jane Smith": "EMP003",
    // Add all expected names and IDs here
  };

  useEffect(() => {
    fetchTicketStatusCounts().then((res) =>
      setStatusData(mapObjectToArray(res.data))
    );
    fetchTicketsPerDay().then((res) =>
      setCreatedPerDay(mapObjectToArray(res.data, "date", "count"))
    );
    fetchTicketCategoryCounts().then((res) =>
      setCategoryData(mapObjectToArray(res.data))
    );
    // fetchAssigneeTicketCounts().then((res) =>
    //   setAssigneeData(mapObjectToArray(res.data))
    // );

    fetchAssigneeTicketCounts().then((res) => {
      const mapped = Object.entries(res.data).map(([name, count]) => ({
        name,
        employeeId: assigneeIdMap[name] || "", // fallback if not found
        value: count,
      }));
      setAssigneeData(mapped);
    });

    fetchResolutionStats().then((res) => setResolutionStats(res.data));
    fetchTopTicketReporters().then((res) =>
      setReportersData(mapObjectToArray(res.data))
    );
    fetchStatusOverTime().then((res) => setStatusOverTime(res.data));
  }, []);

  useEffect(() => {
    if (selectedAssignee) {
      getAssigneeResolutionStats(selectedAssignee)
        .then((res) => setAssigneeResolutionStats(res))
        .catch((err) => {
          toast.error("Failed to fetch assignee resolution stats");
          console.error(err);
        });
    } else {
      setAssigneeResolutionStats(null);
    }
  }, [selectedAssignee]);

  const mapObjectToArray = (obj, keyName = "name", valueName = "value") => {
    return Object.entries(obj).map(([key, value]) => ({
      [keyName]: key,
      [valueName]: value,
    }));
  };

  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 p-4">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Ticket Status Counts</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {statusData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Tickets Created Per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={createdPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="date" /> */}
            <XAxis
              dataKey="date"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Ticket Categories</h2>
        <ResponsiveContainer width="100%" height={300}>
          {/* <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart> */}

          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Tickets per Assignee</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={assigneeData}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="name" /> */}
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Resolution Time Stats</h2>
        {resolutionStats && (
          <ul className="text-base">
            <li>Average: {resolutionStats.avgResolutionTime} hours</li>
            <li>Minimum: {resolutionStats.minResolutionTime} hours</li>
            <li>Maximum: {resolutionStats.maxResolutionTime} hours</li>
          </ul>
        )}
      </div> */}

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">
          Resolution Time Stats (by Assignee)
        </h2>

        <select
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={selectedAssignee}
          onChange={(e) => {
            const selectedEmpId = e.target.value;
            setSelectedAssignee(selectedEmpId);

            // Call resolution stats for selected employee
            if (selectedEmpId) {
              getAssigneeResolutionStats(selectedEmpId)
                .then((res) => setResolutionStats(res.data))
                .catch((err) => console.error(err));
            }
          }}
        >
          <option value="">Select Assignee</option>
          {assigneeData.map((assignee) => (
            <option key={assignee.employeeId} value={assignee.employeeId}>
              {assignee.name}
            </option>
          ))}
        </select>

        {resolutionStats ? (
          <ul className="text-base">
            <li>
              Average: {resolutionStats.avgResolutionTimeInDays.toFixed(2)} days
            </li>
            <li>
              Minimum: {resolutionStats.minResolutionTimeInDays.toFixed(2)} days
            </li>
            <li>
              Maximum: {resolutionStats.maxResolutionTimeInDays.toFixed(2)} days
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">
            Select an assignee to view resolution stats
          </p>
        )}

        {/* {assigneeResolutionStats ? (
          <ul className="text-base">
            <li>
              Average:{" "}
              {assigneeResolutionStats.avgResolutionTimeInDays.toFixed(2)} days
            </li>
            <li>
              Minimum:{" "}
              {assigneeResolutionStats.minResolutionTimeInDays.toFixed(2)} days
            </li>
            <li>
              Maximum:{" "}
              {assigneeResolutionStats.maxResolutionTimeInDays.toFixed(2)} days
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">
            Select an assignee to view resolution stats
          </p>
        )} */}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Top Ticket Reporters</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportersData}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="name" /> */}
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#A569BD" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* <div className="bg-white p-4 rounded-xl shadow-md md:col-span-2 xl:col-span-3"> */}
      <div className="... md:col-span-2 xl:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Ticket Status Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={statusOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="date" /> */}
            <XAxis
              dataKey="date"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="OPEN" stroke="#8884d8" />
            <Line type="monotone" dataKey="IN_PROGRESS" stroke="#FFBB28" />
            <Line type="monotone" dataKey="RESOLVED" stroke="#00C49F" />
            <Line type="monotone" dataKey="CLOSED" stroke="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
