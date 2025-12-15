// import { useAuth } from "../components/AuthContext";
// import ChangePasswordModal from "../components/ChangePasswordModal";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loginTime, setLoginTime] = useState("");
//   const [expTime, setExpTime] = useState("");
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       const tokenParts = storedUser.token.split(".");
//       if (tokenParts.length === 3) {
//         try {
//           const payload = JSON.parse(atob(tokenParts[1]));
//           const issuedAt = new Date(payload.iat * 1000);
//           const expiresAt = new Date(payload.exp * 1000);

//           setLoginTime(issuedAt.toLocaleString());
//           setExpTime(expiresAt.toLocaleString());

//           setUser(storedUser);

//           // Check if token is expired
//           const now = new Date();
//           if (now >= expiresAt) {
//             logout(); // Clear token or any other session info
//             navigate("/login", { replace: true }); // Redirect to login
//           }
//         } catch (error) {
//           console.error("Invalid token payload");
//           logout();
//           navigate("/login", { replace: true });
//         }
//       } else {
//         logout();
//         navigate("/login", { replace: true });
//       }
//     }
//   }, [navigate, logout]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 flex items-center justify-center px-4 py-10">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
//         <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
//           👤 User Profile
//         </h2>

//         <div className="space-y-5 text-gray-700">
//           <div className="border-b pb-3">
//             <span className="block text-sm font-medium">Username</span>
//             <p className="text-lg font-semibold text-gray-900">
//               {user.username.toUpperCase()}
//             </p>
//           </div>

//           <div className="border-b pb-3">
//             <span className="block text-sm font-medium">Role</span>
//             <p className="text-lg font-semibold text-gray-900">{user.role}</p>
//           </div>

//           <div className="border-b pb-3">
//             <span className="block text-sm font-medium">Login Time</span>
//             <p className="text-base">{loginTime}</p>
//           </div>

//           <div className="border-b pb-3">
//             <span className="block text-sm font-medium">Token Expiry</span>
//             <p className="text-base">{expTime}</p>
//           </div>
//         </div>

//         <div className="mt-8 space-y-3">
//           <button
//             onClick={() => setShowChangePassword(true)}
//             className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
//           >
//             🔒 Change Password
//           </button>

//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700 transition-all duration-200"
//           >
//             🚪 Logout
//           </button>
//         </div>
//       </div>

//       {showChangePassword && (
//         <ChangePasswordModal
//           isOpen={showChangePassword}
//           onClose={() => setShowChangePassword(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Profile;

// src/pages/Profile.jsx

import { useAuth } from "../components/AuthContext";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { resetUserPasswordByEmpId } from "../services/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState("");
  const [expTime, setExpTime] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    const storedUserJson = localStorage.getItem("user");
    if (!storedUserJson) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(storedUserJson);

    if (!storedUser?.token) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    const tokenParts = storedUser.token.split(".");
    if (tokenParts.length !== 3) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    try {
      const payload = JSON.parse(atob(tokenParts[1]));
      const issuedAt = new Date(payload.iat * 1000);
      const expiresAt = new Date(payload.exp * 1000);

      setLoginTime(issuedAt.toLocaleString());
      setExpTime(expiresAt.toLocaleString());
      setUser(storedUser);

      const now = new Date();
      if (now >= expiresAt) {
        logout();
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Invalid token payload");
      logout();
      navigate("/login", { replace: true });
    }
  }, [navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleAdminResetPassword = async () => {
    if (!user || user.role !== "ADMIN") return;

    const employeeId = prompt(
      "Enter employee ID of user whose password you want to reset to 'test':"
    );
    if (!employeeId) return;

    try {
      setResetLoading(true);
      setResetMessage("");
      await resetUserPasswordByEmpId(employeeId);
      setResetMessage(
        `Password reset successfully for employee ID ${employeeId} (new password: "test").`
      );
    } catch (err) {
      console.error("Failed to reset password", err);
      setResetMessage(
        "Failed to reset password. Check employee ID or your permissions."
      );
    } finally {
      setResetLoading(false);
    }
  };

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          👤 User Profile
        </h2>

        <div className="space-y-5 text-gray-700">
          <div className="border-b pb-3">
            <span className="block text-sm font-medium">Username</span>
            <p className="text-lg font-semibold text-gray-900">
              {user.username.toUpperCase()}
            </p>
          </div>

          <div className="border-b pb-3">
            <span className="block text-sm font-medium">Role</span>
            <p className="text-lg font-semibold text-gray-900">{user.role}</p>
          </div>

          <div className="border-b pb-3">
            <span className="block text-sm font-medium">Login Time</span>
            <p className="text-base">{loginTime}</p>
          </div>

          <div className="border-b pb-3">
            <span className="block text-sm font-medium">Token Expiry</span>
            <p className="text-base">{expTime}</p>
          </div>
        </div>

        {/* feedback for admin reset */}
        {resetMessage && (
          <p className="mt-4 text-xs text-center text-gray-600">
            {resetMessage}
          </p>
        )}

        <div className="mt-8 space-y-3">
          {/* user’s own change password modal */}
          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
          >
            🔒 Change My Password
          </button>

          {/* admin-only reset other user password */}
          {isAdmin && (
            <button
              onClick={handleAdminResetPassword}
              disabled={resetLoading}
              className={`w-full py-2 rounded-xl font-bold transition-all duration-200 ${
                resetLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {resetLoading
                ? "Resetting..."
                : "🛠 Reset Another User's Password (to 'test')"}
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700 transition-all duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {showChangePassword && (
        <ChangePasswordModal
          isOpen={showChangePassword}
          onClose={() => setShowChangePassword(false)}
        />
      )}
    </div>
  );
};

export default Profile;
