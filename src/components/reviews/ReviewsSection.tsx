import { reviewSummary } from '../../data/reviews'
import { SectionHeader } from '../ui/SectionHeader'
import { ReviewSummary } from './ReviewSummary'

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4">
      <div className="border-t border-dashed border-gray-300 py-12 md:py-20">
        <SectionHeader title="Product Reviews" />
        <ReviewSummary summary={reviewSummary} />
      </div>
    </section>
  )
}