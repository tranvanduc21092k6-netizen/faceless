import { createAdminPB } from '../../../../../src/lib/pocketbase/admin'

/**
 * GET /api/payment/status/[paymentId]
 *
 * Poll endpoint để frontend kiểm tra trạng thái thanh toán.
 * Frontend sẽ gọi mỗi 5 giây từ trang /payment-processing.
 *
 * Response:
 *   { success: true, status: 'pending'|'completed'|'failed', isPaid: boolean }
 */
export async function GET(request, { params }) {
  try {
    const { paymentId } = await params

    if (!paymentId) {
      return Response.json(
        { success: false, error: 'Thiếu paymentId.' },
        { status: 400 }
      )
    }

    const adminPb = await createAdminPB()

    // ── Lấy payment record ──
    let paymentRecord
    try {
      paymentRecord = await adminPb.collection('payments').getOne(paymentId)
    } catch {
      return Response.json(
        { success: false, error: 'Không tìm thấy giao dịch.' },
        { status: 404 }
      )
    }

    const paymentStatus = paymentRecord.status // 'pending' | 'completed' | 'failed'
    const isPending = paymentStatus === 'pending'
    const isCompleted = paymentStatus === 'completed'
    const isFailed = paymentStatus === 'failed'

    // ── Nếu payment đã completed → kiểm tra thêm role user ──
    let isPaid = false
    if (isCompleted && paymentRecord.profile_id) {
      try {
        const userRecord = await adminPb.collection('users').getOne(paymentRecord.profile_id)
        isPaid = userRecord.role === 'paid' || userRecord.role === 'admin'
      } catch {
        // Nếu không lấy được user, coi payment completed là đủ
        isPaid = isCompleted
      }
    }

    return Response.json({
      success: true,
      status: paymentStatus,
      isPaid,
      isPending,
      isCompleted,
      isFailed,
    })
  } catch (err) {
    console.error('[Payment Status] Lỗi:', err)
    return Response.json(
      { success: false, error: 'Lỗi hệ thống.' },
      { status: 500 }
    )
  }
}
