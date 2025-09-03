
import { useGameStore } from '../store/gameStore';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RotateCw, Pause, Play } from 'lucide-react';
import { GravityDirection } from '../types';

const GravityControls: React.FC = () => {
  const { setGravity, gravity, resetLevel, isWon, isPaused, togglePause } = useGameStore();

  const handleGravityChange = (direction: GravityDirection) => {
    if (!isWon && !isPaused) {
      setGravity(direction);
    }
  };

  const buttonClass = (direction: GravityDirection) => `
    p-3 rounded-lg transition-all duration-200 transform active:scale-95
    ${gravity === direction 
      ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg scale-110' 
      : 'bg-white/20 hover:bg-white/30 text-white/80 hover:text-white backdrop-blur-sm'
    }
    ${isWon || isPaused ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <button
            onClick={() => handleGravityChange('up')}
            className={buttonClass('up')}
            disabled={isWon || isPaused}
            aria-label="Gravity Up"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            onClick={() => handleGravityChange('left')}
            className={buttonClass('left')}
            disabled={isWon || isPaused}
            aria-label="Gravity Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg shadow-inner">
            <div className="w-6 h-6 text-white font-bold flex items-center justify-center animate-rotate-slow">
              G
            </div>
          </div>
        </div>
        <div className="col-start-3 row-start-2">
          <button
            onClick={() => handleGravityChange('right')}
            className={buttonClass('right')}
            disabled={isWon || isPaused}
            aria-label="Gravity Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="col-start-2 row-start-3">
          <button
            onClick={() => handleGravityChange('down')}
            className={buttonClass('down')}
            disabled={isWon || isPaused}
            aria-label="Gravity Down"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="flex gap-2 mt-2">
        <button
          onClick={resetLevel}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95 flex items-center gap-2"
          aria-label="Reset Level"
        >
          <RotateCw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={togglePause}
          className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95 flex items-center gap-2"
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

export default GravityControls;