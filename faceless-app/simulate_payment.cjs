const PocketBase = require('pocketbase/cjs');

async function approveLatestPayment() {
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    // Auth bypass trick for local admin auth since pb.admins was removed in v0.26
    const authRes = await fetch(`http://127.0.0.1:8090/api/admins/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: 'admin@faceless.org', password: 'AdminPassword123!' })
    });
    const authData = await authRes.json();
    if (!authData.token) {
        console.error("❌ Authentication failed. Check your admin credentials in the script.");
        return;
    }
    
    const token = authData.token;
    
    console.log("🔍 Đang tìm các giao dịch 'pending'...");
    
    // Lấy 1 payment pending mới nhất
    const paymentsRes = await fetch(`http://127.0.0.1:8090/api/collections/payments/records?filter=(status='pending')&sort=-created&perPage=1`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const paymentsData = await paymentsRes.json();
    
    if (!paymentsData.items || paymentsData.items.length === 0) {
        console.log("✅ Không có giao dịch 'pending' nào.");
        return;
    }
    
    const payment = paymentsData.items[0];
    console.log(`⏳ Tìm thấy giao dịch: ${payment.transaction_id} (User ID: ${payment.profile_id})`);
    
    // Cập nhật thành completed
    const updateRes = await fetch(`http://127.0.0.1:8090/api/collections/payments/records/${payment.id}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'completed' })
    });
    
    if (updateRes.ok) {
        console.log("✅ Đã phê duyệt (chuyển sang 'completed'). Hook nâng quyền sẽ tự động kích hoạt!");
        
        // Kiểm tra lại role của user
        setTimeout(async () => {
            const userRes = await fetch(`http://127.0.0.1:8090/api/collections/users/records/${payment.profile_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const userData = await userRes.json();
            console.log(`👤 User Role hiện tại của ${userData.email}: ${userData.role}`);
        }, 1000);
    } else {
        console.error("❌ Lỗi khi cập nhật giao dịch.");
    }
}

approveLatestPayment().catch(console.error);
