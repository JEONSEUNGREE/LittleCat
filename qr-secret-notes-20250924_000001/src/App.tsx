import { useState } from 'react'
import Header from './components/Header'
import CreateNote from './components/CreateNote'
import NotesList from './components/NotesList'
import QRScanner from './components/QRScanner'
import useNotesStore from './store'

type ViewMode = 'list' | 'create' | 'scan'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const { notes } = useNotesStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        {viewMode === 'list' && (
          <NotesList onCreateNote={() => setViewMode('create')} />
        )}
        
        {viewMode === 'create' && (
          <CreateNote onBack={() => setViewMode('list')} />
        )}
        
        {viewMode === 'scan' && (
          <QRScanner onBack={() => setViewMode('list')} />
        )}
      </main>
      
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 px-4 py-2 md:hidden">
        <div className="flex justify-around">
          <button
            onClick={() => setViewMode('list')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs mt-1">Notes</span>
          </button>
          
          <button
            onClick={() => setViewMode('create')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'create' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs mt-1">Create</span>
          </button>
          
          <button
            onClick={() => setViewMode('scan')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'scan' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 001 1h2m-1 4h2a1 1 0 001 1v2a1 1 0 01-1 1h-2m-1 4h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2" />
            </svg>
            <span className="text-xs mt-1">Scan</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App