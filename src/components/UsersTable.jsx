// // // // // // // // // components/UsersTable.jsx
// // // // // // // // import {
// // // // // // // //   TableContainer,
// // // // // // // //   Table,
// // // // // // // //   TableHead,
// // // // // // // //   TableRowHeader,
// // // // // // // //   TableBody,
// // // // // // // //   TableRow,
// // // // // // // //   TableCell,
// // // // // // // //   TableHeaderCell,
// // // // // // // // } from "@/components/ui";
// // // // // // // // import { Pencil } from "lucide-react";

// // // // // // // // const UsersTable = ({ users, onEdit, onSerialClick }) => {
// // // // // // // //   return (
// // // // // // // //     <TableContainer className="max-h-[500px] overflow-y-auto border rounded">
// // // // // // // //       <Table>
// // // // // // // //         <TableHead className="sticky top-0 z-10 bg-gray-100">
// // // // // // // //           <TableRowHeader>
// // // // // // // //             <TableHeaderCell className="text-xs">EMP ID</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Username</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Email</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Phone</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Dept.</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Role</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Note</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Location</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Site</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Assets</TableHeaderCell>
// // // // // // // //             <TableHeaderCell className="text-xs">Actions</TableHeaderCell>
// // // // // // // //           </TableRowHeader>
// // // // // // // //         </TableHead>
// // // // // // // //         <TableBody>
// // // // // // // //           {users.length > 0 ? (
// // // // // // // //             users.map((user) => (
// // // // // // // //               <TableRow key={user.id}>
// // // // // // // //                 <TableCell>{user.employeeId}</TableCell>
// // // // // // // //                 <TableCell>{user.username}</TableCell>
// // // // // // // //                 <TableCell>{user.email}</TableCell>
// // // // // // // //                 <TableCell>{user.phoneNumber}</TableCell>
// // // // // // // //                 <TableCell>{user.department}</TableCell>
// // // // // // // //                 <TableCell>{user.role}</TableCell>
// // // // // // // //                 <TableCell>{user.note || "N/A"}</TableCell>
// // // // // // // //                 <TableCell>{user.locationName || "N/A"}</TableCell>
// // // // // // // //                 <TableCell>{user.siteName || "N/A"}</TableCell>
// // // // // // // //                 <TableCell>
// // // // // // // //                   {user.serialNumbers?.length > 0
// // // // // // // //                     ? user.serialNumbers
// // // // // // // //                         .map((asset, idx) => (
// // // // // // // //                           <span
// // // // // // // //                             key={idx}
// // // // // // // //                             onClick={() =>
// // // // // // // //                               onSerialClick && onSerialClick(asset.serialNumber)
// // // // // // // //                             }
// // // // // // // //                             className="text-blue-600 cursor-pointer hover:underline"
// // // // // // // //                           >
// // // // // // // //                             {asset.serialNumber}
// // // // // // // //                           </span>
// // // // // // // //                         ))
// // // // // // // //                         .reduce((prev, curr) => [prev, ", ", curr])
// // // // // // // //                     : "None"}
// // // // // // // //                 </TableCell>
// // // // // // // //                 <TableCell className="flex gap-1">
// // // // // // // //                   <button
// // // // // // // //                     onClick={() => onEdit && onEdit(user.id)}
// // // // // // // //                     className="text-blue-500 hover:text-blue-700"
// // // // // // // //                   >
// // // // // // // //                     <Pencil size={16} />
// // // // // // // //                   </button>
// // // // // // // //                 </TableCell>
// // // // // // // //               </TableRow>
// // // // // // // //             ))
// // // // // // // //           ) : (
// // // // // // // //             <TableRow>
// // // // // // // //               <TableCell
// // // // // // // //                 colSpan={11}
// // // // // // // //                 className="text-center text-gray-500 py-4"
// // // // // // // //               >
// // // // // // // //                 No users found
// // // // // // // //               </TableCell>
// // // // // // // //             </TableRow>
// // // // // // // //           )}
// // // // // // // //         </TableBody>
// // // // // // // //       </Table>
// // // // // // // //     </TableContainer>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default UsersTable;

