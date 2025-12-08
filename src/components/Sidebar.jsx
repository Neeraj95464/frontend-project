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
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

// Navigation Items
const navItems = [
  {
    label: "Dashboard",
    icon: FiHome,
    to: "/",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN"],
    exact: true,
  },
  {
    label: "My Tickets",
    icon: FiUsers,
    to: "/ticket",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN"],
    exact: true,
  },
  {
    label: "Admin Tickets",
    icon: FiUsers,
    to: "/ticket/admin",
    roles: ["ADMIN", "MANAGER", "HR_ADMIN"],
  },
  {
    label: "Assets",
    icon: FiBox,
    to: "/assets",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    label: "Reports",
    icon: FiBarChart2,
    to: "/reports",
    roles: ["ADMIN", "HR_ADMIN", "MANAGER"],
  },
  {
    label: "Users",
    icon: FiUsers,
    to: "/users",
    roles: ["ADMIN", "MANAGER", "HR_ADMIN"],
  },
  {
    label: "Settings",
    icon: FiSettings,
    to: "/settings",
    roles: ["HR_ADMIN", "MANAGER", "ADMIN"],
  },
  {
    label: "Updates",
    icon: FiSettings,
    to: "/updates",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN"],
  },
  {
    label: "Bulk Imports",
    icon: FiSettings,
    to: "/bulk-imports",
    roles: ["MANAGER", "ADMIN"],
  },

  {
    label: "Sim Asset",
    icon: FiSettings,
    to: "/cug-sim",
    roles: ["MANAGER", "ADMIN"],
  },
];

// Reusable nav link
const SidebarNavLink = ({ to, icon: Icon, label, exact }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 rounded-lg text-sm transition-all ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-200"
      }`
    }
  >
    <Icon className="mr-3" />
    {label}
  </NavLink>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVendorMenuOpen, setVendorMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleVendorMenu = () => setVendorMenuOpen(!isVendorMenuOpen);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 w-48 flex flex-col justify-between shadow-lg`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
          <span className="text-2xl font-bold tracking-wide flex items-center">
            <FiBox className="mr-2" /> Asset Manager
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-900 scrollbar-hide">
          {navItems
            .filter((item) => item.roles.includes(user?.role))
            .map(({ to, icon, label, exact }) => (
              <SidebarNavLink
                key={to}
                to={to}
                icon={icon}
                label={label}
                exact={exact}
              />
            ))}

          {/* Vendors & Contracts Dropdown */}
          {["ADMIN", "MANAGER"].includes(user?.role) && (
            <div>
              <button
                onClick={toggleVendorMenu}
                className="flex items-center w-full px-4 py-2 rounded-lg text-sm text-gray-200 hover:bg-gray-700 transition-all"
              >
                <FiBox className="mr-3" />
                Vendors & Contracts
                {isVendorMenuOpen ? (
                  <FiChevronDown className="ml-auto" />
                ) : (
                  <FiChevronRight className="ml-auto" />
                )}
              </button>
              {isVendorMenuOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <SidebarNavLink to="/vendors" icon={FiBox} label="Vendors" />
                  <SidebarNavLink to="/sites" icon={FiBox} label="Sites" />
                  <SidebarNavLink
                    to="/contracts"
                    icon={FiBox}
                    label="Contracts"
                  />
                  {/* <SidebarNavLink
                    to="/contracts"
                    icon={FiBox}
                    label="Contracts"
                  /> */}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-xs text-gray-300 bg-gray-900">
          <p>
            Logged in as: <span className="font-medium">{user?.username}</span>
          </p>
          <p>
            Role:{" "}
            <span className="uppercase text-blue-400 font-semibold">
              {user?.role}
            </span>
          </p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
