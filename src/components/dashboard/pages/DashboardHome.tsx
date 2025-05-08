import React from "react";
import { FaChartLine, FaLeaf } from "react-icons/fa";
import CropGrowthChart from "../components/CropGrowthChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Good Morning</h2>
          <p className="text-gray-600">Omkar Padalkar 👋</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fields Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-emerald-500" />
              <h3 className="text-lg font-medium">Fields Overview</h3>
            </div>
            <span className="text-emerald-600 font-medium">Good</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">View Fields Report</span>
              <button className="text-emerald-600 hover:text-emerald-700">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <FaChartLine className="text-emerald-500" />
              <h3 className="text-lg font-medium">Expenses</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">₹2,314.00</span>
              <span className="text-red-500 text-sm">-10%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">View Finance Report</span>
              <button className="text-emerald-600 hover:text-emerald-700">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Growth Monitoring */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-emerald-500" />
            <h3 className="text-lg font-medium">Crop Growth Monitoring</h3>
          </div>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="h-64 w-full">
          <CropGrowthChart />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Tomatoes Field: 3.2cm</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Chili Field: 2.8cm</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Potatoes Field: 2.3cm</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span>Onion Field: 1.5cm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
