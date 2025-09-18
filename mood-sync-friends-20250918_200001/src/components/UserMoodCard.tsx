import React from 'react';
import { useMoodStore } from '../store/useMoodStore';
import { User, Heart, TrendingUp, Calendar } from 'lucide-react';

export const UserMoodCard: React.FC = () => {
  const { user } = useMoodStore();
  
  const getMoodStreakDays = () => {
    if (user.moodHistory.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    for (let i = 0; i < user.moodHistory.length; i++) {
      const entryDate = new Date(user.moodHistory[i].timestamp);
      entryDate.setHours(0, 0, 0, 0);
      
      const dayDiff = Math.floor(
        (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (dayDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg sm:text-xl font-bold flex items-center gap-2">
          <User size={20} />
          나의 무드
        </h2>
        {user.currentMood && (
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            <Heart size={14} className="text-pink-300" />
            <span className="text-white text-sm">공유중</span>
          </div>
        )}
      </div>
      
      {user.currentMood ? (
        <div>
          <div
            className="rounded-2xl p-6 sm:p-8 text-center shadow-lg animate-mood-wave"
            style={{ background: user.currentMood.gradient }}
          >
            <div className="text-5xl sm:text-6xl mb-3">
              {user.currentMood.emoji}
            </div>
            <h3 className="text-white text-xl sm:text-2xl font-bold">
              {user.currentMood.name}
            </h3>
            {user.moodHistory[0]?.message && (
              <p className="text-white/90 text-sm sm:text-base mt-3 italic">
                "{user.moodHistory[0].message}"
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp size={16} className="text-green-300" />
                <span className="text-white/60 text-xs">연속 기록</span>
              </div>
              <span className="text-white text-xl font-bold">
                {getMoodStreakDays()}일
              </span>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar size={16} className="text-blue-300" />
                <span className="text-white/60 text-xs">총 기록</span>
              </div>
              <span className="text-white text-xl font-bold">
                {user.moodHistory.length}개
              </span>
            </div>
          </div>
          
          {user.moodHistory.length > 1 && (
            <div className="mt-4">
              <h4 className="text-white/80 text-sm mb-2">최근 무드</h4>
              <div className="flex gap-2 overflow-x-auto">
                {user.moodHistory.slice(1, 6).map((entry, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center 
                             justify-center text-lg opacity-70 hover:opacity-100 
                             transition-all duration-200 cursor-pointer"
                    style={{ background: entry.mood.gradient }}
                    title={`${entry.mood.name} - ${new Date(
                      entry.timestamp
                    ).toLocaleDateString()}`}
                  >
                    {entry.mood.emoji}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 opacity-50">🤔</div>
          <p className="text-white/60 text-sm sm:text-base">
            아직 오늘의 기분을 선택하지 않았어요
          </p>
          <p className="text-white/40 text-xs sm:text-sm mt-2">
            위에서 현재 기분을 선택해주세요
          </p>
        </div>
      )}
    </div>
  );
};