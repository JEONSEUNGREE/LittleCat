import React from 'react';
import { TrendingUp, Award, BookOpen, BarChart3, RefreshCw } from 'lucide-react';
import { useFormulaStore } from '../store/formulaStore';

const StatsPanel: React.FC = () => {
  const { getStats, resetProgress } = useFormulaStore();
  const stats = getStats();
  const progressPercentage = Math.round((stats.mastered / stats.total) * 100);
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      resetProgress();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-semibold text-indigo-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Formulas</p>
              <p className="text-xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Mastered</p>
              <p className="text-xl font-bold text-gray-800">{stats.mastered}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Reviewed</p>
              <p className="text-xl font-bold text-gray-800">{stats.reviewed}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-lg text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Success Rate</p>
              <p className="text-xl font-bold text-gray-800">
                {stats.reviewed > 0 ? Math.round((stats.mastered / stats.reviewed) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Breakdown */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Category Breakdown</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Math ({stats.byCategory.math})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Physics ({stats.byCategory.physics})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Chemistry ({stats.byCategory.chemistry})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;