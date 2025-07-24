// import { useAuth } from "./AuthContext";
// import React, { useState } from "react";
// import {
//   FiHome,
//   FiBox,
//   FiBarChart2,
//   FiSettings,
//   FiX,
//   FiMenu,
//   FiUsers,
// } from "react-icons/fi";
// import { NavLink } from "react-router-dom";

// // Adjust the path as per your structure

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user } = useAuth(); // Access user role

//   const navItems = [
//     {
//       label: "My Tickets",
//       icon: FiUsers,
//       to: "/ticket",
//       roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN"],
//     },
//     {
//       label: "Admin Tickets",
//       icon: FiUsers,
//       to: "/ticket/admin",
//       roles: ["ADMIN", "MANAGER", "HR_ADMIN"],
//     },
//     { label: "Dashboard", icon: FiHome, to: "/", roles: ["ADMIN", "MANAGER"] },
//     {
//       label: "Assets",
//       icon: FiBox,
//       to: "/assets",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       label: "Contracts",
//       icon: FiBox,
//       to: "/contracts",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       label: "Vendors",
//       icon: FiBox,
//       to: "/vendors",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       label: "Reports",
//       icon: FiBarChart2,
//       to: "/reports",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       label: "Users",
//       icon: FiUsers,
//       to: "/users",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       label: "Settings",
//       icon: FiSettings,
//       to: "/settings",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       label: "Updates",
//       icon: FiSettings,
//       to: "/updates",
//       roles: ["ADMIN", "MANAGER"],
//     },
//   ];

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const SidebarNavLink = ({ to, icon: Icon, label }) => (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center px-4 py-2 rounded-lg text-sm transition-all ${
//           isActive
//             ? "bg-blue-600 text-white"
//             : "hover:bg-gray-700 text-gray-200"
//         }`
//       }
//     >
//       <Icon className="mr-3" />
//       {label}
//     </NavLink>
//   );

//   return (
//     <>
//       {/* Mobile Menu Toggle */}
//       <button
//         className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md focus:outline-none"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       {/* <aside
//         className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform ${
//           isOpen ? "translate-x-0 " : "-translate-x-full"
//         } transition-transform lg:translate-x-0 w-46`}
//       > */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform ${
//           isOpen ? "translate-x-0 " : "-translate-x-full"
//         } transition-transform lg:translate-x-0 w-46 flex flex-col justify-between`}
//       >
//         {/* Header */}
//         <div className="h-16 flex items-center justify-center bg-blue-600 shadow-md">
//           <h1 className="text-xl font-bold">Asset Manager</h1>
//         </div>

//         <nav className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-900 text-white">
//           {navItems
//             .filter((item) => item.roles.includes(user?.role))
//             .map(({ to, icon, label }) => (
//               <SidebarNavLink key={to} to={to} icon={icon} label={label} />
//             ))}
//         </nav>

//         <div className="p-4 border-t border-gray-700 text-xs text-gray-300">
//           <p>
//             Logged in as: <span className="font-medium">{user?.username}</span>
//           </p>
//           <p>
//             Role:{" "}
//             <span className="uppercase text-blue-400 font-semibold">
//               {user?.role}
//             </span>
//           </p>
//         </div>
//       </aside>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// Sidebar.jsx
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
    label: "Contracts",
    icon: FiBox,
    to: "/contracts",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    label: "Vendors",
    icon: FiBox,
    to: "/vendors",
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
    roles: ["ADMIN", "MANAGER"],
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
];

// Reusable nav link component
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
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu toggle button */}
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
        <div className="h-16 flex items-center justify-center bg-blue-600 shadow-md">
          <h1 className="text-xl font-bold">Asset Manager</h1>
        </div>

        {/* Nav links */}
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-900 text-white scrollbar-hide">
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
        </nav>

        {/* Footer */}
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
        </div>
      </aside>

      {/* Overlay for mobile */}
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
