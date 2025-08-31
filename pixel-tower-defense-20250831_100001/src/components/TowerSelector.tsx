import { Target, Snowflake, Flame, Coins } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const TowerSelector = () => {
  const { gold, selectedTower, selectTower } = useGameStore()
  
  const towers = [
    {
      type: 'basic',
      name: '기본 타워',
      cost: 50,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      description: '기본 공격'
    },
    {
      type: 'ice',
      name: '얼음 타워',
      cost: 75,
      icon: Snowflake,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: '적 속도 감소'
    },
    {
      type: 'fire',
      name: '화염 타워',
      cost: 100,
      icon: Flame,
      color: 'text-red-400',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      description: '높은 데미지'
    }
  ]
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm sm:text-base">타워 선택</h3>
        <div className="flex items-center gap-1 text-yellow-400">
          <Coins className="w-4 h-4" />
          <span className="font-bold text-sm sm:text-base">{gold}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {towers.map((tower) => {
          const Icon = tower.icon
          const canAfford = gold >= tower.cost
          const isSelected = selectedTower === tower.type
          
          return (
            <button
              key={tower.type}
              onClick={() => selectTower(isSelected ? null : tower.type)}
              disabled={!canAfford}
              className={`
                pixel-button p-2 sm:p-3 rounded-lg transition-all
                ${isSelected 
                  ? 'ring-2 ring-yellow-400 ' + tower.bgColor 
                  : canAfford 
                    ? tower.bgColor + ' ' + tower.hoverColor
                    : 'bg-gray-700 opacity-50 cursor-not-allowed'
                }
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${tower.color}`} />
                <span className="text-white text-xs font-bold hidden sm:block">
                  {tower.name}
                </span>
                <div className="flex items-center gap-1">
                  <Coins className="w-3 h-3 text-yellow-400" />
                  <span className={`text-xs font-bold ${canAfford ? 'text-yellow-400' : 'text-gray-500'}`}>
                    {tower.cost}
                  </span>
                </div>
                <span className="text-gray-300 text-xs hidden lg:block">
                  {tower.description}
                </span>
              </div>
            </button>
          )
        })}
      </div>
      
      {selectedTower && (
        <div className="mt-2 p-2 bg-gray-700 rounded text-center">
          <p className="text-white text-xs">
            타워를 배치할 위치를 선택하세요
          </p>
        </div>
      )}
    </div>
  )
}

export default TowerSelector