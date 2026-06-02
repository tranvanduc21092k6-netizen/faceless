const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('http://127.0.0.1:8090');
pb.authStore.save("fake-token", { id: "123", role: "paid" });
const cookieStr = pb.authStore.exportToCookie();
console.log("Cookie exported:", cookieStr);
// Simulate next.js cookies().get()
const cookieMatch = cookieStr.match(/pb_auth=([^;]+)/);
let rawValue = cookieMatch[1];
console.log("Raw value in header:", rawValue);
// In Next.js, cookies().get('pb_auth').value might be decoded.
const decodedValue = decodeURIComponent(rawValue);
console.log("Decoded value:", decodedValue);

// Test loadFromCookie
const pb2 = new PocketBase('http://127.0.0.1:8090');
try {
  pb2.authStore.loadFromCookie(`pb_auth=${decodedValue}`);
  console.log("Loaded from decoded:", pb2.authStore.isValid);
} catch (e) {
  console.log("Error loading decoded:", e.message);
}

const pb3 = new PocketBase('http://127.0.0.1:8090');
try {
  pb3.authStore.loadFromCookie(`pb_auth=${rawValue}`);
  console.log("Loaded from raw:", pb3.authStore.isValid);
} catch (e) {
  console.log("Error loading raw:", e.message);
}
