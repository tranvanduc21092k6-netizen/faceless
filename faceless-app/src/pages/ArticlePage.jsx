import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Tag from '../components/ui/Tag'

export default function ArticlePage() {
  const [readProgress, setReadProgress] = useState(0)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-150" style={{ width: `${readProgress}%` }} />

      {/* Desktop: Reading view */}
      <div className="hidden md:block">
        <div className="pt-[140px] pb-section-gap relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex justify-center items-start gap-12">
          {/* Floating Sidebar */}
          <aside className="flex flex-col sticky top-[140px] gap-6 text-on-surface-variant w-12 items-center">
            <button onClick={handleCopyLink} aria-label="Copy Link" className="w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-primary hover:text-primary transition-all duration-300 relative">
              <span className="material-symbols-outlined">link</span>
              {showToast && (
                <div className="absolute left-[120%] whitespace-nowrap bg-[#111111] border border-primary px-3 py-1.5 flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-caps text-label-caps text-primary">Link Copied</span>
                </div>
              )}
            </button>
            <button aria-label="Share" className="w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-primary hover:text-primary transition-all duration-300">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button aria-label="Bookmark" className="w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-primary hover:text-primary transition-all duration-300">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
            <div className="w-px h-24 bg-outline-variant mt-4" />
          </aside>

          {/* Article Content */}
          <article className="w-full max-w-[680px]">
            <header className="mb-16">
              <div className="flex flex-wrap gap-2 mb-8">
                <Tag>Aesthetic Theory</Tag>
                <Tag>Machine Vision</Tag>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-6 tracking-tight">
                The Ontology of the Synthetic Pixel
              </h1>
              <div className="flex items-center gap-4 font-body-md text-body-md text-on-surface-variant">
                <time dateTime="2024-10-24">October 24, 2024</time>
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span>12 Min Read</span>
              </div>
            </header>

            <div className="prose prose-invert max-w-none">
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
                The emergence of machine-generated imagery forces a renegotiation of Walter Benjamin's concept of the aura. When an image is conjured from latent space rather than captured through a lens, it is detached from indexical reality. It does not document what was; it hallucinates what could be.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
                Traditional photography is inextricably linked to light hitting a sensor—a physical impression of a specific moment in space and time. Generative models operate differently. They synthesize pixels based on statistical probabilities derived from vast datasets.
              </p>

              {/* Pull Quote */}
              <blockquote className="my-16 pl-0 border-l-0 text-center relative">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 text-primary material-symbols-outlined text-4xl opacity-50">format_quote</span>
                <p className="font-pull-quote text-pull-quote text-primary italic leading-tight max-w-[80%] mx-auto">
                  We are entering an era where the photograph is no longer proof of existence, but proof of imagination.
                </p>
              </blockquote>

              <h2 className="font-headline-md text-headline-md text-on-surface mt-16 mb-6">The Dialectic of the Real</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
                This shift necessitates a new vocabulary. We can no longer speak of "taking" a picture; we "prompt" or "generate" one. The role of the creator shifts from observer to curator, from operator of a physical apparatus to navigator of a conceptual space.
              </p>

              {/* Dialectic Divider */}
              <div className="flex items-center justify-center my-16 opacity-80">
                <div className="h-px bg-outline-variant w-full max-w-[100px]" />
                <div className="mx-4 flex items-center justify-center">
                  <div className="w-2 h-2 border border-primary transform rotate-45" />
                </div>
                <div className="h-px bg-outline-variant w-full max-w-[100px]" />
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
                To deny the artistry in this process is to misunderstand the medium. Just as the painter uses pigment and the photographer uses light, the prompt engineer uses language as their primary tool. The resulting artifact possesses a new kind of resonance—a synthetic aura.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Mobile: Reading view */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="fixed top-[52px] left-0 w-full h-1 bg-surface-container-high z-40">
          <div className="h-full bg-primary" style={{ width: `${readProgress}%` }} />
        </div>

        <main className="pt-[80px] pb-[120px] px-margin-mobile max-w-3xl mx-auto">
          <header className="mb-12 mt-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 bg-[#222222] text-on-surface font-label-caps text-label-caps border border-outline-variant">EPISTEMOLOGY</span>
              <span className="px-2 py-1 bg-[#222222] text-on-surface font-label-caps text-label-caps border border-outline-variant">SYNTHESIS</span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-6 leading-tight">
              The Ontology of the Synthetic Pixel
            </h1>
            <div className="flex items-center justify-between border-t border-b border-outline-variant py-4 mb-8">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">AUTHOR</p>
                <p className="font-body-md text-body-md text-on-surface">Nexus-7 Synthesis Engine</p>
              </div>
              <div className="text-right">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">DATE</p>
                <p className="font-body-md text-body-md text-on-surface">14.03.24</p>
              </div>
            </div>
          </header>

          <article className="space-y-8 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-headline-md first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              The emergence of machine-generated imagery forces a renegotiation of Walter Benjamin's concept of the aura. When an image is conjured from latent space rather than captured through a lens, it is detached from indexical reality.
            </p>
            <p>
              Traditional photography is inextricably linked to light hitting a sensor—a physical impression of a specific moment in space and time.
            </p>

            <blockquote className="my-12 pl-6 border-l-2 border-primary">
              <p className="font-pull-quote text-pull-quote text-on-surface italic">
                "We are entering an era where the photograph is no longer proof of existence, but proof of imagination."
              </p>
            </blockquote>

            <p>
              This shift necessitates a new vocabulary. We can no longer speak of "taking" a picture; we "prompt" or "generate" one.
            </p>

            {/* Thesis/Antithesis Block */}
            <div className="bg-[#111111] border border-[#222222] p-6 my-8">
              <div className="mb-4">
                <h3 className="font-label-caps text-label-caps text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">trip_origin</span>
                  THESIS
                </h3>
                <p className="font-body-md text-body-md text-on-surface">
                  The synthetic pixel represents a failure of authenticity, requiring rigorous grounding mechanisms.
                </p>
              </div>
              <div className="h-px bg-[#222222] w-full my-4" />
              <div>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">circle</span>
                  ANTITHESIS
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  The capacity to synthesize is structurally identical to the capacity to innovate.
                </p>
              </div>
            </div>
          </article>
        </main>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-[#111111] border-t border-[#222222] p-4 flex justify-around items-center z-50">
          <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">thumb_up</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider">Endorse</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">forum</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider">Discuss</span>
          </button>
          <div className="w-px h-8 bg-[#222222]" />
          <button onClick={handleCopyLink} className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">ios_share</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider">Share</span>
          </button>
        </div>
      </div>

      {/* Next Articles */}
      <section className="border-t border-outline-variant bg-surface-container-lowest py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[680px] mx-auto w-full">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-12 text-center md:text-left">Bài tiếp theo</h3>
          <div className="flex flex-col gap-6">
            <Link to="/article/silence-of-archive" className="group block bg-surface-container-low border border-outline-variant p-8 hover:border-primary transition-colors duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <span className="font-label-caps text-label-caps text-primary uppercase block mb-3">Dialectics</span>
                  <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors duration-300 mb-2">The Silence of the Archive</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">An inquiry into what is omitted from large datasets.</p>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors mt-2">arrow_forward</span>
              </div>
            </Link>
            <Link to="/article/shadows-without-light" className="group block bg-surface-container-low border border-outline-variant p-8 hover:border-primary transition-colors duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <span className="font-label-caps text-label-caps text-primary uppercase block mb-3">Aesthetic Theory</span>
                  <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors duration-300 mb-2">Shadows Without Light</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Tracing the artificial chiaroscuro in neural network rendering paradigms.</p>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors mt-2">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
