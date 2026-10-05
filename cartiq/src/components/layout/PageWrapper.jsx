import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageWrapper = ({ children, className = '' }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div
      className={`pt-16 min-h-screen ${className}`}
      style={{ '--header-h': '4rem' }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-action-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>
      <div id="main-content">{children}</div>
    </div>
  )
}

export default PageWrapper
