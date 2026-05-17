# FACELESS DIALECTICS — React Frontend Application

> *A platform of deep inquiry and dialectical synthesis. For the discerning mind.*

Faceless Dialectics là một nền tảng media trí tuệ với phong cách **Academic Magazine × Mysterious Night**. Ứng dụng được xây dựng bằng React (Vite) với thiết kế dark-mode editorial tối giản, sử dụng Matte Gold làm điểm nhấn.

---

## 📋 Mục lục

- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt & Chạy](#-cài-đặt--chạy)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Design System](#-design-system)
- [Routing & Pages](#-routing--pages)
- [Chi tiết Components](#-chi-tiết-components)
- [Chi tiết Pages](#-chi-tiết-pages)
- [Tính năng tương tác](#-tính-năng-tương-tác)

---

## 🛠 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| **React** | 19.x | UI framework |
| **Vite** | 8.x | Build tool & dev server |
| **TailwindCSS** | 3.x | Utility-first CSS framework |
| **React Router** | 6.x | Client-side routing (SPA) |
| **Google Fonts** | — | Playfair Display + DM Sans |
| **Material Symbols** | Outlined | Icon system |

---

## 🚀 Cài đặt & Chạy

```bash
# Clone repo
git clone <your-repo-url>
cd faceless-app

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
# → App chạy tại http://localhost:5173/

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Cấu trúc dự án

```
faceless-app/
├── index.html                          # Entry HTML — load Google Fonts & Material Symbols
├── tailwind.config.js                  # Design tokens (colors, typography, spacing)
├── postcss.config.js                   # PostCSS config cho TailwindCSS
├── vite.config.js                      # Vite build config
├── package.json                        # Dependencies & scripts
│
├── public/                             # Static assets
│
└── src/
    ├── main.jsx                        # React entry point — render App vào #root
    ├── App.jsx                         # Router setup — định nghĩa tất cả routes
    ├── index.css                       # Global CSS — base styles, dividers, animations
    │
    ├── components/
    │   ├── layout/                     # Layout components (dùng chung trên mọi trang)
    │   │   ├── Navbar.jsx              # Navigation bar cố định trên cùng
    │   │   ├── Footer.jsx              # Footer với links và copyright
    │   │   └── Layout.jsx              # Wrapper: Navbar + Outlet + Footer
    │   │
    │   ├── ui/                         # Reusable UI components
    │   │   ├── DialecticDivider.jsx    # Đường phân cách biện chứng (3 biến thể)
    │   │   ├── Tag.jsx                 # Tag/chip cho categories
    │   │   ├── PullQuote.jsx           # Trích dẫn nổi bật
    │   │   ├── AudioPlayer.jsx         # Player nhúng inline
    │   │   ├── AudioPlaybackBar.jsx    # Thanh phát audio cố định dưới cùng
    │   │   ├── ArchiveCard.jsx         # Card bài viết (khóa/mở khóa)
    │   │   ├── EpisodeCard.jsx         # Card tập podcast (featured + sidebar)
    │   │   └── ResourceItem.jsx        # Item tài liệu với nút download
    │   │
    │   └── modals/
    │       └── MembershipModal.jsx     # Modal đăng ký thành viên (2 biến thể)
    │
    └── pages/
        ├── LandingPage.jsx             # Trang chủ — hero, audio preview, email capture
        ├── ArchivePage.jsx             # Kho lưu trữ bài viết
        ├── LibraryPage.jsx             # Thư viện thành viên — episodes + tài liệu
        ├── ArticlePage.jsx             # Trang đọc bài viết chi tiết
        └── AudioPlaybackPage.jsx       # Trang phát audio toàn màn hình
```

---

## 🎨 Design System

### Màu sắc (Color Palette)

Hệ thống màu dựa trên **Material Design 3 Dark Mode** với hơn 40 color tokens.

| Token | Hex | Mô tả |
|---|---|---|
| `background` | `#131313` | Nền chính (near-black) |
| `surface` | `#131313` | Bề mặt container |
| `on-surface` | `#e5e2e1` | Text chính (warm cream) |
| `on-surface-variant` | `#d0c5b5` | Text phụ |
| `primary` | `#e5c487` | Matte Gold — màu nhấn chính |
| `primary-container` | `#c8a96e` | Gold đậm hơn cho buttons |
| `outline-variant` | `#4d463a` | Viền và đường kẻ |
| `surface-container-low` | `#1c1b1b` | Card background |
| `surface-container-high` | `#2a2a2a` | Tag/chip background |

**Triết lý**: Không dùng shadows. Depth được tạo bằng sự chênh lệch tonal giữa các lớp surface (`#0A0A0A` → `#111111` → `#222222`).

Cấu hình trong `tailwind.config.js` → `theme.extend.colors`.

### Typography

| Style | Font | Size | Sử dụng |
|---|---|---|---|
| `display-lg` | Playfair Display 600 | 72px | Hero headlines |
| `headline-lg` | Playfair Display 500 | 48px | Page titles |
| `headline-md` | Playfair Display 500 | 32px | Section headings |
| `pull-quote` | Playfair Display 400 | 36px | Trích dẫn nổi bật |
| `body-lg` | DM Sans 400 | 18px | Body text chính |
| `body-md` | DM Sans 400 | 16px | Body text phụ |
| `label-caps` | DM Sans 700 | 12px | Labels, tags, nav items |

**Cách dùng trong Tailwind**: `font-display-lg text-display-lg` (font-family + font-size).

### Spacing

| Token | Giá trị | Mô tả |
|---|---|---|
| `unit` | 8px | Baseline grid đơn vị |
| `gutter` | 32px | Khoảng cách giữa columns |
| `section-gap` | 120px | Khoảng cách giữa sections |
| `margin-mobile` | 20px | Margin trái/phải mobile |
| `margin-desktop` | 80px | Margin trái/phải desktop |
| `container-max` | 1120px | Max-width container |

---

## 🗺 Routing & Pages

Định nghĩa trong `src/App.jsx`:

```jsx
<BrowserRouter>
  <Routes>
    <Route element={<Layout />}>          {/* Layout wrapper cho tất cả pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/archive" element={<ArchivePage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
      <Route path="/listen" element={<AudioPlaybackPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

- **`Layout`** component wrap tất cả pages với `Navbar` (trên) + `Footer` (dưới)
- **`Outlet`** từ React Router render page content ở giữa
- Param `:slug` trong `/article/:slug` cho phép dynamic article URLs

---

## 🧩 Chi tiết Components

### Layout Components (`src/components/layout/`)

#### `Navbar.jsx`
- **Vị trí**: Fixed top (`position: fixed; top: 0`)
- **Logo**: "FACELESS" — link về trang chủ `/`
- **Navigation**: Archive, Library, Manifesto — highlight active route bằng `useLocation()` hook
- **Actions**: Login + Subscribe buttons
- **Mobile**: Hamburger menu toggle với `useState` — hiện dropdown menu khi click
- **State**: `mobileMenuOpen` — boolean điều khiển menu mobile

#### `Footer.jsx`
- Links: Privacy, Terms, Institutional Access, Contact
- Copyright text
- Responsive: stack dọc trên mobile, ngang trên desktop

#### `Layout.jsx`
- Wrapper component sử dụng React Router `<Outlet />`
- Thêm class `dark` cho Tailwind dark mode
- Cấu trúc: `Navbar → {children via Outlet} → Footer`

---

### UI Components (`src/components/ui/`)

#### `DialecticDivider.jsx`
Đường phân cách biện chứng — biểu tượng thị giác đặc trưng của platform.

| Prop | Giá trị | Hiển thị |
|---|---|---|
| `variant="diamond"` | (default) | Đường ngang + hình thoi vàng lồng nhau |
| `variant="line"` | — | Hai đường gold + hình vuông xoay 45° ở giữa |
| `variant="simple"` | — | Đường gold với hai chấm tròn ở hai đầu |

CSS cho `diamond` variant được định nghĩa trong `index.css` với `::before` và `::after` pseudo-elements.

#### `Tag.jsx`
- Props: `children` (text content)
- Style: Background `surface-container-high`, border, uppercase, letter-spacing rộng
- Dùng cho: Category tags trên bài viết (e.g., "BẢN NGÃ", "VÔ ĐỊNH")

#### `PullQuote.jsx`
- Props: `children` (nội dung trích dẫn), `citation` (nguồn trích dẫn)
- Style: Font Playfair Display italic, centered, text lớn
- Dùng cho: Highlight quotes quan trọng trên landing page

#### `AudioPlayer.jsx`
Player audio nhúng inline trong landing page.

- **State**: `isPlaying` (boolean), `progress` (0-100)
- **UI**: Nút play/pause tròn (gold) + thông tin episode + progress bar
- **Progress bar**: Hiển thị seeker dot khi hover (CSS `group-hover:opacity-100`)
- **Icon**: Material Symbols với `FILL: 1` cho filled style

#### `AudioPlaybackBar.jsx`
Thanh phát audio cố định dưới cùng màn hình — slide up khi play.

- **Props**: `isVisible`, `onClose`, `episodeTitle`
- **State**: `isPlaying`, `progress` (0-100)
- **Animation**: `translate-y-full` → `translate-y-0` (CSS transition 500ms)
- **Simulated playback**: `setInterval` tăng progress 0.1% mỗi giây
- **Controls**: Play/Pause, Rewind 15s, Forward 15s, Close
- **Cleanup**: `useEffect` cleanup function clear interval khi unmount

#### `ArchiveCard.jsx`
Card bài viết trong Archive page — có 2 trạng thái: khóa và mở khóa.

- **Props**: `title`, `tags[]`, `excerpt`, `isLocked`, `onLockedClick`
- **Locked state**: Icon lock filled, CTA "Đăng nhập để đọc tiếp", click → trigger modal
- **Unlocked state**: Icon lock_open, CTA "Đọc bài luận" → link đến article
- **Visual**: Gradient fade ở cuối excerpt (`bg-gradient-to-t from-surface-container-low`)
- **Hover**: Border chuyển sang primary gold

#### `EpisodeCard.jsx`
Card episode podcast — có 2 biến thể:

| Prop | Biến thể | Layout |
|---|---|---|
| `isFeatured=true` | Featured | 8-column, badge "Latest Transmission", description |
| `isFeatured=false` | Sidebar | Compact, chỉ episode number + title + duration |

- **Props**: `episode`, `title`, `description`, `duration`, `isFeatured`, `onPlay`
- **onPlay**: Callback function khi click — trigger AudioPlaybackBar

#### `ResourceItem.jsx`
Item trong danh sách tài liệu/monographs.

- **Props**: `title`, `description`, `format`, `size`, `icon`
- **Download states** (managed bằng `useState`):
  1. `idle` → Hiện icon download + text "Download"
  2. `downloading` → Spinner animation + "Downloading..."
  3. `done` → Check icon + "Downloaded" (border chuyển gold)
- **Transition**: `idle → downloading` (click) → `done` (sau 2s setTimeout)

---

### Modal Components (`src/components/modals/`)

#### `MembershipModal.jsx`
Modal đăng ký thành viên — overlay toàn màn hình.

- **Props**: `isOpen`, `onClose`, `variant`
- **Conditional render**: `if (!isOpen) return null`

| Variant | Layout | Sử dụng |
|---|---|---|
| `"default"` | Split-pane: decorative panel (1/3) + form (2/3) | Khi đọc bài bị khóa |
| `"archive"` | Centered compact card | Khi click card trong Archive |

- **Form**: Email input + "Join the Dialectic" button
- **Backdrop**: `bg-black/80 backdrop-blur-sm` (archive) hoặc `bg-[#0A0A0A]/90 backdrop-blur-md` (default)
- **Decorative panel** (default variant): Gradient background + vertical gold line + rotated diamond — tạo aesthetic trừu tượng
- **Animation**: `animate-fade-in` khi mở

---

## 📄 Chi tiết Pages

### `LandingPage.jsx` — Trang chủ (`/`)

Kết hợp 3 source components: `landing_page` + `hero_scroll_state` + `email_success_state`.

**Sections** (từ trên xuống):
1. **Hero**: Tiêu đề tiếng Việt lớn + CTA "Nghe thử bản rút gọn"
2. **3 Vết Đau**: Grid 3 cột — Ảo Tưởng Sự Thật / Cái Chết Của Tính Chân Thực / Nền Dân Chủ Của Sự Ngu Dốt
3. **Dialectic Divider**: Gold line với dots
4. **Audio Player**: `<AudioPlayer />` component với `id="preview"` (anchor link từ hero)
5. **Pull-Quote**: Trích dẫn italic lớn
6. **Email Capture**: Form email → success state

**State management**:
- `email` (string) — giá trị input
- `emailSubmitted` (boolean) — toggle giữa form và success message
- Success state hiện animation `animate-fade-in` + icon `mark_email_read`

---

### `ArchivePage.jsx` — Kho lưu trữ (`/archive`)

Kết hợp: `archive_hub` + `archive_membership_modal`.

- **Header**: "Dialectical Archives" + mô tả
- **Grid**: 2 cột × 4 cards (3 locked + 1 unlocked)
- **Data**: Array `archiveItems` chứa title, tags, excerpt, isLocked
- **Modal trigger**: Click card locked → `setModalOpen(true)` → hiện `<MembershipModal variant="archive" />`
- **Load More**: Button "Load Historical Records" (static)

---

### `LibraryPage.jsx` — Thư viện (`/library`)

Kết hợp: `member_dashboard` + `member_dashboard_active_playback`.

**Sections**:
1. **Header**: "The Library" + mô tả
2. **Dialectic Divider**: Variant `line`
3. **Full Episodes**: Bento grid 12-col
   - Featured episode: 8 columns
   - 2 sidebar episodes: 4 columns (stacked)
4. **Monographs**: Danh sách tài liệu với download buttons

**Audio playback flow**:
1. User click episode card → `handlePlay(title)` called
2. `setCurrentEpisode(title)` + `setPlayerVisible(true)`
3. `<AudioPlaybackBar>` slide up từ dưới với transition
4. User click close → `setPlayerVisible(false)` → bar slide down

---

### `ArticlePage.jsx` — Đọc bài (`/article/:slug`)

Kết hợp: `deep_reading` + `deep_reading_mobile` + `share_feedback_state`.

**Desktop view** (`hidden md:block`):
- Floating sidebar bên trái: Copy Link, Share, Bookmark buttons
- Article content: Tags, title, date, reading time, body text, pull-quotes
- Link copied toast notification

**Mobile view** (`md:hidden`):
- Compact header: Back button, bookmark, more menu
- Full-width article content với first-letter drop cap
- Thesis/Antithesis dialectical argument block
- Fixed bottom action bar: Endorse, Discuss, Share

**Scroll progress**:
```jsx
useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```
- Progress bar: `position: fixed; top: 0` với `width` dynamic theo `readProgress`

**Copy link toast**:
- `handleCopyLink()` → `navigator.clipboard.writeText()` → show toast 3s → auto-hide

---

### `AudioPlaybackPage.jsx` — Phát audio (`/listen`)

- Full-page audio player centered
- Episode title + description
- Player card với border primary gold + subtle diagonal line pattern background
- Controls: Play/Pause, Rewind 10s, Forward 10s, Volume
- Progress bar với hover seeker dot
- Tags: Synthesis, Model: OMEGA-7, Duration: 5M

---

## ⚡ Tính năng tương tác

| Tính năng | Component | State | Mô tả |
|---|---|---|---|
| Email capture | LandingPage | `emailSubmitted` | Form → success message animation |
| Membership modal | ArchivePage + MembershipModal | `modalOpen` | Click locked card → modal overlay |
| Audio playback | LibraryPage + AudioPlaybackBar | `playerVisible`, `isPlaying`, `progress` | Bottom bar slide up + simulated progress |
| Download states | ResourceItem | `downloadState` | idle → downloading (spinner) → done (check) |
| Scroll progress | ArticlePage | `readProgress` | Fixed top bar width = scroll % |
| Copy link toast | ArticlePage | `showToast` | 3s auto-dismiss notification |
| Mobile menu | Navbar | `mobileMenuOpen` | Hamburger toggle dropdown |
| Play/Pause toggle | AudioPlayer, AudioPlaybackBar, AudioPlaybackPage | `isPlaying` | Icon swap play_arrow ↔ pause |

---

## 📝 Ghi chú kỹ thuật

### Tailwind Custom Classes
- `font-display-lg text-display-lg` — kết hợp font-family + font-size custom
- `px-margin-mobile md:px-margin-desktop` — responsive padding
- `max-w-container-max` — giới hạn width nội dung
- `mt-section-gap` — khoảng cách lớn giữa sections

### CSS Custom Classes (trong `index.css`)
- `.card-surface` / `.card-border` — style cho cards (`#111111` bg + `#222222` border)
- `.dialectic-divider` — pseudo-elements tạo hình thoi
- `.dialectic-divider-simple` — đường gold với dots
- `.animate-fade-in` — keyframe animation fadeIn

### Font Loading
Fonts được load qua `<link>` tags trong `index.html` (không dùng CSS `@import`) để đảm bảo load nhanh và không bị block bởi CORS.

---

## 📜 License

© 2024 FACELESS DIALECTICS. FOR THE DISCERNING MIND.
