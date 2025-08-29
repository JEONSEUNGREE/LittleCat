export interface Unit {
  name: string;
  symbol: string;
  factor: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  units: Unit[];
  color: string;
}

export interface ConversionResult {
  from: Unit;
  to: Unit;
  fromValue: number;
  toValue: number;
}