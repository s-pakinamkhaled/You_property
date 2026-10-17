import { formatPrice, properties } from '../data'

const sides = [
  {
    id: 'new',
    title: 'New projects',
    text: 'Off-plan homes and new phases, with the payment plan written down before you visit.',
    image: properties.find((property) => property.id === 'hyde-park-villa').photos[0],
  },
  {
    id: 'resale',
    title: 'Resale units',
    text: 'Finished homes you can walk through now. Papers are checked before they go online.',
    image: properties.find((property) => property.id === 'fifth-villa').photos[0],
  },
]

export default function Projects({ active, onPick, onOpen }) {
  return (
    <section id="projects" className="bg-white px-5 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">New projects and resale units</h2>
        <p className="mt-3 max-w-xl text-muted">Choose one side. The homes below, and the search results, follow that choice.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {sides.map((side) => {
            const list = properties.filter((property) => property.market === side.id && property.intent === 'sale')
            const selected = active === side.id
            return (
              <article key={side.id} className={`overflow-hidden rounded-[28px] bg-mist ring-2 ${selected ? 'ring-gold' : 'ring-transparent'}`}>
                <button type="button" onClick={() => onPick(selected ? 'all' : side.id)} className="relative block h-52 w-full text-left">
                  <img src={side.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-teal/85 to-teal/10" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="block text-2xl font-extrabold">{side.title}</span>
                    <span className="mt-1 block max-w-md text-sm text-white/80">{side.text}</span>
                  </span>
                </button>
                <div className="grid gap-3 p-3 sm:grid-cols-2">
                  {list.slice(0, 2).map((property) => {
                    const price = formatPrice(property)
                    return (
                      <button key={property.id} type="button" onClick={() => onOpen(property)} className="rounded-2xl bg-white p-3 text-left">
                        <img src={property.photos[0]} alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />
                        <span className="mt-3 block font-extrabold leading-snug">{property.title}</span>
                        <span className="mt-1 block text-sm text-muted">{property.compound || property.area}</span>
                        <span className="mt-2 block font-extrabold">{price.amount}</span>
                      </button>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
