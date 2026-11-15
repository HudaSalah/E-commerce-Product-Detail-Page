import { SectionHeader } from '../ui/SectionHeader'
import { ReviewSummary } from './ReviewSummary'
import { reviews, reviewSummary } from '../../data/reviews'
import { ReviewList } from './ReviewList'
import { ReviewsFilter } from './ReviewsFilter'

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4">
      <div className="border-t border-dashed border-gray-300 py-12 md:py-20">
        <SectionHeader title="Product Reviews" />
        <ReviewSummary summary={reviewSummary} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
          <div className="hidden lg:block">
            <ReviewsFilter />
          </div>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </section>
  )
}