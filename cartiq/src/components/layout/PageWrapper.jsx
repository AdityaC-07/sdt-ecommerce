import { useEffect } from 'react'
import useUIStore from '../../store/uiStore'

const PageWrapper = ({ children, className = '', maxWidth = 'xl' }) => {
  const { isSeniorMode } = useUIStore()

  useEffect(() => {
    if (isSeniorMode) {
      document.documentElement.classList.add('senior-mode')
    } else {
      document.documentElement.classList.remove('senior-mode')
    }
  }, [isSeniorMode])

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div className={`min-h-screen pt-16 ${className}`}>
      <div className={`mx-auto px-4 ${maxWidths[maxWidth]}`}>
        {children}
      </div>
    </div>
  )
}

export default PageWrapper
