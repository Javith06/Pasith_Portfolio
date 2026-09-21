export type VideoType = 'youtube' | 'vimeo' | 'mp4'

export interface Video {
  id: string
  title: string
  description: string
  thumbnail?: string
  videoUrl?: string
  type: VideoType
  orientation: 'landscape' | 'portrait'
}

// Add your videos here — they will automatically appear in the gallery
export const videos: Video[] = [
  {
    id: 'vid-01',
    title: 'Meet Pasith',
    description:
      'An introduction to Pasith and the technician-led approach to dentures.',
    thumbnail: undefined,
    videoUrl: undefined, // e.g. 'https://youtube.com/watch?v=...'
    type: 'youtube',
    orientation: 'landscape',
  },
  {
    id: 'vid-02',
    title: 'Creating a Denture',
    description:
      'A behind-the-scenes look at the craftsmanship that goes into every denture.',
    thumbnail: undefined,
    videoUrl: undefined,
    type: 'youtube',
    orientation: 'landscape',
  },
  {
    id: 'vid-03',
    title: 'Fitting Day',
    description:
      'The moment a patient receives their finished denture — and the difference it makes.',
    thumbnail: undefined,
    videoUrl: undefined,
    type: 'youtube',
    orientation: 'landscape',
  },
  {
    id: 'vid-04',
    title: 'Patient Journey',
    description:
      'From initial consultation through to a confident smile.',
    thumbnail: undefined,
    videoUrl: undefined,
    type: 'youtube',
    orientation: 'portrait',
  },
]
