import React from 'react';
import { NumberBlock as NumberBlockType } from '../types/game.types';

interface NumberBlockProps {
  block: NumberBlockType;
}

const NumberBlock: React.FC<NumberBlockProps> = ({ block }) => {
  return (
    <div
      className={`
        w-full h-full flex items-center justify-center rounded-lg
        text-white font-bold text-lg sm:text-xl md:text-2xl
        transition-all duration-300 transform
        ${block.isChaining ? 'animate-chain-reaction' : 'animate-cascade'}
        shadow-lg
      `}
      style={{
        backgroundColor: block.color,
        boxShadow: `0 4px 12px ${block.color}40`
      }}
    >
      <span className="drop-shadow-md">
        {block.value}
      </span>
      {block.isChaining && (
        <div className="absolute inset-0 rounded-lg animate-pulse bg-white/30" />
      )}
    </div>
  );
};

export default NumberBlock;