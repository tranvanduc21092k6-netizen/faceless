import { useState } from 'react'
import { Link } from 'react-router-dom'
import EpisodeCard from '../components/ui/EpisodeCard'
import ResourceItem from '../components/ui/ResourceItem'
import AudioPlaybackBar from '../components/ui/AudioPlaybackBar'
import DialecticDivider from '../components/ui/DialecticDivider'

export default function LibraryPage() {
  const [playerVisible, setPlayerVisible] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState('')

  const handlePlay = (title) => {
    setCurrentEpisode(title)
    setPlayerVisible(true)
  }

  return (
    <>
      <div className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <header className="mb-gutter text-center md:text-left">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 text-on-surface">
            The Library
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Access complete dialectical threads, uncut audio dialogues, and foundational texts. Your private repository for rigorous synthesis.
          </p>
        </header>

        <DialecticDivider variant="line" />

        <section className="mb-section-gap">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-label-caps text-label-caps text-primary">Full Episodes</h2>
            <Link to="/archive" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
              View All Archives
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <EpisodeCard isFeatured title="The Architecture of Silence: Navigating the Void in Artificial Syntax" description="A deep dive into how large language models handle the absence of instruction, creating emergent behaviors that mimic human contemplative states." duration="1h 45m" onPlay={() => handlePlay('The Architecture of Silence')} />
            <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
              <EpisodeCard episode="Episode 042" title="Synthetic Empathy vs. Calculated Response" duration="55m" onPlay={() => handlePlay('Synthetic Empathy vs. Calculated Response')} />
              <EpisodeCard episode="Episode 041" title="The Illusion of Neutrality in Dataset Curation" duration="1h 12m" onPlay={() => handlePlay('The Illusion of Neutrality in Dataset Curation')} />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8">
            <h2 className="font-label-caps text-label-caps text-primary border-b border-surface-container pb-4">Monographs &amp; Selected Texts</h2>
          </div>
          <ul className="flex flex-col">
            <ResourceItem title="Dialectics of the Latent Space" description="A foundational essay examining the philosophical implications of multidimensional vector representations." format="PDF" size="4.2 MB" icon="description" />
            <ResourceItem title="The Observer Effect in AI Prompts" description="A collection of experiments detailing how semantic framing alters the structural integrity of generated thought." format="EPUB" size="1.8 MB" icon="menu_book" />
          </ul>
        </section>
      </div>

      <AudioPlaybackBar isVisible={playerVisible} onClose={() => setPlayerVisible(false)} episodeTitle={currentEpisode} />
    </>
  )
}
