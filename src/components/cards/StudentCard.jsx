import React from 'react';
import { User, Mail, MapPin, Award, ExternalLink } from 'lucide-react';

export default function StudentCard({ student, onView, onShortlist }) {
  const { name, email, location, skills, matchScore, avatar } = student;

  return (
    <div className="glass-card p-6 hover:border-cyan-400/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User size={28} className="text-white" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
          <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
            <Mail size={14} />
            <span className="truncate">{email}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Match Score */}
        {matchScore !== undefined && (
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              matchScore >= 80 ? 'text-green-400' :
              matchScore >= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {matchScore}%
            </div>
            <p className="text-white/50 text-xs">Match</p>
          </div>
        )}
      </div>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Award size={14} className="text-cyan-400" />
            <span className="text-white/60 text-sm">Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs"
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">
                +{skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
        <button
          onClick={() => onView?.(student)}
          className="flex-1 btn-outline py-2 text-sm flex items-center justify-center gap-2"
        >
          <ExternalLink size={16} />
          View Profile
        </button>
        <button
          onClick={() => onShortlist?.(student)}
          className="flex-1 btn-primary py-2 text-sm"
        >
          Shortlist
        </button>
      </div>
    </div>
  );
}