import { ChevronDown, ChevronRight, Globe, Mail } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6'
import logo from '../../assets/logo.png'

const SOCIALS = [
  { name: 'Facebook', Icon: FaFacebookF },
  { name: 'Instagram', Icon: FaInstagram },
  { name: 'Twitter', Icon: FaTwitter },
  { name: 'Email', Icon: Mail },
]

const LINK_GROUPS = [
  { title: 'Shop', links: ['My account', 'Login', 'Wishlist', 'Cart'] },
  { title: 'Information', links: ['Shipping Policy', 'Returns & Refunds', 'Cookies Policy', 'Frequently asked'] },
  { title: 'Company', links: ['About us', 'Privacy Policy', 'Terms & Conditions', 'Contact Us'] },
]

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div className="flex max-w-xs flex-col gap-6">
            <img src={logo} alt="John Lewis & Partners" className="h-8 w-auto self-start" />

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-gray-400">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Get latest offers to your inbox"
                className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-12 items-center justify-center rounded-lg bg-black text-white"
              >
                <ChevronRight size={18} />
              </button>
            </form>

            <ul className="flex gap-4">
              {SOCIALS.map((social) => (
                <li key={social.name}>
                  <a
                    href="#"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white"
                  >
                    <social.Icon size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-24">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-semibold">{group.title}</h3>
                <ul className="flex flex-col gap-3 text-sm">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-600 hover:text-black">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-dashed border-gray-400 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">© John Lewis plc 2001 - 2024</p>

          <div className="flex items-center gap-6 font-medium">
            <button type="button" className="flex items-center gap-2">
              <Globe size={16} aria-hidden="true" />
              English <ChevronDown size={16} />
            </button>
            <button type="button" className="flex items-center gap-1">
              USD <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}