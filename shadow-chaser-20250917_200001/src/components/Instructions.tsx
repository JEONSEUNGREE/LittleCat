import React, { useState } from 'react'
import { HelpCircle, X, Lightbulb, Move, Target, Trophy } from 'lucide-react'

const Instructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all transform hover:scale-110 z-40"
      >
        <HelpCircle size={24} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">How to Play</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start">
                <Move className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Movement</h3>
                  <p className="text-sm">Use arrow keys, WASD keys, or touch controls to move your character (blue circle)</p>
                </div>
              </div>

              <div className="flex items-start">
                <Target className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Objective</h3>
                  <p className="text-sm">Navigate through lights and shadows to reach the green target</p>
                </div>
              </div>

              <div className="flex items-start">
                <Lightbulb className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Light & Shadow</h3>
                  <p className="text-sm">Watch how shadows are cast by objects. Use them to your advantage!</p>
                </div>
              </div>

              <div className="flex items-start">
                <Trophy className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Scoring</h3>
                  <p className="text-sm">Complete levels with fewer moves for higher scores. Each level gets progressively harder!</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-400 text-center">
                Tip: Shadows change based on light positions. Plan your path carefully!
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Instructions