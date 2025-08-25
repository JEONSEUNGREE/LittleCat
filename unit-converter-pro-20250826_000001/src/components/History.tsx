import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { useConverterStore } from '../store/useConverterStore';
import { unitData } from '../data/units';
import { formatNumber } from '../utils/converter';

const History: React.FC = () => {
  const { history, clearHistory, setCategory, setFromUnit, setToUnit, setInputValue } = useConverterStore();

  const handleHistoryClick = (item: typeof history[0]) => {
    setCategory(item.category);
    setFromUnit(item.from);
    setToUnit(item.to);
    setInputValue(item.fromValue.toString());
  };

  if (history.length === 0) {
    return (
      <div className="w-full p-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <Clock size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No conversion history yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Your recent conversions will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Recent Conversions
        </h2>
        <button
          onClick={clearHistory}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
                   text-red-600 dark:text-red-400 transition-colors duration-200"
          aria-label="Clear history"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => {
          const categoryData = unitData[item.category];
          const fromSymbol = categoryData.units[item.from].symbol;
          const toSymbol = categoryData.units[item.to].symbol;

          return (
            <button
              key={index}
              onClick={() => handleHistoryClick(item)}
              className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md 
                       transition-all duration-200 text-left group animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatNumber(item.fromValue)} {fromSymbol}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    = {formatNumber(item.toValue)} {toSymbol}
                  </p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-600 px-2 py-1 
                               bg-gray-100 dark:bg-gray-700 rounded">
                  {categoryData.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default History;