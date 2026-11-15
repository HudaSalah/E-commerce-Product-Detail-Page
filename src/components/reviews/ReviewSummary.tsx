import { Star } from 'lucide-react'
import type { ReviewSummaryData } from '../../types/review'
import { StarRating } from '../ui/StarRating'

interface ReviewSummaryProps {
  summary: ReviewSummaryData
}

export function ReviewSummary({ summary }: ReviewSummaryProps) {
  const ringPercent = (summary.average / 5) * 100

  return (
    <div className="grid gap-6 rounded-xl border border-dashed border-gray-300 p-6 lg:grid-cols-[320px_1fr] lg:gap-10">
      <div className="flex items-center gap-4  self-start">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
          style={{ background: `conic-gradient(#fb923c ${ringPercent}%, #fed7aa 0)` }}
        >
          <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white text-xl font-semibold">
            {summary.average.toFixed(1)}
          </span>
        </div>

        <div>
          <StarRating value={summary.average} />
          <p className="mt-1 text-sm">from {summary.totalLabel} reviews</p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {summary.breakdown.map((row) => (
          <li key={row.stars} className="flex items-center gap-3 text-sm font-medium">
            <span className="w-7">{row.stars.toFixed(1)}</span>
            <Star size={16} aria-hidden="true" className="fill-orange-400 text-orange-400" />

            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-black"
                style={{ width: `${row.percent}%` }}
              />
            </div>

            <span className="w-10 text-right">{row.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}