import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';

export const QuickConvert: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    try {
      // Basic calculator functionality - safely evaluate simple math expressions
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      if (sanitized) {
        // Using Function constructor instead of eval for safety
        const calc = new Function('return ' + sanitized);
        const res = calc();
        setResult(res.toString());
      }
    } catch {
      setResult('Error');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculate();
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  const handleButtonClick = (btn: string) => {
    if (btn === '=') {
      calculate();
    } else {
      setExpression(prev => prev + btn);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
      >
        <Calculator size={24} className="text-purple-600" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">빠른 계산기</h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setExpression('');
                  setResult('');
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-lg mb-2"
              placeholder="계산식 입력"
            />

            {result && (
              <div className="px-4 py-2 bg-purple-50 rounded-lg mb-4">
                <p className="text-purple-700 font-semibold text-right text-xl">= {result}</p>
              </div>
            )}

            <div className="grid grid-cols-4 gap-2">
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleButtonClick(btn)}
                  className={`
                    p-3 rounded-lg font-medium transition-all
                    ${btn === '=' 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                  `}
                >
                  {btn}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setExpression('');
                setResult('');
              }}
              className="w-full mt-2 p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </>
  );
};