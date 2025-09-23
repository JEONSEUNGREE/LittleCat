
import { Hand, Trophy, Zap, Home } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  const { userProgress, isLearning } = useAppStore();

  return (
    <header className="glass-effect rounded-2xl p-4 mb-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hand className="w-8 h-8 text-yellow-300 animate-pulse-slow" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">수화 트레이너</h1>
            <p className="text-xs sm:text-sm opacity-90">Sign Language Trainer</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          {isLearning && (
            <button
              onClick={onHomeClick}
              className="p-2 rounded-lg glass-effect hover:bg-white/20 transition-all"
              aria-label="홈으로"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold">Lv.{userProgress.level}</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
            <Zap className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-semibold">{userProgress.xp} XP</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
          style={{
            width: `${(userProgress.completedLessons / userProgress.totalLessons) * 100}%`,
          }}
        />
      </div>
      <p className="text-xs text-center mt-1 opacity-80">
        {userProgress.completedLessons}/{userProgress.totalLessons} 레슨 완료
      </p>
    </header>
  );
};

export default Header;