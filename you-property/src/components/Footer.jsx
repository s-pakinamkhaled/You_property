import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-teal-deep text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <Logo className="h-8 w-8" />
          <span className="text-sm font-extrabold">You Property</span>
        </a>
        <p className="text-sm">Cairo · New Capital · North Coast</p>
        <p className="text-sm">© {new Date().getFullYear()} You Property</p>
      </div>
    </footer>
  )
}
