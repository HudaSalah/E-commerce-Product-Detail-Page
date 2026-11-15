import type { ProductSummary } from '../../types/product'
import { SectionHeader } from '../ui/SectionHeader'
import { ProductCard } from './ProductCard'

interface ProductSectionProps {
  title: string
  products: ProductSummary[]
}

export function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4">
      <div className="border-t border-dashed border-gray-300 py-12 md:py-20">
        <SectionHeader title={title} viewAllHref="#" />

        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-9">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}