'use client'

import { useState } from 'react'
import ArchiveCard from '../components/ui/ArchiveCard'
import MembershipModal from '../components/modals/MembershipModal'

const archiveItems = [
  {
    title: 'Khi Ta Dần Đánh Mất Chính Mình Trên Internet',
    tags: ['Bản thân', 'Mạng xã hội'],
    excerpt:
      'Càng cố gắng thể hiện bản thân trên mạng, chúng ta càng dễ xa rời con người thật của mình. Cuộc sống dần trở thành thứ cần được ghi lại và trình diễn hơn là thực sự trải nghiệm.',
    isLocked: true,
  },
  {
    title: 'Khi Đam Mê Trở Thành Công Việc',
    tags: ['Công việc', 'Bản thân'],
    excerpt:
      'Môi trường công sở hiện đại không chỉ lấy thời gian, mà còn đòi hỏi cảm xúc và bản sắc cá nhân. Đôi khi “hãy làm điều bạn yêu” lại trở thành cách khiến con người làm việc nhiều hơn mà không nhận ra.',
    isLocked: true,
  },
  {
    title: 'Cảm Giác Trống Rỗng Giữa Cuộc Sống Hiện Đại',
    tags: ['Mất phương hướng'],
    excerpt:
      'Giữa quá nhiều lựa chọn và nhịp sống liên tục, nhiều người rơi vào trạng thái lửng lơ — không thật sự tệ, nhưng cũng không thấy ý nghĩa rõ ràng trong cuộc sống.',
    isLocked: true,
  },
  {
    title: 'Văn Phòng Mở Và Áp Lực Phải Luôn “Có Mặt”',
    tags: ['Công việc', 'Xã hội'],
    excerpt:
      'Không gian làm việc mở khiến con người cảm thấy mình luôn bị quan sát. Điều đó vô tình tạo ra áp lực phải liên tục thể hiện sự bận rộn và chuyên nghiệp.',
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
            Kho Lưu Trữ Góc Nhìn
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Kho tàng tư duy được khám phá và tổng hợp.
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
