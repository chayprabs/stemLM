"use client";

import { useState } from "react";
import { DatabaseTeaser } from "@/components/database-teaser";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Nav } from "@/components/nav";
import { UniversityStrip } from "@/components/university-strip";
import { WaitlistCta } from "@/components/waitlist-cta";
import { WaitlistModal } from "@/components/waitlist-modal";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Nav onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <UniversityStrip />
      <HowItWorks />
      <DatabaseTeaser />
      <WaitlistCta />
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

export default HomePage;
