"use client"

import { useEffect, useState } from 'react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setSubmitted(false)
      setError('')
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  function handleSubmit() {
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address')
      return
    }

    setSubmitted(true)
    setError('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-[16px] border border-[#E2E8F0] bg-white p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-lg leading-none text-[#4A4A5A] transition-colors hover:text-[#64748B]"
        >
          &#10005;
        </button>

        {submitted ? (
          <div className="translate-y-0 opacity-100 transition-all duration-300">
            <div className="flex items-center justify-center gap-2 text-[15px] font-medium text-[#22C55E]">
              <span>&#10003;</span>
              <span>You&apos;re on the list. We&apos;ll be in touch.</span>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-[22px] font-medium text-[#0F1117]">Join the waitlist</h2>
            <p className="mb-6 text-[14px] leading-[1.6] text-[#64748B]">
              Be the first to access stemLM. We&apos;re opening spots gradually for
              students in private beta.
            </p>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError('')
              }}
              placeholder="your@email.com"
              className="mb-3 w-full rounded-[10px] border border-[#E2E8F0] bg-[#F8F9FC] px-4 py-3 text-[14px] text-[#0F1117] placeholder:text-[#4A4A5A] focus:outline-none focus:ring-[1.5px] focus:ring-[#0EA5A0]"
            />
            {error ? <p className="mb-3 text-[12px] text-[#EF4444]">{error}</p> : null}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-[10px] bg-[#0EA5A0] py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#0D9490]"
            >
              Get early access
            </button>
          </>
        )}
      </div>
    </div>
  )
}
