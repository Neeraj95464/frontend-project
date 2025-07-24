// import {
//   fetchTicketStatusCounts,
//   fetchTicketsPerDay,
//   fetchTicketCategoryCounts,
//   fetchAssigneeTicketCounts,
//   fetchResolutionStats,
//   fetchTopTicketReporters,
//   fetchStatusOverTime,
//   getAssigneeResolutionStats,
//   getAssignees,
// } from "../services/api";
// import DownloadButtonExcelTicket from "./DownloadButtonExcelTicket";
// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#A569BD",
//   "#5DADE2",
// ];

// const TicketDashboardChart = () => {
//   const [statusData, setStatusData] = useState([]);
//   const [createdPerDay, setCreatedPerDay] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [assigneeData, setAssigneeData] = useState([]);
//   const [resolutionStats, setResolutionStats] = useState(null);
//   const [reportersData, setReportersData] = useState([]);
//   const [statusOverTime, setStatusOverTime] = useState([]);
//   const [assignees, setAssignees] = useState([]);

//   useEffect(() => {
//     fetchTicketStatusCounts().then((res) =>
//       setStatusData(mapObjectToArray(res.data))
//     );
//     fetchTicketsPerDay().then((res) =>
//       setCreatedPerDay(mapObjectToArray(res.data, "date", "count"))
//     );
//     fetchTicketCategoryCounts().then((res) =>
//       setCategoryData(mapObjectToArray(res.data))
//     );
//     fetchAssigneeTicketCounts().then((res) =>
//       setAssigneeData(mapObjectToArray(res.data))
//     );
//     fetchResolutionStats().then((res) => setResolutionStats(res.data));
//     fetchTopTicketReporters().then((res) =>
//       setReportersData(mapObjectToArray(res.data))
//     );
//     fetchStatusOverTime().then((res) => setStatusOverTime(res.data));

//     getAssignees().then((res) => setAssignees(res.data));
//   }, []);

//   const fetchResolutionStatsByAssignee = async (employeeId) => {
//     const data = await getAssigneeResolutionStats(employeeId || "");
//     setResolutionStats(data);
//   };

//   const mapObjectToArray = (obj, keyName = "name", valueName = "value") => {
//     return Object.entries(obj).map(([key, value]) => ({
//       [keyName]: key,
//       [valueName]: value,
//     }));
//   };

//   return (
//     // <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 p-4">
//       <div className="bg-white p-4 rounded-xl shadow-md">
//         {/* <DownloadButtonExcelTicket></DownloadButtonExcelTicket> */}
//         <h2 className="text-lg font-semibold mb-2">Ticket Status Counts</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={statusData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//             >
//               {statusData.map((_, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-4 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Resolution Time Stats</h2>

//         <select
//           className="mb-4 p-2 border rounded"
//           onChange={(e) => fetchResolutionStatsByAssignee(e.target.value)}
//         >
//           <option value="">All Assignees</option>
//           {assignees.map((assignee) => (
//             <option key={assignee.employeeId} value={assignee.employeeId}>
//               {assignee.username}
//             </option>
//           ))}
//         </select>

//         {resolutionStats && (
//           <ul className="text-base">
//             <li>
//               Average: {resolutionStats.avgResolutionTimeInDays.toFixed(2)} days
//             </li>
//             <li>
//               Minimum: {resolutionStats.minResolutionTimeInDays.toFixed(2)} days
//             </li>
//             <li>
//               Maximum: {resolutionStats.maxResolutionTimeInDays.toFixed(2)} days
//             </li>
//           </ul>
//         )}
//       </div>

//       {/* <div className="bg-white p-4 rounded-xl shadow-md"> */}
//       <div className="... md:col-span-2 xl:col-span-2">
//         <h2 className="text-lg font-semibold mb-2">Tickets Created Per Day</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={createdPerDay}>
//             <CartesianGrid strokeDasharray="3 3" />
//             {/* <XAxis dataKey="date" /> */}
//             <XAxis
//               dataKey="date"
//               angle={-30}
//               textAnchor="end"
//               interval={0}
//               height={60}
//             />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="count"
//               stroke="#8884d8"
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-4 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Ticket Categories</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           {/* <BarChart data={categoryData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#00C49F" />
//           </BarChart> */}

//           <BarChart data={categoryData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis
//               dataKey="name"
//               angle={-30}
//               textAnchor="end"
//               interval={0}
//               height={60}
//             />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#00C49F" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-4 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Tickets per Assignee</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={assigneeData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             {/* <XAxis dataKey="name" /> */}
//             <XAxis
//               dataKey="name"
//               angle={-30}
//               textAnchor="end"
//               interval={0}
//               height={60}
//             />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#FFBB28" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* <div className="bg-white p-4 rounded-xl shadow-md">
//         <select
//           className="mb-4 p-2 border rounded"
//           onChange={(e) => {
//             const selected = e.target.value;
//             if (selected === "") {
//               fetchResolutionStats().then((res) =>
//                 setResolutionStats(res.data)
//               );
//             } else {
//               fetch(`/api/tickets/stats/resolution/assignee/${selected}`)
//                 .then((res) => res.json())
//                 .then((data) => setResolutionStats(data));
//             }
//           }}
//         >
//           <option value="">All Assignees</option>
//           {assigneeData.map((assignee) => (
//             <option key={assignee.name} value={assignee.name}>
//               {assignee.name}
//             </option>
//           ))}
//         </select>

