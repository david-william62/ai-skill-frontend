import React from 'react';
import { CheckCircle, XCircle, Clock, Award } from 'lucide-react';

export default function ResultCard({ result }) {
  const { quizName, score, totalQuestions, correctAnswers, timeTaken, completedAt, passed } = result;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`glass-card p-6 border-l-4 ${passed ? 'border-l-green-500' : 'border-l-red-500'}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{quizName}</h3>
          <p className="text-white/50 text-sm">{formatDate(completedAt)}</p>
        </div>
        <div className={`p-2 rounded-full ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          {passed ? (
            <CheckCircle size={24} className="text-green-400" />
          ) : (
            <XCircle size={24} className="text-red-400" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <Award size={20} className="mx-auto mb-1 text-cyan-400" />
          <div className="text-2xl font-bold text-white">{score}%</div>
          <p className="text-white/50 text-xs">Score</p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <CheckCircle size={20} className="mx-auto mb-1 text-green-400" />
          <div className="text-2xl font-bold text-white">
            {correctAnswers}/{totalQuestions}
          </div>
          <p className="text-white/50 text-xs">Correct</p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <Clock size={20} className="mx-auto mb-1 text-yellow-400" />
          <div className="text-2xl font-bold text-white">{formatTime(timeTaken)}</div>
          <p className="text-white/50 text-xs">Time</p>
        </div>
      </div>
    </div>
  );
}