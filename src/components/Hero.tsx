import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowDown, ChevronRight, Volume2, VolumeX, Play } from 'lucide-react'
import pasithVideo from '../assets/Pasith intro.mp4'

const PASITH_PHOTO = '/images/pasith-photo.jpg'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const fadeOp = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Automatically mute video audio when scrolling away from Hero section
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.85 && !muted) {
      if (mobileVideoRef.current) mobileVideoRef.current.muted = true
      if (desktopVideoRef.current) desktopVideoRef.current.muted = true
      setMuted(true)
    }
  })

  const toggleMute = () => {
    const nextMuted = !muted
    if (mobileVideoRef.current) mobileVideoRef.current.muted = nextMuted
    if (desktopVideoRef.current) desktopVideoRef.current.muted = nextMuted
    setMuted(nextMuted)
  }

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Hero"
    >

      {/* ═══════════════════════════════════════════════
          MOBILE (< lg): Full-bleed background video
      ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 lg:hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <video
            ref={mobileVideoRef}
            src={pasithVideo}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 0%' }}
          />
          {/* Cinematic overlays — text readable at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-charcoal/25" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-charcoal/50 to-transparent" />
        </motion.div>
      </div>

      {/* Mobile sound toggle */}
      <button
        onClick={toggleMute}
        className="lg:hidden absolute top-20 right-4 z-20 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {/* ═══════════════════════════════════════════════
          DESKTOP (lg+): Split layout video panel
      ═══════════════════════════════════════════════ */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[46%]">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <video
            ref={desktopVideoRef}
            src={pasithVideo}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 0%' }}
          />
          {/* Left fade into white */}
          <div className="absolute inset-0 bg-gradient-to-r from-warm-white via-warm-white/20 to-transparent" />
          {/* Top/bottom fades */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-warm-white/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-warm-white/20 to-transparent" />
        </motion.div>

        {/* Desktop sound toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 px-3.5 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white hover:bg-black/40 transition-colors"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span className="text-[10px] font-sans font-medium tracking-widest uppercase">
            {muted ? 'UNMUTE' : 'MUTED'}
          </span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════
          TEXT — bottom overlay on mobile, left column on desktop
      ═══════════════════════════════════════════════ */}
      <motion.div
        style={{ y: textY, opacity: fadeOp, minHeight: '100svh' }}
        className={`
          relative z-10 flex flex-col
          /* mobile: justify end (overlay at bottom) */
          justify-end px-6 pb-12 pt-24
          /* desktop: left side, centered vertically with top padding for fixed nav */
          lg:justify-center
          lg:w-[54%] lg:px-16 xl:px-24 lg:pt-32 lg:pb-16
        `}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center gap-3 mb-5 lg:mb-7"
        >
          <div className="w-5 h-px bg-white/50 lg:bg-charcoal/35" />
          <p className="text-[10px] font-sans font-light tracking-ultra-wide uppercase text-white/70 lg:text-charcoal-mid">
            CLINICAL DENTAL TECHNICIAN · UK
          </p>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif font-light leading-[1.04] mb-5 lg:mb-6
                     text-white lg:text-charcoal"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)' }}
        >
          Making dentures<br />
          <span className="text-white/70 lg:text-charcoal/55">that change lives.</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="origin-left w-8 h-px bg-white/40 lg:bg-charcoal/25 mb-5"
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="font-sans text-sm md:text-base font-light text-white/65 lg:text-charcoal-mid leading-relaxed mb-8 max-w-md"
        >
          Dentures made and fitted by the same technician — precision,
          care and a personal approach from start to finish.
        </motion.p>

        {/* Floating cards — desktop only (mobile too cluttered on dark bg) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36 }}
          className="hidden lg:flex flex-wrap gap-3 mb-9"
        >
          {[
            { top: 'MADE BY ME',        bot: 'Every denture, by hand' },
            { top: 'FITTED BY ME',      bot: 'Same technician, always' },
            { top: 'PERSONAL',          bot: 'Individual to every patient' },
          ].map(c => (
            <div key={c.top} className="glass-card px-4 py-3">
              <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-charcoal">{c.top}</p>
              <p className="text-[10px] font-sans font-light text-charcoal-mid mt-0.5">{c.bot}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.43 }}
          className="flex flex-wrap gap-3 items-center"
        >
          <button
            id="hero-discover-cta"
            onClick={() => scrollTo('#work')}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[11px] font-sans font-semibold tracking-widest uppercase transition-colors
                       bg-white text-charcoal hover:bg-white/90
                       lg:bg-charcoal lg:text-warm-white lg:hover:bg-charcoal-light"
          >
            DISCOVER MY WORK
            <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            id="hero-contact-cta"
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center px-6 py-3.5 rounded-full text-[11px] font-sans font-medium tracking-widest uppercase transition-all backdrop-blur-sm
                       border border-white/40 text-white hover:bg-white/10
                       lg:border-charcoal/30 lg:text-charcoal lg:hover:bg-charcoal lg:hover:text-warm-white lg:backdrop-blur-none"
          >
            GET IN TOUCH
          </button>
        </motion.div>

        {/* Scroll */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => scrollTo('#differentiator')}
          className="flex items-center gap-2 mt-11 text-[10px] font-sans font-light tracking-ultra-wide uppercase
                     text-white/35 hover:text-white/60 lg:text-charcoal-mid/40 lg:hover:text-charcoal-mid
                     transition-colors w-max"
          aria-label="Scroll down"
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
            <ArrowDown size={12} />
          </motion.div>
          SCROLL
        </motion.button>
      </motion.div>

      {/* ── Marquee ── */}
      <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/10 lg:border-silver/30 py-3.5 overflow-hidden
                      bg-black/40 backdrop-blur-sm lg:bg-warm-white/80 lg:backdrop-blur-sm">
        <div className="marquee-track">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-6 whitespace-nowrap">
              {['MADE BY ME', 'FITTED BY ME', 'PERSONAL', 'PRECISION CRAFTSMANSHIP', 'CDT', '32 TEETH', 'DENTURES'].map((w, j) => (
                <span key={j} className="text-[10px] font-sans font-light tracking-ultra-wide uppercase
                                        text-white/30 lg:text-charcoal-mid/45">{w}</span>
              ))}
              <span className="text-white/15 lg:text-charcoal-mid/20 mx-1">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
