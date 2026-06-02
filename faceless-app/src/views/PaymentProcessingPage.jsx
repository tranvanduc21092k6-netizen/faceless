'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

/**
 * PaymentProcessingPage — Trạng Thái Đang Xử Lý
 *
 * Thiết kế theo faceless_payment_processing_state/code.html
 *
 * Logic:
 *  - Poll GET /api/payment/status/[paymentId] mỗi 5 giây
 *  - Khi isPaid=true → refreshUser() → redirect /payment-success
 *  - Sau 10 phút (120 polls) → redirect /payment-error
 */
export default function PaymentProcessingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshUser } = useAuth()

  const paymentId = searchParams.get('paymentId')
  const [statusText, setStatusText] = useState('Đang thiết lập kết nối...')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const pollCountRef = useRef(0)
  const MAX_POLLS = 120 // 10 phút = 120 × 5 giây
  const POLL_INTERVAL = 5000 // 5 giây

  const STATUS_MESSAGES = [
    'Đang thiết lập kết nối...',
    'Đang trích xuất siêu dữ liệu...',
    'Đang đối chiếu lưu trữ...',
    'Đang xác thực giao dịch...',
    'Đang chờ xác nhận ngân hàng...',
  ]

  useEffect(() => {
    if (!paymentId) {
      router.replace('/checkout')
      return
    }

    // Rotate status messages every 8 seconds for atmosphere
    const msgInterval = setInterval(() => {
      setElapsedSeconds((s) => s + 1)
      setStatusText(STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)])
    }, 8000)

    // Elapsed time counter
    const timeInterval = setInterval(() => {
      setElapsedSeconds((s) => s + 1)
    }, 1000)

    // Polling function
    const poll = async () => {
      pollCountRef.current += 1

      // Quá timeout
      if (pollCountRef.current > MAX_POLLS) {
        clearInterval(pollInterval)
        router.push('/payment-error')
        return
      }

      try {
        const res = await fetch(`/api/payment/status/${paymentId}`, {
          credentials: 'include',
        })
        const data = await res.json()

        if (data.success && data.isPaid) {
          clearInterval(pollInterval)
          clearInterval(msgInterval)
          clearInterval(timeInterval)
          // Refresh AuthContext để cập nhật role mới
          await refreshUser()
          router.push('/payment-success')
          return
        }

        if (data.isFailed) {
          clearInterval(pollInterval)
          clearInterval(msgInterval)
          clearInterval(timeInterval)
          router.push('/payment-error')
          return
        }
      } catch (err) {
        console.error('[PaymentProcessing] Poll error:', err)
        // Tiếp tục poll, không dừng vì lỗi mạng nhất thời
      }
    }

    // Bắt đầu poll ngay và mỗi 5 giây
    poll()
    const pollInterval = setInterval(poll, POLL_INTERVAL)

    return () => {
      clearInterval(pollInterval)
      clearInterval(msgInterval)
      clearInterval(timeInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div
      className="bg-[#131313] text-[#e5e2e1] min-h-screen flex flex-col items-center justify-center font-body-md antialiased"
    >
      <main className="w-full px-5 md:px-20 flex items-center justify-center flex-1">
        <div className="w-full max-w-[680px] flex flex-col items-center text-center space-y-12">

          {/* Minimalist icon */}
          <div className="text-[#e5c487] opacity-80">
            <span
              className="material-symbols-outlined animate-pulse"
              style={{ fontSize: '48px', fontVariationSettings: "'wght' 200" }}
            >
              hourglass_empty
            </span>
          </div>

          {/* Typography */}
          <div className="space-y-6 w-full flex flex-col items-center">
            <h1
              className="font-headline-md text-[32px] md:text-[48px] leading-[1.2] text-[#e5c487] font-medium"
              style={{ animation: 'fade-pulse 3s ease-in-out infinite' }}
            >
              Đang xác thực giao dịch...
            </h1>
            <p className="font-body-lg text-[18px] text-[#d0c5b5] leading-[1.7] max-w-md">
              Hệ thống đang đối soát dữ liệu ngân hàng. Vui lòng giữ cửa sổ này mở.
            </p>
            <p className="font-label-caps text-[12px] text-[#d0c5b5] opacity-60 uppercase tracking-widest">
              {statusText}
            </p>
          </div>

          {/* Loading bar — Dialectical Pulse */}
          <div className="w-full max-w-sm mt-16">
            <div className="loading-bar-container relative h-px w-full bg-[#222222] overflow-hidden">
              <div className="loading-bar-inner absolute top-0 h-full bg-[#e5c487]" />
            </div>
            <div className="mt-4 flex justify-between w-full font-label-caps text-[11px] text-[#d0c5b5] opacity-50 uppercase tracking-widest">
              <span>INITIATED</span>
              <span>VERIFYING</span>
              <span>SEALED</span>
            </div>
          </div>

          {/* Elapsed time */}
          <div className="font-label-caps text-[11px] text-[#d0c5b5] opacity-40 uppercase tracking-widest">
            Thời gian chờ: {formatTime(elapsedSeconds)}
          </div>

          {/* Security badge */}
          <div
            className="mt-8 px-4 py-2 border border-[#4d463a] bg-[#1c1b1b] font-label-caps text-[11px] text-[#c8c6c2] inline-flex items-center gap-2 uppercase tracking-widest"
            style={{ borderRadius: 0 }}
          >
            <span className="material-symbols-outlined text-[14px]">lock</span>
            SECURE DIALECTIC CHANNEL
          </div>
        </div>
      </main>

      <style>{`
        @keyframes dialectical-pulse {
          0% { width: 0%; left: 50%; opacity: 0; }
          50% { width: 100%; left: 0%; opacity: 1; }
          100% { width: 0%; left: 50%; opacity: 0; }
        }
        .loading-bar-inner {
          animation: dialectical-pulse 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
