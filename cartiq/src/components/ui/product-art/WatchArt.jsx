const WatchArt = ({ accent = '#4F46E5', brand = 'Brand' }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="p-[10%]"
  >
    <rect x="150" y="90" width="100" height="140" rx="12" fill={accent} opacity="0.9" />
    <rect x="165" y="105" width="70" height="110" rx="8" fill="#1f2937" />
    <rect x="170" y="230" width="60" height="16" rx="6" fill="#9ca3af" />
    <rect x="170" y="75" width="60" height="16" rx="6" fill="#9ca3af" />
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

export default WatchArt
