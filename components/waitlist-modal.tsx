"use client";

import { X } from "lucide-react";

import { WaitlistForm } from "@/components/WaitlistForm";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
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

        <h2 className="mb-2 text-lg font-medium tracking-[-0.3px] text-[#0F1117] sm:text-xl">
          Join the waitlist
        </h2>
        <p className="text-sm text-[#64748B]">
          Be the first to access stemLM. We&apos;re opening spots gradually for students
          in private beta.
        </p>

        <WaitlistForm
          className="mt-6"
          submitLabel="Get early access"
          submittingLabel="Joining..."
          successMessage="We'll send your invite as soon as a spot opens."
          inputClassName="rounded-md border-[#E2E8F0] bg-[#F8F9FC] py-3 placeholder:text-[#4A4A5A] focus:ring-[#0EA5A0]"
          buttonClassName="w-full rounded-md py-3 shadow-none hover:translate-y-0 hover:bg-[#0D9490]"
        />
      </div>
    </div>
  );
}
