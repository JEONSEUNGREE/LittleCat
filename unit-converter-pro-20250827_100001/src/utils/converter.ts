import { units } from './units'

export function convertValue(
  value: string,
  fromUnit: string,
  toUnit: string,
  category: string
): string {
  if (!value || parseFloat(value) === 0) return '0'

  const numValue = parseFloat(value)
  if (isNaN(numValue)) return '0'

  // Special handling for temperature
  if (category === 'temperature') {
    return convertTemperature(numValue, fromUnit, toUnit)
  }

  // Get conversion factors
  const categoryUnits = units[category]
  const from = categoryUnits.find(u => u.id === fromUnit)
  const to = categoryUnits.find(u => u.id === toUnit)

  if (!from || !to) return '0'

  // Convert to base unit, then to target unit
  const baseValue = numValue * from.toBase
  const result = baseValue / to.toBase

  // Format the result based on magnitude
  if (result === 0) return '0'
  if (result >= 1000000) return result.toExponential(4)
  if (result >= 0.01) return parseFloat(result.toFixed(6)).toString()
  if (result >= 0.000001) return result.toExponential(4)
  return result.toExponential(4)
}

function convertTemperature(value: number, from: string, to: string): string {
  let celsius: number

  // Convert to Celsius first
  switch (from) {
    case 'celsius':
      celsius = value
      break
    case 'fahrenheit':
      celsius = (value - 32) * 5/9
      break
    case 'kelvin':
      celsius = value - 273.15
      break
    default:
      return '0'
  }

  // Convert from Celsius to target
  let result: number
  switch (to) {
    case 'celsius':
      result = celsius
      break
    case 'fahrenheit':
      result = celsius * 9/5 + 32
      break
    case 'kelvin':
      result = celsius + 273.15
      break
    default:
      return '0'
  }

  return parseFloat(result.toFixed(2)).toString()
}