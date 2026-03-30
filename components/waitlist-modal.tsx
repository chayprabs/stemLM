"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

type WaitlistState = {
  name: string;
  email: string;
  role: string;
};

const initialState: WaitlistState = {
  name: "",
  email: "",
  role: "Student",
};

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [form, setForm] = useState<WaitlistState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as {
        message?: string;
        error?: string;
        queueSize?: number;
      };

      if (response.ok || response.status === 409) {
        setStatus("success");
        setMessage(
          payload.message ??
            (payload.queueSize
              ? `You are on the list. Current queue size: ${payload.queueSize}.`
              : "You are on the list."),
        );
        return;
      }

      setStatus("error");
      setMessage(payload.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("The request did not go through. Please try again.");
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="modal-backdrop open"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-box">
        <button className="modal-close" aria-label="Close waitlist form" onClick={onClose}>
          x
        </button>

        <div className="modal-icon" aria-hidden="true">
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="12" r="3" className="diagram-amber-box" />
            <line x1="9" y1="12" x2="25" y2="12" className="diagram-amber-stroke" />
            <rect x="25" y="6" width="20" height="12" rx="2" className="diagram-amber-box" />
            <line x1="45" y1="12" x2="55" y2="12" className="diagram-amber-stroke" />
            <rect x="55" y="6" width="14" height="12" rx="2" className="diagram-amber-box" />
            <line x1="69" y1="12" x2="74" y2="12" className="diagram-amber-stroke" />
            <circle cx="77" cy="12" r="3" className="diagram-amber-box" />
          </svg>
        </div>

        <h2>Join the stemLM waitlist</h2>
        <p>
          This version has a real submission flow now. Drop your details below and the app will
          save your place on the project waitlist.
        </p>

        <form className="waitlist-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Your name"
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Role</span>
            <select
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({ ...current, role: event.target.value }))
              }
            >
              <option>Student</option>
              <option>Teacher</option>
              <option>Parent</option>
              <option>Builder</option>
            </select>
          </label>

          <button className="btn-primary btn-primary--full" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Joining..." : "Join the waitlist"}
          </button>
        </form>

        {message ? (
          <p className={`modal-feedback ${status === "error" ? "error" : "success"}`}>{message}</p>
        ) : null}

        <p className="modal-note">You can also explore the live workspace demo from the homepage.</p>
      </div>
    </div>
  );
}
