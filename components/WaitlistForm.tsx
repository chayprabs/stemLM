"use client";

import { CircleCheck, LoaderCircle } from "lucide-react";
import { type ChangeEvent, type FormEvent, useId, useState } from "react";

const WAITLIST_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxEZwnVRFIKCrWFTO1yMwN8_q1BWqAMRYV_ncT3YezYewmTGivCWZsINAJPrOzgUzGSEQ/exec";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistFormVariant = "inline" | "stacked";

type WaitlistFormState = {
  email: string;
  error: string;
  isSubmitted: boolean;
  isSubmitting: boolean;
};

export interface WaitlistFormProps {
  className?: string;
  errorClassName?: string;
  formClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  successClassName?: string;
  placeholder?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  variant?: WaitlistFormVariant;
}

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function WaitlistForm({
  className,
  errorClassName,
  formClassName,
  inputClassName,
  buttonClassName,
  successClassName,
  placeholder = "your@email.com",
  submitLabel = "Join waitlist",
  submittingLabel = "Joining...",
  successMessage = "We'll be in touch soon.",
  variant = "stacked",
}: WaitlistFormProps) {
  const emailId = useId();
  const [state, setState] = useState<WaitlistFormState>({
    email: "",
    error: "",
    isSubmitted: false,
    isSubmitting: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((current) => ({
      ...current,
      email: event.target.value,
      error: "",
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = state.email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      setState((current) => ({
        ...current,
        error: "Please enter a valid email address.",
      }));
      return;
    }

    setState((current) => ({
      ...current,
      error: "",
      isSubmitting: true,
    }));

    try {
      await fetch(WAITLIST_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(normalizedEmail)}`,
      });

      setState({
        email: normalizedEmail,
        error: "",
        isSubmitted: true,
        isSubmitting: false,
      });
    } catch {
      setState((current) => ({
        ...current,
        error: "Something went wrong. Please try again in a moment.",
        isSubmitting: false,
      }));
    }
  };

  if (state.isSubmitted) {
    return (
      <div className={className}>
        <div
          className={joinClasses(
            "rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-4 text-sm text-[#166534]",
            successClassName,
          )}
        >
          <div className="flex items-center gap-3 font-medium">
            <CircleCheck aria-hidden="true" size={18} strokeWidth={1.5} />
            <span>You&apos;re on the list!</span>
          </div>
          <p className="mt-2 leading-[1.7]">{successMessage}</p>
        </div>
      </div>
    );
  }

  const layoutClassName =
    variant === "inline" ? "flex flex-col gap-3 sm:flex-row" : "flex flex-col gap-3";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={joinClasses(layoutClassName, formClassName)}>
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            value={state.email}
            disabled={state.isSubmitting}
            autoComplete="email"
            aria-invalid={state.error ? "true" : "false"}
            onChange={handleChange}
            placeholder={placeholder}
            className={joinClasses(
              "w-full rounded-xl border border-[#D7E0EA] bg-[#FBFCFD] px-4 py-3.5 text-sm text-[#0F1117] placeholder:text-[#94A3B8] transition-colors duration-150 focus:border-[#0EA5A0] focus:outline-none focus:ring-[1.5px] focus:ring-[#0EA5A0]",
              variant === "inline" ? "flex-1" : undefined,
              inputClassName,
            )}
          />
          <button
            type="submit"
            disabled={state.isSubmitting}
            className={joinClasses(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#0EA5A0] px-5 py-3.5 text-sm font-medium text-[#F8FAFC] shadow-[0_12px_24px_rgba(14,165,160,0.18)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#14B8A6] disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-[#99D8D5] disabled:shadow-none",
              buttonClassName,
            )}
          >
            {state.isSubmitting ? (
              <>
                <LoaderCircle aria-hidden="true" size={16} strokeWidth={1.8} className="animate-spin" />
                <span>{submittingLabel}</span>
              </>
            ) : (
              <span>{submitLabel}</span>
            )}
          </button>
        </div>

        {state.error ? (
          <p
            role="alert"
            className={joinClasses("mt-3 text-xs text-[#EF4444]", errorClassName)}
          >
            {state.error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
