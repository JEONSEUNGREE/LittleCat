import React, { useState } from 'react';
import { Task, Quadrant } from '../types';
import TaskCard from './TaskCard';
import { useTaskStore } from '../store/useTaskStore';
import { Plus } from 'lucide-react';

interface QuadrantBoxProps {
  quadrant: {
    id: Quadrant;
    title: string;
    color: string;
    description: string;
  };
  tasks: Task[];
}

const QuadrantBox: React.FC<QuadrantBoxProps> = ({ quadrant, tasks }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const moveTask = useTaskStore((state) => state.moveTask);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, quadrant.id);
    }
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div
      className={`${quadrant.color} bg-opacity-10 rounded-lg p-4 min-h-[300px] transition-all ${
        isDragOver ? 'drop-zone-active' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={`${quadrant.color} bg-clip-text text-transparent font-bold text-lg`}>
            {quadrant.title}
          </h3>
          <p className="text-gray-300 text-sm">{quadrant.description}</p>
        </div>
        <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full text-xs">
          {incompleteTasks.length}
        </span>
      </div>

      <div className="space-y-2">
        {incompleteTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {completedTasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white border-opacity-20">
            <p className="text-gray-400 text-xs mb-2">Completed ({completedTasks.length})</p>
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {tasks.length === 0 && (
        <div className="flex items-center justify-center h-32 text-gray-400">
          <div className="text-center">
            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Drop tasks here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuadrantBox;