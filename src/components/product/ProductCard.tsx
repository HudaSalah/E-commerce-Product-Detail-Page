import { Star } from 'lucide-react'
import type { ProductSummary } from '../../types/product'

interface ProductCardProps {
  product: ProductSummary
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col gap-1.5">
      <a href="#" className="mb-2 block overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover"
        />
      </a>

      <h3 className="font-semibold">{product.brand}</h3>
      <p className="text-xl font-semibold">${product.price}</p>
      <p className="text-sm text-gray-500">{product.name}</p>

      <p className="flex items-center gap-2 text-sm text-gray-500">
        <Star size={16} className="fill-orange-400 text-orange-400" />
        <span className="font-medium text-black">{product.rating.toFixed(1)}</span>
        <span aria-hidden="true">·</span>
        <span>{product.sold.toLocaleString('en-US')} Sold</span>
      </p>
    </article>
  )
}