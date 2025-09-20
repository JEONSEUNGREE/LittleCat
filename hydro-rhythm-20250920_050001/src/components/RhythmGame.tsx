import { useState, useEffect, useCallback } from 'react'
import { Music, Droplets, Zap, Target } from 'lucide-react'
import useHydroStore from '../store/useHydroStore'

const RhythmGame: React.FC = () => {
  const { 
    isPlaying, 
    notes, 
    score, 
    combo, 
    accuracy,
    startGame, 
    stopGame, 
    hitNote,
    generateNotes 
  } = useHydroStore()
  
  const [activeLane, setActiveLane] = useState<number | null>(null)
  const lanes = [0, 1, 2, 3]
  
  const handleLanePress = useCallback((lane: number) => {
    setActiveLane(lane)
    
    const hittableNotes = notes.filter(note => 
      note.lane === lane && note.position > 80 && note.position <= 100
    )
    
    if (hittableNotes.length > 0) {
      const closestNote = hittableNotes[0]
      const distance = Math.abs(90 - closestNote.position)
      
      if (distance < 5) {
        hitNote(closestNote.id, 'perfect')
      } else if (distance < 10) {
        hitNote(closestNote.id, 'good')
      } else {
        hitNote(closestNote.id, 'miss')
      }
    }
    
    setTimeout(() => setActiveLane(null), 100)
  }, [notes, hitNote])
  
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      useHydroStore.setState(state => ({
        notes: state.notes.map(note => ({
          ...note,
          position: note.position + 2
        })).filter(note => note.position < 120)
      }))
      
      if (notes.length < 3) {
        generateNotes()
      }
    }, 50)
    
    return () => clearInterval(interval)
  }, [isPlaying, notes, generateNotes])
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return
      
      const keyMap: Record<string, number> = {
        'a': 0, 's': 1, 'd': 2, 'f': 3,
        'j': 0, 'k': 1, 'l': 2, ';': 3
      }
      
      if (keyMap[e.key.toLowerCase()] !== undefined) {
        handleLanePress(keyMap[e.key.toLowerCase()])
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, handleLanePress])
  
  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-hydro-600" />
          <h2 className="text-xl font-bold text-hydro-800">Rhythm Game</h2>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Target className="w-4 h-4 text-hydro-500" />
            {accuracy.toFixed(1)}%
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            x{combo}
          </span>
          <span className="font-bold text-hydro-600">{score} pts</span>
        </div>
      </div>
      
      <div className="relative h-96 bg-gradient-to-t from-hydro-100/50 to-transparent rounded-xl overflow-hidden mb-4">
        {lanes.map(lane => (
          <div 
            key={lane}
            className="absolute w-1/4 h-full border-x border-hydro-200/30"
            style={{ left: `${lane * 25}%` }}
          >
            {notes
              .filter(note => note.lane === lane)
              .map(note => (
                <div
                  key={note.id}
                  className={`absolute w-12 h-12 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center transition-all ${
                    note.type === 'bonus' 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                      : 'bg-gradient-to-br from-hydro-400 to-hydro-600'
                  }`}
                  style={{ 
                    bottom: `${note.position}%`,
                    transform: `translateX(-50%) scale(${note.position > 80 && note.position < 100 ? 1.2 : 1})`
                  }}
                >
                  <Droplets className="w-6 h-6 text-white" />
                </div>
              ))}
          </div>
        ))}
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-hydro-500/30 to-transparent">
          <div className="absolute bottom-4 left-0 right-0 flex">
            {lanes.map(lane => (
              <button
                key={lane}
                onMouseDown={() => handleLanePress(lane)}
                onTouchStart={() => handleLanePress(lane)}
                className={`flex-1 h-12 mx-2 rounded-lg transition-all ${
                  activeLane === lane
                    ? 'bg-hydro-500 scale-95'
                    : 'bg-hydro-400/50 hover:bg-hydro-400/70'
                } backdrop-blur-sm border-2 border-hydro-300`}
              >
                <span className="text-white font-bold">
                  {['A', 'S', 'D', 'F'][lane]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {!isPlaying ? (
        <button 
          onClick={startGame}
          className="water-button w-full"
        >
          Start Rhythm Challenge
        </button>
      ) : (
        <button 
          onClick={stopGame}
          className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-full transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          End Game
        </button>
      )}
    </div>
  )
}

export default RhythmGame