export interface Unit {
  name: string
  symbol: string
  factor: number // Conversion factor to base unit
}

export interface Category {
  name: string
  icon: string
  baseUnit: string
  units: Record<string, Unit>
}

export const unitCategories: Record<string, Category> = {
  length: {
    name: 'Length',
    icon: '📏',
    baseUnit: 'meter',
    units: {
      meter: { name: 'Meter', symbol: 'm', factor: 1 },
      kilometer: { name: 'Kilometer', symbol: 'km', factor: 1000 },
      centimeter: { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      millimeter: { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      mile: { name: 'Mile', symbol: 'mi', factor: 1609.344 },
      yard: { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      foot: { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      inch: { name: 'Inch', symbol: 'in', factor: 0.0254 },
    }
  },
  weight: {
    name: 'Weight',
    icon: '⚖️',
    baseUnit: 'kilogram',
    units: {
      kilogram: { name: 'Kilogram', symbol: 'kg', factor: 1 },
      gram: { name: 'Gram', symbol: 'g', factor: 0.001 },
      milligram: { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      tonne: { name: 'Tonne', symbol: 't', factor: 1000 },
      pound: { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      ounce: { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
      stone: { name: 'Stone', symbol: 'st', factor: 6.35029 },
    }
  },
  temperature: {
    name: 'Temperature',
    icon: '🌡️',
    baseUnit: 'celsius',
    units: {
      celsius: { name: 'Celsius', symbol: '°C', factor: 1 },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      kelvin: { name: 'Kelvin', symbol: 'K', factor: 1 },
    }
  },
  volume: {
    name: 'Volume',
    icon: '🧊',
    baseUnit: 'liter',
    units: {
      liter: { name: 'Liter', symbol: 'L', factor: 1 },
      milliliter: { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      gallon: { name: 'Gallon (US)', symbol: 'gal', factor: 3.78541 },
      quart: { name: 'Quart', symbol: 'qt', factor: 0.946353 },
      pint: { name: 'Pint', symbol: 'pt', factor: 0.473176 },
      cup: { name: 'Cup', symbol: 'cup', factor: 0.236588 },
      fluid_ounce: { name: 'Fluid Ounce', symbol: 'fl oz', factor: 0.0295735 },
      tablespoon: { name: 'Tablespoon', symbol: 'tbsp', factor: 0.0147868 },
      teaspoon: { name: 'Teaspoon', symbol: 'tsp', factor: 0.00492892 },
    }
  },
  area: {
    name: 'Area',
    icon: '◻️',
    baseUnit: 'square_meter',
    units: {
      square_meter: { name: 'Square Meter', symbol: 'm²', factor: 1 },
      square_kilometer: { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      square_centimeter: { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      hectare: { name: 'Hectare', symbol: 'ha', factor: 10000 },
      acre: { name: 'Acre', symbol: 'ac', factor: 4046.86 },
      square_mile: { name: 'Square Mile', symbol: 'mi²', factor: 2589988 },
      square_yard: { name: 'Square Yard', symbol: 'yd²', factor: 0.836127 },
      square_foot: { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
      square_inch: { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
    }
  },
  speed: {
    name: 'Speed',
    icon: '💨',
    baseUnit: 'meter_per_second',
    units: {
      meter_per_second: { name: 'Meter/Second', symbol: 'm/s', factor: 1 },
      kilometer_per_hour: { name: 'Kilometer/Hour', symbol: 'km/h', factor: 0.277778 },
      mile_per_hour: { name: 'Mile/Hour', symbol: 'mph', factor: 0.44704 },
      foot_per_second: { name: 'Foot/Second', symbol: 'ft/s', factor: 0.3048 },
      knot: { name: 'Knot', symbol: 'kn', factor: 0.514444 },
    }
  },
  time: {
    name: 'Time',
    icon: '⏰',
    baseUnit: 'second',
    units: {
      second: { name: 'Second', symbol: 's', factor: 1 },
      millisecond: { name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      minute: { name: 'Minute', symbol: 'min', factor: 60 },
      hour: { name: 'Hour', symbol: 'h', factor: 3600 },
      day: { name: 'Day', symbol: 'd', factor: 86400 },
      week: { name: 'Week', symbol: 'wk', factor: 604800 },
      month: { name: 'Month', symbol: 'mo', factor: 2628000 },
      year: { name: 'Year', symbol: 'yr', factor: 31536000 },
    }
  },
  data: {
    name: 'Data',
    icon: '💾',
    baseUnit: 'byte',
    units: {
      byte: { name: 'Byte', symbol: 'B', factor: 1 },
      kilobyte: { name: 'Kilobyte', symbol: 'KB', factor: 1024 },
      megabyte: { name: 'Megabyte', symbol: 'MB', factor: 1048576 },
      gigabyte: { name: 'Gigabyte', symbol: 'GB', factor: 1073741824 },
      terabyte: { name: 'Terabyte', symbol: 'TB', factor: 1099511627776 },
      petabyte: { name: 'Petabyte', symbol: 'PB', factor: 1125899906842624 },
    }
  }
}

export function convert(value: number, fromUnit: string, toUnit: string, category: string): number {
  const cat = unitCategories[category]
  if (!cat) return 0
  
  // Special handling for temperature
  if (category === 'temperature') {
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      return (value * 9/5) + 32
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      return (value - 32) * 5/9
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      return value + 273.15
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      return value - 273.15
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      return ((value - 32) * 5/9) + 273.15
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      return ((value - 273.15) * 9/5) + 32
    }
    return value
  }
  
  const from = cat.units[fromUnit]
  const to = cat.units[toUnit]
  
  if (!from || !to) return 0
  
  // Convert to base unit, then to target unit
  const baseValue = value * from.factor
  return baseValue / to.factor
}