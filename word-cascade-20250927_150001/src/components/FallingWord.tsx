import React from 'react';
import { FallingWord } from '../types';

interface Props {
  word: FallingWord;
}

const FallingWordComponent: React.FC<Props> = ({ word }) => {
  return (
    <div
      className="absolute font-bold text-2xl md:text-3xl transition-all duration-100 drop-shadow-lg animate-pulse-slow select-none"
      style={{
        left: `${word.x}px`,
        top: `${word.y}px`,
        color: word.color,
        textShadow: `0 0 10px ${word.color}50, 0 0 20px ${word.color}30`,
      }}
    >
      {word.word.toUpperCase()}
      <span className="text-xs ml-2 text-white/70">+{word.points}</span>
    </div>
  );
};

export default FallingWordComponent;