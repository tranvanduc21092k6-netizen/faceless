'use client'

import { useState, useEffect } from 'react'
import ArchiveCard from '../components/ui/ArchiveCard'
import MembershipModal from '../components/modals/MembershipModal'
import { pb } from '../lib/pocketbase'

export default function ArchivePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const records = await pb.collection('episodes').getFullList({
          sort: '-created',
        })
        setItems(records)
      } catch (err) {
        console.error('Lỗi khi tải kho lưu trữ:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArchive()
  }, [])

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

        {loading ? (
          <div className="py-20 text-center opacity-50 font-label-caps text-label-caps uppercase tracking-widest">
            Đang truy xuất hồ sơ...
          </div>
        ) : items.length > 0 ? (
          /* 2-Column Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item) => (
              <ArchiveCard
                key={item.id}
                title={item.title}
                tags={item.tags || []}
                excerpt={item.description}
                isLocked={item.format === 'Text' && !pb.authStore.isValid}
                onLockedClick={() => setModalOpen(true)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center italic text-on-surface-variant font-pull-quote">
            Kho lưu trữ hiện đang trống.
          </div>
        )}

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
