import React from 'react'
import { Volume2, VolumeX, RotateCcw, Play } from 'lucide-react'
import useGameStore from '../store/gameStore'
import SoundTile from './SoundTile'

const GameBoard: React.FC = () => {
  const {
    level,
    score,
    lives,
    isPlaying,
    currentPattern,
    userPattern,
    availableSounds,
    isShowingPattern,
    highScore,
    combo,
    startGame,
    endGame,
    addToUserPattern,
    showPattern
  } = useGameStore()

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-left">
            <p className="text-sm text-gray-400">레벨</p>
            <p className="text-2xl font-bold text-white">{level}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">점수</p>
            <p className="text-2xl font-bold text-yellow-400">{score}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">생명</p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${i < lives ? 'text-red-500' : 'text-gray-600'}`}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {combo > 0 && (
          <div className="text-center">
            <p className="text-sm text-orange-400">콤보 x{combo}</p>
          </div>
        )}
        
        <div className="text-center text-xs text-gray-500 mt-2">
          최고 점수: {highScore}
        </div>
      </div>

      {/* Pattern Display */}
      {isPlaying && currentPattern.length > 0 && (
        <div className="bg-gray-800 bg-opacity-30 rounded-2xl p-4 mb-6">
          <h3 className="text-sm text-gray-400 mb-3">
            {isShowingPattern ? '패턴을 잘 들어보세요!' : '패턴을 따라해보세요!'}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {currentPattern.map((tile, index) => (
              <div
                key={index}
                className={`
                  w-12 h-12 rounded-lg
                  ${userPattern[index] 
                    ? `bg-gradient-to-br ${
                        userPattern[index].id === tile.id 
                          ? 'from-green-400 to-green-600' 
                          : 'from-red-400 to-red-600'
                      }`
                    : 'bg-gray-700'
                  }
                  ${tile.isActive ? 'ring-2 ring-white animate-pulse' : ''}
                  transition-all duration-300
                `}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sound Grid */}
      {isPlaying && availableSounds.length > 0 && (
        <div className="bg-gray-800 bg-opacity-30 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
            {availableSounds.map((tile) => (
              <SoundTile
                key={tile.id}
                sound={tile.sound}
                frequency={tile.frequency}
                isActive={tile.isActive}
                onClick={() => addToUserPattern(tile)}
                disabled={isShowingPattern || userPattern.length >= currentPattern.length}
                size="medium"
              />
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center gap-2"
          >
            <Play size={20} />
            게임 시작
          </button>
        ) : (
          <>
            <button
              onClick={showPattern}
              disabled={isShowingPattern}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isShowingPattern ? <VolumeX size={20} /> : <Volume2 size={20} />}
              다시 듣기
            </button>
            <button
              onClick={endGame}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center gap-2"
            >
              <RotateCcw size={20} />
              포기하기
            </button>
          </>
        )}
      </div>

      {/* Instructions */}
      {!isPlaying && (
        <div className="mt-8 bg-gray-900 bg-opacity-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">게임 방법</h2>
          <ul className="text-left text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>다양한 소리로 구성된 패턴을 잘 들어보세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>들은 순서대로 소리 타일을 클릭하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>레벨이 올라갈수록 패턴이 길어지고 복잡해집니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>연속으로 성공하면 콤보 보너스를 받습니다</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default GameBoard