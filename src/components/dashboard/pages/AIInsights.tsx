import React from "react";
import { FaRobot, FaChartLine, FaCloud, FaBug } from "react-icons/fa";

const AIInsights = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">AI Insights</h2>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Predictions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <FaChartLine className="text-emerald-500 text-xl" />
            <h3 className="text-lg font-medium">Price Predictions</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Tomatoes</span>
              <span className="text-green-600">↑ Expected to rise by 12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Potatoes</span>
              <span className="text-red-600">↓ Expected to fall by 5%</span>
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <FaCloud className="text-emerald-500 text-xl" />
            <h3 className="text-lg font-medium">Weather Forecast</h3>
          </div>
          <div className="space-y-4">
            <p>Next 7 days: Moderate rainfall expected</p>
            <p className="text-emerald-600">
              Recommended: Delay pesticide application
            </p>
          </div>
        </div>

        {/* Crop Disease Detection */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <FaBug className="text-emerald-500 text-xl" />
            <h3 className="text-lg font-medium">Disease Detection</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Upload crop images for analysis</span>
              <button className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-lg">
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Crop Recommendations */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <FaRobot className="text-emerald-500 text-xl" />
            <h3 className="text-lg font-medium">Crop Recommendations</h3>
          </div>
          <div className="space-y-4">
            <p>Based on soil analysis and market demand:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Consider planting Soybeans next season</li>
              <li>Rotate with pulses for soil health</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
