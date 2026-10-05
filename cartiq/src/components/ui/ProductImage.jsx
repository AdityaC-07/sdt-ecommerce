import { useState } from 'react'
import LaptopArt from './product-art/LaptopArt'
import HeadphonesArt from './product-art/HeadphonesArt'
import PhoneArt from './product-art/PhoneArt'
import CameraArt from './product-art/CameraArt'
import WatchArt from './product-art/WatchArt'
import TabletArt from './product-art/TabletArt'
import SpeakerArt from './product-art/SpeakerArt'
import TvArt from './product-art/TvArt'

const ProductImage = ({
  product,
  index = 0,
  size = 'card',
  priority = false,
  zoomable = false,
}) => {
  const [imageError, setImageError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const sizeClasses = {
    thumb: 'h-16 w-16',
    card: 'aspect-square',
    hero: 'aspect-[4/5]',
  }

  const getAccentColor = (id) => {
    const colors = ['#4F46E5', '#059669', '#F59E0B', '#DC2626', '#334A66']
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  const renderArt = () => {
    const accent = getAccentColor(product.id)
    const brand = product.brand
    const category = product.category

    switch (category) {
      case 'Laptops':
        return <LaptopArt accent={accent} brand={brand} />
      case 'Headphones':
        return <HeadphonesArt accent={accent} brand={brand} />
      case 'Smartphones':
        return <PhoneArt accent={accent} brand={brand} />
      case 'Cameras':
        return <CameraArt accent={accent} brand={brand} />
      case 'Smartwatches':
        return <WatchArt accent={accent} brand={brand} />
      case 'Tablets':
        return <TabletArt accent={accent} brand={brand} />
      case 'Speakers':
        return <SpeakerArt accent={accent} brand={brand} />
      case 'Televisions':
        return <TvArt accent={accent} brand={brand} />
      default:
        return <LaptopArt accent={accent} brand={brand} />
    }
  }

  const imageUrl = product.images?.[index]

  return (
    <div
      className={`relative bg-surface-50 flex items-center justify-center overflow-hidden ${sizeClasses[size]} ${zoomable ? 'cursor-zoom-in' : ''}`}
    >
      {!loaded && !imageError && (
        <div className="absolute inset-0 animate-pulse bg-surface-100" />
      )}
      {!imageError && imageUrl && (
        <img
          src={imageUrl}
          alt={`${product.brand} ${product.name} - ${product.category}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-contain p-[8%] transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setImageError(true)
            setLoaded(true)
          }}
        />
      )}
      {(imageError || !imageUrl) && renderArt()}
    </div>
  )
}

export default ProductImage
