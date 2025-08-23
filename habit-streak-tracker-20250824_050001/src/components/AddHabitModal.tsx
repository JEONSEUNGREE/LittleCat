import React, { useState } from 'react';
import { X, Target, Calendar, Palette, Type } from 'lucide-react';
import useHabitStore from '../store/habitStore';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorOptions = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e'
];

const iconOptions = ['🎯', '💪', '📚', '💧', '🏃', '🧘', '✍️', '🎨', '🎵', '💰', '🌱', '🚀'];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabitStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '🎯',
    color: '#6366f1',
    targetFrequency: 'daily' as const,
    targetCount: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addHabit(formData);
      setFormData({
        title: '',
        description: '',
        icon: '🎯',
        color: '#6366f1',
        targetFrequency: 'daily',
        targetCount: 1,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Create New Habit</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Type className="w-4 h-4" />
              Habit Name
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Drink 8 glasses of water"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Add more details about this habit..."
              rows={2}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-3 text-2xl rounded-lg transition-all ${
                    formData.icon === icon
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4" />
              Color
            </label>
            <div className="grid grid-cols-8 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              Frequency
            </label>
            <select
              value={formData.targetFrequency}
              onChange={(e) => setFormData({ ...formData, targetFrequency: e.target.value as 'daily' | 'weekly' | 'monthly' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4" />
              Target Count
            </label>
            <input
              type="number"
              min="1"
              value={formData.targetCount}
              onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 button-primary"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;