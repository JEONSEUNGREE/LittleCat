import React from 'react'
import { useGameStore } from '../store/gameStore'
import { 
  Volume2, 
  VolumeX,
  Smartphone,
  SmartphoneOff,
  Info,
  Github,
  Heart,
  ArrowLeft,
  Sparkles,
  RotateCcw
} from 'lucide-react'

interface SettingsProps {
  onBack: () => void
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { 
    soundEnabled, 
    vibrationEnabled, 
    toggleSound, 
    toggleVibration,
    levels,
    score 
  } = useGameStore()

  const resetProgress = () => {
    if (confirm('정말로 모든 진행 상황을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // Reset all game data
      localStorage.clear()
      window.location.reload()
    }
  }

  const getTotalStars = () => {
    return levels.reduce((acc, level) => acc + level.stars, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 bg-slate-800/50 backdrop-blur rounded-full text-white hover:bg-slate-700/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">설정</h1>
          <div className="w-9" /> {/* Spacer for alignment */}
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          {/* Sound Setting */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
            <button
              onClick={toggleSound}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                {soundEnabled ? (
                  <Volume2 className="w-6 h-6 text-green-400" />
                ) : (
                  <VolumeX className="w-6 h-6 text-red-400" />
                )}
                <div className="text-left">
                  <p className="text-white font-medium">사운드 효과</p>
                  <p className="text-xs text-slate-400">게임 효과음 켜기/끄기</p>
                </div>
              </div>
              <div className={`
                w-12 h-6 rounded-full transition-colors relative
                ${soundEnabled ? 'bg-green-600' : 'bg-slate-600'}
              `}>
                <div className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                  ${soundEnabled ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </div>
            </button>
          </div>

          {/* Vibration Setting */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
            <button
              onClick={toggleVibration}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                {vibrationEnabled ? (
                  <Smartphone className="w-6 h-6 text-green-400" />
                ) : (
                  <SmartphoneOff className="w-6 h-6 text-red-400" />
                )}
                <div className="text-left">
                  <p className="text-white font-medium">진동 피드백</p>
                  <p className="text-xs text-slate-400">터치 진동 효과 켜기/끄기</p>
                </div>
              </div>
              <div className={`
                w-12 h-6 rounded-full transition-colors relative
                ${vibrationEnabled ? 'bg-green-600' : 'bg-slate-600'}
              `}>
                <div className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                  ${vibrationEnabled ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </div>
            </button>
          </div>

          {/* Game Stats */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
            <h3 className="text-white font-medium mb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>게임 통계</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">총 점수</span>
                <span className="text-white font-medium">{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">획득한 별</span>
                <span className="text-white font-medium">{getTotalStars()} / 15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">클리어한 레벨</span>
                <span className="text-white font-medium">
                  {levels.filter(l => l.completed).length} / {levels.length}
                </span>
              </div>
            </div>
          </div>

          {/* Reset Progress */}
          <div className="bg-red-900/30 backdrop-blur rounded-lg p-4">
            <button
              onClick={resetProgress}
              className="w-full flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-red-400 group-hover:animate-spin" />
                <div className="text-left">
                  <p className="text-white font-medium">진행 상황 초기화</p>
                  <p className="text-xs text-red-400">모든 레벨 진행과 점수가 초기화됩니다</p>
                </div>
              </div>
            </button>
          </div>

          {/* About */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
            <h3 className="text-white font-medium mb-3 flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-400" />
              <span>게임 정보</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-400 mb-1">버전</p>
                <p className="text-white">1.0.0 (2025.10.01)</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">게임 설명</p>
                <p className="text-white text-xs leading-relaxed">
                  시간 역행 퍼즐은 시간을 거꾸로 되돌려가며 원인을 찾아 해결하는 혁신적인 퍼즐 게임입니다. 
                  각 레벨의 최종 상태에서 시작하여, 시간을 역행시키며 퍼즐의 시작점을 찾아내세요.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4 pt-3">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Github className="w-4 h-4" />
                  <span className="text-xs">LittleCat</span>
                </div>
                <div className="flex items-center space-x-1 text-red-400">
                  <Heart className="w-4 h-4 animate-pulse" />
                  <span className="text-xs">Made with Love</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings