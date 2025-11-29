import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  ArrowLeft, 
  Home,
  LogIn,
  AlertTriangle,
  Mail
} from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="text-center">
          {/* 403 Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="text-9xl md:text-[200px] font-bold text-red-600 opacity-20">
                403
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="text-red-600 animate-pulse" size={100} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lock className="text-red-600 mr-3" size={40} />
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Access Denied
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              You don't have permission to access this page.
            </p>
            <p className="text-lg text-gray-500">
              This area is restricted to authorized users only.
            </p>
          </div>

          {/* Warning Alert */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 text-left rounded-lg shadow-md">
            <div className="flex items-start">
              <AlertTriangle className="text-yellow-400 mr-3 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Why am I seeing this?
                </h3>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• You may not be logged in to your account</li>
                  <li>• Your account doesn't have the required permissions</li>
                  <li>• The page requires a different user role (Student/Recruiter/Admin)</li>
                  <li>• Your session may have expired</li>
                </ul>
              </div>
            </div>
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
            {!isLoggedIn && (
              <Link
                to="/login"
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                <LogIn size={20} className="mr-2" />
                Login
              </Link>
            )}
          </div>

          {/* Solutions Grid */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              What you can do:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!isLoggedIn ? (
                <>
                  <SolutionCard
                    icon={LogIn}
                    title="Login to Your Account"
                    description="Access your personalized dashboard and features"
                    action="Login"
                    to="/login"
                    color="blue"
                  />
                  <SolutionCard
                    icon={Shield}
                    title="Create an Account"
                    description="Join thousands of students and recruiters"
                    action="Sign Up"
                    to="/register"
                    color="green"
                  />
                </>
              ) : (
                <>
                  <SolutionCard
                    icon={Home}
                    title="Go to Your Dashboard"
                    description="Access your personalized homepage"
                    action="Dashboard"
                    to="/dashboard"
                    color="blue"
                  />
                  <SolutionCard
                    icon={Shield}
                    title="Switch Account"
                    description="Login with a different account"
                    action="Logout & Switch"
                    onClick={handleLogout}
                    color="orange"
                  />
                </>
              )}
              <SolutionCard
                icon={Mail}
                title="Contact Support"
                description="Get help from our support team"
                action="Contact Us"
                to="/contact"
                color="purple"
              />
              <SolutionCard
                icon={AlertTriangle}
                title="Report Issue"
                description="Let us know if something's wrong"
                action="Report"
                to="/contact?type=issue"
                color="red"
              />
            </div>
          </div>

          {/* Role Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Understanding User Roles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <RoleCard
                title="Students"
                description="Browse internships, apply to opportunities, and manage applications"
                features={[
                  'Search internships',
                  'Apply to positions',
                  'Track applications',
                  'Build profile'
                ]}
                color="blue"
              />
              <RoleCard
                title="Recruiters"
                description="Post internships, review applications, and find talent"
                features={[
                  'Post opportunities',
                  'Review candidates',
                  'Shortlist applicants',
                  'Manage listings'
                ]}
                color="green"
              />
              <RoleCard
                title="Admins"
                description="Manage platform, users, and system settings"
                features={[
                  'User management',
                  'System analytics',
                  'Content moderation',
                  'Platform settings'
                ]}
                color="purple"
              />
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Need Additional Help?</h4>
            <p className="text-gray-600 mb-4">
              If you believe you should have access to this page, please contact our support team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <Mail size={18} className="mr-2" />
              Contact Support Team
            </Link>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 italic">
            "With great power comes great responsibility... and proper authentication!" 🔐
          </p>
        </div>
      </div>
    </div>
  );
};

// Solution Card Component
const SolutionCard = ({ icon: Icon, title, description, action, to, onClick, color }) => {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100',
    green: 'border-green-500 bg-green-50 text-green-600 hover:bg-green-100',
    orange: 'border-orange-500 bg-orange-50 text-orange-600 hover:bg-orange-100',
    purple: 'border-purple-500 bg-purple-50 text-purple-600 hover:bg-purple-100',
    red: 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
  };

  const content = (
    <>
      <div className={`${colorClasses[color]} p-3 rounded-full mb-4 inline-block transition-colors`}>
        <Icon size={24} />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <span className={`inline-block px-4 py-2 ${colorClasses[color]} rounded-lg font-semibold text-sm transition-colors`}>
        {action}
      </span>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="flex flex-col items-center p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all text-center"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all text-center w-full"
    >
      {content}
    </button>
  );
};

// Role Card Component
const RoleCard = ({ title, description, features, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className={`inline-block px-3 py-1 ${colorClasses[color]} rounded-full text-sm font-semibold mb-3`}>
        {title}
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Unauthorized;