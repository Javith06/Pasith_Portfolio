import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cases } from '../data/cases'

function CasePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full aspect-[4/3] rounded-xl bg-silver/20 flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-px bg-charcoal-mid/30" />
      <p className="text-xs font-sans font-light text-charcoal-mid/50 tracking-wider text-center px-4">
        {label}
      </p>
    </div>
  )
}

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="work"
      ref={ref}
      className="bg-warm-white py-24 md:py-36"
      aria-label="Case studies and portfolio"
    >
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
              My work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance max-w-xl">
              Made with precision.
            </h2>
          </div>
          <p className="font-sans text-sm font-light text-charcoal-mid max-w-xs leading-relaxed">
            A selection of real cases — only genuine work, with appropriate patient consent where shown.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.article
              key={c.id}
              id={`case-${c.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group bg-warm-offwhite border border-silver/30 rounded-2xl overflow-hidden hover-lift"
            >
              {/* Image area */}
              <div className="relative">
                {c.afterImage
                  ? <img src={c.afterImage} alt={c.title} className="w-full aspect-[4/3] object-cover" />
                  : <CasePlaceholder label="CASE IMAGE PLACEHOLDER — Add with patient consent" />
                }
                <div className="absolute top-4 left-4">
                  <span className="glass-card px-3 py-1.5 text-xs font-sans font-semibold tracking-widest uppercase text-charcoal">
                    CASE {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 space-y-4">
                <div>
                  <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal-mid mb-1">
                    {c.type}
                  </h3>
                  <p className="font-serif text-xl font-light text-charcoal">
                    {c.title}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-charcoal-mid mb-1">
                      PROCESS
                    </p>
                    <p className="text-sm font-sans font-light text-charcoal-mid leading-relaxed">
                      {c.process}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-charcoal-mid mb-1">
                      RESULT
                    </p>
                    <p className="text-sm font-sans font-light text-charcoal-mid leading-relaxed">
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Consent notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-xs font-sans font-light text-charcoal-mid/60 text-center"
        >
          Patient photographs are only displayed with appropriate consent.
        </motion.p>
      </div>
    </section>
  )
}
