'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * AudioPlayer — Component phát audio vật lý từ PocketBase Storage
 *
 * Cách kết nối từ ArticlePage:
 *   const audioUrl = pb.files.getUrl(record, record.audio_short)
 *   <AudioPlayer src={audioUrl} title={record.title} label="Bản Rút Gọn" />
 *
 * Props:
 *   src   (string) — URL audio lấy từ pb.files.getUrl(record, record.audio_short|audio_full)
 *   title (string) — Tiêu đề bài viết hiển thị trong player
 *   label (string) — Nhãn phụ (ví dụ: "Bản Rút Gọn" hoặc "Bản Đầy Đủ")
 */
export default function AudioPlayer({ src = '', title = '', label = 'Tập Hiện Tại' }) {
  const audioRef = useRef(null)           // ref tới thẻ <audio> HTML5
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)     // 0–100 (%)
  const [currentTime, setCurrentTime] = useState(0)  // giây hiện tại
  const [duration, setDuration] = useState(0)         // tổng thời lượng (giây)
  const [error, setError] = useState('')

  // Reset trạng thái khi URL audio thay đổi
  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    setError('')
  }, [src])

  // Xử lý play / pause: điều khiển thẻ <audio> DOM trực tiếp
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !src) return

    if (isPlaying) {
      audio.pause()
    } else {
      // audio.play() trả về Promise — cần bắt lỗi (ví dụ: autoplay bị block)
      audio.play().catch((err) => {
        console.error('Lỗi phát audio:', err)
        setError('Không thể phát audio. Vui lòng kiểm tra file.')
        setIsPlaying(false)
      })
    }
    setIsPlaying(!isPlaying)
  }

  // Cập nhật progress bar theo thời gian thực
  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setCurrentTime(audio.currentTime)
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  // Lưu duration khi metadata đã load xong
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Khi click vào progress bar: seek đến vị trí tương ứng
  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const ratio = clickX / rect.width
    audio.currentTime = ratio * audio.duration
    setProgress(ratio * 100)
  }

  // Khi audio kết thúc: reset về trạng thái đầu
  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
  }

  // Helper: format giây -> "MM:SS"
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div className="card-surface card-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      {/* Thẻ <audio> ẩn — đây là engine phát nhạc thật */}
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

      {/* Nút Play/Pause */}
      <button
        onClick={togglePlay}
        disabled={!src}
        aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
        className="w-16 h-16 rounded-full bg-primary text-[#0A0A0A] flex items-center justify-center shrink-0 hover:scale-105 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>

      <div className="flex-grow w-full">
        {/* Tiêu đề và nhãn */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="font-label-caps text-label-caps text-primary mb-1">
              {label}
            </div>
            <div className="font-body-lg text-body-lg text-on-surface truncate max-w-[280px]">
              {title || (src ? 'Đang tải...' : 'Chưa có audio')}
            </div>
          </div>
          {/* Thời lượng */}
          <div className="font-label-caps text-label-caps text-on-surface-variant text-right">
            <div>{formatTime(currentTime)}</div>
            <div className="text-[10px] opacity-60">{duration ? formatTime(duration) : '--:--'}</div>
          </div>
        </div>

        {/* Progress bar — click để seek */}
        <div
          className="h-1 w-full bg-[#222222] relative mt-4 cursor-pointer group"
          onClick={handleSeek}
        >
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 w-3 h-3 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(200,169,110,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <p className="text-red-400 text-[10px] mt-2 font-label-caps">{error}</p>
        )}

        {/* Gợi ý nếu chưa có src */}
        {!src && (
          <p className="text-on-surface-variant text-[10px] mt-2 font-label-caps uppercase tracking-widest">
            Bài viết này chưa có file audio.
          </p>
        )}
      </div>
    </div>
  )
}
