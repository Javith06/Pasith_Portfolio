import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { services } from '../data/services'

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="dentures"
      ref={ref}
      className="bg-warm-white py-24 md:py-36"
      aria-label="Denture services"
    >
      <div className="container-px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
            Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance max-w-2xl">
            Specialising in dentures.
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              id={`service-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="group hover-lift bg-warm-offwhite border border-silver/30 rounded-2xl p-7 md:p-8 flex flex-col gap-5 cursor-default"
            >
              {/* Number */}
              <span className="font-serif text-6xl font-light text-charcoal/10 leading-none group-hover:text-charcoal/20 transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex-1">
                <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal mb-1">
                  {service.title}
                </h3>
                <p className="font-serif text-xl font-light italic text-charcoal-mid mb-4">
                  {service.subtitle}
                </p>
                <p className="font-sans text-sm font-light text-charcoal-mid leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Image placeholder */}
              <div className="rounded-xl overflow-hidden bg-silver/20 aspect-video flex items-center justify-center">
                {service.image
                  ? <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  : (
                    <div className="text-center px-4">
                      <div className="w-8 h-px bg-charcoal-mid/30 mx-auto mb-2" />
                      <p className="text-xs font-sans font-light text-charcoal-mid/50 tracking-wider">
                        IMAGE PLACEHOLDER
                      </p>
                    </div>
                  )
                }
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
