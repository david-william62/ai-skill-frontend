import React from 'react';
import { Building2, MapPin, Clock, DollarSign, Calendar, ArrowRight } from 'lucide-react';

export default function InternshipCard({ internship, onApply, onView, showMatchScore = false }) {
  const {
    title,
    company,
    location,
    type,
    duration,
    stipend,
    skills,
    matchScore,
    postedAt,
    deadline,
  } = internship;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="glass-card p-6 hover:border-cyan-400/50 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-white/60 mt-1">
            <Building2 size={14} />
            <span>{company}</span>
          </div>
        </div>
        
        {showMatchScore && matchScore !== undefined && (
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            matchScore >= 80 ? 'bg-green-500/20 text-green-400' :
            matchScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {matchScore}% Match
          </div>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Clock size={14} />
          <span>{duration}</span>
        </div>
        {stipend && (
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <DollarSign size={14} />
            <span>{stipend}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Calendar size={14} />
          <span>{type}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills?.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs"
          >
            {skill}
          </span>
        ))}
        {skills?.length > 4 && (
          <span className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs">
            +{skills.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-white/50 text-xs">
          {deadline ? `Apply by ${formatDate(deadline)}` : `Posted ${formatDate(postedAt)}`}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onView?.(internship)}
            className="px-4 py-2 text-sm text-white/70 hover:text-cyan-400 transition"
          >
            Details
          </button>
          <button
            onClick={() => onApply?.(internship)}
            className="px-4 py-2 text-sm bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition flex items-center gap-1"
          >
            Apply <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
} 