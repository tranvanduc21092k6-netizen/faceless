import { createAdminPB } from '../../../../src/lib/pocketbase/admin'

/**
 * POST /api/payment/webhook — Webhook Nhận Thông Báo Thanh Toán
 *
 * Endpoint machine-to-machine nhận thông báo từ cổng thanh toán.
 * Khi thanh toán thành công:
 *   1. Tạo record trong collection 'payments'
 *   2. Nâng cấp role người dùng từ 'user' → 'paid'
 *
 * Body JSON mong đợi:
 *   {
 *     profile_id: "user_id_in_pocketbase",
 *     transaction_id: "txn_abc123",
 *     amount: 199000,
 *     payment_gateway: "stripe|momo|vnpay",
 *     signature: "hmac_signature_for_verification"
 *   }
 *
 * Response:
 *   { success: true, message: "Thanh toán đã được xử lý." }
 *   { success: false, error: "..." }
 */
export async function POST(request) {
  try {
    // ── Đọc body ──
    const body = await request.json()
    const { profile_id, transaction_id, amount, payment_gateway, signature } = body

    // ── Validate trường bắt buộc ──
    if (!profile_id || !transaction_id || !amount || !payment_gateway) {
      return Response.json(
        { success: false, error: 'Thiếu trường bắt buộc: profile_id, transaction_id, amount, payment_gateway.' },
        { status: 400 }
      )
    }

    // ── Xác thực webhook signature ──
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET
    if (webhookSecret && signature) {
      // Tạo HMAC signature để so sánh
      const encoder = new TextEncoder()
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(webhookSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      )
      const data = encoder.encode(`${profile_id}:${transaction_id}:${amount}`)
      const signatureBuffer = await crypto.subtle.sign('HMAC', key, data)
      const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')

      if (signature !== expectedSignature) {
        return Response.json(
          { success: false, error: 'Chữ ký webhook không hợp lệ.' },
          { status: 401 }
        )
      }
    }

    // ── Tạo PocketBase Admin client ──
    const pb = await createAdminPB()

    // ── Bước 1: Ghi transaction vào collection 'payments' ──
    try {
      await pb.collection('payments').create({
        profile_id,
        transaction_id,
        amount: Number(amount),
        status: 'completed',
        payment_gateway,
      })
    } catch (err) {
      console.error('[Webhook] Lỗi ghi payment:', err.message)
      // Nếu transaction_id đã tồn tại → có thể là webhook duplicate
      if (err.message?.includes('unique') || err.status === 400) {
        return Response.json(
          { success: true, message: 'Giao dịch đã được xử lý trước đó (duplicate).' },
          { status: 200 }
        )
      }
      throw err
    }

    // ── Bước 2: Nâng cấp role người dùng → 'paid' ──
    try {
      const user = await pb.collection('users').getOne(profile_id)
      
      // Chỉ nâng cấp nếu chưa phải paid/admin
      if (user.role !== 'paid' && user.role !== 'admin') {
        await pb.collection('users').update(profile_id, {
          role: 'paid',
        })
      }
    } catch (err) {
      console.error('[Webhook] Lỗi cập nhật role user:', err.message)
      // Payment đã được ghi — log lỗi nhưng vẫn trả success
      // Admin có thể cập nhật role thủ công sau
    }

    return Response.json({
      success: true,
      message: 'Thanh toán đã được xử lý thành công.',
    })

  } catch (err) {
    console.error('[Webhook] Lỗi hệ thống:', err)
    return Response.json(
      { success: false, error: 'Lỗi hệ thống khi xử lý webhook.' },
      { status: 500 }
    )
  }
}
