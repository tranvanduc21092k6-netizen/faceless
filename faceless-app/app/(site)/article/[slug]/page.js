import { redirect } from 'next/navigation'

/**
 * /article/[slug] → Redirect sang /read/[slug]
 *
 * Route cũ được giữ lại để tương thích ngược.
 * Mọi truy cập đến /article/xxx sẽ tự động chuyển hướng
 * sang route hợp nhất mới /read/xxx
 */
export default async function ArticleRedirectPage({ params }) {
  const { slug } = await params
  redirect(`/read/${slug}`)
}
