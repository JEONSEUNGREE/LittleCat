export const getSignalColor = (strength: number): string => {
  // strength is in dBm (-100 to 0)
  if (strength >= -50) return '#10b981' // Excellent (green)
  if (strength >= -60) return '#84cc16' // Good (lime)
  if (strength >= -70) return '#facc15' // Fair (yellow)
  if (strength >= -80) return '#fb923c' // Weak (orange)
  return '#ef4444' // Poor (red)
}

export const getSignalLevel = (strength: number): string => {
  if (strength >= -50) return '최고'
  if (strength >= -60) return '양호'
  if (strength >= -70) return '보통'
  if (strength >= -80) return '약함'
  return '매우 약함'
}

export const getSignalPercentage = (strength: number): number => {
  // Convert dBm to percentage (0-100)
  // -100 dBm = 0%, 0 dBm = 100%
  return Math.max(0, Math.min(100, (strength + 100) * 1))
}

export const calculateDistance = (signalStrength: number, frequency: number = 2437): number => {
  // Estimate distance based on RSSI using free space path loss formula
  // Distance = 10^((Measured Power - RSSI) / (10 * n))
  // n = path loss exponent (typically 2 for free space)
  const measuredPower = -40 // Measured power at 1 meter
  const n = 2.5 // Path loss exponent for indoor environment
  const distance = Math.pow(10, (measuredPower - signalStrength) / (10 * n))
  return Math.round(distance * 10) / 10 // Round to 1 decimal
}

export const interpolateSignal = (
  x: number, 
  y: number, 
  points: Array<{x: number, y: number, signalStrength: number}>
): number => {
  if (points.length === 0) return -100
  
  // Inverse distance weighted interpolation
  let weightedSum = 0
  let totalWeight = 0
  
  for (const point of points) {
    const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2))
    if (distance === 0) return point.signalStrength
    
    const weight = 1 / Math.pow(distance, 2)
    weightedSum += point.signalStrength * weight
    totalWeight += weight
  }
  
  return totalWeight > 0 ? weightedSum / totalWeight : -100
}

export const generateHeatmapData = (
  gridSize: number,
  points: Array<{x: number, y: number, signalStrength: number}>
): number[][] => {
  const heatmap: number[][] = []
  
  for (let y = 0; y < gridSize; y++) {
    const row: number[] = []
    for (let x = 0; x < gridSize; x++) {
      row.push(interpolateSignal(x, y, points))
    }
    heatmap.push(row)
  }
  
  return heatmap
}