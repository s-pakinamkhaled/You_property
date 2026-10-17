import { useEffect, useState } from 'react'
import { formatPrice } from '../data'

export default function PropertyModal({ property, saved, onClose, onToggleSaved, onAsk }) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)
  const price = formatPrice(property)
  const photo = property.photos[index]

  useEffect(() => {
    setIndex(0)
    setFailed(false)
  }, [property.id])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setIndex((value) => (value + 1) % property.photos.length)
      if (event.key === 'ArrowLeft') setIndex((value) => (value - 1 + property.photos.length) % property.photos.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, property.photos.length])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-title"
        className="max-h-[100dvh] w-full overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:max-h-[92dvh] sm:max-w-3xl sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative">
          {failed ? (
            <div className="flex aspect-[16/9] items-end bg-teal p-6 text-2xl font-bold text-white">{property.title}</div>
          ) : (
            <img
              src={photo}
              alt={`${property.title}, photo ${index + 1} of ${property.photos.length}`}
              onError={() => setFailed(true)}
              className="aspect-[16/9] w-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-bold text-ink shadow"
            aria-label="Close"
          >
            ×
          </button>
          {property.photos.length > 1 && (
            <>
              <button type="button" onClick={() => setIndex((value) => (value - 1 + property.photos.length) % property.photos.length)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 font-bold shadow" aria-label="Previous photo">‹</button>
              <button type="button" onClick={() => setIndex((value) => (value + 1) % property.photos.length)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 font-bold shadow" aria-label="Next photo">›</button>
            </>
          )}
        </div>

        <div className="flex gap-2 px-5 pt-4">
          {property.photos.map((src, photoIndex) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setFailed(false)
                setIndex(photoIndex)
              }}
              className={`h-14 w-20 overflow-hidden rounded-xl ring-2 ${photoIndex === index ? 'ring-gold' : 'ring-transparent'}`}
              aria-label={`Photo ${photoIndex + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="px-5 pb-6 pt-4">
          <span className="inline-flex rounded-full bg-mist px-2.5 py-1 text-xs font-semibold">{property.type}</span>
          <h2 id="property-title" className="mt-3 text-2xl font-extrabold tracking-tight">{property.title}</h2>
          <p className="mt-1 text-muted">{property.location}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{property.summary}</p>
          <dl className="mt-5 grid grid-cols-3 gap-3">
            <Fact label="Bedrooms" value={property.beds} />
            <Fact label="Bathrooms" value={property.baths} />
            <Fact label="Area" value={`${property.areaSqm} m²`} />
          </dl>
          <p className="mt-5 text-3xl font-extrabold tracking-tight">
            {price.amount}
            {price.period && <span className="ml-1 text-base font-semibold text-muted">{price.period}</span>}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onAsk} className="flex-1 rounded-2xl bg-gold py-3.5 text-sm font-bold text-ink hover:bg-gold-deep">
              Request a call about this home
            </button>
            <button type="button" onClick={onToggleSaved} className="rounded-2xl bg-mist px-5 py-3.5 text-sm font-bold text-ink">
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Fact({ label, value }) {
  return (
    <div className="rounded-2xl bg-mist px-3 py-3">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-extrabold">{value}</dd>
    </div>
  )
}
