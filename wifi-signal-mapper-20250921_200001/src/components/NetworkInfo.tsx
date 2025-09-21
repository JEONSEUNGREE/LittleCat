import { useEffect } from 'react';
import { useWiFiStore } from '../store/wifiStore';
import { Wifi, Lock, Activity, Radio } from 'lucide-react';

const NetworkInfo: React.FC = () => {
  const { networkInfo, setNetworkInfo, selectedPoint } = useWiFiStore();

  useEffect(() => {
    // Simulate network info
    setNetworkInfo({
      ssid: 'Home_Network_5G',
      frequency: 5180,
      channel: 36,
      security: 'WPA2-Personal',
    });
  }, [setNetworkInfo]);

  if (!networkInfo) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-400">
            <Wifi className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">No network detected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Network Information</h2>
      
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Wifi className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">SSID</p>
            <p className="text-sm text-gray-900">{networkInfo.ssid}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Radio className="w-5 h-5 text-green-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Frequency</p>
            <p className="text-sm text-gray-900">{networkInfo.frequency} MHz</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Activity className="w-5 h-5 text-purple-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Channel</p>
            <p className="text-sm text-gray-900">Channel {networkInfo.channel}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Lock className="w-5 h-5 text-orange-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Security</p>
            <p className="text-sm text-gray-900">{networkInfo.security}</p>
          </div>
        </div>
      </div>

      {selectedPoint && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Point</h3>
          <div className="bg-gray-50 rounded p-2 space-y-1">
            <p className="text-xs text-gray-600">
              Signal: <span className="font-medium">{selectedPoint.signalStrength.toFixed(0)} dBm</span>
            </p>
            <p className="text-xs text-gray-600">
              Quality: <span className="font-medium capitalize">{selectedPoint.quality}</span>
            </p>
            <p className="text-xs text-gray-600">
              Position: <span className="font-medium">
                ({(selectedPoint.x * 100).toFixed(0)}%, {(selectedPoint.y * 100).toFixed(0)}%)
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkInfo;