import { useEffect } from 'react'
import { Shield, Info } from 'lucide-react'
import PasswordDisplay from './components/PasswordDisplay'
import PasswordSettings from './components/PasswordSettings'
import PasswordHistory from './components/PasswordHistory'
import { usePasswordStore } from './store/passwordStore'

function App() {
  const generatePassword = usePasswordStore(state => state.generatePassword)

  useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-cyber-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-400 to-cyan-400 bg-clip-text text-transparent">
              Password Forge
            </h1>
          </div>
          <p className="text-gray-400">강력하고 안전한 비밀번호 생성기</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PasswordDisplay />
            <PasswordHistory />
          </div>
          
          <div className="space-y-6">
            <PasswordSettings />
            
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyber-400" />
                보안 팁
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyber-400 mt-1">•</span>
                  <span>각 계정마다 고유한 비밀번호를 사용하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-400 mt-1">•</span>
                  <span>최소 12자 이상의 비밀번호를 권장합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-400 mt-1">•</span>
                  <span>대소문자, 숫자, 특수문자를 모두 포함하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-400 mt-1">•</span>
                  <span>개인정보나 사전에 있는 단어는 피하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-400 mt-1">•</span>
                  <span>정기적으로 비밀번호를 변경하세요</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 Password Forge. 모든 비밀번호는 로컬에서 생성됩니다.</p>
        </footer>
      </div>
    </div>
  )
}

export default App