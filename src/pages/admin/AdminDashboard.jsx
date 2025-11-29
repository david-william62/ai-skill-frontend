

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  TrendingUp,
  UserCheck,
  Building,
  Activity,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalRecruiters: 0,
    totalInternships: 0,
    totalApplications: 0,
    activeInternships: 0,
    pendingApplications: 0,
    systemHealth: 100,
    changeUsers: 0,
    changeStudents: 0,
    changeRecruiters: 0,
    changeInternships: 0,
    changeApplications: 0,
  });

  const [userGrowth, setUserGrowth] = useState([]);
  const [applicationStats, setApplicationStats] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');

      const statsResponse = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const statsData = await statsResponse.json();
      setStats(statsData);

      const growthResponse = await fetch('http://localhost:5000/api/admin/analytics/user-growth', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const growthData = await growthResponse.json();
      setUserGrowth(growthData);

      const appStatsResponse = await fetch('http://localhost:5000/api/admin/analytics/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appStatsData = await appStatsResponse.json();
      setApplicationStats(appStatsData);

      const categoryResponse = await fetch('http://localhost:5000/api/admin/analytics/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const categoryData = await categoryResponse.json();
      setCategoryDistribution(categoryData);

      const activitiesResponse = await fetch('http://localhost:5000/api/admin/activities/recent', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const activitiesData = await activitiesResponse.json();
      setRecentActivities(activitiesData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const StatCard = ({ icon: Icon, title, value, change, color, link }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
          <Icon className={color} size={24} />
        </div>

        {change !== undefined && (
          <div className={`flex items-center text-sm font-semibold ${
            change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {change > 0 ? <ArrowUp size={16} /> : change < 0 ? <ArrowDown size={16} /> : null}
            <span className="ml-1">{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>

      {link && (
        <Link to={link} className={`text-sm ${color} hover:underline`}>
          View details →
        </Link>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and analytics</p>
        </div>

        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <Activity className="text-green-600 mr-3" size={20} />
          <div className="flex-1">
            <p className="text-green-800 font-medium">System Status: Operational</p>
            <p className="text-green-600 text-sm">All services running normally</p>
          </div>
          <div className="text-green-600 font-bold text-xl">{stats.systemHealth}%</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats.totalUsers}
            change={stats.changeUsers}
            color="text-blue-600"
            link="/admin/users"
          />

          <StatCard
            icon={UserCheck}
            title="Students"
            value={stats.totalStudents}
            change={stats.changeStudents}
            color="text-green-600"
            link="/admin/users?role=student"
          />

          <StatCard
            icon={Building}
            title="Recruiters"
            value={stats.totalRecruiters}
            change={stats.changeRecruiters}
            color="text-purple-600"
            link="/admin/users?role=recruiter"
          />

          <StatCard
            icon={Briefcase}
            title="Active Internships"
            value={stats.activeInternships}
            change={stats.changeInternships}
            color="text-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={FileText}
            title="Total Applications"
            value={stats.totalApplications}
            change={stats.changeApplications}
            color="text-indigo-600"
          />

          <StatCard
            icon={AlertCircle}
            title="Pending Applications"
            value={stats.pendingApplications}
            color="text-yellow-600"
          />

          <StatCard
            icon={TrendingUp}
            title="Total Internships"
            value={stats.totalInternships}
            color="text-pink-600"
          />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
