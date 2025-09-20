import React from 'react';
import { User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Player: React.FC = () => {
  const player = useGameStore((state) => state.player);
  
  const playerStyle = {
    left: `${player.position}px`,
    transition: player.isJumping ? 'none' : 'transform 0.3s ease-in-out',
    transform: `
      ${player.isFlipped ? 'translateY(-100%) rotate(180deg)' : 'translateY(0)'} 
      ${player.isJumping ? `translateY(${player.isFlipped ? '60px' : '-60px'})` : ''}
    `,
  };

  return (
    <div
      className={`absolute ${player.isFlipped ? 'top-12' : 'bottom-12'} w-10 h-10 flex items-center justify-center transition-all duration-300`}
      style={playerStyle}
    >
      <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center ${player.isJumping ? 'animate-pulse' : ''}`}>
        <User size={24} className="text-white" />
      </div>
    </div>
  );
};

export default Player;