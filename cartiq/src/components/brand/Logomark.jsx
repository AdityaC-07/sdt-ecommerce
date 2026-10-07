import { Zap } from 'lucide-react'

const Logomark = ({ size = 28, className = '' }) => {
  return (
    <div
      className={`arch flex items-center justify-center relative overflow-hidden border border-white/20 shadow-md ${className}`}
      style={{
        width: size * 1.1,
        height: size * 1.3,
        background: 'linear-gradient(135deg, rgba(255,46,99,0.2), rgba(255,176,32,0.25))',
      }}
      aria-hidden="true"
    >
      <Zap
        aria-hidden="true"
        style={{
          width: size * 0.65,
          height: size * 0.65,
          color: 'var(--marigold-400)',
          filter: 'drop-shadow(0 2px 4px rgba(255,176,32,0.4))',
        }}
        className="fill-current"
      />
    </div>
  )
}

export default Logomark
