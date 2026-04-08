

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

import {
  FiHome,
  FiBox,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX
} from "react-icons/fi";

/* ---------------- NAV ITEMS ---------------- */

const navItems = [
  {
    label: "Dashboard",
    icon: FiHome,
    to: "/",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"],
    exact: true
  },
  {
    label: "My Tickets",
    icon: FiUsers,
    to: "/ticket",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"],
    exact: true
  },
  {
    label: "Admin Tickets",
    icon: FiUsers,
    to: "/ticket/admin",
    roles: ["ADMIN", "MANAGER", "HR_ADMIN"]
  },
  {
    label: "Assets",
    icon: FiBox,
    to: "/assets",
    roles: ["ADMIN", "MANAGER", "EXECUTIVE"]
  },
  {
    label: "Child Assets",
    icon: FiSettings,
    to: "/child-assets",
    roles: ["ADMIN", "MANAGER", "EXECUTIVE"]
  },
  {
    label: "Users",
    icon: FiUsers,
    to: "/users",
    roles: ["ADMIN", "MANAGER", "HR_ADMIN", "EXECUTIVE"]
  },
  {
    label: "My Assets",
    icon: FiBox,
    to: "/myassets",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"]
  },
  {
    label: "Sim Asset",
    icon: FiBox,
    to: "/cug-sim",
    roles: ["MANAGER", "ADMIN", "EXECUTIVE", "HR_ADMIN"]
  },
  {
    label: "Updates",
    icon: FiSettings,
    to: "/updates",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN","EXECUTIVE"]
  }
];

/* ---------------- ADVANCE MENU ---------------- */

const advanceItems = [
  { label: "Bulk Imports", icon: FiBox, to: "/bulk-imports", roles: ["ADMIN"] },
  { label: "Onboarding", icon: FiUsers, to: "/onboarding", roles: ["ADMIN", "HR_ADMIN"] },
  { label: "Vendors", icon: FiBox, to: "/vendors", roles: ["ADMIN"] },
  { label: "Sites", icon: FiBox, to: "/sites", roles: ["ADMIN"] },
  { label: "Setting", icon: FiBox, to: "/settings", roles: ["ADMIN", "HR_ADMIN"] },
  
  { label: "Contracts & Licences", icon: FiSettings, to: "/contractsandlicences", roles: ["ADMIN"] }
];

/* ---------------- REPORTS MENU ---------------- */

const reportItems = [
  {
    label: "Feedback Report",
    icon: FiBarChart2,
    to: "/tickets/reports/feedback",
    roles: ["ADMIN", "HR_ADMIN", "MANAGER", "EXECUTIVE"]
  },
  {
    label: "Assignee Report",
    icon: FiUsers,
    to: "/reports/assignees",
    roles: ["ADMIN", "HR_ADMIN", "MANAGER"]
  },
  {
    label: "Tickets Responses",
    icon: FiBarChart2,
    to: "/tickets/reports/responses",
    roles: ["ADMIN", "HR_ADMIN", "MANAGER"]
  },
    {
    label: "Multiple Assignments",
    icon: FiBarChart2,
    to: "/report/multiple-assignments",
    roles: ["ADMIN", "MANAGER"]
  },
  {
    label: "Inactive Users Assets",
    icon: FiBarChart2,
    to: "/report/inactive-users-assets",
    roles: ["ADMIN", "MANAGER"]
  }
];

/* ---------------- NAV LINK ---------------- */

const SidebarNavLink = ({ to, icon: Icon, label, exact }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 rounded-lg text-sm transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-200 hover:bg-gray-700"
      }`
    }
  >
    <Icon className="mr-3" />
    {label}
  </NavLink>
);

/* ---------------- DROPDOWN MENU ---------------- */

const SidebarDropdown = ({ title, icon: Icon, items, isOpen, toggle, role }) => {
  const visibleItems = items.filter((item) => item.roles.includes(role));

  if (visibleItems.length === 0) return null;

  return (
    <div>
      <button
        onClick={toggle}
        className="flex items-center w-full px-4 py-2 text-sm rounded-lg text-gray-200 hover:bg-gray-700"
      >
        <Icon className="mr-3" />
        {title}

        {isOpen ? (
          <FiChevronDown className="ml-auto" />
        ) : (
          <FiChevronRight className="ml-auto" />
        )}
      </button>

      {isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {visibleItems.map((item) => (
            <SidebarNavLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- SIDEBAR ---------------- */

const Sidebar = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [advanceOpen, setAdvanceOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-52 bg-gray-800 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 flex flex-col justify-between shadow-lg`}
      >
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-900">

          {/* MAIN NAVIGATION */}
          {navItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item) => (
              <SidebarNavLink key={item.to} {...item} />
            ))}

          {/* REPORTS */}
          <SidebarDropdown
            title="Reports"
            icon={FiBarChart2}
            items={reportItems}
            isOpen={reportsOpen}
            toggle={() => setReportsOpen(!reportsOpen)}
            role={user?.role}
          />

          {/* ADVANCE */}
          <SidebarDropdown
            title="Advance"
            icon={FiSettings}
            items={advanceItems}
            isOpen={advanceOpen}
            toggle={() => setAdvanceOpen(!advanceOpen)}
            role={user?.role}
          />

        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-700 text-xs text-gray-300 bg-gray-900">
          <p>
            Logged in as: <span className="font-medium">{user?.username}</span>
          </p>

          <p>
            Role:
            <span className="uppercase text-blue-400 font-semibold ml-1">
              {user?.role}
            </span>
          </p>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
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