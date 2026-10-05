export const H1 = ({ children, className = '', ...props }) => (
  <h1
    className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink-900 ${className}`}
    {...props}
  >
    {children}
  </h1>
)

export const H2 = ({ children, className = '', ...props }) => (
  <h2
    className={`text-2xl md:text-3xl font-semibold text-ink-900 ${className}`}
    {...props}
  >
    {children}
  </h2>
)

export const H3 = ({ children, className = '', ...props }) => (
  <h3
    className={`text-xl md:text-2xl font-semibold text-ink-900 ${className}`}
    {...props}
  >
    {children}
  </h3>
)

export const Body = ({ children, className = '', ...props }) => (
  <p className={`text-base text-ink-700 ${className}`} {...props}>
    {children}
  </p>
)

export const Caption = ({ children, className = '', ...props }) => (
  <span className={`text-sm text-ink-500 ${className}`} {...props}>
    {children}
  </span>
)

export default { H1, H2, H3, Body, Caption }
