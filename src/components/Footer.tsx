import { profile } from '../data/profile'
import { Linkedin, Instagram, MessageCircle } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Dentures', href: '#dentures' },
  { label: 'My Work', href: '#work' },
  { label: 'Videos', href: '#videos' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal text-warm-white pt-16 pb-8" aria-label="Footer">
      <div className="container-px">
        {/* Top */}
        <div className="grid md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <p className="text-sm font-sans font-semibold tracking-widest uppercase text-warm-white">
                PASITH
              </p>
              <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-silver mt-0.5">
                DENTURES&nbsp;•&nbsp;CDT
              </p>
            </div>
            <p className="font-sans text-sm font-light text-silver leading-relaxed max-w-xs">
              {profile.title}<br />
              Specialising in dentures<br />
              {profile.location}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-warm-white mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm font-sans font-light text-silver hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-warm-white mb-6">
              Get in Touch
            </p>
            <div className="space-y-3">
              <a href={`mailto:${profile.email}`} className="block text-sm font-sans font-light text-silver hover:text-warm-white transition-colors">
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="block text-sm font-sans font-light text-silver hover:text-warm-white transition-colors">
                {profile.phone}
              </a>
              <a href={profile.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-sans font-light text-emerald-400 hover:text-emerald-300 transition-colors">
                <MessageCircle size={14} /> Chat on WhatsApp
              </a>
              <p className="text-sm font-sans font-light text-silver leading-relaxed">
                {profile.address}
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Linkedin size={14} className="text-silver" />
                </a>
              )}
              {profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Instagram size={14} className="text-silver" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs font-sans font-light text-silver/60">
            © {new Date().getFullYear()} Pasith. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              '[Privacy Policy]',
              '[Terms & Conditions]',
              '[GDC Registration]',
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-sans font-light text-silver/50 hover:text-silver transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs font-sans font-light text-silver/40">
            Registered with the General Dental Council.
          </p>
        </div>
      </div>
    </footer>
  )
}
