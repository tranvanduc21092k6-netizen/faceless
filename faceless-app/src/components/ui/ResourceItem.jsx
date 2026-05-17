import { useState } from 'react'

export default function ResourceItem({ title, description, format, size, icon }) {
  const [downloadState, setDownloadState] = useState('idle') // idle | downloading | done

  const handleDownload = () => {
    if (downloadState !== 'idle') return
    setDownloadState('downloading')
    setTimeout(() => {
      setDownloadState('done')
    }, 2000)
  }

  return (
    <li className="group border-b border-surface-container py-8 hover:bg-surface transition-colors -mx-8 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start gap-6 max-w-3xl">
        <div className="hidden md:flex w-16 h-20 bg-surface-container border border-outline-variant items-center justify-center flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-lowest opacity-50" />
          <span className="material-symbols-outlined text-on-surface-variant relative z-10">
            {icon || 'description'}
          </span>
        </div>
        <div>
          <h3 className="font-headline-md text-[28px] text-on-surface mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
          <div className="flex gap-4 mt-3">
            <span className="px-2 py-0.5 bg-surface-container-high text-on-surface font-label-caps text-[10px] uppercase border border-outline-variant">
              {format}
            </span>
            <span className="text-on-surface-variant font-label-caps text-[10px] uppercase flex items-center">
              {size}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        disabled={downloadState === 'downloading'}
        className={`flex-shrink-0 self-start md:self-center bg-transparent border px-6 py-3 font-label-caps text-label-caps transition-colors flex items-center gap-2 ${
          downloadState === 'done'
            ? 'border-primary text-primary'
            : 'border-outline-variant text-on-surface hover:border-primary hover:text-primary'
        }`}
      >
        {downloadState === 'idle' && (
          <>
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download
          </>
        )}
        {downloadState === 'downloading' && (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            Downloading...
          </>
        )}
        {downloadState === 'done' && (
          <>
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Downloaded
          </>
        )}
      </button>
    </li>
  )
}
