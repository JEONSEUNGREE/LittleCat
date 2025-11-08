import React from 'react';
import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Link } from 'lucide-react';

const GameBoard: React.FC = () => {
  const {
    sequence,
    userSequence,
    isShowingSequence,
    gameStatus,
    addToUserSequence,
    updateTimer,
  } = useGameStore();

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showingIndex, setShowingIndex] = useState<number>(-1);

  useEffect(() => {
    if (isShowingSequence && sequence.length > 0) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < sequence.length) {
          setShowingIndex(currentIndex);
          currentIndex++;
        } else {
          setShowingIndex(-1);
          clearInterval(interval);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isShowingSequence, sequence]);

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [updateTimer]);

  const handleColorClick = (color: string, index: number) => {
    if (gameStatus !== 'playing') return;

    setSelectedColors([...selectedColors, color]);
    addToUserSequence({
      id: `user-${Date.now()}`,
      color,
      index,
    });

    // Flash animation
    const element = document.getElementById(`color-${index}`);
    if (element) {
      element.classList.add('animate-flash');
      setTimeout(() => {
        element.classList.remove('animate-flash');
      }, 300);
    }
  };

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766',
    '#95E77E', '#DDA0FF', '#FFB6C1', '#FFA07A',
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Sequence Display */}
      {isShowingSequence && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Watch the Chain!</h3>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {sequence.map((node, index) => (
              <div key={node.id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-lg transition-all duration-300 ${
                    showingIndex === index
                      ? 'scale-125 animate-glow'
                      : 'scale-100 opacity-50'
                  }`}
                  style={{
                    backgroundColor: node.color,
                    boxShadow:
                      showingIndex === index
                        ? `0 0 30px ${node.color}`
                        : 'none',
                  }}
                />
                {index < sequence.length - 1 && (
                  <Link
                    className={`mx-1 transition-opacity ${
                      showingIndex >= index ? 'opacity-100' : 'opacity-30'
                    }`}
                    size={20}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Progress */}
      {gameStatus === 'playing' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-white">Your Chain:</h3>
          <div className="flex justify-center items-center gap-2 flex-wrap min-h-[60px]">
            {userSequence.map((node, index) => (
              <div key={node.id} className="flex items-center animate-chain-link">
                <div
                  className="w-10 h-10 rounded-lg"
                  style={{ backgroundColor: node.color }}
                />
                {index < userSequence.length - 1 && (
                  <Link className="mx-1 text-white/70" size={16} />
                )}
              </div>
            ))}
            {userSequence.length < sequence.length && (
              <div className="flex items-center">
                {userSequence.length > 0 && (
                  <Link className="mx-1 text-white/30" size={16} />
                )}
                {Array(sequence.length - userSequence.length)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`empty-${i}`} className="flex items-center">
                      <div className="w-10 h-10 rounded-lg border-2 border-white/30 border-dashed" />
                      {i < sequence.length - userSequence.length - 1 && (
                        <Link className="mx-1 text-white/30" size={16} />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Color Palette */}
      <div className="grid grid-cols-4 gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            id={`color-${index}`}
            className={`aspect-square rounded-xl transition-all duration-200 ${
              gameStatus === 'playing'
                ? 'hover:scale-110 cursor-pointer active:scale-95'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: color,
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
            onClick={() => handleColorClick(color, index)}
            disabled={gameStatus !== 'playing'}
          />
        ))}
      </div>

      {/* Status Messages */}
      {gameStatus === 'success' && (
        <div className="mt-6 p-4 bg-green-500/20 rounded-lg border-2 border-green-400">
          <p className="text-green-400 font-bold text-lg">Perfect! Chain Complete!</p>
        </div>
      )}

      {gameStatus === 'failed' && (
        <div className="mt-6 p-4 bg-red-500/20 rounded-lg border-2 border-red-400">
          <p className="text-red-400 font-bold text-lg">Wrong Chain! Try Again!</p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;