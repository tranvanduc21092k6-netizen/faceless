import { headers } from 'next/headers'
import ReadView from '../../../src/views/ReadView'

/**
 * /read/[slug] — Route đọc hợp nhất
 *
 * Server component wrapper:
 *   - Đọc header x-auth-status từ middleware
 *   - Truyền authStatus xuống ReadView (client component)
 *
 * ReadView sẽ tự quyết định hiển thị STATE A hoặc STATE B
 * dựa trên authStatus + dữ liệu từ API
 */
export async function generateMetadata({ params }) {
  const { slug } = await params
  return {
    title: `Đọc — ${slug} | Faceless Media`,
    description: 'Không gian đọc sâu và biện chứng của Faceless Media Platform.',
  }
}

export default async function ReadPage({ params }) {
  // Đọc auth status từ middleware header
  const headerList = await headers()
  const authStatus = headerList.get('x-auth-status') || 'guest'

  return <ReadView initialAuthStatus={authStatus} />
}
