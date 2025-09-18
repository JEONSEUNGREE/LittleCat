import { Activity } from 'lucide-react';

interface TrigValuesProps {
  angle: number;
  isDegrees: boolean;
}

const TrigValues = ({ angle, isDegrees }: TrigValuesProps) => {
  const getRadians = (deg: number) => (deg * Math.PI) / 180;
  const angleRad = isDegrees ? getRadians(angle) : angle;

  const sin = Math.sin(angleRad);
  const cos = Math.cos(angleRad);
  const tan = cos !== 0 ? sin / cos : NaN;
  const cot = sin !== 0 ? cos / sin : NaN;
  const sec = cos !== 0 ? 1 / cos : NaN;
  const csc = sin !== 0 ? 1 / sin : NaN;

  const formatValue = (value: number) => {
    if (isNaN(value)) return 'undefined';
    if (!isFinite(value)) return value > 0 ? '∞' : '-∞';
    
    // Check for special values
    const epsilon = 0.0001;
    if (Math.abs(value) < epsilon) return '0';
    if (Math.abs(value - 1) < epsilon) return '1';
    if (Math.abs(value + 1) < epsilon) return '-1';
    if (Math.abs(value - 0.5) < epsilon) return '1/2';
    if (Math.abs(value + 0.5) < epsilon) return '-1/2';
    if (Math.abs(value - Math.sqrt(2)/2) < epsilon) return '√2/2';
    if (Math.abs(value + Math.sqrt(2)/2) < epsilon) return '-√2/2';
    if (Math.abs(value - Math.sqrt(3)/2) < epsilon) return '√3/2';
    if (Math.abs(value + Math.sqrt(3)/2) < epsilon) return '-√3/2';
    
    return value.toFixed(4);
  };

  const trigFunctions = [
    { name: 'sin', value: sin, color: 'text-red-400' },
    { name: 'cos', value: cos, color: 'text-blue-400' },
    { name: 'tan', value: tan, color: 'text-green-400' },
    { name: 'cot', value: cot, color: 'text-yellow-400' },
    { name: 'sec', value: sec, color: 'text-purple-400' },
    { name: 'csc', value: csc, color: 'text-pink-400' },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Trigonometric Values
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {trigFunctions.map((func) => (
          <div
            key={func.name}
            className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className={`font-mono text-lg ${func.color}`}>
                {func.name}(θ)
              </span>
              <span className="text-white font-bold">
                {formatValue(func.value)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <div className="text-sm text-white/70 space-y-1">
          <div>Point coordinates: ({formatValue(cos)}, {formatValue(sin)})</div>
          <div>Quadrant: {getQuadrant(angleRad)}</div>
          <div>Reference angle: {formatReferenceAngle(angleRad, isDegrees)}</div>
        </div>
      </div>
    </div>
  );
};

const getQuadrant = (angleRad: number) => {
  const normalized = ((angleRad % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
  if (normalized <= Math.PI / 2) return 'I';
  if (normalized <= Math.PI) return 'II';
  if (normalized <= (3 * Math.PI) / 2) return 'III';
  return 'IV';
};

const formatReferenceAngle = (angleRad: number, isDegrees: boolean) => {
  const normalized = ((angleRad % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
  let reference = normalized;
  
  if (normalized > Math.PI / 2 && normalized <= Math.PI) {
    reference = Math.PI - normalized;
  } else if (normalized > Math.PI && normalized <= (3 * Math.PI) / 2) {
    reference = normalized - Math.PI;
  } else if (normalized > (3 * Math.PI) / 2) {
    reference = 2 * Math.PI - normalized;
  }
  
  if (isDegrees) {
    return `${((reference * 180) / Math.PI).toFixed(2)}°`;
  }
  return `${reference.toFixed(4)} rad`;
};

export default TrigValues;