import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fortune } from '../types';
import { RefreshCw } from 'lucide-react';

interface FortuneDisplayProps {
  fortune: Fortune | null;
  isVisible: boolean;
  onNewFortune: () => void;
}

const FortuneDisplay: React.FC<FortuneDisplayProps> = ({ fortune, isVisible, onNewFortune }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (fortune && isVisible) {
      // Typewriter effect
      setDisplayedText('');
      const text = fortune.text;
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [fortune, isVisible]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'love':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'career':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'life':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'funny':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'custom':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && fortune && (
        <motion.div
          id="fortune-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto mt-8 px-4"
        >
          <div className="relative">
            {/* Fortune paper */}
            <div className="fortune-paper rounded-lg shadow-xl p-6 border-2 border-amber-200">
              {/* Category badge */}
              <div className="absolute -top-3 left-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(fortune.category)}`}>
                  {fortune.category.toUpperCase()}
                </span>
              </div>

              {/* Fortune text */}
              <div className="mt-2 text-center">
                <p className="text-lg md:text-xl font-medium text-amber-900 leading-relaxed min-h-[3rem]">
                  {displayedText}
                  {displayedText.length < fortune.text.length && (
                    <span className="inline-block w-1 h-5 bg-amber-900 animate-pulse ml-1" />
                  )}
                </p>
              </div>

              {/* Lucky numbers */}
              <div className="mt-4 pt-4 border-t border-amber-200/50">
                <p className="text-xs text-amber-700 text-center">
                  Lucky Numbers: {Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1).join(', ')}
                </p>
              </div>
            </div>

            {/* New fortune button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              onClick={onNewFortune}
              className="absolute -bottom-5 right-4 bg-fortune-gold text-white rounded-full p-3 shadow-lg hover:bg-fortune-red transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RefreshCw size={20} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FortuneDisplay;