const TvArt = ({ accent = '#4F46E5', brand = 'Brand' }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="p-[10%]"
  >
    <rect x="70" y="110" width="260" height="160" rx="12" fill={accent} opacity="0.9" />
    <rect x="85" y="125" width="230" height="130" rx="8" fill="#1f2937" />
    <rect x="170" y="270" width="60" height="16" rx="6" fill="#9ca3af" />
    <rect x="190" y="286" width="20" height="20" rx="4" fill="#6b7280" />
    <text
      x="200"
      y="340"
      textAnchor="middle"
      fontSize="14"
      fontWeight="600"
      fill="#4b5563"
    >
      {brand}
    </text>
  </svg>
)

export default TvArt
