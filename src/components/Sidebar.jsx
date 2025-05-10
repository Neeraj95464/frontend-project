import { useAuth } from "./AuthContext";
import React, { useState } from "react";
import {
  FiHome,
  FiBox,
  FiBarChart2,
  FiSettings,
  FiX,
  FiMenu,
  FiUsers,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

// Adjust the path as per your structure

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Access user role

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      {/* <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        } transition-transform lg:translate-x-0 w-46`}
      > */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        } transition-transform lg:translate-x-0 w-46 flex flex-col justify-between`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-center bg-blue-600 shadow-md">
          <h1 className="text-xl font-bold">Asset Manager</h1>
        </div>

        {/* Navigation */}
        {/* <nav className="flex-1 p-4 space-y-2 overflow-y-auto"> */}
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {/* For USER role */}
          {user?.role === "USER" && (
            <NavLink
              to="/ticket"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-sm ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              <FiUsers className="mr-3" />
              My Tickets
            </NavLink>
          )}

          {/* For ADMIN and MANAGER roles */}
          {["ADMIN", "MANAGER"].includes(user?.role) && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiHome className="mr-3" />
                Dashboard
              </NavLink>
              <NavLink
                to="/assets"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiBox className="mr-3" />
                Assets
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiUsers className="mr-3" />
                Users
              </NavLink>
              <NavLink
                to="/ticket/admin"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiUsers className="mr-3" />
                Ticket Admin
              </NavLink>
              <NavLink
                to="/contracts"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiBox className="mr-3" />
                Contracts
              </NavLink>
              <NavLink
                to="/vendors"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiBox className="mr-3" />
                Vendors
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiBarChart2 className="mr-3" />
                Reports
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <FiSettings className="mr-3" />
                Settings
              </NavLink>
            </>
          )}
        </nav>

        {/* Footer Info */}
        {/* <div className="p-4 border-t border-gray-700 text-xs text-gray-300">
          <p>
            Logged in as: <span className="font-medium">{user?.username}</span>
          </p>
          <p>
            Role:{" "}
            <span className="uppercase text-blue-400 font-semibold">
              {user?.role}
            </span>
          </p>
        </div> */}

        <div className="p-4 border-t border-gray-700 text-xs text-gray-300">
          <p>
            Logged in as: <span className="font-medium">{user?.username}</span>
          </p>
          <p>
            Role:{" "}
            <span className="uppercase text-blue-400 font-semibold">
              {user?.role}
            </span>
          </p>
          {/* <p className="mt-2 text-center text-gray-400">
            Copyright {new Date().getFullYear()} <br></br>© Safetag Enterprises
          </p> */}
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
