import { compounds, formatPrice, properties } from '../data'

export default function Featured({ onOpen, onCompound }) {
  const featured = properties.filter((property) => property.featured && property.intent === 'sale')

  return (
    <section id="featured" className="bg-mist px-5 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Featured properties</h2>
        <p className="mt-3 max-w-xl text-muted">Homes our agents are showing this week.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => {
            const price = formatPrice(property)
            return (
              <button key={property.id} type="button" onClick={() => onOpen(property)} className="overflow-hidden rounded-[24px] bg-white text-left shadow-[0_16px_40px_-28px_rgba(19,34,31,0.45)]">
                <img src={property.photos[0]} alt="" className="aspect-[16/10] w-full object-cover" />
                <span className="block p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">{property.market === 'new' ? 'New project' : 'Resale'}</span>
                  <span className="mt-1 block text-lg font-extrabold leading-snug">{property.title}</span>
                  <span className="mt-1 block text-sm text-muted">{property.location}</span>
                  <span className="mt-3 block text-xl font-extrabold">{price.amount}</span>
                </span>
              </button>
            )
          })}
        </div>

        <h2 className="mt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">Compounds</h2>
        <p className="mt-3 max-w-xl text-muted">Open a compound to see the homes we have inside it.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {compounds.map((compound) => {
            const count = properties.filter((property) => property.compound === compound.name).length
            return (
              <button key={compound.id} type="button" onClick={() => onCompound(compound.name)} className="group relative h-56 overflow-hidden rounded-[24px] text-left">
                <img src={compound.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-teal/90 via-teal/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold">{compound.market === 'new' ? 'New project' : 'Resale'}</span>
                  <span className="mt-1 block text-xl font-extrabold">{compound.name}</span>
                  <span className="mt-1 block text-sm text-white/80">{compound.line}</span>
                  <span className="mt-2 block text-xs font-bold">{count} {count === 1 ? 'home' : 'homes'} · {compound.area}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
