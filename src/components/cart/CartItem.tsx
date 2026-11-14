import { Trash2 } from 'lucide-react'
import type { CartItem } from '../../store/cartStore'
import { useCartStore } from '../../store/cartStore'
import { QuantitySelector } from '../product/QuantitySelector'

export function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const options = Object.entries(item.options)
    .map(([name, value]) => `${name}: ${value}`)
    .join(' · ')

  return (
    <li className="flex gap-4 py-4">
      <img src={item.image} alt="" className="h-20 w-20 rounded-lg bg-gray-100 object-cover" />

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <p className="text-sm font-medium">{item.name}</p>
          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>

        <p className="text-xs capitalize text-gray-500">{options}</p>

        <div className="flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(value) => updateQuantity(item.id, value)}
          />
          <span className="font-semibold">${item.price * item.quantity}</span>
        </div>
      </div>
    </li>
  )
}