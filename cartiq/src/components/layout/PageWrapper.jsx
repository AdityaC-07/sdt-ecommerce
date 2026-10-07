import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * PageWrapper — wraps all non-hero pages.
 * - Scrolls to top on route change
 * - Provides consistent container + header padding
 * - Fixes B2: always uses .container-page so content aligns with the nav
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.contained=true]  — wrap content in .container-page
 * @param {boolean} [props.padTop=true]     — add padding for the fixed header
 * @param {string}  [props.className]
 */
const PageWrapper = ({ children, contained = true, padTop = true, className = '' }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <main
      id="main-content"
      className={`min-h-screen ${className}`}
      style={padTop ? { paddingTop: 'var(--header-h, 4rem)' } : {}}
    >
      {contained ? (
        <div className="container-page py-8">{children}</div>
      ) : (
        children
      )}
    </main>
  )
}

export default PageWrapper
