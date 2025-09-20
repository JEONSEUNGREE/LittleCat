import React from 'react'
import { X, Lightbulb, Move, RotateCw, Target } from 'lucide-react'

interface InstructionsProps {
  onClose: () => void
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-shadow-dark to-shadow-gray flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-shadow-light rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-shadow-gray transition-colors"
          aria-label="Close instructions"
        >
          <X className="w-5 h-5 text-light-beam" />
        </button>
        
        <h2 className="text-2xl font-bold text-light-beam mb-6">
          How to Play
        </h2>
        
        <div className="space-y-4 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-shadow-gray rounded-lg flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-light-beam" />
            </div>
            <div>
              <h3 className="font-semibold text-light-glow mb-1">Control Lights</h3>
              <p className="text-sm">Tap on light sources to select them. Toggle lights on/off to control which shadows appear.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-shadow-gray rounded-lg flex-shrink-0">
              <RotateCw className="w-5 h-5 text-light-beam" />
            </div>
            <div>
              <h3 className="font-semibold text-light-glow mb-1">Adjust Angles</h3>
              <p className="text-sm">Use the rotation buttons to change the light angle and modify shadow direction.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-shadow-gray rounded-lg flex-shrink-0">
              <Move className="w-5 h-5 text-light-beam" />
            </div>
            <div>
              <h3 className="font-semibold text-light-glow mb-1">Move Lights</h3>
              <p className="text-sm">Drag light sources to new positions to change shadow size and shape.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-shadow-gray rounded-lg flex-shrink-0">
              <Target className="w-5 h-5 text-light-beam" />
            </div>
            <div>
              <h3 className="font-semibold text-light-glow mb-1">Match the Target</h3>
              <p className="text-sm">Combine shadows to create the target shape shown in the corner. Use fewer moves for bonus points!</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-shadow-dark rounded-lg">
          <p className="text-light-glow text-sm font-semibold mb-1">Pro Tips:</p>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>• Multiple lights create overlapping shadows</li>
            <li>• Distance affects shadow size and blur</li>
            <li>• Experiment with combinations for creative solutions</li>
          </ul>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-light-beam to-light-glow text-shadow-dark py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}

export default Instructions