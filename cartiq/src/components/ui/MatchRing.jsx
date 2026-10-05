const MatchRing = ({ percent = 0, size = 'md', className = '' }) => {
  const normalizedPercent = Math.max(0, Math.min(100, Math.round(percent)))
  
  const sizeConfig = {
    sm: { radius: 20, strokeWidth: 3, fontSize: '10px' },
    md: { radius: 28, strokeWidth: 4, fontSize: '12px' },
    lg: { radius: 40, strokeWidth: 5, fontSize: '14px' },
  }
  
  const { radius, strokeWidth, fontSize } = sizeConfig[size]
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (normalizedPercent / 100) * circumference
  
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      aria-label={`Match: ${normalizedPercent} percent for your needs`}
      role="img"
    >
      <svg
        width={radius * 2 + strokeWidth}
        height={radius * 2 + strokeWidth}
        className="transform -rotate-90"
      >
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#E3E8EF"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#4F46E5"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <span
        className="absolute font-medium text-ink-900 num"
        style={{ fontSize }}
      >
        {normalizedPercent}%
      </span>
    </div>
  )
}

export default MatchRing
