import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Menu, X, Search, ShoppingCart, Heart, User,
  Accessibility, ChevronDown, Laptop, Headphones, Smartphone,
  Camera, Watch, Tablet, Speaker, Tv, LayoutGrid, Sparkles, LogOut, Package, Shield, Settings
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useCartStore from '../../store/cartStore'
import useUIStore from '../../store/uiStore'
import IQOrb from '../brand/IQOrb'
import Wordmark from '../brand/Wordmark'
import Logomark from '../brand/Logomark'
import categories from '../../data/categories.json'
import { ROUTES } from '../../constants/routes'

const CATEGORY_ICONS = {
  Laptops: Laptop,
  Headphones: Headphones,
  Smartphones: Smartphone,
  Cameras: Camera,
  Smartwatches: Watch,
  Tablets: Tablet,
  Speakers: Speaker,
  Televisions: Tv,
}

const NEED_EXAMPLES = [
  'Laptop for ML under ₹70,000',
  'Headphones for gym under ₹3,000',
  'Phone with great camera under ₹20,000',
  'Smartwatch for fitness under ₹15,000',
  'Tablet for studying under ₹30,000',
]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, user, logout } = useAuthStore()
  const cartStore = useCartStore()
  const { isSeniorMode, toggleSeniorMode } = useUIStore()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showNavSearch, setShowNavSearch] = useState(location.pathname !== '/')
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const megaRef = useRef(null)

  const isHome = location.pathname === '/'

  // Track scroll & hero search composer visibility on Home page
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)

      if (isHome) {
        const heroComposer = document.getElementById('hero-search')
        if (heroComposer) {
          const rect = heroComposer.getBoundingClientRect()
          setShowNavSearch(rect.bottom < 0)
        } else {
          setShowNavSearch(true)
        }
      } else {
        setShowNavSearch(true)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Rotate placeholder
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % NEED_EXAMPLES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Outside click for mega menu
  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`${ROUTES.SEARCH}?needQuery=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const cartCount = cartStore.totalItems ? cartStore.totalItems() : 0

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 'var(--header-h)',
          background: 'rgba(21, 10, 36, 0.92)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled ? '0 4px 24px rgba(15, 6, 26, 0.5)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="container-page h-full flex items-center gap-4 relative">
          {/* Logo */}
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="flex items-center gap-2.5 flex-shrink-0 group cursor-pointer"
            aria-label="CartIQ home"
          >
            <Logomark size={26} />
            <Wordmark variant="stage" size="text-2xl" />
          </button>

          {/* All Categories trigger (desktop) */}
          <div className="hidden md:block relative" ref={megaRef}>
            <button
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:text-white rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              onClick={() => setMegaMenuOpen((v) => !v)}
              aria-expanded={megaMenuOpen}
              aria-haspopup="true"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              All categories
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega menu */}
            {megaMenuOpen && (
              <div
                className="absolute top-full left-0 mt-3 w-[520px] rounded-[20px] overflow-hidden shadow-2xl border border-white/15 p-4 animate-fade-up z-50"
                style={{ background: 'var(--night-900)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Shop by Category</span>
                  <span className="text-xs font-semibold text-marigold-400">30 Verified Products</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat.name] || Search
                    return (
                      <button
                        key={cat.id}
                        className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10 transition-colors text-center cursor-pointer group"
                        onClick={() => {
                          navigate(`${ROUTES.SEARCH}?category=${cat.name}`)
                          setMegaMenuOpen(false)
                        }}
                      >
                        <div
                          className="w-10 h-10 arch flex items-center justify-center text-white transition-transform group-hover:scale-105"
                          style={{ background: 'rgba(181,146,255,0.18)' }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-white/90 font-medium leading-tight">{cat.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Center Smart Search Input (hidden on Home until composer scrolled past) */}
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            {showNavSearch && (
              <form onSubmit={handleSearch} role="search" className="animate-fade-up">
                <div
                  className="flex w-full items-center rounded-full overflow-hidden transition-all shadow-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  }}
                  onFocusCapture={(e) => {
                    e.currentTarget.style.background = '#FFFFFF'
                    e.currentTarget.style.borderColor = 'var(--marigold-500)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,176,32,0.3)'
                  }}
                  onBlurCapture={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="pl-3.5 flex-shrink-0">
                    <IQOrb size={22} />
                  </div>
                  <input
                    type="text"
                    aria-label="Search products"
                    placeholder={NEED_EXAMPLES[placeholderIdx]}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-medium bg-transparent text-white placeholder:text-white/60 focus:text-ink-900 focus:placeholder:text-ink-600 outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-1 text-ink-900 transition-transform hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
                    style={{ background: 'var(--marigold-500)' }}
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 ml-auto md:ml-0 flex-shrink-0">
            {/* Easy mode toggle */}
            <button
              onClick={toggleSeniorMode}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSeniorMode
                  ? 'bg-marigold-500 text-ink-900 shadow-md'
                  : 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
              aria-pressed={isSeniorMode}
              title={isSeniorMode ? 'Easy mode is active' : 'Turn on easy mode'}
            >
              <Accessibility className="w-4 h-4" />
              <span className="hidden lg:inline">{isSeniorMode ? 'Easy mode on' : 'Easy mode'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => navigate(ROUTES.CART)}
              className="relative p-2.5 text-white/80 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 font-extrabold text-[10px] rounded-full flex items-center justify-center text-white bg-hibiscus-500 shadow-sm"
                  style={{ minWidth: '18px', height: '18px', padding: '0 4px' }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Sign In */}
            {!isLoggedIn ? (
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="btn btn-primary btn-sm px-4 py-1.5 text-xs font-bold"
              >
                Sign in
              </button>
            ) : (
              <div className="relative group">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
                  aria-label="Account menu"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">{user?.name?.split(' ')[0] || 'Account'}</span>
                  <ChevronDown className="w-3 h-3 text-white/60" />
                </button>
                <div
                  className="absolute right-0 top-full mt-2 rounded-2xl shadow-2xl py-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 border border-white/15 z-50"
                  style={{ background: 'var(--night-900)' }}
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-xs font-bold text-white">{user?.name}</p>
                    <p className="text-[11px] text-white/60">{user?.email}</p>
                  </div>
                  {user?.role === 'customer' && (
                    <>
                      <button
                        onClick={() => navigate(ROUTES.ORDERS)}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Package className="w-4 h-4 text-marigold-400" /> My orders
                      </button>
                    </>
                  )}
                  {user?.role === 'seller' && (
                    <button
                      onClick={() => navigate(ROUTES.SELLER_DASHBOARD)}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-marigold-400" /> Seller dashboard
                    </button>
                  )}
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-orchid-400" /> Admin panel
                    </button>
                  )}
                  <div className="my-1 border-t border-white/10" />
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-hibiscus-500 hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 2px Sunset gradient hairline along header bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sunset opacity-80" />
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ paddingTop: 'var(--header-h)' }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative shadow-2xl p-4 animate-fade-up border-b border-white/15" style={{ background: 'var(--night-900)' }}>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Describe what you need..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field text-sm"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
                />
                <button type="submit" className="btn btn-primary px-4">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.name] || Search
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigate(`${ROUTES.SEARCH}?category=${cat.name}`)
                      setMobileMenuOpen(false)
                    }}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 text-center text-white/90"
                  >
                    <Icon className="w-4 h-4 text-marigold-400" />
                    <span className="text-[10px] leading-tight">{cat.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <button
                onClick={toggleSeniorMode}
                className={`w-full py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-2 ${
                  isSeniorMode ? 'bg-marigold-500 text-ink-900' : 'bg-white/10 text-white'
                }`}
              >
                <Accessibility className="w-4 h-4" /> Easy mode {isSeniorMode ? '(on)' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
