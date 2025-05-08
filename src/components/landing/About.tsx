import React from "react";
import { FaRobot, FaHandshake } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";

const About: React.FC = () => {
  const { translations } = useLanguage();
  const { about } = translations;

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white to-emerald-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left side: Image */}
          <div className="relative mb-12 lg:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Traditional farming with bullocks"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Right side: Content */}
          <div className="lg:pl-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {about.title}
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              {about.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex-shrink-0">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <FaHandshake className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {about.directConnections.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {about.directConnections.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaRobot className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {about.aiInsights.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {about.aiInsights.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
