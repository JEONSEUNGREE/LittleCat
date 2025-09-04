import { useStoryStore } from '../store/storyStore'
import { Save, Share2, Trash2, Download, Copy, Heart } from 'lucide-react'
import { useState } from 'react'

export default function StoryActions() {
  const { currentStory, selectedEmojis, saveStory, clearEmojis } = useStoryStore()
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (currentStory.text && selectedEmojis.length > 0) {
      saveStory()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const handleShare = async () => {
    const shareText = `${selectedEmojis.join(' ')}\n\n${currentStory.text}\n\nCreated with Emoji Story Creator`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Emoji Story',
          text: shareText
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    const content = `${selectedEmojis.join(' ')}\n\n${currentStory.text}\n\nCreated with Emoji Story Creator`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `emoji-story-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    const text = `${selectedEmojis.join(' ')} ${currentStory.text}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Actions</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          onClick={handleSave}
          disabled={!currentStory.text || selectedEmojis.length === 0}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
            currentStory.text && selectedEmojis.length > 0
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save'}
        </button>

        <button
          onClick={handleShare}
          disabled={!currentStory.text || selectedEmojis.length === 0}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
            currentStory.text && selectedEmojis.length > 0
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button
          onClick={handleCopy}
          disabled={!currentStory.text}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
            currentStory.text
              ? 'bg-purple-500 text-white hover:bg-purple-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={handleDownload}
          disabled={!currentStory.text}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
            currentStory.text
              ? 'bg-indigo-500 text-white hover:bg-indigo-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          Download
        </button>

        <button
          onClick={clearEmojis}
          disabled={selectedEmojis.length === 0}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
            selectedEmojis.length > 0
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>

        <button
          className="flex items-center justify-center gap-2 px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all"
        >
          <Heart className="w-4 h-4" />
          Like
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{selectedEmojis.length}</p>
          <p className="text-xs text-gray-500">Emojis</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">{currentStory.text.length}</p>
          <p className="text-xs text-gray-500">Characters</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">{currentStory.text.split(' ').filter(w => w).length}</p>
          <p className="text-xs text-gray-500">Words</p>
        </div>
      </div>
    </div>
  )
}