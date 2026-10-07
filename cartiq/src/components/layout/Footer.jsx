import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, RotateCcw, Truck, ArrowUp, Zap, Sparkles, LayoutGrid } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import Wordmark from '../brand/Wordmark'
import IQOrb from '../brand/IQOrb'
import Logomark from '../brand/Logomark'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.includes('@')) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollToHeroComposer = () => {
    const el = document.getElementById('hero-search')
    if (el) {
      el.focus()
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ background: 'var(--night-950)', color: 'white' }} aria-label="Site footer">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="w-full py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border-b border-white/10"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        <ArrowUp className="w-4 h-4 text-marigold-400" />
        Back to top
      </button>

      {/* D3.5 Finale block: Giant brand watermark & CTA */}
      <div className="border-b border-white/10 relative overflow-hidden py-16">
        <div className="container-page relative z-10 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
            Shop smarter, not harder.
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-sm sm:text-base mb-6">
            Say what you need in plain English — CartIQ evaluates specs, reviews, and value score transparently.
          </p>

          <button
            onClick={scrollToHeroComposer}
            className="btn btn-primary px-6 py-3 text-sm font-bold shadow-lg hover:shadow-xl inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-ink-900" />
            Try a need search
          </button>
        </div>

        {/* Huge background watermark cropped by bottom */}
        <div className="text-center opacity-10 font-display font-extrabold text-[120px] sm:text-[180px] leading-none pointer-events-none select-none tracking-tighter -mb-16">
          CartIQ
        </div>
      </div>

      {/* Delivery & returns promise strip */}
      <div className="border-b border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container-page py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: RotateCcw, label: '10-day returns on most items', color: 'var(--lime-500)' },
            { icon: Truck, label: 'Pay after delivery on eligible orders', color: 'var(--marigold-400)' },
            { icon: ShieldCheck, label: 'Delivery estimate shown before you pay', color: 'var(--orchid-400)' },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 arch flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main link columns */}
      <div className="container-page py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Logomark size={22} />
              <Wordmark variant="stage" size="text-xl" />
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Shop smarter. Describe what you need and CartIQ finds what fits, explaining why.
            </p>
            <Link
              to={ROUTES.DESIGN_PROCESS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orchid-600/30 text-orchid-400 border border-orchid-500/30 hover:bg-orchid-600/50 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Our design process
            </Link>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-white/90">Shop</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'All products', href: ROUTES.SEARCH },
                { label: 'Best sellers', href: `${ROUTES.SEARCH}?sort=bestSellers` },
                { label: 'New arrivals', href: `${ROUTES.SEARCH}?sort=newest` },
                { label: 'Deals today', href: `${ROUTES.SEARCH}?sort=deals` },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-white/90">Account</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'My account', href: ROUTES.PROFILE },
                { label: 'My orders', href: ROUTES.ORDERS },
                { label: 'Sign in', href: ROUTES.LOGIN },
                { label: 'Compare items', href: ROUTES.COMPARE },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-white/90">Help & Info</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Design process', href: ROUTES.DESIGN_PROCESS },
                { label: 'Case study', href: ROUTES.CASE_STUDY },
                { label: 'Return policy', href: '#' },
                { label: 'Accessibility', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-white/90">Deal Alerts</h3>
            <p className="text-xs text-white/60 mb-3 leading-relaxed">
              Get price drops and verified deal alerts directly.
            </p>
            {subscribed ? (
              <p className="text-xs font-semibold text-lime-400">
                ✓ You're subscribed to CartIQ deal alerts.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-full text-xs outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/50 min-w-0"
                  aria-label="Email for deal alerts"
                />
                <button
                  type="submit"
                  className="btn btn-primary px-3 py-2 text-xs font-bold flex-shrink-0"
                >
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Block-print sunset hairline divider above bottom bar */}
      <div className="h-[2px] bg-sunset opacity-70" />

      {/* Bottom bar */}
      <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <div>
          © 2026 CartIQ. All rights reserved.{' '}
          <span className="text-marigold-400 font-semibold">
            Built for a Software Design Thinking project.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {['UPI', 'Visa', 'Mastercard', 'NetBanking', 'COD'].map((method) => (
            <span
              key={method}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-full border border-white/15 text-white/70"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