//         <h2 className="text-lg font-semibold mb-2">Resolution Time Stats</h2>
//         {resolutionStats && (
//           <ul className="text-base">
//             <li>Average: {resolutionStats.avgResolutionTimeInDays} days</li>
//             <li>Minimum: {resolutionStats.minResolutionTimeInDays} days</li>
//             <li>Maximum: {resolutionStats.maxResolutionTimeInDays} days</li>
//           </ul>
//         )}
//       </div> */}

//       <div className="bg-white p-4 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Top Ticket Reporters</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={reportersData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             {/* <XAxis dataKey="name" /> */}
//             <XAxis
//               dataKey="name"
//               angle={-30}
//               textAnchor="end"
//               interval={0}
//               height={60}
//             />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#A569BD" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* <div className="bg-white p-4 rounded-xl shadow-md md:col-span-2 xl:col-span-3"> */}
//       <div className="... md:col-span-2 xl:col-span-2">
//         <h2 className="text-lg font-semibold mb-2">Ticket Status Over Time</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={statusOverTime}>
//             <CartesianGrid strokeDasharray="3 3" />
//             {/* <XAxis dataKey="date" /> */}
//             <XAxis
//               dataKey="date"
//               angle={-30}
//               textAnchor="end"
//               interval={0}
//               height={60}
//             />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="OPEN" stroke="#8884d8" />
//             <Line type="monotone" dataKey="IN_PROGRESS" stroke="#FFBB28" />
//             <Line type="monotone" dataKey="RESOLVED" stroke="#00C49F" />
//             <Line type="monotone" dataKey="CLOSED" stroke="#FF8042" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default TicketDashboardChart;

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
    fetchTopTicketReporters().then((res) =>
      setReportersData(mapObjectToArray(res.data))
    );
    fetchResolutionStats().then((res) => setResolutionStats(res.data));

    // fetchStatusOverTime().then((res) => setStatusOverTime(res.data));
    fetchLocationStats().then((res) =>
      setLocationData(mapObjectToArray(res.data))
    );

    getAssignees().then((res) => setAssignees(res.data));
  }, []);

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

      {/* <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Resolution Time Stats</h2>
        <select
          className="mb-4 p-2 border rounded"
          onChange={(e) => fetchResolutionStatsByAssignee(e.target.value)}
        >
          <option value="">All Assignees</option>
          {assignees.map((assignee) => (
            <option key={assignee.employeeId} value={assignee.employeeId}>
              {assignee.username}
            </option>
          ))}
        </select>

        {resolutionStats && (
          <ul className="text-base">
            <li>
              Average:{" "}
              {resolutionStats.avgResolutionTimeInMinutes != null
                ? (resolutionStats.avgResolutionTimeInMinutes / 1440).toFixed(
                    2
                  ) + " days"
                : "N/A"}
            </li>
            <li>
              Minimum:{" "}
              {resolutionStats.minResolutionTimeInMinutes != null
                ? (resolutionStats.minResolutionTimeInMinutes / 1440).toFixed(
                    2
                  ) + " days"
                : "N/A"}
            </li>
            <li>
              Maximum:{" "}
              {resolutionStats.maxResolutionTimeInMinutes != null
                ? (resolutionStats.maxResolutionTimeInMinutes / 1440).toFixed(
                    2
                  ) + " days"
                : "N/A"}
            </li>
          </ul>
        )}
      </div> */}

      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Resolution Time Stats
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
                <div className="bg-white rounded-md p-3 shadow">
                  <strong>Min:</strong>{" "}
                  {(resolutionStats?.overall?.min ?? 0).toFixed(2)} days
                </div>
                <div className="bg-white rounded-md p-3 shadow">
                  <strong>Max:</strong>{" "}
                  {(resolutionStats?.overall?.max ?? 0).toFixed(2)} days
                </div>
                <div className="bg-white rounded-md p-3 shadow">
                  <strong>All Tickets:</strong>{" "}
                  {(resolutionStats?.overall?.ticketCount ?? 0).toFixed(2)} days
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
                      <div>
                        Min:{" "}
                        {(typeof stats?.min === "number"
                          ? stats.min
                          : 0
                        ).toFixed(2)}
                        d
                      </div>
                      <div>
                        Max:{" "}
                        {(typeof stats?.max === "number"
                          ? stats.max
                          : 0
                        ).toFixed(2)}
                        d
                      </div>
                      <div>Tickets: {stats?.ticketCount ?? 0}</div>
                    </div>
                  )
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
                {/* {Object.entries(resolutionStats.monthly || {}).map(
                  ([month, stats]) => (
                    <div
                      key={month}
                      className="bg-purple-50 p-4 rounded-md shadow-md text-sm"
                    >
                      <div className="font-semibold text-purple-800">
                        {month}
                      </div>
                      <div>Avg: {(stats.avg / 1440).toFixed(2)}d</div>
                      <div>Min: {(stats.min / 1440).toFixed(2)}d</div>
                      <div>Max: {(stats.max / 1440).toFixed(2)}d</div>
                    </div>
                  )
                )} */}

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
                      <div>Min: {(stats?.min ?? 0).toFixed(2)}d</div>
                      <div>Max: {(stats?.max ?? 0).toFixed(2)}d</div>
                    </div>
                  )
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
      <div className="bg-white p-4 rounded-xl shadow-md">
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
      <div className="bg-white p-4 rounded-xl shadow-md">
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
