import { useEffect } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import Converter from './components/Converter';
import History from './components/History';
import { useConverterStore } from './store/useConverterStore';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto max-w-4xl pb-8">
        <div className="space-y-4">
          <CategorySelector />
          <Converter />
          <History />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500 dark:text-gray-600">
        <p>© 2024 Unit Converter Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;