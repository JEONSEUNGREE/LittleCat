import { useState, useEffect } from 'react';
import { useHabitStore } from './store/habitStore';
import HabitList from './components/HabitList';
import ChallengeCard from './components/ChallengeCard';
import AddHabitModal from './components/AddHabitModal';
import ProgressChart from './components/ProgressChart';
import FriendsList from './components/FriendsList';
import Navigation from './components/Navigation';
import { Plus, Trophy, Users, BarChart3, Target } from 'lucide-react';

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'today' | 'challenges' | 'friends' | 'stats'>('today');
  const { habits, challenges, stats, initializeApp } = useHabitStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Header */}
      <header className="safe-top bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Habit Buddy</h1>
              <p className="text-sm text-gray-500 mt-1">오늘의 습관 {habits.filter(h => h.completedToday).length}/{habits.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary-100 px-3 py-1.5 rounded-full">
                <span className="text-primary-700 font-semibold text-sm">
                  🔥 {stats.currentStreak}일
                </span>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary-500 text-white p-2.5 rounded-xl hover:bg-primary-600 active:scale-95 transition-all"
              >
                <Plus size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {activeTab === 'today' && (
          <div className="space-y-6 animate-fade-in">
            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <Target className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.totalCompleted}</p>
                <p className="text-xs text-gray-500">완료한 습관</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.longestStreak}</p>
                <p className="text-xs text-gray-500">최장 연속</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{challenges.length}</p>
                <p className="text-xs text-gray-500">진행중 챌린지</p>
              </div>
            </div>

            {/* Today's Habits */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">오늘의 습관</h2>
              <HabitList />
            </div>

            {/* Active Challenges */}
            {challenges.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">진행중인 챌린지</h2>
                <div className="space-y-3">
                  {challenges.slice(0, 2).map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-900">챌린지</h2>
            {challenges.length > 0 ? (
              challenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">진행중인 챌린지가 없습니다</p>
                <button className="btn-primary mt-4">챌린지 찾기</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">친구들</h2>
            <FriendsList />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-900">통계</h2>
            <ProgressChart />
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">이번 주 성과</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">완료율</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round((stats.totalCompleted / Math.max(habits.length * 7, 1)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">현재 연속</span>
                  <span className="font-semibold text-gray-900">{stats.currentStreak}일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">최장 연속</span>
                  <span className="font-semibold text-gray-900">{stats.longestStreak}일</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Add Habit Modal */}
      {showAddModal && <AddHabitModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}

export default App;