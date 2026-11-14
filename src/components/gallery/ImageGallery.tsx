import { useState } from 'react'
import type { MouseEvent } from 'react'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomOrigin, setZoomOrigin] = useState<string | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomOrigin(`${x}% ${y}%`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="aspect-square overflow-hidden rounded-xl bg-gray-100"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomOrigin(null)}
      >
        <img
          src={images[activeIndex]}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300"
          style={{
            transform: zoomOrigin ? 'scale(2)' : undefined,
            transformOrigin: zoomOrigin ?? undefined,
          }}
        />
      </div>

      <ul className="grid grid-cols-5 gap-3">
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              className={`aspect-square w-full overflow-hidden rounded-lg border-2 ${
                index === activeIndex ? 'border-black' : 'border-transparent'
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}