// // // // // // // import{TableContainer,Table,TableHead,TableRowHeader,TableBody,TableRow,TableCell,TableHeaderCell}from"@/components/ui";import{Pencil}from"lucide-react";const UsersTable=({users,onEdit,onSerialClick})=>{(return(<TableContainer className="border rounded"><Table><TableHead className="sticky top-0 z-10 bg-gray-100"><TableRowHeader>{["EMP ID","Username","Email","Phone","Dept.","Role","Note","Location","Site","Assets","Actions"].map((header)=>(<TableHeaderCell key={header} className="text-[10px] font-medium px-1 py-1 whitespace-nowrap">{header}</TableHeaderCell>))}</TableRowHeader></TableHead><TableBody>{users.length>0?users.map((user)=>(<TableRow key={user.id} className="h-8"><TableCell className="text-xs px-1 py-0.5 truncate max-w-[60px]">{user.employeeId}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[70px]">{user.username}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[90px]">{user.email}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[70px]">{user.phoneNumber}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[50px]">{user.department}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[50px]">{user.role}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[60px]">{user.note||"N/A"}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[60px]">{user.locationName||"N/A"}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[50px]">{user.siteName||"N/A"}</TableCell><TableCell className="text-xs px-1 py-0.5 truncate max-w-[80px]">{user.serialNumbers?.length>0?user.serialNumbers.slice(0,2).map((asset,idx)=>(<span key={idx} onClick={()=>onSerialClick&&onSerialClick(asset.serialNumber)} className="text-blue-600 cursor-pointer hover:underline text-[10px] mr-0.5">{asset.serialNumber}</span>)).concat(user.serialNumbers.length>2?[...]:[]):"None"}</TableCell><TableCell className="px-1 py-0.5"><button onClick={()=>onEdit&&onEdit(user.id)} className="p-0.5 hover:bg-gray-200 rounded"><Pencil size={12}/></button></TableCell></TableRow>)):(
// // // // // // // <TableRow className="h-12"><TableCell colSpan={11} className="text-center text-gray-500 text-xs py-3">No users found</TableCell></TableRow>)}</TableBody></Table></TableContainer>));};export default UsersTable;

// // // // // // import{Pencil}from"lucide-react";const UsersTable=({users,onEdit,onSerialClick})=>{(return(<div className="border rounded overflow-hidden"><div className="bg-gray-100 sticky top-0 z-10 flex text-[10px] font-medium text-gray-700"><div className="px-1 py-1.5 w-[60px] text-left">EMP ID</div><div className="px-1 py-1.5 w-[70px] text-left">Username</div><div className="px-1 py-1.5 w-[90px] text-left">Email</div><div className="px-1 py-1.5 w-[70px] text-left">Phone</div><div className="px-1 py-1.5 w-[50px] text-left">Dept.</div><div className="px-1 py-1.5 w-[50px] text-left">Role</div><div className="px-1 py-1.5 w-[60px] text-left">Note</div><div className="px-1 py-1.5 w-[60px] text-left">Location</div><div className="px-1 py-1.5 w-[50px] text-left">Site</div><div className="px-1 py-1.5 w-[80px] text-left">Assets</div><div className="px-1 py-1.5 w-[50px] text-left">Actions</div></div>{users.length>0?users.map((user)=>(<div key={user.id} className="flex border-t border-gray-100 hover:bg-gray-50 h-8 items-center"><div className="px-1 w-[60px] truncate text-xs text-gray-900">{user.employeeId}</div><div className="px-1 w-[70px] truncate text-xs text-gray-900">{user.username}</div><div className="px-1 w-[90px] truncate text-xs text-gray-900">{user.email}</div><div className="px-1 w-[70px] truncate text-xs text-gray-900">{user.phoneNumber}</div><div className="px-1 w-[50px] truncate text-xs text-gray-900">{user.department}</div><div className="px-1 w-[50px] truncate text-xs text-gray-900">{user.role}</div><div className="px-1 w-[60px] truncate text-xs text-gray-900">{user.note||"N/A"}</div><div className="px-1 w-[60px] truncate text-xs text-gray-900">{user.locationName||"N/A"}</div><div className="px-1 w-[50px] truncate text-xs text-gray-900">{user.siteName||"N/A"}</div><div className="px-1 w-[80px] text-xs text-gray-900"><div className="flex flex-wrap gap-0.5">{user.serialNumbers?.slice(0,2).map((asset,idx)=>(<span key={idx} onClick={()=>onSerialClick&&onSerialClick(asset.serialNumber)} className="text-blue-600 hover:underline cursor-pointer text-[10px] truncate max-w-[35px]">{asset.serialNumber}</span>))}{user.serialNumbers?.length>2&&<span className="text-gray-500 text-[10px]">...</span>}</div></div><div className="px-1 w-[50px]"><button onClick={()=>onEdit&&onEdit(user.id)} className="p-0.5 hover:bg-gray-200 rounded-full"><Pencil size={12} className="text-blue-500"/></button></div></div>)):(
// // // // // // <div className="flex items-center justify-center h-12 border-t border-gray-100"><div className="text-center text-gray-500 text-xs py-3">No users found</div></div>)}</div>));};export default UsersTable;

// // // // // import { Pencil } from "lucide-react";

