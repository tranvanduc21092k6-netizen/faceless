import { createAdminPB } from '../../../../src/lib/pocketbase/admin'
import { cookies } from 'next/headers'
import { createServerPB } from '../../../../src/lib/pocketbase/server'

/**
 * POST /api/payment/create
 *
 * Tạo payment record với status='pending' khi user xác nhận đã chuyển khoản.
 * Endpoint này yêu cầu user đã đăng nhập (có session cookie).
 *
 * Body JSON:
 *   { plan: 'monthly' }
 *
 * Response:
 *   { success: true, paymentId: "xxx", referenceCode: "FACELESS P49 XXXX" }
 */
export async function POST(request) {
  try {
    // ── Xác thực user từ cookie session ──
    const cookieStore = await cookies()
    const pb = createServerPB(cookieStore)

    if (!pb.authStore.isValid || !pb.authStore.model) {
      return Response.json(
        { success: false, error: 'Bạn cần đăng nhập để thực hiện thanh toán.' },
        { status: 401 }
      )
    }

    const userId = pb.authStore.model.id
    const userRole = pb.authStore.model.role

    // Nếu đã là paid/admin, không cần tạo payment nữa
    if (userRole === 'paid' || userRole === 'admin') {
      return Response.json(
        { success: false, error: 'Tài khoản của bạn đã là Premium.' },
        { status: 400 }
      )
    }

    // ── Đọc body ──
    const body = await request.json().catch(() => ({}))
    const plan = body.plan || 'monthly'

    const PLAN_CONFIG = {
      monthly: { amount: 49000, label: 'Monthly Premium' },
    }
    const planInfo = PLAN_CONFIG[plan] || PLAN_CONFIG.monthly

    // ── Tạo reference code để user ghi vào nội dung CK ──
    // Format: FACELESS P49 XXXX (4 ký tự cuối của userId)
    const userCode = userId.slice(-4).toUpperCase()
    const referenceCode = `FACELESS P49 ${userCode}`

    // ── Tạo transaction_id duy nhất ──
    const transactionId = `TXN-${Date.now()}-${userId.slice(-6)}`

    // ── Ghi payment record với admin PB (vượt qua collection rules) ──
    const adminPb = await createAdminPB()

    const paymentRecord = await adminPb.collection('payments').create({
      profile_id: userId,
      transaction_id: transactionId,
      amount: planInfo.amount,
      status: 'pending',
      payment_gateway: 'momo_qr',
      // Lưu thêm reference code để admin có thể match
      notes: referenceCode,
    })

    return Response.json({
      success: true,
      paymentId: paymentRecord.id,
      transactionId,
      referenceCode,
      amount: planInfo.amount,
      plan: planInfo.label,
    })
  } catch (err) {
    console.error('[Payment Create] Lỗi:', err)
    return Response.json(
      { success: false, error: 'Lỗi hệ thống. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
