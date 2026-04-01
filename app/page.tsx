import { BuiltFor } from "@/components/built-for";
import { DatabaseTeaser } from "@/components/database-teaser";
import { Footer } from "@/components/footer";
import { HomeHeroShell } from "@/components/home-hero-shell";
import { HowItWorks } from "@/components/how-it-works";
import { ProblemSection } from "@/components/problem-section";
import { UniversityStrip } from "@/components/university-strip";
import { WaitlistCta } from "@/components/waitlist-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <HomeHeroShell />
      <UniversityStrip />
      <ProblemSection />
      <HowItWorks />
      <BuiltFor />
      <DatabaseTeaser />
      <WaitlistCta />
      <Footer />
    </main>
  );
}
