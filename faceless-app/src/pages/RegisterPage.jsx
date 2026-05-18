import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/ui/FormInput'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    passphrase: '',
  })
  const [errors, setErrors] = useState({})
  const [passphraseValidation, setPassphraseValidation] = useState({ errors: [], valid: [] })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validatePassphrase = (value) => {
    const errorList = []
    const validList = []

    if (value.length >= 12) {
      validList.push('Ít nhất 12 ký tự')
    } else {
      errorList.push('Ít nhất 12 ký tự')
    }

    const hasMixed =
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value) &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value)
    if (hasMixed) {
      validList.push('Có chữ hoa, chữ thường, số và ký tự đặc biệt')
    } else {
      errorList.push('Có chữ hoa, chữ thường, số và ký tự đặc biệt')
    }

    setPassphraseValidation({ errors: errorList, valid: validList })
    return errorList.length === 0
  }

  const handlePassphraseChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, passphrase: value }))
    if (value.length > 0) {
      validatePassphrase(value)
    } else {
      setPassphraseValidation({ errors: [], valid: [] })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const isPassphraseValid = validatePassphrase(formData.passphrase)

    if (!isPassphraseValid) {
      setErrors((prev) => ({ ...prev, passphrase: 'Mật khẩu chưa đủ mạnh' }))
      setIsLoading(false)
      return
    }

    if (!agreedToTerms) {
      setErrors((prev) => ({ ...prev, terms: 'Bạn cần đồng ý với chính sách trước khi tiếp tục.' }))
      setIsLoading(false)
      return
    }

    await new Promise((r) => setTimeout(r, 1000))

    const result = register('Học Giả Ẩn Danh', formData.email, formData.passphrase)
    if (result.success) {
      navigate('/registration-success')
    } else {
      if (result.field === 'email') {
        setErrors({ email: result.error })
      } else if (result.field === 'passphrase') {
        setErrors({ passphrase: result.error })
      }
    }
    setIsLoading(false)
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
          {/* Email */}
          <FormInput
            id="register-email"
            label="Email"
            placeholder="you@gmail.com" 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            error={errors.email}
            required
            variant="box"
          />

          {/* Passphrase */}
          <FormInput
            id="register-passphrase"
            label="Mật Khẩu"
            placeholder="Tạo mật khẩu của bạn"
            type="password"
            value={formData.passphrase}
            onChange={handlePassphraseChange}
            error={errors.passphrase}
            errorDetails={passphraseValidation.errors.length > 0 ? passphraseValidation.errors : undefined}
            validDetails={passphraseValidation.valid.length > 0 ? passphraseValidation.valid : undefined}
            required
            variant="box"
          />

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              id="register-terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked)
                if (e.target.checked) {
                  setErrors((prev) => {
                    const next = { ...prev }
                    delete next.terms
                    return next
                  })
                }
              }}
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
          {errors.terms && (
            <p className="font-label-caps text-[10px] text-error uppercase tracking-widest -mt-4">
              {errors.terms}
            </p>
          )}

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
