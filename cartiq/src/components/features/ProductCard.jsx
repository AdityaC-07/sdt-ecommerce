import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Check, ShieldCheck, Eye, ArrowRightLeft } from 'lucide-react'
import StarRating from '../ui/StarRating'
import PriceTag from '../ui/PriceTag'
import ProductFrame from '../ui/ProductFrame'
import useCartStore from '../../store/cartStore'
import useUIStore from '../../store/uiStore'
import { ROUTES } from '../../constants/routes'

/**
 * Strips duplicate brand prefix from product title if title starts with brand.
 * e.g., brand="Dell", title="Dell XPS 15" => "XPS 15"
 */
const getCleanTitle = (name, brand) => {
  if (!name || !brand) return name || ''
  const trimmedName = name.trim()
  const trimmedBrand = brand.trim()
  if (trimmedName.toLowerCase().startsWith(trimmedBrand.toLowerCase() + ' ')) {
    return trimmedName.slice(trimmedBrand.length + 1)
  }
  return trimmedName
}

/**
 * Calculates delivery date string based on deliveryDays.
 */
const getDeliveryText = (days = 2) => {
  const d = new Date()
  d.setDate(d.getDate() + (days || 2))
  const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' })
  const monthDay = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  return `Delivery by ${dayName}, ${monthDay}`
}

