import { useState } from 'react'
import { Link } from 'react-router-dom'
import AudioPlayer from '../components/ui/AudioPlayer'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setEmailSubmitted(true)
  }

  return (
    <div className="flex flex-col items-center w-full mt-24">
      {/* Hero Section */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[716px] flex flex-col justify-center items-center text-center mt-section-gap">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-8">
          <span className="block text-on-surface-variant opacity-60 text-headline-lg mb-4">
            Đây không phải podcast self-help.
          </span>
          <span className="block">Đây là nơi tư duy bị tra tấn.</span>
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
              title: 'Ảo Tưởng Sự Thật',
              headline: 'Bản chất của thông tin là sự dối trá được sắp xếp.',
              body: 'Phân tích cấu trúc của truyền thông đại chúng và cách nó định hình một thực tại giả lập, nơi sự thật chỉ là một sản phẩm phái sinh.',
            },
            {
              num: '02',
              title: 'Cái Chết Của Tính Chân Thực',
              headline: 'Khi AI viết kịch bản cho linh hồn con người.',
              body: 'Sự xâm thực của thuật toán vào không gian nhận thức cá nhân. Làm thế nào để giữ lại bản ngã trong kỷ nguyên của deepfake và tư duy vay mượn.',
            },
            {
              num: '03',
              title: 'Nền Dân Chủ Của Sự Ngu Dốt',
              headline: 'Đám đông không tìm kiếm chân lý, họ tìm kiếm sự đồng thuận.',
              body: 'Cơ chế tâm lý học đám đông trên không gian mạng và cách nó triệt tiêu các luồng tư duy độc lập thông qua áp lực bầy đàn.',
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
          — FACELESS DIALECTICS, TẬP 04
        </div>
      </section>

      {/* Email Capture */}
      <section className="w-full max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap mb-section-gap text-center">
        <div className="card-surface card-border p-8 md:p-12">
          {!emailSubmitted ? (
            <>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                Tiến vào thư viện tối.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                Nhận tài liệu + nghe bản Full.
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
                Chào mừng bạn đến với sự thật.
                <br />
                Kiểm tra hộp thư để bắt đầu.
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-80 mt-unit">
                A confirmation protocol has been dispatched.
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
            Đang có 1,420 thành viên tư duy cùng nhau
          </div>
        </div>
      </section>
    </div>
  )
}
