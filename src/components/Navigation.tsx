import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Dentures', href: '#dentures' },
  { label: 'My Work', href: '#work' },
  { label: 'Videos', href: '#videos' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <motion.nav
        id="nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-frosted' : 'bg-transparent'
        }`}
      >
        <div className="container-px flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('#hero')}
            className="flex flex-col items-start leading-none group"
            aria-label="Pasith – go to top"
          >
            <span className="text-sm font-sans font-semibold tracking-widest uppercase transition-opacity group-hover:opacity-70" style={{ color: 'var(--text-main)' }}>
              PASITH
            </span>
            <span className="text-[10px] font-sans font-light tracking-ultra-wide uppercase" style={{ color: 'var(--text-muted)' }}>
              DENTURES&nbsp;•&nbsp;CDT
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="text-xs font-sans font-medium tracking-widest uppercase transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Burger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); handleNav('#contact') }}
              className="hidden md:inline-flex items-center px-5 py-2 text-xs font-sans font-medium tracking-widest uppercase rounded-full shadow-md transition-all active:scale-95"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              Get in Touch
            </a>
            <button
              id="mobile-menu-btn"
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen
                ? <X size={22} style={{ color: 'var(--text-main)' }} />
                : <Menu size={22} style={{ color: 'var(--text-main)' }} />
              }
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-warm-white flex flex-col"
          >
            <div className="container-px flex items-center justify-between h-16 md:h-20 flex-shrink-0">
              <button
                onClick={() => handleNav('#hero')}
                className="flex flex-col items-start leading-none"
              >
                <span className="text-sm font-sans font-semibold tracking-widest text-charcoal uppercase">PASITH</span>
                <span className="text-[10px] font-sans font-light tracking-ultra-wide text-charcoal-mid uppercase">DENTURES&nbsp;•&nbsp;CDT</span>
              </button>
              <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
                <X size={22} className="text-charcoal" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center container-px pb-16">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <button
                      onClick={() => handleNav(link.href)}
                      className="block w-full text-left py-3 font-serif text-4xl font-light text-charcoal hover:text-charcoal-mid transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
                className="mt-10 inline-flex items-center px-6 py-3 text-xs font-sans font-medium tracking-widest uppercase bg-charcoal text-warm-white rounded-full w-max"
              >
                Get in Touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
