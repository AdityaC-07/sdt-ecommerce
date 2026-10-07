/**
 * IQOrb — the face of CartIQ's AI assistant.
 *
 * Conic-gradient orb with inner soft highlight, 1px inner ring, and blurred background glow.
 * States:
 * - idle: slow rotation + breathe animation
 * - thinking: fast spin
 * - speaking / answer: pulse once
 */
const IQOrb = ({ size = 32, state = 'idle', className = '', style = {} }) => {
  const normalizedState = state === 'speaking' ? 'answer' : state
  const stateClass = {
    idle: 'iq-orb--idle',
    thinking: 'iq-orb--thinking',
    answer: 'iq-orb--answer',
  }[normalizedState] || 'iq-orb--idle'

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {/* Blurred background glow */}
      <div
        className="absolute inset-0 rounded-full blur-xs opacity-60"
        style={{ background: 'var(--iq)' }}
      />
      {/* Main conic orb */}
      <div
        className={`iq-orb ${stateClass} w-full h-full relative rounded-full border border-white/30 overflow-hidden shadow-inner`}
        style={{ background: 'var(--iq)', backgroundSize: '200% 200%' }}
      >
        {/* Inner top-left specular highlight */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)',
          }}
        />
      </div>
    </div>
  )
}

export default IQOrb
