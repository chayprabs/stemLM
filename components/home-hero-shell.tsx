"use client";

import { useState } from "react";

import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { WaitlistModal } from "@/components/waitlist-modal";

export function HomeHeroShell() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Nav onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
