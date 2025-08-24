export interface Note {
  id: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: 'yellow' | 'blue' | 'green' | 'pink';
  createdAt: Date;
  updatedAt: Date;
  zIndex: number;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  type: 'arrow' | 'line';
}

export interface CanvasState {
  scale: number;
  offsetX: number;
  offsetY: number;
}