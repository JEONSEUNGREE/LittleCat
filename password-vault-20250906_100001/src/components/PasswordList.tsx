import React, { useState, useMemo } from 'react'
import { Copy, Eye, EyeOff, Edit2, Trash2, ExternalLink, Shield, Search } from 'lucide-react'
import { usePasswordStore, PasswordEntry } from '../store/usePasswordStore'

interface PasswordListProps {
  onEdit: (entry: PasswordEntry) => void
}

export const PasswordList: React.FC<PasswordListProps> = ({ onEdit }) => {
  const { passwords, deletePassword, searchQuery, selectedCategory } = usePasswordStore()
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  const categoryColors = {
    personal: 'bg-blue-500',
    work: 'bg-purple-500',
    social: 'bg-green-500',
    finance: 'bg-yellow-500',
    other: 'bg-gray-500'
  }
  
  const filteredPasswords = useMemo(() => {
    return passwords.filter(p => {
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.url && p.url.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [passwords, searchQuery, selectedCategory])
  
  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }
  
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  const getStrengthColor = (strength: number) => {
    if (strength < 30) return 'bg-vault-danger'
    if (strength < 60) return 'bg-vault-warning'
    return 'bg-vault-success'
  }
  
  const handleDelete = (id: string) => {
    if (confirm('이 비밀번호를 삭제하시겠습니까?')) {
      deletePassword(id)
    }
  }
  
  if (filteredPasswords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Search className="w-16 h-16 text-vault-muted mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-vault-text mb-2">비밀번호가 없습니다</h3>
        <p className="text-vault-muted text-center">
          {searchQuery ? '검색 결과가 없습니다' : '+ 버튼을 눌러 첫 번째 비밀번호를 추가하세요'}
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-3">
      {filteredPasswords.map((entry) => (
        <div key={entry.id} className="card hover:bg-vault-card/80 transition-all duration-200 animate-slide-up">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${categoryColors[entry.category]}`} />
                <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
              </div>
              <p className="text-sm text-vault-muted">{entry.username}</p>
              {entry.url && (
                <a 
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-vault-accent hover:underline mt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  {new URL(entry.url).hostname}
                </a>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(entry)}
                className="p-2 text-vault-muted hover:text-vault-accent transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="p-2 text-vault-muted hover:text-vault-danger transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-vault-dark/50 rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-sm font-mono text-vault-text">
                  {visiblePasswords.has(entry.id) ? entry.password : '••••••••'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => togglePasswordVisibility(entry.id)}
                    className="p-1 text-vault-muted hover:text-vault-accent transition-colors"
                  >
                    {visiblePasswords.has(entry.id) ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(entry.password, entry.id)}
                    className="p-1 text-vault-muted hover:text-vault-accent transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-vault-muted" />
              <div className="flex-1 h-2 bg-vault-dark/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStrengthColor(entry.strength)} transition-all duration-300`}
                  style={{ width: `${entry.strength}%` }}
                />
              </div>
              <span className="text-xs text-vault-muted">{entry.strength}%</span>
            </div>
            
            {copiedId === entry.id && (
              <div className="text-xs text-vault-success text-center animate-fade-in">
                ✓ 복사되었습니다
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}