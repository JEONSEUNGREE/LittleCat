import { Settings, Sliders } from 'lucide-react'
import { usePasswordStore } from '../store/passwordStore'

export default function PasswordSettings() {
  const { settings, updateSettings } = usePasswordStore()

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Settings className="w-5 h-5 text-cyber-400" />
        설정
      </h2>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              비밀번호 길이
            </label>
            <span className="text-cyber-400 font-bold">{settings.length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="128"
            value={settings.length}
            onChange={(e) => updateSettings({ length: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>8</span>
            <span>64</span>
            <span>128</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <span className="text-sm">대문자 (A-Z)</span>
            <input
              type="checkbox"
              checked={settings.includeUppercase}
              onChange={(e) => updateSettings({ includeUppercase: e.target.checked })}
              className="w-5 h-5 text-cyber-500 rounded focus:ring-cyber-400"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <span className="text-sm">소문자 (a-z)</span>
            <input
              type="checkbox"
              checked={settings.includeLowercase}
              onChange={(e) => updateSettings({ includeLowercase: e.target.checked })}
              className="w-5 h-5 text-cyber-500 rounded focus:ring-cyber-400"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <span className="text-sm">숫자 (0-9)</span>
            <input
              type="checkbox"
              checked={settings.includeNumbers}
              onChange={(e) => updateSettings({ includeNumbers: e.target.checked })}
              className="w-5 h-5 text-cyber-500 rounded focus:ring-cyber-400"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <span className="text-sm">특수문자 (!@#$%)</span>
            <input
              type="checkbox"
              checked={settings.includeSymbols}
              onChange={(e) => updateSettings({ includeSymbols: e.target.checked })}
              className="w-5 h-5 text-cyber-500 rounded focus:ring-cyber-400"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <span className="text-sm">유사 문자 제외 (0O, 1l)</span>
            <input
              type="checkbox"
              checked={settings.excludeSimilar}
              onChange={(e) => updateSettings({ excludeSimilar: e.target.checked })}
              className="w-5 h-5 text-cyber-500 rounded focus:ring-cyber-400"
            />
          </label>
        </div>

        {settings.includeSymbols && (
          <div>
            <label className="block text-sm font-medium mb-2">
              사용할 특수문자
            </label>
            <input
              type="text"
              value={settings.customSymbols}
              onChange={(e) => updateSettings({ customSymbols: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-400"
              placeholder="!@#$%^&*"
            />
          </div>
        )}
      </div>
    </div>
  )
}