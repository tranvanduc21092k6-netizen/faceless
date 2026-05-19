'use client'

import { useState } from 'react'

export default function AudioPlaybackPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(55)

  return (
    <div className="pt-[80px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col items-center justify-center min-h-screen">
      <section className="w-full max-w-3xl mt-section-gap">
        <div className="mb-gutter text-center">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 text-on-surface">
            Kiến Trúc Của Sự Tĩnh Lặng
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Một sự tổng hợp biện chứng về những khoảng trống giữa các từ, được tạo ra bởi truy vấn tự động.
          </p>
        </div>

        {/* Active Audio Player Card */}
        <div className="bg-[#111111] border border-primary p-gutter w-full transition-colors duration-300 relative overflow-hidden">
          {/* Subtle Background Texture */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 10px, #e5c487 10px, #e5c487 11px)',
            }}
          />
          <div className="relative z-10 flex flex-col gap-6">
            {/* Top Row: Info & Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
                  className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#111111]"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div>
                  <h3 className="font-headline-md text-[24px] text-on-surface m-0 leading-tight">
                    Tập IV: Động Lực Hư Vô
                  </h3>
                  <div className="font-label-caps text-label-caps text-primary mt-1 uppercase">
                    {isPlaying ? 'Đang phát' : 'Tạm dừng'}
                  </div>
                </div>
              </div>
              {/* Secondary Controls */}
              <div className="hidden sm:flex items-center gap-4">
                <button aria-label="Tua lại 10 giây" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">replay_10</span>
                </button>
                <button aria-label="Tua tới 10 giây" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">forward_10</span>
                </button>
                <button aria-label="Âm lượng" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">volume_up</span>
                </button>
              </div>
            </div>

            {/* Progress Area */}
            <div className="flex flex-col gap-2">
              <div className="relative h-2 bg-[#222222] w-full cursor-pointer group">
                <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${progress}%` }} />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-on-surface rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
              <div className="flex justify-between items-center font-label-caps text-[10px] text-on-surface-variant tracking-wider">
                <span>02:45</span>
                <span>05:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contextual Tags */}
        <div className="flex gap-2 mt-6 flex-wrap">
          <span className="bg-[#222222] text-on-surface font-label-caps text-label-caps px-3 py-1 uppercase">Tổng Hợp</span>
          <span className="bg-[#222222] text-on-surface font-label-caps text-label-caps px-3 py-1 uppercase">Mô Hình: OMEGA-7</span>
          <span className="bg-[#222222] text-on-surface font-label-caps text-label-caps px-3 py-1 uppercase">Thời Lượng: 5P</span>
        </div>
      </section>
    </div>
  )
}
