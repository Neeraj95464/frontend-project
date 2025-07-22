import { useAuth } from "../components/AuthContext";
import ChangePasswordModal from "../components/ChangePasswordModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState("");
  const [expTime, setExpTime] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      const tokenParts = storedUser.token.split(".");
      if (tokenParts.length === 3) {
        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          const issuedAt = new Date(payload.iat * 1000);
          const expiresAt = new Date(payload.exp * 1000);

          setLoginTime(issuedAt.toLocaleString());
          setExpTime(expiresAt.toLocaleString());
          console.log("Stored user is ", storedUser);
          setUser(storedUser);

          // Check if token is expired
          const now = new Date();
          if (now >= expiresAt) {
            logout(); // Clear token or any other session info
            navigate("/login", { replace: true }); // Redirect to login
          }
        } catch (error) {
          console.error("Invalid token payload");
          logout();
          navigate("/login", { replace: true });
        }
      } else {
        logout();
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, logout]);

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

        <div className="mt-8 space-y-3">
          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
          >
            🔒 Change Password
          </button>

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
