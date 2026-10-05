const CameraArt = ({ accent = '#4F46E5', brand = 'Brand' }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="p-[10%]"
  >
    <rect x="100" y="140" width="200" height="140" rx="16" fill={accent} opacity="0.9" />
    <circle cx="200" cy="210" r="40" fill="#1f2937" />
    <circle cx="200" cy="210" r="24" fill="#6b7280" />
    <rect x="120" y="120" width="60" height="24" rx="8" fill={accent} />
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

export default CameraArt
