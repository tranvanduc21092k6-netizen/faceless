import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/ui/FormInput'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, isAuthenticated, user, logout } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passphrase: '',
    passphraseConfirm: ''
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    // Kiểm tra hai mật khẩu khớp nhau
    if (formData.passphrase !== formData.passphraseConfirm) {
      setErrorMsg('Mật khẩu nhập lại không khớp.')
      setIsLoading(false)
      return
    }

    if (!agreedToTerms) {
      setErrorMsg('Bạn cần đồng ý với chính sách trước khi tiếp tục.')
      setIsLoading(false)
      return
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.passphrase,
      formData.passphraseConfirm
    )

    if (result.success) {
      navigate('/login') // Chuyển sang trang đăng nhập sau khi đăng ký thành công
    } else {
      setErrorMsg(result.error)
    }
    setIsLoading(false)
  }
  
  // Khi đã đăng nhập hợp lệ
  if (isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop pt-32 pb-section-gap">
        <div className="w-full max-w-[520px] bg-[#111111] border border-[#222222] p-8 md:p-12 text-center">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            Chào Mừng Trở Lại
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
            Xin chào <strong className="text-primary">{user?.name || user?.email}</strong>.<br />
            Bạn đang đăng nhập. Không thể tạo tài khoản mới lúc này.
          </p>
          <button
            onClick={() => {
              logout()
            }}
            className="w-full bg-primary text-[#0A0A0A] font-label-caps text-label-caps py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop pt-32 pb-section-gap">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Tạo Tài Khoản 
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
          Tham gia một góc nhỏ để suy nghĩ chậm lại trong cuộc sống đầy hỗn loạn
        </p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[520px] h-px bg-[#222222] mb-12" />

      {/* Registration Form */}
      <div className="w-full max-w-[520px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <FormInput
            id="register-name"
            label="Tên Hiển Thị"
            placeholder="Nhập tên của bạn" 
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            variant="box"
          />

          {/* Email */}
          <FormInput
            id="register-email"
            label="Email"
            placeholder="you@gmail.com" 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            variant="box"
          />

          {/* Passphrase */}
          <FormInput
            id="register-passphrase"
            label="Mật Khẩu"
            placeholder="Tạo mật khẩu của bạn (Tối thiểu 8 ký tự)"
            type="password"
            value={formData.passphrase}
            onChange={(e) => setFormData((prev) => ({ ...prev, passphrase: e.target.value }))}
            required
            variant="box"
          />

          {/* Confirm Passphrase */}
          <FormInput
            id="register-passphrase-confirm"
            label="Nhập Lại Mật Khẩu"
            placeholder="Xác nhận mật khẩu"
            type="password"
            value={formData.passphraseConfirm}
            onChange={(e) => setFormData((prev) => ({ ...prev, passphraseConfirm: e.target.value }))}
            required
            variant="box"
          />

          {/* Error Message */}
          {errorMsg && (
            <div className="border-l-2 border-error bg-[#1a1010] p-4">
              <p className="font-pull-quote text-[14px] text-error italic leading-relaxed">
                {errorMsg}
              </p>
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              id="register-terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 border-2 border-[#222222] bg-transparent appearance-none cursor-pointer checked:bg-primary checked:border-primary relative
                after:content-[''] after:absolute after:top-[1px] after:left-[4px] after:w-[5px] after:h-[9px] after:border-r-2 after:border-b-2 after:border-[#0A0A0A] after:rotate-45 after:opacity-0 checked:after:opacity-100"
            />
            <label htmlFor="register-terms" className="font-body-md text-[14px] text-on-surface-variant cursor-pointer leading-relaxed">
              Tôi xác nhận{' '}
              <Link to="/manifesto" className="text-primary hover:underline underline-offset-2">
                Chính Sách Riêng Tư
              </Link>{' '}
              và đồng ý với các điều khoản sử dụng.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-[#0A0A0A] font-label-caps text-label-caps py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                Đang tạo tài khoản...
              </span>
            ) : (
              'Tạo Tài Khoản'
            )}
          </button>

          {/* Login Link */}
          <p className="text-center font-body-md text-body-md text-on-surface-variant">
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="text-on-surface font-bold hover:text-primary transition-colors underline underline-offset-4"
            >
              Đăng nhập tại đây
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
