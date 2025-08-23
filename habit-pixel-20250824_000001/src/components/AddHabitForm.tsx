import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface AddHabitFormProps {
  onAdd: (habit: {
    title: string
    description: string
    icon: string
    color: string
  }) => void
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('⭐')
  const [selectedColor, setSelectedColor] = useState('bg-pixel-green')

  const icons = ['⭐', '💪', '🎯', '📝', '🎨', '💻', '🏃', '🧘', '💰', '🌱', '🎵', '☕']
  const colors = [
    { name: 'Green', value: 'bg-pixel-green' },
    { name: 'Blue', value: 'bg-pixel-blue' },
    { name: 'Purple', value: 'bg-pixel-purple' },
    { name: 'Yellow', value: 'bg-pixel-yellow' },
    { name: 'Red', value: 'bg-pixel-red' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        icon: selectedIcon,
        color: selectedColor
      })
      setTitle('')
      setDescription('')
      setSelectedIcon('⭐')
      setSelectedColor('bg-pixel-green')
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setSelectedIcon('⭐')
    setSelectedColor('bg-pixel-green')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full pixel-button bg-pixel-green text-white flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span className="font-pixel">ADD NEW HABIT</span>
      </button>
    )
  }

  return (
    <div className="pixel-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-lg">NEW HABIT</h3>
          <button
            type="button"
            onClick={handleCancel}
            className="text-pixel-red hover:scale-110 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block font-pixel text-sm mb-2">TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border-2 border-pixel-dark focus:outline-none focus:border-pixel-blue"
            placeholder="Enter habit title..."
            maxLength={30}
            required
          />
        </div>

        <div>
          <label className="block font-pixel text-sm mb-2">DESCRIPTION</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border-2 border-pixel-dark focus:outline-none focus:border-pixel-blue"
            placeholder="Brief description..."
            maxLength={50}
          />
        </div>

        <div>
          <label className="block font-pixel text-sm mb-2">ICON</label>
          <div className="grid grid-cols-6 gap-2">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setSelectedIcon(icon)}
                className={`p-2 text-2xl border-2 transition-all ${
                  selectedIcon === icon
                    ? 'border-pixel-blue bg-blue-50'
                    : 'border-gray-300 hover:border-pixel-dark'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-pixel text-sm mb-2">COLOR</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`px-3 py-1 font-pixel text-xs ${color.value} text-white border-2 ${
                  selectedColor === color.value
                    ? 'border-pixel-dark'
                    : 'border-transparent'
                }`}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 pixel-button bg-pixel-green text-white"
          >
            <span className="font-pixel">CREATE</span>
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 pixel-button bg-gray-400 text-white"
          >
            <span className="font-pixel">CANCEL</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddHabitForm