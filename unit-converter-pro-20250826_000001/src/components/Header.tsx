import { Calculator, Moon, Sun } from 'lucide-react';
import { useConverterStore } from '../store/useConverterStore';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useConverterStore();

  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-700 dark:to-primary-800 
                     text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Calculator size={28} />
            <div>
              <h1 className="text-xl font-bold">Unit Converter Pro</h1>
              <p className="text-xs opacity-90">Fast & Easy Conversions</p>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;