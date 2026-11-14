interface PriceTagProps {
  price: number
  salePrice: number
}

export function PriceTag({ price, salePrice }: PriceTagProps) {
  const hasSale = salePrice > 0 && salePrice < price

  return (
    <div className="flex items-baseline gap-3">
      {hasSale && (
        <span className="text-gray-400 line-through">${price}</span>
      )}
      
      <span className="text-2xl font-bold">
        ${hasSale ? salePrice : price}
      </span>
    </div>
  )
}