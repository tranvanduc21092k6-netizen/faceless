const PocketBase = require('pocketbase/cjs');
async function run() {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const authRes = await fetch(`http://127.0.0.1:8090/api/admins/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: 'admin@faceless.org', password: 'AdminPassword123!' })
    });
    const authData = await authRes.json();
    const token = authData.token;
    
    const res = await fetch('http://127.0.0.1:8090/api/collections/episodes', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(JSON.stringify(data.schema, null, 2));
}
run().catch(console.error);
