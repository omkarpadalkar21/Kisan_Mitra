import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const { translations } = useLanguage();
  const { hero } = translations;

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            {hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-500 transition duration-300"
            >
              {hero.joinButton}
            </Link>
            <Link
              to="/#about"
              className="w-full sm:w-auto border-2 border-emerald-400 text-emerald-400 px-8 py-3 rounded-md hover:bg-emerald-400 hover:text-white transition duration-300"
            >
              {hero.learnButton}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
