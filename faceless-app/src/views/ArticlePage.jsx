'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Tag from '../components/ui/Tag'
import AudioPlayer from '../components/ui/AudioPlayer'
import AudioPlaybackBar from '../components/ui/AudioPlaybackBar'
import { pb } from '../lib/pocketbase'
import { useParams } from 'next/navigation'

/**
 * ArticlePage — Trang hiển thị chi tiết một Episode từ PocketBase
 *
 * Luồng dữ liệu:
 *  1. Lấy record từ pb.collection('episodes').getOne(id)
 *  2. Trích URL file .md → fetch() → lấy text → render bằng ReactMarkdown
 *  3. Trích URL audio_short + audio_full → truyền vào AudioPlayer / AudioPlaybackBar
 *
 * URL pattern: /article/[slug] — slug có thể là ID hoặc title slug
 */
export default function ArticlePage() {
  const { slug } = useParams()

  // --- State dữ liệu bài viết ---
  const [record, setRecord] = useState(null)
  const [markdownContent, setMarkdownContent] = useState('')

  /**
   * audioLinks lưu các URL âm thanh vật lý từ PocketBase Storage
   * Cách lấy URL: pb.files.getUrl(record, record.audio_short)
   *   → trả về: http://127.0.0.1:8090/api/files/episodes/<record.id>/<filename.mp3>
   * Sau đó truyền URL này vào <AudioPlayer src={audioLinks.short} />
   */
  const [audioLinks, setAudioLinks] = useState({ short: '', full: '' })

  // --- State UI ---
  const [loading, setLoading] = useState(true)
  const [readProgress, setReadProgress] = useState(0)
  const [showToast, setShowToast] = useState(false)
  // Hiển thị AudioPlaybackBar (bản đầy đủ) khi người dùng click "Nghe Full"
  const [showFullPlayer, setShowFullPlayer] = useState(false)

  // ============================================================
  // LOGIC 1: Fetch dữ liệu bài viết từ PocketBase
  // ============================================================
  useEffect(() => {
    async function loadArticle() {
      if (!slug) return
      setLoading(true)

      try {
        // ---- BƯỚC 1: Lấy record Episode từ PocketBase ----
        // Thử dùng slug như là ID trước (dạng: /article/abc123xyz)
        // Nếu không tìm thấy, fallback tìm theo title (dạng: /article/kien-truc-su-tinh-lang)
        let res
        try {
          res = await pb.collection('episodes').getOne(slug)
        } catch {
          // Slug không phải ID → tìm theo title (chuyển dấu gạch nối thành khoảng trắng)
          res = await pb.collection('episodes').getFirstListItem(
            `title~"${slug.replace(/-/g, ' ')}"`
          )
        }

        setRecord(res)

        // ---- BƯỚC 2: Xử lý file Markdown (.md từ Obsidian) ----
        // pb.files.getUrl(record, filename) → trả về URL đầy đủ tới file trên Storage
        // Sau đó fetch() tải nội dung TEXT của file .md đó về
        if (res.md_file) {
          const mdUrl = pb.files.getUrl(res, res.md_file)
          const textRes = await fetch(mdUrl)
          if (textRes.ok) {
            const text = await textRes.text()
            setMarkdownContent(text)
          }
        }

        // ---- BƯỚC 3: Trích URL Audio vật lý ----
        // pb.files.getUrl(record, filename) → URL trỏ thẳng đến file .mp3 trên PocketBase Storage
        // Gán vào state audioLinks → truyền vào AudioPlayer và AudioPlaybackBar qua props: src=...
        setAudioLinks({
          // audio_short: bản preview ngắn, public cho tất cả
          short: res.audio_short ? pb.files.getUrl(res, res.audio_short) : '',
          // audio_full: bản đầy đủ, member only (bạn có thể kiểm tra pb.authStore.isValid trước khi truyền)
          full: res.audio_full ? pb.files.getUrl(res, res.audio_full) : '',
        })

      } catch (err) {
        console.error('Lỗi tải bài viết:', err)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  // Theo dõi scroll để hiển thị thanh tiến trình đọc
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Loading state
  if (loading) return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="font-label-caps text-on-surface-variant text-[11px] uppercase tracking-widest">Đang giải mã hồ sơ...</p>
    </div>
  )

  // Not found state
  if (!record) return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center gap-4 text-on-surface">
      <h2 className="font-headline-md">Hồ sơ không tồn tại.</h2>
      <Link href="/" className="text-primary font-label-caps uppercase border-b border-primary">Quay lại trang chủ</Link>
    </div>
  )

  return (
    <>
      {/* Thanh tiến trình đọc ở đầu trang */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-150" style={{ width: `${readProgress}%` }} />

      {/* =============================================================
          DESKTOP VIEW
          ============================================================= */}
      <div className="hidden md:block">
        <div className="pt-[140px] pb-section-gap relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex justify-center items-start gap-12">

          {/* Floating Sidebar */}
          <aside className="flex flex-col sticky top-[140px] gap-6 text-on-surface-variant w-12 items-center">
            <button onClick={handleCopyLink} aria-label="Sao chép liên kết" className="w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-primary hover:text-primary transition-all duration-300 relative">
              <span className="material-symbols-outlined">link</span>
              {showToast && (
                <div className="absolute left-[120%] whitespace-nowrap bg-[#111111] border border-primary px-3 py-1.5 flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-caps text-label-caps text-primary">Đã sao chép</span>
                </div>
              )}
            </button>
            <button aria-label="Chia sẻ" className="w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-primary hover:text-primary transition-all duration-300">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button aria-label="Đánh dấu" className="w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-primary hover:text-primary transition-all duration-300">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
            <div className="w-px h-24 bg-outline-variant mt-4" />
          </aside>

          {/* Nội dung bài viết */}
          <article className="w-full max-w-[680px]">
            <header className="mb-16">
              <div className="flex flex-wrap gap-2 mb-8">
                {record.tags?.map(tag => <Tag key={tag}>{tag}</Tag>) || <Tag>Biện Chứng</Tag>}
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-6 tracking-tight">
                {record.title}
              </h1>
              <div className="flex items-center gap-4 font-body-md text-body-md text-on-surface-variant">
                <time dateTime={record.created}>{new Date(record.created).toLocaleDateString('vi-VN')}</time>
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span>12 Phút Đọc</span>
              </div>
            </header>

            {/* ============================================================
                LOGIC 2A: Audio Player — Bản Rút Gọn (Preview)
                Kết nối: audioLinks.short = pb.files.getUrl(record, record.audio_short)
                → truyền vào prop src của AudioPlayer
                ============================================================ */}
            {audioLinks.short && (
              <div className="mb-12">
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">
                  Nghe Bản Rút Gọn
                </p>
                {/*
                  Truyền src (URL vật lý từ PocketBase) vào AudioPlayer.
                  Component sẽ tạo thẻ <audio src={src}> và điều khiển nó.
                */}
                <AudioPlayer
                  src={audioLinks.short}
                  title={record.title}
                  label="Bản Preview"
                />
              </div>
            )}

            {/* ============================================================
                LOGIC 2B: Nút mở AudioPlaybackBar — Bản Đầy Đủ (Member)
                Khi click: setShowFullPlayer(true) → AudioPlaybackBar nhận
                src={audioLinks.full} và tự phát
                ============================================================ */}
            {audioLinks.full && (
              <div className="mb-12 p-4 border border-[#4d463a] flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-[10px] text-primary uppercase tracking-widest mb-1">
                    Bản Đầy Đủ — Member Only
                  </p>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    Nghe toàn bộ phiên biện chứng không giới hạn thời gian.
                  </p>
                </div>
                <button
                  onClick={() => setShowFullPlayer(true)}
                  className="flex items-center gap-2 bg-primary text-[#131313] px-4 py-2 font-label-caps text-[11px] uppercase hover:bg-[#ffdea3] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  Nghe Full
                </button>
              </div>
            )}

            {/* ============================================================
                LOGIC 3: Render nội dung Markdown
                markdownContent = text đã fetch từ pb.files.getUrl(record, record.md_file)
                → dùng ReactMarkdown để dịch thành HTML
                ============================================================ */}
            <div className="prose prose-invert max-w-none article-markdown">
              {markdownContent ? (
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              ) : (
                <p className="text-on-surface-variant italic font-pull-quote">
                  Bài viết này chưa có nội dung Markdown.
                </p>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* =============================================================
          MOBILE VIEW
          ============================================================= */}
      <div className="md:hidden">
        <div className="fixed top-[52px] left-0 w-full h-1 bg-surface-container-high z-40">
          <div className="h-full bg-primary" style={{ width: `${readProgress}%` }} />
        </div>

        <main className="pt-[80px] pb-[120px] px-margin-mobile max-w-3xl mx-auto">
          <header className="mb-12 mt-8">
            <div className="flex items-center gap-2 mb-6">
              {record.tags?.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 bg-[#222222] text-on-surface font-label-caps text-label-caps border border-outline-variant uppercase tracking-wider">{tag}</span>
              ))}
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-6 leading-tight">
              {record.title}
            </h1>
            <div className="flex items-center justify-between border-t border-b border-outline-variant py-4 mb-8">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">TÁC GIẢ</p>
                <p className="font-body-md text-body-md text-on-surface">FACELESS DIALECTICS</p>
              </div>
              <div className="text-right">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">NGÀY</p>
                <p className="font-body-md text-body-md text-on-surface">{new Date(record.created).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </header>

          {/* Audio player mobile */}
          {audioLinks.short && (
            <div className="mb-8">
              <AudioPlayer
                src={audioLinks.short}
                title={record.title}
                label="Bản Preview"
              />
            </div>
          )}

          {/* Nội dung Markdown mobile */}
          <article className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed article-markdown mobile">
            {markdownContent ? (
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            ) : (
              <p className="italic">Bài viết này chưa có nội dung Markdown.</p>
            )}
          </article>
        </main>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-[#111111] border-t border-[#222222] p-4 flex justify-around items-center z-50">
          <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">thumb_up</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider">Ủng Hộ</span>
          </button>
          {/* Nút mở player bản full trên mobile */}
          {audioLinks.full && (
            <button
              onClick={() => setShowFullPlayer(true)}
              className="flex flex-col items-center gap-1 text-primary"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
              <span className="font-label-caps text-[10px] uppercase tracking-wider">Nghe Full</span>
            </button>
          )}
          <div className="w-px h-8 bg-[#222222]" />
          <button onClick={handleCopyLink} className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">ios_share</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider">Chia Sẻ</span>
          </button>
        </div>
      </div>

      {/* =============================================================
          LOGIC 4: AudioPlaybackBar — Bản Đầy Đủ (fixed bottom bar)
          Nhận src={audioLinks.full} và episodeTitle={record.title}
          Tự động phát khi isVisible=true
          ============================================================= */}
      <AudioPlaybackBar
        isVisible={showFullPlayer}
        onClose={() => setShowFullPlayer(false)}
        src={audioLinks.full}
        episodeTitle={record.title}
      />
    </>
  )
}
