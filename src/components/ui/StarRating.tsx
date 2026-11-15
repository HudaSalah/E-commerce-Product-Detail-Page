import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number
  size?: number
}

const STARS = [1, 2, 3, 4, 5]

export function StarRating({ value, size = 20 }: StarRatingProps) {
  const filled = Math.round(value)

  return (
    <div role="img" aria-label={`${value} out of 5 stars`} className="flex gap-1">
      {STARS.map((star) => (
        <Star
          key={star}
          size={size}
          aria-hidden="true"
          className={star <= filled ? 'fill-orange-400 text-orange-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  )
}