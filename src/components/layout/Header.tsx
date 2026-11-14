import { ChevronDown, Heart, Menu, Search, User } from 'lucide-react'
import { CartButton } from '../cart/CartButton'
import logo from '../../assets/logo.png'
export function Header() {
  return (
    <header>
      <p className="bg-black px-4 py-2 text-center text-xs text-white">
        New season coming! Discount 10% for all product! Checkout Now!
        <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5">20:40</span>
      </p>

      <div className="mx-auto flex max-w-5xl items-center justify-between border-b border-dashed border-gray-300 px-4 py-5">
        <a href="/" className="text-lg font-semibold tracking-[0.25em]">
          <img src={logo} alt="John Lewis & Partners" className="h-8 w-auto" />
        </a>

        <nav className="flex items-center gap-1 md:gap-4">
          <button type="button" aria-label="Search" className="flex h-10 w-10 items-center justify-center">
            <Search size={20} />
          </button>
          <button type="button" className="hidden items-center gap-1 text-sm font-medium md:flex">
            Categories <ChevronDown size={16} />
          </button>
          <button type="button" className="hidden items-center gap-1 text-sm font-medium md:flex">
            <User size={18} /> Sign in
          </button>
          <button type="button" aria-label="Wishlist" className="hidden md:flex h-10 w-10 items-center justify-center">
            <Heart size={20} />
          </button>
          <CartButton />
          <button type="button" aria-label="Open menu" className="flex h-10 w-10 items-center justify-center md:hidden">
            <Menu size={20} />
          </button>
        </nav>
      </div>
    </header>
  )
}