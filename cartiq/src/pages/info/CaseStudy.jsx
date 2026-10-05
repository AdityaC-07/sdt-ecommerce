import { Link } from 'react-router-dom'

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-surface-0 py-12">
      <div className="container-page">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-6">
          Our Design Process
        </h1>
        <p className="text-lg text-ink-700 mb-8">
          Learn about the design thinking journey behind CartIQ.
        </p>
        <Link
          to="/design-process"
          className="text-match-600 hover:underline focus:outline-none focus:ring-2 focus:ring-action-500 focus:ring-offset-2 rounded"
        >
          View the full design process →
        </Link>
      </div>
    </div>
  )
}

export default CaseStudy
