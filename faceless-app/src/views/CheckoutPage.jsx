'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

/**
 * CheckoutPage — Trang Thanh Toán VietQR
 *
 * Thiết kế theo faceless_local_payment_checkout/code.html
 *
 * Luồng:
 *  1. Hiển thị thông tin chuyển khoản (bank, số TK, nội dung CK)
 *  2. User chuyển khoản thủ công trên banking app
 *  3. User click "Xác nhận đã chuyển khoản"
 *  4. Gọi POST /api/payment/create → lấy paymentId
 *  5. Redirect → /payment-processing?paymentId=xxx
 */
export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isAuthReady, isPaid, user } = useAuth()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  // Lấy 4 ký tự cuối userId để tạo reference code
  const userCode = user?.id?.slice(-4).toUpperCase() || '????'
  const referenceCode = `FACELESS P49 ${userCode}`

  const MOMO_INFO = {
    walletName: 'MoMo',
    phoneNumber: '0987 654 321', // TODO: Thay bằng số MoMo thật
    accountHolder: 'FACELESS MEDIA',
    amount: '49.000 VNĐ',
  }

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

  const handleCopy = useCallback((text, key) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }, [])

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ plan: 'monthly' }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Có lỗi xảy ra. Vui lòng thử lại.')
        setIsSubmitting(false)
        return
      }

      // Redirect sang trang processing với paymentId
      router.push(`/payment-processing?paymentId=${data.paymentId}`)
    } catch (err) {
      console.error('[Checkout] Lỗi:', err)
      setError('Lỗi kết nối. Vui lòng thử lại.')
      setIsSubmitting(false)
    }
  }

  if (!isAuthReady || !isAuthenticated || isPaid) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C8A96E]/20 border-t-[#C8A96E] rounded-full animate-spin" />
      </div>
    )
  }

  const CopyButton = ({ text, copyKey }) => (
    <button
      onClick={() => handleCopy(text, copyKey)}
      className="text-[#998f81] hover:text-[#C8A96E] transition-colors focus:outline-none flex-shrink-0"
      title="Sao chép"
      type="button"
    >
      <span className="material-symbols-outlined text-[18px]">
        {copied === copyKey ? 'check' : 'content_copy'}
      </span>
    </button>
  )

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-[#E8E6E1] flex flex-col font-body-md antialiased pb-20"
      style={{ ['--scrollbar-thumb']: '#222222' }}
    >
      {/* Header — transactional, minimal */}
      <header className="w-full py-4 px-5 flex items-center justify-center border-b border-[#4d463a]/50 mb-12 bg-[#0A0A0A]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-[680px]">
          <button
            onClick={() => router.back()}
            className="text-[#998f81] hover:text-[#e5c487] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-headline-md text-xl tracking-tighter text-[#E8E6E1] uppercase">
            Faceless
          </span>
          <span className="w-6" />
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow w-full px-5 flex justify-center items-start">
        <div className="w-full max-w-[680px] flex flex-col gap-8">

          {/* Page Header */}
          <div className="text-center mb-4">
            <h1 className="font-headline-lg text-[32px] md:text-[48px] leading-[1.2] text-[#E8E6E1] mb-2 font-medium">
              Thanh Toán
            </h1>
            <p className="font-body-md text-[16px] text-[#d0c5b5] leading-[1.6]">
              Hoàn tất thủ tục để truy cập không giới hạn.
            </p>
          </div>

          {/* Order Summary */}
          <section
            className="bg-[#111111] border border-[#222222] p-6 flex justify-between items-center relative overflow-hidden group"
            style={{ borderRadius: 0 }}
          >
            {/* Gold accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8A96E] opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-col pl-3">
              <span className="font-label-caps text-[12px] text-[#998f81] mb-1 uppercase tracking-[0.15em]">
                Đơn hàng của bạn
              </span>
              <span className="font-body-lg text-[18px] text-[#E8E6E1]">
                Gói Thành Viên: Monthly Premium
              </span>
            </div>
            <div className="font-headline-md text-[32px] text-[#C8A96E] font-medium leading-[1.3] flex-shrink-0 ml-4">
              49.000 VNĐ
            </div>
          </section>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-[#222222] flex-grow" />
            <span className="font-label-caps text-[11px] text-[#998f81] uppercase tracking-[0.15em]">
              Phương thức thanh toán
            </span>
            <div className="h-px bg-[#222222] flex-grow" />
          </div>

          {/* VietQR Bank Transfer */}
          <div
            className="bg-[#111111] border border-[#C8A96E]/60 p-6"
            style={{ borderRadius: 0 }}
          >
            {/* Method Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-[#C8A96E] flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#C8A96E]" />
                </div>
                <span className="font-body-lg text-[18px] text-[#E8E6E1]">
                  Chuyển khoản Ví điện tử (MoMo)
                </span>
              </div>
              <span className="material-symbols-outlined text-[#998f81]">qr_code_2</span>
            </div>

            {/* Details */}
            <div className="flex flex-col md:flex-row gap-6 pt-6 border-t border-[#222222]">

              {/* QR Placeholder */}
              <div
                className="w-full md:w-[160px] h-[160px] bg-[#0A0A0A] border border-[#222222] flex flex-col items-center justify-center p-4 relative flex-shrink-0 group"
                style={{ borderRadius: 0 }}
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C8A96E]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C8A96E]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C8A96E]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C8A96E]" />
                <span
                  className="material-symbols-outlined text-[56px] text-[#C8A96E] opacity-80 group-hover:opacity-100 transition-all mb-2"
                >
                  qr_code_scanner
                </span>
                <span className="font-label-caps text-[10px] text-[#998f81] text-center uppercase tracking-widest">
                  MOMO QR
                </span>
              </div>

              {/* Copyable Fields */}
              <div className="flex-1 flex flex-col gap-4">

                {/* Wallet name */}
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-[11px] text-[#998f81] uppercase tracking-widest">
                    Ví điện tử
                  </span>
                  <div
                    className="flex justify-between items-center bg-[#0A0A0A] border border-[#222222] p-3 hover:border-[#4d463a] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <span className="font-body-md text-[16px] text-[#E8E6E1]">
                      {MOMO_INFO.walletName}
                    </span>
                    <CopyButton text={MOMO_INFO.walletName} copyKey="bank" />
                  </div>
                </div>

                {/* Phone number */}
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-[11px] text-[#998f81] uppercase tracking-widest">
                    Số điện thoại
                  </span>
                  <div
                    className="flex justify-between items-center bg-[#0A0A0A] border border-[#222222] p-3 hover:border-[#4d463a] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <span className="font-body-md text-[16px] text-[#E8E6E1] tracking-widest">
                      {MOMO_INFO.phoneNumber}
                    </span>
                    <CopyButton text={MOMO_INFO.phoneNumber.replace(/\s/g, '')} copyKey="account" />
                  </div>
                </div>

                {/* Reference code — REQUIRED */}
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-[11px] text-[#C8A96E] uppercase tracking-widest">
                    Nội dung chuyển khoản (Bắt buộc)
                  </span>
                  <div
                    className="flex justify-between items-center bg-[#0A0A0A] border border-[#C8A96E]/50 p-3 hover:border-[#C8A96E] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <span className="font-body-md text-[16px] text-[#E8E6E1] tracking-widest font-bold">
                      {referenceCode}
                    </span>
                    <CopyButton text={referenceCode} copyKey="ref" />
                  </div>
                  <p className="font-label-caps text-[10px] text-[#998f81] mt-1">
                    ⚠ Ghi đúng nội dung này để hệ thống xác nhận tự động
                  </p>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-[11px] text-[#998f81] uppercase tracking-widest">
                    Số tiền
                  </span>
                  <div
                    className="flex justify-between items-center bg-[#0A0A0A] border border-[#222222] p-3 hover:border-[#4d463a] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <span className="font-body-md text-[16px] text-[#C8A96E] font-bold">
                      {MOMO_INFO.amount}
                    </span>
                    <CopyButton text="49000" copyKey="amount" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="bg-[#93000a]/20 border border-[#ffb4ab]/30 p-4 flex items-start gap-3"
              style={{ borderRadius: 0 }}
            >
              <span className="material-symbols-outlined text-[#ffb4ab] text-[20px] flex-shrink-0">error</span>
              <p className="font-body-md text-[14px] text-[#ffb4ab]">{error}</p>
            </div>
          )}

          {/* Action Area */}
          <div className="flex flex-col items-center gap-6 mt-4">

            {/* Primary CTA */}
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full md:w-auto bg-[#C8A96E] text-[#0A0A0A] font-label-caps text-[12px] uppercase tracking-[0.15em] font-bold py-4 px-12 hover:bg-[#e3c285] transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ borderRadius: 0 }}
              id="btn-confirm-payment"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Xác nhận đã chuyển khoản
                </>
              )}
            </button>

            {/* Info subtext */}
            <div className="flex items-start gap-2 max-w-lg text-center">
              <span className="material-symbols-outlined text-[16px] text-[#998f81] mt-0.5">info</span>
              <p className="font-body-md text-[13px] leading-relaxed text-[#998f81]">
                Hệ thống sẽ đối soát giao dịch và kích hoạt tài khoản Premium của bạn trong vòng{' '}
                <strong className="text-[#d0c5b5]">5–30 phút</strong>.
                Vui lòng giữ trang xử lý mở.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-16 py-8 border-t border-[#4d463a]/30 flex flex-col items-center gap-4 bg-[#0e0e0e]">
        <div className="font-headline-md text-[20px] text-[#e5c487] opacity-50 text-center uppercase tracking-widest">
          Faceless
        </div>
        <div className="font-label-caps text-[11px] text-[#d0c5b5] flex gap-6 uppercase tracking-widest">
          <a href="#" className="hover:text-[#e5c487] transition-colors">Terms of Inquiry</a>
          <a href="#" className="hover:text-[#e5c487] transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  )
}
