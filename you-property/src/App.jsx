import { useEffect, useRef, useState } from 'react'
import { filterProperties, properties } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Featured from './components/Featured'
import Listings from './components/Listings'
import Areas from './components/Areas'
import Why from './components/Why'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PropertyModal from './components/PropertyModal'

const initialFilters = { intent: 'buy', area: 'all', type: 'all', sort: 'featured', market: 'all', compound: 'all' }

export default function App() {
  const [filters, setFilters] = useState(initialFilters)
  const [saved, setSaved] = useState(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('yp-saved') || '[]')
      return Array.isArray(stored) ? stored : []
    } catch {
      return []
    }
  })
  const [showSaved, setShowSaved] = useState(false)
  const [active, setActive] = useState(null)
  const [note, setNote] = useState('')
  const [toast, setToast] = useState('')
  const toastTimer = useRef(0)

  useEffect(() => {
    document.title = 'You Property | Find Your Dream Home'
  }, [])

  useEffect(() => {
    sessionStorage.setItem('yp-saved', JSON.stringify(saved))
  }, [saved])

  function flash(message) {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2200)
  }

  function toggleSaved(property) {
    setSaved((prev) => {
      const exists = prev.includes(property.id)
      flash(exists ? 'Removed from shortlist' : 'Saved to your shortlist')
      return exists ? prev.filter((id) => id !== property.id) : [...prev, property.id]
    })
  }

  function askAbout(property) {
    setNote(`I'm interested in ${property.title} in ${property.location}.`)
    setActive(null)
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      document.getElementById('looking')?.focus()
    }, 50)
  }

  function pickArea(area) {
    setShowSaved(false)
    setFilters((current) => ({ ...current, area }))
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
  }

  const matches = filterProperties(properties, filters, saved, false)
  const visible = filterProperties(properties, filters, saved, showSaved)

  return (
    <div className="min-h-screen bg-white text-ink">
      <a href="#properties" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Skip to listings
      </a>
      <Header
        savedCount={saved.length}
        showSaved={showSaved}
        onToggleSaved={() => {
          setShowSaved((value) => !value)
          document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      <main>
        <Hero
          filters={filters}
          matches={matches}
          onOpen={setActive}
          onChange={(next) => {
            setShowSaved(false)
            setFilters(next)
          }}
          onSearch={() => {
            setShowSaved(false)
            document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <Projects
          active={filters.market}
          onPick={(market) => {
            setShowSaved(false)
            setFilters((current) => ({ ...current, market, compound: 'all' }))
            document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
          }}
          onOpen={setActive}
        />
        <Featured
          onOpen={setActive}
          onCompound={(compound) => {
            setShowSaved(false)
            setFilters((current) => ({ ...current, compound, market: 'all', area: 'all' }))
            document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <Listings
          properties={visible}
          filters={filters}
          onChange={setFilters}
          saved={saved}
          showSaved={showSaved}
          onToggleSaved={toggleSaved}
          onOpen={setActive}
          onClear={() => {
            setFilters(initialFilters)
            setShowSaved(false)
          }}
          onExitSaved={() => setShowSaved(false)}
        />
        <Areas activeArea={filters.area} onPick={pickArea} />
        <Why />
        <Contact note={note} setNote={setNote} />
      </main>
      <Footer />
      {active && (
        <PropertyModal
          property={active}
          saved={saved.includes(active.id)}
          onClose={() => setActive(null)}
          onToggleSaved={() => toggleSaved(active)}
          onAsk={() => askAbout(active)}
        />
      )}
      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
