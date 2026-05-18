import { useState, useEffect, useRef } from 'react'

export default function AudioPlaybackBar({ isVisible, onClose, episodeTitle }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current)
            return 100
          }
          return prev + 0.1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  useEffect(() => {
    if (isVisible) {
      setIsPlaying(true)
    }
  }, [isVisible])

  const formatTime = (pct) => {
    const totalSeconds = Math.floor((pct / 100) * 6300) // 1h45m = 6300s
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-[#0A0A0A] border-t border-outline-variant z-[100] px-margin-mobile md:px-margin-desktop py-4 md:py-6 transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div className="flex flex-col flex-1 min-w-0 w-full">
          <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-label-caps text-primary uppercase tracking-widest">
                Đang Phát
              </span>
              <h5 className="text-on-surface font-body-md truncate">
                {episodeTitle || 'Kiến Trúc Của Sự Tĩnh Lặng: Điều Hướng Hư Vô Trong Cú Pháp Nhân Tạo'}
              </h5>
            </div>
            <span className="text-[12px] font-label-caps text-on-surface-variant">
              {formatTime(progress)} / 01:45:00
            </span>
          </div>
          <div className="relative w-full h-1 bg-surface-container-highest rounded-full cursor-pointer group">
            <div
              className="absolute top-0 left-0 h-full bg-primary-container rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-on-surface rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface hover:text-primary transition-colors">
            <span className="material-symbols-outlined">replay_15</span>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center bg-primary-container text-[#0A0A0A] rounded-full hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button className="text-on-surface hover:text-primary transition-colors">
            <span className="material-symbols-outlined">forward_15</span>
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:static text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </div>
  )
}
