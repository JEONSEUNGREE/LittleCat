import React, { useState, useEffect } from 'react'
import { X, Save, RefreshCw, Shield, Globe, User, FileText } from 'lucide-react'
import { usePasswordStore, PasswordEntry, PasswordOptions } from '../store/usePasswordStore'

interface PasswordFormProps {
  entry?: PasswordEntry | null
  onClose: () => void
}

export const PasswordForm: React.FC<PasswordFormProps> = ({ entry, onClose }) => {
  const { addPassword, updatePassword, generatePassword, calculateStrength } = usePasswordStore()
  
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
    category: 'personal' as PasswordEntry['category']
  })
  
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  })
  
  const [passwordLength, setPasswordLength] = useState(16)
  const [strength, setStrength] = useState(0)
  
  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        username: entry.username,
        password: entry.password,
        url: entry.url || '',
        notes: entry.notes || '',
        category: entry.category
      })
      setStrength(entry.strength)
    }
  }, [entry])
  
  useEffect(() => {
    if (formData.password) {
      setStrength(calculateStrength(formData.password))
    }
  }, [formData.password, calculateStrength])
  
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(passwordLength, passwordOptions)
    setFormData({ ...formData, password: newPassword })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.username || !formData.password) {
      alert('필수 항목을 모두 입력해주세요')
      return
    }
    
    if (entry) {
      updatePassword(entry.id, formData)
    } else {
      addPassword(formData)
    }
    
    onClose()
  }
  
  const categories = [
    { value: 'personal', label: '개인', icon: '👤' },
    { value: 'work', label: '업무', icon: '💼' },
    { value: 'social', label: '소셜', icon: '💬' },
    { value: 'finance', label: '금융', icon: '💰' },
    { value: 'other', label: '기타', icon: '📁' }
  ]
  
  const getStrengthColor = (strength: number) => {
    if (strength < 30) return 'text-vault-danger'
    if (strength < 60) return 'text-vault-warning'
    return 'text-vault-success'
  }
  
  const getStrengthText = (strength: number) => {
    if (strength < 30) return '약함'
    if (strength < 60) return '보통'
    if (strength < 80) return '강함'
    return '매우 강함'
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="w-full max-w-lg bg-vault-card rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-vault-muted/20">
          <h2 className="text-xl font-bold text-white">
            {entry ? '비밀번호 수정' : '새 비밀번호 추가'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-vault-muted hover:text-vault-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-sm text-vault-muted block mb-2">
              제목 <span className="text-vault-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="예: Google 계정"
              required
            />
          </div>
          
          <div>
            <label className="text-sm text-vault-muted block mb-2">
              카테고리
            </label>
            <div className="grid grid-cols-5 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value as PasswordEntry['category'] })}
                  className={`p-3 rounded-xl border transition-all ${
                    formData.category === cat.value
                      ? 'bg-vault-accent/20 border-vault-accent text-vault-accent'
                      : 'bg-vault-dark/50 border-vault-muted/30 text-vault-muted hover:border-vault-accent/50'
                  }`}
                >
                  <div className="text-lg mb-1">{cat.icon}</div>
                  <div className="text-xs">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm text-vault-muted block mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              사용자명 <span className="text-vault-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="input-field"
              placeholder="예: user@example.com"
              required
            />
          </div>
          
          <div>
            <label className="text-sm text-vault-muted block mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              비밀번호 <span className="text-vault-danger">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
                placeholder="비밀번호 입력"
                required
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="btn-secondary px-4 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                생성
              </button>
            </div>
            
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-vault-muted">강도:</span>
                  <span className={`font-semibold ${getStrengthColor(strength)}`}>
                    {getStrengthText(strength)} ({strength}%)
                  </span>
                </div>
                <div className="h-2 bg-vault-dark/50 rounded-full overflow-hidden mt-1">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      strength < 30 ? 'bg-vault-danger' :
                      strength < 60 ? 'bg-vault-warning' :
                      'bg-vault-success'
                    }`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-3 p-4 bg-vault-dark/30 rounded-xl">
            <div className="flex items-center justify-between">
              <label className="text-sm text-vault-muted">비밀번호 길이</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-vault-text font-mono w-8">{passwordLength}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'uppercase', label: '대문자 (A-Z)' },
                { key: 'lowercase', label: '소문자 (a-z)' },
                { key: 'numbers', label: '숫자 (0-9)' },
                { key: 'symbols', label: '특수문자 (!@#$)' }
              ].map(option => (
                <label key={option.key} className="flex items-center gap-2 text-sm text-vault-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordOptions[option.key as keyof PasswordOptions]}
                    onChange={(e) => setPasswordOptions({
                      ...passwordOptions,
                      [option.key]: e.target.checked
                    })}
                    className="w-4 h-4 rounded accent-vault-accent"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm text-vault-muted block mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label className="text-sm text-vault-muted block mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              메모
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field resize-none"
              rows={3}
              placeholder="추가 정보..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              취소
            </button>
            <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              {entry ? '수정' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}