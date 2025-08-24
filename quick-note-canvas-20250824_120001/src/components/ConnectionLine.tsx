import React from 'react';
import { Note } from '../types';

interface ConnectionLineProps {
  from: Note;
  to: Note;
  type: 'arrow' | 'line';
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, type }) => {
  const x1 = from.x + from.width / 2;
  const y1 = from.y + from.height / 2;
  const x2 = to.x + to.width / 2;
  const y2 = to.y + to.height / 2;
  
  const markerEnd = type === 'arrow' ? 'url(#arrowhead)' : undefined;
  
  return (
    <>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3, 0 6"
            fill="#6b7280"
          />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#6b7280"
        strokeWidth="2"
        markerEnd={markerEnd}
        strokeDasharray={type === 'line' ? '5,5' : undefined}
      />
    </>
  );
};

export default ConnectionLine;