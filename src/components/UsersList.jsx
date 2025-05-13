// import { getEmployees, searchEmployees, deleteUser } from "../services/api";
// // Import API functions
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
// import { Pencil, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadUsers(page);
//   }, [page]);

//   const loadUsers = async (pageNumber) => {
//     const data = await getEmployees(pageNumber);
//     setUsers(Array.isArray(data.content) ? data.content : []);
//     setHasMore(!data.last);
//   };

//   const handleSearch = async () => {
//     const data = await searchEmployees(searchQuery);
//     setUsers(Array.isArray(data) ? data : []);
//   };

//   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);

//   const handleDelete = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     if (await deleteUser(userId)) {
//       setUsers(users.filter((user) => user.id !== userId));
//     }
//   };

//   const handleAddEmployee = () => navigate(`/create-user`);

//   const handleSerialClick = (serialNumber) =>
//     navigate(`/asset/${serialNumber}`);

//   return (
//     <div className="lg:ml-40 pt-16 mr-8">
//       <Card>
//         <CardContent>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">User List</h2>
//             <div className="flex space-x-4 items-center">
//               <Input
//                 type="text"
//                 placeholder="Search Employee..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-64"
//               />
//               <Button onClick={handleSearch} className="bg-green-600">
//                 Search
//               </Button>
//               <Button className="bg-blue-600" onClick={handleAddEmployee}>
//                 Add Employee
//               </Button>
//             </div>
//           </div>

//           <TableContainer>
//             <Table>
//               {/* ✅ Sticky Table Header */}
//               <TableHead>
//                 <TableRowHeader>
//                   <TableHeaderCell>EMP ID</TableHeaderCell>
//                   <TableHeaderCell>Username</TableHeaderCell>
//                   <TableHeaderCell>Email</TableHeaderCell>
//                   <TableHeaderCell>Number</TableHeaderCell>
//                   <TableHeaderCell>Department</TableHeaderCell>
//                   <TableHeaderCell>Role</TableHeaderCell>
//                   <TableHeaderCell>Note</TableHeaderCell>
//                   <TableHeaderCell>Location</TableHeaderCell>
//                   <TableHeaderCell>Site</TableHeaderCell>
//                   <TableHeaderCell>Assigned Assets</TableHeaderCell>
//                   <TableHeaderCell>Actions</TableHeaderCell>
//                 </TableRowHeader>
//               </TableHead>

//               {/* ✅ Scrollable Table Body */}
//               <TableBody>
//                 {Array.isArray(users) && users.length > 0 ? (
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
//                       <TableCell>
//                         {Array.isArray(user.serialNumbers) &&
//                         user.serialNumbers.length > 0
//                           ? user.serialNumbers
//                               .map((asset, index) => (
//                                 <span
//                                   key={index}
//                                   className="text-blue-600 cursor-pointer hover:underline"
//                                   onClick={() =>
//                                     handleSerialClick(asset.serialNumber)
//                                   }
//                                 >
//                                   {asset.serialNumber}
//                                 </span>
//                               ))
//                               .reduce((prev, curr) => [prev, ", ", curr])
//                           : "None"}
//                       </TableCell>
//                       <TableCell className="flex space-x-2">
//                         <button
//                           onClick={() => handleEdit(user.id)}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           <Pencil size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <Trash size={18} />
//                         </button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={11}
//                       className="text-center text-gray-500"
//                     >
//                       No users found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination Controls */}
//           <div className="mt-6 flex justify-between">
//             <Button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//               disabled={page === 0}
//               className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50"
//             >
//               Previous
//             </Button>
//             <Button
//               onClick={() => setPage((prev) => (hasMore ? prev + 1 : prev))}
//               disabled={!hasMore}
//               className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
//             >
//               Next
//             </Button>
//           </div>
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
  const [hasMore, setHasMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadUsers = async (pageNumber) => {
    try {
      const data = await getEmployees(pageNumber);
      setUsers(data?.content || []);
      setHasMore(!data?.last);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await searchEmployees(searchQuery);
      setUsers(data || []);
      setHasMore(false); // When searching, disable pagination
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

  const handleAddEmployee = () => navigate(`/create-user`);
  const handleSerialClick = (serialNumber) =>
    navigate(`/asset/${serialNumber}`);

  return (
    <div className="lg:ml-40 pt-16 pr-8">
      <Card>
        <CardContent className="text-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User List</h2>
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

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-between">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-xs"
            >
              Previous
            </Button>
            <Button
              onClick={() => hasMore && setPage((prev) => prev + 1)}
              disabled={!hasMore}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-xs"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
