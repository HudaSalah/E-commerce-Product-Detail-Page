import type { Product, Variant } from '../types/product'

function makeVariant(id: string, color: string, size: string): Variant {
  return {
    id,
    price: 190,
    sale_price: 0,
    quantity: 0,
    variation_props: [
      { id: `${id}-color`, variation: 'color', variation_prop: color },
      { id: `${id}-size`, variation: 'size', variation_prop: size },
    ],
  }
}

export const product: Product = {
  id: 'p1',
  name: 'Test Sneakers',
  slug: 'test-sneakers',
  description: '<p>Comfortable leather sneakers.</p>',
  price: 190,
  sale_price: 160,
  thumb: 'thumb.webp',
  images: ['main.webp'],
  quantity: 0,
  track_stock: false,
  variations: [
    {
      id: 'var-color',
      name: 'color',
      type: 'image',
      props: [
        { id: 'c1', name: 'brown', variation_id: 'var-color', value: 'brown.webp' },
        { id: 'c2', name: 'black', variation_id: 'var-color', value: 'black.webp' },
      ],
    },
    {
      id: 'var-size',
      name: 'size',
      type: 'button',
      props: [
        { id: 's1', name: '38', variation_id: 'var-size' },
        { id: 's2', name: '40', variation_id: 'var-size' },
      ],
    },
  ],
  variants: [
    makeVariant('v1', 'brown', '38'),
    makeVariant('v2', 'brown', '40'),
    makeVariant('v3', 'black', '38'),
    makeVariant('v4', 'black', '40'),
  ],
  categories: [{ id: 'cat1', name: 'Sneakers', slug: 'sneakers', thumb: '' }],
}