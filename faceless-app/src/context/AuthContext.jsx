import { createContext, useContext, useState, useEffect } from 'react'
import { pb } from '../lib/pocketbase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.model)
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)

  useEffect(() => {
    // Lắng nghe thay đổi trạng thái đăng nhập từ PocketBase
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model)
      setIsAuthenticated(pb.authStore.isValid)
    })

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [])

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password)
      return { success: true, data: authData }
    } catch (err) {
      console.error(err)
      return { success: false, error: err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.' }
    }
  }

  const register = async (name, email, password, passwordConfirm) => {
    try {
      const data = {
        name,
        email,
        password,
        passwordConfirm,
        role: 'user', // Mặc định role là user khi đăng ký từ web
      }
      // Gửi request tạo tài khoản tới PocketBase
      const record = await pb.collection('users').create(data)
      return { success: true, data: record }
    } catch (err) {
      console.error(err)
      let errorMessage = 'Đăng ký thất bại.'
      // Trích xuất lỗi cụ thể từ PocketBase trả về
      if (err.response?.data) {
        const fieldErrors = Object.entries(err.response.data)
          .map(([field, info]) => `${field}: ${info.message}`)
          .join(' | ')
        if (fieldErrors) {
          errorMessage = fieldErrors
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    pb.authStore.clear() // Xoá session
    setUser(null)
    setIsAuthenticated(false)
  }

  const forgotPassphrase = async (email) => {
    try {
      await pb.collection('users').requestPasswordReset(email)
      return { success: true, message: 'Quy trình khôi phục đã được gửi đến địa chỉ email của bạn.' }
    } catch (err) {
      return { success: false, error: err.message || 'Lỗi gửi yêu cầu khôi phục.' }
    }
  }

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
