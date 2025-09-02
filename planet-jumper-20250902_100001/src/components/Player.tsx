import React from 'react';
import { Player as PlayerType } from '../types/game';
import { Rocket } from 'lucide-react';

interface PlayerProps {
  player: PlayerType;
  scale: number;
}

export const Player: React.FC<PlayerProps> = ({ player, scale }) => {
  const size = player.radius * 2 * scale;
  const x = player.x * scale - size / 2;
  const y = player.y * scale - size / 2;
  
  // Calculate rotation based on velocity
  const rotation = Math.atan2(player.vy, player.vx) * (180 / Math.PI) + 90;
  
  return (
    <div
      className="absolute transition-all duration-100"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <Rocket 
        className="w-full h-full text-white drop-shadow-lg"
        style={{
          filter: player.jumping 
            ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' 
            : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
        }}
      />
      {player.jumping && (
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-orange-400 rounded-full animate-pulse"
          style={{
            boxShadow: '0 0 10px rgba(251, 146, 60, 0.8)',
          }}
        />
      )}
    </div>
  );
};