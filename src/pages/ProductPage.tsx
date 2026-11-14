import { ImageGallery } from '../components/gallery/ImageGallery'
import { PriceTag } from '../components/product/PriceTag'
import { ProductInfo } from '../components/product/ProductInfo'
import { useProduct } from '../hooks/useProduct'
import { getGalleryImages } from '../lib/images'

export default function App() {
  const { data: product, isPending, isError, refetch } = useProduct()

  if (isPending) {
    return <p className="p-8 text-center">Loading…</p>
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Something went wrong while loading the product.</p>
        <button onClick={() => refetch()} className="rounded bg-black px-4 py-2 text-white">
          Try again
        </button>
      </div>
    )
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 p-4 md:grid-cols-[2fr_3fr]">
      <ImageGallery images={getGalleryImages(product)} alt={product.name} />
      {/* <PriceTag price={product.price} salePrice={product.sale_price} /> */}
      <ProductInfo product={product} />
    </main>
  )
}