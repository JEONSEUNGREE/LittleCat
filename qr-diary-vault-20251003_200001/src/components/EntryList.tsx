import { useDiaryStore } from '../store/diaryStore'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar, Hash, QrCode, Trash2 } from 'lucide-react'

interface EntryListProps {
  onSelectEntry: (qrData: string) => void
}

export function EntryList({ onSelectEntry }: EntryListProps) {
  const entries = useDiaryStore((state) => state.entries)
  const deleteEntry = useDiaryStore((state) => state.deleteEntry)

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <QrCode className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          아직 작성된 일기가 없습니다
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          첫 일기를 작성해보세요!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => entry.qrCode && onSelectEntry(entry.qrCode)}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 dark:text-white flex items-center">
                <span className="mr-2 text-xl">{entry.mood}</span>
                {entry.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(entry.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (confirm('이 일기를 삭제하시겠습니까?')) {
                  deleteEntry(entry.id)
                }
              }}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-2">
            {entry.content}
          </p>
          
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}