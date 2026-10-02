const PriceTag = ({ price, originalPrice, showDiscount = false }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-[#1E3A5F]">
        {formatCurrency(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-sm text-gray-400 line-through">
            {formatCurrency(originalPrice)}
          </span>
          {showDiscount && discount > 0 && (
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              {discount}% off
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default PriceTag
