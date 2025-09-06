import { create } from 'zustand'

export interface PasswordEntry {
  id: string
  title: string
  username: string
  password: string
  url?: string
  notes?: string
  category: 'personal' | 'work' | 'social' | 'finance' | 'other'
  createdAt: Date
  updatedAt: Date
  strength: number
}

interface PasswordStore {
  passwords: PasswordEntry[]
  searchQuery: string
  selectedCategory: string
  isLocked: boolean
  masterPasswordHash: string | null
  
  addPassword: (entry: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  updatePassword: (id: string, entry: Partial<PasswordEntry>) => void
  deletePassword: (id: string) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setLocked: (locked: boolean) => void
  setMasterPassword: (hash: string) => void
  checkMasterPassword: (hash: string) => boolean
  generatePassword: (length: number, options: PasswordOptions) => string
  calculateStrength: (password: string) => number
}

export interface PasswordOptions {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

const calculatePasswordStrength = (password: string): number => {
  let strength = 0
  
  if (password.length >= 8) strength += 20
  if (password.length >= 12) strength += 20
  if (password.length >= 16) strength += 10
  
  if (/[a-z]/.test(password)) strength += 10
  if (/[A-Z]/.test(password)) strength += 10
  if (/[0-9]/.test(password)) strength += 10
  if (/[^a-zA-Z0-9]/.test(password)) strength += 20
  
  const uniqueChars = new Set(password).size
  if (uniqueChars >= password.length * 0.6) strength += 10
  
  return Math.min(strength, 100)
}

const generateSecurePassword = (length: number, options: PasswordOptions): string => {
  let charset = ''
  if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
  if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (options.numbers) charset += '0123456789'
  if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  if (!charset) charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  
  let password = ''
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length]
  }
  
  return password
}

export const usePasswordStore = create<PasswordStore>((set, get) => ({
      passwords: [],
      searchQuery: '',
      selectedCategory: 'all',
      isLocked: true,
      masterPasswordHash: null,
      
      addPassword: (entry) => {
        const newEntry: PasswordEntry = {
          ...entry,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          strength: calculatePasswordStrength(entry.password)
        }
        set((state) => ({
          passwords: [...state.passwords, newEntry]
        }))
      },
      
      updatePassword: (id, entry) => {
        set((state) => ({
          passwords: state.passwords.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...entry,
                  updatedAt: new Date(),
                  strength: entry.password ? calculatePasswordStrength(entry.password) : p.strength
                }
              : p
          )
        }))
      },
      
      deletePassword: (id) => {
        set((state) => ({
          passwords: state.passwords.filter((p) => p.id !== id)
        }))
      },
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      setLocked: (locked) => set({ isLocked: locked }),
      
      setMasterPassword: (hash) => set({ masterPasswordHash: hash }),
      
      checkMasterPassword: (hash) => {
        const { masterPasswordHash } = get()
        return masterPasswordHash === hash
      },
      
      generatePassword: generateSecurePassword,
      
      calculateStrength: calculatePasswordStrength
    }))