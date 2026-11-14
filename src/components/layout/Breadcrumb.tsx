import { ChevronRight } from 'lucide-react'

interface BreadcrumbProps {
  items: string[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-5xl px-4 py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item} className="flex items-center gap-2">
              <span className={isLast ? 'font-medium text-black' : ''} aria-current={isLast ? 'page' : undefined}>
                {item}
              </span>
              {!isLast && <ChevronRight size={14} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}