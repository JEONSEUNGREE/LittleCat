import React, { useState, useEffect } from 'react'
import { HelpCircle, RotateCcw, Check, X } from 'lucide-react'
import { Puzzle } from '../store/gameStore'

interface PuzzleBoardProps {
  puzzle: Puzzle
  selectedEmojis: string[]
  showHint: boolean
  isCompleted: boolean
  onEmojiSelect: (emoji: string) => void
  onEmojiRemove: (index: number) => void
  onCheckAnswer: () => void
  onToggleHint: () => void
  onResetLevel: () => void
  onNextLevel: () => void
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  puzzle,
  selectedEmojis,
  showHint,
  isCompleted,
  onEmojiSelect,
  onEmojiRemove,
  onCheckAnswer,
  onToggleHint,
  onResetLevel,
  onNextLevel
}) => {
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null)
  const [usedEmojis, setUsedEmojis] = useState<string[]>([])

  useEffect(() => {
    setUsedEmojis([])
    setShowResult(null)
  }, [puzzle])

  const handleEmojiClick = (emoji: string) => {
    if (!usedEmojis.includes(emoji) && selectedEmojis.length < puzzle.answer.length) {
      onEmojiSelect(emoji)
      setUsedEmojis([...usedEmojis, emoji])
    }
  }

  const handleRemoveEmoji = (index: number) => {
    const removedEmoji = selectedEmojis[index]
    onEmojiRemove(index)
    setUsedEmojis(usedEmojis.filter(e => e !== removedEmoji))
  }

  const handleCheckAnswer = () => {
    const isCorrect = selectedEmojis.length === puzzle.answer.length &&
      selectedEmojis.every((emoji, index) => emoji === puzzle.answer[index])
    
    setShowResult(isCorrect ? 'correct' : 'wrong')
    
    if (isCorrect) {
      onCheckAnswer()
      setTimeout(() => {
        if (puzzle.id < 6) {
          onNextLevel()
        }
      }, 1500)
    } else {
      setTimeout(() => {
        setShowResult(null)
        onResetLevel()
      }, 1500)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">{puzzle.question}</h2>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-white/30 rounded-full text-white">
              난이도: {puzzle.difficulty === 'easy' ? '쉬움' : puzzle.difficulty === 'medium' ? '보통' : '어려움'}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-2 min-h-[60px] p-4 bg-white/10 rounded-xl">
            {selectedEmojis.length === 0 ? (
              <span className="text-white/50">이모지를 선택해주세요</span>
            ) : (
              selectedEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleRemoveEmoji(index)}
                  className="text-4xl hover:scale-110 transition-transform cursor-pointer animate-slide-in"
                >
                  {emoji}
                </button>
              ))
            )}
          </div>
          <div className="text-center mt-2 text-white/70 text-sm">
            {selectedEmojis.length} / {puzzle.answer.length} 선택됨
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {puzzle.emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiClick(emoji)}
              disabled={usedEmojis.includes(emoji) || isCompleted}
              className={`text-3xl p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all
                ${usedEmojis.includes(emoji) ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}
                ${isCompleted ? 'cursor-not-allowed' : ''}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {showHint && (
          <div className="mb-4 p-3 bg-yellow-400/20 rounded-lg text-white text-center animate-slide-in">
            💡 힌트: {puzzle.hint}
          </div>
        )}

        {showResult && (
          <div className={`mb-4 p-3 rounded-lg text-white text-center animate-slide-in
            ${showResult === 'correct' ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
            {showResult === 'correct' ? (
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span>정답입니다! 🎉</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                <span>다시 시도해보세요!</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onToggleHint}
            disabled={isCompleted}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500/80 hover:bg-yellow-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HelpCircle className="w-5 h-5" />
            힌트 (-5점)
          </button>
          
          <button
            onClick={() => {
              onResetLevel()
              setUsedEmojis([])
            }}
            disabled={isCompleted}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500/80 hover:bg-orange-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-5 h-5" />
            초기화
          </button>
          
          <button
            onClick={handleCheckAnswer}
            disabled={selectedEmojis.length !== puzzle.answer.length || isCompleted}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/80 hover:bg-green-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default PuzzleBoard