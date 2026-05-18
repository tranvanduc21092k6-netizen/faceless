import { useState } from 'react'

export default function MembershipModal({ isOpen, onClose, variant = 'default' }) {
  const [email, setEmail] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    onClose()
  }

  if (variant === 'archive') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-[#0A0A0A] border border-outline-variant max-w-lg w-full p-12 relative shadow-2xl mx-margin-mobile animate-fade-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          {/* Modal Content */}
          <div className="text-center">
            <div className="font-display-lg text-headline-md text-on-surface uppercase mb-4 tracking-widest">
              Truy Cập Vòng Tròn Nội Bộ
            </div>
            <div className="w-12 h-px bg-primary-container mx-auto mb-8" />
            <p className="font-body-lg text-on-surface/80 mb-10 leading-relaxed">
              Chiều sâu của biện chứng được dành cho những ai tìm cách vượt qua bề mặt.
              Tham gia kho lưu trữ để truy cập toàn bộ sự tổng hợp tư duy.
            </p>
            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Địa chỉ email của bạn"
                  className="w-full bg-transparent border-b border-outline-variant py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container transition-colors font-body-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-container text-[#0A0A0A] font-label-caps text-label-caps uppercase py-4 hover:brightness-110 transition-all tracking-[0.2em] font-bold"
              >
                Tham Gia Biện Chứng
              </button>
              <p className="text-[10px] font-label-caps uppercase text-on-surface-variant tracking-widest mt-4">
                Bằng việc tham gia, bạn đồng ý với điều khoản truy vấn.
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Default variant - split pane
  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-center p-margin-mobile">
      <div className="bg-[#111111] border border-[#222222] w-full max-w-2xl relative shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors z-10"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Decorative Visual Pane */}
        <div className="hidden md:block w-1/3 bg-surface relative border-r border-[#222222]">
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-[#0A0A0A] opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="w-px h-1/2 bg-primary-container opacity-20" />
            <div className="w-8 h-8 border border-primary-container absolute opacity-30 rotate-45" />
          </div>
        </div>

        {/* Content Pane */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary-container text-3xl mb-4 block">
              lock
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
              Phần còn lại dành cho trí tuệ sáng suốt.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Bạn đã đến rìa của không gian công cộng. Bên ngoài điểm này, diễn ngôn của chúng tôi
              đi sâu hơn vào bóng tối của tư duy thông thường. Tham gia biện chứng để
              truy cập toàn bộ kho lưu trữ, bài luận độc quyền và hội nghị riêng tư.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="sr-only" htmlFor="membership-email">Email address</label>
              <input
                id="membership-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
                className="w-full bg-transparent border-0 border-b border-[#222222] text-on-surface font-body-md text-body-md py-3 px-0 focus:ring-0 focus:border-primary-container focus:outline-none transition-colors placeholder:text-on-surface-variant/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-container text-[#0A0A0A] font-label-caps text-label-caps py-4 px-6 hover:bg-primary transition-colors flex items-center justify-center group"
            >
              Tham Gia Biện Chứng
              <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-[#222222] flex items-center justify-between">
            <span className="font-body-md text-body-md text-on-surface-variant text-sm">
              Đã là thành viên?
            </span>
            <a
              href="#"
              className="font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors border-b border-transparent hover:border-primary"
            >
              Đăng Nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
