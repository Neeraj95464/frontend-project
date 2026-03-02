

import { Pencil } from "lucide-react";

const UsersTable = ({ users, onEdit, onSerialClick }) => {
  // console.log("users are ", users);

  return (
    // <div className="w-full border rounded-lg overflow-hidden">
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">

        <table className="min-w-max w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <Th>EMP ID</Th>
              <Th>Username</Th>
              <Th>Designation</Th>
              <Th>Role</Th>
              <Th>Activation</Th>
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
                  {/* <Td>{user.active}</Td> */}

                  <Td>
  <span
    className={`px-2 py-1 text-xs font-semibold rounded-full ${
      user.active
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {user.active ? "ACTIVE" : "INACTIVE"}
  </span>
</Td>
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
