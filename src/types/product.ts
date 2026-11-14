export interface VariationProp {
  id: string
  name: string
  variation_id: string
  value?: string // image url, only for "image" variations
}

export interface Variation {
  id: string
  name: string
  type: 'image' | 'button'
  props: VariationProp[]
}

export interface VariantProp {
  id: string
  variation: string
  variation_prop: string
}

export interface Variant {
  id: string
  price: number
  sale_price: number
  quantity: number
  variation_props: VariantProp[]
}

export interface Category {
  id: string
  name: string
  slug: string
  thumb: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  sale_price: number
  thumb: string
  images: string[]
  quantity: number
  track_stock: boolean
  variations: Variation[]
  variants: Variant[]
  categories: Category[]
}