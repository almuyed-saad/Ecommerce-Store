import Skeleton from '../ui/Skeleton'

const ProductSkeleton = () => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-md">
      {/* Image Skeleton with Shimmer */}
      <Skeleton className="w-full h-48" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

export default ProductSkeleton