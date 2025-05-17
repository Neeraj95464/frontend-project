import {
  fetchTicketStatusCounts,
  fetchTicketsPerDay,
  fetchTicketCategoryCounts,
  fetchAssigneeTicketCounts,
  fetchResolutionStats,
  fetchTopTicketReporters,
  fetchStatusOverTime,
} from "../services/api";
import React, { useEffect, useState } from "react";
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
    fetchAssigneeTicketCounts().then((res) =>
      setAssigneeData(mapObjectToArray(res.data))
    );
    fetchResolutionStats().then((res) => setResolutionStats(res.data));
    fetchTopTicketReporters().then((res) =>
      setReportersData(mapObjectToArray(res.data))
    );
    fetchStatusOverTime().then((res) => setStatusOverTime(res.data));
  }, []);

  const mapObjectToArray = (obj, keyName = "name", valueName = "value") => {
    return Object.entries(obj).map(([key, value]) => ({
      [keyName]: key,
      [valueName]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
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
            <XAxis dataKey="date" />
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
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Resolution Time Stats</h2>
        {resolutionStats && (
          <ul className="text-base">
            <li>Average: {resolutionStats.avgResolutionTime} hours</li>
            <li>Minimum: {resolutionStats.minResolutionTime} hours</li>
            <li>Maximum: {resolutionStats.maxResolutionTime} hours</li>
          </ul>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Top Ticket Reporters</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#A569BD" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md md:col-span-2 xl:col-span-3">
        <h2 className="text-lg font-semibold mb-2">Ticket Status Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={statusOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
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
