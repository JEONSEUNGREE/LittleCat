import { useState } from 'react'
import { Plus, Search, Lock, Unlock, Trash2, QrCode, Clock, Tag, Eye, EyeOff } from 'lucide-react'
import useNotesStore, { SecretNote } from '../store'

interface NotesListProps {
  onCreateNote: () => void
}

export default function NotesList({ onCreateNote }: NotesListProps) {
  const { 
    getFilteredNotes, 
    deleteNote, 
    toggleLock,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useNotesStore()
  
  const [showQRModal, setShowQRModal] = useState<SecretNote | null>(null)
  const [revealedNotes, setRevealedNotes] = useState<Set<string>>(new Set())
  
  const notes = getFilteredNotes()
  
  const categories = [
    { value: 'all', label: 'All', color: 'bg-slate-600' },
    { value: 'personal', label: 'Personal', color: 'bg-blue-600' },
    { value: 'work', label: 'Work', color: 'bg-green-600' },
    { value: 'secret', label: 'Secret', color: 'bg-purple-600' },
    { value: 'temporary', label: 'Temp', color: 'bg-orange-600' }
  ]

  const toggleReveal = (noteId: string) => {
    const newRevealed = new Set(revealedNotes)
    if (newRevealed.has(noteId)) {
      newRevealed.delete(noteId)
    } else {
      newRevealed.add(noteId)
    }
    setRevealedNotes(newRevealed)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'work': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'secret': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'temporary': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.value
                  ? `${cat.color} text-white`
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <QrCode className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-400 mb-2">No secret notes yet</h3>
          <p className="text-sm text-slate-500 mb-6">Create your first QR-encoded secret message</p>
          <button
            onClick={onCreateNote}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Note</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map(note => {
            const isRevealed = revealedNotes.has(note.id)
            const isExpiringSoon = note.expiryDate && 
              new Date(note.expiryDate).getTime() - Date.now() < 3600000

            return (
              <div
                key={note.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all animate-slide-up"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-white truncate flex-1">
                    {note.isLocked && !isRevealed ? '••••••••' : note.title}
                  </h3>
                  <button
                    onClick={() => toggleLock(note.id)}
                    className="ml-2 text-slate-400 hover:text-white transition-colors"
                  >
                    {note.isLocked ? 
                      <Lock className="w-4 h-4" /> : 
                      <Unlock className="w-4 h-4" />
                    }
                  </button>
                </div>

                <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                  {note.isLocked && !isRevealed 
                    ? '•••••••••••••••••••••••' 
                    : note.content
                  }
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(note.category)}`}>
                    <Tag className="w-3 h-3 inline mr-1" />
                    {note.category}
                  </span>
                  
                  {note.expiryDate && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      isExpiringSoon 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {formatDate(note.expiryDate)}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 mb-3">
                  Created {formatDate(note.createdAt)}
                </div>

                <div className="flex gap-2">
                  {note.isLocked && (
                    <button
                      onClick={() => toggleReveal(note.id)}
                      className="flex-1 px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm flex items-center justify-center"
                    >
                      {isRevealed ? 
                        <><EyeOff className="w-4 h-4 mr-1" /> Hide</> :
                        <><Eye className="w-4 h-4 mr-1" /> Reveal</>
                      }
                    </button>
                  )}
                  
                  {note.qrCode && (
                    <button
                      onClick={() => setShowQRModal(note)}
                      className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm flex items-center justify-center"
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      QR
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      if (confirm('Delete this note?')) {
                        deleteNote(note.id)
                      }
                    }}
                    className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={onCreateNote}
        className="fixed right-4 bottom-20 md:bottom-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all hover:scale-110 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* QR Code Modal */}
      {showQRModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowQRModal(null)}
        >
          <div 
            className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              {showQRModal.title}
            </h3>
            {showQRModal.qrCode && (
              <div className="bg-white p-4 rounded-lg mb-4">
                <img src={showQRModal.qrCode} alt="QR Code" className="w-full" />
              </div>
            )}
            <button
              onClick={() => setShowQRModal(null)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}