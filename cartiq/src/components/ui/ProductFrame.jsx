import { useState } from 'react'
import LaptopArt from './product-art/LaptopArt'
import HeadphonesArt from './product-art/HeadphonesArt'
import PhoneArt from './product-art/PhoneArt'
import CameraArt from './product-art/CameraArt'
import WatchArt from './product-art/WatchArt'
import TabletArt from './product-art/TabletArt'
import SpeakerArt from './product-art/SpeakerArt'
import TvArt from './product-art/TvArt'

const CATEGORY_COLORS = {
  Laptops: '#B592FF',
  Headphones: '#FF2E63',
  Smartphones: '#FFB020',
  Cameras: '#FF7A3D',
  Smartwatches: '#B8E65C',
  Tablets: '#FFD66B',
  Speakers: '#FF9ECD',
  Televisions: '#7CF2D4',
}

/**
 * ProductFrame — Signature Arch (Jharokha Motif) Product Frame
 *
 * Renders product imagery within an arch container (999px top, 24px bottom radius)
 * with fixed aspect ratio, inner border, loading skeleton, and graceful SVG art fallback.
 */
const ProductFrame = ({
  product,
  imageIndex = 0,
  size = 'card', // 'thumb' | 'card' | 'hero' | 'compact'
  priority = false,
  zoomable = false,
  className = '',
  aspect = 'aspect-[4/5]',
}) => {
  const [imageError, setImageError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const catColor = CATEGORY_COLORS[product?.category] || '#B592FF'
  const imageUrl = product?.images?.[imageIndex]

  const sizeClasses = {
    thumb: 'w-16 h-20 text-xs',
    compact: 'w-20 h-24 text-xs',
    card: 'w-full aspect-[4/5]',
    hero: 'w-full aspect-[4/5]',
  }[size] || `w-full ${aspect}`

  const renderArt = () => {
    const brand = product?.brand || 'CartIQ'
    const category = product?.category || 'Laptops'

    switch (category) {
      case 'Laptops':
        return <LaptopArt accent={catColor} brand={brand} />
      case 'Headphones':
        return <HeadphonesArt accent={catColor} brand={brand} />
      case 'Smartphones':
        return <PhoneArt accent={catColor} brand={brand} />
      case 'Cameras':
        return <CameraArt accent={catColor} brand={brand} />
      case 'Smartwatches':
        return <WatchArt accent={catColor} brand={brand} />
      case 'Tablets':
        return <TabletArt accent={catColor} brand={brand} />
      case 'Speakers':
        return <SpeakerArt accent={catColor} brand={brand} />
      case 'Televisions':
        return <TvArt accent={catColor} brand={brand} />
      default:
        return <LaptopArt accent={catColor} brand={brand} />
    }
  }

  return (
    <div
      className={`relative overflow-hidden arch flex items-center justify-center border border-black/5 dark:border-white/10 ${sizeClasses} ${zoomable ? 'cursor-zoom-in' : ''} ${className}`}
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${catColor}15 0%, rgba(248,243,251,0.6) 100%)`,
      }}
    >
      {/* Skeleton / Blur state */}
      {!loaded && !imageError && (
        <div className="absolute inset-0 skeleton animate-pulse" />
      )}

      {/* Image */}
      {!imageError && imageUrl ? (
        <img
          src={imageUrl}
          alt={`${product?.brand || ''} ${product?.name || ''}`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={`w-full h-full object-cover p-[4%] transition-all duration-300 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setImageError(true)
            setLoaded(true)
          }}
        />
      ) : (
        /* Vector SVG art fallback */
        <div className="w-full h-full flex items-center justify-center p-4">
          {renderArt()}
        </div>
      )}

      {/* Inner subtle bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

export default ProductFrame
