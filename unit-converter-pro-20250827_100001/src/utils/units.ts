export interface Unit {
  id: string
  name: string
  symbol: string
  toBase: number
}

export const units: Record<string, Unit[]> = {
  length: [
    { id: 'meter', name: 'Meter', symbol: 'm', toBase: 1 },
    { id: 'kilometer', name: 'Kilometer', symbol: 'km', toBase: 1000 },
    { id: 'centimeter', name: 'Centimeter', symbol: 'cm', toBase: 0.01 },
    { id: 'millimeter', name: 'Millimeter', symbol: 'mm', toBase: 0.001 },
    { id: 'mile', name: 'Mile', symbol: 'mi', toBase: 1609.344 },
    { id: 'yard', name: 'Yard', symbol: 'yd', toBase: 0.9144 },
    { id: 'foot', name: 'Foot', symbol: 'ft', toBase: 0.3048 },
    { id: 'inch', name: 'Inch', symbol: 'in', toBase: 0.0254 },
  ],
  weight: [
    { id: 'kilogram', name: 'Kilogram', symbol: 'kg', toBase: 1 },
    { id: 'gram', name: 'Gram', symbol: 'g', toBase: 0.001 },
    { id: 'milligram', name: 'Milligram', symbol: 'mg', toBase: 0.000001 },
    { id: 'ton', name: 'Metric Ton', symbol: 't', toBase: 1000 },
    { id: 'pound', name: 'Pound', symbol: 'lb', toBase: 0.453592 },
    { id: 'ounce', name: 'Ounce', symbol: 'oz', toBase: 0.0283495 },
    { id: 'stone', name: 'Stone', symbol: 'st', toBase: 6.35029 },
  ],
  temperature: [
    { id: 'celsius', name: 'Celsius', symbol: '°C', toBase: 1 },
    { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', toBase: 1 },
    { id: 'kelvin', name: 'Kelvin', symbol: 'K', toBase: 1 },
  ],
  time: [
    { id: 'second', name: 'Second', symbol: 's', toBase: 1 },
    { id: 'millisecond', name: 'Millisecond', symbol: 'ms', toBase: 0.001 },
    { id: 'minute', name: 'Minute', symbol: 'min', toBase: 60 },
    { id: 'hour', name: 'Hour', symbol: 'h', toBase: 3600 },
    { id: 'day', name: 'Day', symbol: 'd', toBase: 86400 },
    { id: 'week', name: 'Week', symbol: 'wk', toBase: 604800 },
    { id: 'month', name: 'Month', symbol: 'mo', toBase: 2628000 },
    { id: 'year', name: 'Year', symbol: 'yr', toBase: 31536000 },
  ],
  volume: [
    { id: 'liter', name: 'Liter', symbol: 'L', toBase: 1 },
    { id: 'milliliter', name: 'Milliliter', symbol: 'mL', toBase: 0.001 },
    { id: 'cubicmeter', name: 'Cubic Meter', symbol: 'm³', toBase: 1000 },
    { id: 'gallon', name: 'US Gallon', symbol: 'gal', toBase: 3.78541 },
    { id: 'quart', name: 'US Quart', symbol: 'qt', toBase: 0.946353 },
    { id: 'pint', name: 'US Pint', symbol: 'pt', toBase: 0.473176 },
    { id: 'cup', name: 'US Cup', symbol: 'cup', toBase: 0.236588 },
    { id: 'fluidounce', name: 'Fluid Ounce', symbol: 'fl oz', toBase: 0.0295735 },
  ],
  speed: [
    { id: 'mps', name: 'Meter/Second', symbol: 'm/s', toBase: 1 },
    { id: 'kmh', name: 'Kilometer/Hour', symbol: 'km/h', toBase: 0.277778 },
    { id: 'mph', name: 'Mile/Hour', symbol: 'mph', toBase: 0.44704 },
    { id: 'knot', name: 'Knot', symbol: 'kn', toBase: 0.514444 },
    { id: 'ftps', name: 'Foot/Second', symbol: 'ft/s', toBase: 0.3048 },
  ],
  energy: [
    { id: 'joule', name: 'Joule', symbol: 'J', toBase: 1 },
    { id: 'kilojoule', name: 'Kilojoule', symbol: 'kJ', toBase: 1000 },
    { id: 'calorie', name: 'Calorie', symbol: 'cal', toBase: 4.184 },
    { id: 'kilocalorie', name: 'Kilocalorie', symbol: 'kcal', toBase: 4184 },
    { id: 'watthour', name: 'Watt Hour', symbol: 'Wh', toBase: 3600 },
    { id: 'kilowatthour', name: 'Kilowatt Hour', symbol: 'kWh', toBase: 3600000 },
  ],
  data: [
    { id: 'byte', name: 'Byte', symbol: 'B', toBase: 1 },
    { id: 'kilobyte', name: 'Kilobyte', symbol: 'KB', toBase: 1024 },
    { id: 'megabyte', name: 'Megabyte', symbol: 'MB', toBase: 1048576 },
    { id: 'gigabyte', name: 'Gigabyte', symbol: 'GB', toBase: 1073741824 },
    { id: 'terabyte', name: 'Terabyte', symbol: 'TB', toBase: 1099511627776 },
    { id: 'bit', name: 'Bit', symbol: 'bit', toBase: 0.125 },
    { id: 'kilobit', name: 'Kilobit', symbol: 'Kbit', toBase: 128 },
    { id: 'megabit', name: 'Megabit', symbol: 'Mbit', toBase: 131072 },
  ],
}