import { useState } from 'react';
import Matrix from './components/Matrix';
import AddTaskModal from './components/AddTaskModal';
import StatsPanel from './components/StatsPanel';
import { Plus, Grid3x3, Trash2, BarChart3 } from 'lucide-react';
import { useTaskStore } from './store/useTaskStore';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const clearCompleted = useTaskStore((state) => state.clearCompleted);
  const stats = useTaskStore((state) => state.getStats());

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Grid3x3 className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Task Priority Matrix</h1>
          </div>
          <p className="text-white text-opacity-80">
            Organize tasks using the Eisenhower Decision Matrix
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
          
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            {showStats ? 'Hide' : 'Show'} Stats
          </button>
          
          {stats.completedTasks > 0 && (
            <button
              onClick={clearCompleted}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Completed ({stats.completedTasks})
            </button>
          )}
        </div>

        {/* Stats Panel */}
        {showStats && (
          <div className="mb-6 max-w-2xl mx-auto">
            <StatsPanel />
          </div>
        )}

        {/* Matrix Grid */}
        <Matrix />

        {/* Add Task Modal */}
        <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Instructions */}
        <div className="mt-8 text-center text-white text-opacity-60 text-sm max-w-2xl mx-auto">
          <p className="mb-2">
            <strong>How to use:</strong> Click "Add Task" to create new tasks. 
            Drag and drop tasks between quadrants to reprioritize them.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            <div className="bg-white bg-opacity-10 rounded p-2">
              <span className="text-red-400 font-semibold">Do First:</span> Urgent & Important
            </div>
            <div className="bg-white bg-opacity-10 rounded p-2">
              <span className="text-amber-400 font-semibold">Schedule:</span> Important, Not Urgent
            </div>
            <div className="bg-white bg-opacity-10 rounded p-2">
              <span className="text-blue-400 font-semibold">Delegate:</span> Urgent, Not Important
            </div>
            <div className="bg-white bg-opacity-10 rounded p-2">
              <span className="text-gray-400 font-semibold">Eliminate:</span> Neither Urgent nor Important
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;