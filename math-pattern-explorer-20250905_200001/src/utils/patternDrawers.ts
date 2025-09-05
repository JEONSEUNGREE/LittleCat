type ColorScheme = 'rainbow' | 'gradient' | 'monochrome'

const getColor = (index: number, scheme: ColorScheme, max: number = 100): string => {
  switch (scheme) {
    case 'rainbow':
      return `hsl(${(index * 360) / max}, 70%, 50%)`
    case 'gradient':
      return `hsl(${270 + (index * 60) / max}, 70%, ${50 + (index * 30) / max}%)`
    case 'monochrome':
      return `rgba(255, 255, 255, ${0.3 + (index * 0.7) / max})`
    default:
      return 'white'
  }
}

export const drawFibonacciSpiral = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  frame: number,
  complexity: number,
  colorScheme: ColorScheme
) => {
  const centerX = width / 2
  const centerY = height / 2
  const scale = Math.min(width, height) / 20
  
  // Generate Fibonacci numbers
  const fib = [0, 1]
  for (let i = 2; i < complexity + 10; i++) {
    fib[i] = fib[i - 1] + fib[i - 2]
  }
  
  ctx.lineWidth = 2
  
  // Draw rectangles and arcs
  let x = centerX
  let y = centerY
  let direction = 0
  
  for (let i = 1; i < Math.min(fib.length - 1, complexity + 5); i++) {
    const size = fib[i] * scale / 10
    ctx.strokeStyle = getColor(i + frame / 10, colorScheme, 20)
    
    // Draw rectangle
    ctx.strokeRect(x - size / 2, y - size / 2, size, size)
    
    // Draw arc (quarter circle)
    ctx.beginPath()
    const startAngle = (direction * Math.PI) / 2
    const endAngle = startAngle + Math.PI / 2
    ctx.arc(x, y, size, startAngle, endAngle)
    ctx.stroke()
    
    // Move to next position
    const nextSize = fib[i + 1] * scale / 10
    switch (direction % 4) {
      case 0: x += (size + nextSize) / 2; break
      case 1: y += (size + nextSize) / 2; break
      case 2: x -= (size + nextSize) / 2; break
      case 3: y -= (size + nextSize) / 2; break
    }
    direction++
  }
}

export const drawFractalTree = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number,
  complexity: number,
  colorScheme: ColorScheme
) => {
  const drawBranch = (x: number, y: number, length: number, angle: number, depth: number) => {
    if (depth === 0 || length < 2) return
    
    const endX = x + length * Math.cos(angle)
    const endY = y + length * Math.sin(angle)
    
    ctx.strokeStyle = getColor(depth + frame / 20, colorScheme, complexity)
    ctx.lineWidth = Math.max(1, depth / 2)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    
    const branchAngle = (Math.PI / 6) + Math.sin(frame / 50) * 0.1
    const lengthFactor = 0.7
    
    drawBranch(endX, endY, length * lengthFactor, angle - branchAngle, depth - 1)
    drawBranch(endX, endY, length * lengthFactor, angle + branchAngle, depth - 1)
    
    if (depth > complexity / 2) {
      drawBranch(endX, endY, length * lengthFactor * 0.8, angle, depth - 1)
    }
  }
  
  drawBranch(width / 2, height * 0.9, height / 4, -Math.PI / 2, complexity)
}

export const drawGoldenRatio = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number,
  complexity: number,
  colorScheme: ColorScheme
) => {
  const phi = 1.618033988749895
  const centerX = width / 2
  const centerY = height / 2
  const baseSize = Math.min(width, height) / 4
  
  ctx.lineWidth = 2
  
  for (let i = 0; i < complexity * 2; i++) {
    const size = baseSize * Math.pow(phi, -i / 2)
    const rotation = (frame / 100 + i * 0.1) % (Math.PI * 2)
    
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotation)
    
    ctx.strokeStyle = getColor(i + frame / 30, colorScheme, complexity * 2)
    ctx.strokeRect(-size / 2, -size / 2, size, size / phi)
    
    // Draw golden spiral arc
    ctx.beginPath()
    ctx.arc(size / 2, -size / 2, size, Math.PI, Math.PI * 1.5)
    ctx.stroke()
    
    ctx.restore()
  }
}

export const drawSpiral = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number,
  complexity: number,
  colorScheme: ColorScheme
) => {
  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.min(width, height) / 2 - 20
  
  ctx.lineWidth = 2
  
  for (let spiral = 0; spiral < complexity; spiral++) {
    ctx.beginPath()
    
    for (let i = 0; i < 1000; i++) {
      const angle = i * 0.1 + frame / 50 + spiral * (Math.PI * 2) / complexity
      const radius = (i / 1000) * maxRadius * (1 - spiral * 0.05)
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    
    ctx.strokeStyle = getColor(spiral + frame / 40, colorScheme, complexity)
    ctx.stroke()
  }
  
  // Draw dots at spiral points
  for (let i = 0; i < complexity * 3; i++) {
    const angle = (i / (complexity * 3)) * Math.PI * 2 * 3 + frame / 30
    const radius = (i / (complexity * 3)) * maxRadius
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    
    ctx.fillStyle = getColor(i, colorScheme, complexity * 3)
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

export const drawMandelbrot = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number,
  complexity: number,
  colorScheme: ColorScheme
) => {
  const imageData = ctx.createImageData(width, height)
  const data = imageData.data
  
  const maxIterations = complexity * 10
  const zoom = 2 + Math.sin(frame / 100) * 0.5
  const offsetX = -0.5 + Math.cos(frame / 200) * 0.1
  const offsetY = Math.sin(frame / 200) * 0.1
  
  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      const x0 = (px - width / 2) / (width / 4) / zoom + offsetX
      const y0 = (py - height / 2) / (height / 4) / zoom + offsetY
      
      let x = 0
      let y = 0
      let iteration = 0
      
      while (x * x + y * y <= 4 && iteration < maxIterations) {
        const xtemp = x * x - y * y + x0
        y = 2 * x * y + y0
        x = xtemp
        iteration++
      }
      
      const index = (py * width + px) * 4
      
      if (iteration === maxIterations) {
        data[index] = 0
        data[index + 1] = 0
        data[index + 2] = 0
      } else {
        const color = getColor(iteration, colorScheme, maxIterations)
        const rgb = color.match(/\d+/g)
        if (rgb) {
          data[index] = parseInt(rgb[0])
          data[index + 1] = parseInt(rgb[1]) 
          data[index + 2] = parseInt(rgb[2])
        }
      }
      data[index + 3] = 255
    }
  }
  
  ctx.putImageData(imageData, 0, 0)
}