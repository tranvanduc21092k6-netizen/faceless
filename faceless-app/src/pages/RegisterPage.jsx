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
      validList.push('Tối thiểu 12 ký tự có trọng lượng ngữ nghĩa')
    } else {
      errorList.push('Tối thiểu 12 ký tự có trọng lượng ngữ nghĩa')
    }

    const hasMixed =
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value) &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value)
    if (hasMixed) {
      validList.push('Kết hợp ký hiệu đa dạng')
    } else {
      errorList.push('Kết hợp ký hiệu đa dạng')
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
      setErrors((prev) => ({ ...prev, passphrase: 'CHƯA ĐÁP ỨNG YÊU CẦU ĐỘ PHỨC TẠP' }))
      setIsLoading(false)
      return
    }

    if (!agreedToTerms) {
      setErrors((prev) => ({ ...prev, terms: 'Bạn phải xác nhận Tuyên Ngôn Quyền Riêng Tư.' }))
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
          Khởi Đầu Tổng Hợp
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
          Bước vào biện chứng đòi hỏi một danh tính được xác minh. Dữ liệu của bạn được bảo mật trong kho lưu trữ mã hóa của chúng tôi.
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
            label="Địa Chỉ Email"
            type="email"
            placeholder="hocgia@bienchinh.org"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            error={errors.email}
            required
            variant="box"
          />

          {/* Passphrase */}
          <FormInput
            id="register-passphrase"
            label="Mật Ngữ"
            type="password"
            placeholder="Tạo mật ngữ của bạn"
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
                Tuyên Ngôn Quyền Riêng Tư
              </Link>{' '}
              và đồng ý với các điều khoản trao đổi tri thức.
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
                Đang khởi tạo...
              </span>
            ) : (
              'Khởi Tạo Đăng Ký'
            )}
          </button>

          {/* Login Link */}
          <p className="text-center font-body-md text-body-md text-on-surface-variant">
            Đã tham gia tổng hợp?{' '}
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
