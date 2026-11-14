interface PriceTagProps {
  price: number
  salePrice: number
}

export function PriceTag({ price, salePrice }: PriceTagProps) {
  const hasSale = salePrice > 0 && salePrice < price

  return (
    <div className="flex items-baseline gap-3">
      {hasSale && (
        <span className="text-gray-400 line-through text-lg">${price}</span>
      )}
      
      <span className="text-[28px] font-semibold">
        ${hasSale ? salePrice : price}
      </span>
    </div>
  )
}