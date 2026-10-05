import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Button from '../../components/ui/Button'
import categories from '../../data/categories.json'
import { ROUTES } from '../../constants/routes'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0 py-12">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-ink-900 mb-4">
          Page not found
        </h1>
        <p className="text-lg text-ink-700 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <form className="max-w-lg mx-auto mb-8">
          <div className="flex items-center border border-line rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-action-500">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-6 py-3 outline-none"
            />
            <Button type="submit" size="md" className="rounded-none rounded-r-full">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </form>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-ink-900 mb-4">
            Top categories
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`${ROUTES.SEARCH}?category=${cat.name}`}
                className="px-4 py-2 border border-line rounded-full text-ink-700 hover:bg-surface-50 transition-colors focus:outline-none focus:ring-2 focus:ring-action-500 focus:ring-offset-2"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <Link to={ROUTES.HOME}>
          <Button variant="outline">Back to home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
