import Ripple from './Ripple'

const Button = ({ children, className = '', variant = 'primary', onClick, ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg hover:scale-105',
    secondary: 'bg-white dark:bg-dark-surface text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-dark-card',
    outline: 'border-2 border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-card dark:hover:bg-dark-card',
  }

  return (
    <Ripple 
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
      rippleColor="rgba(255,255,255,0.2)"
      {...props}
    >
      {children}
    </Ripple>
  )
}

export default Button