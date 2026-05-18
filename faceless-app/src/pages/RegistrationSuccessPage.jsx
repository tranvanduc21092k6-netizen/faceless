import { Link } from 'react-router-dom'

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="text-center pt-12 pb-8">
        <Link to="/" className="font-display-lg text-headline-md text-on-surface uppercase tracking-tighter hover:text-primary transition-colors inline-block">
          FACELESS
        </Link>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop pb-section-gap">
        <div className="mb-8 animate-fade-in">
          <span className="material-symbols-outlined text-primary text-[64px]" style={{ fontVariationSettings: "'FILL' 0" }}>verified_user</span>
        </div>
        <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 text-center animate-fade-in">Sự Tổng Hợp Bắt Đầu</h1>
        <div className="flex items-center justify-center mb-8 w-full max-w-xs animate-fade-in">
          <div className="h-px bg-[#222222] flex-grow" />
          <div className="mx-4"><div className="w-3 h-3 border border-on-surface-variant rotate-45" /></div>
          <div className="h-px bg-[#222222] flex-grow" />
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-lg mb-16 leading-relaxed animate-fade-in">
          Địa chỉ học thuật của bạn đã được ghi nhận. Kiểm tra hộp thư để nhận quy trình khởi tạo cuối cùng.
        </p>
        <Link to="/library" className="bg-primary text-[#0A0A0A] font-label-caps text-label-caps px-12 py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all inline-block mb-6 animate-fade-in">
          Vào Thư Viện
        </Link>
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.3em] opacity-50 animate-fade-in">Giao Thức 001-A</span>
      </div>
      <footer className="w-full border-t border-[#222222] py-6 text-center">
        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">© 2024 FACELESS DIALECTICS. DÀNH CHO TRÍ TUỆ SÁNG SUỐT.</p>
      </footer>
    </div>
  )
}
