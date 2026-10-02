import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, Heart, Shield, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import Input from '../../components/ui/Input'
import useCartStore from '../../store/cartStore'
import useUIStore from '../../store/uiStore'
import { ROUTES } from '../../constants/routes'

const Cart = () => {
  const navigate = useNavigate()
  const cartStore = useCartStore()
  const { showToast } = useUIStore()
  const [couponCode, setCouponCode] = useState('')

  const items = cartStore.items
  const coupon = cartStore.coupon

  const handleQuantityChange = (productId, delta) => {
    const item = items.find((i) => i.productId === productId)
    if (item) {
      cartStore.updateQty(productId, item.quantity + delta)
    }
  }

  const handleRemoveItem = (productId) => {
    cartStore.removeItem(productId)
  }

  const handleApplyCoupon = () => {
    const result = cartStore.applyCoupon(couponCode)
    if (result.success) {
      showToast(result.message, 'success')
    } else {
      showToast(result.message, 'error')
    }
  }

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT)
  }

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate(ROUTES.HOME)}>Start Shopping</Button>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <SectionHeader title="Shopping Cart" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.productId} className="p-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[#1E3A5F]">{item.name}</h3>
                      <p className="text-sm text-gray-500">Sold by {item.seller}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.productId, -1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-semibold text-[#1E3A5F]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                      Save for Later
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Arrives by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-20">
            <h3 className="font-semibold text-lg text-[#1E3A5F] mb-4">Price Details</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Price ({items.length} items)</span>
                <span>₹{cartStore.subtotal().toLocaleString()}</span>
              </div>
              {cartStore.discount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Product Discounts</span>
                  <span>-₹{cartStore.discount().toLocaleString()}</span>
                </div>
              )}
              {coupon && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{cartStore.discount().toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-[#1E3A5F]">
                <span>Total</span>
                <span>₹{cartStore.total().toLocaleString()}</span>
              </div>
            </div>

            {/* Coupon Input */}
            <div className="mb-4">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                variant="outline"
                fullWidth
                size="sm"
                onClick={handleApplyCoupon}
                className="mt-2"
              >
                Apply Coupon
              </Button>
            </div>

            {cartStore.discount() > 0 && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">
                  Total Savings: ₹{cartStore.discount().toLocaleString()}
                </p>
              </div>
            )}

            <Button fullWidth size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>

            {/* Trust Badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>100% Authentic</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Cart
