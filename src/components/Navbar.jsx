import { useState, useEffect } from 'react'

const links = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-8 md:px-16 py-5 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* Desktop links */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="font-['Inter'] text-sm font-medium tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 relative group"
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#7ECEF0] group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(p => !p)}
        className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1"
        aria-label="Menu"
        data-hover
      >
        <span className={`block w-6 h-[1.5px] bg-[#7ECEF0] transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
        <span className={`block w-6 h-[1.5px] bg-[#7ECEF0] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-[1.5px] bg-[#7ECEF0] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
      </button>

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 h-screen w-64 bg-black border-l border-white/5 flex flex-col pt-24 px-8 gap-8 transition-transform duration-400 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={close}
            className="font-['Titillium_Web'] font-bold text-2xl tracking-wider uppercase text-white/70 hover:text-white transition-colors"
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  )
}
