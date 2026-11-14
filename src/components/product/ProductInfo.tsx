import type { Product } from '../../types/product'
import { PriceTag } from './PriceTag'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const inStock = !product.track_stock || product.quantity > 0
  return (
    <section className="flex flex-col gap-4">
      <ul className="flex flex-wrap gap-2">
        {product.categories.map((category) => (
          <li key={category.id} className="rounded-full bg-gray-100 px-3 py-1 text-xs">
            {category.name}
          </li>
        ))}
      </ul>

      <h1 className="text-2xl font-semibold md:text-3xl">{product.name}</h1>

      <PriceTag price={product.price} salePrice={product.sale_price} />

      <p className={inStock ? 'text-green-600' : 'text-red-600'}>
        {inStock ? 'In stock' : 'Out of stock'}
      </p>

      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </section>
  )
}