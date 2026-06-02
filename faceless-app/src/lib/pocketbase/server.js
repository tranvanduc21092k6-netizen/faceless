import PocketBase from 'pocketbase'

/**
 * createServerPB — Factory tạo PocketBase client phía server
 *
 * Cách dùng trong API Route hoặc Server Component:
 *   import { cookies } from 'next/headers'
 *   const cookieStore = await cookies()
 *   const pb = createServerPB(cookieStore)
 *   // pb đã được gắn session từ cookie nếu có
 *
 * @param {object} cookieStore — Next.js cookies() object
 * @returns {PocketBase} — Instance PocketBase đã xác thực (nếu cookie hợp lệ)
 */
export function createServerPB(cookieStore) {
  const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'
  const pb = new PocketBase(pbUrl)
  pb.autoCancellation(false)

  // Lấy cookie pb_auth từ Next.js cookie store
  const authCookie = cookieStore?.get('pb_auth')

  if (authCookie?.value) {
    try {
      // PocketBase lưu auth data dưới dạng JSON trong cookie
      // loadFromCookie() cần chuỗi cookie hoàn chỉnh: "pb_auth=<value>"
      pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`)
    } catch (err) {
      // Cookie không hợp lệ — bỏ qua, trả về PB chưa xác thực
      console.warn('[PB Server] Cookie xác thực không hợp lệ:', err.message)
      pb.authStore.clear()
    }
  }

  return pb
}

/**
 * getAuthStatus — Xác định trạng thái xác thực từ PocketBase instance
 *
 * @param {PocketBase} pb — Instance PocketBase đã load session
 * @returns {'guest'|'free'|'premium'} — Trạng thái xác thực
 */
export function getAuthStatus(pb) {
  const user = pb.authStore.record || pb.authStore.model

  if (!pb.authStore.isValid || !user) {
    return 'guest'
  }

  const role = user.role
  if (role === 'admin' || role === 'paid') {
    return 'premium'
  }

  return 'free'
}

export default createServerPB
