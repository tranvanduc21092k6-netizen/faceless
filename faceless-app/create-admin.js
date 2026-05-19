import PocketBase from 'pocketbase';

// Lấy URL từ .env nếu có, không thì dùng mặc định
const pbUrl = 'http://127.0.0.1:8090'; 
const pb = new PocketBase(pbUrl);

async function createAdmin() {
  // Bạn có thể sửa đổi thông tin Admin ở đây
  const adminData = {
    email: "admin@faceless.org",
    emailVisibility: true,
    password: "AdminPassword123!",
    passwordConfirm: "AdminPassword123!",
    name: "Quản Trị Viên",
    role: "admin" // Thiết lập vai trò là admin
  };

  console.log(`Đang kết nối tới PocketBase tại: ${pbUrl}...`);
  
  try {
    const record = await pb.collection('users').create(adminData);
    console.log('\n🎉 THÀNH CÔNG: Đã tạo tài khoản Admin!');
    console.log('--------------------------------------');
    console.log(`ID: ${record.id}`);
    console.log(`Email: ${record.email}`);
    console.log(`Tên: ${record.name}`);
    console.log(`Vai trò (Role): ${record.role}`);
    console.log('--------------------------------------');
    console.log('Bây giờ bạn đã có thể dùng tài khoản này đăng nhập trên web.');
  } catch (error) {
    console.error('\n❌ THẤT BẠI: Không thể tạo tài khoản Admin.');
    console.error('Lý do:', error.message || error);
    if (error.response?.data) {
      console.error('Chi tiết lỗi validate từ PocketBase:', JSON.stringify(error.response.data, null, 2));
    }
    console.log('\nGợi ý: Hãy kiểm tra xem Server PocketBase đã được bật chưa, hoặc Email này đã được đăng ký trước đó chưa.');
  }
}

createAdmin();
