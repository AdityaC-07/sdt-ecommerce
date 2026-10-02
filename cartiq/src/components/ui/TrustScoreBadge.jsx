import { Info } from 'lucide-react'

const TrustScoreBadge = ({ score, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }

  const getColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  const percentage = Math.min(100, Math.max(0, score))
  const circumference = 2 * Math.PI * 16
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center gap-2 group">
      <div className={`relative ${sizes[size]} rounded-full flex items-center justify-center font-semibold ${getColor(score)}`}>
        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-20"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="relative z-10">{score}</span>
      </div>
      <div className="relative group">
        <Info className="w-4 h-4 text-gray-400 cursor-help" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Based on review consistency, seller reputation, and verified purchases
        </div>
      </div>
    </div>
  )
}

export default TrustScoreBadge
