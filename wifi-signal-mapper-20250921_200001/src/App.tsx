
import SignalMap from './components/SignalMap';
import NetworkInfo from './components/NetworkInfo';
import ControlPanel from './components/ControlPanel';
import { Wifi } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">WiFi Signal Mapper</h1>
              <p className="text-sm text-gray-600">Map and analyze wireless signal coverage</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Map */}
          <div className="lg:col-span-2 space-y-4">
            <SignalMap />
            <div className="lg:hidden">
              <ControlPanel />
            </div>
          </div>

          {/* Right Column - Info & Controls */}
          <div className="space-y-4">
            <NetworkInfo />
            <div className="hidden lg:block">
              <ControlPanel />
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <footer className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">0</p>
              <p className="text-xs text-gray-600">Networks Found</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">0m²</p>
              <p className="text-xs text-gray-600">Area Mapped</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">--</p>
              <p className="text-xs text-gray-600">Avg Signal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">0%</p>
              <p className="text-xs text-gray-600">Coverage</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;