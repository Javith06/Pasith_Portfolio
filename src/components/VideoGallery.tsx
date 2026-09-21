import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'
import { videos } from '../data/videos'

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

function getYouTubeThumbnail(url: string) {
  const id = getYouTubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null
}

function VideoCard({ video, index }: { video: typeof videos[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  const thumbnail = video.thumbnail
    || (video.videoUrl && video.type === 'youtube' ? getYouTubeThumbnail(video.videoUrl) : null)

  const handleClick = () => {
    if (!video.videoUrl) return
    window.open(video.videoUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className={`group hover-lift cursor-pointer bg-warm-offwhite border border-silver/30 rounded-2xl overflow-hidden ${
        video.orientation === 'portrait' ? 'md:row-span-2' : ''
      }`}
      onClick={handleClick}
      role={video.videoUrl ? 'link' : undefined}
      aria-label={`${video.videoUrl ? 'Watch' : 'Video placeholder:'} ${video.title}`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${video.orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'}`}>
        {thumbnail
          ? <img src={thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          : (
            <div className="w-full h-full bg-silver/20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-px bg-charcoal-mid/30" />
              <p className="text-xs font-sans font-light text-charcoal-mid/50 tracking-wider text-center px-4">
                VIDEO PLACEHOLDER
              </p>
            </div>
          )
        }

        {/* Overlay */}
        <div className="video-play-overlay">
          <div className="play-btn">
            <Play size={20} fill="#2C2A28" className="ml-1 text-charcoal" />
          </div>
        </div>

        {/* No video badge */}
        {!video.videoUrl && (
          <div className="absolute bottom-3 left-3 glass-card px-3 py-1.5">
            <span className="text-xs font-sans font-light text-charcoal-mid tracking-wider">
              Coming soon
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal mb-1.5">
          {video.title}
        </h3>
        <p className="font-sans text-sm font-light text-charcoal-mid leading-relaxed">
          {video.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function VideoGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="videos"
      ref={ref}
      className="bg-warm-white py-24 md:py-36"
      aria-label="Video gallery"
    >
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-sans font-light tracking-ultra-wide uppercase text-charcoal-mid mb-4">
            Videos
          </p>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-light text-charcoal leading-tight text-balance max-w-xl">
            See the craft<br />behind the smile.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-auto">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
