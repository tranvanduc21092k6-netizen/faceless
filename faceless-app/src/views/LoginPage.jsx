'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/ui/FormInput'

export default function LoginPage() {
  const { login, isAuthenticated, user, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await login(email, passphrase)
    if (!result.success) {
      setError(result.error)
    }
    // Nếu thành công, context tự cập nhật và Component tự re-render giao diện đăng nhập thành công
    setIsLoading(false)
  }

  // Khi đã đăng nhập hợp lệ (pb.authStore.isValid)
  if (isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop pt-32 pb-section-gap">
        <div className="w-full max-w-[520px] bg-[#111111] border border-[#222222] p-8 md:p-12 text-center">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            Chào Mừng Trở Lại
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
            Xin chào <strong className="text-primary">{user?.name || user?.email}</strong>.<br />
            Bạn đã đăng nhập thành công vào hệ thống.
          </p>
          <button
            onClick={() => {
              logout()
            }}
            className="w-full bg-primary text-[#0A0A0A] font-label-caps text-label-caps py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Đăng xuất
          </button>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-6">
             <Link
              href="/"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest underline underline-offset-4"
            >
              Về trang chủ
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="font-label-caps text-label-caps text-primary hover:brightness-110 transition-colors uppercase tracking-widest underline underline-offset-4"
              >
                Đến trang quản trị
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop pt-32 pb-section-gap">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Chào Mừng Trở Lại
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
          Tri thức đòi hỏi sự tĩnh lặng. Tĩnh lặng đòi hỏi danh tính.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[520px] bg-[#111111] border border-[#222222] p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email */}
          <FormInput
            label="Email"
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="box"
          />

          {/* Passphrase */}
          <FormInput
            id="login-passphrase"
            label="Mật Khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            required
            variant="box"
          />

          {/* Error Message */}
          {error && (
            <div className="border-l-2 border-primary bg-[#1a1710] p-4">
              <p className="font-pull-quote text-[16px] text-primary italic leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-[#0A0A0A] font-label-caps text-label-caps py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                Đang xác thực...
              </span>
            ) : (
              'ĐĂNG NHẬP'
            )}
          </button>

          {/* Footer Links */}
          <div className="flex items-center justify-between pt-2">
            <Link
              href="/forgot-passphrase"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest underline underline-offset-4"
            >
              Quên mật khẩu?
            </Link>
            <Link
              href="/register"
              className="font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors uppercase tracking-widest"
            >
              Đăng ký tham gia
            </Link>
          </div>
        </form>
      </div>

      {/* Dialectic Divider */}
      <div className="flex items-center justify-center my-16 opacity-60 w-full max-w-[520px]">
        <div className="h-px bg-[#222222] flex-grow" />
        <div className="mx-3 flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-primary-container rotate-45" />
          <div className="w-2 h-2 border border-primary rotate-45" />
          <div className="w-1.5 h-1.5 bg-primary-container rotate-45" />
        </div>
        <div className="h-px bg-[#222222] flex-grow" />
      </div>

      {/* Quote */}
      <blockquote className="text-center max-w-lg">
        <p className="font-pull-quote text-[18px] text-on-surface-variant italic opacity-60">
          Đọc chậm lại một chút cũng không sao!
        </p>
      </blockquote>
    </div>
  )
}
