"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { WaitlistModal } from '@/components/waitlist-modal'

export default function TermsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Nav onOpenModal={() => setIsModalOpen(true)} />

      <article className="mx-auto max-w-[720px] px-5 py-16 md:px-12 md:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[13px] text-[#0EA5A0] transition-colors duration-150 hover:text-[#0D9490]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          <span>Back to home</span>
        </Link>

        <h1 className="mb-2 text-[28px] font-medium tracking-[-0.3px] text-[#0F1117]">
          Terms of service
        </h1>
        <p className="mb-12 text-[13px] text-[#64748B]">Last updated: March 30, 2026</p>
        <hr className="mb-12 border-[#E2E8F0]" />

        <p className="mb-10 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
          These terms govern your use of stemLM, including the website, web application, browser
          extension, and any related services. By accessing or using stemLM, you agree to be bound by
          these terms. If you do not agree, please do not use the service.
        </p>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            1. Description of service
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            stemLM is an AI-powered STEM learning platform that provides structured, step-by-step
            problem-solving frameworks with visual reasoning. The service includes a web-based
            workspace, a curated database of STEM topics and solving methodologies, and a browser
            extension that integrates with third-party AI tools. The service is currently in early
            access and features may change, be added, or be removed at any time.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            2. Early access and waitlist
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            stemLM is currently available by invitation only. Joining the waitlist does not guarantee
            access or a specific timeline for access. Early access users may experience incomplete
            features, bugs, or service interruptions. We reserve the right to modify or discontinue
            the early access program at any time without notice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            3. Accounts and eligibility
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            You must be at least 13 years old (or the applicable minimum age in your jurisdiction) to
            use stemLM. You are responsible for maintaining the security of your account credentials
            and for all activity that occurs under your account. You agree to provide accurate
            information and keep it up to date. Each person may maintain only one account.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">4. Acceptable use</h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            You agree not to:
          </p>
          <ul className="mb-4 max-w-[640px] list-disc space-y-1 pl-5 text-[15px] leading-[1.7] text-[#64748B]">
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to reverse-engineer, decompile, or extract source code from the platform</li>
            <li>Interfere with or disrupt the service or its infrastructure</li>
            <li>Share account credentials with others</li>
            <li>Scrape, crawl, or automatically extract content from the platform</li>
            <li>Use the service to generate content that infringes third-party rights</li>
            <li>Misrepresent your identity or affiliation</li>
            <li>Use stemLM content to train other AI models without written permission</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            5. Intellectual property
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            All content, frameworks, solving methodologies, taxonomy structures, and software
            comprising stemLM are owned by stemLM or its licensors and are protected by intellectual
            property laws. You may use solutions generated through the service for personal
            educational purposes. You may not redistribute, sell, or commercially exploit stemLM
            content or frameworks without written permission.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            6. User-generated content
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            You retain ownership of questions and problems you submit to stemLM. By using the
            service, you grant stemLM a non-exclusive, royalty-free license to process your inputs
            solely to deliver the service. We may use anonymized, aggregated usage data to improve
            the platform. We do not claim ownership of your academic work.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            7. Third-party services
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            stemLM may integrate with third-party AI services such as ChatGPT, Gemini, and Claude.
            We are not responsible for the availability, accuracy, or policies of those services.
            Your use of third-party services is governed by their respective terms and privacy
            policies.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">8. Disclaimers</h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties
            of any kind, whether express or implied. stemLM does not guarantee the accuracy or
            completeness of any solution or learning content. Content is for educational purposes and
            should not be relied upon as the sole source for academic submissions. During the early
            access period, the service may contain errors or experience interruptions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            9. Limitation of liability
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            To the maximum extent permitted by law, stemLM and its affiliates shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising from your
            use of the service. Our total aggregate liability shall not exceed the amount you paid to
            stemLM in the twelve months preceding the claim, or fifty US dollars ($50), whichever is
            greater.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">10. Termination</h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            We may suspend or terminate your access at any time for violation of these terms or for
            any reason during the early access period, with or without notice. You may stop using the
            service at any time. Upon termination, your right to access the service ceases
            immediately. Provisions that by their nature should survive termination — including
            intellectual property, disclaimers, and limitation of liability — will survive.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            11. Changes to these terms
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            We may update these terms from time to time. When we do, we will revise the &quot;last
            updated&quot; date at the top of this page. Continued use of stemLM after changes are
            posted constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">12. Governing law</h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            These terms shall be governed by and construed in accordance with applicable law. Any
            disputes arising from these terms or your use of stemLM shall first be resolved through
            good-faith negotiation between the parties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">13. Contact us</h2>
          <p className="max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            If you have any questions about these terms, reach out to us at{' '}
            <a href="mailto:hello@stemlm.com" className="text-[#0EA5A0] hover:underline">
              hello@stemlm.com
            </a>
            .
          </p>
        </section>
      </article>

      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
