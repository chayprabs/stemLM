"use client";

import { CircleCheck, X } from "lucide-react";
import { useEffect } from "react";

import { useWaitlist } from "@/hooks/use-waitlist";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const {
    email,
    setEmail,
    error,
    message,
    submitted,
    isSubmitting,
    submit,
    reset,
  } = useWaitlist("modal");

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0F]/60 p-3 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-[20px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-[#4A4A5A] transition-colors duration-150 hover:text-[#64748B] sm:right-4 sm:top-4"
          aria-label="Close waitlist modal"
        >
          <X aria-hidden="true" size={18} strokeWidth={1.5} />
        </button>

        {submitted ? (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-base font-medium text-[#22C55E]">
              <CircleCheck aria-hidden="true" size={16} strokeWidth={1.5} />
              <span>You&apos;re on the list.</span>
            </div>
            <p className="mt-3 text-sm leading-[1.7] text-[#64748B]">{message}</p>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-lg font-medium tracking-[-0.3px] text-[#0F1117] sm:text-xl">
              Join the waitlist
            </h2>
            <p className="mb-6 text-sm text-[#64748B]">
              Be the first to access stemLM. We&apos;re opening spots gradually for
              students in private beta.
            </p>
            <input
              type="email"
              value={email}
              disabled={isSubmitting}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="your@email.com"
              className="mb-3 w-full rounded-md border border-[#E2E8F0] bg-[#F8F9FC] px-4 py-3 text-sm text-[#0F1117] placeholder:text-[#4A4A5A] focus:outline-none focus:ring-[1.5px] focus:ring-[#0EA5A0]"
            />
            {error ? <p className="mb-3 text-xs text-[#EF4444]">{error}</p> : null}
            <button
              type="button"
              onClick={submit}
              disabled={isSubmitting}
              className="w-full rounded-md bg-[#0EA5A0] py-3 text-sm font-medium text-[#F0F0F2] transition-colors duration-150 hover:bg-[#0D9490]"
            >
              {isSubmitting ? "Joining..." : "Get early access"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
