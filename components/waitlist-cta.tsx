"use client";

import { WaitlistForm } from "@/components/WaitlistForm";

const highlights = [
  "Framework-matched STEM solutions",
  "Built on top of ChatGPT, Claude, and Gemini",
  "Made for students who need the missing steps",
] as const;

export function WaitlistCta() {
  return (
    <section id="waitlist" className="bg-white px-4 py-8 sm:px-5 md:px-12 md:py-12">
      <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FCFB_100%)] shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:rounded-[30px]">
        <div className="relative">
          <div className="absolute left-[-6%] top-[-14%] h-[220px] w-[220px] rounded-full bg-[#0EA5A0]/10 blur-3xl" />
          <div className="absolute right-[-4%] bottom-[-16%] h-[220px] w-[220px] rounded-full bg-[#93C5FD]/12 blur-3xl" />

          <div className="relative grid items-center gap-8 px-5 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center rounded-full border border-[#CFEDEA] bg-[#0EA5A012] px-3 py-1 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
                Private beta
              </div>

              <h2 className="mt-5 max-w-[520px] text-[30px] font-semibold leading-[1.06] tracking-[-0.8px] text-[#0F1117] sm:text-[34px] md:text-[40px]">
                Get early access to stemLM.
              </h2>

              <p className="mt-4 max-w-[540px] text-[16px] leading-[1.8] text-[#64748B] md:text-[17px]">
                For students who want the missing steps, not just the final answer.
                stemLM turns circuits, derivations, proofs, and algorithms into
                structured solutions you can actually learn from.
              </p>

              <div className="mt-7 space-y-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0EA5A0]"
                    />
                    <p className="text-sm leading-[1.7] text-[#475569]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-4 text-left shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-5 md:p-6">
              <p className="text-sm font-medium text-[#0F1117]">Request your invite</p>
              <p className="mt-2 max-w-[420px] text-sm leading-[1.7] text-[#64748B]">
                Join the first group of students using stemLM in private beta.
                We&apos;ll reach out when your spot opens.
              </p>

              <WaitlistForm
                className="mt-6"
                variant="inline"
                submitLabel="Get early access"
                submittingLabel="Joining..."
                successMessage="We'll reach out when your spot opens."
              />

              <div className="mt-5 border-t border-[#EEF2F6] pt-4 text-xs text-[#94A3B8]">
                No spam. No sales funnel. Just an invite when it&apos;s ready.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
