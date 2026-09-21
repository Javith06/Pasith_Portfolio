import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowDown, ChevronRight, Volume2, VolumeX, Play } from 'lucide-react'
import pasithVideo from '../assets/Pasith intro.mp4'

const PASITH_PHOTO = '/images/pasith-photo.jpg'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const fadeOp = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Automatically mute video audio when scrolling away from Hero section
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.85 && !muted) {
      if (videoRef.current) videoRef.current.muted = true
      setMuted(true)
    }
  })

  const toggleMute = () => {
    const nextMuted = !muted
    if (videoRef.current) videoRef.current.muted = nextMuted
    setMuted(nextMuted)
  }

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden transition-colors duration-500"
      style={{ minHeight: '100svh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)' }}
      aria-label="Hero"
    >

      {/* ═══════════════════════════════════════════════
          SHARED HERO BACKGROUND VIDEO
          - On mobile (< lg): Full bleed background
          - On desktop (lg+): Right-hand 52% split column with seamless feather blending
      ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[52%] z-0 overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <video
            ref={videoRef}
            src={pasithVideo}
            poster={PASITH_PHOTO}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 0%', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          />

          {/* Overlays (dynamic per active theme) */}
          {/* Mobile dark gradient overlay */}
          <div className="absolute inset-0 lg:hidden" style={{ background: 'var(--hero-overlay-mobile)' }} />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent lg:hidden" />

          {/* Desktop theme edge fades — subtle feather mingle */}
          <div
            className="hidden lg:block absolute inset-0 transition-all duration-500 pointer-events-none"
            style={{ background: 'var(--hero-fade-desktop)' }}
          />
          <div className="hidden lg:block absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Minimal Icon-Only Mute/Unmute Toggle Button inside Hero page */}
      {/* Mobile button */}
      <button
        onClick={toggleMute}
        className="lg:hidden absolute top-20 right-4 z-20 w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center shadow-md transition-transform active:scale-95"
        style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)', color: 'var(--text-on-dark)' }}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-amber-300 animate-pulse" />}
      </button>

      {/* Desktop button */}
      <button
        onClick={toggleMute}
        className="hidden lg:flex absolute top-24 right-8 z-20 w-11 h-11 rounded-full backdrop-blur-md border items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer"
        style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)', color: 'var(--text-on-dark)' }}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        {muted ? <VolumeX size={17} /> : <Volume2 size={17} className="text-amber-300 animate-pulse" />}
      </button>

      {/* ═══════════════════════════════════════════════
          TEXT — bottom overlay on mobile, left column on desktop
      ═══════════════════════════════════════════════ */}
      <motion.div
        style={{ y: textY, opacity: fadeOp, minHeight: '100svh' }}
        className={`
          relative z-10 flex flex-col
          /* mobile: justify end, positioned lower down with tighter padding */
          justify-end px-5 sm:px-8 pb-14 pt-28
          /* desktop: left side, centered vertically */
          lg:justify-center
          lg:w-[54%] lg:px-16 xl:px-24 lg:pt-32 lg:pb-16
        `}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center gap-3 mb-3 lg:mb-7"
        >
          <div className="w-5 h-px bg-white/50 lg:bg-[var(--text-muted)]" />
          <p className="text-[9px] sm:text-[10px] font-sans font-light tracking-ultra-wide uppercase text-white/70 lg:text-[var(--text-muted)]">
            CLINICAL DENTAL TECHNICIAN · UK
          </p>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif font-light leading-[1.04] mb-3 lg:mb-6 text-white lg:text-[var(--text-main)]"
          style={{ fontSize: 'clamp(2.1rem, 5.5vw, 5.5rem)' }}
        >
          Making dentures<br />
          <span className="text-white/70 lg:text-[var(--text-muted)]">that change lives.</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="origin-left w-8 h-px bg-white/40 lg:bg-[var(--border-color)] mb-3 lg:mb-5"
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="font-sans text-xs sm:text-sm md:text-base font-light text-white/75 lg:text-[var(--text-muted)] leading-relaxed mb-6 lg:mb-8 max-w-sm lg:max-w-md"
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
              <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[var(--text-main)]">{c.top}</p>
              <p className="text-[10px] font-sans font-light text-[var(--text-muted)] mt-0.5">{c.bot}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.43 }}
          className="flex flex-wrap gap-2.5 sm:gap-3 items-center"
        >
          <button
            id="hero-discover-cta"
            onClick={() => scrollTo('#work')}
            className="group inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest uppercase transition-all shadow-md active:scale-95"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            DISCOVER MY WORK
            <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            id="hero-contact-cta"
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-[10px] sm:text-[11px] font-sans font-medium tracking-widest uppercase transition-all backdrop-blur-sm
                       border border-white/40 text-white hover:bg-white/10
                       lg:border-[var(--border-color)] lg:text-[var(--text-main)] lg:hover:bg-[var(--bg-secondary)] lg:backdrop-blur-none"
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
          className="flex items-center gap-2 mt-6 lg:mt-11 text-[9px] sm:text-[10px] font-sans font-light tracking-ultra-wide uppercase
                     text-white/35 hover:text-white/60 lg:text-[var(--text-muted)] lg:hover:text-[var(--text-main)]
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
      <div
        className="absolute bottom-0 inset-x-0 z-20 border-t py-3.5 overflow-hidden backdrop-blur-sm transition-colors duration-500"
        style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)' }}
      >
        <div className="marquee-track">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-6 whitespace-nowrap">
              {['MADE BY ME', 'FITTED BY ME', 'PERSONAL', 'PRECISION CRAFTSMANSHIP', 'CDT', '32 TEETH', 'DENTURES'].map((w, j) => (
                <span
                  key={j}
                  className="text-[10px] font-sans font-light tracking-ultra-wide uppercase"
                  style={{ color: 'var(--text-on-dark-muted)' }}
                >
                  {w}
                </span>
              ))}
              <span className="opacity-30 mx-1" style={{ color: 'var(--text-on-dark-muted)' }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
