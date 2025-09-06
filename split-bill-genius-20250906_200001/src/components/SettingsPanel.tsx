import { Settings, Percent, Globe, Info } from 'lucide-react'
import useBillStore from '../store/billStore'

export default function SettingsPanel() {
  const { taxPercent, tipPercent, currency, setTaxPercent, setTipPercent, setCurrency } = useBillStore()

  const currencies = [
    { code: 'KRW', symbol: '₩', name: '한국 원' },
    { code: 'USD', symbol: '$', name: '미국 달러' },
    { code: 'EUR', symbol: '€', name: '유로' },
    { code: 'JPY', symbol: '¥', name: '일본 엔' },
    { code: 'CNY', symbol: '¥', name: '중국 위안' }
  ]

  const tipPresets = [0, 10, 15, 18, 20, 25]
  const taxPresets = [0, 5, 8, 10, 13, 15]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Settings className="w-5 h-5 text-primary-500" />
        설정
      </h2>

      {/* Tax Settings */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <Percent className="w-4 h-4 text-primary-500" />
          세금 설정
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="30"
            step="0.5"
            value={taxPercent}
            onChange={(e) => setTaxPercent(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="w-16 text-center">
            <span className="font-semibold text-primary-600">{taxPercent}%</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {taxPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => setTaxPercent(preset)}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                taxPercent === preset
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Tip Settings */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <Percent className="w-4 h-4 text-secondary-500" />
          팁 설정
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="30"
            step="0.5"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="w-16 text-center">
            <span className="font-semibold text-secondary-600">{tipPercent}%</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tipPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => setTipPercent(preset)}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                tipPercent === preset
                  ? 'bg-secondary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Currency Settings */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <Globe className="w-4 h-4 text-green-500" />
          통화 설정
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                currency === curr.code
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold">{curr.symbol} {curr.code}</div>
              <div className="text-xs mt-1">{curr.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-2">사용 팁</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>세금과 팁은 자동으로 각 참가자에게 비례 분배됩니다</li>
              <li>항목별로 참가자를 다르게 설정하여 공정한 분배가 가능합니다</li>
              <li>정산 탭에서 실시간으로 계산 결과를 확인할 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="text-center pt-6 border-t">
        <p className="text-xs text-gray-500">Split Bill Genius v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">스마트한 더치페이의 시작</p>
      </div>
    </div>
  )
}