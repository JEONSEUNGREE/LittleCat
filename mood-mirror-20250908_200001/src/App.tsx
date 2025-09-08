import { useState } from 'react';
import { Palette, Users, Clock, Menu, X, Moon, Sun } from 'lucide-react';
import { MoodSelector } from './components/MoodSelector';
import { CommunityMoodStream } from './components/CommunityMoodStream';
import { MoodHistory } from './components/MoodHistory';
import { MoodVisualization } from './components/MoodVisualization';
import { useMoodStore } from './store/useMoodStore';

type TabType = 'express' | 'community' | 'history';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('express');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentMood = useMoodStore(state => state.currentMood);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const tabs = [
    { id: 'express' as const, label: 'Express', icon: Palette },
    { id: 'community' as const, label: 'Community', icon: Users },
    { id: 'history' as const, label: 'History', icon: Clock },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Mood Mirror
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
              <nav className="px-4 py-3 space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Current Mood Display */}
          {currentMood && (
            <div className="mb-8 flex justify-center animate-fade-in">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Your Current Vibe
                </h3>
                <MoodVisualization mood={currentMood} size="medium" interactive={false} />
              </div>
            </div>
          )}

          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === 'express' && <MoodSelector />}
            {activeTab === 'community' && <CommunityMoodStream />}
            {activeTab === 'history' && <MoodHistory />}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Express yourself through colors • Connect without words</p>
        </footer>
      </div>
    </div>
  );
}

export default App;