import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/ui/FormInput'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800))

    const result = login(email, passphrase)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    setIsLoading(false)
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
            placeholder="you@gmail.com"
            type="email"
            placeholder="Nhập địa chỉ"
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
              to="/forgot-passphrase"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest underline underline-offset-4"
            >
              Quên mật khẩu?
            </Link>
            <Link
              to="/register"
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
