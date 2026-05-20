'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * AudioPlaybackBar — Thanh phát audio cố định ở dưới cùng màn hình
 *
 * Cách kết nối từ ArticlePage (hoặc bất kỳ trang nào):
 *
 *   // Lấy URL audio từ PocketBase record:
 *   const fullAudioUrl = pb.files.getUrl(record, record.audio_full)
 *
 *   // Truyền vào component:
 *   <AudioPlaybackBar
 *     isVisible={showPlayer}
 *     onClose={() => setShowPlayer(false)}
 *     src={fullAudioUrl}
 *     episodeTitle={record.title}
 *   />
 *
 * Props:
 *   isVisible    (bool)   — Hiện/ẩn thanh player
 *   onClose      (fn)     — Callback khi người dùng đóng
 *   src          (string) — URL audio từ pb.files.getUrl(record, record.audio_full)
 *   episodeTitle (string) — Tiêu đề bài viết
 */
export default function AudioPlaybackBar({ isVisible, onClose, src = '', episodeTitle }) {
  const audioRef = useRef(null)             // ref tới thẻ <audio> HTML5 ẩn
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)      // 0–100 (%)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Khi bar hiện ra: tự động phát
  useEffect(() => {
    if (isVisible && audioRef.current && src) {
      audioRef.current.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }, [isVisible, src])

  // Khi src thay đổi (sang bài khác): reset và phát lại
  useEffect(() => {
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(false)
  }, [src])

  // Khi bar ẩn đi: dừng audio
  useEffect(() => {
    if (!isVisible && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isVisible])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !src) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch((err) => {
        console.error('Lỗi phát audio:', err)
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  // Seek lùi 15 giây
  const seekBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15)
    }
  }

  // Seek tới 15 giây
  const seekForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0,
        audioRef.current.currentTime + 15
      )
    }
  }

  // Cập nhật progress bar theo thời gian thực
  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setCurrentTime(audio.currentTime)
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
  }

  // Click vào progress bar để seek
  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
  }

  // Helper: format giây -> "MM:SS"
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-[#0A0A0A] border-t border-outline-variant z-[100] px-margin-mobile md:px-margin-desktop py-4 md:py-6 transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Thẻ <audio> ẩn — engine phát nhạc thật */}
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />
      )}

      <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
        {/* Progress + Tiêu đề */}
        <div className="flex flex-col flex-1 min-w-0 w-full">
          <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-label-caps text-primary uppercase tracking-widest">
                Đang Phát
              </span>
              <h5 className="text-on-surface font-body-md truncate max-w-[260px] md:max-w-[400px]">
                {episodeTitle || 'Không có tiêu đề'}
              </h5>
            </div>
            {/* Thời gian hiện tại / tổng */}
            <span className="text-[12px] font-label-caps text-on-surface-variant whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress bar — click để seek */}
          <div
            className="relative w-full h-1 bg-surface-container-highest rounded-full cursor-pointer group"
            onClick={handleSeek}
          >
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

        {/* Nút điều khiển */}
        <div className="flex items-center gap-6">
          <button
            onClick={seekBack}
            aria-label="Tua lại 15 giây"
            className="text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">replay_15</span>
          </button>

          <button
            onClick={togglePlay}
            disabled={!src}
            aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
            className="w-12 h-12 flex items-center justify-center bg-primary-container text-[#0A0A0A] rounded-full hover:scale-105 transition-transform disabled:opacity-40"
          >
            <span className="material-symbols-outlined">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={seekForward}
            aria-label="Tua tới 15 giây"
            className="text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">forward_15</span>
          </button>
        </div>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          aria-label="Đóng player"
          className="absolute top-4 right-4 md:static text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </div>
  )
}
