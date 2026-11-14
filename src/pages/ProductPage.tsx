import { useMemo, useState } from 'react'
import { ImageGallery } from '../components/gallery/ImageGallery'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { ProductInfo } from '../components/product/ProductInfo'
import { useProduct } from '../hooks/useProduct'
import { getGalleryImages } from '../lib/images'

export function ProductPage() {
  const { data: product, isPending, isError, refetch } = useProduct()
  const [activeIndex, setActiveIndex] = useState(0)
  const images = useMemo(() => (product ? getGalleryImages(product) : []), [product])

  if (isPending) {
    return <p className="p-8 text-center">Loading…</p>
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Something went wrong while loading the product.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    )
  }

  const handleImageChange = (image: string) => {
    const index = images.indexOf(image)
    if (index >= 0) setActiveIndex(index)
  }

  return (
    <>
      <Breadcrumb items={['Homepage', product.categories[0]?.name ?? 'Shop', product.name]} />

      <main className="mx-auto grid max-w-5xl gap-8 px-4 pb-12 md:grid-cols-2 md:gap-12">
        <ImageGallery
          images={images}
          alt={product.name}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
        <ProductInfo product={product} onImageChange={handleImageChange} />
      </main>
      <hr className="mx-auto max-w-5xl border-dashed border-gray-300" />
    </>
  )
}