// // // // // const UsersTable = ({ users, onEdit, onSerialClick }) => {
// // // // //   return (
// // // // //     <div className="border rounded overflow-hidden">
// // // // //       <div className="bg-gray-100 sticky top-0 z-10 flex text-[10px] font-medium text-gray-700">
// // // // //         <div className="px-1 py-1.5 w-[60px] text-left">EMP ID</div>
// // // // //         <div className="px-1 py-1.5 w-[70px] text-left">Username</div>
// // // // //         <div className="px-1 py-1.5 w-[90px] text-left">Email</div>
// // // // //         <div className="px-1 py-1.5 w-[70px] text-left">Phone</div>
// // // // //         <div className="px-1 py-1.5 w-[50px] text-left">Dept.</div>
// // // // //         <div className="px-1 py-1.5 w-[50px] text-left">Role</div>
// // // // //         <div className="px-1 py-1.5 w-[60px] text-left">Note</div>
// // // // //         <div className="px-1 py-1.5 w-[60px] text-left">Location</div>
// // // // //         <div className="px-1 py-1.5 w-[50px] text-left">Site</div>
// // // // //         <div className="px-1 py-1.5 w-[80px] text-left">Assets</div>
// // // // //         <div className="px-1 py-1.5 w-[50px] text-left">Actions</div>
// // // // //       </div>
// // // // //       {users.length > 0 ? (
// // // // //         users.map((user) => (
// // // // //           <div
// // // // //             key={user.id}
// // // // //             className="flex border-t border-gray-100 hover:bg-gray-50 h-8 items-center"
// // // // //           >
// // // // //             <div className="px-1 w-[60px] truncate text-xs text-gray-900">
// // // // //               {user.employeeId}
// // // // //             </div>
// // // // //             <div className="px-1 w-[70px] truncate text-xs text-gray-900">
// // // // //               {user.username}
// // // // //             </div>
// // // // //             <div className="px-1 w-[90px] truncate text-xs text-gray-900">
// // // // //               {user.email}
// // // // //             </div>
// // // // //             <div className="px-1 w-[70px] truncate text-xs text-gray-900">
// // // // //               {user.phoneNumber}
// // // // //             </div>
// // // // //             <div className="px-1 w-[50px] truncate text-xs text-gray-900">
// // // // //               {user.department}
// // // // //             </div>
// // // // //             <div className="px-1 w-[50px] truncate text-xs text-gray-900">
// // // // //               {user.role}
// // // // //             </div>
// // // // //             <div className="px-1 w-[60px] truncate text-xs text-gray-900">
// // // // //               {user.note || "N/A"}
// // // // //             </div>
// // // // //             <div className="px-1 w-[60px] truncate text-xs text-gray-900">
// // // // //               {user.locationName || "N/A"}
// // // // //             </div>
// // // // //             <div className="px-1 w-[50px] truncate text-xs text-gray-900">
// // // // //               {user.siteName || "N/A"}
// // // // //             </div>
// // // // //             <div className="px-1 w-[80px] text-xs text-gray-900">
// // // // //               <div className="flex flex-wrap gap-0.5">
// // // // //                 {user.serialNumbers?.slice(0, 2).map((asset, idx) => (
// // // // //                   <span
// // // // //                     key={idx}
// // // // //                     onClick={() =>
// // // // //                       onSerialClick && onSerialClick(asset.serialNumber)
// // // // //                     }
// // // // //                     className="text-blue-600 hover:underline cursor-pointer text-[10px] truncate max-w-[35px]"
// // // // //                   >
// // // // //                     {asset.serialNumber}
// // // // //                   </span>
// // // // //                 ))}
// // // // //                 {user.serialNumbers?.length > 2 && (
// // // // //                   <span className="text-gray-500 text-[10px]">...</span>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="px-1 w-[50px]">
// // // // //               <button
// // // // //                 onClick={() => onEdit && onEdit(user.id)}
// // // // //                 className="p-0.5 hover:bg-gray-200 rounded-full"
// // // // //               >
// // // // //                 <Pencil size={12} className="text-blue-500" />
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))
// // // // //       ) : (
// // // // //         <div className="flex items-center justify-center h-12 border-t border-gray-100">
// // // // //           <div className="text-center text-gray-500 text-xs py-3">
// // // // //             No users found
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default UsersTable;

// // // // // import { Pencil } from "lucide-react";

