const Tag = ({ children, color = 'indigo', className = '', onClick }) => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    green: 'bg-green-100 text-green-800 hover:bg-green-200',
    amber: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    red: 'bg-red-100 text-red-800 hover:bg-red-200',
    gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${onClick ? 'cursor-pointer' : ''} ${colors[color]} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export default Tag
