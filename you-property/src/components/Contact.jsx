import { useState } from 'react'
import { properties } from '../data'

export default function Contact({ note, setNote }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  function validate() {
    const next = {}
    if (name.trim().length < 2) next.name = 'Add your full name.'
    if (phone.replace(/\D/g, '').length < 8) next.phone = 'Add a phone number we can call.'
    if (note.trim().length < 8) next.note = 'Tell us the area, type, or budget.'
    return next
  }

  function onSubmit(event) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    setSent({ name: name.trim() })
  }

  function reset() {
    setName('')
    setPhone('')
    setNote('')
    setErrors({})
    setSent(null)
  }

  return (
    <section id="contact" className="relative mx-5 mb-5 overflow-hidden rounded-[28px] bg-teal py-8 text-white sm:py-10">
      <img src={properties[4].photos[0]} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-teal/75" />
      <div className="relative mx-auto grid max-w-6xl gap-4 px-5 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tell us what you’re looking for</h2>
          <p className="mt-3 max-w-md text-white/75">Leave your details and an agent will call you within 24 hours.</p>
          <ul className="mt-5 space-y-2 text-[15px]">
            <li><span className="font-bold">Phone:</span> <a className="underline-offset-2 hover:underline" href="tel:+201000000000">+20 100 000 0000</a></li>
            <li><span className="font-bold">Email:</span> <a className="underline-offset-2 hover:underline" href="mailto:hello@youproperty.example">hello@youproperty.example</a></li>
            <li><span className="font-bold">Office:</span> New Cairo, Egypt</li>
          </ul>
          <ol className="mt-4 grid flex-1 content-end gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {['We call within 24 hours.', 'The same agent stays with you.', 'You visit the home before you decide.'].map((step, index) => (
              <li key={step} className="rounded-2xl bg-white/10 px-4 py-3 text-sm">
                <span className="mr-2 font-extrabold text-gold">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[28px] bg-white p-5 text-ink shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)] sm:p-7">
          {sent ? (
            <div className="py-8 text-center">
              <p className="text-2xl font-extrabold">Thanks, {sent.name}.</p>
              <p className="mx-auto mt-3 max-w-sm text-muted">Your request stays in this preview. An agent would call within 24 hours once the site is connected.</p>
              <button type="button" onClick={reset} className="mt-6 rounded-full bg-teal px-5 py-3 text-sm font-bold text-white">
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <Field id="full-name" label="Full name" error={errors.name}>
                <input
                  id="full-name"
                  value={name}
                  autoComplete="name"
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass(errors.name)}
                />
              </Field>
              <Field id="phone" label="Phone number" error={errors.phone}>
                <input
                  id="phone"
                  value={phone}
                  inputMode="tel"
                  autoComplete="tel"
                  onChange={(event) => setPhone(event.target.value)}
                  className={inputClass(errors.phone)}
                />
              </Field>
              <Field id="looking" label="What are you looking for?" error={errors.note}>
                <textarea
                  id="looking"
                  rows={4}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="e.g. 3-bedroom apartment in New Cairo, up to EGP 7M"
                  className={`${inputClass(errors.note)} resize-y`}
                />
              </Field>
              <button type="submit" className="mt-2 w-full rounded-2xl bg-gold py-4 text-base font-bold text-ink transition hover:bg-gold-deep">
                Request a call
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-muted">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm font-medium text-rose-700">{error}</p>}
    </div>
  )
}

function inputClass(error) {
  return `w-full rounded-2xl bg-mist px-4 py-3.5 text-[15px] text-ink outline-none ring-1 ${error ? 'ring-rose-400' : 'ring-transparent focus:ring-gold/70'}`
}
