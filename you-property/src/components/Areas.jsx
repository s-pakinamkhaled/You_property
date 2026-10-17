import { areaGuides, properties } from '../data'

export default function Areas({ activeArea, onPick }) {
  return (
    <section id="areas" className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Popular locations</h2>
            <p className="mt-3 max-w-xl text-muted">Pick a place and the listings update straight away.</p>
          </div>
          {activeArea !== 'all' && (
            <button type="button" onClick={() => onPick('all')} className="shrink-0 text-sm font-bold text-teal underline-offset-2 hover:underline">
              All areas
            </button>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-3 lg:h-[440px] lg:flex-row">
          {areaGuides.map((area) => {
            const count = properties.filter((property) => property.area === area.name).length
            const active = activeArea === area.name
            return (
              <button
                key={area.name}
                type="button"
                onClick={() => onPick(area.name)}
                aria-pressed={active}
                className={`group relative min-h-52 flex-1 overflow-hidden rounded-[24px] text-left ring-2 transition-all duration-500 hover:flex-[1.8] focus-visible:flex-[1.8] ${active ? 'ring-gold lg:flex-[1.45]' : 'ring-transparent'}`}
              >
                <img src={area.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-teal via-teal/30 to-teal/10" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="block text-lg font-extrabold">{area.name}</span>
                  <span className="mt-1 block text-sm text-white/80">{area.line}</span>
                  <span className="mt-2 inline-flex rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-ink">{count} {count === 1 ? 'home' : 'homes'}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
