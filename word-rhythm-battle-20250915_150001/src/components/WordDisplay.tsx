import React from 'react'
import { Word } from '../store/gameStore'

interface WordDisplayProps {
  word: Word
  isActive: boolean
  typedText: string
  opacity?: number
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, isActive, typedText, opacity = 1 }) => {
  const renderWord = () => {
    if (!isActive) {
      return <span className="text-2xl font-mono">{word.text}</span>
    }

    return (
      <span className="text-3xl font-mono tracking-wide">
        {word.text.split('').map((char, index) => {
          const isTyped = index < typedText.length
          const isCorrect = typedText[index] === char
          
          return (
            <span
              key={index}
              className={`
                ${isTyped ? (isCorrect ? 'text-green-400' : 'text-red-400') : 'text-white'}
                ${isActive && index === typedText.length ? 'animate-pulse border-b-2 border-white' : ''}
              `}
            >
              {char}
            </span>
          )
        })}
      </span>
    )
  }

  return (
    <div
      className={`
        word-card min-w-[150px] text-center
        ${isActive ? 'ring-2 ring-purple-400 animate-glow' : ''}
        transition-all duration-300
      `}
      style={{ opacity }}
    >
      {renderWord()}
      {isActive && (
        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-100"
            style={{
              width: `${(typedText.length / word.text.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  )
}