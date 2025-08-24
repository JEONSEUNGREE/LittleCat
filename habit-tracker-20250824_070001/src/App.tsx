import { useState, useEffect } from 'react';
import { Plus, Moon, Sun, Menu, X as CloseIcon, Trash2 } from 'lucide-react';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import StatsCard from './components/StatsCard';
import useHabitStore from './store/useHabitStore';

function App() {
  const { habits, deleteHabit } = useHabitStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    // 초기 샘플 습관 추가 (처음 사용자용)
    if (habits.length === 0) {
      const sampleHabits = [
        {
          title: '물 8잔 마시기',
          description: '하루 2L 이상 수분 섭취',
          icon: 'heart',
          color: '#3B82F6',
          targetFrequency: 'daily' as const,
          targetCount: 1,
        },
        {
          title: '10분 명상',
          description: '마음의 평화 찾기',
          icon: 'brain',
          color: '#8B5CF6',
          targetFrequency: 'daily' as const,
          targetCount: 1,
        },
        {
          title: '운동하기',
          description: '건강한 몸 만들기',
          icon: 'trophy',
          color: '#10B981',
          targetFrequency: 'weekly' as const,
          targetCount: 3,
        },
      ];

      sampleHabits.forEach((habit) => {
        useHabitStore.getState().addHabit(habit);
      });
    }
  }, []);

  const handleDeleteHabit = (habitId: string) => {
    if (window.confirm('이 습관을 삭제하시겠습니까?')) {
      deleteHabit(habitId);
    }
  };

  const today = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Habit Tracker</h1>
                <p className="text-white/80 text-sm">{today}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-white" />
                  ) : (
                    <Moon className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {showMenu ? (
                    <CloseIcon className="w-5 h-5 text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Menu Dropdown */}
        {showMenu && (
          <div className="absolute top-20 right-4 bg-white rounded-2xl shadow-xl p-2 z-50 animate-slide-up">
            <button
              onClick={() => {
                setDeleteMode(!deleteMode);
                setShowMenu(false);
              }}
              className="w-full px-4 py-3 text-left rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
              <span className="text-gray-700">
                {deleteMode ? '삭제 모드 끄기' : '습관 삭제하기'}
              </span>
            </button>
          </div>
        )}

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Stats Card */}
          <div className="mb-8">
            <StatsCard />
          </div>

          {/* Delete Mode Banner */}
          {deleteMode && (
            <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-500/30">
              <p className="text-white text-center text-sm">
                삭제할 습관을 선택하세요. 완료되면 메뉴에서 삭제 모드를 끄세요.
              </p>
            </div>
          )}

          {/* Habits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <div key={habit.id} className="relative">
                {deleteMode && (
                  <button
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <CloseIcon className="w-4 h-4 text-white" />
                  </button>
                )}
                <HabitCard habit={habit} />
              </div>
            ))}

            {/* Add Habit Button */}
            {!deleteMode && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="min-h-[160px] rounded-2xl border-2 border-dashed border-white/30 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-3 hover:bg-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/80 font-medium">새 습관 추가</span>
              </button>
            )}
          </div>

          {habits.length === 0 && !deleteMode && (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-3xl">
                <h3 className="text-2xl font-bold text-white mb-3">
                  첫 습관을 만들어보세요!
                </h3>
                <p className="text-white/80 mb-6">
                  작은 습관이 큰 변화를 만듭니다
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-white/90 transition-all transform active:scale-95"
                >
                  시작하기
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Floating Action Button (Mobile) */}
        {!deleteMode && habits.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-30 lg:hidden"
          >
            <Plus className="w-6 h-6 text-purple-600" />
          </button>
        )}

        {/* Add Habit Modal */}
        <AddHabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default App;