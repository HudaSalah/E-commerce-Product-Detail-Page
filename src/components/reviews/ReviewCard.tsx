import { ThumbsDown, ThumbsUp } from 'lucide-react'
import type { Review } from '../../types/review'
import { StarRating } from '../ui/StarRating'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex flex-col gap-2 py-6">
      <StarRating value={review.rating} />
      <p className="font-semibold">{review.text}</p>
      <p className="text-sm text-gray-500">{review.date}</p>

      <div className="mt-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={review.avatar} alt="" loading="lazy" className="h-8 w-8 rounded-full object-cover object-top" />
          <span className="text-sm font-medium">{review.author}</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label={`Helpful, ${review.likes} likes`}
            aria-pressed={review.liked}
            className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm"
          >
            <ThumbsUp size={18} className={review.liked ? 'fill-green-600 text-green-600' : ''} />
            {review.likes}
          </button>
          <button
            type="button"
            aria-label="Not helpful"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200"
          >
            <ThumbsDown size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}