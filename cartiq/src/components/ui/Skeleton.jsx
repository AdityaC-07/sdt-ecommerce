export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-surface-100 rounded ${className}`} />
)

export const SkeletonPage = () => (
  <div className="container-page py-8 space-y-6">
    <Skeleton className="h-10 w-1/3" />
    <Skeleton className="h-6 w-2/3" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
)

export default Skeleton
