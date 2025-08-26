import { Category } from '../types/converter';

export const categories: Category[] = [
  {
    name: '길이',
    icon: '📏',
    units: [
      { name: '킬로미터', symbol: 'km', ratio: 1000 },
      { name: '미터', symbol: 'm', ratio: 1 },
      { name: '센티미터', symbol: 'cm', ratio: 0.01 },
      { name: '밀리미터', symbol: 'mm', ratio: 0.001 },
      { name: '마일', symbol: 'mi', ratio: 1609.344 },
      { name: '야드', symbol: 'yd', ratio: 0.9144 },
      { name: '피트', symbol: 'ft', ratio: 0.3048 },
      { name: '인치', symbol: 'in', ratio: 0.0254 },
    ],
  },
  {
    name: '무게',
    icon: '⚖️',
    units: [
      { name: '킬로그램', symbol: 'kg', ratio: 1 },
      { name: '그램', symbol: 'g', ratio: 0.001 },
      { name: '밀리그램', symbol: 'mg', ratio: 0.000001 },
      { name: '톤', symbol: 't', ratio: 1000 },
      { name: '파운드', symbol: 'lb', ratio: 0.453592 },
      { name: '온스', symbol: 'oz', ratio: 0.0283495 },
    ],
  },
  {
    name: '온도',
    icon: '🌡️',
    units: [
      { name: '섭씨', symbol: '°C', ratio: 1 },
      { name: '화씨', symbol: '°F', ratio: 1 },
      { name: '켈빈', symbol: 'K', ratio: 1 },
    ],
  },
  {
    name: '면적',
    icon: '📐',
    units: [
      { name: '제곱킬로미터', symbol: 'km²', ratio: 1000000 },
      { name: '제곱미터', symbol: 'm²', ratio: 1 },
      { name: '제곱센티미터', symbol: 'cm²', ratio: 0.0001 },
      { name: '헥타르', symbol: 'ha', ratio: 10000 },
      { name: '에이커', symbol: 'ac', ratio: 4046.86 },
      { name: '제곱피트', symbol: 'ft²', ratio: 0.092903 },
    ],
  },
  {
    name: '부피',
    icon: '🧊',
    units: [
      { name: '리터', symbol: 'L', ratio: 1 },
      { name: '밀리리터', symbol: 'mL', ratio: 0.001 },
      { name: '세제곱미터', symbol: 'm³', ratio: 1000 },
      { name: '갤런', symbol: 'gal', ratio: 3.78541 },
      { name: '쿼트', symbol: 'qt', ratio: 0.946353 },
      { name: '파인트', symbol: 'pt', ratio: 0.473176 },
      { name: '컵', symbol: 'cup', ratio: 0.236588 },
      { name: '온스(액량)', symbol: 'fl oz', ratio: 0.0295735 },
    ],
  },
  {
    name: '속도',
    icon: '🚀',
    units: [
      { name: '미터/초', symbol: 'm/s', ratio: 1 },
      { name: '킬로미터/시', symbol: 'km/h', ratio: 0.277778 },
      { name: '마일/시', symbol: 'mph', ratio: 0.44704 },
      { name: '피트/초', symbol: 'ft/s', ratio: 0.3048 },
      { name: '노트', symbol: 'knot', ratio: 0.514444 },
    ],
  },
  {
    name: '시간',
    icon: '⏰',
    units: [
      { name: '초', symbol: 's', ratio: 1 },
      { name: '분', symbol: 'min', ratio: 60 },
      { name: '시간', symbol: 'h', ratio: 3600 },
      { name: '일', symbol: 'd', ratio: 86400 },
      { name: '주', symbol: 'week', ratio: 604800 },
      { name: '월', symbol: 'month', ratio: 2592000 },
      { name: '년', symbol: 'year', ratio: 31536000 },
    ],
  },
  {
    name: '데이터',
    icon: '💾',
    units: [
      { name: '바이트', symbol: 'B', ratio: 1 },
      { name: '킬로바이트', symbol: 'KB', ratio: 1024 },
      { name: '메가바이트', symbol: 'MB', ratio: 1048576 },
      { name: '기가바이트', symbol: 'GB', ratio: 1073741824 },
      { name: '테라바이트', symbol: 'TB', ratio: 1099511627776 },
    ],
  },
];

export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === '°C' && toUnit === '°F') {
    return (value * 9/5) + 32;
  } else if (fromUnit === '°F' && toUnit === '°C') {
    return (value - 32) * 5/9;
  } else if (fromUnit === '°C' && toUnit === 'K') {
    return value + 273.15;
  } else if (fromUnit === 'K' && toUnit === '°C') {
    return value - 273.15;
  } else if (fromUnit === '°F' && toUnit === 'K') {
    return (value - 32) * 5/9 + 273.15;
  } else if (fromUnit === 'K' && toUnit === '°F') {
    return (value - 273.15) * 9/5 + 32;
  }
  return value;
}