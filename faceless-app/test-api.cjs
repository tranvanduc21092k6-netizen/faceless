

async function runTest() {
  console.log("1. Authenticating with PocketBase to get token...");
  const authRes = await fetch("http://127.0.0.1:8090/api/collections/users/auth-with-password", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: 'test@faceless.org', password: 'TestUser123!' })
  });
  
  if (!authRes.ok) {
    console.error("Auth failed", await authRes.text());
    return;
  }
  
  const authData = await authRes.json();
  const token = authData.token;
  console.log("Logged in. Token:", token.substring(0, 20) + "...");

  // Tạo cookie pb_auth
  const authModel = authData.record;
  const cookieValue = JSON.stringify({ token, model: authModel });
  const pbAuthCookie = `pb_auth=${encodeURIComponent(cookieValue)}`;

  console.log("2. Calling /api/payment/create...");
  const createRes = await fetch("http://localhost:3000/api/payment/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': pbAuthCookie
    },
    body: JSON.stringify({ plan: 'monthly' })
  });

  const createData = await createRes.json();
  console.log("Create Payment Response:", createData);

  if (!createData.success) {
    console.error("Failed to create payment.");
    return;
  }

  const paymentId = createData.paymentId;

  console.log("3. Calling /api/payment/status/" + paymentId + "...");
  const statusRes = await fetch("http://localhost:3000/api/payment/status/" + paymentId, {
    headers: {
      'Cookie': pbAuthCookie
    }
  });

  const statusData = await statusRes.json();
  console.log("Status Response:", statusData);
}

runTest();
