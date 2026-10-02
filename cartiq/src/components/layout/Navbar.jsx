import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, Heart, User, Zap, Accessibility, Mic } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useCartStore from '../../store/cartStore'
import useUIStore from '../../store/uiStore'
import categories from '../../data/categories.json'
import { ROUTES } from '../../constants/routes'

const Navbar = () => {
  const navigate = useNavigate()
  const { isLoggedIn, user, logout } = useAuthStore()
  const cartStore = useCartStore()
  const { isSeniorMode, toggleSeniorMode } = useUIStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchType, setSearchType] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (searchType === 'name') {
        navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery)}`)
      } else {
        navigate(`${ROUTES.SEARCH}?needQuery=${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left section - Logo and Categories */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(ROUTES.HOME)}
            >
              <Zap className="w-6 h-6 text-amber-500" />
              <span className="font-serif text-2xl font-bold text-[#1E3A5F]">
                CartIQ
              </span>
            </div>

            <div
              className="hidden md:block relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button className="text-gray-700 hover:text-[#1E3A5F] font-medium">
                Categories
              </button>
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 grid grid-cols-5 gap-4 min-w-[600px]">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`${ROUTES.SEARCH}?category=${cat.name}`)}
                    >
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <Search className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-amber-500">
                <div className="flex border-r border-gray-300">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      searchType === 'name'
                        ? 'bg-[#1E3A5F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSearchType('name')}
                  >
                    By Name
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      searchType === 'need'
                        ? 'bg-[#1E3A5F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSearchType('need')}
                  >
                    By Need
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={
                    searchType === 'name'
                      ? 'Search products...'
                      : 'e.g. Laptop for coding under ₹70,000'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 outline-none"
                />
                {isSeniorMode && (
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-500 hover:text-[#1E3A5F]"
                    title="Voice search coming soon"
                    onClick={() => alert('Voice search coming soon — for now, type your need in the search box.')}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="hidden sm:block px-4 py-2 text-[#1E3A5F] font-medium hover:text-amber-500 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded-full font-medium hover:bg-[#2D5986] transition-colors"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                {user.role === 'customer' && (
                  <>
                    <button className="p-2 text-gray-700 hover:text-red-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => navigate(ROUTES.CART)}
                      className="p-2 text-gray-700 hover:text-amber-500 transition-colors relative"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {cartStore.totalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                          {cartStore.totalItems()}
                        </span>
                      )}
                    </button>
                  </>
                )}
                {user.role === 'seller' && (
                  <button
                    onClick={() => navigate(ROUTES.SELLER_DASHBOARD)}
                    className="px-4 py-2 text-[#1E3A5F] font-medium hover:text-amber-500 transition-colors"
                  >
                    Seller Dashboard
                  </button>
                )}
                {user.role === 'admin' && (
                  <button
                    onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
                    className="px-4 py-2 text-[#1E3A5F] font-medium hover:text-amber-500 transition-colors"
                  >
                    Admin Panel
                  </button>
                )}
                <div className="relative group">
                  <button className="p-2 text-gray-700 hover:text-amber-500 transition-colors">
                    <User className="w-6 h-6" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {user.role === 'customer' && (
                      <>
                        <button
                          onClick={() => navigate(ROUTES.PROFILE)}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => navigate(ROUTES.ORDERS)}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          My Orders
                        </button>
                      </>
                    )}
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Senior Mode Toggle */}
            <button
              onClick={toggleSeniorMode}
              className={`p-2 rounded-full transition-colors ${
                isSeniorMode
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Toggle Senior Mode"
            >
              <Accessibility className="w-6 h-6" />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
                    searchType === 'name'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSearchType('name')}
                >
                  By Name
                </button>
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
                    searchType === 'need'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSearchType('need')}
                >
                  By Need
                </button>
              </div>
              <input
                type="text"
                placeholder={
                  searchType === 'name'
                    ? 'Search products...'
                    : 'e.g. Laptop for coding under ₹70,000'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`${ROUTES.SEARCH}?category=${cat.name}`)}
                className="text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
