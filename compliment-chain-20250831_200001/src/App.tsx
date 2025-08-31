import { useState, useEffect } from 'react';
import { Heart, Send, Star, Users, Sparkles } from 'lucide-react';
import { useStore } from './store/useStore';
import ComplimentCard from './components/ComplimentCard';
import ComplimentInput from './components/ComplimentInput';
import StatsPanel from './components/StatsPanel';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

function App() {
  const { compliments, selectedCategory, updateStats } = useStore();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    updateStats();
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, [updateStats]);

  const filteredCompliments = selectedCategory === 'all'
    ? compliments
    : compliments.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-cyan-50">
      {/* Welcome Animation */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary to-accent animate-fade-in">
          <div className="text-center text-white">
            <Heart className="w-20 h-20 mx-auto mb-4 animate-pulse-slow" fill="white" />
            <h1 className="text-4xl font-bold mb-2">Compliment Chain</h1>
            <p className="text-lg opacity-90">익명으로 전하는 따뜻한 마음</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary animate-float" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Compliment Chain
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-6 h-6 text-dark" />
              <span className="text-sm font-medium text-dark">익명 모드</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Stats Panel */}
        <StatsPanel />

        {/* Input Section */}
        <ComplimentInput />

        {/* Category Filter */}
        <CategoryFilter />

        {/* Compliments Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark flex items-center">
              <Star className="w-5 h-5 mr-2 text-primary" />
              최근 칭찬들
            </h2>
            <span className="text-sm text-gray-500">
              총 {filteredCompliments.length}개의 따뜻한 메시지
            </span>
          </div>

          {filteredCompliments.length === 0 ? (
            <div className="text-center py-12">
              <Send className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">첫 번째 칭찬을 남겨주세요!</p>
              <p className="text-sm text-gray-400 mt-2">
                당신의 따뜻한 한마디가 누군가에게 큰 힘이 됩니다
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompliments.map((compliment) => (
                <ComplimentCard key={compliment.id} compliment={compliment} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            오늘도 누군가에게 따뜻한 말 한마디를 전해보세요 💛
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;