// // // // // const UsersTable = ({ users, onEdit, onSerialClick }) => {
// // // // //   return (
// // // // //     <div className="border rounded overflow-hidden w-full">
// // // // //       <div className="bg-gray-100 sticky top-0 z-10 flex text-[10px] font-medium text-gray-700">
// // // // //         <div className="px-1 py-1 w-[65px] text-left min-w-[65px]">EMP ID</div>
// // // // //         <div className="px-1 py-1 w-[80px] text-left min-w-[80px]">
// // // // //           Username
// // // // //         </div>
// // // // //         <div className="px-1 py-1 w-[110px] text-left min-w-[110px]">Email</div>
// // // // //         <div className="px-1 py-1 w-[85px] text-left min-w-[85px]">Phone</div>
// // // // //         <div className="px-1 py-1 w-[60px] text-left min-w-[60px]">Dept.</div>
// // // // //         <div className="px-1 py-1 w-[55px] text-left min-w-[55px]">Role</div>
// // // // //         <div className="px-1 py-1 w-[70px] text-left min-w-[70px]">Note</div>
// // // // //         <div className="px-1 py-1 w-[75px] text-left min-w-[75px]">
// // // // //           Location
// // // // //         </div>
// // // // //         <div className="px-1 py-1 w-[60px] text-left min-w-[60px]">Site</div>
// // // // //         <div className="px-1 py-1 w-[100px] text-left min-w-[100px]">
// // // // //           Assets
// // // // //         </div>
// // // // //         <div className="px-1 py-1 w-[55px] text-left min-w-[55px]">Actions</div>
// // // // //       </div>
// // // // //       {users.length > 0 ? (
// // // // //         users.map((user) => (
// // // // //           <div
// // // // //             key={user.id}
// // // // //             className="flex border-t border-gray-100 hover:bg-gray-50 h-9 items-center"
// // // // //           >
// // // // //             <div className="px-1 w-[65px] min-w-[65px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.employeeId}
// // // // //             </div>
// // // // //             <div className="px-1 w-[80px] min-w-[80px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.username}
// // // // //             </div>
// // // // //             <div className="px-1 w-[110px] min-w-[110px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.email}
// // // // //             </div>
// // // // //             <div className="px-1 w-[85px] min-w-[85px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.phoneNumber}
// // // // //             </div>
// // // // //             <div className="px-1 w-[60px] min-w-[60px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.department}
// // // // //             </div>
// // // // //             <div className="px-1 w-[55px] min-w-[55px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.role}
// // // // //             </div>
// // // // //             <div className="px-1 w-[70px] min-w-[70px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.note || "N/A"}
// // // // //             </div>
// // // // //             <div className="px-1 w-[75px] min-w-[75px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.locationName || "N/A"}
// // // // //             </div>
// // // // //             <div className="px-1 w-[60px] min-w-[60px] text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
// // // // //               {user.siteName || "N/A"}
// // // // //             </div>
// // // // //             <div className="px-1 w-[100px] min-w-[100px] text-xs text-gray-900">
// // // // //               <div className="flex gap-0.5 h-full items-center">
// // // // //                 {user.serialNumbers?.slice(0, 2).map((asset, idx) => (
// // // // //                   <span
// // // // //                     key={idx}
// // // // //                     onClick={() =>
// // // // //                       onSerialClick && onSerialClick(asset.serialNumber)
// // // // //                     }
// // // // //                     className="text-blue-600 hover:underline cursor-pointer text-[10px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[45px]"
// // // // //                     title={asset.serialNumber}
// // // // //                   >
// // // // //                     {asset.serialNumber}
// // // // //                   </span>
// // // // //                 ))}
// // // // //                 {user.serialNumbers?.length > 2 && (
// // // // //                   <span className="text-gray-500 text-[10px]">...</span>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="px-1 w-[55px] min-w-[55px]">
// // // // //               <button
// // // // //                 onClick={() => onEdit && onEdit(user.id)}
// // // // //                 className="p-0.5 hover:bg-gray-200 rounded-full flex-shrink-0"
// // // // //               >
// // // // //                 <Pencil size={12} className="text-blue-500" />
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))
// // // // //       ) : (
// // // // //         <div className="flex items-center justify-center h-12 border-t border-gray-100">
// // // // //           <div className="text-center text-gray-500 text-xs py-3">
// // // // //             No users found
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default UsersTable;

// // // // import { Pencil } from "lucide-react";

