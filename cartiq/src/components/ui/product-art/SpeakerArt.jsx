const SpeakerArt = ({ accent = '#4F46E5', brand = 'Brand' }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="p-[10%]"
  >
    <rect x="140" y="100" width="120" height="180" rx="20" fill={accent} opacity="0.9" />
    <circle cx="200" cy="180" r="40" fill="#1f2937" />
    <circle cx="200" cy="240" r="24" fill="#374151" />
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

export default SpeakerArt
