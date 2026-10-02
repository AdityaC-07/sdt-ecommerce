import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product, qty = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + qty }
                  : item
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: qty,
                seller: product.seller.name,
              },
            ],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: qty } : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [], coupon: null })
      },

      applyCoupon: (code) => {
        const validCoupons = {
          SAVE10: { discount: 0.1, message: 'SAVE10 applied! You save 10%' },
          STUDENT15: { discount: 0.15, message: 'STUDENT15 applied! You save 15%' },
        }

        if (validCoupons[code]) {
          set({ coupon: { code, ...validCoupons[code] } })
          return { success: true, message: validCoupons[code].message }
        }
        return { success: false, message: 'Invalid coupon code' }
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      discount: () => {
        const { coupon } = get()
        if (!coupon) return 0
        return get().subtotal() * coupon.discount
      },

      total: () => {
        return get().subtotal() - get().discount()
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCartStore
