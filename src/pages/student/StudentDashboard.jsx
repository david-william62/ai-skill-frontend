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
        setStats(response);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader />;

  const fallbackStats = {
    skillsCount: 24,
    quizzesTaken: 6,
    matchedInternships: 3,
    profileCompletion: 78,
    skills: [
      { name: 'Python', level: 85 },
      { name: 'React', level: 72 },
      { name: 'Machine Learning', level: 58 },
      { name: 'SQL', level: 80 },
      { name: 'Communication', level: 90 },
    ],
    learningPlan: [
      { title: 'Complete ML quiz', eta: 'Due today', progress: 70 },
      { title: 'Update resume highlights', eta: 'Due in 2 days', progress: 45 },
      { title: 'Finish React project', eta: 'Due in 1 week', progress: 20 },
    ],
    upcomingSessions: [
      { title: 'AI Webinar with TechCorp', time: 'Tomorrow · 5:00 PM' },
      { title: 'Mock Interview', time: 'Friday · 3:30 PM' },
    ],
    recentApplications: [
      { role: 'Frontend Developer Intern', company: 'DesignHub', status: 'Submitted', time: '2h ago' },
      { role: 'Data Analyst Intern', company: 'DataInsights', status: 'Shortlisted', time: '1d ago' },
      { role: 'ML Engineer Intern', company: 'VisionAI', status: 'In Review', time: '3d ago' },
    ],
  };

  const dashboardStats = stats || fallbackStats;
  const skillOverview = dashboardStats.skills || fallbackStats.skills;
  const learningPlan = dashboardStats.learningPlan || fallbackStats.learningPlan;
  const upcomingSessions = dashboardStats.upcomingSessions || fallbackStats.upcomingSessions;
  const recentApplications = dashboardStats.recentApplications || fallbackStats.recentApplications;

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
                {dashboardStats.skillsCount || 0}
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
                {dashboardStats.quizzesTaken || 0}
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
                {dashboardStats.matchedInternships || 0}
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
                {dashboardStats.profileCompletion || 0}%
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
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                  {action.title}
                </h3>
                <p className="text-sm text-white/60 mb-4">{action.description}</p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  Start
                  <ChevronRight size={16} className="ml-2" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Skill Insights & Learning Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkillChart skills={skillOverview} title="Skill Proficiency Radar" />
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Personalized Learning Path</h3>
          {learningPlan.map((item, index) => (
            <div key={item.title} className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium">{item.title}</p>
                <span className="text-white/50 text-sm">{item.eta}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Upcoming Sessions</h3>
          {upcomingSessions.map((session) => (
            <div key={session.title} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <p className="text-white font-medium">{session.title}</p>
                <p className="text-white/50 text-sm flex items-center">
                  <Clock size={14} className="mr-2" />
                  {session.time}
                </p>
              </div>
              <span className="text-cyan-400 text-sm font-semibold">Remind me</span>
            </div>
          ))}
        </div>
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Recent Applications</h3>
          {recentApplications.map((application) => (
            <div key={`${application.role}-${application.company}`} className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{application.role}</p>
                  <p className="text-white/60 text-sm">{application.company}</p>
                </div>
                <span className="text-sm text-white/60">{application.time}</span>
              </div>
              <p className="mt-2 text-cyan-400 text-sm font-semibold">{application.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
