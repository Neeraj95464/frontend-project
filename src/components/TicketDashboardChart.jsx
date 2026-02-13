import {
  fetchTicketStatusCounts,
  fetchTicketsPerDay,
  fetchTicketCategoryCounts,
  fetchAssigneeTicketCounts,
  fetchTopTicketReporters,
  fetchStatusOverTime,
  getAssigneeResolutionStats,
  getAssignees,
  fetchLocationStats,
  fetchResolutionStats,
} from "../services/api";
import AssigneeFeedbackOverview from "./TicketFeedback";
import { BarChart3, CalendarDays, User } from "lucide-react";
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

const TicketDashboardChart = () => {
  const [statusData, setStatusData] = useState([]);
  const [createdPerDay, setCreatedPerDay] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [assigneeData, setAssigneeData] = useState([]);
  const [reportersData, setReportersData] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [resolutionStats, setResolutionStats] = useState(null);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchTicketStatusCounts().then((res) =>
      setStatusData(mapObjectToArray(res.data)),
    );
    fetchTicketsPerDay().then((res) =>
      setCreatedPerDay(mapObjectToArray(res.data, "date", "count")),
    );
    // fetchTicketCategoryCounts().then((res) =>
    //   setCategoryData(mapObjectToArray(res.data)),
    // );
    // fetchAssigneeTicketCounts().then((res) =>
    //   setAssigneeData(mapObjectToArray(res.data)),
    // );
    // fetchTopTicketReporters().then((res) =>
    //   setReportersData(mapObjectToArray(res.data)),
    // );
    fetchResolutionStats().then((res) => setResolutionStats(res.data));

    // fetchLocationStats().then((res) =>
    //   setLocationData(mapObjectToArray(res.data)),
    // );

    getAssignees().then((res) => setAssignees(res.data));

    fetchTicketCategoryCounts().then((res) =>
      setCategoryData(sortDescByValue(mapObjectToArray(res.data))),
    );

    fetchAssigneeTicketCounts().then((res) =>
      setAssigneeData(sortDescByValue(mapObjectToArray(res.data))),
    );

    fetchTopTicketReporters().then((res) =>
      setReportersData(sortDescByValue(mapObjectToArray(res.data))),
    );

    fetchLocationStats().then((res) =>
      setLocationData(sortDescByValue(mapObjectToArray(res.data))),
    );
  }, []);

  const sortDescByValue = (data, key = "value") => {
    return [...data].sort((a, b) => b[key] - a[key]);
  };

  const fetchResolutionStatsByAssignee = async (employeeId) => {
    const data = await getAssigneeResolutionStats(employeeId || "");

    setResolutionStats(data);
  };

  const mapObjectToArray = (obj, keyName = "name", valueName = "value") => {
    return Object.entries(obj).map(([key, value]) => ({
      [keyName]: key,
      [valueName]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 p-4">
      {/* Ticket Status Pie Chart */}
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

      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Resolution Time Statistics
        </h2>

        {/* Assignee Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Filter by Assignee:
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => fetchResolutionStatsByAssignee(e.target.value)}
          >
            <option value="">All Assignees</option>
            {assignees.map((assignee) => (
              <option key={assignee.employeeId} value={assignee.employeeId}>
                {assignee.username}
              </option>
            ))}
          </select>
        </div>

        {resolutionStats && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Overall
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm text-blue-900">
                <div className="bg-white rounded-md p-3 shadow">
                  <strong>Avg:</strong>{" "}
                  {(resolutionStats?.overall?.avg ?? 0).toFixed(2)} days
                </div>
                {/* <div className="bg-white rounded-md p-3 shadow">
                  <strong>Min:</strong>{" "}
                  {(resolutionStats?.overall?.min ?? 0).toFixed(2)} days
                </div> */}
                <div className="bg-white rounded-md p-3 shadow">
                  <strong>Max:</strong>{" "}
                  {(resolutionStats?.overall?.max ?? 0).toFixed(2)} days
                </div>
                <div className="bg-white rounded-md p-3 shadow">
                  <strong>Close Count:</strong>{" "}
                  {(resolutionStats?.overall?.ticketClosed ?? 0).toFixed(2)}
                </div>

                <div className="bg-white rounded-md p-3 shadow">
                  <strong>Open Count:</strong>{" "}
                  {(resolutionStats?.overall?.ticketOpened ?? 0).toFixed(2)}
                </div>
              </div>
            </div>

            {/* ✅ Weekly Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-green-600" />
                Weekly
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(resolutionStats.weekly || {}).map(
                  ([week, stats]) => (
                    <div
                      key={week}
                      className="bg-green-50 p-4 rounded-md shadow-md text-sm"
                    >
                      <div className="font-semibold text-green-800">{week}</div>
                      <div>
                        Avg:{" "}
                        {(typeof stats?.avg === "number"
                          ? stats.avg
                          : 0
                        ).toFixed(2)}
                        d
                      </div>
                      {/* <div>
                        Min:{" "}
                        {(typeof stats?.min === "number"
                          ? stats.min
                          : 0
                        ).toFixed(2)}
                        d
                      </div> */}
                      <div>
                        Max:{" "}
                        {(typeof stats?.max === "number"
                          ? stats.max
                          : 0
                        ).toFixed(2)}
                        d
                      </div>
                      <div>Open Count: {stats?.ticketClosed ?? 0}</div>
                      <div>Close Count: {stats?.ticketOpened ?? 0}</div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* ✅ Monthly Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-purple-600" />
                Monthly
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(resolutionStats?.monthly || {}).map(
                  ([month, stats]) => (
                    <div
                      key={month}
                      className="bg-purple-50 p-4 rounded-md shadow-md text-sm"
                    >
                      <div className="font-semibold text-purple-800">
                        {month}
                      </div>
                      <div>Avg: {(stats?.avg ?? 0).toFixed(2)}d</div>
                      {/* <div>Min: {(stats?.min ?? 0).toFixed(2)}d</div> */}
                      <div>Max: {(stats?.max ?? 0).toFixed(2)}d</div>
                      <div>Close Count: {stats?.ticketClosed ?? 0}</div>
                      <div>Open Count: {stats?.ticketOpened ?? 0}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tickets Created Per Day */}
      <div className="... md:col-span-2 xl:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Tickets Created Per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={createdPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
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

      {/* Ticket Categories */}
      <div className="... md:col-span-2 xl:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Ticket Categories</h2>
        <ResponsiveContainer width="100%" height={300}>
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

      {/* Tickets per Assignee */}
      {/* <div className="bg-white p-4 rounded-xl shadow-md"> */}

      <div className="... md:col-span-2 xl:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Tickets per Assignee</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={assigneeData}>
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
            <Bar dataKey="value" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Reporters */}
      {/* <div className="bg-white p-4 rounded-xl shadow-md"> */}
      <div className="... md:col-span-2 xl:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Top Ticket Reporters</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportersData}>
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
            <Bar dataKey="value" fill="#A569BD" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tickets by Location */}
      <div className="... md:col-span-2 xl:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Tickets by Location</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={locationData}>
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
            <Bar dataKey="value" fill="#5DADE2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="... md:col-span-2 xl:col-span-2">
        <AssigneeFeedbackOverview />
      </div>
    </div>
  );
};

export default TicketDashboardChart;
