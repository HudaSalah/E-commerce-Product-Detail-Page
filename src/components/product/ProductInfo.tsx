import { useState } from 'react'
import type { Product } from '../../types/product'
import type { Selection } from '../../lib/variants'
import { PriceTag } from './PriceTag'
import { VariationSelector } from './VariationSelector'
import { useCartStore } from '../../store/cartStore'
import { findVariant, isOptionAvailable, getEffectivePrice } from '../../lib/variants'
import { QuantitySelector } from './QuantitySelector'
interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const inStock = !product.track_stock || product.quantity > 0
  const [selection, setSelection] = useState<Selection>({})
const variant = findVariant(product, selection)
const [quantity, setQuantity] = useState(1)
const [error, setError] = useState('')
const [added, setAdded] = useState(false)
const addItem = useCartStore((state) => state.addItem)

const handleAddToCart = () => {
  if (!variant) {
    const missing = product.variations
      .filter((variation) => !selection[variation.name])
      .map((variation) => variation.name)
      .join(' and ')
    setError(`Please select ${missing}`)
    return
  }

  addItem(
    {
      id: variant.id,
      productId: product.id,
      name: product.name,
      image: product.thumb,
      price: getEffectivePrice(variant),
      options: selection,
    },
    quantity,
  )

  setError('')
  setAdded(true)
  setTimeout(() => setAdded(false), 2000)
}
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

      <PriceTag
        price={variant?.price ?? product.price}
        salePrice={variant ? variant.sale_price : product.sale_price}
      />

      {product.variations.map((variation) => (
        <VariationSelector
          key={variation.id}
          variation={variation}
          selected={selection[variation.name]}
          onSelect={(propName) =>
            setSelection((prev) => ({ ...prev, [variation.name]: propName }))
          }
          isAvailable={(propName) =>
            isOptionAvailable(product, selection, variation.name, propName)
          }
        />
      ))}
      <p className={inStock ? 'text-green-600' : 'text-red-600'}>
        {inStock ? 'In stock' : 'Out of stock'}
      </p>

      <div className="flex items-center gap-3">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock}
            className="h-11 flex-1 rounded-lg bg-black px-6 font-medium text-white disabled:opacity-40"
          >
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </section>
  )
}