import { useState } from 'react'
import { Eye, EyeOff, Save, RefreshCw } from 'lucide-react'

interface PasswordInputProps {
  password: string
  setPassword: (password: string) => void
  onSave: () => void
}

const PasswordInput = ({ password, setPassword, onSave }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
    let newPassword = ''
    for (let i = 0; i < 16; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">패스워드 입력</h2>
      
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="패스워드를 입력하세요"
          className="w-full px-4 py-3 pr-12 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={generatePassword}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
        >
          <RefreshCw size={18} />
          자동 생성
        </button>
        
        <button
          onClick={onSave}
          disabled={!password}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
        >
          <Save size={18} />
          저장하기
        </button>
      </div>
    </div>
  )
}

export default PasswordInput