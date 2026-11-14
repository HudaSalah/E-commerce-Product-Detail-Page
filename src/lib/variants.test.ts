import { describe, expect, it } from 'vitest'
import { product } from '../test/fixtures'
import {
  findVariant,
  getDefaultSelection,
  getEffectivePrice,
  isOptionAvailable,
} from './variants'

describe('findVariant', () => {
  it('returns the variant matching the full selection', () => {
    const variant = findVariant(product, { color: 'brown', size: '40' })
    expect(variant?.id).toBe('v2')
  })

  it('returns undefined when the selection is incomplete', () => {
    const variant = findVariant(product, { color: 'brown' })
    expect(variant).toBeUndefined()
  })
})

describe('isOptionAvailable', () => {
  it('treats every option as available when stock is not tracked', () => {
    expect(isOptionAvailable(product, {}, 'size', '40')).toBe(true)
  })

  it('disables options with no stock when stock is tracked', () => {
    const tracked = { ...product, track_stock: true }
    expect(isOptionAvailable(tracked, {}, 'size', '40')).toBe(false)
  })
})

describe('getEffectivePrice', () => {
  it('uses the sale price when it is lower than the price', () => {
     expect(getEffectivePrice({ price: 190, sale_price: 160 })).toBe(160)
  })

  it('ignores a zero sale price', () => {
    expect(getEffectivePrice({ price: 190, sale_price: 0 })).toBe(190)
  })
})

describe('getDefaultSelection', () => {
  it('selects the first available variant', () => {
    expect(getDefaultSelection(product)).toEqual({ color: 'brown', size: '38' })
  })
})