'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import Link from 'next/link'

/**
 * UpgradePage — Trang Pricing Plans
 *
 * Chỉ hiển thị 1 gói: Monthly Premium — 49.000 VNĐ/tháng
 * Thiết kế theo faceless_pricing_plans/code.html
 *
 * Luồng:
 *  - Nếu user đã là paid → redirect về trang chủ
 *  - Nếu chưa đăng nhập → redirect về /login
 *  - Click "Subscribe Monthly" → /checkout?plan=monthly
 */
export default function UpgradePage() {
  const router = useRouter()
  const { isAuthenticated, isAuthReady, isPaid } = useAuth()

  useEffect(() => {
    if (!isAuthReady) return
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    if (isPaid) {
      router.replace('/')
    }
  }, [isAuthReady, isAuthenticated, isPaid, router])

  if (!isAuthReady || !isAuthenticated || isPaid) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C8A96E]/20 border-t-[#C8A96E] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8E6E1] flex flex-col font-body-md antialiased">

      {/* Header — minimal navigation */}
      <header className="w-full border-b border-[#4d463a] px-5 md:px-20 py-4 flex items-center justify-between max-w-[1120px] mx-auto w-full">
        <Link
          href="/"
          className="font-headline-md text-xl tracking-tighter text-[#e5c487] uppercase hover:opacity-80 transition-opacity"
        >
          Faceless
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#d0c5b5] hover:text-[#e5c487] transition-colors font-label-caps text-[12px] uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Trở về
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-5 md:px-20">

        {/* Headline */}
        <div className="text-center mb-16 max-w-2xl">
          <span className="font-label-caps text-[12px] text-[#C8A96E] uppercase tracking-[0.15em] mb-4 block">
            Mở Khóa Tri Thức
          </span>
          <h1 className="font-headline-lg text-[32px] md:text-[48px] leading-[1.2] text-[#E8E6E1] mb-6 font-medium">
            Chọn không gian tư duy của bạn.
          </h1>
          <p className="font-body-lg text-[18px] text-[#d0c5b5] leading-[1.7]">
            Archival access for the rigorous mind.
          </p>
        </div>

        {/* Single Plan Card */}
        <div className="w-full max-w-sm">
          <div
            className="bg-[#111111] border border-[#222222] p-8 flex flex-col gap-8 relative overflow-hidden group"
            style={{ borderRadius: 0 }}
          >
            {/* Gold accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C8A96E]" />

            {/* Plan header */}
            <div>
              <h2 className="font-label-caps text-[12px] text-[#C8A96E] uppercase tracking-[0.15em] mb-4">
                Monthly Premium
              </h2>
              <div className="border-b border-[#4d463a] pb-6 mb-6">
                <span className="font-headline-md text-[32px] text-[#E8E6E1] leading-[1.3] font-medium">
                  49.000 VNĐ
                </span>
                <span className="font-body-md text-[16px] text-[#d0c5b5] ml-2">/ tháng</span>
              </div>

              {/* Features list */}
              <ul className="space-y-4">
                {[
                  'Đọc 100% bài luận Obsidian chuyên sâu',
                  'Nghe toàn bộ phiên biện chứng (30+ phút)',
                  'Truy cập kho lưu trữ không giới hạn',
                  'Hủy bất cứ lúc nào',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-[#C8A96E] text-[20px] mt-[2px] flex-shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                    <span className="font-body-md text-[16px] text-[#d0c5b5] leading-[1.6]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push('/checkout?plan=monthly')}
              className="w-full py-4 bg-[#C8A96E] text-[#0A0A0A] font-label-caps text-[12px] uppercase tracking-[0.15em] font-bold hover:bg-[#e3c285] transition-colors duration-300 flex items-center justify-center gap-2 group"
              style={{ borderRadius: 0 }}
              id="btn-subscribe-monthly"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              Subscribe Monthly
            </button>
          </div>

          {/* Footnote */}
          <p className="text-center font-label-caps text-[11px] text-[#998f81] mt-6 uppercase tracking-widest">
            Không tự động gia hạn · Thanh toán thủ công
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#4d463a] py-8 flex flex-col items-center gap-4">
        <div className="font-headline-md text-[20px] text-[#e5c487] tracking-tighter uppercase opacity-50">
          Faceless
        </div>
        <div className="flex gap-6 font-label-caps text-[11px] text-[#d0c5b5] uppercase tracking-widest">
          <Link href="/manifesto" className="hover:text-[#e5c487] transition-colors">The Dialectic</Link>
          <a href="#" className="hover:text-[#e5c487] transition-colors">Privacy</a>
        </div>
        <p className="font-body-md text-[14px] text-[#d0c5b5] opacity-50 text-center max-w-sm">
          © 2024 Faceless. A private symposium for the rigorous mind.
        </p>
      </footer>
    </div>
  )
}
