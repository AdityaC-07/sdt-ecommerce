import { getIcon } from '../../constants/icons'

const Icon = ({ name, size = 20, className = '', ...props }) => {
  const IconComponent = getIcon(name)

  if (process.env.NODE_ENV === 'development' && !IconComponent) {
    console.warn(`Icon "${name}" not found in registry`)
    return (
      <div
        className="border-2 border-dashed border-red-500 flex items-center justify-center"
        style={{ width: size, height: size }}
        aria-label={`Missing icon: ${name}`}
        {...props}
      >
        <span className="text-[8px] text-red-500">?</span>
      </div>
    )
  }

  if (!IconComponent) {
    return null
  }

  return <IconComponent size={size} className={className} {...props} />
}

export default Icon
