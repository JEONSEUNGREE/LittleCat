import { useState } from 'react';
import { useWiFiStore } from '../store/wifiStore';
import { Play, Pause, RotateCcw, Download, Settings, Layers } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const { isScanning, setScanning, clearMap, mapData } = useWiFiStore();
  const [showSettings, setShowSettings] = useState(false);
  const [autoScan, setAutoScan] = useState(false);
  const [scanInterval, setScanInterval] = useState(5);

  const handleScanToggle = () => {
    setScanning(!isScanning);
    if (!isScanning && autoScan) {
      // Start auto-scan simulation
      const interval = setInterval(() => {
        const x = Math.random();
        const y = Math.random();
        const centerDist = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2));
        const signalStrength = -30 - (centerDist * 60) + (Math.random() * 10 - 5);
        
        useWiFiStore.getState().addSignalPoint({
          x,
          y,
          signalStrength,
          timestamp: Date.now(),
        });
      }, scanInterval * 1000);

      // Store interval ID for cleanup
      (window as any).scanInterval = interval;
    } else if ((window as any).scanInterval) {
      clearInterval((window as any).scanInterval);
      delete (window as any).scanInterval;
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(mapData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wifi-map-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Control Panel</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={handleScanToggle}
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
            isScanning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isScanning ? (
            <>
              <Pause className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Stop</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Start</span>
            </>
          )}
        </button>

        <button
          onClick={clearMap}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
        >
          <RotateCcw className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Clear</span>
        </button>

        <button
          onClick={handleExport}
          disabled={mapData.points.length === 0}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Export</span>
        </button>

        <button
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
        >
          <Layers className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Layers</span>
        </button>
      </div>

      {showSettings && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Auto-scan</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoScan}
                  onChange={(e) => setAutoScan(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Scan Interval: {scanInterval}s
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={scanInterval}
                onChange={(e) => setScanInterval(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Grid Size: {mapData.gridSize}
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={mapData.gridSize}
                onChange={(e) => {
                  useWiFiStore.setState((state) => ({
                    mapData: {
                      ...state.mapData,
                      gridSize: Number(e.target.value),
                    },
                  }));
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Points mapped: {mapData.points.length}</span>
          <span>
            {isScanning ? (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></span>
                Scanning
              </span>
            ) : (
              'Idle'
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;