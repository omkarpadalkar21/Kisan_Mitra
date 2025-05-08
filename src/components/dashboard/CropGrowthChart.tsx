import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

const CropGrowthChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <XAxis
          dataKey="day"
          label={{
            value: "Days",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          label={{
            value: "Growth (cm)",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <Area
          type="monotone"
          dataKey="Tomatoes Field"
          stroke="#ef4444"
          fill="#fee2e2"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Chili Field"
          stroke="#22c55e"
          fill="#dcfce7"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Potatoes Field"
          stroke="#eab308"
          fill="#fef3c7"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Onion Field"
          stroke="#06b6d4"
          fill="#cffafe"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CropGrowthChart;
