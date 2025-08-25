import { unitData } from '../data/units';
import { UnitCategory } from '../types';

export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number => {
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const categoryData = unitData[category];
  const fromFactor = categoryData.units[fromUnit].factor;
  const toFactor = categoryData.units[toUnit].factor;

  // Convert to base unit then to target unit
  const baseValue = value * fromFactor;
  const result = baseValue / toFactor;

  return result;
};

const convertTemperature = (value: number, from: string, to: string): number => {
  let celsius: number;

  // Convert to Celsius first
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return celsius * 9 / 5 + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
};

export const formatNumber = (num: number): string => {
  if (Math.abs(num) < 0.01 || Math.abs(num) >= 1e6) {
    return num.toExponential(4);
  }
  return num.toFixed(6).replace(/\.?0+$/, '');
};