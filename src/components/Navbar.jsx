import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/analytics', label: 'Analytics' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
      isActive
        ? 'bg-white/10 border-white/20 text-white'
        : 'border-transparent text-gray-400 hover:text-white'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/10 text-white'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'bg-[#0f1117]/80 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-lg font-bold select-none tracking-tight"
          onClick={() => setOpen(false)}
        >
          Cash<span className="text-green-400">Flow</span>
        </Link>

        <div className="hidden md:flex gap-2">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={end}>
              {label}
            </NavLink>
          ))}
        </div>

        <button
          className="md:hidden text-gray-300 hover:text-white "
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-1 px-4 pb-4 bg-[#0f1117] border-b border-white/8">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={mobileLinkClass}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
