import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePinStore = create(
  persist(
    (set) => ({
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',

      setPincode: (pincode, city = '', state = '') => {
        set({ pincode, city, state })
      },
    }),
    { name: 'cartiq-pin' }
  )
)

export default usePinStore
