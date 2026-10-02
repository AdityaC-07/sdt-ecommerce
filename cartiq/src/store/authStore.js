import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import users from '../data/users.json'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (email, password) => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        )
        if (user) {
          set({ user, isLoggedIn: true })
          return { success: true, role: user.role }
        }
        return { success: false, role: null }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false })
      },

      toggleSeniorMode: () => {
        set((state) => ({
          user: state.user ? { ...state.user, seniorMode: !state.user.seniorMode } : null,
        }))
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
