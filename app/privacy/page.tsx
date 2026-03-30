"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { WaitlistModal } from '@/components/waitlist-modal'

export default function PrivacyPage() {
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
          Privacy policy
        </h1>
        <p className="mb-12 text-[13px] text-[#64748B]">Last updated: March 30, 2026</p>
        <hr className="mb-12 border-[#E2E8F0]" />

        <p className="mb-10 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
          At stemLM, your privacy matters. This policy explains what data we collect, how we use it,
          and the choices you have. By using stemLM, you agree to the practices described here.
        </p>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">1. Information we collect</h2>

          <p className="mb-3 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            <span className="text-[#0F1117]">Information you provide.</span>{' '}
            When you join our waitlist, we collect your email address. When you create an account, we
            may also collect your name and a password. Any questions or problems you submit through
            the workspace are processed to deliver the service.
          </p>
          <p className="mb-3 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            <span className="text-[#0F1117]">Usage data.</span>{' '}
            We automatically collect information about how you interact with stemLM, including pages
            visited, features used, device and browser type, IP address, and interaction patterns
            within the workspace.
          </p>
          <p className="mb-3 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            <span className="text-[#0F1117]">Cookies and similar technologies.</span>{' '}
            We use essential cookies to keep the site functioning and analytics cookies to understand
            usage patterns. You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            2. How we use your information
          </h2>
          <ul className="mb-4 max-w-[640px] list-disc space-y-1 pl-5 text-[15px] leading-[1.7] text-[#64748B]">
            <li>Manage the waitlist and send early access invitations</li>
            <li>Provide, maintain, and improve stemLM services</li>
            <li>Communicate updates, feature announcements, and support</li>
            <li>Analyze usage patterns to improve the learning experience</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            3. Data sharing and third parties
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            We do not sell your personal data. We may share information with:
          </p>
          <ul className="mb-4 max-w-[640px] list-disc space-y-1 pl-5 text-[15px] leading-[1.7] text-[#64748B]">
            <li>
              <span className="text-[#0F1117]">Service providers</span> — hosting, email delivery,
              and analytics partners who process data on our behalf under strict confidentiality
            </li>
            <li>
              <span className="text-[#0F1117]">Legal compliance</span> — when required by law,
              regulation, or valid legal process
            </li>
            <li>
              <span className="text-[#0F1117]">Business transfers</span> — in connection with a
              merger, acquisition, or sale of assets
            </li>
            <li>
              <span className="text-[#0F1117]">Aggregated data</span> — anonymized, non-identifiable
              data may be shared for research or analysis
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">4. Data retention</h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            Waitlist emails are retained until early access is granted or you request deletion.
            Account data is retained while your account is active and for a reasonable period
            afterward. Usage data is retained in anonymized form for analytics purposes. You can
            request deletion of your personal data at any time.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">5. Your rights</h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            Depending on your location, you may have the right to:
          </p>
          <ul className="mb-4 max-w-[640px] list-disc space-y-1 pl-5 text-[15px] leading-[1.7] text-[#64748B]">
            <li>
              <span className="text-[#0F1117]">Access</span> — request a copy of personal data we
              hold about you
            </li>
            <li>
              <span className="text-[#0F1117]">Correction</span> — request correction of inaccurate
              or incomplete data
            </li>
            <li>
              <span className="text-[#0F1117]">Deletion</span> — request deletion of your personal
              data
            </li>
            <li>
              <span className="text-[#0F1117]">Opt-out</span> — unsubscribe from marketing emails at
              any time via the link in each email
            </li>
            <li>
              <span className="text-[#0F1117]">Data portability</span> — request your data in a
              machine-readable format
            </li>
          </ul>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:hello@stemlm.com" className="text-[#0EA5A0] hover:underline">
              hello@stemlm.com
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            6. Children&apos;s privacy
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            stemLM is designed for university and higher-education STEM students. We do not knowingly
            collect personal information from children under 13 (or the applicable minimum age in
            your jurisdiction). If you believe a child has provided us with personal data, please
            contact us at{' '}
            <a href="mailto:hello@stemlm.com" className="text-[#0EA5A0] hover:underline">
              hello@stemlm.com
            </a>{' '}
            and we will promptly delete it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">7. Security</h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            We use industry-standard measures to protect your data, including encryption in transit
            and at rest. However, no method of electronic transmission or storage is completely
            secure. If you suspect unauthorized access to your account, contact us immediately.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">
            8. Changes to this policy
          </h2>
          <p className="mb-4 max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            We may update this privacy policy from time to time. When we do, we will revise the
            &quot;last updated&quot; date at the top of this page. Continued use of stemLM after
            changes are posted constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F1117]">9. Contact us</h2>
          <p className="max-w-[640px] text-[15px] leading-[1.7] text-[#64748B]">
            If you have any questions about this privacy policy or how we handle your data, reach out
            to us at{' '}
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
