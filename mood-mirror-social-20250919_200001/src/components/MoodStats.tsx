import { useMoodStore } from '../store/moodStore'
import { TrendingUp, Users, Heart, BarChart3 } from 'lucide-react'

function MoodStats() {
  const { getMoodStats, globalMoodFeed, moodHistory } = useMoodStore()
  const stats = getMoodStats()

  const totalEmpathy = globalMoodFeed.reduce((sum, entry) => sum + entry.empathyCount, 0)
  const activeUsers = new Set(globalMoodFeed.map(entry => entry.userId)).size

  const moodColors: Record<string, string> = {
    '행복해요': '#FFD700',
    '평온해요': '#87CEEB',
    '신나요': '#FF6B6B',
    '슬퍼요': '#6C7A89',
    '불안해요': '#9B59B6',
    '감사해요': '#2ECC71',
    '피곤해요': '#95A5A6',
    '화나요': '#E74C3C',
    '사랑스러워요': '#FF69B4'
  }

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-bold text-gray-800">감정 통계</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Users size={20} />
            <span className="text-sm font-medium">활동 중인 사용자</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{activeUsers}명</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <Heart size={20} />
            <span className="text-sm font-medium">총 공감 수</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalEmpathy}개</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <BarChart3 size={20} />
            <span className="text-sm font-medium">공유된 감정</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{globalMoodFeed.length}개</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <TrendingUp size={20} />
            <span className="text-sm font-medium">내 기록</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{moodHistory.length}개</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">현재 감정 분포</h3>
        
        {stats.length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 데이터가 없어요</p>
        ) : (
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div key={stat.mood} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{stat.mood}</span>
                  <span className="text-sm text-gray-600">
                    {stat.count}명 ({stat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${stat.percentage}%`,
                      backgroundColor: moodColors[stat.mood] || '#6C7A89',
                      animation: `slideIn ${0.5 + index * 0.1}s ease-out`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">오늘의 감정 인사이트</h3>
        {stats.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              🎯 가장 많이 공유된 감정은 <strong>{stats[0].mood}</strong>입니다
            </p>
            <p className="text-sm text-gray-700">
              💫 현재 {activeUsers}명이 감정을 공유하고 있어요
            </p>
            <p className="text-sm text-gray-700">
              ❤️ 서로 {totalEmpathy}번의 공감을 나누었어요
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">감정을 공유하고 통계를 확인해보세요!</p>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default MoodStats