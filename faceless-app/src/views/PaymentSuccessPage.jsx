'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

/**
 * PaymentSuccessPage — Trạng Thái Thanh Toán Thành Công
 *
 * Thiết kế theo faceless_payment_success_state/code.html
 *
 * Hiển thị màn hình chào mừng "Chào mừng đến với The Void."
 * User đã là Premium — mở khóa toàn bộ nội dung.
 */
export default function PaymentSuccessPage() {
  const router = useRouter()
  const { isAuthReady, isPaid } = useAuth()

  // Nếu user chưa phải paid (truy cập thẳng URL) → về trang chủ
  useEffect(() => {
    if (isAuthReady && !isPaid) {
      // Cho phép xem trang này nếu vừa redirect từ processing
      // (không force redirect vì refreshUser có thể chưa kịp chạy)
    }
  }, [isAuthReady, isPaid, router])

  return (
    <div className="bg-[#0A0A0A] text-[#e5e2e1] min-h-screen flex flex-col font-body-md selection:bg-[#C8A96E]/30 selection:text-[#C8A96E]">

      {/* Main Canvas */}
      <main className="flex-grow flex items-center justify-center p-5 md:p-20 relative overflow-hidden">

        {/* Subtle background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
          <div
            className="w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        {/* Content */}
        <div
          className="max-w-[680px] w-full text-center relative z-10"
          style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className="w-24 h-24 border border-[#C8A96E]/20 flex items-center justify-center bg-[#201f1f]/50 backdrop-blur-sm"
              style={{ borderRadius: '50%' }}
            >
              <span
                className="material-symbols-outlined text-[#e5c487] text-5xl"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
              >
                auto_awesome
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-headline-lg text-[48px] md:text-[64px] leading-[1.1] text-[#e5c487] mb-6 font-medium tracking-tight">
            Chào mừng bạn đến với
            <br />
            <em className="italic font-light">The Void.</em>
          </h1>

          {/* Gold divider */}
          <div className="w-16 h-px bg-[#C8A96E]/50 mx-auto mb-6" />

          {/* Description */}
          <p className="font-body-lg text-[18px] text-[#d0c5b5] leading-[1.7] max-w-lg mx-auto mb-16">
            Giao dịch thành công. Lớp màn bí mật đã được vén lên. Tài khoản của bạn hiện đã là{' '}
            <span className="text-[#e5c487]">Premium</span>. Hãy bước vào thư viện vô tận.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary */}
            <Link
              href="/library"
              className="w-full sm:w-auto bg-[#e5c487] text-[#0A0A0A] px-10 py-4 font-label-caps text-[12px] uppercase tracking-[0.15em] font-bold hover:bg-[#ffdea3] transition-colors duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{ borderRadius: 0 }}
              id="btn-start-reading"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                Bắt đầu nghiên cứu
              </span>
              <div className="absolute inset-0 bg-[#0A0A0A]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            {/* Secondary */}
            <Link
              href="/"
              className="w-full sm:w-auto bg-transparent text-[#c8c6c2] px-8 py-4 font-label-caps text-[12px] uppercase tracking-[0.15em] border border-[#222222] hover:border-[#e5c487] hover:text-[#e5c487] transition-colors duration-300 flex items-center justify-center gap-2"
              style={{ borderRadius: 0 }}
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Về Trang Chủ
            </Link>
          </div>

          {/* Order reference */}
          <div className="mt-16 pt-8 border-t border-[#222222] inline-block w-full max-w-sm">
            <p className="font-label-caps text-[11px] text-[#d0c5b5]/40 uppercase tracking-widest">
              Thanh toán đã được xác nhận ✓
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e0e0e] border-t border-[#4d463a] py-8 flex flex-col md:flex-row justify-between items-center w-full px-8 gap-4 relative z-10">
        <div className="font-headline-md text-xl text-[#e5c487]">Faceless</div>
        <div className="font-body-md text-[14px] text-[#d0c5b5] opacity-50 text-center">
          © 2024 Faceless. All rights reserved.
        </div>
        <nav className="flex gap-6 mt-2 md:mt-0">
          {['Ethics', 'Privacy', 'Terms'].map((item) => (
            <a
              key={item}
              href="#"
              className="font-label-caps text-[11px] text-[#d0c5b5] hover:text-[#e5c487] underline transition-all uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </nav>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
