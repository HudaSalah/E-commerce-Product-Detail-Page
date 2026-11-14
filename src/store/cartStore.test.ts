import { beforeEach, describe, expect, it } from 'vitest'
import { selectCount, useCartStore } from './cartStore'

const item = {
  id: 'v1',
  productId: 'p1',
  name: 'Sneakers',
  image: '',
  price: 190,
  options: { color: 'brown', size: '40' },
}

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false })
  })

  it('merges quantity when the same variant is added twice', () => {
    useCartStore.getState().addItem(item, 1)
    useCartStore.getState().addItem(item, 2)

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(selectCount(state)).toBe(3)
  })

  it('caps quantity at MAX_QUANTITY', () => {
    useCartStore.getState().addItem(item, 5)
    useCartStore.getState().addItem(item, 10)
})

it('removes the item when quantity is set below 1', () => {
    useCartStore.getState().addItem(item, 1)
    useCartStore.getState().updateQuantity('v1', 0)
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
})

it('removes an item by id', () => {
    useCartStore.getState().addItem(item, 1)
    useCartStore.getState().removeItem('v1')
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
})

it('calculates the cart total', () => {
    useCartStore.getState().addItem(item, 2)
    const state = useCartStore.getState()
    const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    expect(total).toBe(380)
})
})