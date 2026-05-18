import { useState } from 'react'

export default function FormInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  errorDetails,
  validDetails,
  required = false,
  variant = 'box', // 'box' | 'line'
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const baseInputClass = variant === 'line'
    ? 'w-full bg-transparent border-0 border-b border-[#222222] text-on-surface font-body-md text-body-md py-3 px-0 focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50'
    : 'w-full bg-[#111111] border border-[#222222] text-on-surface font-body-md text-body-md py-3 px-4 focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50'

  const errorInputClass = error
    ? (variant === 'line' ? 'border-b-error' : 'border-error')
    : ''

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor={id}
            className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest"
          >
            {label}
          </label>
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseInputClass} ${errorInputClass} ${isPassword ? 'pr-12' : ''}`}
          autoComplete={isPassword ? 'current-password' : undefined}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}

        {/* Error icon for non-password fields */}
        {error && !isPassword && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-error">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2">
          <span className="flex items-center gap-1.5 font-label-caps text-[10px] text-error uppercase tracking-widest">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </span>
        </div>
      )}

      {/* Validation Details */}
      {(errorDetails || validDetails) && (
        <div className="mt-2 space-y-1">
          {errorDetails?.map((detail, i) => (
            <div key={`err-${i}`} className="flex items-center gap-1.5 text-[12px] text-on-surface-variant">
              <span className="text-error text-[14px]">✗</span>
              {detail}
            </div>
          ))}
          {validDetails?.map((detail, i) => (
            <div key={`val-${i}`} className="flex items-center gap-1.5 text-[12px] text-primary">
              <span className="text-primary text-[14px]">✓</span>
              {detail}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
