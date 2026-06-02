const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('http://127.0.0.1:8090');
const fakeJwt = Buffer.from(JSON.stringify({alg:"HS256",typ:"JWT"})).toString('base64') + "." + Buffer.from(JSON.stringify({id:"123",exp: Math.floor(Date.now()/1000) + 3600})).toString('base64') + ".sig";
pb.authStore.save(fakeJwt, { id: "123", role: "paid" });
console.log("model:", !!pb.authStore.model);
console.log("record:", !!pb.authStore.record);
