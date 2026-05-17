import { useState } from 'react'
import ArchiveCard from '../components/ui/ArchiveCard'
import MembershipModal from '../components/modals/MembershipModal'

const archiveItems = [
  {
    title: 'The Erosion of the Authentic Self in Hyper-Connected Spaces',
    tags: ['Bản ngã', 'Vô định'],
    excerpt:
      "As digital environments increasingly mandate performative authenticity, the true self becomes obscured beneath layers of curated vulnerability. This dialectic examines how the pressure to constantly document one's life leads to a paradoxical state where genuine experience is replaced by its simulacrum.",
    isLocked: true,
  },
  {
    title: 'Corporate Absurdity and the Commodification of Passion',
    tags: ['Công sở', 'Bản ngã'],
    excerpt:
      "The modern workplace no longer demands mere labor; it requires the subsumption of the individual's inner life into the corporate ethos. We investigate the linguistic gymnastics used to frame exploitation as opportunity, and how 'passion' is weaponized to extract surplus value while diminishing worker autonomy.",
    isLocked: true,
  },
  {
    title: 'Navigating the Architecture of Modern Ennui',
    tags: ['Vô định'],
    excerpt:
      "A deep dive into the pervasive sense of listlessness that characterizes contemporary urban existence. Beyond mere boredom, this state of 'vô định' reflects a structural dislocation from meaningful narratives, trapping individuals in a liminal space of infinite choices and zero momentum.",
    isLocked: true,
  },
  {
    title: 'The Panopticon of the Open-Plan Office',
    tags: ['Công sở', 'Vô định'],
    excerpt:
      'Analyzing the psychological implications of architectural transparency in the workplace. The eradication of physical boundaries does not foster collaboration, but rather enforces constant self-surveillance, leading to a flattening of creative dissent and the normalization of invisible hierarchies.',
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
            Dialectical Archives
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A curated repository of synthesized thought, exploring the intersections of identity,
            purpose, and modern existence through rigorous inquiry.
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
            Load Historical Records
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
