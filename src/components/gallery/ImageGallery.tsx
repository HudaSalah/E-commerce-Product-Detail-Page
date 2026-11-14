import { useState } from 'react'
import type { MouseEvent } from 'react'
import { ChevronLeft, ChevronRight, Heart, Share } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  alt: string
  activeIndex: number
  onChange: (index: number) => void
}

const sideButton = 'flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100'

export function ImageGallery({ images, alt, activeIndex, onChange }: ImageGalleryProps) {
  const [zoomOrigin, setZoomOrigin] = useState<string | null>(null)
  const [wishlisted, setWishlisted] = useState(false)

  const handleShare = async () => {
    const url = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({ title: alt, url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch {
      // the user dismissed the share sheet
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomOrigin(`${x}% ${y}%`)
  }

  const showPrevious = () => onChange((activeIndex - 1 + images.length) % images.length)
  const showNext = () => onChange((activeIndex + 1) % images.length)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div
          className="aspect-[3/4] flex-1 overflow-hidden rounded-2xl bg-gray-100"
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

        <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <button type="button" aria-label="Share product" onClick={handleShare} className={sideButton}>
            <Share size={18} />
          </button>
          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            onClick={() => setWishlisted(!wishlisted)}
            className={sideButton}
          >
            <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button type="button" aria-label="Previous image" onClick={showPrevious} className={sideButton}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label="Next image" onClick={showNext} className={sideButton}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      </div>

      <ul className="grid grid-cols-5 gap-3">
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => onChange(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              className={`aspect-square w-full overflow-hidden rounded-xl border-2 bg-gray-100 ${
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