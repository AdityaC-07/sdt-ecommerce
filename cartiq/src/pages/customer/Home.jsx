import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, CheckCircle, GraduationCap, Briefcase, Accessibility,
  Laptop, Headphones, Smartphone, Camera, Watch, Tablet, Speaker, Tv,
  ShieldCheck, BadgeCheck, MessageSquareText, RotateCcw, Star, Sparkles,
  ArrowRight, Heart, ShoppingCart, Check, RefreshCw, Filter, Layers, Zap
} from 'lucide-react'
import useUIStore from '../../store/uiStore'
import useCartStore from '../../store/cartStore'
import ProductFrame from '../../components/ui/ProductFrame'
import IQOrb from '../../components/brand/IQOrb'
import Wordmark from '../../components/brand/Wordmark'
import ProductCard from '../../components/features/ProductCard'
import useNeedSearch from '../../hooks/useNeedSearch'
import { ROUTES } from '../../constants/routes'
import products from '../../data/products.json'
import categories from '../../data/categories.json'

/* ── Helpers ──────────────────────────────────────────── */
const HERO_CHIPS = [
  { label: 'Laptop for ML ₹70k', q: 'Laptop for ML under ₹70,000' },
  { label: 'Phone under ₹20k · great cam', q: 'Phone under ₹20,000 with great camera' },
  { label: 'Headphones for gym ₹3k', q: 'Headphones for gym under ₹3,000' },
  { label: 'Smartwatch for fitness ₹15k', q: 'Smartwatch for fitness under ₹15,000' },
]

const CATEGORY_COLORS = {
  Laptops: '#B592FF',
  Headphones: '#FF2E63',
  Smartphones: '#FFB020',
  Cameras: '#FF7A3D',
  Smartwatches: '#B8E65C',
  Tablets: '#FFD66B',
  Speakers: '#FF9ECD',
  Televisions: '#7CF2D4',
}

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

const formatPrice = (n) => `₹${Number(n).toLocaleString('en-IN')}`

