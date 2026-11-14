import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const MAX_QUANTITY = 10

export interface CartItem {
  id: string 
  productId: string
  name: string
  image: string
  price: number
  options: Record<string, string>
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  toggleCart: (open?: boolean) => void
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            existing.quantity = Math.min(existing.quantity + quantity, MAX_QUANTITY)
          } else {
            state.items.push({ ...item, quantity: Math.min(quantity, MAX_QUANTITY) })
          }
        }),

      updateQuantity: (id, quantity) =>
  set((state) => {
    if (quantity < 1) {
      state.items = state.items.filter((i) => i.id !== id)
      return
    }
    const item = state.items.find((i) => i.id === id)
    if (item) {
      item.quantity = Math.min(quantity, MAX_QUANTITY)
    }
  }),

removeItem: (id) =>
  set((state) => {
    state.items = state.items.filter((i) => i.id !== id)
  }),

clearCart: () =>
  set((state) => {
    state.items = []
  }),

toggleCart: (open) =>
  set((state) => {
    state.isOpen = open ?? !state.isOpen
  }),
    })),
    {
      name: 'cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export const selectCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)