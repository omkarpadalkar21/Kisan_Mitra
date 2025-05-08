import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Store,
  BarChart2,
  Truck,
  Wallet,
  Users,
  Settings,
  Bot,
  Menu,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { DashboardSidebarProps } from "../types";
import { UserButton } from "@clerk/clerk-react";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Marketplace", icon: Store, href: "/dashboard/marketplace" },
  { name: "AI Insights", icon: Bot, href: "/dashboard/ai-insights" },
  { name: "Logistics", icon: Truck, href: "/dashboard/logistics" },
  { name: "Finance", icon: Wallet, href: "/dashboard/finance" },
  { name: "Community", icon: Users, href: "/dashboard/community" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const SidebarContent = () => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-4 border-b">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-emerald-600">
            Kisan Mitra
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                location.pathname === item.href &&
                  "bg-emerald-50 text-emerald-600"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      {/* User profile at bottom of sidebar */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-gray-900 truncate">
              Your Account
            </p>
            <p className="text-xs text-gray-500 truncate">
              Manage your profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
