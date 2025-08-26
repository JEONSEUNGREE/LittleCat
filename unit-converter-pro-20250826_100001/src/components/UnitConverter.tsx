import React, { useEffect, useState } from 'react';
import { ArrowUpDown, Star, Copy, Check } from 'lucide-react';
import { useConverterStore } from '../store/useConverterStore';
import { convertTemperature } from '../data/units';

export const UnitConverter: React.FC = () => {
  const {
    selectedCategory,
    fromUnit,
    toUnit,
    inputValue,
    setInputValue,
    setFromUnit,
    setToUnit,
    swapUnits,
    addToFavorites,
  } = useConverterStore();
  
  const [result, setResult] = useState('0');
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!fromUnit || !toUnit || !inputValue || isNaN(Number(inputValue))) {
      setResult('0');
      return;
    }

    const numValue = parseFloat(inputValue);
    let convertedValue: number;

    if (selectedCategory?.name === '온도') {
      convertedValue = convertTemperature(numValue, fromUnit.symbol, toUnit.symbol);
    } else {
      const baseValue = numValue * fromUnit.ratio;
      convertedValue = baseValue / toUnit.ratio;
    }

    const formatted = convertedValue < 0.01 && convertedValue > 0
      ? convertedValue.toExponential(2)
      : convertedValue.toFixed(6).replace(/\.?0+$/, '');
    
    setResult(formatted);
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFavorite = () => {
    addToFavorites();
    setFavorited(true);
    setTimeout(() => setFavorited(false), 2000);
  };

  if (!selectedCategory) return null;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-lg">
          {selectedCategory.icon} {selectedCategory.name} 변환
        </h3>
        <button
          onClick={handleAddFavorite}
          className={`p-2 rounded-lg transition-all ${
            favorited 
              ? 'bg-yellow-100 text-yellow-600' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <Star size={20} fill={favorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">변환할 값</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              placeholder="0"
            />
            <select
              value={fromUnit?.symbol}
              onChange={(e) => {
                const unit = selectedCategory.units.find(u => u.symbol === e.target.value);
                if (unit) setFromUnit(unit);
              }}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white text-gray-800"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-3 bg-purple-100 hover:bg-purple-200 rounded-full transition-all hover:scale-110"
          >
            <ArrowUpDown size={20} className="text-purple-600" />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">변환 결과</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-lg font-semibold text-gray-800 flex items-center justify-between">
              <span>{result}</span>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-gray-200 rounded transition-all"
              >
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-gray-500" />}
              </button>
            </div>
            <select
              value={toUnit?.symbol}
              onChange={(e) => {
                const unit = selectedCategory.units.find(u => u.symbol === e.target.value);
                if (unit) setToUnit(unit);
              }}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white text-gray-800"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          <span className="font-semibold">{inputValue || '0'} {fromUnit?.name}</span> = 
          <span className="font-semibold"> {result} {toUnit?.name}</span>
        </p>
      </div>
    </div>
  );
};