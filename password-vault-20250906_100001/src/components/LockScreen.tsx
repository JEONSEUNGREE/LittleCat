import React, { useState } from 'react'
import { Lock, Unlock, Shield, AlertTriangle } from 'lucide-react'
import { usePasswordStore } from '../store/usePasswordStore'

export const LockScreen: React.FC = () => {
  const [password, setPassword] = useState('')
  const [isNewVault, setIsNewVault] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  
  const { setLocked, setMasterPassword, checkMasterPassword, masterPasswordHash } = usePasswordStore()
  
  React.useEffect(() => {
    if (!masterPasswordHash) {
      setIsNewVault(true)
    }
  }, [masterPasswordHash])
  
  const hashPassword = async (pass: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(pass)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
  
  const handleUnlock = async () => {
    if (isNewVault) {
      if (password.length < 8) {
        setError('비밀번호는 최소 8자 이상이어야 합니다')
        return
      }
      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다')
        return
      }
      const hash = await hashPassword(password)
      setMasterPassword(hash)
      setLocked(false)
    } else {
      const hash = await hashPassword(password)
      if (checkMasterPassword(hash)) {
        setLocked(false)
      } else {
        setError('비밀번호가 올바르지 않습니다')
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-vault-dark to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="card backdrop-blur-sm bg-vault-card/90">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-vault-accent/20 rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
              {isNewVault ? <Shield className="w-10 h-10 text-vault-accent" /> : <Lock className="w-10 h-10 text-vault-accent" />}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Password Vault</h1>
            <p className="text-vault-muted text-center">
              {isNewVault ? '새로운 마스터 비밀번호를 설정하세요' : '마스터 비밀번호를 입력하세요'}
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-vault-muted block mb-2">
                {isNewVault ? '마스터 비밀번호' : '비밀번호'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                onKeyPress={(e) => e.key === 'Enter' && !isNewVault && handleUnlock()}
                className="input-field"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            
            {isNewVault && (
              <div>
                <label className="text-sm text-vault-muted block mb-2">비밀번호 확인</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError('')
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            )}
            
            {error && (
              <div className="flex items-center gap-2 p-3 bg-vault-danger/20 border border-vault-danger/50 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-vault-danger flex-shrink-0" />
                <p className="text-sm text-vault-danger">{error}</p>
              </div>
            )}
            
            <button
              onClick={handleUnlock}
              disabled={!password || (isNewVault && !confirmPassword)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              {isNewVault ? '보관함 생성' : '잠금 해제'}
            </button>
            
            {isNewVault && (
              <div className="p-4 bg-vault-warning/10 border border-vault-warning/30 rounded-xl">
                <p className="text-xs text-vault-warning text-center">
                  ⚠️ 마스터 비밀번호는 복구할 수 없습니다. 안전한 곳에 보관하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}