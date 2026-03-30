"use client"

import { useState } from 'react'

import { WaitlistModal } from '@/components/waitlist-modal'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { UniversityStrip } from '@/components/university-strip'
import { ProblemSection } from '@/components/problem-section'
import { HowItWorks } from '@/components/how-it-works'
import { BuiltFor } from '@/components/built-for'
import { DatabaseTeaser } from '@/components/database-teaser'
import { WaitlistCta } from '@/components/waitlist-cta'
import { Footer } from '@/components/footer'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="bg-white min-h-screen">
      <Nav onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <UniversityStrip />
      <ProblemSection />
      <HowItWorks />
      <BuiltFor />
      <DatabaseTeaser />
      <WaitlistCta />
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
