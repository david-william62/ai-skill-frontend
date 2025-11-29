import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, GraduationCap,
  Edit2, Save, Upload, Sparkles,
  Award, Target, TrendingUp
} from "lucide-react";
import { StudentContext } from "../../context/StudentContext";

const StudentProfile = () => {
  const { student } = useContext(StudentContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading student profile...
      </div>
    );
  }

  const overallMatchRate = student.overallMatchRate || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-white/70 text-lg">
            Personalized profile from your login & resume
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT CARD */}
          <div className="space-y-6">
            <div className="glass-card p-8 text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-5xl font-bold text-cyan-400">
                    {student.name?.split(" ").map(n => n[0]).join("")}
                  </div>
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-8 bg-cyan-500 p-3 rounded-full">
                    <Upload size={20} />
                  </button>
                )}
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">{student.name}</h2>
              <p className="text-cyan-400 mb-5">{student.branch}</p>

              <div className="space-y-3 text-left text-white/80">
                <p className="flex items-center gap-2"><Mail size={16} /> {student.email}</p>
                <p className="flex items-center gap-2"><Phone size={16} /> {student.phone}</p>
                <p className="flex items-center gap-2"><MapPin size={16} /> {student.location}</p>
                <p className="flex items-center gap-2"><GraduationCap size={16} /> {student.college}</p>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-bold text-cyan-400">{student.resumeScore}</div>
                <p className="text-white/60 text-sm">Resume Score</p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary mt-6 w-full flex justify-center gap-2"
              >
                {isEditing ? <><Save size={18}/> Save</> : <><Edit2 size={18}/> Edit</>}
              </button>
            </div>

            {/* STATS */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-cyan-400"/> Performance
              </h3>

              <p className="text-white">Applications: <span className="text-cyan-400">{student.totalApplications}</span></p>
              <p className="text-white mt-2">Interviews: <span className="text-cyan-400">{student.interviewsSecured}</span></p>
              <p className="text-white mt-2">Match Rate: <span className="text-purple-400">{overallMatchRate}%</span></p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* BIO */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Sparkles className="text-purple-400" /> About Me
              </h3>
              <p className="text-white/80 text-lg">{student.bio}</p>
            </div>

            {/* SKILLS */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {student.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award className="text-yellow-400" /> Achievements
              </h3>
              {student.achievements?.map((a, i) => (
                <p key={i} className="text-white/80">• {a}</p>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card p-10 inline-block">
            <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">
              You are Internship Ready!
            </h2>
            <button className="btn-primary">
              View Matching Internships
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;
