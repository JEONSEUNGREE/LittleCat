import { useEffect, useRef } from 'react'
import { TrendingUp, Grid3x3 } from 'lucide-react'
import { useFormulaStore } from '../store/useFormulaStore'

export const GraphVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { selectedFormula, parameters } = useFormulaStore()
  
  useEffect(() => {
    if (!canvasRef.current || !selectedFormula) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)
    
    // Draw grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5
    const gridSize = 20
    for (let x = 0; x <= rect.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, rect.height)
      ctx.stroke()
    }
    for (let y = 0; y <= rect.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }
    
    // Draw axes
    ctx.strokeStyle = '#6b7280'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, rect.height / 2)
    ctx.lineTo(rect.width, rect.height / 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(rect.width / 2, 0)
    ctx.lineTo(rect.width / 2, rect.height)
    ctx.stroke()
    
    // Draw function
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    
    const xScale = rect.width / 20
    const yScale = rect.height / 20
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    let isFirstPoint = true
    
    for (let px = 0; px < rect.width; px++) {
      const x = (px - centerX) / xScale
      let y = 0
      
      switch (selectedFormula.graphType) {
        case 'linear': {
          const a = parameters['a'] ?? 1
          const b = parameters['b'] ?? 0
          y = a * x + b
          break
        }
        case 'quadratic': {
          const a = parameters['a'] ?? 1
          const b = parameters['b'] ?? 0
          const c = parameters['c'] ?? 0
          y = a * x * x + b * x + c
          break
        }
        case 'trigonometric': {
          const A = parameters['A'] ?? 1
          const B = parameters['B'] ?? 1
          const C = parameters['C'] ?? 0
          const D = parameters['D'] ?? 0
          if (selectedFormula.id === 'sine') {
            y = A * Math.sin(B * x + C) + D
          } else if (selectedFormula.id === 'harmonic') {
            const omega = parameters['omega'] ?? 2
            const phi = parameters['phi'] ?? 0
            y = A * Math.cos(omega * x + phi)
          }
          break
        }
        case 'exponential': {
          if (selectedFormula.id === 'exponential') {
            const a = parameters['a'] ?? 1
            const b = parameters['b'] ?? 2
            y = a * Math.pow(b, x)
          } else if (selectedFormula.id === 'decay') {
            const N0 = parameters['N0'] ?? 100
            const lambda = parameters['lambda'] ?? 0.1
            y = (N0 / 10) * Math.exp(-lambda * x * 10)
          }
          break
        }
      }
      
      const py = centerY - y * yScale
      
      if (py >= 0 && py <= rect.height) {
        if (isFirstPoint) {
          ctx.moveTo(px, py)
          isFirstPoint = false
        } else {
          ctx.lineTo(px, py)
        }
      } else if (!isFirstPoint) {
        ctx.stroke()
        ctx.beginPath()
        isFirstPoint = true
      }
    }
    ctx.stroke()
    
    // Draw labels
    ctx.fillStyle = '#4b5563'
    ctx.font = '12px system-ui'
    ctx.fillText('0', centerX + 5, centerY - 5)
    ctx.fillText('x', rect.width - 15, centerY - 5)
    ctx.fillText('y', centerX + 5, 15)
    
  }, [selectedFormula, parameters])
  
  if (!selectedFormula) {
    return (
      <div className="glass-card p-4 md:p-6 h-full flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse-slow">
          <Grid3x3 className="w-16 h-16 mx-auto text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">
            왼쪽에서 공식을 선택하여 시각화를 시작하세요
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="glass-card p-4 md:p-6 space-y-4 h-full animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          그래프 시각화
        </h2>
        <div className="formula-text text-lg">
          {selectedFormula.expression}
        </div>
      </div>
      
      <div className="relative w-full aspect-square md:aspect-video rounded-lg overflow-hidden bg-white dark:bg-gray-900 graph-grid">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <span className="text-gray-600 dark:text-gray-400">종류:</span>
          <span className="ml-1 font-medium">{selectedFormula.name}</span>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <span className="text-gray-600 dark:text-gray-400">타입:</span>
          <span className="ml-1 font-medium capitalize">{selectedFormula.graphType}</span>
        </div>
      </div>
    </div>
  )
}