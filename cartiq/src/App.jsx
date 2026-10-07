import { useEffect } from 'react'
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Toast from './components/ui/Toast'
import SeniorModeOverlay from './components/features/SeniorModeOverlay'
import ErrorBoundary from './components/common/ErrorBoundary'

import Home from './pages/customer/Home'
import ProductList from './pages/customer/ProductList'
import ProductDetail from './pages/customer/ProductDetail'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import OrderHistory from './pages/customer/OrderHistory'
import OrderTracking from './pages/customer/OrderTracking'
import Profile from './pages/customer/Profile'
import ProductComparison from './pages/customer/ProductComparison'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import SellerDashboard from './pages/seller/SellerDashboard'
import ProductListing from './pages/seller/ProductListing'
import ProductForm from './pages/seller/ProductForm'
import InventoryManager from './pages/seller/InventoryManager'
import SellerOrders from './pages/seller/SellerOrders'

import AdminDashboard from './pages/admin/AdminDashboard'
import UserManager from './pages/admin/UserManager'
import ProductManager from './pages/admin/ProductManager'
import ReviewModeration from './pages/admin/ReviewModeration'

import DesignProcess from './pages/DesignProcess'
import CaseStudy from './pages/info/CaseStudy'
import NotFound from './pages/errors/NotFound'

import useCartStore from './store/cartStore'
import useAuthStore from './store/authStore'
import useUIStore from './store/uiStore'

function DemoResetHandler() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { clearCart } = useCartStore()
  const { logout } = useAuthStore()
  const { showToast, resetFilters } = useUIStore()

  useEffect(() => {
    if (searchParams.get('demo') === 'reset') {
      clearCart()
      logout()
      if (resetFilters) resetFilters()
      localStorage.removeItem('cart-storage')
      localStorage.removeItem('auth-storage')
      showToast('Demo reset: Cart, orders, and session cleared', 'info')
      navigate('/', { replace: true })
    }
  }, [searchParams, navigate, clearCart, logout, resetFilters, showToast])

  return null
}

function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <DemoResetHandler />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.SEARCH} element={<ProductList />} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            <Route path={ROUTES.ORDERS} element={<OrderHistory />} />
            <Route path={ROUTES.ORDER_TRACKING} element={<OrderTracking />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.COMPARE} element={<ProductComparison />} />

            <Route path={ROUTES.SELLER_DASHBOARD} element={<SellerDashboard />} />
            <Route path={ROUTES.SELLER_PRODUCTS} element={<ProductListing />} />
            <Route path={ROUTES.SELLER_ADD_PRODUCT} element={<ProductForm />} />
            <Route path={ROUTES.SELLER_EDIT_PRODUCT} element={<ProductForm />} />
            <Route path={ROUTES.SELLER_INVENTORY} element={<InventoryManager />} />
            <Route path={ROUTES.SELLER_ORDERS} element={<SellerOrders />} />

            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN_USERS} element={<UserManager />} />
            <Route path={ROUTES.ADMIN_PRODUCTS} element={<ProductManager />} />
            <Route path={ROUTES.ADMIN_REVIEWS} element={<ReviewModeration />} />

            <Route path={ROUTES.DESIGN_PROCESS} element={<DesignProcess />} />
            <Route path={ROUTES.CASE_STUDY} element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
        <SeniorModeOverlay />
      </div>
    </ErrorBoundary>
  )
}

export default App
