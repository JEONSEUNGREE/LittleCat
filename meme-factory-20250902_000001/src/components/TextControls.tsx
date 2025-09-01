import { Plus, Trash2, Type, Palette, AlignCenter, AlignLeft, AlignRight } from 'lucide-react'
import { useMemeStore } from '../store/memeStore'

export default function TextControls() {
  const { texts, addText, updateText, removeText, currentMeme } = useMemeStore()

  if (!currentMeme) {
    return (
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">Text Controls</h3>
        <p className="text-gray-400 text-sm">Select a template first to add text</p>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Text Layers</h3>
        <button
          onClick={addText}
          className="p-2 bg-gradient-to-r from-meme-purple to-meme-pink rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {texts.map((text, index) => (
          <div key={text.id} className="bg-white/5 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Layer {index + 1}</span>
              <button
                onClick={() => removeText(text.id)}
                className="p-1 hover:bg-red-500/20 rounded transition"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <Type className="w-4 h-4" />
                Text
              </label>
              <input
                type="text"
                value={text.text}
                onChange={(e) => updateText(text.id, { text: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Position Controls */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-400">X Position</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={text.x}
                  onChange={(e) => updateText(text.id, { x: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Y Position</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={text.y}
                  onChange={(e) => updateText(text.id, { y: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="text-xs text-gray-400">Font Size</label>
              <input
                type="range"
                min="16"
                max="72"
                value={text.fontSize}
                onChange={(e) => updateText(text.id, { fontSize: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Color Controls */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <Palette className="w-3 h-3" />
                  Text Color
                </label>
                <input
                  type="color"
                  value={text.color}
                  onChange={(e) => updateText(text.id, { color: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">Stroke</label>
                <input
                  type="color"
                  value={text.strokeColor}
                  onChange={(e) => updateText(text.id, { strokeColor: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Alignment */}
            <div className="flex gap-2">
              <button
                onClick={() => updateText(text.id, { align: 'left' })}
                className={`flex-1 p-2 rounded-lg transition ${
                  text.align === 'left' ? 'bg-purple-500/30' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <AlignLeft className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => updateText(text.id, { align: 'center' })}
                className={`flex-1 p-2 rounded-lg transition ${
                  text.align === 'center' ? 'bg-purple-500/30' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <AlignCenter className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => updateText(text.id, { align: 'right' })}
                className={`flex-1 p-2 rounded-lg transition ${
                  text.align === 'right' ? 'bg-purple-500/30' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <AlignRight className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {texts.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-4">
          Click + to add text to your meme
        </p>
      )}
    </div>
  )
}