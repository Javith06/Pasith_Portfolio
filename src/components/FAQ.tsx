import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    id: 'faq-1',
    q: 'What is a Clinical Dental Technician?',
    a: 'A Clinical Dental Technician (CDT) is a dental professional registered with the General Dental Council (GDC) who is qualified to both make and directly provide complete dentures to patients. Unlike a dental technician who works only in a laboratory, a CDT can consult with patients directly and take impressions. [Expand this answer with your specific explanation.]',
  },
  {
    id: 'faq-2',
    q: 'What types of dentures do you provide?',
    a: 'A range of denture solutions are available, including complete dentures (full upper and lower), partial dentures, immediate dentures, and denture repairs and relines. [Confirm and expand this list based on your services.]',
  },
  {
    id: 'faq-3',
    q: 'How does the denture process work?',
    a: '[Provide a clear description of your process — from initial consultation through to fitting and aftercare. This is a key question patients will have.]',
  },
  {
    id: 'faq-4',
    q: 'How long does the process take?',
    a: '[Provide a realistic timeframe for your process. E.g., "The process typically involves X appointments over X weeks, depending on the type of denture and individual circumstances."]',
  },
  {
    id: 'faq-5',
    q: 'How are dentures fitted?',
    a: '[Describe the fitting process — how the same technician fits the denture, what adjustments are made at the fitting appointment, and what the patient should expect.]',
  },
  {
    id: 'faq-6',
    q: 'Do you provide adjustments after fitting?',
    a: '[Describe your adjustment/aftercare policy. E.g., "A review appointment is included as standard. Additional adjustments can be arranged as needed."]',
  },
  {
    id: 'faq-7',
    q: 'How can I arrange an appointment?',
    a: '[Explain your preferred contact method — phone, email or enquiry form. Include any relevant details about referrals if applicable.]',
  },
]

function FAQItem({ faq, index, open, onToggle }: {
  faq: typeof faqs[0]
  index: number
  open: boolean
  onToggle: () => void
}) {
  const inView = useInView(useRef<HTMLDivElement>(null), { once: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-silver/40 last:border-b-0"
    >
      <button
        id={faq.id}
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="font-sans text-sm md:text-base font-medium text-charcoal pr-8 group-hover:text-charcoal-mid transition-colors">
          {faq.q}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-silver/60 flex items-center justify-center">
          {open
            ? <Minus size={12} className="text-charcoal" />
            : <Plus size={12} className="text-charcoal" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="accordion-content"
          >
            <p className="font-sans text-sm font-light text-charcoal-mid leading-relaxed pb-6 max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [openId, setOpenId] = useState<string | null>(faqs[0].id)

  return (
    <section
      id="faq"
      ref={ref}
      className="bg-warm-white py-24 md:py-36"
      aria-label="Frequently asked questions"
    >
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 grid lg:grid-cols-2 gap-12"
        >
          <div>
            <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
              FAQs
            </p>
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance">
              Questions<br />answered.
            </h2>
          </div>
          <p className="font-sans text-base font-light text-charcoal-mid leading-relaxed self-end">
            If you have a question that isn't answered here, please don't hesitate to get in touch directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={i}
              open={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
