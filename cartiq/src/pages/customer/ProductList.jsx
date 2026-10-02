import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Grid, List } from 'lucide-react'
import ProductCard from '../../components/features/ProductCard'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import Button from '../../components/ui/Button'
import SkeletonCard from '../../components/ui/Skeleton'
import products from '../../data/products.json'
import categories from '../../data/categories.json'
import useSearchStore from '../../store/searchStore'
import useNeedSearch from '../../hooks/useNeedSearch'

const ProductList = () => {
  const [searchParams] = useSearchParams()
  const { filters, setFilter, resetFilters } = useSearchStore()
  const [viewMode, setViewMode] = useState('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])
  const needQuery = searchParams.get('needQuery')
  const { results: needSearchResults, isSearching: needSearchLoading } = useNeedSearch()

  useEffect(() => {
    // If need search is active, use those results
    if (needQuery) {
      setFilteredProducts(needSearchResults)
      setIsLoading(needSearchLoading)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      let result = [...products]

      // Filter by query
      const query = searchParams.get('q')
      if (query) {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase())
        )
      }

      // Filter by category
      const category = searchParams.get('category')
      if (category) {
        result = result.filter((p) => p.category === category)
        setFilter('category', category)
      }

      // Filter by price range
      result = result.filter(
        (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
      )

      // Filter by rating
      if (filters.minRating > 0) {
        result = result.filter((p) => p.rating >= filters.minRating)
      }

      // Sort
      switch (filters.sortBy) {
        case 'priceLow':
          result.sort((a, b) => a.price - b.price)
          break
        case 'priceHigh':
          result.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          result.sort((a, b) => b.rating - a.rating)
          break
        default:
          break
      }

      setFilteredProducts(result)
      setIsLoading(false)
    }, 500)
  }, [searchParams, filters, needQuery, needSearchResults])

  const uniqueBrands = [...new Set(products.map((p) => p.brand))]

  const handleFilterChange = (key, value) => {
    setFilter(key, value)
  }

  const handleResetFilters = () => {
    resetFilters()
  }

  return (
    <PageWrapper>
      <SectionHeader
        title={
          searchParams.get('category')
            ? searchParams.get('category')
            : searchParams.get('q')
            ? `Results for "${searchParams.get('q')}"`
            : 'All Products'
        }
        subtitle={`${filteredProducts.length} products found`}
      />

      {/* Smart Search Mode Banner */}
      {searchParams.get('needQuery') && (
        <div className="mb-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-teal-800 font-medium">
            Smart Search Mode: "{searchParams.get('needQuery')}"
          </p>
          <p className="text-teal-600 text-sm mt-1">
            Showing products sorted by your priorities
          </p>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-[#1E3A5F]">Filters</h3>
              <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                Reset All
              </Button>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h4 className="font-medium text-[#1E3A5F] mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === cat.name}
                      onChange={() => handleFilterChange('category', cat.name)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-[#1E3A5F] mb-3">Price Range</h4>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <h4 className="font-medium text-[#1E3A5F] mb-3">Brand</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uniqueBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(brand)}
                      onChange={(e) => {
                        const newTags = e.target.checked
                          ? [...filters.tags, brand]
                          : filters.tags.filter((t) => t !== brand)
                        handleFilterChange('tags', newTags)
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium text-[#1E3A5F] mb-3">Rating</h4>
              <div className="space-y-2">
                {[
                  { label: '4★ & above', value: 4 },
                  { label: '3★ & above', value: 3 },
                  { label: 'All', value: 0 },
                ].map((rating) => (
                  <label key={rating.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === rating.value}
                      onChange={() => handleFilterChange('minRating', rating.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">{rating.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort & View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="relevance">Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {[...Array(9)].map((_, i) => (
                <SkeletonCard key={i} variant="productCard" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products match your filters.</p>
              <Button onClick={handleResetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative">
                  {needQuery && product.matchScore !== undefined && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-2 py-1 bg-indigo-500 text-white text-xs rounded-full">
                        {product.matchScore}% match
                      </span>
                    </div>
                  )}
                  <ProductCard product={product} variant={viewMode} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProductList
