export interface Criteria {
  id: string
  label: string
  regex?: RegExp
  check?: (password: string) => boolean
  passed: boolean
  weight: number
}

export const getCriteria = (password: string): Criteria[] => {
  return [
    {
      id: 'length',
      label: '최소 8자 이상',
      check: (pw) => pw.length >= 8,
      passed: password.length >= 8,
      weight: 20
    },
    {
      id: 'uppercase',
      label: '대문자 포함',
      regex: /[A-Z]/,
      passed: /[A-Z]/.test(password),
      weight: 15
    },
    {
      id: 'lowercase',
      label: '소문자 포함',
      regex: /[a-z]/,
      passed: /[a-z]/.test(password),
      weight: 15
    },
    {
      id: 'number',
      label: '숫자 포함',
      regex: /[0-9]/,
      passed: /[0-9]/.test(password),
      weight: 15
    },
    {
      id: 'special',
      label: '특수문자 포함',
      regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      passed: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      weight: 20
    },
    {
      id: 'length12',
      label: '12자 이상 (보너스)',
      check: (pw) => pw.length >= 12,
      passed: password.length >= 12,
      weight: 15
    }
  ]
}

export const calculateStrength = (password: string): number => {
  if (!password) return 0
  
  const criteria = getCriteria(password)
  const score = criteria.reduce((acc, criterion) => {
    return acc + (criterion.passed ? criterion.weight : 0)
  }, 0)
  
  return Math.min(score, 100)
}

export const getStrengthLabel = (score: number): string => {
  if (score === 0) return '입력 대기'
  if (score < 30) return '매우 약함'
  if (score < 50) return '약함'
  if (score < 70) return '보통'
  if (score < 90) return '강함'
  return '매우 강함'
}

export const getStrengthColor = (score: number): string => {
  if (score === 0) return 'bg-gray-500'
  if (score < 30) return 'bg-red-500'
  if (score < 50) return 'bg-orange-500'
  if (score < 70) return 'bg-yellow-500'
  if (score < 90) return 'bg-green-500'
  return 'bg-emerald-600'
}

export const getTextColor = (score: number): string => {
  if (score === 0) return 'text-gray-400'
  if (score < 30) return 'text-red-400'
  if (score < 50) return 'text-orange-400'
  if (score < 70) return 'text-yellow-400'
  if (score < 90) return 'text-green-400'
  return 'text-emerald-400'
}

export const estimateCrackTime = (password: string): string => {
  const strength = calculateStrength(password)
  
  if (strength === 0) return '-'
  if (strength < 30) return '즉시'
  if (strength < 50) return '몇 분'
  if (strength < 70) return '몇 시간'
  if (strength < 85) return '몇 일'
  if (strength < 95) return '몇 개월'
  return '수 년'
}