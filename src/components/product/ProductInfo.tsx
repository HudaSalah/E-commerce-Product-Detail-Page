import { useState } from 'react'
import type { Product } from '../../types/product'
import type { Selection } from '../../lib/variants'
import { cleanDescription, toPlainText } from '../../lib/format'
import { findVariant, getDefaultSelection, getEffectivePrice, isOptionAvailable } from '../../lib/variants'
import { useCartStore } from '../../store/cartStore'
import { PriceTag } from './PriceTag'
import { QuantitySelector } from './QuantitySelector'
import { VariationSelector } from './VariationSelector'

interface ProductInfoProps {
  product: Product
  onImageChange?: (image: string) => void
}

export function ProductInfo({ product, onImageChange }: ProductInfoProps) {
  const [selection, setSelection] = useState<Selection>(() => getDefaultSelection(product))
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const toggleCart = useCartStore((state) => state.toggleCart)

  const inStock = !product.track_stock || product.quantity > 0
  const variant = findVariant(product, selection)
  const salePrice = variant?.sale_price || product.sale_price

  const imageVariation = product.variations.find((variation) => variation.type === 'image')
  const selectedImage = imageVariation?.props.find(
    (prop) => prop.name === selection[imageVariation.name],
  )?.value

  const handleAddToCart = () => {
    if (!variant) {
      const missing = product.variations
        .filter((variation) => !selection[variation.name])
        .map((variation) => variation.name)
        .join(' and ')
      setError(`Please select ${missing}`)
      return false
    }

    addItem(
      {
        id: variant.id,
        productId: product.id,
        name: product.name,
        image: selectedImage ?? product.thumb,
        price: getEffectivePrice({ price: variant.price, sale_price: salePrice }),
        options: selection,
      },
      quantity,
    )

    setError('')
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    return true
  }

  const handleCheckout = () => {
    if (handleAddToCart()) {
      toggleCart(true)
    }
  }

  return (
    <section className="flex flex-col gap-5">
      <div>
        <p className="mb-1 text-sm text-gray-500">{product.categories[0]?.name}</p>
        <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
      </div>

      <PriceTag price={variant?.price ?? product.price} salePrice={salePrice} />

      <hr className="border-dashed border-gray-300" />

      <div>
        <h2 className="mb-2 font-semibold">Description:</h2>

        {expanded ? (
          <>
            <div
              className="prose prose-sm max-w-none text-gray-600 prose-p:my-2 prose-ul:my-2 prose-li:my-0"
              dangerouslySetInnerHTML={{ __html: cleanDescription(product.description) }}
            />
            <button type="button" onClick={() => setExpanded(false)} className="mt-1 text-sm font-semibold">
              See Less
            </button>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-gray-600">
            {toPlainText(product.description).slice(0, 180)}…{' '}
            <button type="button" onClick={() => setExpanded(true)} className="font-semibold text-black">
              See More...
            </button>
          </p>
        )}
      </div>

      {product.variations.map((variation) => (
        <VariationSelector
          key={variation.id}
          variation={variation}
          selected={selection[variation.name]}
          onSelect={(propName) => {
            setSelection((prev) => ({ ...prev, [variation.name]: propName }))

            const image = variation.props.find((prop) => prop.name === propName)?.value
            if (image) onImageChange?.(image)
          }}
          isAvailable={(propName) =>
            isOptionAvailable(product, selection, variation.name, propName)
          }
        />
      ))}

      <div className="flex items-center gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <p className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? 'In stock' : 'Out of stock'}
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="h-12 flex-1 rounded-lg bg-black font-semibold text-white disabled:opacity-40"
        >
          {added ? 'Added ✓' : 'Add To Cart'}
        </button>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!inStock}
          className="h-12 rounded-lg border border-gray-300 px-8 font-medium disabled:opacity-40 sm:w-44"
        >
          Checkout Now
        </button>
      </div>

      <a href="#" className="self-start text-sm underline">
        Delivery T&C
      </a>
    </section>
  )
}