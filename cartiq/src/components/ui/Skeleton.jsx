const Skeleton = ({ variant = 'text', className = '' }) => {
  const variants = {
    text: 'h-4 w-full',
    card: 'h-48 w-full',
    productCard: 'h-64 w-full',
  }

  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${variants[variant]} ${className}`}
    />
  )
}

export const SkeletonText = (props) => <Skeleton variant="text" {...props} />
export const SkeletonCard = (props) => <Skeleton variant="card" {...props} />
export const SkeletonProductCard = (props) => (
  <Skeleton variant="productCard" {...props} />
)

export default Skeleton
