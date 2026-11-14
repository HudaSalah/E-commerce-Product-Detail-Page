import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from '../../store/cartStore'
import { product } from '../../test/fixtures'
import { ProductInfo } from './ProductInfo'

describe('ProductInfo', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false })
  })

  it('adds the selected variant to the cart', async () => {
    const user = userEvent.setup()
    render(<ProductInfo product={product} />)

    await user.click(screen.getByRole('button', { name: '40' }))
    await user.click(screen.getByRole('button', { name: 'Add To Cart' }))

    const [item] = useCartStore.getState().items
    expect(item.options).toEqual({ color: 'brown', size: '40' })
    expect(item.quantity).toBe(1)
  })

  it('shows the discounted price', () => {
    render(<ProductInfo product={product} />)

    expect(screen.getByText('$160')).toBeInTheDocument()
    expect(screen.getByText('$190')).toBeInTheDocument()
  })
})