import { NextResponse } from 'next/server'

/**
 * Middleware — Lớp bảo mật cốt lõi cho Faceless Media Platform
 *
 * Chặn và phân loại mọi request đến các route được bảo vệ:
 *   - /read/:slug*  — Không gian đọc (cần phân loại auth)
 *   - /member/*     — Dashboard thành viên
 *   - /api/secure/* — API endpoint bảo mật
 *
 * Logic:
 *   1. Phân tích cookie `pb_auth` để trích xuất token PocketBase
 *   2. Giải mã token JWT để xác định role người dùng
 *   3. Gắn header `x-auth-status` vào request:
 *      - 'guest'   — không có session
 *      - 'free'    — session hợp lệ, role = user
 *      - 'premium' — session hợp lệ, role = paid hoặc admin
 *   4. Với API requests: nếu route yêu cầu auth mà không có → trả 401
 */
export function middleware(request) {
  const { pathname } = request.nextUrl

  // Đọc cookie pb_auth
  const authCookie = request.cookies.get('pb_auth')
  let authStatus = 'guest'
  let userModel = null

  if (authCookie?.value) {
    try {
      // PocketBase lưu cookie dưới dạng JSON: { token: "...", model: {...} }
      const parsed = JSON.parse(decodeURIComponent(authCookie.value))
      
      if (parsed?.token && parsed?.model) {
        userModel = parsed.model
        const role = userModel.role || 'user'

        if (role === 'admin' || role === 'paid') {
          authStatus = 'premium'
        } else {
          authStatus = 'free'
        }
      }
    } catch {
      // Cookie hỏng — giữ guest
      authStatus = 'guest'
    }
  }

  // ─── XỬ LÝ API ROUTE BẢO MẬT ───
  if (pathname.startsWith('/api/secure/')) {
    if (authStatus === 'guest') {
      return NextResponse.json(
        { success: false, error: 'Xác thực bắt buộc. Vui lòng đăng nhập.' },
        { status: 401 }
      )
    }

    if (authStatus === 'free') {
      return NextResponse.json(
        { success: false, error: 'Truy cập bị từ chối. Nội dung dành cho thành viên Premium.' },
        { status: 403 }
      )
    }
  }

  // ─── XỬ LÝ ROUTE /member ───
  if (pathname.startsWith('/member')) {
    if (authStatus === 'guest') {
      // Redirect về trang login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // ─── XỬ LÝ ROUTE /read/:slug ───
  // Gắn header x-auth-status để page component đọc được
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-auth-status', authStatus)

  if (authStatus === 'guest' || authStatus === 'free') {
    requestHeaders.set('x-auth-required', 'true')
  }

  // Gắn user ID nếu có
  if (userModel?.id) {
    requestHeaders.set('x-user-id', userModel.id)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

/**
 * Middleware config — Chỉ áp dụng cho các route cần bảo vệ
 */
export const config = {
  matcher: [
    '/read/:path*',
    '/member/:path*',
    '/api/secure/:path*',
    '/api/content/:path*',
  ],
}
