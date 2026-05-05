

// // import React, { useState } from "react";
// // import { NavLink } from "react-router-dom";
// // import { useAuth } from "./AuthContext";

// // import {
// //   FiHome,
// //   FiBox,
// //   FiUsers,
// //   FiSettings,
// //   FiBarChart2,
// //   FiChevronDown,
// //   FiChevronRight,
// //   FiMenu,
// //   FiX
// // } from "react-icons/fi";

// // /* ---------------- NAV ITEMS ---------------- */

// // const navItems = [
// //   {
// //     label: "Dashboard",
// //     icon: FiHome,
// //     to: "/",
// //     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"],
// //     exact: true
// //   },
// //   {
// //     label: "My Tickets",
// //     icon: FiUsers,
// //     to: "/ticket",
// //     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"],
// //     exact: true
// //   },
// //   {
// //     label: "Admin Tickets",
// //     icon: FiUsers,
// //     to: "/ticket/admin",
// //     roles: ["ADMIN", "MANAGER", "HR_ADMIN"]
// //   },
// //   {
// //     label: "Assets",
// //     icon: FiBox,
// //     to: "/assets",
// //     roles: ["ADMIN", "MANAGER", "EXECUTIVE"]
// //   },
// //   {
// //     label: "Child Assets",
// //     icon: FiSettings,
// //     to: "/child-assets",
// //     roles: ["ADMIN", "MANAGER", "EXECUTIVE"]
// //   },
// //   {
// //     label: "Users",
// //     icon: FiUsers,
// //     to: "/users",
// //     roles: ["ADMIN", "MANAGER", "HR_ADMIN", "EXECUTIVE"]
// //   },
// //   {
// //     label: "My Assets",
// //     icon: FiBox,
// //     to: "/myassets",
// //     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"]
// //   },
// //   {
// //     label: "Sim Asset",
// //     icon: FiBox,
// //     to: "/cug-sim",
// //     roles: ["MANAGER", "ADMIN", "EXECUTIVE", "HR_ADMIN"]
// //   },
// //   {
// //     label: "Updates",
// //     icon: FiSettings,
// //     to: "/updates",
// //     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN","EXECUTIVE"]
// //   }
// // ];

// // /* ---------------- ADVANCE MENU ---------------- */

// // const advanceItems = [
// //   { label: "Bulk Imports", icon: FiBox, to: "/bulk-imports", roles: ["ADMIN","MANAGER"] },
// //   { label: "Vendor Import", icon: FiBox, to: "/vendor/bulk-imports", roles: ["ADMIN"] },
// //   { label: "License Import", icon: FiBox, to: "/softwarelicense/bulk-imports", roles: ["ADMIN"] },
// //   { label: "Onboarding", icon: FiUsers, to: "/onboarding", roles: ["ADMIN", "HR_ADMIN"] },
// //   { label: "Vendors", icon: FiBox, to: "/vendors", roles: ["ADMIN","MANAGER","EXECUTIVE"] },
// //   { label: "Sites", icon: FiBox, to: "/sites", roles: ["ADMIN","MANAGER"] },
// //   { label: "Setting", icon: FiBox, to: "/settings", roles: ["ADMIN", "HR_ADMIN","MANAGER"] },
// //   { label: "Agents", icon: FiBox, to: "/agents", roles: ["ADMIN", "HR_ADMIN"] },
  
// //   { label: "Contracts & Licences", icon: FiSettings, to: "/contractsandlicences", roles: ["ADMIN","MANAGER"] }
// // ];

// // /* ---------------- REPORTS MENU ---------------- */

