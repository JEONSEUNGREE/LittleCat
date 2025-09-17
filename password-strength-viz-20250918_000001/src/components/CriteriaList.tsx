import { useMemo } from 'react'
import { Check, X } from 'lucide-react'
import { getCriteria } from '../utils/passwordUtils'

interface CriteriaListProps {
  password: string
}

const CriteriaList = ({ password }: CriteriaListProps) => {
  const criteria = useMemo(() => getCriteria(password), [password])
  
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-white mb-4">보안 체크리스트</h2>
      
      <div className="space-y-2">
        {criteria.map((criterion) => (
          <div
            key={criterion.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
              criterion.passed
                ? 'bg-green-500/20 border border-green-500/30'
                : 'bg-white/5 border border-gray-600/30'
            }`}
          >
            <span className={`text-sm ${
              criterion.passed ? 'text-green-400' : 'text-gray-400'
            }`}>
              {criterion.label}
            </span>
            
            <div className="flex items-center gap-2">
              <span className={`text-xs ${
                criterion.passed ? 'text-green-400' : 'text-gray-500'
              }`}>
                {criterion.weight}점
              </span>
              {criterion.passed ? (
                <Check size={18} className="text-green-400" />
              ) : (
                <X size={18} className="text-gray-500" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-400 text-xs leading-relaxed">
          💡 강력한 패스워드는 다양한 문자 유형을 포함하고 충분한 길이를 가져야 합니다.
        </p>
      </div>
    </div>
  )
}

export default CriteriaList