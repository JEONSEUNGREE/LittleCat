import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import FallingWordComponent from './FallingWord';
import TypeInput from './TypeInput';

const GameBoard: React.FC = () => {
  const { 
    words, 
    isPlaying, 
    isPaused,
    updateWords,
    spawnWord
  } = useGameStore();
  
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  
  useEffect(() => {
    if (!isPlaying || isPaused) return;
    
    let animationId: number;
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;
      
      // Update word positions
      updateWords(deltaTime);
      
      // Spawn new words
      spawnTimerRef.current += deltaTime;
      if (spawnTimerRef.current >= 2.5) {
        spawnWord();
        spawnTimerRef.current = 0;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, isPaused, updateWords, spawnWord]);
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px] animate-pulse-slow"></div>
      </div>
      
      {/* Falling words */}
      {words.map(word => (
        <FallingWordComponent key={word.id} word={word} />
      ))}
      
      {/* Type input area */}
      {isPlaying && !isPaused && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4">
          <TypeInput />
        </div>
      )}
    </div>
  );
};

export default GameBoard;