import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../api/product'

export function useProduct(slug = 'Sneakers12') {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug),
  })
}