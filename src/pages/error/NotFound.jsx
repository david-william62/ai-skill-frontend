import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  AlertCircle,
  Compass,
  HelpCircle
} from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="text-9xl md:text-[200px] font-bold text-blue-600 opacity-20">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass className="text-blue-600 animate-spin-slow" size={100} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-lg text-gray-500">
              It might have been moved or deleted, or you may have mistyped the URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleGoBack}
              className="flex items-center px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </button>
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              <Home size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Looking for something? Try these:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickLink
                to="/internships"
                icon={Search}
                title="Browse Internships"
                description="Explore available opportunities"
              />
              <QuickLink
                to="/about"
                icon={HelpCircle}
                title="About Us"
                description="Learn more about our platform"
              />
              <QuickLink
                to="/contact"
                icon={AlertCircle}
                title="Contact Support"
                description="Get help from our team"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Or search for what you need:
            </h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search internships, companies, or help topics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/internships?search=${e.target.value}`);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 italic">
              "Oops! This page doesn't exist. Let’s get you back on track to find the right opportunities."
            </p>

         
        
        </div>
      </div>
    </div>
  );
};

// Quick Link Component
const QuickLink = ({ to, icon: Icon, title, description }) => (
  <Link
    to={to}
    className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
  >
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
    <p className="text-sm text-gray-600 text-center">{description}</p>
  </Link>
);

export default NotFound;