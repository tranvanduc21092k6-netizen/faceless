import { Link } from 'react-router-dom'

export default function Footer() {
  const footerLinks = [
    { path: '/privacy', label: 'Privacy' },
    { path: '/terms', label: 'Terms' },
    { path: '/institutional', label: 'Institutional Access' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="w-full bg-surface border-t border-outline-variant mt-section-gap">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-gutter gap-6">
        <div className="font-display-lg text-headline-md text-on-surface uppercase tracking-tighter">
          FACELESS
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-label-caps text-label-caps">
          {footerLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant text-sm text-center md:text-right">
          © 2024 FACELESS DIALECTICS. FOR THE DISCERNING MIND.
        </div>
      </div>
    </footer>
  )
}
