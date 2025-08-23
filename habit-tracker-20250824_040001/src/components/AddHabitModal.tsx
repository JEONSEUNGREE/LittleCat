import React, { useState } from 'react';
import { X, Plus, Dumbbell, Book, Heart, Coffee, Moon, Sparkles } from 'lucide-react';
import { useHabitStore } from '../store/habitStore';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_HABITS = [
  { title: '운동하기', icon: 'dumbbell', color: '#ef4444', description: '30분 운동' },
  { title: '독서하기', icon: 'book', color: '#3b82f6', description: '20페이지 읽기' },
  { title: '명상하기', icon: 'heart', color: '#ec4899', description: '10분 명상' },
  { title: '물 마시기', icon: 'coffee', color: '#06b6d4', description: '8잔 마시기' },
  { title: '일찍 자기', icon: 'moon', color: '#8b5cf6', description: '11시 전 취침' },
];

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const addHabit = useHabitStore((state) => state.addHabit);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [selectedIcon, setSelectedIcon] = useState('sparkles');
  const [selectedColor, setSelectedColor] = useState('#6366f1');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addHabit({
      title,
      description,
      icon: selectedIcon,
      color: selectedColor,
      targetDays: selectedDays,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedDays([1, 2, 3, 4, 5]);
    setSelectedIcon('sparkles');
    setSelectedColor('#6366f1');
    onClose();
  };
  
  const handlePresetSelect = (preset: typeof PRESET_HABITS[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setSelectedIcon(preset.icon);
    setSelectedColor(preset.color);
  };
  
  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">새 습관 추가</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">추천 습관</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_HABITS.map((preset) => (
              <button
                key={preset.title}
                onClick={() => handlePresetSelect(preset)}
                className="p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium">{preset.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              습관 이름
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="예: 매일 운동하기"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 (선택)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="예: 30분 이상"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              반복 요일
            </label>
            <div className="flex gap-2">
              {DAYS_OF_WEEK.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all ${
                    selectedDays.includes(index)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              색상
            </label>
            <div className="flex gap-2">
              {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'].map(
                (color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-xl transition-all ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            습관 추가하기
          </button>
        </form>
      </div>
    </div>
  );
};