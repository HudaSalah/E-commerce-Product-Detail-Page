interface SectionHeaderProps {
  title: string
  viewAllHref?: string
}

export function SectionHeader({ title, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="text-2xl font-semibold md:text-[28px]">{title}</h2>
      {viewAllHref && (
        <a href={viewAllHref} className="text-sm font-medium underline">
          View All
        </a>
      )}
    </div>
  )
}