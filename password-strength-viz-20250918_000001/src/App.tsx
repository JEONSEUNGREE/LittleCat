import { useState } from 'react'
import PasswordInput from './components/PasswordInput'
import StrengthMeter from './components/StrengthMeter'
import CriteriaList from './components/CriteriaList'
import PasswordHistory from './components/PasswordHistory'
import { usePasswordStore } from './store/passwordStore'
import { Shield } from 'lucide-react'

function App() {
  const [password, setPassword] = useState('')
  const addToHistory = usePasswordStore((state) => state.addToHistory)
  
  const savePassword = () => {
    if (password.length > 0) {
      addToHistory(password)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">
              Password Strength Visualizer
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            실시간으로 패스워드 강도를 시각화하고 분석합니다
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <PasswordInput 
                password={password}
                setPassword={setPassword}
                onSave={savePassword}
              />
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <StrengthMeter password={password} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <CriteriaList password={password} />
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl max-h-64 overflow-y-auto">
              <PasswordHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App