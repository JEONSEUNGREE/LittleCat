import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Edit2, Clock, Zap, Tag, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Task } from '../types';

export const TaskList: React.FC = () => {
  const tasks = useStore(state => state.tasks);
  const completeTask = useStore(state => state.completeTask);
  const deleteTask = useStore(state => state.deleteTask);
  const updateTask = useStore(state => state.updateTask);
  
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});
  
  const categories = ['all', 'work', 'personal', 'learning', 'health', 'social'];
  
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed' && !task.completedAt) return false;
      if (filter === 'pending' && task.completedAt) return false;
      if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.completedAt && !b.completedAt) return 1;
      if (!a.completedAt && b.completedAt) return -1;
      return b.impactScore - a.impactScore;
    });
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  const getImpactBadgeColor = (score: number) => {
    if (score >= 7) return 'bg-green-100 text-green-800';
    if (score >= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work: 'bg-blue-100 text-blue-800',
      personal: 'bg-purple-100 text-purple-800',
      learning: 'bg-green-100 text-green-800',
      health: 'bg-pink-100 text-pink-800',
      social: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  const startEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      impactScore: task.impactScore,
      timeSpent: task.timeSpent
    });
  };
  
  const saveEdit = () => {
    if (editingTask) {
      updateTask(editingTask, editForm);
      setEditingTask(null);
      setEditForm({});
    }
  };
  
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">All Tasks</h2>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
            <Filter className="w-4 h-4 text-gray-500 ml-2" />
            {['all', 'completed', 'pending'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks found. Start tracking your impact!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`impact-card transition-all ${
                task.completedAt ? 'opacity-75' : ''
              }`}
            >
              {editingTask === task.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary resize-none"
                    rows={2}
                  />
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Impact:</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={editForm.impactScore}
                        onChange={(e) => setEditForm({ ...editForm, impactScore: parseInt(e.target.value) })}
                        className="w-16 px-2 py-1 border border-gray-200 rounded"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Time (min):</label>
                      <input
                        type="number"
                        min="1"
                        value={editForm.timeSpent}
                        onChange={(e) => setEditForm({ ...editForm, timeSpent: parseInt(e.target.value) })}
                        className="w-20 px-2 py-1 border border-gray-200 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="btn-primary text-sm">
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingTask(null);
                        setEditForm({});
                      }}
                      className="btn-secondary text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => !task.completedAt && completeTask(task.id)}
                    className={`mt-1 ${task.completedAt ? 'cursor-default' : 'hover:scale-110 transition-transform'}`}
                    disabled={!!task.completedAt}
                  >
                    {task.completedAt ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.completedAt ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className={`impact-badge ${getImpactBadgeColor(task.impactScore)}`}>
                        <Zap className="w-3 h-3" />
                        Impact: {task.impactScore}
                      </span>
                      <span className="impact-badge bg-gray-100 text-gray-700">
                        <Clock className="w-3 h-3" />
                        {formatTime(task.timeSpent)}
                      </span>
                      <span className={`impact-badge ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      {task.tags.map(tag => (
                        <span key={tag} className="impact-badge bg-gray-50 text-gray-600">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {!task.completedAt && (
                      <button
                        onClick={() => startEdit(task)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};