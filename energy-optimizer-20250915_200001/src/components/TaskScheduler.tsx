import { useState } from 'react';
import { Calendar, CheckCircle, Circle, Clock, Plus, Trash2, Zap } from 'lucide-react';
import { useEnergyStore } from '../store/useEnergyStore';
import { Task } from '../types';

const TaskScheduler: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, getOptimalTaskTime, currentEnergy } = useEnergyStore();
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    estimatedEnergy: 5,
    duration: 30,
  });

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        completed: false,
      });
      setNewTask({ title: '', estimatedEnergy: 5, duration: 30 });
      setShowAddTask(false);
    }
  };

  const getTaskRecommendation = (task: Task) => {
    if (task.completed) return null;
    
    if (currentEnergy >= task.estimatedEnergy) {
      return { text: 'Good to go!', color: 'text-green-600 dark:text-green-400' };
    } else if (currentEnergy >= task.estimatedEnergy - 2) {
      return { text: 'Possible with effort', color: 'text-yellow-600 dark:text-yellow-400' };
    } else {
      const optimalTime = getOptimalTaskTime(task.estimatedEnergy);
      if (optimalTime) {
        return {
          text: `Try at ${optimalTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}`,
          color: 'text-blue-600 dark:text-blue-400'
        };
      }
      return { text: 'Rest first', color: 'text-red-600 dark:text-red-400' };
    }
  };

  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Smart Task Scheduler</h2>
        <Calendar className="w-6 h-6 text-primary" />
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="flex items-center space-x-2 bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      {showAddTask && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 animate-slide-up">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Energy Required
                </label>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTask.estimatedEnergy}
                    onChange={(e) => setNewTask({ ...newTask, estimatedEnergy: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-8">{newTask.estimatedEnergy}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration (min)
                </label>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <input
                    type="number"
                    min="5"
                    max="240"
                    step="5"
                    value={newTask.duration}
                    onChange={(e) => setNewTask({ ...newTask, duration: parseInt(e.target.value) })}
                    className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleAddTask}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {incompleteTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <>
            {incompleteTasks.map((task) => {
              const recommendation = getTaskRecommendation(task);
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Circle className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white">{task.title}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span>{task.estimatedEnergy}/10</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.duration}min</span>
                        </span>
                        {recommendation && (
                          <span className={recommendation.color}>{recommendation.text}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
            
            {completedTasks.length > 0 && (
              <>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4 mb-2">
                  Completed
                </div>
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-60"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-green-600 dark:text-green-400"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <div className="flex-1">
                        <p className="font-medium text-gray-600 dark:text-gray-300 line-through">
                          {task.title}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskScheduler;