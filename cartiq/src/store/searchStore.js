import { create } from 'zustand'

const useSearchStore = create((set) => ({
  query: '',
  needQuery: '',
  filters: {
    category: null,
    minPrice: 0,
    maxPrice: 200000,
    minRating: 0,
    sortBy: 'relevance',
    tags: [],
  },
  results: [],
  isSearching: false,

  setQuery: (q) => set({ query: q }),
  setNeedQuery: (q) => set({ needQuery: q }),
  setFilter: (key, val) =>
    set((state) => ({
      filters: { ...state.filters, [key]: val },
    })),
  resetFilters: () =>
    set({
      filters: {
        category: null,
        minPrice: 0,
        maxPrice: 200000,
        minRating: 0,
        sortBy: 'relevance',
        tags: [],
      },
    }),
  setResults: (products) => set({ results: products }),
  setSearching: (bool) => set({ isSearching: bool }),
}))

export default useSearchStore
