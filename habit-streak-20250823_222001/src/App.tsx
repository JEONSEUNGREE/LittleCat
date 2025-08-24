import { useState } from 'react';
import { Plus, Flame, Trophy, Calendar } from 'lucide-react';
import { useHabitStore } from './store/useHabitStore';
import { Habit } from './types';

const HABIT_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

const HABIT_EMOJIS = ['🏃‍♂️', '📚', '💧', '🧘‍♀️', '💪', '🌱', '🎯', '✨'];

function App() {
  const {
    habits,
    addHabit,
    toggleHabitCompletion,
    getTodayProgress
  } = useHabitStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(HABIT_EMOJIS[0]);
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);

  const today = new Date().toISOString().split('T')[0];
  const progress = getTodayProgress();

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    addHabit({
      name: newHabitName.trim(),
      emoji: selectedEmoji,
      color: selectedColor,
      frequency: 'daily'
    });

    setNewHabitName('');
    setShowAddModal(false);
  };

  const handleToggleHabit = (habitId: string) => {
    toggleHabitCompletion(habitId, today);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">습관 스트릭</h1>
              <p className="text-gray-600 mt-1">매일의 작은 변화가 큰 성취를 만듭니다</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {progress.completed}/{progress.total}
              </div>
              <div className="text-sm text-gray-500">오늘 완료</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {progress.total > 0 && (
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">오늘의 진행률</span>
              <span className="text-sm font-bold text-blue-600">
                {Math.round((progress.completed / progress.total) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Habits List */}
      <div className="max-w-md mx-auto px-4">
        <div className="space-y-4">
          {habits.map((habit: Habit) => {
            const isCompleted = habit.completedDates.includes(today);
            
            return (
              <div
                key={habit.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-200 ${
                  isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${habit.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                      {habit.emoji}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-orange-600">
                            {habit.streak}일
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">
                            최고 {habit.bestStreak}일
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {isCompleted && <span className="text-sm">✓</span>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {habits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              첫 번째 습관을 만들어보세요
            </h3>
            <p className="text-gray-600 mb-6">
              작은 변화부터 시작해서 꾸준히 이어나가세요
            </p>
          </div>
        )}

        {/* Add Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Add Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">새 습관 추가</h2>
            
            <form onSubmit={handleAddHabit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  습관 이름
                </label>
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="예: 물 마시기, 독서, 운동"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이모지 선택
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {HABIT_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`p-3 rounded-lg text-xl transition-all ${
                        selectedEmoji === emoji
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  색상 선택
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {HABIT_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-lg ${color} transition-all ${
                        selectedColor === color
                          ? 'ring-4 ring-blue-300'
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!newHabitName.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;