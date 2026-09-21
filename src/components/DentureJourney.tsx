import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Consultation',
    body: 'Understanding the patient\'s needs, expectations and goals for their denture. A conversation about lifestyle, aesthetics and comfort.',
  },
  {
    num: '02',
    title: 'Planning',
    body: 'Creating a personalised approach to the denture. Selecting materials, tooth shapes and shades that work for the individual.',
  },
  {
    num: '03',
    title: 'Crafting',
    body: 'The denture is carefully made by hand — every detail considered, from the gum-line to the tooth positioning.',
  },
  {
    num: '04',
    title: 'Fitting',
    body: 'The same technician who made the denture fits it — making real-time assessments and adjustments as needed.',
  },
  {
    num: '05',
    title: 'Adjustment',
    body: 'Fine adjustments where required to ensure comfort and confidence with the finished denture.',
  },
  {
    num: '06',
    title: 'Care',
    body: 'Ongoing guidance, aftercare information and support as patients settle into life with their new denture.',
  },
]

export default function DentureJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="journey"
      ref={ref}
      className="bg-warm-offwhite py-24 md:py-36 overflow-hidden"
      aria-label="The denture journey"
    >
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
            Your journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance max-w-xl">
            The denture journey.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="hidden lg:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-silver origin-top"
          />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-20 items-center py-10 border-b border-silver/30 last:border-b-0 ${
                    isEven ? '' : 'lg:[direction:rtl]'
                  }`}
                >
                  <div className={`flex items-start gap-6 ${isEven ? '' : 'lg:[direction:ltr]'}`}>
                    <span className="font-serif text-6xl md:text-7xl font-light text-charcoal/10 leading-none flex-shrink-0 w-20">
                      {step.num}
                    </span>
                    <div className="pt-2">
                      <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal mb-3">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm md:text-base font-light text-charcoal-mid leading-relaxed max-w-sm">
                        {step.body}
                      </p>
                    </div>
                  </div>

                  {/* Center dot indicator (desktop only) */}
                  <div className={`hidden lg:flex ${isEven ? 'justify-start' : 'justify-end lg:[direction:ltr]'}`}>
                    <div className="w-3 h-3 rounded-full bg-charcoal border-2 border-warm-offwhite ring-1 ring-charcoal" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