// // const reportItems = [
// //   {
// //     label: "Feedback Report",
// //     icon: FiBarChart2,
// //     to: "/tickets/reports/feedback",
// //     roles: ["ADMIN", "HR_ADMIN", "MANAGER", "EXECUTIVE"]
// //   },
// //   {
// //     label: "Assignee Report",
// //     icon: FiUsers,
// //     to: "/reports/assignees",
// //     roles: ["ADMIN", "HR_ADMIN", "MANAGER"]
// //   },
// //   {
// //     label: "Tickets Responses",
// //     icon: FiBarChart2,
// //     to: "/tickets/reports/responses",
// //     roles: ["ADMIN", "HR_ADMIN", "MANAGER"]
// //   },
// //     {
// //     label: "Asset Tiger",
// //     icon: FiBarChart2,
// //     to: "/asset-tiger/management",
// //     roles: ["ADMIN"]
// //   },
// //     {
// //     label: "Multiple Assignments",
// //     icon: FiBarChart2,
// //     to: "/report/multiple-assignments",
// //     roles: ["ADMIN", "MANAGER","HR_ADMIN"]
// //   },
// //   {
// //     label: "Inactive Users Assets",
// //     icon: FiBarChart2,
// //     to: "/report/inactive-users-assets",
// //     roles: ["ADMIN", "MANAGER","HR_ADMIN"]
// //   }
// // ];

// // /* ---------------- NAV LINK ---------------- */

// // const SidebarNavLink = ({ to, icon: Icon, label, exact }) => (
// //   <NavLink
// //     to={to}
// //     end={exact}
// //     className={({ isActive }) =>
// //       `flex items-center px-4 py-2 rounded-lg text-sm transition ${
// //         isActive
// //           ? "bg-blue-600 text-white"
// //           : "text-gray-200 hover:bg-gray-700"
// //       }`
// //     }
// //   >
// //     <Icon className="mr-3" />
// //     {label}
// //   </NavLink>
// // );

// // /* ---------------- DROPDOWN MENU ---------------- */

// // const SidebarDropdown = ({ title, icon: Icon, items, isOpen, toggle, role }) => {
// //   const visibleItems = items.filter((item) => item.roles.includes(role));

// //   if (visibleItems.length === 0) return null;

// //   return (
// //     <div>
// //       <button
// //         onClick={toggle}
// //         className="flex items-center w-full px-4 py-2 text-sm rounded-lg text-gray-200 hover:bg-gray-700"
// //       >
// //         <Icon className="mr-3" />
// //         {title}

// //         {isOpen ? (
// //           <FiChevronDown className="ml-auto" />
// //         ) : (
// //           <FiChevronRight className="ml-auto" />
// //         )}
// //       </button>

// //       {isOpen && (
// //         <div className="ml-8 mt-1 space-y-1">
// //           {visibleItems.map((item) => (
// //             <SidebarNavLink
// //               key={item.to}
// //               to={item.to}
// //               icon={item.icon}
// //               label={item.label}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // /* ---------------- SIDEBAR ---------------- */

// // const Sidebar = () => {
// //   const { user } = useAuth();

// //   const [isOpen, setIsOpen] = useState(false);
// //   const [reportsOpen, setReportsOpen] = useState(false);
// //   const [advanceOpen, setAdvanceOpen] = useState(false);

// //   const toggleSidebar = () => setIsOpen(!isOpen);

// //   return (
// //     <>
// //       {/* MOBILE BUTTON */}
// //       <button
// //         className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
// //         onClick={toggleSidebar}
// //       >
// //         {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
// //       </button>

// //       <aside
// //         className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-52 bg-gray-800 text-white z-50 transform ${
// //           isOpen ? "translate-x-0" : "-translate-x-full"
// //         } transition-transform lg:translate-x-0 flex flex-col justify-between shadow-lg`}
// //       >
// //         <nav className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-900">

// //           {/* MAIN NAVIGATION */}
// //           {navItems
// //             .filter((item) => item.roles.includes(user?.role))
// //             .map((item) => (
// //               <SidebarNavLink key={item.to} {...item} />
// //             ))}

// //           {/* REPORTS */}
// //           <SidebarDropdown
// //             title="Reports"
// //             icon={FiBarChart2}
// //             items={reportItems}
// //             isOpen={reportsOpen}
// //             toggle={() => setReportsOpen(!reportsOpen)}
// //             role={user?.role}
// //           />

// //           {/* ADVANCE */}
// //           <SidebarDropdown
// //             title="Advance"
// //             icon={FiSettings}
// //             items={advanceItems}
// //             isOpen={advanceOpen}
// //             toggle={() => setAdvanceOpen(!advanceOpen)}
// //             role={user?.role}
// //           />

// //         </nav>

// //         {/* FOOTER */}
// //         <div className="p-4 border-t border-gray-700 text-xs text-gray-300 bg-gray-900">
// //           <p>
// //             Logged in as: <span className="font-medium">{user?.username}</span>
// //           </p>

// //           <p>
// //             Role:
// //             <span className="uppercase text-blue-400 font-semibold ml-1">
// //               {user?.role}
// //             </span>
// //           </p>
// //         </div>
// //       </aside>

// //       {/* MOBILE OVERLAY */}
// //       {isOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
// //           onClick={toggleSidebar}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// import {
//   FiHome,
//   FiBox,
//   FiUsers,
//   FiSettings,
//   FiBarChart2,
//   FiChevronDown,
//   FiChevronRight,
//   FiMenu,
//   FiX,
//   // FiTicket,
//   FiUserCheck,
//   FiDatabase,
//   FiFileText,
//   FiTrendingUp,
//   FiClipboard,
//   FiShield,
//   FiLayers,
//   FiGrid
// } from "react-icons/fi";

// // Change FiTicket to FiTag
// import { FiTag } from 'react-icons/fi';

// /* ---------------- NAV ITEMS ---------------- */

// const navItems = [
//   {
//     label: "Dashboard",
//     icon: FiHome,
//     to: "/",
//     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"],
//     exact: true
//   },
//   {
//     label: "My Tickets",
//     icon: FiTag,
//     to: "/ticket",
//     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"],
//     exact: true
//   },
//   {
//     label: "Admin Tickets",
//     icon: FiUserCheck,
//     to: "/ticket/admin",
//     roles: ["ADMIN", "MANAGER", "HR_ADMIN"]
//   },
//   {
//     label: "Assets",
//     icon: FiBox,
//     to: "/assets",
//     roles: ["ADMIN", "MANAGER", "EXECUTIVE"]
//   },
//   {
//     label: "Child Assets",
//     icon: FiLayers,
//     to: "/child-assets",
//     roles: ["ADMIN", "MANAGER", "EXECUTIVE"]
//   },
//   {
//     label: "Users",
//     icon: FiUsers,
//     to: "/users",
//     roles: ["ADMIN", "MANAGER", "HR_ADMIN", "EXECUTIVE"]
//   },
//   {
//     label: "My Assets",
//     icon: FiGrid,
//     to: "/myassets",
//     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"]
//   },
//   {
//     label: "Sim Asset",
//     icon: FiDatabase,
//     to: "/cug-sim",
//     roles: ["MANAGER", "ADMIN", "EXECUTIVE", "HR_ADMIN"]
//   },
//   {
//     label: "Updates",
//     icon: FiTrendingUp,
//     to: "/updates",
//     roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN","EXECUTIVE"]
//   }
// ];

// /* ---------------- ADVANCE MENU ---------------- */

// const advanceItems = [
//   { label: "Bulk Imports", icon: FiDatabase, to: "/bulk-imports", roles: ["ADMIN","MANAGER"] },
//   { label: "Vendor Import", icon: FiBox, to: "/vendor/bulk-imports", roles: ["ADMIN"] },
//   { label: "License Import", icon: FiFileText, to: "/softwarelicense/bulk-imports", roles: ["ADMIN"] },
//   { label: "Onboarding", icon: FiUsers, to: "/onboarding", roles: ["ADMIN", "HR_ADMIN"] },
//   { label: "Vendors", icon: FiBox, to: "/vendors", roles: ["ADMIN","MANAGER","EXECUTIVE"] },
//   { label: "Sites", icon: FiGrid, to: "/sites", roles: ["ADMIN","MANAGER"] },
//   { label: "Setting", icon: FiSettings, to: "/settings", roles: ["ADMIN", "HR_ADMIN","MANAGER"] },
//   { label: "Agents", icon: FiUsers, to: "/agents", roles: ["ADMIN", "HR_ADMIN"] },
//   { label: "Contracts & Licences", icon: FiClipboard, to: "/contractsandlicences", roles: ["ADMIN","MANAGER"] }
// ];

