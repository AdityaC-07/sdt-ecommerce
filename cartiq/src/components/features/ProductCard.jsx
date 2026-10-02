import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import StarRating from '../ui/StarRating'
import PriceTag from '../ui/PriceTag'
import TrustScoreBadge from '../ui/TrustScoreBadge'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import Button from '../ui/Button'
import useCartStore from '../../store/cartStore'
import useUIStore from '../../store/uiStore'
import { ROUTES } from '../../constants/routes'

const ProductCard = ({ product, variant = 'grid' }) => {
  const navigate = useNavigate()
  const cartStore = useCartStore()
  const { comparisonList, addToComparison, removeFromComparison } = useUIStore()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const isInComparison = comparisonList.find((p) => p.id === product.id)
  const canAddToComparison = comparisonList.length < 3

  const handleAddToCart = () => {
    cartStore.addItem(product, 1)
  }

  const handleComparisonToggle = () => {
    if (isInComparison) {
      removeFromComparison(product.id)
    } else if (canAddToComparison) {
      addToComparison(product)
    }
  }

  const handleCardClick = () => {
    navigate(`${ROUTES.PRODUCT_DETAIL.replace(':id', product.id)}`)
  }

  if (variant === 'compact') {
    return (
      <Card hoverable onClick={handleCardClick} className="flex gap-4 p-4">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-[#1E3A5F] mb-2 line-clamp-1">
            {product.name}
          </h3>
          <PriceTag price={product.price} originalPrice={product.originalPrice} />
        </div>
      </Card>
    )
  }

  if (variant === 'list') {
    return (
      <Card hoverable onClick={handleCardClick} className="p-6">
        <div className="flex gap-6">
          <div className="w-48 h-48 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-xl text-[#1E3A5F] mb-2">
                  {product.name}
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsWishlisted(!isWishlisted)
                }}
                className={`p-2 rounded-full transition-colors ${
                  isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={product.rating} count={product.reviewCount} />
              <TrustScoreBadge score={product.trustScore} size="sm" />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                <Badge key={key} label={`${key}: ${value}`} color="gray" />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <PriceTag price={product.price} originalPrice={product.originalPrice} showDiscount />
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isInComparison}
                    onChange={handleComparisonToggle}
                    disabled={!canAddToComparison && !isInComparison}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">Compare</span>
                </label>
                <Button size="sm" onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Grid variant (default)
  return (
    <Card hoverable onClick={handleCardClick} className="overflow-hidden group">
      <div className="relative">
        <div className="aspect-square bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted ? 'text-red-500 bg-white' : 'text-gray-400 hover:text-red-500 bg-white/80'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3">
            <Badge label={product.badges[0]} color="green" />
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-[#1E3A5F] mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size="sm" />
          <TrustScoreBadge score={product.trustScore} size="sm" />
        </div>

        <div className="mb-3">
          <PriceTag price={product.price} originalPrice={product.originalPrice} />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={isInComparison}
              onChange={handleComparisonToggle}
              disabled={!canAddToComparison && !isInComparison}
              className="w-4 h-4"
            />
            <span className="text-gray-600">Compare</span>
          </label>
        </div>

        <Button
          fullWidth
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart()
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
