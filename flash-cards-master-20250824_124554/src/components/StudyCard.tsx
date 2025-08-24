import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCw, Check, X } from 'lucide-react'
import { useFlashCardStore } from '../store/flashCardStore'

interface StudyCardProps {
  onBack: () => void
}

export const StudyCard: React.FC<StudyCardProps> = ({ onBack }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
  const { 
    studySession, 
    markCardAsCorrect, 
    markCardAsIncorrect,
    nextCard,
    previousCard,
    endStudySession
  } = useFlashCardStore()

  if (!studySession || !studySession.isActive) {
    return null
  }

  const currentCard = studySession.sessionCards[studySession.currentCardIndex]
  const progress = ((studySession.currentCardIndex + 1) / studySession.sessionCards.length) * 100
  const isLastCard = studySession.currentCardIndex === studySession.sessionCards.length - 1

  const handleCorrect = () => {
    markCardAsCorrect(currentCard.id)
    setShowResult(true)
    setTimeout(() => {
      if (!isLastCard) {
        nextCard()
        setIsFlipped(false)
        setShowResult(false)
      } else {
        handleFinishSession()
      }
    }, 1000)
  }

  const handleIncorrect = () => {
    markCardAsIncorrect(currentCard.id)
    setShowResult(true)
    setTimeout(() => {
      if (!isLastCard) {
        nextCard()
        setIsFlipped(false)
        setShowResult(false)
      } else {
        handleFinishSession()
      }
    }, 1000)
  }

  const handleFinishSession = () => {
    const accuracy = studySession.correctAnswers / (studySession.correctAnswers + studySession.incorrectAnswers) * 100
    alert(`학습 완료!\n정답률: ${accuracy.toFixed(0)}%\n맞춘 문제: ${studySession.correctAnswers}/${studySession.sessionCards.length}`)
    endStudySession()
    onBack()
  }

  const handlePrevious = () => {
    if (studySession.currentCardIndex > 0) {
      previousCard()
      setIsFlipped(false)
      setShowResult(false)
    }
  }

  const handleNext = () => {
    if (!isLastCard) {
      nextCard()
      setIsFlipped(false)
      setShowResult(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 mx-4">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {studySession.currentCardIndex + 1} / {studySession.sessionCards.length}
            </p>
          </div>
          <button
            onClick={handleFinishSession}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            종료
          </button>
        </div>

        {/* Card Display */}
        <div className="relative h-80 mb-8">
          <div 
            className={`card-flip w-full h-full ${isFlipped ? 'flipped' : ''}`}
            onClick={() => !showResult && setIsFlipped(!isFlipped)}
          >
            {/* Front of card */}
            <div className="card-face bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-primary-100">
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(currentCard.difficulty)}`}>
                  {currentCard.difficulty === 'easy' ? '쉬움' : 
                   currentCard.difficulty === 'medium' ? '보통' : '어려움'}
                </span>
              </div>
              <p className="text-xl font-medium text-center text-gray-900">
                {currentCard.front}
              </p>
              <div className="absolute bottom-4 flex items-center gap-2 text-gray-400">
                <RotateCw className="w-4 h-4" />
                <span className="text-sm">탭하여 뒤집기</span>
              </div>
            </div>

            {/* Back of card */}
            <div className="card-face card-back bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-white">
              <p className="text-xl font-medium text-center">
                {currentCard.back}
              </p>
            </div>
          </div>

          {/* Result overlay */}
          {showResult && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`rounded-full p-4 ${
                showResult ? 'bg-green-100' : 'bg-red-100'
              } animate-pulse`}>
                {showResult ? (
                  <Check className="w-12 h-12 text-green-600" />
                ) : (
                  <X className="w-12 h-12 text-red-600" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isFlipped && !showResult && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleIncorrect}
              className="bg-red-100 text-red-700 py-4 rounded-xl font-medium hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              모르겠어요
            </button>
            <button
              onClick={handleCorrect}
              className="bg-green-100 text-green-700 py-4 rounded-xl font-medium hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              알아요!
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={studySession.currentCardIndex === 0}
            className={`p-3 rounded-full ${
              studySession.currentCardIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors shadow-sm`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{studySession.correctAnswers}</p>
              <p className="text-xs text-gray-600">맞춤</p>
            </div>
            <div className="w-px bg-gray-300 mx-2" />
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{studySession.incorrectAnswers}</p>
              <p className="text-xs text-gray-600">틀림</p>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={isLastCard}
            className={`p-3 rounded-full ${
              isLastCard
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors shadow-sm`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Category Badge */}
        {currentCard.category && (
          <div className="mt-6 text-center">
            <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
              {currentCard.category}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}