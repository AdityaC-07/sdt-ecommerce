const Card = ({ children, className = '', hoverable = false, onClick }) => {
  return (
    <div
      className={`rounded-[12px] bg-white shadow-sm border border-gray-100 ${hoverable ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
