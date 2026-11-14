import type { Variation } from '../../types/product'

// The API only provides a name and an image for color options,
// so known names are mapped to a swatch color and the image is the fallback.
const SWATCH_COLORS: Record<string, string> = {
  brown: '#5C4033',
  black: '#111111',
  biege: '#D8C3A5', // spelled this way in the API
  beige: '#D8C3A5',
}

interface VariationSelectorProps {
  variation: Variation
  selected?: string
  onSelect: (propName: string) => void
  isAvailable: (propName: string) => boolean
}

export function VariationSelector({ variation, selected, onSelect, isAvailable }: VariationSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm capitalize text-gray-500">
        {variation.name}:{' '}
        {selected && <span className="font-semibold text-black">{selected}</span>}
      </legend>

      <div className="flex flex-wrap gap-2">
        {variation.props.map((prop) => {
          const isSelected = prop.name === selected
          const disabled = !isAvailable(prop.name)
          const swatchColor = SWATCH_COLORS[prop.name.toLowerCase()]

          return (
            <button
              key={prop.id}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={prop.name}
              onClick={() => onSelect(prop.name)}
              className={`overflow-hidden rounded-lg border-2 text-sm
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
                swatchColor ? (
                  <span className="block h-9 w-16" style={{ backgroundColor: swatchColor }} />
                ) : (
                  <img src={prop.value} alt="" className="h-9 w-16 object-cover" />
                )
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