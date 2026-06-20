const Skeleton = ({ className }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-light-card dark:bg-dark-card rounded-xl ${className}`}
    >
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}

export default Skeleton