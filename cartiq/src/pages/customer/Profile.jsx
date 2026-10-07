import { useNavigate } from 'react'
import { User, Mail, Shield, Accessibility, LogOut, Package, Heart } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import useAuthStore from '../../store/authStore'
import useUIStore from '../../store/uiStore'
import { ROUTES } from '../../constants/routes'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { isSeniorMode, toggleSeniorMode } = useUIStore()

  if (!user) {
    return (
      <PageWrapper>
        <div className="container-page py-16 text-center max-w-md mx-auto">
          <User className="w-12 h-12 text-ink-600 mx-auto mb-3 opacity-50" />
          <h2 className="font-display font-bold text-xl text-ink-900 mb-2">Please sign in</h2>
          <button onClick={() => navigate(ROUTES.LOGIN)} className="btn btn-primary px-6 py-2.5 text-xs font-bold">
            Sign in
          </button>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container-page py-8 max-w-2xl mx-auto">
        <SectionHeader title="My profile" subtitle="Manage account info, preferences, and security" />

        <div className="bg-white rounded-[24px] border border-black/8 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-black/8">
            <div className="w-16 h-16 rounded-full bg-orchid-600 text-white flex items-center justify-center font-bold text-xl">
              {user.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="font-bold text-xl text-ink-900">{user.name}</h2>
              <p className="text-xs text-ink-600">{user.email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-orchid-600 border border-purple-100 uppercase">
                {user.role} · {user.persona || 'Customer'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-600">Preferences</h3>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-shelf-50 border border-black/5">
              <div className="flex items-center gap-3">
                <Accessibility className="w-5 h-5 text-marigold-600" />
                <div>
                  <p className="text-xs font-bold text-ink-900">Easy Mode</p>
                  <p className="text-[11px] text-ink-600">Larger fonts, high contrast, simplified navigation</p>
                </div>
              </div>
              <button
                onClick={toggleSeniorMode}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  isSeniorMode ? 'bg-marigold-500 text-ink-900' : 'bg-black/10 text-ink-600'
                }`}
              >
                {isSeniorMode ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-black/8 flex justify-between">
            <button
              onClick={() => {
                logout()
                navigate(ROUTES.HOME)
              }}
              className="btn bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 px-5 py-2 text-xs font-bold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Profile
