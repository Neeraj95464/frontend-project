

import { useAuth } from "../components/AuthContext";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { resetUserPasswordByEmpId } from "../services/api";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState("");
  const [expTime, setExpTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const validateToken = useCallback((storedUser) => {
    if (!storedUser?.token) return false;

    try {
      const tokenParts = storedUser.token.split(".");
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));
      const issuedAt = new Date(payload.iat * 1000);
      const expiresAt = new Date(payload.exp * 1000);

      setLoginTime(issuedAt.toLocaleString());
      setExpTime(expiresAt.toLocaleString());
      setUser(storedUser);

      const now = new Date();
      return now < expiresAt;
    } catch (error) {
      console.error("Invalid token payload:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    const storedUserJson = localStorage.getItem("user");
    if (!storedUserJson) {
      navigate("/login", { replace: true });
      return;
    }

    const storedUser = JSON.parse(storedUserJson);
    const isValidToken = validateToken(storedUser);

    if (!isValidToken) {
      logout();
      navigate("/login", { replace: true });
    }

    setIsLoading(false);
  }, [navigate, logout, validateToken]);

  const clearResetMessage = useCallback(() => {
    setResetMessage({ text: "", type: "" });
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  const handleAdminResetPassword = useCallback(async () => {
    if (!user || (user.role !== "ADMIN" && user.role 
      !== "EXECUTIVE" && user.role !== "MANAGER" && user.role !== "SUPER_ADMIN")) return;

    const employeeId = window.prompt(
      "Enter employee ID to reset password to 'Welcome@1234':"
    );

    if (!employeeId?.trim()) return;

    const trimmedId = employeeId.trim();

    try {
      setResetLoading(true);
      clearResetMessage();

      await resetUserPasswordByEmpId(trimmedId);

      setResetMessage({
        text: `Password reset for employee ID: ${trimmedId} (new password: "Welcome@1234")`,
        type: "success",
      });
    } catch (err) {
      console.error("Password reset failed:", err);
      setResetMessage({
        text: "Failed to reset password. Verify employee ID and permissions.",
        type: "error",
      });
    } finally {
      setResetLoading(false);
    }
  }, [user, clearResetMessage]);

  const isAdmin = useMemo(
    () => user && (user.role === "ADMIN" 
      || user.role === "EXECUTIVE"|| user.role === "MANAGER" || user.role === "SUPER_ADMIN"),
    [user]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          👤 User Profile
        </h2>

        <div className="space-y-5 text-gray-700">
          <div className="border-b pb-3">
            <span className="block text-sm font-medium text-gray-500">
              Username
            </span>
            <p className="text-lg font-semibold text-gray-900">
              {user.name?.toUpperCase() || "N/A"} ({user.employeeId?.toUpperCase() || "N/A"}) 
            </p>
          </div>

          <div className="border-b pb-3">
            <span className="block text-sm font-medium text-gray-500">
              Role
            </span>
            <p className="text-lg font-semibold text-gray-900">
              {user.role || "N/A"}
            </p>
          </div>

          <div className="border-b pb-3">
            <span className="block text-sm font-medium text-gray-500">
              Login Time
            </span>
            <p className="text-base text-gray-600">{loginTime}</p>
          </div>

          <div className="border-b pb-3">
            <span className="block text-sm font-medium text-gray-500">
              Token Expiry
            </span>
            <p className="text-base text-gray-600">{expTime}</p>
          </div>
        </div>

        {/* Admin Reset Feedback */}
        {resetMessage.text && (
          <div
            className={`mt-4 p-3 rounded-xl text-sm text-center font-medium transition-all duration-200 ${
              resetMessage.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
            role="alert"
            aria-live="polite"
          >
            {resetMessage.text}
          </div>
        )}

        <div className="mt-8 space-y-3">
          {/* Change Password Button */}
          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Change your password"
          >
            🔒 Change My Password
          </button>

          {/* Admin Reset Button */}
          {isAdmin && (
            <button
              onClick={handleAdminResetPassword}
              disabled={resetLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 shadow-lg focus:outline-none focus:ring-4 ${
                resetLoading
                  ? "bg-gray-400 cursor-not-allowed text-white focus:ring-gray-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200 hover:shadow-xl"
              }`}
              aria-label="Reset another user's password to Welcome@1234"
              aria-disabled={resetLoading}
            >
              {resetLoading ? (
                <>
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting...
                  </span>
                </>
              ) : (
                "🛠 Reset Another User's Password (to 'Welcome@1234')"
              )}
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Logout from application"
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
