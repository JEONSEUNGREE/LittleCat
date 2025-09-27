import React from 'react';
import { Music, Volume2 } from 'lucide-react';
import { useGameStore, SoundNote, playSound } from '../store/gameStore';

const noteColors: Record<SoundNote, string> = {
  'C': 'bg-red-500 hover:bg-red-600',
  'D': 'bg-orange-500 hover:bg-orange-600',
  'E': 'bg-yellow-500 hover:bg-yellow-600',
  'F': 'bg-green-500 hover:bg-green-600',
  'G': 'bg-blue-500 hover:bg-blue-600',
  'A': 'bg-indigo-500 hover:bg-indigo-600',
  'B': 'bg-purple-500 hover:bg-purple-600',
  'C2': 'bg-pink-500 hover:bg-pink-600',
};

const GamePad: React.FC = () => {
  const { 
    handlePlayerInput, 
    gameState, 
    isShowingSequence, 
    currentShowIndex,
    sequence,
    playerSequence 
  } = useGameStore();

  const notes: SoundNote[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];

  const handleNoteClick = (note: SoundNote) => {
    if (gameState === 'playing' && !isShowingSequence) {
      handlePlayerInput(note);
    } else if (gameState === 'idle') {
      playSound(note, 300);
    }
  };

  const isNoteActive = (note: SoundNote, index: number) => {
    if (isShowingSequence && sequence[currentShowIndex] === note) {
      return true;
    }
    return false;
  };

  const getButtonStyle = (note: SoundNote, index: number) => {
    const baseStyle = `game-pad-button ${noteColors[note]} text-white font-bold rounded-2xl shadow-lg transition-all duration-200`;
    const activeStyle = isNoteActive(note, index) ? 'scale-110 ring-4 ring-white ring-opacity-50 animate-pulse' : '';
    const disabledStyle = gameState !== 'playing' && gameState !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    
    return `${baseStyle} ${activeStyle} ${disabledStyle}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="grid grid-cols-3 gap-3 aspect-square">
        {/* Top Row */}
        <div />
        <button
          onClick={() => handleNoteClick('C2')}
          className={`${getButtonStyle('C2', 7)} col-span-1`}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Music className="w-8 h-8 mb-1" />
            <span className="text-lg">C²</span>
          </div>
        </button>
        <div />
        
        {/* Middle Rows - Circular Pattern */}
        <button
          onClick={() => handleNoteClick('B')}
          className={getButtonStyle('B', 6)}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Volume2 className="w-8 h-8 mb-1" />
            <span className="text-lg">B</span>
          </div>
        </button>
        
        <button
          onClick={() => handleNoteClick('C')}
          className={getButtonStyle('C', 0)}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Volume2 className="w-8 h-8 mb-1" />
            <span className="text-lg">C</span>
          </div>
        </button>
        
        <button
          onClick={() => handleNoteClick('D')}
          className={getButtonStyle('D', 1)}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Volume2 className="w-8 h-8 mb-1" />
            <span className="text-lg">D</span>
          </div>
        </button>
        
        <button
          onClick={() => handleNoteClick('A')}
          className={getButtonStyle('A', 5)}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Volume2 className="w-8 h-8 mb-1" />
            <span className="text-lg">A</span>
          </div>
        </button>
        
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-echo-primary rounded-full flex items-center justify-center animate-pulse-ring">
            <Music className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <button
          onClick={() => handleNoteClick('E')}
          className={getButtonStyle('E', 2)}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Volume2 className="w-8 h-8 mb-1" />
            <span className="text-lg">E</span>
          </div>
        </button>
        
        <button
          onClick={() => handleNoteClick('G')}
          className={getButtonStyle('G', 4)}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Volume2 className="w-8 h-8 mb-1" />
            <span className="text-lg">G</span>
          </div>
        </button>
        
        <button
          onClick={() => handleNoteClick('F')}
          className={getButtonStyle('F', 3)}
          disabled={gameState !== 'playing' && gameState !== 'idle'}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Volume2 className="w-8 h-8 mb-1" />
            <span className="text-lg">F</span>
          </div>
        </button>
        
        <div />
      </div>
      
      {/* Visual Feedback */}
      <div className="mt-4 flex justify-center">
        <div className="flex gap-2">
          {sequence.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                playerSequence.length > index 
                  ? 'bg-green-400' 
                  : isShowingSequence && currentShowIndex >= index
                  ? 'bg-echo-accent'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePad;