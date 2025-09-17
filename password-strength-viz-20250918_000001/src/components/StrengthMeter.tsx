import { useMemo } from 'react'
import { calculateStrength, getStrengthLabel, getStrengthColor, getTextColor, estimateCrackTime } from '../utils/passwordUtils'
import { Lock, Zap, Clock } from 'lucide-react'

interface StrengthMeterProps {
  password: string
}

const StrengthMeter = ({ password }: StrengthMeterProps) => {
  const strength = useMemo(() => calculateStrength(password), [password])
  const label = useMemo(() => getStrengthLabel(strength), [strength])
  const colorClass = useMemo(() => getStrengthColor(strength), [strength])
  const textColorClass = useMemo(() => getTextColor(strength), [strength])
  const crackTime = useMemo(() => estimateCrackTime(password), [password])
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">강도 분석</h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={18} className={textColorClass} />
            <span className="text-gray-300">보안 수준</span>
          </div>
          <span className={`font-bold ${textColorClass}`}>{label}</span>
        </div>
        
        <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 ${colorClass} transition-all duration-500 ease-out flex items-center justify-center`}
            style={{ width: `${strength}%` }}
          >
            {strength > 20 && (
              <span className="text-white text-sm font-semibold">{strength}%</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-purple-400" />
              <span className="text-xs text-gray-400">강도 점수</span>
            </div>
            <span className={`text-lg font-bold ${textColorClass}`}>
              {strength}/100
            </span>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-purple-400" />
              <span className="text-xs text-gray-400">예상 해독 시간</span>
            </div>
            <span className={`text-lg font-bold ${textColorClass}`}>
              {crackTime}
            </span>
          </div>
        </div>
        
        {strength === 100 && (
          <div className="mt-3 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
            <p className="text-emerald-400 text-sm font-medium text-center">
              🎉 완벽한 패스워드입니다!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StrengthMeter