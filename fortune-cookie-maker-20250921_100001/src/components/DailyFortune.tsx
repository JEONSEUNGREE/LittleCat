import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { Fortune } from '../types';

interface DailyFortuneProps {
  fortune: Fortune | null;
}

const DailyFortune: React.FC<DailyFortuneProps> = ({ fortune }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    if (fortune) {
      setShowSparkle(true);
      const timer = setTimeout(() => setShowSparkle(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [fortune]);

  if (!fortune) return null;

  return (
    <>
      {/* Daily fortune indicator */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Calendar size={20} />
          {showSparkle && (
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.5, 0], rotate: 180 }}
              transition={{ duration: 1 }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles size={12} className="text-yellow-200" />
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* Daily fortune modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg shadow-xl z-50 p-6 mx-4"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full p-3">
                    <Sparkles size={32} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  Today's Daily Fortune
                </h3>
                
                <p className="text-xs text-amber-700 mb-4">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {fortune.text}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-amber-300/50">
                  <p className="text-xs text-amber-700">
                    This is your special fortune for today. Come back tomorrow for a new one!
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full hover:from-amber-500 hover:to-orange-600 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DailyFortune;