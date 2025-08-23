import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import useHabitStore from '../store/habitStore';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HABIT_CATEGORIES = [
  { name: 'Health', icon: '🏃', color: '#10b981' },
  { name: 'Learning', icon: '📚', color: '#3b82f6' },
  { name: 'Work', icon: '💼', color: '#6366f1' },
  { name: 'Mindfulness', icon: '🧘', color: '#8b5cf6' },
  { name: 'Social', icon: '👥', color: '#ec4899' },
  { name: 'Creative', icon: '🎨', color: '#f59e0b' },
  { name: 'Finance', icon: '💰', color: '#14b8a6' },
  { name: 'Other', icon: '⭐', color: '#6b7280' },
];

const PRESET_HABITS = [
  { name: 'Drink Water', category: 'Health', icon: '💧', targetCount: 8 },
  { name: 'Exercise', category: 'Health', icon: '🏃', targetCount: 1 },
  { name: 'Read Books', category: 'Learning', icon: '📚', targetCount: 1 },
  { name: 'Meditate', category: 'Mindfulness', icon: '🧘', targetCount: 1 },
  { name: 'Journal', category: 'Mindfulness', icon: '✍️', targetCount: 1 },
  { name: 'Study', category: 'Learning', icon: '📖', targetCount: 1 },
  { name: 'Sleep Early', category: 'Health', icon: '😴', targetCount: 1 },
  { name: 'No Phone Before Bed', category: 'Health', icon: '📵', targetCount: 1 },
];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabitStore();
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(HABIT_CATEGORIES[0]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [targetCount, setTargetCount] = useState(1);
  const [customIcon, setCustomIcon] = useState('');
  const [showPresets, setShowPresets] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    addHabit({
      name: habitName,
      description,
      icon: customIcon || selectedCategory.icon,
      color: selectedCategory.color,
      frequency,
      targetCount,
      category: selectedCategory.name,
    });

    resetForm();
    onClose();
  };

  const handlePresetSelect = (preset: typeof PRESET_HABITS[0]) => {
    setHabitName(preset.name);
    const category = HABIT_CATEGORIES.find(c => c.name === preset.category) || HABIT_CATEGORIES[0];
    setSelectedCategory(category);
    setCustomIcon(preset.icon);
    setTargetCount(preset.targetCount);
    setShowPresets(false);
  };

  const resetForm = () => {
    setHabitName('');
    setDescription('');
    setSelectedCategory(HABIT_CATEGORIES[0]);
    setFrequency('daily');
    setTargetCount(1);
    setCustomIcon('');
    setShowPresets(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Add New Habit</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {showPresets && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Add</h3>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_HABITS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetSelect(preset)}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <span className="text-xl">{preset.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habit Name
              </label>
              <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="e.g., Morning Exercise"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add notes about this habit..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="grid grid-cols-4 gap-2">
                {HABIT_CATEGORIES.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCategory.name === category.name
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-xs text-gray-600">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target/Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={targetCount}
                  onChange={(e) => setTargetCount(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Habit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;