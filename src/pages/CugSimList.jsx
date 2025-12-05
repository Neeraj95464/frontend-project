// import { fetchSimCards } from "../services/api";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function CugSimList() {
//   const navigate = useNavigate();

//   const [filters, setFilters] = useState({
//     phoneNumber: "",
//     provider: "",
//     status: "",
//     employeeId: "",
//     search: "",
//     siteId: "",
//     locationId: "",
//   });

//   const [sims, setSims] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);

//   // -------------------- LOAD DATA --------------------
//   const loadData = async () => {
//     const response = await fetchSimCards(filters, page, size);
//     setSims(response.content);
//     setTotalPages(response.totalPages);
//   };

//   // -------------------- AUTO FILTERING (DEBOUNCED) --------------------
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       setPage(0); // reset to first page when filters change
//       loadData();
//     }, 400); // 400ms debounce (smooth UI)

//     return () => clearTimeout(delay);
//   }, [
//     filters.phoneNumber,
//     filters.provider,
//     filters.status,
//     filters.employeeId,
//     filters.search,
//     filters.siteId,
//     filters.locationId,
//   ]);

//   // -------------------- PAGE CHANGE --------------------
//   useEffect(() => {
//     loadData();
//   }, [page]);

//   const handleAddSim = () => navigate("/cug-sim/add");

//   return (
//     <div className="lg:ml-40 pt-16">
//       <h1 className="text-2xl font-semibold mb-4">CUG SIM Card Inventory</h1>

//       {/* -------------------- FILTER BAR -------------------- */}
//       <div className="grid grid-cols-7 gap-4 bg-white p-4 rounded shadow">
//         <input
//           placeholder="SIM Number"
//           value={filters.phoneNumber}
//           onChange={(e) =>
//             setFilters({ ...filters, phoneNumber: e.target.value })
//           }
//           className="border p-2 rounded"
//         />

//         <select
//           value={filters.provider}
//           onChange={(e) => setFilters({ ...filters, provider: e.target.value })}
//           className="border p-2 rounded"
//         >
//           <option value="">Provider</option>
//           <option value="AIRTEL">Airtel</option>
//           <option value="VI">VI</option>
//           <option value="JIO">Jio</option>
//         </select>

//         <select
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           className="border p-2 rounded"
//         >
//           <option value="">SIM Status</option>
//           <option value="ACTIVE">Active</option>
//           <option value="INACTIVE">Inactive</option>
//           <option value="SUSPENDED">Suspended</option>
//         </select>

//         <input
//           placeholder="Assigned Employee"
//           value={filters.employeeId}
//           onChange={(e) =>
//             setFilters({ ...filters, employeeId: e.target.value })
//           }
//           className="border p-2 rounded"
//         />

//         <input
//           placeholder="Search anything"
//           value={filters.search}
//           onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//           className="border p-2 rounded"
//         />

//         {/* ADD SIM BUTTON */}
//         <button
//           onClick={handleAddSim}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md"
//         >
//           + Add SIM
//         </button>
//       </div>

//       {/* -------------------- TABLE -------------------- */}
//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2">Mobile Number</th>
//               <th className="p-2">Provider</th>
//               <th className="p-2">Assigned To</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {sims.map((sim) => (
//               <tr key={sim.id} className="border-b hover:bg-gray-100">
//                 <td className="p-2 text-blue-600 underline">
//                   <Link to={`/cug-sim/${sim.id}`}>{sim.phoneNumber}</Link>
//                 </td>

//                 <td className="p-2">{sim.provider}</td>
//                 <td className="p-2">{sim.assignedUserName || "Unassigned"}</td>
//                 <td className="p-2">{sim.status}</td>

//                 <td className="p-2">
//                   <Link
//                     to={`/cug-sim/${sim.id}`}
//                     className="text-blue-500 underline"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}

//             {sims.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center p-4">
//                   No SIM cards found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* -------------------- PAGINATION -------------------- */}
//       <div className="flex justify-center mt-4 gap-3">
//         <button
//           disabled={page === 0}
//           onClick={() => setPage(page - 1)}
//           className="p-2 border rounded disabled:opacity-40"
//         >
//           Prev
//         </button>

//         <span className="p-2">
//           Page {page + 1} of {totalPages}
//         </span>

//         <button
//           disabled={page + 1 >= totalPages}
//           onClick={() => setPage(page + 1)}
//           className="p-2 border rounded disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import { fetchSimCards } from "../services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CugSimList() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    phoneNumber: "",
    provider: "",
    status: "",
    employeeId: "",
    search: "",
    siteId: "",
    locationId: "",
  });

  const [sims, setSims] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const loadData = async () => {
    const response = await fetchSimCards(filters, page, size);
    setSims(response.content);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(0);
      loadData();
    }, 400);
    return () => clearTimeout(delay);
  }, [
    filters.phoneNumber,
    filters.provider,
    filters.status,
    filters.employeeId,
    filters.search,
    filters.siteId,
    filters.locationId,
  ]);

  useEffect(() => {
    loadData();
  }, [page]);

  const handleAddSim = () => navigate("/cug-sim/add");

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "INACTIVE":
        return "bg-red-100 text-red-700";
      case "SUSPENDED":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </span>
            CUG SIM Inventory
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage all SIM cards</p>
        </div>
        <button
          onClick={handleAddSim}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add SIM
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input
            placeholder="SIM Number"
            value={filters.phoneNumber}
            onChange={(e) =>
              setFilters({ ...filters, phoneNumber: e.target.value })
            }
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <select
            value={filters.provider}
            onChange={(e) =>
              setFilters({ ...filters, provider: e.target.value })
            }
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">All Providers</option>
            <option value="AIRTEL">Airtel</option>
            <option value="VI">VI</option>
            <option value="JIO">Jio</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
          <input
            placeholder="Assigned Employee"
            value={filters.employeeId}
            onChange={(e) =>
              setFilters({ ...filters, employeeId: e.target.value })
            }
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full border border-gray-200 pl-9 pr-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Mobile Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Provider
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Assigned To
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sims.map((sim) => (
              <tr key={sim.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link
                    to={`/cug-sim/${sim.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {sim.phoneNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {sim.provider}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {sim.assignedUserName || (
                    <span className="text-gray-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      sim.status
                    )}`}
                  >
                    {sim.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/cug-sim/${sim.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sims.length === 0 && (
          <div className="text-center py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-300 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-sm">No SIM cards found</p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {sims.length > 0 ? (
          sims.map((sim) => (
            <Link
              key={sim.id}
              to={`/cug-sim/${sim.id}`}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-600 font-semibold">
                  {sim.phoneNumber}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    sim.status
                  )}`}
                >
                  {sim.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{sim.provider}</span>
                <span className="text-gray-700">
                  {sim.assignedUserName || (
                    <span className="text-gray-400 italic">Unassigned</span>
                  )}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-300 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-sm">No SIM cards found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            ← Prev
          </button>
          <span className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg">
            {page + 1} / {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
