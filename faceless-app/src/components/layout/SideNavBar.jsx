'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

/**
 * SideNavBar — Sidebar cố định bên trái cho STATE B (Premium Reader)
 *
 * Tái hiện thiết kế từ code.html (dòng 148-167):
 *   - w-20, fixed left-0 top-0 h-full
 *   - bg-surface-container-lowest (#0e0e0e)
 *   - border-r border-outline-variant
 *   - Icon dọc: home, book, person, logout
 *   - Cạnh sắc: 0px corner radii (rounded-none)
 *   - Icon Premium: auto_awesome (Matte Gold) — chỉ hiển thị khi role=user
 *
 * Mobile: thanh trên cùng với nút hamburger
 */
export default function SideNavBar() {
  const pathname = usePathname()
  const { isAuthenticated, logout, isPaid, user } = useAuth()

  const isActive = (path) => pathname === path

  // Chỉ hiển thị upgrade icon khi user đã login nhưng chưa là paid/admin
  const showUpgradeIcon = isAuthenticated && !isPaid

  const navItems = [
    { path: '/', icon: 'home', title: 'Trang Chủ' },
    { path: '/library', icon: 'book', title: 'Thư Viện' },
    { path: '/archive', icon: 'inventory_2', title: 'Kho Lưu Trữ' },
  ]

  return (
    <>
      {/* ── MOBILE: Top App Bar ── */}
      <header
        id="sidebar-mobile-header"
        className="md:hidden bg-[#131313]/90 backdrop-blur-md fixed top-0 left-0 w-full h-16 flex items-center justify-between px-5 z-50 border-b border-[#4d463a]"
      >
        <Link
          href="/"
          className="font-headline-md text-headline-md text-primary tracking-tight"
        >
          F
        </Link>
        <div className="flex items-center gap-2">
          {/* Premium upgrade icon — mobile */}
          {showUpgradeIcon && (
            <Link
              href="/upgrade"
              title="Nâng cấp Premium"
              className="relative p-2 transition-all duration-200 group"
              style={{ borderRadius: 0 }}
            >
              <span
                className="material-symbols-outlined text-[#C8A96E]"
                style={{ textShadow: '0 0 10px rgba(200, 169, 110, 0.4)' }}
              >
                auto_awesome
              </span>
              {/* Pulse dot indicator */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C8A96E] rounded-full animate-pulse" />
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 p-2"
              title="Đăng Xuất"
            >
              <span className="material-symbols-outlined" data-icon="logout">logout</span>
            </button>
          )}
          <Link
            href="/"
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 p-2"
            title="Trang Chủ"
          >
            <span className="material-symbols-outlined" data-icon="home">home</span>
          </Link>
        </div>
      </header>

      {/* ── DESKTOP: Fixed Left Sidebar ── */}
      <nav
        id="sidebar-desktop-nav"
        className="bg-[#0e0e0e] fixed left-0 top-0 h-full w-20 hidden md:flex flex-col items-center py-8 border-r border-[#4d463a] z-40 justify-between"
        style={{ borderRadius: 0 }}
      >
        {/* Phần trên: Logo + Nav Icons */}
        <div className="flex flex-col items-center space-y-8">
          {/* Logo "F" */}
          <Link
            href="/"
            className="font-headline-md text-primary text-xl font-bold tracking-tight mb-4 hover:opacity-80 transition-opacity"
          >
            F
          </Link>

          {/* Navigation Icons */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              title={item.title}
              className={`p-2 transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-primary scale-110'
                  : 'text-[#d0c5b5] hover:bg-[#353534] hover:text-primary'
              }`}
              style={{ borderRadius: 0 }}
            >
              <span
                className="material-symbols-outlined"
                data-icon={item.icon}
                style={{
                  fontVariationSettings: isActive(item.path)
                    ? "'FILL' 1"
                    : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
            </Link>
          ))}

          {/* ── Premium Upgrade Icon ── */}
          {showUpgradeIcon && (
            <Link
              href="/upgrade"
              title="Nâng cấp Premium"
              className="nav-item group relative flex items-center justify-center w-12 h-12 hover:bg-[#353534] transition-all duration-200"
              style={{ borderRadius: 0 }}
              id="sidebar-upgrade-icon"
            >
              <span
                className="material-symbols-outlined text-[#C8A96E] transition-colors duration-200"
                style={{ textShadow: '0 0 10px rgba(200, 169, 110, 0.3)' }}
              >
                auto_awesome
              </span>

              {/* Pulse dot */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C8A96E] rounded-full animate-pulse" />

              {/* Tooltip */}
              <div
                className="nav-tooltip absolute left-14 bg-[#353534] text-[#e5c487] px-3 py-1.5 font-label-caps text-[11px] whitespace-nowrap shadow-lg border border-[#4d463a] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest"
                style={{ borderRadius: 0, transform: 'translateX(-10px)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                Nâng cấp Premium
              </div>
            </Link>
          )}

          {/* Person / Profile icon */}
          <Link
            href={isAuthenticated ? '/member' : '/login'}
            title={isAuthenticated ? 'Hồ Sơ' : 'Đăng Nhập'}
            className="text-[#d0c5b5] hover:bg-[#353534] hover:text-primary transition-all duration-200 p-2"
            style={{ borderRadius: 0 }}
          >
            <span className="material-symbols-outlined" data-icon="person">person</span>
          </Link>
        </div>

        {/* Phần dưới: Logout (chỉ hiển thị khi đã đăng nhập) */}
        {isAuthenticated && (
          <div>
            <button
              onClick={logout}
              title="Đăng Xuất"
              className="text-[#d0c5b5] hover:bg-[#353534] hover:text-primary transition-all duration-200 p-2"
              style={{ borderRadius: 0 }}
            >
              <span className="material-symbols-outlined" data-icon="logout">logout</span>
            </button>
          </div>
        )}
      </nav>

      <style>{`
        .nav-item:hover .nav-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </>
  )
}

