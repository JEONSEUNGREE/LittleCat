import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameControls = () => {
  const { isPlaying, setGravity } = useGameStore();

  if (!isPlaying) return null;

  const handleControl = (direction: 'up' | 'down' | 'left' | 'right') => {
    switch (direction) {
      case 'up':
        setGravity(0, -0.3);
        break;
      case 'down':
        setGravity(0, 0.3);
        break;
      case 'left':
        setGravity(-0.3, 0);
        break;
      case 'right':
        setGravity(0.3, 0);
        break;
    }

    // Reset gravity after a short time
    setTimeout(() => {
      setGravity(0, 0.3);
    }, 200);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 p-4">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
          <div />
          <button
            onTouchStart={() => handleControl('up')}
            onMouseDown={() => handleControl('up')}
            className="p-4 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg transition-colors touch-none"
            aria-label="Move up"
          >
            <ChevronUp size={24} className="text-white mx-auto" />
          </button>
          <div />
          
          <button
            onTouchStart={() => handleControl('left')}
            onMouseDown={() => handleControl('left')}
            className="p-4 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg transition-colors touch-none"
            aria-label="Move left"
          >
            <ChevronLeft size={24} className="text-white mx-auto" />
          </button>
          <button
            onTouchStart={() => handleControl('down')}
            onMouseDown={() => handleControl('down')}
            className="p-4 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg transition-colors touch-none"
            aria-label="Move down"
          >
            <ChevronDown size={24} className="text-white mx-auto" />
          </button>
          <button
            onTouchStart={() => handleControl('right')}
            onMouseDown={() => handleControl('right')}
            className="p-4 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg transition-colors touch-none"
            aria-label="Move right"
          >
            <ChevronRight size={24} className="text-white mx-auto" />
          </button>
        </div>
        
        <p className="text-center text-slate-400 text-xs mt-3">
          Use arrows to control gravity
        </p>
      </div>
    </div>
  );
};

export default GameControls;