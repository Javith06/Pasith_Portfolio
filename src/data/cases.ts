export interface Case {
  id: string
  title: string
  type: string
  process: string
  result: string
  beforeImage?: string
  afterImage?: string
  processImage?: string
  featured?: boolean
}

export const cases: Case[] = [
  {
    id: 'case-01',
    title: '[Case Title — e.g. Complete Upper Denture]',
    type: '[Denture Type — e.g. Complete Upper Denture]',
    process:
      '[Brief description of the process — e.g. Multiple consultations to establish the correct occlusion and aesthetics. Tooth selection based on patient facial profile.]',
    result:
      '[Description of outcome based on actual case — do not fabricate patient results.]',
    beforeImage: undefined,
    afterImage: undefined,
    featured: true,
  },
  {
    id: 'case-02',
    title: '[Case Title]',
    type: '[Denture Type]',
    process: '[Process description]',
    result: '[Outcome description]',
    beforeImage: undefined,
    afterImage: undefined,
    featured: true,
  },
  {
    id: 'case-03',
    title: '[Case Title]',
    type: '[Denture Type]',
    process: '[Process description]',
    result: '[Outcome description]',
    beforeImage: undefined,
    afterImage: undefined,
    featured: false,
  },
]
