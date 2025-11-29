// src/pages/recruiter/RecruiterDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, Briefcase, TrendingUp, Eye, MessageSquare, Target, Sparkles, ArrowRight } from "lucide-react";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState([]);
  const [topCandidates, setTopCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recruiter/dashboard");
      setStats(res.data.stats || []);
      setTopCandidates(res.data.topCandidates || []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">
            Recruiter Command Center
          </h1>
          <p className="text-white/70 text-lg">Find your next superstar intern with AI precision</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-3 mb-4`}>
                {stat.label === "Active Internships" && <Briefcase className="w-full h-full text-white" />}
                {stat.label === "Applications Received" && <Users className="w-full h-full text-white" />}
                {stat.label === "Shortlisted Candidates" && <Target className="w-full h-full text-white" />}
                {stat.label === "Profile Views" && <Eye className="w-full h-full text-white" />}
              </div>

              <p className="text-white/70 text-sm">{stat.label}</p>
              <p className="text-4xl font-bold text-white mt-2">{stat.value}</p>

              <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                <TrendingUp size={16} /> {stat.change}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Top Candidates */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Sparkles className="text-yellow-400" />
                  AI-Recommended Candidates
                </h2>
                <span className="text-cyan-400 text-sm">Updated just now</span>
              </div>

              <div className="space-y-5">
                {topCandidates.map((candidate, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                          {candidate.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{candidate.name}</h3>
                          <p className="text-white/70">{candidate.role}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold text-cyan-400">{candidate.match}%</div>
                        <p className="text-xs text-white/60">Match Score</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {candidate.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-white/60 text-sm">Applied {candidate.applied}</span>

                      <div className="flex gap-3">
                        <button className="px-5 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition font-medium">
                          View Profile
                        </button>
                        <button className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition font-medium flex items-center gap-2">
                          Shortlist <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="backdrop-blur-xl bg-gradient-to-b from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 rounded-2xl p-8 h-full"
            >
              <h2 className="text-2xl font-bold text-white mb-8">Quick Actions</h2>

              <div className="space-y-4">
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-semibold transition flex items-center justify-center gap-3">
                  <Briefcase /> Post New Internship
                </button>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-semibold transition flex items-center justify-center gap-3">
                  <Users /> View All Applications
                </button>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-semibold transition flex items-center justify-center gap-3">
                  <MessageSquare /> Chat with Candidates
                </button>
                <button className="w-full py-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-black rounded-xl font-bold hover:scale-105 transition shadow-xl">
                  Go to Shortlisted
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
