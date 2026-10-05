const LaptopArt = ({ accent = '#4F46E5', brand = 'Brand' }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="p-[10%]"
  >
    <defs>
      <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f3f4f6" />
        <stop offset="100%" stopColor="#e5e7eb" />
      </linearGradient>
    </defs>
    <rect
      x="80"
      y="120"
      width="240"
      height="160"
      rx="12"
      fill={accent}
      opacity="0.9"
    />
    <rect x="95" y="135" width="210" height="130" rx="8" fill="#1f2937" />
    <rect x="60" y="280" width="280" height="12" rx="6" fill="#d1d5db" />
    <text
      x="200"
      y="320"
      textAnchor="middle"
      fontSize="14"
      fontWeight="600"
      fill="#4b5563"
    >
      {brand}
    </text>
  </svg>
)

export default LaptopArt
