import { useEffect, useRef, useState } from 'react'
import { AREAS, TYPES, formatPrice } from '../data'

export default function Hero({ filters, matches = [], onChange, onOpen, onSearch }) {
  const [slide, setSlide] = useState(0)
  const [photo, setPhoto] = useState(0)
  const [paused, setPaused] = useState(false)
  const matchKey = matches.map((property) => property.id).join('|')

  useEffect(() => {
    setSlide(0)
    setPhoto(0)
  }, [matchKey])

  useEffect(() => {
    if (paused || matches.length < 2) return undefined
    const timer = window.setInterval(() => {
      setPhoto(0)
      setSlide((value) => (value + 1) % matches.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [paused, matches.length, matchKey])

  const current = matches[slide] ?? null

  function update(key, value) {
    onChange({ ...filters, [key]: value })
  }

  function scrub(event) {
    if (!current) return
    const rect = event.currentTarget.getBoundingClientRect()
    const count = current.photos.length
    const index = Math.min(count - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * count)))
    setPhoto(index)
  }

  const label = matches.length === 1 ? '1 home' : `${matches.length} homes`

  return (
    <section id="top" className="relative overflow-hidden bg-teal text-white">
      {current && (
        <img
          key={`${current.id}-bg`}
          src={current.photos[(photo + 1) % current.photos.length]}
          alt=""
          className="ken pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal via-teal/88 to-teal/50" />
      <div className="relative mx-auto grid max-w-6xl gap-4 px-5 py-5 lg:grid-cols-2 lg:py-6">
        <div>
          <h1 className="text-[2.4rem] font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            Find the place that fits your life.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Apartments, villas and chalets across Cairo, the New Capital and the North Coast – with agents who answer the phone.
          </p>
          <dl className="mt-4 grid grid-cols-3 divide-x divide-white/15 border-y border-white/15">
            <Stat value={1200} suffix="+" label="properties listed" />
            <Stat value={5} label="prime areas" />
            <Stat value={24} suffix=" h" label="reply time" />
          </dl>
        </div>

        <div
          className="relative h-[340px] lg:row-span-2 lg:h-auto lg:min-h-[420px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[24px] bg-teal-deep shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)]">
            <div className="absolute inset-x-0 top-0 z-10 h-1 bg-white/20">
              {matches.length > 1 && !paused && <div key={slide} className="loadbar h-full bg-gold" />}
            </div>
            {current ? (
              <div className="flex h-full flex-col">
                <div
                  onMouseMove={scrub}
                  onMouseLeave={() => setPhoto(0)}
                  className="relative min-h-0 flex-1"
                >
                  <img
                    src={current.photos[photo]}
                    alt={current.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal/90 to-transparent p-4 pr-28 pt-16">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">{current.area}</span>
                    <span className="mt-1 block text-lg font-extrabold leading-tight">{current.title}</span>
                    <span className="mt-1 block text-sm text-white/80">
                      {formatPrice(current).amount}
                      {formatPrice(current).period ? ` ${formatPrice(current).period}` : ''}
                      {' · '}
                      {current.beds} {current.beds === 1 ? 'bed' : 'beds'}
                      {' · '}
                      {current.areaSqm} m²
                    </span>
                  </span>
                  <span className="absolute left-3 top-3 flex gap-1.5">
                    {current.photos.map((_, index) => (
                      <span key={index} className={`h-1.5 rounded-full ${index === photo ? 'w-6 bg-gold' : 'w-1.5 bg-white/70'}`} />
                    ))}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpen(current)}
                    className="absolute bottom-3 right-3 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-ink"
                  >
                    View home
                  </button>
                  {matches.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous home"
                        onClick={() => {
                          setPhoto(0)
                          setSlide((value) => (value - 1 + matches.length) % matches.length)
                        }}
                        className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-lg font-bold text-ink"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Next home"
                        onClick={() => {
                          setPhoto(0)
                          setSlide((value) => (value + 1) % matches.length)
                        }}
                        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-lg font-bold text-ink"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                {matches.length > 1 && (
                  <div className="flex gap-1 p-1">
                    {matches.map((property, index) => (
                      <button
                        key={property.id}
                        type="button"
                        onClick={() => {
                          setPhoto(0)
                          setSlide(index)
                        }}
                        className={`relative h-16 min-w-0 flex-1 overflow-hidden rounded-xl ring-2 ${index === slide ? 'ring-gold' : 'ring-transparent'}`}
                        aria-label={`Preview ${property.title}`}
                      >
                        <img src={property.photos[0]} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between p-5">
                <p className="text-xl font-extrabold">No homes in this mix.</p>
                <div className="grid grid-cols-2 gap-2">
                  {AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => update('area', area)}
                      className="rounded-xl bg-white/10 px-3 py-3 text-left text-sm font-bold hover:bg-white/20"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <form
          className="rounded-[24px] bg-white p-3 text-ink"
          onSubmit={(event) => {
            event.preventDefault()
            onSearch()
          }}
        >
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-mist p-1">
            {['buy', 'rent'].map((intent) => (
              <button
                key={intent}
                type="button"
                onClick={() => update('intent', intent)}
                className={`rounded-lg py-2.5 text-sm font-bold capitalize ${filters.intent === intent ? 'bg-teal text-white' : 'text-ink/70 hover:text-ink'}`}
                aria-pressed={filters.intent === intent}
              >
                {intent}
              </button>
            ))}
          </div>

          <p className="mb-2 mt-3 text-xs font-semibold text-muted">Area</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={filters.area === 'all'} onClick={() => update('area', 'all')}>All areas</Chip>
            {AREAS.map((area) => (
              <Chip key={area} active={filters.area === area} onClick={() => update('area', area)}>{area}</Chip>
            ))}
          </div>

          <p className="mb-2 mt-3 text-xs font-semibold text-muted">Property type</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={filters.type === 'all'} onClick={() => update('type', 'all')}>Any type</Chip>
            {TYPES.map((type) => (
              <Chip key={type} active={filters.type === type} onClick={() => update('type', type)}>{type}</Chip>
            ))}
          </div>

          <button type="submit" className="mt-3 w-full rounded-xl bg-gold py-3 text-sm font-bold text-ink hover:bg-gold-deep">
            {matches.length === 0 ? 'No homes match' : `Show ${label}`}
          </button>
        </form>
      </div>
      <div className="relative overflow-hidden border-t border-white/10 bg-teal-deep/80">
        <div className="ticker flex w-max">
          {[...AREAS, ...AREAS].map((area, index) => (
            <button
              key={`${area}-${index}`}
              type="button"
              onClick={() => update('area', area)}
              className={`px-6 py-3 text-sm font-bold whitespace-nowrap ${filters.area === area ? 'text-gold' : 'text-white/85 hover:text-white'}`}
            >
              <span className="mr-2 text-gold">●</span>
              {area}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 text-sm font-semibold ${active ? 'bg-teal text-white' : 'bg-mist text-ink hover:bg-line'}`}
    >
      {children}
    </button>
  )
}

function Stat({ value, suffix = '', label }) {
  const [shown, setShown] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let frame = 0
    let started = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      const duration = 900
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration)
        setShown(Math.round(value * (1 - (1 - progress) ** 3)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <div ref={ref} className="px-3 py-3 first:pl-0">
      <dt className="text-2xl font-extrabold tracking-tight text-gold sm:text-3xl">
        {shown.toLocaleString('en-US')}{suffix}
      </dt>
      <dd className="mt-0.5 text-xs text-white/70">{label}</dd>
    </div>
  )
}