// // // // const UsersTable = ({ users, onEdit, onSerialClick }) => {
// // // //   return (
// // // //     <div className="w-full overflow-x-auto border rounded overflow-hidden">
// // // //       <div className="bg-gray-100 sticky top-0 z-10 flex text-sm font-medium text-gray-700 min-w-[900px]">
// // // //         <div className="px-3 py-2 w-[90px] text-left min-w-[90px]">EMP ID</div>
// // // //         <div className="px-3 py-2 w-[120px] text-left min-w-[120px]">
// // // //           Username
// // // //         </div>
// // // //         <div className="px-3 py-2 w-[180px] text-left min-w-[180px]">Email</div>
// // // //         <div className="px-3 py-2 w-[130px] text-left min-w-[130px]">Phone</div>
// // // //         <div className="px-3 py-2 w-[90px] text-left min-w-[90px]">Dept.</div>
// // // //         <div className="px-3 py-2 w-[85px] text-left min-w-[85px]">Role</div>
// // // //         <div className="px-3 py-2 w-[110px] text-left min-w-[110px]">Note</div>
// // // //         <div className="px-3 py-2 w-[110px] text-left min-w-[110px]">
// // // //           Location
// // // //         </div>
// // // //         <div className="px-3 py-2 w-[90px] text-left min-w-[90px]">Site</div>
// // // //         <div className="px-3 py-2 w-[160px] text-left min-w-[160px]">
// // // //           Assets
// // // //         </div>
// // // //         <div className="px-3 py-2 w-[85px] text-left min-w-[85px]">Actions</div>
// // // //       </div>
// // // //       {users.length > 0 ? (
// // // //         users.map((user) => (
// // // //           <div
// // // //             key={user.id}
// // // //             className="flex border-t border-gray-100 hover:bg-gray-50 h-12 items-center min-w-[900px]"
// // // //           >
// // // //             <div className="px-3 w-[90px] min-w-[90px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.employeeId}">
// // // //               {user.employeeId}
// // // //             </div>
// // // //             <div className="px-3 w-[120px] min-w-[120px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.username}">
// // // //               {user.username}
// // // //             </div>
// // // //             <div className="px-3 w-[180px] min-w-[180px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.email}">
// // // //               {user.email}
// // // //             </div>
// // // //             <div className="px-3 w-[130px] min-w-[130px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.phoneNumber}">
// // // //               {user.phoneNumber}
// // // //             </div>
// // // //             <div className="px-3 w-[90px] min-w-[90px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.department}">
// // // //               {user.department}
// // // //             </div>
// // // //             <div className="px-3 w-[85px] min-w-[85px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.role}">
// // // //               {user.role}
// // // //             </div>
// // // //             <div className="px-3 w-[110px] min-w-[110px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.note || 'N/A'}">
// // // //               {user.note || "N/A"}
// // // //             </div>
// // // //             <div className="px-3 w-[110px] min-w-[110px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.locationName || 'N/A'}">
// // // //               {user.locationName || "N/A"}
// // // //             </div>
// // // //             <div className="px-3 w-[90px] min-w-[90px] text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis title={user.siteName || 'N/A'}">
// // // //               {user.siteName || "N/A"}
// // // //             </div>
// // // //             <div className="px-3 w-[160px] min-w-[160px] text-sm text-gray-900">
// // // //               <div className="flex gap-1 h-full items-center flex-wrap">
// // // //                 {user.serialNumbers?.map((asset, idx) => (
// // // //                   <span
// // // //                     key={idx}
// // // //                     onClick={() =>
// // // //                       onSerialClick && onSerialClick(asset.serialNumber)
// // // //                     }
// // // //                     className="text-blue-600 hover:underline cursor-pointer text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px] title={asset.serialNumber}"
// // // //                   >
// // // //                     {asset.serialNumber}
// // // //                   </span>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //             <div className="px-3 w-[85px] min-w-[85px] flex justify-center">
// // // //               <button
// // // //                 onClick={() => onEdit && onEdit(user.id)}
// // // //                 className="p-1 hover:bg-gray-200 rounded-lg flex-shrink-0"
// // // //               >
// // // //                 <Pencil size={16} className="text-blue-500" />
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         ))
// // // //       ) : (
// // // //         <div className="flex items-center justify-center h-16 border-t border-gray-100 min-w-[900px]">
// // // //           <div className="text-center text-gray-500 text-sm py-4">
// // // //             No users found
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UsersTable;

// // // import { Pencil } from "lucide-react";

