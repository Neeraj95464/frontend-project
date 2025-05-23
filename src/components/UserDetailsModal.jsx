import { searchEmployees } from "../services/api";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDetailsModal = ({ query, isOpen, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Modal Open:", isOpen, "| Query:", query); // ✅ Debugging logs

    if (!isOpen || !query?.trim()) {
      console.log("Skipping API call: Modal closed or query is empty.");
      setUserData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching data for query:", query);
        const data = await searchEmployees(query);

        console.log("API Response:", data);
        setUserData(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, isOpen]); // ✅ Depend only on `query` and `isOpen`

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          User Details
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : userData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {[
                    { label: "Username", value: userData?.username },
                    { label: "Employee ID", value: userData?.employeeId },
                    { label: "Role", value: userData?.role },
                    { label: "Phone Number", value: userData?.phoneNumber },
                    { label: "Email", value: userData?.email },
                    { label: "Department", value: userData?.department },
                    { label: "Note", value: userData?.note },
                    { label: "Location", value: userData?.location?.name },
                    { label: "Site", value: userData?.site?.name },
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <th className="px-4 py-3 text-gray-800 bg-gray-100 w-1/3">
                        {item.label}:
                      </th>
                      <td className="px-4 py-3 text-gray-600">
                        {item.value || "Not Available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userData?.serialNumbers?.length > 0 && (
              <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Assigned Assets
                </h3>
                <ul className="space-y-2">
                  {userData.serialNumbers.map((asset) => (
                    <li
                      key={asset.id}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-all"
                      onClick={() => navigate(`/asset/${asset.serialNumber}`)}
                    >
                      <span className="text-blue-600 font-medium">
                        {asset.serialNumber}
                      </span>{" "}
                      - {asset.model} ({asset.assetType})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">No user found.</div>
        )}

        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsModal;
