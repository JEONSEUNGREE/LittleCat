import React from 'react'
import { Flower2, TreePine, Sprout, Droplet } from 'lucide-react'
import { useGardenStore, Plant } from '../store/useGardenStore'

const PlantIcon: React.FC<{ plant: Plant }> = ({ plant }) => {
  const commonClasses = "transition-all duration-500 cursor-pointer hover:scale-110"
  
  const getPlantColor = () => {
    if (plant.health < 30) return 'text-yellow-600'
    if (plant.health < 60) return 'text-green-600'
    return 'text-green-500'
  }

  const needsWater = plant.waterLevel < 30

  switch (plant.type) {
    case 'tree':
      return (
        <div className="relative">
          <TreePine className={`${commonClasses} ${getPlantColor()} w-16 h-16 md:w-20 md:h-20`} />
          {needsWater && <Droplet className="absolute -top-2 -right-2 w-4 h-4 text-blue-500 animate-pulse" />}
        </div>
      )
    case 'flower':
      return (
        <div className="relative">
          <Flower2 className={`${commonClasses} ${getPlantColor()} w-12 h-12 md:w-16 md:h-16`} />
          {needsWater && <Droplet className="absolute -top-2 -right-2 w-4 h-4 text-blue-500 animate-pulse" />}
        </div>
      )
    case 'sprout':
      return (
        <div className="relative">
          <Sprout className={`${commonClasses} ${getPlantColor()} w-10 h-10 md:w-12 md:h-12`} />
          {needsWater && <Droplet className="absolute -top-1 -right-1 w-3 h-3 text-blue-500 animate-pulse" />}
        </div>
      )
    default:
      return (
        <div className="relative">
          <div className={`${commonClasses} ${getPlantColor()} w-6 h-6 md:w-8 md:h-8 rounded-full bg-amber-700`} />
          {needsWater && <Droplet className="absolute -top-1 -right-1 w-3 h-3 text-blue-500 animate-pulse" />}
        </div>
      )
  }
}

const Garden: React.FC = () => {
  const { plants, words, waterPlant, totalScore, streakDays } = useGardenStore()

  const handleWaterPlant = (plantId: string) => {
    waterPlant(plantId)
  }

  return (
    <div className="bg-gradient-to-b from-sky-200 to-green-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 mb-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">나의 어휘 정원</h1>
          <div className="flex flex-wrap gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">총 점수:</span>
              <span className="font-bold text-green-600">{totalScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">연속 학습:</span>
              <span className="font-bold text-orange-600">{streakDays}일</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">단어 개수:</span>
              <span className="font-bold text-blue-600">{words.length}개</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-6 bg-gradient-to-b from-amber-100/50 to-green-200/50 rounded-xl shadow-inner">
          {plants.map((plant) => {
            const word = words.find(w => w.id === plant.wordId)
            return (
              <div
                key={plant.id}
                className="flex flex-col items-center justify-center p-2 hover:bg-white/30 rounded-lg transition-colors"
                onClick={() => handleWaterPlant(plant.id)}
              >
                <PlantIcon plant={plant} />
                <div className="mt-1 text-center">
                  <p className="text-xs font-medium text-gray-700 truncate max-w-full">
                    {word?.word}
                  </p>
                  <div className="flex gap-1 mt-1 justify-center">
                    <div className="w-8 h-1 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${plant.waterLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 bg-white/80 backdrop-blur rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">정원 관리 팁</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 매일 단어를 학습하면 식물이 자라요!</li>
            <li>• 물방울 아이콘이 나타나면 물을 주세요</li>
            <li>• 정답을 맞추면 더 빨리 성장해요</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Garden