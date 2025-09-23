import { useState } from 'react'
import { ArrowLeft, Lock, Save, QrCode, Clock, Tag } from 'lucide-react'
import QRCode from 'qrcode'
import useNotesStore from '../store'

interface CreateNoteProps {
  onBack: () => void
}

export default function CreateNote({ onBack }: CreateNoteProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<'personal' | 'work' | 'secret' | 'temporary'>('personal')
  const [isLocked, setIsLocked] = useState(false)
  const [expiryHours, setExpiryHours] = useState(24)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [showQR, setShowQR] = useState(false)
  
  const { addNote } = useNotesStore()

  const generateQRCode = async (text: string) => {
    try {
      const url = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#FFFFFF'
        }
      })
      setQrCodeUrl(url)
      return url
    } catch (err) {
      console.error('Error generating QR code:', err)
      return ''
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please enter both title and content')
      return
    }

    const qrContent = `${title}\n---\n${content}`
    const qrCode = await generateQRCode(qrContent)
    
    const expiryDate = category === 'temporary' 
      ? new Date(Date.now() + expiryHours * 60 * 60 * 1000)
      : undefined

    addNote({
      title,
      content,
      category,
      isLocked,
      qrCode,
      expiryDate
    })

    onBack()
  }

  const handleGeneratePreview = async () => {
    if (content.trim()) {
      const qrContent = `${title || 'Untitled'}\n---\n${content}`
      await generateQRCode(qrContent)
      setShowQR(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <h2 className="text-xl font-semibold text-white">Create Secret Note</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Secret Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              placeholder="Enter your secret message..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="secret">Secret</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            {category === 'temporary' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Expires in (hours)
                </label>
                <input
                  type="number"
                  value={expiryHours}
                  onChange={(e) => setExpiryHours(Number(e.target.value))}
                  min="1"
                  max="720"
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between py-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
                className="w-5 h-5 rounded border-slate-600 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-slate-300 flex items-center">
                <Lock className="w-4 h-4 mr-1" />
                Lock this note
              </span>
            </label>

            <button
              onClick={handleGeneratePreview}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Preview QR</span>
            </button>
          </div>

          {showQR && qrCodeUrl && (
            <div className="flex justify-center p-4 bg-white rounded-lg animate-slide-up">
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}