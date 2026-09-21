import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  const current = testimonials[index]

  return (
    <section
      id="reviews"
      ref={ref}
      className="bg-charcoal text-warm-white py-24 md:py-36 overflow-hidden"
      aria-label="Patient reviews"
    >
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-silver mb-4">
              Reviews
            </p>
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-warm-white leading-tight text-balance max-w-xl">
              Kind words<br />from patients.
            </h2>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="bg-charcoal-light border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl"
            >
              {current.isVideo
                ? (
                  <div className="aspect-video rounded-xl bg-white/5 flex items-center justify-center mb-6 cursor-pointer group"
                    onClick={() => current.videoUrl && window.open(current.videoUrl, '_blank')}>
                    <div className="play-btn bg-warm-white/90">
                      <Play size={20} fill="#2C2A28" className="ml-1 text-charcoal" />
                    </div>
                  </div>
                )
                : (
                  <>
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array(5).fill(null).map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1L8.545 5.18H13L9.5 7.82L10.91 12L7 9.42L3.09 12L4.5 7.82L1 5.18H5.455L7 1Z" fill="#F7F6F4" fillOpacity="0.6"/>
                        </svg>
                      ))}
                    </div>

                    <blockquote className="font-serif text-2xl md:text-3xl font-light text-warm-white leading-relaxed mb-8">
                      "{current.text}"
                    </blockquote>
                  </>
                )
              }

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {current.photo
                    ? <img src={current.photo} alt={current.name} className="w-10 h-10 rounded-full object-cover" />
                    : <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-xs font-sans font-light text-white/50">
                          {current.name[0] || '?'}
                        </span>
                      </div>
                  }
                  <div>
                    <p className="text-sm font-sans font-medium text-warm-white">{current.name}</p>
                    {current.date && (
                      <p className="text-xs font-sans font-light text-silver">{current.date}</p>
                    )}
                  </div>
                </div>

                {current.sourceUrl && (
                  <a
                    href={current.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-light text-silver hover:text-warm-white transition-colors"
                  >
                    <ExternalLink size={12} />
                    View on {current.source}
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-8">
            <button
              id="reviews-prev"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} className="text-warm-white" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-warm-white w-4' : 'bg-white/30'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              id="reviews-next"
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={16} className="text-warm-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
