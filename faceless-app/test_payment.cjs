async function test() {
    const pbUrl = 'http://127.0.0.1:8090';
    // 1. Auth as Admin
    const authRes = await fetch(`${pbUrl}/api/admins/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: 'admin@faceless.org', password: 'AdminPassword123!' })
    });
    const authData = await authRes.json();
    const token = authData.token;
    
    // 2. Find a test user or the first user
    const usersRes = await fetch(`${pbUrl}/api/collections/users/records?perPage=1`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const usersData = await usersRes.json();
    const user = usersData.items[0];
    
    // Set user role to 'user'
    await fetch(`${pbUrl}/api/collections/users/records/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ role: 'user' })
    });

    console.log("User role reset to 'user' for", user.id);

    // 3. Create pending payment
    const createRes = await fetch(`${pbUrl}/api/collections/payments/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            profile_id: user.id,
            transaction_id: 'TXN-TEST-' + Date.now(),
            amount: 49000,
            status: 'pending',
            payment_gateway: 'momo_qr'
        })
    });
    const payment = await createRes.json();
    console.log("Created payment:", payment.id, "Status:", payment.status);

    // 4. Update payment to completed
    await new Promise(resolve => setTimeout(resolve, 500));
    const updateRes = await fetch(`${pbUrl}/api/collections/payments/records/${payment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'completed' })
    });
    const updatedPayment = await updateRes.json();
    console.log("Updated payment:", updatedPayment.id, "Status:", updatedPayment.status);

    // 5. Get user role
    const updatedUserRes = await fetch(`${pbUrl}/api/collections/users/records/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const updatedUser = await updatedUserRes.json();
    console.log("User role after update:", updatedUser.role);
}
test().catch(console.error);
