import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/archive', label: 'Kho Lưu Trữ' },
    { path: '/library', label: 'Thư Viện' },
    { path: '/manifesto', label: 'Tuyên Ngôn' },
  ]

  return (
    <nav className="bg-surface fixed top-0 w-full z-50 border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop py-unit transition-all duration-300">
      <div className="flex items-center gap-gutter">
        <Link
          to="/"
          className="font-display-lg text-headline-md tracking-tighter text-on-surface uppercase hover:text-primary transition-colors duration-300"
        >
          FACELESS
        </Link>
        <div className="hidden md:flex gap-gutter items-center font-label-caps text-label-caps">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
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
      <div className="flex items-center gap-4 font-label-caps text-label-caps">
        <Link
          to="/login"
          className="text-on-surface-variant hover:text-primary transition-colors duration-300 hidden sm:block"
        >
          Đăng Nhập
        </Link>
        <Link
          to="/register"
          className="bg-primary text-[#0A0A0A] px-6 py-3 hover:opacity-80 transition-opacity uppercase"
        >
          Đăng Ký
        </Link>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-on-surface"
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
                to={link.path}
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
