import React, { useState } from 'react'
import { Plus, Search, Lock, Menu, X, Shield, Filter } from 'lucide-react'
import { usePasswordStore, PasswordEntry } from './store/usePasswordStore'
import { LockScreen } from './components/LockScreen'
import { PasswordList } from './components/PasswordList'
import { PasswordForm } from './components/PasswordForm'

function App() {
  const { isLocked, setLocked, searchQuery, setSearchQuery, passwords, selectedCategory, setSelectedCategory } = usePasswordStore()
  const [showForm, setShowForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<PasswordEntry | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  
  if (isLocked) {
    return <LockScreen />
  }
  
  const handleEdit = (entry: PasswordEntry) => {
    setEditingEntry(entry)
    setShowForm(true)
  }
  
  const handleCloseForm = () => {
    setShowForm(false)
    setEditingEntry(null)
  }
  
  const categories = [
    { value: 'all', label: '전체', count: passwords.length },
    { value: 'personal', label: '개인', count: passwords.filter(p => p.category === 'personal').length },
    { value: 'work', label: '업무', count: passwords.filter(p => p.category === 'work').length },
    { value: 'social', label: '소셜', count: passwords.filter(p => p.category === 'social').length },
    { value: 'finance', label: '금융', count: passwords.filter(p => p.category === 'finance').length },
    { value: 'other', label: '기타', count: passwords.filter(p => p.category === 'other').length }
  ]
  
  const totalPasswords = passwords.length
  const averageStrength = passwords.length > 0 
    ? Math.round(passwords.reduce((acc, p) => acc + p.strength, 0) / passwords.length)
    : 0
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-vault-dark to-black">
      {/* Header */}
      <header className="bg-vault-card/80 backdrop-blur-md border-b border-vault-muted/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-vault-muted hover:text-vault-accent transition-colors lg:hidden"
              >
                {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-vault-accent" />
                <h1 className="text-xl font-bold text-white">Password Vault</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2 text-vault-muted hover:text-vault-accent transition-colors lg:hidden"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLocked(true)}
                className="p-2 text-vault-muted hover:text-vault-accent transition-colors"
              >
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 space-y-6">
          {/* Stats */}
          <div className="card">
            <h3 className="text-sm font-semibold text-vault-muted mb-4">통계</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-vault-muted">총 비밀번호</span>
                  <span className="text-white font-semibold">{totalPasswords}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-vault-muted">평균 강도</span>
                  <span className="text-white font-semibold">{averageStrength}%</span>
                </div>
                <div className="h-2 bg-vault-dark/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      averageStrength < 30 ? 'bg-vault-danger' :
                      averageStrength < 60 ? 'bg-vault-warning' :
                      'bg-vault-success'
                    }`}
                    style={{ width: `${averageStrength}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="card">
            <h3 className="text-sm font-semibold text-vault-muted mb-4">카테고리</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-vault-accent/20 text-vault-accent'
                      : 'text-vault-text hover:bg-vault-dark/30'
                  }`}
                >
                  <span className="text-sm">{cat.label}</span>
                  <span className="text-xs bg-vault-dark/50 px-2 py-1 rounded-full">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
        
        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed inset-0 bg-black/60 z-50 lg:hidden" onClick={() => setShowMenu(false)}>
            <aside className="w-64 h-full bg-vault-card p-4 space-y-6 animate-slide-up" onClick={e => e.stopPropagation()}>
              {/* Stats */}
              <div>
                <h3 className="text-sm font-semibold text-vault-muted mb-4">통계</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-vault-muted">총 비밀번호</span>
                      <span className="text-white font-semibold">{totalPasswords}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-vault-muted">평균 강도</span>
                      <span className="text-white font-semibold">{averageStrength}%</span>
                    </div>
                    <div className="h-2 bg-vault-dark/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          averageStrength < 30 ? 'bg-vault-danger' :
                          averageStrength < 60 ? 'bg-vault-warning' :
                          'bg-vault-success'
                        }`}
                        style={{ width: `${averageStrength}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
        
        {/* Mobile Filter */}
        {showFilter && (
          <div className="fixed inset-0 bg-black/60 z-50 lg:hidden" onClick={() => setShowFilter(false)}>
            <div className="w-64 h-full bg-vault-card p-4 ml-auto animate-slide-up" onClick={e => e.stopPropagation()}>
              <h3 className="text-sm font-semibold text-vault-muted mb-4">카테고리</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value)
                      setShowFilter(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-vault-accent/20 text-vault-accent'
                        : 'text-vault-text hover:bg-vault-dark/30'
                    }`}
                  >
                    <span className="text-sm">{cat.label}</span>
                    <span className="text-xs bg-vault-dark/50 px-2 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Search Bar */}
          <div className="card">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vault-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="비밀번호 검색..."
                className="w-full pl-12 pr-4 py-3 bg-vault-dark/50 text-vault-text rounded-xl border border-vault-muted/30 focus:border-vault-accent focus:outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Password List */}
          <PasswordList onEdit={handleEdit} />
        </main>
      </div>
      
      {/* Floating Action Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-vault-accent text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center z-30"
      >
        <Plus className="w-6 h-6" />
      </button>
      
      {/* Password Form Modal */}
      {showForm && (
        <PasswordForm entry={editingEntry} onClose={handleCloseForm} />
      )}
    </div>
  )
}

export default App