import React from 'react'
import { Music2, Keyboard, Trophy, Play } from 'lucide-react'

interface StartScreenProps {
  onStart: () => void
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Music2 className="w-16 h-16 text-purple-400 animate-bounce-slow" />
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Word Rhythm Battle
          </h1>
          <p className="text-xl text-white/70">리듬에 맞춰 단어를 입력하세요!</p>
        </div>

        {/* How to Play */}
        <div className="word-card space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">How to Play</h2>
          
          <div className="flex items-start gap-3">
            <Keyboard className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Type the Words</p>
              <p className="text-sm text-white/70">화면에 나타나는 단어를 빠르게 입력하세요</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Music2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Follow the Rhythm</p>
              <p className="text-sm text-white/70">비트에 맞춰 정확한 타이밍에 입력하면 더 높은 점수!</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Trophy className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Build Combos</p>
              <p className="text-sm text-white/70">연속으로 성공하면 콤보 보너스를 받을 수 있어요</p>
            </div>
          </div>
        </div>

        {/* Scoring */}
        <div className="word-card">
          <h3 className="text-lg font-semibold mb-3 text-center">Scoring</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-400">Perfect Timing</span>
              <span>100 points × combo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-400">Good Timing</span>
              <span>50 points × combo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Miss</span>
              <span>10 points (combo reset)</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Play className="w-6 h-6" />
          Start Game
        </button>

        {/* Controls Info */}
        <div className="text-center text-sm text-white/50">
          ESC: Pause | Backspace: Delete
        </div>
      </div>
    </div>
  )
}