// /* ---------------- REPORTS MENU ---------------- */

// const reportItems = [
//   {
//     label: "Feedback Report",
//     icon: FiBarChart2,
//     to: "/tickets/reports/feedback",
//     roles: ["ADMIN", "HR_ADMIN", "MANAGER", "EXECUTIVE"]
//   },
//   {
//     label: "Assignee Report",
//     icon: FiUsers,
//     to: "/reports/assignees",
//     roles: ["ADMIN", "HR_ADMIN", "MANAGER"]
//   },
//   {
//     label: "Tickets Responses",
//     icon: FiFileText,
//     to: "/tickets/reports/responses",
//     roles: ["ADMIN", "HR_ADMIN", "MANAGER"]
//   },
//   {
//     label: "Asset Tiger",
//     icon: FiShield,
//     to: "/asset-tiger/management",
//     roles: ["ADMIN"]
//   },
//   {
//     label: "Multiple Assignments",
//     icon: FiLayers,
//     to: "/report/multiple-assignments",
//     roles: ["ADMIN", "MANAGER","HR_ADMIN"]
//   },
//   {
//     label: "Inactive Users Assets",
//     icon: FiUserCheck,
//     to: "/report/inactive-users-assets",
//     roles: ["ADMIN", "MANAGER","HR_ADMIN"]
//   }
// ];

// /* ---------------- NAV LINK ---------------- */

// const SidebarNavLink = ({ to, icon: Icon, label, exact }) => (
//   <NavLink
//     to={to}
//     end={exact}
//     className={({ isActive }) =>
//       `group flex items-center px-3 lg:px-4 py-2.5 lg:py-2 rounded-lg text-sm transition-all duration-200 ${
//         isActive
//           ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
//           : "text-gray-300 hover:bg-gray-700 hover:text-white hover:translate-x-1"
//       }`
//     }
//   >
//     <Icon className={`mr-3 text-lg lg:text-base transition-transform duration-200 group-hover:scale-110`} />
//     <span className="truncate">{label}</span>
//     {({ isActive }) => isActive && (
//       <div className="ml-auto w-1 h-6 bg-white rounded-full"></div>
//     )}
//   </NavLink>
// );

// /* ---------------- DROPDOWN MENU ---------------- */

// const SidebarDropdown = ({ title, icon: Icon, items, isOpen, toggle, role }) => {
//   const visibleItems = items.filter((item) => item.roles.includes(role));

//   if (visibleItems.length === 0) return null;

//   return (
//     <div className="mb-1">
//       <button
//         onClick={toggle}
//         className="group flex items-center w-full px-3 lg:px-4 py-2.5 lg:py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
//       >
//         <Icon className={`mr-3 text-lg lg:text-base transition-transform duration-200 group-hover:scale-110`} />
//         <span className="flex-1 text-left">{title}</span>
//         <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
//           {isOpen ? <FiChevronDown /> : <FiChevronRight />}
//         </div>
//       </button>

//       <div
//         className={`ml-6 lg:ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
//           isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         {visibleItems.map((item) => (
//           <SidebarNavLink
//             key={item.to}
//             to={item.to}
//             icon={item.icon}
//             label={item.label}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ---------------- SIDEBAR ---------------- */

// const Sidebar = () => {
//   const { user } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [advanceOpen, setAdvanceOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setIsOpen(false); // Close mobile menu on desktop resize
//       }
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Close sidebar on route change on mobile
//   useEffect(() => {
//     if (isMobile && isOpen) {
//       setIsOpen(false);
//     }
//   }, [window.location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobile && isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobile, isOpen]);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Close on escape key
//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === 'Escape' && isOpen) {
//         setIsOpen(false);
//       }
//     };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, [isOpen]);

