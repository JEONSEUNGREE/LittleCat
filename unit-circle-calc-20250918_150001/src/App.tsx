import { useState } from 'react';
import CircleCanvas from './components/CircleCanvas';
import AngleInput from './components/AngleInput';
import TrigValues from './components/TrigValues';
import QuickAngles from './components/QuickAngles';
import { Calculator, Circle } from 'lucide-react';

function App() {
  const [angle, setAngle] = useState(45);
  const [isDegrees, setIsDegrees] = useState(true);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Circle className="w-10 h-10 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Unit Circle Calculator
            </h1>
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <p className="text-white/80 text-sm md:text-base">
            Interactive trigonometry visualization and calculation tool
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="glass-effect rounded-2xl p-6">
              <CircleCanvas 
                angle={angle} 
                isDegrees={isDegrees}
                onAngleChange={setAngle}
              />
            </div>
          </div>

          <div className="space-y-4">
            <AngleInput
              angle={angle}
              isDegrees={isDegrees}
              onAngleChange={setAngle}
              onUnitToggle={() => setIsDegrees(!isDegrees)}
            />

            <TrigValues
              angle={angle}
              isDegrees={isDegrees}
            />

            <QuickAngles
              onSelectAngle={setAngle}
              isDegrees={isDegrees}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;