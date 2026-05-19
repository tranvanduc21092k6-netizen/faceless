'use client'

import Link from 'next/link'

export default function ArchiveCard({ title, tags, excerpt, isLocked = true, onLockedClick }) {
  const handleClick = () => {
    if (isLocked && onLockedClick) {
      onLockedClick()
    }
  }

  return (
    <article
      onClick={handleClick}
      className="group relative bg-surface-container-low border border-surface-container-high p-gutter hover:border-primary transition-colors duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Lock Icon */}
      <div className="absolute top-gutter right-gutter text-outline-variant group-hover:text-primary transition-colors duration-300">
        <span
          className="material-symbols-outlined"
          style={isLocked ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {isLocked ? 'lock' : 'lock_open'}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-surface-container-high px-3 py-1 font-label-caps text-label-caps uppercase text-on-surface tracking-widest"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="font-headline-md text-headline-md text-on-surface mb-4 pr-8">
        {title}
      </h2>

      {/* Content Preview with Fade */}
      <div className="relative flex-grow">
        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
          {excerpt}
        </p>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-surface-container-low to-transparent" />
      </div>

      {/* CTA */}
      <div className="mt-6 pt-4 border-t border-surface-container-high">
        {isLocked ? (
          <p className="font-label-caps text-label-caps uppercase text-primary tracking-widest group-hover:underline underline-offset-4">
            - Đăng nhập để đọc tiếp!
          </p>
        ) : (
          <Link
            href="/article/sample"
            className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest group-hover:text-primary transition-colors"
          >
            - Đọc bài viết
          </Link>
        )}
      </div>
    </article>
  )
}
