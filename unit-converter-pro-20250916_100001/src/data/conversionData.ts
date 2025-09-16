export interface Unit {
  name: string
  symbol: string
  factor: number // Factor to convert to base unit
}

export interface Category {
  name: string
  icon: string
  units: Unit[]
}

export const conversionCategories: Record<string, Category> = {
  length: {
    name: 'Length',
    icon: 'Ruler',
    units: [
      { name: 'meter', symbol: 'm', factor: 1 },
      { name: 'kilometer', symbol: 'km', factor: 1000 },
      { name: 'centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'mile', symbol: 'mi', factor: 1609.34 },
      { name: 'yard', symbol: 'yd', factor: 0.9144 },
      { name: 'foot', symbol: 'ft', factor: 0.3048 },
      { name: 'inch', symbol: 'in', factor: 0.0254 },
    ]
  },
  weight: {
    name: 'Weight',
    icon: 'Scale',
    units: [
      { name: 'kilogram', symbol: 'kg', factor: 1 },
      { name: 'gram', symbol: 'g', factor: 0.001 },
      { name: 'milligram', symbol: 'mg', factor: 0.000001 },
      { name: 'pound', symbol: 'lb', factor: 0.453592 },
      { name: 'ounce', symbol: 'oz', factor: 0.0283495 },
      { name: 'ton', symbol: 't', factor: 1000 },
      { name: 'stone', symbol: 'st', factor: 6.35029 },
    ]
  },
  temperature: {
    name: 'Temperature',
    icon: 'Thermometer',
    units: [
      { name: 'celsius', symbol: '°C', factor: 1 },
      { name: 'fahrenheit', symbol: '°F', factor: 1 },
      { name: 'kelvin', symbol: 'K', factor: 1 },
    ]
  },
  volume: {
    name: 'Volume',
    icon: 'Beaker',
    units: [
      { name: 'liter', symbol: 'L', factor: 1 },
      { name: 'milliliter', symbol: 'mL', factor: 0.001 },
      { name: 'cubic meter', symbol: 'm³', factor: 1000 },
      { name: 'gallon', symbol: 'gal', factor: 3.78541 },
      { name: 'quart', symbol: 'qt', factor: 0.946353 },
      { name: 'pint', symbol: 'pt', factor: 0.473176 },
      { name: 'cup', symbol: 'cup', factor: 0.236588 },
      { name: 'fluid ounce', symbol: 'fl oz', factor: 0.0295735 },
    ]
  },
  area: {
    name: 'Area',
    icon: 'Square',
    units: [
      { name: 'square meter', symbol: 'm²', factor: 1 },
      { name: 'square kilometer', symbol: 'km²', factor: 1000000 },
      { name: 'square centimeter', symbol: 'cm²', factor: 0.0001 },
      { name: 'square mile', symbol: 'mi²', factor: 2589988 },
      { name: 'square yard', symbol: 'yd²', factor: 0.836127 },
      { name: 'square foot', symbol: 'ft²', factor: 0.092903 },
      { name: 'acre', symbol: 'ac', factor: 4046.86 },
      { name: 'hectare', symbol: 'ha', factor: 10000 },
    ]
  },
  speed: {
    name: 'Speed',
    icon: 'Zap',
    units: [
      { name: 'meter per second', symbol: 'm/s', factor: 1 },
      { name: 'kilometer per hour', symbol: 'km/h', factor: 0.277778 },
      { name: 'mile per hour', symbol: 'mph', factor: 0.44704 },
      { name: 'foot per second', symbol: 'ft/s', factor: 0.3048 },
      { name: 'knot', symbol: 'kn', factor: 0.514444 },
    ]
  },
  time: {
    name: 'Time',
    icon: 'Clock',
    units: [
      { name: 'second', symbol: 's', factor: 1 },
      { name: 'minute', symbol: 'min', factor: 60 },
      { name: 'hour', symbol: 'hr', factor: 3600 },
      { name: 'day', symbol: 'd', factor: 86400 },
      { name: 'week', symbol: 'wk', factor: 604800 },
      { name: 'month', symbol: 'mo', factor: 2592000 },
      { name: 'year', symbol: 'yr', factor: 31536000 },
    ]
  },
  data: {
    name: 'Data',
    icon: 'HardDrive',
    units: [
      { name: 'byte', symbol: 'B', factor: 1 },
      { name: 'kilobyte', symbol: 'KB', factor: 1024 },
      { name: 'megabyte', symbol: 'MB', factor: 1048576 },
      { name: 'gigabyte', symbol: 'GB', factor: 1073741824 },
      { name: 'terabyte', symbol: 'TB', factor: 1099511627776 },
      { name: 'petabyte', symbol: 'PB', factor: 1125899906842624 },
    ]
  },
}

export const convertValue = (
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
  category: string
): number => {
  if (category === 'temperature') {
    // Special handling for temperature
    return convertTemperature(value, fromUnit.name, toUnit.name)
  }
  
  // Convert from source unit to base unit, then to target unit
  const baseValue = value * fromUnit.factor
  return baseValue / toUnit.factor
}

const convertTemperature = (value: number, from: string, to: string): number => {
  let celsius = value
  
  // Convert to celsius first
  if (from === 'fahrenheit') {
    celsius = (value - 32) * 5/9
  } else if (from === 'kelvin') {
    celsius = value - 273.15
  }
  
  // Convert from celsius to target
  if (to === 'fahrenheit') {
    return celsius * 9/5 + 32
  } else if (to === 'kelvin') {
    return celsius + 273.15
  }
  
  return celsius
}