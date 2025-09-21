import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import FortuneCookie from './components/FortuneCookie';
import FortuneDisplay from './components/FortuneDisplay';
import ShareButton from './components/ShareButton';
import CategorySelector from './components/CategorySelector';
import CustomFortuneInput from './components/CustomFortuneInput';
import FortuneHistory from './components/FortuneHistory';
import DailyFortune from './components/DailyFortune';
import { Fortune, FortuneCategory } from './types';
import { fortunes } from './data/fortunes';
import { storage } from './utils/storage';

function App() {
  const [isCracked, setIsCracked] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory>('life');
  const [fortuneHistory, setFortuneHistory] = useState<Fortune[]>([]);
  const [dailyFortune, setDailyFortune] = useState<Fortune | null>(null);
  const [customFortunes, setCustomFortunes] = useState<string[]>([]);

  // Load history and daily fortune on mount
  useEffect(() => {
    const history = storage.getHistory();
    setFortuneHistory(history.fortunes);
    
    // Check for daily fortune
    let daily = storage.getDailyFortune();
    if (!daily) {
      // Generate new daily fortune
      const allFortunes = Object.values(fortunes).flat();
      const randomFortune = allFortunes[Math.floor(Math.random() * allFortunes.length)];
      daily = {
        id: `daily-${Date.now()}`,
        text: randomFortune,
        category: 'life',
        timestamp: Date.now(),
      };
      storage.setDailyFortune(daily);
    }
    setDailyFortune(daily);
  }, []);

  const generateFortune = () => {
    let availableFortunes: string[] = [];
    
    if (selectedCategory === 'custom' && customFortunes.length > 0) {
      availableFortunes = customFortunes;
    } else {
      availableFortunes = fortunes[selectedCategory];
    }

    if (availableFortunes.length === 0) {
      availableFortunes = fortunes.life; // Fallback to life fortunes
    }

    const randomIndex = Math.floor(Math.random() * availableFortunes.length);
    const fortuneText = availableFortunes[randomIndex];
    
    const newFortune: Fortune = {
      id: `${Date.now()}-${Math.random()}`,
      text: fortuneText,
      category: selectedCategory,
      timestamp: Date.now(),
      isCustom: selectedCategory === 'custom',
    };

    setCurrentFortune(newFortune);
    storage.addFortune(newFortune);
    setFortuneHistory([newFortune, ...fortuneHistory.slice(0, 49)]);
  };

  const handleCrackCookie = () => {
    setIsCracked(true);
    generateFortune();
  };

  const handleNewFortune = () => {
    setIsCracked(false);
    setCurrentFortune(null);
    // Small delay before showing new cookie
    setTimeout(() => {
      // Cookie will be ready for next crack
    }, 300);
  };

  const handleSaveCustomFortune = (text: string) => {
    setCustomFortunes([...customFortunes, text]);
    // Optionally switch to custom category
    setSelectedCategory('custom');
  };

  const handleClearHistory = () => {
    storage.clearHistory();
    setFortuneHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-yellow-50 overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-red-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 w-48 h-48 bg-amber-200 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Daily Fortune */}
      <DailyFortune fortune={dailyFortune} />

      {/* History Button */}
      <div className="fixed top-4 right-4 z-30">
        <FortuneHistory fortunes={fortuneHistory} onClear={handleClearHistory} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-fortune-red to-fortune-gold p-3 rounded-full">
              <Cookie size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Fortune Cookie Maker
          </h1>
          <p className="text-gray-600">
            {isCracked ? 'Your fortune has been revealed!' : 'Click the cookie to reveal your fortune'}
          </p>
        </motion.div>

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            disabled={isCracked}
          />
        </motion.div>

        {/* Custom Fortune Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <CustomFortuneInput onSave={handleSaveCustomFortune} />
        </motion.div>

        {/* Fortune Cookie */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
        >
          <FortuneCookie
            onCrack={handleCrackCookie}
            isCracked={isCracked}
          />
        </motion.div>

        {/* Fortune Display */}
        <FortuneDisplay
          fortune={currentFortune}
          isVisible={isCracked}
          onNewFortune={handleNewFortune}
        />

        {/* Share Button */}
        {currentFortune && isCracked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-6"
          >
            <ShareButton fortuneText={currentFortune.text} />
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-sm text-gray-500"
        >
          <p>Made with ❤️ for fortune seekers everywhere</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;