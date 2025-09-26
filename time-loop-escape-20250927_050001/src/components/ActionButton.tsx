import React from 'react'
import { Action } from '../store/gameStore'

interface ActionButtonProps {
  action: Action
  onPerform: (actionId: string) => void
  disabled: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({ action, onPerform, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onPerform(action.id)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || !action.available}
      className={`
        relative p-4 rounded-xl transition-all transform no-select
        ${action.available 
          ? 'bg-white/20 hover:bg-white/30 hover:scale-105 cursor-pointer' 
          : 'bg-white/5 cursor-not-allowed opacity-50'}
        ${disabled ? 'pointer-events-none' : ''}
        backdrop-blur-sm border border-white/10
      `}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl" role="img" aria-label={action.name}>
          {action.icon}
        </span>
        <span className="text-white text-sm font-medium">
          {action.name}
        </span>
      </div>
      {!action.available && (
        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
          <span className="text-white/60 text-xs">Locked</span>
        </div>
      )}
    </button>
  )
}

export default ActionButton