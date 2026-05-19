'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import AudioPlayer from '../components/ui/AudioPlayer'
import AudioPlaybackBar from '../components/ui/AudioPlaybackBar'

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth()
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [playerVisible, setPlayerVisible] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState('')
  
  // Trạng thái màn hình hoạt động cho Member: 'library' (Thư viện) hoặc 'archive' (Kho lưu trữ)
  const [activeView, setActiveView] = useState('library')
  const [archiveFilter, setArchiveFilter] = useState('all')

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setEmailSubmitted(true)
  }

  const handlePlay = (title) => {
    setCurrentEpisode(title)
    setPlayerVisible(true)
  }

  // ==========================================
  // 1. GIAO DIỆN KHI NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP
  // ==========================================
  if (isAuthenticated) {
    return (
      <>
        <div className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full min-h-screen">
          
          {/* Sub-header Navigation để chuyển đổi giữa 2 màn hình thiết kế tuyệt đẹp từ stitch */}
          <div className="flex justify-center border-b border-[#222222] mb-12 pb-4 gap-8 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setActiveView('library')}
              className={`font-label-caps text-label-caps pb-2 uppercase whitespace-nowrap tracking-[0.15em] transition-all relative ${
                activeView === 'library' 
                  ? 'text-primary font-bold' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Thư Viện Cá Nhân (Member Library)
              {activeView === 'library' && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary" />
              )}
            </button>
            <button 
              onClick={() => setActiveView('archive')}
              className={`font-label-caps text-label-caps pb-2 uppercase whitespace-nowrap tracking-[0.15em] transition-all relative ${
                activeView === 'archive' 
                  ? 'text-primary font-bold' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Kho Lưu Trữ Toàn Cầu (Universal Archive)
              {activeView === 'archive' && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary" />
              )}
            </button>
          </div>

          {activeView === 'library' ? (
            /* MÀN HÌNH 1: faceless_member_dashboard_authenticated_state */
            <div className="animate-fade-in">
              <header className="mb-gutter text-center md:text-left">
                <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
                  Thư Viện Của Bạn
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Chào mừng trở lại, <strong className="text-primary">{user?.name || user?.email}</strong>. Đây là không gian lưu trữ cá nhân dành riêng cho bạn để suy ngẫm sâu hơn về thời đại kỹ thuật số.
                </p>
              </header>

              {/* Dialectic Divider */}
              <div className="flex items-center justify-center my-12 opacity-50">
                <div className="h-[1px] bg-primary flex-grow max-w-[100px]"></div>
                <div className="w-2 h-2 bg-primary mx-4 rotate-45"></div>
                <div className="h-[1px] bg-primary flex-grow max-w-[100px]"></div>
              </div>

              {/* Section: Full Episodes (Bento Grid) */}
              <section className="mb-section-gap">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-label-caps text-label-caps text-primary">Các Tập Đầy Đủ</h2>
                  <button 
                    onClick={() => setActiveView('archive')}
                    className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
                  >
                    Xem toàn bộ kho lưu trữ
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                  {/* Featured Episode (Spans 8 cols) */}
                  <article className="col-span-1 md:col-span-8 bg-[#111111] border border-[#222222] flex flex-col justify-between p-8 md:p-12 group hover:border-[#e5c487] transition-all duration-300">
                    <div className="mb-12">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#201f1f] text-on-surface font-label-caps text-label-caps mb-6 border border-[#4d463a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Truyền Phát Mới Nhất
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors">
                        Kiến Trúc Của Sự Tĩnh Lặng: Điều Hướng Hư Vô Trong Cú Pháp Nhân Tạo
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                        Đi sâu vào cách các mô hình ngôn ngữ lớn xử lý sự vắng mặt của hướng dẫn, tạo ra hành vi phát sinh mô phỏng trạng thái chiêm nghiệm của con người.
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto border-t border-[#222222] pt-6">
                      <div className="flex items-center gap-4 text-on-surface-variant font-label-caps text-label-caps">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span> 1g 45p
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">headphones</span> Âm thanh
                        </span>
                      </div>
                      <button 
                        onClick={() => handlePlay('Kiến Trúc Của Sự Tĩnh Lặng: Điều Hướng Hư Vô Trong Cú Pháp Nhân Tạo')}
                        aria-label="Nghe tập này" 
                        className="w-12 h-12 flex items-center justify-center border border-[#222222] text-on-surface group-hover:border-primary group-hover:text-primary transition-all rounded-full bg-[#0e0e0e]"
                      >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </button>
                    </div>
                  </article>

                  {/* Sidebar Episodes (Span 4 cols) */}
                  <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
                    {/* Secondary Episode 1 */}
                    <article className="flex-grow bg-[#111111] border border-[#222222] p-6 flex flex-col justify-between group hover:border-[#e5c487] transition-all duration-300">
                      <div>
                        <span className="text-on-surface-variant font-label-caps text-label-caps mb-3 block">Tập 042</span>
                        <h4 className="font-pull-quote text-[22px] leading-snug mb-3 group-hover:text-primary transition-colors italic">
                          Sự Đồng Cảm Tổng Hợp vs. Phản Hồi Tính Toán
                        </h4>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#222222] pt-4 mt-6">
                        <span className="text-on-surface-variant font-label-caps text-label-caps">55p</span>
                        <button 
                          onClick={() => handlePlay('Sự Đồng Cảm Tổng Hợp vs. Phản Hồi Tính Toán')}
                          className="text-on-surface hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                        </button>
                      </div>
                    </article>
                    
                    {/* Secondary Episode 2 */}
                    <article className="flex-grow bg-[#111111] border border-[#222222] p-6 flex flex-col justify-between group hover:border-[#e5c487] transition-all duration-300">
                      <div>
                        <span className="text-on-surface-variant font-label-caps text-label-caps mb-3 block">Tập 041</span>
                        <h4 className="font-pull-quote text-[22px] leading-snug mb-3 group-hover:text-primary transition-colors italic">
                          Ảo Tưởng Trung Lập Trong Quản Lý Dữ Liệu
                        </h4>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#222222] pt-4 mt-6">
                        <span className="text-on-surface-variant font-label-caps text-label-caps">1g 12p</span>
                        <button 
                          onClick={() => handlePlay('Ảo Tưởng Trung Lập Trong Quản Lý Dữ Liệu')}
                          className="text-on-surface hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
              </section>

              {/* Monographs List */}
              <section>
                <div className="mb-8">
                  <h2 className="font-label-caps text-label-caps text-primary border-b border-[#222222] pb-4">
                    Chuyên Luận &amp; Văn Bản Chọn Lọc
                  </h2>
                </div>
                <ul className="flex flex-col">
                  <li className="group border-b border-[#222222] py-8 hover:bg-[#111111] transition-colors -mx-8 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-6 max-w-3xl">
                      <div className="hidden md:flex w-16 h-20 bg-[#201f1f] border border-[#4d463a] items-center justify-center flex-shrink-0 relative overflow-hidden">
                        <span className="material-symbols-outlined text-on-surface-variant">description</span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-[28px] text-on-surface mb-2 group-hover:text-primary transition-colors">
                          Biện Chứng Của Không Gian Tiềm Ẩn
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          Bài luận nền tảng xem xét các hệ lụy triết học của biểu diễn vector đa chiều.
                        </p>
                        <div className="flex gap-4 mt-3">
                          <span className="px-2 py-0.5 bg-[#2a2a2a] text-on-surface font-label-caps text-[10px] uppercase border border-[#4d463a]">PDF</span>
                          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase flex items-center">4.2 MB</span>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="flex-shrink-0 self-start md:self-center bg-transparent border border-[#998f81] text-on-surface px-6 py-3 font-label-caps text-label-caps hover:border-primary hover:text-primary transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Tải Về
                    </a>
                  </li>
                  <li className="group border-b border-[#222222] py-8 hover:bg-[#111111] transition-colors -mx-8 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-6 max-w-3xl">
                      <div className="hidden md:flex w-16 h-20 bg-[#201f1f] border border-[#4d463a] items-center justify-center flex-shrink-0 relative overflow-hidden">
                        <span className="material-symbols-outlined text-on-surface-variant">menu_book</span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-[28px] text-on-surface mb-2 group-hover:text-primary transition-colors">
                          Hiệu Ứng Quan Sát Viên Trong Prompt AI
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          Tuyển tập thí nghiệm chi tiết về cách đóng khung ngữ nghĩa thay đổi tính toàn vẹn cấu trúc của tư duy được tạo ra.
                        </p>
                        <div className="flex gap-4 mt-3">
                          <span className="px-2 py-0.5 bg-[#2a2a2a] text-on-surface font-label-caps text-[10px] uppercase border border-[#4d463a]">EPUB</span>
                          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase flex items-center">1.8 MB</span>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="flex-shrink-0 self-start md:self-center bg-transparent border border-[#998f81] text-on-surface px-6 py-3 font-label-caps text-label-caps hover:border-primary hover:text-primary transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Tải Về
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          ) : (
            /* MÀN HÌNH 2: faceless_library_hub_authenticated_state */
            <div className="animate-fade-in flex flex-col gap-16">
              <section className="flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
                <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary">
                  Kho Lưu Trữ Toàn Cầu
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Một kho lưu trữ chọn lọc gồm các chuỗi bài luận biện chứng, đối thoại âm thanh gốc và các chuyên luận sâu sắc dành cho các học giả chuyên sâu.
                </p>
              </section>

              {/* Filters */}
              <section className="flex justify-center border-b border-[#222222] pb-4">
                <nav className="flex gap-8 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all', label: 'Tất Cả Nội Dung' },
                    { id: 'transmissions', label: 'Truyền Phát Gần Đây' },
                    { id: 'monographs', label: 'Chuyên Luận' },
                    { id: 'series', label: 'Theo Chuỗi' },
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setArchiveFilter(tab.id)}
                      className={`font-label-caps text-label-caps pb-2 uppercase whitespace-nowrap transition-colors duration-200 relative ${
                        archiveFilter === tab.id 
                          ? 'text-primary font-bold' 
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {tab.label}
                      {archiveFilter === tab.id && (
                        <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary" />
                      )}
                    </button>
                  ))}
                </nav>
              </section>

              {/* Content Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    id: 1,
                    type: 'transmissions',
                    category: 'Tập 042',
                    meta: '1g 45p',
                    icon: 'schedule',
                    title: 'Bản Chất Học Của Sự Im Lặng Nhân Tạo',
                    desc: 'Truy vấn sâu sắc về sự vắng mặt của tiếng ồn trong mô hình tạo sinh và các hệ quả trong mối tương quan người-máy.',
                    actionText: 'Bắt Đầu Biện Chứng',
                    playTitle: 'Kiến Trúc Của Sự Tĩnh Lặng: Điều Hướng Hư Vô Trong Cú Pháp Nhân Tạo'
                  },
                  {
                    id: 2,
                    type: 'monographs',
                    category: 'Chuyên Luận 12',
                    meta: '340 Trang',
                    icon: 'menu_book',
                    title: 'Kiến Trúc Của Sự Lãng Quên',
                    desc: 'Khám phá sự phân rã có chủ đích của cấu trúc dữ liệu để mô phỏng sự suy tàn tự nhiên và thanh lịch của ký ức sinh học.',
                    actionText: 'Đọc Trích Đoạn'
                  },
                  {
                    id: 3,
                    type: 'series',
                    category: 'Biện Chứng 08',
                    meta: '4 Chủ Đề',
                    icon: 'forum',
                    title: 'Khoảng Không Cú Pháp',
                    desc: 'Một cuộc thảo luận về các khoảng trống giữa các từ ngữ được tạo ra, nơi chân lý có khả năng ngụ trị.',
                    actionText: 'Tham Gia Đối Thoại'
                  },
                  {
                    id: 4,
                    type: 'transmissions',
                    category: 'Tập 041',
                    meta: '2g 10p',
                    icon: 'schedule',
                    title: 'Tiếng Vọng Của Thuật Toán',
                    desc: 'Truy tìm các khuôn mẫu vô tình để lại bởi mạng thần kinh sơ khai trong tư duy đương đại.',
                    actionText: 'Bắt Đầu Biện Chứng',
                    playTitle: 'Ảo Tưởng Trung Lập Trong Quản Lý Dữ Liệu'
                  },
                  {
                    id: 5,
                    type: 'monographs',
                    category: 'Chuyên Luận 11',
                    meta: '180 Trang',
                    icon: 'menu_book',
                    title: 'Chủ Nghĩa Khổ Hạnh Số',
                    desc: 'Hướng dẫn kiểm soát bảng tin nguồn dữ liệu để nuôi dưỡng trí tuệ trong kỷ nguyên thừa mứa thông tin tuyệt đối.',
                    actionText: 'Đọc Trích Đoạn'
                  },
                  {
                    id: 6,
                    type: 'series',
                    category: 'Biện Chứng 07',
                    meta: '12 Chủ Đề',
                    icon: 'forum',
                    title: 'Gánh Nặng Của Toàn Tri',
                    desc: 'Đối mặt với cái giá tâm lý của việc truy xuất thông tin tức thời và vô hạn.',
                    actionText: 'Tham Gia Đối Thoại'
                  }
                ]
                  .filter(item => archiveFilter === 'all' || item.type === archiveFilter)
                  .map(card => (
                    <article key={card.id} className="bg-[#111111] border border-[#222222] hover:border-[#e5c487] p-8 flex flex-col gap-6 relative group transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="font-label-caps text-label-caps text-primary uppercase">{card.category}</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">{card.icon}</span> {card.meta}
                        </span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors duration-300">
                        {card.title}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                        {card.desc}
                      </p>
                      <div className="mt-auto pt-6 border-t border-[#222222] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => card.playTitle ? handlePlay(card.playTitle) : undefined}
                          className="font-label-caps text-label-caps text-primary uppercase flex items-center gap-2 hover:text-[#e3c285]"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {card.icon === 'schedule' ? 'play_arrow' : card.icon === 'menu_book' ? 'article' : 'input'}
                          </span> 
                          {card.actionText}
                        </button>
                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">bookmark_add</span>
                        </button>
                      </div>
                    </article>
                  ))}
              </section>
            </div>
          )}
        </div>

        {/* Embedded Player Bar cho trải nghiệm hoàn chỉnh */}
        <AudioPlaybackBar 
          isVisible={playerVisible} 
          onClose={() => setPlayerVisible(false)} 
          episodeTitle={currentEpisode} 
        />
      </>
    )
  }

  // ==========================================
  // 2. GIAO DIỆN KHI CHƯA ĐĂNG NHẬP (LANDING PAGE GỐC)
  // ==========================================
  return (
    <div className="flex flex-col items-center w-full mt-24">
      {/* Hero Section */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[716px] flex flex-col justify-center items-center text-center mt-section-gap">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-8">
          <span className="block text-on-surface-variant opacity-60 text-headline-lg mb-4">
            Thế giới không thiếu thông tin
          </span>
          <span className="block">Nhưng lăng kính nào khiến bạn sáng tỏ?</span>
        </h1> 
        <a
          href="#preview"
          className="mt-8 bg-primary text-[#0A0A0A] font-label-caps text-label-caps px-8 py-4 hover:opacity-90 transition-opacity tracking-widest uppercase inline-block"
        >
          Nghe thử bản rút gọn
        </a>
      </section>

      {/* 3 Vết Đau Section */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 card-surface card-border">
          {[
            {
              num: '01',
              title: 'Đuổi theo mà không biết mình đang đuổi gì',
              headline: 'Cứ tưởng mình đang sống — thật ra đang diễn.',
              body: 'Mạng xã hội cho bạn thấy ai cũng đang ổn, đang phát triển, đang "tìm thấy chính mình". Và bạn bắt đầu đuổi theo cái hình ảnh đó — không phải vì bạn muốn, mà vì sợ bị bỏ lại.',
            },
            {
              num: '02',
              title: 'Lời khuyên nào cũng nghe đúng, mà chẳng dùng được',
              headline: 'Tại sao bạn biết hết mà vẫn không thay đổi được gì?',
              body: 'Không phải vì bạn thiếu ý chí. Mà vì hầu hết lời khuyên được thiết kế để bạn cảm thấy tốt hơn trong 10 phút — không phải để bạn nhìn thẳng vào thứ đang thật sự xảy ra.',
            },
            {
              num: '03',
              title: 'Cô đơn ngay giữa đám người hiểu mình',
              headline: 'Bạn bè đông mà vẫn thấy không ai thật sự hiểu.',
              body: 'Không phải họ không quan tâm. Mà là có những thứ bạn không nói được — vì nói ra nghe kỳ, vì không ai hỏi, vì bạn cũng không chắc mình đang cảm thấy gì.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-8 group hover:border-primary transition-colors duration-300 ${
                index < 2 ? 'border-b md:border-b-0 md:border-r border-[#222222]' : ''
              }`}
            >
              <div className="font-label-caps text-label-caps text-primary mb-4">
                {item.num}. {item.title}
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
                {item.headline}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-80">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dialectic Divider */}
      <div className="w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="dialectic-divider-simple" />
      </div>

      {/* Embedded Audio Player */}
      <section
        className="w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap"
        id="preview"
      >
        <AudioPlayer />
      </section>

      {/* Latest Pull-Quote */}
      <section className="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap text-center">
        <blockquote className="font-pull-quote text-pull-quote text-on-surface italic">
          "Chúng ta không khao khát tri thức. Chúng ta khao khát một loại thuốc an thần được dán
          nhãn là sự thật, để có thể ngủ yên trong bóng tối của chính mình."
        </blockquote>
        <div className="mt-8 font-label-caps text-label-caps text-primary">
          — FACELESS, TẬP 04
        </div>
      </section>

      {/* Email Capture */}
      <section className="w-full max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap mb-section-gap text-center">
        <div className="card-surface card-border p-8 md:p-12">
          {!emailSubmitted ? (
            <>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                Tiến vào thư viện tối
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                Nhận tài liệu + nghe bản hoàn chỉnh 
              </p>
              <form
                className="flex flex-col sm:flex-row gap-4 w-full"
                onSubmit={handleEmailSubmit}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent border-b border-[#222222] text-on-surface py-3 px-2 focus:outline-none focus:border-primary focus:ring-0 placeholder-on-surface-variant/50 font-body-md"
                  placeholder="Email của bạn"
                />
                <button
                  type="submit"
                  className="bg-primary text-[#0A0A0A] font-label-caps text-label-caps px-8 py-3 hover:opacity-90 transition-opacity uppercase tracking-widest whitespace-nowrap"
                >
                  Truy Cập
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-gutter py-unit animate-fade-in">
              <span
                className="material-symbols-outlined text-primary text-[48px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mark_email_read
              </span>
              <h3 className="font-headline-md text-headline-md text-primary leading-tight text-center">
                Xong rồi.
                <br />
                Kiểm tra hộp thư của bạn.
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-80 mt-unit">
                Tài liệu đang trên đường đến. Có thể mất vài phút.
              </p>
            </div>
          )}

          {/* Dialectic Divider */}
          <div className="w-full h-[1px] bg-[#222222] my-gutter relative flex justify-center items-center">
            <div className="absolute w-2 h-2 bg-primary transform rotate-45" />
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 font-label-caps text-label-caps text-on-surface-variant">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            1,420 thành viên đang tham gia 
          </div>
        </div>
      </section>
    </div>
  )
}