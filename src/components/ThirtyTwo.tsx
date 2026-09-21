import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Creative quotes per tooth ── */
const quotes = [
  '"Every smile tells a story."',
  '"Precision in every detail."',
  '"32 chances to be perfect."',
  '"Crafted for confidence."',
  '"Made by hand. Fitted with care."',
  '"Your smile, personalised."',
  '"Comfort starts with perfect fit."',
  '"Where science meets artistry."',
  '"A denture that feels like yours."',
  '"Attention to every millimetre."',
  '"The same hands that make, fit."',
  '"Craftsmanship you can feel."',
  '"Natural. Comfortable. Yours."',
  '"Every tooth matters."',
  '"Made for the person, not the jaw."',
  '"A perfect fit changes everything."',
  '"Bespoke to you, always."',
  '"Confidence in every bite."',
  '"Handcrafted. Patient-centred."',
  '"Details define results."',
  '"From consultation to smile."',
  '"One technician. All the way."',
  '"The art of the perfect denture."',
  '"Trust built tooth by tooth."',
  '"Shaped around your life."',
  '"Fitted by the person who made it."',
  '"Precision is my standard."',
  '"Your journey. My craft."',
  '"Smile with total confidence."',
  '"Dentures that feel right."',
  '"Worn with pride."',
  '"Changing lives, one smile at a time."',
]

/* ── Tooth anatomy — widths in relative units ── */
// 0=central incisor, 1=lateral, 2=canine, 3-4=premolar, 5-7=molar (per quadrant)
// Upper arch = indices 0-15, lower = 16-31
function getToothProps(globalIdx: number) {
  const half = globalIdx < 16 ? globalIdx : 31 - globalIdx
  // mirror: 0-7 left, 8-15 right → map to 0-7
  const pos = half < 8 ? half : 15 - half
  const isUpper = globalIdx < 16
  type Shape = { w: number; h: number; r: number }
  const shapes: Shape[] = [
    { w: 22, h: 36, r: 6 },   // 0 central incisor
    { w: 18, h: 34, r: 5 },   // 1 lateral incisor
    { w: 16, h: 38, r: 5 },   // 2 canine
    { w: 20, h: 30, r: 5 },   // 3 first premolar
    { w: 20, h: 28, r: 5 },   // 4 second premolar
    { w: 24, h: 26, r: 6 },   // 5 first molar
    { w: 23, h: 24, r: 6 },   // 6 second molar
    { w: 20, h: 20, r: 5 },   // 7 wisdom
  ]
  return { ...shapes[Math.min(pos, 7)], isUpper }
}

