import { useEffect, useState } from 'react'
import useSearchStore from '../store/searchStore'
import matchProductsToNeed from '../utils/needSearch'
import products from '../data/products.json'

const useNeedSearch = () => {
  const { needQuery, setResults, setSearching } = useSearchStore()
  const [results, setLocalResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (needQuery) {
      setIsSearching(true)
      setSearching(true)

      // Simulate processing delay
      setTimeout(() => {
        const matched = matchProductsToNeed(needQuery, products)
        setLocalResults(matched)
        setResults(matched)
        setIsSearching(false)
        setSearching(false)
      }, 600)
    }
  }, [needQuery, setResults, setSearching])

  const topMatch = results.length > 0 ? results[0] : null

  return { results, isSearching, topMatch }
}

export default useNeedSearch
