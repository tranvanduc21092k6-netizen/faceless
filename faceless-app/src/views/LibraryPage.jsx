'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import EpisodeCard from '../components/ui/EpisodeCard'
import ResourceItem from '../components/ui/ResourceItem'
import AudioPlaybackBar from '../components/ui/AudioPlaybackBar'
import DialecticDivider from '../components/ui/DialecticDivider'
import { pb } from '../lib/pocketbase'

export default function LibraryPage() {
  const [playerVisible, setPlayerVisible] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState('')
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const records = await pb.collection('episodes').getFullList({
          sort: '-created',
        })
        setEpisodes(records)
      } catch (err) {
        console.error('Lỗi khi tải episodes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [])

  const handlePlay = (title) => {
    setCurrentEpisode(title)
    setPlayerVisible(true)
  }

  // Phân tách bản mới nhất và các bản khác
  const featuredEpisode = episodes.find(e => e.is_featured) || episodes[0]
  const otherEpisodes = episodes.filter(e => e.id !== featuredEpisode?.id)

  return (
    <>
      <div className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <header className="mb-gutter text-center md:text-left">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 text-on-surface">
            Thư Viện
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Một không gian dành cho những bài viết dài hơn, cuộc trò chuyện sâu hơn 
            và các góc nhìn không thể được gói chỉ trong thoáng giây.
          </p>
        </header>

        <DialecticDivider variant="line" />

        <section className="mb-section-gap">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-label-caps text-label-caps text-primary">Tập Đầy Đủ</h2>
            <Link href="/archive" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
              Xem Toàn Bộ Kho Lưu Trữ
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="py-20 text-center opacity-50 font-label-caps text-label-caps uppercase tracking-widest">
              Đang mở khóa kho thư viện...
            </div>
          ) : episodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {featuredEpisode && (
                <EpisodeCard 
                  isFeatured 
                  title={featuredEpisode.title} 
                  description={featuredEpisode.description} 
                  duration={featuredEpisode.duration} 
                  onPlay={() => handlePlay(featuredEpisode.title)} 
                />
              )}
              <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
                {otherEpisodes.slice(0, 2).map((ep) => (
                  <EpisodeCard 
                    key={ep.id}
                    episode={ep.episode_number} 
                    title={ep.title} 
                    duration={ep.duration} 
                    onPlay={() => handlePlay(ep.title)} 
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center italic text-on-surface-variant font-pull-quote">
              Chưa có bản truyền phát nào được lưu trữ trong thư viện.
            </div>
          )}
        </section>

        <section>
          <div className="mb-8">
            <h2 className="font-label-caps text-label-caps text-primary border-b border-surface-container pb-4">Chuyên Luận &amp; Văn Bản Chọn Lọc</h2>
          </div>
          <ul className="flex flex-col">
            <ResourceItem title="Biện Chứng Của Không Gian Tiềm Ẩn" description="Bài luận nền tảng xem xét các hệ lụy triết học của biểu diễn vector đa chiều." format="PDF" size="4.2 MB" icon="description" />
            <ResourceItem title="Hiệu Ứng Quan Sát Viên Trong Prompt AI" description="Tuyển tập thí nghiệm chi tiết về cách đóng khung ngữ nghĩa thay đổi tính toàn vẹn cấu trúc của tư duy được tạo ra." format="EPUB" size="1.8 MB" icon="menu_book" />
          </ul>
        </section>
      </div>

      <AudioPlaybackBar isVisible={playerVisible} onClose={() => setPlayerVisible(false)} episodeTitle={currentEpisode} />
    </>
  )
}

