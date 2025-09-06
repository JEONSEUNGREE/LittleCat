import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Letter } from '../types/game';

export const GameBoard: React.FC = () => {
  const { letters, selectedLetters, currentWord, selectLetter, clearSelection, submitWord } = useGameStore();

  const handleLetterClick = (letter: Letter) => {
    selectLetter(letter);
  };

  const handleSubmit = () => {
    if (currentWord.length >= 3) {
      submitWord();
    }
  };

  const handleClear = () => {
    clearSelection();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <div className="text-3xl font-bold min-h-[40px] tracking-wider">
            {currentWord || '단어를 만드세요'}
          </div>
          {currentWord.length > 0 && (
            <div className="text-sm mt-2 opacity-90">
              {currentWord.length}글자
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner">
        {letters.map((letter) => (
          <button
            key={letter.id}
            onClick={() => handleLetterClick(letter)}
            className={`
              w-12 h-12 sm:w-14 sm:h-14 rounded-lg font-bold text-lg sm:text-xl
              transition-all duration-200 transform active:scale-95
              ${letter.isSelected
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg hover:scale-105'
              }
              no-tap-highlight
            `}
          >
            {letter.letter}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 w-full max-w-md">
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold 
            shadow-md hover:shadow-lg active:scale-95 transition-all duration-200
            no-tap-highlight"
        >
          초기화
        </button>
        <button
          onClick={handleSubmit}
          disabled={currentWord.length < 3}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold shadow-md 
            transition-all duration-200 no-tap-highlight
            ${currentWord.length >= 3
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          공격!
        </button>
      </div>

      {selectedLetters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {selectedLetters.map((letter, index) => (
            <span
              key={`selected-${letter.id}-${index}`}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                px-3 py-1 rounded-full text-sm font-medium animate-slide-up"
            >
              {letter.letter}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};