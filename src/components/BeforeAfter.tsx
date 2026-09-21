import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface BeforeAfterItem {
  id: string
  label?: string
  before?: string
  after?: string
}

const items: BeforeAfterItem[] = [
  { id: 'ba-01', label: 'Case 01 — [Add case title]' },
  { id: 'ba-02', label: 'Case 02 — [Add case title]' },
  { id: 'ba-03', label: 'Case 03 — [Add case title]' },
]

function BeforeAfterSlider({ item }: { item: BeforeAfterItem }) {
  const [position, setPosition] = useState(50)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = () => { isDragging.current = true }
  const onMouseUp = () => { isDragging.current = false }
  const onMouseMove = (e: MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX)
  }
  const onTouchMove = (e: TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
    }
  })

  return (
    <div
      ref={sliderRef}
      className="before-after-container w-full aspect-[4/3] rounded-2xl bg-silver/20 select-none overflow-hidden"
      onMouseDown={onMouseDown}
      onTouchMove={(e) => onTouchMove(e.nativeEvent)}
      role="img"
      aria-label={`Before and after slider: ${item.label}`}
    >
      {/* Before */}
      <div className="absolute inset-0 flex items-center justify-center">
        {item.before
          ? <img src={item.before} alt="Before" className="w-full h-full object-cover" />
          : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-sans font-light text-charcoal-mid/50 tracking-wider">BEFORE</p>
              <p className="text-xs font-sans font-light text-charcoal-mid/30">Image placeholder</p>
            </div>
          )
        }
        <div className="absolute top-4 left-4 glass-card px-3 py-1.5">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal">BEFORE</span>
        </div>
      </div>

      {/* After — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-warm-white/30">
          {item.after
            ? <img src={item.after} alt="After" className="w-full h-full object-cover" />
            : (
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-sans font-light text-charcoal/60 tracking-wider">AFTER</p>
                <p className="text-xs font-sans font-light text-charcoal/30">Image placeholder</p>
              </div>
            )
          }
          <div className="absolute top-4 right-4 glass-card px-3 py-1.5">
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal">AFTER</span>
          </div>
        </div>
      </div>

      {/* Handle */}
      <div
        className="before-after-handle"
        style={{ left: `calc(${position}% - 1px)` }}
        onMouseDown={onMouseDown}
      >
        <div className="before-after-handle-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 10L4 7M4 7L7 4M4 7H16M13 10L16 13M16 13L13 16M16 13H4" stroke="#F7F6F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="before-after"
      ref={ref}
      className="bg-warm-offwhite py-24 md:py-36"
      aria-label="Before and after transformations"
    >
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
            Transformations
          </p>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance max-w-xl">
            Real work. Real people.
          </h2>
          <p className="mt-4 font-sans text-sm font-light text-charcoal-mid max-w-md leading-relaxed">
            Drag the slider to reveal the transformation. Only genuine cases shown, with patient consent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <BeforeAfterSlider item={item} />
              {item.label && (
                <p className="mt-3 text-xs font-sans font-light text-charcoal-mid tracking-wide">
                  {item.label}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-xs font-sans font-light text-charcoal-mid/50 text-center">
          Patient images only displayed with appropriate consent. Placeholder images will be replaced with real cases.
        </p>
      </div>
    </section>
  )
}
