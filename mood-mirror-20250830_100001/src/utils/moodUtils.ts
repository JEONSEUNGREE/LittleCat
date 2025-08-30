export const MOOD_TYPES = [
  { emotion: '행복', color: '#FFD700', gradient: 'from-yellow-300 to-orange-400' },
  { emotion: '평온', color: '#87CEEB', gradient: 'from-sky-300 to-blue-400' },
  { emotion: '슬픔', color: '#4169E1', gradient: 'from-blue-400 to-indigo-500' },
  { emotion: '신남', color: '#FF6B6B', gradient: 'from-red-400 to-pink-500' },
  { emotion: '불안', color: '#9370DB', gradient: 'from-purple-400 to-violet-500' },
  { emotion: '평화', color: '#98D8C8', gradient: 'from-teal-300 to-cyan-400' },
  { emotion: '분노', color: '#DC143C', gradient: 'from-red-600 to-rose-700' },
  { emotion: '사랑', color: '#FFB6C1', gradient: 'from-pink-300 to-rose-400' }
]

export const generateMoodId = (): string => {
  return `mood_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const calculateMoodSimilarity = (mood1: string, mood2: string): number => {
  if (mood1 === mood2) return 100
  
  const similarityMap: Record<string, string[]> = {
    '행복': ['신남', '사랑', '평화'],
    '평온': ['평화', '행복'],
    '슬픔': ['불안'],
    '신남': ['행복', '사랑'],
    '불안': ['슬픔', '분노'],
    '평화': ['평온', '행복'],
    '분노': ['불안'],
    '사랑': ['행복', '신남', '평화']
  }
  
  const similar = similarityMap[mood1] || []
  if (similar.includes(mood2)) return 70
  return 30
}

export const getMoodGradient = (emotion: string): string => {
  const mood = MOOD_TYPES.find(m => m.emotion === emotion)
  return mood?.gradient || 'from-gray-300 to-gray-400'
}

export const getMoodColor = (emotion: string): string => {
  const mood = MOOD_TYPES.find(m => m.emotion === emotion)
  return mood?.color || '#808080'
}

export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return '방금 전'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`
  return `${Math.floor(seconds / 604800)}주 전`
}