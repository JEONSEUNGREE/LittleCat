export interface Unit {
  name: string;
  symbol: string;
  ratio: number;
}

export interface Category {
  name: string;
  icon: string;
  units: Unit[];
}

export interface ConversionResult {
  from: Unit;
  to: Unit;
  fromValue: number;
  toValue: number;
}