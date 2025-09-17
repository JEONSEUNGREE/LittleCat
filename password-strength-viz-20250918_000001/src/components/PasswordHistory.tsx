import { usePasswordStore } from '../store/passwordStore'
import { getStrengthColor, getTextColor } from '../utils/passwordUtils'
import { History, Trash2 } from 'lucide-react'

const PasswordHistory = () => {
  const { history, clearHistory } = usePasswordStore()
  
  const maskPassword = (password: string) => {
    if (password.length <= 4) return '••••'
    return password.slice(0, 2) + '••••' + password.slice(-2)
  }
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <History size={20} />
          저장 기록
        </h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <History size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">아직 저장된 패스워드가 없습니다</p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-gray-600/30"
            >
              <div>
                <p className="text-gray-300 font-mono text-sm">
                  {maskPassword(item.password)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.timestamp).toLocaleTimeString('ko-KR')}
                </p>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                  getStrengthColor(item.strength).replace('bg-', 'bg-opacity-20 bg-')
                }`}>
                  <span className={`text-xs font-bold ${getTextColor(item.strength)}`}>
                    {item.strength}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PasswordHistory