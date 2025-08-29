import { useEffect, useState } from 'react';
import { ArrowUpDown, Copy, Check } from 'lucide-react';
import { useConverterStore } from '../store/converterStore';

export const Converter: React.FC = () => {
  const {
    selectedCategory,
    fromUnit,
    toUnit,
    inputValue,
    setFromUnit,
    setToUnit,
    setInputValue,
    swapUnits,
    convert,
    addRecentConversion,
  } = useConverterStore();

  const [result, setResult] = useState<string>('0');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedCategory && fromUnit && toUnit && inputValue) {
      const convertedValue = convert();
      const formatted = convertedValue < 0.01 && convertedValue > 0 
        ? convertedValue.toExponential(4)
        : convertedValue.toLocaleString('ko-KR', { 
            maximumFractionDigits: 6,
            minimumFractionDigits: 0
          });
      setResult(formatted);
      
      if (inputValue && !isNaN(Number(inputValue))) {
        addRecentConversion({
          category: selectedCategory.name,
          from: fromUnit.symbol,
          to: toUnit.symbol,
          fromValue: Number(inputValue),
          toValue: convertedValue,
        });
      }
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.replace(/,/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!selectedCategory) {
    return (
      <div className="w-full p-8 text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg">카테고리를 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {selectedCategory.name} 변환
      </h3>

      <div className="space-y-4">
        {/* From Unit */}
        <div className="glass-effect rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            변환할 값
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field flex-1"
              placeholder="숫자를 입력하세요"
            />
            <select
              value={fromUnit?.symbol}
              onChange={(e) => {
                const unit = selectedCategory.units.find(u => u.symbol === e.target.value);
                if (unit) setFromUnit(unit);
              }}
              className="input-field w-32"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
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
            className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-all duration-200"
          >
            <ArrowUpDown size={20} />
          </button>
        </div>

        {/* To Unit */}
        <div className="glass-effect rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            변환 결과
          </label>
          <div className="flex gap-3">
            <div className="input-field flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
              <span className="text-lg font-semibold">{result}</span>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <select
              value={toUnit?.symbol}
              onChange={(e) => {
                const unit = selectedCategory.units.find(u => u.symbol === e.target.value);
                if (unit) setToUnit(unit);
              }}
              className="input-field w-32"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.symbol} value={unit.symbol}>
                  {unit.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Conversion Formula */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {inputValue || '1'} {fromUnit?.name} = {result} {toUnit?.name}
      </div>
    </div>
  );
};