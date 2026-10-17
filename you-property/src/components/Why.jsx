import { useState } from 'react'
import { properties } from '../data'

const reasons = [
  {
    title: 'Verified listings',
    text: 'Every property is visited and its documents checked before it goes online.',
    photo: properties[0].photos[1],
  },
  {
    title: 'One agent, start to finish',
    text: 'The same person guides you from the first viewing to handing over the keys.',
    photo: properties[1].photos[1],
  },
  {
    title: 'Clear pricing',
    text: 'Fees and payment plans are explained up front, in writing, with no surprises.',
    photo: properties[3].photos[0],
  },
]

export default function Why() {
  const [open, setOpen] = useState(0)

  return (
    <section id="why" className="bg-mist px-5 py-8 sm:py-10">
      <div className="mx-auto grid max-w-6xl items-stretch gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          {reasons.map((reason, index) => {
            const active = open === index
            return (
              <button
                key={reason.title}
                type="button"
                onClick={() => setOpen(index)}
                aria-pressed={active}
                className={`group relative overflow-hidden rounded-[28px] text-left shadow-[0_16px_40px_-28px_rgba(19,34,31,0.55)] ring-2 transition-all duration-500 ease-out ${active ? 'h-64 ring-gold' : 'h-28 ring-transparent hover:h-36'}`}
              >
                <img
                  src={reason.photo}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out ${active ? 'scale-100' : 'scale-105 group-hover:scale-110'}`}
                />
                <span className={`absolute inset-0 transition duration-500 ${active ? 'bg-gradient-to-t from-teal/75 via-teal/10 to-transparent' : 'bg-teal/25 group-hover:bg-teal/10'}`} />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="text-lg font-extrabold">{reason.title}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col justify-center rounded-[28px] bg-white p-6 sm:p-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Why people choose You Property</h2>
          <div className="mt-5 divide-y divide-line border-y border-line">
            {reasons.map((reason, index) => {
              const active = open === index
              return (
                <button
                  key={reason.title}
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-expanded={active}
                  className="w-full py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold transition ${active ? 'bg-gold text-ink' : 'bg-mist text-muted'}`}>
                      {index + 1}
                    </span>
                    <span className="text-lg font-extrabold">{reason.title}</span>
                  </span>
                  <span className={`grid transition-[grid-template-rows] duration-500 ease-out ${active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <span className="overflow-hidden">
                      <span className="block pt-2 pl-11 text-sm leading-relaxed text-muted">{reason.text}</span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
