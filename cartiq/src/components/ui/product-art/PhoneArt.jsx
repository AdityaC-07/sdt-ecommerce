const PhoneArt = ({ accent = '#4F46E5', brand = 'Brand' }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    className="p-[10%]"
  >
    <rect x="140" y="90" width="120" height="220" rx="20" fill={accent} opacity="0.9" />
    <rect x="150" y="105" width="100" height="170" rx="10" fill="#1f2937" />
    <circle cx="200" cy="290" r="8" fill="#9ca3af" />
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

export default PhoneArt
