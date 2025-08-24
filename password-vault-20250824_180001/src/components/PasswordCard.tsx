import React from 'react'
import { Eye, EyeOff, Copy, ExternalLink, Trash2, Edit2, Shield } from 'lucide-react'
import { PasswordEntry, usePasswordStore } from '../store/passwordStore'

interface PasswordCardProps {
  password: PasswordEntry
  onEdit: (password: PasswordEntry) => void
}

export const PasswordCard: React.FC<PasswordCardProps> = ({ password, onEdit }) => {
  const { showPasswordId, togglePasswordVisibility, deletePassword } = usePasswordStore()
  const isVisible = showPasswordId === password.id
  
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show toast or feedback
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-up z-50'
      toast.textContent = `${type} copied!`
      document.body.appendChild(toast)
      setTimeout(() => toast.remove(), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'bg-green-500'
    if (strength >= 60) return 'bg-yellow-500'
    if (strength >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }
  
  const getCategoryColor = (category: string) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-800',
      work: 'bg-purple-100 text-purple-800',
      finance: 'bg-green-100 text-green-800',
      social: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || colors.other
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {password.title}
          </h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(password.category)}`}>
            {password.category}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(password)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => deletePassword(password.id)}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Username:</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">{password.username}</span>
            <button
              onClick={() => copyToClipboard(password.username, 'Username')}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copy username"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Password:</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">
              {isVisible ? password.password : '••••••••'}
            </span>
            <button
              onClick={() => togglePasswordVisibility(password.id)}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title={isVisible ? 'Hide password' : 'Show password'}
            >
              {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={() => copyToClipboard(password.password, 'Password')}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copy password"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
        
        {password.url && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">URL:</span>
            <a
              href={password.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Visit site
              <ExternalLink size={14} />
            </a>
          </div>
        )}
        
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-gray-500" />
              <span className="text-xs text-gray-500">Strength</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${getStrengthColor(password.strength)}`}
                  style={{ width: `${password.strength}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{password.strength}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}