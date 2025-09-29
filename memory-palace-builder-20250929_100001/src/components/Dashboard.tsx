import React, { useState } from 'react'
import { Plus, Castle, Brain, Trophy, TrendingUp, Calendar, Target } from 'lucide-react'
import { useMemoryStore } from '../store/useMemoryStore'

const Dashboard: React.FC = () => {
  const { palaces, statistics, createPalace, selectPalace } = useMemoryStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [palaceName, setPalaceName] = useState('')

  const handleCreatePalace = () => {
    if (palaceName.trim()) {
      createPalace(palaceName)
      setPalaceName('')
      setShowCreateModal(false)
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (days > 0) return `${days}일 전`
    if (hours > 0) return `${hours}시간 전`
    if (minutes > 0) return `${minutes}분 전`
    return '방금 전'
  }

  return (
    <div className="p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">기억의 궁전</h1>
        <p className="text-gray-600">공간 기억법으로 더 많이, 더 오래 기억하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Brain className="w-8 h-8 text-purple-500" />
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{statistics.totalItems}</p>
          <p className="text-sm text-gray-600">저장된 기억</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              +5%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{statistics.successRate}%</p>
          <p className="text-sm text-gray-600">성공률</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-500" />
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{statistics.streakDays}</p>
          <p className="text-sm text-gray-600">연속 학습일</p>
        </div>
      </div>

      {/* 궁전 목록 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">내 궁전들</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            새 궁전
          </button>
        </div>

        {palaces.length === 0 ? (
          <div className="text-center py-12">
            <Castle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">아직 생성된 궁전이 없습니다</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              첫 궁전 만들기
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {palaces.map(palace => (
              <button
                key={palace.id}
                onClick={() => selectPalace(palace.id)}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Castle className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-800">{palace.name}</h3>
                  </div>
                  <span className="text-xs text-gray-500">
                    {getTimeAgo(palace.lastVisited)}
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">{palace.rooms.length}</span> 방
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium">
                      {palace.rooms.reduce((acc, room) => acc + room.items.length, 0)}
                    </span> 아이템
                  </span>
                </div>
                
                <div className="mt-3 flex gap-2">
                  {palace.rooms.slice(0, 3).map(room => (
                    <span
                      key={room.id}
                      className="text-xs bg-white px-2 py-1 rounded-full border"
                    >
                      {room.name}
                    </span>
                  ))}
                  {palace.rooms.length > 3 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      +{palace.rooms.length - 3}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 궁전 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">새 기억의 궁전</h3>
            <p className="text-gray-600 mb-6">
              궁전 이름을 정하고 기억 여행을 시작하세요
            </p>
            
            <input
              type="text"
              placeholder="예: 우리 집, 학교, 좋아하는 카페"
              value={palaceName}
              onChange={(e) => setPalaceName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreatePalace()}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleCreatePalace}
                disabled={!palaceName.trim()}
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}