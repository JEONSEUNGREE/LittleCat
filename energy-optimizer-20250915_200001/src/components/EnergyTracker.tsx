import React, { useState } from 'react';
import { Battery, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { useEnergyStore } from '../store/useEnergyStore';

const EnergyTracker: React.FC = () => {
  const { currentEnergy, updateCurrentEnergy, addEntry } = useEnergyStore();
  const [notes, setNotes] = useState('');
  const [activity, setActivity] = useState('');

  const handleEnergyUpdate = (level: number) => {
    updateCurrentEnergy(level);
  };

  const handleSaveEntry = () => {
    addEntry({
      level: currentEnergy,
      notes: notes || undefined,
      activity: activity || undefined,
      mood: getMoodFromEnergy(currentEnergy),
      timestamp: new Date(),
    });
    setNotes('');
    setActivity('');
  };

  const getMoodFromEnergy = (level: number): 'great' | 'good' | 'neutral' | 'tired' | 'exhausted' => {
    if (level >= 8) return 'great';
    if (level >= 6) return 'good';
    if (level >= 4) return 'neutral';
    if (level >= 2) return 'tired';
    return 'exhausted';
  };

  const getEnergyColor = (level: number) => {
    if (level >= 7) return 'text-energy-high';
    if (level >= 4) return 'text-energy-medium';
    return 'text-energy-low';
  };

  const getBatteryIcon = () => {
    const percentage = (currentEnergy / 10) * 100;
    return (
      <div className="relative">
        <Battery className={`w-16 h-16 ${getEnergyColor(currentEnergy)}`} />
        <div 
          className={`absolute bottom-1 left-1 ${getEnergyColor(currentEnergy)} bg-current opacity-30`}
          style={{
            width: `${percentage * 0.48}px`,
            height: '40px',
            borderRadius: '2px',
          }}
        />
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Energy Level</h2>
        <Zap className={`w-6 h-6 ${getEnergyColor(currentEnergy)}`} />
      </div>

      <div className="flex flex-col items-center mb-6">
        {getBatteryIcon()}
        <div className={`text-4xl font-bold mt-4 ${getEnergyColor(currentEnergy)}`}>
          {currentEnergy}/10
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2 capitalize">
          Feeling {getMoodFromEnergy(currentEnergy)}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            How's your energy?
          </label>
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleEnergyUpdate(Math.max(1, currentEnergy - 1))}
              className="p-2 bg-red-100 dark:bg-red-900 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
            
            <input
              type="range"
              min="1"
              max="10"
              value={currentEnergy}
              onChange={(e) => handleEnergyUpdate(parseInt(e.target.value))}
              className="flex-1 mx-4"
            />
            
            <button
              onClick={() => handleEnergyUpdate(Math.min(10, currentEnergy + 1))}
              className="p-2 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Current Activity
          </label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="What are you doing?"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any observations?"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSaveEntry}
          className="w-full bg-primary hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Save Energy Entry
        </button>
      </div>
    </div>
  );
};

export default EnergyTracker;