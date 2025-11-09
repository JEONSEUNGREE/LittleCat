import { useEffect, useRef } from 'react'
import { useTimerStore } from '../store/timerStore'

export const FlowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { flowIntensity, status } = useTimerStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX * (1 + flowIntensity / 100)
        this.y += this.speedY * (1 + flowIntensity / 100)

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity * (0.5 + flowIntensity / 200)})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationFrameId: number

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const intensity = flowIntensity / 100

      if (status === 'running') {
        gradient.addColorStop(0, `rgba(14, 165, 233, ${0.1 + intensity * 0.2})`)
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.05 + intensity * 0.15})`)
        gradient.addColorStop(1, `rgba(37, 99, 235, ${0.1 + intensity * 0.2})`)
      } else {
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.05)')
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)')
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [flowIntensity, status])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 to-slate-800"
    />
  )
}
