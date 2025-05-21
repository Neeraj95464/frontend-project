import { useAuth } from "../components/AuthContext";
import React, { useState } from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { user, logout } = useAuth();

  const hasAdminAccess = user?.role === "ADMIN" || user?.role === "MANAGER";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/asset/${searchInput.trim()}`);
    } else {
      alert("Please enter a valid asset ID.");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-[#00274d] via-[#005792] to-[#0083b0] shadow-md z-50 flex items-center justify-between px-4 md:px-6 text-white">
      <div className="flex items-center space-x-2">
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={onMenuClick}
        >
          <FiMenu size={24} />
        </button>

        <img
          src="https://www.mahavirgroup.co/wp-content/uploads/2018/10/Mahavir-Group-Logo.png"
          alt="Mahavir Logo"
          className="h-10 w-auto"
        />

        <h1 className="text-xl font-semibold tracking-wide text-white hidden sm:block">
          <Link to="/ticket" className="hover:underline text-white">
            Mahavir Group Help Desk
          </Link>
        </h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {hasAdminAccess && (
          <>
            <Link
              to="/add-asset"
              className="bg-green-500 px-3 py-2 rounded-lg text-sm md:text-base hover:bg-green-600 transition"
            >
              Add Asset
            </Link>
            <Link
              to="/assets"
              className="bg-gray-700 px-3 py-2 rounded-lg text-sm md:text-base hover:bg-gray-600 transition"
            >
              List of Assets
            </Link>
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex items-center bg-gray-700 text-gray-300 rounded-lg overflow-hidden border border-gray-600"
            >
              <FiSearch className="mx-2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Asset..."
                className="w-48 bg-transparent text-sm md:text-base px-2 py-2 placeholder-gray-400 focus:ring-0 focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </>
        )}

        {user ? (
          // <Link
          //   to="/profile"
          //   className="bg-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
          // >
          //   {user.username} ({user.role})
          // </Link>

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
    </header>
  );
};

export default Header;
