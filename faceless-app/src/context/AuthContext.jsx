import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Mock user database
const MOCK_USERS = [
  { email: 'scholar@dialectics.org', passphrase: 'TruthIsWhole42!', name: 'Anonymous Scholar' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = useCallback((email, passphrase) => {
    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passphrase === passphrase
    )
    if (found) {
      setUser({ email: found.email, name: found.name })
      setIsAuthenticated(true)
      return { success: true }
    }
    return {
      success: false,
      error: 'Xác thực thất bại. Biện chứng vẫn đóng cửa với thông tin này.',
    }
  }, [])

  const register = useCallback((name, email, passphrase) => {
    // Check if email already exists
    const exists = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return { success: false, field: 'email', error: 'ĐỊA CHỈ ĐÃ ĐƯỢC KHỞI TẠO' }
    }

    // Validate passphrase complexity
    const errors = []
    if (passphrase.length < 12) {
      errors.push('Tối thiểu 12 ký tự có trọng lượng ngữ nghĩa')
    }
    const hasSymbolic = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passphrase) &&
      /[A-Z]/.test(passphrase) && /[a-z]/.test(passphrase) && /[0-9]/.test(passphrase)
    if (!hasSymbolic) {
      errors.push('Kết hợp ký hiệu đa dạng')
    }

    if (errors.length > 0) {
      return { success: false, field: 'passphrase', error: 'CHƯA ĐÁP ỨNG YÊU CẦU ĐỘ PHỨC TẠP', details: errors }
    }

    // Mock registration success
    MOCK_USERS.push({ email, passphrase, name })
    setUser({ email, name })
    setIsAuthenticated(true)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const forgotPassphrase = useCallback((email) => {
    // Always return success for mock
    return { success: true, message: 'Quy trình khôi phục đã được gửi đến địa chỉ học thuật của bạn.' }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, forgotPassphrase }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
