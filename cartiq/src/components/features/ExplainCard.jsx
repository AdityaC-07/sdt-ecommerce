import { IndianRupee, Tag, Star, Battery, Lightbulb } from 'lucide-react'
import Card from '../ui/Card'

const ExplainCard = ({ product, needQuery }) => {
  if (!product.matchReasons || product.matchReasons.length === 0) {
    return null
  }

  const getIconForReason = (reason) => {
    if (reason.includes('budget') || reason.includes('₹')) return <IndianRupee className="w-4 h-4" />
    if (reason.includes('tagged') || reason.includes('Tag')) return <Tag className="w-4 h-4" />
    if (reason.includes('rating') || reason.includes('★')) return <Star className="w-4 h-4" />
    if (reason.includes('battery')) return <Battery className="w-4 h-4" />
    return <Lightbulb className="w-4 h-4" />
  }

  const getColorForReason = (reason) => {
    if (reason.includes('budget') || reason.includes('₹')) return 'text-green-600'
    if (reason.includes('tagged') || reason.includes('Tag')) return 'text-indigo-600'
    if (reason.includes('rating') || reason.includes('★')) return 'text-amber-600'
    return 'text-gray-600'
  }

  return (
    <Card className="p-6 border-l-4 border-l-indigo-500 mb-6">
      <h3 className="font-semibold text-lg text-[#1E3A5F] mb-4">
        Why we suggest this for you
      </h3>
      <ul className="space-y-3">
        {product.matchReasons.map((reason, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`mt-0.5 ${getColorForReason(reason)}`}>
              {getIconForReason(reason)}
            </div>
            <span className="text-gray-700">{reason}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Based on:</span>
          <span className="text-sm font-medium text-[#1E3A5F]">"{needQuery}"</span>
        </div>
        <div className="mt-2">
          <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            {product.matchScore}% match for your needs
          </span>
        </div>
      </div>
    </Card>
  )
}

export default ExplainCard