//   return (
//     <>
//       {/* MOBILE BUTTON - Enhanced */}
//       <button
//         className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
//         onClick={toggleSidebar}
//         aria-label="Toggle menu"
//       >
//         {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//       </button>

//       {/* SIDEBAR - Enhanced Design */}
//       <aside
//         className={`fixed top-0 lg:top-16 left-0 h-screen lg:h-[calc(100vh-4rem)] w-72 lg:w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-40 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-2xl`}
//       >
//         {/* Sidebar Header - Mobile Only */}
//         <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
//           <div>
//             <h2 className="text-lg font-bold">Menu</h2>
//             <p className="text-xs text-blue-100 mt-1">Welcome back!</p>
//           </div>
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
//             aria-label="Close menu"
//           >
//             <FiX size={20} />
//           </button>
//         </div>

//         {/* Scrollable Navigation */}
//         <nav className="flex-grow p-3 lg:p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
//           {/* MAIN NAVIGATION */}
//           {navItems
//             .filter((item) => item.roles.includes(user?.role))
//             .map((item) => (
//               <SidebarNavLink key={item.to} {...item} />
//             ))}

//           {/* Divider */}
//           <div className="my-3 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

//           {/* REPORTS */}
//           <SidebarDropdown
//             title="Reports"
//             icon={FiBarChart2}
//             items={reportItems}
//             isOpen={reportsOpen}
//             toggle={() => setReportsOpen(!reportsOpen)}
//             role={user?.role}
//           />

//           {/* ADVANCE */}
//           <SidebarDropdown
//             title="Advance"
//             icon={FiSettings}
//             items={advanceItems}
//             isOpen={advanceOpen}
//             toggle={() => setAdvanceOpen(!advanceOpen)}
//             role={user?.role}
//           />
//         </nav>

//         {/* FOOTER - Enhanced */}
//         <div className="p-4 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//               <span className="text-sm font-bold">
//                 {user?.username?.charAt(0).toUpperCase() || 'U'}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-xs text-gray-400 truncate">Logged in as</p>
//               <p className="text-sm font-medium text-white truncate">
//                 {user?.username || 'User'}
//               </p>
//               <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600/30 text-blue-300">
//                 {user?.role || 'USER'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* MOBILE OVERLAY - Enhanced */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
//           onClick={toggleSidebar}
//           aria-label="Close menu overlay"
//         />
//       )}

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 5px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(55, 65, 81, 0.5);
//           border-radius: 10px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(59, 130, 246, 0.6);
//           border-radius: 10px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(59, 130, 246, 0.8);
//         }
        
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(59, 130, 246, 0.6) rgba(55, 65, 81, 0.5);
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
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
  FiX,
  // FiTicket,
  FiUserCheck,
  FiDatabase,
  FiFileText,
  FiTrendingUp,
  FiClipboard,
  FiShield,
  FiLayers,
  FiGrid
} from "react-icons/fi";

import {IoTicketOutline  } from 'react-icons/io5';

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
    icon: IoTicketOutline,
    to: "/ticket",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"],
    exact: true
  },
  {
    label: "Admin Tickets",
    icon: FiUserCheck,
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
    icon: FiLayers,
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
    icon: FiGrid,
    to: "/myassets",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN", "EXECUTIVE"]
  },
  {
    label: "Sim Asset",
    icon: FiDatabase,
    to: "/cug-sim",
    roles: ["MANAGER", "ADMIN", "EXECUTIVE", "HR_ADMIN"]
  },
  {
    label: "Updates",
    icon: FiTrendingUp,
    to: "/updates",
    roles: ["USER", "HR_ADMIN", "MANAGER", "ADMIN","EXECUTIVE"]
  }
];

/* ---------------- ADVANCE MENU ---------------- */

