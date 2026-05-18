import { useState } from 'react'
import ArchiveCard from '../components/ui/ArchiveCard'
import MembershipModal from '../components/modals/MembershipModal'

const archiveItems = [
  {
    title: 'Sự Xói Mòn Của Bản Ngã Đích Thực Trong Không Gian Siêu Kết Nối',
    tags: ['Bản ngã', 'Vô định'],
    excerpt:
      'Khi môi trường số ngày càng đòi hỏi sự chân thực mang tính trình diễn, bản ngã thật sự bị che khuất dưới những lớp lang của sự dễ bị tổn thương được dàn dựng. Biện chứng này xem xét áp lực ghi chép cuộc sống liên tục dẫn đến trạng thái nghịch lý, nơi trải nghiệm chân thật bị thay thế bởi bản mô phỏng của nó.',
    isLocked: true,
  },
  {
    title: 'Sự Phi Lý Công Sở Và Thương Mại Hóa Đam Mê',
    tags: ['Công sở', 'Bản ngã'],
    excerpt:
      'Nơi làm việc hiện đại không còn đòi hỏi lao động đơn thuần; nó đòi hỏi sự hòa tan đời sống nội tâm cá nhân vào tinh thần doanh nghiệp. Chúng tôi điều tra thủ thuật ngôn ngữ biến sự bóc lột thành cơ hội, và cách "đam mê" bị vũ khí hóa để khai thác giá trị thặng dư.',
    isLocked: true,
  },
  {
    title: 'Điều Hướng Kiến Trúc Của Sự Chán Chường Hiện Đại',
    tags: ['Vô định'],
    excerpt:
      'Đi sâu vào cảm giác uể oải lan tỏa đặc trưng cho cuộc sống đô thị đương đại. Vượt ra ngoài sự nhàm chán đơn thuần, trạng thái "vô định" phản ánh sự mất kết nối cấu trúc với các tường thuật có ý nghĩa, mắc kẹt cá nhân trong không gian chuyển tiếp với vô hạn lựa chọn nhưng không có động lực.',
    isLocked: true,
  },
  {
    title: 'Panopticon Của Văn Phòng Mở',
    tags: ['Công sở', 'Vô định'],
    excerpt:
      'Phân tích hệ lụy tâm lý của sự minh bạch kiến trúc tại nơi làm việc. Việc xóa bỏ ranh giới vật lý không thúc đẩy hợp tác, mà buộc tự giám sát liên tục, dẫn đến san phẳng sự bất đồng sáng tạo và bình thường hóa các hệ thống cấp bậc vô hình.',
    isLocked: false,
  },
]

export default function ArchivePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-[160px] pb-section-gap min-h-screen">
        {/* Header */}
        <header className="mb-section-gap text-center md:text-left border-b border-outline-variant pb-8">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4">
            Kho Lưu Trữ Biện Chứng
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Kho tàng tư duy được tổng hợp, khám phá giao điểm của bản ngã,
            mục đích và sự tồn tại hiện đại thông qua truy vấn nghiêm cẩn.
          </p>
        </header>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {archiveItems.map((item, index) => (
            <ArchiveCard
              key={index}
              title={item.title}
              tags={item.tags}
              excerpt={item.excerpt}
              isLocked={item.isLocked}
              onLockedClick={() => setModalOpen(true)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 flex justify-center border-t border-outline-variant pt-8">
          <button className="border border-outline-variant px-8 py-3 font-label-caps text-label-caps uppercase text-on-surface hover:border-primary hover:text-primary transition-colors duration-300">
            Tải Thêm Hồ Sơ Lịch Sử
          </button>
        </div>
      </div>

      {/* Membership Modal */}
      <MembershipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="archive"
      />
    </>
  )
}
