import React from 'react'
import { TrendingUp, Clock, Target, Award } from 'lucide-react'
import useMemoryStore from '../store/memoryStore'

const StatsPanel: React.FC = () => {
  const { cards, sessions, currentSession } = useMemoryStore()
  
  const totalCards = cards.length
  const totalReviews = cards.reduce((sum, card) => sum + card.reviewCount, 0)
  const totalCorrect = cards.reduce((sum, card) => sum + card.correctCount, 0)
  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0
  
  const todaySessions = sessions.filter(session => {
    const sessionDate = new Date(session.startTime)
    const today = new Date()
    return sessionDate.toDateString() === today.toDateString()
  })
  
  const todayStudyTime = todaySessions.reduce((sum, session) => {
    if (session.endTime) {
      const duration = new Date(session.endTime).getTime() - new Date(session.startTime).getTime()
      return sum + duration
    }
    return sum
  }, 0)
  
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return `${hours}시간 ${mins}분`
    }
    return `${mins}분`
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">학습 통계</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <p className="text-white/80 text-sm">전체 카드</p>
          </div>
          <p className="text-2xl font-bold text-white">{totalCards}</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-green-400" />
            <p className="text-white/80 text-sm">정답률</p>
          </div>
          <p className="text-2xl font-bold text-white">{accuracy}%</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <p className="text-white/80 text-sm">오늘 학습</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatTime(todayStudyTime)}</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <p className="text-white/80 text-sm">복습 횟수</p>
          </div>
          <p className="text-2xl font-bold text-white">{totalReviews}</p>
        </div>
      </div>
      
      {currentSession && (
        <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
          <p className="text-white text-sm">
            현재 학습 중 • 카드 {currentSession.cardsStudied}개 완료
          </p>
        </div>
      )}
      
      {/* 최근 학습 기록 */}
      <div className="mt-6">
        <h3 className="text-white font-medium mb-3">최근 학습</h3>
        <div className="space-y-2">
          {sessions.slice(-3).reverse().map(session => (
            <div key={session.id} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <p className="text-white/80 text-sm">
                  카드 {session.cardsStudied}개
                </p>
                <p className="text-white/60 text-xs">
                  {new Date(session.startTime).toLocaleDateString()}
                </p>
              </div>
              {session.correctAnswers > 0 && (
                <p className="text-green-400 text-xs mt-1">
                  정답 {session.correctAnswers}개 ({Math.round((session.correctAnswers / session.cardsStudied) * 100)}%)
                </p>
              )}
            </div>
          ))}
          
          {sessions.length === 0 && (
            <p className="text-white/60 text-sm text-center py-4">
              아직 학습 기록이 없습니다
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatsPanel