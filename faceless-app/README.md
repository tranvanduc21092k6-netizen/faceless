# FACELESS DIALECTICS - Next.js Application

Faceless Dialectics la mot ung dung media tri tue voi giao dien dark editorial, tap trung vao bai viet dai, thu vien audio, archive va luong thanh vien. Du an hien da duoc migrate sang Next.js App Router bang JavaScript.

## Stack

- Next.js 16 App Router
- React 19
- JavaScript, khong dung TypeScript
- TailwindCSS 3
- PocketBase cho auth/backend client
- Google Fonts: Playfair Display va DM Sans
- Material Symbols cho icon

## 🚀 Chạy dự án (Dành cho Team / Collaborators)

Cách dễ nhất và chuẩn nhất để chạy toàn bộ hệ thống (Next.js + PocketBase + Database) là sử dụng Docker.

### 1. Khởi chạy bằng Docker (Khuyên dùng)

Yêu cầu máy phải có [Docker](https://www.docker.com/) và Docker Compose.

```bash
# Đứng ở thư mục faceless-app, chạy lệnh:
docker-compose up -d --build
```

Hệ thống sẽ tự động build và chạy:
- **Trang web (Next.js):** [http://localhost:3000](http://localhost:3000)
- **Admin Backend (PocketBase):** [http://localhost:8090/_/](http://localhost:8090/_/)
  - *Tài khoản test:* `admin@faceless.org` / `AdminPassword123!`

Để dừng hệ thống: `docker-compose down`

---

### 2. Khởi chạy thủ công (Dev mode)

Nếu bạn muốn code và chạy môi trường dev trực tiếp không qua Docker:

**Terminal 1: Chạy Next.js**
```bash
npm install
npm run dev
```

**Terminal 2: Chạy PocketBase**
*(Đảm bảo máy có sẵn [binary pocketbase](https://pocketbase.io/docs/))*. Vì data đã được đẩy lên GitHub trong thư mục `pb_data`, bạn chỉ cần chạy:
```bash
./pocketbase serve --http="0.0.0.0:8090"
```

## Biến môi trường

```env
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

## Cau truc chinh

```
faceless-app/
├── app/                         # Next.js App Router routes va layouts
│   ├── layout.js                 # Root layout, global CSS, font/icon links, AuthProvider
│   ├── providers.js              # Client providers
│   ├── (site)/                   # Routes co Navbar + Footer
│   ├── admin/page.js             # Admin console standalone
│   └── registration-success/     # Registration success standalone
├── src/
│   ├── views/                    # Page view components duoc route wrappers import
│   ├── components/               # Layout, UI, modal components
│   ├── context/AuthContext.jsx   # PocketBase auth context
│   ├── lib/pocketbase.js         # PocketBase client
│   └── index.css                 # Tailwind + global styles
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Routes

- `/` - Landing/member dashboard
- `/archive` - Kho luu tru bai viet
- `/library` - Thu vien audio/tai lieu
- `/article/[slug]` - Trang bai viet dong
- `/listen` - Trang audio playback
- `/login`, `/register`, `/forgot-passphrase` - Auth flows
- `/manifesto` - Quan diem/chinh sach
- `/admin` - Admin console, yeu cau user co `role: 'admin'`
- `/registration-success` - Trang thanh cong standalone

## Admin PocketBase

Script `create-admin.js` tao tai khoan admin mau tren PocketBase local. Hay doi thong tin dang nhap trong file nay truoc khi dung that.

# run pocketbase
```bash
./pocketbase serve --http="0.0.0.0:8090"
```