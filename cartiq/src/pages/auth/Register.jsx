import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus, User, Mail, Lock } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useUIStore from '../../store/uiStore'
import Logomark from '../../components/brand/Logomark'
import Wordmark from '../../components/brand/Wordmark'
import { ROUTES } from '../../constants/routes'

const Register = () => {
  const navigate = useNavigate()
  const { showToast } = useUIStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Account created! Please sign in.', 'success')
    navigate(ROUTES.LOGIN)
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 stage-blobs grain-overlay" style={{ background: 'var(--night-950)' }}>
      <div className="w-full max-w-md bg-white rounded-[24px] p-8 shadow-2xl relative z-10 border border-black/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <Logomark size={28} />
            <Wordmark variant="shelf" size="text-2xl" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-ink-900">Create your account</h1>
          <p className="text-xs text-ink-600 mt-1">Get personalized recommendations and spec checks</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink-900 mb-1.5">Full name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aarav Sharma"
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 mb-1.5">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aarav@example.com"
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
            <UserPlus className="w-4 h-4" /> Create account
          </button>
        </form>

        <p className="text-center text-xs text-ink-600 mt-6">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-bold text-orchid-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
