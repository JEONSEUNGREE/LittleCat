import { useState } from 'react'
import { Sparkles, Trophy, Users, User } from 'lucide-react'
import useGameStore from '../store'

interface ModeSelectorProps {
  onStart: () => void
}

const ModeSelector = ({ onStart }: ModeSelectorProps) => {
  const { setGameMode, setPlayerName, playerName } = useGameStore()
  const [selectedMode, setSelectedMode] = useState<'create' | 'challenge' | 'collaborative'>('create')
  const [nameInput, setNameInput] = useState(playerName)

  const modes = [
    {
      id: 'create',
      icon: Sparkles,
      emoji: '✨',
      title: 'Free Create',
      description: 'Create stories freely with any emojis you choose',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'challenge',
      icon: Trophy,
      emoji: '🏆',
      title: 'Challenge Mode',
      description: 'Complete story challenges with time limits',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'collaborative',
      icon: Users,
      emoji: '🤝',
      title: 'Collaborative',
      description: 'Build stories together with AI assistance',
      color: 'from-green-500 to-blue-500'
    }
  ]

  const handleStart = () => {
    setGameMode(selectedMode)
    setPlayerName(nameInput || 'Player')
    onStart()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-6xl md:text-7xl">📖</span> Emoji Story Chain
          </h1>
          <p className="text-xl text-white/80">Create amazing stories with emojis!</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Your Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 
                       border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 
                       focus:ring-white/20 transition-all"
            />
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Choose Your Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id as any)}
                  className={`relative p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                    selectedMode === mode.id 
                      ? 'border-white bg-white/20 scale-105 shadow-xl' 
                      : 'border-white/20 bg-white/10 hover:bg-white/15'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-20 rounded-2xl`} />
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{mode.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
                    <p className="text-sm text-white/80">{mode.description}</p>
                  </div>
                  {selectedMode === mode.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg 
                     rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all 
                     flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Start Creating Stories!
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModeSelector