import React, { useEffect, useState } from 'react';
import { 
  FileText, Brain, Briefcase, TrendingUp, Award, 
  ChevronRight, Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import studentService from '../../services/studentService';
import SkillChart from '../../components/charts/SkillChart';
import Loader from '../../components/common/Loader';

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await studentService.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader />;

  const quickActions = [
    { 
      title: 'Upload Resume', 
      icon: FileText, 
      path: '/student/resume',
      color: 'from-cyan-500 to-blue-500',
      description: 'Get your skills analyzed by AI'
    },
    { 
      title: 'Take Skill Quiz', 
      icon: Brain, 
      path: '/student/quiz',
      color: 'from-purple-500 to-pink-500',
      description: 'Test and validate your skills'
    },
    { 
      title: 'Find Internships', 
      icon: Briefcase, 
      path: '/student/internships',
      color: 'from-green-500 to-emerald-500',
      description: 'AI-matched opportunities'
    },
    { 
      title: 'Skill Gap Analysis', 
      icon: TrendingUp, 
      path: '/student/skill-gap',
      color: 'from-orange-500 to-red-500',
      description: 'Identify areas to improve'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Welcome Back!</h1>
        <p className="text-white/60 mt-1">Here's your learning journey overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Skills Identified</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats?.skillsCount || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-cyan-400/20">
              <Award className="text-cyan-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Quizzes Taken</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats?.quizzesTaken || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-400/20">
              <Brain className="text-purple-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Matched Internships</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats?.matchedInternships || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-400/20">
              <Briefcase className="text-green-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Profile Completion</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats?.profileCompletion || 0}%
              </p>
            </div>
            <div className="p-3 rounded-full bg-orange-400/20">
              <TrendingUp className="text-orange-400" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={action.path} to={action.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card p-6 hover:border-white/40 transition group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} 
                                flex items-center justify-center mb-4`}>
                  <action.icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                  