// // // const UsersTable = ({ users, onEdit, onSerialClick }) => {
// // //   return (
// // //     <div className="w-full overflow-x-auto border rounded overflow-hidden">
// // //       <div className="bg-gray-100 sticky top-0 z-10 flex text-sm font-medium text-gray-700 min-w-[1000px]">
// // //         <div className="px-3 py-2 w-[90px] min-w-[90px]">EMP ID</div>
// // //         <div className="px-3 py-2 w-[120px] min-w-[120px]">Username</div>
// // //         <div className="px-3 py-2 w-[200px] min-w-[200px]">Email</div>
// // //         <div className="px-3 py-2 w-[140px] min-w-[140px]">Phone</div>
// // //         <div className="px-3 py-2 w-[90px] min-w-[90px]">Dept.</div>
// // //         <div className="px-3 py-2 w-[85px] min-w-[85px]">Role</div>
// // //         <div className="px-3 py-2 w-[120px] min-w-[120px]">Note</div>
// // //         <div className="px-3 py-2 w-[120px] min-w-[120px]">Location</div>
// // //         <div className="px-3 py-2 w-[90px] min-w-[90px]">Site</div>
// // //         <div className="px-3 py-2 w-[180px] min-w-[180px]">Assets</div>
// // //         <div className="px-3 py-2 w-[85px] min-w-[85px]">Actions</div>
// // //       </div>
// // //       {users.length > 0 ? (
// // //         users.map((user) => (
// // //           <div
// // //             key={user.id}
// // //             className="flex border-t border-gray-100 hover:bg-gray-50 h-14 items-center min-w-[1000px]"
// // //           >
// // //             <div className="px-3 w-[90px] min-w-[90px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.employeeId}
// // //             </div>
// // //             <div className="px-3 w-[120px] min-w-[120px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.username}
// // //             </div>
// // //             <div className="px-3 w-[200px] min-w-[200px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.email}
// // //             </div>
// // //             <div className="px-3 w-[140px] min-w-[140px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.phoneNumber}
// // //             </div>
// // //             <div className="px-3 w-[90px] min-w-[90px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.department}
// // //             </div>
// // //             <div className="px-3 w-[85px] min-w-[85px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.role}
// // //             </div>
// // //             <div className="px-3 w-[120px] min-w-[120px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.note || "N/A"}
// // //             </div>
// // //             <div className="px-3 w-[120px] min-w-[120px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.locationName || "N/A"}
// // //             </div>
// // //             <div className="px-3 w-[90px] min-w-[90px] text-sm text-gray-900 whitespace-nowrap">
// // //               {user.siteName || "N/A"}
// // //             </div>
// // //             <div className="px-3 w-[180px] min-w-[180px] text-sm text-gray-900">
// // //               <div className="flex gap-1 h-full items-center flex-wrap">
// // //                 {user.serialNumbers?.map((asset, idx) => (
// // //                   <span
// // //                     key={idx}
// // //                     onClick={() =>
// // //                       onSerialClick && onSerialClick(asset.serialNumber)
// // //                     }
// // //                     className="text-blue-600 hover:underline cursor-pointer text-sm bg-blue-50 px-1 py-0.5 rounded text-xs mr-1"
// // //                     title={asset.serialNumber}
// // //                   >
// // //                     {asset.serialNumber}
// // //                   </span>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //             <div className="px-3 w-[85px] min-w-[85px] flex justify-center">
// // //               <button
// // //                 onClick={() => onEdit && onEdit(user.id)}
// // //                 className="p-1.5 hover:bg-gray-200 rounded-lg flex-shrink-0 transition-colors"
// // //               >
// // //                 <Pencil size={16} className="text-blue-500" />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <div className="flex items-center justify-center h-16 border-t border-gray-100 min-w-[1000px]">
// // //           <div className="text-center text-gray-500 text-sm py-4">
// // //             No users found
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default UsersTable;

// // import { Pencil } from "lucide-react";

// // const UsersTable = ({ users, onEdit, onSerialClick }) => {
// //   return (
// //     <div className="w-full overflow-x-auto border rounded overflow-hidden">
// //       <div className="bg-gray-100 sticky top-0 z-10 flex text-sm font-medium text-gray-700">
// //         <div className="px-3 py-2 flex-shrink-0 w-24 text-left">EMP ID</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-32 text-left">Username</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-48 text-left">Email</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-36 text-left">Phone</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-24 text-left">Dept.</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-20 text-left">Role</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-32 text-left">Note</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-32 text-left">Location</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-24 text-left">Site</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-44 text-left">Assets</div>
// //         <div className="px-3 py-2 flex-shrink-0 w-20 text-left">Actions</div>
// //       </div>
// //       {users.length > 0 ? (
// //         users.map((user) => (
// //           <div
// //             key={user.id}
// //             className="flex border-t border-gray-100 hover:bg-gray-50 h-14 items-center"
// //           >
// //             <div className="px-3 flex-shrink-0 w-24 text-sm text-gray-900 whitespace-nowrap">
// //               {user.employeeId}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-32 text-sm text-gray-900 whitespace-nowrap">
// //               {user.username}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-48 text-sm text-gray-900 whitespace-nowrap">
// //               {user.email}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-36 text-sm text-gray-900 whitespace-nowrap">
// //               {user.phoneNumber}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-24 text-sm text-gray-900 whitespace-nowrap">
// //               {user.department}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-20 text-sm text-gray-900 whitespace-nowrap">
// //               {user.role}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-32 text-sm text-gray-900 whitespace-nowrap">
// //               {user.note || "N/A"}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-32 text-sm text-gray-900 whitespace-nowrap">
// //               {user.locationName || "N/A"}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-24 text-sm text-gray-900 whitespace-nowrap">
// //               {user.siteName || "N/A"}
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-44 text-sm text-gray-900">
// //               <div className="flex gap-1 h-full items-center flex-wrap">
// //                 {user.serialNumbers?.map((asset, idx) => (
// //                   <span
// //                     key={idx}
// //                     onClick={() =>
// //                       onSerialClick && onSerialClick(asset.serialNumber)
// //                     }
// //                     className="text-blue-600 hover:underline cursor-pointer text-sm bg-blue-50 px-1.5 py-0.5 rounded mr-1 text-xs whitespace-nowrap"
// //                     title={asset.serialNumber}
// //                   >
// //                     {asset.serialNumber}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //             <div className="px-3 flex-shrink-0 w-20 flex justify-center">
// //               <button
// //                 onClick={() => onEdit && onEdit(user.id)}
// //                 className="p-1.5 hover:bg-gray-200 rounded-lg flex-shrink-0 transition-colors"
// //               >
// //                 <Pencil size={16} className="text-blue-500" />
// //               </button>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <div className="flex items-center justify-center h-16 border-t border-gray-100">
// //           <div className="text-center text-gray-500 text-sm py-4">
// //             No users found
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UsersTable;

