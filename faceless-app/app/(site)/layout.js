import Navbar from '../../src/components/layout/Navbar'
import Footer from '../../src/components/layout/Footer'

export default function SiteLayout({ children }) {
  return (
    <div className="dark min-h-screen flex flex-col antialiased font-body-md text-body-md">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
