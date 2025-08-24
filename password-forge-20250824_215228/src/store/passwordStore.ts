import { create } from 'zustand'

interface PasswordSettings {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
  customSymbols: string
}

interface PasswordHistory {
  id: string
  password: string
  strength: number
  entropy: number
  createdAt: Date
  timeToHack: string
}

interface PasswordStore {
  password: string
  settings: PasswordSettings
  history: PasswordHistory[]
  strength: number
  entropy: number
  timeToHack: string
  generatePassword: () => void
  updateSettings: (settings: Partial<PasswordSettings>) => void
  clearHistory: () => void
  removeFromHistory: (id: string) => void
}

const calculateEntropy = (password: string, charsetSize: number): number => {
  return password.length * Math.log2(charsetSize)
}

const calculateTimeToHack = (entropy: number): string => {
  const guessesPerSecond = 1e12 // 1 trillion guesses per second
  const seconds = Math.pow(2, entropy) / guessesPerSecond
  
  if (seconds < 1) return '즉시'
  if (seconds < 60) return `${Math.floor(seconds)}초`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간`
  if (seconds < 31536000) return `${Math.floor(seconds / 86400)}일`
  if (seconds < 3153600000) return `${Math.floor(seconds / 31536000)}년`
  return '수십억 년'
}

const calculateStrength = (password: string): number => {
  let score = 0
  const length = password.length

  // Length score
  if (length >= 8) score += 20
  if (length >= 12) score += 20
  if (length >= 16) score += 20

  // Character diversity
  if (/[a-z]/.test(password)) score += 10
  if (/[A-Z]/.test(password)) score += 10
  if (/[0-9]/.test(password)) score += 10
  if (/[^a-zA-Z0-9]/.test(password)) score += 10

  // Penalty for patterns
  if (/(.)\1{2,}/.test(password)) score -= 10 // Repeating characters
  if (/012|123|234|345|456|567|678|789|890/.test(password)) score -= 10 // Sequential numbers
  if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) score -= 10

  return Math.max(0, Math.min(100, score))
}

export const usePasswordStore = create<PasswordStore>((set, get) => ({
  password: '',
  settings: {
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    customSymbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  },
  history: [],
  strength: 0,
  entropy: 0,
  timeToHack: '',

  generatePassword: () => {
    const { settings } = get()
    let charset = ''
    let charsetSize = 0

    if (settings.includeLowercase) {
      charset += settings.excludeSimilar ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz'
      charsetSize += settings.excludeSimilar ? 23 : 26
    }
    if (settings.includeUppercase) {
      charset += settings.excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      charsetSize += settings.excludeSimilar ? 23 : 26
    }
    if (settings.includeNumbers) {
      charset += settings.excludeSimilar ? '23456789' : '0123456789'
      charsetSize += settings.excludeSimilar ? 8 : 10
    }
    if (settings.includeSymbols) {
      charset += settings.customSymbols
      charsetSize += settings.customSymbols.length
    }

    if (charset.length === 0) {
      charset = 'abcdefghijklmnopqrstuvwxyz'
      charsetSize = 26
    }

    let password = ''
    const array = new Uint32Array(settings.length)
    crypto.getRandomValues(array)

    for (let i = 0; i < settings.length; i++) {
      password += charset[array[i] % charset.length]
    }

    const entropy = calculateEntropy(password, charsetSize)
    const strength = calculateStrength(password)
    const timeToHack = calculateTimeToHack(entropy)

    const newHistory: PasswordHistory = {
      id: Date.now().toString(),
      password,
      strength,
      entropy,
      createdAt: new Date(),
      timeToHack
    }

    set({
      password,
      strength,
      entropy,
      timeToHack,
      history: [newHistory, ...get().history.slice(0, 9)]
    })
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }))
    get().generatePassword()
  },

  clearHistory: () => {
    set({ history: [] })
  },

  removeFromHistory: (id) => {
    set((state) => ({
      history: state.history.filter(item => item.id !== id)
    }))
  }
}))