/* ── Single tooth ── */
function Tooth({ idx }: { idx: number }) {
  const [hovered, setHovered] = useState(false)
  const { w, h, r, isUpper } = getToothProps(idx)
  const quote = quotes[idx]

  return (
    <div className="relative flex flex-col items-center" style={{ zIndex: hovered ? 50 : 'auto' }}>
      {/* Quote tooltip — above for upper teeth, below for lower */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: isUpper ? 6 : -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute z-50 pointer-events-none w-44 ${
              isUpper ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          >
            <div className="glass-card px-3 py-2.5 text-center">
              <p className="font-serif text-[12px] font-light text-charcoal italic leading-snug">
                {quote}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooth body */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onTapStart={() => setHovered(v => !v)}
        animate={{
          y: hovered ? (isUpper ? -10 : 10) : 0,
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        className="cursor-pointer"
        style={{ width: w, height: h }}
        aria-label={`Tooth ${idx + 1}`}
      >
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`g${idx}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor={hovered ? '#fff'    : '#f5f3f0'} />
              <stop offset="55%"  stopColor={hovered ? '#f0ede9' : '#e8e5e1'} />
              <stop offset="100%" stopColor={hovered ? '#ddd9d4' : '#d5d1cc'} />
            </linearGradient>
            <filter id={`s${idx}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy={hovered ? 5 : 2} stdDeviation={hovered ? 5 : 2}
                floodColor="rgba(44,42,40,0.18)" />
            </filter>
          </defs>
          {/* Root area (narrow) */}
          <rect
            x={w * 0.22} y={isUpper ? h * 0.55 : 0}
            width={w * 0.56} height={h * 0.45}
            rx={r * 0.5}
            fill={hovered ? '#e8e5e1' : '#ddd9d4'}
            opacity={0.5}
          />
          {/* Crown */}
          <rect
            x={1} y={isUpper ? 1 : h * 0.4}
            width={w - 2} height={h * 0.65}
            rx={r}
            fill={`url(#g${idx})`}
            filter={`url(#s${idx})`}
            stroke={hovered ? 'rgba(44,42,40,0.12)' : 'rgba(44,42,40,0.07)'}
            strokeWidth="0.75"
          />
        </svg>
      </motion.div>
    </div>
  )
}

/* ── Dental arch row ── */
function Arch({ start, count, isUpper }: { start: number; count: number; isUpper: boolean }) {
  const centre = (count - 1) / 2
  return (
    <div className="flex items-end justify-center gap-[2px] sm:gap-[3px]">
      {Array.from({ length: count }, (_, i) => {
        const dist = Math.abs(i - centre)
        // Arch curve: central teeth sit lower (more prominent)
        const arcOffset = dist * 2.2
        return (
          <div key={i} style={{ marginTop: isUpper ? `${arcOffset}px` : undefined, marginBottom: isUpper ? undefined : `${arcOffset}px` }}>
            <Tooth idx={start + i} />
          </div>
        )
      })}
    </div>
  )
}

/* ── Main section ── */
export default function ThirtyTwo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="thirty-two"
      ref={ref}
      className="relative bg-warm-white py-24 md:py-36 overflow-hidden"
      aria-label="32 teeth — every smile is personal"
    >
      {/* Giant background 32 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-serif font-light text-charcoal/[0.035] leading-none"
          style={{ fontSize: 'clamp(20rem, 45vw, 42rem)' }}>
          32
        </span>
      </div>

      {/* Floating 3D aesthetic mouth art */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-72 md:w-96 lg:w-[30rem] pointer-events-none hidden lg:block z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/40 backdrop-blur-sm"
          style={{ filter: 'drop-shadow(0 25px 50px rgba(44,42,40,0.18))' }}
        >
          <img
            src="/images/aesthetic_teeth_3d.png"
            alt="3D Aesthetic Teeth Sculpture"
            className="w-full h-auto object-cover rounded-3xl transform scale-105 hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-white/10 pointer-events-none" />
        </motion.div>
      </motion.div>

      <div className="container-px relative z-10">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-5">
              32 · THE NUMBER THAT MATTERS
            </p>
            <h2 className="font-serif font-light text-charcoal leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              32 teeth.<br />
              <em className="text-charcoal/55">One very personal smile.</em>
            </h2>
            <p className="font-sans text-sm md:text-base font-light text-charcoal-mid leading-relaxed">
              Every tooth is a decision. Hover or tap any tooth in the arch below — each one carries a thought about what makes a denture truly personal.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-end"
          >
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '32', label: 'Teeth in a full adult mouth' },
                { num: '1', label: 'Technician, start to finish' },
                { num: '∞', label: 'Unique smile configurations' },
              ].map(s => (
                <div key={s.label} className="flex flex-col gap-2">
                  <span className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-none">{s.num}</span>
                  <span className="text-[10px] font-sans font-light text-charcoal-mid uppercase tracking-wide leading-snug">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── INTERACTIVE ARCH ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
          className="relative inline-flex flex-col items-center"
          style={{ gap: '2px' }}
        >
          {/* Hint */}
          <p className="text-[10px] font-sans font-light text-charcoal-mid/40 tracking-widest uppercase mb-6 self-start">
            ↕ touch any tooth
          </p>

          {/* UPPER arch — 16 teeth */}
          <div className="relative">
            <Arch start={0} count={16} isUpper={true} />
            {/* Gum line */}
            <div className="mt-1 mx-auto w-[90%] h-[6px] rounded-b-full"
              style={{ background: 'linear-gradient(to bottom, #e8cfc8, #ddc0b8)' }} />
          </div>

          {/* Bite gap */}
          <div className="h-5 flex items-center justify-center w-full">
            <div className="w-full h-px bg-silver/30" />
          </div>

          {/* LOWER arch — 16 teeth */}
          <div className="relative">
            {/* Gum line */}
            <div className="mb-1 mx-auto w-[90%] h-[6px] rounded-t-full"
              style={{ background: 'linear-gradient(to top, #e8cfc8, #ddc0b8)' }} />
            <Arch start={16} count={16} isUpper={false} />
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-xs font-sans font-light text-charcoal-mid/40 italic"
        >
          Each tooth represents a detail, a decision, a craft. No two smiles are ever the same.
        </motion.p>
      </div>
    </section>
  )
}
