


// import { useAuth } from "../components/AuthContext";
// import React, { useState } from "react";
// import { FiMenu, FiSearch, FiUser } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";

// const Header = ({ onMenuClick }) => {
//   const navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState("");
//   const { user, logout } = useAuth();

//   const hasAdminAccess = user?.role === "ADMIN" || user?.role === "MANAGER";

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) {
//       navigate(`/asset/${searchInput.trim()}`);
//     } else {
//       alert("Please enter a valid asset ID.");
//     }
//   };

//   return (
//     <>

//   <header className="sticky top-0 w-full h-16 bg-gradient-to-r from-[#00274d] via-[#005792] to-[#0083b0] shadow-md z-50">
//   <div className="absolute top-0 left-0 w-full bg-yellow-400 text-black text-[11px] py-[2px] overflow-hidden">
//     <div className="whitespace-nowrap animate-marquee px-4 font-medium">
//       Dear Users: Effective immediately, tickets will be marked as RESOLVED and will no longer be directly CLOSED.
//       If any issue remains unresolved, you may reopen the ticket within 3 days by opening the resolved ticket,
//       navigating to the Chat section, and clicking the “Reopen” button available at the top.
//     </div>
//   </div>

//   {/* Header Content */}
//   <div className="flex items-center justify-between h-full px-4 md:px-6 text-white pt-4">
    
//     <div className="flex items-center space-x-2">
//       <button
//         className="lg:hidden text-white focus:outline-none"
//         onClick={onMenuClick}
//       >
//         <FiMenu size={24} />
//       </button>

//       <img
//         src="https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220"
//         alt="Mahavir Logo"
//         className="h-10 w-auto"
//       />

//       <h1 className="text-xl font-semibold tracking-wide hidden sm:block">
//         <Link to="/ticket" className="hover:underline text-white">
//           Mahavir Group Help Desk
//         </Link>
//       </h1>
//     </div>

//     <div className="flex items-center space-x-2 md:space-x-4">
//       {user ? (
//         <Link
//           to="/profile"
//           className="bg-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
//         >
//           {user.username.toUpperCase()} ({user.role.toUpperCase()})
//         </Link>
//       ) : (
//         <Link
//           to="/login"
//           className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm md:text-base hover:bg-gray-600 transition"
//         >
//           <FiUser size={18} />
//         </Link>
//       )}
//     </div>

//   </div>
// </header>
//     </>
//   );
// };

// export default Header;




import { useAuth } from "../components/AuthContext";
import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiUser, FiBell } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { fetchUpdates, fetchSOPs } from "../services/api";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { user, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const hasAdminAccess = user?.role === "ADMIN" || user?.role === "MANAGER";

  // ✅ Fetch unread updates and SOPs
  const loadUnreadCount = async () => {
    if (!user) return;

    try {
      const updates = await fetchUpdates();
      const sops = await fetchSOPs();

      const unreadUpdates = updates.filter(u => !u.isRead).length;
      const unreadSOPs = sops.filter(s => !s.isRead).length;

      setUnreadCount(unreadUpdates + unreadSOPs);
    } catch (err) {
      console.error("Failed to load unread count", err);
    }
  };

  useEffect(() => {
    loadUnreadCount();

    // ✅ Optional: refresh count every 60 seconds
    const interval = setInterval(loadUnreadCount, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/asset/${searchInput.trim()}`);
    } else {
      alert("Please enter a valid asset ID.");
    }
  };

  return (
    <>
      <header className="sticky top-0 w-full h-16 bg-gradient-to-r from-[#00274d] via-[#005792] to-[#0083b0] shadow-md z-50">
        <div className="absolute top-0 left-0 w-full bg-yellow-400 text-black text-[11px] py-[2px] overflow-hidden">
          <div className="whitespace-nowrap animate-marquee px-4 font-medium">
            Dear Users: Effective immediately, tickets will be marked as RESOLVED and will no longer be directly CLOSED.
       If any issue remains unresolved, you may reopen the ticket within 3 days by opening the resolved ticket,
       navigating to the Chat section, and clicking the “Reopen” button available at the top.
          </div>
        </div>

        {/* Header Content */}
        <div className="flex items-center justify-between h-full px-4 md:px-6 text-white pt-4">
          <div className="flex items-center space-x-2">
            <button
              className="lg:hidden text-white focus:outline-none"
              onClick={onMenuClick}
            >
              <FiMenu size={24} />
            </button>

            <img
              src="https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220"
              alt="Mahavir Logo"
              className="h-10 w-auto"
            />

            <h1 className="text-xl font-semibold tracking-wide hidden sm:block">
              <Link to="/ticket" className="hover:underline text-white">
                Mahavir Group Help Desk
              </Link>
            </h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">

            {/* ✅ Bell with unread count */}
            {/* <div className="relative">
              <FiBell size={24} className="cursor-pointer" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div> */}

            {/* ✅ Bell with unread count */}
<div className="relative cursor-pointer" onClick={() => navigate("/updates")}>
  <FiBell size={24} />
  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
      {unreadCount}
    </span>
  )}
</div>

            {user ? (
              <Link
                to="/profile"
                className="bg-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
              >
                {user.username.toUpperCase()} ({user.role.toUpperCase()})
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm md:text-base hover:bg-gray-600 transition"
              >
                <FiUser size={18} />
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;