import { useState } from 'react';
import { X } from 'lucide-react';
import { HabitCategory } from '../types';
import useHabitStore from '../store/habitStore';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: { value: HabitCategory; label: string; icon: string; color: string }[] = [
  { value: 'health', label: 'Health', icon: '💊', color: 'bg-red-500' },
  { value: 'productivity', label: 'Productivity', icon: '📈', color: 'bg-blue-500' },
  { value: 'learning', label: 'Learning', icon: '📚', color: 'bg-purple-500' },
  { value: 'fitness', label: 'Fitness', icon: '💪', color: 'bg-orange-500' },
  { value: 'mindfulness', label: 'Mindfulness', icon: '🧘', color: 'bg-teal-500' },
  { value: 'social', label: 'Social', icon: '👥', color: 'bg-pink-500' },
  { value: 'creative', label: 'Creative', icon: '🎨', color: 'bg-yellow-500' },
  { value: 'financial', label: 'Financial', icon: '💰', color: 'bg-green-500' },
  { value: 'custom', label: 'Custom', icon: '⭐', color: 'bg-gray-500' },
];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabitStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HabitCategory>('productivity');
  const [targetFrequency, setTargetFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedCategory = categories.find(c => c.value === category);
    
    addHabit({
      name: name.trim(),
      description: description.trim(),
      category,
      color: selectedCategory?.color || 'bg-blue-500',
      icon: selectedCategory?.icon || '⭐',
      targetFrequency,
    });

    // Reset form
    setName('');
    setDescription('');
    setCategory('productivity');
    setTargetFrequency('daily');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-6 animate-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Habit Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Habit Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Morning Exercise"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Optional description..."
              rows={2}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    category === cat.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-xs font-medium text-gray-700">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Frequency
            </label>
            <div className="flex gap-2">
              {(['daily', 'weekly'] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setTargetFrequency(freq)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    targetFrequency === freq
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 active:scale-[0.98] transition-all shadow-lg shadow-primary-500/25"
          >
            Create Habit Chain
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;