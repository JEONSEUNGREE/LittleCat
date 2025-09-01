import React from 'react';
import { Quadrant } from '../types';
import QuadrantBox from './QuadrantBox';
import { useTaskStore } from '../store/useTaskStore';

const Matrix: React.FC = () => {
  const getTasksByQuadrant = useTaskStore((state) => state.getTasksByQuadrant);

  const quadrants: { id: Quadrant; title: string; color: string; description: string }[] = [
    {
      id: 'urgent-important',
      title: 'DO FIRST',
      color: 'bg-red-500',
      description: 'Crisis & Emergencies',
    },
    {
      id: 'not-urgent-important',
      title: 'SCHEDULE',
      color: 'bg-amber-500',
      description: 'Planning & Development',
    },
    {
      id: 'urgent-not-important',
      title: 'DELEGATE',
      color: 'bg-blue-500',
      description: 'Interruptions & Meetings',
    },
    {
      id: 'not-urgent-not-important',
      title: 'ELIMINATE',
      color: 'bg-gray-500',
      description: 'Time Wasters',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
        {quadrants.map((quadrant) => (
          <QuadrantBox
            key={quadrant.id}
            quadrant={quadrant}
            tasks={getTasksByQuadrant(quadrant.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Matrix;