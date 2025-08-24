import { useState } from 'react'
import { Clock, Copy, Trash2, Shield } from 'lucide-react'
import { usePasswordStore } from '../store/passwordStore'

export default function PasswordHistory() {
  const { history, clearHistory, removeFromHistory } = usePasswordStore()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (password: string, id: string) => {
    try {
      await navigator.clipboard.writeText(password)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 30) return 'text-red-400'
    if (strength < 60) return 'text-orange-400'
    if (strength < 80) return 'text-yellow-400'
    return 'text-green-400'
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    return `${days}일 전`
  }

  if (history.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-cyber-400" />
          기록
        </h2>
        <p className="text-gray-400 text-center py-8">
          아직 생성된 비밀번호가 없습니다
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyber-400" />
          기록
        </h2>
        <button
          onClick={clearHistory}
          className="text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          전체 삭제
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm truncate">
                  {item.password}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Shield className={`w-3 h-3 ${getStrengthColor(item.strength)}`} />
                    {item.strength}%
                  </span>
                  <span>{item.entropy.toFixed(0)} bits</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(item.password, item.id)}
                  className="p-1.5 hover:bg-gray-500 rounded transition-colors"
                  title="복사"
                >
                  {copiedId === item.id ? (
                    <span className="text-green-400 text-xs">✓</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => removeFromHistory(item.id)}
                  className="p-1.5 hover:bg-gray-500 rounded transition-colors"
                  title="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}