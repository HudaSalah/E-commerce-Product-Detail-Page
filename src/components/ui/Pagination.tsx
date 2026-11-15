import { ChevronRight } from 'lucide-react'

const PAGES = ['1', '2', '…', '19']
const CURRENT = '1'

export function Pagination() {
  return (
    <nav aria-label="Reviews pages" className="mt-6 flex items-center justify-center gap-2">
      {PAGES.map((page) =>
        page === '…' ? (
          <span
            key={page}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-400"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === CURRENT ? 'page' : undefined}
            className={`h-10 w-10 rounded-lg border text-sm font-medium ${
              page === CURRENT ? 'border-black' : 'border-gray-200 text-gray-500'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button type="button" aria-label="Next page" className="flex h-10 w-10 items-center justify-center">
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}