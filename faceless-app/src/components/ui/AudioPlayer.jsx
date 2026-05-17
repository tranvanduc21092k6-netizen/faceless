import { useState } from 'react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(33)

  return (
    <div className="card-surface card-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-16 h-16 rounded-full bg-primary text-[#0A0A0A] flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>
      <div className="flex-grow w-full">
        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="font-label-caps text-label-caps text-primary mb-1">
              Tập 04: Bản Rút Gọn
            </div>
            <div className="font-body-lg text-body-lg text-on-surface">
              Kiến Trúc Của Sự Hoang Tưởng
            </div>
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant">
            05:00
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 w-full bg-[#222222] relative mt-4 cursor-pointer group">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 w-3 h-3 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(200,169,110,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
