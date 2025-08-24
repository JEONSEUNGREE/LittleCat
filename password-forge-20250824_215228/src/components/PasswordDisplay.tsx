import { useState } from 'react'
import { Copy, Eye, EyeOff, RefreshCw, Shield } from 'lucide-react'
import { usePasswordStore } from '../store/passwordStore'

export default function PasswordDisplay() {
  const { password, strength, entropy, timeToHack, generatePassword } = usePasswordStore()
  const [showPassword, setShowPassword] = useState(true)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getStrengthColor = () => {
    if (strength < 30) return 'bg-red-500'
    if (strength < 60) return 'bg-orange-500'
    if (strength < 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (strength < 30) return '매우 약함'
    if (strength < 60) return '약함'
    if (strength < 80) return '보통'
    if (strength < 90) return '강함'
    return '매우 강함'
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyber-400" />
          생성된 비밀번호
        </h2>
        <button
          onClick={generatePassword}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          title="새로 생성"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <div className="bg-gray-900 rounded-lg p-4 pr-24 font-mono text-lg break-all">
          {password ? (
            showPassword ? password : '•'.repeat(password.length)
          ) : (
            <span className="text-gray-500">비밀번호를 생성하세요</span>
          )}
        </div>
        
        {password && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title={showPassword ? '숨기기' : '보이기'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="복사"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {copied && (
        <div className="text-green-400 text-sm animate-pulse">
          비밀번호가 복사되었습니다!
        </div>
      )}

      {password && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>강도: {getStrengthText()}</span>
              <span>{strength}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${strength}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-gray-400 mb-1">엔트로피</div>
              <div className="font-bold">{entropy.toFixed(1)} bits</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-gray-400 mb-1">해킹 예상 시간</div>
              <div className="font-bold">{timeToHack}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}