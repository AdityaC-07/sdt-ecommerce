import { create } from 'zustand'

const useUIStore = create((set) => ({
  comparisonList: [],
  toastMessage: null,
  isSeniorMode: false,

  addToComparison: (product) => {
    set((state) => {
      if (state.comparisonList.length >= 3) {
        return state
      }
      if (state.comparisonList.find((p) => p.id === product.id)) {
        return state
      }
      return { comparisonList: [...state.comparisonList, product] }
    })
  },

  removeFromComparison: (id) => {
    set((state) => ({
      comparisonList: state.comparisonList.filter((p) => p.id !== id),
    }))
  },

  clearComparison: () => set({ comparisonList: [] }),

  showToast: (message, type) => {
    set({ toastMessage: { message, type } })
    setTimeout(() => set({ toastMessage: null }), 3000)
  },

  toggleSeniorMode: () => set((state) => ({ isSeniorMode: !state.isSeniorMode })),
}))

export default useUIStore
