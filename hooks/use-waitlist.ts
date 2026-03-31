"use client";

import { useCallback, useState } from "react";

type WaitlistStatus = "idle" | "submitting" | "submitted";

type WaitlistResponse = {
  message?: string;
  error?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useWaitlist(source: string) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const updateEmail = useCallback((nextEmail: string) => {
    setEmail(nextEmail);
    setError("");
  }, []);

  const submit = useCallback(async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address");
      return false;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as WaitlistResponse;

      if (!response.ok && response.status !== 409) {
        setStatus("idle");
        setError(data.error ?? "The waitlist service is unavailable right now.");
        return false;
      }

      setStatus("submitted");
      setMessage(
        data.message ??
          (response.status === 409
            ? "This email is already on the waitlist."
            : "You're on the list. We'll be in touch."),
      );
      setEmail(normalizedEmail);

      return true;
    } catch {
      setStatus("idle");
      setError("The waitlist service is unavailable right now.");
      return false;
    }
  }, [email, source]);

  const reset = useCallback(() => {
    setEmail("");
    setStatus("idle");
    setError("");
    setMessage("");
  }, []);

  return {
    email,
    setEmail: updateEmail,
    error,
    message,
    submitted: status === "submitted",
    isSubmitting: status === "submitting",
    submit,
    reset,
  };
}
