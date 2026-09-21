export interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  image?: string
  available: boolean
  confirm?: boolean
}

export const services: Service[] = [
  {
    id: 'complete-dentures',
    title: 'Complete Dentures',
    subtitle: 'Full upper and lower arches',
    description:
      'A complete denture replaces all teeth in either the upper or lower jaw, or both. Each denture is individually crafted to suit the patient\'s facial structure, bite, and aesthetic preferences.',
    available: true,
  },
  {
    id: 'partial-dentures',
    title: 'Partial Dentures',
    subtitle: 'For patients with remaining natural teeth',
    description:
      'Partial dentures fill the gaps left by one or more missing teeth while remaining natural teeth are still present. Carefully designed to blend with existing dentition.',
    available: true,
  },
  {
    id: 'immediate-dentures',
    title: 'Immediate Dentures',
    subtitle: 'Fitted on the day of extraction',
    description:
      'Immediate dentures are prepared in advance and placed as soon as teeth are removed, so you leave without a gap. They can be adjusted or relined as healing progresses.',
    available: true,
  },
  {
    id: 'denture-repairs',
    title: 'Denture Repairs',
    subtitle: 'Restoring damaged or broken dentures',
    description:
      'If your denture has cracked, chipped or broken, it may be possible to repair it. Quick turnaround repairs to restore function and appearance.',
    available: true,
  },
  {
    id: 'denture-relines',
    title: 'Denture Relines',
    subtitle: 'Improved fit as your mouth changes',
    description:
      'Over time, the shape of your jaw and gums changes, which can affect the fit of your denture. A reline reshapes the inner surface to restore a comfortable, secure fit.',
    available: true,
  },
]
