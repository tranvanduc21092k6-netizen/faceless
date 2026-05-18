import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassphrasePage() {
  const { forgotPassphrase } = useAuth()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((r) => setTimeout(r, 1000))

    forgotPassphrase(email)
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop pt-32 pb-section-gap">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Nhớ Lại Mật Mã
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
          Nhập địa chỉ học thuật của bạn để khởi động quy trình khôi phục.
        </p>
      </div>

      {/* Shield Divider */}
      <div className="flex items-center justify-center mb-12 w-full max-w-[520px]">
        <div className="h-px bg-[#222222] flex-grow" />
        <div className="mx-4">
          <span
            className="material-symbols-outlined text-primary text-[24px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            shield
          </span>
        </div>
        <div className="h-px bg-[#222222] flex-grow" />
      </div>

      {!isSubmitted ? (
        <div className="w-full max-w-[520px]">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Email Input */}
            <div>
              <label
                htmlFor="forgot-email"
                className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest block mb-3"
              >
                Địa Chỉ Học Thuật
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="diachi@bienchinh.org"
                required
                className="w-full bg-transparent border-0 border-b border-[#222222] text-on-surface font-body-md text-body-md py-3 px-0 focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-[#0A0A0A] font-label-caps text-label-caps py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Đang xử lý...
                </span>
              ) : (
                'Gửi Liên Kết Khôi Phục'
              )}
            </button>

            {/* Return Link */}
            <div className="text-center">
              <Link
                to="/login"
                className="font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors uppercase tracking-widest underline underline-offset-4"
              >
                Quay Lại Kho Lưu Trữ
              </Link>
            </div>
          </form>
        </div>
      ) : (
        /* Success State */
        <div className="w-full max-w-[520px] text-center animate-fade-in">
          <span
            className="material-symbols-outlined text-primary text-[48px] mb-6 block"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            mark_email_read
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Đã Gửi Quy Trình Khôi Phục
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Nếu tài khoản tồn tại với địa chỉ học thuật này, bạn sẽ nhận được hướng dẫn đặt lại mật ngữ.
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary text-[#0A0A0A] font-label-caps text-label-caps px-8 py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Quay Lại Ngưỡng Cửa
          </Link>
        </div>
      )}
    </div>
  )
}
