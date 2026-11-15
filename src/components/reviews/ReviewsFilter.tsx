import type { ReactNode } from 'react'
import { ChevronDown, Star } from 'lucide-react'

const RATINGS = [5, 4, 3, 2, 1]
const TOPICS = ['Product Quality', 'Seller Services', 'Product Price', 'Shipment', 'Match with Description']

const labelClass = 'flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-600'
const checkboxClass = 'h-4 w-4 accent-black'

interface FilterGroupProps {
  title: string
  children: ReactNode
}

function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <details open className="group border-t border-dashed border-gray-300 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </details>
  )
}

export function ReviewsFilter() {
  return (
    <aside
      aria-label="Reviews filter"
      className="self-start rounded-xl border border-dashed border-gray-300 px-5 pb-1 pt-5"
    >
      <h3 className="mb-4 text-lg font-semibold">Reviews Filter</h3>

      <FilterGroup title="Rating">
        {RATINGS.map((rating) => (
          <label key={rating} className={labelClass}>
            <input type="checkbox" name="rating" value={rating} className={checkboxClass} />
            <Star size={16} aria-hidden="true" className="fill-orange-400 text-orange-400" />
            {rating}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Review Topics">
        {TOPICS.map((topic) => (
          <label key={topic} className={labelClass}>
            <input type="checkbox" name="topic" value={topic} className={checkboxClass} />
            {topic}
          </label>
        ))}
      </FilterGroup>
    </aside>
  )
}