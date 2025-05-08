import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaStore,
  FaChartLine,
  FaTruck,
  FaWallet,
  FaUsers,
  FaCog,
  FaRobot,
} from "react-icons/fa";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navigation = [
  { name: "Dashboard", icon: FaHome, href: "/dashboard" },
  { name: "Marketplace", icon: FaStore, href: "/dashboard/marketplace" },
  { name: "AI Insights", icon: FaRobot, href: "/dashboard/ai-insights" },
  { name: "Logistics", icon: FaTruck, href: "/dashboard/logistics" },
  { name: "Finance", icon: FaWallet, href: "/dashboard/finance" },
  { name: "Community", icon: FaUsers, href: "/dashboard/community" },
  { name: "Settings", icon: FaCog, href: "/dashboard/settings" },
];

const DashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: DashboardSidebarProps) => {
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white">
        <span className="text-2xl font-bold text-emerald-600">Kisan Mitra</span>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50"
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <item.icon
                className={`${
                  location.pathname === item.href
                    ? "text-emerald-600"
                    : "text-gray-400 group-hover:text-gray-500"
                } mr-3 h-6 w-6`}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-0 flex z-40 md:hidden`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar component */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes className="h-6 w-6 text-white" />
            </button>
          </div>
          {sidebarContent}
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
