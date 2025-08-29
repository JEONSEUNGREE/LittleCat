
import { Sparkles, RotateCcw, HelpCircle } from 'lucide-react';

interface HeaderProps {
  score: number;
  discoveredCount: number;
  totalRecipes: number;
  onReset: () => void;
  onHint: () => void;
}

const Header: React.FC<HeaderProps> = ({ score, discoveredCount, totalRecipes, onReset, onHint }) => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm p-4 rounded-xl mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse-slow" />
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Emoji Alchemy
          </h1>
        </div>
        
        <div className="flex items-center gap-4 text-sm sm:text-base">
          <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2">
            <span className="text-xs text-gray-300">Score</span>
            <span className="font-bold text-yellow-400">{score}</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2">
            <span className="text-xs text-gray-300">Discovered</span>
            <span className="font-bold text-green-400">{discoveredCount}/{totalRecipes}</span>
          </div>
          
          <button
            onClick={onHint}
            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
            aria-label="Get hint"
          >
            <HelpCircle className="w-5 h-5 text-blue-400" />
          </button>
          
          <button
            onClick={onReset}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
            aria-label="Reset game"
          >
            <RotateCcw className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;