import PocketBase from 'pocketbase';

const pbUrl = 'http://127.0.0.1:8090';
const pb = new PocketBase(pbUrl);

async function createTestUser() {
  const userData = {
    email: "test@faceless.org",
    emailVisibility: true,
    password: "TestUser123!",
    passwordConfirm: "TestUser123!",
    name: "Test User",
    role: "user"
  };

  console.log(`Đang kết nối tới PocketBase tại: ${pbUrl}...`);

  try {
    const record = await pb.collection('users').create(userData);
    console.log('\n🎉 THÀNH CÔNG: Đã tạo tài khoản test!');
    console.log('--------------------------------------');
    console.log(`ID:       ${record.id}`);
    console.log(`Email:    ${record.email}`);
    console.log(`Tên:      ${record.name}`);
    console.log(`Role:     ${record.role}`);
    console.log('--------------------------------------');
    console.log('Thông tin đăng nhập:');
    console.log('  Email:    test@faceless.org');
    console.log('  Password: TestUser123!');
    console.log('\nTruy cập: http://localhost:3000/login');
  } catch (error) {
    console.error('\n❌ THẤT BẠI:', error.message || error);
    if (error.response?.data) {
      console.error('Chi tiết:', JSON.stringify(error.response.data, null, 2));
    }
    console.log('\nGợi ý: Kiểm tra PocketBase đang chạy, hoặc email đã tồn tại rồi.');
  }
}

createTestUser();
