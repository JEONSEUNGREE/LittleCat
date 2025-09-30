import { useState } from 'react';
import { Plus, X, Zap, Clock, Tag, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';

export const TaskInput: React.FC = () => {
  const addTask = useStore(state => state.addTask);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    impactScore: 5,
    timeSpent: 30,
    category: 'work' as const,
    tags: [] as string[],
    tagInput: ''
  });
  
  const categories = [
    { value: 'work', label: 'Work', color: 'bg-blue-100 text-blue-800' },
    { value: 'personal', label: 'Personal', color: 'bg-purple-100 text-purple-800' },
    { value: 'learning', label: 'Learning', color: 'bg-green-100 text-green-800' },
    { value: 'health', label: 'Health', color: 'bg-pink-100 text-pink-800' },
    { value: 'social', label: 'Social', color: 'bg-yellow-100 text-yellow-800' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    addTask({
      title: formData.title,
      description: formData.description,
      impactScore: formData.impactScore,
      timeSpent: formData.timeSpent,
      category: formData.category,
      tags: formData.tags,
      completedAt: new Date()
    });
    
    setFormData({
      title: '',
      description: '',
      impactScore: 5,
      timeSpent: 30,
      category: 'work',
      tags: [],
      tagInput: ''
    });
    setIsOpen(false);
  };
  
  const addTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: ''
      });
    }
  };
  
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-all hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-md animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Log Task Impact</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What did you accomplish?
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Completed project proposal"
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={2}
                placeholder="Add more details..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Impact Score
                  </div>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.impactScore}
                    onChange={(e) => setFormData({ ...formData, impactScore: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className={`font-bold min-w-[2rem] text-center ${
                    formData.impactScore >= 7 ? 'text-impact-high' :
                    formData.impactScore >= 4 ? 'text-impact-medium' :
                    'text-impact-low'
                  }`}>
                    {formData.impactScore}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Time (minutes)
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.timeSpent}
                  onChange={(e) => setFormData({ ...formData, timeSpent: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4 text-gray-500" />
                  Tags
                </div>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.tagInput}
                  onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="Add tags..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                Log Impact
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};