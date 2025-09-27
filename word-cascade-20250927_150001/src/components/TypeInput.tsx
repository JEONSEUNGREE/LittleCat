import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Type } from 'lucide-react';

const TypeInput: React.FC = () => {
  const { typedWord, updateTypedWord, checkWord, combo } = useGameStore();
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTypedWord(e.target.value);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      checkWord();
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <Type className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={24} />
        <input
          ref={inputRef}
          type="text"
          value={typedWord}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="단어를 입력하세요..."
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white text-xl font-bold placeholder-white/30 focus:outline-none focus:border-white/50 transition-all"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {combo > 0 && (
          <div className="absolute -top-8 right-4 text-yellow-400 font-bold animate-bounce">
            COMBO x{combo}!
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-white/50 text-sm">
        Enter 또는 Space로 단어 입력
      </div>
    </div>
  );
};

export default TypeInput;