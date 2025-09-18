import React from 'react';
import { MoodSelector } from './components/MoodSelector';
import { FriendsList } from './components/FriendsList';
import { UserMoodCard } from './components/UserMoodCard';
import { Heart, Users, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br 
                            from-pink-400 to-purple-600 flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </div>
              <h1 className="text-white text-lg sm:text-xl font-bold">
                Mood Sync Friends
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                <Users size={14} className="text-white/80" />
                <span className="text-white/80 text-xs sm:text-sm">4명 온라인</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                <Sparkles size={14} className="text-yellow-300" />
                <span className="text-white/80 text-xs sm:text-sm">실시간 동기화</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MoodSelector />
            <UserMoodCard />
          </div>
          
          <div className="lg:col-span-1">
            <FriendsList />
          </div>
        </div>
        
        <footer className="mt-12 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            친구들과 감정을 공유하고 서로를 이해해보세요 💜
          </p>
          <p className="text-white/40 text-xs mt-2">
            © 2025 Mood Sync Friends. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;