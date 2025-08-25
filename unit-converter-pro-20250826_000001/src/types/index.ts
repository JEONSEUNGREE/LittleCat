export type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'time' | 'data';

export interface Unit {
  name: string;
  symbol: string;
  factor: number; // Conversion factor to base unit
}

export interface CategoryData {
  name: string;
  icon: string;
  baseUnit: string;
  units: Record<string, Unit>;
}

export interface ConversionResult {
  from: string;
  to: string;
  fromValue: number;
  toValue: number;
  category: UnitCategory;
}