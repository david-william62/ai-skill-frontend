import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Sidebar from '../components/common/Sidebar';

import StudentDashboard from '../pages/student/StudentDashboard';
import ResumeUpload from '../pages/student/ResumeUpload';
import SkillQuiz from '../pages/student/SkillQuiz';
import QuizResult from '../pages/student/QuizResult';
import InternshipRecommendations from '../pages/student/InternshipRecommendations';
import SkillGapAnalysis from '../pages/student/SkillGapAnalysis';
import StudentProfile from '../pages/student/StudentProfile';

const studentMenuItems = [
  { name: 'Dashboard', path: '/student/dashboard', icon: 'LayoutDashboard' },
  { name: 'Upload Resume', path: '/student/resume', icon: 'FileUp' },
  { name: 'Skill Quiz', path: '/student/quiz', icon: 'Brain' },
  { name: 'Recommendations', path: '/student/recommendations', icon: 'Briefcase' },
  { name: 'Skill Gap', path: '/student/skill-gap', icon: 'TrendingUp' },
  { name: 'Profile', path: '/student/profile', icon: 'User' },
];

export default function StudentRoutes() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <div className="flex min-h-screen">
        <Sidebar menuItems={studentMenuItems} />
        <div className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/quiz" element={<SkillQuiz />} />
            <Route path="/quiz-result" element={<QuizResult />} />
            <Route path="/recommendations" element={<InternshipRecommendations />} />
            <Route path="/skill-gap" element={<SkillGapAnalysis />} />
            <Route path="/profile" element={<StudentProfile />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}