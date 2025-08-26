import React from 'react';
import { CategorySelector } from './components/CategorySelector';
import { UnitConverter } from './components/UnitConverter';
import { FavoritesList } from './components/FavoritesList';
import { QuickConvert } from './components/QuickConvert';
import { Ruler } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
              <Ruler size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Unit Converter Pro</h1>
          <p className="text-white/80 text-sm">빠르고 정확한 단위 변환</p>
        </header>

        <CategorySelector />
        <UnitConverter />
        <FavoritesList />
        <QuickConvert />
      </div>
    </div>
  );
}

export default App;