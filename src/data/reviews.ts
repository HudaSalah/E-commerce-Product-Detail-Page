import type { Review, ReviewSummaryData } from '../types/review'
import product1 from '../assets/products/product-1.jpg'
import product2 from '../assets/products/product-2.jpg'
import product3 from '../assets/products/product-3.jpg'
import product4 from '../assets/products/product-4.jpg'

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

export const reviews: Review[] = [
  { id: 'r-1', rating: 5, text: 'This is amazing product I have.', date: 'July 2, 2020 03:29 PM', author: 'Darrell Steward', avatar: product1, likes: 128, liked: true },
  { id: 'r-2', rating: 5, text: 'This is amazing product I have.', date: 'July 2, 2020 1:04 PM', author: 'Darlene Robertson', avatar: product2, likes: 82, liked: false },
  { id: 'r-3', rating: 5, text: 'This is amazing product I have.', date: 'June 26, 2020 10:03 PM', author: 'Kathryn Murphy', avatar: product3, likes: 9, liked: false },
  { id: 'r-4', rating: 5, text: 'This is amazing product I have.', date: 'July 7, 2020 10:14 AM', author: 'Ronald Richards', avatar: product4, likes: 124, liked: false },
]

export const productStats = { sold: 1238, rating: 4.5 }

