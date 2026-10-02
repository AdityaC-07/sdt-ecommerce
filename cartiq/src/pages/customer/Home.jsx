import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Zap, Target, CheckCircle, GraduationCap, Briefcase, Accessibility } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageWrapper from '../../components/layout/PageWrapper'
import { ROUTES } from '../../constants/routes'
import products from '../../data/products.json'
import categories from '../../data/categories.json'

const Home = () => {
  const navigate = useNavigate()
  const [smartSearchQuery, setSmartSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('bestSellers')

  const handleSmartSearch = (e) => {
    e.preventDefault()
    if (smartSearchQuery.trim()) {
      navigate(`${ROUTES.SEARCH}?needQuery=${encodeURIComponent(smartSearchQuery)}`)
    }
  }

  const handleQuickExample = (query) => {
    navigate(`${ROUTES.SEARCH}?needQuery=${encodeURIComponent(query)}`)
  }

  const handleCategoryClick = (categoryName) => {
    navigate(`${ROUTES.SEARCH}?category=${categoryName}`)
  }

  const getFeaturedProducts = () => {
    if (activeTab === 'bestSellers') {
      return products.filter((p) => p.badges.includes('Best Seller')).slice(0, 8)
    } else if (activeTab === 'topRated') {
      return products.filter((p) => p.rating >= 4.5).slice(0, 8)
    } else {
      return products.filter((p) => p.discount >= 10).slice(0, 8)
    }
  }

  return (
    <PageWrapper>
      {/* SECTION 1 - Hero */}
      <section className="bg-gradient-to-r from-[#1E3A5F] to-[#2D5986] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find exactly what you need — not just what's popular.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            CartIQ understands your needs, budget, and priorities. No more scrolling through 500 results.
          </p>

          <form onSubmit={handleSmartSearch} className="max-w-2xl mx-auto mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Wireless headphones under ₹5,000 for travel"
                value={smartSearchQuery}
                onChange={(e) => setSmartSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button type="submit" size="lg" className="bg-amber-500 hover:bg-amber-600">
                Find My Match
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3">
            {['Laptop for ML ₹70k', 'Phone under ₹20k with good camera', 'Headphones for gym under ₹3k'].map(
              (example) => (
                <button
                  key={example}
                  onClick={() => handleQuickExample(example)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                >
                  {example}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2 - How CartIQ Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-[#1E3A5F] mb-12">
            How CartIQ Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-12 h-12" />,
                title: 'Tell us what you need',
                description: 'Not just the product name — describe your use case, budget, and priorities.',
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: 'We match by your priorities',
                description: 'Our smart algorithm considers battery, budget, use case, and more.',
              },
              {
                icon: <CheckCircle className="w-12 h-12" />,
                title: 'Choose confidently',
                description: 'Transparent comparisons, trust scores, and review summaries help you decide.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  {step.icon}
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-xl text-[#1E3A5F]">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Shop by Category */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-[#1E3A5F] mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                hoverable
                onClick={() => handleCategoryClick(cat.name)}
                className="p-6 text-center"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg text-[#1E3A5F] mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500">
                  {products.filter((p) => p.category === cat.name).length} products
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold text-[#1E3A5F]">
              Featured Products
            </h2>
            <div className="flex gap-2">
              {['Best Sellers', 'Top Rated', 'Deals Today'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab.toLowerCase().replace(' ', '')
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {getFeaturedProducts().map((product) => (
              <Card key={product.id} hoverable className="overflow-hidden">
                <div className="aspect-square bg-gray-100 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="font-semibold text-[#1E3A5F] mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-[#1E3A5F]">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - Trust Banner */}
      <section className="py-12 px-4 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <CheckCircle className="w-6 h-6" />, text: 'Verified Sellers Only' },
              { icon: <Zap className="w-6 h-6" />, text: 'Transparent Reviews' },
              { icon: <Target className="w-6 h-6" />, text: 'Secure Payments' },
              { icon: <Accessibility className="w-6 h-6" />, text: 'Easy 10-day Returns' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-indigo-600">{item.icon}</div>
                <span className="font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - Persona Callouts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-[#1E3A5F] mb-12">
            Shop Your Way
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'For Students',
                description: 'Smart budget filters + student-focused specs',
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: 'For Professionals',
                description: 'Quick picks + time-saving comparison',
              },
              {
                icon: <Accessibility className="w-8 h-8" />,
                title: 'For Seniors',
                description: 'Simplified view + larger text mode',
              },
            ].map((persona, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                  {persona.icon}
                </div>
                <h3 className="font-semibold text-xl text-[#1E3A5F] mb-2">
                  {persona.title}
                </h3>
                <p className="text-gray-600 mb-4">{persona.description}</p>
                <Button variant="outline" size="sm">
                  Shop Your Way →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - Design Process Link */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
            <h2 className="font-serif text-2xl font-bold text-[#1E3A5F] mb-4">
              Learn About Our Design Thinking Journey
            </h2>
            <p className="text-gray-600 mb-6">
              Discover how CartIQ was built with empathy and purpose through our Design Thinking process.
            </p>
            <Button onClick={() => navigate(ROUTES.DESIGN_PROCESS)}>
              View Design Process →
            </Button>
          </Card>
        </div>
      </section>
    </PageWrapper>
  )
}

export default Home
