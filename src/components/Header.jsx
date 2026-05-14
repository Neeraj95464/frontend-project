


import { useAuth } from "../components/AuthContext";
import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiUser, FiBell, FiLogOut, FiSettings, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { fetchUpdates, fetchSOPs } from "../services/api";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
      setSearchInput("");
    } else {
      alert("Please enter a valid asset ID.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowUserMenu(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  return (
    <>
      {/* <header className="sticky top-0 w-full bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#00509e] shadow-xl z-50"> */}

<header className="fixed top-0 w-full bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#00509e] shadow-xl z-50">

        {/* Header Content */}
        <div className="flex items-center justify-between h-16 px-3 sm:px-4 md:px-6 text-white">
          
          {/* Left Section - Logo & Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white focus:outline-none hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <FiMenu size={22} />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.5oPSfDKKs7b_Vl58PPGp_AAAAA?pid=Api&P=0&h=220"
                alt="Mahavir Logo"
                className="h-8 sm:h-10 w-auto object-contain"
              />
              
              {/* Brand Name - Hidden on very small screens */}
              <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-wide hidden xs:block">
                <Link to="/ticket" className="hover:text-yellow-400 transition-colors duration-200">
                  Mahavir Help Desk
                </Link>
              </h1>
            </div>
          </div>

      
{hasAdminAccess && (
  <div className="hidden md:block flex-1 max-w-md mx-4">
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search asset by ID..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        className={`w-full px-4 py-2 pl-10 rounded-lg bg-white/10 border text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-200 ${
          searchFocused 
            ? 'bg-white/20 border-yellow-400 ring-yellow-400/50' 
            : 'border-white/30 hover:bg-white/15'
        }`}
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-lg" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-yellow-500 text-gray-900 rounded-md text-sm font-semibold hover:bg-yellow-400 transition-all duration-200"
      >
        Go
      </button>
    </form>
  </div>
)}

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            
            
{hasAdminAccess && (
  <button
    onClick={() => {
      const searchTerm = prompt("Enter Asset ID to search:");
      if (searchTerm?.trim()) {
        navigate(`/asset/${searchTerm.trim()}`);
      }
    }}
    className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
    aria-label="Search"
  >
    <FiSearch size={20} />
  </button>
)}

            {/* Notifications Bell */}
            <div 
              className="relative cursor-pointer group"
              onClick={() => navigate("/updates")}
            >
              <div className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group-hover:scale-105">
                <FiBell size={20} className="sm:size-22" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full ring-2 ring-white animate-pulse">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </div>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative user-menu-container">
                {/* <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 transition-all duration-200 group"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {user.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-medium truncate max-w-[100px]">
                      {user.name} - {user.employeeId}
                    </p>
                    <p className="text-[10px] text-yellow-300 font-semibold">
                      {user.role}
                    </p>
                  </div>
                  <FiChevronDown className={`text-white transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button> */}

                <button
  onClick={() => setShowUserMenu(!showUserMenu)}
  className="
    flex items-center gap-2
    bg-white/10 hover:bg-white/20
    backdrop-blur-md
    border border-white/10
    rounded-xl
    px-2 py-1.5 sm:px-3 sm:py-2
    transition-all duration-300
    shadow-md hover:shadow-lg
    hover:scale-[1.02]
    active:scale-[0.98]
  "
>
  {/* Avatar */}
  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow">
    <span className="text-xs sm:text-sm font-bold text-gray-900">
      {user.username?.charAt(0).toUpperCase()}
    </span>
  </div>

  {/* User Details */}
  <div className="hidden sm:flex flex-col text-left leading-tight">
    <p className="text-xs font-semibold text-white truncate max-w-[140px]">
      {user.name}
    </p>

    <div className="flex items-center gap-1 text-[10px]">
      <span className="text-gray-300">
        {user.employeeId}
      </span>

      <span className="w-1 h-1 rounded-full bg-gray-400"></span>

      <span className="text-yellow-300 font-semibold uppercase tracking-wide">
        {user.role}
      </span>
    </div>
  </div>

  {/* Dropdown Icon */}
  <FiChevronDown
    className={`
      text-white text-sm
      transition-transform duration-300
      ${showUserMenu ? "rotate-180" : ""}
    `}
  />
</button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-slideDown">
                    <div className="py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                        <p className="text-xs text-gray-500 mt-1">{user.email || user.username}</p>
                        {/* <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                          {user.role}
                        </span> */}
                      </div>

                      {/* Menu Items */}
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiUser className="mr-3 text-gray-400" size={16} />
                        My Profile
                      </Link>
                      
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiSettings className="mr-3 text-gray-400" size={16} />
                        Settings
                      </Link>

                      <hr className="my-1" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="mr-3 text-red-400" size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        @media (min-width: 480px) {
          .xs\\:block {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Header;