const advanceItems = [
  { label: "Bulk Imports", icon: FiDatabase, to: "/bulk-imports", roles: ["ADMIN","MANAGER"] },
  { label: "Vendor Import", icon: FiBox, to: "/vendor/bulk-imports", roles: ["ADMIN"] },
  { label: "License Import", icon: FiFileText, to: "/softwarelicense/bulk-imports", roles: ["ADMIN"] },
  { label: "Onboarding", icon: FiUsers, to: "/onboarding", roles: ["ADMIN", "HR_ADMIN"] },
  { label: "Vendors", icon: FiBox, to: "/vendors", roles: ["ADMIN","MANAGER","EXECUTIVE"] },
  { label: "Sites", icon: FiGrid, to: "/sites", roles: ["ADMIN","MANAGER"] },
  { label: "Setting", icon: FiSettings, to: "/settings", roles: ["ADMIN", "HR_ADMIN","MANAGER"] },
  { label: "Agents", icon: FiUsers, to: "/agents", roles: ["ADMIN", "HR_ADMIN"] },
  { label: "Contracts & Licences", icon: FiClipboard, to: "/contractsandlicences", roles: ["ADMIN","MANAGER"] }
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
    icon: FiFileText,
    to: "/tickets/reports/responses",
    roles: ["ADMIN", "HR_ADMIN", "MANAGER"]
  },
  {
    label: "Asset Tiger",
    icon: FiShield,
    to: "/report/asset-tiger/matching/reports",
    roles: ["ADMIN"]
  },
  {
    label: "Multiple Assignments",
    icon: FiLayers,
    to: "/report/multiple-assignments",
    roles: ["ADMIN", "MANAGER","HR_ADMIN"]
  },
  {
    label: "Inactive Users Assets",
    icon: FiUserCheck,
    to: "/report/inactive-users-assets",
    roles: ["ADMIN", "MANAGER","HR_ADMIN"]
  }
];

/* ---------------- NAV LINK ---------------- */

const SidebarNavLink = ({ to, icon: Icon, label, exact }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `group flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-700 hover:text-white hover:translate-x-1"
      }`
    }
  >
    <Icon className={`mr-3 text-lg transition-transform duration-200 group-hover:scale-110`} />
    <span className="truncate">{label}</span>
    {({ isActive }) => isActive && (
      <div className="ml-auto w-1 h-6 bg-white rounded-full"></div>
    )}
  </NavLink>
);

/* ---------------- DROPDOWN MENU ---------------- */

const SidebarDropdown = ({ title, icon: Icon, items, isOpen, toggle, role }) => {
  const visibleItems = items.filter((item) => item.roles.includes(role));

  if (visibleItems.length === 0) return null;

  return (
    <div className="mb-1">
      <button
        onClick={toggle}
        className="group flex items-center w-full px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
      >
        <Icon className={`mr-3 text-lg transition-transform duration-200 group-hover:scale-110`} />
        <span className="flex-1 text-left">{title}</span>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <FiChevronDown /> : <FiChevronRight />}
        </div>
      </button>

      <div
        className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {visibleItems.map((item) => (
          <SidebarNavLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

/* ---------------- SIDEBAR ---------------- */

const Sidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false); // Close mobile menu on desktop resize
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [window.location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* MOBILE BUTTON - Enhanced */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* SIDEBAR - Original width w-52 */}
      <aside
        className={`fixed top-0 lg:top-16 left-0 h-screen lg:h-[calc(100vh-4rem)] w-52 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-2xl`}
      >
        {/* Sidebar Header - Mobile Only */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-grow p-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {/* MAIN NAVIGATION */}
          {navItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item) => (
              <SidebarNavLink key={item.to} {...item} />
            ))}

          {/* Divider */}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

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

        {/* FOOTER - User details removed as requested */}
        <div className="p-4 border-t border-gray-700 bg-gray-900/50">
          <p className="text-xs text-gray-400 text-center">
            © 2026 Mahavir Group
          </p>
        </div>
      </aside>

      {/* MOBILE OVERLAY - Enhanced */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
          onClick={toggleSidebar}
          aria-label="Close menu overlay"
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.6);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.6) rgba(55, 65, 81, 0.5);
        }
      `}</style>
    </>
  );
};

export default Sidebar;


