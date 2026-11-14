import type { Variation } from '../../types/product'

interface VariationSelectorProps {
  variation: Variation
  selected?: string
  onSelect: (propName: string) => void
  isAvailable: (propName: string) => boolean
}

export function VariationSelector({ variation, selected, onSelect, isAvailable }: VariationSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium capitalize">
        {variation.name}
        {selected && <span className="font-normal text-gray-500">: {selected}</span>}
      </legend>

      <div className="flex flex-wrap gap-2">
        {variation.props.map((prop) => {
          const isSelected = prop.name === selected
          const disabled = !isAvailable(prop.name)

          return (
            <button
              key={prop.id}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => onSelect(prop.name)}
              className={`min-h-11 min-w-11 overflow-hidden rounded-lg border-2 text-sm
                disabled:cursor-not-allowed disabled:opacity-40
                ${isSelected ? 'border-black' : 'border-gray-200'}`}
            >
              {variation.type === 'image' ? (
                <img src={prop.value} alt={prop.name} className="h-14 w-14 object-cover" />
              ) : (
                <span className="px-3">{prop.name}</span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}