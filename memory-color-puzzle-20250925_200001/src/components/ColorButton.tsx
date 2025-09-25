import React from 'react'

interface ColorButtonProps {
  color: string
  isHighlighted: boolean
  onClick: () => void
  disabled: boolean
}

const COLOR_CLASSES = {
  red: 'bg-red-500 hover:bg-red-600 shadow-red-500/50',
  blue: 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50',
  green: 'bg-green-500 hover:bg-green-600 shadow-green-500/50',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/50',
  purple: 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/50',
  orange: 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/50',
}

const ColorButton: React.FC<ColorButtonProps> = ({ color, isHighlighted, onClick, disabled }) => {
  const colorClass = COLOR_CLASSES[color as keyof typeof COLOR_CLASSES] || 'bg-gray-500'
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full aspect-square rounded-2xl transition-all duration-200 tap-highlight-transparent
        ${colorClass}
        ${isHighlighted ? 'scale-110 ring-4 ring-white shadow-2xl' : 'shadow-lg'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
      `}
      style={{
        boxShadow: isHighlighted ? `0 0 30px currentColor` : undefined
      }}
    >
      {isHighlighted && (
        <div className="absolute inset-0 rounded-2xl bg-white opacity-30 animate-pulse" />
      )}
    </button>
  )
}

export default ColorButton