import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  { num: '01', label: 'CONSULTATION', desc: 'Understanding the patient\'s needs and expectations.' },
  { num: '02', label: 'DESIGN', desc: 'Creating a personalised treatment approach.' },
  { num: '03', label: 'CRAFT', desc: 'The denture is carefully made and refined.' },
  { num: '04', label: 'FIT', desc: 'The same technician fits and assesses the denture.' },
  { num: '05', label: 'FOLLOW-UP', desc: 'Fine adjustments and ongoing care guidance.' },
]

export default function CoreDifferentiator() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="differentiator"
      ref={ref}
      className="bg-charcoal text-warm-white py-24 md:py-36 overflow-hidden"
      aria-label="Core differentiator"
    >
      <div className="container-px">
        {/* Statement */}
        <div className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-sans font-light tracking-ultra-wide uppercase text-silver mb-6"
          >
            The difference
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-4xl md:text-6xl xl:text-7xl font-light text-warm-white leading-[1.05] mb-8 max-w-3xl text-balance"
          >
            One technician.<br />
            <em>From making to fitting.</em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="origin-left w-16 h-px bg-silver mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-base md:text-lg font-light text-silver leading-relaxed max-w-2xl"
          >
            Keeping the making and fitting process closely connected allows every denture to be approached with attention to detail, comfort, fit and individual needs.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="bg-charcoal-light p-6 md:p-8 flex flex-col gap-4 group hover:bg-charcoal transition-colors duration-300"
            >
              <span className="font-serif text-5xl md:text-6xl font-light text-white/10 group-hover:text-white/20 transition-colors leading-none">
                {step.num}
              </span>
              <div>
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-warm-white mb-2">
                  {step.label}
                </p>
                <p className="text-sm font-sans font-light text-silver leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Made by me / Fitted by me badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-4"
        >
          {['MADE BY ME', 'FITTED BY ME'].map((tag) => (
            <div key={tag} className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-warm-white" />
              <span className="text-xs font-sans font-medium tracking-widest uppercase text-warm-white">
                {tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
