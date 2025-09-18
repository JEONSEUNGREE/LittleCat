import { Zap } from 'lucide-react';

interface QuickAnglesProps {
  onSelectAngle: (angle: number) => void;
  isDegrees: boolean;
}

const QuickAngles = ({ onSelectAngle, isDegrees }: QuickAnglesProps) => {
  const commonAngles = [
    { deg: 0, rad: 0, label: '0°' },
    { deg: 30, rad: Math.PI / 6, label: '30°' },
    { deg: 45, rad: Math.PI / 4, label: '45°' },
    { deg: 60, rad: Math.PI / 3, label: '60°' },
    { deg: 90, rad: Math.PI / 2, label: '90°' },
    { deg: 120, rad: (2 * Math.PI) / 3, label: '120°' },
    { deg: 135, rad: (3 * Math.PI) / 4, label: '135°' },
    { deg: 150, rad: (5 * Math.PI) / 6, label: '150°' },
    { deg: 180, rad: Math.PI, label: '180°' },
    { deg: 210, rad: (7 * Math.PI) / 6, label: '210°' },
    { deg: 225, rad: (5 * Math.PI) / 4, label: '225°' },
    { deg: 240, rad: (4 * Math.PI) / 3, label: '240°' },
    { deg: 270, rad: (3 * Math.PI) / 2, label: '270°' },
    { deg: 300, rad: (5 * Math.PI) / 3, label: '300°' },
    { deg: 315, rad: (7 * Math.PI) / 4, label: '315°' },
    { deg: 330, rad: (11 * Math.PI) / 6, label: '330°' },
  ];

  const getRadLabel = (rad: number) => {
    const pi = Math.PI;
    if (rad === 0) return '0';
    if (rad === pi / 6) return 'π/6';
    if (rad === pi / 4) return 'π/4';
    if (rad === pi / 3) return 'π/3';
    if (rad === pi / 2) return 'π/2';
    if (rad === (2 * pi) / 3) return '2π/3';
    if (rad === (3 * pi) / 4) return '3π/4';
    if (rad === (5 * pi) / 6) return '5π/6';
    if (rad === pi) return 'π';
    if (rad === (7 * pi) / 6) return '7π/6';
    if (rad === (5 * pi) / 4) return '5π/4';
    if (rad === (4 * pi) / 3) return '4π/3';
    if (rad === (3 * pi) / 2) return '3π/2';
    if (rad === (5 * pi) / 3) return '5π/3';
    if (rad === (7 * pi) / 4) return '7π/4';
    if (rad === (11 * pi) / 6) return '11π/6';
    return rad.toFixed(3);
  };

  return (
    <div className="glass-effect rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Zap className="w-5 h-5" />
        Quick Common Angles
      </h2>

      <div className="grid grid-cols-4 gap-2">
        {commonAngles.map((angle) => (
          <button
            key={angle.deg}
            onClick={() => onSelectAngle(isDegrees ? angle.deg : angle.rad)}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors 
                     text-white text-sm font-medium flex flex-col items-center gap-1"
          >
            <span className="text-xs opacity-70">
              {isDegrees ? angle.label : getRadLabel(angle.rad)}
            </span>
            <span className="text-xs opacity-50">
              {isDegrees ? getRadLabel(angle.rad) : angle.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAngles;