import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Sidebar from '../components/common/Sidebar';

import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard';
import PostInternship from '../pages/recruiter/PostInternship';
import InternshipList from '../pages/recruiter/InternshipList';
import ShortlistedStudents from '../pages/recruiter/ShortlistedStudents';
import RecruiterProfile from '../pages/recruiter/RecruiterProfile';

const recruiterMenuItems = [
  { name: 'Dashboard', path: '/recruiter/dashboard', icon: 'LayoutDashboard' },
  { name: 'Post Internship', path: '/recruiter/post', icon: 'PlusCircle' },
  { name: 'Internships', path: '/recruiter/internships', icon: 'Briefcase' },
  { name: 'Shortlisted', path: '/recruiter/shortlisted', icon: 'Users' },
  { name: 'Profile', path: '/recruiter/profile', icon: 'User' },
];

export default function RecruiterRoutes() {
  return (
    <ProtectedRoute allowedRoles={['recruiter']}>
      <div className="flex min-h-screen">
        <Sidebar menuItems={recruiterMenuItems} />
        <div className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/dashboard" element={<RecruiterDashboard />} />
            <Route path="/post" element={<PostInternship />} />
            <Route path="/internships" element={<InternshipList />} />
            <Route path="/shortlisted" element={<ShortlistedStudents />} />
            <Route path="/profile" element={<RecruiterProfile />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}