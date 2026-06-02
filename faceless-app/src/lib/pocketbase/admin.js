import PocketBase from 'pocketbase'

/**
 * createAdminPB — Tạo PocketBase client với quyền Admin
 *
 * Dùng cho thao tác server-to-server (webhook, cron, migration)
 * mà cần bypass các quy tắc bảo mật của collection.
 *
 * Biến môi trường cần thiết:
 *   POCKETBASE_URL       — URL PocketBase server (không public)
 *   PB_ADMIN_EMAIL       — Email admin PocketBase
 *   PB_ADMIN_PASSWORD    — Mật khẩu admin PocketBase
 *
 * Cách dùng:
 *   const pb = await createAdminPB()
 *   await pb.collection('users').update(userId, { role: 'paid' })
 *
 * @returns {Promise<PocketBase>} — Instance PocketBase đã xác thực admin
 */
export async function createAdminPB() {
  const pbUrl = process.env.POCKETBASE_URL || process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'
  const pb = new PocketBase(pbUrl)
  pb.autoCancellation(false)

  const email = process.env.PB_ADMIN_EMAIL
  const password = process.env.PB_ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error(
      '[PB Admin] Thiếu biến môi trường PB_ADMIN_EMAIL hoặc PB_ADMIN_PASSWORD. ' +
      'Vui lòng kiểm tra file .env'
    )
  }

  try {
    // SDK v0.26 không còn pb.admins, nhưng server là v0.22 (dùng /api/admins).
    // Ta gọi trực tiếp REST API để lấy admin token và set vào pb
    const authRes = await fetch(`${pbUrl}/api/admins/auth-with-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: email, password: password })
    });
    
    if (!authRes.ok) {
      throw new Error(`Auth API error: ${authRes.statusText}`);
    }
    
    const authData = await authRes.json();
    
    // Set token vào authStore để dùng cho các request tiếp theo của Admin
    pb.authStore.save(authData.token, authData.admin);
    
  } catch (err) {
    throw new Error(
      `[PB Admin] Không thể xác thực admin: ${err.message}. ` +
      'Kiểm tra email/mật khẩu admin trong .env'
    )
  }

  return pb
}

export default createAdminPB
