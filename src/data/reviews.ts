import type { ReviewSummaryData } from '../types/review'

// Static placeholder data: the product endpoint returns no reviews.
export const reviewSummary: ReviewSummaryData = {
  average: 4.5,
  totalLabel: '1.25k',
  breakdown: [
    { stars: 5, count: 2823, percent: 84 },
    { stars: 4, count: 38, percent: 47 },
    { stars: 3, count: 4, percent: 15 },
    { stars: 2, count: 0, percent: 0 },
    { stars: 1, count: 0, percent: 0 },
  ],
}