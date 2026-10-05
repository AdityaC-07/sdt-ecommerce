const Section = ({
  children,
  bleed = false,
  bg = 'surface-0',
  divider = false,
  className = '',
  ...props
}) => {
  const bgClasses = {
    'surface-0': 'section-surface-0',
    'surface-50': 'section-surface-50',
    brand: 'bg-brand-800',
  }

  const sectionClasses = `${bgClasses[bg]} ${divider ? 'section-divider' : ''} ${className}`

  if (bleed) {
    return (
      <section className={sectionClasses} {...props}>
        <div className="container-page">{children}</div>
      </section>
    )
  }

  return (
    <section className={`container-page ${className}`} {...props}>
      {children}
    </section>
  )
}

export default Section
