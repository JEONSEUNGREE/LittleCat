import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useHabitStore } from '../store/habitStore';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMOJI_OPTIONS = ['💪', '📚', '💧', '🏃', '🧘', '🎯', '✍️', '🎨', '🌱', '💻', '🎵', '🍎'];
const COLOR_OPTIONS = ['red', 'blue', 'green', 'purple', 'yellow', 'pink', 'indigo', 'orange'];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabitStore();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('💪');
  const [color, setColor] = useState('blue');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addHabit({
      name: name.trim(),
      emoji,
      color,
      frequency,
    });
    
    setName('');
    setEmoji('💪');
    setColor('blue');
    setFrequency('daily');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create New Habit</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all"
              placeholder="e.g., Drink 8 glasses of water"
              autoFocus
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose an Emoji
            </label>
            <div className="grid grid-cols-6 gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`p-3 rounded-lg text-2xl transition-all ${
                    emoji === e 
                      ? 'bg-primary-100 ring-2 ring-primary-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Theme
            </label>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-10 rounded-lg transition-all ${
                    color === c 
                      ? 'ring-2 ring-offset-2 ring-gray-400' 
                      : ''
                  }`}
                  style={{
                    backgroundColor: c === 'red' ? '#ef4444' :
                                   c === 'blue' ? '#3b82f6' :
                                   c === 'green' ? '#10b981' :
                                   c === 'purple' ? '#8b5cf6' :
                                   c === 'yellow' ? '#f59e0b' :
                                   c === 'pink' ? '#ec4899' :
                                   c === 'indigo' ? '#6366f1' :
                                   '#f97316'
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`py-3 rounded-lg font-medium transition-all ${
                  frequency === 'daily'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`py-3 rounded-lg font-medium transition-all ${
                  frequency === 'weekly'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};