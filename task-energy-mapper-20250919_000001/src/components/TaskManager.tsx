import React, { useState } from 'react'
import { Plus, Clock, Target, Zap, Check, Trash2, Edit2 } from 'lucide-react'
import { useEnergyStore, Task } from '../store/useEnergyStore'

const TaskManager: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete, currentEnergy, getOptimalTasksForEnergy } = useEnergyStore()
  const [showAddTask, setShowAddTask] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    difficulty: 'medium' as Task['difficulty'],
    estimatedTime: 30,
    priority: 'medium' as Task['priority'],
  })

  const optimalTasks = getOptimalTasksForEnergy(currentEnergy)
  const otherTasks = tasks.filter(t => !t.completed && !optimalTasks.includes(t))
  const completedTasks = tasks.filter(t => t.completed)

  const difficultyColors = {
    easy: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    hard: 'text-red-400 bg-red-400/10',
  }

  const priorityIcons = {
    low: '○',
    medium: '◐',
    high: '●',
  }

  const handleSubmit = () => {
    if (!taskForm.title.trim()) return
    
    if (editingTask) {
      updateTask(editingTask, taskForm)
      setEditingTask(null)
    } else {
      addTask(taskForm)
    }
    
    setTaskForm({
      title: '',
      description: '',
      difficulty: 'medium',
      estimatedTime: 30,
      priority: 'medium',
    })
    setShowAddTask(false)
  }

  const handleEdit = (task: Task) => {
    setTaskForm({
      title: task.title,
      description: task.description || '',
      difficulty: task.difficulty,
      estimatedTime: task.estimatedTime,
      priority: task.priority,
    })
    setEditingTask(task.id)
    setShowAddTask(true)
  }

  const TaskCard = ({ task, isOptimal }: { task: Task; isOptimal: boolean }) => (
    <div
      className={`bg-dark-card rounded-xl p-4 transition-all ${
        isOptimal ? 'ring-2 ring-green-400 energy-glow-high' : ''
      } ${task.completed ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-400 mt-1">{task.description}</p>
          )}
        </div>
        <div className="flex gap-1">
          {!task.completed && (
            <button
              onClick={() => handleEdit(task)}
              className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Edit2 className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <button
            onClick={() => toggleTaskComplete(task.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              task.completed ? 'bg-green-500/20 hover:bg-green-500/30' : 'hover:bg-gray-700'
            }`}
          >
            <Check className={`w-4 h-4 ${task.completed ? 'text-green-400' : 'text-gray-400'}`} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-xs">
        <span className={`px-2 py-1 rounded-full ${difficultyColors[task.difficulty]}`}>
          {task.difficulty}
        </span>
        <div className="flex items-center gap-1 text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{task.estimatedTime}m</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span className={task.priority === 'high' ? 'text-red-400' : task.priority === 'medium' ? 'text-yellow-400' : ''}>
            {priorityIcons[task.priority]}
          </span>
          <span>{task.priority}</span>
        </div>
        {isOptimal && (
          <div className="flex items-center gap-1 text-green-400">
            <Zap className="w-3 h-3" />
            <span>Optimal</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Tasks</h2>
        </div>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Add/Edit Task Form */}
      {showAddTask && (
        <div className="bg-dark-card rounded-xl p-4 mb-4 animate-slide-up">
          <h3 className="text-lg font-medium text-white mb-4">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description (optional)</label>
              <textarea
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
                placeholder="Task details..."
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                <select
                  value={taskForm.difficulty}
                  onChange={(e) => setTaskForm({ ...taskForm, difficulty: e.target.value as Task['difficulty'] })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Time (min)</label>
                <input
                  type="number"
                  value={taskForm.estimatedTime}
                  onChange={(e) => setTaskForm({ ...taskForm, estimatedTime: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="5"
                  step="5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as Task['priority'] })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              {editingTask ? 'Update' : 'Add'} Task
            </button>
            <button
              onClick={() => {
                setShowAddTask(false)
                setEditingTask(null)
                setTaskForm({
                  title: '',
                  description: '',
                  difficulty: 'medium',
                  estimatedTime: 30,
                  priority: 'medium',
                })
              }}
              className="flex-1 py-2 px-4 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task Lists */}
      <div className="space-y-4">
        {optimalTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Optimal for Current Energy
            </h3>
            <div className="space-y-2">
              {optimalTasks.map(task => (
                <TaskCard key={task.id} task={task} isOptimal={true} />
              ))}
            </div>
          </div>
        )}
        
        {otherTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Other Tasks</h3>
            <div className="space-y-2">
              {otherTasks.map(task => (
                <TaskCard key={task.id} task={task} isOptimal={false} />
              ))}
            </div>
          </div>
        )}
        
        {completedTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Completed</h3>
            <div className="space-y-2">
              {completedTasks.map(task => (
                <TaskCard key={task.id} task={task} isOptimal={false} />
              ))}
            </div>
          </div>
        )}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks yet</p>
            <p className="text-sm mt-1">Add your first task to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}