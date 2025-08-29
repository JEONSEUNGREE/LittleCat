import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { CategorySelector } from './components/CategorySelector';
import { Converter } from './components/Converter';
import { RecentConversions } from './components/RecentConversions';
import { useConverterStore } from './store/converterStore';

function App() {
  const { isDarkMode } = useConverterStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Category Selection */}
          <section className="glass-effect rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <CategorySelector />
          </section>

          {/* Converter */}
          <section className="glass-effect rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <Converter />
          </section>

          {/* Recent Conversions */}
          <section className="glass-effect rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <RecentConversions />
          </section>
        </div>
      </main>

      {/* Mobile Bottom Padding */}
      <div className="h-safe-bottom" />
    </div>
  );
}

export default App;