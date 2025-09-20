import { useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/GameUI';
import { useGameStore } from './store/gameStore';

function App() {
  const { jump, flipGravity, isRunning } = useGameStore();

  useEffect(() => {
    let touchTimer: NodeJS.Timeout;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent | MouseEvent) => {
      e.preventDefault();
      if (!isRunning) return;
      
      isTouching = true;
      jump();
      
      touchTimer = setTimeout(() => {
        if (isTouching) {
          flipGravity();
        }
      }, 300);
    };

    const handleTouchEnd = (e: TouchEvent | MouseEvent) => {
      e.preventDefault();
      isTouching = false;
      clearTimeout(touchTimer);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isRunning) return;
      
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      } else if (e.key === 'ArrowDown' || e.key === 'f') {
        e.preventDefault();
        flipGravity();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('mousedown', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('mouseup', handleTouchEnd);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousedown', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mouseup', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyPress);
      clearTimeout(touchTimer);
    };
  }, [jump, flipGravity, isRunning]);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
      <GameCanvas />
      <GameUI />
    </div>
  );
}

export default App;