/**
 * Layout cho nhóm trang payment — Không có Navbar/Footer
 * Các trang: /upgrade, /checkout, /payment-processing, /payment-success, /payment-error
 * 
 * Các trang này tự render header/footer riêng theo thiết kế transactional.
 */
export default function PaymentLayout({ children }) {
  return (
    <div className="dark min-h-screen antialiased font-body-md text-body-md">
      {children}
    </div>
  )
}
