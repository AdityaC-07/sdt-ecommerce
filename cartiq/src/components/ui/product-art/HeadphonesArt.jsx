const HeadphonesArt = ({ accent = '#4F46E5', brand = 'Brand' }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="p-[10%]"
  >
    <circle cx="130" cy="220" r="45" fill={accent} opacity="0.8" />
    <circle cx="270" cy="220" r="45" fill={accent} opacity="0.8" />
    <path
      d="M 85 220 A 115 115 0 0 1 200 105 A 115 115 0 0 1 315 220"
      stroke={accent}
      strokeWidth="16"
      fill="none"
      opacity="0.9"
    />
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

export default HeadphonesArt
