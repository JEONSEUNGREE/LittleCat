import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Zap, Rocket, CircleDot, ArrowUp, DollarSign } from 'lucide-react';
import { TowerType } from '../types/game';

const towerTypes: TowerType[] = [
  {
    id: 'laser',
    name: '레이저 타워',
    cost: 50,
    damage: 10,
    range: 100,
    fireRate: 500,
    icon: 'Zap',
    color: 'text-laser-red',
  },
  {
    id: 'missile',
    name: '미사일 타워',
    cost: 100,
    damage: 20,
    range: 150,
    fireRate: 1000,
    icon: 'Rocket',
    color: 'text-blue-400',
  },
  {
    id: 'plasma',
    name: '플라즈마 타워',
    cost: 150,
    damage: 30,
    range: 120,
    fireRate: 750,
    icon: 'CircleDot',
    color: 'text-purple-400',
  },
];

export const TowerPanel: React.FC = () => {
  const { 
    energy, 
    selectedTowerType, 
    selectTowerType,
    selectedTower,
    upgradeTower,
    sellTower,
  } = useGameStore();
  
  const getTowerIcon = (type: string) => {
    switch (type) {
      case 'Zap': return <Zap className="w-8 h-8" />;
      case 'Rocket': return <Rocket className="w-8 h-8" />;
      case 'CircleDot': return <CircleDot className="w-8 h-8" />;
      default: return null;
    }
  };
  
  return (
    <div className="bg-space-dark bg-opacity-80 rounded-lg p-4 space-y-4">
      <div className="text-center">
        <h3 className="text-white font-bold text-lg mb-2">타워 상점</h3>
        <div className="flex items-center justify-center gap-2 text-energy-yellow">
          <span className="text-2xl font-bold">{energy}</span>
          <span className="text-sm">에너지</span>
        </div>
      </div>
      
      {/* Tower selection */}
      {!selectedTower && (
        <div className="space-y-2">
          {towerTypes.map(tower => (
            <button
              key={tower.id}
              onClick={() => selectTowerType(tower.id)}
              disabled={energy < tower.cost}
              className={`w-full p-3 rounded-lg transition-all ${
                selectedTowerType === tower.id
                  ? 'bg-blue-600 bg-opacity-50 ring-2 ring-blue-400'
                  : energy >= tower.cost
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={tower.color}>
                  {getTowerIcon(tower.icon)}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-sm">{tower.name}</div>
                  <div className="text-gray-400 text-xs">
                    공격력: {tower.damage} | 사거리: {tower.range}
                  </div>
                </div>
                <div className="text-energy-yellow font-bold">
                  {tower.cost}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Tower upgrade/sell */}
      {selectedTower && (
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-white font-semibold mb-2">선택된 타워</div>
            <div className="text-sm text-gray-400 space-y-1">
              <div>레벨: {selectedTower.level}/3</div>
              <div>공격력: {Math.round(selectedTower.damage)}</div>
              <div>사거리: {Math.round(selectedTower.range)}</div>
            </div>
          </div>
          
          {selectedTower.level < 3 && (
            <button
              onClick={() => upgradeTower(selectedTower.id)}
              disabled={energy < selectedTower.level * 50}
              className={`w-full p-3 rounded-lg flex items-center justify-between ${
                energy >= selectedTower.level * 50
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-800 opacity-50 cursor-not-allowed text-gray-500'
              } transition-colors`}
            >
              <div className="flex items-center gap-2">
                <ArrowUp size={20} />
                <span>업그레이드</span>
              </div>
              <span className="font-bold">{selectedTower.level * 50}</span>
            </button>
          )}
          
          <button
            onClick={() => sellTower(selectedTower.id)}
            className="w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <DollarSign size={20} />
              <span>판매</span>
            </div>
            <span className="font-bold">+{selectedTower.level * 30}</span>
          </button>
        </div>
      )}
      
      {/* Instructions */}
      <div className="text-xs text-gray-400 text-center space-y-1">
        <p>타워를 선택하고 맵을 클릭하여 배치</p>
        <p>배치된 타워를 클릭하여 업그레이드</p>
      </div>
    </div>
  );
};