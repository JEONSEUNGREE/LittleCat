import { useRef, useState, useEffect } from 'react';
import { useWiFiStore } from '../store/wifiStore';
import { MapPin } from 'lucide-react';

const SignalMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { mapData, addSignalPoint, selectedPoint, setSelectedPoint, isScanning } = useWiFiStore();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.min(rect.width, 600),
          height: Math.min(rect.width, 600),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    const gridSize = dimensions.width / mapData.gridSize;

    for (let i = 0; i <= mapData.gridSize; i++) {
      const pos = i * gridSize;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, dimensions.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(dimensions.width, pos);
      ctx.stroke();
    }

    // Draw heat map
    mapData.points.forEach((point) => {
      const gradient = ctx.createRadialGradient(
        point.x * dimensions.width,
        point.y * dimensions.height,
        0,
        point.x * dimensions.width,
        point.y * dimensions.height,
        50
      );

      const opacity = Math.abs(point.signalStrength) / 100;
      const color = getSignalColor(point.quality);
      
      gradient.addColorStop(0, `${color}88`);
      gradient.addColorStop(0.5, `${color}44`);
      gradient.addColorStop(1, `${color}00`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    });

    // Draw points
    mapData.points.forEach((point) => {
      ctx.fillStyle = getSignalColor(point.quality);
      ctx.beginPath();
      ctx.arc(
        point.x * dimensions.width,
        point.y * dimensions.height,
        6,
        0,
        Math.PI * 2
      );
      ctx.fill();

      if (selectedPoint?.id === point.id) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }, [mapData, dimensions, selectedPoint]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScanning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / dimensions.width;
    const y = (e.clientY - rect.top) / dimensions.height;

    // Simulate signal strength based on distance from center
    const centerDist = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2));
    const signalStrength = -30 - (centerDist * 60);

    addSignalPoint({
      x,
      y,
      signalStrength,
      timestamp: Date.now(),
    });
  };

  const getSignalColor = (quality: string): string => {
    switch (quality) {
      case 'excellent': return '#22c55e';
      case 'good': return '#84cc16';
      case 'fair': return '#eab308';
      case 'poor': return '#f97316';
      default: return '#ef4444';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4" ref={containerRef}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Signal Map</h2>
        {isScanning && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-sm text-blue-500">Tap to add point</span>
          </div>
        )}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onClick={handleCanvasClick}
          className="border border-gray-300 rounded-lg cursor-crosshair w-full"
          style={{ maxWidth: '600px', maxHeight: '600px' }}
        />
        {mapData.points.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400 text-center px-4">
              Start scanning to map WiFi signals
            </p>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-signal-excellent rounded-full"></div>
          <span className="text-xs text-gray-600">Excellent</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-signal-good rounded-full"></div>
          <span className="text-xs text-gray-600">Good</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-signal-fair rounded-full"></div>
          <span className="text-xs text-gray-600">Fair</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-signal-poor rounded-full"></div>
          <span className="text-xs text-gray-600">Poor</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-signal-none rounded-full"></div>
          <span className="text-xs text-gray-600">None</span>
        </div>
      </div>
    </div>
  );
};

export default SignalMap;