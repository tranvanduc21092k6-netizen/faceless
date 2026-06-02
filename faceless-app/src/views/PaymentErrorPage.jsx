'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

/**
 * PaymentErrorPage — Trạng Thái Lỗi / Timeout Thanh Toán
 *
 * Thiết kế theo faceless_payment_error_state/code.html
 *
 * Hiện ra khi:
 *  - Polling timeout sau 10 phút không có xác nhận
 *  - payment.status = 'failed'
 */
export default function PaymentErrorPage() {
  const router = useRouter()

  return (
    <div className="text-[#e5e2e1] min-h-screen flex flex-col items-center justify-center p-5 md:p-20 font-body-md bg-[#0A0A0A] selection:bg-[#e5c487] selection:text-[#0A0A0A]">
      <main
        className="w-full max-w-2xl bg-[#111111] border border-[#222222] p-8 md:p-12 relative overflow-hidden group transition-colors duration-500 hover:border-[#333333]"
        style={{ borderRadius: 0 }}
      >
        {/* Error accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ffb4ab]/40" />

        <div className="flex flex-col items-center text-center space-y-8">

          {/* Icon */}
          <div
            className="w-16 h-16 border border-[#222222] flex items-center justify-center bg-[#0A0A0A] text-[#ffb4ab]/80"
            style={{ borderRadius: '50%' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '32px', fontVariationSettings: "'FILL' 0" }}
            >
              error
            </span>
          </div>

          {/* Headers */}
          <div className="space-y-4">
            <h1 className="font-headline-md text-[32px] md:text-[48px] leading-[1.2] text-[#E8E6E1] font-medium">
              Không thể xác nhận giao dịch.
            </h1>
            <p className="font-body-lg text-[18px] text-[#d0c5b5] leading-[1.7] max-w-lg mx-auto">
              Chúng tôi chưa nhận được tín hiệu thanh toán. Nếu bạn đã chuyển khoản, vui lòng chờ thêm vài phút hoặc liên hệ Ban Biên Tập.
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-[#222222]" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => router.push('/checkout')}
              className="bg-[#e5c487] text-[#0A0A0A] font-label-caps text-[12px] px-8 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#ffdea3] transition-colors duration-300 flex items-center justify-center gap-2"
              style={{ borderRadius: 0 }}
              id="btn-retry-payment"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Thử lại
            </button>
            <Link
              href="/"
              className="bg-transparent border border-[#222222] text-[#E8E6E1] font-label-caps text-[12px] px-8 py-4 uppercase tracking-[0.15em] hover:border-[#e5c487] hover:text-[#e5c487] transition-all duration-300 flex items-center justify-center gap-2"
              style={{ borderRadius: 0 }}
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Về Trang Chủ
            </Link>
          </div>

          {/* Subtle error reference */}
          <div className="pt-4 font-label-caps text-[11px] text-[#d0c5b5]/30 uppercase tracking-widest">
            Ref: ERR-TIMEOUT-PAYMENT
          </div>

          {/* Contact info */}
          <p className="font-body-md text-[14px] text-[#d0c5b5] opacity-60">
            Cần hỗ trợ? Liên hệ qua email:{' '}
            <a
              href="mailto:support@faceless.media"
              className="text-[#e5c487] hover:underline transition-colors"
            >
              support@faceless.media
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
