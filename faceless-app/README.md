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

## Chay du an

```bash
cd faceless-app
npm install
npm run dev
```

App mac dinh chay tai `http://localhost:3000`.

Build production:

```bash
npm run build
npm run start
```

## Bien moi truong

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
