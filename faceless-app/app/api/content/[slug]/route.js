import { cookies } from 'next/headers'
import { createServerPB, getAuthStatus } from '../../../../src/lib/pocketbase/server'
import { MarkdownParser } from '../../../../src/lib/utils/markdown'

/**
 * GET /api/content/[slug] — API Route Hợp Nhất Phân Quyền
 *
 * Trả về dữ liệu nội dung khác nhau tuỳ theo trạng thái xác thực:
 *
 * Guest/Free → trường công khai: id, title, slug, type, tags, public_excerpt, audio_short URL
 * Paid/Admin → tất cả trên + md_file content, audio_full URL, nội dung markdown đầy đủ
 *
 * Response format:
 *   { success: true, data: {...}, authStatus: 'guest'|'free'|'premium' }
 *   { success: false, error: "..." }
 */
export async function GET(request, { params }) {
  try {
    const { slug } = await params
    
    if (!slug) {
      return Response.json(
        { success: false, error: 'Thiếu tham số slug.' },
        { status: 400 }
      )
    }

    // ── Khởi tạo PocketBase server client ──
    const cookieStore = await cookies()
    const pb = createServerPB(cookieStore)
    const authStatus = getAuthStatus(pb)

    // ── Tìm bài viết theo slug ──
    // Thử tìm theo ID trước, sau đó theo episode_code
    let record
    try {
      record = await pb.collection('episodes').getOne(slug)
    } catch {
      try {
        record = await pb.collection('episodes').getFirstListItem(
          `episode_code="${slug}"`
        )
      } catch {
        // Fallback: tìm theo title slug
        try {
          record = await pb.collection('episodes').getFirstListItem(
            `title~"${slug.replace(/-/g, ' ')}"`
          )
        } catch {
          return Response.json(
            { success: false, error: 'Không tìm thấy bài viết.' },
            { status: 404 }
          )
        }
      }
    }

    // ── Dữ liệu công khai (Guest / Free) ──
    const publicData = {
      id: record.id,
      title: record.title,
      slug: record.episode_code || record.id,
      type: record.type || 'Dialectic',
      tags: record.tags || [],
      created: record.created,
      is_premium: record.is_premium || false,
      // Trích đoạn công khai: ưu tiên trường public_excerpt,
      // fallback cắt 50% từ markdown nếu không có
      public_excerpt: record.public_excerpt || record.description || '',
      // Audio preview URL (công khai)
      audio_preview_url: record.audio_short
        ? pb.files.getURL(record, record.audio_short)
        : '',
    }

    // ── Guest / Free → trả về trường công khai ──
    if (authStatus === 'guest' || authStatus === 'free') {
      // Nếu có file MD và chưa có public_excerpt → tự cắt từ markdown
      if (!publicData.public_excerpt && record.md_file) {
        try {
          const mdUrl = pb.files.getURL(record, record.md_file)
          const mdResponse = await fetch(mdUrl)
          if (mdResponse.ok) {
            const rawMd = await mdResponse.text()
            const parser = new MarkdownParser(rawMd)
            publicData.public_excerpt = parser.getPublicExcerpt(50)
          }
        } catch {
          // Không thể tải markdown — giữ excerpt rỗng
        }
      }

      return Response.json({
        success: true,
        data: publicData,
        authStatus,
      })
    }

    // ── Premium (Paid / Admin) → trả về đầy đủ ──
    let markdownContent = ''
    let markdownMeta = {}

    if (record.md_file) {
      try {
        const mdUrl = pb.files.getURL(record, record.md_file)
        const mdResponse = await fetch(mdUrl)
        if (mdResponse.ok) {
          const rawMd = await mdResponse.text()
          const parser = new MarkdownParser(rawMd)
          markdownContent = parser.getBodyContent()
          markdownMeta = parser.getFrontmatter()
        }
      } catch (err) {
        console.error('[API Content] Lỗi tải markdown:', err.message)
      }
    }

    const premiumData = {
      ...publicData,
      // Nội dung markdown đầy đủ (đã tách frontmatter)
      markdown_content: markdownContent,
      markdown_meta: markdownMeta,
      // Đường dẫn file riêng tư
      secure_storage_md_path: record.md_file
        ? pb.files.getURL(record, record.md_file)
        : '',
      // Audio đầy đủ (member only)
      secure_audio_full_path: record.audio_full
        ? pb.files.getURL(record, record.audio_full)
        : '',
      // Thông tin bổ sung
      description: record.description || '',
      duration: record.duration || '',
      format: record.format || 'Audio',
      episode_number: record.episode_number || '',
    }

    return Response.json({
      success: true,
      data: premiumData,
      authStatus,
    })

  } catch (err) {
    console.error('[API Content] Lỗi hệ thống:', err)
    return Response.json(
      { success: false, error: 'Lỗi hệ thống khi truy xuất nội dung.' },
      { status: 500 }
    )
  }
}
