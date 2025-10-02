
import { Play, Info, Settings, Award } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const MainMenu: React.FC = () => {
  const { initGame } = useGameStore();
  const [showRules, setShowRules] = React.useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="animate-quantum-pulse inline-block">⚛️</span>
              <br />
              Quantum
              <br />
              Entangle Match
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Master the quantum realm through entanglement and superposition
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={initGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5" />
              Start Game
            </button>
            
            <button
              onClick={() => setShowRules(!showRules)}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
            >
              <Info className="w-5 h-5" />
              How to Play
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled
                className="bg-white/5 text-white/50 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Award className="w-4 h-4" />
                Scores
              </button>
              
              <button
                disabled
                className="bg-white/5 text-white/50 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
          
          {showRules && (
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <h3 className="font-bold mb-3 text-lg">Game Rules:</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>• Click particles to select them</li>
                <li>• Select two particles to entangle them</li>
                <li>• Click superposition particles to collapse them</li>
                <li>• When collapsed, entangled particles react oppositely</li>
                <li>• Match particles of the same state to clear them</li>
                <li>• Complete each level within the move limit</li>
                <li>• Score points by creating entanglements and matches</li>
              </ul>
            </div>
          )}
        </div>
        
        <p className="text-center text-white/50 text-xs mt-4">
          © 2025 Quantum Entangle Match v1.0.0
        </p>
      </div>
    </div>
  );
};

export default MainMenu;