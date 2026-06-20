import Skeleton from '../ui/Skeleton'

const ProductDetailsSkeleton = () => {
  return (
    <div className="container-custom py-12">
      {/* Breadcrumb Skeleton */}
      <div className="flex gap-2 mb-8">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-8">
          <Skeleton className="w-full h-96" />
        </div>

        {/* Info Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-20" />
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-48" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-light-border dark:border-dark-border">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton