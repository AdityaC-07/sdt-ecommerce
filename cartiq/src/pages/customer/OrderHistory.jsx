import { useNavigate, Link } from 'react'
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import orders from '../../data/orders.json'
import { ROUTES } from '../../constants/routes'

const formatPrice = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const OrderHistory = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <div className="container-page py-8">
        <SectionHeader title="My orders" subtitle="Track shipments, view receipts, and manage returns" />

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-ink-600 mx-auto mb-3 opacity-50" />
            <h3 className="font-bold text-lg text-ink-900 mb-1">No orders yet</h3>
            <p className="text-xs text-ink-600 mb-4">You haven't placed any orders with CartIQ yet.</p>
            <Link to={ROUTES.HOME} className="btn btn-primary px-6 py-2.5 text-xs font-bold">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(ROUTES.ORDER_TRACKING.replace(':id', order.id))}
                className="p-5 rounded-[20px] bg-white border border-black/8 hover:border-black/15 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-xs text-ink-900">ORDER #{order.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-lime-50 text-lime-800 border border-lime-200">
                      {order.status || 'Delivered'}
                    </span>
                  </div>
                  <p className="text-xs text-ink-600">Placed on {order.createdAt || '2026-10-01'}</p>
                  <p className="text-xs font-bold text-ink-900 mt-2">
                    {order.items?.length || 1} item(s) · Total {formatPrice(order.totalAmount || 68999)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-orchid-600">
                  <span>Track status</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default OrderHistory
