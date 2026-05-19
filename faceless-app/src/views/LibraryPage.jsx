'use client'

import { useState } from 'react'
import Link from 'next/link'
import EpisodeCard from '../components/ui/EpisodeCard'
import ResourceItem from '../components/ui/ResourceItem'
import AudioPlaybackBar from '../components/ui/AudioPlaybackBar'
import DialecticDivider from '../components/ui/DialecticDivider'

export default function LibraryPage() {
  const [playerVisible, setPlayerVisible] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState('')

  const handlePlay = (title) => {
    setCurrentEpisode(title)
    setPlayerVisible(true)
  }

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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <EpisodeCard isFeatured title="Kiến Trúc Của Sự Tĩnh Lặng: Điều Hướng Hư Vô Trong Cú Pháp Nhân Tạo" description="Đi sâu vào cách các mô hình ngôn ngữ lớn xử lý sự vắng mặt của hướng dẫn, tạo ra hành vi phát sinh mô phỏng trạng thái chiêm nghiệm của con người." duration="1g 45p" onPlay={() => handlePlay('Kiến Trúc Của Sự Tĩnh Lặng')} />
            <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
              <EpisodeCard episode="Tập 042" title="Sự Đồng Cảm Tổng Hợp vs. Phản Hồi Tính Toán" duration="55p" onPlay={() => handlePlay('Sự Đồng Cảm Tổng Hợp vs. Phản Hồi Tính Toán')} />
              <EpisodeCard episode="Tập 041" title="Ảo Tưởng Trung Lập Trong Quản Lý Dữ Liệu" duration="1g 12p" onPlay={() => handlePlay('Ảo Tưởng Trung Lập Trong Quản Lý Dữ Liệu')} />
            </div>
          </div>
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
