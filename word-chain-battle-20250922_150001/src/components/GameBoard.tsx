import React, { useEffect, useRef } from 'react'
import { MessageCircle, User, Bot } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameBoard: React.FC = () => {
  const { words, currentWord, isPlayerTurn } = useGameStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [words])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 mb-4 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          게임 진행
        </h2>
        <div className="text-sm text-gray-600">
          {isPlayerTurn ? '당신 차례' : 'AI 차례'}
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pb-2"
      >
        {words.map((word, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 animate-slide-in ${
              word.player === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {word.player === 'ai' && (
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-purple-600" />
              </div>
            )}
            
            <div className={`relative max-w-[70%] ${
              word.player === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            } px-4 py-2 rounded-2xl ${
              word.player === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
            }`}>
              <p className="text-lg font-medium">{word.text}</p>
              {index === words.length - 1 && currentWord && (
                <div className={`absolute -bottom-6 text-xs ${
                  word.player === 'user' ? 'right-0 text-blue-400' : 'left-0 text-gray-400'
                }`}>
                  다음 글자: <span className="font-bold text-lg">
                    {currentWord[currentWord.length - 1]}
                  </span>
                </div>
              )}
            </div>
            
            {word.player === 'user' && (
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            )}
          </div>
        ))}
        
        {words.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p className="text-center">
              게임을 시작하려면<br />
              아래 시작 버튼을 누르세요
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameBoard