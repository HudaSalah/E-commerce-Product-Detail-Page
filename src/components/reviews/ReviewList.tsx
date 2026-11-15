import { useState } from 'react'
import type { Review } from '../../types/review'
import { Pagination } from '../ui/Pagination'
import { ReviewCard } from './ReviewCard'
import { Filter } from 'lucide-react'

const TABS = ['All Reviews', 'With Photo & Video', 'With Description']

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Review Lists</h3>

      <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={tab === activeTab}
                  onClick={() => setActiveTab(tab)}
                  className={`h-10 rounded-lg border px-4 text-sm font-medium ${
                    tab === activeTab ? 'border-black bg-gray-200' : 'border-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

        <button
          type="button"
          aria-label="Open reviews filter"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 lg:hidden"
        >
          <Filter size={18} />
        </button>
      </div>


      <ul className="mt-2">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-dashed border-gray-300 last:border-b-0">
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      <Pagination />
    </div>
  )
}