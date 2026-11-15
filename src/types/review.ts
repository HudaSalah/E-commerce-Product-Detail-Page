export interface RatingBreakdown {
  stars: number
  count: number
  percent: number
}

export interface ReviewSummaryData {
  average: number
  totalLabel: string
  breakdown: RatingBreakdown[]
}

export interface Review {
  id: string
  rating: number
  text: string
  date: string
  author: string
  avatar: string
  likes: number
  liked: boolean
}