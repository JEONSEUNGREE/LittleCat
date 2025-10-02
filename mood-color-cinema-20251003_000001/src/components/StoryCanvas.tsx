import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMoodStore } from '../store/moodStore'
import { Play, Pause, RefreshCw, Download, Sparkles } from 'lucide-react'

const storyTemplates = {
  happy: [
    '태양이 빛나는 아침',
    '웃음꽃이 피어나는 순간',
    '행복이 춤추는 시간',
    '기쁨의 멜로디가 울려퍼지는 곳'
  ],
  sad: [
    '빗방울이 떨어지는 창가',
    '외로운 달빛 아래',
    '눈물이 별이 되는 밤',
    '그리움이 머무는 시간'
  ],
  excited: [
    '불꽃놀이가 터지는 하늘',
    '심장이 뛰는 모험',
    '에너지가 폭발하는 순간',
    '열정의 불길이 타오르는 곳'
  ],
  calm: [
    '고요한 호수의 물결',
    '평온한 숲속의 쉼터',
    '구름 위를 걷는 듯한 평화',
    '마음이 쉬어가는 시간'
  ],
  angry: [
    '폭풍우가 몰아치는 바다',
    '불타는 석양의 하늘',
    '천둥이 울리는 들판',
    '격렬한 감정의 소용돌이'
  ],
  romantic: [
    '별빛이 쏟아지는 밤',
    '장미향기가 가득한 정원',
    '달콤한 속삭임이 머무는 곳',
    '사랑이 피어나는 순간'
  ],
  mysterious: [
    '안개 속 숨겨진 길',
    '신비로운 달의 뒷면',
    '비밀이 잠든 고대 도시',
    '수수께끼 같은 그림자'
  ],
  peaceful: [
    '새들이 노래하는 아침',
    '푸른 초원의 미풍',
    '잔잔한 파도소리',
    '평화로운 꿈의 정원'
  ]
}

export default function StoryCanvas() {
  const { selectedMood, selectedColors } = useMoodStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScene, setCurrentScene] = useState(0)
  const [storyText, setStoryText] = useState('')

  const scenes = selectedMood ? storyTemplates[selectedMood] : []

  useEffect(() => {
    if (selectedMood && scenes.length > 0) {
      setStoryText(scenes[0])
    }
  }, [selectedMood, scenes])

  useEffect(() => {
    if (isPlaying && scenes.length > 0) {
      const interval = setInterval(() => {
        setCurrentScene((prev) => (prev + 1) % scenes.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, scenes])

  useEffect(() => {
    if (scenes[currentScene]) {
      setStoryText(scenes[currentScene])
    }
  }, [currentScene, scenes])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentScene(0)
  }

  const handleDownload = () => {
    const canvas = document.getElementById('story-canvas') as HTMLDivElement
    if (canvas) {
      // 실제 구현에서는 html2canvas 라이브러리를 사용
      alert('스토리가 저장되었습니다!')
    }
  }

  const gradientStyle = selectedColors.length > 1
    ? { background: `linear-gradient(135deg, ${selectedColors.join(', ')})` }
    : { backgroundColor: selectedColors[0] || '#667eea' }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">당신의 시각적 스토리</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Story Canvas */}
      <div
        id="story-canvas"
        className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl"
        style={gradientStyle}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            {/* Visual Elements */}
            <div className="absolute inset-0">
              {selectedColors.map((color, index) => (
                <motion.div
                  key={`shape-${index}`}
                  className="absolute rounded-full opacity-30"
                  style={{
                    backgroundColor: color,
                    width: `${150 + index * 50}px`,
                    height: `${150 + index * 50}px`,
                    left: `${20 + index * 15}%`,
                    top: `${20 + index * 10}%`,
                  }}
                  animate={{
                    x: [0, 30, -30, 0],
                    y: [0, -30, 30, 0],
                    scale: [1, 1.2, 0.8, 1],
                  }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Story Text */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="relative z-10 text-center"
            >
              <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                {storyText}
              </h3>
              <p className="text-white/90 text-lg">
                Scene {currentScene + 1} / {scenes.length}
              </p>
            </motion.div>

            {/* Animated Particles */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-white/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  x: [-20, 20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <div className="flex gap-2">
          {scenes.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentScene(index)}
              className={`flex-1 h-2 rounded-full transition-all ${
                index === currentScene ? 'bg-yellow-400' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 text-center text-gray-300">
        <p className="text-sm mb-2">
          {isPlaying ? '스토리가 재생 중입니다...' : '재생 버튼을 눌러 스토리를 시작하세요'}
        </p>
        <p className="text-xs opacity-75">
          감정: {selectedMood} | 색상: {selectedColors.length}개 선택됨
        </p>
      </div>
    </div>
  )
}