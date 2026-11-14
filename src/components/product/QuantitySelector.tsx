import { MAX_QUANTITY } from '../../store/cartStore'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({ value, onChange, min = 1, max = MAX_QUANTITY }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="h-11 w-11 text-lg disabled:opacity-40"
      >
        −
      </button>

      <span aria-live="polite" className="w-10 text-center">{value}</span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="h-11 w-11 text-lg disabled:opacity-40"
      >
        +
      </button>
    </div>
  )
}