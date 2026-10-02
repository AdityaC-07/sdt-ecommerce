import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, CreditCard, Smartphone, Building2, IndianRupee } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import Input from '../../components/ui/Input'
import useCartStore from '../../store/cartStore'
import useAuthStore from '../../store/authStore'
import useUIStore from '../../store/uiStore'
import { ROUTES } from '../../constants/routes'

const Checkout = () => {
  const navigate = useNavigate()
  const cartStore = useCartStore()
  const { user } = useAuthStore()
  const { isSeniorMode } = useUIStore()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Address
    fullName: user?.name || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    saveAddress: false,
    // Payment
    paymentMethod: 'upi',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    bankName: '',
  })

  const items = cartStore.items

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setStep(3)
      cartStore.clearCart()
    }, 2000)
  }

  const handleTrackOrder = () => {
    navigate(ROUTES.ORDERS)
  }

  const handleContinueShopping = () => {
    navigate(ROUTES.HOME)
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

  // Senior mode: simplified 2-step checkout
  const isSimplified = isSeniorMode

  const handleSimplifiedSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setStep(3)
      cartStore.clearCart()
    }, 2000)
  }

  return (
    <PageWrapper>
      <SectionHeader title="Checkout" />

      {/* Step Indicator */}
      {!isSimplified && (
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step > s ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Senior mode step indicator */}
      {isSimplified && step < 3 && (
        <div className="flex items-center justify-center mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 2 && (
                <div
                  className={`w-24 h-1 mx-2 ${
                    step > s ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Simplified Mode: Address + Payment on one page */}
          {isSimplified && step === 1 && (
            <Card className="p-6">
              <h3 className="font-semibold text-xl text-[#1E3A5F] mb-6">
                Delivery Address & Payment
              </h3>
              <form onSubmit={handleSimplifiedSubmit} className="space-y-6">
                {/* Address Section */}
                <div className="border-b pb-6">
                  <h4 className="font-semibold text-lg text-[#1E3A5F] mb-4">Address</h4>
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="10-digit phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                    <Input
                      label="Address Line 1"
                      placeholder="House number, street, area"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                      <Input
                        label="Pincode"
                        type="text"
                        placeholder="6-digit pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div>
                  <h4 className="font-semibold text-lg text-[#1E3A5F] mb-4">Payment</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'upi', label: 'UPI', icon: <Smartphone className="w-5 h-5" /> },
                      { id: 'cod', label: 'Cash on Delivery', icon: <IndianRupee className="w-5 h-5" /> },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.paymentMethod === method.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === method.id}
                          onChange={() => handleInputChange('paymentMethod', method.id)}
                          className="w-4 h-4"
                        />
                        <div className="text-indigo-600">{method.icon}</div>
                        <span className="font-medium">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {formData.paymentMethod === 'upi' && (
                    <Input
                      label="UPI ID"
                      placeholder="yourname@upi"
                      value={formData.upiId}
                      onChange={(e) => handleInputChange('upiId', e.target.value)}
                      required
                      className="mt-4"
                    />
                  )}

                  <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg mt-4">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700">
                      Your payment is 100% secure
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  Place Order - ₹{cartStore.total().toLocaleString()}
                </Button>
              </form>
            </Card>
          )}

          {/* Normal Mode: Step 1 - Address */}
          {!isSimplified && step === 1 && (
            <Card className="p-6">
              <h3 className="font-semibold text-xl text-[#1E3A5F] mb-6">
                Delivery Address
              </h3>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="10-digit phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
                <Input
                  label="Address Line 1"
                  placeholder="House number, street, area"
                  value={formData.addressLine1}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  required
                />
                <Input
                  label="Address Line 2"
                  placeholder="Apartment, floor, landmark (optional)"
                  value={formData.addressLine2}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Pincode"
                  type="text"
                  placeholder="6-digit pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  required
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.saveAddress}
                    onChange={(e) => handleInputChange('saveAddress', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">Save this address</span>
                </label>
                <Button type="submit" size="lg" fullWidth>
                  Continue to Payment
                </Button>
              </form>
            </Card>
          )}

          {/* Normal Mode: Step 2 - Payment */}
          {!isSimplified && step === 2 && (
            <Card className="p-6">
              <h3 className="font-semibold text-xl text-[#1E3A5F] mb-6">
                Payment Method
              </h3>
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-3">
                  {[
                    { id: 'upi', label: 'UPI', icon: <Smartphone className="w-5 h-5" /> },
                    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
                    { id: 'netbanking', label: 'Net Banking', icon: <Building2 className="w-5 h-5" /> },
                    { id: 'cod', label: 'Cash on Delivery', icon: <IndianRupee className="w-5 h-5" /> },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === method.id}
                        onChange={() => handleInputChange('paymentMethod', method.id)}
                        className="w-4 h-4"
                      />
                      <div className="text-indigo-600">{method.icon}</div>
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === 'upi' && (
                  <Input
                    label="UPI ID"
                    placeholder="yourname@upi"
                    value={formData.upiId}
                    onChange={(e) => handleInputChange('upiId', e.target.value)}
                    required
                  />
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <Input
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        required
                      />
                      <Input
                        label="CVV"
                        type="password"
                        placeholder="123"
                        value={formData.cardCvv}
                        onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <select
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                )}

                <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700">
                    Your payment is 100% secure
                  </span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  Pay ₹{cartStore.total().toLocaleString()}
                </Button>
              </form>
            </Card>
          )}

          {/* Order Success */}
          {step === 3 && (
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1E3A5F] mb-2">
                Order Placed Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Order ID: ORD{Math.floor(Math.random() * 100000)}
              </p>
              <p className="text-gray-600 mb-6">
                Estimated delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleTrackOrder}>Track Your Order</Button>
                <Button variant="outline" onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-20">
            <h3 className="font-semibold text-lg text-[#1E3A5F] mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E3A5F] line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-[#1E3A5F]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartStore.subtotal().toLocaleString()}</span>
              </div>
              {cartStore.discount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{cartStore.discount().toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-[#1E3A5F] text-lg">
                <span>Total</span>
                <span>₹{cartStore.total().toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Checkout
