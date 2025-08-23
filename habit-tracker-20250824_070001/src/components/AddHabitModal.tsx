import React, { useState } from 'react';
import { X, Flame, Trophy, Target, Heart, Brain, Coffee } from 'lucide-react';
import useHabitStore from '../store/useHabitStore';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const icons = [
  { name: 'flame', component: Flame },
  { name: 'trophy', component: Trophy },
  { name: 'target', component: Target },
  { name: 'heart', component: Heart },
  { name: 'brain', component: Brain },
  { name: 'coffee', component: Coffee },
];

const colors = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabitStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('flame');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [targetCount, setTargetCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addHabit({
      title: title.trim(),
      description: description.trim(),
      icon: selectedIcon,
      color: selectedColor,
      targetFrequency: frequency,
      targetCount,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSelectedIcon('flame');
    setSelectedColor(colors[0]);
    setFrequency('daily');
    setTargetCount(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">새 습관 만들기</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              습관 이름
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="예: 물 8잔 마시기"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 (선택사항)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
              placeholder="이 습관의 목표나 동기를 적어보세요"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              아이콘 선택
            </label>
            <div className="grid grid-cols-6 gap-3">
              {icons.map(({ name, component: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedIcon(name)}
                  className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                    selectedIcon === name
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      selectedIcon === name ? 'text-primary-600' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              색상 선택
            </label>
            <div className="grid grid-cols-6 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-full aspect-square rounded-xl transition-all ${
                    selectedColor === color
                      ? 'ring-2 ring-offset-2 ring-gray-400'
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              빈도 설정
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  frequency === 'daily'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                매일
              </button>
              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  frequency === 'weekly'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                주간
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  frequency === 'monthly'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                월간
              </button>
            </div>
          </div>

          {frequency !== 'daily' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                목표 횟수
              </label>
              <input
                type="number"
                value={targetCount}
                onChange={(e) => setTargetCount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={frequency === 'weekly' ? 7 : 30}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all transform active:scale-95"
          >
            습관 만들기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;