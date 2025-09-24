import { Lightbulb, ChevronRight, Sparkles } from 'lucide-react'
import { useBatteryStore } from '../store/batteryStore'

export default function BatteryTips() {
  const { tips } = useBatteryStore()
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-battery-green border-battery-green'
      case 'medium': return 'text-battery-yellow border-battery-yellow'
      case 'low': return 'text-blue-400 border-blue-400'
      default: return 'text-white/50 border-white/50'
    }
  }
  
  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return '높음'
      case 'medium': return '보통'
      case 'low': return '낮음'
      default: return ''
    }
  }
  
  return (
    <div className="glass-effect p-6 mb-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-battery-yellow" />
          절전 팁
        </h3>
        <Sparkles className="w-5 h-5 text-battery-yellow animate-pulse" />
      </div>
      
      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-medium flex-1">{tip.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full border ${getImpactColor(tip.impact)}`}>
                {getImpactLabel(tip.impact)}
              </span>
            </div>
            <p className="text-white/60 text-sm mb-2">{tip.description}</p>
            <div className="flex items-center text-white/40 text-xs group-hover:text-white/60 transition-colors">
              <span>적용하기</span>
              <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-3 rounded-lg bg-battery-green/20 hover:bg-battery-green/30 text-battery-green font-medium transition-colors flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        모든 팁 적용하기
      </button>
    </div>
  )
}