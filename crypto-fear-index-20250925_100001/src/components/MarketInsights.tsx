import { useState } from 'react'
import { useFearIndexStore } from '../store/fearIndexStore'
import { Brain, Target, Shield, Zap, ChevronRight } from 'lucide-react'

interface Insight {
  id: number
  title: string
  description: string
  type: 'strategy' | 'warning' | 'opportunity' | 'trend'
  icon: JSX.Element
}

const MarketInsights = () => {
  const { currentIndex, sentiment } = useFearIndexStore()
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null)

  const getInsights = (): Insight[] => {
    const baseInsights: Insight[] = []

    if (currentIndex <= 25) {
      baseInsights.push(
        {
          id: 1,
          title: 'Contrarian Opportunity',
          description: 'Historical data shows extreme fear often precedes market rebounds. Consider dollar-cost averaging.',
          type: 'opportunity',
          icon: <Target className="w-5 h-5" />
        },
        {
          id: 2,
          title: 'Risk Management Alert',
          description: 'While opportunities exist, maintain strict stop-losses and position sizing.',
          type: 'warning',
          icon: <Shield className="w-5 h-5" />
        }
      )
    } else if (currentIndex <= 45) {
      baseInsights.push(
        {
          id: 3,
          title: 'Accumulation Phase',
          description: 'Fear levels suggest potential accumulation zone for long-term investors.',
          type: 'strategy',
          icon: <Brain className="w-5 h-5" />
        },
        {
          id: 4,
          title: 'Volatility Expected',
          description: 'Market uncertainty may lead to increased volatility. Prepare for price swings.',
          type: 'trend',
          icon: <Zap className="w-5 h-5" />
        }
      )
    } else if (currentIndex <= 55) {
      baseInsights.push(
        {
          id: 5,
          title: 'Market Equilibrium',
          description: 'Balanced sentiment indicates a good time for research and planning.',
          type: 'strategy',
          icon: <Brain className="w-5 h-5" />
        },
        {
          id: 6,
          title: 'Wait for Direction',
          description: 'Neutral zones often precede significant market moves. Stay alert.',
          type: 'trend',
          icon: <Zap className="w-5 h-5" />
        }
      )
    } else if (currentIndex <= 75) {
      baseInsights.push(
        {
          id: 7,
          title: 'Take Partial Profits',
          description: 'Greed levels suggest considering taking some profits off the table.',
          type: 'strategy',
          icon: <Brain className="w-5 h-5" />
        },
        {
          id: 8,
          title: 'FOMO Warning',
          description: 'Avoid making emotional decisions based on fear of missing out.',
          type: 'warning',
          icon: <Shield className="w-5 h-5" />
        }
      )
    } else {
      baseInsights.push(
        {
          id: 9,
          title: 'Extreme Greed Alert',
          description: 'Market may be overheated. Consider defensive positioning.',
          type: 'warning',
          icon: <Shield className="w-5 h-5" />
        },
        {
          id: 10,
          title: 'Correction Risk High',
          description: 'Historical patterns show corrections often follow extreme greed periods.',
          type: 'trend',
          icon: <Zap className="w-5 h-5" />
        }
      )
    }

    return baseInsights
  }

  const insights = getInsights()

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strategy': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'warning': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'opportunity': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'trend': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl md:text-2xl font-bold mb-4">Market Insights</h3>
      
      <div className="mb-4 p-3 bg-white/5 rounded-lg">
        <p className="text-sm text-gray-300">Current Market Condition</p>
        <p className="text-lg font-semibold mt-1">{sentiment}</p>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              getTypeColor(insight.type)
            } ${selectedInsight === insight.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
            onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{insight.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{insight.title}</h4>
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform ${
                      selectedInsight === insight.id ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
                {selectedInsight === insight.id && (
                  <p className="mt-2 text-sm text-gray-300">
                    {insight.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
        <p className="text-xs text-yellow-400">
          ⚠️ Disclaimer: These insights are for educational purposes only and should not be considered financial advice. Always do your own research.
        </p>
      </div>
    </div>
  )
}

export default MarketInsights