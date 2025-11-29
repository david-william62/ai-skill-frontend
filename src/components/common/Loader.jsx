import React from 'react';

export default function Loader({ size = 'md', fullScreen = false }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const spinner = (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-100/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}