/* ── Section 1: Hero v2 (Money Shot) ─────────────────── */
function HeroSection({ onSearch }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activePresetQuery, setActivePresetQuery] = useState('Laptop for ML under ₹70,000')
  const [phIdx, setPhIdx] = useState(0)

  // Need search hook for live right-column match preview
  const { results: matchResults } = useNeedSearch(query || activePresetQuery)

  // Rotating placeholder
  useEffect(() => {
    const timer = setInterval(() => {
      setPhIdx((i) => (i + 1) % HERO_CHIPS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch(query)
  }

  const previewMatches = (matchResults?.length > 0 ? matchResults : products).slice(0, 3)

  return (
    <section
      className="stage-blobs grain-overlay relative overflow-hidden text-white min-h-[82vh] flex items-center"
      style={{
        background: 'var(--night-950)',
        paddingTop: 'calc(var(--header-h) + 2.5rem)',
        paddingBottom: '4rem',
      }}
      aria-label="Hero section"
    >
      {/* Horizon Sunset Glow Radial Gradient at bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] pointer-events-none opacity-40 blur-3xl rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,46,99,0.5) 0%, rgba(255,122,61,0.3) 45%, rgba(255,176,32,0.15) 75%, transparent 100%)',
        }}
      />

      <div className="container-page relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7/12) */}
          <div className="lg:col-span-7">
            {/* Live Data Pill */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold backdrop-blur-md animate-fade-up"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <IQOrb size={18} />
              <span>96 products · 1,200 reviews read for you</span>
            </div>

            {/* Hero Headline with balanced wrap */}
            <h1
              className="font-display font-extrabold text-white mb-5 animate-fade-up leading-[1.05]"
              style={{
                fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
                letterSpacing: '-0.02em',
                textWrap: 'balance',
              }}
            >
              Say what you need.{' '}
              <span
                style={{
                  background: 'var(--sunset)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                We'll match what fits.
              </span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
              Describe your budget and priorities in plain English. CartIQ ranks by specs, reviews and value, and shows its working.
            </p>

            {/* Composer Input (White Pill) */}
            <form onSubmit={handleSubmit} className="mb-6 animate-fade-up">
              <div
                className="flex items-center rounded-full p-1.5 bg-white shadow-2xl transition-all"
                style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,176,32,0.25)' }}
              >
                <div className="pl-3.5 flex-shrink-0">
                  <IQOrb size={26} />
                </div>
                <input
                  id="hero-search"
                  type="text"
                  aria-label="Describe what you need"
                  placeholder={HERO_CHIPS[phIdx].q}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    if (e.target.value.trim()) setActivePresetQuery(e.target.value)
                  }}
                  className="flex-1 px-3 py-3 bg-transparent text-sm sm:text-base font-medium text-ink-900 placeholder:text-ink-600 outline-none min-w-0"
                />
                <button
                  type="submit"
                  id="hero-search-btn"
                  className="btn btn-primary px-6 py-3 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg flex-shrink-0"
                >
                  <Search className="w-4 h-4" />
                  Find matches
                </button>
              </div>
            </form>

            {/* Scrollable Example Chips in single row */}
            <div className="flex items-center gap-2 overflow-x-auto scroll-hidden pb-1">
              <span className="text-xs text-white/50 flex-shrink-0 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-marigold-400" /> Try:
              </span>
              {HERO_CHIPS.map(({ label, q }) => (
                <button
                  key={label}
                  onClick={() => {
                    setQuery(q)
                    setActivePresetQuery(q)
                    onSearch(q)
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-white/10 hover:bg-white/20 text-white/90 border border-white/15 transition-colors cursor-pointer flex-shrink-0"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (5/12): Live Match Preview Stack */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-orchid-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Live Match Preview
              </span>
              <span className="text-[11px] text-white/60 font-medium">Updated live</span>
            </div>

            <div className="space-y-3">
              {previewMatches.map((product, idx) => {
                const matchScore = Math.min(98, 96 - idx * 4)
                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(ROUTES.PRODUCT_DETAIL.replace(':id', product.id))}
                    className="group relative flex items-center gap-3.5 p-3 rounded-[20px] bg-white/10 hover:bg-white/15 border border-white/15 transition-all shadow-xl backdrop-blur-md cursor-pointer transform hover:-translate-y-0.5"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {/* Arch Thumbnail */}
                    <div className="w-16 h-20 flex-shrink-0 relative">
                      <ProductFrame product={product} size="thumb" />
                      <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orchid-600 text-white shadow-xs">
                        {matchScore}%
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white/60 font-medium uppercase tracking-wider">{product.brand}</p>
                      <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-marigold-400 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-lime-500 font-semibold mt-0.5 line-clamp-1">
                        ✓ Within budget · {product.specs ? Object.values(product.specs)[0] : 'Top spec'}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-extrabold text-sm text-white num">{formatPrice(product.price)}</span>
                        <span className="text-[11px] text-marigold-400 font-bold group-hover:underline flex items-center gap-0.5">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Thin block-print pattern divider along bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orchid-400 via-hibiscus-500 to-marigold-400 opacity-60" />
    </section>
  )
}

/* ── Section 2: Trust Strip (D1.2 / D2.5) ───────────── */
function TrustSection() {
  const items = [
    { icon: ShieldCheck, label: 'Pay securely', sub: 'UPI, cards, net banking and pay on delivery' },
    { icon: BadgeCheck, label: 'Verified sellers', sub: 'Every seller is identity-checked' },
    { icon: MessageSquareText, label: 'Reviews summarized', sub: 'Pros and cons from thousands of buyers' },
    { icon: RotateCcw, label: '10-day returns', sub: 'Free pickup on eligible items' },
  ]

  return (
    <section className="py-10 border-y border-black/8" style={{ background: 'var(--shelf-50)' }} aria-label="Trust promises">
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3.5">
              {/* Warm arch tile in marigold-100 background with ink glyph */}
              <div
                className="w-11 h-11 arch flex items-center justify-center flex-shrink-0 shadow-xs"
                style={{ background: '#FFF3D6', color: 'var(--ink-900)' }}
              >
                <Icon className="w-5 h-5 text-ink-900" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink-900 leading-snug">{label}</p>
                <p className="text-xs text-ink-600 leading-relaxed mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 3: "See how IQ decides" (Watch IQ Think) (D3.1) ── */
function WatchIQThinkSection({ onSearch }) {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s % 3) + 1)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 stage-blobs grain-overlay relative text-white" style={{ background: 'var(--night-950)' }} aria-label="How IQ decides">
      <div className="container-page relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orchid-600/30 text-orchid-400 border border-orchid-500/30 mb-3">
            <IQOrb size={16} /> Transparent Intelligence
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
            See how IQ decides
          </h2>
          <p className="text-white/80 text-base">
            Watch CartIQ parse intent, eliminate bad fits, and rank recommendations transparently.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Interactive prompt + steps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 rounded-[20px] bg-white/10 border border-white/15 backdrop-blur-md">
              <p className="text-xs text-white/60 font-semibold mb-1">USER QUERY</p>
              <p className="font-bold text-base text-white">"Laptop for coding under ₹70,000, light enough to carry"</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orchid-600 text-white">Category: Laptops</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-marigold-500 text-ink-900">Budget: ≤ ₹70k</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-hibiscus-500 text-white">Priority: Lightweight</span>
              </div>
            </div>

            {/* Steps indicator */}
            <div className="space-y-3">
              {[
                { n: 1, title: 'Parse query constraints', desc: 'Identified category, upper budget bound, and portability priority' },
                { n: 2, title: 'Filter non-matching specs', desc: 'Eliminated over-budget models (>₹70k) and heavy laptops (>1.9kg)' },
                { n: 3, title: 'Rank & explain matches', desc: 'Scored remaining candidates on value, battery, and buyer reviews' },
              ].map((s) => (
                <button
                  key={s.n}
                  onClick={() => setStep(s.n)}
                  className={`w-full text-left p-4 rounded-[20px] transition-all flex items-start gap-3 border cursor-pointer ${
                    step === s.n
                      ? 'bg-white/15 border-marigold-500 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                      step === s.n ? 'bg-marigold-500 text-ink-900' : 'bg-white/20 text-white'
                    }`}
                  >
                    {s.n}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{s.title}</h4>
                    <p className="text-xs text-white/70 mt-0.5">{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Mini candidate evaluation list */}
          <div className="lg:col-span-7 p-6 rounded-[20px] bg-white/10 border border-white/15 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2">
              <span className="text-xs font-bold text-white/80">CANDIDATE EVALUATION</span>
              <span className="text-xs font-semibold text-marigold-400">Step {step} of 3</span>
            </div>

            {/* Candidate 1: Dell XPS 15 (Winner) */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/10 border border-lime-500/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orchid-600 text-white font-extrabold text-xs flex items-center justify-center">
                  96%
                </span>
                <div>
                  <p className="font-bold text-sm text-white">Dell XPS 15</p>
                  <p className="text-xs text-lime-400">✓ ₹68,999 · 1.8kg · 16GB RAM</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-lime-500 text-lime-800">Top Match</span>
            </div>

            {/* Candidate 2: HP Spectre (Over budget filter step) */}
            <div
              className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                step >= 2 ? 'opacity-40 bg-white/5 border border-red-500/30' : 'bg-white/10 border border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 text-white/70 font-extrabold text-xs flex items-center justify-center">
                  {step >= 2 ? 'X' : '72%'}
                </span>
                <div>
                  <p className="font-bold text-sm text-white">HP Pavilion 15</p>
                  <p className="text-xs text-white/60">₹74,999 · 2.1kg</p>
                </div>
              </div>
              {step >= 2 ? (
                <span className="text-xs text-red-400 font-bold">Filtered out: Over budget</span>
              ) : (
                <span className="text-xs text-white/60">Evaluating...</span>
              )}
            </div>

            {/* Candidate 3: ASUS ROG (Heavy filter step) */}
            <div
              className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                step >= 2 ? 'opacity-40 bg-white/5 border border-red-500/30' : 'bg-white/10 border border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 text-white/70 font-extrabold text-xs flex items-center justify-center">
                  {step >= 2 ? 'X' : '64%'}
                </span>
                <div>
                  <p className="font-bold text-sm text-white">ASUS ROG Strix</p>
                  <p className="text-xs text-white/60">₹65,000 · 2.4kg</p>
                </div>
              </div>
              {step >= 2 ? (
                <span className="text-xs text-red-400 font-bold">Filtered out: 2.4kg too heavy</span>
              ) : (
                <span className="text-xs text-white/60">Evaluating...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 4: "Shop by aisle" (Category Aisles) (D2.4) ── */
function ShopByAisleSection({ onCategoryClick }) {
  return (
    <section className="py-20" style={{ background: 'var(--shelf-50)' }} aria-label="Shop by aisle">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-orchid-600 uppercase tracking-wider block mb-1">Curated Aisles</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">
              Shop by aisle
            </h2>
            <p className="text-sm text-ink-600 mt-1">Every product is spec-checked and trust-scored</p>
          </div>
        </div>

        {/* Tiles with tall ARCH aspect (3:4) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.slice(0, 5).map((cat) => {
            const catColor = CATEGORY_COLORS[cat.name] || '#B592FF'
            const catProducts = products.filter((p) => p.category === cat.name)
            const minPrice = catProducts.length > 0 ? Math.min(...catProducts.map((p) => p.price)) : 2999
            const sampleProduct = catProducts[0] || products[0]

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.name)}
                className="group relative flex flex-col items-center justify-between p-5 rounded-[20px] text-center transition-all duration-300 cursor-pointer overflow-hidden border border-black/8 hover:border-black/20 shadow-xs hover:shadow-xl hover:-translate-y-1.5"
                style={{
                  background: `linear-gradient(180deg, ${catColor}20 0%, #FFFFFF 80%)`,
                }}
              >
                {/* Arch image frame */}
                <div className="w-full aspect-[4/5] mb-4 relative flex items-center justify-center">
                  <ProductFrame product={sampleProduct} size="card" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-ink-900 group-hover:text-orchid-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-black/10 text-ink-600 shadow-xs">
                    {catProducts.length || 12} products · from {formatPrice(minPrice)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Section 5: Picked for you (Featured Grid) (D1.3/D1.4) ── */
function FeaturedSection({ onProductClick }) {
  const [tab, setTab] = useState('bestSellers')

  const TABS = [
    { key: 'bestSellers', label: 'Best sellers' },
    { key: 'topRated', label: 'Top rated' },
    { key: 'deals', label: 'Deals today' },
  ]

  const getProducts = () => {
    if (tab === 'bestSellers') return products.filter((p) => p.badges?.includes('Best Seller')).slice(0, 8)
    if (tab === 'topRated') return products.filter((p) => p.rating >= 4.3).slice(0, 8)
    return products.filter((p) => p.discount >= 7).slice(0, 8)
  }

  const featured = getProducts()

  return (
    <section className="py-20" style={{ background: 'var(--shelf-0)' }} aria-label="Picked for you">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">
              Picked for you
            </h2>
            <p className="text-sm text-ink-600 mt-1">Verified by real customer ratings and trust metrics</p>
          </div>

          {/* Tab buttons (Pill shaped) */}
          <div className="flex gap-2 p-1.5 rounded-full bg-shelf-50 border border-black/8" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  tab === t.key
                    ? 'bg-night-950 text-white shadow-sm'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 6: Departure-board Deals (D3.2) ──────────── */
function DepartureDealsSection({ onProductClick }) {
  const [now, setNow] = useState(new Date())
  const cartStore = useCartStore()

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const diff = Math.max(0, midnight - now)
  const h = String(Math.floor(diff / 3_600_000)).padStart(2, '0')
  const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, '0')
  const s = String(Math.floor((diff % 60_000) / 1_000)).padStart(2, '0')

  const dealProducts = products.filter((p) => p.discount >= 7).slice(0, 5)

  return (
    <section className="py-20 stage-blobs grain-overlay relative text-white" style={{ background: 'var(--night-950)' }} aria-label="Today's deals">
      <div className="container-page relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-hibiscus-500/20 border border-hibiscus-500/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-hibiscus-500 animate-ping" />
              <span className="text-xs font-bold uppercase text-hibiscus-500 tracking-wider">Departure Board Deals</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Today's deals
            </h2>
          </div>

          {/* Flip countdown display */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full">
            <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">Time left:</span>
            <div className="flex items-center gap-1 font-mono font-extrabold text-lg text-marigold-400 num">
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-white/10">{h}</span>:
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-white/10">{m}</span>:
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-white/10">{s}</span>
            </div>
          </div>
        </div>

        {/* Departure board list table/cards */}
        <div className="space-y-3">
          {dealProducts.map((p) => {
            const originalPrice = p.originalPrice || Math.round(p.price / (1 - p.discount / 100))
            return (
              <div
                key={p.id}
                onClick={() => onProductClick(p.id)}
                className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[20px] bg-white/8 hover:bg-white/15 border border-white/12 transition-all backdrop-blur-md cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-14 h-16 flex-shrink-0">
                    <ProductFrame product={p} size="thumb" />
                  </div>
                  <div>
                    <span className="text-xs text-white/60 font-medium uppercase">{p.brand}</span>
                    <h4 className="font-bold text-base text-white group-hover:text-marigold-400 transition-colors line-clamp-1">
                      {p.name}
                    </h4>
                    <span className="inline-block mt-1 text-xs font-extrabold text-hibiscus-500 bg-hibiscus-500/20 px-2 py-0.5 rounded-full">
                      {p.discount}% OFF
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <div className="text-right">
                    <p className="font-extrabold text-lg text-white num">{formatPrice(p.price)}</p>
                    <p className="text-xs text-white/50 line-through num">{formatPrice(originalPrice)}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      cartStore.addItem(p, 1)
                    }}
                    className="btn btn-primary px-5 py-2 text-xs font-bold shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Grab deal
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Section 7: No-surprise thermal receipt (D3.3) ────── */
function NoSurpriseReceiptSection() {
  const [isCod, setIsCod] = useState(false)

  return (
    <section className="py-20" style={{ background: 'var(--shelf-50)' }} aria-label="No surprise pricing">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold text-orchid-600 uppercase tracking-wider block mb-2">Price Transparency</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 mb-4">
              See every rupee before you pay
            </h2>
            <p className="text-ink-600 text-base leading-relaxed mb-6">
              No last-second convenience charges, handling fees, or hidden taxes at checkout. What you see is what you pay.
            </p>

            {/* COD toggle */}
            <div className="inline-flex items-center gap-3 p-3 rounded-full bg-white border border-black/10 shadow-xs">
              <span className="text-xs font-semibold text-ink-900 pl-2">Simulate Cash on Delivery:</span>
              <button
                onClick={() => setIsCod(!isCod)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isCod ? 'bg-marigold-500 text-ink-900' : 'bg-black/5 text-ink-600'
                }`}
              >
                {isCod ? 'COD enabled (+₹40 handling)' : 'Online payment (Free)'}
              </button>
            </div>
          </div>

          {/* Right Column: Thermal receipt card */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className="w-full max-w-md p-6 rounded-2xl bg-[#FFFDF8] border border-black/10 shadow-2xl relative rotate-1"
              style={{
                fontFamily: 'Figtree, system-ui',
                backgroundImage: 'radial-gradient(#E8E0D5 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            >
              <div className="text-center pb-4 mb-4 border-b border-dashed border-black/20">
                <Wordmark variant="shelf" size="text-xl" />
                <p className="text-xs text-ink-600 font-mono mt-1">ESTIMATE RECEIPT #88492</p>
              </div>

              <div className="space-y-2 text-xs text-ink-900 font-medium mb-4">
                <div className="flex justify-between">
                  <span>Dell XPS 15 (16GB RAM)</span>
                  <span className="num font-bold">₹68,999</span>
                </div>
                <div className="flex justify-between text-hibiscus-500">
                  <span>Product discount (7% off)</span>
                  <span className="num font-bold">-₹6,000</span>
                </div>
                <div className="flex justify-between text-lime-800">
                  <span>Coupon SAVE10 applied</span>
                  <span className="num font-bold">-₹6,899</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Delivery charges</span>
                  <span className="font-bold text-lime-800">FREE</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>GST (18% included)</span>
                  <span className="font-bold">₹0 extra</span>
                </div>
                {isCod && (
                  <div className="flex justify-between text-marigold-600 font-bold">
                    <span>COD handling fee</span>
                    <span className="num">+₹40</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t-2 border-black/80 flex justify-between items-baseline font-bold text-ink-900 text-lg">
                <span>TOTAL YOU PAY:</span>
                <span className="num text-xl">{formatPrice(68999 - 6899 + (isCod ? 40 : 0))}</span>
              </div>

              <div className="mt-3 p-2 rounded-xl bg-lime-50 border border-lime-200 text-center">
                <p className="text-xs font-bold text-lime-800">You saved ₹12,899 on this order!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 8: "Shop through your lens" (Personas) (D3.4) ─ */
function LensCardsSection({ onSearch, onEasyMode }) {
  const navigate = useNavigate()

  const personas = [
    {
      icon: GraduationCap,
      bg: 'var(--orchid-600)',
      title: 'Student lens',
      desc: 'Budget slider pinned under ₹50,000 with priority value scores.',
      cta: 'See student picks',
      action: () => navigate(`${ROUTES.SEARCH}?preset=student`),
    },
    {
      icon: Briefcase,
      bg: 'var(--marigold-500)',
      title: 'Professional lens',
      desc: 'Quick 3-product shortlist evaluated by battery life & build quality.',
      cta: 'Get 3 quick picks',
      action: () => onSearch('Best laptop for professional work'),
    },
    {
      icon: Accessibility,
      bg: 'var(--lime-800)',
      title: 'Easy mode',
      desc: 'High-contrast text, larger targets, simplified step-by-step navigation.',
      cta: 'Turn on Easy mode',
      action: onEasyMode,
    },
  ]

  return (
    <section className="py-20" style={{ background: 'var(--shelf-0)' }} aria-label="Shop through your lens">
      <div className="container-page">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">
            Shop through your lens
          </h2>
          <p className="text-sm text-ink-600 mt-2">Tailored interfaces and parameters for your specific shopping goal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map(({ icon: Icon, bg, title, desc, cta, action }) => (
            <div
              key={title}
              className="rounded-[20px] p-6 bg-white border border-black/8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 arch flex items-center justify-center mb-4 text-white shadow-sm"
                  style={{ background: bg }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-ink-900 mb-2">{title}</h3>
                <p className="text-xs text-ink-600 leading-relaxed mb-6">{desc}</p>
              </div>

              <button
                onClick={action}
                className="btn btn-primary w-full py-3 text-xs font-bold shadow-sm hover:shadow-md"
              >
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══ Main Home Component ══════════════════════════════ */
const Home = () => {
  const navigate = useNavigate()
  const { isSeniorMode, toggleSeniorMode } = useUIStore()

  const handleSearch = (query) => {
    if (query.trim()) navigate(`${ROUTES.SEARCH}?needQuery=${encodeURIComponent(query)}`)
  }

  const handleCategoryClick = (categoryName) => {
    navigate(`${ROUTES.SEARCH}?category=${categoryName}`)
  }

  const handleProductClick = (productId) => {
    navigate(ROUTES.PRODUCT_DETAIL.replace(':id', productId))
  }

  // Sync easy-mode class on HTML element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('easy-mode', isSeniorMode)
    }
  }, [isSeniorMode])

  return (
    <div id="main-content">
      <HeroSection onSearch={handleSearch} />
      <TrustSection />
      <WatchIQThinkSection onSearch={handleSearch} />
      <ShopByAisleSection onCategoryClick={handleCategoryClick} />
      <FeaturedSection onProductClick={handleProductClick} />
      <DepartureDealsSection onProductClick={handleProductClick} />
      <NoSurpriseReceiptSection />
      <LensCardsSection onSearch={handleSearch} onEasyMode={toggleSeniorMode} />
    </div>
  )
}

export default Home
