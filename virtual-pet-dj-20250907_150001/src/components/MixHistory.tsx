import { useState } from 'react'
import { Save, Clock, Trophy, Share2, Download, Star } from 'lucide-react'
import { usePetDJStore } from '../store/petStore'

const MixHistory: React.FC = () => {
  const { music, pet, saveMix, gainExperience } = usePetDJStore()
  const [mixName, setMixName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleSaveMix = () => {
    if (mixName.trim()) {
      saveMix(mixName)
      gainExperience(20)
      setMixName('')
      setShowSaveDialog(false)
    }
  }

  const achievements = [
    { name: 'First Mix', icon: Star, unlocked: music.mixHistory.length > 0, color: 'text-yellow-500' },
    { name: 'Beat Master', icon: Trophy, unlocked: pet.level >= 5, color: 'text-amber-500' },
    { name: 'Effect Wizard', icon: Star, unlocked: music.activeEffects.length >= 3, color: 'text-purple-500' },
    { name: 'Mix Marathon', icon: Clock, unlocked: music.mixHistory.length >= 10, color: 'text-blue-500' },
  ]

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neon-green neon-text">Mix History</h2>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Save className="w-4 h-4" />
          Save Mix
        </button>
      </div>

      {showSaveDialog && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            value={mixName}
            onChange={(e) => setMixName(e.target.value)}
            placeholder="Enter mix name..."
            className="w-full px-3 py-2 bg-gray-700 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-neon-green"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveMix}
              className="flex-1 px-3 py-2 bg-green-500 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="flex-1 px-3 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-gray-400">Recent Mixes</h3>
        {music.mixHistory.length > 0 ? (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {music.mixHistory.slice(-5).reverse().map((mix, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{mix}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                    <Share2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No mixes saved yet</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-gray-400">Achievements</h3>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600'
                  : 'bg-gray-900/50 opacity-50'
              }`}
            >
              <achievement.icon
                className={`w-5 h-5 ${
                  achievement.unlocked ? achievement.color : 'text-gray-600'
                }`}
              />
              <span className="text-sm font-medium">
                {achievement.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 rounded-lg border border-neon-purple/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Total Mixes Created</span>
          <span className="text-2xl font-bold text-neon-pink">{music.mixHistory.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">DJ Level</span>
          <span className="text-2xl font-bold text-neon-purple">{pet.level}</span>
        </div>
      </div>
    </div>
  )
}

export default MixHistory