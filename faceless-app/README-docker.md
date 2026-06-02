# Faceless Media Platform

Dự án này đã được đóng gói hoàn chỉnh bằng Docker, bao gồm cả Frontend (Next.js) và Backend (PocketBase) kèm theo dữ liệu mẫu sẵn có.

## 🚀 Hướng dẫn khởi chạy (Dành cho người nhận)

### Yêu cầu hệ thống
- Máy tính cần cài đặt sẵn **Docker** và **Docker Compose** (Khuyến nghị cài [Docker Desktop](https://www.docker.com/products/docker-desktop/)).

### Các bước chạy dự án

1. Mở Terminal (hoặc Command Prompt / PowerShell) và trỏ vào thư mục này (`faceless-app`).
2. Chạy lệnh sau để build và khởi động toàn bộ hệ thống:

```bash
docker-compose up -d --build
```

3. Chờ khoảng 1-2 phút để Docker tự động tải Image và Build Next.js.
4. Khi quá trình hoàn tất, bạn có thể truy cập hệ thống qua trình duyệt:

- **Giao diện Website (Frontend):** [http://localhost:3000](http://localhost:3000)
- **Trang Quản trị Backend (PocketBase):** [http://localhost:8090/_/](http://localhost:8090/_/)

### Thông tin đăng nhập Quản trị viên (Admin PocketBase)
- **Email:** `admin@faceless.org`
- **Mật khẩu:** `AdminPassword123!`

### Cách dừng hệ thống
Để dừng server, hãy chạy lệnh sau trong cùng thư mục:
```bash
docker-compose down
```

---
*Lưu ý: Toàn bộ dữ liệu bài viết, hook nâng quyền và cấu hình đã được đính kèm sẵn trong thư mục `pb_data` và `pb_hooks`.*
