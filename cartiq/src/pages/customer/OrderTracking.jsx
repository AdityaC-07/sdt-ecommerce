import { useParams } from 'react-router-dom'
import { Check, Package, RotateCcw, MessageCircle, Star } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import ProgressBar from '../../components/ui/ProgressBar'
import orders from '../../data/orders.json'

const OrderTracking = () => {
  const { id } = useParams()
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Order not found</h2>
        </div>
      </PageWrapper>
    )
  }

  const currentStep = order.trackingSteps.findIndex((s) => !s.done) + 1
  const completedSteps = order.trackingSteps.filter((s) => s.done).length

  return (
    <PageWrapper>
      <SectionHeader title={`Order #${order.id}`} />

      {/* Order Header */}
      <Card className="p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Placed on: {order.placedAt}</p>
            <p className="text-2xl font-bold text-[#1E3A5F]">
              ₹{order.total.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'Out for Delivery' ? 'bg-amber-100 text-amber-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-[#1E3A5F] mb-3">Products Ordered</h4>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-[#1E3A5F]">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Tracking Timeline */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-lg text-[#1E3A5F] mb-6">Tracking Timeline</h3>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-6">
            {order.trackingSteps.map((step, index) => (
              <div key={index} className="relative flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  step.done
                    ? 'bg-indigo-500 text-white'
                    : index === currentStep - 1
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.done ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className={`font-medium ${
                    step.done ? 'text-[#1E3A5F]' : 'text-gray-400'
                  }`}>
                    {step.step}
                  </p>
                  {step.done && (
                    <p className="text-sm text-gray-500 mt-1">Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <ProgressBar
            value={(completedSteps / order.trackingSteps.length) * 100}
            color="indigo"
            label={`${completedSteps} of ${order.trackingSteps.length} steps complete`}
            showValue
          />
        </div>
      </Card>

      {/* Delivery Address */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-lg text-[#1E3A5F] mb-4">Delivery Address</h3>
        <div className="text-gray-600">
          <p className="font-medium text-[#1E3A5F]">Aarav Shah</p>
          <p>123 Tech Street, Sector 62</p>
          <p>Noida, Uttar Pradesh - 201309</p>
          <p className="mt-2">Phone: +91 98765 43210</p>
        </div>
      </Card>

      {/* Need Help */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-lg text-[#1E3A5F] mb-4">Need help with this order?</h3>
        <div className="flex gap-4">
          <Button variant="outline">
            <RotateCcw className="w-4 h-4" />
            Return Item
          </Button>
          <Button variant="outline">
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </Button>
        </div>
      </Card>

      {/* Leave Review (if delivered) */}
      {order.status === 'Delivered' && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-[#1E3A5F] mb-4">Leave a Review</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="w-8 h-8 text-gray-300 hover:text-amber-400 transition-colors"
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share your experience..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              rows={4}
            />
            <Button>Submit Review</Button>
          </div>
        </Card>
      )}
    </PageWrapper>
  )
}

export default OrderTracking
