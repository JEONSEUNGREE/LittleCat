import React from 'react'
import { Search, Filter, Plus, Shield } from 'lucide-react'
import { usePasswordStore } from '../store/passwordStore'

interface SearchBarProps {
  onAddNew: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onAddNew }) => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, passwords } = usePasswordStore()
  
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'personal', label: 'Personal' },
    { value: 'work', label: 'Work' },
    { value: 'finance', label: 'Finance' },
    { value: 'social', label: 'Social' },
    { value: 'other', label: 'Other' }
  ]
  
  const getCategoryCount = (category: string) => {
    if (category === 'all') return passwords.length
    return passwords.filter(p => p.category === category).length
  }
  
  const getAverageStrength = () => {
    if (passwords.length === 0) return 0
    const total = passwords.reduce((sum, p) => sum + p.strength, 0)
    return Math.round(total / passwords.length)
  }
  
  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-green-600'
    if (strength >= 60) return 'text-yellow-600'
    if (strength >= 40) return 'text-orange-600'
    return 'text-red-600'
  }
  
  return (
    <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Password Vault</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {passwords.length} passwords stored • 
              <span className={`ml-1 font-medium ${getStrengthColor(getAverageStrength())}`}>
                {getAverageStrength()}% avg strength
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Password</span>
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search passwords..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white dark:bg-gray-800"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label} ({getCategoryCount(cat.value)})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600">{passwords.length}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Passwords</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600">
            {passwords.filter(p => p.strength >= 80).length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Strong Passwords</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-yellow-600">
            {passwords.filter(p => p.strength < 60).length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Weak Passwords</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
          <div className="text-2xl font-bold text-purple-600">{getAverageStrength()}%</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Avg Strength</div>
        </div>
      </div>
    </div>
  )
}