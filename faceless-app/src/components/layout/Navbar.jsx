'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => pathname === path

  const navLinks = [
    { path: '/archive', label: 'Kho Lưu Trữ' },
    { path: '/library', label: 'Thư Viện' },
    { path: '/manifesto', label: 'Quan Điểm' },
  ]

  return (
    <nav className="bg-surface fixed top-0 w-full z-50 border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop py-unit transition-all duration-300">
      <div className="flex items-center gap-gutter">
        <Link
          href="/"
          className="font-display-lg text-headline-md tracking-tighter text-on-surface uppercase hover:text-primary transition-colors duration-300"
        >
          FACELESS
        </Link>
        <div className="hidden md:flex gap-gutter items-center font-label-caps text-label-caps">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={
                isActive(link.path)
                  ? 'text-primary font-bold border-b border-primary pb-1 uppercase'
                  : 'text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 font-label-caps text-label-caps">
        {isAuthenticated ? (
          // HIỂN THỊ TRẠNG THÁI ĐÃ ĐĂNG NHẬP (STITCH STYLE)
          <div className="flex items-center gap-6">
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="bg-[#201f1f] text-primary border border-primary px-3.5 py-2 hover:bg-primary hover:text-[#0A0A0A] transition-all uppercase text-[10px] tracking-wider font-bold"
              >
                Console Admin
              </Link>
            )}

            <div className="flex items-center space-x-3 group cursor-pointer">
              <span className="hidden sm:inline font-label-caps text-label-caps text-on-surface-variant group-hover:text-primary transition-colors duration-300">
                {user?.name || 'Học Giả Ẩn Danh'}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#111111] border border-outline-variant flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_circle
                </span>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="border border-[#222222] hover:border-primary text-on-surface-variant hover:text-primary px-4 py-2 transition-colors uppercase text-[11px]"
            >
              Đăng Xuất
            </button>
          </div>
        ) : (
          // HIỂN THỊ KHI CHƯA ĐĂNG NHẬP
          <>
            <Link
              href="/login"
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 hidden sm:block"
            >
              Đăng Nhập
            </Link>
            <Link
              href="/register"
              className="bg-primary text-[#0A0A0A] px-6 py-3 hover:opacity-80 transition-opacity uppercase"
            >
              Đăng Ký
            </Link>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-on-surface flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface border-b border-outline-variant md:hidden animate-fade-in">
          <div className="flex flex-col px-margin-mobile py-6 gap-4 font-label-caps text-label-caps">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  isActive(link.path)
                    ? 'text-primary font-bold uppercase'
                    : 'text-on-surface-variant hover:text-primary transition-colors uppercase'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
