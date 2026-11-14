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
      <legend className="mb-2 text-sm text-gray-500 capitalize">
        {variation.name}
        {selected && <span className="font-semibold text-black">: {selected}</span>}
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
                          ${
                            isSelected
                              ? variation.type === 'image'
                                ? 'border-transparent ring-2 ring-black ring-offset-2'
                                : 'border-black bg-gray-200'
                              : 'border-gray-200'
                          }`}
            >
              {variation.type === 'image' ? (
                <img src={prop.value} alt={prop.name} className="h-9 w-16 object-cover" />
              ) : (
                <span className="flex h-9 min-w-16 items-center justify-center px-3">{prop.name}</span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}