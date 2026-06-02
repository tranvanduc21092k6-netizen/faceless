const PocketBase = require('pocketbase/cjs');
// Create a dummy JWT token that expires in the future
const header = Buffer.from(JSON.stringify({alg:"HS256",typ:"JWT"})).toString('base64');
const payload = Buffer.from(JSON.stringify({id:"123",exp: Math.floor(Date.now()/1000) + 3600})).toString('base64');
const fakeJwt = header + "." + payload + ".signature";

const pb = new PocketBase('http://127.0.0.1:8090');
pb.authStore.save(fakeJwt, { id: "123", role: "paid" });
const cookieStr = pb.authStore.exportToCookie();
console.log("Cookie exported:", cookieStr);

const cookieMatch = cookieStr.match(/pb_auth=([^;]+)/);
let rawValue = cookieMatch[1];
const decodedValue = decodeURIComponent(rawValue);

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
