import React from "react";
import {
  FaStore,
  FaChartLine,
  FaChartBar,
  FaShieldAlt,
  FaTruck,
  FaRobot,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaStore className="w-8 h-8" />,
      title: "Direct Market Access",
      description: "Sell directly to consumers and retailers.",
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Fair Pricing",
      description: "AI-driven price recommendations.",
    },
    {
      icon: <FaChartBar className="w-8 h-8" />,
      title: "Real-Time Market Insights",
      description: "Get demand and price trends.",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "Safe and transparent payments.",
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Logistics Support",
      description: "Simplified transportation for your produce.",
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: "AI-Powered Crop Recommendations",
      description:
        "Get insights on the best crops to grow based on market demand and soil conditions.",
    },
  ];

  return (
    <section
      id="features"
      className="min-h-screen bg-gray-50 flex items-center py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to grow your farming business
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-emerald-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
