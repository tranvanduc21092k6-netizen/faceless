/// <reference path="../pb_data/types.d.ts" />

/**
 * PocketBase JSVM Hook — Auto Upgrade Role on Payment
 * 
 * File này cần được đặt trong thư mục: pb_hooks/auto_upgrade_role.pb.js
 * (cùng cấp với file binary `pocketbase`)
 * 
 * Chức năng:
 *   - Lắng nghe sự kiện "After Update" trên collection 'payments'
 *   - Khi status được cập nhật thành 'completed'
 *   - Tự động nâng role của user (profile_id) lên 'paid'
 */

// Hook chạy SAU KHI một record trong 'payments' được cập nhật
onRecordAfterUpdateRequest((e) => {
    const record = e.record

    // Lấy status mới và cũ
    const newStatus = record.get("status")
    const oldStatus = record.originalCopy().get("status")

    // Chỉ xử lý khi status vừa chuyển sang 'completed'
    if (newStatus !== "completed" || oldStatus === "completed") {
        return
    }

    const profileId = record.get("profile_id")

    if (!profileId) {
        console.log("[Hook] payment " + record.id + " không có profile_id, bỏ qua.")
        return
    }

    try {
        // Lấy user record từ collection 'users'
        const user = $app.dao().findRecordById("users", profileId)

        // Chỉ nâng cấp nếu chưa phải paid hoặc admin
        const currentRole = user.get("role")
        if (currentRole === "paid" || currentRole === "admin") {
            console.log("[Hook] User " + profileId + " đã là " + currentRole + ", bỏ qua.")
            return
        }

        // Nâng role lên 'paid'
        user.set("role", "paid")
        $app.dao().saveRecord(user)

        console.log("[Hook] ✅ Đã nâng cấp user " + profileId + " lên role 'paid' (payment: " + record.id + ")")

    } catch (err) {
        console.error("[Hook] ❌ Lỗi khi nâng role user " + profileId + ": " + err.message)
    }

}, "payments") // Áp dụng cho collection 'payments'
