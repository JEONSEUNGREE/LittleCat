
import { Calculator, Moon, Sun } from 'lucide-react';
import { useConverterStore } from '../store/converterStore';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useConverterStore();

  return (
    <header className="glass-effect border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white">
              <Calculator size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Unit Converter Pro
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                모든 단위를 한 번에
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};