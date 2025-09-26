import React from 'react'
import { useDJStore } from '../store/useDJStore'
import { Clock, Trash2, TrendingUp } from 'lucide-react'

export const MoodHistory: React.FC = () => {
  const { moodHistory, clearHistory, setCurrentMood, addToHistory, setPlaying } = useDJStore()

  const handleReplay = (mood: typeof moodHistory[0]) => {
    setCurrentMood(mood)
    addToHistory(mood)
    setPlaying(true)
  }

  const getMoodFlow = () => {
    if (moodHistory.length < 2) return 'neutral'
    const avgIntensity = moodHistory.reduce((acc, m) => acc + m.intensity, 0) / moodHistory.length
    if (avgIntensity > 70) return 'energetic'
    if (avgIntensity < 40) return 'calm'
    return 'balanced'
  }

  const flow = getMoodFlow()

  return (
    <div className="w-full bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Mix History
        </h2>
        {moodHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {moodHistory.length === 0 ? (
        <div className="text-center py-8 text-white/50">
          <p className="text-sm">No moods mixed yet</p>
          <p className="text-xs mt-1">Start selecting moods to build your mix!</p>
        </div>
      ) : (
        <>
          {/* Mood Flow Indicator */}
          <div className="mb-4 p-3 bg-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Current Flow</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-white/70" />
                <span className={`font-bold capitalize ${
                  flow === 'energetic' ? 'text-orange-400' :
                  flow === 'calm' ? 'text-blue-400' :
                  'text-green-400'
                }`}>
                  {flow}
                </span>
              </div>
            </div>
          </div>

          {/* History Timeline */}
          <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
            {moodHistory.slice().reverse().map((mood, index) => (
              <button
                key={`${mood.name}-${index}`}
                onClick={() => handleReplay(mood)}
                className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: mood.color }}
                  >
                    {mood.sound}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white font-semibold">{mood.name}</div>
                    <div className="text-white/50 text-xs">
                      {mood.bpm} BPM • {mood.intensity}% intensity
                    </div>
                  </div>
                  <div className="text-white/30 text-xs">
                    #{moodHistory.length - index}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mix Stats */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-white/50 text-xs">Total</div>
                <div className="text-white font-bold">{moodHistory.length}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs">Avg BPM</div>
                <div className="text-white font-bold">
                  {Math.round(moodHistory.reduce((acc, m) => acc + m.bpm, 0) / moodHistory.length)}
                </div>
              </div>
              <div>
                <div className="text-white/50 text-xs">Avg Energy</div>
                <div className="text-white font-bold">
                  {Math.round(moodHistory.reduce((acc, m) => acc + m.intensity, 0) / moodHistory.length)}%
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}