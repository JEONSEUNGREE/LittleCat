import React, { useState, useEffect } from 'react'
import { X, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { PasswordEntry, usePasswordStore } from '../store/passwordStore'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  editingPassword?: PasswordEntry | null
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, editingPassword }) => {
  const { addPassword, updatePassword, generatePassword, calculateStrength } = usePasswordStore()
  
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
    category: 'personal' as PasswordEntry['category']
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)
  const [generateOptions, setGenerateOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  })
  
  useEffect(() => {
    if (editingPassword) {
      setFormData({
        title: editingPassword.title,
        username: editingPassword.username,
        password: editingPassword.password,
        url: editingPassword.url || '',
        notes: editingPassword.notes || '',
        category: editingPassword.category
      })
      setStrength(editingPassword.strength)
    } else {
      setFormData({
        title: '',
        username: '',
        password: '',
        url: '',
        notes: '',
        category: 'personal'
      })
      setStrength(0)
    }
  }, [editingPassword])
  
  useEffect(() => {
    if (formData.password) {
      setStrength(calculateStrength(formData.password))
    }
  }, [formData.password, calculateStrength])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.username || !formData.password) {
      alert('Please fill in all required fields')
      return
    }
    
    if (editingPassword) {
      updatePassword(editingPassword.id, formData)
    } else {
      addPassword(formData)
    }
    
    onClose()
  }
  
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(generateOptions.length, generateOptions)
    setFormData({ ...formData, password: newPassword })
  }
  
  const getStrengthColor = () => {
    if (strength >= 80) return 'bg-green-500'
    if (strength >= 60) return 'bg-yellow-500'
    if (strength >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }
  
  const getStrengthText = () => {
    if (strength >= 80) return 'Very Strong'
    if (strength >= 60) return 'Strong'
    if (strength >= 40) return 'Medium'
    if (strength >= 20) return 'Weak'
    return 'Very Weak'
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {editingPassword ? 'Edit Password' : 'Add New Password'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Gmail Account"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Username *</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., john@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
              <div className="absolute right-1 top-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Generate password"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
            
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Strength: {getStrengthText()}</span>
                  <span className="text-xs text-gray-600">{strength}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${getStrengthColor()}`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
            <div className="text-sm font-medium mb-2">Password Generator</div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Length: {generateOptions.length}</label>
              <input
                type="range"
                min="8"
                max="32"
                value={generateOptions.length}
                onChange={(e) => setGenerateOptions({ ...generateOptions, length: parseInt(e.target.value) })}
                className="w-32"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={generateOptions.uppercase}
                  onChange={(e) => setGenerateOptions({ ...generateOptions, uppercase: e.target.checked })}
                  className="mr-2"
                />
                Uppercase (A-Z)
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={generateOptions.lowercase}
                  onChange={(e) => setGenerateOptions({ ...generateOptions, lowercase: e.target.checked })}
                  className="mr-2"
                />
                Lowercase (a-z)
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={generateOptions.numbers}
                  onChange={(e) => setGenerateOptions({ ...generateOptions, numbers: e.target.checked })}
                  className="mr-2"
                />
                Numbers (0-9)
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={generateOptions.symbols}
                  onChange={(e) => setGenerateOptions({ ...generateOptions, symbols: e.target.checked })}
                  className="mr-2"
                />
                Symbols (!@#$)
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as PasswordEntry['category'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="finance">Finance</option>
              <option value="social">Social</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional notes..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingPassword ? 'Update' : 'Add'} Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}