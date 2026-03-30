"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  audienceCards,
  domainPills,
  featureCards,
  problemCards,
  trustInstitutions,
  timelineSteps,
} from "@/lib/site-data";
import {
  HeroWorkspacePreview,
  ShowcaseCollapsedDiagram,
  ShowcaseEquivalentDiagram,
  ShowcaseOriginalDiagram,
} from "@/components/stem-diagrams";
import Reveal from "@/components/reveal";
import { WaitlistModal } from "@/components/waitlist-modal";

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHeroLoaded(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || waitlistOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, waitlistOpen]);

  const openWaitlist = () => {
    setMenuOpen(false);
    setWaitlistOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar marketing-navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container">
          <Link href="/" className="logo">
            <span className="logo-dot" />
            <span>stemLM</span>
          </Link>

          <ul className="nav-links">
            <li>
              <a href="#showcase">Product</a>
            </li>
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
            <li>
              <a href="#built-for">For students</a>
            </li>
            <li>
              <a href="#trusted">Colleges</a>
            </li>
          </ul>

          <div className="nav-actions">
            <a href="#trusted" className="nav-link-quiet">
              Contact sales
            </a>
            <Link href="/workspace" className="nav-link-quiet">
              Live demo
            </Link>
            <button className="btn-primary nav-cta nav-cta--compact" onClick={openWaitlist}>
              Get stemLM
            </button>
          </div>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            id="hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`} id="mobileNav">
        <a href="#showcase" className="mobile-nav-link" onClick={closeMenu}>
          Product
        </a>
        <a href="#how-it-works" className="mobile-nav-link" onClick={closeMenu}>
          How it works
        </a>
        <a href="#built-for" className="mobile-nav-link" onClick={closeMenu}>
          For students
        </a>
        <a href="#trusted" className="mobile-nav-link" onClick={closeMenu}>
          Colleges
        </a>
        <Link href="/workspace" className="btn-secondary" onClick={closeMenu}>
          Open live demo
        </Link>
        <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={openWaitlist}>
          Join waitlist
        </button>
      </div>

      <main className="marketing-page">
        <section className={`hero ${heroLoaded ? "loaded" : ""}`} id="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot" />
                Trusted by early STEM learners
              </div>
              <h1>
                Responsible AI tutoring that makes hard STEM problems click
              </h1>
              <p className="hero-sub">
                stemLM turns ChatGPT, Claude, and Gemini into a diagram-first STEM study workspace
                with structured reasoning, revision-ready outputs, and visual explanations at every
                step.
              </p>
              <div className="hero-proof">
                <div className="hero-proof-item">
                  <strong>10,000+</strong>
                  <span>students already interested</span>
                </div>
                <div className="hero-proof-item">
                  <strong>Physics to mechanics</strong>
                  <span>topic-aware guided breakdowns</span>
                </div>
              </div>
              <div className="hero-cta-group">
                <div className="hero-cta-buttons">
                  <button className="btn-primary btn-primary--large" onClick={openWaitlist}>
                    Get early access
                  </button>
                  <Link href="/workspace" className="btn-secondary btn-secondary--large">
                    Open the live demo
                  </Link>
                </div>
                <span className="hero-cta-note">
                  Built for JEE prep, engineering coursework, and concept revision
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <HeroWorkspacePreview />
            </div>
          </div>
        </section>

        <section className="trust-strip" id="trusted">
          <div className="container">
            <p className="trust-copy">
              Trusted by 10,000+ students in top colleges across India, the USA, and China
            </p>
            <div className="trust-grid">
              {trustInstitutions.map((institution) => (
                <div key={institution.name} className="trust-logo">
                  <span className="trust-logo-mark">{institution.short}</span>
                  <span className="trust-logo-name">{institution.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="problem" id="problem">
          <div className="container">
            <div className="section-label">THE PROBLEM</div>
            <Reveal>
              <h2 className="section-heading">
                AI gives answers.
                <span className="indent">Students need understanding.</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="problem-intro">
                Engineering students already use AI every day, but the experience is still broken
                for STEM. These tools are built for general questions, not for the visual,
                structured reasoning that physics, circuits, and chemistry require.
              </p>
            </Reveal>

            <div className="problem-grid">
              {problemCards.map((card, index) => (
                <Reveal key={card.title} className="problem-card" delay={index * 80}>
                  <div className="problem-card-icon">
                    <ProblemIcon icon={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="how-it-works" id="how-it-works">
          <div className="container">
            <div className="section-label">HOW IT WORKS</div>
            <Reveal>
              <h2 className="section-heading">
                One button.
                <span className="indent">Your AI gets a whole lot smarter.</span>
              </h2>
            </Reveal>

            <div className="timeline">
              {timelineSteps.map((step, index) => (
                <Reveal key={step.title} className="timeline-step" delay={index * 70}>
                  <div className="timeline-num-col">
                    <div className="timeline-circle">{index + 1}</div>
                    {index < timelineSteps.length - 1 ? <div className="timeline-line" /> : null}
                  </div>
                  <div className="timeline-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    {step.tag ? <span className="timeline-tag">{step.tag}</span> : null}
                    {step.code ? <code className="timeline-code">{step.code}</code> : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="showcase" id="showcase">
          <div className="container">
            <div className="section-label">DIAGRAMS AT EVERY STEP</div>
            <Reveal>
              <h2 className="section-heading">
                Like LaTeX for equations
                <span className="indent">but for circuits, FBDs, and ray diagrams</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="showcase-sub">
                The landing page is now backed by a real app flow. The live workspace can render a
                guided walkthrough, save study sessions locally, and export the outline of the
                solution.
              </p>
            </Reveal>

            <div className="showcase-diagrams">
              <Reveal className="diagram-card" delay={0}>
                <span className="diagram-pill">Step 1</span>
                <ShowcaseOriginalDiagram />
                <div className="diagram-label">Original circuit</div>
                <div className="diagram-meta">R1 = 6 ohm | R2 = 3 ohm | R3 = 4 ohm | V = 12V</div>
              </Reveal>

              <Reveal className="diagram-card active" delay={90}>
                <span className="diagram-pill active">Step 2</span>
                <ShowcaseCollapsedDiagram />
                <div className="diagram-label">R1 || R2 collapsed</div>
                <div className="diagram-meta amber">Rp = (6 x 3) / (6 + 3) = 2 ohm</div>
              </Reveal>

              <Reveal className="diagram-card" delay={180}>
                <span className="diagram-pill">Step 3</span>
                <ShowcaseEquivalentDiagram />
                <div className="diagram-label">Final equivalent</div>
                <div className="diagram-meta">Req = R3 + Rp = 4 + 2 = 6 ohm</div>
                <div className="diagram-meta">Total current: I = 12 / 6 = 2A</div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="domain-pills">
                {domainPills.map((pill) => (
                  <span key={pill} className="domain-pill">
                    {pill}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <div className="section-label">FEATURES</div>
            <Reveal>
              <h2 className="section-heading">
                Everything a student
                <span className="indent">actually needs</span>
              </h2>
            </Reveal>

            <div className="features-grid">
              {featureCards.map((card, index) => (
                <Reveal key={card.title} className="feature-card" delay={index * 70}>
                  <div className="feature-icon">
                    <FeatureIcon icon={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="demo-callout">
              <div className="demo-callout-copy">
                <h3>There is a working app behind this now</h3>
                <p>
                  Open the study workspace to generate a guided STEM solution, save the session in
                  your browser, and export a revision outline.
                </p>
              </div>
              <Link href="/workspace" className="btn-primary">
                Try the workspace
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="built-for" id="built-for">
          <div className="container">
            <div className="section-label">BUILT FOR</div>
            <Reveal>
              <h2 className="section-heading">
                Built for students who want
                <span className="indent">to understand, not just pass</span>
              </h2>
            </Reveal>

            <div className="audience-cards">
              {audienceCards.map((card, index) => (
                <Reveal key={card.number} className="audience-card" delay={index * 80}>
                  <div className="audience-num">{card.number}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="vision" id="vision">
          <div className="container">
            <Reveal>
              <h2>
                The textbook solution manual, <em>reimagined</em> for AI
              </h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="vision-body">
                Worked examples exist because students need process, not only answers. stemLM turns
                an AI response into a better version of that experience: interactive, visual, and
                much easier to revisit.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="vision-body">
                This build keeps the original brand and story, but now the site has a real Next.js
                app shell, an actual waitlist submission flow, and a live product demo route.
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div className="vision-actions">
                <button className="btn-primary btn-primary--large" onClick={openWaitlist}>
                  Join the stemLM waitlist
                </button>
                <Link href="/workspace" className="btn-secondary btn-secondary--large">
                  Open the live workspace
                </Link>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <p className="vision-cta-note">Early access is free | Be the first to try it</p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer marketing-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Link href="/" className="logo" style={{ marginBottom: "0.4rem" }}>
                <span className="logo-dot" />
                <span>stemLM</span>
              </Link>
              <p className="footer-tagline">Step-by-step STEM. Finally.</p>
            </div>
            <div className="footer-links">
              <a href="#how-it-works">How it works</a>
              <a href="#features">Features</a>
              <Link href="/workspace">Workspace</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Copyright 2026 stemLM. Built for students who want to understand.</span>
            <span>Made in India</span>
          </div>
        </div>
      </footer>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}

export default HomePage;

function ProblemIcon({ icon }: { icon: "cross" | "warning" }) {
  if (icon === "warning") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3v6M8 12v1" stroke="var(--red-icon)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 14h10L8 2 3 14z" stroke="var(--red-icon)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="3" x2="13" y2="13" stroke="var(--red-icon)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="3" x2="3" y2="13" stroke="var(--red-icon)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FeatureIcon({
  icon,
}: {
  icon: "steps" | "network" | "playbook" | "download" | "select" | "tree";
}) {
  switch (icon) {
    case "steps":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11h4V5h4v6h4" stroke="#e8961e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "network":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="8" r="4" stroke="#e8961e" strokeWidth="1" fill="none" />
          <circle cx="10" cy="6" r="3.5" stroke="#e8961e" strokeWidth="1" fill="none" />
          <circle cx="10" cy="10" r="3.5" stroke="#e8961e" strokeWidth="1" fill="none" />
        </svg>
      );
    case "playbook":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="4" r="2" stroke="#e8961e" strokeWidth="1" fill="none" />
          <line x1="8" y1="6" x2="4" y2="12" stroke="#e8961e" strokeWidth="1" />
          <line x1="8" y1="6" x2="12" y2="12" stroke="#e8961e" strokeWidth="1" />
          <circle cx="4" cy="13" r="1.5" stroke="#e8961e" strokeWidth="0.8" fill="none" />
          <circle cx="12" cy="13" r="1.5" stroke="#e8961e" strokeWidth="0.8" fill="none" />
        </svg>
      );
    case "download":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2v8M5 7l3 3 3-3" stroke="#e8961e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12h10v2H3z" stroke="#e8961e" strokeWidth="1" fill="none" />
        </svg>
      );
    case "select":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3l4 5v4" stroke="#e8961e" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="9" y="2" width="5" height="4" rx="1.5" stroke="#e8961e" strokeWidth="1" fill="none" />
          <line x1="10" y1="4" x2="13" y2="4" stroke="#e8961e" strokeWidth="0.6" />
        </svg>
      );
    case "tree":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="4" r="2" stroke="#e8961e" strokeWidth="1" fill="none" />
          <line x1="8" y1="6" x2="4" y2="11" stroke="#e8961e" strokeWidth="1" />
          <line x1="8" y1="6" x2="8" y2="11" stroke="#e8961e" strokeWidth="1" />
          <line x1="8" y1="6" x2="12" y2="11" stroke="#e8961e" strokeWidth="1" />
          <circle cx="4" cy="12.5" r="1.5" stroke="#e8961e" strokeWidth="0.8" fill="none" />
          <circle cx="8" cy="12.5" r="1.5" stroke="#e8961e" strokeWidth="0.8" fill="none" />
          <circle cx="12" cy="12.5" r="1.5" stroke="#e8961e" strokeWidth="0.8" fill="none" />
        </svg>
      );
    default:
      return null;
  }
}
