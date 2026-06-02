import { Suspense } from 'react'
import PaymentProcessingPage from '../../../src/views/PaymentProcessingPage'

export const metadata = {
  title: 'Đang Xử Lý — Faceless',
  description: 'Hệ thống đang đối soát giao dịch của bạn.',
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#131313] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C8A96E]/20 border-t-[#C8A96E] rounded-full animate-spin" /></div>}>
      <PaymentProcessingPage />
    </Suspense>
  )
}
