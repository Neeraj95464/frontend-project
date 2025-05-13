import { useAuth } from "../components/AuthContext";
import { changePassword } from "../services/api";
import { useState } from "react";
import { toast } from "react-toastify";

// ✅ Use your real API

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  if (!isOpen) return null;

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      const msg = await changePassword(oldPassword, newPassword);
      console.log("your backend message is", msg); // Should log { message: '...' }

      toast.success(
        msg.message || "Password changed successfully. Logging out..."
      );

      setOldPassword("");
      setNewPassword("");

      // Delay slightly to let the toast show before redirect
      setTimeout(() => {
        logout();
        onClose();
      }, 1500); // 1.5 seconds
    } catch (err) {
      toast.error(err?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          🔐 Change Password
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className={`px-4 py-2 rounded-xl text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
