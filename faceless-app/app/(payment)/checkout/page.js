import { Suspense } from 'react'
import CheckoutPage from '../../../src/views/CheckoutPage'

export const metadata = {
  title: 'Thanh Toán Premium — Faceless',
  description: 'Hoàn tất thủ tục để truy cập không giới hạn.',
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C8A96E]/20 border-t-[#C8A96E] rounded-full animate-spin" /></div>}>
      <CheckoutPage />
    </Suspense>
  )
}
