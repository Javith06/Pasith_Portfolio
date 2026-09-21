import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../data/profile'
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const serviceOptions = [
  'New dentures',
  'Denture repair',
  'Denture reline',
  'Denture consultation',
  'General enquiry',
  'Other',
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend or form service (e.g. Formspree, Netlify Forms)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-warm-offwhite py-24 md:py-36"
      aria-label="Contact Pasith"
    >
      <div className="container-px">
        {/* CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
            Contact
          </p>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance max-w-2xl">
            Ready to start your denture journey?
          </h2>
          <p className="mt-6 font-sans text-base font-light text-charcoal-mid leading-relaxed max-w-xl">
            Get in touch to discuss your requirements and find out how the process works.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Contact methods */}
            <div className="space-y-4">
              <a
                href={`tel:${profile.phone}`}
                id="contact-phone"
                className="flex items-center gap-4 group hover-lift bg-warm-white border border-silver/30 rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-warm-white" />
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal-mid">
                    CALL
                  </p>
                  <p className="font-sans text-sm font-medium text-charcoal group-hover:text-charcoal-mid transition-colors">
                    {profile.phone}
                  </p>
                </div>
                <ChevronRight size={16} className="ml-auto text-charcoal-mid group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                id="contact-email"
                className="flex items-center gap-4 group hover-lift bg-warm-white border border-silver/30 rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-warm-white" />
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal-mid">
                    EMAIL
                  </p>
                  <p className="font-sans text-sm font-medium text-charcoal group-hover:text-charcoal-mid transition-colors">
                    {profile.email}
                  </p>
                </div>
                <ChevronRight size={16} className="ml-auto text-charcoal-mid group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center gap-4 bg-warm-white border border-silver/30 rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-warm-white" />
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal-mid">
                    LOCATION
                  </p>
                  <p className="font-sans text-sm font-medium text-charcoal">{profile.address}</p>
                </div>
              </div>
            </div>

            {/* Opening hours */}
            {profile.hours.length > 0 && (
              <div className="bg-warm-white border border-silver/30 rounded-xl p-6">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-4">
                  Opening Hours
                </p>
                <div className="space-y-2">
                  {profile.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <span className="text-sm font-sans font-light text-charcoal-mid">{h.day}</span>
                      <span className="text-sm font-sans font-light text-charcoal">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {submitted
              ? (
                <div className="bg-warm-white border border-silver/30 rounded-2xl p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10L8 14L16 6" stroke="#2C2A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-charcoal mb-2">Enquiry sent.</h3>
                  <p className="font-sans text-sm font-light text-charcoal-mid">
                    Thank you for getting in touch. We'll be in contact shortly.
                  </p>
                </div>
              )
              : (
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="bg-warm-white border border-silver/30 rounded-2xl p-6 md:p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-2">
                        Name
                      </label>
                      <input
                        id="form-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-warm-offwhite border border-silver/40 rounded-xl text-sm font-sans font-light text-charcoal placeholder-charcoal-mid/50 focus:outline-none focus:border-charcoal transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-2">
                        Email
                      </label>
                      <input
                        id="form-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-warm-offwhite border border-silver/40 rounded-xl text-sm font-sans font-light text-charcoal placeholder-charcoal-mid/50 focus:outline-none focus:border-charcoal transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-2">
                        Phone <span className="text-charcoal-mid font-light normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        id="form-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+44 XXXX XXXXXX"
                        className="w-full px-4 py-3 bg-warm-offwhite border border-silver/40 rounded-xl text-sm font-sans font-light text-charcoal placeholder-charcoal-mid/50 focus:outline-none focus:border-charcoal transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-service" className="block text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-2">
                        What can I help with?
                      </label>
                      <select
                        id="form-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-warm-offwhite border border-silver/40 rounded-xl text-sm font-sans font-light text-charcoal focus:outline-none focus:border-charcoal transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select...</option>
                        {serviceOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-message" className="block text-xs font-sans font-semibold tracking-widest uppercase text-charcoal mb-2">
                      Message
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me a little about your situation..."
                      className="w-full px-4 py-3 bg-warm-offwhite border border-silver/40 rounded-xl text-sm font-sans font-light text-charcoal placeholder-charcoal-mid/50 focus:outline-none focus:border-charcoal transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="form-submit"
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-charcoal text-warm-white text-xs font-sans font-medium tracking-widest uppercase rounded-full hover:bg-charcoal-light transition-colors duration-200"
                  >
                    SEND ENQUIRY
                    <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>

                  <p className="text-xs font-sans font-light text-charcoal-mid/60 text-center">
                    Your details will only be used to respond to your enquiry.
                  </p>
                </form>
              )
            }
          </motion.div>
        </div>
      </div>
    </section>
  )
}
