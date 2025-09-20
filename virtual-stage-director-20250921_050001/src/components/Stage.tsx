import { MouseEvent, useRef, useState } from 'react'
import { useStageStore, StageLight, StageEffect } from '../store/useStageStore'
import { Lightbulb, Sparkles, Move, Trash2 } from 'lucide-react'

export function Stage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<{ type: 'light' | 'effect', id: string } | null>(null)
  
  const {
    currentScene,
    selectedTool,
    selectedLightType,
    selectedEffectType,
    addLight,
    addEffect,
    updateLight,
    updateEffect,
    deleteLight,
    deleteEffect,
    isPlaying
  } = useStageStore()
  
  const handleStageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || selectedTool === 'move') return
    
    const rect = stageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    if (selectedTool === 'light') {
      const newLight: StageLight = {
        id: Date.now().toString(),
        type: selectedLightType,
        x,
        y,
        intensity: 80,
        color: '#ffffff',
        angle: 0,
        isActive: true
      }
      addLight(newLight)
    } else if (selectedTool === 'effect') {
      const newEffect: StageEffect = {
        id: Date.now().toString(),
        type: selectedEffectType,
        x,
        y,
        isActive: true,
        duration: 3000
      }
      addEffect(newEffect)
    }
  }
  
  const handleItemClick = (type: 'light' | 'effect', id: string, e: MouseEvent) => {
    e.stopPropagation()
    if (selectedTool === 'move') {
      setSelectedItem({ type, id })
    }
  }
  
  const handleDelete = (type: 'light' | 'effect', id: string, e: MouseEvent) => {
    e.stopPropagation()
    if (type === 'light') {
      deleteLight(id)
    } else {
      deleteEffect(id)
    }
  }
  
  const renderLight = (light: StageLight) => {
    const lightStyles: Record<string, string> = {
      spot: 'bg-gradient-radial from-yellow-300/60 to-transparent',
      wash: 'bg-gradient-radial from-blue-300/40 to-transparent',
      beam: 'bg-gradient-radial from-white/70 to-transparent',
      strobe: 'bg-white/90'
    }
    
    return (
      <div
        key={light.id}
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
          isPlaying && light.isActive ? 'animate-stage-light' : ''
        }`}
        style={{
          left: `${light.x}%`,
          top: `${light.y}%`,
          width: `${light.intensity * 2}px`,
          height: `${light.intensity * 2}px`,
          transform: `translate(-50%, -50%) rotate(${light.angle}deg)`,
          opacity: light.isActive ? light.intensity / 100 : 0.1
        }}
        onClick={(e) => handleItemClick('light', light.id, e)}
      >
        <div
          className={`w-full h-full rounded-full ${lightStyles[light.type]}`}
          style={{ 
            backgroundColor: light.type === 'strobe' && isPlaying 
              ? (Math.random() > 0.5 ? light.color : 'transparent')
              : undefined,
            filter: light.type !== 'strobe' ? `hue-rotate(${light.color})` : undefined
          }}
        />
        <Lightbulb 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" 
          size={20}
        />
        {selectedItem?.id === light.id && (
          <button
            onClick={(e) => handleDelete('light', light.id, e)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    )
  }
  
  const renderEffect = (effect: StageEffect) => {
    const effectIcons = {
      smoke: '💨',
      confetti: '🎊',
      pyro: '🔥',
      laser: '⚡'
    }
    
    return (
      <div
        key={effect.id}
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
          isPlaying && effect.isActive ? 'animate-bounce' : ''
        }`}
        style={{
          left: `${effect.x}%`,
          top: `${effect.y}%`,
        }}
        onClick={(e) => handleItemClick('effect', effect.id, e)}
      >
        <div className={`relative ${effect.isActive ? 'opacity-100' : 'opacity-30'}`}>
          <Sparkles className="text-purple-400" size={30} />
          <span className="absolute inset-0 flex items-center justify-center text-lg">
            {effectIcons[effect.type]}
          </span>
        </div>
        {selectedItem?.id === effect.id && (
          <button
            onClick={(e) => handleDelete('effect', effect.id, e)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    )
  }
  
  return (
    <div className="flex-1 p-4 lg:p-8">
      <div 
        ref={stageRef}
        className="relative w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden cursor-crosshair shadow-2xl"
        style={{ backgroundColor: currentScene.backgroundColor }}
        onClick={handleStageClick}
      >
        {/* Stage backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        
        {/* Stage floor */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent opacity-50 pointer-events-none" />
        
        {/* Render lights */}
        {currentScene.lights.map(renderLight)}
        
        {/* Render effects */}
        {currentScene.effects.map(renderEffect)}
        
        {/* Center stage marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full pointer-events-none" />
      </div>
    </div>
  )
}