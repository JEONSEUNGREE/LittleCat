import React from 'react';
import { User } from '../types';

interface MoodVisualizationProps {
  users: User[];
  currentUser: User | null;
}

export const MoodVisualization: React.FC<MoodVisualizationProps> = ({ users, currentUser }) => {
  return (
    <div className="relative w-full h-96 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Current user in center */}
        {currentUser?.currentMood && (
          <div className="absolute z-20">
            <div
              className="w-24 h-24 rounded-full animate-pulse-slow flex items-center justify-center"
              style={{
                background: currentUser.currentMood.pattern,
                boxShadow: `0 0 40px ${currentUser.currentMood.color}40`
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentUser.currentMood.color }}
              >
                <span className="text-white text-xs font-bold">나</span>
              </div>
            </div>
          </div>
        )}

        {/* Connected users around */}
        {users.slice(0, 8).map((user, index) => {
          const angle = (index * 360) / 8;
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={user.id}
              className="absolute animate-float"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              {user.currentMood && (
                <div className="group cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{
                      background: user.currentMood.pattern,
                      boxShadow: `0 0 20px ${user.currentMood.color}40`
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: user.currentMood.color }}
                    >
                      <span className="text-white text-xs font-medium">
                        {user.username.slice(0, 2)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white/80 whitespace-nowrap">
                      {user.username}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {currentUser?.currentMood && users.slice(0, 8).map((user, index) => {
          if (!user.currentMood) return null;
          
          const angle = (index * 360) / 8;
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          // Similar mood = stronger connection
          const similarity = currentUser.currentMood.mood === user.currentMood.mood ? 0.5 : 0.2;
          
          return (
            <line
              key={`line-${user.id}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={user.currentMood.color}
              strokeOpacity={similarity}
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
};