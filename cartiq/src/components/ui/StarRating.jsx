import { Star, StarHalf } from 'lucide-react'

const StarRating = ({ rating, count, size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className={`${sizes[size]} fill-amber-400 text-amber-400`} />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className={`${sizes[size]} fill-amber-400 text-amber-400`} />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${sizes[size]} text-gray-300`} />)
    }

    return stars
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{renderStars()}</div>
      {count !== undefined && (
        <span className="text-sm text-gray-500">({count})</span>
      )}
    </div>
  )
}

export default StarRating
