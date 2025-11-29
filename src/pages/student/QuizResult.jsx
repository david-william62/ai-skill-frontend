import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Target, Clock, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";
import MatchScoreChart from "../../components/charts/MatchScoreChart";
import ResultCard from "../../components/cards/ResultCard";

export default function QuizResult() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("quizResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      // Demo data
      setResult({
        category: "Python",
        score: 85,
        correct: 17,
        total: 20,
        timeTaken: "15:30",
      });
    }
  }, []);

  if (!result) return null;

  const getGrade = (score) => {
    if (score >= 90) return { grade: "A+", message: "Outstanding!", color: "text-green-400" };
    if (score >= 80) return { grade: "A", message: "Excellent!", color: "text-green-400" };
    if (score >= 70) return { grade: "B", message: "Good Job!", color: "text-yellow-400" };
    if (score >= 60) return { grade: "C", message: "Keep Practicing", color: "text-yellow-400" };
    return { grade: "D", message: "Needs Improvement", color: "text-red-400" };
  };

  const gradeInfo = getGrade(result.score);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center mb-8">
        <Trophy size={64} className="text-yellow-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h1>
        <p className={`text-xl ${gradeInfo.color}`}>{gradeInfo.message}</p>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
          <MatchScoreChart score={result.score} label="Your Score" />
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <h3 className="text-white/60 mb-4">Performance Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center">
                <Target size={18} className="mr-2" /> Correct
              </span>
              <span className="text-green-400 font-semibold">
                {result.correct}/{result.total}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center">
                <Clock size={18} className="mr-2" /> Time Taken
              </span>
              <span className="text-white font-semibold">{result.timeTaken}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 flex items-center">
                <Trophy size={18} className="mr-2" /> Grade
              </span>
              <span className={`font-bold text-xl ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <h3 className="text-white/60 mb-4">Skill Level</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-cyan-400 mb-2">{result.category}</p>
            <p className="text-white/60">
              {result.score >= 80
                ? "Advanced"
                : result.score >= 60
                ? "Intermediate"
                : "Beginner"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/student/skill-quiz")}
          className="flex items-center justify-center py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition"
        >
          <RefreshCw size={20} className="mr-2" />
          Take Another Quiz
        </button>
        <button
          onClick={() => navigate("/student/skill-gap")}
          className="flex items-center justify-center py-4 bg-cyan-400 text-black rounded-xl font-semibold hover:bg-cyan-300 transition"
        >
          View Skill Gap Analysis
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}