import { useState, useMemo } from 'react'
import { usePasswordStore, PasswordEntry } from './store/passwordStore'
import { SearchBar } from './components/SearchBar'
import { PasswordCard } from './components/PasswordCard'
import { PasswordModal } from './components/PasswordModal'
import { Shield, Key, Lock } from 'lucide-react'

function App() {
  const { passwords, searchQuery, selectedCategory } = usePasswordStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPassword, setEditingPassword] = useState<PasswordEntry | null>(null)
  
  const filteredPasswords = useMemo(() => {
    let filtered = passwords
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.username.toLowerCase().includes(query) ||
        p.url?.toLowerCase().includes(query) ||
        p.notes?.toLowerCase().includes(query)
      )
    }
    
    // Sort by updated date (newest first)
    return filtered.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  }, [passwords, searchQuery, selectedCategory])
  
  const handleAddNew = () => {
    setEditingPassword(null)
    setIsModalOpen(true)
  }
  
  const handleEdit = (password: PasswordEntry) => {
    setEditingPassword(password)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPassword(null)
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <SearchBar onAddNew={handleAddNew} />
        
        {filteredPasswords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            {passwords.length === 0 ? (
              <>
                <div className="relative mb-6">
                  <Shield className="w-24 h-24 text-gray-300 dark:text-gray-700" />
                  <Lock className="w-10 h-10 text-gray-400 dark:text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No passwords yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                  Start securing your digital life by adding your first password. 
                  All data is stored locally in your browser.
                </p>
                <button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Key size={20} />
                  Add Your First Password
                </button>
              </>
            ) : (
              <>
                <div className="relative mb-6">
                  <Shield className="w-24 h-24 text-gray-300 dark:text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Try adjusting your search or filter criteria
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredPasswords.map(password => (
              <PasswordCard
                key={password.id}
                password={password}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
        
        <PasswordModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editingPassword={editingPassword}
        />
      </div>
    </div>
  )
}

export default App