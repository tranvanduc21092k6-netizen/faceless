'use client'

export default function EpisodeCard({ episode, title, description, duration, isFeatured = false, onPlay }) {
  if (isFeatured) {
    return (
      <article
        className="col-span-1 md:col-span-8 bg-surface border border-surface-container flex flex-col justify-between p-8 md:p-12 group hover:border-outline-variant transition-colors cursor-pointer"
        onClick={onPlay}
      >
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container text-on-surface font-label-caps text-label-caps mb-6 border border-outline-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Bản Mới Nhất
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto border-t border-surface-container pt-6">
          <div className="flex items-center gap-4 text-on-surface-variant font-label-caps text-label-caps">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {duration}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">headphones</span>
              Âm Thanh
            </span>
          </div>
          <button
            aria-label="Phát Tập"
            className="w-12 h-12 flex items-center justify-center border border-surface-container text-on-surface group-hover:border-primary group-hover:text-primary transition-all rounded-full bg-surface-container-lowest"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </button>
        </div>
      </article>
    )
  }

  return (
    <article className="flex-grow bg-surface border border-surface-container p-6 flex flex-col justify-between group hover:border-outline-variant transition-colors cursor-pointer" onClick={onPlay}>
      <div>
        <span className="text-on-surface-variant font-label-caps text-label-caps mb-3 block">
          {episode}
        </span>
        <h4 className="font-pull-quote text-pull-quote text-on-surface text-[24px] leading-snug mb-3 group-hover:text-primary transition-colors">
          {title}
        </h4>
      </div>
      <div className="flex items-center justify-between border-t border-surface-container pt-4 mt-6">
        <span className="text-on-surface-variant font-label-caps text-label-caps">{duration}</span>
        <button aria-label="Phát Tập" className="text-on-surface hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_circle
          </span>
        </button>
      </div>
    </article>
  )
}
