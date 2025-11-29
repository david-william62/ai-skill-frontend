import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileUp, Brain, Briefcase, TrendingUp, User,
  PlusCircle, Users, Database, BarChart3, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const iconMap = {
  LayoutDashboard,
  FileUp,
  Brain,
  Briefcase,
  TrendingUp,
  User,
  PlusCircle,
  Users,
  Database,
  BarChart3,
};

export default function Sidebar({ menuItems }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-dark-200 border-r border-white/10 flex flex-col">
      {/* User Info */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{user?.name || 'User'}</h3>
            <p className="text-white/50 text-sm capitalize">{user?.role || 'Guest'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-400'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}