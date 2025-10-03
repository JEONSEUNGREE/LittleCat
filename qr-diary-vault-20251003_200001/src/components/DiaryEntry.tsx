import { useState } from 'react'
import { Save, Hash, Smile, Calendar, QrCode } from 'lucide-react'
import { useDiaryStore } from '../store/diaryStore'
import QRCode from 'qrcode'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface DiaryEntryProps {
  onGenerateQR: (qrData: string) => void
}

const moods = [
  { emoji: '😊', label: '행복' },
  { emoji: '😔', label: '슬픔' },
  { emoji: '😡', label: '화남' },
  { emoji: '😴', label: '피곤' },
  { emoji: '🤔', label: '생각' },
  { emoji: '😌', label: '평온' }
]

export function DiaryEntry({ onGenerateQR }: DiaryEntryProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedMood, setSelectedMood] = useState(moods[0].emoji)
  const [tags, setTags] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const addEntry = useDiaryStore((state) => state.addEntry)

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요!')
      return
    }

    setIsGenerating(true)
    
    try {
      const entryData = {
        title,
        content,
        mood: selectedMood,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        date: format(new Date(), 'yyyy-MM-dd HH:mm', { locale: ko })
      }
      
      const qrData = JSON.stringify(entryData)
      const qrCode = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#7C3AED',
          light: '#FFFFFF'
        }
      })
      
      addEntry({
        title,
        content,
        mood: selectedMood,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        qrCode
      })
      
      onGenerateQR(qrCode)
      
      // Reset form
      setTitle('')
      setContent('')
      setTags('')
      setSelectedMood(moods[0].emoji)
      
    } catch (error) {
      console.error('QR 생성 실패:', error)
      alert('QR 코드 생성에 실패했습니다.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4 fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Calendar className="inline w-4 h-4 mr-1" />
          {format(new Date(), 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="오늘의 제목을 입력하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Smile className="inline w-4 h-4 mr-1" />
          오늘의 기분
        </label>
        <div className="flex space-x-2">
          {moods.map((mood) => (
            <button
              key={mood.emoji}
              onClick={() => setSelectedMood(mood.emoji)}
              className={`p-3 rounded-lg transition-all ${
                selectedMood === mood.emoji
                  ? 'bg-purple-100 dark:bg-purple-900 ring-2 ring-purple-500'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={mood.label}
            >
              <span className="text-2xl">{mood.emoji}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          내용
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-32 resize-none"
          placeholder="오늘 있었던 일을 자유롭게 작성해보세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Hash className="inline w-4 h-4 mr-1" />
          태그 (쉼표로 구분)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="일상, 행복, 추억"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleSave}
          disabled={isGenerating}
          className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span>저장하기</span>
        </button>
        <button
          onClick={handleSave}
          disabled={isGenerating}
          className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <QrCode className="w-5 h-5" />
          <span>QR 생성</span>
        </button>
      </div>
    </div>
  )
}