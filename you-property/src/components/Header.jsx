import { useEffect, useState } from 'react'
import Logo from './Logo'

const links = [
  { href: '#top', id: 'top', label: 'Home' },
  { href: '#featured', id: 'featured', label: 'Featured' },
  { href: '#areas', id: 'areas', label: 'Locations' },
  { href: '#why', id: 'why', label: 'Why us' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

export default function Header({ savedCount, showSaved, onToggleSaved }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8)
        const line = Math.max(160, Math.min(280, window.innerHeight * 0.4))
        let current = links[0].id
        for (const link of links) {
          const node = document.getElementById(link.id)
          if (node && node.getBoundingClientRect().top <= line) current = link.id
        }
        setActive(current)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('hashchange', update)
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('hashchange', update)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`sticky top-0 z-40 bg-teal text-white ${scrolled ? 'shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)]' : ''}`}>
      <div className="mx-auto flex h-[76px] max-w-6xl items-center gap-6 px-5">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => { setActive('top'); setOpen(false) }}>
          <Logo />
          <span className="leading-none">
            <span className="block text-[17px] font-extrabold tracking-tight">You Property</span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.2em] text-white/70">REAL ESTATE</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActive(link.id)}
              className={`text-[15px] font-medium transition ${active === link.id ? 'text-gold' : 'text-white/85 hover:text-white'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onToggleSaved}
          className={`hidden items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold md:inline-flex ${showSaved ? 'border-gold bg-gold text-ink' : 'border-white/15 text-white hover:border-white/40'}`}
          aria-pressed={showSaved}
        >
          <Heart filled={savedCount > 0} />
          {savedCount}
          <span className="sr-only">saved homes</span>
        </button>

        <a
          href="#contact"
          className="hidden rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-gold-deep md:inline-flex"
        >
          Talk to an agent
        </a>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex w-4 flex-col gap-1.5">
            <span className={`block h-0.5 w-full bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-full bg-white transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-teal px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => { setActive(link.id); setOpen(false) }}
                className={`rounded-xl px-3 py-3 text-base font-semibold hover:bg-white/5 ${active === link.id ? 'text-gold' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onToggleSaved()
              }}
              className="rounded-xl px-3 py-3 text-left text-base font-semibold text-white hover:bg-white/5"
            >
              Shortlist ({savedCount})
            </button>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-4 py-3 text-center text-sm font-bold text-ink"
            >
              Talk to an agent
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function Heart({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}
