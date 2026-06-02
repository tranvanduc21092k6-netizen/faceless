'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '../context/AuthContext'
import SideNavBar from '../components/layout/SideNavBar'

/**
 * ReadView — Component chính cho route /read/[slug]
 *
 * Hiển thị có điều kiện dựa trên authStatus:
 *
 * STATE A (Guest / Free):
 *   - Trích đoạn công khai với hiệu ứng fade-out 50%
 *   - Audio player preview 5 phút
 *   - Form bắt email chuyển đổi cao
 *   - Lớp phủ mờ: "Không gian này yêu cầu định danh. Đăng nhập để đọc tiếp."
 *
 * STATE B (Premium / Admin):
 *   - SideNavBar cố định bên trái
 *   - Nội dung markdown đầy đủ
 *   - Audio player đầy đủ với nút tốc độ 1x / 1.5x / 2x
 *   - Thanh tiến trình đọc
 */
export default function ReadView({ initialAuthStatus = 'guest' }) {
  const { slug } = useParams()
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()

  // ── State dữ liệu ──
  const [data, setData] = useState(null)
  const [authStatus, setAuthStatus] = useState(initialAuthStatus)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ── State UI ──
  const [readProgress, setReadProgress] = useState(0)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  // ── Audio State ──
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  // ============================================================
  // LOGIC 1: Fetch dữ liệu từ API /api/content/[slug]
  // ============================================================
  useEffect(() => {
    async function fetchContent() {
      if (!slug) return
      setLoading(true)

      try {
        const res = await fetch(`/api/content/${slug}`, {
          credentials: 'include', // Gửi cookie pb_auth
        })

        const json = await res.json()

        if (!json.success) {
          setError(json.error || 'Không thể tải nội dung.')
          return
        }

        setData(json.data)
        setAuthStatus(json.authStatus || initialAuthStatus)
      } catch (err) {
        console.error('[ReadView] Lỗi fetch:', err)
        setError('Lỗi kết nối. Vui lòng thử lại.')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [slug, initialAuthStatus])

  // ============================================================
  // LOGIC 2: Theo dõi scroll → thanh tiến trình đọc
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ============================================================
  // LOGIC 3: Audio controls
  // ============================================================
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((err) => {
        console.error('Lỗi phát audio:', err)
        setIsPlaying(false)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setCurrentTime(audio.currentTime)
    setAudioProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setAudioProgress(0)
    setCurrentTime(0)
  }

  const cyclePlaybackRate = () => {
    const rates = [1, 1.5, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextRate = rates[(currentIndex + 1) % rates.length]
    setPlaybackRate(nextRate)
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate
    }
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setEmailSubmitted(true)
  }

  // ── Loading State ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#C8A96E]/20 border-t-[#C8A96E] rounded-full animate-spin" />
        <p className="font-label-caps text-[#d0c5b5] text-[11px] uppercase tracking-widest">
          Đang giải mã hồ sơ...
        </p>
      </div>
    )
  }

  // ── Error / Not Found State ──
  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4 text-[#E8E6E1]">
        <span className="material-symbols-outlined text-[#C8A96E] text-[48px]">error_outline</span>
        <h2 className="font-headline-md text-headline-md">{error || 'Hồ sơ không tồn tại.'}</h2>
        <Link
          href="/"
          className="text-[#C8A96E] font-label-caps uppercase border-b border-[#C8A96E] hover:opacity-80 transition-opacity"
        >
          Quay lại trang chủ
        </Link>
      </div>
    )
  }

  const isPremium = authStatus === 'premium'
  const audioSrc = isPremium
    ? data.secure_audio_full_path
    : data.audio_preview_url

  // ================================================================
  // STATE B — PREMIUM / ADMIN: Nội dung đầy đủ + Sidebar
  // ================================================================
  if (isPremium) {
    return (
      <>
        {/* Thanh tiến trình đọc */}
        <div
          className="fixed top-0 left-0 h-[2px] bg-[#C8A96E] z-[100] transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />

        {/* SideNavBar cố định bên trái */}
        <SideNavBar />

        {/* Vùng nội dung chính */}
        <main className="flex-1 ml-0 md:ml-20 pt-24 md:pt-16 pb-[120px] px-5 md:px-20 flex justify-center w-full min-h-screen bg-[#0A0A0A]">
          <article className="w-full max-w-[680px]">

            {/* Tags & Metadata */}
            <div className="flex items-center space-x-4 mb-8">
              {data.tags?.map(tag => (
                <span
                  key={tag}
                  className="font-label-caps text-[12px] text-[#C8A96E] bg-[#222222] px-2 py-1 uppercase tracking-widest"
                  style={{ borderRadius: 0 }}
                >
                  {tag}
                </span>
              ))}
              {data.type && (
                <span className="font-label-caps text-[12px] text-[#d0c5b5]">
                  {data.type}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-headline-lg text-[32px] md:text-[48px] leading-[1.2] text-[#E8E6E1] mb-8 font-medium">
              {data.title}
            </h1>

            {/* ── Audio Postcard (Bản Đầy Đủ) ── */}
            {audioSrc && (
              <div
                className="bg-[#111111] border border-[#222222] p-6 mb-12 flex items-center justify-between"
                style={{ borderRadius: 0 }}
              >
                <audio
                  ref={audioRef}
                  src={audioSrc}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleEnded}
                  preload="metadata"
                />

                <div className="flex items-center space-x-4 w-full">
                  {/* Nút Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-transparent border border-[#222222] hover:border-[#C8A96E] text-[#C8A96E] flex items-center justify-center transition-colors flex-shrink-0"
                    style={{ borderRadius: '50%' }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  {/* Progress + Labels */}
                  <div className="flex-1">
                    <div className="flex justify-between font-label-caps text-[12px] mb-2 text-[#d0c5b5]">
                      <span>Phiên Biện Chứng Đầy Đủ</span>
                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <div
                      className="w-full h-1 bg-[#222222] relative cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div
                        className="absolute left-0 top-0 h-full bg-[#C8A96E] transition-all duration-100"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Nút tốc độ 1x / 1.5x / 2x */}
                  <button
                    onClick={cyclePlaybackRate}
                    className="font-label-caps text-[12px] text-[#C8A96E] border border-transparent hover:border-[#222222] px-2 py-1 transition-colors flex-shrink-0"
                    style={{ borderRadius: 0 }}
                  >
                    {playbackRate}x
                  </button>
                </div>
              </div>
            )}

            {/* ── Nội dung Markdown đầy đủ ── */}
            <div className="space-y-8 font-body-lg text-[18px] leading-[1.7] text-[#d0c5b5]">
              {data.markdown_content ? (
                <ReactMarkdown
                  components={{
                    // Custom rendering cho typography hệ thống
                    h1: ({ children }) => (
                      <h1 className="font-headline-lg text-[48px] text-[#E8E6E1] mb-6 mt-12 leading-[1.2] font-medium">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-headline-md text-[32px] text-[#E8E6E1] mb-6 mt-8 leading-[1.3] font-medium">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-headline-md text-[24px] text-[#E8E6E1] mb-4 mt-6 leading-[1.3] font-medium">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-6 text-[#d0c5b5] leading-[1.7]">{children}</p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="pl-6 border-l-2 border-[#C8A96E] my-8 font-pull-quote text-[24px] text-[#E8E6E1] italic leading-[1.4]">
                        {children}
                      </blockquote>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-[#E8E6E1] font-bold">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none space-y-3 my-6 pl-0">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#C8A96E] mt-[10px] flex-shrink-0 rotate-45" />
                        <span>{children}</span>
                      </li>
                    ),
                    hr: () => (
                      <div className="flex items-center justify-center py-12">
                        <div className="h-px bg-[#222222] flex-1" />
                        <div className="w-4 h-4 border border-[#C8A96E] rotate-45 mx-4" />
                        <div className="h-px bg-[#222222] flex-1" />
                      </div>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-[#C8A96E] border-b border-[#C8A96E]/30 hover:border-[#C8A96E] transition-colors" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="bg-[#1c1b1b] text-[#e3c285] px-2 py-0.5 text-[14px] font-mono" style={{ borderRadius: 0 }}>
                        {children}
                      </code>
                    ),
                  }}
                >
                  {data.markdown_content}
                </ReactMarkdown>
              ) : data.public_excerpt ? (
                <ReactMarkdown>{data.public_excerpt}</ReactMarkdown>
              ) : (
                <p className="text-[#d0c5b5] italic font-pull-quote">
                  Bài viết này chưa có nội dung Markdown.
                </p>
              )}
            </div>

            {/* Footer / Bài tiếp theo */}
            <footer
              className="mt-[120px] pt-12 border-t border-[#4d463a] w-full"
              style={{ borderRadius: 0 }}
            >
              <div className="font-label-caps text-[12px] text-[#C8A96E] mb-4 block uppercase tracking-widest">
                Bài tiếp theo
              </div>
              <Link
                href="/library"
                className="font-headline-md text-[32px] text-[#E8E6E1] hover:text-[#C8A96E] transition-colors duration-300 block mb-6 leading-[1.3]"
              >
                Khám phá thêm trong Thư Viện
              </Link>
              <div className="font-label-caps text-[12px] text-[#d0c5b5] uppercase tracking-widest">
                © 2024 Faceless Media
              </div>
            </footer>
          </article>
        </main>
      </>
    )
  }

  // ================================================================
  // STATE A — GUEST / FREE: Trích đoạn + Form Email + Lớp Phủ Mờ
  // ================================================================
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center">
      {/* Thanh tiến trình đọc */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#C8A96E] z-[100] transition-all duration-150"
        style={{ width: `${readProgress}%` }}
      />

      <main className="w-full max-w-[680px] mx-auto pt-32 pb-[120px] px-5 md:px-8 relative">

        {/* Tags */}
        <div className="flex items-center space-x-4 mb-8">
          {data.tags?.map(tag => (
            <span
              key={tag}
              className="font-label-caps text-[12px] text-[#C8A96E] bg-[#222222] px-2 py-1 uppercase tracking-widest"
              style={{ borderRadius: 0 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-headline-lg text-[32px] md:text-[48px] leading-[1.2] text-[#E8E6E1] mb-8 font-medium">
          {data.title}
        </h1>

        {/* ── Audio Preview Player (5 phút) ── */}
        {data.audio_preview_url && (
          <div
            className="bg-[#111111] border border-[#222222] p-6 mb-12 flex items-center justify-between"
            style={{ borderRadius: 0 }}
          >
            <audio
              ref={audioRef}
              src={data.audio_preview_url}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              preload="metadata"
            />

            <div className="flex items-center space-x-4 w-full">
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-transparent border border-[#222222] hover:border-[#C8A96E] text-[#C8A96E] flex items-center justify-center transition-colors flex-shrink-0"
                style={{ borderRadius: '50%' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <div className="flex-1">
                <div className="flex justify-between font-label-caps text-[12px] mb-2 text-[#d0c5b5]">
                  <span>Audio Postcard — Bản Preview</span>
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div
                  className="w-full h-1 bg-[#222222] relative cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-[#C8A96E] transition-all duration-100"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={cyclePlaybackRate}
                className="font-label-caps text-[12px] text-[#C8A96E] border border-transparent hover:border-[#222222] px-2 py-1 transition-colors flex-shrink-0"
                style={{ borderRadius: 0 }}
              >
                {playbackRate}x
              </button>
            </div>
          </div>
        )}

        {/* ── Trích đoạn với hiệu ứng fade-out 50% ── */}
        <div className="excerpt-fade-overlay relative">
          <div className="space-y-6 font-body-lg text-[18px] leading-[1.7] text-[#d0c5b5]">
            {data.public_excerpt ? (
              <ReactMarkdown>{data.public_excerpt}</ReactMarkdown>
            ) : (
              <p className="italic">Nội dung trích đoạn chưa sẵn sàng.</p>
            )}
          </div>
        </div>

        {/* ── LỚP PHỦ MỜ — Cổng Xác Thực ── */}
        <div
          className="auth-blur-overlay mt-8 p-8 md:p-12 flex flex-col items-center text-center"
          style={{ borderRadius: 0 }}
        >
          {/* Icon khoá */}
          <span
            className="material-symbols-outlined text-[#C8A96E] text-[48px] mb-6"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isAuthenticated ? 'auto_awesome' : 'lock'}
          </span>

          {/* Text yêu cầu xác thực */}
          <h2 className="font-headline-md text-[24px] md:text-[32px] text-[#E8E6E1] mb-4 leading-[1.3] font-medium">
            {isAuthenticated
              ? 'Nội dung này dành cho thành viên Premium.'
              : 'Không gian này yêu cầu định danh.'}
          </h2>
          <p className="font-body-md text-[16px] text-[#d0c5b5] mb-8 max-w-md leading-[1.6]">
            {isAuthenticated
              ? 'Nâng cấp lên Premium để đọc toàn bộ bài luận chuyên sâu, nghe phiên biện chứng đầy đủ và truy cập kho lưu trữ không giới hạn.'
              : 'Đăng nhập để đọc tiếp. Tham gia biện chứng để truy cập toàn bộ kho lưu trữ, bài luận độc quyền và phiên nghe đầy đủ.'}
          </p>

          {/* Nút CTA */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            {isAuthenticated ? (
              // User đã login nhưng là free → nâng cấp
              <Link
                href="/upgrade"
                className="flex-1 bg-[#C8A96E] text-[#0A0A0A] font-label-caps text-[12px] py-4 px-6 hover:brightness-110 transition-all uppercase tracking-[0.15em] text-center font-bold flex items-center justify-center gap-2"
                style={{ borderRadius: 0 }}
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                Nâng Cấp Premium
              </Link>
            ) : (
              // Guest → đăng nhập / đăng ký
              <>
                <Link
                  href="/login"
                  className="flex-1 bg-[#C8A96E] text-[#0A0A0A] font-label-caps text-[12px] py-4 px-6 hover:brightness-110 transition-all uppercase tracking-[0.15em] text-center font-bold"
                  style={{ borderRadius: 0 }}
                >
                  Đăng Nhập
                </Link>
                <Link
                  href="/register"
                  className="flex-1 bg-transparent border border-[#222222] text-[#E8E6E1] font-label-caps text-[12px] py-4 px-6 hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all uppercase tracking-[0.15em] text-center"
                  style={{ borderRadius: 0 }}
                >
                  Đăng Ký
                </Link>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[#222222] my-8 relative flex justify-center items-center">
            <div className="absolute w-2 h-2 bg-[#C8A96E] transform rotate-45" />
          </div>

          {/* ── Form Email Capture ── */}
          {!emailSubmitted ? (
            <div className="w-full max-w-sm">
              <p className="font-body-md text-[14px] text-[#d0c5b5] mb-4">
                Hoặc nhận tài liệu + nghe bản Full qua email:
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3 w-full"
                onSubmit={handleEmailSubmit}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent border-b border-[#222222] text-[#E8E6E1] py-3 px-2 focus:outline-none focus:border-[#C8A96E] focus:ring-0 placeholder-[#d0c5b5]/50 font-body-md"
                  placeholder="Email của bạn"
                  style={{ borderRadius: 0 }}
                />
                <button
                  type="submit"
                  className="bg-[#C8A96E] text-[#0A0A0A] font-label-caps text-[12px] px-6 py-3 hover:opacity-90 transition-opacity uppercase tracking-widest whitespace-nowrap font-bold"
                  style={{ borderRadius: 0 }}
                >
                  Truy Cập
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-fade-in">
              <span
                className="material-symbols-outlined text-[#C8A96E] text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mark_email_read
              </span>
              <p className="font-headline-md text-[18px] text-[#C8A96E]">
                Kiểm tra hộp thư của bạn.
              </p>
            </div>
          )}

          {/* Badge số lượng thành viên */}
          <div className="flex items-center justify-center gap-2 font-label-caps text-[12px] text-[#d0c5b5] mt-6">
            <div className="w-2 h-2 rounded-full bg-[#C8A96E] animate-pulse" />
            1,420 thành viên đang tham gia
          </div>
        </div>
      </main>
    </div>
  )
}
