import React, { useEffect, useRef } from 'react'
import { Activity } from 'lucide-react'
import useColorVoiceStore from '../store/useColorVoiceStore'

const Visualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { mode, currentColor, currentSound, isPlaying } = useColorVoiceStore()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    const animate = () => {
      time += 0.01
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // Clear canvas
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, width, height)

      if (mode === 'colorToSound' && currentColor) {
        // Draw color visualization
        const centerX = width / 2
        const centerY = height / 2
        
        // Animated circles
        for (let i = 0; i < 5; i++) {
          const radius = 30 + i * 20 + Math.sin(time + i) * 10
          const alpha = isPlaying ? 0.3 - i * 0.05 : 0.1
          
          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
          ctx.strokeStyle = currentColor.hex + Math.round(alpha * 255).toString(16).padStart(2, '0')
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Central color circle
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50)
        gradient.addColorStop(0, currentColor.hex)
        gradient.addColorStop(1, currentColor.hex + '40')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, 50 + Math.sin(time * 2) * 5, 0, Math.PI * 2)
        ctx.fill()

        // Frequency wave
        if (isPlaying) {
          ctx.strokeStyle = currentColor.hex
          ctx.lineWidth = 3
          ctx.beginPath()
          
          for (let x = 0; x < width; x += 2) {
            const y = centerY + Math.sin((x / width) * Math.PI * 4 + time * currentColor.frequency / 100) * 30
            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
        }

        // Display frequency info
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 16px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`${currentColor.frequency} Hz`, centerX, height - 40)
        ctx.fillText(`${currentColor.note}${currentColor.octave}`, centerX, height - 20)
      }

      if (mode === 'soundToColor' && currentSound) {
        // Draw sound visualization
        const centerX = width / 2
        const centerY = height / 2

        // Waveform visualization
        ctx.strokeStyle = currentSound.color
        ctx.lineWidth = 3
        ctx.beginPath()

        const waveHeight = isPlaying ? 60 : 30
        for (let x = 0; x < width; x += 2) {
          let y = centerY
          
          switch (currentSound.waveform) {
            case 'sine':
              y += Math.sin((x / width) * Math.PI * 4 + time * 2) * waveHeight
              break
            case 'square':
              y += (Math.sin((x / width) * Math.PI * 4 + time * 2) > 0 ? 1 : -1) * waveHeight
              break
            case 'triangle':
              const t = ((x / width) * 4 + time * 2 / Math.PI) % 2
              y += (t < 1 ? t : 2 - t) * waveHeight * 2 - waveHeight
              break
            case 'sawtooth':
              y += (((x / width) * 4 + time * 2 / Math.PI) % 1) * waveHeight * 2 - waveHeight
              break
          }
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()

        // Color gradient background
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(width, height) / 2)
        gradient.addColorStop(0, currentSound.color + '40')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Display sound info
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 16px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`${currentSound.frequency.toFixed(0)} Hz`, centerX, height - 40)
        ctx.fillText(currentSound.note, centerX, height - 20)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mode, currentColor, currentSound, isPlaying])

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyan-400" />
          시각화
        </h2>
        <div className="text-sm text-gray-400">
          {mode === 'colorToSound' ? '색상 → 소리' : '소리 → 색상'}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-64 md:h-80 rounded-lg bg-gray-800"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </div>
  )
}

export default Visualizer