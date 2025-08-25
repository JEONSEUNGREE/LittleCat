import React, { useEffect, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useConverterStore } from '../store/useConverterStore';
import { unitData } from '../data/units';
import { convert, formatNumber } from '../utils/converter';
import { ConversionResult } from '../types';

const Converter: React.FC = () => {
  const {
    selectedCategory,
    fromUnit,
    toUnit,
    inputValue,
    setFromUnit,
    setToUnit,
    setInputValue,
    swapUnits,
    addToHistory,
  } = useConverterStore();

  const [result, setResult] = useState<string>('0');
  const categoryData = unitData[selectedCategory];
  const units = Object.entries(categoryData.units);

  useEffect(() => {
    if (inputValue && !isNaN(Number(inputValue))) {
      const numValue = Number(inputValue);
      const convertedValue = convert(numValue, fromUnit, toUnit, selectedCategory);
      setResult(formatNumber(convertedValue));
      
      if (numValue !== 0) {
        const historyItem: ConversionResult = {
          from: fromUnit,
          to: toUnit,
          fromValue: numValue,
          toValue: convertedValue,
          category: selectedCategory,
        };
        addToHistory(historyItem);
      }
    } else {
      setResult('0');
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory, addToHistory]);

  return (
    <div className="w-full p-4 space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
        {/* From Unit */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">From</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       text-lg font-medium"
              placeholder="Enter value"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       font-medium"
            >
              {units.map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-3 rounded-full bg-primary-500 hover:bg-primary-600 
                     text-white transition-colors duration-200 transform hover:scale-110"
            aria-label="Swap units"
          >
            <ArrowUpDown size={20} />
          </button>
        </div>

        {/* To Unit */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">To</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={result}
              readOnly
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                       text-lg font-medium cursor-not-allowed"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       font-medium"
            >
              {units.map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Conversion Formula */}
      {inputValue && !isNaN(Number(inputValue)) && Number(inputValue) !== 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 animate-fade-in">
          <p className="text-sm text-center text-blue-800 dark:text-blue-200">
            {inputValue} {categoryData.units[fromUnit].symbol} = {result} {categoryData.units[toUnit].symbol}
          </p>
        </div>
      )}
    </div>
  );
};

export default Converter;