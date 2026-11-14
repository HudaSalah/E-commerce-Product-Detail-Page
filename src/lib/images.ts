import type { Product } from '../types/product'

export function getGalleryImages(product: Product): string[] {
  const colorImages = product.variations
    .filter((variation) => variation.type === 'image')
    .flatMap((variation) => variation.props.map((prop) => prop.value))
    .filter((value) => value !== undefined)

  const all = [product.thumb, ...product.images, ...colorImages]

  return [...new Set(all)]
}