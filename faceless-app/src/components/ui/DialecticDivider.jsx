'use client'

export default function DialecticDivider({ variant = 'diamond' }) {
  if (variant === 'simple') {
    return <div className="dialectic-divider-simple" />
  }

  if (variant === 'line') {
    return (
      <div className="flex items-center justify-center my-16 opacity-50">
        <div className="h-[1px] bg-primary flex-grow max-w-[100px]" />
        <div className="w-2 h-2 bg-primary mx-4 rotate-45" />
        <div className="h-[1px] bg-primary flex-grow max-w-[100px]" />
      </div>
    )
  }

  // Default: full diamond divider
  return <div className="dialectic-divider" />
}
