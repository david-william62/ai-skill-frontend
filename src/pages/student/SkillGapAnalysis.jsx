import React, { useEffect, useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BookOpen, 
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useStudent } from "../../context/StudentContext";
import SkillChart from "../../components/charts/SkillChart";
import MatchScoreChart from "../../components/charts/MatchScoreChart";
import Loader from "../../components/common/Loader";

const DEFAULT_ANALYSIS = {
  overallScore: 72,
  currentSkills: [
    { name: "Python", level: 85, status: "strong" },
    { name: "JavaScript", level: 75, status: "strong" },
    { name: "React", level: 70, status: "moderate" },
    { name: "Machine Learning", level: 45, status: "weak" },
    { name: "SQL", level: 80, status: "strong" },
    { name: "Docker", level: 30, status: "weak" },
    { name: "AWS", level: 25, status: "weak" },
    { name: "Git", level: 90, status: "strong" },
  ],
  targetRole: "Machine Learning Engineer",
  requiredSkills: [
    { name: "Python", required: 90, current: 85, gap: 5 },
    { name: "Machine Learning", required: 85, current: 45, gap: 40 },
    { name: "TensorFlow/PyTorch", required: 80, current: 30, gap: 50 },
    { name: "SQL", required: 70, current: 80, gap: -10 },
    { name: "Docker", required: 60, current: 30, gap: 30 },
    { name: "AWS/Cloud", required: 50, current: 25, gap: 25 },
  ],
  recommendations: [
    {
      skill: "Machine Learning",
      priority: "High",
      resources: [
        { name: "Andrew Ng's ML Course", type: "Course", link: "#" },
        { name: "Hands-On ML Book", type: "Book", link: "#" },
      ],
    },
    {
      skill: "TensorFlow/PyTorch",
      priority: "High",
      resources: [
        { name: "TensorFlow Official Tutorial", type: "Tutorial", link: "#" },
        { name: "PyTorch Deep Learning", type: "Course", link: "#" },
      ],
    },
    {
      skill: "Docker",
      priority: "Medium",
      resources: [
        { name: "Docker for Beginners", type: "Course", link: "#" },
        { name: "Docker Documentation", type: "Docs", link: "#" },
      ],
    },
  ],
};

export default function SkillGapAnalysis() {
  const { skillGap, loading, fetchSkillGap } = useStudent();
  const [selectedRole, setSelectedRole] = useState("ml-engineer");

  useEffect(() => {
    fetchSkillGap(selectedRole);
  }, [fetchSkillGap, selectedRole]);

  const analysisData = skillGap || DEFAULT_ANALYSIS;

  const roles = [
    { id: "ml-engineer", name: "ML Engineer" },
    { id: "frontend", name: "Frontend Developer" },
    { id: "backend", name: "Backend Developer" },
    { id: "fullstack", name: "Full Stack Developer" },
    { id: "data-analyst", name: "Data Analyst" },
  ];

  if (loading) return <Loader size="lg" text="Analyzing your skills..." />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <TrendingUp className="mr-3 text-cyan-400" />
          Skill Gap Analysis
        </h1>
        <p className="text-white/60">
          Compare your skills with industry requirements and get personalized learning paths.
        </p>
      </div>

      {/* Role Selector */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Select Target Role:</h3>
        <div className="flex flex-wrap gap-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-4 py-2 rounded-full transition ${
                selectedRole === role.id
                  ? "bg-cyan-400 text-black font-semibold"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Readiness */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 flex flex-col items-center">
          <MatchScoreChart 
            score={analysisData.overallScore} 
            label="Job Readiness" 
          />
          <p className="text-white/60 mt-4 text-center">
            {analysisData.overallScore >= 80
              ? "You're highly qualified!"
              : analysisData.overallScore >= 60
              ? "Good progress, keep learning!"
              : "Focus on improving key skills"}
          </p>
        </div>

        {/* Strong Skills */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="text-green-400 mr-2" />
            <h3 className="text-white font-semibold">Strong Skills</h3>
          </div>
          <div className="space-y-2">
            {analysisData.currentSkills
              .filter((s) => s.status === "strong")
              .map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-green-400 font-semibold">{skill.level}%</span>
                </div>
              ))}
          </div>
        </div>

        {/* Skills to Improve */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-yellow-400 mr-2" />
            <h3 className="text-white font-semibold">Needs Improvement</h3>
          </div>
          <div className="space-y-2">
            {analysisData.currentSkills
              .filter((s) => s.status === "weak")
              .map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-red-400 font-semibold">{skill.level}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Skill Gap Visualization */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
          <Target className="mr-2 text-cyan-400" />
          Skill Gap for {analysisData.targetRole}
        </h3>
        <div className="space-y-6">
          {analysisData.requiredSkills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-white">{skill.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-white/60 text-sm">
                    Current: <span className="text-cyan-400">{skill.current}%</span>
                  </span>
                  <span className="text-white/60 text-sm">
                    Required: <span className="text-purple-400">{skill.required}%</span>
                  </span>
                  {skill.gap > 0 ? (
                    <span className="text-red-400 text-sm flex items-center">
                      <TrendingDown size={14} className="mr-1" />
                      -{skill.gap}%
                    </span>
                  ) : (
                    <span className="text-green-400 text-sm flex items-center">
                      <TrendingUp size={14} className="mr-1" />
                      +{Math.abs(skill.gap)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                {/* Current Level */}
                <div
                  className="absolute h-full bg-cyan-400 rounded-full"
                  style={{ width: `${skill.current}%` }}
                ></div>
                {/* Required Level Marker */}
                <div
                  className="absolute h-full w-1 bg-purple-400"
                  style={{ left: `${skill.required}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-8 mt-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-cyan-400 rounded mr-2"></div>
            <span className="text-white/60">Your Current Level</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-purple-400 mr-2"></div>
            <span className="text-white/60">Required Level</span>
          </div>
        </div>
      </div>

      {/* Learning Recommendations */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
          <BookOpen className="mr-2 text-cyan-400" />
          Personalized Learning Path
        </h3>
        <div className="space-y-6">
          {analysisData.recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-5 border-l-4 border-cyan-400"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold text-lg">{rec.skill}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    rec.priority === "High"
                      ? "bg-red-500/20 text-red-400"
                      : rec.priority === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {rec.priority} Priority
                </span>
              </div>
              <div className="space-y-2">
                {rec.resources.map((resource, rIndex) => (
                  <a
                    key={rIndex}
                    href={resource.link}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition group"
                  >
                    <div>
                      <p className="text-white group-hover:text-cyan-400 transition">
                        {resource.name}
                      </p>
                      <p className="text-white/40 text-sm">{resource.type}</p>
                    </div>
                    <ExternalLink size={18} className="text-white/40 group-hover:text-cyan-400" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}