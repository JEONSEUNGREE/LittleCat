import { useState } from 'react';
import { useHabitStore } from '../store/habitStore';
import { X } from 'lucide-react';

interface AddHabitModalProps {
  onClose: () => void;
}

const habitIcons = ['💧', '🏃', '📚', '🧘', '💪', '🎯', '✍️', '🌱', '🎨', '🎵', '💻', '🍎'];
const habitColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-teal-500',
];

export default function AddHabitModal({ onClose }: AddHabitModalProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('💧');
  const [color, setColor] = useState('bg-blue-500');
  const [targetCount, setTargetCount] = useState(1);
  const { addHabit } = useHabitStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabit({ name, icon, color, targetCount });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">새로운 습관 추가</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">습관 이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="예: 물 8잔 마시기"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">아이콘 선택</label>
            <div className="grid grid-cols-6 gap-2">
              {habitIcons.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    icon === emoji
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">색상 선택</label>
            <div className="flex gap-2">
              {habitColors.map((bgColor) => (
                <button
                  key={bgColor}
                  type="button"
                  onClick={() => setColor(bgColor)}
                  className={`w-10 h-10 rounded-lg ${bgColor} ${
                    color === bgColor ? 'ring-2 ring-offset-2 ring-gray-800' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 횟수 (하루)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTargetCount(Math.max(1, targetCount - 1))}
                className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={targetCount}
                onChange={(e) => setTargetCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center px-3 py-2 border border-gray-200 rounded-lg"
                min="1"
              />
              <button
                type="button"
                onClick={() => setTargetCount(targetCount + 1)}
                className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
              disabled={!name.trim()}
            >
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}