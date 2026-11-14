import type { Product } from '../types/product'

const BASE_URL = 'https://api.easy-orders.net/api/v1/products/slug/clear-theme'

export async function fetchProduct(slug: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${slug}?join=reviews`)

  if (!res.ok) {
    throw new Error(`Failed to load product (${res.status})`)
  }

  return res.json()
}