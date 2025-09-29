import React, { useState, useEffect } from 'react'
import { Brain, Target, Award, Clock, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { useMemoryStore } from '../store/useMemoryStore'

const MemoryTrainer: React.FC = () => {
  const { currentPalace, memoryPath, updateMemoryPath, statistics } = useMemoryStore()
  const [trainingMode, setTrainingMode] = useState<'recall' | 'path' | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning])

  const startRecallTraining = () => {
    if (!currentPalace || currentPalace.rooms.length === 0) {
      alert('먼저 궁전에 방과 아이템을 추가하세요!')
      return
    }
    setTrainingMode('recall')
    setCurrentStep(0)
    setScore(0)
    setCorrectAnswers(0)
    setTotalQuestions(0)
    setTimeElapsed(0)
    setIsTimerRunning(true)
  }

  const startPathTraining = () => {
    if (!currentPalace || currentPalace.rooms.length < 2) {
      alert('경로 훈련을 위해 최소 2개의 방이 필요합니다!')
      return
    }
    setTrainingMode('path')
    setCurrentStep(0)
    setScore(0)
    setTimeElapsed(0)
    setIsTimerRunning(true)
  }

  const checkRecallAnswer = () => {
    if (!currentPalace) return
    
    const allItems = currentPalace.rooms.flatMap(room => room.items)
    if (currentStep < allItems.length) {
      const currentItem = allItems[currentStep]
      const isCorrect = userAnswer.toLowerCase().trim() === currentItem.content.toLowerCase().trim()
      
      if (isCorrect) {
        setScore(score + 10)
        setCorrectAnswers(correctAnswers + 1)
      }
      
      setTotalQuestions(totalQuestions + 1)
      setUserAnswer('')
      
      if (currentStep === allItems.length - 1) {
        endTraining()
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const navigateRoom = (roomId: string) => {
    updateMemoryPath(roomId)
    setScore(score + 5)
    
    if (memoryPath.length >= (currentPalace?.rooms.length || 0) - 1) {
      endTraining()
    }
  }

  const endTraining = () => {
    setIsTimerRunning(false)
    setShowResult(true)
  }

  const resetTraining = () => {
    setTrainingMode(null)
    setCurrentStep(0)
    setScore(0)
    setShowResult(false)
    setUserAnswer('')
    setCorrectAnswers(0)
    setTotalQuestions(0)
    setTimeElapsed(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentPalace) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">먼저 기억 궁전을 만들어주세요</p>
        </div>
      </div>
    )
  }

  if (showResult) {
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-6">훈련 완료!</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">점수</span>
              <span className="text-xl font-bold text-indigo-600">{score}점</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">정확도</span>
              <span className="text-xl font-bold text-green-600">{accuracy}%</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">소요 시간</span>
              <span className="text-xl font-bold text-blue-600">{formatTime(timeElapsed)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">정답/전체</span>
              <span className="text-xl font-bold">{correctAnswers}/{totalQuestions}</span>
            </div>
          </div>
          
          <button
            onClick={resetTraining}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            다시 훈련하기
          </button>
        </div>
      </div>
    )
  }

  if (trainingMode === 'recall') {
    const allItems = currentPalace.rooms.flatMap(room => room.items)
    const currentItem = allItems[currentStep]
    
    if (!currentItem) {
      endTraining()
      return null
    }
    
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">기억력 테스트</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{formatTime(timeElapsed)}</span>
              </div>
              <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                {currentStep + 1}/{allItems.length}
              </span>
            </div>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-600 mb-2">이 위치에 있는 아이템은?</p>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-6">
              <p className="text-lg font-medium">
                방: {currentPalace.rooms.find(r => r.items.includes(currentItem))?.name}
              </p>
            </div>
            
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkRecallAnswer()}
              placeholder="답을 입력하세요"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              autoFocus
            />
            
            <button
              onClick={checkRecallAnswer}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (trainingMode === 'path') {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">경로 훈련</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{formatTime(timeElapsed)}</span>
              </div>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                점수: {score}
              </span>
            </div>
          </div>
          
          <p className="text-center text-gray-600 mb-6">
            방을 순서대로 방문하여 경로를 만드세요
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {currentPalace.rooms.map(room => {
              const isVisited = memoryPath.includes(room.id)
              return (
                <button
                  key={room.id}
                  onClick={() => !isVisited && navigateRoom(room.id)}
                  disabled={isVisited}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isVisited 
                      ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
                      : 'bg-white border-indigo-300 hover:border-indigo-500 hover:shadow-lg'
                  }`}
                >
                  <Target className={`w-8 h-8 mx-auto mb-2 ${isVisited ? 'text-gray-400' : 'text-indigo-600'}`} />
                  <p className="font-medium">{room.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {room.items.length} 아이템
                  </p>
                  {isVisited && <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-2" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <Brain className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-center mb-8">기억력 훈련</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={startRecallTraining}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Brain className="w-8 h-8 mb-3" />
            <h3 className="font-bold mb-2">기억력 테스트</h3>
            <p className="text-sm opacity-90">저장한 아이템을 기억해보세요</p>
          </button>
          
          <button
            onClick={startPathTraining}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Target className="w-8 h-8 mb-3" />
            <h3 className="font-bold mb-2">경로 훈련</h3>
            <p className="text-sm opacity-90">방을 순서대로 탐험하세요</p>
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">통계</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">총 아이템</span>
              <span className="font-medium">{statistics.totalItems}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">성공률</span>
              <span className="font-medium text-green-600">{statistics.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">연속 학습</span>
              <span className="font-medium text-indigo-600">{statistics.streakDays}일</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}