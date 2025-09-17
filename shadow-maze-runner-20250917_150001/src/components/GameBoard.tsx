import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Sun, Moon } from 'lucide-react';

export const GameBoard: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const {
    player,
    currentLevelData,
    isPlaying,
    isPaused,
    movePlayer,
    checkLightCollision,
    loseLife,
    updateTime
  } = useGameStore();

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        const tiltX = event.gamma; // left-right tilt
        const tiltY = event.beta;  // front-back tilt
        
        const sensitivity = 0.5;
        const dx = tiltX * sensitivity;
        const dy = tiltY * sensitivity;
        
        movePlayer(dx, dy);
      }
    };

    const handleTouch = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      if (gameRef.current && touch) {
        const rect = gameRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const dx = (x - player.x) * 0.1;
        const dy = (y - player.y) * 0.1;
        movePlayer(dx, dy);
      }
    };

    const handleKeyboard = (event: KeyboardEvent) => {
      const speed = 8;
      switch(event.key) {
        case 'ArrowUp':
        case 'w':
          movePlayer(0, -speed);
          break;
        case 'ArrowDown':
        case 's':
          movePlayer(0, speed);
          break;
        case 'ArrowLeft':
        case 'a':
          movePlayer(-speed, 0);
          break;
        case 'ArrowRight':
        case 'd':
          movePlayer(speed, 0);
          break;
      }
    };

    // Request device orientation permission on iOS
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        })
        .catch(() => {
          // Fallback to touch/keyboard
        });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    window.addEventListener('touchmove', handleTouch, { passive: false });
    window.addEventListener('keydown', handleKeyboard);

    const gameLoop = setInterval(() => {
      if (checkLightCollision()) {
        loseLife();
      }
    }, 100);

    const timer = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('keydown', handleKeyboard);
      clearInterval(gameLoop);
      clearInterval(timer);
    };
  }, [isPlaying, isPaused, player, movePlayer, checkLightCollision, loseLife, updateTime]);

  if (!currentLevelData) return null;

  return (
    <div 
      ref={gameRef}
      className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Walls */}
      {currentLevelData.walls.map((wall, index) => (
        <div
          key={index}
          className="absolute maze-wall"
          style={{
            left: `${wall.x}px`,
            top: `${wall.y}px`,
            width: `${wall.width}px`,
            height: `${wall.height}px`,
          }}
        />
      ))}

      {/* Light sources */}
      {currentLevelData.lights.map((light, index) => (
        <div
          key={index}
          className="absolute light-source animate-pulse-slow"
          style={{
            left: `${light.x - light.radius}px`,
            top: `${light.y - light.radius}px`,
            width: `${light.radius * 2}px`,
            height: `${light.radius * 2}px`,
            borderRadius: '50%',
            opacity: light.intensity,
          }}
        >
          <Sun className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300" size={24} />
        </div>
      ))}

      {/* Exit */}
      <div
        className="absolute w-10 h-10 bg-green-500 rounded-full animate-float shadow-lg"
        style={{
          left: `${currentLevelData.exit.x - 20}px`,
          top: `${currentLevelData.exit.y - 20}px`,
        }}
      >
        <div className="w-full h-full rounded-full bg-green-400 opacity-50 animate-ping" />
      </div>

      {/* Player (Shadow) */}
      <div
        className={`absolute transition-all duration-100 ${player.isDead ? 'opacity-30' : ''}`}
        style={{
          left: `${player.x - player.size / 2}px`,
          top: `${player.y - player.size / 2}px`,
          width: `${player.size}px`,
          height: `${player.size}px`,
        }}
      >
        <div className="w-full h-full bg-purple-900 rounded-full shadow-effect animate-shadow-flicker">
          <Moon className="w-full h-full text-purple-300" />
        </div>
      </div>

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">PAUSED</div>
        </div>
      )}
    </div>
  );
};