// import { Pencil } from "lucide-react";

// const UsersTable = ({ users, onEdit, onSerialClick }) => {
//   return (
//     <div className="w-full">
//       {/* Desktop / Tablet View */}
//       <div className="hidden md:block overflow-x-auto border rounded-lg">
//         {/* Header */}
//         <div
//           className="grid grid-cols-[100px_140px_220px_140px_100px_90px_140px_140px_100px_1fr_80px]
//           bg-gray-100 text-sm font-semibold text-gray-700 sticky top-0 z-10"
//         >
//           {[
//             "EMP ID",
//             "Username",
//             "Email",
//             "Phone",
//             "Dept",
//             "Role",
//             "Note",
//             "Location",
//             "Site",
//             "Assets",
//             "Action",
//           ].map((h) => (
//             <div key={h} className="px-3 py-2">
//               {h}
//             </div>
//           ))}
//         </div>

//         {/* Rows */}
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user.id}
//               className="grid grid-cols-[100px_140px_220px_140px_100px_90px_140px_140px_100px_1fr_80px]
//                 items-center border-t text-sm hover:bg-gray-50"
//             >
//               <Cell>{user.employeeId}</Cell>
//               <Cell>{user.username}</Cell>

//               <Cell truncate title={user.email}>
//                 {user.email}
//               </Cell>

//               <Cell>{user.phoneNumber}</Cell>
//               <Cell>{user.department}</Cell>
//               <Cell>{user.role}</Cell>

//               <Cell truncate title={user.note}>
//                 {user.note || "N/A"}
//               </Cell>

//               <Cell>{user.locationName || "N/A"}</Cell>
//               <Cell>{user.siteName || "N/A"}</Cell>

//               {/* Assets */}
//               <div className="px-3 py-2">
//                 <div className="flex gap-1 flex-wrap max-h-12 overflow-y-auto">
//                   {user.serialNumbers?.map((asset, idx) => (
//                     <span
//                       key={idx}
//                       onClick={() => onSerialClick?.(asset.serialNumber)}
//                       className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded cursor-pointer hover:underline"
//                       title={asset.serialNumber}
//                     >
//                       {asset.serialNumber}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Action */}
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => onEdit?.(user.id)}
//                   className="p-2 hover:bg-gray-200 rounded-lg transition"
//                 >
//                   <Pencil size={16} className="text-blue-600" />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <EmptyState />
//         )}
//       </div>

//       {/* Mobile View (Card Layout) */}
//       <div className="md:hidden space-y-3">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user.id}
//               className="border rounded-lg p-4 bg-white shadow-sm"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-semibold text-gray-800">{user.username}</p>
//                   <p className="text-xs text-gray-500">{user.employeeId}</p>
//                 </div>
//                 <button
//                   onClick={() => onEdit?.(user.id)}
//                   className="p-2 rounded hover:bg-gray-100"
//                 >
//                   <Pencil size={16} className="text-blue-600" />
//                 </button>
//               </div>

//               <Info label="Email" value={user.email} />
//               <Info label="Phone" value={user.phoneNumber} />
//               <Info label="Department" value={user.department} />
//               <Info label="Role" value={user.role} />
//               <Info label="Location" value={user.locationName || "N/A"} />
//               <Info label="Site" value={user.siteName || "N/A"} />

//               {/* Assets */}
//               <div className="mt-2">
//                 <p className="text-xs text-gray-500 mb-1">Assets</p>
//                 <div className="flex flex-wrap gap-1">
//                   {user.serialNumbers?.map((asset, idx) => (
//                     <span
//                       key={idx}
//                       onClick={() => onSerialClick?.(asset.serialNumber)}
//                       className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded cursor-pointer"
//                     >
//                       {asset.serialNumber}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <EmptyState />
//         )}
//       </div>
//     </div>
//   );
// };

// /* Reusable Components */
// const Cell = ({ children, truncate, title }) => (
//   <div className={`px-3 py-2 ${truncate ? "truncate" : ""}`} title={title}>
//     {children}
//   </div>
// );

// const Info = ({ label, value }) => (
//   <div className="mt-1">
//     <p className="text-xs text-gray-500">{label}</p>
//     <p className="text-sm text-gray-800 truncate" title={value}>
//       {value}
//     </p>
//   </div>
// );

