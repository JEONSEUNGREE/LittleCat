import { motion } from 'framer-motion'
import { useMoodStore } from '../store/moodStore'
import { Palette, X } from 'lucide-react'

const colorSets = {
  happy: ['#FFD700', '#FFA500', '#FF69B4', '#FFE4B5', '#FFEB3B'],
  sad: ['#4169E1', '#6495ED', '#87CEEB', '#B0E0E6', '#4682B4'],
  excited: ['#FF1493', '#FF4500', '#DC143C', '#FF6347', '#FF69B4'],
  calm: ['#20B2AA', '#48D1CC', '#5F9EA0', '#8FBC8F', '#3CB371'],
  angry: ['#DC143C', '#8B0000', '#B22222', '#CD5C5C', '#FF6347'],
  romantic: ['#FF69B4', '#DA70D6', '#DDA0DD', '#EE82EE', '#FF1493'],
  mysterious: ['#4B0082', '#6A0DAD', '#8B008B', '#9932CC', '#7B68EE'],
  peaceful: ['#90EE90', '#98FB98', '#8FBC8F', '#3CB371', '#2E8B57']
}

const allColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#F4A6A6', '#B4E7CE', '#FFE66D', '#A8E6CF',
  '#FFD3B6', '#FFAAA5', '#FF8B94', '#A8D8EA', '#AA96DA',
  '#FCBAD3', '#FFFFD2', '#C7CEEA', '#FFDAC1', '#E2F0CB'
]

export default function ColorPalette() {
  const { selectedMood, selectedColors, addColor, removeColor, clearColors } = useMoodStore()
  
  const suggestedColors = selectedMood ? colorSets[selectedMood] : []

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Palette className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold">색상 팔레트 선택</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearColors}
          className="text-gray-400 hover:text-white transition-colors"
        >
          초기화
        </motion.button>
      </div>

      {/* Selected Colors */}
      {selectedColors.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-300 mb-3">선택된 색상 ({selectedColors.length}/5)</p>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color, index) => (
              <motion.div
                key={`selected-${color}-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative group"
              >
                <div
                  className="w-16 h-16 rounded-lg shadow-lg cursor-pointer border-2 border-white/50"
                  style={{ backgroundColor: color }}
                  onClick={() => removeColor(color)}
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeColor(color)
                  }}
                >
                  <X className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Colors */}
      {suggestedColors.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-300 mb-3">추천 색상 (감정 기반)</p>
          <div className="flex flex-wrap gap-3">
            {suggestedColors.map((color, index) => (
              <motion.button
                key={`suggested-${color}-${index}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addColor(color)}
                className={`w-14 h-14 rounded-lg shadow-md transition-all ${
                  selectedColors.includes(color) ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Colors */}
      <div>
        <p className="text-sm text-gray-300 mb-3">전체 색상</p>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {allColors.map((color, index) => (
            <motion.button
              key={`all-${color}-${index}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addColor(color)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-lg shadow-md transition-all ${
                selectedColors.includes(color) ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent' : ''
              }`}
              style={{ backgroundColor: color }}
              disabled={selectedColors.length >= 5 && !selectedColors.includes(color)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-gray-300">
        <p className="text-sm">최대 5개의 색상을 선택할 수 있습니다</p>
      </div>
    </div>
  )
}