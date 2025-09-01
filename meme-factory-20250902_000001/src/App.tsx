import { useState } from 'react'
import Header from './components/Header'
import MemeCanvas from './components/MemeCanvas'
import TemplateGallery from './components/TemplateGallery'
import TextControls from './components/TextControls'
import SharePanel from './components/SharePanel'
import { useMemeStore } from './store/memeStore'

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'gallery'>('create')
  const { currentMeme } = useMemeStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="glass-effect rounded-full p-1 flex gap-2">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-meme-purple to-meme-pink text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Create Meme
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-meme-purple to-meme-pink text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Templates
            </button>
          </div>
        </div>

        {activeTab === 'create' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Canvas Area */}
            <div className="lg:col-span-2 space-y-4">
              <MemeCanvas />
              {currentMeme && <SharePanel />}
            </div>

            {/* Controls Sidebar */}
            <div className="space-y-4">
              <TextControls />
            </div>
          </div>
        ) : (
          <TemplateGallery onSelectTemplate={() => setActiveTab('create')} />
        )}
      </main>

      {/* Mobile Bottom Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-effect border-t border-white/20">
        <div className="flex gap-3 justify-center">
          <button className="flex-1 bg-gradient-to-r from-meme-purple to-meme-pink text-white py-3 rounded-xl font-semibold">
            Save Meme
          </button>
          <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold">
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default App