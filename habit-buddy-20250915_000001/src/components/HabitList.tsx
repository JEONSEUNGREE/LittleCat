import { useHabitStore } from '../store/habitStore';
import { Check, Plus, Trash2 } from 'lucide-react';

export default function HabitList() {
  const { habits, toggleHabit, incrementHabit, deleteHabit } = useHabitStore();

  if (habits.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
        <div className="text-6xl mb-4">🌱</div>
        <p className="text-gray-500 mb-1">아직 등록된 습관이 없어요</p>
        <p className="text-sm text-gray-400">새로운 습관을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`habit-card ${habit.completedToday ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${habit.color} rounded-xl flex items-center justify-center text-2xl`}>
                {habit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {habit.currentCount}/{habit.targetCount}
                  </span>
                  {habit.streak > 0 && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                      🔥 {habit.streak}일
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {habit.targetCount > 1 ? (
                <button
                  onClick={() => incrementHabit(habit.id)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    habit.completedToday
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  disabled={habit.completedToday}
                >
                  {habit.completedToday ? <Check size={18} /> : <Plus size={18} />}
                </button>
              ) : (
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    habit.completedToday
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <Check size={18} />
                </button>
              )}
              <button
                onClick={() => deleteHabit(habit.id)}
                className="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {habit.targetCount > 1 && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(habit.currentCount / habit.targetCount) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}