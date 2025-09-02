import { useState } from 'react';
import { Task } from '../types';
import { useTaskStore } from '../store/useTaskStore';
import { Check, Trash2, Clock, Tag } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toggleComplete, deleteTask, updateTask } = useTaskStore();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComplete(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div
      draggable={!task.completed}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white bg-opacity-90 rounded-lg p-3 cursor-move transition-all hover:shadow-lg ${
        isDragging ? 'drag-active' : ''
      } ${task.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-medium text-gray-800 ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h4>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          
          <div className="flex items-center gap-3 mt-2">
            {task.estimatedTime && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{task.estimatedTime}m</span>
              </div>
            )}
            
            {task.tags && task.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-gray-500" />
                {task.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={handleComplete}
            className={`p-1.5 rounded-full transition-colors ${
              task.completed
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 hover:bg-green-500 hover:text-white'
            }`}
          >
            <Check className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-1.5 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;