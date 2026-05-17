import { useState } from 'react'

export default function MembershipModal({ isOpen, onClose, variant = 'default' }) {
  const [email, setEmail] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    onClose()
  }

  if (variant === 'archive') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-[#0A0A0A] border border-outline-variant max-w-lg w-full p-12 relative shadow-2xl mx-margin-mobile animate-fade-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          {/* Modal Content */}
          <div className="text-center">
            <div className="font-display-lg text-headline-md text-on-surface uppercase mb-4 tracking-widest">
              Access the Inner Circle
            </div>
            <div className="w-12 h-px bg-primary-container mx-auto mb-8" />
            <p className="font-body-lg text-on-surface/80 mb-10 leading-relaxed">
              The depth of the dialectic is reserved for those who seek to transcend the surface.
              Join our archive to access the complete synthesis of thought.
            </p>
            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full bg-transparent border-b border-outline-variant py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container transition-colors font-body-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-container text-[#0A0A0A] font-label-caps text-label-caps uppercase py-4 hover:brightness-110 transition-all tracking-[0.2em] font-bold"
              >
                Join the Dialectic
              </button>
              <p className="text-[10px] font-label-caps uppercase text-on-surface-variant tracking-widest mt-4">
                By joining, you agree to our terms of inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Default variant - split pane
  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-center p-margin-mobile">
      <div className="bg-[#111111] border border-[#222222] w-full max-w-2xl relative shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors z-10"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Decorative Visual Pane */}
        <div className="hidden md:block w-1/3 bg-surface relative border-r border-[#222222]">
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-[#0A0A0A] opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="w-px h-1/2 bg-primary-container opacity-20" />
            <div className="w-8 h-8 border border-primary-container absolute opacity-30 rotate-45" />
          </div>
        </div>

        {/* Content Pane */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary-container text-3xl mb-4 block">
              lock
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
              The rest is for the discerning.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              You have reached the edge of the public domain. Beyond this point, our discourse
              delves deeper into the shadows of conventional thought. Join the dialectic to
              access the full archive, exclusive essays, and private symposiums.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="sr-only" htmlFor="membership-email">Email address</label>
              <input
                id="membership-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border-0 border-b border-[#222222] text-on-surface font-body-md text-body-md py-3 px-0 focus:ring-0 focus:border-primary-container focus:outline-none transition-colors placeholder:text-on-surface-variant/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-container text-[#0A0A0A] font-label-caps text-label-caps py-4 px-6 hover:bg-primary transition-colors flex items-center justify-center group"
            >
              Join the Dialectic
              <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-[#222222] flex items-center justify-between">
            <span className="font-body-md text-body-md text-on-surface-variant text-sm">
              Already an initiate?
            </span>
            <a
              href="#"
              className="font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors border-b border-transparent hover:border-primary"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
