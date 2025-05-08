import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import LanguageSwitcher from "../common/LanguageSwitcher";

interface DashboardNavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const DashboardNavbar = ({ setSidebarOpen }: DashboardNavbarProps) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex">
            <button
              className="md:hidden px-4 text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="h-6 w-6" />
            </button>

            {/* Search bar */}
            <div className="flex-1 flex items-center ml-4">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="Search products, buyers, crops..."
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
              <FaBell className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <FaUser className="h-5 w-5 text-white" />
                </div>
              </button>

              {profileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaCog className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Add logout logic here
                      }}
                    >
                      <FaSignOutAlt className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
