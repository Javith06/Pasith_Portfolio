import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const principles = [
  {
    num: '01',
    title: 'Personal',
    body: 'One technician involved throughout your denture journey — from the first conversation to the final fitting.',
  },
  {
    num: '02',
    title: 'Craftsmanship',
    body: 'Careful attention to the detail behind every denture, from tooth selection to gum-line shaping.',
  },
  {
    num: '03',
    title: 'Continuity',
    body: 'Making and fitting are closely connected through one professional — keeping the process cohesive.',
  },
  {
    num: '04',
    title: 'Individual',
    body: 'Every denture is approached around the individual\'s needs, lifestyle, comfort and aesthetic preferences.',
  },
]

export default function WhyPasith() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="why"
      ref={ref}
      className="bg-warm-offwhite py-24 md:py-36"
      aria-label="Why choose a technician-led approach"
    >
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
            The approach
          </p>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance max-w-2xl">
            Why choose a technician-led approach?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-silver/30 rounded-2xl overflow-hidden">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="bg-warm-offwhite p-8 md:p-10 flex flex-col gap-6 group hover:bg-warm-white transition-colors duration-300"
            >
              <span className="font-serif text-6xl font-light text-charcoal/10 leading-none group-hover:text-charcoal/20 transition-colors duration-300">
                {p.num}
              </span>
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal mb-3">
                  {p.title}
                </h3>
                <p className="font-sans text-sm font-light text-charcoal-mid leading-relaxed">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
