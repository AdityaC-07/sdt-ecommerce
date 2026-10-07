import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { LogIn, User, Shield, Store, Check, Lock } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useUIStore from '../../store/uiStore'
import Logomark from '../../components/brand/Logomark'
import Wordmark from '../../components/brand/Wordmark'
import { ROUTES } from '../../constants/routes'

const DEMO_ACCOUNTS = [
  {
    role: 'Student',
    email: 'student@cartiq.demo',
    pass: 'demo123',
    icon: User,
    color: 'bg-orchid-600 text-white',
    desc: 'Student lens & budget filters',
  },
  {
    role: 'Seller',
    email: 'seller@cartiq.demo',
    pass: 'demo123',
    icon: Store,
    color: 'bg-marigold-500 text-ink-900',
    desc: 'Seller inventory & listings',
  },
  {
    role: 'Admin',
    email: 'admin@cartiq.demo',
    pass: 'demo123',
    icon: Shield,
    color: 'bg-hibiscus-500 text-white',
    desc: 'Platform analytics & reviews',
  },
]

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuthStore()
  const { showToast } = useUIStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLoginSubmit = (e) => {
    e?.preventDefault()
    setError('')

    const result = login(email, password)
    if (result.success) {
      showToast('Logged in successfully', 'success')
      if (result.role === 'seller') navigate(ROUTES.SELLER_DASHBOARD)
      else if (result.role === 'admin') navigate(ROUTES.ADMIN_DASHBOARD)
      else navigate(ROUTES.HOME)
    } else {
      setError('Invalid email or password. Try one of the demo chips below!')
    }
  }

  const handleChipClick = (account) => {
    setEmail(account.email)
    setPassword(account.pass)
    const result = login(account.email, account.pass)
    if (result.success) {
      showToast(`Logged in as ${account.role} Demo`, 'success')
      if (result.role === 'seller') navigate(ROUTES.SELLER_DASHBOARD)
      else if (result.role === 'admin') navigate(ROUTES.ADMIN_DASHBOARD)
      else navigate(ROUTES.HOME)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 stage-blobs grain-overlay" style={{ background: 'var(--night-950)' }}>
      <div className="w-full max-w-md bg-white rounded-[24px] p-8 shadow-2xl relative z-10 border border-black/10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <Logomark size={28} />
            <Wordmark variant="shelf" size="text-2xl" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-ink-900">Sign in to CartIQ</h1>
          <p className="text-xs text-ink-600 mt-1">Access personalized intelligence, orders, or demo dashboards</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 mb-6">
          {error && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-ink-900 mb-1.5">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@cartiq.demo"
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field text-sm"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold shadow-md hover:shadow-lg">
            <LogIn className="w-4 h-4" /> Sign in
          </button>
        </form>

        {/* Demo Credentials One-Click Chips */}
        <div className="pt-6 border-t border-black/8">
          <p className="text-xs font-bold text-ink-900 mb-3 text-center uppercase tracking-wider">
            One-Click Demo Credentials
          </p>

          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((acc) => {
              const Icon = acc.icon
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleChipClick(acc)}
                  className="w-full p-3 rounded-2xl border border-black/8 hover:border-black/20 bg-shelf-50 hover:bg-white flex items-center justify-between transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${acc.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink-900">{acc.role} Demo</p>
                      <p className="text-[11px] text-ink-600">{acc.email}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orchid-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                    Click to sign in
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
