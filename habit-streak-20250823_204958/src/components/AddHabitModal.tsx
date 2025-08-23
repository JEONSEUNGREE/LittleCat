import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: { title: string; emoji: string; targetDays: number; color: string }) => void;
}

const emojis = ['🏃', '💪', '📚', '💧', '🧘', '🎨', '🌱', '💤', '🎯', '✍️', '🎸', '🍎'];
const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎯');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [targetDays, setTargetDays] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        emoji: selectedEmoji,
        targetDays,
        color: selectedColor,
      });
      setTitle('');
      setSelectedEmoji('🎯');
      setTargetDays(30);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-bounce-slow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Habit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Morning Run"
              maxLength={30}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose an Emoji
            </label>
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-3 text-2xl rounded-lg transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Days
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="7"
                max="365"
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-semibold text-gray-800 w-16 text-center">
                {targetDays}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Theme
            </label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;