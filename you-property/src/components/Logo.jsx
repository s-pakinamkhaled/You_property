export default function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path fill="#fff" d="M20 3.5 3.5 17.2V34a2.5 2.5 0 0 0 2.5 2.5h28A2.5 2.5 0 0 0 36.5 34V17.2L20 3.5Z" />
      <path fill="#e8a61c" d="M13.2 16.2h4.3L20 20.4l2.5-4.2h4.3L21.6 23.4V30h-3.2v-6.6l-5.2-7.2Z" />
    </svg>
  )
}
