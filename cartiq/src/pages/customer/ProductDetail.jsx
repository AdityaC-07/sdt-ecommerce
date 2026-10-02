import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, Share2, ShoppingCart, Plus, Minus, Check, X, Info } from 'lucide-react'
import StarRating from '../../components/ui/StarRating'
import PriceTag from '../../components/ui/PriceTag'
import TrustScoreBadge from '../../components/ui/TrustScoreBadge'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import ProductCard from '../../components/features/ProductCard'
import useCartStore from '../../store/cartStore'
import useUIStore from '../../store/uiStore'
import products from '../../data/products.json'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const cartStore = useCartStore()
  const { comparisonList, addToComparison, removeFromComparison } = useUIStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </PageWrapper>
    )
  }

  const isInComparison = comparisonList.find((p) => p.id === product.id)
  const canAddToComparison = comparisonList.length < 3

  const handleAddToCart = () => {
    cartStore.addItem(product, quantity)
  }

  const handleComparisonToggle = () => {
    if (isInComparison) {
      removeFromComparison(product.id)
    } else if (canAddToComparison) {
      addToComparison(product)
    }
  }

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta
    if (newQty >= 1 && newQty <= 10) {
      setQuantity(newQty)
    }
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6)

  return (
    <PageWrapper>
      {/* SECTION 1 - Product Gallery + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                  selectedImage === idx ? 'border-amber-500' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <h1 className="font-serif text-3xl font-bold text-[#1E3A5F] mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={product.rating} count={product.reviewCount} />
            <a href="#reviews" className="text-sm text-indigo-600 hover:underline">
              See all reviews
            </a>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <TrustScoreBadge score={product.trustScore} size="lg" />
            <div className="relative group">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Based on review consistency, seller reputation, and verified purchases
              </div>
            </div>
          </div>

          <div className="mb-6">
            <PriceTag price={product.price} originalPrice={product.originalPrice} showDiscount />
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Sold by <span className="font-medium text-[#1E3A5F]">{product.seller.name}</span>
            </p>
            <div className="flex items-center gap-2">
              <StarRating rating={product.seller.rating} size="sm" />
              {product.seller.verified && <Badge label="Verified" color="green" />}
            </div>
          </div>

          <div className="mb-6 space-y-2 text-sm text-gray-600">
            <p>Estimated delivery in {product.deliveryDays} days</p>
            <p>{product.returnPolicy}</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-gray-600">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button size="lg" onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={isWishlisted ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isInComparison}
                onChange={handleComparisonToggle}
                disabled={!canAddToComparison && !isInComparison}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">Add to Comparison</span>
            </label>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION 2 - Why This Product? */}
      <Card className="mb-8 p-6 border-l-4 border-l-indigo-500">
        <h3 className="font-semibold text-xl text-[#1E3A5F] mb-4">
          Why CartIQ recommends this
        </h3>
        <ul className="space-y-2">
          {product.reviewSummary.pros.map((pro, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              {pro}
            </li>
          ))}
        </ul>
      </Card>

      {/* SECTION 3 - Specifications */}
      <section className="mb-12">
        <SectionHeader title="Specifications" />
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className={`flex justify-between p-3 ${Object.entries(product.specs).indexOf([key, value]) % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <span className="font-medium text-gray-700">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* SECTION 4 - Review Summary */}
      <section className="mb-12" id="reviews">
        <SectionHeader title="Review Summary" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold text-lg text-[#1E3A5F] mb-4">
              What buyers love
            </h4>
            <ul className="space-y-2">
              {product.reviewSummary.pros.map((pro, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  {pro}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h4 className="font-semibold text-lg text-[#1E3A5F] mb-4">
              Common complaints
            </h4>
            <ul className="space-y-2">
              {product.reviewSummary.cons.map((con, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <X className="w-5 h-5 text-amber-500" />
                  {con}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-4">
          <Badge label={product.reviewSummary.sentiment} color="green" />
        </div>
      </section>

      {/* SECTION 5 - Individual Reviews */}
      <section className="mb-12">
        <SectionHeader title="Reviews" />
        <div className="space-y-4">
          {product.reviews.slice(0, 4).map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[#1E3A5F]">{review.user}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                {review.verified && <Badge label="Verified Purchase" color="green" />}
              </div>
              <h5 className="font-semibold text-[#1E3A5F] mb-2">{review.title}</h5>
              <p className="text-gray-600 mb-3">{review.body}</p>
              <button className="text-sm text-indigo-600 hover:underline">
                Helpful? Yes ({review.helpful})
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 6 - Similar Products */}
      <section className="mb-12">
        <SectionHeader title="Similar Products" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {similarProducts.map((p) => (
            <ProductCard key={p.id} product={p} variant="compact" />
          ))}
        </div>
      </section>

      {/* SECTION 7 - Comparison Drawer */}
      {comparisonList.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="font-medium text-[#1E3A5F]">
              {comparisonList.length} products selected for comparison
            </p>
            <Button onClick={() => navigate('/compare')}>
              Compare Now
            </Button>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default ProductDetail
