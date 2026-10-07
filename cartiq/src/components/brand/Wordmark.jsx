const Wordmark = ({ variant = 'stage', size = 'text-2xl', className = '' }) => {
  const textColor = variant === 'stage' ? 'text-white' : 'text-ink-900'

  return (
    <span className={`font-display font-bold tracking-tight ${size} ${textColor} ${className}`}>
      Cart
      <span
        style={{
          background: 'var(--sunset)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        IQ
      </span>
    </span>
  )
}

export default Wordmark
