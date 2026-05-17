export default function PullQuote({ children, citation }) {
  return (
    <section className="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap text-center">
      <blockquote className="font-pull-quote text-pull-quote text-on-surface italic">
        {children}
      </blockquote>
      {citation && (
        <div className="mt-8 font-label-caps text-label-caps text-primary">
          {citation}
        </div>
      )}
    </section>
  )
}
