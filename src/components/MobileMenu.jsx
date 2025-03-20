import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiPlus,
  FiX,
} from "react-icons/fi";

const MobileMenu = ({
  isOpen,
  toggleSidebar,
  handleAddAsset,
  handleSearchAsset,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-blue-700">
          <h1 className="text-lg font-bold">Asset Manager</h1>
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Add/Search Buttons */}
        <div className="flex flex-col gap-3 px-4 py-4 border-b border-blue-500">
          <button
            onClick={() => {
              handleAddAsset();
              toggleSidebar();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <FiPlus className="text-lg" />
            <span>Add Asset</span>
          </button>
          <button
            onClick={() => {
              handleSearchAsset();
              toggleSidebar();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <FiSearch className="text-lg" />
            <span>Search Asset</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-8rem)]">
          <NavLink
            to="/"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-base rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
          >
            <FiHome className="mr-3 text-lg" />
            Dashboard
          </NavLink>
          <NavLink
            to="/assets"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-base rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
          >
            <FiBox className="mr-3 text-lg" />
            Assets
          </NavLink>
          <NavLink
            to="/reports"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-base rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
          >
            <FiBarChart2 className="mr-3 text-lg" />
            Reports
          </NavLink>
          <NavLink
            to="/settings"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-base rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
          >
            <FiSettings className="mr-3 text-lg" />
            Settings
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
