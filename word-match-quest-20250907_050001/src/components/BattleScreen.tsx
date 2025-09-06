import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Shield, Sword, Star, Coins } from 'lucide-react';

export const BattleScreen: React.FC = () => {
  const { player, currentMonster, stage, score, combo, message } = useGameStore();

  if (!currentMonster) return null;

  const hpPercentage = (currentMonster.hp / currentMonster.maxHp) * 100;
  const playerHpPercentage = (player.hp / player.maxHp) * 100;
  const expPercentage = (player.exp / player.maxExp) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span className="font-bold">스테이지 {stage}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
        {combo > 0 && (
          <div className="text-center text-yellow-300 font-bold animate-pulse">
            콤보 x{combo}
          </div>
        )}
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-4xl">{currentMonster.emoji}</span>
            <div>
              <div className="font-bold text-gray-800 dark:text-gray-200">
                {currentMonster.name}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Sword className="w-4 h-4" />
                <span>{currentMonster.attack}</span>
                <Shield className="w-4 h-4" />
                <span>{currentMonster.defense}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              HP: {currentMonster.hp}/{currentMonster.maxHp}
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
      </div>

      {message && (
        <div className="text-center p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg animate-fade-in">
          {message}
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚔️</span>
            <div>
              <div className="font-bold text-gray-800 dark:text-gray-200">
                플레이어 Lv.{player.level}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Sword className="w-4 h-4" />
                <span>{player.attack}</span>
                <Coins className="w-4 h-4" />
                <span>{player.coins}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              HP: {player.hp}/{player.maxHp}
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${playerHpPercentage}%` }}
          />
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${expPercentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          EXP: {player.exp}/{player.maxExp}
        </div>
      </div>
    </div>
  );
};