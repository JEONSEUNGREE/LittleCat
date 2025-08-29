import { useState } from 'react'
import { Plus, Clock, Trash2, Check, Circle } from 'lucide-react'
import { useTimeBlockStore, Task } from '../store/useTimeBlockStore'

export function TaskPanel() {
  const { tasks, addTask, deleteTask, toggleTaskComplete } = useTimeBlockStore()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    duration: 30,
    category: 'work' as Task['category'],
    color: '#3b82f6'
  })

  const categoryColors = {
    work: '#3b82f6',
    personal: '#f59e0b',
    health: '#10b981',
    learning: '#ec4899',
    other: '#6b7280'
  }

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        completed: false
      })
      setNewTask({
        title: '',
        duration: 30,
        category: 'work',
        color: '#3b82f6'
      })
      setIsAddingTask(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          aria-label="Add task"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add Task Form */}
      {isAddingTask && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg animate-fade-in">
          <input
            type="text"
            placeholder="Task name..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          
          <div className="flex gap-2 mb-2">
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ 
                ...newTask, 
                category: e.target.value as Task['category'],
                color: categoryColors[e.target.value as Task['category']]
              })}
              className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
              <option value="learning">Learning</option>
              <option value="other">Other</option>
            </select>
            
            <input
              type="number"
              value={newTask.duration}
              onChange={(e) => setNewTask({ ...newTask, duration: parseInt(e.target.value) || 30 })}
              className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="15"
              step="15"
            />
            <span className="text-sm text-gray-500 self-center">min</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setIsAddingTask(false)}
              className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            className={`group p-3 rounded-lg cursor-move transition-all hover:shadow-md ${
              task.completed ? 'opacity-60' : ''
            }`}
            style={{ backgroundColor: `${task.color}20`, borderLeft: `4px solid ${task.color}` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2 flex-1">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="mt-0.5 text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {task.completed ? (
                    <Check className="w-4 h-4" style={{ color: task.color }} />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-medium text-gray-800 ${
                    task.completed ? 'line-through' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 capitalize">{task.category}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{task.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}