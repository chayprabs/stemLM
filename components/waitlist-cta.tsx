"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    <section id="waitlist" className="bg-[#0C0C0F] px-5 py-16 text-center md:px-12 md:py-20">
      <div className="mx-auto max-w-[600px]">
        <h2 className="mb-4 text-3xl font-medium leading-[1.15] tracking-[-0.5px] text-[#F0F0F2]">
          Be the first to use stemLM.
        </h2>

        <p className="mb-8 text-base text-[#8A8A9A]">
          We&apos;re in private beta. Drop your email and we&apos;ll reach out when
          your spot is ready.
        </p>

        {!submitted ? (
          <>
            <div className="mx-auto flex max-w-[440px] flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="your@email.com"
                className="flex-1 rounded-md border border-[#2A2A35] bg-[#141418] px-4 py-3 text-sm text-[#F0F0F2] placeholder:text-[#4A4A5A] transition-colors duration-150 focus:border-[#0EA5A0] focus:outline-none focus:ring-[1.5px] focus:ring-[#0EA5A0]"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="whitespace-nowrap rounded-md bg-[#0EA5A0] px-5 py-3 text-sm font-medium text-[#F0F0F2] transition-colors duration-150 hover:bg-[#0D9490]"
              >
                Get early access
              </button>
            </div>

            {error ? (
              <p className="mx-auto mt-2 max-w-[440px] text-xs text-[#EF4444]">{error}</p>
            ) : null}
          </>
        ) : (
          <div className="flex items-center justify-center gap-2 text-base font-medium text-[#22C55E]">
            <CircleCheck aria-hidden="true" size={16} strokeWidth={1.5} />
            <span>You&apos;re on the list. We&apos;ll be in touch.</span>
          </div>
        )}

        <p className="mt-3 text-xs text-[#4A4A5A]">
          No spam. No pitch decks. Just an invite when it&apos;s ready.
        </p>
      </div>
    </section>
  );
}
