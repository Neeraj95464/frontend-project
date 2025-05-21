// import { getEmployees, searchEmployees, deleteUser } from "../services/api";
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRowHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHeaderCell,
//   Card,
//   CardContent,
//   Button,
//   Input,
// } from "@/components/ui";
// import { Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadUsers(page);
//   }, [page]);

//   const loadUsers = async (pageNumber) => {
//     try {
//       const data = await getEmployees(pageNumber);
//       setUsers(data?.content || []);
//       setTotalPages(data?.totalPages || 1);
//     } catch (error) {
//       console.error("Error loading users:", error);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const data = await searchEmployees(searchQuery);
//       setUsers(data || []);
//       setTotalPages(1); // Disable paging during search
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };

//   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
//   const handleDelete = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     if (await deleteUser(userId)) {
//       setUsers((prev) => prev.filter((user) => user.id !== userId));
//     }
//   };

//   const handleAddEmployee = () => navigate(`/create-user`);
//   const handleSerialClick = (serialNumber) =>
//     navigate(`/asset/${serialNumber}`);

//   const handlePrevPage = () => {
//     if (page > 0) setPage(page - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages - 1) setPage(page + 1);
//   };

//   return (
//     <div className="lg:ml-40 pt-16 pr-8">
//       <Card>
//         <CardContent className="text-sm">
//           {/* Header with title + controls */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center gap-2">
//               <Button
//                 onClick={handlePrevPage}
//                 disabled={page === 0}
//                 className="p-1 text-gray-600 bg-white border rounded hover:bg-gray-100"
//               >
//                 <ChevronLeft size={18} />
//               </Button>

//               <h2 className="text-xl font-semibold">User List</h2>

//               <Button
//                 onClick={handleNextPage}
//                 disabled={page >= totalPages - 1}
//                 className="p-1 text-gray-600 bg-white border rounded hover:bg-gray-100"
//               >
//                 <ChevronRight size={18} />
//               </Button>

//               <span className="ml-2 text-xs text-gray-500">
//                 Page {page + 1} of {totalPages}
//               </span>
//             </div>

//             <div className="flex items-center gap-2">
//               <Input
//                 type="text"
//                 placeholder="Search Employee..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-52 text-xs"
//               />
//               <Button
//                 onClick={handleSearch}
//                 className="bg-green-600 text-xs px-3"
//               >
//                 Search
//               </Button>
//               <Button
//                 onClick={handleAddEmployee}
//                 className="bg-blue-600 text-xs px-3"
//               >
//                 Add Employee
//               </Button>
//             </div>
//           </div>

//           {/* Table */}
//           <TableContainer className="max-h-[500px] overflow-y-auto border rounded">
//             <Table>
//               <TableHead className="sticky top-0 z-10 bg-gray-100">
//                 <TableRowHeader>
//                   {[
//                     "EMP ID",
//                     "Username",
//                     "Email",
//                     "Phone",
//                     "Dept.",
//                     "Role",
//                     "Note",
//                     "Location",
//                     "Site",
//                     "Assets",
//                     "Actions",
//                   ].map((label, idx) => (
//                     <TableHeaderCell
//                       key={idx}
//                       className="text-xs whitespace-nowrap"
//                     >
//                       {label}
//                     </TableHeaderCell>
//                   ))}
//                 </TableRowHeader>
//               </TableHead>
//               <TableBody>
//                 {users.length > 0 ? (
//                   users.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell>{user.employeeId}</TableCell>
//                       <TableCell>{user.username}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell>{user.phoneNumber}</TableCell>
//                       <TableCell>{user.department}</TableCell>
//                       <TableCell>{user.role}</TableCell>
//                       <TableCell>{user.note || "N/A"}</TableCell>
//                       <TableCell>{user.location?.name || "N/A"}</TableCell>
//                       <TableCell>{user.site?.name || "N/A"}</TableCell>
//                       <TableCell className="max-w-[180px] break-words">
//                         {user.serialNumbers?.length > 0
//                           ? user.serialNumbers
//                               .map((asset, idx) => (
//                                 <span
//                                   key={idx}
//                                   onClick={() =>
//                                     handleSerialClick(asset.serialNumber)
//                                   }
//                                   className="text-blue-600 cursor-pointer hover:underline"
//                                 >
//                                   {asset.serialNumber}
//                                 </span>
//                               ))
//                               .reduce((prev, curr) => [prev, ", ", curr])
//                           : "None"}
//                       </TableCell>
//                       <TableCell className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(user.id)}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           <Pencil size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <Trash size={16} />
//                         </button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={11}
//                       className="text-center py-6 text-gray-500"
//                     >
//                       No users found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UsersList;

