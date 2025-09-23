export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

export function colorToFrequency(rgb: { r: number; g: number; b: number }): number {
  // Map RGB values to frequency range (200Hz - 2000Hz)
  const hue = rgbToHue(rgb)
  const brightness = (rgb.r + rgb.g + rgb.b) / 3
  
  // Base frequency from hue (200-1200Hz)
  const baseFreq = 200 + (hue / 360) * 1000
  
  // Modulate by brightness (0.5x - 1.5x)
  const brightnessModifier = 0.5 + (brightness / 255)
  
  return Math.round(baseFreq * brightnessModifier)
}

export function frequencyToColor(frequency: number): string {
  // Map frequency to color (200Hz - 2000Hz range)
  const normalizedFreq = Math.max(200, Math.min(2000, frequency))
  const hue = ((normalizedFreq - 200) / 1800) * 360
  
  // Calculate saturation based on frequency stability
  const saturation = 70 + (Math.sin(frequency / 100) * 30)
  
  // Lightness varies with octave
  const lightness = 40 + ((frequency % 500) / 500) * 20
  
  return hslToHex(hue, saturation, lightness)
}

export function rgbToHue(rgb: { r: number; g: number; b: number }): number {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  if (delta === 0) return 0

  let hue = 0
  if (max === r) {
    hue = ((g - b) / delta) % 6
  } else if (max === g) {
    hue = (b - r) / delta + 2
  } else {
    hue = (r - g) / delta + 4
  }

  hue = Math.round(hue * 60)
  if (hue < 0) hue += 360

  return hue
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  
  let r = 0, g = 0, b = 0

  if (h < 60) {
    r = c; g = x; b = 0
  } else if (h < 120) {
    r = x; g = c; b = 0
  } else if (h < 180) {
    r = 0; g = c; b = x
  } else if (h < 240) {
    r = 0; g = x; b = c
  } else if (h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return rgbToHex(r, g, b)
}

export function frequencyToNote(frequency: number): { note: string; octave: number } {
  const A4 = 440
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  
  const halfSteps = 12 * Math.log2(frequency / A4)
  const noteIndex = Math.round(halfSteps + 9) % 12
  const octave = Math.floor((halfSteps + 9) / 12) + 4
  
  return {
    note: noteNames[noteIndex >= 0 ? noteIndex : noteIndex + 12],
    octave: octave,
  }
}