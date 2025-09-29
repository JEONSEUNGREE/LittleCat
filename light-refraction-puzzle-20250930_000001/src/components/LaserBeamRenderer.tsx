
import { LaserBeam } from '../types';
import { getBeamPath } from '../utils/physics';

interface LaserBeamRendererProps {
  beams: LaserBeam[];
  gridSize: number;
}

const LaserBeamRenderer: React.FC<LaserBeamRendererProps> = ({ beams, gridSize }) => {
  const cellSize = gridSize <= 5 ? 64 : gridSize <= 7 ? 48 : 40;
  const gap = 2;
  const padding = 16;
  
  const getPosition = (x: number, y: number) => ({
    x: padding + x * (cellSize + gap) + cellSize / 2,
    y: padding + y * (cellSize + gap) + cellSize / 2
  });
  
  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        width: padding * 2 + gridSize * (cellSize + gap),
        height: padding * 2 + gridSize * (cellSize + gap)
      }}
    >
      <defs>
        {/* 레이저 빔 그라데이션 정의 */}
        <linearGradient id="laser-red" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff0040" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ff0040" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff0040" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="laser-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="laser-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="laser-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffdd00" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ffdd00" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffdd00" stopOpacity="0.3" />
        </linearGradient>
        
        {/* 빔 글로우 필터 */}
        <filter id="laser-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {beams.map((beam) => {
        const start = getPosition(beam.start.x, beam.start.y);
        const end = getPosition(beam.end.x, beam.end.y);
        const path = getBeamPath(beam, gridSize);
        
        // 경로 문자열 생성
        const pathString = path.map((point, index) => {
          const pos = getPosition(point.x, point.y);
          return index === 0 ? `M ${pos.x} ${pos.y}` : `L ${pos.x} ${pos.y}`;
        }).join(' ');
        
        const colorMap = {
          red: '#ff0040',
          blue: '#00d4ff',
          green: '#00ff88',
          yellow: '#ffdd00'
        };
        
        return (
          <g key={beam.id}>
            {/* 빔 글로우 효과 */}
            <path
              d={pathString}
              stroke={colorMap[beam.color]}
              strokeWidth="8"
              fill="none"
              opacity="0.3"
              filter="url(#laser-glow)"
            />
            {/* 메인 빔 */}
            <path
              d={pathString}
              stroke={`url(#laser-${beam.color})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="animate-laser-glow"
            />
            {/* 중앙 밝은 선 */}
            <path
              d={pathString}
              stroke="white"
              strokeWidth="1"
              fill="none"
              opacity="0.8"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default LaserBeamRenderer;