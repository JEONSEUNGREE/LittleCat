import React from 'react'
import { Droplet, Heart, TrendingUp, Flower2 } from 'lucide-react'
import useHydrationStore from '../store/useHydrationStore'

const PlantGarden: React.FC = () => {
  const { currentPlant, plants, selectPlant, addNewPlant } = useHydrationStore()
  const [newPlantName, setNewPlantName] = React.useState('')
  const [showAddPlant, setShowAddPlant] = React.useState(false)

  const getPlantEmoji = (type: string) => {
    switch(type) {
      case 'seedling': return '🌱'
      case 'sprout': return '🌿'
      case 'flower': return '🌻'
      case 'tree': return '🌳'
      default: return '🌱'
    }
  }

  const handleAddPlant = () => {
    if (newPlantName.trim()) {
      addNewPlant(newPlantName)
      setNewPlantName('')
      setShowAddPlant(false)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Flower2 className="text-leaf-green" />
          나의 정원
        </h2>
        <button
          onClick={() => setShowAddPlant(true)}
          className="bg-leaf-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          새 식물 추가
        </button>
      </div>

      {currentPlant ? (
        <div className="text-center">
          <div className="text-8xl mb-4 animate-float">
            {getPlantEmoji(currentPlant.type)}
          </div>
          <h3 className="text-xl font-semibold mb-2">{currentPlant.name}</h3>
          
          <div className="flex justify-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm">레벨 {currentPlant.level}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">건강 {currentPlant.health}%</span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-leaf-green to-green-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${currentPlant.health}%` }}
            />
          </div>

          <p className="text-gray-600 text-sm mb-4">
            물을 마실수록 {currentPlant.name}가 건강해집니다!
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {plants.map(plant => (
              <button
                key={plant.id}
                onClick={() => selectPlant(plant.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  plant.id === currentPlant.id 
                    ? 'bg-leaf-green text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {getPlantEmoji(plant.type)} {plant.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Droplet className="w-16 h-16 mx-auto text-water-blue mb-4" />
          <p className="text-gray-600 mb-4">아직 식물이 없어요!</p>
          <button
            onClick={() => setShowAddPlant(true)}
            className="bg-water-blue text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            첫 식물 키우기 시작
          </button>
        </div>
      )}

      {showAddPlant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm animate-grow">
            <h3 className="text-xl font-bold mb-4">새 식물 이름 짓기</h3>
            <input
              type="text"
              value={newPlantName}
              onChange={(e) => setNewPlantName(e.target.value)}
              placeholder="예: 해피, 초록이"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-leaf-green"
              maxLength={10}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddPlant}
                className="flex-1 bg-leaf-green text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                추가
              </button>
              <button
                onClick={() => setShowAddPlant(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}