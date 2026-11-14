import type { Product, Variant } from '../types/product'

// { color: 'brown', size: '40' }
export type Selection = Record<string, string>

export function getDefaultSelection(product: Product): Selection {
  const variant = product.variants.find((v) => isVariantInStock(product, v))
  if (!variant) return {}

  return Object.fromEntries(
    variant.variation_props.map((vp) => [vp.variation, vp.variation_prop]),
  )
}

export function findVariant(product: Product, selection: Selection): Variant | undefined {
  const allChosen = Object.keys(selection).length === product.variations.length
  if (!allChosen) return undefined

  return product.variants.find((variant) =>
    variant.variation_props.every(
      (vp) => selection[vp.variation] === vp.variation_prop,
    ),
  )
}

export function isVariantInStock(product: Product, variant: Variant): boolean {
  return product.track_stock ? variant.quantity > 0 : true
}

export function isOptionAvailable(
  product: Product,
  selection: Selection,
  variationName: string,
  propName: string,
): boolean {
  const next = { ...selection, [variationName]: propName }

  return product.variants.some(
    (variant) =>
      isVariantInStock(product, variant) &&
      variant.variation_props.every(
        (vp) => next[vp.variation] === undefined || next[vp.variation] === vp.variation_prop,
      ),
  )
}

export function getEffectivePrice(item: { price: number; sale_price: number }): number {
  const hasSale = item.sale_price > 0 && item.sale_price < item.price
  return hasSale ? item.sale_price : item.price
}