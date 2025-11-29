import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Sidebar from '../components/common/Sidebar';

import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import DatasetManagement from '../pages/admin/DatasetManagement';
import SystemAnalytics from '../pages/admin/SystemAnalytics';

const adminMenuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
  { name: 'Users', path: '/admin/users', icon: 'Users' },
  { name: 'Datasets', path: '/admin/datasets', icon: 'Database' },
  { name: 'Analytics', path: '/admin/analytics', icon: 'BarChart3' },
];

export default function AdminRoutes() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex min-h-screen">
        <Sidebar menuItems={adminMenuItems} />
        <div className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/datasets" element={<DatasetManagement />} />
            <Route path="/analytics" element={<SystemAnalytics />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}