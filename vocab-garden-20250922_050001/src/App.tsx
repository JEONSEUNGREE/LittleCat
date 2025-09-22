import { useState } from 'react'
import { TreePine, BookOpen, List } from 'lucide-react'
import Garden from './components/Garden'
import WordQuiz from './components/WordQuiz'
import WordList from './components/WordList'

type Tab = 'garden' | 'quiz' | 'words'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('garden')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-3">
            🌱 Vocab Garden
          </h1>
          <nav className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab('garden')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'garden'
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <TreePine className="w-5 h-5" />
              <span className="hidden sm:inline">정원</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'quiz'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">학습</span>
            </button>
            <button
              onClick={() => setActiveTab('words')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'words'
                  ? 'bg-purple-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
              <span className="hidden sm:inline">단어장</span>
            </button>
          </nav>
        </div>
      </div>

      <main className="pb-8">
        {activeTab === 'garden' && <Garden />}
        {activeTab === 'quiz' && (
          <div className="p-4 pt-8">
            <WordQuiz />
          </div>
        )}
        {activeTab === 'words' && (
          <div className="p-4 pt-8">
            <WordList />
          </div>
        )}
      </main>
    </div>
  )
}

export default App