// import { useAuth } from "../components/AuthContext";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) {
//       navigate("/login");
//     } else {
//       setUser(storedUser);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
//       <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//           User Profile
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <span className="font-semibold text-gray-600">Username:</span>
//             <p className="text-lg">{user.username}</p>
//           </div>

//           <div>
//             <span className="font-semibold text-gray-600">Role:</span>
//             <p className="text-lg">{user.role}</p>
//           </div>

//           <div>
//             <span className="font-semibold text-gray-600">Token:</span>
//             <p className="text-sm break-words text-gray-500">{user.token}</p>
//           </div>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useAuth } from "../components/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState("");
  const [expTime, setExpTime] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);

      // Decode JWT payload
      const tokenParts = storedUser.token.split(".");
      if (tokenParts.length === 3) {
        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          const issuedAt = new Date(payload.iat * 1000);
          const expiresAt = new Date(payload.exp * 1000);
          setLoginTime(issuedAt.toLocaleString());
          setExpTime(expiresAt.toLocaleString());
        } catch (error) {
          console.error("Invalid token payload");
        }
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

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
              {user.username}
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

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700 transition-all duration-200"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
