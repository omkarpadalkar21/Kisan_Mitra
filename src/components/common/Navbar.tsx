import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";
import { useAuth, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white fixed w-full z-[100] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            Kisan Mitra
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-emerald-600">
              Home
            </Link>
            <Link to="/#about" className="text-gray-600 hover:text-emerald-600">
              About
            </Link>
            <Link
              to="/#features"
              className="text-gray-600 hover:text-emerald-600"
            >
              Features
            </Link>
            <LanguageSwitcher />

            <SignedOut>
              <Link
                to="/sign-in"
                className="text-emerald-600 hover:text-emerald-700"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              >
                Sign Up
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                to="/dashboard"
                className="text-emerald-600 hover:text-emerald-700"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-emerald-600"
              >
                Home
              </Link>
              <Link
                to="/#about"
                className="block px-3 py-2 text-gray-600 hover:text-emerald-600"
              >
                About
              </Link>
              <Link
                to="/#features"
                className="block px-3 py-2 text-gray-600 hover:text-emerald-600"
              >
                Features
              </Link>
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>

              <SignedOut>
                <Link
                  to="/sign-in"
                  className="block px-3 py-2 text-emerald-600 hover:text-emerald-700"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="block px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-emerald-600 hover:text-emerald-700"
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
