import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../data/profile'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="about"
      ref={ref}
      className="bg-warm-white py-24 md:py-36"
      aria-label="About Pasith"
    >
      <div className="container-px">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
        >
            {/* Tall cinematic portrait */}
            <div className="aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={profile.photo}
                alt={`${profile.name} — ${profile.title}`}
                className="w-full h-full object-cover object-[center_15%]"
              />
              {/* Subtle bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent rounded-3xl" />
            </div>

            {/* Floating credential card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 md:right-0 glass-card p-5 max-w-[220px]"
            >
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-1">
                {profile.title}
              </p>
              <p className="font-serif text-lg font-light text-charcoal">
                {profile.name}
              </p>
              <div className="mt-2 pt-2 border-t border-silver/40">
                <p className="text-xs font-sans font-light text-charcoal-mid">
                  {profile.location}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pt-4 lg:pt-12"
          >
            <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-6">
              About
            </p>

            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight mb-3">
              Meet Pasith.
            </h2>
            <p className="font-serif text-xl font-light italic text-charcoal-mid mb-8">
              {profile.title} specialising in dentures.
            </p>

            <div className="w-8 h-px bg-charcoal-mid/40 mb-8" />

            <p className="font-sans text-base font-light text-charcoal-mid leading-relaxed mb-10">
              {profile.bio}
            </p>

            {/* Details grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-3">
                  Qualifications
                </p>
                <ul className="space-y-1.5">
                  {profile.qualifications.map((q, i) => (
                    <li key={i} className="text-sm font-sans font-light text-charcoal-mid flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-charcoal-mid flex-shrink-0" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-3">
                  Memberships
                </p>
                <ul className="space-y-1.5">
                  {profile.memberships.map((m, i) => (
                    <li key={i} className="text-sm font-sans font-light text-charcoal-mid flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-charcoal-mid flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>

                {profile.gdc && (
                  <div className="mt-4">
                    <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-1">GDC</p>
                    <p className="text-sm font-sans font-light text-charcoal-mid">{profile.gdc}</p>
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-1">Experience</p>
                  <p className="text-sm font-sans font-light text-charcoal-mid">{profile.experience}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
