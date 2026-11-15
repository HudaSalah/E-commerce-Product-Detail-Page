import type { ProductSummary } from '../types/product'
import product1 from '../assets/products/product-1.jpg'
import product2 from '../assets/products/product-2.jpg'
import product3 from '../assets/products/product-3.jpg'
import product4 from '../assets/products/product-4.jpg'
import product5 from '../assets/products/product-5.jpg'

// Static placeholder data: the product endpoint does not return recommendations.
export const relatedProducts: ProductSummary[] = [
  { id: 'p-1', brand: 'Whistle', name: 'Wide Leg Cropped Jeans, Denim', price: 26, rating: 4.8, sold: 1238, image: product1 },
  { id: 'p-2', brand: 'John Lewis ANYDAY', name: 'Long Sleeve Utility Shirt, Navy, 6', price: 26, rating: 4.8, sold: 1238, image: product2 },
  { id: 'p-3', brand: 'John Lewis ANYDAY', name: 'Stripe Curved Hem Shirt, Blue', price: 32, rating: 4.5, sold: 620, image: product3 },
  { id: 'p-4', brand: 'John Lewis ANYDAY', name: 'Denim Overshirt, Mid Wash', price: 40, rating: 4.6, sold: 238, image: product4 },
  { id: 'p-5', brand: 'John Lewis', name: 'Linen Blazer, Navy', price: 79, rating: 4.8, sold: 1238, image: product5 },
]

export const popularProducts: ProductSummary[] = relatedProducts