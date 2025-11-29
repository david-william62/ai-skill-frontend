import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/';
    const paths = {
      student: '/student/dashboard',
      recruiter: '/recruiter/dashboard',
      admin: '/admin/dashboard',
    };
    return paths[user.role] || '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-200/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              SkillMatcher
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/70 hover:text-cyan-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <User size={18} />
                  <span className="text-sm">{user?.name || 'User'}</span>
                  <ChevronDown size={16} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-dark-200 rounded-lg border border-white/20 shadow-xl">
                    <Link
                      to={getDashboardPath()}
                      className="block px-4 py-2 text-white/70 hover:bg-white/10 hover:text-cyan-400"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-white/70 hover:bg-white/10 hover:text-red-400 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm py-2 px-4">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-200 border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-white/70 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="block py-2 text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="block py-2 text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}