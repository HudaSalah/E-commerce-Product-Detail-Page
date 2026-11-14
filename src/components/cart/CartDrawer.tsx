import { useEffect } from 'react'
import { X } from 'lucide-react'
import { selectTotal, useCartStore } from '../../store/cartStore'
import { CartItemRow } from './CartItem'

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen)
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectTotal)
  const toggleCart = useCartStore((state) => state.toggleCart)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleCart(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, toggleCart])

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => toggleCart(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        inert={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button type="button" aria-label="Close cart" onClick={() => toggleCart(false)}>
            <X size={20} />
          </button>
        </header>

        {items.length === 0 ? (
          <p className="flex flex-1 items-center justify-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto px-5">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </ul>

            <footer className="border-t border-gray-200 px-5 py-4">
              <p className="mb-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </p>
              <button type="button" className="h-12 w-full rounded-lg bg-black font-semibold text-white">
                Checkout
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}