const ProductCard = ({ product, variant = 'grid' }) => {
  const navigate = useNavigate()
  const cartStore = useCartStore()
  const { comparisonList, addToComparison, removeFromComparison, showToast } = useUIStore()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) return null

  const cleanTitle = getCleanTitle(product.name, product.brand)
  const isInComparison = comparisonList.some((p) => p.id === product.id)
  const canAddToComparison = comparisonList.length < 3

  const handleAddToCart = (e) => {
    e?.stopPropagation()
    cartStore.addItem(product, 1)
    setJustAdded(true)
    showToast(`Added ${cleanTitle} to cart`, 'success')
    setTimeout(() => setJustAdded(false), 1200)
  }

  const handleComparisonToggle = (e) => {
    e?.stopPropagation()
    if (isInComparison) {
      removeFromComparison(product.id)
    } else if (canAddToComparison) {
      addToComparison(product)
    } else {
      showToast('Maximum 3 items allowed in comparison', 'warning')
    }
  }

  const handleCardClick = () => {
    navigate(ROUTES.PRODUCT_DETAIL.replace(':id', product.id))
  }

  const specSummary = product.specs
    ? Object.values(product.specs).slice(0, 3).join(' · ')
    : ''

  // Compact variant
  if (variant === 'compact') {
    return (
      <div
        onClick={handleCardClick}
        className="group flex items-center gap-3.5 p-3 rounded-[20px] bg-white border border-black/5 hover:border-black/15 transition-all shadow-xs hover:shadow-md cursor-pointer"
      >
        <div className="w-16 h-20 flex-shrink-0">
          <ProductFrame product={product} size="thumb" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-ink-600 font-medium truncate">{product.brand}</p>
          <h4 className="font-bold text-sm text-ink-900 line-clamp-1 group-hover:text-orchid-600 transition-colors">
            {cleanTitle}
          </h4>
          <div className="mt-1">
            <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
          </div>
        </div>
      </div>
    )
  }

  // List variant
  if (variant === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="group relative flex flex-col md:flex-row gap-6 p-5 rounded-[20px] bg-white border border-black/8 hover:border-black/15 shadow-xs hover:shadow-xl transition-all cursor-pointer"
      >
        <div className="w-full md:w-48 h-56 flex-shrink-0 relative">
          <ProductFrame product={product} size="card" priority />

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsWishlisted(!isWishlisted)
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm z-10 ${
              isWishlisted
                ? 'bg-hibiscus-500 text-white'
                : 'bg-white/90 text-ink-600 hover:text-hibiscus-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-1">
              <div>
                <span className="text-xs font-semibold text-ink-600 tracking-wide uppercase">
                  {product.brand}
                </span>
                <h3 className="font-bold text-xl text-ink-900 group-hover:text-orchid-600 transition-colors leading-snug">
                  {cleanTitle}
                </h3>
              </div>

              {/* Priority badge */}
              {product.badges?.[0] && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-hibiscus-500 text-white shadow-xs">
                  {product.badges[0]}
                </span>
              )}
            </div>

            {/* Ratings & Trust */}
            <div className="flex items-center gap-3 mb-3">
              <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
              {product.trustScore && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-orchid-600 border border-purple-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Trust {product.trustScore}
                </span>
              )}
            </div>

            {/* Spec summary */}
            {specSummary && (
              <p className="text-xs text-ink-600 mb-4 line-clamp-1">
                {specSummary}
              </p>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4 pt-3 border-t border-black/5">
              <div>
                <PriceTag price={product.price} originalPrice={product.originalPrice} showDiscount />
                <p
                  className={`text-xs font-medium mt-1 ${
                    product.deliveryDays <= 2 ? 'text-lime-800 font-semibold' : 'text-ink-600'
                  }`}
                >
                  {getDeliveryText(product.deliveryDays)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink-600 hover:text-ink-900 select-none"
                >
                  <input
                    type="checkbox"
                    checked={isInComparison}
                    onChange={handleComparisonToggle}
                    className="w-4 h-4 rounded-full border-gray-300 text-marigold-500 focus:ring-marigold-400"
                  />
                  Compare
                </label>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary px-5 py-2.5 text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid variant (default)
  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-[20px] bg-white border border-black/8 hover:border-black/15 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden h-full"
    >
      {/* Product Image Frame */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <ProductFrame product={product} size="card" priority />

        {/* Priority badge top-left */}
        {product.badges?.[0] ? (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-hibiscus-500 text-white shadow-xs z-10">
            {product.badges[0]}
          </span>
        ) : product.discount >= 10 ? (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-lime-500 text-lime-800 shadow-xs z-10">
            {product.discount}% off
          </span>
        ) : null}

        {/* Wishlist Button top-right (40px target) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-[#200ms] shadow-sm z-10 ${
            isWishlisted
              ? 'bg-hibiscus-500 text-white'
              : 'bg-white/90 text-ink-600 hover:text-hibiscus-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-white' : ''}`} />
        </button>

        {/* Quick action row inside frame on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(ROUTES.PRODUCT_DETAIL.replace(':id', product.id))
            }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-ink-900 hover:bg-white shadow-md flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick view
          </button>
          <button
            onClick={handleComparisonToggle}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors ${
              isInComparison ? 'bg-orchid-600 text-white' : 'bg-white/95 text-ink-900 hover:bg-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            {isInComparison ? 'Comparing' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <p className="text-[12px] font-semibold text-ink-600 uppercase tracking-wider mb-1">
            {product.brand}
          </p>

          {/* Product Name (Cleaned) */}
          <h3 className="font-bold text-sm text-ink-900 line-clamp-2 mb-2 leading-snug group-hover:text-orchid-600 transition-colors min-h-[2.5rem]">
            {cleanTitle}
          </h3>

          {/* Rating + Trust pill */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
            {product.trustScore && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-orchid-600 border border-purple-100 flex-shrink-0">
                <ShieldCheck className="w-3 h-3" />
                Trust {product.trustScore}
              </span>
            )}
          </div>

          {/* Key Spec Line */}
          {specSummary && (
            <p className="text-xs text-ink-600 line-clamp-1 mb-3">
              {specSummary}
            </p>
          )}
        </div>

        {/* Bottom price + action row */}
        <div className="pt-3 border-t border-black/5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <PriceTag price={product.price} originalPrice={product.originalPrice} showDiscount size="md" />
              <p
                className={`text-[11px] font-medium mt-0.5 ${
                  product.deliveryDays <= 2 ? 'text-lime-800 font-semibold' : 'text-ink-600'
                }`}
              >
                {getDeliveryText(product.deliveryDays)}
              </p>
            </div>

            {/* Compact pill Add to Cart button */}
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${cleanTitle} to cart`}
              className={`btn btn-primary px-3.5 py-2 text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 flex-shrink-0 ${
                justAdded ? 'bg-lime-500 text-lime-800' : ''
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add to cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
