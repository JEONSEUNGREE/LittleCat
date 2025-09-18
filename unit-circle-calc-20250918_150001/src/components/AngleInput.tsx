import { RotateCw, ToggleLeft, ToggleRight } from 'lucide-react';

interface AngleInputProps {
  angle: number;
  isDegrees: boolean;
  onAngleChange: (angle: number) => void;
  onUnitToggle: () => void;
}

const AngleInput = ({ angle, isDegrees, onAngleChange, onUnitToggle }: AngleInputProps) => {
  const handleInputChange = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      onAngleChange(num);
    }
  };

  const normalizeAngle = () => {
    const normalized = isDegrees 
      ? ((angle % 360) + 360) % 360
      : ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
    onAngleChange(normalized);
  };

  return (
    <div className="glass-effect rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <RotateCw className="w-5 h-5" />
        Angle Input
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={angle.toFixed(2)}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 
                     border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
            step={isDegrees ? 1 : 0.01}
          />
          <span className="text-white font-medium min-w-[60px]">
            {isDegrees ? 'degrees' : 'radians'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={onUnitToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 
                     hover:bg-white/20 transition-colors text-white"
          >
            {isDegrees ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />}
            Switch to {isDegrees ? 'Radians' : 'Degrees'}
          </button>

          <button
            onClick={normalizeAngle}
            className="px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 
                     transition-colors text-white"
          >
            Normalize
          </button>
        </div>

        <input
          type="range"
          min="0"
          max={isDegrees ? 360 : 2 * Math.PI}
          step={isDegrees ? 1 : 0.01}
          value={angle}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer 
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                   [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                   [&::-webkit-slider-thumb]:bg-primary"
        />
      </div>
    </div>
  );
};

export default AngleInput;