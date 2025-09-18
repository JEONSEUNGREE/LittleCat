import React from 'react';
import { useMoodStore } from '../store/useMoodStore';
import { Clock, Wifi, WifiOff, Coffee } from 'lucide-react';
import { Friend } from '../types';

const getStatusIcon = (status: Friend['status']) => {
  switch (status) {
    case 'online':
      return <Wifi size={12} className="text-green-400" />;
    case 'away':
      return <Coffee size={12} className="text-yellow-400" />;
    case 'offline':
      return <WifiOff size={12} className="text-gray-400" />;
  }
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
};

export const FriendsList: React.FC = () => {
  const { friends } = useMoodStore();
  
  const sortedFriends = [...friends].sort((a, b) => {
    const statusOrder = { online: 0, away: 1, offline: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl">
      <h2 className="text-white text-lg sm:text-xl font-bold mb-4">
        친구들의 무드
      </h2>
      
      <div className="space-y-3">
        {sortedFriends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 
                     transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center 
                           justify-center text-2xl sm:text-3xl shadow-lg"
                  style={{
                    background: friend.currentMood?.gradient || 
                              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {friend.currentMood ? friend.currentMood.emoji : friend.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1">
                  {getStatusIcon(friend.status)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{friend.name}</h3>
                  {friend.currentMood && (
                    <span className="text-white/80 text-sm bg-white/10 px-2 py-0.5 rounded-full">
                      {friend.currentMood.name}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1 mt-1 text-white/60 text-xs">
                  <Clock size={10} />
                  <span>{getTimeAgo(friend.lastUpdate)}</span>
                </div>
                
                {friend.moodHistory[0]?.message && (
                  <p className="text-white/80 text-sm mt-2 italic">
                    "{friend.moodHistory[0].message}"
                  </p>
                )}
              </div>
              
              <div
                className="w-3 h-3 rounded-full animate-pulse-slow"
                style={{
                  background: friend.currentMood?.gradient || 'transparent',
                }}
              />
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/10 group-hover:border-white/20 
                          transition-all duration-300">
              <div className="flex gap-2 overflow-x-auto">
                {friend.moodHistory.slice(0, 5).map((entry, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-lg flex items-center justify-center 
                             text-sm opacity-60 hover:opacity-100 transition-opacity"
                    style={{
                      background: entry.mood.gradient,
                      transform: `scale(${1 - index * 0.1})`,
                    }}
                  >
                    {entry.mood.emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};