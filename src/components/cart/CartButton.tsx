import { ShoppingBag } from 'lucide-react'
import { selectCount, useCartStore } from '../../store/cartStore'

export function CartButton() {
  const count = useCartStore(selectCount)
  const toggleCart = useCartStore((state) => state.toggleCart)

  return (
    <button
      type="button"
      onClick={() => toggleCart(true)}
      aria-label={`Open cart, ${count} items`}
      className="relative flex h-10 w-10 items-center justify-center"
    >
      <ShoppingBag size={20} />
      {count > 0 && (
        <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  )
}