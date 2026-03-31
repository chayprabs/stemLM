"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const highlights = [
  "Structured STEM workflows",
  "Works with ChatGPT, Gemini, and Claude",
  "Invite-only beta access",
] as const;

export function WaitlistCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitted(true);
    setError("");
  }

  return (
    <section id="waitlist" className="bg-[#F8FAFC] px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[32px] border border-[#1E293B] bg-[linear-gradient(135deg,#0F172A_0%,#10213B_52%,#0B1220_100%)] shadow-[0_28px_80px_rgba(15,23,42,0.16)]">
        <div className="relative">
          <div className="absolute left-[-8%] top-[-18%] h-[260px] w-[260px] rounded-full bg-[#0EA5A0]/18 blur-3xl" />
          <div className="absolute right-[-5%] top-[12%] h-[220px] w-[220px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

          <div className="relative grid items-center gap-10 px-6 py-12 md:px-10 md:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-14 lg:py-16">
            <div>
              <div className="inline-flex items-center rounded-full border border-[#7DD3FC33] bg-[#0EA5A014] px-3 py-1 text-[11px] font-medium uppercase tracking-[1px] text-[#67E8F9]">
                Private beta
              </div>

              <h2 className="mt-6 max-w-[560px] text-[38px] font-semibold leading-[1.02] tracking-[-1px] text-[#F8FAFC] md:text-[46px]">
                Be the first to use stemLM.
              </h2>

              <p className="mt-5 max-w-[540px] text-[16px] leading-[1.8] text-[#94A3B8] md:text-[17px]">
                We&apos;re building the structured layer for AI problem solving.
                Join the first group of students getting cleaner steps, stronger
                topic guidance, and better answers across STEM.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#FFFFFF14] bg-[#FFFFFF08] px-4 py-2 text-xs text-[#CBD5E1] backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#FFFFFF14] bg-[#FFFFFF08] p-5 text-left shadow-[0_18px_40px_rgba(2,8,23,0.22)] backdrop-blur-md md:p-6">
              <p className="text-sm font-medium text-[#F8FAFC]">Request early access</p>
              <p className="mt-2 max-w-[420px] text-sm leading-[1.7] text-[#94A3B8]">
                Drop your email and we&apos;ll reach out when your spot is ready.
              </p>

              {!submitted ? (
                <>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      placeholder="your@email.com"
                      className="flex-1 rounded-xl border border-[#475569] bg-[#0F1A2F] px-4 py-3.5 text-sm text-[#F8FAFC] placeholder:text-[#64748B] transition-colors duration-150 focus:border-[#0EA5A0] focus:outline-none focus:ring-[1.5px] focus:ring-[#0EA5A0]"
                    />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="whitespace-nowrap rounded-xl bg-[#0EA5A0] px-5 py-3.5 text-sm font-medium text-[#F8FAFC] shadow-[0_12px_30px_rgba(14,165,160,0.25)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#14B8A6]"
                    >
                      Get early access
                    </button>
                  </div>

                  {error ? (
                    <p className="mt-3 text-xs text-[#F87171]">{error}</p>
                  ) : null}
                </>
              ) : (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#34D39933] bg-[#34D39912] px-4 py-4 text-sm font-medium text-[#86EFAC]">
                  <CircleCheck aria-hidden="true" size={18} strokeWidth={1.5} />
                  <span>You&apos;re on the list. We&apos;ll be in touch.</span>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#64748B]">
                <span>No spam. No pitch decks. Just an invite when it&apos;s ready.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
