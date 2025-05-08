import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: 1,
    "Tomatoes Field": 3.2,
    "Chili Field": 2.8,
    "Potatoes Field": 2.3,
    "Onion Field": 1.5,
  },
  {
    day: 5,
    "Tomatoes Field": 4.1,
    "Chili Field": 3.2,
    "Potatoes Field": 2.8,
    "Onion Field": 1.8,
  },
  {
    day: 10,
    "Tomatoes Field": 4.8,
    "Chili Field": 3.9,
    "Potatoes Field": 3.2,
    "Onion Field": 2.2,
  },
  {
    day: 15,
    "Tomatoes Field": 5.3,
    "Chili Field": 4.5,
    "Potatoes Field": 3.9,
    "Onion Field": 2.8,
  },
  {
    day: 20,
    "Tomatoes Field": 6.0,
    "Chili Field": 5.2,
    "Potatoes Field": 4.5,
    "Onion Field": 3.2,
  },
];

const CropGrowthChart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Tomatoes Field"
            stackId="1"
            stroke="#ef4444"
            fill="#fee2e2"
          />
          <Area
            type="monotone"
            dataKey="Chili Field"
            stackId="1"
            stroke="#22c55e"
            fill="#dcfce7"
          />
          <Area
            type="monotone"
            dataKey="Potatoes Field"
            stackId="1"
            stroke="#eab308"
            fill="#fef3c7"
          />
          <Area
            type="monotone"
            dataKey="Onion Field"
            stackId="1"
            stroke="#06b6d4"
            fill="#cffafe"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropGrowthChart;
