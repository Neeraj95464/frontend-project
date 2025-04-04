import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/asset/${searchInput.trim()}`);
    } else {
      alert("Please enter a valid asset ID.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-md z-50 flex items-center justify-between px-4 md:px-6 text-white">
      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={onMenuClick}
      >
        <FiMenu size={24} />
      </button>

      <h1 className="text-lg md:text-xl font-bold tracking-wide">
        <Link to="/" className="text-red-600 hover:underline">
          Mahavir Assets
        </Link>
      </h1>

      <div className="flex items-center space-x-2 md:space-x-4">
        <Link
          to="/add-asset"
          className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm md:text-base hover:bg-green-600 transition"
        >
          Add Asset
        </Link>
        <Link
          to="/assets"
          className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm md:text-base hover:bg-gray-600 transition"
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
            onChange={handleInputChange}
          />
        </form>

        {user ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              {user.username} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FiLogOut size={18} />
            </button>
          </div>
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
