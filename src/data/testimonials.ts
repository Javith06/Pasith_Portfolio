export interface Testimonial {
  id: string
  name: string // first name or initials only
  text: string
  date?: string
  source?: string
  sourceUrl?: string
  photo?: string
  isVideo?: boolean
  videoUrl?: string
}

// IMPORTANT: Only add real patient reviews with appropriate consent.
// Do not use fabricated or invented reviews.
export const testimonials: Testimonial[] = [
  {
    id: 'review-01',
    name: '[Patient First Name / Initials]',
    text: '[Patient review text — only use genuine reviews with patient consent. Replace this placeholder with a real review once available.]',
    date: '[Month Year]',
    source: 'Google',
    sourceUrl: '[Link to Google review]',
    photo: undefined,
    isVideo: false,
  },
  {
    id: 'review-02',
    name: '[Patient First Name / Initials]',
    text: '[Patient review text — with consent from the patient.]',
    date: '[Month Year]',
    source: 'Google',
    sourceUrl: '[Link to Google review]',
    photo: undefined,
    isVideo: false,
  },
  {
    id: 'review-03',
    name: '[Patient First Name / Initials]',
    text: '[Video testimonial — patient to provide video with consent.]',
    date: '[Month Year]',
    source: undefined,
    sourceUrl: undefined,
    photo: undefined,
    isVideo: true,
    videoUrl: undefined,
  },
]