import { getEmployees, searchEmployees, deleteUser } from "../services/api";
import {
  TableContainer,
  Table,
  TableHead,
  TableRowHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Card,
  CardContent,
  Button,
  Input,
} from "@/components/ui";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10); // Default size from backend
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    last: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // const fetchUsers = async (pageNumber) => {
  //   try {
  //     const data = await getEmployees(pageNumber);
  //     setUsers(data?.content || []);
  //     setPaginationInfo({
  //       totalPages: data?.totalPages || 1,
  //       last: data?.last,
  //     });
  //   } catch (error) {
  //     console.error("Error loading users:", error);
  //   }
  // };

  const fetchUsers = async (customPage = page) => {
    try {
      const res = await getEmployees(customPage); // Or use getEmployees({ page: customPage, size }) if your API supports it

      const {
        content = [],
        page: pageNumber,
        size: pageSize,
        totalElements,
        totalPages,
        last,
      } = res || {};

      setUsers(content);
      setPaginationInfo({ totalElements, totalPages, last });
      setPage(pageNumber); // Sync page from backend
      setSize(pageSize);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      fetchUsers(0);
      setPage(0);
      return;
    }
    try {
      const data = await searchEmployees(searchQuery);
      setUsers(data || []);
      setPaginationInfo({ totalPages: 1, last: true }); // disable paging
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    if (await deleteUser(userId)) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleAddEmployee = () => navigate(`/register`);
  const handleSerialClick = (serialNumber) =>
    navigate(`/asset/${serialNumber}`);

  return (
    <div className="lg:ml-40 pt-16 pr-8">
      <Card>
        <CardContent className="text-sm">
          <div className="flex justify-between items-center mb-4">
            {/* Left: Heading and Pagination Controls */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">User List</h2>
            </div>
            {/* flex items-center justify-center   */}
            <div className="mb-4 gap-2 flex items-center">
              <button
                onClick={() => {
                  const newPage = Math.max(page - 1, 0);
                  setPage(newPage);
                  fetchUsers(newPage); // Call your function after updating page
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
                  fetchUsers(newPage); // Call your function after updating page
                }}
                disabled={paginationInfo.last}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>

            {/* Right: Search & Add */}
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search Employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52"
              />
              <Button
                onClick={handleSearch}
                className="bg-green-600 text-xs px-3"
              >
                Search
              </Button>
              <Button
                onClick={handleAddEmployee}
                className="bg-blue-600 text-xs px-3"
              >
                Add Employee
              </Button>
            </div>
          </div>

          <TableContainer className="max-h-[500px] overflow-y-auto border rounded">
            <Table>
              <TableHead className="sticky top-0 z-10 bg-gray-100">
                <TableRowHeader>
                  <TableHeaderCell className="text-xs">EMP ID</TableHeaderCell>
                  <TableHeaderCell className="text-xs">
                    Username
                  </TableHeaderCell>
                  <TableHeaderCell className="text-xs">Email</TableHeaderCell>
                  <TableHeaderCell className="text-xs">Phone</TableHeaderCell>
                  <TableHeaderCell className="text-xs">Dept.</TableHeaderCell>
                  <TableHeaderCell className="text-xs">Role</TableHeaderCell>
                  <TableHeaderCell className="text-xs">Note</TableHeaderCell>
                  <TableHeaderCell className="text-xs">
                    Location
                  </TableHeaderCell>
                  <TableHeaderCell className="text-xs">Site</TableHeaderCell>
                  <TableHeaderCell className="text-xs">Assets</TableHeaderCell>
                  <TableHeaderCell className="text-xs">Actions</TableHeaderCell>
                </TableRowHeader>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.employeeId}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.note || "N/A"}</TableCell>
                      <TableCell>{user.location?.name || "N/A"}</TableCell>
                      <TableCell>{user.site?.name || "N/A"}</TableCell>
                      <TableCell>
                        {user.serialNumbers?.length > 0
                          ? user.serialNumbers
                              .map((asset, idx) => (
                                <span
                                  key={idx}
                                  onClick={() =>
                                    handleSerialClick(asset.serialNumber)
                                  }
                                  className="text-blue-600 cursor-pointer hover:underline"
                                >
                                  {asset.serialNumber}
                                </span>
                              ))
                              .reduce((prev, curr) => [prev, ", ", curr])
                          : "None"}
                      </TableCell>
                      <TableCell className="flex gap-1">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="text-center text-gray-500 py-4"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
