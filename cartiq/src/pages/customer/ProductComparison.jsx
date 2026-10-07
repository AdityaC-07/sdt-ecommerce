import { useNavigate } from 'react'
import { ArrowLeft, Trash2, ShoppingCart, Check, ShieldCheck, Star, Trophy } from 'lucide-react'
import useUIStore from '../../store/uiStore'
import useCartStore from '../../store/cartStore'
import PageWrapper from '../../components/layout/PageWrapper'
import ProductFrame from '../../components/ui/ProductFrame'
import PriceTag from '../../components/ui/PriceTag'
import StarRating from '../../components/ui/StarRating'
import Button from '../../components/ui/Button'
import { ROUTES } from '../../constants/routes'

const formatPrice = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const ProductComparison = () => {
  const navigate = useNavigate()
  const { comparisonList, removeFromComparison, clearComparison, showToast } = useUIStore()
  const cartStore = useCartStore()

  if (!comparisonList || comparisonList.length === 0) {
    return (
      <PageWrapper>
        <div className="container-page py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-orchid-600 flex items-center justify-center mx-auto mb-4 border border-purple-100">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-ink-900 mb-2">No products in comparison</h2>
          <p className="text-xs text-ink-600 mb-6 leading-relaxed">
            Select "Compare" on up to 3 products to compare specs, ratings, and trust scores side-by-side.
          </p>
          <Button onClick={() => navigate(ROUTES.SEARCH)} className="btn btn-primary px-6 py-3 font-bold text-xs">
            Browse products to compare
          </Button>
        </div>
      </PageWrapper>
    )
  }

  // Find winner (highest trust score or rating)
  const winner = [...comparisonList].sort((a, b) => (b.trustScore || 0) - (a.trustScore || 0))[0]

  return (
    <PageWrapper>
      <div className="container-page py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-600 hover:text-ink-900 mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to shopping
            </button>
            <h1 className="font-display font-extrabold text-3xl text-ink-900">
              Product comparison
            </h1>
            <p className="text-xs text-ink-600 mt-0.5">Comparing {comparisonList.length} items side-by-side</p>
          </div>

          <button
            onClick={clearComparison}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer border border-red-100 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        </div>

        {/* Winner Highlight Banner */}
        {winner && comparisonList.length > 1 && (
          <div className="p-4 rounded-[20px] bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-emerald-500/10 border border-marigold-500/30 mb-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-marigold-500 text-ink-900 flex items-center justify-center flex-shrink-0 shadow-sm font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-marigold-600 tracking-wider">CartIQ Verdict</p>
              <p className="text-sm font-bold text-ink-900">
                <span className="text-orchid-600">{winner.name}</span> leads in trust score ({winner.trustScore}% trust rating).
              </p>
            </div>
          </div>
        )}

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisonList.map((product) => {
            const isWinner = winner && winner.id === product.id && comparisonList.length > 1

            return (
              <div
                key={product.id}
                className={`relative rounded-[24px] bg-white border p-5 shadow-sm transition-all flex flex-col justify-between ${
                  isWinner ? 'border-2 border-marigold-500 shadow-xl' : 'border-black/8'
                }`}
              >
                {/* Winner tag */}
                {isWinner && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-extrabold bg-marigold-500 text-ink-900 shadow-md flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> IQ Best Choice
                  </span>
                )}

                <div>
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="p-1.5 rounded-full text-ink-600 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-full aspect-[4/5] mb-4">
                    <ProductFrame product={product} size="card" />
                  </div>

                  <p className="text-xs font-semibold text-ink-600 uppercase tracking-wider">{product.brand}</p>
                  <h3 className="font-bold text-lg text-ink-900 mb-2 leading-snug">{product.name}</h3>

                  <div className="mb-4">
                    <PriceTag price={product.price} originalPrice={product.originalPrice} showDiscount size="lg" />
                  </div>

                  <div className="space-y-2 pt-3 border-t border-black/5 text-xs">
                    <div className="flex justify-between py-1 border-b border-black/5">
                      <span className="text-ink-600">Rating</span>
                      <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
                    </div>
                    <div className="flex justify-between py-1 border-b border-black/5">
                      <span className="text-ink-600">Trust Score</span>
                      <span className="font-bold text-orchid-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {product.trustScore}%
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-black/5">
                      <span className="text-ink-600">Delivery</span>
                      <span className="font-bold text-lime-800">{product.deliveryDays || 2} days</span>
                    </div>

                    {/* Specs breakdown */}
                    <div className="pt-2">
                      <p className="font-bold text-ink-900 mb-1">Key Specifications:</p>
                      {product.specs &&
                        Object.entries(product.specs).map(([k, v]) => (
                          <div key={k} className="flex justify-between py-0.5 text-[11px]">
                            <span className="text-ink-600">{k}:</span>
                            <span className="font-semibold text-ink-900">{v}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    cartStore.addItem(product, 1)
                    showToast(`Added ${product.name} to cart`, 'success')
                  }}
                  className="btn btn-primary w-full py-3 text-xs font-bold shadow-md hover:shadow-lg mt-6"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to cart
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProductComparison
