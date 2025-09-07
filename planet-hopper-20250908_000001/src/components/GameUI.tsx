import React from 'react'
import { useGameStore } from '../store/gameStore'
import { Fuel, Star, Zap, Pause, Play, RotateCcw, Trophy } from 'lucide-react'

export default function GameUI() {
  const {
    score,
    bestScore,
    level,
    fuel,
    maxFuel,
    isPlaying,
    isPaused,
    visitedPlanets,
    planets,
    pauseGame,
    resumeGame,
    startGame
  } = useGameStore()
  
  const progress = (visitedPlanets.length / planets.length) * 100
  
  return (
    <>
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-white">
            <Star className="text-yellow-400" size={20} />
            <span className="font-bold text-lg">{score}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Trophy size={16} />
            <span>{bestScore}</span>
          </div>
        </div>
        
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 text-white mb-1">
            <Zap className="text-purple-400" size={20} />
            <span className="font-bold">Level {level}</span>
          </div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <button
          onClick={isPaused ? resumeGame : pauseGame}
          className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-black/70 transition-colors"
          disabled={!isPlaying}
        >
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
      </div>
      
      {/* Bottom HUD - Fuel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Fuel className="text-orange-400" size={20} />
            <span className="text-white font-bold">Fuel</span>
            <span className="text-gray-300 text-sm ml-auto">{fuel}/{maxFuel}</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${
                fuel > 50 ? 'bg-green-500' : fuel > 20 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${(fuel / maxFuel) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Game Over / Start Screen */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-30">
          <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-2 text-center">
              Planet Hopper
            </h1>
            <p className="text-gray-300 text-center mb-6">
              Jump between planets using gravity!
            </p>
            
            {score > 0 && (
              <div className="bg-black/30 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-white">
                  <span>Score:</span>
                  <span className="font-bold">{score}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Best:</span>
                  <span className="font-bold">{bestScore}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Level:</span>
                  <span className="font-bold">{level}</span>
                </div>
              </div>
            )}
            
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              {score > 0 ? 'Play Again' : 'Start Game'}
            </button>
            
            <div className="mt-6 text-gray-400 text-sm text-center">
              <p>Tap and drag to aim</p>
              <p>Release to launch!</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Pause Menu */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 rounded-2xl p-6 max-w-xs w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Paused</h2>
            <div className="space-y-3">
              <button
                onClick={resumeGame}
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Resume
              </button>
              <button
                onClick={startGame}
                className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}