// const EmptyState = () => (
//   <div className="border rounded-lg p-6 text-center text-sm text-gray-500">
//     No users found
//   </div>
// );

// export default UsersTable;

// import { Pencil } from "lucide-react";

// const UsersTable = ({ users, onEdit, onSerialClick }) => {
//   console.log("users are ", users);
//   return (
//     <div className="w-full border rounded-lg overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-max w-full border-collapse">
//           {/* Header */}
//           <thead className="bg-gray-100 text-sm font-semibold text-gray-700 sticky top-0 z-10">
//             <tr>
//               <Th>EMP ID</Th>
//               <Th>Username</Th>
//               <Th>Email</Th>
//               <Th>Phone</Th>
//               <Th>Department</Th>
//               <Th>Role</Th>
//               <Th>Note</Th>
//               <Th>Location</Th>
//               <Th>Site</Th>
//               <Th>Assets</Th>
//               <Th>Action</Th>
//             </tr>
//           </thead>

//           {/* Body */}
//           <tbody className="text-sm text-gray-800">
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user.id} className="border-t hover:bg-gray-50">
//                   <Td>{user.employeeId}</Td>
//                   <Td>{user.username}</Td>
//                   <Td>{user.email}</Td>
//                   <Td>{user.phoneNumber}</Td>
//                   <Td>{user.department}</Td>
//                   <Td>{user.role}</Td>
//                   <Td>{user.note || "N/A"}</Td>
//                   <Td>{user.locationName || "N/A"}</Td>
//                   <Td>{user.siteName || "N/A"}</Td>

//                   {/* Assets */}
//                   <Td>
//                     <div className="flex gap-1">
//                       {user.serialNumbers?.map((asset, idx) => (
//                         <span
//                           key={idx}
//                           onClick={() => onSerialClick?.(asset.serialNumber)}
//                           className="cursor-pointer text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded hover:underline"
//                         >
//                           {asset.serialNumber}
//                         </span>
//                       ))}
//                     </div>
//                   </Td>

//                   {/* Action */}
//                   <Td>
//                     <button
//                       onClick={() => onEdit?.(user.id)}
//                       className="p-2 hover:bg-gray-200 rounded-lg transition"
//                     >
//                       <Pencil size={16} className="text-blue-600" />
//                     </button>
//                   </Td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={11} className="text-center py-6 text-gray-500">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// /* Header Cell */
// const Th = ({ children }) => (
//   <th className="px-4 py-3 text-left whitespace-nowrap">{children}</th>
// );

// /* Data Cell */
// const Td = ({ children }) => (
//   <td className="px-4 py-3 whitespace-nowrap align-middle">{children}</td>
// );

// export default UsersTable;

import { Pencil } from "lucide-react";

const UsersTable = ({ users, onEdit, onSerialClick }) => {
  // console.log("users are ", users);

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-max w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <Th>EMP ID</Th>
              <Th>Username</Th>
              <Th>Designation</Th>
              <Th>Role</Th>
              <Th>Department</Th>
              <Th>Email</Th>
              <Th>Personal Email</Th>
              <Th>Phone</Th>
              <Th>Aadhar</Th>
              <Th>PAN</Th>
              <Th>Site</Th>
              <Th>Location</Th>
              <Th>Note</Th>
              <Th>Created By</Th>
              <Th>Updated By</Th>
              <Th>Assets</Th>
              <Th>Action</Th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-sm text-gray-800">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <Td>{user.employeeId}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.designation || "N/A"}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.department}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.personalEmail || "N/A"}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td>{user.aadharNumber || "N/A"}</Td>
                  <Td>{user.panNumber || "N/A"}</Td>
                  <Td>{user.siteName || "N/A"}</Td>
                  <Td>{user.locationName || "N/A"}</Td>
                  <Td>{user.note || "N/A"}</Td>
                  <Td>{user.createdBy || "N/A"}</Td>
                  <Td>{user.lastUpdatedBy || "N/A"}</Td>

                  {/* Assets */}
                  <Td>
                    <div className="flex gap-1">
                      {user.serialNumbers?.length > 0 ? (
                        user.serialNumbers.map((asset, idx) => (
                          <span
                            key={idx}
                            onClick={() => onSerialClick?.(asset.serialNumber)}
                            className="cursor-pointer text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded hover:underline"
                          >
                            {asset.serialNumber}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">N/A</span>
                      )}
                    </div>
                  </Td>

                  {/* Action */}
                  <Td>
                    <button
                      onClick={() => onEdit?.(user.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition"
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={17} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Header Cell */
const Th = ({ children }) => (
  <th className="px-4 py-3 text-left whitespace-nowrap">{children}</th>
);

/* Data Cell */
const Td = ({ children }) => (
  <td className="px-4 py-3 whitespace-nowrap align-middle">{children}</td>
);

export default UsersTable;
