import { useState } from 'react'
import { AREAS, TYPES, formatPrice } from '../data'

export default function Listings({
  properties,
  filters,
  onChange,
  saved,
  showSaved,
  onToggleSaved,
  onOpen,
  onClear,
  onExitSaved,
}) {
  const heading = showSaved ? 'Your shortlist' : filters.intent === 'buy' ? 'Properties for sale' : 'Properties for rent'
  const chips = [
    filters.area !== 'all' && { key: 'area', label: filters.area },
    filters.type !== 'all' && { key: 'type', label: filters.type },
    filters.market && filters.market !== 'all' && { key: 'market', label: filters.market === 'new' ? 'New projects' : 'Resale units' },
    filters.compound && filters.compound !== 'all' && { key: 'compound', label: filters.compound },
    showSaved && { key: 'saved', label: 'Shortlist' },
  ].filter(Boolean)

  return (
    <section id="properties" className="bg-mist py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{heading}</h2>
            <p className="mt-3 max-w-xl text-muted">
              Hand-picked listings checked by our team. Prices in Egyptian pounds.
            </p>
          </div>
          <p className="shrink-0 text-sm text-muted">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {chips.length === 0 && <span className="text-sm text-muted">Showing every match for this search.</span>}
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => {
                  if (chip.key === 'saved') onExitSaved()
                  else onChange({ ...filters, [chip.key]: 'all' })
                }}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-line"
              >
                {chip.label}
                <span className="ml-2 text-muted">×</span>
              </button>
            ))}
            {chips.length > 0 && (
              <button type="button" onClick={onClear} className="px-2 text-sm font-semibold text-teal-soft underline-offset-2 hover:underline">
                Clear
              </button>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-muted">
            Sort
            <select
              value={filters.sort}
              onChange={(event) => onChange({ ...filters, sort: event.target.value })}
              className="rounded-full bg-white px-3 py-2 font-semibold text-ink ring-1 ring-line outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </label>
        </div>

        {properties.length === 0 ? (
          <div className="mt-5 rounded-[24px] bg-white p-5">
            <p className="text-xl font-extrabold">Nothing matches this search.</p>
            <p className="mt-1 text-sm text-muted">Pick another area, or show everything.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {AREAS.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => onChange({ ...filters, area })}
                  className="rounded-2xl bg-mist px-4 py-3 text-left text-sm font-bold hover:bg-line"
                >
                  {area}
                </button>
              ))}
            </div>
            <button type="button" onClick={onClear} className="mt-4 rounded-full bg-teal px-5 py-3 text-sm font-bold text-white">
              Show all listings
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {properties.map((property, index) => {
              const featured = properties.length > 1 && index === 0
              const lastWide = properties.length > 1 && (properties.length - 1) % 2 === 1 && index === properties.length - 1
              return (
                <PropertyCard
                  key={property.id}
                  property={property}
                  wide={properties.length === 1 || featured || lastWide}
                  saved={saved.includes(property.id)}
                  onOpen={() => onOpen(property)}
                  onToggleSaved={() => onToggleSaved(property)}
                />
              )
            })}
          </div>
        )}

        <p className="sr-only">
          Areas include {AREAS.join(', ')}. Types include {TYPES.join(', ')}.
        </p>
      </div>
    </section>
  )
}

function PropertyCard({ property, wide, saved, onOpen, onToggleSaved }) {
  const price = formatPrice(property)
  const [failed, setFailed] = useState(false)
  const [photo, setPhoto] = useState(0)

  function scrub(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const count = property.photos.length
    const index = Math.min(count - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * count)))
    setPhoto(index)
  }

  return (
    <article className={`group overflow-hidden rounded-[24px] bg-white shadow-[0_18px_40px_-28px_rgba(19,34,31,0.45)] ring-1 ring-black/5 ${wide ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}>
      <div
        className="relative cursor-pointer overflow-hidden"
        onMouseMove={scrub}
        onMouseLeave={() => setPhoto(0)}
        onClick={onOpen}
      >
        {failed ? (
          <div className={`flex items-end bg-teal p-5 text-lg font-bold text-white ${wide ? 'h-full min-h-56' : 'aspect-[16/10]'}`}>{property.area}</div>
        ) : (
          <img
            src={property.photos[photo]}
            alt=""
            onError={() => setFailed(true)}
            className={`w-full object-cover ${wide ? 'h-full min-h-56' : 'aspect-[16/10]'}`}
          />
        )}
        <span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
          <span className="flex gap-1.5">
            {property.photos.map((_, index) => (
              <span key={index} className={`h-1.5 rounded-full ${index === photo ? 'w-5 bg-gold' : 'w-1.5 bg-white/80'}`} />
            ))}
          </span>
          <span className="translate-y-2 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View home
          </span>
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleSaved()
          }}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.title} from shortlist` : `Save ${property.title}`}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full shadow ${saved ? 'bg-gold text-ink' : 'bg-white/95 text-ink'}`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9Z"
              fill={saved ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </button>
      </div>

      <button type="button" onClick={onOpen} className="block w-full p-5 text-left">
        <span className="inline-flex gap-2">
          <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink/80">{property.type}</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${property.market === 'new' ? 'bg-gold text-ink' : 'bg-teal text-white'}`}>
            {property.market === 'new' ? 'New project' : 'Resale'}
          </span>
        </span>
        <h3 className="mt-3 text-xl font-extrabold tracking-tight">{property.title}</h3>
        <p className="mt-1 text-sm text-muted">{property.location}</p>
        <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl bg-mist text-center text-sm">
          <span className="px-2 py-2"><b className="block text-base">{property.beds}</b><span className="text-xs text-muted">{property.beds === 1 ? 'bed' : 'beds'}</span></span>
          <span className="border-x border-line px-2 py-2"><b className="block text-base">{property.baths}</b><span className="text-xs text-muted">{property.baths === 1 ? 'bath' : 'baths'}</span></span>
          <span className="px-2 py-2"><b className="block text-base">{property.areaSqm}</b><span className="text-xs text-muted">m²</span></span>
        </div>
        <p className="mt-3 text-2xl font-extrabold tracking-tight">
          {price.amount}
          {price.period && <span className="ml-1 text-sm font-semibold text-muted">{price.period}</span>}
        </p>
      </button>
    </article>
  )
}
